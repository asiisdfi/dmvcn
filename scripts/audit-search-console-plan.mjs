import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { routingAnchorTextIssue } from './lib/search-console-routing.mjs';

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
  if (process.env.SC_AUDIT_DATE) {
    return String(process.env.SC_AUDIT_DATE).slice(0, 10);
  }
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

function validateRoutingLinkContract(item, errors) {
  const decision = item.routingDecision;
  if (decision?.action !== 'intent-links') return;
  const expectedLinks = Array.isArray(decision.expectedLinks)
    ? decision.expectedLinks
    : [];
  if (!expectedLinks.length) {
    errors.push(`${item.route}: intent-links routing action has no expectedLinks contract.`);
    return;
  }
  for (const link of expectedLinks) {
    const anchorIssue = routingAnchorTextIssue(link?.anchorText);
    if (anchorIssue) {
      errors.push(
        `${item.route}: invalid routing anchor for ${link?.from ?? 'missing source'} -> ${link?.to ?? 'missing target'}: ${anchorIssue}.`,
      );
    }
  }
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
const routingExecuteNow = execution.routingExecuteNow ?? [];
const nextQueue = execution.nextQueue ?? [];
const dataCollectionQueue = execution.dataCollectionQueue ?? [];
const queryReviewQueue = execution.queryReviewQueue ?? [];
const routingReviewQueue = execution.routingReviewQueue ?? [];
const routingActionQueue = execution.routingActionQueue ?? [];
const routingMonitoringQueue = execution.routingMonitoringQueue ?? [];
const lowEvidenceQueue = execution.lowEvidenceQueue ?? [];
const humanReviewQueue = execution.humanReviewQueue ?? [];
const indexingCleanupQueue = execution.indexingCleanupQueue ?? [];
const targetEvidenceThresholds = execution.targetEvidenceThresholds ?? {};
const pageQueryFreshnessDays = snapshot.pageQueryFreshnessDays;

if (
  planAgeDays === null ||
  planAgeDays < 0 ||
  planAgeDays > 7
) {
  errors.push(`Search Console plan was not regenerated in the last 7 days: age=${planAgeDays ?? 'invalid'}.`);
}
if (
  isCalendarDate(planDate) &&
  planDate < today &&
  isCalendarDate(execution.nextEligibleDate) &&
  execution.nextEligibleDate <= today
) {
  errors.push(
    `Search Console plan reached its next editorial-capacity date ${execution.nextEligibleDate}; regenerate it for ${today}.`,
  );
}
if (!allowedStatuses.has(execution.status)) {
  errors.push(`Unknown execution status: ${execution.status ?? 'missing'}.`);
}
if ((execution.allowedNow ?? 0) !== executeNow.length) {
  errors.push(`allowedNow=${execution.allowedNow ?? 0} but executeNow has ${executeNow.length} items.`);
}
if ((execution.routingAllowedNow ?? 0) !== routingExecuteNow.length) {
  errors.push(
    `routingAllowedNow=${execution.routingAllowedNow ?? 0} but routingExecuteNow has ${routingExecuteNow.length} items.`,
  );
}
if (
  (execution.allowedNow ?? 0) + (execution.routingAllowedNow ?? 0) >
  (execution.currentPeriod?.availableSlots ?? 0)
) {
  errors.push('Current content and routing actions exceed available editorial capacity.');
}
if (
  execution.status !== 'ready' &&
  (
    (execution.allowedNow ?? 0) !== 0 ||
    (execution.routingAllowedNow ?? 0) !== 0
  )
) {
  errors.push(`${execution.status} must not allow content actions.`);
}
if (snapshot.readyForPlanning && (snapshot.blockers?.length ?? 0) > 0) {
  errors.push('readyForPlanning cannot be true while data blockers remain.');
}
if (snapshot.readyForPlanning && !snapshot.windowVerified) {
  errors.push('A planning-ready snapshot must have a verified Search Console window.');
}
if (
  snapshot.windowVerified &&
  !['filter-label', 'chart-span'].includes(snapshot.windowVerificationMethod)
) {
  errors.push('Verified Search Console data has an unknown window-evidence method.');
}
if (
  snapshot.completionComparable &&
  (snapshot.windowDays !== 30 || !snapshot.windowVerified)
) {
  errors.push('Completion-comparable data must be a verified 30-day window.');
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
  !Number.isInteger(pageQueryFreshnessDays) ||
  pageQueryFreshnessDays < 1
) {
  errors.push('Missing or invalid page-query freshness window.');
}
if (
  !Number.isInteger(snapshot.pageQueryRoutes) ||
  !Number.isInteger(snapshot.freshPageQueryRoutes) ||
  !Number.isInteger(snapshot.stalePageQueryRoutes) ||
  snapshot.freshPageQueryRoutes + snapshot.stalePageQueryRoutes !==
    snapshot.pageQueryRoutes
) {
  errors.push('Page-query freshness route counts are inconsistent.');
}
if (
  snapshot.readyForPlanning &&
  (snapshot.invalidPageQueryObservedDates ?? 0) > 0
) {
  errors.push('Planning-ready data contains invalid page-query observation dates.');
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
  if (!item.queryEvidenceFresh) {
    errors.push(`${item.route}: executable content action uses stale page-query evidence.`);
  }
  if (
    !isCalendarDate(item.queryEvidenceObservedFrom) ||
    !isCalendarDate(item.queryEvidenceObservedThrough) ||
    !Number.isInteger(item.queryEvidenceAgeDays) ||
    item.queryEvidenceAgeDays < 0 ||
    item.queryEvidenceAgeDays > pageQueryFreshnessDays
  ) {
    errors.push(`${item.route}: executable content action has invalid query-evidence freshness.`);
  }
  if ((item.targetQueryEvidenceCount ?? 0) < 1) {
    errors.push(`${item.route}: executable content action lacks target-query evidence.`);
  }
  if (item.requiresHumanReview) {
    errors.push(`${item.route}: executable content action still requires human review.`);
  }
  if (item.requiresQueryReview) {
    errors.push(`${item.route}: executable content action still has unreviewed query intent.`);
  }
  if (item.hasRoutingReviewSignal) {
    errors.push(`${item.route}: executable content action still has a routing or overlap signal.`);
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
  if (!item.queryEvidenceFresh) {
    errors.push(`${item.route}: stale query evidence must be refreshed before intent review.`);
  }
  if (!item.requiresQueryReview) {
    errors.push(`${item.route}: query-review item has no unreviewed query evidence.`);
  }
  if (item.requiresHumanReview) {
    errors.push(`${item.route}: high-risk query must use the human-review queue.`);
  }
}
for (const item of routingReviewQueue) {
  if (!item.requiresRoutingReview) {
    errors.push(`${item.route}: routing-review item has no unresolved routing decision.`);
  }
  if (item.requiresHumanReview || item.requiresQueryReview) {
    errors.push(`${item.route}: higher-risk review must not be hidden in routing review.`);
  }
  if (!['routing-review', 'routing-recheck'].includes(item.suggestedAction)) {
    errors.push(`${item.route}: routing-review queue has an invalid suggested action.`);
  }
}
for (const item of routingActionQueue) {
  validateRoutingLinkContract(item, errors);
  if (
    !item.hasRoutingReviewSignal ||
    !item.requiresRoutingAction ||
    !['scheduled', 'action-due'].includes(item.routingDecisionStatus)
  ) {
    errors.push(`${item.route}: routing-action item lacks a current reviewed decision.`);
  }
  if (item.requiresHumanReview || item.requiresQueryReview) {
    errors.push(`${item.route}: higher-risk review must not be hidden in routing action.`);
  }
  if (!(item.routingDecision?.targetRoutes?.length > 0)) {
    errors.push(`${item.route}: routing action has no destination route.`);
  }
  if (
    !item.routingDecisionFresh ||
    !Number.isInteger(item.routingDecisionAgeDays) ||
    item.routingDecisionAgeDays < 0 ||
    item.routingDecisionAgeDays > pageQueryFreshnessDays
  ) {
    errors.push(`${item.route}: routing action uses a stale reviewed decision.`);
  }
  if (!isCalendarDate(item.routingDecision?.reviewedThrough)) {
    errors.push(`${item.route}: routing action lacks a reviewed-through date.`);
  }
  if (
    item.routingDecision?.reviewedThrough <
    (item.routingEvidenceObservedThrough ?? '')
  ) {
    errors.push(`${item.route}: routing action does not cover the latest signal.`);
  }
  if (
    item.routingDecisionStatus === 'scheduled' &&
    (
      !isCalendarDate(item.routingDecision?.plannedFor) ||
      item.routingDecision.plannedFor <= today
    )
  ) {
    errors.push(
      `${item.route}: scheduled routing action date has arrived; regenerate the plan for ${today}.`,
    );
  }
}
for (const item of routingExecuteNow) {
  validateRoutingLinkContract(item, errors);
  if (
    !item.hasRoutingReviewSignal ||
    !item.requiresRoutingAction ||
    item.routingDecisionStatus !== 'action-due'
  ) {
    errors.push(`${item.route}: executable routing item is not due.`);
  }
  if (item.requiresHumanReview || item.requiresQueryReview) {
    errors.push(`${item.route}: executable routing item still requires higher-risk review.`);
  }
  if (!(item.routingDecision?.targetRoutes?.length > 0)) {
    errors.push(`${item.route}: executable routing item has no destination route.`);
  }
  if (
    !item.routingDecisionFresh ||
    !Number.isInteger(item.routingDecisionAgeDays) ||
    item.routingDecisionAgeDays < 0 ||
    item.routingDecisionAgeDays > pageQueryFreshnessDays
  ) {
    errors.push(`${item.route}: executable routing item uses a stale reviewed decision.`);
  }
  if (!isCalendarDate(item.routingDecision?.reviewedThrough)) {
    errors.push(`${item.route}: executable routing item lacks a reviewed-through date.`);
  }
  if (
    item.routingDecision?.reviewedThrough <
    (item.routingEvidenceObservedThrough ?? '')
  ) {
    errors.push(`${item.route}: executable routing item does not cover the latest signal.`);
  }
  if (
    isCalendarDate(item.routingDecision?.plannedFor) &&
    item.routingDecision.plannedFor > planDate
  ) {
    errors.push(`${item.route}: future routing action entered the current execution queue.`);
  }
}
for (const item of routingMonitoringQueue) {
  validateRoutingLinkContract(item, errors);
  if (
    !item.hasRoutingReviewSignal ||
    item.routingDecisionStatus !== 'monitoring'
  ) {
    errors.push(`${item.route}: routing-monitor item lacks a current implemented decision.`);
  }
  if (item.requiresHumanReview || item.requiresQueryReview) {
    errors.push(`${item.route}: higher-risk review must not be hidden in routing monitoring.`);
  }
  if (
    !isCalendarDate(item.routingDecision?.implementedAt) ||
    !isCalendarDate(item.routingDecision?.evaluateAfter) ||
    item.routingDecision.evaluateAfter <= today
  ) {
    errors.push(
      `${item.route}: routing monitoring review date has arrived; regenerate the plan for ${today}.`,
    );
  }
  if (
    item.routingDecision?.reviewedThrough <
    (item.routingEvidenceObservedThrough ?? '')
  ) {
    errors.push(`${item.route}: routing monitoring does not cover the latest signal.`);
  }
  if (
    item.routingDecision?.action !== 'owner-confirmed' &&
    (
      !(item.routingDecision?.changedRoutes?.length > 0) ||
      !item.routingDecision?.implementationSummary
    )
  ) {
    errors.push(`${item.route}: implemented routing action lacks completion evidence.`);
  }
}
for (const item of lowEvidenceQueue) {
  if (!item.queryEvidenceFresh) {
    errors.push(`${item.route}: stale query evidence is incorrectly marked low evidence.`);
  }
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
  if (!item.queryEvidenceFresh) {
    errors.push(`${item.route}: stale query evidence entered the human-review queue.`);
  }
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
    const shouldBeOverdue = item.evaluateAfter <= today;
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
  ...routingExecuteNow,
  ...nextQueue,
  ...dataCollectionQueue,
  ...queryReviewQueue,
  ...routingReviewQueue,
  ...routingActionQueue,
  ...routingMonitoringQueue,
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
if ((report.routingReviews?.pendingReview ?? 0) !== routingReviewQueue.length) {
  errors.push('Routing-review summary does not match its execution queue.');
}
if (
  (report.routingReviews?.pendingAction ?? 0) !==
  routingExecuteNow.length + routingActionQueue.length
) {
  errors.push('Routing-action summary does not match its execution queue.');
}
if ((report.routingReviews?.executeNow ?? 0) !== routingExecuteNow.length) {
  errors.push('Routing execution summary does not match its execution queue.');
}
if ((report.routingReviews?.monitoring ?? 0) !== routingMonitoringQueue.length) {
  errors.push('Routing-monitoring summary does not match its execution queue.');
}
if (
  !Number.isInteger(report.routingReviews?.records) ||
  report.routingReviews.records < 0
) {
  errors.push('Routing-review record count is missing or invalid.');
}
const scheduledByDate = new Map();
for (const item of routingActionQueue) {
  const date = item.routingDecision?.plannedFor;
  if (!isCalendarDate(date)) continue;
  scheduledByDate.set(date, (scheduledByDate.get(date) ?? 0) + 1);
}
if (
  isCalendarDate(execution.nextEligibleDate) &&
  (scheduledByDate.get(execution.nextEligibleDate) ?? 0) >
    (execution.nextEligibleSlots ?? 0)
) {
  errors.push('Scheduled routing actions exceed the next editorial window capacity.');
}

console.log('# Search Console Execution Gate');
console.log('');
console.log(`Plan date: ${planDate || 'missing'}`);
console.log(`Snapshot ready: ${Boolean(snapshot.readyForPlanning)}`);
console.log(
  `Fresh page-query routes: ${snapshot.freshPageQueryRoutes ?? 0}/${snapshot.pageQueryRoutes ?? 0} (${snapshot.stalePageQueryRoutes ?? 0} stale)`,
);
console.log(`Execution: ${execution.status ?? 'missing'}`);
console.log(`Execute now: ${executeNow.length}`);
console.log(`Routing execute now: ${routingExecuteNow.length}`);
console.log(`Query evidence pending: ${dataCollectionQueue.length}`);
console.log(`Query classification pending: ${queryReviewQueue.length}`);
console.log(`Routing review: ${routingReviewQueue.length}`);
console.log(`Routing action: ${routingActionQueue.length}`);
console.log(`Routing monitoring: ${routingMonitoringQueue.length}`);
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
