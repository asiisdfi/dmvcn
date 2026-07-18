import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
const docsDir = path.join(projectRoot, 'docs');
const outputPath = path.join(docsDir, 'review-manual-signoff-template.csv');
const today = (process.env.SIGNOFF_PLAN_DATE || new Date().toISOString()).slice(0, 10);

function csvCell(value) {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
}

const headers = ['route', 'reviewer', 'reviewedAt', 'scope', 'notes'];

let eeat;
try {
  eeat = JSON.parse(await readFile(reportPath, 'utf8'));
} catch (error) {
  console.error('请先执行 npm run build && npm run audit:eeat，生成 reports/eeat-inventory.json。');
  throw error;
}

const highRiskPages = (eeat.pages ?? [])
  .filter((page) => page.risk === 'high' && page.reviewStatus !== 'human-approved')
  .sort((a, b) => {
    if (a.pageType !== b.pageType) return a.pageType.localeCompare(b.pageType);
    return a.route.localeCompare(b.route);
  });

const title = {
  '/topics/': '高风险专题核查',
  '/directories/': '高风险目录核查',
};

const csvLines = [headers.join(',')];
for (const page of highRiskPages) {
  const scopePrefix = page.pageType === 'topic' ? '专题：' : page.pageType === 'directory' ? '目录：' : '高风险页：';
  const scope = `${scopePrefix}${page.route}`;
  const notes =
    page.notes ||
    `请完成高风险事实逐条语义核查并确认：\n- 适用州范围\n- 适用身份/期限边界\n- 法律后果与失败场景\n- 官方来源逐条映射是否可追溯`;
  const reviewedAt = page.semanticReview?.reviewedAt ?? today;

  const row = [
    page.route,
    '',
    reviewedAt,
    scope,
    notes,
  ].map(csvCell);

  csvLines.push(row.join(','));
}

await mkdir(docsDir, { recursive: true });
await writeFile(outputPath, `${csvLines.join('\n')}\n`, 'utf8');

console.log(`已生成 ${highRiskPages.length} 条高风险人工签字模板：${outputPath}`);
