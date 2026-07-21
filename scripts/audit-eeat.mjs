import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { federalSources, states, topics } from '../src/data/content.ts';
import {
  HIGH_RISK_DIRECTORY_ROUTES,
  HIGH_RISK_TOPIC_SLUGS,
  TRUST_PAGE_PATHS,
} from '../src/data/editorial.ts';
import { semanticReviews } from '../src/data/review-registry.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const reportDir = path.join(projectRoot, 'reports');
const strict = process.env.EEAT_STRICT === '1';
const threshold = 85;

const stateById = new Map(states.map((state) => [state.id, state]));
const topicBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectHtmlFiles(entryPath)));
    else if (entry.name.endsWith('.html')) files.push(entryPath);
  }

  return files.sort();
}

function routeFromFile(filePath) {
  const relative = path.relative(distDir, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function attrs(node) {
  return new Map((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
}

function nodeText(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(nodeText).join('');
}

function inspectHtml(html) {
  const tree = parse(html);
  const result = {
    classNames: new Set(),
    classCounts: new Map(),
    links: [],
    metas: new Map(),
    headings: [],
    times: [],
    jsonLd: [],
    h1Count: 0,
    canonical: '',
  };

  function walk(node) {
    if (node.tagName) {
      const attributes = attrs(node);
      const classes = (attributes.get('class') ?? '').split(/\s+/).filter(Boolean);
      classes.forEach((className) => {
        result.classNames.add(className);
        result.classCounts.set(className, (result.classCounts.get(className) ?? 0) + 1);
      });

      if (node.tagName === 'a') {
        result.links.push({
          href: attributes.get('href') ?? '',
          rel: attributes.get('rel') ?? '',
          text: nodeText(node).replace(/\s+/g, ' ').trim(),
        });
      }

      if (node.tagName === 'meta') {
        const key = attributes.get('name') ?? attributes.get('property');
        if (key) result.metas.set(key, attributes.get('content') ?? '');
      }

      if (node.tagName === 'link' && (attributes.get('rel') ?? '').split(/\s+/).includes('canonical')) {
        result.canonical = attributes.get('href') ?? '';
      }

      if (/^h[1-3]$/.test(node.tagName)) {
        result.headings.push(nodeText(node).replace(/\s+/g, ' ').trim());
        if (node.tagName === 'h1') result.h1Count += 1;
      }

      if (node.tagName === 'time') result.times.push(attributes.get('datetime') ?? '');

      if (node.tagName === 'script' && attributes.get('type') === 'application/ld+json') {
        try {
          result.jsonLd.push(JSON.parse(nodeText(node)));
        } catch {
          result.jsonLd.push({ invalid: true });
        }
      }
    }

    for (const child of node.childNodes ?? []) walk(child);
    if (node.content) walk(node.content);
  }

  walk(tree);
  return result;
}

function pageIdentity(route) {
  const realIdMatch = route.match(/^\/states\/([^/]+)\/real-id\/$/);
  if (realIdMatch) return { type: 'state-real-id', id: realIdMatch[1], risk: 'medium' };

  const stateMatch = route.match(/^\/states\/([^/]+)\/$/);
  if (stateMatch) return { type: 'state-overview', id: stateMatch[1], risk: 'medium' };

  const topicMatch = route.match(/^\/topics\/([^/]+)\/$/);
  if (topicMatch) {
    return {
      type: 'topic',
      id: topicMatch[1],
      risk: HIGH_RISK_TOPIC_SLUGS.has(topicMatch[1]) ? 'high' : 'medium',
    };
  }

  if (route === '/directories/') return { type: 'collection', id: route, risk: 'standard' };

  if (route.startsWith('/directories/')) {
    const highRiskDirectory = HIGH_RISK_DIRECTORY_ROUTES.has(route);
    return { type: 'directory', id: route, risk: highRiskDirectory ? 'high' : 'standard' };
  }

  if (TRUST_PAGE_PATHS.has(route)) return { type: 'trust', id: route, risk: 'policy' };
  return { type: 'collection', id: route, risk: 'standard' };
}

function articleSchema(document) {
  return document.jsonLd.find((item) => item?.['@type'] === 'Article');
}

function officialLinkCount(document) {
  return new Set(
    document.links
      .map((link) => link.href)
      .filter((href) => /^https:\/\//.test(href) && /\.(?:gov|mil)(?:\/|$)/i.test(new URL(href).hostname)),
  ).size;
}

function contentSignals(identity, route) {
  if (identity.type.startsWith('state-')) {
    const state = stateById.get(identity.id);
    return {
      sourceCount: state ? new Set([...state.sources.map((source) => source.url), state.agencyUrl]).size : 0,
      factCheckCount: 0,
      publishedAt: state?.publishedAt,
      modifiedAt: state?.modifiedAt,
      reviewedAt: state?.reviewedAt,
    };
  }

  if (identity.type === 'topic') {
    const topic = topicBySlug.get(identity.id);
    return {
      sourceCount: topic ? new Set(topic.sources.map((source) => source.url)).size : 0,
      factCheckCount: topic?.factChecks?.length ?? 0,
      publishedAt: topic?.publishedAt,
      modifiedAt: topic?.modifiedAt,
      reviewedAt: topic?.reviewedAt,
    };
  }

  return {
    sourceCount: 0,
    factCheckCount: 0,
    publishedAt: undefined,
    modifiedAt: undefined,
    reviewedAt: undefined,
  };
}

function scorePage(route, document) {
  const identity = pageIdentity(route);
  const signals = contentSignals(identity, route);
  const schema = articleSchema(document);
  const contentPage = ['state-overview', 'state-real-id', 'topic'].includes(identity.type);
  const visibleThreeDates = document.classNames.has('content-meta') && document.times.filter(Boolean).length >= 3;
  const authorLink = document.links.some((link) => link.rel.split(/\s+/).includes('author'));
  const schemaAuthorUrl = Boolean(schema?.author?.url);
  const schemaDates = Boolean(schema?.datePublished && schema?.dateModified);
  const govLinks = officialLinkCount(document);
  const hasSourceSection = document.classNames.has('source-panel');
  const hasFactMapping = document.classNames.has('fact-check-panel');
  const stateEvidenceItems = document.classCounts.get('state-evidence-item') ?? 0;
  const stateEvidenceLinks = document.classCounts.get('state-evidence-link') ?? 0;
  const hasInlineStateEvidence =
    stateEvidenceItems >= (identity.type === 'state-real-id' ? 10 : 4) &&
    stateEvidenceLinks >= stateEvidenceItems;
  const hasTaskStructure =
    document.classNames.has('route-board') ||
    document.classNames.has('decision-board') ||
    document.classNames.has('topic-snapshot') ||
    document.classNames.has('source-directory') ||
    document.classNames.has('directory-table') ||
    document.classNames.has('registry-table') ||
    document.classNames.has('service-finder') ||
    document.classNames.has('task-groups') ||
    document.classNames.has('directory-link-list') ||
    document.classNames.has('directory-card-grid') ||
    document.classNames.has('practice-shell') ||
    document.classNames.has('practice-test-list');
  const hasChecklist = document.classNames.has('check-list');
  const hasSteps = document.classNames.has('step-list');
  const hasFaq = document.classNames.has('faq-list');
  const hasComparison =
    document.classNames.has('comparison-table') ||
    document.classNames.has('directory-table') ||
    document.classNames.has('registry-table');
  const hasDisclaimer = document.classNames.has('notice') || identity.type === 'trust';
  const hasEditorialDisclosure = document.classNames.has('editorial-disclosure');
  const directoryEvidenceItems = document.classCounts.get('directory-evidence-item') ?? 0;
  const directoryEvidenceLinks = document.classCounts.get('directory-evidence-link') ?? 0;
  const hasInlineDirectoryEvidence =
    directoryEvidenceItems > 0 && directoryEvidenceItems === directoryEvidenceLinks;
  const hasDirectDirectoryEvidence =
    identity.type === 'directory' &&
    govLinks >= 10 &&
    document.classNames.has('directory-table') &&
    (identity.risk !== 'high' || hasInlineDirectoryEvidence);
  const review = semanticReviews[route];
  const robotsDirectives = (document.metas.get('robots') ?? '')
    .toLowerCase()
    .split(',')
    .map((directive) => directive.trim());
  const indexable = !robotsDirectives.includes('noindex');

  const scores = {
    factsAndSources: identity.type === 'trust'
      ? 25
      : identity.type === 'collection'
        ? 22
        : identity.type === 'directory' && govLinks >= 10
          ? 25
          : Math.min(25, (hasSourceSection ? 8 : 0) + Math.min(17, Math.max(signals.sourceCount, govLinks) * 2)),
    evidenceMapping: identity.type === 'topic'
      ? Math.min(15, signals.factCheckCount * 1.5)
      : identity.type.startsWith('state-')
        ? Math.min(15, stateEvidenceItems * 1.5)
        : identity.type === 'trust' || identity.type === 'collection'
          ? 15
          : hasDirectDirectoryEvidence
            ? 15
            : Math.min(10, govLinks),
    taskCompletion: identity.type === 'trust'
      ? 15
      : (identity.type === 'collection' || identity.type === 'directory') && hasTaskStructure
        ? 15
      : Math.min(15, (hasTaskStructure ? 5 : 0) + (hasChecklist ? 4 : 0) + (hasSteps ? 3 : 0) + (hasFaq ? 3 : 0)),
    uniqueValue: identity.type === 'trust'
      ? 10
      : identity.type === 'collection' && hasTaskStructure
        ? 10
        : identity.type === 'directory' && hasTaskStructure
          ? 10
      : Math.min(10, (hasTaskStructure ? 4 : 0) + (hasComparison ? 3 : 0) + (hasFactMapping ? 3 : 0)),
    authorship: contentPage
      ? Math.min(10, (visibleThreeDates ? 3 : 0) + (authorLink ? 3 : 0) + (schemaAuthorUrl ? 2 : 0) + (hasEditorialDisclosure ? 2 : 0))
      : document.metas.get('author')
        ? 8
        : 0,
    freshness: contentPage
      ? Math.min(10, (visibleThreeDates ? 4 : 0) + (schemaDates ? 3 : 0) + (signals.publishedAt && signals.modifiedAt && signals.reviewedAt ? 3 : 0))
      : document.metas.get('article:published_time') && document.metas.get('article:modified_time') && document.metas.get('content-review-date')
        ? 10
        : 5,
    riskLanguage: identity.risk === 'policy'
      ? 10
      : identity.type === 'collection'
        ? 8
      : Math.min(
          10,
          (hasDisclaimer ? 5 : 0) +
            (identity.risk === 'high' ? (hasFactMapping || hasDirectDirectoryEvidence ? 5 : 0) : 4),
        ),
    technical: Math.min(
      5,
      (document.h1Count === 1 ? 1 : 0) +
        (Boolean(document.canonical) ? 1 : 0) +
        (document.jsonLd.length >= 2 && !document.jsonLd.some((item) => item.invalid) ? 1 : 0) +
        (Boolean(document.metas.get('description')) ? 1 : 0) +
        (document.links.length >= 3 ? 1 : 0),
    ),
  };

  const score = Math.round(Object.values(scores).reduce((total, value) => total + value, 0));
  const critical = [];
  const blockers = [];

  if (document.h1Count !== 1) critical.push('页面必须有且只有一个 H1');
  if (!document.canonical) critical.push('缺少 canonical');
  if (contentPage && !authorLink) critical.push('内容页缺少可见作者链接');
  if (contentPage && !schemaAuthorUrl) critical.push('Article schema 缺少 author.url');
  if (contentPage && !visibleThreeDates) critical.push('内容页没有完整显示首次发布、内容更新和事实核对日期');
  if (contentPage && !schemaDates) critical.push('Article schema 没有区分 datePublished 与 dateModified');
  if (contentPage && !hasSourceSection) critical.push('内容页缺少官方来源区域');
  if (identity.type === 'topic' && signals.factCheckCount === 0) critical.push('专题页没有事实到来源映射');
  if (identity.type.startsWith('state-') && !hasInlineStateEvidence) {
    critical.push('州页面的具体声明没有逐条绑定已登记官方来源');
  }
  if (
    identity.type === 'directory' &&
    identity.risk === 'high' &&
    (!hasInlineDirectoryEvidence || directoryEvidenceItems !== directoryEvidenceLinks)
  ) {
    critical.push('高风险目录的具体提示没有逐条绑定官方来源');
  }

  if (identity.risk === 'high' && !hasFactMapping && !hasDirectDirectoryEvidence && identity.type !== 'trust') {
    blockers.push('高风险页面缺少正文事实来源映射');
  }
  const reviewStatus = identity.type === 'trust'
    ? 'not-required'
    : !review
      ? 'pending'
      : review.status === 'human-approved' && review.method === 'human'
        ? 'human-approved'
        : review.status === 'evidence-checked' && review.method === 'ai-assisted'
          ? 'ai-assisted'
          : review.status === 'source-mapped' && review.method === 'automated'
            ? 'source-mapped'
            : 'invalid';

  if (review?.status === 'human-approved' && review.method !== 'human') {
    critical.push('人工通过状态必须由真实人工核查记录支持');
  }
  if (identity.type !== 'trust' && reviewStatus === 'pending') {
    blockers.push('尚未登记逐页证据核对');
  }
  if (identity.type !== 'trust' && reviewStatus === 'source-mapped') {
    blockers.push('已完成自动声明级来源映射，仍待逐页打开官方正文进行语义核对');
  }
  if (reviewStatus === 'invalid') {
    critical.push('语义核查状态与核查方法不一致');
  }
  if (identity.risk === 'high' && reviewStatus !== 'human-approved' && identity.type !== 'trust') {
    blockers.push(
      reviewStatus === 'ai-assisted'
        ? '已完成 AI 辅助证据核对，仍待真实人工语义签字'
        : reviewStatus === 'source-mapped'
          ? '已完成自动来源映射，仍待 AI 辅助核对和真实人工语义签字'
        : '高风险页面尚未完成人工语义签字',
    );
  }
  const requiresHumanApproval = identity.risk === 'high' && identity.type !== 'trust';
  const expectedIndexable = !requiresHumanApproval || reviewStatus === 'human-approved';
  if (indexable !== expectedIndexable) {
    critical.push(
      expectedIndexable
        ? '页面已满足发布门禁，但仍被 noindex 阻止收录'
        : '高风险页面尚未完成人工签字，却仍允许搜索引擎收录',
    );
  }
  if (score < threshold) blockers.push(`自动评分 ${score}，低于 ${threshold} 分门槛`);

  const pass = critical.length === 0 && blockers.length === 0 && score >= threshold;

  return {
    route,
    pageType: identity.type,
    risk: identity.risk,
    score,
    threshold,
    pass,
    indexable,
    reviewStatus,
    reviewMethod: review?.method ?? null,
    semanticReview: review ?? null,
    scores,
    signals: {
      sourceCount: signals.sourceCount || govLinks,
      factCheckCount: identity.type.startsWith('state-') ? stateEvidenceItems : signals.factCheckCount,
      visibleThreeDates,
      authorLink,
      schemaAuthorUrl,
      hasFactMapping,
      stateEvidenceItems,
      stateEvidenceLinks,
      hasInlineStateEvidence,
      directoryEvidenceItems,
      directoryEvidenceLinks,
      hasInlineDirectoryEvidence,
      hasEditorialDisclosure,
    },
    critical,
    blockers,
  };
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

let files;
try {
  files = await collectHtmlFiles(distDir);
} catch {
  console.error('dist directory is missing; run npm run build first.');
  process.exit(1);
}

const pages = [];
for (const file of files) {
  const route = routeFromFile(file);
  if (route === '/404/') continue;
  const html = await readFile(file, 'utf8');
  pages.push(scorePage(route, inspectHtml(html)));
}

pages.sort((a, b) => a.route.localeCompare(b.route));

const summary = {
  generatedAt: new Date().toISOString(),
  threshold,
  strict,
  pages: pages.length,
  passed: pages.filter((page) => page.pass).length,
  indexablePages: pages.filter((page) => page.indexable).length,
  noindexPages: pages.filter((page) => !page.indexable).length,
  indexablePassed: pages.filter((page) => page.indexable && page.pass).length,
  belowThreshold: pages.filter((page) => page.score < threshold).length,
  evidenceReviewPending: pages.filter((page) => page.reviewStatus === 'pending').length,
  sourceMappedReviews: pages.filter((page) => page.reviewStatus === 'source-mapped').length,
  aiAssistedReviews: pages.filter((page) => page.reviewStatus === 'ai-assisted').length,
  humanApprovedReviews: pages.filter((page) => page.reviewStatus === 'human-approved').length,
  highRiskHumanApprovalPending: pages.filter(
    (page) => page.risk === 'high' && page.reviewStatus !== 'human-approved',
  ).length,
  criticalPages: pages.filter((page) => page.critical.length > 0).length,
  blockedPages: pages.filter((page) => page.blockers.length > 0).length,
  averageScore: Math.round(pages.reduce((total, page) => total + page.score, 0) / Math.max(1, pages.length)),
};

await mkdir(reportDir, { recursive: true });
await writeFile(path.join(reportDir, 'eeat-inventory.json'), `${JSON.stringify({ summary, pages }, null, 2)}\n`);

const csvHeaders = [
  'route',
  'pageType',
  'risk',
  'score',
  'pass',
  'indexable',
  'reviewStatus',
  'reviewMethod',
  'critical',
  'blockers',
];
const csvRows = pages.map((page) => [
  page.route,
  page.pageType,
  page.risk,
  page.score,
  page.pass,
  page.indexable,
  page.reviewStatus,
  page.reviewMethod,
  page.critical.join(' | '),
  page.blockers.join(' | '),
]);
await writeFile(
  path.join(reportDir, 'eeat-inventory.csv'),
  `${[csvHeaders, ...csvRows].map((row) => row.map(csvCell).join(',')).join('\n')}\n`,
);

console.log('# E-E-A-T Inventory');
console.log('');
console.log(`Pages: ${summary.pages}`);
console.log(`Passed: ${summary.passed}`);
console.log(`Indexable pages: ${summary.indexablePages}`);
console.log(`Noindex pages: ${summary.noindexPages}`);
console.log(`Indexable pages passed: ${summary.indexablePassed}/${summary.indexablePages}`);
console.log(`Average score: ${summary.averageScore}`);
console.log(`Below ${threshold}: ${summary.belowThreshold}`);
console.log(`Evidence review pending: ${summary.evidenceReviewPending}`);
console.log(`Automated source mappings: ${summary.sourceMappedReviews}`);
console.log(`AI-assisted evidence checks: ${summary.aiAssistedReviews}`);
console.log(`Human-approved reviews: ${summary.humanApprovedReviews}`);
console.log(`High-risk human approval pending: ${summary.highRiskHumanApprovalPending}`);
console.log(`Critical pages: ${summary.criticalPages}`);
console.log(`Blocked pages: ${summary.blockedPages}`);
console.log('');
console.log('Reports: reports/eeat-inventory.json, reports/eeat-inventory.csv');

if (summary.criticalPages > 0 || (strict && (summary.passed !== summary.pages || summary.blockedPages > 0))) {
  process.exitCode = 1;
}
