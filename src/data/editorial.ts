export const SITE_LAUNCH_DATE = '2026-07-13';
export const EDITORIAL_POLICY_DATE = '2026-07-17';
export const EDITORIAL_POLICY_MODIFIED_DATE = '2026-07-19';
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
    date: '2026-07-19',
    title: '完成 Wyoming 两页官方正文语义核对',
    summary:
      '逐条比对 WYDOT 的新居民与首次驾照、REAL ID 当前公告、R03/25 公民与非公民材料表、考试、续补证、改名改址、oneWYO、费用、地点和地址表；补齐 78 条页面级显式来源映射，纠正当前证件不存在 standard/REAL ID 二选一，并明确中国大陆驾照、英文考试、45 天住址文件和非公民每次服务的边界。',
    scope: ['怀俄明州办事总览', '怀俄明州 REAL ID', '78 条显式来源映射', '外国驾照与续补证边界'],
  },
  {
    date: '2026-07-19',
    title: '完成 Alaska 两页官方正文语义核对',
    summary:
      '逐条比对 Alaska DMV 的新居民/访客说明、REAL ID 与 standard 打印清单、非公民和外国驾照、续补证、改名改址、费用、办公地点、business partners、Rural Outreach 及 Off-Highway 指南；补齐 62 条页面级显式来源映射，并明确中国大陆驾照、外文翻译和偏远社区办理边界。',
    scope: ['阿拉斯加州办事总览', '阿拉斯加州 REAL ID', '62 条显式来源映射', '外国驾照与偏远社区'],
  },
  {
    date: '2026-07-19',
    title: '完成 Arkansas 两页官方正文语义核对',
    summary:
      '逐条比对 Arkansas DFA 的 REAL ID、当前打印材料表、首次与续期到场清单、Class D 费用、FAQ、线上服务、改名改址表，以及 Arkansas State Police 的考试入口和 June 2026 Driver License Study Guide；补齐 79 条页面级显式来源映射，拆开考试与签发两套流程，并公开标注 REAL ID 简介与打印清单/FAQ 对 Social Security Card 和 DD214 的当前表述差异。',
    scope: ['阿肯色州办事总览', '阿肯色州 REAL ID', '79 条显式来源映射', 'SSN 材料与预约边界'],
  },
  {
    date: '2026-07-19',
    title: '完成 Tennessee 两页官方正文语义核对',
    summary:
      '逐条比对 Tennessee Driver Services 的 REAL ID、新居民、成人首证、Regular 与 Temporary credential、续补证、改名改址、费用、MVR、地点和驾驶手册；补齐 71 条页面级显式来源映射，移除已返回 404 的旧 Temporary 入口，并公开标注 New Residents 与 MVR Verification 对 Kentucky 是否需要 MVR 的当前入口差异。',
    scope: ['田纳西州办事总览', '田纳西州 REAL ID', '71 条显式来源映射', '失效入口替换与 MVR 差异'],
  },
  {
    date: '2026-07-19',
    title: '完成 Indiana 两页官方正文语义核对',
    summary:
      '逐条比对 Indiana BMV 的 REAL ID、材料清单、新居民、外州与外国驾照、Japan/Taiwan reciprocity、知识与路考、线上续补证、地址、中央制证、SAVE 和 interim credential；补齐 63 条显式来源映射，并公开标注当前交易页与旧中央制证 FAQ 对有效外州驾照 written test 的差异。',
    scope: ['印第安纳州办事总览', '印第安纳州 REAL ID', '63 条显式来源映射', '外州驾照考试冲突'],
  },
  {
    date: '2026-07-19',
    title: '发布 Georgia 官方手册衍生中文笔试练习',
    summary:
      '新增 20 道原创 Road Rules 与 Road Signs 练习，逐题提供中文解释、易错点和 Georgia DDS 官方章节；同时公开当前考试页与旧版 Driver Manual 对中文 Road Signs 的说明差异，并增加题库来源、结构、日期和旧站污染词自动审计。',
    scope: ['佐治亚州中文笔试练习', '中文笔试题库索引', '题库发布门禁', '90 天扩州计划'],
  },
  {
    date: '2026-07-17',
    title: '完成明尼苏达州官方语义核对与高风险映射',
    summary:
      '逐条审查 Minnesota DMV/DVS 的 REAL ID、Standard、Enhanced 区分、材料链、同日服务取消、地址更新与可达性波动，补齐每条页面声明到官方来源的映射并同步更新州页日期、编辑说明与更新日志，避免以旧快照替代当前结论。',
    scope: ['明尼苏达州办事总览', '明尼苏达州 REAL ID'],
  },
  {
    date: '2026-07-17',
    title: '完成康涅狄格州两页官方正文语义核对',
    summary:
      '逐条比对 Connecticut DMV 的 REAL ID、材料清单、普通驾照、外州与外国驾照、成人 permit、中英文考试、2026 Work Zone 课程、路考、费用、续补证、改名改址、Drive Only、non-driver ID、central issuance、预约与 office 正文；补齐中国大陆申请人的 permit 路径与 90 天等待豁免边界，并公开标注 SSN documentation、limited-term eligibility 和首证期限的州方页面冲突。',
    scope: ['康涅狄格州办事总览', '康涅狄格州 REAL ID', '三类 credential 与中国大陆申请路径', '173 条显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成俄勒冈州两页官方正文语义核对',
    summary:
      '逐条比对 Oregon DMV 的 Standard、REAL ID、identity/residency、HB 2015、新居民 30 天、外国驾照、China/Taiwan 免试边界、简体中文 online/office knowledge test、drive test、现行费用、续补证、改名改址、office、ID 与邮寄正文；补齐无 SSN 的线上考试限制，并纠正 REAL ID 地址 printout 与 identity 原件要求不可混用的旧说法。',
    scope: ['俄勒冈州办事总览', '俄勒冈州 REAL ID', 'Standard 与 REAL ID 材料分流', '157 条显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成内华达州两页官方正文语义核对',
    summary:
      '逐条比对 Nevada DMV 的 REAL ID、Standard、Driver Authorization Card、identity/residency、现行 NRS、2026 handbook、费用、新居民、外国驾照、Taiwan/South Korea waiver、China 路径、考试口译、Quick Cards、续期补证、改名改址、ID 与邮寄；重写三类证件判断，并公开标注 Taiwan waiver 年龄和 out-of-state REAL ID 模块的官方页面差异。',
    scope: ['内华达州办事总览', '内华达州 REAL ID', '三类 credential 与外国驾照分流', '144 条显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成科罗拉多州两页官方正文语义核对',
    summary:
      '逐条比对 Colorado DMV 的 REAL ID、DR 2300A/B/C、CO-RCSA、2025 Standard 新规则、费用、新居民 30/90 天、外州与外国驾照、Taiwan/Japan 附加材料、知识考试语言、第三方路考、续期、改址改名、补证、ID 与邮寄；纠正 TLP、无证件居民和中国大陆驾照的办事分流。',
    scope: ['科罗拉多州办事总览', '科罗拉多州 REAL ID', 'Standard credential 新规则', '143 条显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成亚利桑那州两页官方正文语义核对',
    summary:
      '逐条比对 Arizona MVD 的 Travel/Non-Travel、R03/26 材料表、费用、邮寄、permit 与 road test、Mandarin 笔试、Authorized Third Party、续补证、改址改名、外国申请人、SSN、authorized presence、新居民与现行州法；补齐中国大陆与 Taiwan 的免试差异，并明确无 SSN、普通新居民期限和 temporary receipt 的风险边界。',
    scope: ['亚利桑那州办事总览', '亚利桑那州 REAL ID', '中国大陆与 Taiwan 免试差异', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成俄亥俄州两页官方正文语义核对',
    summary:
      '逐条比对 Ohio BMV 的 Compliant/Standard、可接受材料、费用、邮寄与 interim document、首次申请、中文考试、TIPIC、成人与临时居民训练、外国驾照 reciprocity、SAVE、续期补证、改址和新居民正文，并交叉检查现行州法；补齐 China/Taiwan 训练豁免差异，公开标注 limited-term 新法与旧页面命名及 ID 费用页面之间的冲突。',
    scope: ['俄亥俄州办事总览', '俄亥俄州 REAL ID', '临时居民训练与 China/Taiwan 差异', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成密歇根州两页官方正文语义核对',
    summary:
      '逐条比对 Michigan SOS 的 Standard、REAL ID 与 Enhanced、首次与外州转入、材料、SAVE、成人知识考试、TIP、第三方路考、续期补证、费用、地址、预约、外国驾照和新居民正文；补齐首次申请与已有证件转换分流，并公开标注 SSA-L676 时效冲突及 China / China (Taiwan) treaty 差异。',
    scope: ['密歇根州办事总览', '密歇根州 REAL ID', 'SSA-L676 冲突与外国驾照 treaty 路径', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成北卡罗来纳州两页官方正文语义核对',
    summary:
      '逐条比对 NCDMV 的 REAL ID、identity/SSN/residency、legal presence、保险、首次驾照、考试与口译、certified school road test、续期补证、费用、预约、外州证件注销、新居民和 2026 现场上传正文；补齐 60/30 天路线，并明确外国驾照、IDP、中文考试和 secure upload 的边界。',
    scope: ['北卡罗来纳州办事总览', '北卡罗来纳州 REAL ID', '现场上传与外州证件注销', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成弗吉尼亚州两页官方正文语义核对',
    summary:
      '逐条比对 Virginia DMV 的 REAL ID、材料、驾照资格、续期补证、姓名地址、新居民、中文考试、road test、permit、外国驾照、六国互惠、Driver Privilege Card、legal presence 和费用正文；补齐 30/60 天与 2027 年训练变化，并明确 Taiwan knowledge test 和 EAD I-766 边界。',
    scope: ['弗吉尼亚州办事总览', '弗吉尼亚州 REAL ID', '2027 训练变化与六国互惠', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成马里兰州两页官方正文语义核对',
    summary:
      '逐条比对 Maryland MVA 的 REAL ID Lookup、材料、现行费用、续期补证、姓名地址、新居民、考试、permit、驾驶教育、外国驾照、五国互惠、非合规证件和 Photo ID 正文；补齐 30/60 天与 12 个月分界，并公开标注旧 REAL ID FAQ 和现行费用表的 $20/$30 冲突。',
    scope: ['马里兰州办事总览', '马里兰州 REAL ID', '费用冲突与五国互惠', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成佐治亚州两页官方正文语义核对',
    summary:
      '逐条比对 Georgia DDS 的 Secure ID、身份与住址材料、外州转入、非公民、外国驾照、韩国与台湾互惠、续期补证、地址、费用、考试语言、Class C 和 road test 正文；补齐 30/60/150 天分界，并公开标注永久卡 30/45 天、第二次改址费用和 Chinese Road Signs 三组官方页面差异。',
    scope: ['佐治亚州办事总览', '佐治亚州 REAL ID', '官方页面差异', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成宾夕法尼亚州两页官方正文语义核对',
    summary:
      '逐条比对 PennDOT 的 REAL ID、预验证、非公民与 CDL 分支、材料、费用、续期补证、姓名地址、新居民、permit、考试语言、外国驾照和台湾等互惠正文；补齐 camera card、15/60/20 天期限与中文笔试，并公开标注非公民 REAL ID 页和统一费用页的 duplicate 金额差异。',
    scope: ['宾夕法尼亚州办事总览', '宾夕法尼亚州 REAL ID', '费用冲突与预验证', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成伊利诺伊州两页官方正文语义核对',
    summary:
      '逐条比对 Illinois Secretary of State 的 REAL ID、A/B/C/D 文件组、VISA/NONVISA 与原 TVDL、续期补证、地址、新居民、permit、成人教育、费用、预约、2026 Rules of the Road 和老年驾驶新规；重写 Standard 与 REAL ID 判断路径，并保守说明无 SSN declaration 不能自动推定为 REAL ID 豁免。',
    scope: ['伊利诺伊州办事总览', '伊利诺伊州 REAL ID', 'VISA/NONVISA 与 SSN', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成马萨诸塞州两页官方正文语义核对',
    summary:
      '逐条比对 Mass.gov 的 REAL ID、身份清单、WFMA 现行法、续期补证、地址、permit、road test、外州转入、外国驾照、Taiwan conversion、费用和 MyMassGov 正文；明确 Standard Class D/M 的适用边界，并修正不同国家 driving record 期限。',
    scope: ['马萨诸塞州办事总览', '马萨诸塞州 REAL ID', 'WFMA 与外国驾照', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成新泽西两页官方正文语义核对',
    summary:
      '逐条比对 NJMVC 的 REAL ID、2 + 1 + 6 selector、姓名匹配、Standard 6 Points、续期补证、地址、预约、GDL、考试语言、路考、新居民和外国驾照互惠正文；重写材料判断与预约路径，并补充当前练车时数、邮寄、费用及台湾/韩国互惠边界。',
    scope: ['新泽西办事总览', '新泽西 REAL ID', '2 + 1 + 6 材料', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成华盛顿州两页官方正文语义核对',
    summary:
      '逐条比对 Washington DOL 的 REAL ID、EDL/EID、enhanced 材料清单、standard 身份文件、预申请、办公室、费用、续期、地址、考试语言、互惠驾照和新居民正文；删除过时的访问警告，重写两类证件的判断路径，并明确 EDL 的公民资格、国旗标记、边境和国际航班边界。',
    scope: ['华盛顿州办事总览', '华盛顿州 REAL ID', 'EDL/EID 材料', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成佛州两页官方正文语义核对',
    summary:
      '逐条比对 FLHSMV 的 REAL ID、身份分支、居住证明、MyDMV、费用、姓名地址、预约、考试、新居民和换证正文；补充 80 岁以上有效期与地址证明替代路径，并用 2026 年 English-only 公告纠正旧考试页仍显示的历史语言列表。',
    scope: ['佛州办事总览', '佛州 REAL ID', '考试语言更新', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成德州两页官方正文语义核对',
    summary:
      '逐条比对 Texas.gov、Texas DPS 和 TSA 的 REAL ID、线上资格、居住证明、个人化清单、预约、费用、地址、身份核验、考试、临时证件和换证正文；重写德州总览与 REAL ID 清单，并纠正车辆登记证明适用范围和 2026 年 CDL 考试语言规则。',
    scope: ['德州办事总览', '德州 REAL ID', 'AI 辅助证据核对', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成纽约州两页官方正文语义核对',
    summary:
      '逐条打开 New York DMV 的证件类型、ID-44、Social Security、预约、续期、地址、费用、补证、考试、语言和换证页面，按实际办事路径重写纽约州总览与 REAL ID 清单，并纠正线上 permit test 的年龄范围。',
    scope: ['纽约州办事总览', '纽约州 REAL ID', 'AI 辅助证据核对', '显式来源映射'],
  },
  {
    date: '2026-07-17',
    title: '完成加州两页官方正文语义核对',
    summary:
      '逐条打开 California DMV 的 REAL ID、材料、预约、地址、费用、处理时间、AB 60、考试和外国驾照页面，重写加州总览与 REAL ID 清单，并把每条声明改为显式来源映射。',
    scope: ['加州办事总览', '加州 REAL ID', 'AI 辅助证据核对', '显式来源映射'],
  },
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
