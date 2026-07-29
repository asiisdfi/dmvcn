import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateSerializedWindow } from './lib/search-console-window.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportsDir = path.join(projectRoot, 'reports');
const privateReportsDir = path.join(reportsDir, 'private');
const pageReportPath = path.resolve(
  process.env.SC_PAGE_REPORT_PATH ?? path.join(reportsDir, 'search-console-export.csv'),
);
const segmentReportPath = path.resolve(
  process.env.SC_SEGMENT_REPORT_PATH ??
    path.join(privateReportsDir, 'search-console-segments.json'),
);
const actionLogPath = path.resolve(
  process.env.SC_ACTION_LOG_PATH ?? path.join(reportsDir, 'search-console-actions.json'),
);
const eeatReportPath = path.resolve(
  process.env.EEAT_REPORT_PATH ?? path.join(reportsDir, 'eeat-inventory.json'),
);
const searchPlanPath = path.resolve(
  process.env.SEARCH_CONSOLE_PLAN_PATH ??
    path.join(reportsDir, 'search-console-priority.json'),
);
const scorecardDate = (
  process.env.SC_SCORECARD_DATE ??
  new Intl.DateTimeFormat('en-CA', {
    timeZone: process.env.REPORT_TIME_ZONE ?? 'Asia/Shanghai',
  }).format(new Date())
).slice(0, 10);

const targets = {
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

function parseCsv(text) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        index += 1;
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

  const normalizeKey = (key) =>
    String(key).trim().replace(/^\uFEFF/, '').toLowerCase().replace(/\s+/g, '');
  const headers = rows[0].map(normalizeKey);
  return rows
    .slice(1)
    .filter((line) => line.some((cell) => String(cell ?? '').trim() !== ''))
    .map((line) =>
      Object.fromEntries(headers.map((header, index) => [header, String(line[index] ?? '').trim()])),
    );
}

function valueFor(row, aliases) {
  for (const alias of aliases) {
    const key = alias.toLowerCase().replace(/\s+/g, '');
    if (row[key] !== undefined) return row[key];
  }
  return '';
}

function toNumber(value) {
  const number = Number(String(value ?? '').replace(/[,%]/g, '').trim());
  return Number.isFinite(number) ? number : 0;
}

function normalizeRoute(value) {
  if (!value) return '';
  try {
    const parsed = /^https?:\/\//i.test(value) ? new URL(value) : null;
    const pathname = parsed ? parsed.pathname : String(value);
    if (!pathname.startsWith('/')) return '';
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
  } catch {
    return '';
  }
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function percentage(part, total) {
  return total > 0 ? round((part / total) * 100) : 0;
}

function minimumCheck(actual, target, unit) {
  return {
    actual,
    target,
    unit,
    progressPercent: target > 0 ? round((actual / target) * 100) : null,
    remaining: round(Math.max(target - actual, 0), unit === 'percent' ? 1 : 0),
    met: actual >= target,
  };
}

function actionRangeStatus(count, range) {
  if (count < range.min) return 'below-target';
  if (count > range.max) return 'above-target';
  return 'on-target';
}

async function readJson(filePath, fallback = null) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

const [pageCsv, segments, actionLog, eeat, searchPlan] = await Promise.all([
  readFile(pageReportPath, 'utf8').catch(() => ''),
  readJson(segmentReportPath),
  readJson(actionLogPath, []),
  readJson(eeatReportPath),
  readJson(searchPlanPath),
]);

const warnings = [];
if (!pageCsv) warnings.push(`缺少页面维度导出：${pageReportPath}`);
if (!segments) warnings.push(`缺少 Search Console 分段快照：${segmentReportPath}`);
if (!eeat) warnings.push(`缺少 E-E-A-T 报告：${eeatReportPath}`);
if (!searchPlan) warnings.push(`缺少 Search Console 优先级计划：${searchPlanPath}`);

const indexableRoutes = new Set(
  (eeat?.pages ?? []).filter((page) => page.indexable).map((page) => page.route),
);
const pageRows = parseCsv(pageCsv);
const pagesByRoute = new Map();
for (const row of pageRows) {
  const route = normalizeRoute(
    valueFor(row, ['排名靠前的网页', 'top pages', 'page', 'url']),
  );
  if (!route || !indexableRoutes.has(route)) continue;
  pagesByRoute.set(route, {
    route,
    clicks: toNumber(valueFor(row, ['点击次数', 'clicks'])),
    impressions: toNumber(valueFor(row, ['展示', 'impressions'])),
    ctr: toNumber(valueFor(row, ['点击率', 'ctr'])),
    position: toNumber(valueFor(row, ['排名', 'position'])),
  });
}
const indexablePageRows = [...pagesByRoute.values()];
const rankedPages = indexablePageRows.filter(
  (page) => page.impressions > 0 && page.position > 0,
);
const top20Pages = rankedPages.filter((page) => page.position <= 20).length;
const top10Pages = rankedPages.filter((page) => page.position <= 10).length;
const pageDimensionClicks = indexablePageRows.reduce((sum, page) => sum + page.clicks, 0);
const pageDimensionImpressions = indexablePageRows.reduce(
  (sum, page) => sum + page.impressions,
  0,
);

const propertyTotals = segments?.propertyTotals ?? {
  clicks: 0,
  impressions: 0,
  ctr: 0,
  position: 0,
};
const unitedStates = (segments?.countries ?? []).find(
  (country) => country.code === 'US',
);
const usClickShare =
  propertyTotals.clicks > 0 && unitedStates
    ? round((unitedStates.clicks / propertyTotals.clicks) * 100)
    : 0;
const usImpressionShare = percentage(
  toNumber(unitedStates?.impressions),
  toNumber(propertyTotals.impressions),
);
const segmentClickTotal = (segments?.countries ?? []).reduce(
  (sum, country) => sum + toNumber(country.clicks),
  0,
);
const deviceClickTotal = (segments?.devices ?? []).reduce(
  (sum, device) => sum + toNumber(device.clicks),
  0,
);
const deviceImpressionTotal = (segments?.devices ?? []).reduce(
  (sum, device) => sum + toNumber(device.impressions),
  0,
);
const deviceDiagnostics = (segments?.devices ?? []).map((device) => {
  const clicks = toNumber(device.clicks);
  const impressions = toNumber(device.impressions);
  return {
    code: device.code,
    label: device.label,
    clicks,
    impressions,
    clickShare: percentage(clicks, toNumber(propertyTotals.clicks)),
    impressionShare: percentage(impressions, toNumber(propertyTotals.impressions)),
    ctr: percentage(clicks, impressions),
  };
});
const mobileDevice = deviceDiagnostics.find((device) => device.code === 'MOBILE');
const desktopDevice = deviceDiagnostics.find((device) => device.code === 'DESKTOP');
const audienceAnomalies = (segments?.countries ?? [])
  .filter(
    (country) =>
      country.code !== 'US' &&
      toNumber(country.clicks) === 0 &&
      toNumber(country.impressions) >=
        Math.max(100, toNumber(unitedStates?.impressions)),
  )
  .map((country) => ({
    code: country.code,
    label: country.label,
    clicks: toNumber(country.clicks),
    impressions: toNumber(country.impressions),
    impressionShare: percentage(
      toNumber(country.impressions),
      toNumber(propertyTotals.impressions),
    ),
  }))
  .sort((left, right) => right.impressions - left.impressions);
const publicQuerySignals = searchPlan?.querySignals ?? {};
const visibleQueryImpressionCoverage = percentage(
  toNumber(publicQuerySignals.visibleImpressions),
  toNumber(propertyTotals.impressions),
);
const visibleChineseImpressionShare = percentage(
  toNumber(publicQuerySignals.chineseImpressions),
  toNumber(publicQuerySignals.visibleImpressions),
);
const indexingCleanup = searchPlan?.execution?.indexingCleanupQueue ?? [];
const indexingNoiseImpressions = indexingCleanup.reduce(
  (sum, entry) => sum + toNumber(entry.impressions),
  0,
);
const indexingNoiseRatio = percentage(
  indexingNoiseImpressions,
  toNumber(propertyTotals.impressions),
);
const overdueIndexingCleanup = indexingCleanup.filter(
  (entry) =>
    /^\d{4}-\d{2}-\d{2}$/.test(entry.evaluateAfter ?? '') &&
    entry.evaluateAfter <= scorecardDate,
);

const monthPrefix = scorecardDate.slice(0, 7);
const monthlyActions = (actionLog ?? []).filter((entry) =>
  String(entry.completedAt ?? '').startsWith(monthPrefix),
);
const scorecardDay = new Date(`${scorecardDate}T00:00:00.000Z`);
const rollingWindowStart = new Date(scorecardDay);
rollingWindowStart.setUTCDate(rollingWindowStart.getUTCDate() - 6);
const rollingWindowStartDate = rollingWindowStart.toISOString().slice(0, 10);
const rollingSevenDayActions = (actionLog ?? []).filter(
  (entry) =>
    /^\d{4}-\d{2}-\d{2}$/.test(entry.completedAt ?? '') &&
    entry.completedAt >= rollingWindowStartDate &&
    entry.completedAt <= scorecardDate,
);
const activeCooldowns = (actionLog ?? []).filter(
  (entry) =>
    /^\d{4}-\d{2}-\d{2}$/.test(entry.evaluateAfter ?? '') &&
    entry.evaluateAfter > scorecardDate,
);
const weeklyActionStatus = actionRangeStatus(
  rollingSevenDayActions.length,
  targets.weeklyActions,
);
const monthlyActionStatus = actionRangeStatus(
  monthlyActions.length,
  targets.monthlyActions,
);

const eeatSummary = eeat?.summary ?? {};
const indexablePassRate =
  eeatSummary.indexablePages > 0
    ? round((eeatSummary.indexablePassed / eeatSummary.indexablePages) * 100)
    : 0;
const qualityGatePassed =
  indexablePassRate === 100 &&
  eeatSummary.highRiskHumanApprovalPending === 0 &&
  eeatSummary.criticalPages === 0 &&
  eeatSummary.blockedPages === 0;

const metricChecks = {
  clicks: minimumCheck(propertyTotals.clicks, targets.clicks, 'clicks'),
  impressions: minimumCheck(propertyTotals.impressions, targets.impressions, 'impressions'),
  ctr: minimumCheck(propertyTotals.ctr, targets.ctr, 'percent'),
  top20Pages: minimumCheck(top20Pages, targets.top20Pages, 'pages'),
  top10Pages: minimumCheck(top10Pages, targets.top10Pages, 'pages'),
  usClickShare: minimumCheck(usClickShare, targets.usClickShare, 'percent'),
};
const requestedWindowDays = toNumber(segments?.window?.days);
const windowEvidence = evaluateSerializedWindow(segments?.window);
const completionComparable =
  requestedWindowDays === 30 &&
  windowEvidence.verified;
const growthTargetsMet = Object.values(metricChecks).every((check) => check.met);
const objectiveEvidenceComplete =
  completionComparable &&
  growthTargetsMet &&
  qualityGatePassed &&
  weeklyActionStatus === 'on-target' &&
  monthlyActionStatus === 'on-target';

if (!completionComparable) {
  warnings.push(
    `当前快照是 ${requestedWindowDays || '未知'} 天窗口，只能跟踪趋势，不能证明 30 天目标完成。`,
  );
}
if (!windowEvidence.verified) {
  warnings.push('Search Console 时间窗口缺少可核对的筛选标签或图表日期跨度。');
}
if (segmentClickTotal !== propertyTotals.clicks) {
  warnings.push(
    `国家分段只覆盖 ${segmentClickTotal}/${propertyTotals.clicks} 次点击，美国点击占比可能不完整。`,
  );
}
if (deviceClickTotal !== propertyTotals.clicks) {
  warnings.push(
    `设备分段只覆盖 ${deviceClickTotal}/${propertyTotals.clicks} 次点击，设备占比可能不完整。`,
  );
}
if (deviceImpressionTotal !== propertyTotals.impressions) {
  warnings.push(
    `设备分段只覆盖 ${deviceImpressionTotal}/${propertyTotals.impressions} 次曝光，设备曝光占比可能有四舍五入或缺失。`,
  );
}
if (pageDimensionImpressions !== propertyTotals.impressions) {
  warnings.push(
    '页面维度与全站属性采用不同聚合口径，本报告还会排除当前 noindex 页面，不能用页面行求和替代全站曝光总量。',
  );
}
if (indexingNoiseRatio >= 20) {
  warnings.push(
    `${indexingCleanup.length} 个已 noindex 页面仍有 ${indexingNoiseImpressions} 次历史页面维度曝光，相当于全站属性曝光的 ${indexingNoiseRatio}%；两者口径不同，不能直接相减。`,
  );
}
if (audienceAnomalies.length > 0) {
  warnings.push(
    `发现 ${audienceAnomalies.length} 个非目标国家有大量曝光但没有点击，不应据此扩写泛英文内容。`,
  );
}
if (
  mobileDevice &&
  mobileDevice.impressionShare > 0 &&
  mobileDevice.clickShare > mobileDevice.impressionShare * 2
) {
  warnings.push(
    `移动端仅占 ${mobileDevice.impressionShare}% 曝光，却贡献 ${mobileDevice.clickShare}% 点击；移动端中文办事体验应作为增长基线。`,
  );
}
if (monthlyActionStatus === 'above-target') {
  warnings.push(
    `本月已记录 ${monthlyActions.length} 个内容动作，超过 8–12 个计划节奏；除规则纠错外应等待冷却数据。`,
  );
}
if (weeklyActionStatus === 'above-target') {
  warnings.push(
    `最近 7 天已记录 ${rollingSevenDayActions.length} 个内容动作，超过每周 2–3 个节奏；应先观察而不是继续批量修改。`,
  );
}

const scorecard = {
  generatedAt: `${scorecardDate}T00:00:00.000Z`,
  objectiveDeadline: '2027-01-24',
  source: {
    property: segments?.property ?? 'sc-domain:dmvcn.com',
    window: segments?.window ?? null,
    windowEvidence,
    pageReport: path.relative(projectRoot, pageReportPath),
    segmentReport: path.relative(projectRoot, segmentReportPath),
    eeatReport: path.relative(projectRoot, eeatReportPath),
    actionLog: path.relative(projectRoot, actionLogPath),
    searchPlan: path.relative(projectRoot, searchPlanPath),
  },
  targets,
  current: {
    propertyTotals,
    rankedPages: {
      rowsWithImpressions: rankedPages.length,
      top20: top20Pages,
      top10: top10Pages,
    },
    traffic: {
      usClicks: unitedStates?.clicks ?? 0,
      usImpressions: unitedStates?.impressions ?? 0,
      usClickShare,
      usImpressionShare,
      countries: segments?.countries ?? [],
      devices: segments?.devices ?? [],
    },
    diagnostics: {
      queryVisibility: {
        visibleRows: toNumber(publicQuerySignals.totalRows),
        visibleClicks: toNumber(publicQuerySignals.visibleClicks),
        visibleImpressions: toNumber(publicQuerySignals.visibleImpressions),
        impressionCoveragePercent: visibleQueryImpressionCoverage,
        chineseRows: toNumber(publicQuerySignals.chineseRows),
        chineseClicks: toNumber(publicQuerySignals.chineseClicks),
        chineseImpressions: toNumber(publicQuerySignals.chineseImpressions),
        chineseShareOfVisibleImpressions: visibleChineseImpressionShare,
        note: '仅保存汇总值；原始查询留在私有报告，不写入公开记分卡。',
      },
      devices: deviceDiagnostics,
      audienceAnomalies,
      indexingNoise: {
        routes: indexingCleanup.length,
        impressions: indexingNoiseImpressions,
        relativeToPropertyImpressionsPercent: indexingNoiseRatio,
        overdue: overdueIndexingCleanup.length,
        note: '来自页面维度历史数据，与全站属性总量口径不同，只能观察规模，不能直接相减。',
      },
    },
    pageDimension: {
      indexableRows: indexablePageRows.length,
      clickSum: pageDimensionClicks,
      impressionSum: pageDimensionImpressions,
      note: '仅用于页面排名和页面机会分析，不作为全站总量。',
    },
    cadence: {
      month: monthPrefix,
      completedActions: monthlyActions.length,
      targetMin: targets.monthlyActions.min,
      targetMax: targets.monthlyActions.max,
      status: monthlyActionStatus,
      rollingSevenDays: {
        from: rollingWindowStartDate,
        through: scorecardDate,
        completedActions: rollingSevenDayActions.length,
        targetMin: targets.weeklyActions.min,
        targetMax: targets.weeklyActions.max,
        status: weeklyActionStatus,
      },
      activeCooldowns: activeCooldowns.length,
      nextCooldownDate:
        activeCooldowns.map((entry) => entry.evaluateAfter).sort()[0] ?? null,
    },
    quality: {
      indexablePages: eeatSummary.indexablePages ?? 0,
      indexablePassed: eeatSummary.indexablePassed ?? 0,
      indexablePassRate,
      highRiskHumanApprovalPending: eeatSummary.highRiskHumanApprovalPending ?? 0,
      criticalPages: eeatSummary.criticalPages ?? 0,
      blockedPages: eeatSummary.blockedPages ?? 0,
      passed: qualityGatePassed,
    },
  },
  checks: metricChecks,
  status: {
    windowVerified: windowEvidence.verified,
    completionComparable,
    growthTargetsMet,
    qualityGatePassed,
    weeklyCadenceStatus: weeklyActionStatus,
    cadenceStatus: monthlyActionStatus,
    objectiveEvidenceComplete,
  },
  warnings,
};

const metricRows = [
  ['自然搜索点击', metricChecks.clicks, ''],
  ['自然搜索曝光', metricChecks.impressions, ''],
  ['全站 CTR', metricChecks.ctr, '%'],
  ['排名前 20 页面', metricChecks.top20Pages, ''],
  ['排名前 10 页面', metricChecks.top10Pages, ''],
  ['美国点击占比', metricChecks.usClickShare, '%'],
];
const formatNumber = (value) =>
  typeof value === 'number' ? value.toLocaleString('en-US') : value;
const markdown = [
  `# DMVCN 增长 Scorecard (${scorecardDate})`,
  '',
  `- Search Console 窗口：${segments?.window?.label ?? '未知'}；界面可见数据 ${segments?.window?.dataShownFrom ?? '未知'} 至 ${segments?.window?.dataShownThrough ?? '未知'}。`,
  `- 窗口证据：${windowEvidence.verified ? `已核对（${windowEvidence.method}）` : '未核对'}。`,
  `- 完成证据可比性：${completionComparable ? '可用于 30 天目标验收' : '仅作趋势代理，尚不能用于 30 天目标验收'}。`,
  `- 质量门禁：${qualityGatePassed ? '通过' : '未通过'}；可索引页面 ${eeatSummary.indexablePassed ?? 0}/${eeatSummary.indexablePages ?? 0}。`,
  '',
  '## 核心指标',
  '',
  '| 指标 | 当前 | 目标 | 进度 | 状态 |',
  '| --- | ---: | ---: | ---: | --- |',
  ...metricRows.map(([label, check, suffix]) =>
    `| ${label} | ${formatNumber(check.actual)}${suffix} | ${formatNumber(check.target)}${suffix} | ${check.progressPercent}% | ${check.met ? '达标' : '未达标'} |`,
  ),
  '',
  '## 执行节奏',
  '',
  `- 最近 7 天（${rollingWindowStartDate} 至 ${scorecardDate}）已记录 ${rollingSevenDayActions.length} 个内容动作，目标范围为 ${targets.weeklyActions.min}–${targets.weeklyActions.max}，当前为 \`${weeklyActionStatus}\`。`,
  `- ${monthPrefix} 已记录 ${monthlyActions.length} 个内容动作，目标范围为 ${targets.monthlyActions.min}–${targets.monthlyActions.max}，当前为 \`${monthlyActionStatus}\`。`,
  `- 仍在观察期的页面：${activeCooldowns.length} 个；最近可复评日期：${activeCooldowns.map((entry) => entry.evaluateAfter).sort()[0] ?? '无'}。`,
  `- 页面排名：${top20Pages} 页进入前 20，其中 ${top10Pages} 页进入前 10。`,
  `- 美国点击：${unitedStates?.clicks ?? 0}/${propertyTotals.clicks}，占 ${usClickShare}%。`,
  '',
  '## 有效流量诊断',
  '',
  `- 美国贡献 ${usClickShare}% 点击和 ${usImpressionShare}% 曝光；优先优化美国中文用户，而不是追逐全球泛流量。`,
  `- 移动端贡献 ${mobileDevice?.clickShare ?? 0}% 点击、${mobileDevice?.impressionShare ?? 0}% 曝光，CTR ${mobileDevice?.ctr ?? 0}%；桌面端贡献 ${desktopDevice?.clickShare ?? 0}% 点击、${desktopDevice?.impressionShare ?? 0}% 曝光，CTR ${desktopDevice?.ctr ?? 0}%。`,
  `- 当前可见查询 ${toNumber(publicQuerySignals.totalRows)} 行，覆盖 ${visibleQueryImpressionCoverage}% 全站曝光；其中中文查询曝光占可见查询曝光 ${visibleChineseImpressionShare}%。`,
  `- ${indexingCleanup.length} 个已 noindex 页面仍有 ${indexingNoiseImpressions} 次历史页面维度曝光，复查逾期 ${overdueIndexingCleanup.length} 个。`,
  ...(audienceAnomalies.length > 0
    ? audienceAnomalies.map(
        (country) =>
          `- 异常受众：${country.label}有 ${country.impressions} 次曝光、${country.clicks} 次点击，占全站曝光 ${country.impressionShare}%。`,
      )
    : ['- 未发现达到阈值的非目标国家零点击异常曝光。']),
  '',
  '## 数据边界',
  '',
  `- 全站总量使用 Search Console 顶部指标：${propertyTotals.clicks} 次点击、${propertyTotals.impressions} 次曝光、CTR ${propertyTotals.ctr}%。`,
  `- 当前可索引页面维度求和为 ${pageDimensionClicks} 次点击、${pageDimensionImpressions} 次曝光，只用于页面级分析。`,
  ...warnings.map((warning) => `- ${warning}`),
  '',
  '## 下一检查点',
  '',
  `1. 在 ${activeCooldowns.map((entry) => entry.evaluateAfter).sort()[0] ?? '下一次数据更新'} 后复评已修改页面，不在观察期内重复改标题。`,
  '2. 下次导出使用完整 30 天自定义日期范围，作为长期目标的可比验收窗口。',
  '3. 优先提高美国中文用户点击，不追逐泛英文或非目标国家曝光。',
  '',
];

await mkdir(reportsDir, { recursive: true });
await writeFile(
  path.join(reportsDir, 'growth-scorecard.json'),
  `${JSON.stringify(scorecard, null, 2)}\n`,
);
await writeFile(path.join(reportsDir, 'growth-scorecard.md'), markdown.join('\n'));

console.log('Growth scorecard generated:');
console.log('- reports/growth-scorecard.json');
console.log('- reports/growth-scorecard.md');
console.log(
  `  clicks=${propertyTotals.clicks}, impressions=${propertyTotals.impressions}, top20=${top20Pages}, top10=${top10Pages}, usShare=${usClickShare}%`,
);
console.log(
  `  quality=${qualityGatePassed ? 'pass' : 'fail'}, weekly=${weeklyActionStatus}, monthly=${monthlyActionStatus}, completionComparable=${completionComparable}`,
);
