import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { SEARCH_INTENT_BOUNDARIES } from '../src/data/search-intent-boundaries.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.resolve(
  process.env.SEARCH_INTENT_DIST_DIR ?? path.join(projectRoot, 'dist'),
);
const outputDir = path.resolve(
  process.env.SEARCH_INTENT_OUTPUT_DIR ?? path.join(projectRoot, 'reports'),
);
const reviewMaxAgeDays = 90;
const errors = [];

const classRules = {
  topic: {
    minimumChars: 2_000,
    reviewSimilarity: 0.14,
    duplicateSimilarity: 0.45,
  },
  directory: {
    minimumChars: 4_000,
    reviewSimilarity: 0.3,
    duplicateSimilarity: 0.55,
  },
  'state-overview': {
    minimumChars: 3_000,
    reviewSimilarity: null,
    duplicateSimilarity: 0.5,
  },
  'state-real-id': {
    minimumChars: 3_000,
    reviewSimilarity: null,
    duplicateSimilarity: 0.5,
  },
  practice: {
    minimumChars: 1_500,
    reviewSimilarity: 0.35,
    duplicateSimilarity: 0.65,
  },
};

function currentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: process.env.REPORT_TIME_ZONE ?? 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))) return false;
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

function daysBetween(earlier, later) {
  return Math.round(
    (
      Date.parse(`${later}T00:00:00.000Z`) -
      Date.parse(`${earlier}T00:00:00.000Z`)
    ) / 86_400_000,
  );
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(entryPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }
  return files.sort();
}

function routeForFile(filePath) {
  const relative = path.relative(distDir, filePath).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'index.html'.length)}`;
  }
  return `/${relative}`;
}

function attributes(node) {
  return new Map((node.attrs ?? []).map((attribute) => [
    attribute.name,
    attribute.value,
  ]));
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  if (['script', 'style', 'svg'].includes(node.tagName)) return '';
  return (node.childNodes ?? []).map(textContent).join(' ');
}

function mainText(node, insideMain = false) {
  if (
    ['script', 'style', 'svg', 'header', 'footer', 'aside', 'nav'].includes(
      node.tagName,
    )
  ) {
    return '';
  }
  const nextInsideMain = insideMain || node.tagName === 'main';
  if (node.nodeName === '#text') {
    return nextInsideMain ? node.value ?? '' : '';
  }
  return (node.childNodes ?? [])
    .map((child) => mainText(child, nextInsideMain))
    .join(' ');
}

function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/dmv中文办事库|dmvcn|查看官方来源|官方来源/g, '')
    .replace(/[\s\p{P}\p{S}]/gu, '');
}

function shingles(value, width = 4) {
  const normalized = normalizeText(value);
  const result = new Set();
  for (let index = 0; index <= normalized.length - width; index += 1) {
    result.add(normalized.slice(index, index + width));
  }
  return result;
}

function jaccard(left, right) {
  const smaller = left.size <= right.size ? left : right;
  const larger = left.size <= right.size ? right : left;
  let intersection = 0;
  for (const item of smaller) {
    if (larger.has(item)) intersection += 1;
  }
  return intersection / (left.size + right.size - intersection || 1);
}

function pageClass(route) {
  if (/^\/topics\/[^/]+\/$/.test(route)) return 'topic';
  if (/^\/directories\/[^/]+\/$/.test(route)) return 'directory';
  if (/^\/states\/[^/]+\/real-id\/$/.test(route)) return 'state-real-id';
  if (/^\/states\/[^/]+\/$/.test(route)) return 'state-overview';
  if (/^\/practice-tests\/[^/]+\/$/.test(route)) return 'practice';
  return '';
}

function pairKey(routes) {
  return [...routes].sort().join('\t');
}

function round(value, digits = 3) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

let htmlFiles = [];
try {
  htmlFiles = await collectHtmlFiles(distDir);
} catch {
  console.error('Missing build output. Run npm run build first.');
  process.exit(1);
}

const pages = [];
const allTaskRoutes = new Set();
const noindexTaskRoutes = new Set();
for (const filePath of htmlFiles) {
  const route = routeForFile(filePath);
  const classification = pageClass(route);
  if (!classification) continue;
  allTaskRoutes.add(route);

  const tree = parse(await readFile(filePath, 'utf8'));
  let robots = '';
  let title = '';
  let heading = '';
  function inspect(node) {
    if (node.tagName === 'meta') {
      const attrs = attributes(node);
      if ((attrs.get('name') ?? '').toLowerCase() === 'robots') {
        robots = attrs.get('content') ?? '';
      }
    }
    if (node.tagName === 'title') title = textContent(node).trim();
    if (node.tagName === 'h1' && !heading) heading = textContent(node).trim();
    for (const child of node.childNodes ?? []) inspect(child);
  }
  inspect(tree);
  if (robots.toLowerCase().split(/[\s,]+/).includes('noindex')) {
    noindexTaskRoutes.add(route);
    continue;
  }

  const normalized = normalizeText(mainText(tree));
  const rule = classRules[classification];
  const contentChars = normalized.length;
  if (contentChars < rule.minimumChars) {
    errors.push(
      `${route}: ${classification} main content has ${contentChars} normalized characters; minimum is ${rule.minimumChars}.`,
    );
  }
  pages.push({
    route,
    class: classification,
    title,
    heading,
    contentChars,
    contentHash: createHash('sha256').update(normalized).digest('hex'),
    shingles: shingles(normalized),
  });
}

const pagesByHash = new Map();
for (const page of pages) {
  const routes = pagesByHash.get(page.contentHash) ?? [];
  routes.push(page.route);
  pagesByHash.set(page.contentHash, routes);
}
for (const routes of pagesByHash.values()) {
  if (routes.length > 1) {
    errors.push(`Exact normalized main-content duplicate: ${routes.join(', ')}.`);
  }
}

const today = currentCalendarDate();
const boundaryByPair = new Map();
for (const boundary of SEARCH_INTENT_BOUNDARIES) {
  const key = pairKey(boundary.routes ?? []);
  if (
    !Array.isArray(boundary.routes) ||
    boundary.routes.length !== 2 ||
    boundary.routes.some((route) => !route.startsWith('/')) ||
    boundary.routes[0] === boundary.routes[1]
  ) {
    errors.push('Search intent boundary must contain two distinct site routes.');
    continue;
  }
  if (boundaryByPair.has(key)) {
    errors.push(`Duplicate search intent boundary: ${boundary.routes.join(' <> ')}.`);
    continue;
  }
  if (
    !isCalendarDate(boundary.reviewedAt) ||
    boundary.reviewedAt > today ||
    daysBetween(boundary.reviewedAt, today) > reviewMaxAgeDays
  ) {
    errors.push(
      `${boundary.routes.join(' <> ')}: intent boundary review date is missing, future, or older than ${reviewMaxAgeDays} days.`,
    );
  }
  if (normalizeText(boundary.distinction).length < 20) {
    errors.push(
      `${boundary.routes.join(' <> ')}: intent distinction is too short to explain page ownership.`,
    );
  }
  boundaryByPair.set(key, boundary);
}

const pageRoutes = new Set(pages.map((page) => page.route));
for (const boundary of SEARCH_INTENT_BOUNDARIES) {
  for (const route of boundary.routes) {
    if (!allTaskRoutes.has(route)) {
      errors.push(`${route}: intent boundary route is missing from the build.`);
    }
  }
}

const pairs = [];
const requiredBoundaryKeys = new Set();
for (let leftIndex = 0; leftIndex < pages.length; leftIndex += 1) {
  const left = pages[leftIndex];
  for (
    let rightIndex = leftIndex + 1;
    rightIndex < pages.length;
    rightIndex += 1
  ) {
    const right = pages[rightIndex];
    if (left.class !== right.class) continue;
    const rule = classRules[left.class];
    const similarity = jaccard(left.shingles, right.shingles);
    const key = pairKey([left.route, right.route]);
    const boundary = boundaryByPair.get(key);
    const requiresBoundary =
      rule.reviewSimilarity !== null &&
      similarity >= rule.reviewSimilarity;

    if (similarity >= rule.duplicateSimilarity) {
      errors.push(
        `${left.route} <> ${right.route}: normalized main-content similarity ${round(similarity)} reaches the ${rule.duplicateSimilarity} near-duplicate limit.`,
      );
    }
    if (requiresBoundary) {
      requiredBoundaryKeys.add(key);
      if (!boundary) {
        errors.push(
          `${left.route} <> ${right.route}: similarity ${round(similarity)} requires an explicit search-intent boundary.`,
        );
      }
    }
    if (requiresBoundary || similarity >= rule.duplicateSimilarity * 0.5) {
      pairs.push({
        routes: [left.route, right.route],
        class: left.class,
        similarity: round(similarity),
        boundaryStatus: boundary
          ? 'reviewed'
          : requiresBoundary
            ? 'missing'
            : 'observe',
        reviewedAt: boundary?.reviewedAt ?? null,
        distinction: boundary?.distinction ?? null,
      });
    }
  }
}

for (const [key, boundary] of boundaryByPair) {
  if (
    boundary.routes.some(
      (route) => noindexTaskRoutes.has(route) || !allTaskRoutes.has(route),
    )
  ) {
    continue;
  }
  if (!requiredBoundaryKeys.has(key)) {
    errors.push(
      `${boundary.routes.join(' <> ')}: registered intent boundary no longer meets the review threshold; remove or update the stale record.`,
    );
  }
}

pairs.sort(
  (left, right) =>
    right.similarity - left.similarity ||
    left.routes.join('').localeCompare(right.routes.join('')),
);

const countsByClass = Object.fromEntries(
  Object.keys(classRules).map((classification) => [
    classification,
    pages.filter((page) => page.class === classification).length,
  ]),
);
const dormantBoundaries = SEARCH_INTENT_BOUNDARIES.filter((boundary) =>
  boundary.routes.some((route) => noindexTaskRoutes.has(route)),
).length;
const report = {
  generatedAt: `${today}T00:00:00.000Z`,
  summary: {
    pages: pages.length,
    countsByClass,
    exactDuplicates: [...pagesByHash.values()].filter(
      (routes) => routes.length > 1,
    ).length,
    reviewedBoundaries: requiredBoundaryKeys.size,
    dormantBoundaries,
    monitoredPairs: pairs.length,
    errors: errors.length,
  },
  rules: {
    shingleWidth: 4,
    reviewMaxAgeDays,
    classes: classRules,
  },
  pages: pages.map(({ shingles: _shingles, ...page }) => page),
  pairs,
  errors,
};

const markdown = [
  `# 搜索意图与重复页面审计（${today}）`,
  '',
  `- 可索引办事页：${pages.length}`,
  `- 专题 / 目录 / 州总览 / 州 REAL ID / 练习页：${countsByClass.topic} / ${countsByClass.directory} / ${countsByClass['state-overview']} / ${countsByClass['state-real-id']} / ${countsByClass.practice}`,
  `- 正文完全重复：${report.summary.exactDuplicates}`,
  `- 已复核意图边界：${report.summary.reviewedBoundaries}`,
  `- 因发布门禁暂时休眠的边界：${report.summary.dormantBoundaries}`,
  `- 观察或复核页面对：${pairs.length}`,
  `- 错误：${errors.length}`,
  '',
  '## 相似页面与分工',
  '',
  '| 页面 A | 页面 B | 类型 | 相似度 | 状态 | 页面分工 |',
  '| --- | --- | --- | ---: | --- | --- |',
  ...pairs.map(
    (pair) =>
      `| ${pair.routes[0]} | ${pair.routes[1]} | ${pair.class} | ${pair.similarity} | ${pair.boundaryStatus} | ${pair.distinction ?? '继续观察'} |`,
  ),
  '',
  '## 门禁结果',
  '',
  ...(errors.length
    ? errors.map((error) => `- ${error}`)
    : ['- 薄页、正文近重复与需复核的搜索意图边界均通过。']),
  '',
];

await mkdir(outputDir, { recursive: true });
await writeFile(
  path.join(outputDir, 'search-intent-audit.json'),
  `${JSON.stringify(report, null, 2)}\n`,
);
await writeFile(
  path.join(outputDir, 'search-intent-audit.md'),
  `${markdown.join('\n').trimEnd()}\n`,
);

console.log('# Search Intent and Duplication Audit');
console.log('');
console.log(`Indexable task pages: ${pages.length}`);
console.log(`Exact main-content duplicates: ${report.summary.exactDuplicates}`);
console.log(`Reviewed intent boundaries: ${report.summary.reviewedBoundaries}`);
console.log(`Dormant intent boundaries: ${report.summary.dormantBoundaries}`);
console.log(`Monitored pairs: ${pairs.length}`);
console.log(`Errors: ${errors.length}`);

if (errors.length) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Thin-page, near-duplicate, and search-intent boundary checks passed.');
