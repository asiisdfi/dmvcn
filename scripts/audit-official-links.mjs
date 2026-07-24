import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { federalSources, states, topics } from '../src/data/content.ts';
import { REVIEW_MANUAL_SIGNOFFS } from '../src/data/review-manual-signoffs.ts';

const execFileAsync = promisify(execFile);
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const reportsDir = path.join(projectRoot, 'reports');
const privateReportsDir = path.join(reportsDir, 'private');
const cachePath = path.resolve(
  process.env.LINK_AUDIT_CACHE_PATH ??
    path.join(privateReportsDir, 'official-link-audit-cache.json'),
);
const jsonReportPath = path.resolve(
  process.env.LINK_AUDIT_JSON_PATH ??
    path.join(reportsDir, 'official-link-audit.json'),
);
const markdownReportPath = path.resolve(
  process.env.LINK_AUDIT_MARKDOWN_PATH ??
    path.join(reportsDir, 'official-link-audit.md'),
);

function integerSetting(value, fallback, { allowZero = false } = {}) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  if (allowZero && parsed === 0) return 0;
  return parsed > 0 ? parsed : fallback;
}

function currentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: process.env.REPORT_TIME_ZONE ?? 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

const auditDate = (
  process.env.LINK_AUDIT_DATE ?? currentCalendarDate()
).slice(0, 10);
const timeoutSeconds = integerSetting(process.env.LINK_AUDIT_TIMEOUT, 8);
const concurrency = integerSetting(process.env.LINK_AUDIT_CONCURRENCY, 18);
const perHostConcurrency = integerSetting(
  process.env.LINK_AUDIT_PER_HOST_CONCURRENCY,
  2,
);
const batchLimit = integerSetting(
  process.env.LINK_AUDIT_LIMIT,
  350,
  { allowZero: true },
);
const maxAgeDays = integerSetting(
  process.env.LINK_AUDIT_MAX_AGE_DAYS,
  30,
  { allowZero: true },
);
const ownerFilter = (process.env.LINK_AUDIT_OWNER ?? '').trim();
const force = process.env.LINK_AUDIT_FORCE === '1';
const strict = process.env.LINK_AUDIT_STRICT === '1';
const userAgent =
  process.env.LINK_AUDIT_UA ??
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const automated404WatchHosts = new Set([
  // Minnesota DVS returns a uniform automated 404 from some network locations.
  'dps.mn.gov',
]);
const temporaryHttpStatuses = new Set([
  '401',
  '403',
  '408',
  '425',
  '429',
  '500',
  '502',
  '503',
  '504',
]);
const temporaryCurlErrors = new Set(['28', '35', '52', '56', '92']);
const stateOwners = new Set(states.map((state) => state.id));
const topicOwners = new Set(topics.map((topic) => topic.slug));
const highRiskTopicOwners = new Set(
  REVIEW_MANUAL_SIGNOFFS.map(
    (signoff) => signoff.route.match(/^\/topics\/([^/]+)\/$/)?.[1],
  ).filter(Boolean),
);

function isCalendarDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''));
}

function daysBetween(earlier, later) {
  if (!isCalendarDate(earlier) || !isCalendarDate(later)) return null;
  return Math.round(
    (
      Date.parse(`${later}T00:00:00.000Z`) -
      Date.parse(`${earlier}T00:00:00.000Z`)
    ) / 86_400_000,
  );
}

function isFresh(record) {
  const age = daysBetween(record?.checkedAt?.slice(0, 10), auditDate);
  return age !== null && age >= 0 && age <= maxAgeDays;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

async function writeAtomic(filePath, contents) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, contents);
  await rename(temporaryPath, filePath);
}

function extractLinks() {
  const byUrl = new Map();

  function addLink(owner, label, url) {
    if (!/^https?:\/\//.test(url)) return;
    if (!byUrl.has(url)) {
      byUrl.set(url, {
        labels: new Set(),
        owners: new Set(),
        url,
      });
    }
    const entry = byUrl.get(url);
    entry.labels.add(label);
    entry.owners.add(owner);
  }

  federalSources.forEach((source) =>
    addLink('federal', source.label, source.url),
  );
  states.forEach((state) => {
    addLink(state.id, `${state.agency} homepage`, state.agencyUrl);
    state.actionLinks.forEach((link) =>
      addLink(state.id, link.label, link.url),
    );
    state.sources.forEach((source) =>
      addLink(state.id, source.label, source.url),
    );
  });
  topics.forEach((topic) => {
    topic.sources.forEach((source) =>
      addLink(topic.slug, source.label, source.url),
    );
  });

  return [...byUrl.values()].map((entry) => {
    const owners = [...entry.owners].sort();
    return {
      highRisk: owners.some((owner) => highRiskTopicOwners.has(owner)),
      labels: [...entry.labels].sort(),
      owners,
      url: entry.url,
    };
  });
}

function classifyStatus(status, error, url) {
  if (/^2\d\d$/.test(status) || /^3\d\d$/.test(status)) return 'ok';
  if (temporaryHttpStatuses.has(status)) return 'watch';
  if (
    status === '404' &&
    automated404WatchHosts.has(new URL(url).hostname)
  ) {
    return 'watch';
  }
  if (status === '000' && temporaryCurlErrors.has(String(error))) {
    return 'watch';
  }
  return 'fail';
}

async function checkUrl(entry, previous) {
  const args = [
    '-L',
    '-A',
    userAgent,
    '-sS',
    '-o',
    '/dev/null',
    '-w',
    '%{http_code}\t%{url_effective}',
    '--connect-timeout',
    String(Math.min(timeoutSeconds, 5)),
    '--max-time',
    String(timeoutSeconds),
    '--max-filesize',
    '262144',
    '--retry',
    '1',
    '--retry-delay',
    '1',
    '--retry-all-errors',
    entry.url,
  ];

  let status = '000';
  let effectiveUrl = entry.url;
  let error = null;
  try {
    const { stdout } = await execFileAsync('curl', args, {
      timeout: (timeoutSeconds * 2 + 5) * 1000,
      maxBuffer: 1024 * 1024,
    });
    const [reportedStatus = '000', reportedUrl = entry.url] =
      String(stdout).trim().split('\t');
    status = reportedStatus || '000';
    effectiveUrl = reportedUrl || entry.url;
  } catch (caught) {
    const stdout = String(caught.stdout ?? '').trim();
    const [reportedStatus = '000', reportedUrl = entry.url] =
      stdout.split('\t');
    status = reportedStatus || '000';
    effectiveUrl = reportedUrl || entry.url;
    error = String(caught.code ?? caught.message ?? 'unknown');
  }

  const tone = classifyStatus(status, error, entry.url);
  const previousDay = previous?.checkedAt?.slice(0, 10);
  const consecutiveHardFailures =
    tone === 'fail'
      ? previous?.tone === 'fail' &&
        isCalendarDate(previousDay) &&
        previousDay < auditDate
        ? (previous.consecutiveHardFailures ?? 1) + 1
        : 1
      : 0;

  return {
    ...entry,
    checkedAt: new Date().toISOString(),
    consecutiveHardFailures,
    effectiveUrl,
    error,
    status,
    tone,
  };
}

function selectionPriority(entry, previous) {
  if (previous?.tone === 'fail') return 0;
  if (previous?.tone === 'watch') return 1;
  if (entry.highRisk) return 2;
  if (entry.owners.includes('federal')) return 3;
  if (entry.owners.some((owner) => topicOwners.has(owner))) return 4;
  if (entry.owners.some((owner) => stateOwners.has(owner))) return 5;
  return 6;
}

async function mapHostLimited(items, mapper, onProgress) {
  const pending = items.map((item, index) => ({
    host: new URL(item.url).hostname,
    index,
    item,
  }));
  const activeByHost = new Map();
  const results = new Array(items.length);
  let active = 0;
  let completed = 0;

  return new Promise((resolve, reject) => {
    const launch = () => {
      while (active < concurrency && pending.length > 0) {
        const pendingIndex = pending.findIndex(
          (candidate) =>
            (activeByHost.get(candidate.host) ?? 0) < perHostConcurrency,
        );
        if (pendingIndex === -1) break;
        const [candidate] = pending.splice(pendingIndex, 1);
        active += 1;
        activeByHost.set(
          candidate.host,
          (activeByHost.get(candidate.host) ?? 0) + 1,
        );

        Promise.resolve(mapper(candidate.item))
          .then((result) => {
            results[candidate.index] = result;
            completed += 1;
            onProgress(completed, items.length, result);
          })
          .catch(reject)
          .finally(() => {
            active -= 1;
            activeByHost.set(
              candidate.host,
              Math.max((activeByHost.get(candidate.host) ?? 1) - 1, 0),
            );
            if (pending.length === 0 && active === 0) {
              resolve(results);
            } else {
              launch();
            }
          });
      }

      if (pending.length === 0 && active === 0) resolve(results);
    };

    launch();
  });
}

function anomalyForReport(entry, checkedUrls) {
  return {
    checkedAt: entry.checkedAt,
    checkedThisRun: checkedUrls.has(entry.url),
    consecutiveHardFailures: entry.consecutiveHardFailures,
    effectiveUrl:
      entry.effectiveUrl !== entry.url ? entry.effectiveUrl : null,
    error: entry.error,
    highRisk: entry.highRisk,
    labels: entry.labels,
    owners: entry.owners,
    status: entry.status,
    tone: entry.tone,
    url: entry.url,
  };
}

function markdownAnomaly(entry) {
  const suffix = entry.error ? `，curl ${entry.error}` : '';
  const risk = entry.highRisk ? '，高风险页面来源' : '';
  return `- \`${entry.status}\` ${entry.url}（${entry.owners.join(', ')}${risk}${suffix}）`;
}

const allEntries = extractLinks();
const inventoryFingerprint = createHash('sha256')
  .update(allEntries.map((entry) => entry.url).sort().join('\n'))
  .digest('hex');
const filteredEntries = ownerFilter
  ? allEntries.filter((entry) => entry.owners.includes(ownerFilter))
  : allEntries;
if (ownerFilter && filteredEntries.length === 0) {
  console.error(`No official links found for owner: ${ownerFilter}`);
  process.exit(1);
}

const cache = await readJson(cachePath, {
  schemaVersion: 1,
  entries: {},
  lastFullCoverageAt: null,
});
if (cache.schemaVersion !== 1 || typeof cache.entries !== 'object') {
  throw new Error('Unsupported official link audit cache format.');
}

const dueEntries = filteredEntries
  .filter((entry) => force || !isFresh(cache.entries[entry.url]))
  .sort((a, b) => {
    const aPrevious = cache.entries[a.url];
    const bPrevious = cache.entries[b.url];
    return (
      selectionPriority(a, aPrevious) -
        selectionPriority(b, bPrevious) ||
      String(aPrevious?.checkedAt ?? '').localeCompare(
        String(bPrevious?.checkedAt ?? ''),
      ) ||
      a.url.localeCompare(b.url)
    );
  });
const selectedEntries =
  batchLimit === 0 ? dueEntries : dueEntries.slice(0, batchLimit);
const checkedUrls = new Set(selectedEntries.map((entry) => entry.url));
let cacheFlush = Promise.resolve();
let completedChecks = 0;

console.log('# Official Link Audit');
console.log('');
console.log(`Inventory: ${allEntries.length} URLs / ${new Set(allEntries.map((entry) => new URL(entry.url).hostname)).size} hosts`);
console.log(`Due before run: ${dueEntries.length}`);
console.log(`Selected: ${selectedEntries.length}`);
console.log(`Concurrency: ${concurrency} global / ${perHostConcurrency} per host`);
console.log(`Timeout: ${timeoutSeconds}s`);
if (ownerFilter) console.log(`Owner filter: ${ownerFilter}`);
console.log('');

const checkedResults = await mapHostLimited(
  selectedEntries,
  async (entry) => {
    const result = await checkUrl(entry, cache.entries[entry.url]);
    cache.entries[entry.url] = result;
    completedChecks += 1;
    if (completedChecks % 10 === 0) {
      cacheFlush = cacheFlush.then(() =>
        writeAtomic(cachePath, `${JSON.stringify(cache, null, 2)}\n`),
      );
      await cacheFlush;
    }
    return result;
  },
  (completed, total) => {
    if (completed === total || completed % 25 === 0) {
      console.log(`Progress: ${completed}/${total}`);
    }
  },
);
await cacheFlush;

const inventoryRecords = allEntries.map((entry) => ({
  ...entry,
  record: cache.entries[entry.url] ?? null,
}));
const freshRecords = inventoryRecords.filter(({ record }) => isFresh(record));
const highRiskRecords = inventoryRecords.filter((entry) => entry.highRisk);
const freshHighRiskRecords = highRiskRecords.filter(({ record }) =>
  isFresh(record),
);
const freshOk = freshRecords.filter(({ record }) => record.tone === 'ok');
const freshWatch = freshRecords.filter(({ record }) => record.tone === 'watch');
const freshFail = freshRecords.filter(({ record }) => record.tone === 'fail');
const pendingHardFailures = freshFail.filter(
  ({ record }) => (record.consecutiveHardFailures ?? 0) < 2,
);
const confirmedHardFailures = freshFail.filter(
  ({ record }) => (record.consecutiveHardFailures ?? 0) >= 2,
);
const dueRemaining = allEntries.length - freshRecords.length;
const fullCoverage = dueRemaining === 0;
if (fullCoverage) cache.lastFullCoverageAt = auditDate;
cache.updatedAt = new Date().toISOString();
await writeAtomic(cachePath, `${JSON.stringify(cache, null, 2)}\n`);

const highRiskGatePassed =
  freshHighRiskRecords.length === highRiskRecords.length &&
  !freshHighRiskRecords.some(({ record }) => record.tone === 'fail');
const monthlyGatePassed =
  fullCoverage &&
  pendingHardFailures.length === 0 &&
  confirmedHardFailures.length === 0;
const checkedSummary = {
  fail: checkedResults.filter((entry) => entry.tone === 'fail').length,
  ok: checkedResults.filter((entry) => entry.tone === 'ok').length,
  watch: checkedResults.filter((entry) => entry.tone === 'watch').length,
};
const anomalies = freshRecords
  .filter(({ record }) => record.tone !== 'ok')
  .map(({ record }) => anomalyForReport(record, checkedUrls))
  .sort(
    (a, b) =>
      Number(b.tone === 'fail') - Number(a.tone === 'fail') ||
      Number(b.highRisk) - Number(a.highRisk) ||
      a.url.localeCompare(b.url),
  );
const watchByHostMap = new Map();
for (const entry of anomalies.filter((item) => item.tone === 'watch')) {
  const host = new URL(entry.url).hostname;
  const summary = watchByHostMap.get(host) ?? {
    count: 0,
    highRiskCount: 0,
    host,
    statuses: new Set(),
  };
  summary.count += 1;
  summary.highRiskCount += entry.highRisk ? 1 : 0;
  summary.statuses.add(entry.status);
  watchByHostMap.set(host, summary);
}
const watchByHost = [...watchByHostMap.values()]
  .map((entry) => ({
    count: entry.count,
    highRiskCount: entry.highRiskCount,
    host: entry.host,
    statuses: [...entry.statuses].sort(),
  }))
  .sort((a, b) => b.count - a.count || a.host.localeCompare(b.host));
const report = {
  generatedAt: new Date().toISOString(),
  auditDate,
  inventory: {
    fingerprint: inventoryFingerprint,
    hosts: new Set(allEntries.map((entry) => new URL(entry.url).hostname)).size,
    highRiskUrls: highRiskRecords.length,
    urls: allEntries.length,
  },
  run: {
    batchLimit,
    checked: checkedResults.length,
    checkedSummary,
    concurrency,
    force,
    maxAgeDays,
    ownerFilter: ownerFilter || null,
    perHostConcurrency,
    timeoutSeconds,
  },
  coverage: {
    dueRemaining,
    fresh: freshRecords.length,
    fullCoverage,
    lastFullCoverageAt: cache.lastFullCoverageAt,
    percent:
      allEntries.length > 0
        ? Math.round((freshRecords.length / allEntries.length) * 1000) / 10
        : 0,
  },
  highRiskCoverage: {
    fresh: freshHighRiskRecords.length,
    gatePassed: highRiskGatePassed,
    percent:
      highRiskRecords.length > 0
        ? Math.round(
            (freshHighRiskRecords.length / highRiskRecords.length) * 1000,
          ) / 10
        : 100,
    total: highRiskRecords.length,
  },
  status: {
    confirmedHardFailures: confirmedHardFailures.length,
    freshFail: freshFail.length,
    freshOk: freshOk.length,
    freshWatch: freshWatch.length,
    highRiskGatePassed,
    monthlyGatePassed,
    pendingHardFailures: pendingHardFailures.length,
  },
  anomalies: anomalies.filter((entry) => entry.tone === 'fail'),
  watchByHost,
  limitations: [
    'HTTP 可访问只证明链接可打开，不证明页面正文仍支持站内每一项事实。',
    '401、403、408、425、429、5xx 和常见网络超时记为 watch，不自动当作来源失效。',
    '普通 404 或 410 首次记为待确认硬失败；跨日期连续两次失败后才记为确认失败。',
    '原始逐链接缓存保存在 reports/private，不提交到公开仓库。',
  ],
};

const pendingRows = anomalies.filter(
  (entry) => entry.tone === 'fail' && entry.consecutiveHardFailures < 2,
);
const confirmedRows = anomalies.filter(
  (entry) => entry.tone === 'fail' && entry.consecutiveHardFailures >= 2,
);
const markdown = [
  `# 官方来源链接审计 (${auditDate})`,
  '',
  '- 本报告检查链接可访问性，不代替逐条事实语义复核。',
  `- 本次检查 ${checkedResults.length} 个；成功 ${checkedSummary.ok}，观察 ${checkedSummary.watch}，硬失败 ${checkedSummary.fail}。`,
  `- 月度覆盖 ${freshRecords.length}/${allEntries.length}（${report.coverage.percent}%）；剩余 ${dueRemaining} 个。`,
  `- 高风险页面来源覆盖 ${freshHighRiskRecords.length}/${highRiskRecords.length}（${report.highRiskCoverage.percent}%）。`,
  `- 月度门禁：${monthlyGatePassed ? '通过' : '未通过'}；高风险来源门禁：${highRiskGatePassed ? '通过' : '未通过'}。`,
  '',
  '## 状态说明',
  '',
  '- `ok`：HTTP 2xx 或 3xx。',
  '- `watch`：访问受限、限流、服务器暂时错误或常见网络超时，需要后续观察。',
  '- `fail`：普通 404、410 或其他硬失败；首次进入待确认，跨日期连续两次才确认为失效。',
  '',
  '## 待确认硬失败',
  '',
  ...(pendingRows.length
    ? pendingRows.map(markdownAnomaly)
    : ['- 无。']),
  '',
  '## 已确认硬失败',
  '',
  ...(confirmedRows.length
    ? confirmedRows.map(markdownAnomaly)
    : ['- 无。']),
  '',
  '## 自动访问观察',
  '',
  ...(watchByHost.length
    ? watchByHost.map(
        (entry) =>
          `- ${entry.host}：${entry.count} 个（状态 ${entry.statuses.join('/')}；高风险来源 ${entry.highRiskCount} 个）。`,
      )
    : ['- 无。']),
  '',
  '## 下一步',
  '',
  ...(dueRemaining > 0
    ? [
        `1. 再运行 \`npm run audit:links\`，继续检查剩余 ${dueRemaining} 个链接。`,
        '2. 对待确认硬失败使用浏览器打开并查找官方替代入口。',
      ]
    : [
        '1. 本月覆盖已完成；下月重新开始 30 天新鲜度轮换。',
        '2. 对 watch 和待确认硬失败保留人工复查记录。',
      ]),
  '',
];

await writeAtomic(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
await writeAtomic(markdownReportPath, markdown.join('\n'));

console.log('');
console.log(`Fresh coverage: ${freshRecords.length}/${allEntries.length} (${report.coverage.percent}%)`);
console.log(`High-risk coverage: ${freshHighRiskRecords.length}/${highRiskRecords.length}`);
console.log(`Pending hard failures: ${pendingHardFailures.length}`);
console.log(`Confirmed hard failures: ${confirmedHardFailures.length}`);
console.log(`Watch: ${freshWatch.length}`);
console.log(`Monthly gate: ${monthlyGatePassed ? 'pass' : 'pending'}`);
console.log(`Reports: ${path.relative(projectRoot, jsonReportPath)}, ${path.relative(projectRoot, markdownReportPath)}`);

if (confirmedHardFailures.length > 0) process.exitCode = 1;
if (strict && !monthlyGatePassed) process.exitCode = 1;
