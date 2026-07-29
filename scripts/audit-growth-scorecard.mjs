import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateSerializedWindow } from './lib/search-console-window.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const scorecardPath = path.resolve(
  process.env.GROWTH_SCORECARD_PATH ??
    path.join(projectRoot, 'reports', 'growth-scorecard.json'),
);
const searchPlanPath = path.resolve(
  process.env.SEARCH_CONSOLE_PLAN_PATH ??
    path.join(projectRoot, 'reports', 'search-console-priority.json'),
);
const expectedTargets = {
  clicks: 500,
  impressions: 50_000,
  ctr: 1,
  top20Pages: 30,
  top10Pages: 15,
  usClickShare: 70,
  weeklyActions: { min: 2, max: 3 },
  monthlyActions: { min: 8, max: 12 },
  indexablePassRate: 100,
};

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

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function percentage(part, total) {
  return total > 0 ? round((part / total) * 100) : 0;
}

function approximatelyEqual(left, right, tolerance = 0.05) {
  return Math.abs(toNumber(left) - toNumber(right)) <= tolerance;
}

function rangeStatus(count, range) {
  if (count < range.min) return 'below-target';
  if (count > range.max) return 'above-target';
  return 'on-target';
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

async function readJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

const [scorecard, searchPlan] = await Promise.all([
  readJson(scorecardPath),
  readJson(searchPlanPath),
]);

if (!scorecard) {
  console.error(`Missing or invalid growth scorecard: ${scorecardPath}`);
  process.exit(1);
}
if (!searchPlan) {
  console.error(`Missing or invalid Search Console plan: ${searchPlanPath}`);
  process.exit(1);
}

const errors = [];
const scorecardDate = String(scorecard.generatedAt ?? '').slice(0, 10);
const ageDays = daysBetween(scorecardDate, currentCalendarDate());
const targets = scorecard.targets ?? {};
const current = scorecard.current ?? {};
const totals = current.propertyTotals ?? {};
const traffic = current.traffic ?? {};
const diagnostics = current.diagnostics ?? {};
const cadence = current.cadence ?? {};
const quality = current.quality ?? {};
const checks = scorecard.checks ?? {};
const status = scorecard.status ?? {};

if (ageDays === null || ageDays < 0 || ageDays > 7) {
  errors.push(`Growth scorecard was not regenerated in the last 7 days: age=${ageDays ?? 'invalid'}.`);
}
if (JSON.stringify(targets) !== JSON.stringify(expectedTargets)) {
  errors.push('Growth targets differ from the approved long-term objective.');
}
if (containsRawQueryKey(scorecard)) {
  errors.push('Public growth scorecard contains a raw query field.');
}

const metricActuals = {
  clicks: toNumber(totals.clicks),
  impressions: toNumber(totals.impressions),
  ctr: toNumber(totals.ctr),
  top20Pages: toNumber(current.rankedPages?.top20),
  top10Pages: toNumber(current.rankedPages?.top10),
  usClickShare: toNumber(traffic.usClickShare),
};
for (const [key, actual] of Object.entries(metricActuals)) {
  const check = checks[key];
  const target = expectedTargets[key];
  if (!check) {
    errors.push(`${key}: missing metric check.`);
    continue;
  }
  if (!approximatelyEqual(check.actual, actual) || !approximatelyEqual(check.target, target)) {
    errors.push(`${key}: metric check does not match current data or target.`);
  }
  const expectedMet = actual >= target;
  const expectedProgress = target > 0 ? round((actual / target) * 100) : null;
  const expectedRemaining = round(
    Math.max(target - actual, 0),
    check.unit === 'percent' ? 1 : 0,
  );
  if (check.met !== expectedMet) errors.push(`${key}: met flag is inconsistent.`);
  if (!approximatelyEqual(check.progressPercent, expectedProgress)) {
    errors.push(`${key}: progress percentage is inconsistent.`);
  }
  if (!approximatelyEqual(check.remaining, expectedRemaining)) {
    errors.push(`${key}: remaining value is inconsistent.`);
  }
}

const countries = traffic.countries ?? [];
const unitedStates = countries.find((country) => country.code === 'US');
const expectedUsClickShare = percentage(
  toNumber(unitedStates?.clicks),
  toNumber(totals.clicks),
);
const expectedUsImpressionShare = percentage(
  toNumber(unitedStates?.impressions),
  toNumber(totals.impressions),
);
if (
  !approximatelyEqual(traffic.usClicks, unitedStates?.clicks) ||
  !approximatelyEqual(traffic.usImpressions, unitedStates?.impressions) ||
  !approximatelyEqual(traffic.usClickShare, expectedUsClickShare) ||
  !approximatelyEqual(traffic.usImpressionShare, expectedUsImpressionShare)
) {
  errors.push('United States traffic shares do not match the country segment.');
}

const deviceSource = new Map(
  (traffic.devices ?? []).map((device) => [device.code, device]),
);
const deviceDiagnostics = diagnostics.devices ?? [];
if (deviceDiagnostics.length !== deviceSource.size) {
  errors.push('Device diagnostics do not cover every device segment exactly once.');
}
for (const device of deviceDiagnostics) {
  const source = deviceSource.get(device.code);
  if (!source) {
    errors.push(`${device.code ?? 'unknown'}: device diagnostic has no source segment.`);
    continue;
  }
  const expected = {
    clicks: toNumber(source.clicks),
    impressions: toNumber(source.impressions),
    clickShare: percentage(toNumber(source.clicks), toNumber(totals.clicks)),
    impressionShare: percentage(toNumber(source.impressions), toNumber(totals.impressions)),
    ctr: percentage(toNumber(source.clicks), toNumber(source.impressions)),
  };
  for (const [key, value] of Object.entries(expected)) {
    if (!approximatelyEqual(device[key], value)) {
      errors.push(`${device.code}: ${key} diagnostic is inconsistent.`);
    }
  }
}

const expectedAnomalies = countries
  .filter(
    (country) =>
      country.code !== 'US' &&
      toNumber(country.clicks) === 0 &&
      toNumber(country.impressions) >=
        Math.max(100, toNumber(unitedStates?.impressions)),
  )
  .map((country) => country.code)
  .sort();
const actualAnomalies = (diagnostics.audienceAnomalies ?? [])
  .map((country) => country.code)
  .sort();
if (JSON.stringify(actualAnomalies) !== JSON.stringify(expectedAnomalies)) {
  errors.push('Audience anomaly list does not match the country segments.');
}
for (const anomaly of diagnostics.audienceAnomalies ?? []) {
  const source = countries.find((country) => country.code === anomaly.code);
  if (
    !source ||
    !approximatelyEqual(anomaly.clicks, source.clicks) ||
    !approximatelyEqual(anomaly.impressions, source.impressions) ||
    !approximatelyEqual(
      anomaly.impressionShare,
      percentage(toNumber(source.impressions), toNumber(totals.impressions)),
    )
  ) {
    errors.push(`${anomaly.code ?? 'unknown'}: audience anomaly values are inconsistent.`);
  }
}

const querySignals = searchPlan.querySignals ?? {};
const queryVisibility = diagnostics.queryVisibility ?? {};
const queryMappings = {
  visibleRows: 'totalRows',
  visibleClicks: 'visibleClicks',
  visibleImpressions: 'visibleImpressions',
  chineseRows: 'chineseRows',
  chineseClicks: 'chineseClicks',
  chineseImpressions: 'chineseImpressions',
};
for (const [diagnosticKey, planKey] of Object.entries(queryMappings)) {
  if (!approximatelyEqual(queryVisibility[diagnosticKey], querySignals[planKey])) {
    errors.push(`${diagnosticKey}: query visibility total does not match the search plan.`);
  }
}
if (
  !approximatelyEqual(
    queryVisibility.impressionCoveragePercent,
    percentage(toNumber(querySignals.visibleImpressions), toNumber(totals.impressions)),
  ) ||
  !approximatelyEqual(
    queryVisibility.chineseShareOfVisibleImpressions,
    percentage(
      toNumber(querySignals.chineseImpressions),
      toNumber(querySignals.visibleImpressions),
    ),
  )
) {
  errors.push('Query visibility percentages are inconsistent.');
}

const cleanupQueue = searchPlan.execution?.indexingCleanupQueue ?? [];
const cleanupImpressions = cleanupQueue.reduce(
  (sum, entry) => sum + toNumber(entry.impressions),
  0,
);
const cleanupOverdue = cleanupQueue.filter(
  (entry) =>
    isCalendarDate(entry.evaluateAfter) &&
    entry.evaluateAfter <= scorecardDate,
).length;
const indexingNoise = diagnostics.indexingNoise ?? {};
if (
  !approximatelyEqual(indexingNoise.routes, cleanupQueue.length) ||
  !approximatelyEqual(indexingNoise.impressions, cleanupImpressions) ||
  !approximatelyEqual(
    indexingNoise.relativeToPropertyImpressionsPercent,
    percentage(cleanupImpressions, toNumber(totals.impressions)),
  ) ||
  !approximatelyEqual(indexingNoise.overdue, cleanupOverdue)
) {
  errors.push('Indexing-noise diagnostics do not match the cleanup queue.');
}

const expectedWeeklyStatus = rangeStatus(
  toNumber(cadence.rollingSevenDays?.completedActions),
  expectedTargets.weeklyActions,
);
const expectedMonthlyStatus = rangeStatus(
  toNumber(cadence.completedActions),
  expectedTargets.monthlyActions,
);
if (
  cadence.rollingSevenDays?.status !== expectedWeeklyStatus ||
  status.weeklyCadenceStatus !== expectedWeeklyStatus
) {
  errors.push('Weekly cadence status is inconsistent.');
}
if (
  cadence.status !== expectedMonthlyStatus ||
  status.cadenceStatus !== expectedMonthlyStatus
) {
  errors.push('Monthly cadence status is inconsistent.');
}

const expectedIndexablePassRate = percentage(
  toNumber(quality.indexablePassed),
  toNumber(quality.indexablePages),
);
if (!approximatelyEqual(quality.indexablePassRate, expectedIndexablePassRate)) {
  errors.push('Indexable-page pass rate is inconsistent.');
}
const expectedQualityPass =
  expectedIndexablePassRate === expectedTargets.indexablePassRate &&
  toNumber(quality.indexableCriticalPages) === 0 &&
  toNumber(quality.indexableBlockedPages) === 0;
if (
  quality.passed !== expectedQualityPass ||
  status.qualityGatePassed !== expectedQualityPass
) {
  errors.push('Quality-gate status is inconsistent.');
}
const expectedGrowthTargetsMet = Object.values(checks).every((check) => check.met);
if (status.growthTargetsMet !== expectedGrowthTargetsMet) {
  errors.push('Growth-target status is inconsistent.');
}
const windowEvidence = evaluateSerializedWindow(scorecard.source?.window);
if (
  JSON.stringify(scorecard.source?.windowEvidence) !==
  JSON.stringify(windowEvidence)
) {
  errors.push('Search Console window evidence is inconsistent.');
}
if (status.windowVerified !== windowEvidence.verified) {
  errors.push('Window-verification status is inconsistent.');
}
const completionComparable =
  toNumber(scorecard.source?.window?.days) === 30 &&
  windowEvidence.verified;
if (status.completionComparable !== completionComparable) {
  errors.push('Completion comparability does not match the Search Console window.');
}
const expectedObjectiveEvidence =
  completionComparable &&
  expectedGrowthTargetsMet &&
  expectedQualityPass &&
  expectedWeeklyStatus === 'on-target' &&
  expectedMonthlyStatus === 'on-target';
if (status.objectiveEvidenceComplete !== expectedObjectiveEvidence) {
  errors.push('Objective completion evidence is inconsistent.');
}

console.log('# Growth Scorecard Gate');
console.log('');
console.log(`Scorecard date: ${scorecardDate || 'missing'}`);
console.log(`Window: ${toNumber(scorecard.source?.window?.days)} days`);
console.log(`Clicks / impressions: ${toNumber(totals.clicks)} / ${toNumber(totals.impressions)}`);
console.log(`US click / impression share: ${traffic.usClickShare ?? 0}% / ${traffic.usImpressionShare ?? 0}%`);
console.log(`Query visibility: ${queryVisibility.impressionCoveragePercent ?? 0}%`);
console.log(`Index cleanup: ${cleanupQueue.length} (${cleanupOverdue} overdue)`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Growth scorecard gate passed.');
