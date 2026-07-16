export const SITE_LAUNCH_DATE = '2026-07-13';
export const EDITORIAL_POLICY_DATE = '2026-07-17';
export const HIGH_RISK_DIRECTORY_REVIEW_DATE = '2026-07-17';
export const STATE_EVIDENCE_RELEASE_DATE = '2026-07-17';

export const EDITORIAL_AUTHOR = {
  name: 'DMV中文办事库编辑部',
  shortName: '编辑部',
  role: '官方资料整理与中文编辑',
  path: '/authors/editorial-team/',
  description:
    '独立维护 DMV、REAL ID、驾照和车辆办事资料。编辑工作包括查找政府来源、交叉核对易变事实、整理中文办事路径和维护失效链接。',
  limitations:
    '编辑部不是政府机构、律师事务所或移民服务机构，不声称拥有 DMV 内部权限或替代专业意见。',
} as const;

export const EDITORIAL_LINKS = {
  policy: '/editorial-policy/',
  corrections: '/corrections/',
  ai: '/ai-policy/',
  updates: '/updates/',
  quality: '/quality/',
  sources: '/sources/',
} as const;

export type EditorialUpdate = {
  date: string;
  title: string;
  summary: string;
  scope: string[];
};

export const editorialUpdates: EditorialUpdate[] = [
  {
    date: '2026-07-17',
    title: '为 100 个州级页面增加声明级官方证据',
    summary:
      '将 50 州总览和 50 州 REAL ID 页中的摘要、材料、步骤、失败原因和州别细节拆成可审计声明，并在正文逐条显示对应政府来源；新增成品 HTML 证据门禁。',
    scope: ['50 州办事总览', '50 州 REAL ID', '声明级来源', '构建审计'],
  },
  {
    date: '2026-07-17',
    title: '完成高龄驾驶、残疾停车与五个高风险目录的证据核对',
    summary:
      '补充高龄续证和医疗报告的州别例外、残疾停车迁州与滥用边界，并将费用、期限、材料、外国驾照和身份目录中的具体提示逐条连接到对应政府页面。',
    scope: ['高龄驾驶', '残疾停车', '费用与时间', '期限', '材料规则', '外国驾照', 'SSN 与身份类别'],
  },
  {
    date: '2026-07-17',
    title: '完成第二批高风险专题的官方证据核对',
    summary:
      '校正姓名变更的 SSA 同步规则、学生与临时居民的州法边界、二手车所有权链，以及车辆 title 补发、赠与和继承中的 lien、税务与签字权限。',
    scope: ['姓名变更', '学生与临时居民', '二手车购买', '车辆 title 补发', '赠与与继承过户'],
  },
  {
    date: '2026-07-17',
    title: '建立编辑身份、日期和质量门禁',
    summary:
      '增加编辑部介绍、编辑政策、纠错政策、AI 使用说明和公开更新记录；区分首次发布、内容修改与事实核对日期，并启动第一批高风险专题的逐条官方证据核对。',
    scope: ['全站信任信息', '州指南', '专题页', '高风险事实来源', '结构化数据', 'E-E-A-T 审计'],
  },
  {
    date: '2026-07-15',
    title: '增加 llms.txt 站点索引',
    summary:
      '在网站根目录提供机器可读的 Markdown 站点说明和核心内容入口，并加入上线配置检查。',
    scope: ['技术发现', '上线检查'],
  },
  {
    date: '2026-07-13',
    title: '首版内容库上线',
    summary:
      '发布 50 州总览、50 州 REAL ID 指南、跨州专题、官方入口目录和来源维护页面。',
    scope: ['州指南', 'REAL ID', '专题', '目录', '来源库'],
  },
];

export const HIGH_RISK_TOPIC_SLUGS = new Set([
  'driver-license-suspension-reinstatement-sr22',
  'tickets-tolls-insurance-lapse-registration-hold',
  'non-citizen-license-id',
  'standard-license-driving-privilege-no-lawful-status',
  'student-temporary-resident-license-registration',
  'ssn-and-itin',
  'name-change-chain',
  'used-car-title-lien-salvage-odometer-check',
  'gift-inherited-vehicle-title-transfer',
  'lost-vehicle-title-replacement-electronic-title-lien-sale',
  'disabled-parking-placard-plates',
  'older-driver-license-renewal-medical-review',
]);

export const TRUST_PAGE_PATHS = new Set([
  '/about/',
  EDITORIAL_AUTHOR.path,
  EDITORIAL_LINKS.policy,
  EDITORIAL_LINKS.corrections,
  EDITORIAL_LINKS.ai,
  EDITORIAL_LINKS.updates,
  EDITORIAL_LINKS.quality,
  EDITORIAL_LINKS.sources,
  '/contact/',
  '/privacy/',
  '/terms/',
]);
