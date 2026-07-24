import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { federalSources, states, topics } from '../src/data/content.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.resolve(
  process.env.SOURCE_FRESHNESS_REPORT_PATH ??
    path.join(projectRoot, 'reports', 'official-link-audit.json'),
);
const maxReportAgeDays = Number.parseInt(
  process.env.SOURCE_FRESHNESS_MAX_AGE_DAYS ?? '30',
  10,
);

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

function daysBetween(earlier, later) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(String(earlier ?? '')) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(String(later ?? ''))
  ) {
    return null;
  }
  return Math.round(
    (
      Date.parse(`${later}T00:00:00.000Z`) -
      Date.parse(`${earlier}T00:00:00.000Z`)
    ) / 86_400_000,
  );
}

function currentOfficialUrls() {
  const urls = new Set();
  const add = (url) => {
    if (/^https?:\/\//.test(url)) urls.add(url);
  };

  federalSources.forEach((source) => add(source.url));
  states.forEach((state) => {
    add(state.agencyUrl);
    state.actionLinks.forEach((link) => add(link.url));
    state.sources.forEach((source) => add(source.url));
  });
  topics.forEach((topic) => {
    topic.sources.forEach((source) => add(source.url));
  });
  return [...urls].sort();
}

let report;
try {
  report = JSON.parse(await readFile(reportPath, 'utf8'));
} catch {
  console.error(`Missing or invalid official-link audit report: ${reportPath}`);
  process.exit(1);
}

const currentUrls = currentOfficialUrls();
const currentFingerprint = createHash('sha256')
  .update(currentUrls.join('\n'))
  .digest('hex');
const today = currentCalendarDate();
const reportAgeDays = daysBetween(report.auditDate, today);
const errors = [];

if (report.inventory?.urls !== currentUrls.length) {
  errors.push(
    `URL inventory changed: report=${report.inventory?.urls ?? 'missing'}, current=${currentUrls.length}.`,
  );
}
if (report.inventory?.fingerprint !== currentFingerprint) {
  errors.push('Official URL fingerprint changed after the last online audit.');
}
if (
  reportAgeDays === null ||
  reportAgeDays < 0 ||
  reportAgeDays > maxReportAgeDays
) {
  errors.push(
    `Online link audit is stale or future-dated: age=${reportAgeDays ?? 'invalid'} days.`,
  );
}
if (!report.coverage?.fullCoverage || report.coverage?.dueRemaining !== 0) {
  errors.push(
    `Monthly link coverage is incomplete: ${report.coverage?.fresh ?? 0}/${currentUrls.length}.`,
  );
}
if (report.coverage?.fresh !== currentUrls.length) {
  errors.push(
    `Fresh-link coverage does not match the current inventory: ${report.coverage?.fresh ?? 0}/${currentUrls.length}.`,
  );
}
if (!report.status?.monthlyGatePassed) {
  errors.push('Monthly official-link gate is not passed.');
}
if (!report.status?.highRiskGatePassed) {
  errors.push('High-risk official-link gate is not passed.');
}
if ((report.status?.pendingHardFailures ?? 0) > 0) {
  errors.push(
    `Pending hard failures require review: ${report.status.pendingHardFailures}.`,
  );
}
if ((report.status?.confirmedHardFailures ?? 0) > 0) {
  errors.push(
    `Confirmed hard failures remain: ${report.status.confirmedHardFailures}.`,
  );
}

console.log('# Official Source Freshness Gate');
console.log('');
console.log(`Current URLs: ${currentUrls.length}`);
console.log(`Fresh coverage: ${report.coverage?.fresh ?? 0}/${currentUrls.length}`);
console.log(
  `High-risk coverage: ${report.highRiskCoverage?.fresh ?? 0}/${report.highRiskCoverage?.total ?? 0}`,
);
console.log(`Audit age: ${reportAgeDays ?? 'invalid'} days`);
console.log(`Watch: ${report.status?.freshWatch ?? 0}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Official source freshness gate passed.');
