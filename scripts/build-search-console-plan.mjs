import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
const outputDir = path.join(projectRoot, 'reports');
const privateOutputDir = path.join(outputDir, 'private');
const sourcePath = process.env.SC_REPORT_PATH || reportPath;
const querySourcePath = process.env.SC_QUERY_REPORT_PATH || queryReportPath;
const pageQuerySourcePath = process.env.SC_PAGE_QUERY_REPORT_PATH || pageQuerySignalPath;
const segmentSourcePath = process.env.SC_SEGMENT_REPORT_PATH || segmentReportPath;
const eeatSourcePath = process.env.EEAT_REPORT_PATH || eeatReportPath;
const actionLogSourcePath = process.env.SC_ACTION_LOG_PATH || actionLogPath;
const resolvedSourcePath = path.resolve(sourcePath);
const resolvedQuerySourcePath = path.resolve(querySourcePath);
const resolvedPageQuerySourcePath = path.resolve(pageQuerySourcePath);
const resolvedSegmentSourcePath = path.resolve(segmentSourcePath);
const relativeSourcePath = path.relative(projectRoot, resolvedSourcePath);
const relativeQuerySourcePath = path.relative(projectRoot, resolvedQuerySourcePath);
const relativePageQuerySourcePath = path.relative(projectRoot, resolvedPageQuerySourcePath);
const relativeSegmentSourcePath = path.relative(projectRoot, resolvedSegmentSourcePath);
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
const editorialTargets = {
  weekly: { min: 2, max: 3 },
  monthly: { min: 8, max: 12 },
};
const expectedProperty = 'sc-domain:dmvcn.com';

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
  totalRows: 0,
  includedRows: 0,
  querySignals: null,
  dataSnapshot: {
    readyForPlanning: false,
    blockers: ['缺少页面维度导出。'],
  },
  execution: {
    status: 'hold-data',
    allowedNow: 0,
    executeNow: [],
    nextQueue: [],
    dataCollectionQueue: [],
    humanReviewQueue: [],
    indexingCleanupQueue: [],
  },
  actions: {
    improveAnswer: [],
    improveTitle: [],
    refreshRule: [],
    newTopics: [],
    needsQueryEvidence: [],
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
  if (item.action === 'observe' || item.action === 'observe-non-target') return 0;
  let score = 0;
  if (item.action === 'improve-answer') score += 40;
  if (item.action === 'improve-title') score += 35;
  if (item.action === 'refresh-rule-change') score += 30;
  if (item.action === 'new-topic') score += 20;
  if (item.action === 'needs-query-evidence') score += 10;
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
const isHumanReviewClassification = (classification) =>
  String(classification).startsWith('human-review');
const isTargetQuerySignal = (signal) =>
  !isHumanReviewClassification(signal.classification) &&
  signal.classification !== 'overlap-review' &&
  (
    isChineseQuery(signal.query) ||
    ['selected-title', 'misrouted-intent'].includes(signal.classification)
  );
const topByImpressions = (items, limit = 25) =>
  [...items]
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .slice(0, limit);
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
const pageQueryMap = new Map();
for (const signal of pageQuerySignals) {
  const signals = pageQueryMap.get(signal.route) ?? [];
  signals.push(signal);
  pageQueryMap.set(signal.route, signals);
}
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
const snapshotAgeDays = daysBetween(snapshotObservedAt, planDate);
const snapshotLagDays = daysBetween(snapshotDataThrough, planDate);
const signalObservedDates = [
  ...new Set(
    pageQuerySignals
      .map((signal) => signal.observedAt)
      .filter((value) => isCalendarDate(value)),
  ),
].sort();
const oldestSignalAgeDays = signalObservedDates.length
  ? daysBetween(signalObservedDates[0], planDate)
  : null;
const dataBlockers = [];
if (!segmentSnapshot) dataBlockers.push('缺少分段快照，无法确认属性、时间窗口和全站总量。');
if (segmentSnapshot && segmentSnapshot.property !== expectedProperty) {
  dataBlockers.push(`分段快照属性不是 ${expectedProperty}。`);
}
if (toNumber(segmentSnapshot?.window?.days) < 28) {
  dataBlockers.push('Search Console 时间窗口少于 28 天，不用于内容优先级判断。');
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
if (
  oldestSignalAgeDays === null ||
  oldestSignalAgeDays < 0 ||
  oldestSignalAgeDays > 7
) {
  dataBlockers.push('页面查询映射距计划日期超过 7 天或缺少有效观察日期。');
}
const dataSnapshot = {
  property: segmentSnapshot?.property ?? null,
  observedAt: snapshotObservedAt,
  ageDays: snapshotAgeDays,
  windowDays: toNumber(segmentSnapshot?.window?.days),
  dataThrough: snapshotDataThrough,
  dataLagDays: snapshotLagDays,
  pageRows: rows.length,
  queryRows: queryItems.length,
  pageQuerySignals: pageQuerySignals.length,
  pageQueryObservedFrom: signalObservedDates[0] ?? null,
  pageQueryObservedThrough: signalObservedDates.at(-1) ?? null,
  readyForPlanning: dataBlockers.length === 0,
  completionComparable: toNumber(segmentSnapshot?.window?.days) === 30,
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
  .map((item) => ({
    ...item,
    status: item.knownNoindex ? 'awaiting-deindex' : 'untracked-route',
    action: item.knownNoindex ? 'observe-deindex' : 'investigate-route',
  }));
dataSnapshot.excludedPageRows = indexingCleanupQueue.length;
dataSnapshot.excludedPageImpressions = indexingCleanupQueue.reduce(
  (sum, item) => sum + item.impressions,
  0,
);

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
  const matchedQuerySignals = topByImpressions(allMatchedQuerySignals, 8);
  const targetQuerySignals = allMatchedQuerySignals.filter(isTargetQuerySignal);
  const humanReviewQuerySignals = allMatchedQuerySignals.filter((signal) =>
    isHumanReviewClassification(signal.classification),
  );
  const selectedTitleSignal = targetQuerySignals.find(
    (signal) => signal.classification === 'selected-title',
  );
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
  } else if (selectedTitleSignal) {
    action = 'improve-title';
    reason = '已出现与州机构或具体业务一致的查询，标题和说明应采用用户实际用词。';
  } else if (
    impressionsCurrent > 120 &&
    impressionsPrevious > 0 &&
    impressionsDelta <= -40
  ) {
    action = 'refresh-rule-change';
    reason = '近期展现明显下滑，先核验官方规则变化和页面语义链路。';
  } else if (
    targetQuerySignals.length > 0 &&
    impressionsCurrent >= 50 &&
    clicksCurrent === 0
  ) {
    action = 'improve-answer';
    reason = '目标查询已有展现但没有点击，先补直接答案、失败场景和逐条来源映射。';
  } else if (
    targetQuerySignals.length > 0 &&
    impressionsCurrent >= 50 &&
    positionCurrent <= 20 &&
    ctrCurrent < 2.5
  ) {
    action = 'improve-title';
    reason = '目标查询已经进入可见排名但 CTR 偏低，先校准标题和说明。';
  } else if (
    targetQuerySignals.length > 0 &&
    impressionsCurrent >= 60 &&
    positionCurrent > 20
  ) {
    action = 'improve-answer';
    reason = '目标查询展现较多但排名偏后，先补判断路径和高识别度答案结构。';
  } else if (
    targetQuerySignals.length > 0 &&
    impressionsPrevious === 0 &&
    impressionsCurrent >= 80
  ) {
    action = 'new-topic';
    reason = '新出现稳定流量，若现有页面承载不完整则分支新增专题。';
  } else if (matchedQuerySignals.length === 0 && impressionsCurrent >= 50) {
    action = 'needs-query-evidence';
    reason = '页面有展现，但还没有页面级查询映射；先在 Search Console 过滤该页并采集查询。';
  } else if (targetQuerySignals.length === 0 && impressionsCurrent >= 50) {
    action = 'observe-non-target';
    reason = '现有页面级信号来自泛英文或本地查询，不为非目标曝光扩写中文内容。';
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
    targetQueryEvidenceCount: targetQuerySignals.length,
    humanReviewEvidenceCount: humanReviewQuerySignals.length,
    nonTargetQueryEvidenceCount:
      allMatchedQuerySignals.length -
      targetQuerySignals.length -
      humanReviewQuerySignals.length,
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
}).filter((item) => item.impressionsCurrent >= 20 || item.impressionsDelta > 80);

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
    item.targetQueryEvidenceCount > 0 &&
    !item.requiresHumanReview,
);
const currentCapacity = availableEditorialSlots(actionLog, planDate);
const nextWindow = nextEditorialWindow(actionLog, planDate);
const allowedNow = dataSnapshot.readyForPlanning
  ? Math.min(currentCapacity.slots, eligibleContentRows.length)
  : 0;
let executionStatus = 'ready';
if (!dataSnapshot.readyForPlanning) {
  executionStatus = 'hold-data';
} else if (currentCapacity.slots === 0) {
  executionStatus = 'hold-cadence';
} else if (eligibleContentRows.length === 0) {
  executionStatus = 'hold-no-qualified-query';
}
const executeNow = eligibleContentRows.slice(0, allowedNow);
const nextQueueStart = allowedNow;
const nextQueue = eligibleContentRows.slice(nextQueueStart, nextQueueStart + 12);
const execution = {
  status: executionStatus,
  targets: editorialTargets,
  currentPeriod: {
    through: planDate,
    weeklyActions: currentCapacity.weekly,
    monthlyActions: currentCapacity.monthly,
    availableSlots: currentCapacity.slots,
  },
  allowedNow,
  executeNow,
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
  humanReviewQueue: publicRows
    .filter((item) => item.action === 'human-review' || item.requiresHumanReview)
    .slice(0, 12),
  indexingCleanupQueue,
};
const report = {
  generatedAt: `${planDate}T00:00:00.000Z`,
  source: sourceLabel,
  querySource: querySignals ? querySourceLabel : null,
  pageQuerySource: pageQuerySignals.length ? pageQuerySourceLabel : null,
  segmentSource: segmentSnapshot ? segmentSourceLabel : null,
  totalRows: rows.length,
  includedRows: allRows.length,
  querySignals: publicQuerySignals,
  dataSnapshot,
  execution,
  warnings: [queryWarning, pageQueryWarning, segmentWarning].filter(Boolean),
  actions: {
    improveAnswer: publicRows.filter((item) => item.action === 'improve-answer').slice(0, 20),
    improveTitle: publicRows.filter((item) => item.action === 'improve-title').slice(0, 20),
    refreshRule: publicRows.filter((item) => item.action === 'refresh-rule-change').slice(0, 20),
    newTopics: publicRows.filter((item) => item.action === 'new-topic').slice(0, 20),
    needsQueryEvidence: publicRows
      .filter((item) => item.action === 'needs-query-evidence')
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
    'targetQueryEvidenceCount',
    'nonTargetQueryEvidenceCount',
    'requiresHumanReview',
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
    item.targetQueryEvidenceCount,
    item.nonTargetQueryEvidenceCount,
    item.requiresHumanReview,
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
  `- ${item.route}（目标查询证据 ${item.targetQueryEvidenceCount} 条；展现 ${item.impressionsCurrent} / 点击 ${item.clicksCurrent}）— ${actionReason(item)}`;
const markdown = [
  `# Search Console 月度行动建议 (${planDate})`,
  '',
  `- 数据源：${sourceLabel}`,
  `- 查询数据源：${querySignals ? querySourceLabel : '未提供'}`,
  `- 页面查询映射：${pageQuerySignals.length ? pageQuerySourceLabel : '未提供'}`,
  `- 分段快照：${segmentSnapshot ? segmentSourceLabel : '未提供'}`,
  `- 数据状态：${dataSnapshot.readyForPlanning ? '可用于规划' : '不可用于规划'}；快照 ${dataSnapshot.observedAt ?? '未知'}，最新完整数据 ${dataSnapshot.dataThrough ?? '未知'}。`,
  `- 纳入页数：${allRows.length}`,
  ...(querySignals
    ? [
        `- 可见查询：${publicQuerySignals.totalRows} 条；中文查询 ${publicQuerySignals.chineseRows} 条 / ${publicQuerySignals.chineseImpressions} 次曝光`,
        `- 泛英文 DMV 大词曝光：${publicQuerySignals.genericDmvImpressions}`,
        `- 可自动处理的中文信号：${publicQuerySignals.chineseOpportunities}；需要人工复核：${publicQuerySignals.humanReviewSignals}`,
        '- 原始查询词与页面映射保存在本地 `reports/private/`，不会提交到公开仓库。',
      ]
    : []),
  '',
  '## 本轮执行门禁',
  '',
  `- 状态：${executionStatusLabels[execution.status]}。`,
  `- 最近 7 天已记录 ${execution.currentPeriod.weeklyActions} 个内容动作，本月已记录 ${execution.currentPeriod.monthlyActions} 个；当前可执行 ${execution.allowedNow} 个。`,
  `- 下一次出现内容容量的日期：${execution.nextEligibleDate ?? '尚未计算'}；当日最多 ${execution.nextEligibleSlots} 个。`,
  ...(dataSnapshot.blockers.length
    ? dataSnapshot.blockers.map((blocker) => `- 数据阻断：${blocker}`)
    : ['- 数据快照、查询导出和页面查询映射均通过新鲜度检查。']),
  '',
  '## 现在可执行',
  '',
  ...(execution.executeNow.length
    ? execution.executeNow.map(candidateLine)
    : ['- 本轮不执行内容改写。']),
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
  '## 索引清理观察',
  '',
  ...(execution.indexingCleanupQueue.length
    ? execution.indexingCleanupQueue.map((item) =>
        item.knownNoindex
          ? `- ${item.route}（展现 ${item.impressions}）— 页面已设置 noindex，等待 Google 退出索引，不按这些曝光扩写内容。`
          : `- ${item.route}（展现 ${item.impressions}）— 当前不在可索引清单中，需要核查路由和 canonical 状态。`,
      )
    : ['- 当前没有已退出可索引清单但仍有曝光的页面。']),
  '',
  '## 中文查询信号',
  ...(querySignals
    ? [
        `- 本月识别 ${publicQuerySignals.chineseOpportunities} 个可自动处理信号，优先用于标题、摘要、入口和内部链接校准。`,
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
  `- execution=${execution.status}, allowedNow=${execution.allowedNow}, nextCapacity=${execution.nextEligibleDate}`,
);
console.log(
  `- deindex watch=${indexingCleanupQueue.length} routes / ${dataSnapshot.excludedPageImpressions} impressions`,
);
console.log('- private query details=reports/private/search-console-query-details.json');
