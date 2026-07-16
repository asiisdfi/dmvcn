import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { states } from '../src/data/content.ts';
import {
  evaluateDirectoryEvidence,
  isPublishableDirectoryClaim,
} from '../src/data/directory-evidence.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const reportDir = path.join(projectRoot, 'reports');
const pages = [
  'costs-timing',
  'deadlines',
  'document-rules',
  'foreign-license',
  'identity-ssn',
];
const minimumCoverage = {
  'costs-timing': { claims: 20, states: 10 },
  deadlines: { claims: 20, states: 10 },
  'document-rules': { claims: 50, states: 25 },
  'foreign-license': { claims: 25, states: 15 },
  'identity-ssn': { claims: 40, states: 20 },
};

const stateById = new Map(states.map((state) => [state.id, state]));
const errors = [];
const records = [];

function attrs(node) {
  return new Map((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
}

function classes(node) {
  return new Set((attrs(node).get('class') ?? '').split(/\s+/).filter(Boolean));
}

function text(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(text).join('');
}

function descendants(node, predicate) {
  const matches = [];

  function walk(current) {
    if (predicate(current)) matches.push(current);
    for (const child of current.childNodes ?? []) walk(child);
    if (current.content) walk(current.content);
  }

  walk(node);
  return matches;
}

function officialUrlsFor(state) {
  return new Set([
    state.agencyUrl,
    ...state.sources.map((source) => source.url),
    ...state.actionLinks.map((link) => link.url),
  ]);
}

function evidenceContextFor(state, href) {
  const source = state.sources.find((item) => item.url === href);
  const action = state.actionLinks.find((item) => item.url === href);
  return [
    source?.label,
    source?.note,
    action?.label,
    action?.description,
    href,
  ]
    .filter(Boolean)
    .join(' ');
}

function inspectArticle(page, article) {
  const stateLink = descendants(
    article,
    (node) => node.tagName === 'a' && classes(node).has('directory-state'),
  )[0];
  const stateId = attrs(stateLink ?? {}).get('href')?.match(/^\/states\/([^/]+)\/$/)?.[1];
  const state = stateId ? stateById.get(stateId) : undefined;
  const items = descendants(article, (node) => classes(node).has('directory-evidence-item'));

  if (!state) {
    errors.push(`${page}: directory row has no valid state link`);
    return;
  }

  const officialUrls = officialUrlsFor(state);

  for (const item of items) {
    const claimNode = descendants(item, (node) => node.tagName === 'p')[0];
    const categoryNode = descendants(claimNode ?? {}, (node) => node.tagName === 'span')[0];
    const links = descendants(item, (node) => classes(node).has('directory-evidence-link'));
    const category = text(categoryNode ?? {}).replace(/\s+/g, ' ').trim();
    const fullClaim = text(claimNode ?? {}).replace(/\s+/g, ' ').trim();
    const claim = category && fullClaim.startsWith(category)
      ? fullClaim.slice(category.length).trim()
      : fullClaim;
    const link = links[0];
    const href = attrs(link ?? {}).get('href') ?? '';
    const source = `${text(link ?? {}).replace(/\s+/g, ' ').trim()} ${evidenceContextFor(state, href)}`;
    const semantic = evaluateDirectoryEvidence(claim, source, state);

    if (!claim) errors.push(`${page}/${stateId}: evidence item has no claim text`);
    if (links.length !== 1) {
      errors.push(`${page}/${stateId}: claim must have exactly one official source: ${claim}`);
    }
    if (!officialUrls.has(href)) {
      errors.push(`${page}/${stateId}: evidence URL is not registered in state sources: ${href}`);
    }
    if (/[；;]/.test(claim)) {
      errors.push(`${page}/${stateId}: compound claim must be split before publication: ${claim}`);
    }
    if (!isPublishableDirectoryClaim(claim)) {
      errors.push(`${page}/${stateId}: editorial meta-language must not be published: ${claim}`);
    }
    if (!semantic.themes.length && !semantic.explicitSourceAttribution) {
      errors.push(`${page}/${stateId}: claim has no auditable semantic theme: ${claim}`);
    }
    for (const theme of semantic.failedThemes) {
      errors.push(`${page}/${stateId}: ${theme} claim does not match source ${href}: ${claim}`);
    }

    records.push({
      page,
      stateId,
      category,
      claim,
      sourceUrl: href,
      sourceLabel: text(link ?? {}).replace(/\s+/g, ' ').trim(),
      themes: semantic.themes,
      failedThemes: semantic.failedThemes,
      explicitSourceAttribution: semantic.explicitSourceAttribution,
    });
  }
}

for (const page of pages) {
  const htmlPath = path.join(distDir, 'directories', page, 'index.html');
  let html;

  try {
    html = await readFile(htmlPath, 'utf8');
  } catch {
    errors.push(`${page}: built HTML is missing; run npm run build first`);
    continue;
  }

  const tree = parse(html);
  const articles = descendants(
    tree,
    (node) => node.tagName === 'article' && classes(node).has('directory-row'),
  );

  if (articles.length !== states.length) {
    errors.push(`${page}: expected ${states.length} state rows, found ${articles.length}`);
  }

  for (const article of articles) inspectArticle(page, article);
}

const coverage = Object.fromEntries(
  pages.map((page) => {
    const pageRecords = records.filter((record) => record.page === page);
    return [
      page,
      {
        claims: pageRecords.length,
        states: new Set(pageRecords.map((record) => record.stateId)).size,
      },
    ];
  }),
);

for (const page of pages) {
  const actual = coverage[page];
  const minimum = minimumCoverage[page];
  if (actual.claims < minimum.claims) {
    errors.push(`${page}: only ${actual.claims} mapped claims; minimum is ${minimum.claims}`);
  }
  if (actual.states < minimum.states) {
    errors.push(`${page}: only ${actual.states} states with mapped claims; minimum is ${minimum.states}`);
  }
}

const summary = {
  generatedAt: new Date().toISOString(),
  pages: pages.length,
  claims: records.length,
  statesCovered: new Set(records.map((record) => record.stateId)).size,
  errors: errors.length,
  coverage,
};

await mkdir(reportDir, { recursive: true });
await writeFile(
  path.join(reportDir, 'directory-evidence-audit.json'),
  `${JSON.stringify({ summary, errors, records }, null, 2)}\n`,
);

console.log('# Directory Evidence Audit');
console.log('');
console.log(`Pages: ${summary.pages}`);
console.log(`Claims: ${summary.claims}`);
console.log(`States with mapped claims: ${summary.statesCovered}`);
console.log(`Errors: ${summary.errors}`);
for (const page of pages) {
  console.log(`${page}: ${coverage[page].claims} claims across ${coverage[page].states} states`);
}
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Every published directory claim has one registered, semantically matched official source.');
}
