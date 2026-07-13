import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const internalOrigin = 'https://internal.invalid';
const errors = [];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function toRelative(filePath) {
  return path.relative(distDir, filePath).split(path.sep).join('/');
}

function htmlPathToRoute(relativePath) {
  if (relativePath === 'index.html') return '/';
  if (relativePath === '404.html') return '/404/';
  if (relativePath.endsWith('/index.html')) return `/${relativePath.slice(0, -'index.html'.length)}`;
  return `/${relativePath}`;
}

function attributes(node) {
  return new Map((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
}

function locationLabel(document, node) {
  const line = node.sourceCodeLocation?.startLine;
  return line ? `${document.relativePath}:${line}` : document.relativePath;
}

function walk(node, visit) {
  visit(node);
  for (const child of node.childNodes ?? []) walk(child, visit);
  if (node.content) walk(node.content, visit);
}

function isLocalReference(value) {
  if (!value || value.startsWith('//')) return false;
  return !/^[a-z][a-z\d+.-]*:/i.test(value);
}

function decodeUrlPart(value, label) {
  try {
    return decodeURIComponent(value);
  } catch {
    errors.push(`${label}: invalid URL encoding in ${value}`);
    return value;
  }
}

function resolveBuiltFile(pathname, fileSet) {
  const decodedPath = decodeUrlPart(pathname, pathname);
  const normalizedPath = path.posix.normalize(decodedPath);
  if (!normalizedPath.startsWith('/') || normalizedPath.startsWith('/../')) return '';

  const relativePath = normalizedPath.slice(1);
  const candidates = [];
  if (!relativePath) {
    candidates.push('index.html');
  } else if (normalizedPath.endsWith('/')) {
    candidates.push(`${relativePath}index.html`);
  } else {
    candidates.push(relativePath);
    if (!path.posix.extname(relativePath)) candidates.push(`${relativePath}/index.html`);
  }

  return candidates.find((candidate) => fileSet.has(candidate)) ?? '';
}

const files = await collectFiles(distDir);
const relativeFiles = files.map(toRelative).sort();
const fileSet = new Set(relativeFiles);
const htmlFiles = relativeFiles.filter((file) => file.endsWith('.html'));
const documents = new Map();

for (const relativePath of htmlFiles) {
  const html = await readFile(path.join(distDir, relativePath), 'utf8');
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const document = {
    relativePath,
    route: htmlPathToRoute(relativePath),
    ids: new Map(),
    references: [],
    idReferences: [],
    navigationTargets: new Set(),
    canonicalUrls: [],
    ogImages: [],
    jsonLdItems: [],
    h1Count: 0,
    mainCount: 0,
    imageCount: 0,
  };

  walk(tree, (node) => {
    if (!node.tagName) return;
    const attrs = attributes(node);
    const label = locationLabel(document, node);
    const id = attrs.get('id');

    if (id) {
      if (document.ids.has(id)) {
        errors.push(`${label}: duplicate id="${id}"; first declared at line ${document.ids.get(id)}`);
      } else {
        document.ids.set(id, node.sourceCodeLocation?.startLine ?? '?');
      }
    }

    if (node.tagName === 'h1') document.h1Count += 1;
    if (node.tagName === 'main') document.mainCount += 1;

    if (node.tagName === 'a' && attrs.has('href')) {
      document.references.push({ value: attrs.get('href'), kind: 'navigation', label });
    }
    if (node.tagName === 'form' && attrs.has('action')) {
      document.references.push({ value: attrs.get('action'), kind: 'navigation', label });
    }
    if (node.tagName === 'link' && attrs.has('href')) {
      const rel = (attrs.get('rel') ?? '').toLowerCase().split(/\s+/);
      if (rel.includes('canonical')) {
        document.canonicalUrls.push({ value: attrs.get('href'), label });
      } else if (!rel.includes('alternate')) {
        document.references.push({ value: attrs.get('href'), kind: 'resource', label });
      }
    }

    if (node.tagName === 'meta' && attrs.get('property') === 'og:image' && attrs.has('content')) {
      document.ogImages.push({ value: attrs.get('content'), label });
    }

    if (node.tagName === 'script' && attrs.get('type') === 'application/ld+json') {
      const source = (node.childNodes ?? []).map((child) => child.value ?? '').join('');
      try {
        document.jsonLdItems.push(JSON.parse(source));
      } catch {
        errors.push(`${label}: invalid JSON-LD`);
      }
    }

    const resourceAttributes = [
      ['img', 'src'],
      ['script', 'src'],
      ['source', 'src'],
      ['video', 'src'],
      ['video', 'poster'],
      ['audio', 'src'],
      ['iframe', 'src'],
      ['object', 'data'],
    ];
    for (const [tagName, attributeName] of resourceAttributes) {
      if (node.tagName === tagName && attrs.has(attributeName)) {
        document.references.push({ value: attrs.get(attributeName), kind: 'resource', label });
      }
    }

    for (const attributeName of ['srcset', 'imagesrcset']) {
      if (!attrs.has(attributeName)) continue;
      for (const candidate of attrs.get(attributeName).split(',')) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value) document.references.push({ value, kind: 'resource', label });
      }
    }

    if (node.tagName === 'img') {
      document.imageCount += 1;
      if (!attrs.has('alt')) errors.push(`${label}: image is missing an alt attribute`);
      if (!attrs.has('width') || !attrs.has('height')) {
        errors.push(`${label}: image is missing explicit width and height attributes`);
      }
    }

    const singleIdReferences = [
      ['label', 'for'],
      ['input', 'list'],
    ];
    for (const [tagName, attributeName] of singleIdReferences) {
      if (node.tagName === tagName && attrs.has(attributeName)) {
        document.idReferences.push({ id: attrs.get(attributeName), attributeName, label });
      }
    }

    for (const attributeName of ['aria-labelledby', 'aria-describedby', 'aria-controls', 'headers']) {
      if (!attrs.has(attributeName)) continue;
      for (const referencedId of attrs.get(attributeName).trim().split(/\s+/)) {
        if (referencedId) document.idReferences.push({ id: referencedId, attributeName, label });
      }
    }
  });

  if (document.h1Count !== 1) errors.push(`${relativePath}: expected exactly one h1, found ${document.h1Count}`);
  if (document.mainCount !== 1) errors.push(`${relativePath}: expected exactly one main element, found ${document.mainCount}`);

  if (document.canonicalUrls.length !== 1) {
    errors.push(`${relativePath}: expected exactly one canonical URL, found ${document.canonicalUrls.length}`);
  } else {
    const canonicalReference = document.canonicalUrls[0];
    try {
      const canonical = new URL(canonicalReference.value);
      document.canonicalUrl = canonical;
      if (canonical.pathname !== document.route || canonical.search || canonical.hash) {
        errors.push(`${canonicalReference.label}: canonical path ${canonical.pathname} does not match route ${document.route}`);
      }
    } catch {
      errors.push(`${canonicalReference.label}: invalid canonical URL ${canonicalReference.value}`);
    }
  }

  if (document.ogImages.length !== 1) {
    errors.push(`${relativePath}: expected exactly one og:image, found ${document.ogImages.length}`);
  } else {
    const imageReference = document.ogImages[0];
    try {
      const imageUrl = new URL(imageReference.value);
      if (document.canonicalUrl && imageUrl.origin !== document.canonicalUrl.origin) {
        errors.push(`${imageReference.label}: og:image origin does not match the canonical origin`);
      }
      if (!resolveBuiltFile(imageUrl.pathname, fileSet)) {
        errors.push(`${imageReference.label}: og:image file does not exist: ${imageUrl.pathname}`);
      }
    } catch {
      errors.push(`${imageReference.label}: invalid og:image URL ${imageReference.value}`);
    }
  }

  const websiteSchema = document.jsonLdItems.find((item) => item?.['@type'] === 'WebSite');
  if (!websiteSchema) {
    errors.push(`${relativePath}: missing parseable WebSite JSON-LD`);
  } else if (document.canonicalUrl) {
    try {
      const schemaUrl = new URL(websiteSchema.url);
      if (schemaUrl.origin !== document.canonicalUrl.origin || schemaUrl.pathname !== '/') {
        errors.push(`${relativePath}: WebSite JSON-LD URL does not match the canonical site origin`);
      }
    } catch {
      errors.push(`${relativePath}: WebSite JSON-LD has an invalid URL`);
    }
  }

  documents.set(relativePath, document);
}

const canonicalOrigin = documents.get('index.html')?.canonicalUrl?.origin;
for (const document of documents.values()) {
  if (canonicalOrigin && document.canonicalUrl?.origin !== canonicalOrigin) {
    errors.push(`${document.relativePath}: canonical origin differs from the homepage canonical origin`);
  }
}

let navigationReferences = 0;
let resourceReferences = 0;
let fragmentReferences = 0;
let idReferences = 0;

for (const document of documents.values()) {
  for (const reference of document.references) {
    const value = reference.value?.trim() ?? '';
    if (!value) {
      errors.push(`${reference.label}: empty ${reference.kind} reference`);
      continue;
    }
    if (!isLocalReference(value)) continue;

    let targetUrl;
    try {
      targetUrl = new URL(value, `${internalOrigin}${document.route}`);
    } catch {
      errors.push(`${reference.label}: invalid local URL ${value}`);
      continue;
    }

    if (reference.kind === 'navigation') navigationReferences += 1;
    if (reference.kind === 'resource') resourceReferences += 1;
    if (targetUrl.hash && targetUrl.hash !== '#') fragmentReferences += 1;

    const targetFile = resolveBuiltFile(targetUrl.pathname, fileSet);
    if (!targetFile) {
      errors.push(`${reference.label}: ${reference.kind} target does not exist: ${value}`);
      continue;
    }

    if (reference.kind === 'navigation' && targetFile.endsWith('.html')) {
      document.navigationTargets.add(targetFile);
    }

    if (targetUrl.hash && targetUrl.hash !== '#' && targetFile.endsWith('.html')) {
      const targetDocument = documents.get(targetFile);
      const targetId = decodeUrlPart(targetUrl.hash.slice(1), reference.label);
      if (!targetDocument?.ids.has(targetId)) {
        errors.push(`${reference.label}: fragment target #${targetId} does not exist in ${targetFile}`);
      }
    }
  }

  for (const reference of document.idReferences) {
    idReferences += 1;
    if (!document.ids.has(reference.id)) {
      errors.push(`${reference.label}: ${reference.attributeName} references missing id="${reference.id}"`);
    }
  }
}

const reachable = new Set();
const queue = ['index.html'];
while (queue.length) {
  const current = queue.shift();
  if (!current || reachable.has(current)) continue;
  reachable.add(current);
  for (const target of documents.get(current)?.navigationTargets ?? []) {
    if (!reachable.has(target)) queue.push(target);
  }
}

for (const relativePath of htmlFiles) {
  if (relativePath === '404.html') continue;
  if (!reachable.has(relativePath)) errors.push(`${relativePath}: page is not reachable from the homepage`);
}

const imageCount = [...documents.values()].reduce((total, document) => total + document.imageCount, 0);
const jsonLdCount = [...documents.values()].reduce((total, document) => total + document.jsonLdItems.length, 0);

console.log('# Site Integrity Audit');
console.log('');
console.log(`Built files: ${relativeFiles.length}`);
console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`Reachable HTML pages: ${reachable.size}/${htmlFiles.length - 1} plus 404`);
console.log(`Internal navigation references: ${navigationReferences}`);
console.log(`Internal resource references: ${resourceReferences}`);
console.log(`Fragment references: ${fragmentReferences}`);
console.log(`Element ID references: ${idReferences}`);
console.log(`Images: ${imageCount}`);
console.log(`Canonical URLs: ${[...documents.values()].reduce((total, document) => total + document.canonicalUrls.length, 0)}`);
console.log(`JSON-LD blocks: ${jsonLdCount}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('All internal routes, resources, fragments, IDs, images, and page reachability checks passed.');
}
