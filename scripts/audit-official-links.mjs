import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { federalSources, states, topics } from '../src/data/content.ts';

const execFileAsync = promisify(execFile);
const timeoutSeconds = Number.parseInt(process.env.LINK_AUDIT_TIMEOUT ?? '12', 10);
const concurrency = Number.parseInt(process.env.LINK_AUDIT_CONCURRENCY ?? '5', 10);
const userAgent =
  process.env.LINK_AUDIT_UA ??
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

async function extractLinks() {
  const byUrl = new Map();

  function addLink(owner, label, url) {
    if (!/^https?:\/\//.test(url)) return;
    if (!byUrl.has(url)) {
      byUrl.set(url, { labels: new Set(), owners: new Set(), url });
    }
    const entry = byUrl.get(url);
    entry.labels.add(label);
    entry.owners.add(owner);
  }

  federalSources.forEach((source) => addLink('federal', source.label, source.url));
  states.forEach((state) => {
    addLink(state.id, `${state.agency} homepage`, state.agencyUrl);
    state.actionLinks.forEach((link) => addLink(state.id, link.label, link.url));
    state.sources.forEach((source) => addLink(state.id, source.label, source.url));
  });
  topics.forEach((topic) => {
    topic.sources.forEach((source) => addLink(topic.slug, source.label, source.url));
  });

  return [...byUrl.values()].map((entry) => ({
    label: [...entry.labels].join(' / '),
    owner: [...entry.owners].join(', '),
    url: entry.url,
  }));
}

async function checkUrl(entry) {
  const args = [
    '-L',
    '-A',
    userAgent,
    '-s',
    '-o',
    '/dev/null',
    '-w',
    '%{http_code} %{url_effective}',
    '--max-time',
    String(timeoutSeconds),
    entry.url,
  ];

  try {
    const { stdout } = await execFileAsync('curl', args, {
      timeout: (timeoutSeconds + 3) * 1000,
      maxBuffer: 1024 * 1024,
    });
    const [status = '000', ...effectiveParts] = stdout.trim().split(/\s+/);
    return {
      ...entry,
      effectiveUrl: effectiveParts.join(' ') || entry.url,
      status,
      tone: classifyStatus(status),
    };
  } catch (error) {
    const stdout = typeof error.stdout === 'string' ? error.stdout.trim() : '';
    const [status = '000', ...effectiveParts] = stdout.split(/\s+/);
    return {
      ...entry,
      effectiveUrl: effectiveParts.join(' ') || entry.url,
      error: error.code || error.message,
      status,
      tone: classifyStatus(status, error.code || error.message),
    };
  }
}

function classifyStatus(status, error) {
  if (/^2\d\d$/.test(status) || /^3\d\d$/.test(status)) return 'ok';
  if (status === '401' || status === '403' || status === '429') return 'watch';
  if (status === '000' && ['28', '35', '52', '56', '92'].includes(String(error))) return 'watch';
  return 'fail';
}

async function mapLimit(items, limit, mapper) {
  const results = [];
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function formatRow(result) {
  const note = result.error ? ` (${result.error})` : '';
  return `| ${result.status}${note} | ${result.tone} | ${result.owner} | ${result.label} | ${result.url} |`;
}

const entries = await extractLinks();
const results = await mapLimit(entries, concurrency, checkUrl);
const groups = {
  ok: results.filter((result) => result.tone === 'ok'),
  watch: results.filter((result) => result.tone === 'watch'),
  fail: results.filter((result) => result.tone === 'fail'),
};

console.log(`# Official Link Audit`);
console.log('');
console.log(`Checked: ${results.length}`);
console.log(`OK: ${groups.ok.length}`);
console.log(`Watch: ${groups.watch.length}`);
console.log(`Fail: ${groups.fail.length}`);
console.log(`Timeout: ${timeoutSeconds}s`);
console.log('');

if (groups.watch.length || groups.fail.length) {
  console.log('| Status | Tone | Owner | Label | URL |');
  console.log('| --- | --- | --- | --- | --- |');
  [...groups.fail, ...groups.watch].forEach((result) => console.log(formatRow(result)));
  console.log('');
}

if (process.argv.includes('--all')) {
  console.log('| Status | Tone | Owner | Label | URL |');
  console.log('| --- | --- | --- | --- | --- |');
  results.forEach((result) => console.log(formatRow(result)));
}

if (groups.fail.length) {
  process.exitCode = 1;
}
