import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { REVIEW_MANUAL_SIGNOFFS as existingSignoffs } from '../src/data/review-manual-signoffs.ts';
import {
  HUMAN_REVIEW_REQUIRED_ROUTES,
  isPlausibleHumanReviewer,
  isValidReviewDate,
} from '../src/data/publication-gate.ts';

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

const importedSignoffs = [];
const invalid = [];
const seenRoutes = new Set();
for (const row of records) {
  const route = formatRoute(row.route || row.Route || row.ROUTE || row.path);
  const reviewer = (row.reviewer || row.Reviewer || '').trim();
  const reviewedAt = (row.reviewedAt || row.date || row.Date || '').trim();
  const scope = (row.scope || row.Scope || '').trim();
  const notes = (row.notes || row.Notes || '').trim();

  if (!isValidReviewDate(reviewedAt)) {
    invalid.push({ route, reason: 'reviewedAt 必须是真实、非未来的 YYYY-MM-DD 日期' });
    continue;
  }
  if (!isPlausibleHumanReviewer(reviewer)) {
    invalid.push({ route, reason: 'reviewer 必须是真实人员姓名，不能使用 AI、自动化或编辑部占位身份' });
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
  if (!HUMAN_REVIEW_REQUIRED_ROUTES.has(route)) {
    invalid.push({ route, reason: '该路由不属于高风险人工签字清单' });
    continue;
  }
  if (scope.length < 12) {
    invalid.push({ route, reason: 'scope 过短，需说明实际核对范围' });
    continue;
  }
  if (seenRoutes.has(route)) {
    invalid.push({ route, reason: 'CSV 中存在重复路由' });
    continue;
  }
  seenRoutes.add(route);

  importedSignoffs.push({ route, reviewer, reviewedAt, scope, notes });
}

if (invalid.length) {
  console.error('以下记录未通过校验，未写入任何签字：');
  for (const row of invalid) console.error(`- ${row.route || '(空路由)'}：${row.reason}`);
  process.exit(1);
}

const signoffsByRoute = new Map(existingSignoffs.map((signoff) => [signoff.route, signoff]));
for (const signoff of importedSignoffs) signoffsByRoute.set(signoff.route, signoff);
const signoffs = [...signoffsByRoute.values()].sort((a, b) => a.route.localeCompare(b.route));

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

console.log(`已新增或更新 ${importedSignoffs.length} 条签字；当前共 ${signoffs.length} 条人工签字记录：${targetPath}`);
