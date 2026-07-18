import { REVIEW_DATE, SITE, states, topics } from '../data/content';

const featuredTopicSlugs = [
  'real-id-basics',
  'document-checklist',
  'residency-proof-no-bills-po-box',
  'ssn-and-itin',
  'name-change-chain',
  'standard-license-driving-privilege-no-lawful-status',
  'state-id-non-driver-id-real-id-card',
  'first-driver-license-road-test',
  'dmv-test-language-translation-interpreter',
  'foreign-license-idp-transfer',
  'student-temporary-resident-license-registration',
  'moving-to-new-state',
  'vehicle-title-registration-insurance-after-move',
  'driver-license-suspension-reinstatement-sr22',
] as const;

const directoryLinks = [
  ['/directories/real-id/', '50 州 REAL ID 入口', '按州进入 REAL ID、Star Card 或同类官方页面。'],
  ['/directories/dmv-services/', 'DMV 常用业务入口', '按州查续期、补证、地址变更和线上服务。'],
  ['/directories/document-rules/', '材料规则表', '比较地址证明、SSN、姓名链条、原件和翻译要求。'],
  ['/directories/appointments/', '预约和办公室入口', '查预约系统、办公室类型和现场办理提醒。'],
  ['/directories/tests-permits/', '考试和 Permit 入口', '查 learner permit、笔试、路考和练车路径。'],
  ['/directories/foreign-license/', '外国驾照和 IDP 入口', '查外国驾照、IDP、换证、互惠和翻译规则。'],
  ['/directories/new-residents/', '新居民入口', '查搬州后的驾照、地址和车辆登记顺序。'],
] as const;

function absoluteUrl(site: URL, pathname: string) {
  return new URL(pathname, site).toString();
}

function markdownLink(site: URL, title: string, pathname: string, description: string) {
  return `- [${title}](${absoluteUrl(site, pathname)}): ${description}`;
}

export function GET({ site }: { site: URL }) {
  const base = site ?? new URL('https://dmv-cn-guide.example.com');
  const topicsBySlug = new Map(topics.map((topic) => [topic.slug, topic]));

  const featuredTopics = featuredTopicSlugs.map((slug) => {
    const topic = topicsBySlug.get(slug);
    if (!topic) throw new Error(`Missing featured llms.txt topic: ${slug}`);
    return markdownLink(base, topic.title, `/topics/${topic.slug}/`, topic.description);
  });

  const featuredStates = states.slice(0, 12).map((state) =>
    markdownLink(
      base,
      `${state.nameZh} (${state.abbr}) DMV 指南`,
      `/states/${state.id}/`,
      `${state.agency} 办事入口、REAL ID、驾照与常见材料提醒。`,
    ),
  );

  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `本站使用简体中文整理美国 50 州 DMV、REAL ID、驾照、州身份证和车辆业务信息。资料最后统一核对日期：${REVIEW_DATE}。`,
    '',
    `${SITE.disclaimer} 每篇指南保留官方来源链接和核对日期；引用办理要求时应同时引用对应政府来源。`,
    '',
    '## 核心入口',
    '',
    markdownLink(base, '首页', '/', '按所在州和办事类型寻找对应指南。'),
    markdownLink(base, '50 州指南', '/states/', '浏览全部州级 DMV / DPS / RMV / MVC / DOL 指南。'),
    markdownLink(base, '事项大全', '/topics/', '浏览 REAL ID、驾照、地址、考试和车辆业务专题。'),
    markdownLink(base, '官方入口表', '/directories/', '直接查找州政府预约、材料和线上服务入口。'),
    '',
    '## 重点办事指南',
    '',
    ...featuredTopics,
    '',
    '## 官方入口目录',
    '',
    ...directoryLinks.map(([pathname, title, description]) =>
      markdownLink(base, title, pathname, description),
    ),
    '',
    '## 常用州指南',
    '',
    ...featuredStates,
    '',
    '## Optional',
    '',
    markdownLink(base, '内容质量与更新方法', '/quality/', '了解来源、更新时间和内容边界。'),
    markdownLink(base, '编辑部', '/authors/editorial-team/', '了解内容责任人、职责和能力边界。'),
    markdownLink(base, '编辑政策', '/editorial-policy/', '查看选题、来源、风险和发布标准。'),
    markdownLink(base, 'AI 使用说明', '/ai-policy/', '了解自动化工具如何参与内容整理和检查。'),
    markdownLink(base, '纠错政策', '/corrections/', '报告错误、失效链接或官方要求变化。'),
    markdownLink(base, '内容更新记录', '/updates/', '查看重要内容和维护机制的变更。'),
    markdownLink(base, '全部官方来源', '/sources/', '查看站内引用的政府来源集合。'),
    markdownLink(base, '关于本站', '/about/', '了解站点定位和非政府声明。'),
    markdownLink(base, '联系方式', '/contact/', '联系站点维护者。'),
    markdownLink(base, 'XML Sitemap', '/sitemap.xml', '发现站内全部可索引页面。'),
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
