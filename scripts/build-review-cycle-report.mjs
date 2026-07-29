import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  currentCalendarDate,
  deriveReviewCycleReport,
} from './lib/review-cycles.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const eeatPath = path.resolve(
  process.env.REVIEW_CYCLE_EEAT_PATH ??
    path.join(projectRoot, 'reports', 'eeat-inventory.json'),
);
const officialLinkPath = path.resolve(
  process.env.REVIEW_CYCLE_LINK_AUDIT_PATH ??
    path.join(projectRoot, 'reports', 'official-link-audit.json'),
);
const jsonPath = path.resolve(
  process.env.REVIEW_CYCLE_JSON_PATH ??
    path.join(projectRoot, 'reports', 'review-cycle.json'),
);
const markdownPath = path.resolve(
  process.env.REVIEW_CYCLE_MARKDOWN_PATH ??
    path.join(projectRoot, 'reports', 'review-cycle.md'),
);
const asOf = (
  process.env.REVIEW_CYCLE_DATE ?? currentCalendarDate()
).slice(0, 10);

async function readJson(filePath, label) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    console.error(`Missing or invalid ${label}: ${filePath}`);
    process.exit(1);
  }
}

function queueTable(items) {
  if (items.length === 0) return ['- 无。'];
  return [
    '| 页面 | 复核策略 | 风险 | 公开事实核对 | 证据复核 | 计时起点 | 最晚复核 | 剩余/逾期天数 |',
    '| --- | --- | --- | --- | --- | --- | --- | ---: |',
    ...items.map((item) => {
      const distance =
        item.overdueDays > 0
          ? `逾期 ${item.overdueDays}`
          : `剩余 ${item.daysUntilDue}`;
      const policy =
        item.reviewPolicy === 'monthly-volatile'
          ? `易变规则：${item.volatileLabel}`
          : `${item.cycleDays} 天`;
      return `| ${item.route} | ${policy} | ${item.risk} | ${item.visibleReviewedAt} | ${item.evidenceReviewedAt ?? '—'} | ${item.reviewAnchorDate} | ${item.reviewDue} | ${distance} |`;
    }),
  ];
}

const [eeat, officialLinkAudit] = await Promise.all([
  readJson(eeatPath, 'E-E-A-T inventory'),
  readJson(officialLinkPath, 'official link audit'),
]);
const report = deriveReviewCycleReport({ asOf, eeat, officialLinkAudit });
const markdown = [
  `# 页面事实复核周期 (${asOf})`,
  '',
  `- 纳入页面：${report.summary.pages}；日期完整：${report.summary.missingReviewDate === 0 ? '是' : '否'}。`,
  `- 当前有效：${report.summary.valid}；30 天内到期：${report.summary.dueWithin30Days}；已逾期：${report.summary.overdue}。`,
  `- 易变规则入口：${report.summary.monthlyVolatilePages} 个；30 天内到期 ${report.summary.monthlyVolatileDueWithin30Days} 个；逾期 ${report.summary.monthlyVolatileOverdue} 个。`,
  `- 下一最早截止日：${report.summary.earliestDue ?? '无'}。`,
  `- 官方链接月度基线：${report.source.officialUrls} 个 URL，审计日期 ${report.source.officialAuditDate}，距今 ${report.source.officialAuditAgeDays} 天。`,
  `- 发布门禁：${report.status.gatePassed ? '通过' : '未通过'}。`,
  '',
  '## 周期',
  '',
  '| 风险 | 页面数 | 最长周期 | 最早到期 | 30 天内到期 | 已逾期 |',
  '| --- | ---: | ---: | --- | ---: | ---: |',
  ...Object.entries(report.byRisk).map(
    ([risk, row]) =>
      `| ${risk} | ${row.pages} | ${report.policy.cycleDays[risk]} 天 | ${row.earliestDue ?? '—'} | ${row.dueWithin30Days} | ${row.overdue} |`,
  ),
  '',
  '## 易变规则月度复核',
  '',
  `费用、期限、材料、身份、考试、旅行证件和车辆规则等 ${report.summary.monthlyVolatilePages} 个聚合入口使用 ${report.policy.monthlyVolatile.cycleDays} 天滚动周期。链接可访问检查不能替代事实语义复核。`,
  '',
  ...queueTable(report.queues.monthlyVolatile),
  '',
  '## 已逾期',
  '',
  ...queueTable(report.queues.overdue),
  '',
  '## 未来 30 天',
  '',
  ...queueTable(report.queues.dueWithin30Days),
  '',
  '## 下一批',
  '',
  ...queueTable(report.queues.upcoming),
  '',
  '## 执行规则',
  '',
  '- 只在实际重新打开官方来源并核对页面结论后更新 `reviewedAt`。',
  '- 易变规则页必须同时更新页面公开日期和证据复核日期，系统从较早的一天开始计时。',
  '- 仅改样式、标题或构建代码不能延后事实复核日期。',
  '- 页面逾期、日期缺失或月度官方链接基线失效时，构建与发布必须失败。',
];

await mkdir(path.dirname(jsonPath), { recursive: true });
await mkdir(path.dirname(markdownPath), { recursive: true });
await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
await writeFile(markdownPath, `${markdown.join('\n')}\n`);

console.log('# Review Cycle Plan');
console.log('');
console.log(`Pages: ${report.summary.pages}`);
console.log(`Valid: ${report.summary.valid}`);
console.log(`Due within 30 days: ${report.summary.dueWithin30Days}`);
console.log(
  `Monthly volatile reviews: ${report.summary.monthlyVolatilePages} (${report.summary.monthlyVolatileOverdue} overdue)`,
);
console.log(`Overdue: ${report.summary.overdue}`);
console.log(`Missing review date: ${report.summary.missingReviewDate}`);
console.log(`Earliest due: ${report.summary.earliestDue ?? 'none'}`);
console.log(`Gate: ${report.status.gatePassed ? 'pass' : 'fail'}`);
