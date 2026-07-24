import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.resolve(
  process.env.SEARCH_METADATA_DIST_DIR ?? path.join(projectRoot, 'dist'),
);
const siteBase = new URL(process.env.PUBLIC_SITE_URL ?? 'https://dmvcn.com/');
const siteOrigin = siteBase.origin;
const siteRoot = `${siteOrigin}/`;
const organizationId = `${siteRoot}#organization`;
const websiteId = `${siteRoot}#website`;
const editorialAuthorUrl = `${siteOrigin}/authors/editorial-team/`;
const knownSchemaTypes = new Set([
  'Article',
  'Answer',
  'BreadcrumbList',
  'CollectionPage',
  'FAQPage',
  'ItemList',
  'LearningResource',
  'ListItem',
  'Organization',
  'ProfilePage',
  'Question',
  'WebSite',
  'WebPage',
]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(filePath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(filePath);
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

function extractAll(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

function extractOne(html, pattern) {
  return html.match(pattern)?.[1] ?? '';
}

function hasNoindex(html) {
  const robots = extractOne(
    html,
    /<meta\s+name="robots"\s+content="([^"]+)"/i,
  );
  return robots
    .toLowerCase()
    .split(',')
    .map((value) => value.trim())
    .includes('noindex');
}

function schemaTypes(schema) {
  const types = Array.isArray(schema?.['@type'])
    ? schema['@type']
    : [schema?.['@type']];
  return types.filter(Boolean);
}

function findSchemas(schemas, type) {
  return schemas.filter((schema) => schemaTypes(schema).includes(type));
}

function duplicateValues(rows, key) {
  const routesByValue = new Map();
  for (const row of rows) {
    const value = row[key];
    if (!value) continue;
    if (!routesByValue.has(value)) routesByValue.set(value, []);
    routesByValue.get(value).push(row.route);
  }
  return [...routesByValue.entries()].filter(([, routes]) => routes.length > 1);
}

function isInternalUrl(value) {
  try {
    return new URL(value).origin === siteOrigin;
  } catch {
    return false;
  }
}

function isAbsoluteHttps(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function isArticleContentRoute(route) {
  return (
    /^\/states\/[^/]+\/(?:real-id\/)?$/.test(route) ||
    /^\/topics\/[^/]+\/$/.test(route) ||
    /^\/practice-tests\/[^/]+\/$/.test(route)
  );
}

function validateListPositions(items, route, label, errors) {
  for (const [index, item] of items.entries()) {
    if (item?.position !== index + 1) {
      errors.push(`${route}: ${label} position ${item?.position ?? 'missing'} should be ${index + 1}.`);
    }
  }
}

let htmlFiles;
try {
  htmlFiles = await walk(distDir);
} catch {
  console.error('Missing build output. Run npm run build first.');
  process.exit(1);
}

const errors = [];
const rows = [];
const schemaCounts = new Map();
let jsonLdBlocks = 0;

for (const filePath of htmlFiles) {
  const html = await readFile(filePath, 'utf8');
  const route = routeForFile(filePath);
  const utility = route === '/404/';
  const titleTags = extractAll(html, /<title>([^<]+)<\/title>/g);
  const descriptions = extractAll(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/g,
  );
  const canonicals = extractAll(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/g,
  );
  const ogTitles = extractAll(
    html,
    /<meta\s+property="og:title"\s+content="([^"]+)"/g,
  );
  const ogDescriptions = extractAll(
    html,
    /<meta\s+property="og:description"\s+content="([^"]+)"/g,
  );
  const ogImages = extractAll(
    html,
    /<meta\s+property="og:image"\s+content="([^"]+)"/g,
  );
  const ogUrls = extractAll(
    html,
    /<meta\s+property="og:url"\s+content="([^"]+)"/g,
  );
  const ogSiteNames = extractAll(
    html,
    /<meta\s+property="og:site_name"\s+content="([^"]+)"/g,
  );
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  const noindex = hasNoindex(html);
  const expectedCanonical = `${siteOrigin}${route}`;

  const singleValueChecks = [
    ['title', titleTags],
    ['meta description', descriptions],
    ['canonical', canonicals],
    ['og:title', ogTitles],
    ['og:description', ogDescriptions],
    ['og:image', ogImages],
    ['og:url', ogUrls],
    ['og:site_name', ogSiteNames],
  ];
  for (const [label, values] of singleValueChecks) {
    if (values.length !== 1) {
      errors.push(`${route}: expected one ${label}, found ${values.length}.`);
    }
  }
  if (h1Count !== 1) errors.push(`${route}: expected one h1, found ${h1Count}.`);
  if (!/<html\s+lang="zh-Hans">/.test(html)) {
    errors.push(`${route}: html language must be zh-Hans.`);
  }
  if (utility && !noindex) errors.push('/404/: utility page must be noindex.');
  if (canonicals[0] !== expectedCanonical) {
    errors.push(`${route}: canonical ${canonicals[0] || 'missing'} should be ${expectedCanonical}.`);
  }
  if (ogUrls[0] !== canonicals[0]) errors.push(`${route}: og:url must match canonical.`);
  if (ogTitles[0] !== titleTags[0]) errors.push(`${route}: og:title must match title.`);
  if (ogDescriptions[0] !== descriptions[0]) {
    errors.push(`${route}: og:description must match meta description.`);
  }
  if (!isAbsoluteHttps(ogImages[0])) {
    errors.push(`${route}: og:image must be an absolute HTTPS URL.`);
  }
  if (ogSiteNames[0] !== 'DMV中文办事库') {
    errors.push(`${route}: og:site_name is missing or inconsistent.`);
  }
  if (titleTags[0]?.length < 10 || titleTags[0]?.length > 70) {
    errors.push(`${route}: title length ${titleTags[0]?.length ?? 0} is outside 10-70 characters.`);
  }
  if (!descriptions[0] || descriptions[0].length < 30) {
    errors.push(`${route}: meta description is too short.`);
  }
  if (!/<meta\s+name="twitter:card"\s+content="summary_large_image"/.test(html)) {
    errors.push(`${route}: missing summary_large_image Twitter card.`);
  }

  const rawSchemas = extractAll(
    html,
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  );
  const schemas = [];
  for (const [index, rawSchema] of rawSchemas.entries()) {
    try {
      const schema = JSON.parse(rawSchema);
      schemas.push(schema);
      jsonLdBlocks += 1;
      if (schema['@context'] !== 'https://schema.org') {
        errors.push(`${route}: JSON-LD block ${index + 1} has an invalid @context.`);
      }
      for (const type of schemaTypes(schema)) {
        schemaCounts.set(type, (schemaCounts.get(type) ?? 0) + 1);
        if (!knownSchemaTypes.has(type)) {
          errors.push(`${route}: JSON-LD block ${index + 1} uses unknown type ${type}.`);
        }
      }
    } catch (error) {
      errors.push(`${route}: JSON-LD block ${index + 1} is invalid JSON: ${error.message}`);
    }
  }
  if (rawSchemas.length === 0) errors.push(`${route}: missing JSON-LD.`);

  const organizations = findSchemas(schemas, 'Organization');
  const websites = findSchemas(schemas, 'WebSite');
  if (organizations.length !== 1) {
    errors.push(`${route}: expected one Organization schema, found ${organizations.length}.`);
  } else {
    const organization = organizations[0];
    if (
      organization['@id'] !== organizationId ||
      organization.url !== siteRoot ||
      organization.logo !== `${siteOrigin}/assets/dmvcn-mark.png`
    ) {
      errors.push(`${route}: Organization identity, URL, or logo is inconsistent.`);
    }
  }
  if (websites.length !== 1) {
    errors.push(`${route}: expected one WebSite schema, found ${websites.length}.`);
  } else if (
    websites[0]['@id'] !== websiteId ||
    websites[0].url !== siteRoot ||
    websites[0].publisher?.['@id'] !== organizationId
  ) {
    errors.push(`${route}: WebSite publisher or URL is inconsistent.`);
  }

  for (const webPage of findSchemas(schemas, 'WebPage')) {
    if (
      webPage.name?.length < 4 ||
      webPage.description !== descriptions[0] ||
      webPage.url !== canonicals[0] ||
      webPage.inLanguage !== 'zh-Hans' ||
      webPage.author?.url !== editorialAuthorUrl ||
      webPage.publisher?.['@id'] !== organizationId ||
      webPage.isPartOf?.['@id'] !== websiteId ||
      !/^\d{4}-\d{2}-\d{2}$/.test(webPage.datePublished ?? '') ||
      !/^\d{4}-\d{2}-\d{2}$/.test(webPage.dateModified ?? '') ||
      webPage.dateModified < webPage.datePublished
    ) {
      errors.push(`${route}: WebPage identity, language, or dates are inconsistent.`);
    }
  }

  const articles = findSchemas(schemas, 'Article');
  if (isArticleContentRoute(route) && articles.length !== 1) {
    errors.push(`${route}: expected one Article schema, found ${articles.length}.`);
  }
  for (const article of articles) {
    const publishedMeta = extractOne(
      html,
      /<meta\s+property="article:published_time"\s+content="([^"]+)"/,
    );
    const modifiedMeta = extractOne(
      html,
      /<meta\s+property="article:modified_time"\s+content="([^"]+)"/,
    );
    if (
      article.description !== descriptions[0] ||
      article.mainEntityOfPage !== canonicals[0] ||
      article.datePublished !== publishedMeta ||
      article.dateModified !== modifiedMeta
    ) {
      errors.push(`${route}: Article description, URL, or dates do not match page metadata.`);
    }
    if (
      article.inLanguage !== 'zh-Hans' ||
      article.isAccessibleForFree !== true ||
      article.author?.url !== editorialAuthorUrl ||
      article.publisher?.url !== siteRoot ||
      article.publisher?.logo !== `${siteOrigin}/assets/dmvcn-mark.png`
    ) {
      errors.push(`${route}: Article language, access, author, or publisher is inconsistent.`);
    }
    if (
      !Array.isArray(article.citation) ||
      article.citation.length === 0 ||
      article.citation.some((url) => !isAbsoluteHttps(url))
    ) {
      errors.push(`${route}: Article must carry at least one absolute HTTPS citation.`);
    }
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(article.datePublished ?? '') ||
      !/^\d{4}-\d{2}-\d{2}$/.test(article.dateModified ?? '') ||
      article.dateModified < article.datePublished
    ) {
      errors.push(`${route}: Article publication and modification dates are invalid.`);
    }
  }

  for (const faq of findSchemas(schemas, 'FAQPage')) {
    const questions = faq.mainEntity;
    if (!Array.isArray(questions) || questions.length === 0) {
      errors.push(`${route}: FAQPage has no questions.`);
      continue;
    }
    const names = new Set();
    for (const question of questions) {
      const name = String(question?.name ?? '').trim();
      const answer = String(question?.acceptedAnswer?.text ?? '').trim();
      if (
        question?.['@type'] !== 'Question' ||
        question?.acceptedAnswer?.['@type'] !== 'Answer' ||
        name.length < 4 ||
        answer.length < 10
      ) {
        errors.push(`${route}: FAQPage contains an incomplete question or answer.`);
      }
      if (names.has(name)) errors.push(`${route}: FAQPage repeats question "${name}".`);
      names.add(name);
    }
  }

  const breadcrumbs = findSchemas(schemas, 'BreadcrumbList');
  if (isArticleContentRoute(route) && breadcrumbs.length !== 1) {
    errors.push(`${route}: expected one BreadcrumbList, found ${breadcrumbs.length}.`);
  }
  for (const breadcrumb of breadcrumbs) {
    const items = breadcrumb.itemListElement;
    if (!Array.isArray(items) || items.length < 2) {
      errors.push(`${route}: BreadcrumbList has fewer than two items.`);
      continue;
    }
    validateListPositions(items, route, 'breadcrumb', errors);
    if (
      items.some((item) => !isInternalUrl(item?.item)) ||
      items.at(-1)?.item !== canonicals[0]
    ) {
      errors.push(`${route}: BreadcrumbList contains an external URL or wrong final item.`);
    }
  }

  for (const collection of findSchemas(schemas, 'CollectionPage')) {
    const list = collection.mainEntity;
    const items = list?.itemListElement;
    if (
      collection.inLanguage !== 'zh-Hans' ||
      list?.['@type'] !== 'ItemList' ||
      !Array.isArray(items) ||
      items.length === 0 ||
      list.numberOfItems !== items.length
    ) {
      errors.push(`${route}: CollectionPage ItemList is incomplete or inconsistent.`);
      continue;
    }
    validateListPositions(items, route, 'collection item', errors);
    if (items.some((item) => !isInternalUrl(item?.url))) {
      errors.push(`${route}: CollectionPage includes an external item URL.`);
    }
  }

  rows.push({
    route,
    utility,
    noindex,
    title: titleTags[0] ?? '',
    description: descriptions[0] ?? '',
    canonical: canonicals[0] ?? '',
  });
}

const indexableRows = rows.filter((row) => !row.utility && !row.noindex);
for (const [label, key] of [
  ['title', 'title'],
  ['meta description', 'description'],
  ['canonical', 'canonical'],
]) {
  for (const [value, routes] of duplicateValues(indexableRows, key)) {
    errors.push(`Duplicate ${label} across ${routes.join(', ')}: ${value}`);
  }
}

let sitemapUrls = [];
try {
  const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
  sitemapUrls = extractAll(
    sitemap,
    /<loc>(https?:\/\/[^<]+)<\/loc>/g,
  );
} catch {
  errors.push('Missing sitemap.xml.');
}
const sitemapSet = new Set(sitemapUrls);
const canonicalSet = new Set(indexableRows.map((row) => row.canonical));
if (sitemapSet.size !== sitemapUrls.length) {
  errors.push('Sitemap contains duplicate URLs.');
}
if (canonicalSet.size !== indexableRows.length) {
  errors.push('Indexable pages contain duplicate canonical URLs.');
}
for (const url of sitemapSet) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    errors.push(`Sitemap contains invalid URL: ${url}`);
    continue;
  }
  if (
    parsed.origin !== siteOrigin ||
    parsed.search ||
    parsed.hash ||
    !canonicalSet.has(url)
  ) {
    errors.push(`Sitemap URL is outside the canonical indexable set: ${url}`);
  }
}
for (const canonical of canonicalSet) {
  if (!sitemapSet.has(canonical)) {
    errors.push(`Sitemap is missing indexable canonical: ${canonical}`);
  }
}

console.log('# Search Metadata Contract');
console.log('');
console.log(`HTML pages: ${rows.length}`);
console.log(`Indexable pages: ${indexableRows.length}`);
console.log(`Noindex pages: ${rows.filter((row) => row.noindex && !row.utility).length}`);
console.log(`Utility pages: ${rows.filter((row) => row.utility).length}`);
console.log(`Unique titles / descriptions / canonicals: ${new Set(indexableRows.map((row) => row.title)).size} / ${new Set(indexableRows.map((row) => row.description)).size} / ${canonicalSet.size}`);
console.log(`Sitemap URLs: ${sitemapSet.size}`);
console.log(`JSON-LD blocks: ${jsonLdBlocks}`);
console.log(
  `Schema types: ${[...schemaCounts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([type, count]) => `${type}=${count}`)
    .join(', ')}`,
);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Search metadata contract passed.');
