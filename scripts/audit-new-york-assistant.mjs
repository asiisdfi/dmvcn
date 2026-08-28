import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildNewYorkAssistantResult,
  getMissingNewYorkAssistantQuestions,
  NEW_YORK_ASSISTANT_SOURCES,
} from '../src/data/new-york-assistant.ts';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const cases = [];

function addCase(label, answers, expectedId) {
  cases.push({ label, answers, expectedId });
}

function cross(values) {
  return values.reduce(
    (rows, options) => rows.flatMap((row) => options.map((option) => ({ ...row, ...option }))),
    [{}],
  );
}

addCase('REAL ID driving only', { task: 'real-id', realIdPurpose: 'driving' }, 'real-id-driving-only');
addCase('REAL ID purpose unsure', { task: 'real-id', realIdPurpose: 'unsure' }, 'real-id-purpose-check');
addCase(
  'REAL ID already compliant',
  { task: 'real-id', realIdPurpose: 'federal', realIdCredential: 'compliant' },
  'real-id-already-compliant',
);

for (const combination of cross([
  [{ realIdCredential: 'standard' }, { realIdCredential: 'none' }],
  [{ realIdIdentity: 'checked' }, { realIdIdentity: 'unsure' }],
  [{ realIdName: 'match' }, { realIdName: 'changed' }],
  [{ realIdResidency: 'two' }, { realIdResidency: 'fewer' }],
])) {
  addCase('REAL ID document branch', { task: 'real-id', realIdPurpose: 'federal', ...combination });
}

addCase('Existing license exchange', { task: 'first-license', firstExisting: 'us-canada' }, 'first-license-exchange');
for (const combination of cross([
  [{ firstAge: 'under-18' }, { firstAge: 'adult' }],
  [{ firstStage: 'start' }, { firstStage: 'permit' }, { firstStage: 'ready' }],
])) {
  addCase('First license branch', { task: 'first-license', firstExisting: 'none', ...combination });
}

addCase('Office finder', { task: 'license-service', serviceType: 'appointment' }, 'service-appointment');
addCase('Address change', { task: 'license-service', serviceType: 'address' }, 'service-address');
for (const combination of cross([
  [{ mailingAge: 'under-three-weeks' }, { mailingAge: 'three-weeks-plus' }],
  [{ mailingId: 'yes' }, { mailingId: 'no' }],
])) {
  addCase('Mailing branch', { task: 'license-service', serviceType: 'mailing', ...combination });
}
for (const combination of cross([
  [{ renewalPlan: 'same' }, { renewalPlan: 'upgrade' }, { renewalPlan: 'temporary-visitor' }],
  [
    { renewalExpiry: 'more-than-one-year' },
    { renewalExpiry: 'within-one-year' },
    { renewalExpiry: 'within-two-years' },
    { renewalExpiry: 'over-two-years' },
  ],
])) {
  addCase('Renewal branch', { task: 'license-service', serviceType: 'renewal', ...combination });
}

const sourceUrls = new Set();
for (const [sourceId, source] of Object.entries(NEW_YORK_ASSISTANT_SOURCES)) {
  let url;
  try {
    url = new URL(source.url);
  } catch {
    errors.push(`source:${sourceId}: invalid URL`);
    continue;
  }
  if (url.protocol !== 'https:') errors.push(`source:${sourceId}: URL is not HTTPS`);
  if (url.hostname !== 'dmv.ny.gov' && !url.hostname.endsWith('.dmv.ny.gov')) {
    errors.push(`source:${sourceId}: not an official NY DMV host (${url.hostname})`);
  }
  if (sourceUrls.has(source.url)) errors.push(`source:${sourceId}: duplicate URL`);
  sourceUrls.add(source.url);
  if (!source.label.trim()) errors.push(`source:${sourceId}: empty label`);
}

for (const { label, answers, expectedId } of cases) {
  const missing = getMissingNewYorkAssistantQuestions(answers);
  if (missing.length) {
    errors.push(`${label}: complete test case still reports missing ${missing.join(', ')}`);
    continue;
  }
  const result = buildNewYorkAssistantResult(answers);
  if (!result) {
    errors.push(`${label}: no result returned`);
    continue;
  }
  if (expectedId && result.id !== expectedId) {
    errors.push(`${label}: expected ${expectedId}, received ${result.id}`);
  }
  if (!result.steps.length) errors.push(`${label}: result has no steps`);
  if (!result.checklist.length) errors.push(`${label}: result has no checklist`);
  if (!result.links.length) errors.push(`${label}: result has no official links`);
  if (!result.links.some((link) => link.primary)) errors.push(`${label}: result has no primary official link`);
  for (const link of result.links) {
    if (!sourceUrls.has(link.url)) errors.push(`${label}: result uses unregistered source ${link.url}`);
  }
}

async function readBuilt(relativePath) {
  try {
    return await readFile(path.join(rootDir, 'dist', relativePath), 'utf8');
  } catch {
    errors.push(`dist/${relativePath} is missing; run the site build before this audit`);
    return '';
  }
}

const pageHtml = await readBuilt('tools/new-york-dmv-assistant/index.html');
const sitemap = await readBuilt('sitemap.xml');
const llms = await readBuilt('llms.txt');
const newYorkPage = await readBuilt('states/new-york/index.html');
const newYorkRealIdPage = await readBuilt('states/new-york/real-id/index.html');
const firstLicensePage = await readBuilt('topics/first-driver-license-road-test/index.html');

for (const [pattern, message] of [
  [/data-ny-assistant/, 'assistant root marker is missing'],
  [/data-assistant-form/, 'assistant form marker is missing'],
  [/data-result-checklist/, 'interactive checklist marker is missing'],
  [/"@type":"WebApplication"/, 'WebApplication structured data is missing'],
  [/https:\/\/dmv\.ny\.gov\//, 'official NY DMV citations are missing'],
]) {
  if (!pattern.test(pageHtml)) errors.push(message);
}
if (/name="robots" content="noindex/.test(pageHtml)) errors.push('assistant page is unexpectedly noindex');
if (!sitemap.includes('https://dmvcn.com/tools/new-york-dmv-assistant/')) {
  errors.push('assistant route is missing from sitemap.xml');
}
if (!llms.includes('/tools/new-york-dmv-assistant/')) errors.push('assistant route is missing from llms.txt');
if (!newYorkPage.includes('/tools/new-york-dmv-assistant/?task=license-service')) {
  errors.push('New York state page does not link to the assistant');
}
if (!newYorkRealIdPage.includes('/tools/new-york-dmv-assistant/?task=real-id')) {
  errors.push('New York REAL ID page does not link to the assistant');
}
if (!firstLicensePage.includes('/tools/new-york-dmv-assistant/?task=first-license')) {
  errors.push('first-license topic does not link to the assistant');
}

console.log('\n# New York DMV Assistant Audit\n');
console.log(`Decision cases: ${cases.length}`);
console.log(`Official sources: ${sourceUrls.size}`);
console.log(`Errors: ${errors.length}`);

if (errors.length) {
  console.error(`\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log('\nAll decision branches, source constraints, site entries, and built artifacts passed.');
