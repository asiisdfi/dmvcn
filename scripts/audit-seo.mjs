import { access, readdir, readFile, stat } from 'node:fs/promises';

const distDir = new URL('../dist/', import.meta.url);
const staleTerms = [
  '候选可上线',
  'MVP 待审',
  '候选州',
  '上线前点验',
  '首批覆盖',
  '40 个州',
  '35 个州',
  '30 个州',
];
const privateWordingPatterns = [
  { label: 'internal access-check wording', pattern: /本环境|无头浏览器|CloudFront|Akamai|Access Denied|HTTP2|request blocked/i },
  {
    label: 'internal editorial directive',
    pattern:
      /中文页(?:要|应|需要|避免|不要|不硬写)|适合.{0,10}中文页|中文页的高价值|页面线索|页面(?:还)?要核对|页面(?:都)?(?:不要|不应|应|要(?!求)|需要)|页面(?:的)?(?:核心|最重要)|这(?:一)?页(?:要|只|故意|专门|和)|本页(?:聚焦|必须)|编辑重点|页面(?:措辞|目标|定位|的核心|的重点)|后续扩展|当前阶段|抽取线索|应标\s*watch|来源线索|上线后用户/i,
  },
];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function collectHtmlFiles(dir, root = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const url = new URL(entry.name, dir);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(new URL(`${entry.name}/`, dir), root)));
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    const relative = decodeURIComponent(url.pathname.replace(root.pathname, ''));
    files.push({ url, relative });
  }

  return files.sort((a, b) => a.relative.localeCompare(b.relative));
}

function hasMetaDescription(html) {
  return /<meta\s+name="description"\s+content="[^"]{30,}"/.test(html);
}

function hasCanonical(html) {
  return /<link\s+rel="canonical"\s+href="https?:\/\/[^"]+"/.test(html);
}

function hasJsonLd(html) {
  return /<script\s+type="application\/ld\+json"/.test(html);
}

function isStateContentPage(relative) {
  return /^states\/[^/]+\/(?:index|real-id\/index)\.html$/.test(relative);
}

function isTopicContentPage(relative) {
  return /^topics\/(?!index\.html$)[^/]+\/index\.html$/.test(relative);
}

const errors = [];

if (!(await exists(distDir))) {
  errors.push('dist directory is missing; run npm run build first.');
} else if (!(await stat(distDir)).isDirectory()) {
  errors.push('dist path exists but is not a directory.');
}

const htmlFiles = errors.length ? [] : await collectHtmlFiles(distDir);

for (const file of htmlFiles) {
  const html = await readFile(file.url, 'utf8');

  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${file.relative}: missing useful title`);
  if (!hasMetaDescription(html)) errors.push(`${file.relative}: missing useful meta description`);
  if (!hasCanonical(html)) errors.push(`${file.relative}: missing canonical URL`);
  if (!hasJsonLd(html)) errors.push(`${file.relative}: missing JSON-LD`);

  for (const term of staleTerms) {
    if (html.includes(term)) errors.push(`${file.relative}: stale/internal wording found: ${term}`);
  }
  for (const { label, pattern } of privateWordingPatterns) {
    if (pattern.test(html)) errors.push(`${file.relative}: ${label}`);
  }

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !html.includes('article:modified_time')) {
    errors.push(`${file.relative}: missing article modified time`);
  }

  if (isStateContentPage(file.relative) && !html.includes('"@type":"Article"')) {
    errors.push(`${file.relative}: missing Article schema`);
  }

  if (isStateContentPage(file.relative) && !html.includes('"@type":"FAQPage"')) {
    errors.push(`${file.relative}: missing FAQPage schema`);
  }

  if (isStateContentPage(file.relative) && !html.includes('comparison-table')) {
    errors.push(`${file.relative}: missing comparison table`);
  }

  if (isTopicContentPage(file.relative) && !html.includes('"@type":"FAQPage"')) {
    errors.push(`${file.relative}: missing FAQPage schema`);
  }
}

const homepage = htmlFiles.find((file) => file.relative === 'index.html');
if (homepage) {
  const html = await readFile(homepage.url, 'utf8');
  if (!html.includes('50 个州')) errors.push('index.html: homepage should show 50-state coverage');
}

if (!(await exists(new URL('sitemap-index.xml', distDir)))) {
  errors.push('sitemap-index.xml is missing');
}

const stateContentPages = htmlFiles.filter((file) => isStateContentPage(file.relative));
const topicContentPages = htmlFiles.filter((file) => isTopicContentPage(file.relative));

console.log('# SEO Audit');
console.log('');
console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`State content pages: ${stateContentPages.length}`);
console.log(`Topic content pages: ${topicContentPages.length}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('All SEO checks passed.');
}
