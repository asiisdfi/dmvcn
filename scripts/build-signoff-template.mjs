import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { topics } from '../src/data/content.ts';
import { currentCalendarDate } from './lib/review-cycles.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
const reviewCyclePath = path.join(projectRoot, 'reports', 'review-cycle.json');
const docsDir = path.join(projectRoot, 'docs');
const outputPath = path.join(docsDir, 'review-manual-signoff-template.csv');
const packagePath = path.join(docsDir, 'review-manual-signoff-package.md');
const today = (
  process.env.SIGNOFF_PLAN_DATE || currentCalendarDate()
).slice(0, 10);

function csvCell(value) {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
}

const headers = ['route', 'reviewer', 'reviewedAt', 'scope', 'notes'];

let eeat;
let reviewCycle;
try {
  eeat = JSON.parse(await readFile(reportPath, 'utf8'));
  reviewCycle = JSON.parse(await readFile(reviewCyclePath, 'utf8'));
} catch (error) {
  console.error('请先执行 npm run build，生成 E-E-A-T 与事实复核日历。');
  throw error;
}

const monthlyDueRoutes = new Set(
  (reviewCycle.queues?.monthlyVolatile ?? [])
    .filter((item) => ['due-within-30-days', 'overdue'].includes(item.state))
    .map((item) => item.route),
);
const highRiskPages = (eeat.pages ?? [])
  .filter(
    (page) =>
      page.risk === 'high' &&
      (
        page.reviewStatus !== 'human-approved' ||
        monthlyDueRoutes.has(page.route)
      ),
  )
  .sort((a, b) => {
    if (a.pageType !== b.pageType) return a.pageType.localeCompare(b.pageType);
    return a.route.localeCompare(b.route);
  });

const title = {
  '/topics/': '高风险专题核查',
  '/directories/': '高风险目录核查',
};
const topicsByRoute = new Map(topics.map((topic) => [`/topics/${topic.slug}/`, topic]));

function currentContentDate(page) {
  return [page.dates?.modifiedAt, page.dates?.reviewedAt]
    .filter(Boolean)
    .sort()
    .at(-1) ?? '未记录';
}

function reviewReason(page) {
  if (page.reviewStatus === 'human-approval-stale') {
    return '内容或来源版本变化后重新人工核对（旧签字已失效）';
  }
  if (monthlyDueRoutes.has(page.route)) {
    return '30 天易变规则复核窗口';
  }
  return '首次高风险人工核对';
}

const csvLines = [headers.join(',')];
for (const page of highRiskPages) {
  const scopePrefix = page.pageType === 'topic' ? '专题：' : page.pageType === 'directory' ? '目录：' : '高风险页：';
  const scope =
    page.semanticReview?.scope ??
    `${scopePrefix}${page.route}`;
  const notes =
    (page.reviewStatus === 'human-approval-stale'
      ? page.signals?.humanApprovalFingerprintCurrent === false &&
        page.signals?.contentFingerprint
        ? `现有人工签字对应的目录内容指纹与当前构建不一致。请对照当前正文重新打开逐条政府来源核对；发现问题先退回修改，完成当前版本核对后再填写新签字。`
        : `现有人工签字日期为 ${page.semanticReview?.reviewedAt ?? '未记录'}，早于当前内容版本 ${currentContentDate(page)}。请对照当前正文重新打开逐条政府来源核对；发现问题先退回修改，完成当前版本核对后再填写新签字。`
      : monthlyDueRoutes.has(page.route)
      ? `本页已进入 30 天易变规则复核窗口。请重新打开页面所列政府来源，记录规则是否变化；若有变化，先退回修改，再对修改后的内容签字。`
      : page.semanticReview?.notes) ||
    `请完成高风险事实逐条语义核查并确认：\n- 适用州范围\n- 适用身份/期限边界\n- 法律后果与失败场景\n- 官方来源逐条映射是否可追溯`;

  const row = [
    page.route,
    '',
    '',
    scope,
    notes,
  ].map(csvCell);

  csvLines.push(row.join(','));
}

await mkdir(docsDir, { recursive: true });
await writeFile(outputPath, `${csvLines.join('\n')}\n`, 'utf8');

const markdown = [
  '# 高风险页面人工语义复核包',
  '',
  `生成日期：${today}`,
  '',
  '## 使用规则',
  '',
  '- 本文件不是自动通过证明。只有真实人员打开来源正文并完成语义判断后，才可填写 reviewer 和 reviewedAt。',
  '- 审核人不需要具备虚构的 DMV、律师或移民顾问资历；如无相应资历，不得在姓名或备注中暗示专业背书。',
  '- 每条声明至少检查适用州、适用人群、期限或金额、例外、法律后果、来源是否仍有效，以及中文是否扩大了官方原意。',
  '- 发现一条关键事实无法由现行官方正文支持时，应选择“退回修改”或“部分通过”，不能为了让严格审计变绿而签字。',
  '- 月度复核日期保持空白，只有完成本轮核对后才能填写；不得沿用上一次日期。',
  '- 高风险正文一旦晚于签字日期发生修改，或目录声明、州归属、就近来源的指纹发生变化，旧签字会自动失效，页面保持 noindex。',
  '- 审核完成后，把签字表 CSV 填好，再执行 `SIGNOFF_CSV=docs/review-manual-signoff-template.csv npm run review:signoffs:import`。',
  '- 导入签字后，还要把页面公开的“事实核对”日期更新为同一真实日期；两处日期中任一处未更新，30 天门禁都不会延期。',
  '- 初次通过导入后，页面会在下一次构建时自动移除 `noindex` 并重新进入 sitemap；未签字页继续保留访问入口，但不提交搜索引擎收录。',
  '',
];

for (const [pageIndex, page] of highRiskPages.entries()) {
  const review = page.semanticReview ?? {};
  const topic = topicsByRoute.get(page.route);
  const pageTitle = topic?.title ?? page.route;
  const evidenceItems = page.signals?.directoryEvidenceItems ?? 0;
  const evidenceLinks = page.signals?.directoryEvidenceLinks ?? 0;

  markdown.push(
    `## ${pageIndex + 1}. ${pageTitle}`,
    '',
    `- 页面：${page.route}`,
    `- 类型：${page.pageType === 'topic' ? '高风险专题' : '高风险目录'}`,
    `- 当前内容版本日期：${currentContentDate(page)}`,
    `- 页面公开事实核对日期：${page.dates?.reviewedAt ?? '未记录'}`,
    `- 现有人工签字日期：${review.reviewedAt ?? '未记录'}`,
    ...(page.pageType === 'directory'
      ? [
          `- 当前目录内容指纹：${page.signals?.contentFingerprint ?? '未记录'}`,
          `- 人工签字内容指纹：${page.signals?.approvalContentFingerprint ?? '未记录'}`,
        ]
      : []),
    `- 本轮原因：${reviewReason(page)}`,
    `- 既有核对范围：${review.scope ?? '未记录'}`,
    `- 既有注意事项：${review.notes ?? '未记录'}`,
    '',
    '### 页面级检查',
    '',
    '- [ ] 页面标题、搜索意图和目标用户一致。',
    '- [ ] 办理步骤没有把州级规则写成全国统一规则。',
    '- [ ] 费用、期限、资格、材料、身份要求和法律后果均有就近官方来源。',
    '- [ ] 例外、失败原因和“不能代替政府/法律意见”的风险表达充分。',
    '- [ ] 官方入口仍可打开，且链接指向声明对应的业务正文或表格。',
    '',
  );

  if (topic) {
    markdown.push(`### 逐条声明（${topic.factChecks?.length ?? 0} 条）`, '');
    for (const [claimIndex, factCheck] of (topic.factChecks ?? []).entries()) {
      markdown.push(
        `#### ${claimIndex + 1}. ${factCheck.claim}`,
        '',
        '- 官方来源：',
        ...factCheck.sourceUrls.map((url) => `  - ${url}`),
        '- [ ] 来源正文直接支持这条中文声明。',
        '- [ ] 数字、日期、适用对象、州别和例外均未被扩大或省略。',
        '- [ ] 页面给出的行动建议与来源机构的职责相符。',
        '- 审核备注：',
        '',
      );
    }
  } else {
    markdown.push(
      '### 目录证据检查',
      '',
      `- 当前可见证据行：${evidenceItems}`,
      `- 当前官方来源链接：${evidenceLinks}`,
      '- [ ] 每个州至少检查一条最具体、风险最高的证据行。',
      '- [ ] 对含金额、天数、年龄、SSN、lawful presence、互惠或法律后果的行执行全量检查。',
      '- [ ] 声明和来源属于同一州、同一业务、同一证件类型。',
      '- [ ] 自动抽取没有截断否定词、例外、时间条件或申请人限制。',
      '- [ ] 无法由来源正文直接支持的行已删除、改写或降为“需向官方确认”。',
      '',
    );
  }

  markdown.push(
    '### 签字结论',
    '',
    '- [ ] 通过',
    '- [ ] 退回修改',
    '- [ ] 部分通过（在备注中列出未通过声明）',
    '- 审核人真实姓名：',
    '- 审核日期：',
    '- 审核范围：',
    '- 结论与修改备注：',
    '',
  );
}

await writeFile(packagePath, `${markdown.join('\n').trimEnd()}\n`, 'utf8');

console.log(`已生成 ${highRiskPages.length} 条高风险人工签字模板，其中 ${highRiskPages.filter((page) => monthlyDueRoutes.has(page.route)).length} 条来自月度易变规则队列：${outputPath}`);
console.log(`已生成逐条人工语义复核包：${packagePath}`);
