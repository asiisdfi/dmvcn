import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.resolve(
  process.env.SEARCH_CONSOLE_PLAN_PATH ??
    path.join(projectRoot, 'reports', 'search-console-priority.json'),
);
const allowedStatuses = new Set([
  'ready',
  'hold-data',
  'hold-cadence',
  'hold-no-qualified-query',
]);

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

function isCalendarDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''));
}

function daysBetween(earlier, later) {
  if (!isCalendarDate(earlier) || !isCalendarDate(later)) return null;
  return Math.round(
    (
      Date.parse(`${later}T00:00:00.000Z`) -
      Date.parse(`${earlier}T00:00:00.000Z`)
    ) / 86_400_000,
  );
}

function duplicateRoutes(items) {
  const seen = new Set();
  return items
    .map((item) => item.route)
    .filter((route) => {
      if (seen.has(route)) return true;
      seen.add(route);
      return false;
    });
}

function containsRawQueryKey(value) {
  if (Array.isArray(value)) return value.some(containsRawQueryKey);
  if (!value || typeof value !== 'object') return false;
  return Object.entries(value).some(
    ([key, nested]) =>
      ['query', 'topQuery'].includes(key) ||
      containsRawQueryKey(nested),
  );
}

let report;
try {
  report = JSON.parse(await readFile(reportPath, 'utf8'));
} catch {
  console.error(`Missing or invalid Search Console plan: ${reportPath}`);
  process.exit(1);
}

const errors = [];
const today = currentCalendarDate();
const planDate = String(report.generatedAt ?? '').slice(0, 10);
const planAgeDays = daysBetween(planDate, today);
const snapshot = report.dataSnapshot ?? {};
const execution = report.execution ?? {};
const executeNow = execution.executeNow ?? [];
const nextQueue = execution.nextQueue ?? [];
const dataCollectionQueue = execution.dataCollectionQueue ?? [];
const queryReviewQueue = execution.queryReviewQueue ?? [];
const routingReviewQueue = execution.routingReviewQueue ?? [];
const lowEvidenceQueue = execution.lowEvidenceQueue ?? [];
const humanReviewQueue = execution.humanReviewQueue ?? [];
const indexingCleanupQueue = execution.indexingCleanupQueue ?? [];
const targetEvidenceThresholds = execution.targetEvidenceThresholds ?? {};

if (
  planAgeDays === null ||
  planAgeDays < 0 ||
  planAgeDays > 7
) {
  errors.push(`Search Console plan was not regenerated in the last 7 days: age=${planAgeDays ?? 'invalid'}.`);
}
if (!allowedStatuses.has(execution.status)) {
  errors.push(`Unknown execution status: ${execution.status ?? 'missing'}.`);
}
if ((execution.allowedNow ?? 0) !== executeNow.length) {
  errors.push(`allowedNow=${execution.allowedNow ?? 0} but executeNow has ${executeNow.length} items.`);
}
if (execution.status !== 'ready' && (execution.allowedNow ?? 0) !== 0) {
  errors.push(`${execution.status} must not allow content actions.`);
}
if (snapshot.readyForPlanning && (snapshot.blockers?.length ?? 0) > 0) {
  errors.push('readyForPlanning cannot be true while data blockers remain.');
}
if (!snapshot.readyForPlanning) {
  if ((snapshot.blockers?.length ?? 0) === 0) {
    errors.push('A held data snapshot must explain at least one blocker.');
  }
  if (execution.status !== 'hold-data') {
    errors.push('An unusable data snapshot must set execution.status to hold-data.');
  }
}
if (snapshot.readyForPlanning && execution.status === 'hold-data') {
  errors.push('A ready data snapshot must not use hold-data.');
}
if (
  !Number.isFinite(targetEvidenceThresholds.clicks) ||
  targetEvidenceThresholds.clicks < 1 ||
  !Number.isFinite(targetEvidenceThresholds.impressions) ||
  targetEvidenceThresholds.impressions < 1
) {
  errors.push('Missing or invalid target-query evidence thresholds.');
}

for (const item of [...executeNow, ...nextQueue]) {
  if ((item.targetQueryEvidenceCount ?? 0) < 1) {
    errors.push(`${item.route}: executable content action lacks target-query evidence.`);
  }
  if (item.requiresHumanReview) {
    errors.push(`${item.route}: executable content action still requires human review.`);
  }
  if (item.requiresQueryReview) {
    errors.push(`${item.route}: executable content action still has unreviewed query intent.`);
  }
  if (item.requiresRoutingReview) {
    errors.push(`${item.route}: executable content action still requires routing review.`);
  }
  if (!item.targetQueryEvidenceReady) {
    errors.push(`${item.route}: executable content action has weak target-query evidence.`);
  }
  if (
    (item.targetQueryClicks ?? 0) < (targetEvidenceThresholds.clicks ?? 1) &&
    (item.targetQueryImpressions ?? 0) <
      (targetEvidenceThresholds.impressions ?? 1)
  ) {
    errors.push(`${item.route}: executable target-query totals are below both thresholds.`);
  }
}
for (const item of dataCollectionQueue) {
  if (item.suggestedAction !== 'needs-query-evidence') {
    errors.push(`${item.route}: data-collection item is not marked needs-query-evidence.`);
  }
}
for (const item of queryReviewQueue) {
  if (!item.requiresQueryReview) {
    errors.push(`${item.route}: query-review item has no unreviewed query evidence.`);
  }
  if (item.requiresHumanReview) {
    errors.push(`${item.route}: high-risk query must use the human-review queue.`);
  }
}
for (const item of routingReviewQueue) {
  if (!item.requiresRoutingReview) {
    errors.push(`${item.route}: routing-review item has no routing or overlap signal.`);
  }
  if (item.requiresHumanReview || item.requiresQueryReview) {
    errors.push(`${item.route}: higher-risk review must not be hidden in routing review.`);
  }
}
for (const item of lowEvidenceQueue) {
  if ((item.targetQueryEvidenceCount ?? 0) < 1) {
    errors.push(`${item.route}: low-evidence item has no target-query signal.`);
  }
  if (item.targetQueryEvidenceReady) {
    errors.push(`${item.route}: decision-ready query is incorrectly marked low evidence.`);
  }
  if (
    (item.targetQueryClicks ?? 0) >= (targetEvidenceThresholds.clicks ?? 1) ||
    (item.targetQueryImpressions ?? 0) >=
      (targetEvidenceThresholds.impressions ?? 1)
  ) {
    errors.push(`${item.route}: low-evidence query already meets an execution threshold.`);
  }
}
for (const item of humanReviewQueue) {
  if (!item.requiresHumanReview) {
    errors.push(`${item.route}: human-review queue item is not marked as requiring review.`);
  }
}

const cleanupOverdue = indexingCleanupQueue.filter(
  (item) => item.status === 'deindex-overdue',
);
for (const item of indexingCleanupQueue) {
  if (item.knownNoindex) {
    if (!isCalendarDate(item.completedAt) || !isCalendarDate(item.evaluateAfter)) {
      errors.push(`${item.route}: tracked noindex exposure lacks cleanup and review dates.`);
      continue;
    }
    const shouldBeOverdue = item.evaluateAfter <= planDate;
    const expectedStatus = shouldBeOverdue ? 'deindex-overdue' : 'deindex-grace';
    const expectedAction = shouldBeOverdue ? 'inspect-indexing' : 'observe-deindex';
    if (item.status !== expectedStatus || item.action !== expectedAction) {
      errors.push(
        `${item.route}: expected ${expectedStatus}/${expectedAction}, got ${item.status}/${item.action}.`,
      );
    }
  } else if (item.status !== 'untracked-route' || item.action !== 'investigate-route') {
    errors.push(`${item.route}: unknown route exposure must be investigated.`);
  }
}
if ((snapshot.indexingCleanupOverdue ?? 0) !== cleanupOverdue.length) {
  errors.push(
    `indexingCleanupOverdue=${snapshot.indexingCleanupOverdue ?? 0} but queue has ${cleanupOverdue.length}.`,
  );
}
if (
  (snapshot.excludedPageImpressions ?? 0) !==
  indexingCleanupQueue.reduce((sum, item) => sum + (item.impressions ?? 0), 0)
) {
  errors.push('Excluded-page impression total does not match the indexing cleanup queue.');
}

const queueRoutes = [
  ...executeNow,
  ...nextQueue,
  ...dataCollectionQueue,
  ...queryReviewQueue,
  ...routingReviewQueue,
  ...lowEvidenceQueue,
  ...humanReviewQueue,
  ...indexingCleanupQueue,
];
for (const route of duplicateRoutes(queueRoutes)) {
  const canShareHumanReview =
    humanReviewQueue.some((item) => item.route === route) &&
    !executeNow.some((item) => item.route === route) &&
    !nextQueue.some((item) => item.route === route);
  if (!canShareHumanReview) errors.push(`${route}: appears in conflicting execution queues.`);
}
if (containsRawQueryKey(report)) {
  errors.push('Public Search Console report contains a raw query field.');
}

console.log('# Search Console Execution Gate');
console.log('');
console.log(`Plan date: ${planDate || 'missing'}`);
console.log(`Snapshot ready: ${Boolean(snapshot.readyForPlanning)}`);
console.log(`Execution: ${execution.status ?? 'missing'}`);
console.log(`Execute now: ${executeNow.length}`);
console.log(`Query evidence pending: ${dataCollectionQueue.length}`);
console.log(`Query classification pending: ${queryReviewQueue.length}`);
console.log(`Routing review: ${routingReviewQueue.length}`);
console.log(`Low evidence: ${lowEvidenceQueue.length}`);
console.log(`Human review: ${humanReviewQueue.length}`);
console.log(`Index cleanup: ${indexingCleanupQueue.length} (${cleanupOverdue.length} overdue)`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Search Console execution gate passed.');
