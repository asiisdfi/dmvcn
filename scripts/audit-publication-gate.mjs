import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  HUMAN_REVIEW_REQUIRED_ROUTES,
  NON_SEARCH_LANDING_ROUTES,
  isRouteIndexable,
} from '../src/data/publication-gate.ts';

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

function hasNoindex(html) {
  const content = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? '';
  return content.toLowerCase().split(',').map((item) => item.trim()).includes('noindex');
}

const htmlFiles = await collectHtmlFiles(distDir);
const htmlByRoute = new Map();
for (const file of htmlFiles) htmlByRoute.set(routeFromFile(file), await readFile(file, 'utf8'));

const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname),
);

let publishedContentPages = 0;
let hiddenUtilityPages = 0;
for (const [route, html] of htmlByRoute) {
  const noindex = hasNoindex(html);
  if (route === '/404/') {
    if (!noindex) errors.push('/404/: expected noindex');
    continue;
  }

  const expectedIndexable = isRouteIndexable(route);
  const inSitemap = sitemapRoutes.has(route);
  if (noindex === expectedIndexable) {
    errors.push(`${route}: robots directive does not match publication policy`);
  }
  if (inSitemap !== expectedIndexable) {
    errors.push(`${route}: sitemap membership does not match publication policy`);
  }
  if (expectedIndexable) publishedContentPages += 1;
  else hiddenUtilityPages += 1;
}

for (const route of HUMAN_REVIEW_REQUIRED_ROUTES) {
  if (!htmlByRoute.has(route)) errors.push(`${route}: content page has no built HTML`);
  if (!isRouteIndexable(route)) errors.push(`${route}: content page must remain publishable`);
}

for (const route of NON_SEARCH_LANDING_ROUTES) {
  if (!htmlByRoute.has(route)) errors.push(`${route}: utility page has no built HTML`);
  if (sitemapRoutes.has(route)) errors.push(`${route}: hidden utility page is present in sitemap`);
}

console.log('# Publication Audit');
console.log('');
console.log(`Published HTML pages: ${publishedContentPages}`);
console.log(`Published high-risk content pages: ${HUMAN_REVIEW_REQUIRED_ROUTES.size}`);
console.log(`Hidden utility pages: ${hiddenUtilityPages}`);
console.log(`Sitemap URLs: ${sitemapRoutes.size}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Publication audit passed.');
}
