import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NON_SEARCH_LANDING_ROUTES } from '../src/data/publication-gate.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportsDir = path.join(projectRoot, 'reports');
const pulseSourcePath = path.resolve(
  process.env.SC_PULSE_SOURCE_PATH ??
    path.join(reportsDir, 'private', 'search-console-pulse.json'),
);
const baselineSourcePath = path.resolve(
  process.env.SC_SEGMENT_REPORT_PATH ??
    path.join(reportsDir, 'private', 'search-console-segments.json'),
);
const actionLogPath = path.resolve(
  process.env.SC_ACTION_LOG_PATH ??
    path.join(reportsDir, 'search-console-actions.json'),
);
const searchPlanPath = path.resolve(
  process.env.SEARCH_CONSOLE_PLAN_PATH ??
    path.join(reportsDir, 'search-console-priority.json'),
);
const eeatReportPath = path.resolve(
  process.env.EEAT_REPORT_PATH ??
    path.join(reportsDir, 'eeat-inventory.json'),
);
const outputJsonPath = path.resolve(
  process.env.SC_PULSE_OUTPUT_PATH ??
    path.join(reportsDir, 'search-console-pulse.json'),
);
const outputMarkdownPath = path.resolve(
  process.env.SC_PULSE_MARKDOWN_PATH ??
    path.join(reportsDir, 'search-console-pulse.md'),
);
const expectedProperty = 'sc-domain:dmvcn.com';

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    console.error(`Missing or invalid ${label}: ${filePath}`);
    process.exit(1);
  }
}

function isCalendarDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''));
}

function datePart(value) {
  return String(value ?? '').slice(0, 10);
}

function daysInclusive(from, through) {
  if (!isCalendarDate(from) || !isCalendarDate(through)) return 0;
  const difference =
    Date.parse(`${through}T00:00:00.000Z`) -
    Date.parse(`${from}T00:00:00.000Z`);
  return Math.max(Math.round(difference / 86_400_000) + 1, 0);
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

function daily(value, days) {
  return days > 0 ? round(toNumber(value) / days, 1) : 0;
}

function ratio(current, baseline) {
  return baseline > 0 ? round((current / baseline) * 100) : null;
}

function uniqueRoutes(rows, label) {
  const routes = rows.map((row) => normalizeRoute(row.route));
  if (routes.some((route) => !route)) {
    console.error(`${label} contains an invalid route.`);
    process.exit(1);
  }
  if (new Set(routes).size !== routes.length) {
    console.error(`${label} contains duplicate routes.`);
    process.exit(1);
  }
  return routes;
}

const [pulse, baseline, actionLog, searchPlan, eeat] = await Promise.all([
  readJson(pulseSourcePath, 'Search Console pulse source'),
  readJson(baselineSourcePath, 'Search Console segment baseline'),
  readJson(actionLogPath, 'Search Console action log'),
  readJson(searchPlanPath, 'Search Console plan'),
  readJson(eeatReportPath, 'E-E-A-T inventory'),
]);

if (pulse.property !== expectedProperty || baseline.property !== expectedProperty) {
  console.error('Search Console pulse and baseline must use sc-domain:dmvcn.com.');
  process.exit(1);
}
if (toNumber(pulse.window?.hours) !== 24 || pulse.window?.provisional !== true) {
  console.error('Search Console pulse must be a provisional 24-hour window.');
  process.exit(1);
}

const observedDate = datePart(pulse.observedAt);
if (!isCalendarDate(observedDate)) {
  console.error('Search Console pulse observedAt is invalid.');
  process.exit(1);
}

const pulseTotals = pulse.propertyTotals ?? {};
const baselineTotals = baseline.propertyTotals ?? {};
const unitedStates = (pulse.countries ?? []).find((country) => country.code === 'US');
const vietnam = (pulse.countries ?? []).find((country) => country.code === 'VN');
const baselineUnitedStates = (baseline.countries ?? []).find(
  (country) => country.code === 'US',
);
const baselineVietnam = (baseline.countries ?? []).find(
  (country) => country.code === 'VN',
);
if (!unitedStates || !vietnam || !baselineUnitedStates || !baselineVietnam) {
  console.error('Pulse and baseline must include United States and Vietnam segments.');
  process.exit(1);
}

const baselineDays = daysInclusive(
  baseline.window?.dataShownFrom,
  baseline.window?.dataShownThrough,
);
if (baselineDays === 0) {
  console.error('Baseline data range is invalid.');
  process.exit(1);
}

const deviceClicks = (pulse.devices ?? []).reduce(
  (sum, device) => sum + toNumber(device.clicks),
  0,
);
const deviceImpressions = (pulse.devices ?? []).reduce(
  (sum, device) => sum + toNumber(device.impressions),
  0,
);
const usDeviceClicks = (pulse.unitedStatesDevices ?? []).reduce(
  (sum, device) => sum + toNumber(device.clicks),
  0,
);
const usDeviceImpressions = (pulse.unitedStatesDevices ?? []).reduce(
  (sum, device) => sum + toNumber(device.impressions),
  0,
);
if (
  deviceClicks !== toNumber(pulseTotals.clicks) ||
  deviceImpressions !== toNumber(pulseTotals.impressions)
) {
  console.error('Pulse device rows must exactly cover property totals.');
  process.exit(1);
}
if (
  usDeviceClicks !== toNumber(unitedStates.clicks) ||
  usDeviceImpressions !== toNumber(unitedStates.impressions)
) {
  console.error('United States device rows must exactly cover the United States segment.');
  process.exit(1);
}

const clickedRoutes = uniqueRoutes(pulse.clickedPages ?? [], 'clickedPages');
const noindexRoutes = uniqueRoutes(
  pulse.noindexPageSignals ?? [],
  'noindexPageSignals',
);
const registeredNoindexRoutes = new Set(NON_SEARCH_LANDING_ROUTES);
if (
  noindexRoutes.length !== registeredNoindexRoutes.size ||
  noindexRoutes.some((route) => !registeredNoindexRoutes.has(route))
) {
  console.error('Pulse noindex page signals must match NON_SEARCH_LANDING_ROUTES.');
  process.exit(1);
}

const indexableRoutes = new Set(
  (eeat.pages ?? []).filter((page) => page.indexable).map((page) => page.route),
);
if (clickedRoutes.some((route) => !indexableRoutes.has(route))) {
  console.error('Every clicked pulse page must be currently indexable.');
  process.exit(1);
}

const noindexClicks = (pulse.noindexPageSignals ?? []).reduce(
  (sum, row) => sum + toNumber(row.clicks),
  0,
);
const noindexImpressions = (pulse.noindexPageSignals ?? []).reduce(
  (sum, row) => sum + toNumber(row.impressions),
  0,
);
const actionsByRoute = new Map(
  (actionLog ?? []).map((entry) => [normalizeRoute(entry.route), entry]),
);
const nextEligibleDate = searchPlan.execution?.nextEligibleDate ?? null;
const clickedPageQueue = (pulse.clickedPages ?? []).map((page) => {
  const route = normalizeRoute(page.route);
  const completedAction = actionsByRoute.get(route);
  const inCooldown =
    isCalendarDate(completedAction?.evaluateAfter) &&
    completedAction.evaluateAfter > observedDate;
  return {
    route,
    clicks: toNumber(page.clicks),
    impressions: toNumber(page.impressions),
    state: inCooldown ? 'cooldown' : 'observe-query-needed',
    earliestDecisionDate: inCooldown
      ? completedAction.evaluateAfter
      : nextEligibleDate,
    note: inCooldown
      ? '已完成内容动作，等待冷却期后使用完整查询数据复评。'
      : '24 小时点击只进入观察队列；取得完整页面查询证据后才可安排内容动作。',
  };
});

const baselineDaily = {
  observedDays: baselineDays,
  clicks: daily(baselineTotals.clicks, baselineDays),
  impressions: daily(baselineTotals.impressions, baselineDays),
  unitedStatesClicks: daily(baselineUnitedStates.clicks, baselineDays),
  unitedStatesImpressions: daily(baselineUnitedStates.impressions, baselineDays),
  vietnamImpressions: daily(baselineVietnam.impressions, baselineDays),
};
const pulseMomentum = {
  clicksPercentOfBaselineDaily: ratio(
    toNumber(pulseTotals.clicks),
    baselineDaily.clicks,
  ),
  impressionsPercentOfBaselineDaily: ratio(
    toNumber(pulseTotals.impressions),
    baselineDaily.impressions,
  ),
  unitedStatesClicksPercentOfBaselineDaily: ratio(
    toNumber(unitedStates.clicks),
    baselineDaily.unitedStatesClicks,
  ),
  unitedStatesImpressionsPercentOfBaselineDaily: ratio(
    toNumber(unitedStates.impressions),
    baselineDaily.unitedStatesImpressions,
  ),
  vietnamImpressionsPercentOfBaselineDaily: ratio(
    toNumber(vietnam.impressions),
    baselineDaily.vietnamImpressions,
  ),
};
const usClickShare = percentage(
  toNumber(unitedStates.clicks),
  toNumber(pulseTotals.clicks),
);
const usImpressionShare = percentage(
  toNumber(unitedStates.impressions),
  toNumber(pulseTotals.impressions),
);
const vietnamImpressionShare = percentage(
  toNumber(vietnam.impressions),
  toNumber(pulseTotals.impressions),
);
const noindexVisibilityScale = percentage(
  noindexImpressions,
  toNumber(pulseTotals.impressions),
);
const noiseDominated =
  vietnamImpressionShare >= 50 || noindexVisibilityScale >= 30;
const rawTrafficElevated =
  toNumber(pulseMomentum.impressionsPercentOfBaselineDaily) >= 150;
const qualifiedUsExposureTrend =
  toNumber(pulseMomentum.unitedStatesImpressionsPercentOfBaselineDaily) >= 125
    ? 'rising'
    : toNumber(pulseMomentum.unitedStatesImpressionsPercentOfBaselineDaily) >= 75
      ? 'stable'
      : 'softening';
const contentActionAllowed =
  pulse.window?.provisional !== true &&
  toNumber(searchPlan.execution?.allowedNow) > 0;

const report = {
  generatedAt: pulse.observedAt,
  source: {
    property: pulse.property,
    pulseWindow: pulse.window,
    baselineWindow: baseline.window,
    dataPolicy:
      '24 小时数据仅用于异常监控和观察队列；不保存原始查询，不替代 30 天目标验收。',
  },
  metrics: {
    propertyTotals: {
      clicks: toNumber(pulseTotals.clicks),
      impressions: toNumber(pulseTotals.impressions),
      ctr: toNumber(pulseTotals.ctr),
      position: toNumber(pulseTotals.position),
    },
    unitedStates: {
      clicks: toNumber(unitedStates.clicks),
      impressions: toNumber(unitedStates.impressions),
      ctr: toNumber(unitedStates.ctr),
      position: toNumber(unitedStates.position),
      clickShare: usClickShare,
      impressionShare: usImpressionShare,
    },
    vietnam: {
      clicks: toNumber(vietnam.clicks),
      impressions: toNumber(vietnam.impressions),
      ctr: toNumber(vietnam.ctr),
      position: toNumber(vietnam.position),
      impressionShare: vietnamImpressionShare,
    },
    devices: pulse.devices ?? [],
    unitedStatesDevices: pulse.unitedStatesDevices ?? [],
  },
  diagnostics: {
    baselineDaily,
    momentum: pulseMomentum,
    audienceNoise: {
      noiseDominated,
      country: vietnam.code,
      impressions: toNumber(vietnam.impressions),
      impressionShare: vietnamImpressionShare,
    },
    noindexVisibility: {
      routes: noindexRoutes.length,
      clicks: noindexClicks,
      impressions: noindexImpressions,
      relativeToPropertyImpressionsPercent: noindexVisibilityScale,
      evaluateAfter:
        searchPlan.execution?.indexingCleanupQueue
          ?.map((entry) => entry.evaluateAfter)
          .filter(isCalendarDate)
          .sort()[0] ?? null,
      note: '这是历史可见性规模提示，页面维度与全站属性口径不同，不能从全站曝光中直接相减。',
    },
    clickedPageQueue,
    visibleRows: {
      pages: toNumber(pulse.visibleRows?.pages),
      queries: toNumber(pulse.visibleRows?.queries),
      rawQueriesPublished: false,
    },
  },
  execution: {
    searchPlanStatus: searchPlan.execution?.status ?? 'unknown',
    allowedNow: toNumber(searchPlan.execution?.allowedNow),
    nextEligibleDate,
    nextEligibleSlots: toNumber(searchPlan.execution?.nextEligibleSlots),
  },
  status: {
    provisional: true,
    completionComparable: false,
    contentActionAllowed,
    rawTrafficElevated,
    qualifiedUsExposureTrend,
    noiseDominated,
    interpretation:
      noiseDominated
        ? '总曝光上升主要受非目标国家和历史索引可见性影响；美国点击信号单独观察。'
        : '未发现主导总量的非目标曝光，仍需完整查询数据后再决定内容动作。',
  },
  warnings: [
    '24 小时数据会持续补录和波动，不得用于宣称长期目标达标。',
    '总曝光不能直接当作合格美国中文流量；国家、设备和 noindex 历史可见性必须分开看。',
    '点击页面没有完整查询证据时只进入观察队列，不自动改标题或扩写正文。',
  ],
};

const mobile = (pulse.devices ?? []).find((device) => device.code === 'MOBILE');
const desktop = (pulse.devices ?? []).find((device) => device.code === 'DESKTOP');
const usMobile = (pulse.unitedStatesDevices ?? []).find(
  (device) => device.code === 'MOBILE',
);
const usDesktop = (pulse.unitedStatesDevices ?? []).find(
  (device) => device.code === 'DESKTOP',
);
const markdown = [
  `# Search Console 24 小时流量脉冲 (${observedDate})`,
  '',
  '> 这是未完成补录的短周期观察，不是 30 天目标验收，也不直接触发内容发布。',
  '',
  '## 当前信号',
  '',
  `- 全站：${pulseTotals.clicks} 次点击、${pulseTotals.impressions} 次曝光、CTR ${pulseTotals.ctr}%、平均排名 ${pulseTotals.position}。`,
  `- 美国：${unitedStates.clicks} 次点击、${unitedStates.impressions} 次曝光、CTR ${unitedStates.ctr}%；贡献 ${usClickShare}% 点击和 ${usImpressionShare}% 曝光。`,
  `- 越南：${vietnam.impressions} 次曝光、${vietnam.clicks} 次点击，占总曝光 ${vietnamImpressionShare}%。`,
  `- 全站移动端：${mobile?.clicks ?? 0}/${mobile?.impressions ?? 0}，CTR ${mobile?.ctr ?? 0}%；桌面端：${desktop?.clicks ?? 0}/${desktop?.impressions ?? 0}，CTR ${desktop?.ctr ?? 0}%。`,
  `- 美国移动端：${usMobile?.clicks ?? 0}/${usMobile?.impressions ?? 0}，CTR ${usMobile?.ctr ?? 0}%；美国桌面端：${usDesktop?.clicks ?? 0}/${usDesktop?.impressions ?? 0}，CTR ${usDesktop?.ctr ?? 0}%。`,
  '',
  '## 与完整数据基线比较',
  '',
  `- 28 天界面当前实际显示 ${baselineDays} 个有数据日；日均 ${baselineDaily.clicks} 次点击、${baselineDaily.impressions} 次曝光。`,
  `- 当前 24 小时总曝光相当于该日均的 ${pulseMomentum.impressionsPercentOfBaselineDaily}%，美国曝光为 ${pulseMomentum.unitedStatesImpressionsPercentOfBaselineDaily}%，越南曝光为 ${pulseMomentum.vietnamImpressionsPercentOfBaselineDaily}%。`,
  `- 原始总量状态：${rawTrafficElevated ? '高于基线' : '未明显高于基线'}；美国曝光趋势：\`${qualifiedUsExposureTrend}\`；噪声主导：${noiseDominated ? '是' : '否'}。`,
  '',
  '## 索引清理观察',
  '',
  `- 三个 noindex 工具页当前仍显示 ${noindexImpressions} 次页面曝光、${noindexClicks} 次点击；相当于全站曝光的 ${noindexVisibilityScale}% 仅作规模提示，不能直接相减。`,
  `- 计划复查日期：${report.diagnostics.noindexVisibility.evaluateAfter ?? '未登记'}。`,
  '',
  '## 有点击页面',
  '',
  '| 页面 | 点击 | 曝光 | 状态 | 最早决策日期 |',
  '| --- | ---: | ---: | --- | --- |',
  ...clickedPageQueue.map(
    (page) =>
      `| ${page.route} | ${page.clicks} | ${page.impressions} | ${page.state} | ${page.earliestDecisionDate ?? '待完整数据'} |`,
  ),
  '',
  '这些页面只进入观察队列。24 小时数据不包含足够稳定的页面查询证据，不能据此自动改文。',
  '',
  '## 执行结论',
  '',
  `- Search Console 内容门禁：\`${report.execution.searchPlanStatus}\`，当前允许 ${report.execution.allowedNow} 个内容动作。`,
  `- 下一次可能出现容量：${nextEligibleDate ?? '未确定'}，最多 ${report.execution.nextEligibleSlots} 个。`,
  `- 本脉冲是否可触发内容动作：${contentActionAllowed ? '是' : '否'}。`,
  '- 后续仍以完整页面、查询、国家和设备导出及 30 天窗口验收长期目标。',
  '',
];

await mkdir(path.dirname(outputJsonPath), { recursive: true });
await writeFile(outputJsonPath, `${JSON.stringify(report, null, 2)}\n`);
await writeFile(outputMarkdownPath, markdown.join('\n'));

console.log('# Search Console Pulse Builder');
console.log('');
console.log(`Observed: ${pulse.observedAt}`);
console.log(`Property clicks / impressions: ${pulseTotals.clicks} / ${pulseTotals.impressions}`);
console.log(`US clicks / impressions: ${unitedStates.clicks} / ${unitedStates.impressions}`);
console.log(`Vietnam impressions: ${vietnam.impressions}`);
console.log(`Noindex visibility: ${noindexImpressions}`);
console.log(`Clicked page queue: ${clickedPageQueue.length}`);
console.log(`Content actions allowed: ${contentActionAllowed}`);
console.log('');
console.log(`Generated ${path.relative(projectRoot, outputJsonPath)} and ${path.relative(projectRoot, outputMarkdownPath)}.`);
