import {
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEARCH_CONSOLE_EDITORIAL_TARGETS } from './lib/search-console-cadence.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const routingReviewPath = path.resolve(
  process.env.SC_ROUTING_REVIEW_PATH ??
    path.join(projectRoot, 'reports', 'search-console-routing-reviews.json'),
);
const actionLogPath = path.resolve(
  process.env.SC_ACTION_LOG_PATH ??
    path.join(projectRoot, 'reports', 'search-console-actions.json'),
);
const weeklyActionLimit = SEARCH_CONSOLE_EDITORIAL_TARGETS.weekly.max;
const monthlyActionLimit = SEARCH_CONSOLE_EDITORIAL_TARGETS.monthly.max;
const minimumReviewDays = 14;

function usage() {
  return `Usage:
  npm run complete:sc-routing -- [options]

Required:
  --id <routing-review-id>
  --changed-route <route>        Repeat for every page changed
  --completed-at <YYYY-MM-DD>
  --baseline-period-end <YYYY-MM-DD>
  --evaluate-after <YYYY-MM-DD>
  --summary <actual changes>

Options:
  --dry-run                      Validate without writing either log
  --help                         Show this help

The command updates the routing decision and appends matching content-action
records only after date, cadence, route, duplicate, and review-window checks pass.`;
}

function parseArgs(argv) {
  const options = { changedRoutes: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`${arg} requires a value.`);
    }
    index += 1;
    if (arg === '--id') options.id = value.trim();
    else if (arg === '--changed-route') options.changedRoutes.push(value);
    else if (arg === '--completed-at') options.completedAt = value;
    else if (arg === '--baseline-period-end') {
      options.baselinePeriodEnd = value;
    } else if (arg === '--evaluate-after') options.evaluateAfter = value;
    else if (arg === '--summary') options.summary = value.trim();
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function normalizeRoute(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed.startsWith('/')) return '';
  const normalized = trimmed.replace(/\/{2,}/g, '/');
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
}

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))) return false;
  return new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
}

function shiftCalendarDate(value, offset) {
  return new Date(
    Date.parse(`${value}T00:00:00.000Z`) + offset * 86_400_000,
  )
    .toISOString()
    .slice(0, 10);
}

function daysBetween(earlier, later) {
  return Math.round(
    (
      Date.parse(`${later}T00:00:00.000Z`) -
      Date.parse(`${earlier}T00:00:00.000Z`)
    ) / 86_400_000,
  );
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

async function readJsonArray(target, label) {
  let raw;
  try {
    raw = await readFile(target, 'utf8');
  } catch {
    throw new Error(`Missing ${label}: ${target}`);
  }
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(`Invalid JSON in ${label}: ${target}`);
  }
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be a JSON array.`);
  }
  return { raw, value };
}

function validateDate(value, label) {
  if (!isCalendarDate(value)) {
    throw new Error(`${label} must be a real YYYY-MM-DD calendar date.`);
  }
}

async function stageJson(target, value, suffix) {
  await mkdir(path.dirname(target), { recursive: true });
  const temporaryPath = `${target}.tmp-${process.pid}-${Date.now()}-${suffix}`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  return temporaryPath;
}

async function commitBoth({
  actionRaw,
  actions,
  reviews,
}) {
  let actionTemp;
  let reviewTemp;
  try {
    actionTemp = await stageJson(actionLogPath, actions, 'actions');
    reviewTemp = await stageJson(routingReviewPath, reviews, 'reviews');
  } catch (error) {
    if (actionTemp) await rm(actionTemp, { force: true });
    if (reviewTemp) await rm(reviewTemp, { force: true });
    throw error;
  }
  let actionCommitted = false;
  try {
    await rename(actionTemp, actionLogPath);
    actionCommitted = true;
    await rename(reviewTemp, routingReviewPath);
  } catch (error) {
    if (actionCommitted) {
      await writeFile(actionLogPath, actionRaw, 'utf8');
    }
    await rm(actionTemp, { force: true });
    await rm(reviewTemp, { force: true });
    throw error;
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }
  if (
    !options.id ||
    !options.changedRoutes.length ||
    !options.completedAt ||
    !options.baselinePeriodEnd ||
    !options.evaluateAfter ||
    !options.summary
  ) {
    throw new Error(usage());
  }

  validateDate(options.completedAt, 'completedAt');
  validateDate(options.baselinePeriodEnd, 'baselinePeriodEnd');
  validateDate(options.evaluateAfter, 'evaluateAfter');
  if (options.completedAt > currentCalendarDate()) {
    throw new Error('completedAt cannot be in the future.');
  }
  if (options.baselinePeriodEnd > options.completedAt) {
    throw new Error('baselinePeriodEnd cannot be later than completedAt.');
  }
  if (
    daysBetween(options.completedAt, options.evaluateAfter) <
    minimumReviewDays
  ) {
    throw new Error(
      `evaluateAfter must be at least ${minimumReviewDays} days after completedAt.`,
    );
  }
  if (options.summary.length < 12) {
    throw new Error('summary must describe the actual implementation in at least 12 characters.');
  }

  const changedRoutes = [
    ...new Set(options.changedRoutes.map(normalizeRoute)),
  ];
  if (
    !changedRoutes.length ||
    changedRoutes.some((route) => !route)
  ) {
    throw new Error('Every changed-route must be a normalized site route.');
  }

  const { value: reviews } = await readJsonArray(
    routingReviewPath,
    'routing review log',
  );
  const { raw: actionRaw, value: actions } = await readJsonArray(
    actionLogPath,
    'Search Console action log',
  );
  const reviewIndex = reviews.findIndex((entry) => entry?.id === options.id);
  if (reviewIndex < 0) {
    throw new Error(`Unknown routing review id: ${options.id}`);
  }
  const review = reviews[reviewIndex];
  if (review.implementedAt) {
    throw new Error(
      `${options.id} was already completed on ${review.implementedAt}.`,
    );
  }
  if (review.action === 'owner-confirmed') {
    throw new Error('owner-confirmed decisions do not represent a page implementation.');
  }
  if (!isCalendarDate(review.plannedFor)) {
    throw new Error(`${options.id} has no valid plannedFor date.`);
  }
  if (options.completedAt < review.plannedFor) {
    throw new Error(
      `${options.id} cannot be completed before ${review.plannedFor}.`,
    );
  }

  const allowedChangedRoutes = new Set(
    [...(review.routes ?? []), ...(review.targetRoutes ?? [])].map(
      normalizeRoute,
    ),
  );
  for (const route of changedRoutes) {
    if (!allowedChangedRoutes.has(route)) {
      throw new Error(
        `${route} is outside the reviewed source and target route set.`,
      );
    }
  }
  if (
    actions.some((entry) => entry?.routingReviewId === options.id)
  ) {
    throw new Error(`${options.id} already has a matching action-log record.`);
  }
  for (const route of changedRoutes) {
    if (
      actions.some(
        (entry) =>
          normalizeRoute(entry?.route) === route &&
          entry?.completedAt === options.completedAt,
      )
    ) {
      throw new Error(
        `${route} already has a content action on ${options.completedAt}.`,
      );
    }
  }

  const rollingStart = shiftCalendarDate(options.completedAt, -6);
  const month = options.completedAt.slice(0, 7);
  const completedActions = actions.filter((entry) =>
    isCalendarDate(entry?.completedAt),
  );
  const weeklyCount = completedActions.filter(
    (entry) =>
      entry.completedAt >= rollingStart &&
      entry.completedAt <= options.completedAt,
  ).length;
  const monthlyCount = completedActions.filter(
    (entry) => entry.completedAt.startsWith(month),
  ).length;
  const affectedThrough = shiftCalendarDate(options.completedAt, 6);
  const affectedWindowEnds = new Set([
    options.completedAt,
    ...completedActions
      .map((entry) => entry.completedAt)
      .filter(
        (date) =>
          date >= options.completedAt &&
          date <= affectedThrough,
      ),
  ]);
  for (const windowEnd of affectedWindowEnds) {
    const windowStart = shiftCalendarDate(windowEnd, -6);
    const existingInWindow = completedActions.filter(
      (entry) =>
        entry.completedAt >= windowStart &&
        entry.completedAt <= windowEnd,
    ).length;
    if (existingInWindow + changedRoutes.length > weeklyActionLimit) {
      throw new Error(
        `Completion would exceed the ${weeklyActionLimit}-action rolling 7-day limit ending ${windowEnd}.`,
      );
    }
  }
  if (monthlyCount + changedRoutes.length > monthlyActionLimit) {
    throw new Error(
      `Completion would exceed the ${monthlyActionLimit}-action monthly limit.`,
    );
  }

  const actionRecords = changedRoutes.map((route) => ({
    route,
    action: 'routing-action',
    routingReviewId: options.id,
    targetRoutes: [...new Set((review.targetRoutes ?? []).map(normalizeRoute))],
    completedAt: options.completedAt,
    evaluateAfter: options.evaluateAfter,
    baselinePeriodEnd: options.baselinePeriodEnd,
    summary: options.summary,
  }));
  const nextReviews = reviews.map((entry, index) =>
    index === reviewIndex
      ? {
          ...entry,
          implementedAt: options.completedAt,
          evaluateAfter: options.evaluateAfter,
          changedRoutes,
          implementationSummary: options.summary,
        }
      : entry,
  );
  const nextActions = [...actions, ...actionRecords];

  if (!options.dryRun) {
    await commitBoth({
      actionRaw,
      actions: nextActions,
      reviews: nextReviews,
    });
  }

  console.log('# Complete Search Console Routing Action');
  console.log('');
  console.log(`Decision: ${options.id}`);
  console.log(`Changed routes: ${changedRoutes.join(', ')}`);
  console.log(`Completed: ${options.completedAt}`);
  console.log(`Evaluate after: ${options.evaluateAfter}`);
  console.log(
    `Cadence after completion: weekly=${weeklyCount + changedRoutes.length}/${weeklyActionLimit}, monthly=${monthlyCount + changedRoutes.length}/${monthlyActionLimit}`,
  );
  console.log(`Mode: ${options.dryRun ? 'dry-run' : 'written'}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
