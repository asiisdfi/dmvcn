import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { getPublicationGate } from '../src/data/publication-gate.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.resolve(
  process.env.INTERNAL_LINK_DIST_DIR ?? path.join(projectRoot, 'dist'),
);
const routingReviewPath = path.resolve(
  process.env.INTERNAL_LINK_ROUTING_REVIEW_PATH ??
    path.join(projectRoot, 'reports', 'search-console-routing-reviews.json'),
);
const siteOrigin = new URL(process.env.PUBLIC_SITE_URL ?? 'https://dmvcn.com/').origin;
const footerUtilityRoutes = new Set(['/contact/', '/privacy/', '/terms/']);
const errors = [];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(entryPath));
    if (entry.isFile()) files.push(entryPath);
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
  return new Map((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  if (['script', 'style', 'svg'].includes(node.tagName)) return '';
  return (node.childNodes ?? []).map(textContent).join(' ');
}

function descendantImageAlt(node) {
  if (node.tagName === 'img') return attributes(node).get('alt') ?? '';
  for (const child of node.childNodes ?? []) {
    const alt = descendantImageAlt(child);
    if (alt) return alt;
  }
  return '';
}

function normalizeAccessibleText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function anchorName(node, attrs) {
  const candidates = [
    attrs.get('aria-label') ?? '',
    textContent(node),
    descendantImageAlt(node),
  ];
  return candidates.map(normalizeAccessibleText).find(Boolean) ?? '';
}

function robotsDirectives(value) {
  return new Set(
    value
      .toLowerCase()
      .split(',')
      .flatMap((part) => part.trim().split(/\s+/))
      .filter(Boolean),
  );
}

function normalizePathname(pathname) {
  if (pathname === '/') return '/';
  if (path.posix.extname(pathname)) return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function normalizeReviewRoute(value) {
  const route = String(value ?? '').trim();
  if (!route.startsWith('/')) return '';
  return normalizePathname(route.replace(/\/{2,}/g, '/'));
}

function resolveInternalRoute(href, sourceRoute) {
  if (!href || href.startsWith('//')) return null;

  let url;
  try {
    url = new URL(href, `${siteOrigin}${sourceRoute}`);
  } catch {
    return null;
  }

  if (url.origin !== siteOrigin || !['http:', 'https:'].includes(url.protocol)) return null;
  return normalizePathname(url.pathname);
}

function isContentDetailRoute(route) {
  return (
    /^\/states\/[^/]+\/(?:real-id\/)?$/.test(route) ||
    /^\/topics\/[^/]+\/$/.test(route) ||
    /^\/practice-tests\/[^/]+\/$/.test(route)
  );
}

function mapSetAdd(map, key, value) {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(value);
}

function breadthFirstDepths(start, edges) {
  const depths = new Map([[start, 0]]);
  const queue = [start];

  while (queue.length) {
    const source = queue.shift();
    const nextDepth = depths.get(source) + 1;
    for (const target of edges.get(source) ?? []) {
      if (depths.has(target)) continue;
      depths.set(target, nextDepth);
      queue.push(target);
    }
  }

  return depths;
}

let htmlFiles;
try {
  htmlFiles = (await collectFiles(distDir)).filter((file) => file.endsWith('.html'));
} catch {
  console.error('Missing build output. Run npm run build first.');
  process.exit(1);
}

const documents = new Map();

for (const filePath of htmlFiles) {
  const html = await readFile(filePath, 'utf8');
  const route = routeForFile(filePath);
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const document = {
    route,
    filePath,
    links: [],
    canonical: '',
    robots: new Set(),
  };

  function walk(node, landmark = 'other') {
    let currentLandmark = landmark;
    if (node.tagName === 'header') currentLandmark = 'header';
    if (node.tagName === 'main') currentLandmark = 'main';
    if (node.tagName === 'footer') currentLandmark = 'footer';

    if (node.tagName) {
      const attrs = attributes(node);
      if (node.tagName === 'link') {
        const rel = new Set((attrs.get('rel') ?? '').toLowerCase().split(/\s+/));
        if (rel.has('canonical')) document.canonical = attrs.get('href') ?? '';
      }
      if (node.tagName === 'meta' && (attrs.get('name') ?? '').toLowerCase() === 'robots') {
        document.robots = robotsDirectives(attrs.get('content') ?? '');
      }
      if (node.tagName === 'a' && attrs.has('href')) {
        document.links.push({
          href: attrs.get('href').trim(),
          landmark: currentLandmark,
          name: anchorName(node, attrs),
          rel: new Set((attrs.get('rel') ?? '').toLowerCase().split(/\s+/).filter(Boolean)),
          line: node.sourceCodeLocation?.startLine ?? '?',
        });
      }
    }

    for (const child of node.childNodes ?? []) walk(child, currentLandmark);
    if (node.content) walk(node.content, currentLandmark);
  }

  walk(tree);
  documents.set(route, document);
}

const routeSet = new Set(documents.keys());
const indexableRoutes = new Set(
  [...documents.values()]
    .filter((document) => document.route !== '/404/' && !document.robots.has('noindex'))
    .map((document) => document.route),
);
const noindexRoutes = new Set(
  [...documents.values()]
    .filter((document) => document.route !== '/404/' && document.robots.has('noindex'))
    .map((document) => document.route),
);
const allEdges = new Map();
const mainEdges = new Map();
const allInbound = new Map();
const mainInbound = new Map();
const uniqueAllEdges = new Set();
const uniqueMainEdges = new Set();
const noindexMainSources = new Map();

for (const document of documents.values()) {
  for (const link of document.links) {
    if (link.href.startsWith('#')) continue;
    const target = resolveInternalRoute(link.href, document.route);
    if (!target) continue;

    const label = `${document.route}:${link.line}`;
    if (!link.name) errors.push(`${label}: internal link to ${target} has no accessible name.`);
    if (link.rel.has('nofollow')) {
      errors.push(`${label}: internal link to ${target} must not use rel="nofollow".`);
    }
    if (!routeSet.has(target)) {
      errors.push(`${label}: internal link target does not exist in the build: ${target}.`);
      continue;
    }
    if (target === '/404/') {
      errors.push(`${label}: page links directly to the 404 route.`);
      continue;
    }

    mapSetAdd(allEdges, document.route, target);
    mapSetAdd(allInbound, target, document.route);
    uniqueAllEdges.add(`${document.route}\t${target}`);

    if (link.landmark === 'main') {
      mapSetAdd(mainEdges, document.route, target);
      mapSetAdd(mainInbound, target, document.route);
      uniqueMainEdges.add(`${document.route}\t${target}`);
      if (noindexRoutes.has(target)) mapSetAdd(noindexMainSources, target, document.route);
    }

    if (link.landmark === 'header' && noindexRoutes.has(target)) {
      errors.push(`${label}: noindex route ${target} must not appear in the primary header.`);
    }
  }
}

let routingReviews = [];
try {
  routingReviews = JSON.parse(await readFile(routingReviewPath, 'utf8'));
  if (!Array.isArray(routingReviews)) {
    errors.push('Search Console routing review log must be a JSON array.');
    routingReviews = [];
  }
} catch {
  errors.push(`Search Console routing review log is missing or invalid: ${routingReviewPath}.`);
}

let implementedRoutingLinks = 0;
let passingImplementedRoutingLinks = 0;
let pendingRoutingLinks = 0;
for (const review of routingReviews) {
  if (review?.action !== 'intent-links') continue;
  const reviewId = String(review?.id ?? 'unknown routing review');
  const sourceRoutes = new Set((review.routes ?? []).map(normalizeReviewRoute));
  const targetRoutes = new Set((review.targetRoutes ?? []).map(normalizeReviewRoute));
  const changedRoutes = new Set((review.changedRoutes ?? []).map(normalizeReviewRoute));
  const expectedLinks = Array.isArray(review.expectedLinks)
    ? review.expectedLinks.map((link) => ({
        from: normalizeReviewRoute(link?.from),
        to: normalizeReviewRoute(link?.to),
      }))
    : [];

  if (!expectedLinks.length) {
    errors.push(`${reviewId}: intent-links routing review has no expectedLinks contract.`);
    continue;
  }

  const seenExpectedLinks = new Set();
  for (const link of expectedLinks) {
    const key = `${link.from}\t${link.to}`;
    if (
      !link.from.startsWith('/') ||
      !link.to.startsWith('/') ||
      !sourceRoutes.has(link.from) ||
      !targetRoutes.has(link.to)
    ) {
      errors.push(`${reviewId}: invalid expected routing link ${link.from} -> ${link.to}.`);
      continue;
    }
    if (seenExpectedLinks.has(key)) {
      errors.push(`${reviewId}: duplicate expected routing link ${link.from} -> ${link.to}.`);
      continue;
    }
    seenExpectedLinks.add(key);

    if (!review.implementedAt) {
      pendingRoutingLinks += 1;
      continue;
    }

    implementedRoutingLinks += 1;
    if (!changedRoutes.has(link.from)) {
      errors.push(`${reviewId}: implemented link source is absent from changedRoutes: ${link.from}.`);
    }
    if (!mainEdges.get(link.from)?.has(link.to)) {
      errors.push(
        `${reviewId}: implemented routing link is missing from main content: ${link.from} -> ${link.to}.`,
      );
      continue;
    }
    passingImplementedRoutingLinks += 1;
  }
}

for (const route of indexableRoutes) {
  if (route !== '/' && !(allInbound.get(route)?.size)) {
    errors.push(`${route}: indexable page has no internal inbound link.`);
  }
}

const allDepths = breadthFirstDepths('/', allEdges);
const mainDepths = breadthFirstDepths('/', mainEdges);

for (const route of indexableRoutes) {
  if (!allDepths.has(route)) {
    errors.push(`${route}: indexable page is not reachable from the homepage.`);
  } else if (allDepths.get(route) > 2) {
    errors.push(`${route}: indexable page click depth is ${allDepths.get(route)}; maximum is 2.`);
  }

  if (!footerUtilityRoutes.has(route) && !mainDepths.has(route)) {
    errors.push(`${route}: indexable page is not reachable through main-content links.`);
  }
  if (route !== '/' && !footerUtilityRoutes.has(route) && !(mainInbound.get(route)?.size)) {
    errors.push(`${route}: indexable page has no main-content inbound link.`);
  }
}

for (const route of footerUtilityRoutes) {
  if (!indexableRoutes.has(route)) {
    errors.push(`${route}: expected indexable footer utility page is missing.`);
  } else if (!(allInbound.get(route)?.size)) {
    errors.push(`${route}: footer utility page has no internal inbound link.`);
  }
}

const contentDetailRoutes = [...indexableRoutes].filter(isContentDetailRoute).sort();
for (const route of contentDetailRoutes) {
  const sourceCount = mainInbound.get(route)?.size ?? 0;
  if (sourceCount < 2) {
    errors.push(`${route}: content detail page has ${sourceCount} main-content inbound source(s); minimum is 2.`);
  }
}

const expectedNoindexRoutes = new Set(
  [...documents.keys()].filter(
    (route) =>
      route !== '/404/' &&
      !getPublicationGate(route).indexable,
  ),
);
for (const route of noindexRoutes) {
  if (!expectedNoindexRoutes.has(route)) {
    errors.push(`${route}: rendered noindex state does not match the publication gate.`);
  }
}
for (const route of expectedNoindexRoutes) {
  const document = documents.get(route);
  if (!document) {
    errors.push(`${route}: registered noindex route is missing from the build.`);
    continue;
  }
  if (!noindexRoutes.has(route)) {
    errors.push(`${route}: registered noindex route is missing the noindex directive.`);
  }
  if (!document.robots.has('follow')) {
    errors.push(`${route}: noindex route must explicitly use follow.`);
  }
  if (document.canonical !== `${siteOrigin}${route}`) {
    errors.push(`${route}: noindex canonical must be self-referencing.`);
  }
}

let sitemapRoutes = new Set();
try {
  const sitemap = await readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
  sitemapRoutes = new Set(
    [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
      try {
        return normalizePathname(new URL(match[1]).pathname);
      } catch {
        return '';
      }
    }),
  );
} catch {
  errors.push('sitemap.xml is missing from the build.');
}

for (const route of noindexRoutes) {
  if (sitemapRoutes.has(route)) errors.push(`${route}: noindex route must not appear in sitemap.xml.`);
}

const reachableIndexable = [...indexableRoutes].filter((route) => allDepths.has(route));
const mainReachableIndexable = [...indexableRoutes].filter((route) => mainDepths.has(route));
const maxDepth = Math.max(...reachableIndexable.map((route) => allDepths.get(route)), 0);
const contentDetailPassing = contentDetailRoutes.filter(
  (route) => (mainInbound.get(route)?.size ?? 0) >= 2,
);
const zeroMainInbound = [...indexableRoutes]
  .filter((route) => route !== '/' && !(mainInbound.get(route)?.size))
  .sort();

console.log('# Internal Link Architecture Audit');
console.log('');
console.log(`HTML pages: ${documents.size}`);
console.log(`Indexable pages: ${indexableRoutes.size}`);
console.log(`Publication-gated noindex pages: ${noindexRoutes.size}`);
console.log(`Indexable pages reachable from home: ${reachableIndexable.length}/${indexableRoutes.size}`);
console.log(`Maximum indexable click depth: ${maxDepth}`);
console.log(`Indexable pages reachable through main content: ${mainReachableIndexable.length}/${indexableRoutes.size}`);
console.log(`Content detail pages with 2+ main-content sources: ${contentDetailPassing.length}/${contentDetailRoutes.length}`);
console.log(`Unique internal page edges: ${uniqueAllEdges.size}`);
console.log(`Unique main-content page edges: ${uniqueMainEdges.size}`);
console.log(
  `Implemented Search Console routing links: ${passingImplementedRoutingLinks}/${implementedRoutingLinks}; pending: ${pendingRoutingLinks}`,
);
console.log(`Indexable pages with zero main-content inbound links: ${zeroMainInbound.join(', ') || 'none'}`);
console.log('');
console.log('Noindex pages linked from main content:');
for (const route of [...noindexRoutes].sort()) {
  console.log(`- ${route}: ${noindexMainSources.get(route)?.size ?? 0} source page(s)`);
}
console.log('');
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Internal reachability, click depth, contextual support, noindex isolation, and accessible link checks passed.');
}
