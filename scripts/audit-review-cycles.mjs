import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  currentCalendarDate,
  deriveReviewCycleReport,
  isCalendarDate,
} from './lib/review-cycles.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const eeatPath = path.resolve(
  process.env.REVIEW_CYCLE_EEAT_PATH ??
    path.join(projectRoot, 'reports', 'eeat-inventory.json'),
);
const officialLinkPath = path.resolve(
  process.env.REVIEW_CYCLE_LINK_AUDIT_PATH ??
    path.join(projectRoot, 'reports', 'official-link-audit.json'),
);
const reportPath = path.resolve(
  process.env.REVIEW_CYCLE_REPORT_PATH ??
    path.join(projectRoot, 'reports', 'review-cycle.json'),
);
const asOf = (
  process.env.REVIEW_CYCLE_DATE ?? currentCalendarDate()
).slice(0, 10);

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    console.error(`Missing or invalid ${label}: ${filePath}`);
    process.exit(1);
  }
}

function same(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

const [eeat, officialLinkAudit, report] = await Promise.all([
  readJson(eeatPath, 'E-E-A-T inventory'),
  readJson(officialLinkPath, 'official link audit'),
  readJson(reportPath, 'review-cycle report'),
]);
const expected = deriveReviewCycleReport({ asOf, eeat, officialLinkAudit });
const errors = [];

if (!isCalendarDate(asOf) || report.asOf !== asOf) {
  errors.push(`Review-cycle report date must be ${asOf}.`);
}
if (report.schemaVersion !== 2) {
  errors.push('Unsupported review-cycle schema version.');
}
if (!same(report.policy, expected.policy)) {
  errors.push('Review-cycle policy differs from the enforced risk policy.');
}
if (report.source?.pageFingerprint !== expected.source.pageFingerprint) {
  errors.push('Review-cycle source fingerprint is stale.');
}
if (!same(report.summary, expected.summary)) {
  errors.push('Review-cycle summary does not match the current page inventory.');
}
if (!same(report.byRisk, expected.byRisk)) {
  errors.push('Risk-level review summary is inconsistent.');
}
if (!same(report.queues, expected.queues)) {
  errors.push('Review queues do not match the current page dates.');
}
if (!same(report.status, expected.status)) {
  errors.push('Review-cycle status is inconsistent.');
}
if (!same(report.errors, expected.errors)) {
  errors.push('Monthly volatile-review policy errors are inconsistent.');
}
if ((eeat.pages ?? []).some((page) => page.indexable && !page.pass)) {
  errors.push('E-E-A-T inventory contains indexable pages that do not pass.');
}
if (expected.summary.missingReviewDate > 0) {
  errors.push(
    `${expected.summary.missingReviewDate} page(s) have no valid visible fact-review date.`,
  );
}
if (expected.summary.overdue > 0) {
  errors.push(
    `${expected.summary.overdue} page(s) exceeded their maximum fact-review cycle.`,
  );
}
if (expected.summary.monthlyVolatileOverdue > 0) {
  errors.push(
    `${expected.summary.monthlyVolatileOverdue} monthly volatile-review page(s) are overdue.`,
  );
}
if (expected.errors.length > 0) {
  errors.push(...expected.errors);
}
if (!expected.status.officialSourceCurrent) {
  errors.push('Monthly official-source coverage is stale or incomplete.');
}
if (!expected.status.gatePassed) {
  errors.push('Review-cycle publication gate is not passed.');
}

console.log('# Fact Review Cycle Gate');
console.log('');
console.log(`As of: ${asOf}`);
console.log(`Pages: ${expected.summary.pages}`);
console.log(`Valid: ${expected.summary.valid}`);
console.log(`Due within 30 days: ${expected.summary.dueWithin30Days}`);
console.log(
  `Monthly volatile reviews: ${expected.summary.monthlyVolatilePages} (${expected.summary.monthlyVolatileOverdue} overdue)`,
);
console.log(`Overdue: ${expected.summary.overdue}`);
console.log(`Missing review date: ${expected.summary.missingReviewDate}`);
console.log(`Earliest due: ${expected.summary.earliestDue ?? 'none'}`);
console.log(
  `Official source baseline: ${expected.source.officialUrls} URLs / age ${expected.source.officialAuditAgeDays} day(s)`,
);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Visible dates, monthly volatile reviews, risk cycles, review queues, and source baseline passed.');
