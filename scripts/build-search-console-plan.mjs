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
const eeatReportPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
const outputDir = path.join(projectRoot, 'reports');
const privateOutputDir = path.join(outputDir, 'private');
const sourcePath = process.env.SC_REPORT_PATH || reportPath;
const querySourcePath = process.env.SC_QUERY_REPORT_PATH || queryReportPath;
const pageQuerySourcePath = process.env.SC_PAGE_QUERY_REPORT_PATH || pageQuerySignalPath;
const resolvedSourcePath = path.resolve(sourcePath);
const resolvedQuerySourcePath = path.resolve(querySourcePath);
const resolvedPageQuerySourcePath = path.resolve(pageQuerySourcePath);
const relativeSourcePath = path.relative(projectRoot, resolvedSourcePath);
const relativeQuerySourcePath = path.relative(projectRoot, resolvedQuerySourcePath);
const relativePageQuerySourcePath = path.relative(projectRoot, resolvedPageQuerySourcePath);
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
  totalRows: 0,
  includedRows: 0,
  querySignals: null,
  actions: {
    improveAnswer: [],
    improveTitle: [],
    refreshRule: [],
    newTopics: [],
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

function priorityScore(item) {
  let score = 0;
  if (item.action === 'improve-answer') score += 40;
  if (item.action === 'improve-title') score += 35;
  if (item.action === 'refresh-rule-change') score += 30;
  if (item.action === 'new-topic') score += 20;

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
  eeat = JSON.parse(await readFile(eeatReportPath, 'utf8'));
} catch {
  console.error('未检测到 eeat-inventory.json，请先 npm run build && npm run audit:eeat。');
  throw new Error('missing-eeat');
}

const siteRoutes = new Set(
  (eeat.pages ?? [])
    .filter((page) => page.indexable)
    .map((page) => page.route),
);
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

const pageMap = new Map();
for (const row of rows) {
  const page = normalizeRoute(
    getCell(row, ['page', 'landingpage', 'link', 'url', '排名靠前的网页']),
  );
  if (!page || !siteRoutes.has(page)) continue;

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

  const matchedQuerySignals = topByImpressions(pageQueryMap.get(item.page) ?? [], 8);
  const selectedTitleSignal = matchedQuerySignals.find(
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
  if (selectedTitleSignal) {
    action = 'improve-title';
    reason = '已出现与州机构或具体业务一致的查询，标题和说明应采用用户实际用词。';
  } else if (impressionsCurrent >= 50 && clicksCurrent === 0) {
    action = 'improve-answer';
    reason = '有展现但无点击，说明内容未直接命中用户决策。先加 FAQ/失败场景/来源映射。';
  } else if (impressionsCurrent >= 50 && positionCurrent <= 20 && ctrCurrent < 2.5) {
    action = 'improve-title';
    reason = '页面排名可见但 CTR 偏低，先优化标题与说明，避免夸张承诺。';
  } else if (impressionsCurrent >= 60 && positionCurrent > 20) {
    action = 'improve-answer';
    reason = '排名偏后且展现较多，可能命中问题但未提供高识别度答案结构。';
  } else if (impressionsCurrent > 120 && impressionsDelta <= -40) {
    action = 'refresh-rule-change';
    reason = '近期展现/点击明显下滑，重点核验官方来源变化及页面语义链路。';
  } else if (impressionsPrevious === 0 && impressionsCurrent >= 80) {
    action = 'new-topic';
    reason = '新出现稳定流量，若现有页面承载不完整则分支新增专题。';
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
    action,
    reason,
    score: 0,
    reviewDue: item.page.includes('/states/') ? '2026-10-15' : '2026-10-01',
  };
}).filter((item) => item.impressionsCurrent >= 20 || item.impressionsDelta > 80);

for (const row of allRows) {
  row.score = priorityScore(row);
}

allRows.sort((a, b) => b.score - a.score);

const toPublicRow = (item) => {
  const { topQuery, querySignals: itemQuerySignals, ...publicItem } = item;
  return {
    ...publicItem,
    hasQueryEvidence: itemQuerySignals.length > 0,
    queryEvidenceCount: itemQuerySignals.length,
    queryClassifications: [...new Set(itemQuerySignals.map((signal) => signal.classification))].sort(),
  };
};
const publicRows = allRows.map(toPublicRow);
const report = {
  generatedAt: `${planDate}T00:00:00.000Z`,
  source: sourceLabel,
  querySource: querySignals ? querySourceLabel : null,
  pageQuerySource: pageQuerySignals.length ? pageQuerySourceLabel : null,
  totalRows: rows.length,
  includedRows: allRows.length,
  querySignals: publicQuerySignals,
  warnings: [queryWarning, pageQueryWarning].filter(Boolean),
  actions: {
    improveAnswer: publicRows.filter((item) => item.action === 'improve-answer').slice(0, 20),
    improveTitle: publicRows.filter((item) => item.action === 'improve-title').slice(0, 20),
    refreshRule: publicRows.filter((item) => item.action === 'refresh-rule-change').slice(0, 20),
    newTopics: publicRows.filter((item) => item.action === 'new-topic').slice(0, 20),
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
    'reason',
    'hasQueryEvidence',
    'queryEvidenceCount',
    'queryClassifications',
    'reviewDue',
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
    item.reason,
    item.hasQueryEvidence,
    item.queryEvidenceCount,
    item.queryClassifications.join('|'),
    item.reviewDue,
  ]),
];

const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
await writeFile(
  path.join(outputDir, 'search-console-priority.csv'),
  `${csvRows.map((line) => line.map(csvCell).join(',')).join('\n')}\n`,
);

const actionReason = (item) => `${item.reason.replace(/[。！？]$/, '')}。`;
const markdown = [
  `# Search Console 月度行动建议 (${planDate})`,
  '',
  `- 数据源：${sourceLabel}`,
  `- 查询数据源：${querySignals ? querySourceLabel : '未提供'}`,
  `- 页面查询映射：${pageQuerySignals.length ? pageQuerySourceLabel : '未提供'}`,
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
  '## 改标题/说明',
  ...report.actions.improveTitle.map(
    (item) =>
      `- ${item.route}（展现 ${item.impressionsCurrent} / CTR ${item.ctrCurrent.toFixed(2)} / 位置 ${item.positionCurrent.toFixed(1)}）— ${actionReason(item)}`,
  ),
  '',
  '## 改正文内容',
  ...report.actions.improveAnswer.map(
    (item) =>
      `- ${item.route}（展现 ${item.impressionsCurrent} / 点击 ${item.clicksCurrent}）— ${actionReason(item)}`,
  ),
  '',
  '## 规则变化/下滑复核',
  ...report.actions.refreshRule.map(
    (item) => `- ${item.route}（展现变化 ${item.impressionsDelta.toFixed(1)}%）— ${item.reason}`,
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
console.log('- private query details=reports/private/search-console-query-details.json');
