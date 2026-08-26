import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILE,
  INDEXNOW_ORIGIN,
} from './lib/indexnow-config.mjs';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

async function readRequired(relativePath) {
  try {
    return await readFile(path.join(rootDir, relativePath), 'utf8');
  } catch {
    errors.push(`${relativePath} is missing.`);
    return '';
  }
}

for (const relativePath of [
  `public/${INDEXNOW_KEY_FILE}`,
  `dist/${INDEXNOW_KEY_FILE}`,
]) {
  const value = (await readRequired(relativePath)).trim();
  if (value && value !== INDEXNOW_KEY) {
    errors.push(`${relativePath} does not contain the configured IndexNow key.`);
  }
}

const sitemap = await readRequired('dist/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const origin = new URL(INDEXNOW_ORIGIN);

if (!urls.length) errors.push('dist/sitemap.xml does not contain any URLs.');
if (urls.length > 10_000) errors.push('dist/sitemap.xml exceeds the IndexNow request limit.');
if (urls.some((url) => new URL(url).hostname !== origin.hostname)) {
  errors.push('dist/sitemap.xml contains a URL outside the IndexNow host.');
}

const packageJson = JSON.parse(await readRequired('package.json'));
if (packageJson.scripts?.['submit:indexnow'] !== 'node scripts/submit-indexnow.mjs') {
  errors.push('package.json does not expose the expected submit:indexnow command.');
}

console.log('\n# IndexNow Configuration Audit\n');
console.log(`Key file: /${INDEXNOW_KEY_FILE}`);
console.log(`Sitemap URLs ready for submission: ${urls.length}`);
console.log(`Errors: ${errors.length}`);

if (errors.length) {
  console.error(`\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log('\nIndexNow key, sitemap, and submission command are configured correctly.');
