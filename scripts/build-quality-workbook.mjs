import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
const outputDir = path.join(projectRoot, 'reports');

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

const today = (process.env.WORKBOOK_DATE || currentCalendarDate()).slice(0, 10);
const reviewCycle = {
  high: 60,
  medium: 90,
  standard: 120,
  policy: 180,
};

function addDays(dateLike, days) {
  const date = new Date(`${dateLike}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function daysBetween(fromDate, toDate) {
  const from = new Date(`${fromDate}T00:00:00.000Z`).getTime();
  const to = new Date(`${toDate}T00:00:00.000Z`).getTime();
  return Math.ceil((to - from) / (24 * 60 * 60 * 1000));
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function priorityForPage(page) {
  if (page.risk === 'high') return page.blockers.length > 0 ? 'P0' : 'P1';
  if (page.critical.length > 0 || page.reviewStatus === 'pending' || page.reviewStatus === 'source-mapped') return 'P1';
  if (page.blockers.length > 0) return 'P2';
  if (page.score < 90) return 'P2';
  return 'P3';
}

function actionForPage(page) {
  if (page.risk === 'high' && page.reviewStatus !== 'human-approved') {
    return {
      action: 'human-signoff',
      method: '安排真实人员逐条语义核查并签字',
      expectedOutcome: '人工签字后恢复页面发布通道',
    };
  }

  if (page.reviewStatus === 'pending') {
    return {
      action: 'registry-proof',
      method: '登记逐页 evidence 核对',
      expectedOutcome: '通过 source-mapped 入口核对后进入工作流',
    };
  }

  if (page.reviewStatus === 'source-mapped') {
    return {
      action: 'semantic-review',
      method: '逐页打开官方正文，比对声明限定条件并记录修改',
      expectedOutcome: '完成显式语义核对后升级为 ai-assisted',
    };
  }

  if (page.blockers.length > 0) {
    return {
      action: 'resolve-blockers',
      method: '修复 blocker 并补齐来源或结构项',
      expectedOutcome: '阻塞项清零，可复核后发布',
    };
  }

  if (page.score < 90) {
    return {
      action: 'optimize-content',
      method: '提升任务链路、常见失败章节、来源映射清晰度',
      expectedOutcome: '提升 E-E-A-T 分数并保留办事价值',
    };
  }

  if ((page.pageType === 'collection' || page.pageType === 'directory') && page.score <= 90) {
    return {
      action: 'intent-adjust',
      method: '合并重复意图或补充独特整理价值，再确认是否保留',
      expectedOutcome: '避免无效目录页堆叠，降低重复意图风险',
    };
  }

  return {
    action: 'observation',
    method: '继续观察流量和官方变更',
    expectedOutcome: '每月复核一次',
  };
}

let eeat;
try {
  const json = await readFile(reportPath, 'utf8');
  eeat = JSON.parse(json);
} catch (error) {
  console.error('请先运行 npm run build 和 npm run audit:eeat，生成 reports/eeat-inventory.json。');
  throw error;
}

const pages = eeat.pages ?? [];
const summaryByRisk = { standard: 0, medium: 0, high: 0, policy: 0 };
const summaryByType = {
  'collection': 0,
  'state-overview': 0,
  'state-real-id': 0,
  'topic': 0,
  'directory': 0,
  'trust': 0,
};
const reviewQueue = [];
const semanticReviewQueue = [];
const blockedQueue = [];
const weakIntentQueue = [];
const workbookItems = [];

for (const page of pages) {
  summaryByRisk[page.risk] = (summaryByRisk[page.risk] ?? 0) + 1;
  summaryByType[page.pageType] = (summaryByType[page.pageType] ?? 0) + 1;

  const priority = priorityForPage(page);
  const itemAction = actionForPage(page);
  const reviewedAt = page.semanticReview?.reviewedAt;
  const reviewDue = ['pending', 'source-mapped'].includes(page.reviewStatus)
    ? today
    : reviewedAt
      ? addDays(reviewedAt, reviewCycle[page.risk] ?? 90)
      : today;
  const overdueDays = reviewedAt ? daysBetween(today, reviewDue) : 0;

  const workbookItem = {
    route: page.route,
    pageType: page.pageType,
    risk: page.risk,
    score: page.score,
    threshold: page.threshold,
    pass: page.pass,
    reviewStatus: page.reviewStatus,
    reviewMethod: page.reviewMethod,
    reviewedAt: reviewedAt ?? '',
    reviewCycleDays: reviewCycle[page.risk] ?? 90,
    reviewDue,
    overdueDays: overdueDays < 0 ? Math.abs(overdueDays) : 0,
    priority,
    action: itemAction.action,
    actionMethod: itemAction.method,
    expectedOutcome: itemAction.expectedOutcome,
    blockersCount: page.blockers.length,
    blockers: page.blockers,
    criticalCount: page.critical.length,
    notes: page.semanticReview?.notes ?? '',
    reviewer: page.semanticReview?.reviewer ?? '',
  };

  workbookItems.push(workbookItem);

  if (page.risk === 'high' && page.reviewStatus !== 'human-approved') {
    reviewQueue.push(workbookItem);
  }

  if (page.risk !== 'high' && ['pending', 'source-mapped'].includes(page.reviewStatus)) {
    semanticReviewQueue.push(workbookItem);
  }

  if (page.blockers.length > 0 || page.critical.length > 0) {
    blockedQueue.push(workbookItem);
  }

  if ((page.pageType === 'collection' || page.pageType === 'directory') && page.reviewStatus !== 'not-required') {
    if (page.score < 90) {
      weakIntentQueue.push(workbookItem);
    }
  }
}

reviewQueue.sort((a, b) => {
  if (a.priority !== b.priority) return a.priority.localeCompare(b.priority);
  if (a.score !== b.score) return a.score - b.score;
  return a.overdueDays - b.overdueDays;
});

semanticReviewQueue.sort((a, b) => {
  if (a.priority !== b.priority) return a.priority.localeCompare(b.priority);
  if (a.pageType !== b.pageType) return a.pageType.localeCompare(b.pageType);
  return a.route.localeCompare(b.route);
});

blockedQueue.sort((a, b) => b.blockersCount - a.blockersCount || a.route.localeCompare(b.route));
weakIntentQueue.sort((a, b) => a.score - b.score);

const generatedAt = `${today}T00:00:00.000Z`;
const plan = {
  generatedAt,
  source: reportPath,
  summary: {
    pages: pages.length,
    blockedPages: blockedQueue.length,
    highRiskPending: reviewQueue.length,
    semanticReviewPending: semanticReviewQueue.length,
    blockedRate: pages.length ? Math.round((blockedQueue.length / pages.length) * 100) : 0,
    byRisk: summaryByRisk,
    byType: summaryByType,
  },
  queues: {
    humanSignoff: reviewQueue,
    semanticReview: semanticReviewQueue,
    blocked: blockedQueue,
    intentFixes: weakIntentQueue,
  },
  items: workbookItems,
  executionPhases: [
    {
      name: '第1-2周',
      goal: '完成高风险人工签字',
      expectedDone: Math.min(8, reviewQueue.length),
      routePrefix: '/topics/ /directories/',
      checkpoint: '未签字的高风险页不得用于新内容发布',
    },
    {
      name: '第3-4周',
      goal: '完成自动来源映射页面的逐页正文语义核对',
      expectedDone: Math.min(20, semanticReviewQueue.length),
      routePrefix: '/states/ /topics/ /directories/',
      checkpoint: '只有打开并比对官方正文的页面才能升级为 ai-assisted',
    },
    {
      name: '第5-8周',
      goal: '完成意图弱页重构或合并',
      expectedDone: Math.min(12, weakIntentQueue.length),
      routePrefix: '/directories/ /states/ /topics/',
      checkpoint: '每页保留完整办事价值，不以堆字数为标准',
    },
  ],
  nextMilestone: {
    date: addDays(today, 28),
    objective: '执行一次 Search Console + Search Console 回流动作同步',
    owner: '运营编辑',
  },
};

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, 'quality-workbook.json'), `${JSON.stringify(plan, null, 2)}\n`);

const csvRows = [
  ['route', 'pageType', 'risk', 'priority', 'score', 'reviewStatus', 'reviewMethod', 'reviewedAt', 'reviewDue', 'overdueDays', 'action', 'expectedOutcome', 'reviewer', 'notes'],
  ...workbookItems.map((row) => [
    row.route,
    row.pageType,
    row.risk,
    row.priority,
    row.score,
    row.reviewStatus,
    row.reviewMethod ?? '',
    row.reviewedAt ?? '',
    row.reviewDue,
    row.overdueDays,
    row.action,
    row.expectedOutcome,
    row.reviewer,
    row.notes,
  ]),
];

await writeFile(
  path.join(outputDir, 'quality-workbook.csv'),
  `${csvRows.map((line) => line.map(csvCell).join(',')).join('\n')}\n`,
);

const markdownLines = [
  `# 本周质量工作簿（${today}）`,
  '',
  `- 页面数：${pages.length}`,
  `- 高风险待人工签字：${reviewQueue.length}`,
  `- 待逐页官方正文语义核对：${semanticReviewQueue.length}`,
  `- 阻塞项：${blockedQueue.length}`,
  `- 弱意图待处理：${weakIntentQueue.length}`,
  '',
  '## 人工签字队列（高风险）',
  '',
  '| 路由 | 风险 | 分数 | 状态 | 说明 | 建议截止 |',
  '| --- | --- | --- | --- | --- | --- |',
  ...reviewQueue.slice(0, 30).map(
    (item) => `| ${item.route} | ${item.risk} | ${item.score} | ${item.reviewStatus} | ${item.actionMethod} | ${item.reviewDue} |`,
  ),
  '',
  '## 官方正文语义核对队列',
  '',
  '| 路由 | 类型 | 分数 | 当前状态 | 下一步 |',
  '| --- | --- | --- | --- | --- |',
  ...semanticReviewQueue.slice(0, 40).map(
    (item) => `| ${item.route} | ${item.pageType} | ${item.score} | ${item.reviewStatus} | ${item.actionMethod} |`,
  ),
  '',
  '## 阻塞项优先处理',
  '',
  '| 路由 | 风险 | 分数 | 阻塞点 |',
  '| --- | --- | --- | --- |',
  ...blockedQueue.slice(0, 30).map((item) => {
    const reason = item.blockers.join('；') || (item.criticalCount > 0 ? `${item.criticalCount}条关键项` : item.actionMethod);
    return `| ${item.route} | ${item.risk} | ${item.score} | ${reason} |`;
  }),
  '',
  '## 执行节奏',
  ...plan.executionPhases.map(
    (phase, index) => `${index + 1}. **${phase.name}**：${phase.goal}，目标产出 ${phase.expectedDone} 条，检查点：${phase.checkpoint}`,
  ),
  '',
];

await writeFile(path.join(outputDir, 'quality-workbook.md'), `${markdownLines.join('\n')}\n`);

console.log('Quality workbook generated:');
console.log(`- reports/quality-workbook.json`);
console.log(`- reports/quality-workbook.csv`);
console.log(`- reports/quality-workbook.md`);
console.log(`  highRiskPending=${reviewQueue.length}, blocked=${blockedQueue.length}, weakIntent=${weakIntentQueue.length}`);
console.log(`  semanticReviewPending=${semanticReviewQueue.length}, inventory=${workbookItems.length}`);
