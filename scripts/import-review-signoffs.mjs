import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const csvPath = process.env.SIGNOFF_CSV;
const targetPath = path.join(projectRoot, 'src/data/review-manual-signoffs.ts');
const reportPath = path.join(projectRoot, 'reports/eeat-inventory.json');

function parseCsv(text) {
  const rows = [];
  const normalized = text.replace(/\r\n/g, '\n');
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

  const header = rows[0]?.map((item) => item.trim());
  return (rows.slice(1) || [])
    .filter((line) => line.some((cell) => Boolean(cell && cell.trim())))
    .map((line) => {
      const rowMap = {};
      header.forEach((key, index) => {
        rowMap[key] = (line[index] ?? '').trim();
      });
      return rowMap;
    });
}

function formatRoute(value) {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http')) {
    try {
      return new URL(trimmed).pathname.replace(/\/{2,}/g, '/');
    } catch {
      return '';
    }
  }
  if (trimmed.startsWith('/')) return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
  return `/${trimmed.replace(/^\/+/, '')}`;
}

function quote(value) {
  return `\"${String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"')}\"`;
}

if (!csvPath) {
  console.error('请设置环境变量 SIGNOFF_CSV 指向 CSV 文件路径。');
  process.exit(1);
}

let eeatRoutes = new Set();
try {
  const eeat = JSON.parse(await readFile(reportPath, 'utf8'));
  for (const page of eeat.pages ?? []) eeatRoutes.add(page.route);
} catch {
  // 允许无报告导入，靠你后续在 build 时修正。
}

const raw = await readFile(path.resolve(csvPath), 'utf8');
const records = parseCsv(raw);

const requiredHeaders = ['route', 'reviewer', 'reviewedAt', 'scope'];
if (!records.length) {
  console.error('CSV 为空或头部不正确。');
  process.exit(1);
}

const missingHeader = requiredHeaders.find((field) => !Object.keys(records[0]).some((key) => key.toLowerCase() === field.toLowerCase()));
if (missingHeader) {
  console.error(`缺少必填字段: ${missingHeader}`);
  process.exit(1);
}

const signoffs = [];
const invalid = [];
for (const row of records) {
  const route = formatRoute(row.route || row.Route || row.ROUTE || row.path);
  const reviewer = (row.reviewer || row.Reviewer || '').trim();
  const reviewedAt = (row.reviewedAt || row.date || row.Date || '').trim();
  const scope = (row.scope || row.Scope || '').trim() || '手动语义核对补充';
  const notes = (row.notes || row.Notes || '').trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt)) {
    invalid.push({ route, reason: 'reviewedAt 非 YYYY-MM-DD' });
    continue;
  }
  if (!reviewer) {
    invalid.push({ route, reason: '缺少 reviewer' });
    continue;
  }
  if (!route || !route.startsWith('/')) {
    invalid.push({ route, reason: '路由异常' });
    continue;
  }
  if (eeatRoutes.size > 0 && !eeatRoutes.has(route)) {
    invalid.push({ route, reason: '路由不在 eeat 页面清单内' });
    continue;
  }

  signoffs.push({ route, reviewer, reviewedAt, scope, notes });
}

await mkdir(path.dirname(targetPath), { recursive: true });

let body = 'export type ReviewManualSignoff = {\n';
body += '  route: string;\n  reviewer: string;\n  reviewedAt: string;\n  scope: string;\n  notes?: string;\n};\n\n';
body += 'export const REVIEW_MANUAL_SIGNOFFS: ReviewManualSignoff[] = [\n';
for (const signoff of signoffs) {
  body += '  {\n';
  body += `    route: ${quote(signoff.route)},\n`;
  body += `    reviewer: ${quote(signoff.reviewer)},\n`;
  body += `    reviewedAt: ${quote(signoff.reviewedAt)},\n`;
  body += `    scope: ${quote(signoff.scope)},\n`;
  if (signoff.notes) body += `    notes: ${quote(signoff.notes)},\n`;
  body += '  },\n';
}
body += '];\n';

await writeFile(targetPath, body, 'utf8');

console.log(`已写入 ${signoffs.length} 条人工签字记录到 ${targetPath}`);
if (invalid.length) {
  console.log('以下记录未通过校验：');
  for (const row of invalid) {
    console.log(`- ${row.route || '(空路由)'}：${row.reason}`);
  }
}
