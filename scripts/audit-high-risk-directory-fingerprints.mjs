import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { HIGH_RISK_DIRECTORY_ROUTES } from '../src/data/editorial.ts';
import { HIGH_RISK_DIRECTORY_FINGERPRINTS } from '../src/data/high-risk-directory-fingerprints.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const errors = [];

function attribute(node, name) {
  return node.attrs?.find((item) => item.name === name)?.value ?? '';
}

function hasClass(node, name) {
  return attribute(node, 'class').split(/\s+/).includes(name);
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes ?? []).map(textContent).join(' ');
}

function descendants(node, predicate, matches = []) {
  if (predicate(node)) matches.push(node);
  for (const child of node.childNodes ?? []) descendants(child, predicate, matches);
  return matches;
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

async function fingerprintBuiltDirectory(entry) {
  const htmlPath = path.join(
    distDir,
    entry.route.replace(/^\/|\/$/g, ''),
    'index.html',
  );
  const tree = parse(await readFile(htmlPath, 'utf8'));
  const rows = descendants(
    tree,
    (node) => node.nodeName === 'article' && hasClass(node, entry.rowClass),
  );
  const records = rows.flatMap((row) => {
    const stateLink = descendants(
      row,
      (node) => node.nodeName === 'a' && hasClass(node, 'directory-state'),
    )[0];
    const stateRoute = attribute(stateLink, 'href');

    return descendants(
      row,
      (node) =>
        node.nodeName === 'div' && hasClass(node, 'directory-evidence-item'),
    ).map((item) => {
      const claim = descendants(item, (node) => node.nodeName === 'p')[0];
      const source = descendants(
        item,
        (node) =>
          node.nodeName === 'a' && hasClass(node, 'directory-evidence-link'),
      )[0];
      return [
        stateRoute,
        normalizeText(textContent(claim)),
        attribute(source, 'href'),
      ].join('\t');
    });
  }).sort();

  return {
    claimCount: records.length,
    fingerprint: createHash('sha256')
      .update(records.join('\n'))
      .digest('hex'),
  };
}

const registeredRoutes = new Set();
const results = [];
for (const entry of HIGH_RISK_DIRECTORY_FINGERPRINTS) {
  if (registeredRoutes.has(entry.route)) {
    errors.push(`${entry.route}: duplicate fingerprint registration`);
    continue;
  }
  registeredRoutes.add(entry.route);

  if (!HIGH_RISK_DIRECTORY_ROUTES.has(entry.route)) {
    errors.push(`${entry.route}: fingerprint is not attached to a high-risk directory`);
  }
  if (!/^[a-f0-9]{64}$/.test(entry.currentFingerprint)) {
    errors.push(`${entry.route}: registered fingerprint is not a SHA-256 value`);
  }

  let built;
  try {
    built = await fingerprintBuiltDirectory(entry);
  } catch (error) {
    errors.push(`${entry.route}: unable to read built directory (${error.message})`);
    continue;
  }

  results.push({ route: entry.route, ...built });
  if (built.claimCount !== entry.claimCount) {
    errors.push(
      `${entry.route}: built claim count ${built.claimCount} does not match registered ${entry.claimCount}`,
    );
  }
  if (built.fingerprint !== entry.currentFingerprint) {
    errors.push(
      `${entry.route}: built fingerprint ${built.fingerprint} does not match registered ${entry.currentFingerprint}`,
    );
  }
}

for (const route of HIGH_RISK_DIRECTORY_ROUTES) {
  if (!registeredRoutes.has(route)) {
    errors.push(`${route}: high-risk directory has no content fingerprint`);
  }
}

console.log('# High-Risk Directory Fingerprint Audit');
console.log('');
console.log(`Registered directories: ${HIGH_RISK_DIRECTORY_FINGERPRINTS.length}`);
console.log(`Built claims: ${results.reduce((total, item) => total + item.claimCount, 0)}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  for (const error of errors) console.log(`- ${error}`);
  process.exitCode = 1;
} else {
  for (const result of results) {
    console.log(`- ${result.route}: ${result.claimCount} claims / ${result.fingerprint}`);
  }
  console.log('');
  console.log('Every high-risk directory matches its registered reviewable content version.');
}
