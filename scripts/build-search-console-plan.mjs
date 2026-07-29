import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_QUERY_CLASSIFICATIONS,
  isHumanReviewClassification,
  isRoutingReviewQuerySignal,
  isTargetQuerySignal,
  isUnreviewedClassification,
} from './lib/search-console-query-policy.mjs';
import {
  SEARCH_CONSOLE_EDITORIAL_TARGETS,
  countsTowardEditorialCadence,
} from './lib/search-console-cadence.mjs';
import { evaluateSerializedWindow } from './lib/search-console-window.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.join(projectRoot, 'reports', 'search-console-export.csv');
const queryReportPath = path.join(projectRoot, 'reports', 'private', 'search-console-query-export.csv');
const pageQuerySignalPath = path.join(
  projectRoot,
  'reports',
  'private',
  'search-console-page-query-signals.csv',
);
const segmentReportPath = path.join(
  projectRoot,
  'reports',
  'private',
  'search-console-segments.json',
);
const eeatReportPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
const actionLogPath = path.join(projectRoot, 'reports', 'search-console-actions.json');
const routingReviewLogPath = path.join(
  projectRoot,
  'reports',
  'search-console-routing-reviews.json',
);
const outputDir = path.resolve(
  process.env.SC_OUTPUT_DIR || path.join(projectRoot, 'reports'),
);
const privateOutputDir = path.resolve(
  process.env.SC_PRIVATE_OUTPUT_DIR || path.join(outputDir, 'private'),
);
const sourcePath = process.env.SC_REPORT_PATH || reportPath;
const querySourcePath = process.env.SC_QUERY_REPORT_PATH || queryReportPath;
const pageQuerySourcePath = process.env.SC_PAGE_QUERY_REPORT_PATH || pageQuerySignalPath;
const segmentSourcePath = process.env.SC_SEGMENT_REPORT_PATH || segmentReportPath;
const eeatSourcePath = process.env.EEAT_REPORT_PATH || eeatReportPath;
const actionLogSourcePath = process.env.SC_ACTION_LOG_PATH || actionLogPath;
const routingReviewLogSourcePath =
  process.env.SC_ROUTING_REVIEW_PATH || routingReviewLogPath;
const resolvedSourcePath = path.resolve(sourcePath);
const resolvedQuerySourcePath = path.resolve(querySourcePath);
const resolvedPageQuerySourcePath = path.resolve(pageQuerySourcePath);
const resolvedSegmentSourcePath = path.resolve(segmentSourcePath);
const resolvedRoutingReviewLogSourcePath = path.resolve(
  routingReviewLogSourcePath,
);
const relativeSourcePath = path.relative(projectRoot, resolvedSourcePath);
const relativeQuerySourcePath = path.relative(projectRoot, resolvedQuerySourcePath);
const relativePageQuerySourcePath = path.relative(projectRoot, resolvedPageQuerySourcePath);
const relativeSegmentSourcePath = path.relative(projectRoot, resolvedSegmentSourcePath);
const relativeRoutingReviewLogSourcePath = path.relative(
  projectRoot,
  resolvedRoutingReviewLogSourcePath,
);
const sourceLabel = relativeSourcePath && !relativeSourcePath.startsWith('..')
  ? relativeSourcePath
  : sourcePath;
const querySourceLabel = relativeQuerySourcePath && !relativeQuerySourcePath.startsWith('..')
  ? relativeQuerySourcePath
  : querySourcePath;
const pageQuerySourceLabel =
  relativePageQuerySourcePath && !relativePageQuerySourcePath.startsWith('..')
    ? relativePageQuerySourcePath
    : pageQuerySourcePath;
const segmentSourceLabel =
  relativeSegmentSourcePath && !relativeSegmentSourcePath.startsWith('..')
    ? relativeSegmentSourcePath
    : segmentSourcePath;
const routingReviewSourceLabel =
  relativeRoutingReviewLogSourcePath &&
  !relativeRoutingReviewLogSourcePath.startsWith('..')
    ? relativeRoutingReviewLogSourcePath
    : routingReviewLogSourcePath;
const editorialTargets = SEARCH_CONSOLE_EDITORIAL_TARGETS;
const expectedProperty = 'sc-domain:dmvcn.com';
const targetEvidenceThresholds = {
  clicks: 1,
  impressions: 5,
};
const pageQueryFreshnessDays = 7;

function currentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: process.env.REPORT_TIME_ZONE || 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const planDate = (process.env.SC_PLAN_DATE || currentCalendarDate()).slice(0, 10);
const defaultPlanRows = {
  generatedAt: `${planDate}T00:00:00.000Z`,
  source: sourceLabel,
  querySource: querySourceLabel,
  pageQuerySource: pageQuerySourceLabel,
  segmentSource: segmentSourceLabel,
  routingReviewSource: routingReviewSourceLabel,
  routingReviews: {
    records: 0,
    pendingReview: 0,
    pendingAction: 0,
    executeNow: 0,
    monitoring: 0,
  },
  totalRows: 0,
  includedRows: 0,
  querySignals: null,
  dataSnapshot: {
    readyForPlanning: false,
    blockers: ['缺少页面维度导出。'],
  },
  execution: {
    status: 'hold-data',
    targetEvidenceThresholds,
    allowedNow: 0,
    executeNow: [],
    routingAllowedNow: 0,
    routingExecuteNow: [],
    nextQueue: [],
    dataCollectionQueue: [],
    queryReviewQueue: [],
    routingReviewQueue: [],
    routingActionQueue: [],
    routingMonitoringQueue: [],
    lowEvidenceQueue: [],
    humanReviewQueue: [],
    indexingCleanupQueue: [],
  },
  actions: {
    improveAnswer: [],
    improveTitle: [],
    refreshRule: [],
    newTopics: [],
    needsQueryEvidence: [],
    queryReview: [],
    routingReview: [],
    routingAction: [],
    routingMonitoring: [],
    lowEvidence: [],
    nonTarget: [],
    humanReview: [],
    cooldown: [],
  },
  prioritized: [],
  warnings: ['未检测到可用的 Search Console 导出文件；请先导出后通过 SC_REPORT_PATH 指定。'],
};

function parseCsv(text) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ',') {
      row.push(value);
      value = '';
      continue;
    }

    if (!inQuotes && char === '\n') {
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  if (rows.length === 0) return [];
  const header = rows[0].map((item) => item.trim().replace(/^\uFEFF/, '').toLowerCase().replace(/\s+/g, ''));
  return rows
    .slice(1)
    .filter((line) => line.some((cell) => (cell ?? '').trim() !== ''))
    .map((line) => {
      const map = {};
      header.forEach((key, index) => {
        map[key] = (line[index] ?? '').trim();
      });
      return map;
    });
}

function toNumber(value) {
  if (value === undefined || value === null) return 0;
  const normalized = String(value)
    .replace(/%/g, '')
    .replace(/,/g, '')
    .trim();
  const n = Number(normalized);
  return Number.isFinite(n) ? n : 0;
}

function normalizeRoute(value) {
  if (!value) return '';
  const trimmed = String(value).trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      return parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
    } catch {
      return '';
    }
  }
  if (!trimmed.startsWith('/')) return '';
  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
}

function isCalendarDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''));
}

function calendarDateToMs(value) {
  return isCalendarDate(value) ? Date.parse(`${value}T00:00:00.000Z`) : Number.NaN;
}

function daysBetween(earlier, later) {
  const earlierMs = calendarDateToMs(earlier);
  const laterMs = calendarDateToMs(later);
  if (!Number.isFinite(earlierMs) || !Number.isFinite(laterMs)) return null;
  return Math.round((laterMs - earlierMs) / 86_400_000);
}

function shiftCalendarDate(value, days) {
  const date = new Date(calendarDateToMs(value));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function actionCountsForDate(actionLog, date) {
  const month = date.slice(0, 7);
  const rollingStart = shiftCalendarDate(date, -6);
  const completed = actionLog.filter(
    (entry) =>
      countsTowardEditorialCadence(entry) &&
      isCalendarDate(entry.completedAt) &&
      entry.completedAt <= date,
  );
  return {
    weekly: completed.filter((entry) => entry.completedAt >= rollingStart).length,
    monthly: completed.filter((entry) => entry.completedAt.startsWith(month)).length,
  };
}

function availableEditorialSlots(actionLog, date) {
  const counts = actionCountsForDate(actionLog, date);
  return {
    ...counts,
    slots: Math.max(
      0,
      Math.min(
        editorialTargets.weekly.max - counts.weekly,
        editorialTargets.monthly.max - counts.monthly,
      ),
    ),
  };
}

function nextEditorialWindow(actionLog, fromDate) {
  for (let offset = 0; offset <= 62; offset += 1) {
    const date = shiftCalendarDate(fromDate, offset);
    const capacity = availableEditorialSlots(actionLog, date);
    if (capacity.slots > 0) return { date, ...capacity };
  }
  return null;
}

function priorityScore(item) {
  if (
    item.action === 'observe' ||
    item.action === 'observe-non-target' ||
    item.action === 'observe-low-evidence' ||
    item.action === 'routing-monitor'
  ) {
    return 0;
  }
  let score = 0;
  if (item.action === 'improve-answer') score += 40;
  if (item.action === 'improve-title') score += 35;
  if (item.action === 'refresh-rule-change') score += 30;
  if (item.action === 'new-topic') score += 20;
  if (item.action === 'needs-query-evidence') score += 10;
  if (item.action === 'query-review') score += 15;
  if (item.action === 'routing-review') score += 15;
  if (item.action === 'routing-action') score += 15;
  if (item.action === 'routing-recheck') score += 15;
  if (item.action === 'human-review') score += 15;

  if (item.ctrCurrent < 1) score += 12;
  if (item.positionCurrent > 20) score += 10;
  if (item.impressionsCurrent > 150) score += 8;
  if (item.clicksCurrent === 0 && item.impressionsCurrent > 30) score += 12;

  if (item.impressionsDelta < -40) score += 20;
  if (item.impressionsDelta > 40) score += 10;

  return score;
}

let eeat;
try {
  eeat = JSON.parse(await readFile(path.resolve(eeatSourcePath), 'utf8'));
} catch {
  console.error('未检测到 eeat-inventory.json，请先 npm run build && npm run audit:eeat。');
  throw new Error('missing-eeat');
}

const siteRoutes = new Set(
  (eeat.pages ?? [])
    .filter((page) => page.indexable)
    .map((page) => page.route),
);
const knownNoindexRoutes = new Set(
  (eeat.pages ?? [])
    .filter((page) => !page.indexable)
    .map((page) => page.route),
);
let actionLog = [];
try {
  actionLog = JSON.parse(await readFile(path.resolve(actionLogSourcePath), 'utf8'));
} catch {
  actionLog = [];
}
const latestActionByRoute = new Map();
for (const entry of actionLog) {
  if (
    entry?.countsTowardCadence === false &&
    entry?.action !== 'noindex'
  ) {
    throw new Error(
      `${entry?.route ?? 'Unknown route'}: only noindex governance records may opt out of editorial cadence.`,
    );
  }
  const route = normalizeRoute(entry.route);
  if (
    !route ||
    !/^\d{4}-\d{2}-\d{2}$/.test(entry.completedAt ?? '') ||
    !/^\d{4}-\d{2}-\d{2}$/.test(entry.evaluateAfter ?? '')
  ) {
    continue;
  }
  const current = latestActionByRoute.get(route);
  if (!current || current.completedAt < entry.completedAt) {
    latestActionByRoute.set(route, { ...entry, route });
  }
}

let rawRoutingReviews = [];
try {
  rawRoutingReviews = JSON.parse(
    await readFile(resolvedRoutingReviewLogSourcePath, 'utf8'),
  );
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}
if (!Array.isArray(rawRoutingReviews)) {
  throw new Error('Search Console routing review log must be a JSON array.');
}

const routingReviewIds = new Set();
const allowedRoutingActions = new Set([
  'owner-confirmed',
  'intent-links',
  'destination-page-update',
]);
const routingReviews = rawRoutingReviews.map((entry, index) => {
  const label = `routing review ${index + 1}`;
  const id = String(entry?.id ?? '').trim();
  const routes = Array.isArray(entry?.routes)
    ? [...new Set(entry.routes.map(normalizeRoute))]
    : [];
  const targetRoutes = Array.isArray(entry?.targetRoutes)
    ? [...new Set(entry.targetRoutes.map(normalizeRoute))]
    : [];
  const expectedLinks = Array.isArray(entry?.expectedLinks)
    ? entry.expectedLinks.map((link) => ({
        from: normalizeRoute(link?.from),
        to: normalizeRoute(link?.to),
      }))
    : [];
  const reviewedAt = String(entry?.reviewedAt ?? '');
  const reviewedThrough = String(entry?.reviewedThrough ?? '');
  const plannedFor = String(entry?.plannedFor ?? '');
  const implementedAt = String(entry?.implementedAt ?? '');
  const evaluateAfter = String(entry?.evaluateAfter ?? '');
  const changedRoutes = Array.isArray(entry?.changedRoutes)
    ? [...new Set(entry.changedRoutes.map(normalizeRoute))]
    : [];
  const action = String(entry?.action ?? '').trim();
  const summary = String(entry?.summary ?? '').trim();
  const implementationSummary = String(
    entry?.implementationSummary ?? '',
  ).trim();

  if (!id || routingReviewIds.has(id)) {
    throw new Error(`${label}: missing or duplicate id.`);
  }
  routingReviewIds.add(id);
  if (!allowedRoutingActions.has(action) || !summary) {
    throw new Error(`${id}: action and summary are required.`);
  }
  if (!routes.length || routes.some((route) => !route)) {
    throw new Error(`${id}: routes must contain normalized site routes.`);
  }
  if (!targetRoutes.length || targetRoutes.some((route) => !route)) {
    throw new Error(`${id}: targetRoutes must contain normalized site routes.`);
  }
  for (const route of routes) {
    if (!siteRoutes.has(route) && !knownNoindexRoutes.has(route)) {
      throw new Error(`${id}: unknown source route ${route}.`);
    }
  }
  for (const route of targetRoutes) {
    if (!siteRoutes.has(route)) {
      throw new Error(`${id}: target route must be indexable: ${route}.`);
    }
  }
  const expectedLinkKeys = new Set();
  for (const link of expectedLinks) {
    if (!link.from || !link.to) {
      throw new Error(`${id}: expectedLinks must use normalized from/to routes.`);
    }
    if (!routes.includes(link.from)) {
      throw new Error(`${id}: expected link source is outside routes: ${link.from}.`);
    }
    if (!targetRoutes.includes(link.to)) {
      throw new Error(`${id}: expected link target is outside targetRoutes: ${link.to}.`);
    }
    const key = `${link.from}\t${link.to}`;
    if (expectedLinkKeys.has(key)) {
      throw new Error(`${id}: duplicate expected link ${link.from} -> ${link.to}.`);
    }
    expectedLinkKeys.add(key);
  }
  if (action === 'intent-links' && !expectedLinks.length) {
    throw new Error(`${id}: intent-links decisions require expectedLinks.`);
  }
  if (action !== 'intent-links' && expectedLinks.length) {
    throw new Error(`${id}: expectedLinks are only valid for intent-links decisions.`);
  }
  if (!isCalendarDate(reviewedAt) || !isCalendarDate(reviewedThrough)) {
    throw new Error(`${id}: reviewedAt and reviewedThrough are required.`);
  }
  if (reviewedAt > planDate || reviewedThrough > planDate) {
    throw new Error(`${id}: review dates cannot be later than the plan date.`);
  }
  if (reviewedThrough > reviewedAt) {
    throw new Error(`${id}: reviewedThrough cannot be later than reviewedAt.`);
  }
  if (plannedFor && !isCalendarDate(plannedFor)) {
    throw new Error(`${id}: plannedFor must be a calendar date.`);
  }
  if (plannedFor && plannedFor < reviewedAt) {
    throw new Error(`${id}: plannedFor cannot precede reviewedAt.`);
  }
  if (action !== 'owner-confirmed' && !isCalendarDate(plannedFor)) {
    throw new Error(`${id}: page-routing actions require plannedFor.`);
  }
  if (implementedAt && !isCalendarDate(implementedAt)) {
    throw new Error(`${id}: implementedAt must be a calendar date.`);
  }
  if (implementedAt && implementedAt > planDate) {
    throw new Error(`${id}: implementedAt cannot be later than the plan date.`);
  }
  if (evaluateAfter && !isCalendarDate(evaluateAfter)) {
    throw new Error(`${id}: evaluateAfter must be a calendar date.`);
  }
  if (implementedAt && !evaluateAfter) {
    throw new Error(`${id}: implemented reviews require evaluateAfter.`);
  }
  if (evaluateAfter && !implementedAt) {
    throw new Error(`${id}: evaluateAfter requires implementedAt.`);
  }
  if (implementedAt && implementedAt < reviewedAt) {
    throw new Error(`${id}: implementedAt cannot precede reviewedAt.`);
  }
  if (implementedAt && plannedFor && implementedAt < plannedFor) {
    throw new Error(`${id}: implementedAt cannot precede plannedFor.`);
  }
  if (
    evaluateAfter &&
    daysBetween(implementedAt, evaluateAfter) < 14
  ) {
    throw new Error(
      `${id}: evaluateAfter must be at least 14 days after implementedAt.`,
    );
  }
  if (action === 'owner-confirmed' && !implementedAt) {
    throw new Error(`${id}: owner-confirmed decisions must be recorded as implemented.`);
  }
  if (
    changedRoutes.some((route) => !route) ||
    changedRoutes.some(
      (route) => !routes.includes(route) && !targetRoutes.includes(route),
    )
  ) {
    throw new Error(
      `${id}: changedRoutes must stay within the reviewed source and target routes.`,
    );
  }
  if (!implementedAt && (changedRoutes.length || implementationSummary)) {
    throw new Error(`${id}: unimplemented reviews cannot claim changed routes.`);
  }
  if (
    implementedAt &&
    action !== 'owner-confirmed' &&
    (!changedRoutes.length || implementationSummary.length < 12)
  ) {
    throw new Error(
      `${id}: implemented page-routing actions require changedRoutes and an implementationSummary.`,
    );
  }
  if (action === 'owner-confirmed' && changedRoutes.length) {
    throw new Error(`${id}: owner-confirmed decisions cannot claim page changes.`);
  }
  if ('query' in entry || 'queries' in entry) {
    throw new Error(`${id}: raw queries must stay in reports/private/.`);
  }

  return {
    id,
    routes,
    targetRoutes,
    expectedLinks,
    reviewedAt,
    reviewedThrough,
    plannedFor,
    implementedAt,
    evaluateAfter,
    changedRoutes,
    action,
    summary,
    implementationSummary,
  };
});

const routingReviewsById = new Map(
  routingReviews.map((review) => [review.id, review]),
);
for (const entry of actionLog) {
  const routingReviewId = String(entry?.routingReviewId ?? '').trim();
  if (!routingReviewId) continue;
  const review = routingReviewsById.get(routingReviewId);
  if (!review) {
    throw new Error(
      `Search Console action log references unknown routing review ${routingReviewId}.`,
    );
  }
  const route = normalizeRoute(entry.route);
  const loggedTargetRoutes = Array.isArray(entry?.targetRoutes)
    ? [...new Set(entry.targetRoutes.map(normalizeRoute))]
    : [];
  const targetRoutesMatch =
    loggedTargetRoutes.length === review.targetRoutes.length &&
    review.targetRoutes.every((targetRoute) =>
      loggedTargetRoutes.includes(targetRoute),
    );
  if (
    !review.implementedAt ||
    !review.changedRoutes.includes(route) ||
    entry.completedAt !== review.implementedAt ||
    entry.evaluateAfter !== review.evaluateAfter ||
    !isCalendarDate(entry.baselinePeriodEnd) ||
    entry.baselinePeriodEnd > entry.completedAt ||
    !targetRoutesMatch ||
    String(entry.summary ?? '').trim() !== review.implementationSummary
  ) {
    throw new Error(
      `${routingReviewId}: action-log record does not match the implemented routing decision.`,
    );
  }
}
for (const review of routingReviews) {
  const matchingActions = actionLog.filter(
    (entry) => entry?.routingReviewId === review.id,
  );
  if (!review.implementedAt || review.action === 'owner-confirmed') {
    if (matchingActions.length) {
      throw new Error(
        `${review.id}: decision-only review cannot have implementation action records.`,
      );
    }
    continue;
  }
  const matchedRoutes = matchingActions.map((entry) =>
    normalizeRoute(entry.route),
  );
  if (
    matchingActions.length !== review.changedRoutes.length ||
    review.changedRoutes.some(
      (route) =>
        matchedRoutes.filter((matchedRoute) => matchedRoute === route).length !==
        1,
    )
  ) {
    throw new Error(
      `${review.id}: every changed route requires exactly one matching action-log record.`,
    );
  }
}

function routingReviewFor(route, observedThrough) {
  return routingReviews
    .filter(
      (review) =>
        review.routes.includes(route) &&
        review.reviewedThrough >= observedThrough,
    )
    .sort(
      (a, b) =>
        b.reviewedThrough.localeCompare(a.reviewedThrough) ||
        b.reviewedAt.localeCompare(a.reviewedAt),
    )[0];
}

function routingDecisionStatus(review) {
  if (!review) return 'unreviewed';
  if (!review.implementedAt) {
    return review.plannedFor && review.plannedFor > planDate
      ? 'scheduled'
      : 'action-due';
  }
  return review.evaluateAfter > planDate ? 'monitoring' : 'recheck-due';
}

let raw;
try {
  raw = await readFile(path.resolve(sourcePath), 'utf8');
} catch (error) {
  const warning = `未找到 Search Console 导出文件：${sourcePath}`;
  console.error(warning);

  const report = {
    ...defaultPlanRows,
    warnings: [warning],
    note: '请在每月首轮执行前上传 search-console-export.csv 后重新运行。',
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'search-console-priority.json'), `${JSON.stringify(report, null, 2)}\n`);

  const markdown = [
    `# Search Console 月度行动建议 (${planDate})`,
    '',
    `- 数据源：${sourcePath}`,
    '- 当前未检测到数据文件。',
    '- 请先在 Google Search Console 下载“页面”和“查询”维度的 CSV。',
    '',
    '## 等待输入',
    '- export 未生成前无法自动输出规则建议。',
  ];

  await writeFile(path.join(outputDir, 'search-console-priority.csv'), 'route,impressionsCurrent,clicksCurrent,action,reason\n');
  await writeFile(path.join(outputDir, 'search-console-priority.md'), `${markdown.join('\n').trimEnd()}\n`);

  console.log('Search Console priority report generated:');
  console.log('- reports/search-console-priority.json');
  console.log('- reports/search-console-priority.csv');
  console.log('- reports/search-console-priority.md');
  console.log('- 状态：未找到可解析 CSV（未中断流程）');
  process.exit(0);
}

const rows = parseCsv(raw);
if (!rows.length) {
  console.error('CSV 为空或无法解析。请确认是导出后的表头文本。');
  process.exit(1);
}

function getCell(row, candidates) {
  const lowerKeys = Object.keys(row);
  const key = lowerKeys.find((k) => candidates.includes(k));
  return key ? row[key] : '';
}

function pickNumber(row, candidates) {
  const key = Object.keys(row).find((candidate) => candidates.includes(candidate));
  return toNumber(key ? row[key] : 0);
}

let queryRows = [];
let queryWarning = '';
try {
  queryRows = parseCsv(await readFile(resolvedQuerySourcePath, 'utf8'));
} catch {
  queryWarning = `未找到 Search Console 查询导出文件：${querySourcePath}`;
}
let pageQueryRows = [];
let pageQueryWarning = '';
try {
  pageQueryRows = parseCsv(await readFile(resolvedPageQuerySourcePath, 'utf8'));
} catch {
  pageQueryWarning = `未找到 Search Console 页面查询映射：${pageQuerySourcePath}`;
}
let segmentSnapshot = null;
let segmentWarning = '';
try {
  segmentSnapshot = JSON.parse(await readFile(resolvedSegmentSourcePath, 'utf8'));
} catch {
  segmentWarning = `未找到 Search Console 分段快照：${segmentSourcePath}`;
}

const queryItems = queryRows
  .map((row) => ({
    query: getCell(row, ['query', 'queries', '热门查询']),
    clicks: pickNumber(row, ['clicks', '点击次数']),
    impressions: pickNumber(row, ['impressions', '展示']),
    ctr: pickNumber(row, ['ctr', '点击率']),
    position: pickNumber(row, ['position', '排名']),
  }))
  .filter((item) => item.query);
const isChineseQuery = (query) => /\p{Script=Han}/u.test(query);
const isGenericDmvQuery = (query) =>
  /^(?:department of motor vehicles(?:\s*\(dmv\))?(?:\s+(?:near me|phone number|customer service))?|dmv(?:\s+near me)?|dept motor vehicles near me)$/i.test(
    query.trim(),
  );
const isDmvRelevantChineseQuery = (query) =>
  /(dmv|驾照|驾驶证|车管所|车\s*管\s*所|real\s*id|身份证|地址证明|坐飞机|考驾照|车辆|过户)/i.test(
    query,
  ) && !/^dmv\s*看$/i.test(query.trim());
const isHighRiskChineseQuery = (query) =>
  /(精神|病史|痊愈|复职|吊销|暂停|债务|承担债务|法律责任)/.test(query);
const topByImpressions = (items, limit = 25) =>
  [...items]
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .slice(0, limit);
const queryEvidenceTotals = (items) => {
  const clicks = items.reduce((sum, item) => sum + item.clicks, 0);
  const impressions = items.reduce((sum, item) => sum + item.impressions, 0);
  return {
    clicks,
    impressions,
    ready:
      clicks >= targetEvidenceThresholds.clicks ||
      impressions >= targetEvidenceThresholds.impressions,
  };
};
const chineseQueryItems = queryItems.filter((item) => isChineseQuery(item.query));
const pageQuerySignals = pageQueryRows
  .map((row) => ({
    route: normalizeRoute(getCell(row, ['route', 'page', 'url'])),
    query: getCell(row, ['query', 'queries', '热门查询']),
    clicks: pickNumber(row, ['clicks', '点击次数']),
    impressions: pickNumber(row, ['impressions', '展示']),
    position: pickNumber(row, ['position', '排名']),
    classification: getCell(row, ['classification', 'class']),
    observedAt: getCell(row, ['observedat', 'date']),
  }))
  .filter((item) => item.route && item.query && siteRoutes.has(item.route));
const invalidPageQueryClassifications = pageQuerySignals.filter(
  (signal) => !ALLOWED_QUERY_CLASSIFICATIONS.has(signal.classification),
);
const invalidPageQueryObservedDates = pageQuerySignals.filter(
  (signal) => !isCalendarDate(signal.observedAt),
);
const pageQueryMap = new Map();
for (const signal of pageQuerySignals) {
  const signals = pageQueryMap.get(signal.route) ?? [];
  signals.push(signal);
  pageQueryMap.set(signal.route, signals);
}
const pageQueryRouteFreshness = [...pageQueryMap.entries()].map(
  ([route, signals]) => {
    const observedDates = [
      ...new Set(
        signals
          .map((signal) => signal.observedAt)
          .filter((value) => isCalendarDate(value)),
      ),
    ].sort();
    const observedFrom = observedDates[0] ?? null;
    const observedThrough = observedDates.at(-1) ?? null;
    const ageDays = observedFrom
      ? daysBetween(observedFrom, planDate)
      : null;
    return {
      route,
      signals: signals.length,
      observedFrom,
      observedThrough,
      ageDays,
      fresh:
        observedDates.length > 0 &&
        signals.every((signal) => isCalendarDate(signal.observedAt)) &&
        ageDays !== null &&
        ageDays >= 0 &&
        ageDays <= pageQueryFreshnessDays,
    };
  },
);
const pageQueryFreshnessByRoute = new Map(
  pageQueryRouteFreshness.map((item) => [item.route, item]),
);
const querySignals = queryItems.length
  ? {
      totalRows: queryItems.length,
      visibleClicks: queryItems.reduce((sum, item) => sum + item.clicks, 0),
      visibleImpressions: queryItems.reduce((sum, item) => sum + item.impressions, 0),
      chineseRows: chineseQueryItems.length,
      chineseClicks: chineseQueryItems.reduce((sum, item) => sum + item.clicks, 0),
      chineseImpressions: chineseQueryItems.reduce((sum, item) => sum + item.impressions, 0),
      genericDmvImpressions: queryItems
        .filter((item) => isGenericDmvQuery(item.query))
        .reduce((sum, item) => sum + item.impressions, 0),
      topQueries: topByImpressions(queryItems),
      topChineseQueries: topByImpressions(chineseQueryItems),
      chineseOpportunities: topByImpressions(
        chineseQueryItems.filter(
          (item) =>
            isDmvRelevantChineseQuery(item.query) &&
            !isHighRiskChineseQuery(item.query) &&
            (item.impressions >= 2 || item.position <= 30),
        ),
      ),
      humanReviewSignals: topByImpressions(
        chineseQueryItems.filter(
          (item) => isDmvRelevantChineseQuery(item.query) && isHighRiskChineseQuery(item.query),
        ),
      ),
    }
  : null;
const publicQuerySignals = querySignals
  ? {
      totalRows: querySignals.totalRows,
      visibleClicks: querySignals.visibleClicks,
      visibleImpressions: querySignals.visibleImpressions,
      chineseRows: querySignals.chineseRows,
      chineseClicks: querySignals.chineseClicks,
      chineseImpressions: querySignals.chineseImpressions,
      genericDmvImpressions: querySignals.genericDmvImpressions,
      chineseOpportunities: querySignals.chineseOpportunities.length,
      humanReviewSignals: querySignals.humanReviewSignals.length,
    }
  : null;
const snapshotObservedAt = segmentSnapshot?.observedAt ?? null;
const snapshotDataThrough = segmentSnapshot?.window?.dataShownThrough ?? null;
const windowEvidence = evaluateSerializedWindow(segmentSnapshot?.window);
const snapshotAgeDays = daysBetween(snapshotObservedAt, planDate);
const snapshotLagDays = daysBetween(snapshotDataThrough, planDate);
const signalObservedDates = [
  ...new Set(
    pageQuerySignals
      .map((signal) => signal.observedAt)
      .filter((value) => isCalendarDate(value)),
  ),
].sort();
const freshPageQueryRoutes = pageQueryRouteFreshness.filter(
  (item) => item.fresh,
);
const stalePageQueryRoutes = pageQueryRouteFreshness.filter(
  (item) => !item.fresh,
);
const dataBlockers = [];
if (!segmentSnapshot) dataBlockers.push('缺少分段快照，无法确认属性、时间窗口和全站总量。');
if (segmentSnapshot && segmentSnapshot.property !== expectedProperty) {
  dataBlockers.push(`分段快照属性不是 ${expectedProperty}。`);
}
if (toNumber(segmentSnapshot?.window?.days) < 28) {
  dataBlockers.push('Search Console 时间窗口少于 28 天，不用于内容优先级判断。');
}
if (segmentSnapshot && !windowEvidence.verified) {
  dataBlockers.push('Search Console 时间窗口缺少可核对的筛选标签或图表日期跨度。');
}
if (snapshotAgeDays === null || snapshotAgeDays < 0 || snapshotAgeDays > 7) {
  dataBlockers.push('分段快照距计划日期超过 7 天或日期无效。');
}
if (snapshotLagDays === null || snapshotLagDays < 0 || snapshotLagDays > 7) {
  dataBlockers.push('Search Console 最新完整数据距计划日期超过 7 天或日期无效。');
}
if (!queryItems.length) dataBlockers.push('缺少查询维度数据，不能证明真实搜索意图。');
if (!pageQuerySignals.length) {
  dataBlockers.push('缺少页面与查询映射，不能把查询意图归因到具体页面。');
}
if (invalidPageQueryClassifications.length > 0) {
  dataBlockers.push(
    `有 ${invalidPageQueryClassifications.length} 条页面查询缺少有效分类，不能用于内容决策。`,
  );
}
if (invalidPageQueryObservedDates.length > 0) {
  dataBlockers.push(
    `有 ${invalidPageQueryObservedDates.length} 条页面查询缺少有效观察日期。`,
  );
}
const dataSnapshot = {
  property: segmentSnapshot?.property ?? null,
  observedAt: snapshotObservedAt,
  ageDays: snapshotAgeDays,
  windowDays: toNumber(segmentSnapshot?.window?.days),
  windowVerified: windowEvidence.verified,
  windowVerificationMethod: windowEvidence.method,
  dataThrough: snapshotDataThrough,
  dataLagDays: snapshotLagDays,
  pageRows: rows.length,
  queryRows: queryItems.length,
  pageQuerySignals: pageQuerySignals.length,
  invalidPageQueryClassifications: invalidPageQueryClassifications.length,
  invalidPageQueryObservedDates: invalidPageQueryObservedDates.length,
  pageQueryFreshnessDays,
  pageQueryRoutes: pageQueryRouteFreshness.length,
  freshPageQueryRoutes: freshPageQueryRoutes.length,
  stalePageQueryRoutes: stalePageQueryRoutes.length,
  stalePageQuerySignals: stalePageQueryRoutes.reduce(
    (sum, item) => sum + item.signals,
    0,
  ),
  pageQueryObservedFrom: signalObservedDates[0] ?? null,
  pageQueryObservedThrough: signalObservedDates.at(-1) ?? null,
  readyForPlanning: dataBlockers.length === 0,
  completionComparable:
    toNumber(segmentSnapshot?.window?.days) === 30 &&
    windowEvidence.verified,
  blockers: dataBlockers,
};

const pageMap = new Map();
const excludedPageMap = new Map();
for (const row of rows) {
  const page = normalizeRoute(
    getCell(row, ['page', 'landingpage', 'link', 'url', '排名靠前的网页']),
  );
  if (!page) continue;
  if (!siteRoutes.has(page)) {
    const excluded = excludedPageMap.get(page) ?? {
      route: page,
      clicks: 0,
      impressions: 0,
      knownNoindex: knownNoindexRoutes.has(page),
    };
    excluded.clicks += pickNumber(row, ['clicks', 'clickscurrent', '点击次数']);
    excluded.impressions += pickNumber(row, [
      'impressions',
      'impressionscurrent',
      'impression',
      '展示',
    ]);
    excludedPageMap.set(page, excluded);
    continue;
  }

  const entry = pageMap.get(page) || {
    page,
    impressionsCurrent: 0,
    clicksCurrent: 0,
    ctrCurrent: 0,
    positionCurrent: 0,
    impressionsPrevious: 0,
    clicksPrevious: 0,
    ctrPrevious: 0,
    positionPrevious: 0,
    topQueries: [],
    queriesCount: 0,
  };

  const impressionsCurrent = pickNumber(row, ['impressions', 'impressionscurrent', 'impression', '展示']);
  const clicksCurrent = pickNumber(row, ['clicks', 'clickscurrent', '点击次数']);
  const ctrCurrent = pickNumber(row, ['ctr', 'ctrcurrent', '点击率']);
  const positionCurrent = pickNumber(row, ['position', 'positioncurrent', '排名']);
  const impressionsPrevious = pickNumber(row, ['impressionsprevious', 'impressions_prev', 'previousimpressions']);
  const clicksPrevious = pickNumber(row, ['clicksprevious', 'clicks_prev', 'previousclicks']);
  const ctrPrevious = pickNumber(row, ['ctrprevious', 'previousctr']);
  const positionPrevious = pickNumber(row, ['positionprevious', 'position_prev', 'previousposition']);
  const query = getCell(row, ['query', 'queries', '热门查询']);

  if (query) {
    entry.topQueries.push({
      query,
      impressions: impressionsCurrent,
      clicks: clicksCurrent,
      ctr: ctrCurrent,
    });
  }

  entry.impressionsCurrent += impressionsCurrent;
  entry.clicksCurrent += clicksCurrent;
  entry.ctrCurrent += ctrCurrent;
  entry.positionCurrent += positionCurrent;
  entry.impressionsPrevious += impressionsPrevious;
  entry.clicksPrevious += clicksPrevious;
  entry.ctrPrevious += ctrPrevious;
  entry.positionPrevious += positionPrevious;
  entry.queriesCount += 1;
  pageMap.set(page, entry);
}
const indexingCleanupQueue = [...excludedPageMap.values()]
  .filter((item) => item.impressions > 0)
  .sort((a, b) => b.impressions - a.impressions || a.route.localeCompare(b.route))
  .map((item) => {
    const completedAction = latestActionByRoute.get(item.route);
    const trackedNoindex =
      item.knownNoindex &&
      completedAction?.action === 'noindex';
    const overdue =
      trackedNoindex &&
      completedAction.evaluateAfter <= planDate;

    let status = 'untracked-route';
    let action = 'investigate-route';
    if (item.knownNoindex && !trackedNoindex) {
      status = 'untracked-noindex';
      action = 'verify-noindex-history';
    } else if (overdue) {
      status = 'deindex-overdue';
      action = 'inspect-indexing';
    } else if (trackedNoindex) {
      status = 'deindex-grace';
      action = 'observe-deindex';
    }

    return {
      ...item,
      status,
      action,
      completedAt: trackedNoindex ? completedAction.completedAt : null,
      evaluateAfter: trackedNoindex ? completedAction.evaluateAfter : null,
    };
  });
dataSnapshot.excludedPageRows = indexingCleanupQueue.length;
dataSnapshot.excludedPageImpressions = indexingCleanupQueue.reduce(
  (sum, item) => sum + item.impressions,
  0,
);
dataSnapshot.indexingCleanupOverdue = indexingCleanupQueue.filter(
  (item) => item.status === 'deindex-overdue',
).length;

const allRows = [...pageMap.values()].map((item) => {
  const impressionsCurrent = Math.round(item.impressionsCurrent);
  const impressionsPrevious = Math.round(item.impressionsPrevious);
  const clicksCurrent = Math.round(item.clicksCurrent);
  const clicksPrevious = Math.round(item.clicksPrevious);

  const positionCurrent = item.queriesCount ? item.positionCurrent / item.queriesCount : 0;
  const positionPrevious = item.queriesCount ? item.positionPrevious / item.queriesCount : 0;
  const ctrCurrent = item.queriesCount ? item.ctrCurrent / item.queriesCount : 0;
  const ctrPrevious = item.queriesCount ? item.ctrPrevious / item.queriesCount : 0;

  const impressionsDelta = impressionsPrevious > 0 ? ((impressionsCurrent - impressionsPrevious) / impressionsPrevious) * 100 : 100;
  const clicksDelta = clicksPrevious > 0 ? ((clicksCurrent - clicksPrevious) / clicksPrevious) * 100 : clicksCurrent > 0 ? 100 : 0;

  const allMatchedQuerySignals = pageQueryMap.get(item.page) ?? [];
  const queryEvidenceFreshness =
    pageQueryFreshnessByRoute.get(item.page) ?? {
      observedFrom: null,
      observedThrough: null,
      ageDays: null,
      fresh: false,
    };
  const matchedQuerySignals = topByImpressions(allMatchedQuerySignals, 8);
  const targetQuerySignals = allMatchedQuerySignals.filter(isTargetQuerySignal);
  const routingReviewQuerySignals = allMatchedQuerySignals.filter(
    isRoutingReviewQuerySignal,
  );
  const routingEvidenceObservedThrough = routingReviewQuerySignals.reduce(
    (latest, signal) =>
      signal.observedAt > latest ? signal.observedAt : latest,
    '',
  );
  const routingDecision = routingReviewQuerySignals.length
    ? routingReviewFor(item.page, routingEvidenceObservedThrough)
    : undefined;
  const routingDecisionState = routingReviewQuerySignals.length
    ? routingDecisionStatus(routingDecision)
    : 'none';
  const routingDecisionAgeDays = routingDecision?.reviewedThrough
    ? daysBetween(routingDecision.reviewedThrough, planDate)
    : null;
  const routingDecisionFresh =
    routingDecisionAgeDays !== null &&
    routingDecisionAgeDays >= 0 &&
    routingDecisionAgeDays <= pageQueryFreshnessDays;
  const humanReviewQuerySignals = allMatchedQuerySignals.filter((signal) =>
    isHumanReviewClassification(signal.classification),
  );
  const unreviewedQuerySignals = allMatchedQuerySignals.filter((signal) =>
    isUnreviewedClassification(signal.classification),
  );
  const targetQueryEvidence = queryEvidenceTotals(targetQuerySignals);
  const selectedTitleSignals = targetQuerySignals.filter(
    (signal) => signal.classification === 'selected-title',
  );
  const selectedTitleEvidence = queryEvidenceTotals(selectedTitleSignals);
  const preferredTopQuery = matchedQuerySignals.find((signal) =>
    ['selected-title', 'observe-generic-English'].includes(signal.classification),
  );
  const topQuery =
    preferredTopQuery ??
    item.topQueries.sort((a, b) => b.impressions - a.impressions)[0];

  let action = 'observe';
  let reason = '维持展示；当前数据稳定。';
  if (humanReviewQuerySignals.length > 0) {
    action = 'human-review';
    reason = '查询涉及医疗、复职或法律责任，必须先做人工语义和官方依据复核。';
  } else if (unreviewedQuerySignals.length > 0) {
    action = 'query-review';
    reason = '页面已出现中文查询，但尚未确认它与本页搜索意图一致；完成分类前不改标题或正文。';
  } else if (routingReviewQuerySignals.length > 0) {
    if (routingDecisionState === 'scheduled') {
      action = 'routing-action';
      reason = `页面分工已经确认，安排在 ${routingDecision.plannedFor} 完成分流调整；执行前不改标题或正文。`;
    } else if (routingDecisionState === 'action-due') {
      action = 'routing-action';
      reason = '页面分工已经确认，分流调整已到执行日期。';
    } else if (routingDecisionState === 'monitoring') {
      action = 'routing-monitor';
      reason = routingDecision.action === 'owner-confirmed'
        ? `${routingDecision.implementedAt} 已确认现有页面承接正确；等待 ${routingDecision.evaluateAfter} 后用新数据复评。`
        : `${routingDecision.implementedAt} 已完成分流调整；等待 ${routingDecision.evaluateAfter} 后用新数据复评。`;
    } else if (routingDecisionState === 'recheck-due') {
      action = 'routing-recheck';
      reason = `分流调整的观察期已结束；用最新页面查询数据检查是否仍有误落页或意图重叠。`;
    } else {
      action = 'routing-review';
      reason = '查询意图可能落错页面或与其他页面重叠；先核对落地页、内部链接和页面分工，不直接改标题或正文。';
    }
  } else if (selectedTitleEvidence.ready) {
    action = 'improve-title';
    reason = '标题型目标查询达到最小证据门槛，可据此校准标题和说明。';
  } else if (
    targetQueryEvidence.ready &&
    impressionsCurrent > 120 &&
    impressionsPrevious > 0 &&
    impressionsDelta <= -40
  ) {
    action = 'refresh-rule-change';
    reason = '近期展现明显下滑，先核验官方规则变化和页面语义链路。';
  } else if (
    targetQueryEvidence.ready &&
    impressionsCurrent >= 50 &&
    clicksCurrent === 0
  ) {
    action = 'improve-answer';
    reason = '目标查询已有展现但没有点击，先补直接答案、失败场景和逐条来源映射。';
  } else if (
    targetQueryEvidence.ready &&
    impressionsCurrent >= 50 &&
    positionCurrent <= 20 &&
    ctrCurrent < 2.5
  ) {
    action = 'improve-title';
    reason = '目标查询已经进入可见排名但 CTR 偏低，先校准标题和说明。';
  } else if (
    targetQueryEvidence.ready &&
    impressionsCurrent >= 60 &&
    positionCurrent > 20
  ) {
    action = 'improve-answer';
    reason = '目标查询展现较多但排名偏后，先补判断路径和高识别度答案结构。';
  } else if (
    targetQueryEvidence.ready &&
    impressionsPrevious === 0 &&
    impressionsCurrent >= 80
  ) {
    action = 'new-topic';
    reason = '新出现稳定流量，若现有页面承载不完整则分支新增专题。';
  } else if (
    targetQuerySignals.length > 0 &&
    !targetQueryEvidence.ready
  ) {
    action = 'observe-low-evidence';
    reason = `目标查询目前只有 ${targetQueryEvidence.impressions} 次曝光、${targetQueryEvidence.clicks} 次点击；达到 ${targetEvidenceThresholds.impressions} 次曝光或 ${targetEvidenceThresholds.clicks} 次点击前继续观察。`;
  } else if (matchedQuerySignals.length === 0 && impressionsCurrent >= 50) {
    action = 'needs-query-evidence';
    reason = '页面有展现，但还没有页面级查询映射；先在 Search Console 过滤该页并采集查询。';
  } else if (targetQuerySignals.length === 0 && impressionsCurrent >= 50) {
    action = 'observe-non-target';
    reason = '现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。';
  }
  if (
    routingReviewQuerySignals.length > 0 &&
    ['scheduled', 'action-due'].includes(routingDecisionState) &&
    !routingDecisionFresh
  ) {
    action = 'routing-review';
    reason = `页面分流判断距计划日期超过 ${pageQueryFreshnessDays} 天；先刷新该页查询并重新确认分工。`;
  } else if (
    allMatchedQuerySignals.length > 0 &&
    !queryEvidenceFreshness.fresh &&
    routingReviewQuerySignals.length === 0
  ) {
    action = 'needs-query-evidence';
    reason = `该页查询映射距计划日期超过 ${pageQueryFreshnessDays} 天；先刷新该页数据，旧映射不能触发内容修改。`;
  }
  const suggestedAction = action;
  const completedAction = latestActionByRoute.get(item.page);
  if (
    completedAction &&
    completedAction.completedAt <= planDate &&
    completedAction.evaluateAfter > planDate
  ) {
    action = 'cooldown';
    reason = `${completedAction.completedAt} 已完成 ${completedAction.action}；等待 ${completedAction.evaluateAfter} 后用新数据复评。`;
  }

  return {
    route: item.page,
    impressionsCurrent,
    clicksCurrent,
    ctrCurrent,
    positionCurrent,
    impressionsPrevious,
    clicksPrevious,
    ctrPrevious,
    positionPrevious,
    impressionsDelta,
    clicksDelta,
    topQuery: topQuery?.query ?? '',
    querySignals: matchedQuerySignals,
    queryEvidenceCount: allMatchedQuerySignals.length,
    queryEvidenceObservedFrom: queryEvidenceFreshness.observedFrom,
    queryEvidenceObservedThrough: queryEvidenceFreshness.observedThrough,
    queryEvidenceAgeDays: queryEvidenceFreshness.ageDays,
    queryEvidenceFresh: queryEvidenceFreshness.fresh,
    targetQueryEvidenceCount: targetQuerySignals.length,
    targetQueryImpressions: targetQueryEvidence.impressions,
    targetQueryClicks: targetQueryEvidence.clicks,
    targetQueryEvidenceReady: targetQueryEvidence.ready,
    routingReviewEvidenceCount: routingReviewQuerySignals.length,
    routingEvidenceObservedThrough,
    routingDecisionAgeDays,
    routingDecisionFresh,
    routingDecisionStatus: routingDecisionState,
    routingDecision: routingDecision ?? null,
    humanReviewEvidenceCount: humanReviewQuerySignals.length,
    unreviewedQueryEvidenceCount: unreviewedQuerySignals.length,
    nonTargetQueryEvidenceCount:
      allMatchedQuerySignals.length -
      targetQuerySignals.length -
      routingReviewQuerySignals.length -
      humanReviewQuerySignals.length -
      unreviewedQuerySignals.length,
    queryClassifications: [
      ...new Set(allMatchedQuerySignals.map((signal) => signal.classification)),
    ].sort(),
    action,
    suggestedAction,
    reason,
    score: 0,
    reviewDue: item.page.includes('/states/') ? '2026-10-15' : '2026-10-01',
    completedAction: completedAction ?? null,
  };
}).filter(
  (item) =>
    item.impressionsCurrent >= 20 ||
    item.impressionsDelta > 80 ||
    item.routingReviewEvidenceCount > 0 ||
    item.humanReviewEvidenceCount > 0 ||
    item.unreviewedQueryEvidenceCount > 0,
);

for (const row of allRows) {
  row.score = row.action === 'cooldown' ? -1 : priorityScore(row);
}

allRows.sort((a, b) => b.score - a.score);

const toPublicRow = (item) => {
  const {
    topQuery,
    querySignals: itemQuerySignals,
    humanReviewEvidenceCount,
    ...publicItem
  } = item;
  return {
    ...publicItem,
    hasQueryEvidence: item.queryEvidenceCount > 0,
    requiresHumanReview: humanReviewEvidenceCount > 0,
    requiresQueryReview: item.unreviewedQueryEvidenceCount > 0,
    hasRoutingReviewSignal: item.routingReviewEvidenceCount > 0,
    requiresRoutingReview:
      ['unreviewed', 'recheck-due'].includes(item.routingDecisionStatus) ||
      (
        ['scheduled', 'action-due'].includes(item.routingDecisionStatus) &&
        !item.routingDecisionFresh
      ),
    requiresRoutingAction:
      ['scheduled', 'action-due'].includes(item.routingDecisionStatus) &&
      item.routingDecisionFresh,
  };
};
const publicRows = allRows.map(toPublicRow);
const contentActionNames = new Set([
  'improve-answer',
  'improve-title',
  'refresh-rule-change',
  'new-topic',
]);
const eligibleContentRows = publicRows.filter(
  (item) =>
    contentActionNames.has(item.action) &&
    item.targetQueryEvidenceReady &&
    item.queryEvidenceFresh &&
    !item.requiresHumanReview &&
    !item.requiresQueryReview &&
    !item.hasRoutingReviewSignal,
);
const pendingRoutingActionRows = publicRows.filter(
  (item) =>
    !item.requiresHumanReview &&
    !item.requiresQueryReview &&
    item.routingDecisionFresh &&
    (
      item.action === 'routing-action' ||
      item.suggestedAction === 'routing-action' ||
      item.requiresRoutingAction
    ),
);
const dueRoutingActionRows = pendingRoutingActionRows.filter(
  (item) => item.routingDecisionStatus === 'action-due',
);
const currentCapacity = availableEditorialSlots(actionLog, planDate);
const nextWindow = nextEditorialWindow(actionLog, planDate);
const routingAllowedNow = dataSnapshot.readyForPlanning
  ? Math.min(currentCapacity.slots, dueRoutingActionRows.length)
  : 0;
const routingExecuteNow = dueRoutingActionRows.slice(0, routingAllowedNow);
const routingExecuteRoutes = new Set(
  routingExecuteNow.map((item) => item.route),
);
const remainingEditorialSlots = Math.max(
  0,
  currentCapacity.slots - routingAllowedNow,
);
const allowedNow = dataSnapshot.readyForPlanning
  ? Math.min(remainingEditorialSlots, eligibleContentRows.length)
  : 0;
let executionStatus = 'ready';
if (!dataSnapshot.readyForPlanning) {
  executionStatus = 'hold-data';
} else if (currentCapacity.slots === 0) {
  executionStatus = 'hold-cadence';
} else if (
  eligibleContentRows.length === 0 &&
  dueRoutingActionRows.length === 0
) {
  executionStatus = 'hold-no-qualified-query';
}
const executeNow = eligibleContentRows.slice(0, allowedNow);
const nextQueueStart = allowedNow;
const nextQueue = eligibleContentRows.slice(nextQueueStart, nextQueueStart + 12);
const execution = {
  status: executionStatus,
  targetEvidenceThresholds,
  targets: editorialTargets,
  currentPeriod: {
    through: planDate,
    weeklyActions: currentCapacity.weekly,
    monthlyActions: currentCapacity.monthly,
    availableSlots: currentCapacity.slots,
  },
  allowedNow,
  executeNow,
  routingAllowedNow,
  routingExecuteNow,
  nextEligibleDate: nextWindow?.date ?? null,
  nextEligibleSlots: nextWindow?.slots ?? 0,
  nextQueue,
  dataCollectionQueue: publicRows
    .filter(
      (item) =>
        item.action === 'needs-query-evidence' ||
        item.suggestedAction === 'needs-query-evidence',
    )
    .slice(0, 12),
  queryReviewQueue: publicRows
    .filter(
      (item) =>
        item.queryEvidenceFresh &&
        !item.requiresHumanReview &&
        (
          item.action === 'query-review' ||
          item.suggestedAction === 'query-review' ||
          item.requiresQueryReview
        ),
    )
    .slice(0, 12),
  routingReviewQueue: publicRows
    .filter(
      (item) =>
        !item.requiresHumanReview &&
        !item.requiresQueryReview &&
        (
          item.action === 'routing-review' ||
          item.action === 'routing-recheck' ||
          item.suggestedAction === 'routing-review' ||
          item.suggestedAction === 'routing-recheck' ||
          item.requiresRoutingReview
        ),
    )
    .slice(0, 12),
  routingActionQueue: pendingRoutingActionRows
    .filter((item) => !routingExecuteRoutes.has(item.route))
    .slice(0, 12),
  routingMonitoringQueue: publicRows
    .filter(
      (item) =>
        item.action === 'routing-monitor' ||
        item.suggestedAction === 'routing-monitor',
    )
    .slice(0, 12),
  lowEvidenceQueue: publicRows
    .filter(
      (item) =>
        item.queryEvidenceFresh &&
        (
          item.action === 'observe-low-evidence' ||
          item.suggestedAction === 'observe-low-evidence'
        ),
    )
    .slice(0, 12),
  humanReviewQueue: publicRows
    .filter(
      (item) =>
        item.queryEvidenceFresh &&
        (item.action === 'human-review' || item.requiresHumanReview),
    )
    .slice(0, 12),
  indexingCleanupQueue,
};
const pendingRoutingActionCount =
  execution.routingExecuteNow.length + execution.routingActionQueue.length;
const report = {
  generatedAt: `${planDate}T00:00:00.000Z`,
  source: sourceLabel,
  querySource: querySignals ? querySourceLabel : null,
  pageQuerySource: pageQuerySignals.length ? pageQuerySourceLabel : null,
  segmentSource: segmentSnapshot ? segmentSourceLabel : null,
  routingReviewSource: routingReviews.length ? routingReviewSourceLabel : null,
  routingReviews: {
    records: routingReviews.length,
    pendingReview: execution.routingReviewQueue.length,
    pendingAction: pendingRoutingActionCount,
    executeNow: execution.routingExecuteNow.length,
    monitoring: execution.routingMonitoringQueue.length,
  },
  totalRows: rows.length,
  includedRows: allRows.length,
  querySignals: publicQuerySignals,
  dataSnapshot,
  execution,
  warnings: [
    queryWarning,
    pageQueryWarning,
    segmentWarning,
    ...(dataSnapshot.stalePageQueryRoutes > 0
      ? [
          `有 ${dataSnapshot.stalePageQueryRoutes} 个页面的查询映射超过 ${pageQueryFreshnessDays} 天；这些页面必须单独刷新，但不会冻结证据仍有效的其他页面。`,
        ]
      : []),
    ...(indexingCleanupQueue.some((item) => item.status === 'deindex-overdue')
      ? ['noindex 页面超过复查日期后仍有 Search Console 曝光，需要检查 Google 当前索引状态。']
      : []),
    ...(indexingCleanupQueue.some((item) => item.status === 'untracked-noindex')
      ? ['存在未记录清理日期的 noindex 页面，需要补充索引治理记录。']
      : []),
    ...(execution.lowEvidenceQueue.length
      ? [`有 ${execution.lowEvidenceQueue.length} 个页面虽有目标查询，但尚未达到 ${targetEvidenceThresholds.impressions} 次曝光或 ${targetEvidenceThresholds.clicks} 次点击的最小内容决策门槛。`]
      : []),
    ...(execution.routingReviewQueue.length
      ? [`有 ${execution.routingReviewQueue.length} 个页面存在误落页或意图重叠信号，先做路由和页面分工复核。`]
      : []),
    ...(pendingRoutingActionCount
      ? [
          execution.routingExecuteNow.length
            ? `有 ${pendingRoutingActionCount} 个页面已经完成分工判断，其中 ${execution.routingExecuteNow.length} 个已进入本轮执行。`
            : `有 ${pendingRoutingActionCount} 个页面已经完成分工判断，等待按计划实施分流调整。`,
        ]
      : []),
  ].filter(Boolean),
  actions: {
    improveAnswer: publicRows.filter((item) => item.action === 'improve-answer').slice(0, 20),
    improveTitle: publicRows.filter((item) => item.action === 'improve-title').slice(0, 20),
    refreshRule: publicRows.filter((item) => item.action === 'refresh-rule-change').slice(0, 20),
    newTopics: publicRows.filter((item) => item.action === 'new-topic').slice(0, 20),
    needsQueryEvidence: publicRows
      .filter((item) => item.action === 'needs-query-evidence')
      .slice(0, 20),
    queryReview: publicRows
      .filter(
        (item) =>
          item.queryEvidenceFresh &&
          !item.requiresHumanReview &&
          (
            item.action === 'query-review' ||
            item.suggestedAction === 'query-review' ||
            item.requiresQueryReview
          ),
      )
      .slice(0, 20),
    routingReview: publicRows
      .filter(
        (item) =>
          item.action === 'routing-review' ||
          item.action === 'routing-recheck' ||
          item.suggestedAction === 'routing-review' ||
          item.suggestedAction === 'routing-recheck',
      )
      .slice(0, 20),
    routingAction: publicRows
      .filter(
        (item) =>
          item.action === 'routing-action' ||
          item.suggestedAction === 'routing-action',
      )
      .slice(0, 20),
    routingMonitoring: publicRows
      .filter(
        (item) =>
          item.action === 'routing-monitor' ||
          item.suggestedAction === 'routing-monitor',
      )
      .slice(0, 20),
    lowEvidence: publicRows
      .filter(
        (item) =>
          item.action === 'observe-low-evidence' ||
          item.suggestedAction === 'observe-low-evidence',
      )
      .slice(0, 20),
    nonTarget: publicRows
      .filter((item) => item.action === 'observe-non-target')
      .slice(0, 20),
    humanReview: publicRows
      .filter((item) => item.action === 'human-review')
      .slice(0, 20),
    cooldown: publicRows.filter((item) => item.action === 'cooldown').slice(0, 40),
  },
  prioritized: publicRows.slice(0, 60),
};

await mkdir(outputDir, { recursive: true });
await mkdir(privateOutputDir, { recursive: true });
await writeFile(path.join(outputDir, 'search-console-priority.json'), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(
  path.join(privateOutputDir, 'search-console-query-details.json'),
  `${JSON.stringify(
    {
      generatedAt: `${planDate}T00:00:00.000Z`,
      querySource: querySourceLabel,
      pageQuerySource: pageQuerySourceLabel,
      querySignals,
      pageQuerySignals,
      pageActions: allRows.filter((item) => item.querySignals.length > 0),
    },
    null,
    2,
  )}\n`,
);

const csvRows = [
  [
    'route',
    'impressionsCurrent',
    'clicksCurrent',
    'ctrCurrent',
    'positionCurrent',
    'impressionsPrevious',
    'clicksPrevious',
    'ctrPrevious',
    'positionPrevious',
    'impressionsDelta',
    'clicksDelta',
    'action',
    'suggestedAction',
    'reason',
    'hasQueryEvidence',
    'queryEvidenceCount',
    'queryEvidenceObservedFrom',
    'queryEvidenceObservedThrough',
    'queryEvidenceAgeDays',
    'queryEvidenceFresh',
    'targetQueryEvidenceCount',
    'targetQueryImpressions',
    'targetQueryClicks',
    'targetQueryEvidenceReady',
    'routingReviewEvidenceCount',
    'hasRoutingReviewSignal',
    'routingEvidenceObservedThrough',
    'routingDecisionAgeDays',
    'routingDecisionFresh',
    'routingDecisionStatus',
    'routingTargetRoutes',
    'routingPlannedFor',
    'routingImplementedAt',
    'routingEvaluateAfter',
    'routingChangedRoutes',
    'routingImplementationSummary',
    'unreviewedQueryEvidenceCount',
    'nonTargetQueryEvidenceCount',
    'requiresHumanReview',
    'requiresQueryReview',
    'requiresRoutingReview',
    'requiresRoutingAction',
    'queryClassifications',
    'reviewDue',
    'completedAt',
    'evaluateAfter',
  ],
  ...publicRows.slice(0, 80).map((item) => [
    item.route,
    item.impressionsCurrent,
    item.clicksCurrent,
    item.ctrCurrent,
    item.positionCurrent,
    item.impressionsPrevious,
    item.clicksPrevious,
    item.ctrPrevious,
    item.positionPrevious,
    item.impressionsDelta,
    item.clicksDelta,
    item.action,
    item.suggestedAction,
    item.reason,
    item.hasQueryEvidence,
    item.queryEvidenceCount,
    item.queryEvidenceObservedFrom,
    item.queryEvidenceObservedThrough,
    item.queryEvidenceAgeDays,
    item.queryEvidenceFresh,
    item.targetQueryEvidenceCount,
    item.targetQueryImpressions,
    item.targetQueryClicks,
    item.targetQueryEvidenceReady,
    item.routingReviewEvidenceCount,
    item.hasRoutingReviewSignal,
    item.routingEvidenceObservedThrough,
    item.routingDecisionAgeDays,
    item.routingDecisionFresh,
    item.routingDecisionStatus,
    item.routingDecision?.targetRoutes.join('|') ?? '',
    item.routingDecision?.plannedFor ?? '',
    item.routingDecision?.implementedAt ?? '',
    item.routingDecision?.evaluateAfter ?? '',
    item.routingDecision?.changedRoutes?.join('|') ?? '',
    item.routingDecision?.implementationSummary ?? '',
    item.unreviewedQueryEvidenceCount,
    item.nonTargetQueryEvidenceCount,
    item.requiresHumanReview,
    item.requiresQueryReview,
    item.requiresRoutingReview,
    item.requiresRoutingAction,
    item.queryClassifications.join('|'),
    item.reviewDue,
    item.completedAction?.completedAt ?? '',
    item.completedAction?.evaluateAfter ?? '',
  ]),
];

const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
await writeFile(
  path.join(outputDir, 'search-console-priority.csv'),
  `${csvRows.map((line) => line.map(csvCell).join(',')).join('\n')}\n`,
);

const actionReason = (item) => `${item.reason.replace(/[。！？]$/, '')}。`;
const executionStatusLabels = {
  ready: '可执行',
  'hold-data': '暂停：数据不完整或已过期',
  'hold-cadence': '暂停：本周或本月内容额度已用完',
  'hold-no-qualified-query': '暂停：没有满足目标查询证据的候选',
};
const candidateLine = (item) =>
  `- ${item.route}（目标查询 ${item.targetQueryEvidenceCount} 条；目标曝光 ${item.targetQueryImpressions} / 点击 ${item.targetQueryClicks}；页面曝光 ${item.impressionsCurrent}）— ${actionReason(item)}`;
const routingCandidateLine = (item) =>
  `- ${item.route} → ${item.routingDecision.targetRoutes.join('、')}（本轮页面分流）— ${item.routingDecision.summary}`;
const markdown = [
  `# Search Console 月度行动建议 (${planDate})`,
  '',
  `- 数据源：${sourceLabel}`,
  `- 查询数据源：${querySignals ? querySourceLabel : '未提供'}`,
  `- 页面查询映射：${pageQuerySignals.length ? pageQuerySourceLabel : '未提供'}`,
  `- 分段快照：${segmentSnapshot ? segmentSourceLabel : '未提供'}`,
  `- 路由决策台账：${routingReviews.length ? routingReviewSourceLabel : '未提供'}`,
  `- 数据状态：${dataSnapshot.readyForPlanning ? '可用于规划' : '不可用于规划'}；快照 ${dataSnapshot.observedAt ?? '未知'}，最新完整数据 ${dataSnapshot.dataThrough ?? '未知'}。`,
  `- 页面查询映射：${dataSnapshot.freshPageQueryRoutes}/${dataSnapshot.pageQueryRoutes} 个页面在 ${pageQueryFreshnessDays} 天有效期内；过期页面只暂停自身动作。`,
  `- 纳入页数：${allRows.length}`,
  ...(querySignals
    ? [
        `- 可见查询：${publicQuerySignals.totalRows} 条；中文查询 ${publicQuerySignals.chineseRows} 条 / ${publicQuerySignals.chineseImpressions} 次曝光`,
        `- 泛英文 DMV 大词曝光：${publicQuerySignals.genericDmvImpressions}`,
        `- 中文候选信号：${publicQuerySignals.chineseOpportunities}；需要人工复核：${publicQuerySignals.humanReviewSignals}`,
        '- 原始查询词与页面映射保存在本地 `reports/private/`，不会提交到公开仓库。',
      ]
    : []),
  '',
  '## 本轮执行门禁',
  '',
  `- 状态：${executionStatusLabels[execution.status]}。`,
  `- 最近 7 天已记录 ${execution.currentPeriod.weeklyActions} 个内容动作，本月已记录 ${execution.currentPeriod.monthlyActions} 个；当前可执行 ${execution.allowedNow + execution.routingAllowedNow} 个，其中页面分流 ${execution.routingAllowedNow} 个。`,
  `- 下一次出现内容容量的日期：${execution.nextEligibleDate ?? '尚未计算'}；当日最多 ${execution.nextEligibleSlots} 个。`,
  ...(dataSnapshot.blockers.length
    ? dataSnapshot.blockers.map((blocker) => `- 数据阻断：${blocker}`)
    : ['- 数据快照、查询导出和页面查询映射均通过新鲜度检查。']),
  '',
  '## 现在可执行',
  '',
  ...execution.routingExecuteNow.map(routingCandidateLine),
  ...execution.executeNow.map(candidateLine),
  ...(
    execution.routingExecuteNow.length || execution.executeNow.length
      ? []
      : ['- 本轮不执行内容改写或页面分流。']
  ),
  '',
  '## 下一轮候选',
  '',
  ...(execution.nextQueue.length
    ? execution.nextQueue.map(candidateLine)
    : ['- 当前没有同时满足目标查询证据、风险门禁和冷却期要求的候选。']),
  '',
  '## 先补页面查询映射',
  '',
  ...(execution.dataCollectionQueue.length
    ? execution.dataCollectionQueue.map(
        (item) =>
          `- ${item.route}（展现 ${item.impressionsCurrent}）— 先在 Search Console 中过滤该页面并采集查询，不先改正文。`,
      )
    : ['- 当前没有待补查询映射的高曝光页面。']),
  '',
  '## 先确认页面查询意图',
  '',
  ...(execution.queryReviewQueue.length
    ? execution.queryReviewQueue.map(
        (item) =>
          `- ${item.route}（待分类查询证据 ${item.unreviewedQueryEvidenceCount} 条）— 先确认查询是否属于本页；完成分类前不改标题或正文。`,
      )
    : ['- 当前没有尚未分类的页面级中文查询。']),
  '',
  '## 先复核落地页与页面分工',
  '',
  ...(execution.routingReviewQueue.length
    ? execution.routingReviewQueue.map(
        (item) =>
          `- ${item.route}（路由复核信号 ${item.routingReviewEvidenceCount} 条）— 先判断查询是否落错页面或与其他页面重叠，不据此直接改标题或正文。`,
      )
    : ['- 当前没有尚未完成分工判断的误落页或意图重叠信号。']),
  '',
  '## 已判定，等待实施分流',
  '',
  ...(execution.routingActionQueue.length
    ? execution.routingActionQueue.map(
        (item) =>
          `- ${item.route} → ${item.routingDecision.targetRoutes.join('、')}（计划 ${item.routingDecision.plannedFor || '尽快处理'}）— ${item.routingDecision.summary}`,
      )
    : ['- 当前没有等待实施的路由调整。']),
  '',
  '## 已处理，等待效果复评',
  '',
  ...(execution.routingMonitoringQueue.length
    ? execution.routingMonitoringQueue.map(
        (item) =>
          `- ${item.route} → ${item.routingDecision.targetRoutes.join('、')}（${item.routingDecision.evaluateAfter} 复评）— ${item.routingDecision.implementationSummary || item.routingDecision.summary}`,
      )
    : ['- 当前没有处于观察期的路由调整。']),
  '',
  '## 目标查询样本不足',
  '',
  ...(execution.lowEvidenceQueue.length
    ? execution.lowEvidenceQueue.map(
        (item) =>
          `- ${item.route}（目标曝光 ${item.targetQueryImpressions} / 点击 ${item.targetQueryClicks}）— 未达到 ${targetEvidenceThresholds.impressions} 次曝光或 ${targetEvidenceThresholds.clicks} 次点击，继续观察。`,
      )
    : ['- 当前没有低于最小证据门槛的目标查询页面。']),
  '',
  '## 索引清理观察',
  '',
  ...(execution.indexingCleanupQueue.length
    ? execution.indexingCleanupQueue.map((item) => {
        if (item.status === 'deindex-grace') {
          return `- ${item.route}（展现 ${item.impressions}）— ${item.completedAt} 已设置 noindex，${item.evaluateAfter} 复查 Google 索引状态；观察期内不按这些曝光扩写内容。`;
        }
        if (item.status === 'deindex-overdue') {
          return `- ${item.route}（展现 ${item.impressions}）— 已超过 ${item.evaluateAfter} 复查日，需要检查 Google 当前索引状态和抓取结果。`;
        }
        if (item.status === 'untracked-noindex') {
          return `- ${item.route}（展现 ${item.impressions}）— 页面已设置 noindex，但缺少清理日期，需要补充索引治理记录。`;
        }
        return `- ${item.route}（展现 ${item.impressions}）— 当前不在可索引清单中，需要核查路由和 canonical 状态。`;
      })
    : ['- 当前没有已退出可索引清单但仍有曝光的页面。']),
  '',
  '## 中文查询信号',
  ...(querySignals
    ? [
        `- 本月识别 ${publicQuerySignals.chineseOpportunities} 个中文候选信号；只有完成页面归属分类的信号才用于标题、摘要、入口和内部链接校准。`,
      ]
    : ['- 尚未导入查询维度 CSV。']),
  '',
  '## 需要人工复核的查询信号',
  ...(querySignals
    ? [
        `- 本月识别 ${publicQuerySignals.humanReviewSignals} 个涉及医疗、复职或法律责任的信号；不自动改写对应高风险页面。`,
      ]
    : ['- 尚未导入查询维度 CSV。']),
  '',
  '## 算法建议：改标题/说明',
  ...report.actions.improveTitle.map(
    (item) =>
      `- ${item.route}（展现 ${item.impressionsCurrent} / CTR ${item.ctrCurrent.toFixed(2)} / 位置 ${item.positionCurrent.toFixed(1)}）— ${actionReason(item)}`,
  ),
  '',
  '## 算法建议：改正文内容',
  ...report.actions.improveAnswer.map(
    (item) =>
      `- ${item.route}（展现 ${item.impressionsCurrent} / 点击 ${item.clicksCurrent}）— ${actionReason(item)}`,
  ),
  '',
  '## 泛英文曝光观察',
  ...report.actions.nonTarget.map(
    (item) =>
      `- ${item.route}（展现 ${item.impressionsCurrent}）— ${actionReason(item)}`,
  ),
  '',
  '## 高风险人工复核',
  ...report.actions.humanReview.map(
    (item) =>
      `- ${item.route}（查询证据 ${item.queryEvidenceCount} 条）— ${actionReason(item)}`,
  ),
  '',
  '## 待分类查询',
  ...report.actions.queryReview.map(
    (item) =>
      `- ${item.route}（待分类查询证据 ${item.unreviewedQueryEvidenceCount} 条）— ${actionReason(item)}`,
  ),
  '',
  '## 路由与重叠复核',
  ...report.actions.routingReview.map(
    (item) =>
      `- ${item.route}（路由复核信号 ${item.routingReviewEvidenceCount} 条）— ${actionReason(item)}`,
  ),
  '',
  '## 路由调整待办',
  ...report.actions.routingAction.map(
    (item) =>
      `- ${item.route} → ${item.routingDecision.targetRoutes.join('、')}（计划 ${item.routingDecision.plannedFor || '尽快处理'}）— ${actionReason(item)}`,
  ),
  '',
  '## 路由调整观察',
  ...report.actions.routingMonitoring.map(
    (item) =>
      `- ${item.route} → ${item.routingDecision.targetRoutes.join('、')}（${item.routingDecision.evaluateAfter} 复评）— ${item.routingDecision.implementationSummary || actionReason(item)}`,
  ),
  '',
  '## 低样本目标查询',
  ...report.actions.lowEvidence.map(
    (item) =>
      `- ${item.route}（目标曝光 ${item.targetQueryImpressions} / 点击 ${item.targetQueryClicks}）— ${actionReason(item)}`,
  ),
  '',
  '## 规则变化/下滑复核',
  ...report.actions.refreshRule.map(
    (item) => `- ${item.route}（展现变化 ${item.impressionsDelta.toFixed(1)}%）— ${item.reason}`,
  ),
  '',
  '## 等待效果复评',
  ...report.actions.cooldown.map(
    (item) =>
      `- ${item.route}（本次数据仍建议 ${item.suggestedAction}）— ${item.reason}`,
  ),
  '',
];

await writeFile(path.join(outputDir, 'search-console-priority.md'), `${markdown.join('\n').trimEnd()}\n`);

console.log('Search Console priority report generated:');
console.log('- reports/search-console-priority.json');
console.log('- reports/search-console-priority.csv');
console.log('- reports/search-console-priority.md');
console.log(`- prioritized items=${allRows.length}`);
console.log(`- query signals=${querySignals?.totalRows ?? 0}`);
console.log(`- page-query signals=${pageQuerySignals.length}`);
console.log(
  `- execution=${execution.status}, allowedNow=${execution.allowedNow}, routingAllowedNow=${execution.routingAllowedNow}, nextCapacity=${execution.nextEligibleDate}`,
);
console.log(`- query review=${execution.queryReviewQueue.length}`);
console.log(`- routing review=${execution.routingReviewQueue.length}`);
console.log(`- routing execute now=${execution.routingExecuteNow.length}`);
console.log(`- routing action=${execution.routingActionQueue.length}`);
console.log(`- routing monitoring=${execution.routingMonitoringQueue.length}`);
console.log(`- low evidence=${execution.lowEvidenceQueue.length}`);
console.log(
  `- deindex watch=${indexingCleanupQueue.length} routes / ${dataSnapshot.excludedPageImpressions} impressions`,
);
console.log('- private query details=reports/private/search-console-query-details.json');
