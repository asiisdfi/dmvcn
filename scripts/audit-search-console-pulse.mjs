import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NON_SEARCH_LANDING_ROUTES } from '../src/data/publication-gate.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const pulseReportPath = path.resolve(
  process.env.SC_PULSE_REPORT_PATH ??
    path.join(projectRoot, 'reports', 'search-console-pulse.json'),
);
const searchPlanPath = path.resolve(
  process.env.SEARCH_CONSOLE_PLAN_PATH ??
    path.join(projectRoot, 'reports', 'search-console-priority.json'),
);
const actionLogPath = path.resolve(
  process.env.SC_ACTION_LOG_PATH ??
    path.join(projectRoot, 'reports', 'search-console-actions.json'),
);
const maxAgeDays = Number(process.env.SC_PULSE_MAX_AGE_DAYS ?? 7);
const expectedProperty = 'sc-domain:dmvcn.com';

async function readJson(filePath) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

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

function normalizeRoute(value) {
  const route = String(value ?? '').trim();
  if (!route.startsWith('/')) return '';
  return route === '/' || route.endsWith('/') ? route : `${route}/`;
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

function containsRawQuery(value) {
  if (Array.isArray(value)) return value.some(containsRawQuery);
  if (!value || typeof value !== 'object') return false;
  return Object.entries(value).some(
    ([key, nested]) =>
      ['query', 'topQuery', 'queryText'].includes(key) ||
      containsRawQuery(nested),
  );
}

const [pulse, searchPlan, actionLog] = await Promise.all([
  readJson(pulseReportPath),
  readJson(searchPlanPath),
  readJson(actionLogPath),
]);

if (!pulse) {
  console.error(`Missing or invalid Search Console pulse report: ${pulseReportPath}`);
  process.exit(1);
}
if (!searchPlan) {
  console.error(`Missing or invalid Search Console plan: ${searchPlanPath}`);
  process.exit(1);
}
if (!Array.isArray(actionLog)) {
  console.error(`Missing or invalid Search Console action log: ${actionLogPath}`);
  process.exit(1);
}

const errors = [];
const observedDate = String(pulse.generatedAt ?? '').slice(0, 10);
const ageDays = daysBetween(observedDate, currentCalendarDate());
const totals = pulse.metrics?.propertyTotals ?? {};
const unitedStates = pulse.metrics?.unitedStates ?? {};
const vietnam = pulse.metrics?.vietnam ?? {};
const diagnostics = pulse.diagnostics ?? {};
const audienceNoise = diagnostics.audienceNoise ?? {};
const noindexVisibility = diagnostics.noindexVisibility ?? {};
const queue = diagnostics.clickedPageQueue ?? [];
const execution = pulse.execution ?? {};
const status = pulse.status ?? {};

if (pulse.source?.property !== expectedProperty) {
  errors.push(`Pulse property must be ${expectedProperty}.`);
}
if (
  toNumber(pulse.source?.pulseWindow?.hours) !== 24 ||
  pulse.source?.pulseWindow?.provisional !== true ||
  status.provisional !== true
) {
  errors.push('Pulse must remain a provisional 24-hour window.');
}
if (ageDays === null || ageDays < 0 || ageDays > maxAgeDays) {
  errors.push(`Pulse report age must be 0-${maxAgeDays} days; found ${ageDays ?? 'invalid'}.`);
}
if (status.completionComparable !== false) {
  errors.push('A 24-hour pulse must never be marked completion-comparable.');
}
if (containsRawQuery(pulse)) {
  errors.push('Public pulse report contains a raw query field.');
}

const expectedCtr = percentage(toNumber(totals.clicks), toNumber(totals.impressions));
if (!approximatelyEqual(totals.ctr, expectedCtr, 0.1)) {
  errors.push('Property CTR is inconsistent with clicks and impressions.');
}
const expectedUsClickShare = percentage(
  toNumber(unitedStates.clicks),
  toNumber(totals.clicks),
);
const expectedUsImpressionShare = percentage(
  toNumber(unitedStates.impressions),
  toNumber(totals.impressions),
);
if (
  !approximatelyEqual(unitedStates.clickShare, expectedUsClickShare) ||
  !approximatelyEqual(unitedStates.impressionShare, expectedUsImpressionShare)
) {
  errors.push('United States traffic shares are inconsistent.');
}
const expectedVietnamShare = percentage(
  toNumber(vietnam.impressions),
  toNumber(totals.impressions),
);
if (
  !approximatelyEqual(vietnam.impressionShare, expectedVietnamShare) ||
  !approximatelyEqual(audienceNoise.impressions, vietnam.impressions) ||
  !approximatelyEqual(audienceNoise.impressionShare, expectedVietnamShare)
) {
  errors.push('Audience-noise diagnostics are inconsistent with Vietnam traffic.');
}

const devices = pulse.metrics?.devices ?? [];
for (const device of devices) {
  const expectedDeviceCtr = percentage(
    toNumber(device.clicks),
    toNumber(device.impressions),
  );
  if (!approximatelyEqual(device.ctr, expectedDeviceCtr, 0.1)) {
    errors.push(`${device.code ?? 'unknown'}: device CTR is inconsistent.`);
  }
}
const deviceClicks = devices.reduce(
  (sum, device) => sum + toNumber(device.clicks),
  0,
);
const deviceImpressions = devices.reduce(
  (sum, device) => sum + toNumber(device.impressions),
  0,
);
if (
  deviceClicks !== toNumber(totals.clicks) ||
  deviceImpressions !== toNumber(totals.impressions)
) {
  errors.push('Device rows do not exactly cover property totals.');
}
const usDevices = pulse.metrics?.unitedStatesDevices ?? [];
for (const device of usDevices) {
  const expectedDeviceCtr = percentage(
    toNumber(device.clicks),
    toNumber(device.impressions),
  );
  if (!approximatelyEqual(device.ctr, expectedDeviceCtr, 0.1)) {
    errors.push(`${device.code ?? 'unknown'}: United States device CTR is inconsistent.`);
  }
}
const usDeviceClicks = usDevices.reduce(
  (sum, device) => sum + toNumber(device.clicks),
  0,
);
const usDeviceImpressions = usDevices.reduce(
  (sum, device) => sum + toNumber(device.impressions),
  0,
);
if (
  usDeviceClicks !== toNumber(unitedStates.clicks) ||
  usDeviceImpressions !== toNumber(unitedStates.impressions)
) {
  errors.push('United States device rows do not exactly cover the country segment.');
}
const expectedUnitedStatesCtr = percentage(
  toNumber(unitedStates.clicks),
  toNumber(unitedStates.impressions),
);
const expectedVietnamCtr = percentage(
  toNumber(vietnam.clicks),
  toNumber(vietnam.impressions),
);
if (!approximatelyEqual(unitedStates.ctr, expectedUnitedStatesCtr, 0.1)) {
  errors.push('United States CTR is inconsistent.');
}
if (!approximatelyEqual(vietnam.ctr, expectedVietnamCtr, 0.1)) {
  errors.push('Vietnam CTR is inconsistent.');
}

const noindexRoutes = [...NON_SEARCH_LANDING_ROUTES].sort();
if (
  toNumber(noindexVisibility.routes) !== noindexRoutes.length ||
  toNumber(noindexVisibility.clicks) !== 0
) {
  errors.push('Noindex visibility must cover the registered utility routes with zero clicks.');
}
const expectedNoindexScale = percentage(
  toNumber(noindexVisibility.impressions),
  toNumber(totals.impressions),
);
if (
  !approximatelyEqual(
    noindexVisibility.relativeToPropertyImpressionsPercent,
    expectedNoindexScale,
  )
) {
  errors.push('Noindex visibility scale is inconsistent.');
}

const queueRoutes = queue.map((entry) => normalizeRoute(entry.route));
if (
  queueRoutes.some((route) => !route) ||
  new Set(queueRoutes).size !== queueRoutes.length ||
  queueRoutes.some((route) => noindexRoutes.includes(route))
) {
  errors.push('Clicked-page queue contains invalid, duplicate, or noindex routes.');
}
const actionsByRoute = new Map(
  actionLog.map((entry) => [normalizeRoute(entry.route), entry]),
);
for (const entry of queue) {
  const route = normalizeRoute(entry.route);
  const completedAction = actionsByRoute.get(route);
  const inCooldown =
    isCalendarDate(completedAction?.evaluateAfter) &&
    completedAction.evaluateAfter > observedDate;
  const expectedState = inCooldown ? 'cooldown' : 'observe-query-needed';
  const expectedDate = inCooldown
    ? completedAction.evaluateAfter
    : searchPlan.execution?.nextEligibleDate;
  if (
    entry.state !== expectedState ||
    entry.earliestDecisionDate !== expectedDate ||
    toNumber(entry.clicks) <= 0
  ) {
    errors.push(`${route}: clicked-page observation state is inconsistent.`);
  }
}

if (
  execution.searchPlanStatus !== searchPlan.execution?.status ||
  toNumber(execution.allowedNow) !== toNumber(searchPlan.execution?.allowedNow) ||
  execution.nextEligibleDate !== searchPlan.execution?.nextEligibleDate ||
  toNumber(execution.nextEligibleSlots) !==
    toNumber(searchPlan.execution?.nextEligibleSlots)
) {
  errors.push('Pulse execution state does not match the Search Console plan.');
}
const expectedContentActionAllowed =
  pulse.source?.pulseWindow?.provisional !== true &&
  toNumber(execution.allowedNow) > 0;
if (status.contentActionAllowed !== expectedContentActionAllowed) {
  errors.push('Content-action permission is inconsistent with the pulse and cadence gate.');
}
const expectedNoiseDominated =
  expectedVietnamShare >= 50 || expectedNoindexScale >= 30;
if (
  status.noiseDominated !== expectedNoiseDominated ||
  audienceNoise.noiseDominated !== expectedNoiseDominated
) {
  errors.push('Noise-dominated status is inconsistent.');
}

const baselineDaily = diagnostics.baselineDaily ?? {};
const momentum = diagnostics.momentum ?? {};
const expectedMomentum = {
  clicksPercentOfBaselineDaily:
    toNumber(baselineDaily.clicks) > 0
      ? round((toNumber(totals.clicks) / toNumber(baselineDaily.clicks)) * 100)
      : null,
  impressionsPercentOfBaselineDaily:
    toNumber(baselineDaily.impressions) > 0
      ? round(
          (toNumber(totals.impressions) / toNumber(baselineDaily.impressions)) * 100,
        )
      : null,
  unitedStatesClicksPercentOfBaselineDaily:
    toNumber(baselineDaily.unitedStatesClicks) > 0
      ? round(
          (toNumber(unitedStates.clicks) /
            toNumber(baselineDaily.unitedStatesClicks)) *
            100,
        )
      : null,
  unitedStatesImpressionsPercentOfBaselineDaily:
    toNumber(baselineDaily.unitedStatesImpressions) > 0
      ? round(
          (toNumber(unitedStates.impressions) /
            toNumber(baselineDaily.unitedStatesImpressions)) *
            100,
        )
      : null,
  vietnamImpressionsPercentOfBaselineDaily:
    toNumber(baselineDaily.vietnamImpressions) > 0
      ? round(
          (toNumber(vietnam.impressions) /
            toNumber(baselineDaily.vietnamImpressions)) *
            100,
        )
      : null,
};
for (const [key, value] of Object.entries(expectedMomentum)) {
  if (!approximatelyEqual(momentum[key], value)) {
    errors.push(`${key}: pulse momentum is inconsistent.`);
  }
}
const expectedRawTrafficElevated =
  toNumber(momentum.impressionsPercentOfBaselineDaily) >= 150;
const expectedUsTrend =
  toNumber(momentum.unitedStatesImpressionsPercentOfBaselineDaily) >= 125
    ? 'rising'
    : toNumber(momentum.unitedStatesImpressionsPercentOfBaselineDaily) >= 75
      ? 'stable'
      : 'softening';
if (
  status.rawTrafficElevated !== expectedRawTrafficElevated ||
  status.qualifiedUsExposureTrend !== expectedUsTrend
) {
  errors.push('Pulse traffic trend classification is inconsistent.');
}
if ((pulse.warnings ?? []).length < 3) {
  errors.push('Pulse report must retain the provisional-data warnings.');
}

console.log('# Search Console Pulse Gate');
console.log('');
console.log(`Observed: ${observedDate || 'missing'} (${ageDays ?? 'invalid'} day(s) old)`);
console.log(`Property clicks / impressions: ${toNumber(totals.clicks)} / ${toNumber(totals.impressions)}`);
console.log(`US clicks / impressions: ${toNumber(unitedStates.clicks)} / ${toNumber(unitedStates.impressions)}`);
console.log(`US click / impression share: ${unitedStates.clickShare ?? 0}% / ${unitedStates.impressionShare ?? 0}%`);
console.log(`Vietnam impression share: ${vietnam.impressionShare ?? 0}%`);
console.log(`Noindex visibility scale: ${noindexVisibility.relativeToPropertyImpressionsPercent ?? 0}%`);
console.log(`Clicked page observations: ${queue.length}`);
console.log(`Content actions allowed: ${status.contentActionAllowed}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Short-window isolation, traffic segmentation, observation queue, and cadence checks passed.');
}
