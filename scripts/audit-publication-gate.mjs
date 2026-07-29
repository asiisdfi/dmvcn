import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  HUMAN_REVIEW_REQUIRED_ROUTES,
  NON_SEARCH_LANDING_ROUTES,
  getHighRiskContentRevision,
  getPublicationGate,
  isPlausibleHumanReviewer,
  isValidReviewDate,
} from '../src/data/publication-gate.ts';
import { REVIEW_MANUAL_SIGNOFFS } from '../src/data/review-manual-signoffs.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const errors = [];

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(entryPath)));
    else if (entry.name.endsWith('.html')) files.push(entryPath);
  }
  return files;
}

function routeFromFile(filePath) {
  const relative = path.relative(distDir, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function robotsDirectives(html) {
  const content = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? '';
  return new Set(content.toLowerCase().split(',').map((item) => item.trim()).filter(Boolean));
}

function metaContent(html, attribute, value) {
  return html.match(
    new RegExp(
      `<meta\\s+${attribute}="${value}"\\s+content="([^"]+)"`,
      'i',
    ),
  )?.[1] ?? '';
}

const htmlFiles = await collectHtmlFiles(distDir);
const htmlByRoute = new Map();
for (const file of htmlFiles) htmlByRoute.set(routeFromFile(file), await readFile(file, 'utf8'));

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname),
);

const seenSignoffs = new Set();
const signoffByRoute = new Map(
  REVIEW_MANUAL_SIGNOFFS.map((signoff) => [signoff.route, signoff]),
);
for (const signoff of REVIEW_MANUAL_SIGNOFFS) {
  if (seenSignoffs.has(signoff.route)) errors.push(`${signoff.route}: duplicate manual signoff`);
  seenSignoffs.add(signoff.route);
  if (!HUMAN_REVIEW_REQUIRED_ROUTES.has(signoff.route)) {
    errors.push(`${signoff.route}: manual signoff is not attached to a registered high-risk route`);
  }
  if (!isPlausibleHumanReviewer(signoff.reviewer)) {
    errors.push(`${signoff.route}: reviewer is missing or appears to be an AI/editorial placeholder`);
  }
  if (!isValidReviewDate(signoff.reviewedAt)) {
    errors.push(`${signoff.route}: reviewedAt must be a real, non-future YYYY-MM-DD date`);
  }
  if (signoff.scope.trim().length < 12) errors.push(`${signoff.route}: signoff scope is too short`);
  if (
    getHighRiskContentRevision(signoff.route)?.contentFingerprint &&
    !/^[a-f0-9]{64}$/.test(signoff.contentFingerprint ?? '')
  ) {
    errors.push(`${signoff.route}: signoff is missing its reviewed content fingerprint`);
  }
}

let pending = 0;
let approved = 0;
let stale = 0;
for (const route of HUMAN_REVIEW_REQUIRED_ROUTES) {
  const html = htmlByRoute.get(route);
  if (!html) {
    errors.push(`${route}: high-risk route has no built HTML`);
    continue;
  }

  const gate = getPublicationGate(route);
  const visibleModifiedAt = metaContent(
    html,
    'property',
    'article:modified_time',
  );
  const visibleReviewedAt = metaContent(
    html,
    'name',
    'content-review-date',
  );
  const renderedContentRevisionAt = [
    visibleModifiedAt,
    visibleReviewedAt,
  ].sort().at(-1) ?? '';
  const recordedSignoff = signoffByRoute.get(route);
  const expectedApprovalDateCurrent = Boolean(
    recordedSignoff &&
      renderedContentRevisionAt &&
      recordedSignoff.reviewedAt >= renderedContentRevisionAt,
  );
  const expectedApprovalFingerprintCurrent = Boolean(
    recordedSignoff &&
      (
        !gate.contentFingerprint ||
        recordedSignoff.contentFingerprint === gate.contentFingerprint
      ),
  );
  const expectedApprovalCurrent =
    expectedApprovalDateCurrent && expectedApprovalFingerprintCurrent;
  const directives = robotsDirectives(html);
  const hasNoindex = directives.has('noindex');
  const hasFollow = directives.has('follow');
  const inSitemap = sitemapRoutes.has(route);

  if (!gate.contentRevisionAt) {
    errors.push(`${route}: high-risk content revision is not registered`);
  }
  if (
    gate.contentModifiedAt !== visibleModifiedAt ||
    gate.contentReviewedAt !== visibleReviewedAt
  ) {
    errors.push(
      `${route}: publication-gate revision does not match the rendered content dates`,
    );
  }
  if (gate.humanApprovalCurrent !== expectedApprovalCurrent) {
    errors.push(
      `${route}: current human-approval state does not match the rendered content version`,
    );
  }
  if (gate.humanApprovalDateCurrent !== expectedApprovalDateCurrent) {
    errors.push(`${route}: human-approval date state is inconsistent`);
  }
  if (
    gate.humanApprovalFingerprintCurrent !==
    expectedApprovalFingerprintCurrent
  ) {
    errors.push(`${route}: human-approval fingerprint state is inconsistent`);
  }
  if (gate.humanApprovalRecorded && !gate.humanApprovalCurrent) {
    stale += 1;
  }

  if (gate.indexable) {
    approved += 1;
    if (hasNoindex) errors.push(`${route}: approved route still has noindex`);
    if (!inSitemap) errors.push(`${route}: approved route is missing from sitemap`);
  } else {
    pending += 1;
    if (!hasNoindex || !hasFollow) errors.push(`${route}: pending route must use noindex,follow`);
    if (inSitemap) errors.push(`${route}: pending route must not appear in sitemap`);
  }
}

for (const [route, html] of htmlByRoute) {
  if (route === '/404/' || HUMAN_REVIEW_REQUIRED_ROUTES.has(route)) continue;
  const hasNoindex = robotsDirectives(html).has('noindex');
  if (NON_SEARCH_LANDING_ROUTES.has(route)) {
    if (!hasNoindex) errors.push(`${route}: non-search landing page must use noindex,follow`);
    if (sitemapRoutes.has(route)) errors.push(`${route}: non-search landing page must not appear in sitemap`);
    continue;
  }
  if (hasNoindex) errors.push(`${route}: non-gated page unexpectedly has noindex`);
}

console.log('# Publication Gate Audit');
console.log('');
console.log(`Human-review routes: ${HUMAN_REVIEW_REQUIRED_ROUTES.size}`);
console.log(`Human approved and indexable: ${approved}`);
console.log(`Pending and noindex: ${pending}`);
console.log(`Stale approvals held noindex: ${stale}`);
console.log(`Manual signoff records: ${REVIEW_MANUAL_SIGNOFFS.length}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  for (const error of errors) console.log(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Every high-risk route matches its real-human signoff and sitemap state.');
}
