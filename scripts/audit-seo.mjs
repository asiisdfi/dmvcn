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

function hasNoindex(html) {
  const content = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i)?.[1] ?? '';
  return content.toLowerCase().split(',').map((value) => value.trim()).includes('noindex');
}

function isStateContentPage(relative) {
  return /^states\/[^/]+\/(?:index|real-id\/index)\.html$/.test(relative);
}

function isTopicContentPage(relative) {
  return /^topics\/(?!index\.html$)[^/]+\/index\.html$/.test(relative);
}

function isPracticeContentPage(relative) {
  return /^practice-tests\/(?!index\.html$)[^/]+\/index\.html$/.test(relative);
}

function routeForHtml(relative) {
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

const errors = [];

if (!(await exists(distDir))) {
  errors.push('dist directory is missing; run npm run build first.');
} else if (!(await stat(distDir)).isDirectory()) {
  errors.push('dist path exists but is not a directory.');
}

const htmlFiles = errors.length ? [] : await collectHtmlFiles(distDir);
const htmlByRelative = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file.url, 'utf8');
  htmlByRelative.set(file.relative, html);

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

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !html.includes('article:published_time')) {
    errors.push(`${file.relative}: missing article published time`);
  }

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !html.includes('content-review-date')) {
    errors.push(`${file.relative}: missing content review date`);
  }

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !html.includes('rel="author"')) {
    errors.push(`${file.relative}: missing visible author link`);
  }

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !html.includes('content-meta')) {
    errors.push(`${file.relative}: missing visible publication, modification, and review dates`);
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

  if (isPracticeContentPage(file.relative)) {
    const questionCount = (html.match(/\sdata-question(?:\s|>)/g) ?? []).length;
    const sourceMappedQuestions = (html.match(/\sdata-source-url="https:\/\/[^\"]+\.gov[^\"]*"/g) ?? []).length;
    if (questionCount < 20) errors.push(`${file.relative}: practice test has fewer than 20 rendered questions`);
    if (sourceMappedQuestions !== questionCount) {
      errors.push(`${file.relative}: every rendered practice question must carry its government source URL`);
    }
    if (!html.includes('data-practice-app') || !html.includes('practice-explanation')) {
      errors.push(`${file.relative}: missing usable practice-test interaction or answer explanations`);
    }
    if (!html.includes('article:published_time') || !html.includes('article:modified_time') || !html.includes('content-review-date')) {
      errors.push(`${file.relative}: missing publication, modification, or fact-check metadata`);
    }
    if (!html.includes('rel="author"') || !html.includes('content-meta')) {
      errors.push(`${file.relative}: missing visible author or three-date metadata`);
    }
    if (!html.includes('"@type":"LearningResource"')) {
      errors.push(`${file.relative}: missing LearningResource schema`);
    }
  }

  if ((isStateContentPage(file.relative) || isTopicContentPage(file.relative)) && !/"author":\{"@type":"Organization","name":"[^"]{2,}","url":"https?:\/\//.test(html)) {
    errors.push(`${file.relative}: Article author must identify a named editorial organization and author URL`);
  }
}

const homepage = htmlFiles.find((file) => file.relative === 'index.html');
if (homepage) {
  const html = await readFile(homepage.url, 'utf8');
  if (!html.includes('50 个州')) errors.push('index.html: homepage should show 50-state coverage');
}

const realIdDirectory = htmlFiles.find((file) => file.relative === 'directories/real-id/index.html');
if (realIdDirectory) {
  const html = await readFile(realIdDirectory.url, 'utf8');
  const officialUrls = [...html.matchAll(/data-official-real-id-url="([^"]+)"/g)].map((match) => match[1]);

  if (officialUrls.length !== 50) {
    errors.push(`directories/real-id/index.html: found ${officialUrls.length} state official links; expected 50`);
  }
  if (officialUrls.some((url) => !url.startsWith('https://'))) {
    errors.push('directories/real-id/index.html: every state official link must use HTTPS');
  }
  if (officialUrls.some((url) => /tsa\.gov/i.test(url))) {
    errors.push('directories/real-id/index.html: a TSA general page was selected as a state official link');
  }
}

if (!(await exists(new URL('sitemap.xml', distDir)))) {
  errors.push('sitemap.xml is missing');
}

if (await exists(new URL('sitemap.xml', distDir))) {
  const sitemap = await readFile(new URL('sitemap.xml', distDir), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map((match) => match[1]);
  const indexableHtml = htmlFiles.filter(
    (file) => file.relative !== '404.html' && !hasNoindex(htmlByRelative.get(file.relative) ?? ''),
  );
  const noindexHtml = htmlFiles.filter(
    (file) => file.relative !== '404.html' && hasNoindex(htmlByRelative.get(file.relative) ?? ''),
  );
  const expectedIndexablePages = indexableHtml.length;
  const expectedRoutes = new Set(indexableHtml.map((file) => routeForHtml(file.relative)));
  const sitemapRoutes = new Set(sitemapUrls.map((url) => new URL(url).pathname));

  if (!/<urlset\b/.test(sitemap) || /<sitemapindex\b/.test(sitemap)) {
    errors.push('sitemap.xml must directly contain a standard urlset');
  }
  if (sitemapUrls.length !== expectedIndexablePages) {
    errors.push(`sitemap.xml has ${sitemapUrls.length} URLs; expected ${expectedIndexablePages}`);
  }
  if (sitemapRoutes.size !== sitemapUrls.length) {
    errors.push('sitemap.xml contains duplicate URL paths');
  }
  if (sitemapUrls.some((url) => url.includes('dmv-cn-guide.example.com'))) {
    errors.push('sitemap.xml still contains the placeholder domain');
  }
  if (sitemap.includes('sitemap-0.xml')) {
    errors.push('sitemap.xml still points through the generated sitemap-0.xml layer');
  }
  for (const route of expectedRoutes) {
    if (!sitemapRoutes.has(route)) errors.push(`sitemap.xml is missing built route ${route}`);
  }
  for (const route of sitemapRoutes) {
    if (!expectedRoutes.has(route)) errors.push(`sitemap.xml lists a route without built HTML: ${route}`);
  }
  for (const file of noindexHtml) {
    const route = routeForHtml(file.relative);
    if (sitemapRoutes.has(route)) errors.push(`sitemap.xml includes noindex route ${route}`);
  }
  for (const route of ['/', '/states/', '/topics/', '/directories/', '/practice-tests/', '/practice-tests/georgia/']) {
    if (!sitemapRoutes.has(route)) errors.push(`sitemap.xml is missing ${route}`);
  }
}

const stateContentPages = htmlFiles.filter((file) => isStateContentPage(file.relative));
const topicContentPages = htmlFiles.filter((file) => isTopicContentPage(file.relative));

console.log('# SEO Audit');
console.log('');
console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`State content pages: ${stateContentPages.length}`);
console.log(`Topic content pages: ${topicContentPages.length}`);
console.log(`Indexable pages: ${htmlFiles.filter((file) => file.relative !== '404.html' && !hasNoindex(htmlByRelative.get(file.relative) ?? '')).length}`);
console.log(`Noindex pages: ${htmlFiles.filter((file) => file.relative !== '404.html' && hasNoindex(htmlByRelative.get(file.relative) ?? '')).length}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('All SEO checks passed.');
}
