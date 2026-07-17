export const REVIEW_DATE = '2026-07-13';

const contactEmail = (
  import.meta.env?.PUBLIC_CONTACT_EMAIL ??
  (typeof process !== 'undefined' ? process.env.PUBLIC_CONTACT_EMAIL : '') ??
  ''
).trim();

export const SITE = {
  name: 'DMV中文办事库',
  shortName: 'DMV中文',
  description:
    '面向在美国中文用户的 DMV、REAL ID、驾照和地址变更办事信息库。重要办事事实附官方来源，并标注核对日期。',
  disclaimer:
    '本站不是政府网站，也不提供法律、移民或税务建议。所有办理要求、费用和预约规则请以官方页面为准。',
  contactEmail,
};

export type Source = {
  label: string;
  url: string;
  note?: string;
};

export type ActionLink = {
  label: string;
  url: string;
  description: string;
};

export type StateGuide = {
  id: string;
  abbr: string;
  nameEn: string;
  nameZh: string;
  agency: string;
  agencyUrl: string;
  publishedAt: string;
  modifiedAt: string;
  reviewedAt: string;
  summary: string;
  realIdSummary: string;
  licenseSummary: string;
  appointmentNote: string;
  documentHighlights: string[];
  commonMistakes: string[];
  recommendedSteps: string[];
  editorNotes?: string[];
  accessStatus?: {
    label: string;
    tone: 'ready' | 'watch' | 'risk' | 'draft';
    note: string;
    fallbackLabel?: string;
    fallbackUrl?: string;
  };
  actionLinks: ActionLink[];
  sources: Source[];
  relatedTopicSlugs: string[];
};

export function getStatePublicStatus(state: StateGuide): NonNullable<StateGuide['accessStatus']> {
  if (state.accessStatus) {
    const needsExtraCare = state.accessStatus.tone === 'risk';

    return {
      ...state.accessStatus,
      label: needsExtraCare ? '建议从备用入口进入' : '已提供备用入口',
      note: needsExtraCare
        ? '部分州政府深层页面可能因网络位置或安全验证无法直接打开。请从本页备用官方入口进入，并在提交前确认最新要求。'
        : '部分州政府深层页面可能因网络位置或安全验证暂时无法打开。若遇到问题，请从本页备用官方入口重新进入州政府网站。',
    };
  }

  return {
    label: state.reviewedAt ? '内容已核对' : '待补核对',
    tone: state.reviewedAt ? 'ready' : 'draft',
    note: state.reviewedAt
      ? '页面已完成基础来源整理；办理前仍请以官方页面的最新要求为准。'
      : '页面还在补充核对，暂时只适合做初步方向参考。',
  };
}

const privateEditorialPatterns = [
  /本环境|本轮.*复核|自动(?:化|链接|审计)?检查|无头浏览器|browser check/i,
  /CloudFront|Akamai|Access Denied|HTTP2|request blocked|service unavailable/i,
  /返回\s*(?:403|404|500)|链接审计|搜索索引|来源线索|应标\s*watch|accessStatus|fallback/i,
  /中文页|页面线索|页面(?:还)?要核对|页面(?:都)?(?:不要|不应|应|要(?!求)|需要)|页面(?:的)?(?:核心|最重要)|适合放(?:到|进)|适合(?:中文用户)?(?:重点)?提示|不要写成/i,
  /这页(?:要|只)|本站(?:应|保留)|上线后|目录.*互补|避免和.*重复|两个页面应|专题应同步|来自.*线索|页面用“/i,
  /这(?:一)?页|本页|整页|编辑重点|页面(?:措辞|目标|定位|的核心|的重点)|正文|写作|后续扩展|当前阶段/i,
  /高价值更新点|每次更新|更新(?:这页|时)|抽取线索|分工不同|专门服务|故意不写|核心判断句/i,
  /(?:不要|避免)把.*(?:写成|误写|套用|泛化)|必须(?:写清|引用)|要分开写/i,
];

export function getPublicEditorialNotes(notes?: string[]) {
  return (notes ?? []).filter((note) => !privateEditorialPatterns.some((pattern) => pattern.test(note)));
}

export type TopicGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  publishedAt: string;
  modifiedAt: string;
  reviewedAt: string;
  description: string;
  whoNeedsIt: string[];
  keyFacts: string[];
  checklist: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
  factChecks?: { claim: string; sourceUrls: string[] }[];
  editorNotes?: string[];
  relatedDirectory?: {
    label: string;
    href: string;
    description: string;
  };
  sources: Source[];
  relatedStateIds: string[];
};

export const federalSources: Source[] = [
  {
    label: 'DHS REAL ID 官方说明',
    url: 'https://www.dhs.gov/real-id',
    note: 'REAL ID 联邦项目、执行日期和基本要求。',
  },
  {
    label: 'TSA REAL ID 旅行说明',
    url: 'https://www.tsa.gov/realid',
    note: '机场安检接受证件和 REAL ID 旅行提醒。',
  },
  {
    label: 'TSA 可接受身份证件列表',
    url: 'https://www.tsa.gov/travel/security-screening/identification',
    note: '国内航班可使用的身份证件清单。',
  },
  {
    label: 'USA.gov REAL ID',
    url: 'https://www.usa.gov/real-id',
    note: '面向公众的 REAL ID 概览和州 DMV 入口。',
  },
  {
    label: 'USA.gov 州机动车服务目录',
    url: 'https://www.usa.gov/state-motor-vehicle-services',
    note: '按州进入 DMV、驾照、登记和机动车服务官方入口。',
  },
];

export const states: StateGuide[] = [
  {
    id: 'california',
    abbr: 'CA',
    nameEn: 'California',
    nameZh: '加州',
    agency: 'California DMV',
    agencyUrl: 'https://www.dmv.ca.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '加州首次 REAL ID 可以先在线填写申请并上传材料，但最后仍要到 DMV office 出示原件和 confirmation code 才能完成申请。',
    realIdSummary:
      '首次申请加州 REAL ID 需要一份身份证明、Social Security number（例外情况按官方说明）、两份不同的 California residency 证明，并亲自到 DMV office 完成文件核验。',
    licenseSummary:
      '标有 Federal Limits Apply 的普通加州驾照仍可用于驾驶，但不能用于 REAL ID 联邦用途；如果你有有效美国护照、护照卡或其他联邦接受证件，不必只为国内航班办理 REAL ID。',
    appointmentNote:
      '首次 REAL ID 必须到 DMV office；多数驾照或 ID 续期、replacement 和记录服务不提供柜台办理，应先用 online、kiosk、DMV business partner 或 mail。',
    documentHighlights: [
      '准备一份身份证明原件或认证副本，文件要显示出生日期和 true full legal name。',
      '准备两份不同的打印版 California residency 文件，均要显示申请人的 first and last name，并与申请中的 mailing address 一致。',
      '使用 P.O. Box 时，一份居住文件必须同时显示 P.O. Box 和 physical residence address。',
      '身份文件姓名与当前法定姓名不一致时，要提交能够串起每次变更的 marriage certificate、court order 或其他法定姓名变更文件。',
      'REAL ID 申请中要提供 Social Security number，官方注明某些情况可能例外。',
      '在线上传文件后，去 DMV office 时仍要带原件和 confirmation code。',
    ],
    commonMistakes: [
      '以为在线上传文件后，现场就不用带原件。',
      '用 photocopy 或 informational copy 代替身份证明原件或认证副本。',
      '两份 residency 文件并非不同文件，或姓名和地址与申请不一致。',
      '当前姓名与身份文件不同，却没有带齐每一次法定姓名变更的证明。',
      '以为首次 REAL ID 可以只靠线上或邮寄续期完成。',
    ],
    recommendedSteps: [
      '先判断自己是否要用加州驾照或 ID 处理联邦身份用途；有效美国护照、护照卡等联邦接受证件也可用于这些用途。',
      '打开 California DMV REAL ID checklist，逐项确认 identity、SSN、residency 和 name-change 文件。',
      '在线提交申请并上传文件后，保存 confirmation code。',
      '到 DMV office 完成首次申请，带齐上传过的原件和 confirmation code，并提前查看 wait times 或预约入口。',
    ],
    editorNotes: [
      '加州法律要求地址变更后 10 天内通知 DMV，在线变更应在办理或续办其他 DMV 业务前最多预留 3 天处理。',
      'California DMV 当前费用页列出非商业 Class C 原办或续期 $46，replacement 或信息变更 $37，普通 ID card $40。',
      '信用卡、借记卡和移动支付的 service fee 会因线上、办公室或 kiosk 渠道不同而变化，付款前应看费用页的最新表格。',
      'California DMV 当前估算 DL/ID online 处理约 2 周、kiosk 实体卡邮寄约 2 周、mail 约 4 周，实际可能因额外审查延长。',
      '即时获得的 temporary driver license 不能当作身份证明使用。',
      '不能提供美国合法居留证明、但能提供身份和 California residency 并满足 DMV 要求的人，应走 AB 60 driver license 路径；AB 60 不能升级为 REAL ID。',
      '加州 instruction permit 的 knowledge test 通常要求 80% 通过，办公室测试须在 4:30 p.m. 前开始。',
      '符合条件的非商业 Class C 续期申请人可用 eLearning 满足 knowledge test 要求，课程提供 Traditional Chinese 和 Mandarin audio。',
      '18 岁以上访客持有效本州或本国驾照时可在加州驾驶；成为 California resident 后须在 10 天内取得 California DL。',
      '持外国驾照申请 California DL 时按外州驾照流程办理并额外参加 driving test；持有效外国驾照去参加 drive test 仍需 accompanying driver。',
      'California DMV 明确英文网页才是官方准确来源，机器翻译差异不具有法律效力。',
    ],
    actionLinks: [
      {
        label: '加州 REAL ID 官方页',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/',
        description: '查看加州 REAL ID 资格、材料和办理入口。',
      },
      {
        label: 'REAL ID 材料清单',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
        description: '使用 California DMV 互动清单核对身份、SSN 和居住证明。',
      },
      {
        label: '驾照与身份证业务',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/',
        description: '普通驾照、身份证和相关服务入口。',
      },
      {
        label: 'New California Resident',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/',
        description: 'California DMV 新居民驾照、车辆注册和搬入后 DMV 事项入口。',
      },
      {
        label: 'Instruction Permits',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/',
        description: '加州 learner / instruction permit、knowledge test 和练车路径。',
      },
      {
        label: 'Knowledge / Drive Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/',
        description: '加州 knowledge test、drive test 和线上准备入口。',
      },
      {
        label: 'Online Learning / Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/',
        description: '加州 eLearning、线上考试、Traditional Chinese / Mandarin audio 和翻译免责声明。',
      },
      {
        label: 'Driver Handbooks',
        url: 'https://www.dmv.ca.gov/portal/driver-handbooks/',
        description: 'California DMV driver handbook 和多语言学习资料入口。',
      },
      {
        label: 'AB 60 驾照',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/',
        description: '加州无法提供美国合法居留证明时的 AB 60 driver license 路径；不是 REAL ID。',
      },
      {
        label: '地址变更',
        url: 'https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/',
        description: '在线提交 DMV 地址变更。',
      },
      {
        label: '预约入口',
        url: 'https://www.dmv.ca.gov/portal/appointments/',
        description: '查找可预约的 DMV 办公室服务。',
      },
      {
        label: 'DMV 地点查询',
        url: 'https://www.dmv.ca.gov/portal/locations/',
        description: '查询 DMV office、kiosk、业务伙伴和服务地点。',
      },
      {
        label: '费用和付款方式',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/',
        description: '查看加州驾照、ID、补证、信息变更费用和支付方式。',
      },
      {
        label: '处理时间',
        url: 'https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/',
        description: '查看加州 DL/ID、地址变更和其他业务的预估处理时间。',
      },
    ],
    sources: [
      {
        label: 'California DMV REAL ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/',
        note: '在线申请、上传材料、办公室原件核验和 confirmation code 流程。',
      },
      {
        label: 'California DMV What Is REAL ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/what-is-real-id/',
        note: '联邦用途、普通证件限制、护照替代、首次到场、SSN 和 REAL ID 材料概览。',
      },
      {
        label: 'California DMV REAL ID Checklist',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
        note: '一份身份文件、姓名变更链、两份不同居住证明和 P.O. Box 规则。',
      },
      {
        label: 'California DMV Document Verification FAQs',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/document-verification-faqs/',
        note: '在线上传后仍须在办公室出示原件。',
      },
      {
        label: 'California DMV Driver Licenses',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/',
      },
      {
        label: 'California DMV Fast Facts 5',
        url: 'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/',
      },
      {
        label: 'California DMV New to California',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/',
      },
      {
        label: 'California DMV Instruction Permits',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/',
        note: 'knowledge test 的 80% 通过标准、4:30 p.m. 截止和外国驾照路考陪同要求。',
      },
      {
        label: 'California DMV Prepare for Knowledge and Drive Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/',
      },
      {
        label: 'California DMV Online Learning and Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/',
      },
      {
        label: 'California DMV Driver Handbooks',
        url: 'https://www.dmv.ca.gov/portal/driver-handbooks/',
      },
      {
        label: 'California DMV AB 60 Driver Licenses',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/',
        note: '无法证明合法居留时的身份和 California residency 路径。',
      },
      {
        label: 'California DMV Change of Address',
        url: 'https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/',
        note: '在线地址变更、最多 3 天处理和不自动寄发新卡。',
      },
      {
        label: 'California DMV Service Locations',
        url: 'https://www.dmv.ca.gov/portal/locations/',
      },
      {
        label: 'California DMV Update Information',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/',
        note: '地址变更 10 天期限、姓名更新、SSN 和 REAL ID 材料。',
      },
      {
        label: 'California DMV Licensing Fees',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/',
        note: 'Class C、replacement、ID card 当前费用及各渠道支付手续费。',
      },
      {
        label: 'California DMV Processing Times',
        url: 'https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/',
        note: 'DL/ID online、kiosk、mail 估算时长和临时驾照身份用途限制。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'renewal-replacement-address',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'new-york',
    abbr: 'NY',
    nameEn: 'New York',
    nameZh: '纽约州',
    agency: 'New York DMV',
    agencyUrl: 'https://dmv.ny.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '纽约州有 Standard、REAL ID 和 Enhanced 三类照片证件。先按用途选证件，再用官方 pre-screening 生成材料清单；从 Standard 升级为 REAL ID 或 Enhanced 必须到 DMV office。',
    realIdSummary:
      'REAL ID 没有额外证件费，但正常交易费仍适用；Enhanced 仅面向美国公民和纽约州居民，并在普通交易费之外加收 $30。',
    licenseSummary:
      'Standard 驾照仍可用于驾驶和普通照片 ID，但不能用于登美国国内航班或进入要求 REAL ID 的联邦场所；有效护照可替代 REAL ID。',
    appointmentNote:
      '按城市或 ZIP 搜索办公室后，点 View Details 查看现场服务和预约入口；并非所有办公室提供预约，且长等待时可能只允许有 reservation 的人进入。',
    documentHighlights: [
      '先用 NY DMV pre-screening 生成个人清单，再以当前 ID-44（2/26）复核接受的文件和分值。',
      'REAL ID 需要 Social Security 证明、citizenship 或 lawful status、两份纽约州居住证明，以及累计 6 points 的姓名证明。',
      '材料须为原件或签发机构认证副本；除官方特别说明外，过期文件不接受。',
      '两份居住证明都必须显示当前纽约州地址，P.O. Box 不接受。',
      '电子 statement 或 e-bill 要打印，且同一来源或同一类型只能使用一份。',
      '用于 REAL ID 的 Social Security ineligibility letter 必须由 SSA 在办公室访问前 30 天内签发，并同时带向 SSA 出示过的 DHS 文件。',
      '身份证明姓名与当前法定姓名不同时，需用原件或认证副本串起每一次姓名变化。',
      '非英文文件必须附 certified English translation。',
    ],
    commonMistakes: [
      '把 Enhanced 与 REAL ID 当作同一证件，或误以为 Enhanced 可替代加拿大、墨西哥和部分加勒比地区之间的航空旅行证件。',
      '只带一份居住证明，或用 P.O. Box、同一金融机构的 bank statement 与 credit card statement 凑两份。',
      '姓名改过多次却只带最后一次改名文件。',
      '认为网上 pre-screening 或上传审核完成后就不用到办公室提交文件。',
      '到办公室才发现非英文材料没有 certified English translation，或原件已经过期。',
    ],
    recommendedSteps: [
      '先按用途判断：Standard 可用于驾驶和普通照片 ID，但不满足 REAL ID 联邦用途；REAL ID 解决联邦身份用途；Enhanced 另含限定的陆路或海路边境返美用途。',
      '打开 NY DMV pre-screening，选择申请、升级或换证场景并生成个人材料清单。',
      '按当前 ID-44 逐项核对 Social Security、citizenship 或 lawful status、两份 residency 和 6-point name proof。',
      '逐份检查姓名链、当前地址、签发日期、原件或认证副本以及英文翻译。',
      '按城市或 ZIP 查办公室，打开 View Details 确认该地点的服务和 reservation 规则。',
      '到办公室提交文件并领取 temporary document；官方提示新 REAL ID 或 Enhanced 通常约 2 周寄到。',
    ],
    editorNotes: [
      '搬家后必须在 10 天内更新 license、permit、non-driver ID 和 vehicle records；USPS 地址变更不会更新 DMV 记录。',
      '驾照可在到期前 1 年至到期后 2 年续期；已有 REAL ID 或 Enhanced，或保持 Standard 时可线上或邮寄续期，证件类型不变，Standard 升级要到办公室。',
      '常见 Class D 续期费为 $64.50，MCTD 地区为 $80.50；REAL ID 不额外收费，Enhanced 另加 $30。',
      'replacement driver license 或 permit 为 $17.50，amend 信息变更为 $12.50；首次 license 或 permit 费用按年龄和居住地区计算。',
      '线上补证只能保留原证件类型，且寄往下单时 DMV 记录地址；搬家应先改地址，线上补证不能使用临时邮寄地址。',
      'Class D permit test 提供 20 种语言，包括 Chinese；线上 permit test 选项目前仅面向未满 18 岁申请人，在线通过后应至少留出 3 个工作日供 DMV 审核。',
      '未满 18 岁的申请人从取得 learner permit 起至少等 6 个月才能预约 road test；路考前还需完成 5-hour pre-licensing course 或符合条件的 driver education course。',
      '持有效外国驾照可在成为纽约州居民前驾驶；申请纽约驾照需通过 written test、5-hour course 和 road test，路考通过时会交出 foreign license。',
      '外国驾照不是英文时，参加 road test 要带 International Driving Permit 或由领事馆、美国国务院或其他政府机构认证的翻译。',
      'NY DMV 提供免费语言协助，中文属于重要表格和文件覆盖的 12 种主要语言之一；官方电话为 1-518-486-9786。',
      '成为纽约居民后，应在 30 天内把美国其他州或领地、联邦特区或加拿大省份的合格驾照换成纽约驾照；换证仅可到办公室办理。',
    ],
    actionLinks: [
      {
        label: '纽约 REAL ID / Enhanced',
        url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
        description: '比较纽约 REAL ID、Enhanced 和 Standard 证件。',
      },
      {
        label: 'DMV Document Guide',
        url: 'https://dmv.ny.gov/more-info/dmv-document-guide',
        description: '用纽约 DMV 官方工具确认所需身份证明和材料。',
      },
      {
        label: 'ID-44 材料 PDF',
        url: 'https://dmv.ny.gov/forms/id44.pdf',
        description: '纽约 learner permit、driver license、non-driver ID 的证明文件表。',
      },
      {
        label: '无 SSN / ineligibility',
        url: 'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility',
        description: '纽约 Standard 与 REAL ID 在 SSN、SSA ineligibility letter 和 Form NSS-1A 上的差异。',
      },
      {
        label: '首次驾照',
        url: 'https://dmv.ny.gov/driver-license/get-learner-permit',
        description: '纽约 learner permit 和首次驾照流程。',
      },
      {
        label: 'Permit Test',
        url: 'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test',
        description: '纽约 Class D permit test 的 20 种语言、未满 18 岁线上测试和办公室审核说明。',
      },
      {
        label: 'Drivers from Other Countries',
        url: 'https://dmv.ny.gov/driver-license/drivers-from-other-countries',
        description: '纽约州外国驾照驾驶、申请 NY license、IDP / certified translation 和交 foreign license 说明。',
      },
      {
        label: 'Exchange Out-of-State License',
        url: 'https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license',
        description: '纽约外州、美国属地、联邦区和加拿大省份驾照换证入口。',
      },
      {
        label: 'Language Assistance',
        url: 'https://dmv.ny.gov/more-info/language-assistance',
        description: '纽约 DMV 语言协助、口译和重要文件多语言服务说明。',
      },
      {
        label: 'Road Test',
        url: 'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
        description: '纽约 road test 预约、资格和考试准备说明。',
      },
      {
        label: '续期驾照',
        url: 'https://dmv.ny.gov/driver-license/renew-a-driver-license',
        description: '纽约驾照线上、邮寄和办公室续期路径。',
      },
      {
        label: '地址变更',
        url: 'https://dmv.ny.gov/records/change-your-address',
        description: '纽约 DMV 地址变更说明。',
      },
      {
        label: '办公室与预约',
        url: 'https://dmv.ny.gov/contact-us/office-locations',
        description: '查找纽约 DMV 办公室和预约信息。',
      },
      {
        label: '费用和退款',
        url: 'https://dmv.ny.gov/driver-license/fees-refunds',
        description: '查看纽约驾照、learner permit、Enhanced、MCTD 和付款方式说明。',
      },
      {
        label: '补办驾照或 permit',
        url: 'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
        description: '纽约补证费用、付款方式、地址和邮寄说明。',
      },
    ],
    sources: [
      {
        label: 'NY DMV Enhanced or REAL ID',
        url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
        note: '三类证件用途、申请路径、两份 residency、姓名链、费用和约 2 周邮寄时间。',
      },
      {
        label: 'NY DMV Document Guide',
        url: 'https://dmv.ny.gov/more-info/dmv-document-guide',
        note: '个人化 pre-screening 和办公室前材料准备。',
      },
      {
        label: 'NY DMV ID-44',
        url: 'https://dmv.ny.gov/forms/id44.pdf',
        note: '当前 ID-44（2/26）的 Social Security、身份、居住、姓名分值和翻译规则。',
      },
      {
        label: 'NY DMV Applying Without SSN or Ineligibility',
        url: 'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility',
        note: 'Standard 与 REAL ID 的 Social Security 证明差异。',
      },
      {
        label: 'NY DMV Driver License',
        url: 'https://dmv.ny.gov/driver-license',
      },
      {
        label: 'NY DMV Permit Test',
        url: 'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test',
        note: 'Class D 测试语言、未满 18 岁线上选项和 3 个工作日审核。',
      },
      {
        label: 'NY DMV Drivers from Other Countries',
        url: 'https://dmv.ny.gov/driver-license/drivers-from-other-countries',
        note: '外国驾照驾驶、纽约申请流程、翻译和交证规则。',
      },
      {
        label: 'NY DMV Exchange Out-of-State Driver License',
        url: 'https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license',
        note: '成为居民后 30 天期限、可换证条件和现场办理路径。',
      },
      {
        label: 'NY DMV Language Assistance',
        url: 'https://dmv.ny.gov/more-info/language-assistance',
        note: '免费口译、中文重要文件和语言协助电话。',
      },
      {
        label: 'NY DMV Schedule and Take a Road Test',
        url: 'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
        note: '路考前置课程、未满 18 岁等待期和现场材料。',
      },
      {
        label: 'NY DMV Renew a Driver License',
        url: 'https://dmv.ny.gov/driver-license/renew-a-driver-license',
        note: '续期窗口、线上或邮寄资格、办公室场景和 Class D 费用。',
      },
      {
        label: 'NY DMV Change Your Address',
        url: 'https://dmv.ny.gov/records/change-your-address',
        note: '10 天期限、USPS 边界和 DMV 地址更新。',
      },
      {
        label: 'NY DMV Driver License Fees and Refunds',
        url: 'https://dmv.ny.gov/driver-license/fees-refunds',
        note: 'replacement、amend、Enhanced 当前费用和付款渠道。',
      },
      {
        label: 'NY DMV Replace a License or Permit',
        url: 'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
        note: '补证方式、$17.50 费用、地址和邮寄限制。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-vs-standard-license',
      'moving-to-new-state',
      'name-change-chain',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'texas',
    abbr: 'TX',
    nameEn: 'Texas',
    nameZh: '德州',
    agency: 'Texas Department of Public Safety',
    agencyUrl: 'https://www.dps.texas.gov/section/driver-license',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      'Texas DPS 管理德州驾照和身份证。首次申请和外州换证必须到 driver license office；续期、补证、升级和改地址应先让官方系统判断线上资格。',
    realIdSummary:
      '德州 REAL ID 合规驾照或 ID 的右上角有星标。当前有效但没有星标的德州证件仍可用于驾驶和非联邦身份用途；自 2025 年 5 月 7 日起，乘坐美国国内航班须使用带星标证件、有效护照、美国军人证或其他 TSA 接受证件。',
    licenseSummary:
      '首次申请德州驾照前，先用 DPS REAL ID Document Check 生成个人材料清单。申请人通常还要完成视力、knowledge 和 driving skills 测试，符合外州换证或互惠条件者可能免试。',
    appointmentNote:
      'DPS 的现场驾照和 ID 服务以预约为主，部分办公室仅提供数量有限的 walk-in appointment。可在最多提前 180 天预约后前往任一 driver license office；续期、补证或改地址先检查线上资格。',
    documentHighlights: [
      '先用 DPS REAL ID Document Check 回答申请类型、身份和现有材料问题，生成个人化清单。',
      '准备 citizenship 或 lawful presence、identity 和 Social Security number 对应文件；DPS 会与联邦系统核验 SSN 和 lawful presence。',
      '准备两份打印的 Texas residency 文件，两份都要显示申请人姓名和 residential address。通常至少一份要证明已在 Texas 居住 30 天；交出有效未过期外州证件者和 CDL 申请人免除 30 天要求，但仍要交两份居住证明。',
      '符合清单的电子 statement 可以打印提交。同一来源仅在地方政府或提供多项住宅服务的机构分别出具不同服务账单时可算两份；同一服务不同月份不能凑两份。',
      '驾照申请中的 Texas vehicle registration 证明只适用于交出外州驾照的新居民。申请人还要提供本人拥有的每辆车的保险证明，或签署不拥有车辆的声明。',
      '身份文件与当前姓名不一致时，准备能够连接每次变更的法定姓名文件。',
      '非美国公民要按本人身份提供 lawful presence 文件，DPS 在 DHS 核验完成前不能签发证件。符合 temporary visitor 定义者会收到标有 Limited Term 的证件。',
    ],
    commonMistakes: [
      '把 Texas.gov 的简版公民材料示例当成所有申请人的通用清单，或没有运行 DPS REAL ID Document Check。',
      '只带一份 residency 文件，或两份文件没有同时显示本人姓名和 Texas residential address。',
      '用同一项服务不同月份的账单凑两份居住证明。',
      '误以为所有续期、补证和改地址都能在线办理。DPS 会按年龄、证件类型和状态、上次续期方式、SSN、身份核验、欠票或 warrant 等条件决定资格；79 岁及以上驾照持有人须现场续期。',
      '未预约就直接前往办公室，或没有确认所选服务和 appointment。',
      '只带最后一次改名文件，没有把出生姓名到当前法定姓名完整连接起来。',
      '默认普通 knowledge test 有中文版本。非商业驾照知识考试只提供 English 或 Spanish，翻译人员不能在考试过程中协助。',
    ],
    recommendedSteps: [
      '先看现有证件右上角是否有星标，再判断是否需要用州证件乘坐国内航班或进入受管制联邦设施。',
      '已有 Texas DL 或 ID 的续期、补证、升级或改地址，先运行 online eligibility；首次申请和外州换证直接准备现场路径。',
      '运行 REAL ID Document Check，并按结果准备原件、认证副本、打印的 residency 文件和完整姓名链。',
      '需要现场办理时，用 Texas Scheduler 选择准确服务和办公室；首次申请或外州换证必须亲自办理。',
      '现场核对申请、材料、照片、指纹、费用和适用考试。常见 18 至 84 岁 Class A、B 或 C 新办或续期费为 $33，replacement 为 $11；最终以当前 fee table 和个人业务为准。',
      '领取 temporary driver license 后当场核对信息；临时驾照有效 60 天，正式卡通常约 2 至 3 周邮寄到达。',
      '搬家后 30 天内更新驾照或 ID 地址；地址或姓名变更属于 replacement，并要支付适用费用。',
    ],
    editorNotes: [
      '多数 Texas driver license 和 ID 可在到期前两年至到期后两年内续期，但证件类型和个人状态可能改变办理方式。',
      '79 岁及以上驾照持有人须现场续期，learner license 不能在线续期。',
      '18 至 84 岁 Class A、B 或 C 驾照常见新办和续期费为 $33，replacement 为 $11。',
      '59 岁及以下普通 ID 新办或续期费为 $16，60 岁及以上为 $6，replacement 为 $11。',
      '地址变化后 30 天内要更新 driver license 或 ID，改地址和改姓名都按 replacement 办理并支付适用费用。',
      'temporary driver license 自业务办理日起有效 60 天，正式驾照通常约 2 至 3 周邮寄到达。',
      '符合要求的 temporary visitor 会收到标有 Limited Term 的驾照或 ID。证件通常随 lawful presence 期限到期；若身份期限为 duration of status，证件一年后到期。',
      'DPS 会通过 DHS 核验 lawful presence，在核验完成前不能签发驾照或 ID；需要额外核验时，申请人要按 DPS 指示继续处理。',
      '非商业驾照 knowledge test 只提供 English 或 Spanish，翻译人员只能在考试前后协助，不能在考试过程中提供帮助。',
      '自 2026 年 6 月 1 日起，Texas CDL 和 CLP knowledge exams 只用 English，考试中禁止 interpreter。',
      '新居民持有效、未过期的美国其他州或领地、加拿大省份或符合条件国家驾照，可在搬到 Texas 后最多驾驶 90 天。',
      '交出有效的美国其他州、领地或加拿大驾照时，通常免 knowledge 和 skills exams。',
      'Texas 与 France、Germany、South Korea、United Arab Emirates 和 Taiwan 有驾照互惠；持有效未过期证件且交出外国驾照者可能免 knowledge 和 skills exams。',
      '外国驾照不是 English 或 Spanish 时，去办公室前要由翻译服务机构或领事馆完成翻译。',
      '持有效未过期外国驾照的非居民驾驶期限最多为一年或到成为 Texas resident 为止，以较早者为准；成为新居民后须在 90 天内申请 Texas license。',
    ],
    actionLinks: [
      {
        label: 'Texas REAL ID',
        url: 'https://www.texas.gov/driver-services/texas-real-id/',
        description: 'Texas.gov 的 REAL ID 合规证件说明。',
      },
      {
        label: 'Texas Driver Services',
        url: 'https://www.texas.gov/driver-services/',
        description: 'Texas.gov 驾照、REAL ID 和相关服务总入口。',
      },
      {
        label: 'Texas Residency Requirement',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
        description: 'Texas DPS 对两份 residency 文件、姓名和住址显示方式的要求。',
      },
      {
        label: 'REAL ID Document Check',
        url: 'https://www.dps.texas.gov/apps/DriverLicense/RealID/',
        description: '按申请类型、身份和现有材料生成个人化官方清单。',
      },
      {
        label: '续期/补证入口',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/',
        description: 'Texas.gov 驾照和 ID 续期、补证、升级和改地址入口。',
      },
      {
        label: '申请 Texas DL',
        url: 'https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license',
        description: '德州首次驾照、knowledge test、driving skills test 和办公室申请说明。',
      },
      {
        label: 'Moving to Texas Guide',
        url: 'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
        description: 'Texas DPS 新居民、外州/外国驾照、reciprocity 和 Texas driver license / ID 办理说明。',
      },
      {
        label: 'Driving Privilege Reciprocity',
        url: 'https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity',
        description: 'Texas DPS 关于有效 foreign license 在 Texas 驾驶、reciprocity 国家和期限的说明。',
      },
      {
        label: 'Testing in Other Languages',
        url: 'https://www.dps.texas.gov/section/driver-license/testing-other-languages',
        description: 'Texas DPS 关于 English / Spanish knowledge test、CDL 口译限制和其他语言考试的说明。',
      },
      {
        label: '预约 Driving Test',
        url: 'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment',
        description: 'Texas DPS driving test 预约说明。',
      },
      {
        label: '线上续期/补证资格',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/',
        description: '检查德州驾照、CDL 或 ID 是否可在线办理。',
      },
      {
        label: '地址/信息变更',
        url: 'https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card',
        description: 'Texas DPS 驾照或 ID 地址、姓名等信息变更说明。',
      },
      {
        label: 'Driver License Fees',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-license-fees',
        description: 'Texas DPS 驾照、ID、续期、补证和相关费用表。',
      },
      {
        label: 'Temporary Visitors',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
        description: 'Texas DPS 临时访客、lawful presence 和 Limited Term 证件说明。',
      },
      {
        label: '临时凭证 FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-3-issuing-temporary-permit',
        description: 'Texas DPS 临时 permit / license 和卡片邮寄状态说明。',
      },
      {
        label: '办公室和续期 FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-1-applying-or-renewing-driver-license-identification-card-or',
        description: '首次申请、外州换证、预约、续期窗口和非公民业务要求。',
      },
      {
        label: 'Citizenship / Lawful Presence',
        url: 'https://www.dps.texas.gov/section/driver-license/us-citizenship-or-lawful-presence-requirement',
        description: 'DHS 核验、可接受身份文件和 additional verification 说明。',
      },
    ],
    sources: [
      {
        label: 'Texas.gov REAL ID',
        url: 'https://www.texas.gov/driver-services/texas-real-id/',
      },
      {
        label: 'Texas.gov Driver Services',
        url: 'https://www.texas.gov/driver-services/',
      },
      {
        label: 'Texas Driver License Online Eligibility',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/',
      },
      {
        label: 'Texas DPS Apply for a Driver License',
        url: 'https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license',
      },
      {
        label: 'Texas DPS Moving to Texas Guide',
        url: 'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
      },
      {
        label: 'Texas DPS Driving Privilege Reciprocity',
        url: 'https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity',
      },
      {
        label: 'Texas DPS Testing in Other Languages',
        url: 'https://www.dps.texas.gov/section/driver-license/testing-other-languages',
      },
      {
        label: 'Texas DPS Schedule Your Driving Test Appointment',
        url: 'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment',
      },
      {
        label: 'Texas DPS Change Information',
        url: 'https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card',
      },
      {
        label: 'Texas DPS Residency Requirement',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
      },
      {
        label: 'Texas DPS Driver License Fees',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-license-fees',
      },
      {
        label: 'Texas DPS Temporary Visitors',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
      },
      {
        label: 'Texas DPS Temporary Permit FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-3-issuing-temporary-permit',
      },
      {
        label: 'Texas DPS Identification Card',
        url: 'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card',
      },
      {
        label: 'Texas DPS REAL ID Document Check',
        url: 'https://www.dps.texas.gov/apps/DriverLicense/RealID/',
      },
      {
        label: 'Texas DPS Driver License FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-1-applying-or-renewing-driver-license-identification-card-or',
      },
      {
        label: 'Texas DPS Citizenship or Lawful Presence',
        url: 'https://www.dps.texas.gov/section/driver-license/us-citizenship-or-lawful-presence-requirement',
      },
      {
        label: 'Texas DPS Social Security Number',
        url: 'https://www.dps.texas.gov/section/driver-license/social-security-number-ssn',
      },
      {
        label: 'Texas DPS 2026 CDL Knowledge Testing Update',
        url: 'https://www.dps.texas.gov/news/dps-announces-changes-cdl-knowledge-testing',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedTopicSlugs: [
      'document-checklist',
      'airport-travel-after-real-id',
      'renewal-replacement-address',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'florida',
    abbr: 'FL',
    nameEn: 'Florida',
    nameZh: '佛州',
    agency: 'Florida Highway Safety and Motor Vehicles',
    agencyUrl: 'https://www.flhsmv.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '佛州驾照和 ID 由 FLHSMV 与各县 driver license service center 或 tax collector office 办理。首次 Florida 证件要走现场路径；续期、补证和改地址可先让 MyDMV Portal 判断线上资格。',
    realIdSummary:
      'Florida 在 2010 年 1 月 1 日后开始签发 REAL ID-compliant 证件，右上角金色星标表示合规。证件没有星标时要到 driver license service center 或 tax collector office 完成 REAL ID 文件核验；已经合规的证件通常可等到期或必须变更姓名、地址等信息时再换。',
    licenseSummary:
      '公民和 immigrant 的 Class E 驾照在 80 岁以下通常有效 8 年，80 岁及以上通常有效 6 年。驾照最多提前 18 个月续期，ID 最多提前 12 个月；非移民证件期限按 USCIS 批准时间处理。',
    appointmentNote:
      'Florida 的预约和付款方式按县及地点变化，many offices require appointments。先在 FLHSMV Locations 选择县，再进入该 tax collector 或 office 的网站确认服务、预约和附加费用。',
    editorNotes: [
      'Florida online convenience renewal 通常只能隔一个 renewal period 使用一次，最终资格由 MyDMV Portal 判断。',
      'MyDMV Portal 完成交易后，证件通常在 2 至 3 周内邮寄，并在交易总额中加收 $2 processing fee。',
      '上次已在线续期、证件不符合 REAL ID、需要换照片或改名、首次办 Florida 证件、持 CDL 或证件印有 TEMPORARY 时，必须到办公室办理。',
      'Class E 驾照续期费为 $48，driver license replacement 和普通 ID 原办、续期或 replacement 通常为 $25；tax collector office 还可能收 $6.25 service fee。',
      '姓名或地址变化后 30 天内要同时更新 driver license 或 ID 以及 title 和 registration。',
      '改名要先更新 Social Security Administration 记录，并在等待 24 至 48 小时后再到 Florida 办证机构办理。',
      '自 2026 年 2 月 6 日起，所有 Florida driver license knowledge 和 skills exams 只用 English，考试中不再允许 language translation services。',
      'FLHSMV 的旧 Class E 考试页仍显示历史语言列表；当前考试语言应以 2026 年 English-only 公告为准。',
      'Class E Knowledge Exam 有 50 道选择题，答对 40 题或达到 80% 才通过。',
      '外国访客在 Florida 驾驶时，要随身携带居住国签发给本人的有效 driver license。',
      '成为 Florida resident 后须在 30 天内取得 Florida driver license；自有车辆通常还要在建立 residency 后 10 天内取得 Florida insurance 并办理 title 和 registration。',
      '有效 out-of-state driver license 可免 written 和 driving exams，但不能当作 primary identification，且申请人仍要做 vision test。',
      '新居民材料暂时不全时，如果 out-of-state license 仍有效或过期不超过 60 天，可能获得 60-day temporary permit。',
      '新居民的 driver license 或 ID 申请必须到提供 driver license services 的当地办公室现场办理。',
    ],
    documentHighlights: [
      '先进入 What to Bring，按 U.S. Citizen、Immigrant、Non-Immigrant 或 Canadian 选择身份分支。',
      '现场 REAL ID 通常要一份可接受的 primary identification、SSN 证明和两份 Florida residential address 文件。',
      'primary identification 要用官方列出的原件或认证文件，out-of-state driver license 不能替代这组身份证明。',
      'SSN 记录上的姓名要与 Florida 证件姓名一致。改名时先更新 SSA，等待 24 至 48 小时，并用原件或认证文件连接出生姓名到当前姓名。',
      '两份地址文件必须不同并显示 Florida residential address，当前 driver license 或 ID 不能用作地址证明。符合清单的 printout 或 fax 可以提交，utility、bank、insurance、pay stub 和部分政府文件通常要在 60 天内。',
      '地址文件不在本人名下时，可由同住人提交 Certification of Address 和两份配套地址证明。同住人要到场，或在 notary 面前签署表格。',
      'Non-Immigrant 身份文件通常要在签发日后仍有 30 天以上有效期。首次申请 driver license 时会先取得无照片的 60-day temporary paper permit；身份和 lawful status 核验通过后，正式证件在 60 天内邮寄。',
    ],
    commonMistakes: [
      '把 MyDMV Portal 能打开误解为本人一定有线上资格。',
      '上次已经用过 online convenience renewal，这次仍按线上续期准备。',
      '把有效 out-of-state license 当作 primary identification；它可能帮助免除考试，但不能替代身份原件。',
      '只带一份地址证明，或用当前 Florida driver license / ID 充当地址证明。',
      '改名后没有先更新 SSA，或只带最后一次改名文件，无法连接完整法定姓名链。',
      '只带照片、手机扫描件或普通复印件，而不是身份分支要求的原件或认证文件。',
      '看到旧 Class E 页面仍列 Chinese 或 Spanish，就认为 2026 年 2 月 6 日后考试仍提供这些语言。',
      '没有进入所选县或 tax collector office 的网站确认 appointment、服务范围和付款方式。',
    ],
    recommendedSteps: [
      '先确认本次是首次申请、外州换证、续期、补证、改名还是改地址，并查看现有证件右上角是否有星标。',
      '已有 Florida 证件且只需续期、补证或改地址时，先进入 MyDMV Portal 检查线上资格。',
      '打开 What to Bring 的正确身份分支，逐项准备 primary identification、SSN、两份地址文件和完整姓名链。',
      '需要现场办理时，在 Locations 选择县并打开具体 office 或 tax collector 网站，确认 appointment 和 service fee。',
      '到场提交原件或认证文件并完成照片、适用测试和付款。常见 Class E 续期费为 $48，replacement 为 $25；最终金额以 fee table 和承办地点为准。',
      '新居民应在建立 residency 后 30 天内取得 Florida license；材料暂缺且外州驾照符合条件时，现场询问 60-day temporary permit。',
    ],
    actionLinks: [
      {
        label: 'What to Bring',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/',
        description: '佛州办理驾照、ID 和 REAL ID 的材料分类入口。',
      },
      {
        label: 'U.S. Citizen 材料',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/',
        description: '佛州美国公民身份、SSN 和两份居住地址文件示例。',
      },
      {
        label: 'Non-Immigrant 材料',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
        description: '佛州非移民身份、legal status 核验和 60 天临时纸质许可说明。',
      },
      {
        label: '续期或补证',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
        description: '佛州驾照或 ID 续期、补证、线上处理费和 2-3 周邮寄说明。',
      },
      {
        label: 'Class E Knowledge / Skills',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/',
        description: '佛州 Class E knowledge exam、driving skills test 和 learner license 考试说明。',
      },
      {
        label: 'Driver License Exams',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/',
        description: '佛州 driver license exams、第三方考试、成绩提交和当前考试语言点验入口。',
      },
      {
        label: 'English-only Exams Announcement',
        url: 'https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/',
        description: 'FLHSMV 2026 年关于 driver license exams English-only 政策更新的官方公告。',
      },
      {
        label: '费用表',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/fees/',
        description: '佛州驾照、ID 和相关业务官方费用入口。',
      },
      {
        label: 'MyDMV Portal / GoRenew',
        url: 'https://services.flhsmv.gov/VirtualOffice/',
        description: '佛州线上服务入口。',
      },
      {
        label: '新居民入口',
        url: 'https://www.flhsmv.gov/new-resident/',
        description: '佛州新居民驾照、保险、title 和 registration 说明。',
      },
      {
        label: 'Visiting Florida FAQs',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/',
        description: '佛州外国访客驾驶、成为 resident 后 30 天内取得 Florida license、材料不足临时 permit 和访客常见问题。',
      },
      {
        label: 'What to Bring FAQ',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/frequently-asked-questions/',
        description: '佛州关于 out-of-state license 换证、written / driving test 豁免和 vision test 的 FAQ。',
      },
      {
        label: '姓名和地址变更',
        url: 'https://www.flhsmv.gov/name-and-address-changes/',
        description: '佛州 driver license / ID 和 title / registration 姓名地址变更说明。',
      },
      {
        label: '服务中心位置',
        url: 'https://www.flhsmv.gov/locations/',
        description: '查询佛州服务中心地点和服务方式。',
      },
      {
        label: 'USA.gov 州机动车服务目录',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: '如果 FLHSMV 官方页被拦截，可从 USA.gov 选择 Florida 后进入官方机动车服务入口。',
      },
    ],
    sources: [
      {
        label: 'FLHSMV What to Bring',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/',
      },
      {
        label: 'FLHSMV Driver Licenses and ID Cards',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/',
      },
      {
        label: 'FLHSMV What to Bring - U.S. Citizen',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
      {
        label: 'FLHSMV Renew or Replace',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'FLHSMV Class E Knowledge Exam and Driving Skills Test',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/',
      },
      {
        label: 'FLHSMV Driver License Exams',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/',
      },
      {
        label: 'FLHSMV English-only Exams Announcement',
        url: 'https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/',
      },
      {
        label: 'FLHSMV Driver License and ID Fees',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/fees/',
      },
      {
        label: 'FLHSMV Locations',
        url: 'https://www.flhsmv.gov/locations/',
      },
      {
        label: 'FLHSMV MyDMV Portal',
        url: 'https://services.flhsmv.gov/VirtualOffice/',
      },
      {
        label: 'FLHSMV New Resident',
        url: 'https://www.flhsmv.gov/new-resident/',
      },
      {
        label: 'FLHSMV Visiting Florida FAQs',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/',
      },
      {
        label: 'FLHSMV What to Bring FAQ',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/frequently-asked-questions/',
      },
      {
        label: 'FLHSMV Name and Address Changes',
        url: 'https://www.flhsmv.gov/name-and-address-changes/',
      },
      {
        label: 'FLHSMV New Driver License and ID FAQ',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/newdl/faq/',
      },
    ],
    relatedTopicSlugs: [
      'proof-of-residency',
      'non-citizen-license-id',
      'renewal-replacement-address',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'washington',
    abbr: 'WA',
    nameEn: 'Washington',
    nameZh: '华盛顿州',
    agency: 'Washington State Department of Licensing',
    agencyUrl: 'https://dol.wa.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '华盛顿州同时签发 standard driver license / ID 和 Enhanced Driver License / ID（EDL/EID）。普通驾照仍可驾驶，普通驾照或 ID 仍可作州内身份证明；EDL/EID 才是华盛顿州符合 REAL ID 的州证件。',
    realIdSummary:
      '华盛顿州 EDL/EID 用美国国旗而不是星标表示 REAL ID 合规。自 2025 年 5 月 7 日起，standard Washington driver license / ID 不能作为国内航班安检证件；有效护照、绿卡等 TSA 接受证件仍可替代 EDL/EID。',
    licenseSummary:
      'Standard Washington driver license / ID 不表示持有人具备特定居住或合法身份状态。非美国公民可以按 standard 证件规则准备身份材料，但不能申请只向美国公民签发的 EDL/EID。外国驾照、外州驾照和首次申领的考试要求不同，应先在 DOL 的 Do I need to take a test 表中匹配自己的情况。',
    appointmentNote:
      '驾照与 ID 要去 driver licensing office，车辆 title / registration 要去 vehicle licensing office，knowledge / drive test 通常由 testing location 办理。EDL 页面写明预约优先但可接待 walk-in，新居民换证页则要求预约。EDL 申请最晚在办公室关门前 60 分钟受理，仍应按具体业务页面和地点确认预约。',
    editorNotes: [
      '首次申请 standard Washington driver license 的当前基础总费用为 6 年 $111 或 8 年 $131；standard license 续期为 6 年 $61 或 8 年 $81。',
      '首次同时申领 EDL 的当前总费用为 6 年 $153 或 8 年 $187；把现有 WA driver license 升级为 EDL，按剩余期限收取 $7 至 $56。',
      'Standard license 可提前 1 年续期，并可在过期后最多 8 年内续期；过期超过 60 天加收 $10，达到 8 年则不能续期而要重新开始申请。',
      '70 岁及以上、需要 vision screening、需要新照片或上次已在线续期的人，必须到 driver licensing office 续期。',
      '搬家后 10 天内要更新 driver license / ID 地址；更新驾驶记录免费，立即领取显示新地址的新卡为 $20，vehicle registration 地址还要另外更新。',
      'Standard 证件的身份规则允许按一份 stand-alone、两份 A-list、一份 A-list 加两份 B-list、或四份 B-list 组合证明身份。',
      'Standard 证件不接受复印、扫描或拍照文件；申请驾照者必须提供 SSN，没有 SSN 时可签署声明。',
      '普通 knowledge test 共 40 题，答对 32 题通过，合格成绩有效 2 年。考试有 12 种语言，包括简体中文和繁体中文，但要先向 testing location 确认所需语言是否提供。',
      '18 岁以上持有效美国其他州证件、British Columbia Class 5、德国或韩国驾照者通常免 knowledge 和 drive test；台湾或日本驾照路径需要联系指定办事处取得 translated certification。',
      '未列入 DOL 互惠表的外国或加拿大省份驾照要走首次申领步骤；仅来访者可持本国有效驾照在 Washington 驾驶最多 1 年。',
      '成为 Washington 新居民后 30 天内要取得 WA driver license，并且要先取得 WA license 才能登记车辆。',
      '新居民办证时带外州驾照等身份证明并完成适用测试；DOL 会打孔后退还外州证件，签发可驾驶 45 天的临时驾照，正式卡通常 7 至 10 天寄出。',
    ],
    documentHighlights: [
      'EDL/EID 仅向美国公民签发，申请时要证明美国公民身份、本人身份和 Washington residency，并提供 SSN。',
      'EDL/EID 官方清单把美国公民身份证明和本人身份证明列为两个核对类别；具体选哪些文件以 enhanced document tool 生成的个人清单为准。',
      'EDL/EID 文件通常必须是未改动的认证原件、认证修订原件或签发机构认证的 true copy，只有清单明确注明时才接受 printout。',
      '准备两份均显示本人 first and last name 与当前 WA residential address 的居住文件，P.O. Box 不能代替 residential address。',
      '公民身份和身份证明上的姓名不一致时，要带足够的认证 marriage certificate、divorce decree、court order 或其他清单文件，把姓名变化完整连接起来。',
      '申请人必须提供 SSN，但官方 EDL/EID 清单说明无需出示 Social Security card。',
      'DOL 提供 enhanced document tool，以及简体中文和繁体中文 printable checklist；最终材料组合以个人化工具和申请时要求为准。',
      'Temporary EDL 会在离开办公室前签发，但不能用于边境通行；正式 EDL 应按约 2 至 3 周预留邮寄时间。',
      'EDL/EID 可用于国内航班，也可用于从加拿大、墨西哥、百慕大和加勒比经陆路或海路重新入境美国，但不能用于国际航空旅行。',
    ],
    commonMistakes: [
      '只找星标而误以为 WA EDL/EID 不合规；华盛顿州使用美国国旗标记。',
      '非美国公民按 EDL/EID 清单准备；绿卡或工作签证不能满足 EDL/EID 的美国公民资格。',
      '把 standard license 的身份文件组合套用到 EDL/EID，或把 EDL/EID 公民材料要求套到 standard license。',
      '提交照片、普通复印件或未认证副本，而清单没有明确允许该格式。',
      '只带一份地址文件，文件没有 first and last name，或只显示 P.O. Box。',
      '身份和公民文件姓名不一致，却没有带齐连接每次姓名变化的认证文件。',
      '把 vehicle licensing office 当成 driver licensing office，或临近关门才到场而错过 EDL 的 60 分钟受理截止时间。',
      '把 temporary EDL 用于边境通行，或把正式 EDL 当作国际航班旅行证件。',
    ],
    recommendedSteps: [
      '先按用途判断是否需要 EDL/EID：只有驾驶或州内身份证明可选 standard，国内航班可先检查自己是否已有有效护照、绿卡或其他 TSA 接受证件。',
      '确认美国公民资格；不符合 EDL/EID 资格者应选择 standard license / ID，并另用 TSA 接受证件处理联邦用途。',
      '没有 WDL number 时先在 License Express pre-apply，保存以 WDL 开头的号码，用于预约和后续申请。',
      '运行 enhanced document tool，并用官方 printable checklist 复核 citizenship、identity、SSN、两份 residency 和完整姓名链。',
      '预约 driver licensing office；DOL 对 EDL 写明预约优先但非强制，并要求最晚在关门前 60 分钟提交申请。',
      '现场接受 document review 和 in-person interview，拍照并支付对应费用；首次同时申领 EDL 当前为 6 年 $153 或 8 年 $187。',
      '领取 temporary EDL 后当场核对信息，但不要把它用于边境通行；正式卡按约 2 至 3 周预留。',
    ],
    actionLinks: [
      {
        label: 'WA REAL ID 说明',
        url: 'https://dol.wa.gov/id-cards/real-id',
        description: '华盛顿州 REAL ID、EDL/EID 和标准证件差异。',
      },
      {
        label: 'Enhanced Driver License/ID',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
        description: '华盛顿州 Enhanced 证件说明。',
      },
      {
        label: 'EDL 办理指南',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/guide-enhanced-driver-licenses-edl',
        description: 'Washington DOL 对 EDL 身份、公民身份和居住证明的说明。',
      },
      {
        label: 'EDL 申请步骤与中文清单',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/get-enhanced-driver-license-edl',
        description: 'EDL 申请步骤、预约、费用、邮寄时间及简繁中文 printable checklist。',
      },
      {
        label: 'EDL/EID 官方单页材料清单',
        url: 'https://dol.wa.gov/media/pdf/5165/applying-enhanced-washington-license-or-idpdf/download?inline=',
        description: '美国公民身份、本人身份、姓名变化、两份 Washington residency 与文件格式要求。',
      },
      {
        label: 'License Express 预申请',
        url: 'https://dol.wa.gov/pre-apply-online',
        description: '取得 WDL number、开始申请并生成 enhanced 个性化材料清单。',
      },
      {
        label: '驾照与许可入口',
        url: 'https://dol.wa.gov/driver-licenses-and-permits',
        description: '普通驾照、permit、续期和相关服务。',
      },
      {
        label: '身份证明文件',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity',
        description: 'Washington DOL 标准驾照、permit 或 ID 的身份文件和 SSN 说明。',
      },
      {
        label: '续期驾照',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license',
        description: '华盛顿州驾照续期、费用、晚续费和现场续期条件。',
      },
      {
        label: '驾照与证件费用表',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-fees',
        description: 'Standard、EDL/EID、首次申请、续期、补证和测试的当前费用。',
      },
      {
        label: '首次驾照 18+',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18',
        description: '华盛顿州成人首次驾照、临时证和正式卡邮寄说明。',
      },
      {
        label: 'Driver Training / Testing',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing',
        description: '华州 knowledge test、drive skills test、测试地点和学习资料入口。',
      },
      {
        label: 'Do I Need a Test',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
        description: '华州是否需要 knowledge / drive test、考试语言、通过分数和成绩有效期说明。',
      },
      {
        label: 'Moving to Washington',
        url: 'https://dol.wa.gov/moving-washington',
        description: '华州搬入后 30 天换证、车辆注册和新居民入口。',
      },
      {
        label: 'Get WA Driver License',
        url: 'https://dol.wa.gov/moving-washington/get-driver-license',
        description: '华州新居民换证预约、外州证件打孔退回、45 天 temporary license 和邮寄时间说明。',
      },
      {
        label: 'Washington Driver Guides',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides',
        description: 'Washington DOL 多语言 driver guide 和学习资料入口。',
      },
      {
        label: '预约与地点',
        url: 'https://dol.wa.gov/appointments-and-locations',
        description: '查找 DOL 预约和办公室信息。',
      },
      {
        label: '驾照办公室',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices',
        description: '确认 driver licensing office 服务范围。',
      },
      {
        label: '姓名或地址变更',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/update-driver-license-information/change-your-name-or-address-your-driver-license',
        description: 'Washington DOL 驾照或 ID 姓名、地址变更说明。',
      },
    ],
    sources: [
      {
        label: 'WA DOL Enhanced Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
      },
      {
        label: 'WA DOL Guide to Enhanced Driver Licenses',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/guide-enhanced-driver-licenses-edl',
      },
      {
        label: 'WA DOL REAL ID',
        url: 'https://dol.wa.gov/id-cards/real-id',
      },
      {
        label: 'WA DOL Do I Need to Take a Test',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
      },
      {
        label: 'WA DOL Moving to Washington',
        url: 'https://dol.wa.gov/moving-washington',
      },
      {
        label: 'WA DOL Moving to Washington: Get a Driver License',
        url: 'https://dol.wa.gov/moving-washington/get-driver-license',
      },
      {
        label: 'WA DOL Driver Guides',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides',
      },
      {
        label: 'WA DOL Get an Enhanced Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/get-enhanced-driver-license-edl',
      },
      {
        label: 'WA DOL Enhanced License or ID Document Checklist',
        url: 'https://dol.wa.gov/media/pdf/5165/applying-enhanced-washington-license-or-idpdf/download?inline=',
      },
      {
        label: 'WA DOL Pre-apply Online',
        url: 'https://dol.wa.gov/pre-apply-online',
      },
      {
        label: 'WA DOL Driver Licenses and Permits',
        url: 'https://dol.wa.gov/driver-licenses-and-permits',
      },
      {
        label: 'WA DOL Documents for Proof of Identity',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity',
      },
      {
        label: 'WA DOL Appointments and Locations',
        url: 'https://dol.wa.gov/appointments-and-locations',
      },
      {
        label: 'WA DOL Driver Licensing Offices',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices',
      },
      {
        label: 'WA DOL Change Name or Address',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/update-driver-license-information/change-your-name-or-address-your-driver-license',
      },
      {
        label: 'WA DOL Renew Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license',
      },
      {
        label: 'WA DOL Driver Licensing Fees',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-fees',
      },
      {
        label: 'WA DOL First License Ages 18+',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18',
      },
      {
        label: 'WA DOL Driver Training and Testing',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing',
      },
    ],
    relatedTopicSlugs: [
      'real-id-vs-standard-license',
      'airport-travel-after-real-id',
      'document-checklist',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'new-jersey',
    abbr: 'NJ',
    nameEn: 'New Jersey',
    nameZh: '新泽西',
    agency: 'New Jersey Motor Vehicle Commission',
    agencyUrl: 'https://www.nj.gov/mvc/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '新泽西同时签发 Standard driver license / non-driver ID 和带右上角星标的 REAL ID。Standard driver license 仍可驾驶，Standard license / ID 也可作一般身份证明；国内航班安检和部分联邦设施则要使用 REAL ID 或其他联邦接受证件。',
    realIdSummary:
      '新泽西 REAL ID 不是强制办理。已有有效护照或其他联邦检查点接受证件的人可以继续使用 Standard 证件；需要用州证件乘坐国内航班的人，再按 2 份地址证明 + 1 个可核验完整 SSN + 6 个 REAL ID identity points 准备。',
    licenseSummary:
      'Standard license / ID 通常要 6 Points of ID、一份 New Jersey residential address 证明，以及 SSN、ITIN 或无资格号码 affidavit。非英文文件要附 certified translation。搬入新泽西后要在 60 天内或现有 license / registration 到期前完成转入，以较早者为准。',
    appointmentNote:
      '首次 REAL ID 要在 Licensing Center 预约办理。当前 Appointment Wizard 要求未来 3 个月内符合续期资格的人选择 Renewal: License or Non-Driver ID；尚未进入续期窗口的人才选择 REAL ID。外州或外国驾照转入则选择 Transfer From Out of State。',
    editorNotes: [
      '首次 REAL ID 必须现场预约取得；已经签发过 REAL ID 后，符合条件时才可在线或邮寄续期。',
      'NJMVC 当前列出的 Standard NJ license / ID 费用为 $24，REAL ID 为 $35。',
      'Same-Day Online Renewal 会立即续期并提供可打印收据，实体卡通常 2 至 4 周寄到。',
      '即使 renewal form 写着到 agency，多数申请人仍可能符合 online renewal；CDL 或 visa 即将到期者要到 Licensing Center 现场办理。',
      '驾照过期超过 3 年不能直接续期，要按 first-time driver 重新开始。',
      '无论续期或补证是否在 agency 办理，NJMVC 都不再现场打印 license / ID，证件会邮寄。',
      '搬家后一周内要向 MVC 报告地址变化；online address change 会生成即时确认，显示新地址的 duplicate license 为 $11，duplicate registration 为 $5。',
      '首次驾照先预约购买 initial permit，并要在 permit 签发后 2 年内完成 knowledge、vision、practice、road test 和 probationary license 步骤。',
      'Knowledge test 未通过可在 7 天后重考；通过后 permit 才会验证并进入练车阶段。',
      '21 岁以下通常要监督驾驶 6 个月并累计至少 50 小时，其中 10 小时在黑暗时段；21 岁以上通常监督驾驶 3 个月。',
      'Road test 要在 knowledge 和 vision test 通过并完成适用练车期后预约；未通过至少等待 14 天才能重考。',
      '普通 written knowledge test 提供 Chinese (Mandarin) 等 13 种语言；没有对应母语版本时，可在 permit appointment 请求 MVC 安排州合约 interpreter，通常等待 4 至 6 周。',
      '搬入新泽西的有效外州 non-provisional license 持有人通常免 knowledge 和 road tests，但 Hazmat endorsement 仍要 written test；完成转入后要交回外州驾照。',
      '外州 auto、motorcycle 或 CDL transfer permit 当前为 $10，auto license 加 motorcycle endorsement 另加 $5。',
      '美国访客只有在 foreign license 同时配有居住国签发的 International Driving Permit 时，才可按 MVC 页面所述驾驶最多 1 年。',
      '台湾和韩国与新泽西有 Class D 互惠路径，适用于 18 岁以上并满足驾照翻译、身份、NJ residency、SSN 和至少 12 个月 lawful presence 等文件条件的人。',
    ],
    documentHighlights: [
      'REAL ID 使用 2 + 1 + 6：两份 NJ residential address 证明、一个可核验的完整 SSN、以及 primary / secondary 合计 6 个 REAL ID identity points。',
      '地址证明可用官方清单列出的 electronic 或 paper 版本，但 identity 的 6 Points 要用 paper 或 hard copy。',
      '不同地址文件有 6 个月、1 年或 2 年等时效，必须按 Document Selector 对所选文件逐项核对。',
      '完整 SSN 可以由 MVC 电子核验；如果核验失败，要提交显示 full name 和完整 SSN 的 Social Security card、近期 W-2、pay stub 或 1099 等清单文件。',
      'Primary 只能选择一份，secondary 中最多使用两份 1-point 文件，且 REAL ID point values 不等同于 Standard ID。',
      'Identity 文件要是未覆膜原件或带州、市政印章的认证副本并使用英文；非英文文件要附 certified translation。',
      'Primary document 要显示 full legal name，secondary 文件不能与其冲突；现有 MVC、SSN 和 primary document 姓名不匹配时，可能需要认证婚姻、离婚或法院文件连接姓名。',
      'Standard license / ID 与 REAL ID 不同：通常只要一份 residency，号码栏可用 SSN、ITIN 或 affidavit，身份 points 也要按 Standard 清单计算。',
      '申请或续办 permit、driver license 或 non-driver ID 还要完成 BA-208 表。',
    ],
    commonMistakes: [
      '只凑够 6 points，却漏掉两份地址证明或一个可核验的完整 SSN。',
      '沿用 Standard point values 计算 REAL ID，或选择超过一份 Primary、超过两份 1-point secondary。',
      '把手机照片、扫描件或普通复印件当成 identity 文件，或者拿覆膜、缺少签发印章的文件。',
      '把 NJ driver license 和 NJ vehicle registration 同时当作两份地址证明；Document Selector 明确不允许两者组合使用。',
      'primary、SSN 与 MVC 记录姓名冲突，却只带一张无法连接完整姓名变化的 marriage certificate。',
      '未来 3 个月内已符合续期资格，却选择普通 REAL ID appointment 而不是 Renewal appointment。',
      '地址已经变化，却在续期前没有先完成 address change。',
      '外州搬入超过 60 天或等到现有证件先到期，仍未预约 Transfer From Out of State。',
    ],
    recommendedSteps: [
      '先检查现有 NJ license / ID 右上角是否有星标，并判断是否已有有效护照或其他联邦接受证件。',
      '需要 REAL ID 时运行 Document Selector，选齐两份 residency、一个 full SSN 路径和 6 个 REAL ID points，并打印最终清单。',
      '打开 Name Matches 页面，逐项比较 primary、SSN、secondary 和 MVC 记录中的姓名，补齐适用的认证姓名变更文件。',
      '地址变化时先在一周内完成 online address change并保存确认；需要显示新地址的实体卡时再订购 duplicate。',
      '按当前状态选择预约：续期窗口内选 Renewal，窗口外升级选 REAL ID，外州或外国驾照转入选 Transfer From Out of State。',
      '到 Licensing Center 带齐合规 identity hard copies、地址证明、SSN 路径、BA-208 和付款方式，完成拍照及文件核验。',
      '首次 REAL ID 当前费用为 $35；现场不会打印正式卡，应按邮寄交付安排后续出行。',
    ],
    actionLinks: [
      {
        label: 'NJ REAL ID',
        url: 'https://www.nj.gov/mvc/realid/',
        description: '新泽西 REAL ID 官方入口。',
      },
      {
        label: 'REAL ID FAQ',
        url: 'https://www.nj.gov/mvc/realid/faq.html',
        description: 'Standard 与 REAL ID 用途、首次现场办理、续期和 $24 / $35 费用说明。',
      },
      {
        label: '材料选择器',
        url: 'https://www.nj.gov/mvc/realid/selector.html',
        description: '按 2 + 1 + 6 规则选择 REAL ID 材料。',
      },
      {
        label: 'REAL ID 姓名匹配',
        url: 'https://www.nj.gov/mvc/realid/name-matches.html',
        description: 'Primary、secondary、SSN 与 MVC 记录的姓名匹配和改名处理。',
      },
      {
        label: '6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
        description: '新泽西 Standard license/ID 的 6 Points、SSN/ITIN/affidavit 和翻译要求。',
      },
      {
        label: 'Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
        description: '地址变更、续期、补证等线上入口。',
      },
      {
        label: 'License Renewal',
        url: 'https://www.nj.gov/mvc/license/licrenew.htm',
        description: '新泽西驾照线上续期、$24 standard fee、收据和 2-4 周邮寄说明。',
      },
      {
        label: '补证 / Duplicate',
        url: 'https://www.nj.gov/mvc/license/liclost.htm',
        description: '新泽西补证和证件邮寄说明。',
      },
      {
        label: '地址变更',
        url: 'https://www.nj.gov/mvc/drivertopics/addchange.htm',
        description: 'MVC 地址变更说明。',
      },
      {
        label: '地址变更期限与凭证',
        url: 'https://www.nj.gov/mvc/about/addchange.htm',
        description: '一周期限、online confirmation、duplicate 费用和邮寄说明。',
      },
      {
        label: 'Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
        description: '新泽西外州/外国驾照转入、IDP、台湾/韩国互惠、title 和 registration 转入说明。',
      },
      {
        label: '预约向导',
        url: 'https://telegov.njportal.com/njmvc/AppointmentWizard',
        description: '新泽西 MVC 预约入口。',
      },
      {
        label: 'First Driver License',
        url: 'https://www.nj.gov/mvc/license/firstlic.htm',
        description: '新泽西首次驾照、knowledge test、permit 和 GDL 路径。',
      },
      {
        label: 'Knowledge Test',
        url: 'https://www.nj.gov/mvc/license/knowledgetest.htm',
        description: '新泽西 knowledge test、Chinese (Mandarin)、口译安排、CDL/Hazmat 语言限制说明。',
      },
      {
        label: 'Driver Manuals',
        url: 'https://www.nj.gov/mvc/about/manuals.htm',
        description: '新泽西 driver manuals、学习资料和考试准备入口。',
      },
      {
        label: 'Basic Road Test',
        url: 'https://www.nj.gov/mvc/license/roadtest.htm',
        description: '新泽西 road test 材料、陪同驾驶人和车辆要求说明。',
      },
    ],
    sources: [
      {
        label: 'NJ MVC REAL ID',
        url: 'https://www.nj.gov/mvc/realid/',
      },
      {
        label: 'NJ MVC REAL ID FAQ',
        url: 'https://www.nj.gov/mvc/realid/faq.html',
      },
      {
        label: 'NJ MVC REAL ID Document Selector',
        url: 'https://www.nj.gov/mvc/realid/selector.html',
      },
      {
        label: 'NJ MVC REAL ID Name Matches',
        url: 'https://www.nj.gov/mvc/realid/name-matches.html',
      },
      {
        label: 'NJ MVC 6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
      },
      {
        label: 'NJ MVC Knowledge Test',
        url: 'https://www.nj.gov/mvc/license/knowledgetest.htm',
      },
      {
        label: 'NJ MVC Driver Manuals',
        url: 'https://www.nj.gov/mvc/about/manuals.htm',
      },
      {
        label: 'NJ MVC Affidavit of No SSN or ITIN',
        url: 'https://www.nj.gov/mvc/pdf/license/affidavit.pdf',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'NJ MVC License Renewal',
        url: 'https://www.nj.gov/mvc/license/licrenew.htm',
      },
      {
        label: 'NJ MVC Duplicate License',
        url: 'https://www.nj.gov/mvc/license/liclost.htm',
      },
      {
        label: 'NJ MVC Change of Address',
        url: 'https://www.nj.gov/mvc/drivertopics/addchange.htm',
      },
      {
        label: 'NJ MVC Address Change Details',
        url: 'https://www.nj.gov/mvc/about/addchange.htm',
      },
      {
        label: 'NJ MVC Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
      },
      {
        label: 'NJ MVC Appointment Wizard',
        url: 'https://telegov.njportal.com/njmvc/AppointmentWizard',
      },
      {
        label: 'NJ MVC First Driver License',
        url: 'https://www.nj.gov/mvc/license/firstlic.htm',
      },
      {
        label: 'NJ MVC Basic Road Test',
        url: 'https://www.nj.gov/mvc/license/roadtest.htm',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'proof-of-residency',
      'renewal-replacement-address',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
    ],
  },
  {
    id: 'massachusetts',
    abbr: 'MA',
    nameEn: 'Massachusetts',
    nameZh: '马萨诸塞州',
    agency: 'Massachusetts RMV',
    agencyUrl: 'https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '马萨诸塞州先分两条路：Standard Class D/M 驾照不作联邦身份证明，WFMA 允许无法提供 lawful presence 的州居民申请；带星标的 REAL ID 可用于国内航班和部分联邦设施，但要走另一套身份材料和现场核验。',
    realIdSummary:
      '18 岁以上旅客可用 REAL ID 或其他 TSA 接受证件完成国内航班安检，因此已有有效护照的人不一定要升级。申请马州 REAL ID 通常要准备 1 份 lawful presence、1 份完整 9 位 SSN 证明或合格的 SSA Denial Notice 路径、2 份 Massachusetts residency 证明；姓名与 lawful presence 文件不一致时，还要补完整的合法更名文件链。',
    licenseSummary:
      'WFMA 只改变 Standard Class D/M 驾照或 learner’s permit 的身份要求，不覆盖 REAL ID、Standard Mass ID、CDL 或 Liquor ID。无法提供 lawful presence 的申请人仍要证明身份、出生日期和 Massachusetts residency；非英文身份材料须附 certified English translation，并完成视力、permit exam 和 road test 等适用步骤。',
    appointmentNote:
      'REAL ID 可先在 myRMV 开始申请，但仍须预约 RMV Service Center 或会员 AAA branch 核验原件；外州驾照转入也只能先在线填表，最后必须预约到 RMV。多数个人 myRMV 服务现要求 MyMassGov Personal account，首次登录还可能要完成一次身份验证。',
    documentHighlights: [
      '马州 REAL ID 右上角有星标；Standard license / Mass ID 标注不用于联邦身份用途。',
      '首次或升级 REAL ID 通常带 1 份 lawful presence、1 份显示完整 9 位 SSN 的证明、2 份显示姓名和当前 Massachusetts residential address 的住址证明。',
      '住址证明不能只写 P.O. box，必须显示申请人的当前 residential address。',
      '没有 SSN 且符合官方路径时，可使用 60 天内 SSA Denial Notice，并同时提交 non-U.S. passport、visa 和 I-94。',
      'REAL ID 身份文件必须是原件且不可覆膜；当前姓名须与 lawful presence 文件一致，不一致要带 marriage certificate、court document 等合法更名证明。',
      '无法提供 lawful presence 而申请 Standard Class D/M 时，第一份身份文件须是有效外国护照或有效 consular identification；第二份从州法列明的出生证、外国身份证、外国驾照等类别中选。',
      '这两份 WFMA 身份文件合计须包含一张照片和一个出生日期；非英文文件须附 certified English translation。',
      'Standard Mass ID 不是 WFMA Standard driver license，不能照搬后者的 lawful presence 例外。',
      'REAL ID 和 Standard Class D/M driver license 当前同为 $50，选择 REAL ID 本身没有额外卡费。',
    ],
    commonMistakes: [
      '把 Standard Class D/M 驾照与 Standard Mass ID 当成同一套 lawful presence 规则。',
      '已有有效护照仍以为国内航班必须再办 REAL ID。',
      '只带一份 Massachusetts residency，或住址文件只显示 P.O. box。',
      '拿手机照片、普通复印件或覆膜证件代替 REAL ID 原件。',
      'lawful presence、SSN 与现有 RMV 记录姓名不一致，却没有带完整的更名证明链。',
      '在线开始 REAL ID 后，以为可以跳过 Service Center 或 AAA 的现场核验。',
      '地址已经变化，却在续期或补证前没有先更新 RMV 记录。',
      '把 IDP 当成可转换的驾照，或当成脱离原外国驾照也能单独驾驶的证件。',
      '按统一的 30 天记录期限准备外国驾照 conversion，忽略 Taiwan 和 South Korea 等路径的 60 天规则。',
    ],
    recommendedSteps: [
      '先决定用途：有 TSA 接受的护照等证件且只需驾驶，可继续选择 Standard；需要州证件用于国内航班或部分联邦设施，再走 REAL ID。',
      '申请 Standard Class D/M 且无法提供 lawful presence 时，打开 WFMA / Standard checklist，按两份身份与出生日期文件、马州 residency 和翻译要求备件。',
      '申请 REAL ID 时先在 myRMV 填表，再用 checklist 选定 lawful presence、SSN / Denial Notice、两份 residency 和姓名变更文件。',
      '预约 RMV Service Center；AAA 会员可核对 AAA branch 资格，现场只带原件和符合要求的认证材料。',
      '续期先看窗口与资格：到期前 1 年可办，limited-term、无 SSN 或升级 REAL ID 等路径要按页面转现场。',
      '搬家后 30 天内先更新 residential 和 mailing address，再决定是否花 $25 订购显示新地址的卡。',
      '首次驾照先办 $30 learner permit，选择简体或繁体 Mandarin 等考试语言；通过 permit 后再安排 $35 road test。',
      '外国驾照先区分 visitor、协议 conversion 与无协议首次申请三条路，并按国家页面核对 30 天或 60 天 driving record、翻译和交回原证件要求。',
      '外州驾照转入先在线完成申请并预约 Service Center；原证有效或过期不足 1 年通常免 written / road test。',
    ],
    editorNotes: [
      'WFMA 自 2023-07-01 起允许无法提供 lawful presence 的马州居民申请 Standard Class D/M 驾照，但仍须满足身份、出生日期、居住和考试要求。',
      'WFMA 不适用于 REAL ID、Standard Mass ID、CDL 或 Liquor ID；这些证件仍按各自清单核对 lawful presence。',
      'Standard Class D/M 驾照和 REAL ID Class D/M 当前均为 $50，Standard / REAL Mass ID 为 $25；learner permit 为 $30、road test 为 $35、replacement 为 $25。',
      'Class D/M 驾照可在到期前 1 年内续期，也可在过期后 2 年内续；超过 2 年要重新参加 learner’s permit exam 和 road test。',
      '大多数 Standard 或 REAL ID 驾照可在线续期并在 10 至 14 个工作日寄到；limited-term 驾照续期和没有 SSN 的续期申请须现场办理。',
      '地址变化须在 30 天内通知 RMV；只改记录不必换卡，需要新地址实体卡时 replacement 费用为 $25。',
      '遗失驾照最快可在线补办，也可电话申请；RMV Service Center 当前不办理普通 replacement，AAA 会员可按页面预约，实体卡通常 10 至 14 天寄到。',
      'Class D learner’s permit 最低申请年龄为 16 岁，未满 18 岁须有合格成年人书面同意；考试 25 分钟 25 题，答对 18 题通过，permit fee 为 $30。',
      'Class D/M permit exam 提供 37 种语言，包括简体和繁体 Mandarin；外语 oral exam 要事先联系 RMV Interpreter Services。',
      'Road test 可提前最多 60 天排期，费用为 $35；通过后如未预付费用，要在 60 个日历日内付款并完成领证，否则须自费重考。',
      '有效或过期不足 1 年的外州驾照转入通常免 written 和 road test；过期超过 1 年要做 written、road 和 vision test，Class D 转入费为 $115。',
      '外国访客须年满 16 岁并随身携带有效原驾照；证件不是英文且没有英文翻译时，还要携带 IDP 或 RMV 接受的英文翻译，IDP 本身不授予驾驶资格。',
      '外国驾照只有 Canada、Mexico、U.S. Territories、South Korea、Germany、France 和 Taiwan 等 RMV 列出的协议地区可走 conversion；其他来源地的马州居民要按首次申请路径参加 permit exam 和 road test。',
      '转换材料必须按来源地核对，不能统一写成 30 天：Germany 和 France 等页面要求部分记录 30 天内，South Korea 和 Taiwan 的指定记录可为 60 天内。',
      'Taiwan conversion 适用于年满 18 岁、持有效且未暂停或撤销的台湾驾照并居住马州的人；要带身份与 SSN / Denial Notice 路径、台湾驾照及翻译、60 天内 certified driving record 及翻译、申请表和费用，并交回台湾驾照。',
      '以 visa 证明身份的 Taiwan 或 South Korea conversion 申请人，官方页要求 authorized stay 至少 12 个月。',
      '多数个人 myRMV 线上服务现用 MyMassGov Personal account；首次关联时要输入生日、姓氏、马州证件号以及 SSN 后四位、foreign passport number 或 Consular ID 之一，并可能需要 Letter ID。',
    ],
    actionLinks: [
      {
        label: '身份材料要求',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
        description: '按 REAL ID、Standard Class D/M、Mass ID、permit 或 CDL 查看对应清单。',
      },
      {
        label: 'REAL ID in Massachusetts',
        url: 'https://www.mass.gov/info-details/real-id-in-massachusetts',
        description: '马州 REAL ID 用途、线上预填、原件要求和现场预约说明。',
      },
      {
        label: 'WFMA / Standard license 法律规则',
        url: 'https://www.mass.gov/info-details/mass-general-laws-c90-ss-8',
        description: '无法提供 lawful presence 时申请 Standard Class D/M 的身份、出生日期和翻译规则。',
      },
      {
        label: '续期驾照',
        url: 'https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license',
        description: '续期窗口、线上或现场资格、$50 费用和 10 至 14 个工作日邮寄说明。',
      },
      {
        label: '补办驾照',
        url: 'https://www.mass.gov/how-to/replace-your-drivers-license',
        description: '遗失或被盗驾照的线上、电话、AAA 路径和 $25 费用。',
      },
      {
        label: '地址变更',
        url: 'https://www.mass.gov/how-to/change-your-address-with-the-rmv',
        description: '30 天期限、residential / mailing address 和是否换卡说明。',
      },
      {
        label: 'First-time Driver',
        url: 'https://www.mass.gov/guides/first-time-driver-start-here',
        description: '马州首次驾照、learner permit、road test 和年龄路径总览。',
      },
      {
        label: 'Class D Learner Permit',
        url: 'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit',
        description: 'permit 申请、25 题考试、37 种语言、线上考试和 oral exam 请求说明。',
      },
      {
        label: 'Schedule Road Test',
        url: 'https://www.mass.gov/how-to/schedule-your-road-test',
        description: 'road test 排期、车辆和 sponsor 要求、费用及通过后领证期限。',
      },
      {
        label: '外州驾照转入',
        url: 'https://www.mass.gov/how-to/transfer-your-real-or-standard-out-of-state-drivers-or-motorcycle-license-to-massachusetts',
        description: '外州驾照预约转入、测试豁免、$115 费用和邮寄说明。',
      },
      {
        label: 'Transfer Foreign License',
        url: 'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country',
        description: '协议国家与地区、$115 conversion 和非协议来源地的首次申请路径。',
      },
      {
        label: 'Foreign License Conversion',
        url: 'https://www.mass.gov/info-details/information-for-converting-certain-foreign-drivers-licenses',
        description: 'Taiwan、South Korea 等来源地的记录期限、翻译和交回原证件要求。',
      },
      {
        label: '外国驾照在马州驾驶',
        url: 'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license',
        description: '访客年龄、有效原驾照、IDP 作为翻译辅助和驾驶类别规则。',
      },
      {
        label: 'RMV Translated Documents',
        url: 'https://www.mass.gov/lists/rmv-translated-documents',
        description: 'Massachusetts RMV 多语言材料、中文译文和 learner permit 说明入口。',
      },
      {
        label: 'RMV 费用表',
        url: 'https://www.mass.gov/info-details/massachusetts-registry-of-motor-vehicles-fees',
        description: 'Massachusetts RMV 驾照、ID、permit、road test、补证和转入费用表。',
      },
      {
        label: 'MyRMV',
        url: 'https://atlas-myrmv.massdot.state.ma.us/myrmv/_/',
        description: '马州 RMV 线上服务入口。',
      },
      {
        label: 'MyMassGov 登录说明',
        url: 'https://www.mass.gov/info-details/mymassgov-for-myrmv-services',
        description: '个人 myRMV 账户关联、一次性身份验证和 Letter ID 说明。',
      },
    ],
    sources: [
      {
        label: 'Massachusetts Identification Requirements',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
      },
      {
        label: 'REAL ID in Massachusetts',
        url: 'https://www.mass.gov/info-details/real-id-in-massachusetts',
      },
      {
        label: 'REAL ID Documents Checklist',
        url: 'https://www.mass.gov/doc/real-id-documents-checklist/download?os=fdf',
      },
      {
        label: 'Mass. General Laws c.90 § 8',
        url: 'https://www.mass.gov/info-details/mass-general-laws-c90-ss-8',
      },
      {
        label: 'Massachusetts Driver’s Manual',
        url: 'https://www.mass.gov/doc/english-drivers-manual/download?sync=true',
      },
      {
        label: 'Renew your REAL or standard Class D/M license',
        url: 'https://www.mass.gov/how-to/renew-your-real-or-standard-passenger-class-d-or-motorcycle-class-m-drivers-license',
      },
      {
        label: 'Replace your driver’s license',
        url: 'https://www.mass.gov/how-to/replace-your-drivers-license',
      },
      {
        label: 'Change your address with the RMV',
        url: 'https://www.mass.gov/how-to/change-your-address-with-the-rmv',
      },
      {
        label: 'Mass.gov Class D Learner Permit',
        url: 'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit',
      },
      {
        label: 'Mass.gov First Time Driver',
        url: 'https://www.mass.gov/guides/first-time-driver-start-here',
      },
      {
        label: 'Mass.gov Schedule Your Road Test',
        url: 'https://www.mass.gov/how-to/schedule-your-road-test',
      },
      {
        label: 'Mass.gov Out-of-State License Transfer',
        url: 'https://www.mass.gov/how-to/transfer-your-real-or-standard-out-of-state-drivers-or-motorcycle-license-to-massachusetts',
      },
      {
        label: 'Mass.gov Transfer Foreign Driver License',
        url: 'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country',
      },
      {
        label: 'Mass.gov Foreign License Conversion',
        url: 'https://www.mass.gov/info-details/information-for-converting-certain-foreign-drivers-licenses',
      },
      {
        label: 'Mass.gov Driving on a Foreign License',
        url: 'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license',
      },
      {
        label: 'Mass.gov RMV Translated Documents',
        url: 'https://www.mass.gov/lists/rmv-translated-documents',
      },
      {
        label: 'Massachusetts RMV Fees',
        url: 'https://www.mass.gov/info-details/massachusetts-registry-of-motor-vehicles-fees',
      },
      {
        label: 'MyMassGov for myRMV Services',
        url: 'https://www.mass.gov/info-details/mymassgov-for-myrmv-services',
      },
    ],
    relatedTopicSlugs: [
      'document-checklist',
      'name-change-chain',
      'ssn-and-itin',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'illinois',
    abbr: 'IL',
    nameEn: 'Illinois',
    nameZh: '伊利诺伊州',
    agency: 'Illinois Secretary of State',
    agencyUrl: 'https://www.ilsos.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '伊利诺伊州先分 Standard 与 REAL ID：Standard license 可用于驾驶，移民申请路径自 2024-07-01 起已由 TVDL 改为四年 Standard license，并标注 Federal Limits Apply；REAL ID 可用于国内航班和受限联邦设施，但首次申请必须按 A/B/C/D 材料组现场办理。',
    realIdSummary:
      '首次申请 Illinois REAL ID 要准备一份 Group A written signature、一份 Group B date of birth / lawful status、一份 Group C 完整 SSN，以及两份 Group D Illinois residency。即使已经持有 Standard Illinois license / ID，第一次升级 REAL ID 仍按 first-time REAL ID 处理。',
    licenseSummary:
      '走 VISA 或 NONVISA Standard credential 路径且当时无资格取得 SSN 的人，官方文件页说明可不提交 Group C，而是在现场签署 ineligibility declaration；该声明只解决这条申请路径的 Group C 栏，不能据此认定自己已满足 REAL ID。REAL ID 仍要按实时清单另行核对 lawful status、SSN 和两份地址材料。搬入伊州后通常有 90 天取得 Illinois credential：有效外州驾照转入通常只做 vision test，外国驾照转入则要 vision、written 和 road exams。',
    appointmentNote:
      'Chicago REAL ID Supercenter 已延长开放至 2026 年底，工作日 7:30–17:00 接受 walk-in；其他 full-service DMV 有些必须预约，应先查 Facility Finder。线上续期只适用于收到 renewal letter 和 PIN / authorization number 的申请人，升级 REAL ID 或需要考试、medical / vision report 时必须到 DMV。',
    documentHighlights: [
      'First-time REAL ID 要一份 Group A、一份 Group B、一份 Group C 和两份 Group D；一份文件可以同时满足多个 group，但仍要覆盖全部要求。',
      'Group B 的 REAL ID 文件要证明 full legal name、date of birth 和 citizenship / lawful status。',
      'Group C 文件要显示姓名和完整 SSN；只有持有效 Illinois license / ID 且此前已向州里提交并核验 Social Security card 时，REAL ID 页面才说明可免再次出示。',
      '两份 Group D 要显示 full name 和 current Illinois residence address；银行账单、utility bill 等 printed electronic documents 可以使用，但 account number 要清楚可见。',
      '还要带一份 written signature 证明，例如当前 non-REAL ID license、信用卡或借记卡、passport 或 canceled check。',
      '所有材料要在可接受时限内有效，REAL ID 只接受 original hard copies，不接受 photocopies。',
      '现用姓名与 birth certificate 或 passport 不一致时，要用 certified marriage certificate、adoption document、civil union document 或 certified name change document 接起姓名链。',
      'VISA / NONVISA Standard credential 的无 SSN declaration 只解决该路径的 Group C 栏；是否符合 REAL ID 仍要另按 REAL ID 页面与实时清单核对 lawful status、SSN 和其他材料。',
      '当前 Standard credential 仍可驾驶；没有 REAL ID 但持 passport 等 TSA 接受证件的人，也不必只为国内航班升级。',
    ],
    commonMistakes: [
      '还按旧 TVDL 路径准备，而没有查看当前 VISA / NONVISA Standard license 规则。',
      '已有 Standard Illinois license 就以为第一次 REAL ID 不再需要完整 A/B/C/D 材料。',
      '只带一份 Illinois residency，或把手机里的电子账单当作可直接展示的文件而没有打印。',
      '为了遮挡隐私把 residency document 的 account number 涂掉。',
      '拿 photocopy 代替 REAL ID original hard copy。',
      '只带一张改名文件，无法把 birth name 连到 current legal name。',
      '只看到 VISA / NONVISA 的 Group C declaration，就认定它自动等同于 REAL ID 的 SSN 豁免。',
      '尝试用普通 online renewal 升级 REAL ID。',
      '拿 DMV 当天发的 temporary paper REAL ID 去机场；TSA 明确不接受 temporary driver’s license 作为有效身份件。',
      '地址变化只更新 driver license / ID file，却忘了 vehicle registration 是另一个系统。',
      '从外国搬入时误以为有效外国驾照可像有效外州驾照一样免 written 和 road exams。',
    ],
    recommendedSteps: [
      '先判断用途：有 passport 等 TSA 接受证件且只需驾驶，可继续用 Standard；需要州证件用于国内航班或受限联邦设施，再办 REAL ID。',
      '走 Standard VISA / NONVISA 路径时，先用 live Document Requirements 和 Acceptable Identification Documents 确认 A/B/D 以及无 SSN declaration。',
      '办 REAL ID 时按 A/B/C/D 逐组定好文件，再核对姓名链、材料时限、原件和打印要求。',
      '选择地点：Chicago Supercenter 在 2026 年底前为工作日 walk-in，其他 DMV 先用 Facility Finder 看服务项目和 appointment 标记。',
      '出行前至少预留一个月申请；现场先拿 temporary paper credential，永久卡通常在 15 个工作日内邮寄。',
      '续期先找 renewal letter 上的 PIN / authorization number；想升级 REAL ID 或被要求考试、medical / vision report 时改走现场。',
      '搬家后 10 天内分别更新 driver license / ID 和 vehicle registration record；需要显示新地址的卡，再到 DMV 申请 corrected credential。',
      '新居民在 90 天窗口内办理：外州有效驾照通常只做 vision test，外国驾照准备 vision、written、road exam 和车辆保险证明。',
      '18–20 岁首次申请且从未完成认可 driver education 的人，先完成州认证的 6-hour Adult Driver Education Course。',
    ],
    editorNotes: [
      '自 2024-07-01 起，Illinois 已用四年 Standard driver’s license 取代面向 undocumented immigrants 和部分无 SSN 非公民的 TVDL；新卡标注 Federal Limits Apply。',
      '第一张 REAL ID 的材料结构是 Group A written signature、Group B date of birth / lawful status、Group C full SSN 和两份 Group D residency。',
      'REAL ID 与同类传统 license / ID 的卡费相同；当前 basic driver’s license 为 $30，18–20 岁为 $5，Class D instruction permit 为 $20，corrected / duplicate driver’s license 为 $5。',
      '在线续期要求 renewal letter 上的 PIN 或 authorization number；升级 REAL ID、需要 written / road test、更新 medical / vision report 或加入 P.O. Box 时不能线上续。',
      '线上续期、duplicate 和 REAL ID 正式卡通常在 15 个工作日内寄到。',
      '线上 duplicate 不适用于 suspended / revoked / canceled credential、30 天内到期、此前线上改址、需要改信息或已达到补证次数上限等情况，而且不会提供 temporary credential。',
      '地址变化后 10 天内必须通知 Secretary of State；driver license / ID 与 vehicle registration 要分别更新，线上改记录免费，但显示新地址的实体卡要现场办理并支付适用费用。',
      '从外州搬入通常有 90 天办理 Illinois license，有效外州驾照一般只需 vision test；从外国搬入也有 90 天，但要参加 vision、written 和 road exams，并提供保险证明。',
      '18–20 岁首次申请且未上过认可 driver education 的人必须先完成至少 6 小时的州认证 Adult Driver Education Course，再做 vision、written 和 road tests。',
      '15–17 岁 instruction permit 申请人要在认可 driver education 中就读或距开课 30 天内；未满 18 岁的 permit 有效两年，并通常要持有至少 9 个月。',
      'Illinois Class D written test 至少 35 题，答对 80% 才通过；非 CDL 申请人可按可用语言或口试 / interpreter 规则向 facility 询问，CDL knowledge test 规则另行处理。',
      '从 2026-07-01 起，单纯因年龄触发的 mandatory road test 起点由 79 岁提高到 87 岁；81–86 岁 license 通常两年有效，87 岁及以上每年续期。',
      'Chicago REAL ID Supercenter 位于 191 N. Clark St.，已延长至 2026 年底，工作日 7:30–17:00 walk-in；州内许多 Driver Services location 仍标注 appointment required。',
      'REAL ID 申请现场发 temporary paper credential，永久卡通常 15 个工作日内邮寄；TSA 的接受证件页明确说明 temporary driver’s license 不是可接受身份证件。',
    ],
    accessStatus: {
      label: '待普通浏览器复核',
      tone: 'risk',
      note: 'Illinois Secretary of State 官方域名在自动化检查和本环境普通浏览器点验中都返回 Access Denied。办理前仍需从普通美国用户浏览器复测；当前可先从 USA.gov 州机动车服务目录选择 Illinois。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    actionLinks: [
      {
        label: 'Illinois REAL ID',
        url: 'https://www.ilsos.gov/content/realid/us/en.html',
        description: 'REAL ID 材料、Chicago Supercenter、邮寄和姓名变化说明。',
      },
      {
        label: 'Document Requirements',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card.html',
        description: 'Standard、REAL ID、first-time、renewal、corrected 和 duplicate 的 A/B/C/D 组合。',
      },
      {
        label: 'Acceptable Identification',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card/acceptable-identification-documents.html',
        description: 'Group A/B/C/D 可用文件、有效期限、SSN 和 VISA / NONVISA 规则。',
      },
      {
        label: '材料交互清单',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/accept-id-checklist.html',
        description: '按 REAL ID、Standard、permit、改名改址或补证生成个人清单。',
      },
      {
        label: 'Non-Citizen / 原 TVDL 说明',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf',
        description: 'TVDL 取消后 undocumented 和无 SSN 非公民申请 Standard credential 的说明。',
      },
      {
        label: '线上续期',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/renewonline.html',
        description: 'PIN / authorization number、线上排除情形和 15 个工作日邮寄说明。',
      },
      {
        label: '补办驾照 / ID',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/duplicate-drivers-license-or-id-card.html',
        description: '线上 duplicate 资格、限制、临时证件和邮寄说明。',
      },
      {
        label: '地址变更',
        url: 'https://apps.ilsos.gov/addrchange/?s=1&vm=r',
        description: '10 天期限，以及 license / ID 与 vehicle registration 分别更新的入口。',
      },
      {
        label: '新居民指南',
        url: 'https://www.ilsos.gov/services/newresidents.html',
        description: '外州和外国搬入的 90 天期限、测试差异和材料提示。',
      },
      {
        label: 'Instruction Permit',
        url: 'https://www.ilsos.gov/departments/drivers/driver-education/instructpermit.html',
        description: 'permit 年龄、driver education、测试、有效期和监督驾驶规则。',
      },
      {
        label: 'Adult Driver Education',
        url: 'https://www.ilsos.gov/departments/drivers/driver-education/ade.html',
        description: '18–20 岁首次申请人的 6-hour course 资格与后续测试。',
      },
      {
        label: 'Rules of the Road 2026',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_a112.pdf',
        description: '当前 Illinois 驾驶手册、考试、车辆和驾驶规则。',
      },
      {
        label: 'Driver License Information',
        url: 'https://www.ilsos.gov/departments/drivers/drivers_license/drlicid.html',
        description: '续期期限、年龄、corrected credential 和申请说明。',
      },
      {
        label: 'Driver License Fees',
        url: 'https://www.ilsos.gov/departments/drivers/basicfees.html',
        description: '驾照、permit、duplicate、corrected 和 ID 当前费用。',
      },
      {
        label: 'DMV Appointments',
        url: 'https://www.ilsos.gov/departments/drivers/appointments.html',
        description: 'Illinois DMV 预约与管理入口。',
      },
      {
        label: 'Facility Finder',
        url: 'https://apps.ilsos.gov/facilityfinder/facility?command=map',
        description: '按城市、ZIP 和具体业务筛选 DMV 与预约要求。',
      },
      {
        label: 'USA.gov 州机动车服务目录',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: '如果 Illinois Secretary of State 官方页被拦截，可从 USA.gov 选择 Illinois 后进入官方机动车服务入口。',
      },
    ],
    sources: [
      {
        label: 'Illinois REAL ID',
        url: 'https://www.ilsos.gov/content/realid/us/en.html',
      },
      {
        label: 'Illinois Document Requirements',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card.html',
      },
      {
        label: 'Illinois Acceptable Identification Documents',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/document-requirements-to-obtain-drivers-license-or-state-id-card/acceptable-identification-documents.html',
      },
      {
        label: 'Illinois Credential Checklist',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/accept-id-checklist.html',
      },
      {
        label: 'Non-Citizen and Former TVDL Information',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf',
      },
      {
        label: 'Illinois Standard License Replaced TVDL',
        url: 'https://www.ilsos.gov/content/dam/news/2024/july/240701d1.pdf',
      },
      {
        label: 'Illinois Driver License Renewal',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/renewonline.html',
      },
      {
        label: 'Illinois Duplicate License or ID',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/duplicate-drivers-license-or-id-card.html',
      },
      {
        label: 'Illinois Address Change',
        url: 'https://apps.ilsos.gov/addrchange/?s=1&vm=r',
      },
      {
        label: 'Illinois New Resident Guide',
        url: 'https://www.ilsos.gov/services/newresidents.html',
      },
      {
        label: 'Illinois Instruction Permit Requirements',
        url: 'https://www.ilsos.gov/departments/drivers/driver-education/instructpermit.html',
      },
      {
        label: 'Illinois Adult Driver Education',
        url: 'https://www.ilsos.gov/departments/drivers/driver-education/ade.html',
      },
      {
        label: 'Illinois Rules of the Road 2026',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_a112.pdf',
      },
      {
        label: 'Illinois Driver License Information',
        url: 'https://www.ilsos.gov/departments/drivers/drivers_license/drlicid.html',
      },
      {
        label: 'Illinois Driver License Fees',
        url: 'https://www.ilsos.gov/departments/drivers/basicfees.html',
      },
      {
        label: 'Illinois DMV Appointments',
        url: 'https://www.ilsos.gov/departments/drivers/appointments.html',
      },
      {
        label: 'Illinois DMV Facility Finder',
        url: 'https://apps.ilsos.gov/facilityfinder/facility?command=map',
      },
      {
        label: 'Illinois Road Safety and Fairness Act Update',
        url: 'https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedTopicSlugs: [
      'document-checklist',
      'real-id-vs-standard-license',
      'renewal-replacement-address',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
    ],
  },
  {
    id: 'pennsylvania',
    abbr: 'PA',
    nameEn: 'Pennsylvania',
    nameZh: '宾夕法尼亚州',
    agency: 'PennDOT Driver and Vehicle Services',
    agencyUrl: 'https://www.pa.gov/agencies/dmv',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '宾州先回答三个问题：是否需要用州证件完成联邦身份用途、PennDOT 是否已确认材料在档、是否需要当天拿卡。Standard license 仍可驾驶；已有 passport 等联邦接受证件的人不必只为国内航班升级；只有收到 PennDOT 预验证通过确认的人才能线上订购 REAL ID。',
    realIdSummary:
      '多数首次 Pennsylvania REAL ID 申请人要带一份 identity / lawful status、一份符合本人类别的 SSN 证明、两份 physical Pennsylvania residency 文件，以及适用的完整姓名变更链。预验证是在 PennDOT 旧记录里人工查档，不是上传证件；未获确认、非美国公民和 REAL ID CDL 申请人要按对应页面现场办理。',
    licenseSummary:
      '外州非商业驾照新居民要在建立 Pennsylvania residency 后 60 天内现场换证，交回仍有效或过期不超过 6 个月的外州驾照，完成 DL-180R、vision test 和身份材料。持有效外国驾照的合格访客可从入境美国起最多驾驶一年或到外国驾照到期，以较早者为准；IDP 只是翻译，不能单独驾驶。',
    appointmentNote:
      'Same-Day REAL ID Centers 当前周二至周六 8:30–16:15 开放，实时核验并当天签发；普通 Driver License Center 也能核验材料，但卡片在 15 个工作日内邮寄。Road test 要从官方 scheduling service 预约；其他业务先用 location finder 核对地点、营业日和服务。',
    editorNotes: [
      '首次 REAL ID 收一次性 $30 REAL ID fee，再加适用的普通 renewal fee；当前四年 non-commercial renewal 为 $39.50，因此官方示例合计 $69.50。',
      '首次 REAL ID 通常把当前证件剩余期限再加四年；以后续期默认继续签发 REAL ID，除非选择 opt out，并且不再收额外 REAL ID fee。',
      '当前统一费用页列出 initial permit + four-year license $45.50、四年续期 $39.50、65 岁以上可选两年续期 $27.50、duplicate / replacement license $42.50。',
      'PennDOT 非公民 REAL ID 页面的 temporary-status 段落仍显示 $30.50 duplicate fee，而 Payments and Fees 页面列出 duplicate / replacement license $42.50，两份官方页面金额不一致；本站不把 $30.50 当作当前报价，并要求付款前同时查看实时费用页和交易金额。',
      '2003 年 9 月后首次取得 PA license、permit 或 photo ID 只代表可能有材料在档；预验证由 PennDOT 人工检查，最多可用 15 个工作日，收到通过确认后才可线上订购。',
      'PennDOT 明确不接受在家上传 REAL ID 文件，并提示声称可上传证件的网站属于欺诈风险；不符合预验证的人要携带原件或认证副本现场核验。',
      'Same-Day REAL ID Centers 当前周二至周六 8:30–16:15 营业；普通 Driver License Center 核验后，REAL ID 在 15 个工作日内邮寄。',
      '普通线上续期完成后 camera card 通常在 14 天内寄到，申请人还要拿 camera card 到 Photo License Center 拍照取新证；邮寄或现场续期的 camera card 通常在申请处理后 7 至 10 个工作日到达。',
      '有照片与签名在档时可在线申请 duplicate；现场申请会先给 15 天有效的 interim license，当前 duplicate / replacement license 费用为 $42.50。',
      '搬家后 15 天内要通知 PennDOT，driver license / ID 与 vehicle registration 都要更新；非商业驾驶人线上改址免费，约 10 天收到必须随证携带的 update card。',
      '新居民有 60 天换 PA non-commercial license，但车辆 title / registration 是 20 天期限，且车辆业务通常先要有效 Pennsylvania identification。',
      '符合条件的外国驾照持有人可驾驶到入境美国满一年或外国驾照到期，以较早者为准；IDP 非必需但官方强烈建议，并且必须与原驾照一起使用。',
      'France、Germany、Korea 和 Taiwan 的有效 non-commercial license 有互惠转入路径，可免 knowledge 和 road tests，但仍要做 vision test。',
      '普通 knowledge test 有 18 道选择题，答对 15 题通过；所有 Driver License Centers 可按要求提供 written 或 audio test，并包含 Mandarin。',
      '未满 18 岁申请人取得 permit 后要至少等待 6 个月，并完成 65 小时练车，其中至少 10 小时夜间、5 小时恶劣天气；每张 permit 有 3 次 road test 机会。',
      'PennDOT Driver License Centers 接受 payment card、check 或 money order，但不收现金；Riverfront Office Center Customer Counter 是单列的现金例外。',
    ],
    documentHighlights: [
      '即使已经持有 PA driver’s license 或 ID，首次 REAL ID 仍要覆盖全部文件组；身份与 lawful-status 文件必须是 original 或 certified copy，普通 photocopy 不接受。',
      '美国公民常用 identity 文件包括政府签发并带 raised seal 的出生证、有效美国 passport / passport card、citizenship 或 naturalization certificate。',
      '通用 REAL ID 清单的 SSN 栏接受 Social Security card、W-2、SSA-1099、non-SSA-1099 或显示完整号码的 pay stub；文件要用 current legal name 并显示完整 9 位 SSN。',
      '没有 SSN 时，通用清单要求 original SSA ineligibility letter；lawfully present non-U.S. citizen 还要按专页核对原始 Social Security card 或 ineligibility letter 及移民文件，不能只套用美国公民示例。',
      '两份 residency 要是显示 Pennsylvania address 的 physical documents，而不是电子展示；例子包括 PA credential、vehicle registration、auto insurance、utility bill、W-2 / pay stub、tax record、lease、mortgage 或经过 USPS 投递的邮件。',
      'passport 已显示 current legal name 时，PennDOT 不要求额外姓名变更文件；否则要用 certified marriage certificate、court order 或 amended birth certificate 串起全部变化，多次婚姻通常要逐段连接。',
      '2003 年 9 月后首次取得 PA credential、个人资料未变且与 PennDOT 记录一致的人，可以申请 pre-verification；它只检查既有档案，不接受扫描或上传新文件。',
      'Standard non-REAL ID 的“没有 Social Security card”替代材料有单独页面，明确不适用于 REAL ID，不能把两个清单混用。',
      '外州驾照转入要带 identity、Pennsylvania residency、Social Security card 和 DL-180R；现有外州驾照要交回，并且必须仍有效或过期不超过 6 个月。',
      '非美国公民的移民文件必须反映 current name；temporary immigration status 的首张 REAL ID 有效期会跟随移民文件到期日。',
    ],
    commonMistakes: [
      '把“2003 年 9 月后首次拿 PA credential”理解成已经 pre-verified，没有等 PennDOT 的通过确认。',
      '向声称能上传 REAL ID 证件的网站提交出生证、SSN 或移民文件。',
      '已有普通 PA license 就以为首次 REAL ID 可以免带身份、SSN 和两份地址文件。',
      '拿手机里的电子账单代替 PennDOT 要求的 two physical residency documents。',
      'SSN 文件只显示后四位，或姓名仍是改名前版本。',
      '非美国公民只看通用清单，没有核对 non-U.S. citizen 页面要求的 Social Security card / SSA letter 和移民文件。',
      '多次改名只带最近一张 marriage certificate，无法连接出生证姓名到 current legal name。',
      'non-U.S. citizen 或 REAL ID CDL holder 尝试走普通 online pre-verification 路径。',
      '到普通 Driver License Center 后误以为当天一定拿到 REAL ID；same-day issuance 只在指定 REAL ID Centers。',
      '把“当前 license 剩余期限 + 4 年”读成首张 REAL ID 只从申请日算固定四年。',
      '完成普通 online renewal 后不等 camera card，也没有去 Photo License Center 完成照片步骤。',
      '搬家只更新 license / ID，却漏掉 vehicle registration，或没有随身携带免费 address update card。',
      '把 IDP 当成独立驾照，或在入境满一年、外国驾照过期后继续依赖外国驾照驾驶。',
      '用过期超过 6 个月的外州驾照直接换证，忽略此时要重新走 Pennsylvania learner permit 和考试路径。',
    ],
    recommendedSteps: [
      '先决定是否需要 REAL ID：有有效 passport、military ID 或其他 TSA 接受证件的人，可继续用 Standard license 驾驶。',
      '符合 2003 年 9 月后首次取得 PA credential、资料未变等条件时，先提交 pre-verification，并预留最多 15 个工作日等 PennDOT 确认。',
      '没有通过确认或不符合资格时，按 identity / lawful status、SSN、two physical residency 和 name-change chain 四栏准备 original / certified documents。',
      '非美国公民先打开专用 REAL ID 页面，按 current immigration status 核对 identity、Social Security status、两份 residency 和证件有效期。',
      '按时效选地点：需要当天拿卡去指定 Same-Day REAL ID Center；可等邮寄则到普通 Driver License Center，预留 15 个工作日。',
      '付款前同时核对 $30 one-time REAL ID fee 与当前 renewal / duplicate fee；遇到官方页面金额冲突，以实时费用页和交易报价重新确认。',
      '普通续期先判断线上资格并预留 camera card + Photo License Center 步骤；补证先确认 PennDOT 是否已有 photo 和 signature。',
      '搬家后 15 天内分别更新 driver credential 和 vehicle registration；收到免费 update card 后与原证一起携带。',
      '外州新居民在 60 天内到 Driver License Center 交回有效或过期不超过 6 个月的外州证，完成 DL-180R、vision 和材料核验；有车的人同时盯住 20 天 title / registration 期限。',
      '首次驾照申请人先让 health care provider 完成 DL-180；未满 18 岁补 DL-180TD、6 个月等待与 65 小时练车，再预约 road test。',
      '持外国驾照的人先区分访客驾驶与居民换证；France、Germany、Korea 或 Taiwan 驾照申请互惠转入时，仍要按 PennDOT 现场确认资格并完成 vision test。',
    ],
    actionLinks: [
      {
        label: 'PennDOT REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id',
        description: '宾州 REAL ID 用途、办理分流、费用和时效。',
      },
      {
        label: 'Apply for REAL ID',
        url: 'https://www.pa.gov/services/dmv/apply-for-real-id',
        description: '首次申请方式、材料、费用和线上/现场判断。',
      },
      {
        label: 'REAL ID 材料要求',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
        description: '身份、SSN、两份地址和姓名变更清单。',
      },
      {
        label: 'REAL ID Pre-Verification',
        url: 'https://www.pa.gov/services/dmv/apply-for-real-id-pre-verification',
        description: '检查 PennDOT 既有档案并等待是否可线上订购的确认。',
      },
      {
        label: '非美国公民 REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-non-us-citizens',
        description: '按移民身份核对 identity、SSN 状态、地址和有效期。',
      },
      {
        label: 'REAL ID FAQ',
        url: 'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/real-id-faqs',
        description: '费用、续期、预验证、语言服务和常见拒绝原因。',
      },
      {
        label: '线上 DMV 服务',
        url: 'https://www.pa.gov/agencies/dmv/online-services-dvs',
        description: 'PennDOT 线上驾照和车辆服务。',
      },
      {
        label: '续期 Driver License',
        url: 'https://www.pa.gov/services/dmv/renew-a-drivers-license',
        description: '线上/邮寄续期、camera card 和 Photo License Center 流程。',
      },
      {
        label: '补办 Driver License',
        url: 'https://www.pa.gov/services/dmv/replace-a-drivers-license',
        description: '线上、邮寄和现场 duplicate 流程。',
      },
      {
        label: '姓名或地址变更',
        url: 'https://www.pa.gov/services/dmv/change-a-driver-license-name-or-address',
        description: '15 天通知、免费 update card 和姓名材料。',
      },
      {
        label: '外州驾照转入',
        url: 'https://www.pa.gov/services/dmv/transfer-a-drivers-license-from-another-state',
        description: '60 天期限、交回外州驾照、vision 和 DL-180R。',
      },
      {
        label: '新居民车辆转入',
        url: 'https://www.pa.gov/services/dmv/transfer-vehicle-registration-from-another-state',
        description: '车辆 title / registration 的 20 天期限和 PA identification。',
      },
      {
        label: 'Learner Permit',
        url: 'https://www.pa.gov/services/dmv/get-a-learners-permit',
        description: 'DL-180、医疗签字、身份、permit 和未成年人步骤。',
      },
      {
        label: 'Knowledge / Road Test Rules',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
        description: '笔试题数、语言、补考和 road test 失败规则。',
      },
      {
        label: 'Schedule Driver Test',
        url: 'https://www.pa.gov/services/dmv/schedule-drivers-test',
        description: '预约 road、motorcycle、CDL 和 special points test。',
      },
      {
        label: '外国驾照在宾州驾驶',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license',
        description: '外国驾照、IDP、保险和执法检查说明。',
      },
      {
        label: 'Permit 与外国驾照互惠',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit',
        description: '未成年人练车、外国驾照一年窗口及四地互惠说明。',
      },
      {
        label: 'REAL ID Centers',
        url: 'https://www.pa.gov/agencies/dmv/find-a-location/real-id-center-locations',
        description: '同日签发地点和当前营业时间。',
      },
      {
        label: 'Find a Location',
        url: 'https://www.pa.gov/agencies/dmv/find-a-location',
        description: '查找 PennDOT Driver License Center、REAL ID Center 和其他服务地点。',
      },
      {
        label: 'Payments and Fees',
        url: 'https://www.pa.gov/agencies/dmv/resources/payments-and-fees',
        description: '当前驾照、permit、续期、补证和付款方式。',
      },
      {
        label: 'Standard Credential 无社安卡',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/proof-of-identity-and-residency/customers-who-do-not-have-a-social-security-card',
        description: '仅适用于 Standard non-REAL ID 的 Social Security card 替代材料。',
      },
    ],
    sources: [
      {
        label: 'PennDOT REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id',
      },
      {
        label: 'Apply for Pennsylvania REAL ID',
        url: 'https://www.pa.gov/services/dmv/apply-for-real-id',
      },
      {
        label: 'REAL ID Document Requirements',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
      },
      {
        label: 'REAL ID Pre-Verification',
        url: 'https://www.pa.gov/services/dmv/apply-for-real-id-pre-verification',
      },
      {
        label: 'REAL ID for Non-U.S. Citizens',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-non-us-citizens',
      },
      {
        label: 'REAL ID for CDL Holders',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-cdl-holders',
      },
      {
        label: 'Pennsylvania REAL ID FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/real-id-faqs',
      },
      {
        label: 'PennDOT Online Driver and Vehicle Services',
        url: 'https://www.pa.gov/agencies/dmv/online-services-dvs',
      },
      {
        label: 'Pennsylvania Driver License Renewal',
        url: 'https://www.pa.gov/services/dmv/renew-a-drivers-license',
      },
      {
        label: 'Pennsylvania Replacement Driver License',
        url: 'https://www.pa.gov/services/dmv/replace-a-drivers-license',
      },
      {
        label: 'Pennsylvania Name or Address Change',
        url: 'https://www.pa.gov/services/dmv/change-a-driver-license-name-or-address',
      },
      {
        label: 'PennDOT Moving Within Pennsylvania',
        url: 'https://www.pa.gov/agencies/dmv/resources/relocation/moving-within-pa',
      },
      {
        label: 'Transfer an Out-of-State Driver License',
        url: 'https://www.pa.gov/services/dmv/transfer-a-drivers-license-from-another-state',
      },
      {
        label: 'Transfer Out-of-State Vehicle Registration',
        url: 'https://www.pa.gov/services/dmv/transfer-vehicle-registration-from-another-state',
      },
      {
        label: 'PennDOT Get a Learner Permit',
        url: 'https://www.pa.gov/services/dmv/get-a-learners-permit',
      },
      {
        label: 'Pennsylvania Knowledge and Road Test Rules',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
      },
      {
        label: 'PennDOT Schedule a Driver Test',
        url: 'https://www.pa.gov/services/dmv/schedule-drivers-test',
      },
      {
        label: 'Driving with a Foreign Driver License',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license',
      },
      {
        label: 'PennDOT Driver and Licensing Miscellaneous FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/driver-and-licensing-miscellaneous-faqs',
      },
      {
        label: 'Pennsylvania Permit and Foreign Reciprocity Rules',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit',
      },
      {
        label: 'REAL ID Center Locations',
        url: 'https://www.pa.gov/agencies/dmv/find-a-location/real-id-center-locations',
      },
      {
        label: 'PennDOT Find a Location',
        url: 'https://www.pa.gov/agencies/dmv/find-a-location',
      },
      {
        label: 'PennDOT Payments and Fees',
        url: 'https://www.pa.gov/agencies/dmv/resources/payments-and-fees',
      },
      {
        label: 'Standard Credential Without Social Security Card',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/proof-of-identity-and-residency/customers-who-do-not-have-a-social-security-card',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedTopicSlugs: [
      'document-checklist',
      'proof-of-residency',
      'real-id-basics',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'georgia',
    abbr: 'GA',
    nameEn: 'Georgia',
    nameZh: '佐治亚州',
    agency: 'Georgia Department of Driver Services',
    agencyUrl: 'https://dds.georgia.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      'Georgia DDS 把 REAL ID 项目称为 Secure ID。DDS 说明 2012 年后签发的 Georgia license/ID 是 REAL ID-compliant，但办事前仍应直接检查卡片右上角是否有 gold 或 black star。临时纸质 license/ID 不能用于 TSA 登机。',
    realIdSummary:
      '没有星标、持外州或外国证件，或要首次取得 Georgia REAL ID 时，需要到 Customer Service Center 出示原件或认证文件，包括一份身份或 lawful-status 文件、完整 SSN 核验、两份 Georgia 居住证明，以及适用的姓名变更文件。已经持有带星 Georgia credential 的美国公民通常不用重交全套材料，但改名、更新 gender marker 或其他身份核验业务除外。',
    licenseSummary:
      '成为 Georgia resident 后 30 天内要换领 Georgia driver’s license。有效或过期不超过 2 年的外州非商业驾照通常要交回原证并通过视力检查，可免 knowledge 和 road tests。过期超过 2 年则要通过 knowledge、road 和 vision exams，并提交 certified driving record。普通 Class C 驾照有效 8 年，当前费用 $32，符合资格的线上交易可能减 $5。',
    appointmentNote:
      '只有 automobile、motorcycle 和 CDL behind-the-wheel road tests 需要预约，续期、改址等现场业务目前不要求预约。Knowledge exam 可直接到场，但非商业考试要在中心关门至少 30 分钟前开始。现场办理前都要先提交 Online License/ID/Permit Form，并按地点核对具体服务。',
    editorNotes: [
      'Secure ID 是 Georgia 对 REAL ID 合规项目的称呼，不是另一种额外证件。',
      '金色星标和黑色星标都可表示 Georgia REAL ID，颜色差异来自卡片设计。',
      '同一人只能有一张带 REAL ID 星标的实体 Georgia driver’s license 或 ID，但可以另有合规 digital license/ID。',
      'Georgia 非商业 knowledge exam 分为 Road Rules 和 Road Signs，两部分都要答对至少 15/20。',
      '当前 Test and Exams Information 把 Road Rules 和 Road Signs 都列为可用 26 种语言，包括 Chinese。',
      'DDS 的在线 Driver Manual 章节仍写 Road Signs 和实际路考只用英语，与当前考试专页不一致，依赖中文 Road Signs 考试前应向考点确认。',
      'Road Skills Test 只用英语，必须预约，并需要有效 permit、合规车辆、纸质 registration 和有效 insurance card。',
      '18 岁及以上首次 road test 申请人还要确认完成 40 小时 supervised driving，其中 6 小时在夜间，并由 21 岁以上持证驾驶人陪同。',
      '普通 Class C learner permit 当前为 2 年 $10，考试任一部分失败不退费，再次考试要重新付 permit fee。',
      '续期最多可提前 150 天，当前专页说明 renewed license 最长有效 8 年，线上续期要求 Georgia resident、18 岁以上、美国公民并持带星 Georgia credential。',
      '非美国公民每次办理会签发 license、permit 或 ID 的业务，都要亲自出示原始移民文件，不能使用普通线上续期、补证或改址路径。',
      '现场续期会先发 interim license，DDS 的 REAL ID 和 replacement 办理说明写永久卡可能在 30 天内寄到，但 renewal 与 replacement FAQ 使用 45 天窗口，安排行程时应按较长时间预留。',
      '补证在原证剩余至少 150 天时当前费用 $10，少于 150 天则按续期处理并支付 renewal fee。',
      '现有 Georgia credential 持有人搬家后有 60 天改地址，新居民转入则是 30 天期限。',
      '第一次 name/address change 在当前证件周期内免费，但 DDS 主说明写第二次起 $10，FAQ 则写第二次要续期并付 renewal fee，提交前要看在线交易报价或向 DDS 确认。',
      'South Korea 驾照连同韩国领馆 License Certification Letter 可免 Georgia knowledge 和 road tests，但仍要通过 vision exam。',
      'DDS 只明确写 Georgia 与 Taiwan 有 reciprocity，没有在同一页公布 Taiwan 的具体免考文件与条件，不能直接套用韩国路径。',
      '没有互惠协议的外国驾照转入通常要通过 knowledge、road 和 vision exams。',
      '非居民持有效外国驾照可在 Georgia 驾驶，但执法人员可能要求 passport 或 visa 核验驾照有效性，成为 resident 后则进入 30 天换证规则。',
      '大多数非美国公民可保留外国非商业驾照，但美国公民持外国辖区证件或申请 commercial license/permit 时有交回证件的例外。',
    ],
    documentHighlights: [
      '美国公民带一份身份文件原件或认证副本，常见选择包括带 raised seal 的政府出生证明、未过期美国 passport/passport card、Naturalization 或 Citizenship certificate。',
      '先在 Online License/ID/Permit Form 填完整 SSN，系统核验失败时再带显示姓名与完整号码的 Social Security card、SSA printout、W-2、1099 或 pay stub 等官方清单文件。',
      '两份 Georgia residency 文件必须来自不同来源或不同账户，并显示姓名和当前 residential address，P.O. Box 不能单独证明 residency。',
      '常见 residency 文件有近 6 个月的 utility/phone bill、USPS 实体投递邮件、lease/rent receipt，或当前或上一 calendar year 的政府、住房、就业、银行、学校或医疗记录。',
      '身份文件姓名与 current legal name 不同时要带完整 name-change history，已经持有有效 Georgia license/ID 的客户通常带支持最近一次变更的原件或认证文件。',
      '非美国公民要按当前身份类别带 identity 和 lawful-status 原始移民文件，DDS 只会按移民文件上的精确姓名签发证件。',
      '没有资格取得 SSN 的申请人要在 Customer Service Center 填 DDS-351 Certification of Social Security Denial Status，具有 DHS work authorization 的非公民则必须申请 SSN。',
      'DDS 同时写明所有文件必须为 English，并且不接受 translated documents，原始文件不是英语时不要自行假定普通认证翻译可用，应先联系 DDS 确认可接受的原始英文文件。',
    ],
    commonMistakes: [
      '看到黑色星标就以为不是 REAL ID，或认为实体 driver’s license 和实体 ID 可以同时带星。',
      '临近航班才改证，拿到 interim paper license 后误以为 TSA 会接受。',
      '只带一份地址文件、两份来自同一账户，或用 P.O. Box 代替 residential address。',
      'SSN 文件只显示后四位，或文件姓名与当前申请姓名不一致。',
      '非美国公民带翻译件代替 DDS 要求的原始移民文件，或忽略移民文件姓名必须精确匹配。',
      '把 Taiwan reciprocity 直接理解成与 South Korea 完全相同的领馆信和免考条件。',
      '只看 26-language 考试专页就默认 Road Signs 一定能选 Chinese，没有注意 DDS Driver Manual 仍写该部分只用英语。',
      '新居民超过 30 天才处理 Georgia license 转入。',
      '外州驾照过期超过 2 年仍按免 knowledge/road tests 的普通换证路径准备。',
      '补证时没有检查剩余 150 天，到了交易环节才发现必须按续期付费。',
      '第二次改地址直接按固定 $10 预算，没有注意 DDS FAQ 与主说明对费用处理不一致。',
    ],
    recommendedSteps: [
      '先检查现有 Georgia credential 的 gold/black star，并判断是否会在永久卡寄到前乘机。',
      '没有星标或要从外州/外国转入时，按 identity/lawful status、SSN、two residency 和 name-change 四栏准备原件或认证文件。',
      '需要现场时先提交 Online License/ID/Permit Form，再从 Customer Service Center finder 核对地点和服务。',
      '外州新居民先按 30 天期限分流，原证有效或过期不超过 2 年走 surrender + vision 路径，超过 2 年则准备 certified MVR 和三项考试。',
      '普通续期先查线上资格并最多提前 150 天办理，补证则先看原证是否还剩至少 150 天。',
      '首次 Class C 申请人先完成 $10 permit 和两部分 knowledge exam，再满足 40 小时练车要求并预约 English-only road test。',
      '持 South Korea 或 Taiwan 驾照的人先打开 Drivers From Other Nations，韩国申请人准备领馆 License Certification Letter，台湾申请人向 DDS 确认未公开的互惠细节。',
      '遇到邮寄时限、第二次改址费用或中文 Road Signs 三组官方差异时，按更保守的时间和材料准备，并在提交付款或考试前向 DDS 确认。',
    ],
    actionLinks: [
      {
        label: 'Georgia REAL ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/real-id',
        description: 'Secure ID 星标、材料、临时证件与永久卡邮寄说明。',
      },
      {
        label: 'Georgia REAL ID FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/real-id-faqs',
        description: 'REAL ID 费用、首次办理、姓名变化和临时凭证问答。',
      },
      {
        label: 'Georgia License/ID',
        url: 'https://dds.georgia.gov/georgia-licenseid',
        description: '驾照和 ID 业务总入口。',
      },
      {
        label: '外州驾照转入',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-transfer-out-state-drivers-licenseid',
        description: '30 天期限、2 年分界、交回原证、MVR 和考试要求。',
      },
      {
        label: '非美国公民',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens',
        description: 'lawful status、SSN/DDS-351、原始移民文件和 120-day extension。',
      },
      {
        label: 'Drivers From Other Nations',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations',
        description: '外国驾照、South Korea/Taiwan 互惠、考试和证件退还规则。',
      },
      {
        label: 'Transfer Foreign License',
        url: 'https://dds.georgia.gov/transfer-unexpired-foreign-drivers-license',
        description: '未过期外国驾照转入的考试、文件、语言和现场要求。',
      },
      {
        label: '续期 License/ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-renew-license-or-id',
        description: '线上、现场、邮寄续期资格和 150 天窗口。',
      },
      {
        label: 'Renewals FAQs',
        url: 'https://dds.georgia.gov/renewals-faqs',
        description: '续期时间、REAL ID 文件和 45 天寄送问答。',
      },
      {
        label: 'Mail-In Renewals',
        url: 'https://dds.georgia.gov/mail-renewals',
        description: '军人、外州学生和外州工作者等有限邮寄续期路径。',
      },
      {
        label: '补办 License/ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-replace-license',
        description: '$10 补证、150 天分界、线上资格和现场文件。',
      },
      {
        label: 'Replacement FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/replacements-faqs',
        description: '遗失补证、身份盗用和永久卡 45 天寄送问答。',
      },
      {
        label: '更新姓名或地址',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-update-license',
        description: '60 天改址、线上视频核验和第二次变更费用说明。',
      },
      {
        label: 'Address Change FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/address-change-faqs',
        description: '新居民/现居民期限、免费次数和第二次改址处理。',
      },
      {
        label: 'Fees and Terms',
        url: 'https://dds.georgia.gov/fees-and-terms',
        description: '当前驾照、permit、补证、线上折扣和付款方式。',
      },
      {
        label: '客户服务中心',
        url: 'https://dds.georgia.gov/locations/customer-service-center',
        description: '按地点查询营业时间和可办服务。',
      },
      {
        label: 'Test and Exams',
        url: 'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
        description: 'knowledge、vision、road tests、语言、分数和补考规则。',
      },
      {
        label: 'Road Test Appointment',
        url: 'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
        description: '预约、permit、40 小时练车、陪同人与车辆材料。',
      },
      {
        label: 'Driver Manual Testing Section',
        url: 'https://dds.georgia.gov/section-3-testing-information',
        description: 'DDS 在线 manual 的 knowledge 与 road test 规则，用于核对语言差异。',
      },
      {
        label: 'Class C License',
        url: 'https://dds.georgia.gov/section-2-continued-class-c-license',
        description: '18 岁以上 Class C、permit、40 小时练车和费用。',
      },
      {
        label: 'Practice Test',
        url: 'https://dds.georgia.gov/testing-and-training/practice-test',
        description: 'DDS 官方 practice test 和 driver manual 入口。',
      },
    ],
    sources: [
      {
        label: 'Georgia DDS REAL ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/real-id',
      },
      {
        label: 'Georgia DDS REAL ID FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/real-id-faqs',
      },
      {
        label: 'Georgia DDS License/ID',
        url: 'https://dds.georgia.gov/georgia-licenseid',
      },
      {
        label: 'Georgia Out-of-State License Transfer',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-transfer-out-state-drivers-licenseid',
      },
      {
        label: 'Georgia DDS Information for Non-US Citizens',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens',
      },
      {
        label: 'Georgia DDS Drivers From Other Nations',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations',
      },
      {
        label: 'Georgia DDS Transfer Unexpired Foreign Driver License',
        url: 'https://dds.georgia.gov/transfer-unexpired-foreign-drivers-license',
      },
      {
        label: 'Georgia DDS Renew License or ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-renew-license-or-id',
      },
      {
        label: 'Georgia DDS Renewals FAQs',
        url: 'https://dds.georgia.gov/renewals-faqs',
      },
      {
        label: 'Georgia DDS Mail-In Renewals',
        url: 'https://dds.georgia.gov/mail-renewals',
      },
      {
        label: 'Georgia DDS Replace License',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-replace-license',
      },
      {
        label: 'Georgia DDS Replacements FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/replacements-faqs',
      },
      {
        label: 'Georgia DDS Update License Information',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-update-license',
      },
      {
        label: 'Georgia DDS Address Change FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/address-change-faqs',
      },
      {
        label: 'Georgia DDS Fees and Terms',
        url: 'https://dds.georgia.gov/fees-and-terms',
      },
      {
        label: 'DDS Customer Service Centers',
        url: 'https://dds.georgia.gov/locations/customer-service-center',
      },
      {
        label: 'Georgia DDS Test and Exams Information',
        url: 'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
      },
      {
        label: 'Georgia DDS Road Test Appointment',
        url: 'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
      },
      {
        label: 'Georgia DDS Driver Manual Testing Section',
        url: 'https://dds.georgia.gov/section-3-testing-information',
      },
      {
        label: 'Georgia DDS Class C License',
        url: 'https://dds.georgia.gov/section-2-continued-class-c-license',
      },
      {
        label: 'Georgia DDS Practice Test',
        url: 'https://dds.georgia.gov/testing-and-training/practice-test',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedTopicSlugs: [
      'moving-to-new-state',
      'document-checklist',
      'non-citizen-license-id',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
      'vehicle-registration-renewal-expired-tags-non-operation',
    ],
  },
  {
    id: 'maryland',
    abbr: 'MD',
    nameEn: 'Maryland',
    nameZh: '马里兰州',
    agency: 'Maryland Motor Vehicle Administration',
    agencyUrl: 'https://mva.maryland.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      'Maryland 的 REAL ID 办理第一步不是猜卡面，而是打开 MVA REAL ID Lookup 查询个人档案，因为即使卡上有星标或全州合规率很高，旧档案仍可能提示补交材料。',
    realIdSummary:
      '需要补交 Maryland REAL ID 材料时，通常要覆盖一份年龄与身份、Social Security 信息、两份 Maryland 实际住址证明和适用的完整姓名变更链，并把原件或签发机关认证件带到 MVA。',
    licenseSummary:
      '新居民要在搬入 Maryland 后 60 天内转入普通外州驾照，CDL 的期限是 30 天。外州驾照已过期超过 12 个月时不能直接交换，申请人要重新通过视力、knowledge 和 skills tests。',
    appointmentNote:
      '续期、补证和地址更新先查看 myMVA 线上资格，新居民转入、REAL ID 补材料、姓名变更和驾驶考试则按对应页面预约。Maryland MVA 说明有 60 多项常见业务可以线上处理，但是否可用仍取决于个人记录和通知。',
    editorNotes: [
      'Maryland MVA 公布全州 REAL ID 合规率超过 99%，这个比例不能替代个人 REAL ID Lookup 结果。',
      '旧 REAL ID FAQ 仍写升级费 $20，而 2025 年 9 月 1 日生效的当前 license fee 表把 duplicate 和 corrected license 都列为 $30，付款前应以当前费用表和交易报价再次确认。',
      '当前费用表列出普通驾照续期 $64 并对应最长 8 年，新申请人 21 岁及以上为 $88 或按每年 $11 计费。',
      '当前费用表列出 Photo ID 新办或续期 $40、补发或更正 $30，65 岁及以上或有影响 major life activity 的 disability 可免 ID card fee。',
      'limited-term driver license 的有效期只覆盖获准在美国停留的期限，费用会按该期限调整。',
      '普通续期最多可提前一年，limited-term、过期至少一年或不符合线上和邮寄资格的人要到 MVA 办理。',
      '40 岁及以上续期需要两年内的 vision exam，邮寄续期只适用于收到相应通知的人并应至少提前 15 天寄出。',
      '续期后的卡通常在 7 至 10 个工作日寄出，45 天仍未收到时应联系 MVA 或通过 myMVA 申请 gratis product。',
      '普通补证不要求 police report，duplicate 会保留原 license number 和 expiration date，线上或 kiosk 申请后最多预留 10 个工作日收件。',
      'Maryland 要求搬家后 30 天内更新驾照或 ID 地址，单纯更新记录免费并会寄出 Change of Address card，选择重印实体卡则要付 replacement fee。',
      '姓名变更要先在 SSA 更新并至少等待 72 小时，再带原件或认证的姓名变更文件预约到 MVA 办理。',
      'Maryland 非商业 Class C knowledge test 有繁体中文，限时 20 分钟并要求至少 88% 才能通过。',
      '第一次 knowledge test 失败后最早可在下一个工作日重考，第二次及以后失败要等待至少 7 个日历日。',
      'Maryland learner permit 的最低申请年龄是 15 岁 9 个月，申请前应从 myMVA 完成 pre-application 并预约 full-service MVA office。',
      '所有新驾驶人都要完成 30 小时课堂和 6 小时 behind-the-wheel 的 Maryland Driver Education Program。',
      '25 岁及以上首次驾驶人取得 permit 后至少等待 45 天，并完成 14 小时 supervised practice，其中 3 小时在夜间。',
      '持外国驾照转入通常要完成 3-Hour Roadway Safety Program、视力检查、knowledge test 和 skills test，符合互惠协议时才可能免除两项驾驶考试。',
      'Maryland 与韩国、法国、德国、台湾和日本有非商业 Class C 驾照互惠协议，申请人仍要满足年龄、材料、视力、三小时课程和证件有效期条件。',
      '没有有效 USCIS 文件的人可能申请 federally noncompliant license 或 ID，但要先有连续两年 Maryland income tax filing 并取得 Comptroller tax certification letter。',
      'federally noncompliant credential 不能代替 REAL ID 或其他 TSA 接受证件用于联邦身份用途。',
      '新居民如果有车辆，也要在搬入后 60 天内完成 Maryland title 和 registration，逾期会失去外州 titling tax credit 并可能收到 citation。',
      '2026-07-17 本环境点验时部分 Maryland MVA 深层页会触发访问限制，遇到同样情况可先从 MVA 首页或 USA.gov 州机动车服务目录重新进入。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Maryland MVA 部分深层页在 2026-07-17 点验时触发访问限制。本站保留官方深层链接；如果你打开也被拦截，请从 MVA 首页或 USA.gov 州机动车服务目录重新进入。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '先用 REAL ID Lookup 判断 MVA 是否已收齐自己的文件，再用 Online Document Guide 生成与个人身份和业务对应的清单。',
      '年龄与身份文件应使用原件或签发机关认证件，普通 photocopy、手机照片和 digital scan 不被接受。',
      '美国公民常见的年龄与身份证明包括签发机关认证的出生证或有效美国 passport，非公民要按当前身份选择相应 lawful-status 文件。',
      'Social Security 材料要按 Online Document Guide 和个人通知准备，不要只凭旧 FAQ 推断可接受的文件或时效。',
      '准备两份印有本人姓名和 Maryland physical address 的住址材料，姓名与地址要和 MVA 记录一致。',
      '出生证或其他身份文件姓名与当前姓名不一致时，要用 marriage certificate、divorce decree 或 court order 串起完整变更历史。',
      '临时或其他非公民身份申请人应准备可由 DHS SAVE 核验的当前移民文件，证件期限可能受 lawful stay 限制。',
      '新居民应带当前外州驾照并在现场交回，卡片缺失时要提供原签发州出具且不超过 30 天的 certified driving record。',
      '40 岁及以上续期人的 vision exam 必须在两年内，并由 MVA-approved provider 电子提交或按邮寄表格完成。',
      '非英文外国驾照要附 international driver license 或 MVA approved translator 的英文翻译，遗失外国驾照时还要准备带 apostille 的 driving record 或使馆证明信。',
    ],
    commonMistakes: [
      '因为卡上有星标或看到全州 99% 以上合规率，就跳过个人 REAL ID Lookup。',
      '只带一份 Maryland 地址证明，或两份文件上的姓名和地址与 MVA 记录不一致。',
      '携带 photocopy、手机照片或自行公证件，误以为它们等同于签发机关认证副本。',
      '改过多次姓名却只带最近一次文件，无法连接出生姓名到 current legal name。',
      '沿用旧 REAL ID FAQ 或费用页下方旧表中的 $20 金额，没有查看 2025 年 9 月 1 日生效的当前 license fee 表。',
      '驾照过期至少一年仍尝试普通续期，忽略此时要按新申请人重新完成 vision、knowledge 和 skills tests。',
      '只向 USPS 提交转寄，没有先更新 MVA 地址，导致实体卡寄往旧地址且无法被 USPS forward。',
      '外州新居民走 Maryland 普通续期入口，错过普通驾照 60 天或 CDL 30 天的转入期限。',
      '持非英文外国驾照却没有 approved translation 或 international driver license，也没有先完成三小时道路安全课程。',
      '来自互惠国家就默认任何过期驾照都能免试，没有核对国家、证件过期时间和 surrender 规则。',
      '把 federally noncompliant license 或 ID 当作 REAL ID，用它规划国内航班或进入需要联邦合规身份证件的设施。',
      '只处理驾照而漏掉车辆 title 和 registration 的 60 天期限，因而失去外州 titling tax credit 或面临 citation。',
    ],
    recommendedSteps: [
      '先判断业务属于 REAL ID 补材料、续期、补证、资料更正、首次驾照、外州转入还是外国驾照转入，不要混用入口。',
      '涉及 REAL ID 时先运行 REAL ID Lookup，再根据结果打开 Online Document Guide，而不是直接照抄通用材料示例。',
      '逐项核对年龄与身份、Social Security、两份 residency、lawful status 和完整姓名链，并只准备原件或签发机关认证件。',
      '姓名已变化时先完成 SSA 更新并等待至少 72 小时，再预约 MVA correction。',
      '外州新居民从 myMVA 选择 New to Maryland appointment，普通驾照在 60 天内办理并按需把 license、title 和 registration 合并到一次预约。',
      '普通续期、补证或地址更新先登录 myMVA 检查线上资格，并以 renewal notice 和账户提示为准。',
      '首次驾照申请人先取得 learner permit、完成 Driver Education 和规定练车时数，再预约 skills test。',
      '需要考试时先确认 knowledge test 语言、等待期和车辆材料，繁体中文只适用于 noncommercial Class C knowledge test。',
      '付款前打开当前 License & ID Fees 表并查看实际交易报价，尤其不要把旧 FAQ 的 $20 当作现行 duplicate 或 corrected fee。',
      '交易完成后保留 receipt，并用 Product Tracking Tool 跟踪邮寄卡片，超过官方时限再联系 MVA。',
      '有车的新居民同时安排 Maryland insurance、title、registration 和可能需要的 safety inspection，不要只完成驾照换领。',
    ],
    actionLinks: [
      {
        label: 'Maryland REAL ID 状态查询',
        url: 'https://mva.maryland.gov/Pages/realidlookup.aspx',
        description: '先查询个人档案是否仍需补交 REAL ID 文件。',
      },
      {
        label: 'MVA Licenses & IDs',
        url: 'https://mva.maryland.gov/licenses-ids?das_id=D0005110044_00000',
        description: '驾照、ID、REAL ID 和其他证件业务总入口。',
      },
      {
        label: 'REAL ID FAQ 与材料说明',
        url: 'https://mva.maryland.gov/Pages/realidfaq.aspx',
        description: '查看个人状态、典型材料、姓名链和现场核验说明，旧费用信息需与当前费用表交叉核对。',
      },
      {
        label: 'MVA 文件要求表 FO-150A',
        url: 'https://mva.maryland.gov/documents/FO-150A.pdf',
        description: '核对 compliant 与 noncompliant credential 的材料类别和住址文件。',
      },
      {
        label: 'License & ID 当前费用',
        url: 'https://mva.maryland.gov/licenses-ids/license-id-fees',
        description: '查看 2025 年 9 月 1 日起的驾照、permit 和 Photo ID 费用。',
      },
      {
        label: '续期 License / ID',
        url: 'https://mva.maryland.gov/licenses-ids/renew-license-or-id',
        description: '核对提前期限、线上资格、vision exam、邮寄和到场条件。',
      },
      {
        label: '补发 License / ID',
        url: 'https://mva.maryland.gov/licenses-ids/replace-license-or-id',
        description: '处理遗失、被盗或损坏证件，并查看线上、kiosk 和现场路径。',
      },
      {
        label: '更新姓名/地址等信息',
        url: 'https://mva.maryland.gov/licenses-ids/update-name-address-or-other-license-info',
        description: '处理 30 天地址期限、SSA 姓名更新和实体卡更正。',
      },
      {
        label: '新居民办事总入口',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents',
        description: '选择驾照、车辆或组合预约，并完成 New to Maryland pre-application。',
      },
      {
        label: '新居民驾照/ID',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/get-maryland-drivers-license-or-id-card',
        description: '核对 60/30 天期限、外州证过期边界、材料和 certified driving record。',
      },
      {
        label: '新居民车辆 Title / Registration',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/title-register-your-vehicle',
        description: '处理车辆 60 天期限、税收抵免、保险、title 和 registration。',
      },
      {
        label: '驾照考试准备',
        url: 'https://mva.maryland.gov/licenses-ids/prepare-drivers-license-test',
        description: '查看 knowledge 和 skills tests、繁体中文、通过分数与预约入口。',
      },
      {
        label: 'Learner Permit',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/learners-permit',
        description: '查看最低年龄、pre-application、预约和首次 permit 材料。',
      },
      {
        label: 'Provisional License',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/provisional-license',
        description: '按年龄查看 permit 等待期、练车时数和 provisional license 路径。',
      },
      {
        label: 'Maryland Driver Education',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/drivers-education',
        description: '核对 30 小时课堂和 6 小时 behind-the-wheel 课程要求。',
      },
      {
        label: '外国驾照转入 Maryland',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/international-movers',
        description: '查看翻译、三小时课程、考试和五个互惠国家的边界。',
      },
      {
        label: 'Noncompliant License / ID',
        url: 'https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids',
        description: '没有有效 USCIS 文件时核对税务证明、预约、材料和考试路径。',
      },
      {
        label: 'Maryland Photo ID',
        url: 'https://mva.maryland.gov/licenses-ids/get-new-license-permit-or-id/identification-id-card',
        description: '不驾驶者的新办、续期、补证和符合条件的免费 ID 路径。',
      },
      {
        label: 'MVA 首页与 myMVA 入口',
        url: 'https://mva.maryland.gov/',
        description: '进入线上交易、预约、网点和 Product Tracking Tool。',
      },
      {
        label: 'TSA 可接受身份证件',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        description: '确认国内航班可用的 REAL ID 和替代身份证件。',
      },
      {
        label: 'USA.gov 州机动车服务目录',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: '如果 Maryland MVA 官方页被拦截，可从 USA.gov 选择 Maryland 后进入官方机动车服务入口。',
      },
    ],
    sources: [
      {
        label: 'Maryland MVA REAL ID Lookup',
        url: 'https://mva.maryland.gov/Pages/realidlookup.aspx',
        note: '个人 REAL ID 文件状态查询入口。',
      },
      {
        label: 'Maryland MVA Licenses & IDs',
        url: 'https://mva.maryland.gov/licenses-ids?das_id=D0005110044_00000',
        note: '驾照与 ID 服务总览，并提示个人使用 REAL ID Check。',
      },
      {
        label: 'Maryland MVA REAL ID FAQ',
        url: 'https://mva.maryland.gov/Pages/realidfaq.aspx',
        note: '材料、姓名链和现场核验说明，页面含过时日期与费用，使用时已和当前费用页交叉核对。',
      },
      {
        label: 'Maryland MVA Document Requirements FO-150A',
        url: 'https://mva.maryland.gov/documents/FO-150A.pdf',
        note: '联邦合规与非合规 credential 的材料分类。',
      },
      {
        label: 'Maryland MVA License & ID Fees',
        url: 'https://mva.maryland.gov/licenses-ids/license-id-fees',
        note: '2025 年 9 月 1 日生效的驾照、permit 和 ID 费用。',
      },
      {
        label: 'Maryland MVA Renew License or ID',
        url: 'https://mva.maryland.gov/licenses-ids/renew-license-or-id',
        note: '续期资格、期限、视力检查、邮寄和卡片寄送。',
      },
      {
        label: 'Maryland MVA Replace License or ID',
        url: 'https://mva.maryland.gov/licenses-ids/replace-license-or-id',
        note: '补证渠道、身份验证、警察报告和寄送规则。',
      },
      {
        label: 'Maryland MVA Update Name, Address or License Info',
        url: 'https://mva.maryland.gov/licenses-ids/update-name-address-or-other-license-info',
        note: '地址 30 天规则、SSA 姓名更新和 corrected credential。',
      },
      {
        label: 'Maryland MVA New Resident Guide',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents',
        note: '新居民 60 天期限和组合预约。',
      },
      {
        label: 'Maryland MVA New Resident License or ID',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/get-maryland-drivers-license-or-id-card',
        note: '普通驾照 60 天、CDL 30 天、12 个月过期边界和材料。',
      },
      {
        label: 'Maryland MVA New Resident Vehicle',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/title-register-your-vehicle',
        note: '车辆 title、registration、税收抵免与 citation 风险。',
      },
      {
        label: 'Maryland MVA Driver License Tests',
        url: 'https://mva.maryland.gov/licenses-ids/prepare-drivers-license-test',
        note: 'knowledge 和 skills tests、语言、时间和通过分数。',
      },
      {
        label: 'Maryland MVA Learner Permit',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/learners-permit',
        note: 'permit 最低年龄、预约和材料。',
      },
      {
        label: 'Maryland MVA Provisional License',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/provisional-license',
        note: '年龄分组、permit 等待期和 supervised practice。',
      },
      {
        label: 'Maryland MVA Driver Education',
        url: 'https://mva.maryland.gov/your-mva-guide/teens-new-drivers/drivers-education',
        note: '驾驶教育课程时数。',
      },
      {
        label: 'Maryland MVA International Movers',
        url: 'https://mva.maryland.gov/your-mva-guide/new-maryland-residents/international-movers',
        note: '外国驾照翻译、课程、测试和互惠协议。',
      },
      {
        label: 'Maryland MVA Noncompliant Credentials',
        url: 'https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids',
        note: '没有有效 USCIS 文件申请人的税务证明与办理路径。',
      },
      {
        label: 'Maryland MVA Identification Card',
        url: 'https://mva.maryland.gov/licenses-ids/get-new-license-permit-or-id/identification-id-card',
        note: 'Photo ID 申请、寄送和符合条件的费用减免。',
      },
      {
        label: 'Maryland MVA Home',
        url: 'https://mva.maryland.gov/',
        note: 'myMVA、预约、网点与在线交易主入口。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受身份证件清单。',
      },
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        note: '州机动车服务官方备用入口。',
      },
    ],
    relatedTopicSlugs: [
      'moving-to-new-state',
      'document-checklist',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'renewal-replacement-address',
    ],
  },
  {
    id: 'virginia',
    abbr: 'VA',
    nameEn: 'Virginia',
    nameZh: '弗吉尼亚州',
    agency: 'Virginia Department of Motor Vehicles',
    agencyUrl: 'https://www.dmv.virginia.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      'Virginia REAL ID 是自愿升级，Standard license 仍可驾驶、投票和办理多数日常事务，但国内航班或特定联邦设施要改用 REAL ID 或 TSA 接受的其他身份证件。',
    realIdSummary:
      '首次申请 Virginia REAL ID 要到 DMV customer service center，带一份 identity、两份 Virginia residency、一份 legal presence、Social Security 信息和适用的姓名变更链，并支付一次性 $10 REAL ID fee 加当前驾照或 ID 交易费。',
    licenseSummary:
      '新居民要在搬入 Virginia 后 60 天内取得普通驾照，现有 CDL 要在 30 天内转入。车辆 title 和 registration 采用另一条 30 天期限，不要和驾照期限混用。',
    appointmentNote:
      'DMV 提供 50 多项线上交易，必须到场时可选周一至周五 appointment、同日 e-ticket 或营业时间内 walk-in。Knowledge 和 road skills walk-in 申请人要在周一至周五 4:30 p.m. 前或周六 11:30 a.m. 前到场。',
    editorNotes: [
      'Virginia REAL ID 可以先在线开始申请，但 DMV 不提供在家预扫或上传文件的流程，声称能代传 REAL ID 文件的网站不属于 Virginia DMV。',
      '从其他州搬入后，原州 REAL ID 不会自动转成 Virginia REAL ID，仍要按 Virginia 首次 REAL ID 路径提交材料。',
      '首次 REAL ID 必须本人到场，取得首张 REAL ID 后才可能按普通续期周期在线续办。',
      '当前 REAL ID 一次性附加费是 $10，普通 8 年驾照为 $32，普通 replacement license 为 $20。',
      'REAL ID 身份材料必须是原件，允许清单内 online residency document 的打印件，但不接受 temporary documents 或普通 photocopies。',
      '有效且姓名一致的美国 passport 或 passport card 可以同时覆盖 identity 和 legal presence，不一定必须使用出生证。',
      '有多次姓名变化时要为每一次变化提供 certified marriage certificate、divorce decree、court order 或 adoption record，形成完整姓名链。',
      '知道自己的 SSN 且 DMV 能电子核验时可以不出示纸质 SSN proof，CDL 申请人仍要按专用要求准备 Social Security 文件。',
      'Virginia legal presence 页面明确不把 Employment Authorization Document I-766 单独接受为 REAL ID legal-presence proof，持有人应按身份表寻找其他可接受文件。',
      'temporary authorized applicant 的 REAL ID 有效期通常跟随 authorized stay，没有明确结束日时为一年，申请日剩余合法停留少于 30 天则不能取得 REAL ID permit。',
      '普通驾照最多可提前一年续期，线上或邮寄通常只能隔一个 renewal cycle 使用一次，下一周期要本人到场更新照片和视力。',
      '普通续期后的卡最多预留 15 天邮寄，75 岁及以上的 renewed license 通常有效 5 年而不是 8 年。',
      'Virginia 驾照过期超过一年后不能走普通续期，要重考 vision、two-part knowledge 和 road skills。',
      '普通 replacement license 为 $20、replacement permit 为 $2，线上补证会沿用现有照片且新卡通过邮件寄送。',
      'USPS 不会转寄 Virginia license 或 ID，线上补证和续期前都应先确认 DMV 记录地址，并至少预留 15 天收件。',
      '搬到新的 Virginia residence 后 30 天内要更新 DMV 地址，residence address 不能只填 P.O. box 或 business address。',
      '姓名变更可先在线开始，但要带原始 marriage certificate、divorce decree 或 court order 到 customer service center 完成。',
      'Knowledge exam 第一部分 10 道 road sign 必须全对，第二部分 30 道 general knowledge 至少答对 24 道。',
      'Virginia knowledge exam 提供 Chinese/Mandarin 和 Chinese/Mandarin Traditional，CDL HAZMAT knowledge exam 例外为 English only。',
      '未满 18 岁 knowledge exam 失败后要完整等待 15 天，18 岁及以上同一天只能考一次，任何年龄三次失败都要先完成规定课程。',
      'Road skills test 在道路上以英语进行，需要语言协助时可自带至少 18 岁且持有效美国驾照的 translator 或 interpreter。',
      'Road test 自备车辆要有有效 safety inspection sticker、plates、registration card 和可工作的制动、安全带、喇叭、灯、转向灯、后视镜与 speedometer。',
      'Virginia learner permit 最低年龄是 15 岁 6 个月，普通驾照最低年龄是 16 岁 3 个月。',
      '在 2027 年 1 月 1 日之前，18 岁及以上从未持证者可选择持 permit 至少 60 天或在持 permit 时完成州批准驾驶教育。',
      '从 2027 年 1 月 1 日起，18 至 20 岁从未持证者要持 permit 至少 90 天并完成州批准驾驶教育，21 岁及以上仍保留 60 天或驾驶教育二选一。',
      'Virginia 的外国驾照互惠国家包括 Canada、France、Germany、Japan、South Korea 和 Taiwan，但 Taiwan 申请人仍要通过 vision 和 two-part knowledge exam。',
      'France、Germany、Japan、South Korea 和 Taiwan 驾照要先提交 DL 7 和驾照副本供 DMV 核验，验证最长可能需要 15 天，Canada 不走这一步。',
      '非互惠国家的有效外国驾照持有人通常要通过 two-part knowledge、road skills 和 vision，但可接受的外国驾照可能免 60 天 permit 和 driver education。',
      '不能满足 standard license legal-presence 要求的非美国公民可能申请 Driver Privilege Card，但要有过去 12 个月 Virginia-source income 或作为 Virginia tax return dependent 的记录。',
      'Driver Privilege Card 不是 REAL ID、不能用于相应联邦身份用途或申请 CDL，当前新办和续期均为 $50。',
      '续办 2026 年 7 月 1 日前签发的 Driver Privilege Card 时要本人到场更新照片，并在适用时完成 vision screening。',
    ],
    documentHighlights: [
      '先用 Virginia DMV Online Document Guide 按 REAL ID、Standard license 或 Driver Privilege Card 生成对应清单，不要混用三套要求。',
      'REAL ID 核心材料是 one identity、one legal presence、two Virginia residency、SSN 信息和适用的 certified name-change documents。',
      '所有身份与 legal-presence 文件使用原件，普通 photocopy 和 temporary document 不被接受。',
      '清单明确接受的在线账单或其他 online residency document 可以打印后作为住址证明，但仍要准备两份。',
      '两份 Virginia residency 文件要显示当前 residential street address，P.O. box 只能作为额外 mailing address，不能取代 residence address。',
      '文件上的姓名要使用 full legal name，不能用 nickname 或缩写，姓名不同就补齐每一段 certified change record。',
      '已经签发 SSN 的申请人要提供号码，DMV 能电子核验时可能免纸质证明，没有 SSN 的情形按 Document Guide 分流。',
      'temporary authorized applicant 要按当前身份准备 legal-presence 文件，EAD I-766 本身不能单独证明 REAL ID legal presence。',
      '外州换证应带 current out-of-state license，新居民同时申请 REAL ID 时仍要补齐 Virginia REAL ID 全套文件。',
      '互惠外国驾照申请人先提交 DL 7 与清晰驾照副本，收到 approval letter 后再带身份、legal presence、两份住址、SSN 和 current foreign license 到 DMV。',
      'Driver Privilege Card 采用另一套材料，要有 two identity、two Virginia residency、SSN 或 ITIN、tax return documentation，并为外文文件附 professional translator 的 certified English translation。',
    ],
    commonMistakes: [
      '把在线 start application 误解成上传材料，把 passport、出生证或 SSN 图片交给声称能代办 REAL ID 的第三方网站。',
      '已有其他州 REAL ID 就以为换成 Virginia 驾照时可以跳过首次 REAL ID 材料核验。',
      '只带一份 Virginia residency，或用 P.O. box 代替 residential street address。',
      '带 temporary document、普通 photocopy 或手机照片，忽略 DMV 要求原件和 certified name-change records。',
      '文件使用 nickname、缩写或不一致姓名，却没有带完整姓名变更链。',
      '只带 EAD I-766 就认定足够申请 REAL ID，没有核对 Virginia 的 Acceptable Documents by Status。',
      '把驾照 60 天期限和车辆 30 天期限混为一谈，导致 vehicle title 或 registration 逾期。',
      '搬家只向 USPS 更新地址，未在 30 天内改 DMV residence、mailing 和 vehicle registration records。',
      '临近到期或旅行才在线续期或补证，没有为不转寄的邮件至少预留 15 天。',
      '拿 Federal Limits Apply 的 Standard license 去规划国内航班，没有准备 REAL ID、passport 或其他 TSA accepted ID。',
      '把 Taiwan reciprocity 当成 knowledge test 也免除，或在未取得 DMV verification approval 前直接到场换证。',
      '非互惠外国驾照持有人直接预约免试换证，没有准备 knowledge、road skills 和 vision tests。',
      '只看当前 60 天成人 permit 规则，没有注意 2027 年 1 月 1 日起 18 至 20 岁首次申请人改为 90 天加驾驶教育。',
      'Road skills test 自备车辆缺少 inspection sticker、registration、有效车牌或必要安全设备。',
    ],
    recommendedSteps: [
      '先判断自己是否需要用州证件登机或进入受限联邦设施，有有效 passport 等替代证件时可继续保留 Standard license。',
      '需要 REAL ID 时只从 Virginia DMV 官方页启动申请，并用 Online Document Guide 生成个人清单，不上传任何证件图片。',
      '按 identity、legal presence、two residency、SSN 和 full name-change chain 五栏整理原件，再预约或到 customer service center。',
      '搬家或改名时先完成 30 天地址更新和必要的原始姓名文件核验，再续期、补证或申请 REAL ID。',
      '新居民把普通驾照 60 天、CDL 30 天和车辆 title/registration 30 天分别列入日历，并先处理保险、inspection 和车辆材料。',
      '续期先确认是否轮到本人到场，补证先检查线上排除条件，交易后打印 receipt 并预留至少 15 天收件。',
      '首次驾驶人按办理日期和年龄选择 permit 期限，尤其要区分 2027 年 1 月 1 日前后的 18 至 20 岁规则。',
      'Knowledge test 前用中文或繁体中文资料练习 10 道 signs 全对与 24/30 general knowledge 的通过线。',
      'Road skills test 前核对 CSMA 140、permit、driver education 或 observation record，以及车辆 inspection、registration 和安全设备。',
      '外国驾照先判断是否属于六个互惠国家，Taiwan 申请人单独准备 knowledge test，其他互惠国家先完成 DL 7 verification。',
      '无法满足 legal-presence 要求的非美国公民先核对 Driver Privilege Card 的税务、身份和住址条件，不要把它当成 REAL ID。',
      '完成交易后使用 Track Your DMV Products 查看生产和寄送状态，地址错误或 USPS 退件时及时联系 DMV。',
    ],
    actionLinks: [
      {
        label: 'Virginia REAL ID',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id',
        description: '判断 Standard 与 REAL ID 用途，并查看材料、$10 fee 和现场流程。',
      },
      {
        label: 'REAL ID FAQ',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id/faq',
        description: '查看首次到场、线上续期、姓名链、替代文件和防诈骗提醒。',
      },
      {
        label: 'DMV 141 材料清单',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/dmv141.pdf',
        description: '核对 identity、legal presence、Virginia residency 和 SSN 文件。',
      },
      {
        label: '申请 Virginia 驾照',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying',
        description: '查看训练、材料、考试、$32 标准驾照和 2027 年规则变化。',
      },
      {
        label: '驾照资格与新居民',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/eligibility',
        description: '核对最低年龄、新居民、学生、军人和居民身份边界。',
      },
      {
        label: '续期 Virginia 驾照',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/renewing',
        description: '查看提前一年、隔次到场、有效期、寄送和过期重考规则。',
      },
      {
        label: '补发 License / Permit',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/replace',
        description: '查看 $20/$2 费用、线上排除条件、照片和 REAL ID upgrade。',
      },
      {
        label: 'Online Replacement Transaction',
        url: 'https://www.dmv.virginia.gov/online-services/replace-license',
        description: '线上补证前核对地址、USPS 不转寄规则、receipt 和 15 天寄送窗口。',
      },
      {
        label: '地址/姓名更新',
        url: 'https://www.dmv.virginia.gov/records/personal-information-updates',
        description: '处理 30 天地址期限、residence address 和原始姓名文件。',
      },
      {
        label: 'New to Virginia',
        url: 'https://www.dmv.virginia.gov/moving/new-virginia',
        description: '分别处理驾照 60 天、CDL 30 天和车辆 30 天事项。',
      },
      {
        label: 'Knowledge Exam',
        url: 'https://www.dmv.virginia.gov/licenses-ids/exams/know-exam',
        description: '查看中文语言、两部分通过线、重考等待与三次失败规则。',
      },
      {
        label: 'Road Skills Test',
        url: 'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
        description: '核对 translator、车辆、材料、预约和 walk-in 截止时间。',
      },
      {
        label: 'Learner Permit',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/apply',
        description: '查看 $3 permit fee、最低年龄、材料和 2027 年持证期限变化。',
      },
      {
        label: '外国驾照换领',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/exchange-foreign-dl',
        description: '查看六国互惠、DL 7 verification、Taiwan knowledge test 和非互惠考试。',
      },
      {
        label: 'Driver Privilege Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/driver-privilege-card',
        description: '不满足 legal presence 时核对税务、材料、考试、$50 fee 和续期。',
      },
      {
        label: 'Virginia Legal Presence',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/legal-presence',
        description: '按身份核对 legal-presence 文件及 EAD I-766 的 REAL ID 限制。',
      },
      {
        label: 'Virginia DMV Fee Chart',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/dmv201.pdf',
        description: '查看 2026 年驾照、REAL ID、permit、replacement 和 privilege card 费用。',
      },
      {
        label: '预约、E-ticket 与 Walk-in',
        url: 'https://www.dmv.virginia.gov/appointments',
        description: '比较预约、同日 e-ticket、walk-in 和等待时间。',
      },
      {
        label: 'Track DMV Products',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/tracking',
        description: '查看驾照、ID、车牌和 placard 的生产与邮寄状态。',
      },
      {
        label: 'Online Services',
        url: 'https://www.dmv.virginia.gov/online-services-all',
        description: '进入地址、续期、补证和其他 Virginia DMV 线上交易。',
      },
      {
        label: 'TSA 可接受身份证件',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        description: '确认国内航班接受的 REAL ID 与替代身份证件。',
      },
    ],
    sources: [
      {
        label: 'Virginia DMV REAL ID',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id',
        note: 'REAL ID 用途、材料、费用、现场流程和防诈骗提醒。',
      },
      {
        label: 'Virginia DMV REAL ID FAQ',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id/faq',
        note: '首次到场、在线续期、姓名变更与材料替代。',
      },
      {
        label: 'Virginia DMV Document Guide DMV 141',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/dmv141.pdf',
        note: '驾照和 Photo ID 的 acceptable documents。',
      },
      {
        label: 'Virginia DMV Apply for a Driver License',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying',
        note: '训练、材料、考试、费用、有效期和 2027 年变化。',
      },
      {
        label: 'Virginia DMV Driver License Eligibility',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/eligibility',
        note: '年龄、新居民、学生、军人和居民资格。',
      },
      {
        label: 'Virginia DMV Renew Driver License',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/renewing',
        note: '续期窗口、渠道、有效期、寄送和过期重考。',
      },
      {
        label: 'Virginia DMV Replace License or Permit',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/replace',
        note: '补证费用、线上资格、照片与 REAL ID upgrade。',
      },
      {
        label: 'Virginia DMV Online License Replacement',
        url: 'https://www.dmv.virginia.gov/online-services/replace-license',
        note: '地址核对、USPS 不转寄、receipt 和寄送时间。',
      },
      {
        label: 'Virginia DMV Personal Information Updates',
        url: 'https://www.dmv.virginia.gov/records/personal-information-updates',
        note: '地址 30 天规则、姓名与 sex designation。',
      },
      {
        label: 'Virginia DMV New to Virginia',
        url: 'https://www.dmv.virginia.gov/moving/new-virginia',
        note: '驾照、CDL、车辆、inspection、insurance 和 registration 期限。',
      },
      {
        label: 'Virginia DMV Knowledge Exam',
        url: 'https://www.dmv.virginia.gov/licenses-ids/exams/know-exam',
        note: '考试结构、语言、通过线和重考规则。',
      },
      {
        label: 'Virginia DMV Road Skills Test',
        url: 'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
        note: '车辆、translator、材料和到场时间。',
      },
      {
        label: 'Virginia DMV Learner Permit',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/apply',
        note: 'permit 材料、费用、年龄与持证期限。',
      },
      {
        label: 'Virginia DMV Foreign License Exchange',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/exchange-foreign-dl',
        note: '六国互惠、Taiwan 特例、DL 7 核验和非互惠考试。',
      },
      {
        label: 'Virginia DMV Driver Privilege Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/driver-privilege-card',
        note: '税务资格、材料、考试、费用、联邦用途和续期。',
      },
      {
        label: 'Virginia DMV Legal Presence',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/legal-presence',
        note: 'legal presence 定义、身份文件和 EAD I-766 限制。',
      },
      {
        label: 'Virginia DMV Fee Chart',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/dmv201.pdf',
        note: '2026 年 DMV 费用总表。',
      },
      {
        label: 'Virginia DMV Plan Your Visit',
        url: 'https://www.dmv.virginia.gov/appointments',
        note: 'appointment、e-ticket、walk-in 和线上服务。',
      },
      {
        label: 'Virginia DMV Product Tracking',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/tracking',
        note: '驾照、ID、车牌与 placard 生产寄送状态。',
      },
      {
        label: 'Virginia DMV Online Services',
        url: 'https://www.dmv.virginia.gov/online-services-all',
        note: 'DMV 线上交易总入口。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受身份证件清单。',
      },
    ],
    relatedTopicSlugs: [
      'document-checklist',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
    ],
  },
  {
    id: 'north-carolina',
    abbr: 'NC',
    nameEn: 'North Carolina',
    nameZh: '北卡罗来纳州',
    agency: 'North Carolina Division of Motor Vehicles',
    agencyUrl: 'https://www.ncdot.gov/dmv/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      'North Carolina REAL ID 完全自愿，Standard license 或 ID 仍可用于驾驶、投票和多数日常事务，但国内航班及部分联邦设施要改用 REAL ID、passport 或 TSA 接受的其他身份证件。',
    realIdSummary:
      '首次 North Carolina REAL ID 必须到 driver license office，通常要带一份 identity/date of birth、一份显示完整 SSN 的证明、两份当前 North Carolina physical address、适用的 legal presence 与完整姓名变更链，申请驾照还要提供 North Carolina 认可的 liability insurance proof。',
    licenseSummary:
      '在 North Carolina 建立 permanent residence 后，计划驾驶者要在 60 天内取得本州驾照，通常应先完成 license/ID，再按就业开始日或原州 reciprocity 期限处理车辆 title/registration，车辆期限通常约 30 天且必须使用 North Carolina insurance。',
    appointmentNote:
      'Driver license office 预约最多提前 7 天，每个工作日释放新名额，收到链接后须在 15 分钟内确认。所有 driver license offices 也接收营业时间内 walk-in，直到当日容量满，license plate agency 不提供这类预约，也不能代办驾照或 REAL ID。',
    editorNotes: [
      '第一张 North Carolina REAL ID 不能在线取得，必须到 driver license office，所需文件会被扫描并永久保存在 NCDMV 记录中，已有 REAL ID 后才可能按续期资格在线办理。',
      'North Carolina REAL ID 本身没有额外附加费，到期前 6 个月内升级按 renewal 处理，超过 6 个月则按 $16.75 replacement 处理。',
      '在 renewal window 外升级 REAL ID 要重新拍照但通常不重考，到期前 6 个月内升级则要做 vision test 并重新拍照。',
      'North Carolina 是 one-credential state，签发新的或 replacement license/ID 后，其他州的 noncommercial license 或 ID 会通过 State-to-State Verification 自动取消。',
      '即使只申请 North Carolina state ID，若它成为最近签发的州证件，也可能取消仍在使用的外州驾照，不想取消外州证件就不要完成 North Carolina credential 签发。',
      'REAL ID driver license 核心材料是一份 identity/date of birth、一份带 full SSN 的证明、两份 current physical address、适用的 legal presence 与每段姓名变更文件，另加 North Carolina liability insurance。',
      'REAL ID identification card 与 REAL ID driver license 的身份、SSN、两份住址、姓名链和 legal presence 规则相近，但 state ID 不要求 liability insurance。',
      'Certified birth certificate 的普通 photocopy 不被接受，除非复印件由签发机构认证，美国 digital passport 也不能代替有效实体 passport。',
      'REAL ID 的 SSN 证明必须显示 full Social Security number，Social Security card 不接受 photocopy、laminated card 或金属/塑料复制品。',
      '1099、W-2 或 payroll record 可作为 REAL ID SSN 证明，但必须显示 full SSN，且姓名要和 identity document 对得上。',
      '多次姓名变化要用多份 certified documents 串起每一段，国际 marriage license 要是 original 或 certified，并同时附 Name Change Affidavit。',
      'NCDMV 将 legal-presence 文件分成“可办 REAL ID”和“只能办非 REAL ID”两组，I-20、DS-2019、单独 I-94、部分 I-797 等不能因为可办 Standard credential 就自动用于 REAL ID。',
      '外国 passport 用作 North Carolina REAL ID 文件时，必须有效且未过期，并附有效美国 visa 与 I-94 Arrival/Departure Record。',
      '首次申请 driver license 的 liability insurance 必须来自获准在 North Carolina 营业的保险公司，并在证明上列出每位申请驾驶人，learner permit 不要求该保险证明。',
      '当前 NCDMV 允许带纸质保险证明，或在 driver license office 由工作人员引导安全上传 digital copy，直接展示普通手机图片不是同一办理路径。',
      '2026 年启用的 in-office upload tool 目前用于保险和住址材料，不能据此把 identity、SSN、legal presence 或姓名文件都改成手机照片。',
      '18 岁及以上首次申请普通驾照者要本人到 driver license office，并完成 written knowledge、traffic signs、vision 和 driving skills 四类测试。',
      '普通 Class C knowledge 或 driving test 未通过后，要等 7 个 calendar days 才能重考。',
      '官方只说明 written knowledge test 提供不同语言并可按请求安排 oral test，没有在该页公开逐项语言清单，不要在未确认考点前保证一定有中文版本。',
      '不熟悉英语的居民可在线或致电 (919) 715-7000 请求 language interpreter 协助 DMV transaction，但该服务说明不等于允许口译员代译考试答案。',
      '持 learner permit 的成人和申请 Level 2 的青少年可选择 NCDMV certified driver education school 完成 road test，学校自行定价，之后仍要到 NCDMV 完成最终发证交易。',
      '首次办证后会收到 60-day Temporary Driving Certificate，正式卡通常在 20 个 business days 内寄到，临时证只可用于驾驶，不能当作 photo identification。',
      '普通 Class C 驾照当前为 $6.50 per year，18 至 65 岁通常签发 8 年，按现行费率合计 $52，66 岁及以上通常 5 年，合计 $32.50。',
      'Adult learner permit 当前为 $25.50，duplicate license/ID 为 $16.75，PayIt 线上交易另收每笔 $3 加 1.85% card processing fee。',
      'Non-REAL ID license/ID 目前可连续两次 online renewal，REAL ID 要连续第二次线上续期，则上次续期后须有一次本人到场并拍新照片的交易。',
      '有美国政府签发的 legal-presence document、驾照暂停或欠款、普通 Class A/B、CDL、learner permit 或特定 restriction 的人不能走普通 online renewal。',
      '线上 replacement 要求 credential 仍为 active、NCDMV 照片不超过 5 年并知道 DL/ID number，持 legal-presence document、要首次升级 REAL ID、被暂停或欠款者须到场。',
      '姓名变化后 60 天内要通知 NCDMV，先到 Social Security Administration 更新并至少等待 24 小时，再带 certified name-change proof 到 driver license office。',
      'North Carolina 州内搬家后 60 天内要更新 physical address，并取得 replacement license/ID 与 replacement vehicle registration card，当前费用分别为 $16.75 和 $25.50。',
      '新居民持有效其他美国州驾照时，written 和 road tests 可能获免，官方没有对外国驾照作同样免试承诺，不应预设外国驾照可直接换领。',
      '在 North Carolina 合法驾驶需要美国州或其他国家政府签发的有效驾照，International Driving Permit 或所谓 international driver license 本身不被 North Carolina 执法机关承认为驾照。',
      '新居民要先取得 North Carolina license/ID，再办理车辆，车辆登记通常要在开始 gainful employment 或原州 reciprocity 期限届满时完成，通常约 30 天，且不接受外州保险。',
      '新居民首次登记车辆可以先不做 North Carolina inspection，但下一次 renewal 前必须完成检查。',
    ],
    documentHighlights: [
      '先用 NCDMV REAL ID Document Wizard 生成个人清单，再回到 Requirements 页面逐项核对，向导结果不能替代柜台最终审核。',
      '按 identity/date of birth、full SSN、two residency、legal presence、name changes 和 liability insurance 六栏整理，state ID 不需要最后一栏。',
      '所有文件都使用一致的 full legal name，不一致时先列出从出生姓名到当前姓名的完整变化顺序。',
      '出生证明使用 issuing agency 签发的 certified copy，不带普通 photocopy，passport 使用有效实体证件而不是 digital version。',
      'SSN 栏优先准备未覆膜的原始 Social Security card，或显示 full SSN 的 1099、W-2、payroll record。',
      '两份 residency 都要显示当前 North Carolina physical address，可用政府文件、utility/cable bill、lease、mortgage、tax、preprinted financial statement、school record 等官方认可材料。',
      'Driver license 的保险证明应显示申请人姓名、policy number、effective/expiration dates，并确认 insurer 获准在 North Carolina 营业。',
      '忘带保险或住址打印件时，只使用柜台提供的 secure upload 流程，不要把身份证明或移民文件上传给来历不明的链接。',
      '非美国公民申请 REAL ID 时，按 REAL ID legal-presence 清单准备 I-551、I-766、合规 foreign passport/visa/I-94 或其他列明文件。',
      '学生、交换访问者或其他临时身份先比较 legal-presence 页面两张表，能办 Standard credential 的 I-20、DS-2019 或 I-94 组合不一定能办 REAL ID。',
      '国际 marriage license 要有 raised seal 或 certifying ink stamp，并附 NCDMV Name Change Affidavit，多次改名继续补齐每一段文件。',
      '新居民带 current out-of-state license，另准备 SSN、North Carolina physical address、适用的 legal presence 和本州 liability insurance，同时申请 REAL ID 时仍要补足两份住址等升级材料。',
    ],
    commonMistakes: [
      '以为第一次 REAL ID 可以在线申请，或在线续期时顺便上传文件完成首次升级。',
      '只带一份 North Carolina residency，或者材料显示 mailing address 而不是 current physical address。',
      '把 license plate agency 当成 driver license office，预约后才发现不能办理驾照、ID 或 REAL ID。',
      '把 2026 in-office upload tool 理解为所有证件都可用手机照片，缺少身份、SSN、legal presence 或姓名文件原件。',
      'SSN 文件只显示 last four digits，或带 laminated Social Security card、普通 photocopy 和复制品。',
      '当前姓名和 birth certificate、passport 或 SSN 文件不一致，却没有带完整 certified name-change chain。',
      '持 I-20、DS-2019、单独 I-94 或部分 I-797 就认定一定符合 REAL ID，没有先看 legal-presence 的两组文件。',
      '直接向柜员展示保险截图，却没有纸质证明，也没有使用办公室提供的 secure upload 流程。',
      '看到“different languages”就断言某个考点一定提供中文，或把 transaction interpreter 当成可以代答或代译考试。',
      '把 International Driving Permit 当作独立驾照，忽略 North Carolina 要求有效政府签发的国内或外国驾照。',
      '把外州驾照的 possible test waiver 套到外国驾照上，未准备 knowledge、sign、vision 和可能的 road test。',
      '持有 legal-presence document 仍直接尝试 online renewal 或 replacement，没有预留本人到场时间。',
      '把 60-day Temporary Driving Certificate 当成可登机或开户的 photo ID，正式卡未到又没有其他身份证件。',
      '把驾照 60 天期限和车辆通常约 30 天的期限混在一起，或用外州 insurance 去办 North Carolina registration。',
      '外州学生只为银行或住房申请 North Carolina ID，却没意识到新签发 ID 可能自动取消仍要驾驶使用的外州 license。',
    ],
    recommendedSteps: [
      '先判断自己是否确实需要州证件用于国内航班或受限联邦设施，已有有效 passport 时，可继续使用 Standard license 并避免不必要的升级交易。',
      '需要第一张 REAL ID 时只从 NCDMV 官方页面进入 Document Wizard，并确认选择的是 driver license office 而不是 license plate agency。',
      '把 identity、full SSN、two physical-address proofs、legal presence、name chain 与 insurance 分栏，到场前逐项核对姓名和地址。',
      '非美国公民先在 legal-presence 页面判断文件属于 REAL ID 组还是 Standard-only 组，不根据签证类别自行推断。',
      '准备 North Carolina liability insurance 的纸质证明，临时忘带时只按柜台工作人员给出的 secure upload 流程操作。',
      '预约时选 First Time、Duplicate、Renewal 或 ID Card 对应业务，并在收到确认链接后 15 分钟内确认，没有名额时可评估 walk-in 容量。',
      '新居民把 license 60 天和 vehicle registration 通常约 30 天分别记入日历，先取得 license/ID，再处理 North Carolina insurance、title 和 registration。',
      '首次考试前按 knowledge、traffic signs、vision、road skills 四项准备，需要语言帮助时先向考点确认实际语言，并单独申请 transaction interpreter。',
      '已经持成人 learner permit 时，可比较 NCDMV office 与 certified driver education school 的 road test 时间和价格，完成后仍回 NCDMV 办最终证件。',
      '完成交易后保留 60-day Temporary Driving Certificate，但另备 passport 等 photo ID，并为正式卡预留 20 个 business days。',
      '续期或补证前先看 online eligibility，legal-presence、REAL ID 首次升级、暂停欠款或特殊 class/restriction 直接安排 office visit。',
      '搬家或改名后在 60 天内更新，改名先完成 SSA 记录并等待至少 24 小时，再到 NCDMV 办 replacement。',
    ],
    actionLinks: [
      {
        label: 'N.C. REAL ID',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/default.aspx',
        description: '判断是否需要、首次到场、无额外附加费、$16.75 非续期窗口升级和证件扫描说明。',
      },
      {
        label: 'REAL ID Requirements',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/requirements.aspx',
        description: '逐项核对 identity、full SSN、two residency、legal presence、姓名链和保险。',
      },
      {
        label: 'REAL ID Document Wizard',
        url: 'https://www.ncdot.gov/dmv/real-id-wizard/Pages/default.aspx',
        description: '生成个人化 REAL ID 材料清单。',
      },
      {
        label: 'New Adult Drivers',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/default.aspx',
        description: '首次普通驾照材料、四类考试、保险、有效期和临时证。',
      },
      {
        label: 'Driver License Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
        description: '查看 knowledge、sign、vision、road test、语言与 7 天重考等待。',
      },
      {
        label: 'Interpreter Services',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx',
        description: '在线或电话申请 DMV transaction 的语言或 ASL 协助。',
      },
      {
        label: 'Certified School Road Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-schools-road-tests.aspx',
        description: '成人 permit 与 Level 2 申请人比较 certified school road test。',
      },
      {
        label: 'License & ID Renewal',
        url: 'https://www.ncdot.gov/dmv/license-id/Pages/license-renewal.aspx',
        description: '检查连续两次线上续期、legal-presence 排除条件、kiosk 和 office 路径。',
      },
      {
        label: 'Replace License or ID',
        url: 'https://www.ncdot.gov/dmv/license-id/Pages/license-id-replacement.aspx',
        description: '查看照片 5 年、active status、线上排除、姓名变化和 20 天寄送。',
      },
      {
        label: 'Licenses & Fees',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/licenses-fees.aspx',
        description: '核对 Class C、permit、duplicate 和线上服务费用。',
      },
      {
        label: 'Proving Legal Presence',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-legal-presence.aspx',
        description: '区分 REAL ID 可接受文件与只能办理 Standard credential 的文件。',
      },
      {
        label: 'Proving Social Security',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-social-security.aspx',
        description: '核对 full SSN、原卡、1099、W-2 与禁止的复印/覆膜卡。',
      },
      {
        label: 'Proving Liability Insurance',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-insurance.aspx',
        description: '查看 North Carolina insurer、申请人列名、纸质或现场安全上传规则。',
      },
      {
        label: '搬家 / 新居民',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/default.aspx',
        description: '选择搬入、州内搬家或搬出 North Carolina 的处理路线。',
      },
      {
        label: 'New Residents',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/new-residents.aspx',
        description: '处理 license 60 天、车辆通常约 30 天、外州换证、IDP 和 NC insurance。',
      },
      {
        label: 'Moving Within N.C.',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/moving-within-nc.aspx',
        description: '处理 60 天地址更新和 replacement license/registration 费用。',
      },
      {
        label: 'State-to-State Verification',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/state-to-state-verification.aspx',
        description: '理解 North Carolina 新证件如何取消其他州 license 或 ID。',
      },
      {
        label: 'Driver License Appointments',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-license-appointments/Pages/default.aspx',
        description: '查看 7 天预约、15 分钟确认、业务类型和 language service。',
      },
      {
        label: 'DMV Office Locations',
        url: 'https://www.ncdot.gov/dmv/offices-services/locate-dmv-office/Pages/dmv-offices.aspx',
        description: '区分 driver license office、license plate agency 和其他服务点。',
      },
      {
        label: 'In-office Document Upload Update',
        url: 'https://www.ncdot.gov/news/press-releases/Pages/2026/2026-06-02-ncdmv-document-upload-tool.aspx',
        description: '了解 2026 现场 secure upload 对保险和住址材料的适用边界。',
      },
      {
        label: 'North Carolina Driver Handbook',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Documents/driver-handbook.pdf',
        description: '核对 current fees、license duration、考试与临时证细节。',
      },
      {
        label: 'TSA 可接受身份证件',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        description: '确认国内航班可使用的 REAL ID 与替代身份证件。',
      },
    ],
    sources: [
      {
        label: 'NCDMV N.C. REAL ID',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/default.aspx',
        note: '首次到场、用途、费用、证件扫描和外州证件注销。',
      },
      {
        label: 'NCDMV REAL ID Requirements',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/requirements.aspx',
        note: 'identity、SSN、residency、legal presence、姓名变化和保险。',
      },
      {
        label: 'NCDMV REAL ID Document Wizard',
        url: 'https://www.ncdot.gov/dmv/real-id-wizard/Pages/default.aspx',
        note: '个性化材料清单入口。',
      },
      {
        label: 'NCDMV New Adult Drivers',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/default.aspx',
        note: '首次驾照材料、考试、保险、有效期和卡片寄送。',
      },
      {
        label: 'NCDMV Driver License Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
        note: '考试类型、语言、oral test、7 天重考和 road skills。',
      },
      {
        label: 'NCDMV Interpreter Services',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx',
        note: 'language interpreter 与 ASL 请求方法。',
      },
      {
        label: 'NCDMV Certified School Road Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-schools-road-tests.aspx',
        note: '成人 permit 与青少年 Level 2 的校外 road test 路径。',
      },
      {
        label: 'NCDMV License & ID Renewal',
        url: 'https://www.ncdot.gov/dmv/license-id/Pages/license-renewal.aspx',
        note: 'online、kiosk、office、连续续期和排除条件。',
      },
      {
        label: 'NCDMV License & ID Replacement',
        url: 'https://www.ncdot.gov/dmv/license-id/Pages/license-id-replacement.aspx',
        note: '线上资格、照片、姓名、地址和寄送。',
      },
      {
        label: 'NCDMV Licenses & Fees',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/licenses-fees.aspx',
        note: '普通驾照、permit、duplicate 与 PayIt 费用。',
      },
      {
        label: 'NCDMV Proving Legal Presence',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-legal-presence.aspx',
        note: 'REAL ID 与 Standard-only legal-presence 文件分组。',
      },
      {
        label: 'NCDMV Proving Social Security',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-social-security.aspx',
        note: 'full SSN 文件与不可接受形式。',
      },
      {
        label: 'NCDMV Proving Liability Insurance',
        url: 'https://www.ncdot.gov/dmv/help/Pages/proving-insurance.aspx',
        note: '本州保险、列名和现场安全上传。',
      },
      {
        label: 'NCDMV Moving',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/default.aspx',
        note: '搬入、州内搬家与搬出路线。',
      },
      {
        label: 'NCDMV Moving to North Carolina',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/new-residents.aspx',
        note: '60 天驾照、车辆通常 30 天、保险、inspection 与 IDP。',
      },
      {
        label: 'NCDMV Moving Within North Carolina',
        url: 'https://www.ncdot.gov/dmv/help/moving/Pages/moving-within-nc.aspx',
        note: '60 天地址与姓名更新、duplicate card 费用。',
      },
      {
        label: 'NCDMV State-to-State Verification',
        url: 'https://www.ncdot.gov/dmv/license-id/nc-real-id/Pages/state-to-state-verification.aspx',
        note: 'one-credential state 与外州证件自动取消。',
      },
      {
        label: 'NCDMV Driver License Appointments',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-license-appointments/Pages/default.aspx',
        note: '7 天预约窗口、15 分钟确认、业务类型和口译入口。',
      },
      {
        label: 'NCDMV DMV Office Locations',
        url: 'https://www.ncdot.gov/dmv/offices-services/locate-dmv-office/Pages/dmv-offices.aspx',
        note: 'driver license office 与 license plate agency 查询。',
      },
      {
        label: 'NCDMV In-office Document Upload Update',
        url: 'https://www.ncdot.gov/news/press-releases/Pages/2026/2026-06-02-ncdmv-document-upload-tool.aspx',
        note: '2026 年保险与住址材料 secure upload 变化。',
      },
      {
        label: 'North Carolina Driver Handbook',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Documents/driver-handbook.pdf',
        note: '当前费用、有效期、考试与 Temporary Driving Certificate。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受身份证件清单。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
    ],
  },
  {
    id: 'michigan',
    abbr: 'MI',
    nameEn: 'Michigan',
    nameZh: '密歇根州',
    agency: 'Michigan Secretary of State',
    agencyUrl: 'https://www.michigan.gov/sos/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '密歇根驾照和州 ID 由 Secretary of State 管理，办事前先区分 Standard、REAL ID-compliant 与 Enhanced 三类证件，再判断自己是首次申请、外州转入、续期、补证还是已有标准证件升级。',
    realIdSummary:
      'Michigan REAL ID 完全自愿，Standard license 或 ID 仍可用于驾驶和多数州内身份用途，但国内航班及受限联邦设施要使用带合规标志的 REAL ID、自动合规的 Enhanced credential、passport 或 TSA 接受的其他证件。',
    licenseSummary:
      'Michigan license/ID 通常每 4 年在生日到期，可提前 1 年至到期后 4 年办理续期，但线上、邮寄或 self-service station 资格因照片、合法居留、既往续期方式和证件状态而异，多数居民约每 12 年仍需本人到场更新照片，驾驶人还要做视力检查。',
    appointmentNote:
      'Secretary of State office 可提前最多 6 个月预约，未预约到场者会被安排下一个可用时段，可能是当天稍后或下一个工作日，因此首次办证、REAL ID 转换和姓名更正宜先预申请并预约。',
    editorNotes: [
      '已有 Michigan Standard credential 的人必须到 Secretary of State office 才能转换 REAL ID，并带当前证件、美国公民或合法居留证明，以及姓名不一致时的完整姓名变更文件。',
      '在正常 renewal 或 replacement 同时转换 REAL ID 不加收升级费，其他时间转换按 correction 收取 driver license $9 或 state ID $10。',
      '首次满足 Michigan 驾照全部要求的申请人通常会获发 REAL ID-compliant license，除非主动选择退出，但首次 REAL ID 仍需要到场和额外文件核验。',
      'Enhanced license/ID 只适用于符合美国公民和 Michigan 居民条件者，必须到场申请，可用于从加拿大、墨西哥、百慕大或加勒比地区经陆路或海路返回美国，也自动符合 REAL ID，但不能替代国际航空所需 passport。',
      '非美国公民申请或续期时要通过联邦 SAVE 核验，官方当前提示多数延迟案例从受理到处理约 40 天，这只是动态估计而不是承诺时限。',
      'Michigan 当前合法居留清单不接受 B1、B2、WB 或 WT 作为办证依据，F 身份通常要随 foreign passport、visa 和 I-94 提交 I-20，J 身份还要提交 DS-2019。',
      '首次 license/ID 需要 legal presence、SSN、identity、两份 Michigan residency 和适用的姓名变更文件，license 申请人另做视力检查，18 岁及以上首次驾驶人还要完成知识与路考路径。',
      'SSA-L676 无 SSN 资格信的时效在官方材料间存在冲突，当前交易说明要求 60 天内签发，而 SOS-428 仍写一年，实际准备时应采用更严格的 60 天标准并在预约前确认。',
      'Utility、credit-card bill 或 bank statement 用作住址证明时须为 90 天内文件，电子版本可接受，住址必须是 Michigan residential street address，P.O. Box 只能另作 mailing address。',
      '姓名与出生或合法居留文件不一致时要用原始 marriage certificate、certified divorce decree 或美国法院命令串联，经历多次改名时可能需要多份文件。',
      '18 岁及以上且过去 4 年没有 Michigan 或其他美国州驾照的首次驾驶人通常先通过知识和视力检查取得 $25 TIP，TIP 有效 180 天并要求至少 30 天由持照成人监督练习后才能路考。',
      '18 岁及以上可选择线上 knowledge test，当前总收费 $6.50，需带键盘和鼠标的电脑及 webcam，Operator 与 Signs 两部分约需 45 分钟和 15 分钟，办公室考试免费。',
      '线上和办公室 knowledge test 提供多种外语及 audio/written 格式，官方另有 2025 年版中文驾驶手册，但中文手册的存在不等于每个考试渠道都保证中文，考试前应向实际入口或考点确认。',
      'Michigan 路考由获授权的独立 driver testing business 执行，第三方收费不受 Department of State 统一定价，预约前应询问初考、重考、取消和材料不合格费用。',
      '路考车辆要有安全设备、有效 registration、当年 plate tab 和 Michigan No-Fault insurance，口译员可翻译 examiner 指令，但考生不能使用笔记、手机或其他辅助设备。',
      '路考任一组成部分失败会终止当次考试，同一申请人 24 小时内只能参加一次 driving skills test，考官签发的 receipt 本身不是驾照。',
      '路考结果电子送达后可从 e-Services 获取 Temporary Operator License，24 小时后仍未显示结果时应带 test certificate、TIP 和身份文件到 office 处理。',
      'Michigan 新驾驶人取得 operator license 后至少有 3 年 probationary period，最后 10 个月出现责任事故、饮酒事故、暂停或交通定罪会延长该期限。',
      '临时合法居留者的 limited-term license 只签发到获准留美期限，身份核验或延期处理中不能依据旧卡自行推断新的有效期。',
      '当前普通 first-time driver license 为 $25，Standard ID 为 $10，Enhanced driver license 为 $45，Enhanced ID 为 $30。',
      '普通 driver license 续期为 $18，逾期通常为 $25，Enhanced license 为 $38 或逾期 $45，Standard ID 续期 $10，Enhanced ID 续期 $30。',
      'Self-service station 每个办理项目另收 $4.25 service fee，信用卡或借记卡在其他渠道也可能产生 additional fees。',
      '最近两次都用线上、邮寄或 station 续期、非美国公民需要复核合法居留、照片超过 12 年、线上改址未满 28 天、证件逾期超过 4 年或被暂停撤销者，通常不能继续走普通 online renewal。',
      '补证可从 online、仅限外州居民的 mail、self-service station 或 office 开始，Standard duplicate 通常 $9，Enhanced duplicate $24，station 可打印 temporary credential。',
      '最近 28 天内改过地址或已经申请过 replacement 的人通常要到 office 提供 identity proof，不能反复在线补证。',
      '线上改址需要 Michigan license/ID number 和 SSN 后四位，车辆地址另需 plate number，license/ID 与 vehicle registration 地址必须分别更新，除非线上流程同时选择两项。',
      'Standard credential 改址后会邮寄背面贴纸，Enhanced credential 会邮寄新卡，官方改址说明未列统一天数，但要求先完成 USPS change-of-address 以免证件和续期通知无法投递。',
      '姓名更正必须先更新 Social Security Administration 记录，再带当前 Michigan credential 和 legal name-change document 到 office，当前 correction fee 为 license $9、ID $10。',
      'Michigan 当前 treaty 表把 China 列为 non-treaty、把 China (Taiwan) 列为 treaty，因此中国大陆驾照访客除英文驾照或英文翻译外还须能出示美国合法居留证明，台湾驾照访客按 treaty 路径不要求该项州内证明。',
      '外国访客可持有效本国驾照加英文文本或 English translation/IDP 驾驶，IDP 只是随原驾照携带的翻译，不能单独当作驾照。',
      '外国驾照在申请 Michigan credential 时只能证明 driving experience，不能作为 identity 或 legal presence，也不享有美国州、领地或加拿大有效驾照的直接 conversion 路径。',
      '新居民持有效且未过期的其他美国州、美国领地或加拿大驾照，可预申请并到 office 提交原证件、合法居留、SSN、identity 和两份 Michigan residency 走 conversion，官方新居民说明没有公布统一的搬入后办证天数。',
      '新居民办理 Michigan plate 通常要带原始 vehicle title、Michigan No-Fault insurance、license/ID 或有效 passport、适用的 lienholder 文件和费用，title photocopy 不被接受。',
      'office 交易后领取的是 temporary paper credential，永久证件由安全设施制作并邮寄，可在 Online Services 的 View Credential Mail Status 查看 processed、mailed 或 USPS undeliverable 状态。',
    ],
    documentHighlights: [
      '已有 Michigan credential 转换 REAL ID 时，带当前 license/ID、一份美国公民或合法居留证明，以及从原姓名连接到当前姓名的适用文件。',
      '首次 license/ID 按 legal presence、SSN、identity、两份 Michigan residency 和 name-change chain 五组准备，申请驾照者另做 vision exam。',
      'Legal presence 与 identity 文件须用原件，所有非英文文件要附 English translation，只有列明的 residency 文件可使用电子版本。',
      'SSN 可用 Social Security card、W-2、1099 或含姓名与 SSN 的 pay stub，无资格者按当前交易说明准备 60 天内 SSA-L676 并配合显示 non-work-authorized status 的 USCIS 文件。',
      '两份 Michigan residency 都要有申请人姓名和 residential street address，90 天内 utility、credit-card bill 或 financial statement 可用电子版，P.O. Box 不能代替居住地址。',
      '姓名变化文件要显示前后姓名并把每次变化串联，marriage certificate 用原件，divorce decree 用 certified copy，美国法院命令也可作为相应证明。',
      '非美国公民常见组合包括有效 foreign passport、U.S. visa 与 I-94，F 身份另带 I-20，J 身份另带 DS-2019，B1/B2/WB/WT 不在当前可接受办证范围。',
      'Identity 通常用一份列明的美国或加拿大证件，无法走单文件路径时，foreign passport、I-94、EAD、I-571 或附 I-797 的过期移民文件等通常要按两份组合规则准备。',
      'Enhanced credential 的 legal-presence 栏只列美国公民文件，申请还要 SSN、identity、两份 residency 和适用姓名文件，并必须本人到 office。',
      '外国驾照须附 IDP 或 English translation 才能作为 driving experience proof，不能替代 legal presence、identity 或 Michigan residency。',
    ],
    commonMistakes: [
      '看到 Michigan Standard license 仍可驾驶，就误以为它也能直接通过国内航班安检。',
      'Enhanced credential 没有星标就重复申请 REAL ID，忽略 Enhanced 无论是否显示星标都自动合规。',
      '已有 Standard credential 却只做 online renewal，期待系统自动完成首次 REAL ID 转换。',
      '把扫描件、手机照片或普通 photocopy 当作 legal-presence 或 identity 原件。',
      '使用超过 60 天的 SSA-L676，只依据较旧 SOS-428 的一年口径准备。',
      '只带一份 residency，或把 P.O. Box 当作 Michigan residential address。',
      '持 B1/B2、WB/WT 或待核验移民文件时，未先确认当前 legal-presence 资格和 SAVE 状态。',
      '看到官方中文驾驶手册就预设线上或指定 office 一定提供中文 knowledge test。',
      '购买所谓 international driver license 后不携带本国原驾照，或把 IDP 当成独立驾驶资格。',
      '持外国驾照时照搬美国州或加拿大驾照 conversion 路径，遗漏知识考试、TIP、路考或身份材料。',
      '驾驶资格已 suspended、revoked 或 denied 仍支付 $6.50 线上知识考试费，官方明确这种情况不退款也不能发证。',
      '路考时车辆缺 Michigan No-Fault insurance、有效 registration、当年 tab 或安全设备，导致考试在上路前取消。',
      '把 driver testing business 的签字 receipt 当作可驾驶证件，没有等待电子结果并取得 Temporary Operator License。',
      '连续使用非到场渠道续期后仍假定下一次一定可线上办理，未检查照片、合法居留和 28 天改址限制。',
    ],
    recommendedSteps: [
      '先看现有卡面和旅行目的，只有国内航班或受限联邦设施需求时才在 REAL ID、Enhanced、passport 或其他 TSA accepted ID 中选择。',
      '首次申请者按 First-time License/ID 路径预申请，已有 Michigan Standard credential 者按 Convert to REAL ID 路径预约，不把两条流程混用。',
      '把材料分成 legal presence、SSN、identity、two residency、name chain 五栏，逐栏确认姓名、生日和地址一致。',
      '使用 SSA-L676 时按当前交易说明采用 60 天内文件，并在预约前再次确认官方冲突是否已消除。',
      '非美国公民先确认具体移民文件是否被接受，为 SAVE 预留延迟，不在现有卡到期前最后几天才开始。',
      '最多提前 6 个月预约 office，收到确认邮件后保留管理链接，walk-in 只作为可能排到当天稍后或下一工作日的备用方案。',
      '新居民先预申请并准备两份 Michigan residency，外州、美国领地或加拿大有效驾照走 conversion，外国驾照走 first-time driver 判断。',
      '成人首次考试前比较 $6.50 线上知识考试与免费 office 考试，线上路径提前准备电脑、键盘鼠标、webcam 和约一小时不受打扰的环境。',
      '需要中文时先使用 2025 Chinese driver manual 学习，再向实际在线入口或 office 确认可选考试语言和 audio/written 格式。',
      '取得 TIP 后记录 180 天到期日和最早 30 天路考日，只向 authorized driver testing business 预约并先问清全部第三方费用。',
      '路考前逐项检查 TIP、安全车辆、Michigan No-Fault insurance、registration、plate/tab，并提前安排只翻译指令的口译员。',
      '通过路考后等待结果电子上传，再从 e-Services 获取 Temporary Operator License，24 小时仍无结果则带原始材料到 office。',
      '续期前先用官方 eligibility 判断 online、mail、station 或 office，非公民核验、旧照片、连续远程续期或异常状态直接预留到场时间。',
      '补证或改址时同时检查 license/ID 与 vehicle registration 两套地址，最近 28 天有相关操作时准备 identity proof 到 office。',
      '交易后保留 temporary paper credential，并用 View Credential Mail Status 追踪制作、寄送和 USPS 退件状态。',
    ],
    actionLinks: [
      {
        label: 'Michigan REAL ID',
        url: 'https://www.michigan.gov/sos/license-id/real-id',
        description: 'Standard、REAL ID 与 Enhanced 区别、转换材料、费用、非公民资格和 SAVE 核验。',
      },
      {
        label: 'License and ID information',
        url: 'https://www.michigan.gov/sos/license-id/license-and-id',
        description: '证件类型、费用、姓名更正、邮件状态和常见办证规则。',
      },
      {
        label: 'First-time license or ID',
        url: 'https://www.michigan.gov/sos/all-services/first-time-license-or-id',
        description: '首次办证材料、合法居留、SSN、identity、两份 residency、翻译和预申请。',
      },
      {
        label: 'SOS-428 accepted documents',
        url: 'https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa',
        description: '官方材料表，含原件、翻译、外国驾照用途和各组可接受文件。',
      },
      {
        label: 'New Michigan residents',
        url: 'https://www.michigan.gov/sos/resources/communities/new-mi-residents',
        description: '新居民 license/ID conversion、两份住址材料和车辆 title/plate 办理路线。',
      },
      {
        label: 'Document requirements FAQ',
        url: 'https://www.michigan.gov/sos/faqs/license-and-id/license-and-id-document-requirements',
        description: 'Identity、legal presence、residency、SSN、原件和审批时长说明。',
      },
      {
        label: 'New drivers 18 and older',
        url: 'https://www.michigan.gov/sos/license-id/new-drivers-18-older',
        description: '成人知识考试、TIP、30 天练习、路考、费用、临时证和 probationary license。',
      },
      {
        label: 'License or ID renewal',
        url: 'https://www.michigan.gov/sos/all-services/license-or-id-renewal',
        description: '续期窗口、各渠道资格、费用、12 年到场和不适用 online 的情形。',
      },
      {
        label: 'License / ID / permit replacement',
        url: 'https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement',
        description: 'Online、out-of-state mail、station、office、temporary credential 和补证费。',
      },
      {
        label: 'Change of address',
        url: 'https://www.michigan.gov/sos/all-services/change-of-address',
        description: 'License/ID 与 vehicle address 分别更新、所需号码、贴纸和新卡。',
      },
      {
        label: 'License and ID FAQ',
        url: 'https://www.michigan.gov/sos/faqs/license-and-id/licenses-and-id',
        description: '28 天限制、姓名、费用、foreign license、邮件状态和临时纸质证件。',
      },
      {
        label: 'Schedule an office visit',
        url: 'https://www.michigan.gov/sos/faqs/resources/scheduling-an-office-visit',
        description: '最多提前 6 个月预约、walk-in 安排和确认管理说明。',
      },
      {
        label: 'Enhanced license and ID',
        url: 'https://www.michigan.gov/sos/all-services/enhanced-license-and-id',
        description: 'Enhanced 用途、到场申请、美国公民文件、材料和费用。',
      },
      {
        label: 'Foreign license treaty table',
        url: 'https://www.michigan.gov/sos/-/media/Project/Websites/sos/10lawensn/Foreign_DL_countries_palm_card.pdf?hash=6F19225BE4943DB7003B1FD3DAE9A44D&rev=d519354f7c0948e5aeeea5109dfccd3c',
        description: '当前 treaty 与 non-treaty 国家表，包含 China 与 China (Taiwan) 的不同分类。',
      },
      {
        label: 'Foreign driver license guidance',
        url: 'https://www.michigan.gov/-/media/Project/Websites/sos/10lawensn/Foreign_DL_Law_Enforcement.pdf?rev=9fde1916b25c4e48a9f004d516952945',
        description: '外国驾照、合法居留、English translation/IDP 和访客/居民边界。',
      },
      {
        label: 'What Every Driver Must Know',
        url: 'https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know',
        description: '2025 Michigan driver manual 与官方中文 PDF 入口。',
      },
      {
        label: 'Michigan Language Services',
        url: 'https://www.michigan.gov/sos/language-services',
        description: '中文等翻译资源及 browser translation 风险说明。',
      },
      {
        label: 'Driver testing businesses',
        url: 'https://www.michigan.gov/sos/industry-services/driver-testing-businesses-and-examiners',
        description: '获授权路考机构、考试管理和投诉入口。',
      },
      {
        label: 'Online knowledge test update',
        url: 'https://www.michigan.gov/sos/resources/news/2025/07/02/michigan-secretary-of-state-now-offers-online-drivers-license-testing-for-adults',
        description: '成人 online knowledge test 上线及基本资格的官方公告。',
      },
      {
        label: 'Michigan Online Services',
        url: 'https://dsvsesvc.sos.state.mi.us/TAP/_/',
        description: '预申请、续期、补证、改址、Temporary Operator License 和 mail status 入口。',
      },
      {
        label: 'TSA accepted identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        description: '国内航班可接受证件与无 REAL ID 时的联邦身份核验说明。',
      },
    ],
    sources: [
      {
        label: 'Michigan SOS REAL ID',
        url: 'https://www.michigan.gov/sos/license-id/real-id',
        note: '证件区别、旅行用途、转换费、转换材料、SAVE 和合法居留。',
      },
      {
        label: 'Michigan SOS License and ID Information',
        url: 'https://www.michigan.gov/sos/license-id/license-and-id',
        note: '证件有效期、费用、姓名更正、temporary credential 和 mail status。',
      },
      {
        label: 'Michigan SOS First-time License or ID',
        url: 'https://www.michigan.gov/sos/all-services/first-time-license-or-id',
        note: '首次材料、外州转换、移民文件、SSN、住址、原件和翻译。',
      },
      {
        label: 'Michigan SOS-428 Accepted Documents',
        url: 'https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa',
        note: '材料分组、原件、翻译、foreign license 和 residency 规则。',
      },
      {
        label: 'Michigan SOS New Residents',
        url: 'https://www.michigan.gov/sos/resources/communities/new-mi-residents',
        note: '外州/加拿大 conversion、两份 residency 和车辆 plate/title 材料。',
      },
      {
        label: 'Michigan SOS Document Requirements FAQ',
        url: 'https://www.michigan.gov/sos/faqs/license-and-id/license-and-id-document-requirements',
        note: 'Identity 原件、两份 residency 与可能的多日审批。',
      },
      {
        label: 'Michigan SOS New Drivers 18+',
        url: 'https://www.michigan.gov/sos/license-id/new-drivers-18-older',
        note: 'Knowledge test、TIP、30/180 天、road test、fees、probation 和 limited term。',
      },
      {
        label: 'Michigan SOS License or ID Renewal',
        url: 'https://www.michigan.gov/sos/all-services/license-or-id-renewal',
        note: '续期窗口、渠道、资格、费用、service fee 和 12 年到场规则。',
      },
      {
        label: 'Michigan SOS Replacement',
        url: 'https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement',
        note: 'Online、mail、station、office、temporary credential 和 duplicate fees。',
      },
      {
        label: 'Michigan SOS Change of Address',
        url: 'https://www.michigan.gov/sos/all-services/change-of-address',
        note: 'License/ID 与 vehicle 地址更新、所需号码和 USPS 前置动作。',
      },
      {
        label: 'Michigan SOS Licenses and ID FAQ',
        url: 'https://www.michigan.gov/sos/faqs/license-and-id/licenses-and-id',
        note: '28 天限制、费用、姓名、foreign license、temporary credential 和 mail status。',
      },
      {
        label: 'Michigan SOS Office Visit FAQ',
        url: 'https://www.michigan.gov/sos/faqs/resources/scheduling-an-office-visit',
        note: '最多提前 6 个月、walk-in 安排与预约管理。',
      },
      {
        label: 'Michigan SOS Enhanced License and ID',
        url: 'https://www.michigan.gov/sos/all-services/enhanced-license-and-id',
        note: '到场申请、用途、美国公民文件、材料和费用。',
      },
      {
        label: 'Michigan SOS Foreign License Treaty Table',
        url: 'https://www.michigan.gov/sos/-/media/Project/Websites/sos/10lawensn/Foreign_DL_countries_palm_card.pdf?hash=6F19225BE4943DB7003B1FD3DAE9A44D&rev=d519354f7c0948e5aeeea5109dfccd3c',
        note: 'Treaty/non-treaty 分类及 China 与 China (Taiwan) 区别。',
      },
      {
        label: 'Michigan SOS Foreign Driver License Guidance',
        url: 'https://www.michigan.gov/-/media/Project/Websites/sos/10lawensn/Foreign_DL_Law_Enforcement.pdf?rev=9fde1916b25c4e48a9f004d516952945',
        note: '外国驾照、英文翻译/IDP、合法居留和访客/居民边界。',
      },
      {
        label: 'Michigan SOS Driver Manual',
        url: 'https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know',
        note: '2025 手册与 Chinese PDF。',
      },
      {
        label: 'Michigan SOS Language Services',
        url: 'https://www.michigan.gov/sos/language-services',
        note: '中文资源与第三方浏览器翻译免责声明。',
      },
      {
        label: 'Michigan SOS Driver Testing Businesses',
        url: 'https://www.michigan.gov/sos/industry-services/driver-testing-businesses-and-examiners',
        note: '授权路考机构及监管入口。',
      },
      {
        label: 'Michigan SOS Online Knowledge Test Update',
        url: 'https://www.michigan.gov/sos/resources/news/2025/07/02/michigan-secretary-of-state-now-offers-online-drivers-license-testing-for-adults',
        note: '成人线上知识考试官方公告。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受身份证件。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
    ],
  },
  {
    id: 'ohio',
    abbr: 'OH',
    nameEn: 'Ohio',
    nameZh: '俄亥俄州',
    agency: 'Ohio Bureau of Motor Vehicles',
    agencyUrl: 'https://www.bmv.ohio.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '俄亥俄驾照和 ID 由 BMV 管理，但知识与路考通常由 Driver Exam Station 执行，证件签发则在 Deputy Registrar License Agency 完成；先区分 Standard、REAL ID Compliant、首次申请、外州转入和外国驾照路径。',
    realIdSummary:
      'Ohio 把 REAL ID 合规证件称为 Compliant Card，与 Standard Card 收费相同但材料更多；Compliant 可用于国内航班和受限联邦设施，Standard 仍可驾驶和办理一般身份事务，但不能单独满足联邦旅行身份要求。',
    licenseSummary:
      '当前或过期不足 6 个月的 Ohio driver license 可到 Deputy Registrar 续期，符合条件者也可线上续期；过期超过 6 个月通常要重新取得 TIPIC 并完成规定测试，不能把它当作普通 late renewal。',
    appointmentNote:
      '知识考试可按资格在线或到指定 Deputy Registrar / Driver Exam Station，路考需从 BMV Online Services 预约；签发业务可先用 Get In Line Online 排队，但它不等于路考预约。',
    editorNotes: [
      'Compliant Card 是 Ohio 对 REAL ID 合规驾照或 ID 的称呼，完全可以选择 Standard；首次签发无论选哪种卡都要提交完整身份材料，已有 Standard 在普通续期时通常不需要额外材料。',
      '首次申领 Compliant credential 不能在线完成，必须到 Deputy Registrar；Compliant 与 Standard 本身没有额外价差，但交易类型、4 年或 8 年期限仍会影响费用。',
      'Compliant Card 需要证明 full legal name、date of birth、legal presence、SSN、两份来自不同来源的 Ohio street address，以及适用的完整姓名变化链。',
      'Ohio BMV 2430 与 BMV 2424 要求身份材料使用原件或由签发机关认证的副本，普通复印件、认证副本的再次复印件不能替代。',
      'Compliant 卡不能替代 passport 做国际旅行；Standard 卡可继续作为驾驶资格和一般州内身份证明，但国内航班要另带 TSA 接受的证件。',
      '永久驾照或 ID 通常在到访 Deputy Registrar 后 10 个工作日内邮寄，28 天仍未收到应联系 BMV；现场发的 interim document 只是待制卡证明，不是通用身份证件。',
      'Interim driver license 或 TIPIC 文件可在等待期间用于驾驶非 CDL 车辆，但不能单独作为身份证明，也不能单独申请 CDL 或 CDL permit。',
      'BMV 当前总费用表列出 21 岁以上首次 operator license 4 年 $27.50、8 年 $54.00，普通续期 4 年 $30.25、8 年 $59.40，duplicate $29.00，operator TIPIC $26.50；交易前再检查 Fees 页面页首的 Last Updated。',
      'Ohio 当前费用总表与个别 ID FAQ 的旧数字并不完全一致，涉及州 ID 时应以中央 Fees 页面和实际交易报价为准，不根据旧 FAQ 承诺固定金额。',
      '知识考试有 40 道选择题，至少答对 75%；中文与英语等语言提供文字和音频，其他语言可预约带自备口译员的监考考试，但考生仍须理解英文路标。',
      '知识考试失败后至少等 24 小时；线下考试没有次数上限，online knowledge test 在 6 个月内最多两次。',
      '成人取得 TIPIC 后只能在 21 岁或以上持照驾驶人陪同下练车，路考包括 driving 与 maneuverability 两部分并要求携带 TIPIC 和状况良好的车辆。',
      '21 岁及以上首次申请人第一次未通过 road 或 maneuverability test，且过去 12 个月没有完成认可课程时，第二次考试前必须完成 abbreviated adult driver training。',
      'Abbreviated adult course 可选择 4 小时课堂或州认可线上课程，再配 4 小时驾校实车，或改为 24 小时由 21 岁以上持照人陪练；24 小时路径要提交 notarized BMV 5789。',
      '通过 driving 与 maneuverability tests 后应在 60 天内到 Deputy Registrar 购买 driver license，考试通过本身不会自动寄出驾照。',
      '21 岁以上 temporary resident 当前要完成 24 小时课堂或线上 instruction、8 小时驾校实车、50 小时陪练且含 10 小时夜间，并持 TIPIC 至少 14 天。',
      '当前 Ohio Driver Manual 只对持有效加拿大、法国、德国、日本、韩国或台湾驾照的 21 岁以上 temporary resident 豁免上述训练要求；中国大陆驾照不在这份明确名单中，不能自行推定可免考或直接换证。',
      'Ohio 法律允许 BMV 与外国建立 reciprocity 并酌情免除考试，但官网没有给出可供用户自行扩张解释的完整实时名单，外国驾照持有人应让 BMV 按当前证件和身份确认。',
      '非美国公民的证件姓名以 USCIS 文件为准，合法身份必须通过 SAVE；SAVE 尚未完成时 BMV 不能最终签发，pending application 也不等于当前已有驾驶资格。',
      '绿卡持有人提交有效 I-551、适用 SSN 和 Ohio residency 后可获普通 4 年或 8 年证件；temporary resident 则要在每次签发时重新提交当前 USCIS 文件和住址证明。',
      '现行 Ohio Revised Code 4507.09 自 2025-09-30 起允许 limited-term license 在到期前 90 天凭持续合法身份材料续期，但 BMV 页面仍把一类证件标作 Non-Renewable/Non-Transferable；必须按卡面类型向 BMV 确认，本站不承诺一定可续。',
      'Limited-term 证件最长不能超过获准停留截止日或 4 年；若合法停留文件没有截止日，现行州法把签发上限设为 1 年。',
      '使用 asylum I-94 申请时，BMV 提示文件核验可能需要最多 15 天；SAVE CaseCheck 只显示联邦核验状态，不替代 Ohio driving record 对驾驶资格的确认。',
      '当前或过期不足 6 个月的 license 可续期，21 岁以上且未满 65 岁者按资格可选 4 年或 8 年；65 岁及以上只能办 4 年且不符合普通线上续期。',
      '线上续期通常要求当前证件曾在 Deputy Registrar 本人办理、是 4 年证件、签发时已满 21 岁、申请人未满 65 岁且为美国公民或永久居民，并且除地址外没有个人信息变化或需到场的医疗限制。',
      '首次 Ohio credential、首次 Compliant credential、TIPIC、limited-term credential 和过期超过 6 个月的证件都不能套用普通 online renewal。',
      'Ohio 驾驶人搬家后须在 10 天内通知 BMV；线上或 BMV 5756 可更新记录，需要卡面显示新地址时再按 duplicate 路径处理。',
      '有效且未过期、信息不变的遗失或损坏证件可在线购买一次 reprint；若要改姓名、地址等信息则需到 Deputy Registrar 购买 duplicate，两者都沿用原到期日。',
      '未满 21 岁者在 21 岁生日之前 30 天内不能申请 reprint 或 duplicate，应按生日续期规则安排。',
      'Ohio 把就业、签租约、买房或子女入学列为建立 residency 的常见触发点；建立居民身份后 30 天内要转入驾照或 ID、车辆 title 与 registration。',
      '持有效未过期外州非 CDL 驾照的新居民通常带原证件和完整材料到 Deputy Registrar 并完成 vision screening；过期外州证件或首次驾驶人要走完整 testing path。',
      '申请 Ohio ID 会取消申请人持有的外州 driver license，因此仍需驾驶的外州学生或临时居住者不要把州 ID 当作无影响的备用证件。',
      '外州车辆先在 County Clerk of Courts Title Office 办 Ohio title，再到 Deputy Registrar 注册；BMV 本身不签发 vehicle title。',
    ],
    documentHighlights: [
      '首次 Standard credential 要覆盖 full legal name、date of birth、legal presence、SSN 和一份 Ohio street address；Compliant credential 把地址证明提高为两份且须来自不同来源。',
      'Birth certificate、passport、I-551、EAD 或其他身份与合法居留文件按 BMV 2430/2424 对应栏位组合，不能只因一份文件有照片就假定覆盖全部五类要素。',
      'Social Security card、显示完整 SSN 的 W-2 或 1099 可作为常见 SSN 证据；BMV 5745 只有在 SSN 已经向 Ohio BMV 建档时才能单独用于这一栏。',
      'Compliant 住址材料常见可用 utility bill、bank statement、credit-card statement、pay stub、insurance policy、Ohio title/registration 等，其中标注时限的账单通常须在 12 个月内。',
      '两份 Compliant residency 必须显示姓名和当前 Ohio street address；同一 utility provider 的两张账单不算不同来源，但两个不同 utility provider 可分别计入。',
      '依赖父母、配偶或 nursing home 地址的人可查看 BMV 2336 certified statement 路径，证明人仍要满足身份、关系和相应住址材料要求。',
      '姓名与 birth certificate、passport 或 USCIS 文件不一致时，带 marriage certificate/license、certified divorce/dissolution/annulment decree 或 certified court order，把每次变化串联起来。',
      '非美国公民应带全部当前 legal-presence documents：学生常见 passport、visa、I-94、I-20 或 DS-2019；就业者常见有效 EAD，或 passport、visa、I-94 与可接受 case type 的 I-797。',
      '外州转入要带有效未过期的原州 license、完整身份材料并做 vision screening；外州证件过期时不要预设能免知识或路考。',
      '首次驾驶人先准备知识考试所需姓名、生日和适用 SSN 证据，再在购买 TIPIC 时补齐 Ohio residency 与 citizenship/legal presence；已有 Ohio ID 会在 TIPIC 签发时被取消。',
      '路考携带 TIPIC、状况良好的车辆和按年龄或身份适用的 BMV 5791；临时居民 21 岁以上也应核对 14 天持证、训练证书和 notarized fifty-hour affidavit。',
    ],
    commonMistakes: [
      '把 Compliant Card 当成另一种驾照类别，或误以为升级 REAL ID 必须多付一笔固定附加费。',
      '首次申请 Standard Card 时以为材料要求和普通续期一样，只带旧卡或一份姓名文件。',
      '两份住址证明来自同一 bank account 或同一 utility provider，未满足 different sources。',
      '带手机照片、普通复印件或 copy of certified copy 去证明 legal presence 或姓名变化。',
      '把 Deputy Registrar 发的 interim document 当成可登机、开户或证明身份的正式 photo ID。',
      '只看到“10 个工作日寄到”就按保证日期订旅行，28 天仍未收到也没有联系 BMV。',
      '看见中文 knowledge test 就以为可以不理解英文交通标志，或让口译员替自己回答。',
      '线上知识考试失败两次后继续反复尝试，忽略 6 个月两次上限和线下考试路径。',
      '21 岁以上第一次路考失败后直接预约第二次，没有先完成 abbreviated adult course 和适用 affidavit。',
      '通过路考后等待系统自动寄卡，错过 60 天内到 Deputy Registrar 购买 license 的步骤。',
      '持中国大陆驾照就照搬台湾或其他 reciprocity 路径，遗漏 temporary-resident 训练、TIPIC 和考试要求。',
      '把 SAVE pending 或手中的 USCIS receipt 当作 Ohio 已经确认可驾驶，未检查当前 driving privilege。',
      '只依据 BMV 页面上的 Non-Renewable 名称或只依据新州法就推定 limited-term 一定不能或一定可以续期，没有核对卡面和个案。',
      '证件过期超过 6 个月仍在线支付普通 renewal，未准备 TIPIC 与重新测试。',
      '搬家后只向 USPS 改地址，超过 10 天仍未更新 BMV 驾照和车辆记录。',
      '遗失证件同时要改姓名或地址却选择 online reprint，忽略 reprint 不能改信息且只有一次。',
      '搬到 Ohio 后只转驾照，没有在 30 天路径中分别处理 County title office 与 Deputy Registrar registration。',
      '仍要使用外州驾照的学生申请 Ohio ID，没意识到外州驾照会被取消。',
    ],
    recommendedSteps: [
      '先按用途选择 Standard 或 Compliant：有 passport 等 TSA accepted ID 且只需驾驶时，可比较是否值得多准备 REAL ID 材料。',
      '首次或首次 Compliant 申请把材料分成 legal name/date of birth、legal presence、SSN、Ohio street address 和 name-change chain，并用 BMV 2430 checklist 逐格核对。',
      '两份 Compliant 地址证明先按 issuing source 去重，再检查姓名、street address 和 12 个月等时效，特殊家庭住址情形提前准备 BMV 2336。',
      '非美国公民先把 passport、visa、I-94、I-20/DS-2019、EAD 或 I-797 按自己身份配齐，再用 SAVE CaseCheck 跟踪核验，但另行确认 Ohio driving privilege。',
      '21 岁以上 temporary resident 在报考前先核对自己是否属于六个当前训练豁免来源；中国大陆驾照默认按不在明示豁免名单准备，直到 BMV 个案确认。',
      '首次驾驶人先学习 Ohio Driver Manual，再选择 online 或 in-person knowledge test；需要中文时确认 text/audio 选项并继续熟悉英文路标。',
      '通过知识和视力检查后购买 TIPIC，记录适用陪练、14 天或其他持证要求以及 60 天购买最终 license 的节点。',
      '路考前检查 TIPIC、车辆安全状况和适用 BMV 5791；第一次失败时先完成 abbreviated course，再安排第二次。',
      '续期先判断证件是否过期超过 6 个月，再检查 online eligibility；首次 Compliant、limited-term、65 岁以上或信息变化直接预留到场路径。',
      'Limited-term 持有人在到期前至少 90 天开始核对卡面、持续合法身份和 BMV 当前执行口径，保存 SAVE 与柜台答复，不依赖网页标题猜测。',
      '补证前先区分 reprint 与 duplicate：信息完全不变才走一次性 online reprint，需要更正则带证明到 Deputy Registrar。',
      '搬家后 10 天内分别更新 driver credential 与 vehicle record；新居民在 30 天内按 license/ID、County title、registration 三条线推进。',
      '现场交易前使用 Get In Line Online，考试则使用专门的 Schedule a Driving or Skills Test 入口，不把两个队列混淆。',
      '现场领取 interim document 后继续携带其他正式 photo ID，预留 10 个工作日邮寄窗口，并在 28 天未收到时联系 BMV。',
    ],
    actionLinks: [
      {
        label: 'Ohio REAL ID / Compliant Card',
        url: 'https://www.bmv.ohio.gov/dl-real-id.aspx',
        description: 'Compliant 与 Standard 区别、同价、材料、interim document 和邮寄时间。',
      },
      {
        label: 'Ohio Acceptable Documents',
        url: 'https://www.bmv.ohio.gov/dl-identity-documents.aspx',
        description: '首次、Compliant、Standard、姓名变化和 SSN 的官方材料入口。',
      },
      {
        label: 'Compliant DL-ID checklist BMV 2430',
        url: 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv2430.pdf',
        description: '2025 年官方两页清单，列明五类要素、两份不同来源住址和 BMV 2336。',
      },
      {
        label: 'First issuance and adult testing',
        url: 'https://www.bmv.ohio.gov/dl-gdl.aspx',
        description: 'Knowledge test、TIPIC、训练、路考、失败后课程和 60 天购证。',
      },
      {
        label: 'Ohio Driver Manual',
        url: 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf',
        description: '当前考试手册、临时居民训练、台湾等六地豁免与新居民规则。',
      },
      {
        label: 'Non-U.S. citizens',
        url: 'https://www.bmv.ohio.gov/dl-non-permanent-resident.aspx',
        description: 'I-551、limited-term、USCIS 文件、SAVE、asylum I-94 和驾驶资格提醒。',
      },
      {
        label: 'Current Ohio license renewal',
        url: 'https://www.bmv.ohio.gov/dl-renewal-current.aspx',
        description: '6 个月分界、4/8 年期限、年龄限制、online 与 out-of-state renewal。',
      },
      {
        label: 'Reprint or duplicate',
        url: 'https://www.bmv.ohio.gov/dl-reprint-duplicate.aspx',
        description: '遗失损坏、信息是否变化、online reprint 次数和到场 duplicate。',
      },
      {
        label: 'Ohio identification card',
        url: 'https://www.bmv.ohio.gov/dl-id-card.aspx',
        description: '州 ID 资格、外州驾照取消、免费资格、interim document 和邮寄说明。',
      },
      {
        label: 'Ohio BMV fees',
        url: 'https://www.bmv.ohio.gov/doc-fees.aspx',
        description: '当前 driver license、TIPIC、ID、duplicate 与车辆业务费用总表。',
      },
      {
        label: 'BMV Online Services',
        url: 'https://bmvonline.dps.ohio.gov/',
        description: 'Knowledge test、路考预约、续期、reprint、地址和 credential status 入口。',
      },
      {
        label: 'New Ohio Residents',
        url: 'https://www.bmv.ohio.gov/new-to-ohio.aspx',
        description: '30 天、外州证件转入、vision、County title office 和车辆注册。',
      },
      {
        label: 'Ohio forms',
        url: 'https://www.bmv.ohio.gov/doc-forms.aspx',
        description: 'BMV 2336、5745、5756、5789、5791 与 driver manual 官方入口。',
      },
      {
        label: 'Ohio law: license term and address',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.09/9-30-2025',
        description: '现行 4/8 年、limited-term 90 天续期窗口和 10 天改址法条。',
      },
      {
        label: 'Ohio law: new residents',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.213',
        description: '成为居民后 30 天转入义务及逾期驾驶后果。',
      },
      {
        label: 'Ohio law: foreign reciprocity',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.101',
        description: '外国驾照 reciprocity 的法定授权、考试豁免与保留原驾照边界。',
      },
      {
        label: 'Ohio law: online renewal eligibility',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.061',
        description: 'Online renewal 的年龄、身份、期限、到场历史与排除项。',
      },
      {
        label: 'TSA accepted identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        description: '国内航班可接受证件及没有 REAL ID 时的联邦核验说明。',
      },
    ],
    sources: [
      {
        label: 'Ohio BMV REAL ID Card',
        url: 'https://www.bmv.ohio.gov/dl-real-id.aspx',
        note: 'Compliant/Standard、同价、首次材料、interim document、10/28 天邮寄节点。',
      },
      {
        label: 'Ohio BMV Acceptable Documents',
        url: 'https://www.bmv.ohio.gov/dl-identity-documents.aspx',
        note: '五类身份要素、两份不同来源住址、姓名链与 SSN。',
      },
      {
        label: 'Ohio BMV Compliant Documents BMV 2430',
        url: 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv2430.pdf',
        note: '原件、认证副本、12 个月住址材料、different sources 和 BMV 2336。',
      },
      {
        label: 'Ohio BMV Standard Documents BMV 2424',
        url: 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/bmv2424.pdf',
        note: '首次 Standard 五类要素、SSN 文件和姓名变化。',
      },
      {
        label: 'Ohio BMV First Issuance',
        url: 'https://www.bmv.ohio.gov/dl-gdl.aspx',
        note: 'Knowledge test、语言、TIPIC、road test、retest training 和 60 天签发。',
      },
      {
        label: 'Ohio Driver Manual HSY 7607',
        url: 'https://dam.assets.ohio.gov/image/upload/publicsafety.ohio.gov/hsy7607.pdf',
        note: '临时居民 24+8、50/10 小时、14 天、六地豁免和考试车辆。',
      },
      {
        label: 'Ohio BMV Non-U.S. Citizens',
        url: 'https://www.bmv.ohio.gov/dl-non-permanent-resident.aspx',
        note: 'I-551、limited-term、USCIS 文件、SAVE、I-94 asylum 和 current privilege。',
      },
      {
        label: 'Ohio BMV Current License Renewal',
        url: 'https://www.bmv.ohio.gov/dl-renewal-current.aspx',
        note: '6 个月分界、4/8 年、21/65 岁限制、online 与 out-of-state renewal。',
      },
      {
        label: 'Ohio BMV Reprint and Duplicate',
        url: 'https://www.bmv.ohio.gov/dl-reprint-duplicate.aspx',
        note: '信息变化、一次 online reprint、到期日和 21 岁前 30 天限制。',
      },
      {
        label: 'Ohio BMV Identification Card',
        url: 'https://www.bmv.ohio.gov/dl-id-card.aspx',
        note: '州 ID 资格、外州驾照取消、免费资格、interim document 和邮寄。',
      },
      {
        label: 'Ohio BMV Fees',
        url: 'https://www.bmv.ohio.gov/doc-fees.aspx',
        note: '2025-09-30 更新的 driver license、TIPIC、duplicate 与 ID 费用总表。',
      },
      {
        label: 'Ohio BMV Online Services',
        url: 'https://bmvonline.dps.ohio.gov/',
        note: 'Online test、skills test scheduling、renewal、reprint、address 和 status。',
      },
      {
        label: 'Ohio BMV New Ohio Residents',
        url: 'https://www.bmv.ohio.gov/new-to-ohio.aspx',
        note: 'Residency 触发点、30 天、外州转入、vision、title 和 registration。',
      },
      {
        label: 'Ohio BMV Forms',
        url: 'https://www.bmv.ohio.gov/doc-forms.aspx',
        note: 'BMV 2336、5745、5756、5789、5791 和官方材料索引。',
      },
      {
        label: 'Ohio Revised Code 4507.09',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.09/9-30-2025',
        note: '现行期限、limited-term 续期、有效期上限和 10 天改址。',
      },
      {
        label: 'Ohio Revised Code 4507.213',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.213',
        note: '新居民 30 天转入义务及 minor misdemeanor 后果。',
      },
      {
        label: 'Ohio Revised Code 4507.101',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.101',
        note: '外国驾照 reciprocity、可能的考试豁免和保留原证件。',
      },
      {
        label: 'Ohio Revised Code 4507.061',
        url: 'https://codes.ohio.gov/ohio-revised-code/section-4507.061',
        note: 'Online renewal 的全部资格与排除条件。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受证件。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'proof-of-residency',
      'name-change-chain',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
    ],
  },
  {
    id: 'arizona',
    abbr: 'AZ',
    nameEn: 'Arizona',
    nameZh: '亚利桑那州',
    agency: 'Arizona Motor Vehicle Division',
    agencyUrl: 'https://azdot.gov/mvd',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '亚利桑那先按用途选择 Non-Travel credential 或 Arizona Travel ID，再按首次申领、外州转入、外国驾照、续期或补证进入不同路径；中国大陆驾照不在当前四个免知识与路考的来源地名单中，不能套用 Taiwan 路径。',
    realIdSummary:
      'Arizona Travel ID 是该州 REAL ID 合规驾照或 ID，但不是每位居民都必须办理；首次或续期州费为 $25，通常要提交一份主要身份文件、完整 Social Security number，以及两份来自不同来源并显示姓名和当前 Arizona physical residential address 的证明。',
    licenseSummary:
      'Non-Travel driver license 仍可用于合法驾驶，但卡面标注 NOT FOR FEDERAL IDENTIFICATION，不能单独用于 TSA 国内航班等 REAL ID 联邦用途；普通 Class D 费用按年龄为 $10 至 $25，Travel credential、limited-term 身份和其他交易另有期限或费用规则。',
    appointmentNote:
      'New to Arizona 页面说明首次到访 MVD 可不预约，但 Travel ID 申请人应先让 AZ MVD Now 判断能否在线办理或预约；road test 必须预约，Authorized Third Party 是私人机构，业务、营业时间和额外 convenience fee 要向具体地点确认。',
    editorNotes: [
      'Arizona Travel ID 带星标，可用于 TSA 国内航班和受限联邦设施；有效护照等 TSA 接受证件仍可替代，Travel ID 也不能替代 passport 做国际旅行。',
      '已有 Arizona credential 的居民应从 AZ MVD Now 查看自己能否在线申请 Travel ID；没有 Arizona driver license 或 ID 的申请人要到 MVD 或提供 driver-license 服务的 Authorized Third Party。',
      '当前 Arizona DL/ID Requirements 40-5144 标注 R03/26，要求文件为英文原件或由签发机关认证的副本；手机照片、普通复印件和自行声明的副本不能代替。',
      'Travel ID 通常最长有效 8 年；60 岁及以上通常为签发日起 5 年，58 或 59 岁签发者在 65 岁当年的相同月日到期，非美国公民不得超过所提交移民文件的到期日或 8 年。',
      'Travel ID 页面估计实体卡最多约 2 周寄到，一般 DL/ID 页面提示最多预留 15 天；现场先发带照片的 temporary receipt，近期旅行仍应携带其他 TSA 接受的正式证件。',
      '当前费用页列出 Non-Travel Class D 年龄 16 至 39 岁 $25、40 至 44 岁 $20、45 至 49 岁 $15、50 岁及以上 $10；Travel DL/ID 首次或续期 $25、duplicate $12，instruction permit $7。',
      '从未持有美国驾照者不论年龄都要先通过 permit test 才能预约路考；笔试为 30 道选择题，至少 80% 通过。',
      'Permit Test @ Home 只面向未满 18 岁并由父母、法定监护人账户或参与项目的 Arizona Professional Driving School 监考的申请人；成人按现场路径准备。',
      '当前 permit test 提供 Mandarin 等语言，但 road test 的考官指令和交通标志理解要求使用英语；会做中文笔试不等于可以忽略英文路考指令。',
      '未满 18 岁者取得 instruction permit 后通常要持证 6 个月或直到满 18 岁，permit 本身有效 12 个月；18 岁以上者通过笔试后不适用未成年人 6 个月等待。',
      'Road test 必须预约，每位申请人每天只能考一次；车辆要能安全运行并带有效 registration 和 current liability insurance，外国保险不接受，租车还要把申请人列在 rental agreement 上。',
      'Road test 累计 21 分或以上判为未通过；每年 6 月 1 日至 9 月 22 日中午 12 点以后，没有空调的车辆不能用于 skills test。',
      '持当前有效外州驾照通常可免知识和路考，但 MVD 保留个案要求测试的权力；当前 40-5144 还提示，用于免试的外州驾照或 MVR 不得过期满 1 年。',
      '短期访客可随身携带有效本国驾照在 Arizona 驾驶；IDP 不是州法强制，但因有英文而受官方推荐，IDP 只是翻译辅助，不能替代原始外国驾照。',
      '当前外国申请人页面只把 Canada、Germany、South Korea 和 Taiwan 列为知识与路考双免来源；中国大陆不在名单中，应按笔试、视力和路考路径准备，直到 MVD 依据当前证件确认。',
      '所有申请人都要证明在美国的 authorized presence；常见文件包括 I-551、EAD 或 I-94，F-1 或 J-1 还要带 I-20 或 DS-2019。',
      'Arizona 一般 DL/ID 页面要求申请时提供 Social Security number，Travel ID 通常只需完整号码而不需 SSN 文件；外国申请人页面同时说明是否需要 SSN 取决于 class type，EAD 持有人必须提供 SSN 或 card。',
      '没有 SSN 的非公民不要自行用 SSA denial letter 或宣誓书替代；应让 MVD 按 I-94 class type 和当前 authorized-presence 文件确认是否存在可办路径。',
      '外国申请人的 Arizona license 通常与 authorized-presence 文件同日到期，身份延期后要带更新文件续期；这类期限不能按普通居民或 Travel ID 的最大年限推算。',
      'Arizona 的居民触发条件包括在州内工作、登记投票、按居民标准让子女入学、取得居民费率州证照或学费，以及一个日历年累计停留至少 7 个月；不要把别州常见的 30 天宽限直接套到普通 Arizona 新居民。',
      '外州车辆应在成为 Arizona resident 后尽快注册；Phoenix Metro 和 Tucson 部分车辆可能要先完成 emissions testing。',
      '普通 Class D 驾照一般有效至 65 岁，60 岁以后按 5 年周期续期；Travel ID、非公民授权期限、limited license 和医疗限制可能更早到期。',
      '驾照可在到期前 6 个月内续期且多数情况可在 AZ MVD Now 办理，但 MVD 可能要求到场更新照片、视力或身份文件；Arizona 不发送正式 renewal notice，照片通常每 12 年更新一次。',
      '遗失、被盗或损坏的 license/ID 可在 AZ MVD Now 申请 $12 replacement；要更新照片则到 MVD 或 driver-license ATP，从 Non-Travel 改成 Travel ID 属于新申请而非普通 replacement。',
      '地址变化后 10 天内必须通知 MVD，线上更新记录免费并会同步到申请人名下的 driver 与 vehicle records；需要新地址实体卡时另付 $12，官方提示最多约 2 周寄到。',
      '法定姓名变化后 10 天内更新 MVD；先向 SSA 改名并等 2 个工作日，再带同时连接旧名与新名的原件或认证副本到 MVD 或 ATP，不能只做在线地址变更。',
      'Authorized Third Party 可办理的 driver license、Travel ID、knowledge test 或 road test 取决于授权范围；它们可在州费之外收 convenience fee，实体证件仍由系统邮寄而不是柜台当场制卡。',
      'Standard Arizona ID card 面向所有年龄，通常 $12；65 岁及以上、符合 SSI 等特定资格者可能免费，但免费资格不适用于 Travel ID。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'AZDOT / Arizona MVD 的部分深层页面可能触发安全验证。本站保留官方链接；如果无法打开，请从 MVD 首页或 USA.gov 州机动车服务目录重新进入。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '先下载当前 40-5144，按一份 primary identity、Social Security number、两份 Arizona physical residential address 和适用姓名变化文件分组；要求可能变化，以表格修订号为准。',
      'Travel ID 常见 primary 可包括原件或认证出生证明、未过期美国护照/护照卡、未过期 I-551、EAD，或符合清单组合要求的 I-94、外国护照与美国签证。',
      '所有提交文件应为英文原件或由签发机关认证的副本；中文文件不要自行翻译后直接假定可接受，应先向 MVD 确认可接受的英文或认证文件路径。',
      '两份 residency 应来自不同来源，并同时显示申请人姓名和当前 Arizona physical residential address；utility bill、bank/credit-card statement、insurance policy 或 government document 只是常见类别。',
      '材料不足两份时，Arizona Residency Affidavit 只能作为其中一份 residency，仍须再带一份合格地址证明。',
      'Travel ID 申请通常提供完整 SSN 即可，不要求另带 SSN card；EAD 持有人和姓名变化等情形可能需要 SSN 或 card，应按 class type 与当前页面准备。',
      'primary identity 上姓名与当前姓名不同，先向 SSA 更新，再带 marriage license/certificate、divorce decree、adoption decree 或 court order 等原件或认证副本连接姓名变化。',
      '非公民把全部 current authorized-presence 文件一起带齐；F-1/J-1 除 passport、visa、I-94 外还应准备 I-20/DS-2019，EAD 持有人同时核对 SSN 要求。',
      '外州转入带 current driver license 或 ID、authorized-presence 证明、SSN 和适用 Arizona residency；若靠 MVR 或过期证件申请免试，先确认是否未过期满 1 年。',
      '外国驾照持有人同时带原始有效 foreign license；中国大陆申请人按 permit test、vision 和 road test 准备，不把 IDP 或 Taiwan 免试规则当作换证凭证。',
      'Road test 当天带有效身份证明、current vehicle registration、Arizona 接受的 liability insurance，并检查租车合同是否列出申请人及车辆是否满足安全和空调时段要求。',
    ],
    commonMistakes: [
      '以为 Arizona Travel ID 是驾驶必办证件，已有 passport 等 TSA 接受证件仍在临行前仓促申请。',
      '拿 Non-Travel license 单独过 TSA，忽略卡面 NOT FOR FEDERAL IDENTIFICATION。',
      '只带一份地址证明，或两份都来自同一来源、没有当前 physical residential address。',
      '带手机照片、普通复印件或自行翻译的中文材料，未满足英文原件或签发机关认证副本要求。',
      '认为所有申请都必须出示 SSN card，或反过来认为任何非公民都可不提供 SSN，未按 class type 与文件类型核对。',
      '把中国大陆驾照当作 Taiwan 驾照，错误预期知识和路考双免。',
      '只携带 IDP 而没有随身携带原始有效外国驾照。',
      '从未持有美国驾照就直接预约 road test，没有先通过 30 题、80% 门槛的 permit test。',
      '通过 Mandarin 笔试后仍未准备 road test 的英文指令和英文交通标志。',
      '借用没有当前 registration、合格 liability insurance 的车辆，或租车合同没有列出申请人。',
      '夏季中午后用没有空调的车辆参加 road test，或同一天安排第二次考试。',
      '把外州驾照通常免试的规则套给外国驾照，或用过期满 1 年的证件预期自动免试。',
      '照搬其他州的 30 天期限，忽略 Arizona 的工作、投票、居民学费和一年 7 个月等 resident triggers。',
      '默认 Authorized Third Party 与 MVD 同价、所有地点都做 road test，或期待柜台当场拿到塑料卡。',
      '只向 USPS 改地址，超过 10 天仍未更新 MVD driver 和 vehicle records。',
      '姓名变化后先去 MVD，未先向 SSA 更新并等 2 个工作日，也没有带连接旧名与新名的认证文件。',
      '等待 renewal notice 才检查到期日，或忘记 12 年照片更新可能触发 office visit。',
      '把 temporary receipt 当成 TSA 保证接受的正式证件，未为实体卡预留约 2 周。',
      '非公民按普通最大期限推算到期日，忽略 license 会受 authorized-presence 文件截止日限制。',
    ],
    recommendedSteps: [
      '先按用途选择 Non-Travel 或 Travel ID；只需驾驶且已有 passport 等 TSA accepted ID 时，不必把 Travel ID 当成唯一方案。',
      '再判断自己属于首次美国驾照、外州转入、外国驾照、续期、replacement、地址变化还是姓名变化，避免套错免试与线上资格。',
      '下载当前 40-5144，逐项核对修订号、primary identity、SSN、两份不同来源 Arizona address 和完整 name-change chain。',
      '姓名不一致时先向 SSA 更新并等 2 个工作日，再准备原件或认证副本；不要先预约一个材料无法通过的到访。',
      '非公民按 I-551、EAD 或 I-94 class type 配齐文件，F-1/J-1 加 I-20/DS-2019；无 SSN 时先让 MVD 明确当前 class type 的要求。',
      '中国大陆驾照持有人按没有 reciprocity exemption 的路径学习 Arizona Driver License Manual，完成 30 题、80% permit test、vision 和 road test。',
      '18 岁以上通过笔试后再预约 road test；未满 18 岁者记录 permit 签发日、6 个月持证期和监护人要求。',
      '路考前检查身份证明、registration、liability insurance、租车授权、车辆安全与夏季空调限制，并熟悉英文指令。',
      '用官方 locations 列表比较 MVD 和 driver-license ATP；选择 ATP 前电话确认具体业务、预约方式和 convenience fee。',
      '成为 Arizona resident 后同时推进 driver credential 与车辆 registration，先检查 Phoenix/Tucson emissions requirement，不等待一个未由普通新居民页面给出的通用 30 天倒计时。',
      '续期前检查卡面到期日、authorized-presence 截止日和 12 年照片节点，再让 AZ MVD Now 判断能否 online renewal。',
      '遗失损坏且信息不变时走 $12 replacement；需要 Travel ID、改照片、改姓名或 MVD 要求重新核验时改走相应新申请或到场路径。',
      '搬家后 10 天内免费更新 MVD records；法定姓名变化则先改 SSA、等 2 个工作日并到场提交姓名文件。',
      '完成交易后核对 temporary receipt 上的姓名和地址，为邮寄预留最多约 15 天；临近飞行时继续准备 passport 等 TSA accepted ID。',
    ],
    actionLinks: [
      {
        label: 'Arizona Travel ID',
        url: 'https://azdot.gov/mvd/services/driver-services/arizona-travel-id',
        description: 'REAL ID 用途、$25、材料、线上资格、有效期和最多约 2 周邮寄。',
      },
      {
        label: 'Arizona DL/ID Requirements 40-5144',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5144.pdf',
        description: '当前官方 primary identity、SSN、两份住址和姓名变化材料表。',
      },
      {
        label: 'Arizona Residency Affidavit 40-5143',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5143.pdf',
        description: '地址材料不足时可作为其中一份证明的官方表格。',
      },
      {
        label: 'New to Arizona',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/new-to-arizona',
        description: 'Resident triggers、外州证件、车辆、emissions 和首次 MVD 到访。',
      },
      {
        label: 'Foreign Applicants',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/driver-license-foreign-applicants',
        description: '外国访客、authorized presence、SSN、四地免试、中国大陆路径和期限。',
      },
      {
        label: 'Permit Test',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/permit-test',
        description: '30 题、80%、Mandarin、未成年人线上监考和 permit 期限。',
      },
      {
        label: 'Road Tests',
        url: 'https://azdot.gov/mvd/services/driver-services/tests-manuals-and-driving-schools/road-tests',
        description: '预约、车辆、保险、英文指令、评分和夏季空调限制。',
      },
      {
        label: 'Driver License Manual',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/99-0117.pdf',
        description: 'Arizona 交通规则、考试准备和客户服务官方手册。',
      },
      {
        label: 'Driver License Fees',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/fees-driver-license',
        description: 'Non-Travel 年龄费率、Travel ID、permit、duplicate 和付款方式。',
      },
      {
        label: 'Renew Your License',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/renew-your-license',
        description: '到期前 6 个月、online renewal 和可能需要到场的情形。',
      },
      {
        label: 'Replace License or ID',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/replace-your-license',
        description: '$12 online replacement、照片更新和 Travel ID 新申请边界。',
      },
      {
        label: 'Change Your Address',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/change-your-address',
        description: '10 天、免费记录更新、$12 新卡和邮寄时间。',
      },
      {
        label: 'Change Your Name',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/change-your-name',
        description: '10 天、SSA 前置、2 个工作日和原件/认证副本。',
      },
      {
        label: 'Authorized Third Party locations',
        url: 'https://azdot.gov/mvd/services/driver-services/authorized-third-party-driver-license-locations',
        description: '可做 DL、Travel ID、考试的授权私人地点及 convenience fee 提醒。',
      },
      {
        label: 'Proof of Identity and Authorized Presence',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/proof-identification-age-and-authorized',
        description: 'Authorized presence、SSN 法定要求和 Arizona resident 定义。',
      },
      {
        label: 'Arizona ID Card',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/id-card',
        description: '所有年龄、材料、$12、免费资格和 replacement。',
      },
      {
        label: 'AZ MVD Now',
        url: 'https://azmvdnow.gov/',
        description: 'Travel ID 资格、续期、补证、改址和预约官方账户入口。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'AZDOT 深层页面无法打开时，从联邦目录重新进入 Arizona MVD。',
      },
    ],
    sources: [
      {
        label: 'ADOT MVD Arizona Travel ID',
        url: 'https://azdot.gov/mvd/services/driver-services/arizona-travel-id',
        note: 'REAL ID 用途、材料、$25、线上资格、有效期、residency affidavit 和邮寄。',
      },
      {
        label: 'Arizona DL/ID Requirements 40-5144 R03/26',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5144.pdf',
        note: '英文原件/认证副本、primary identity、SSN、两份地址、姓名变化和免试证件时限。',
      },
      {
        label: 'Arizona Residency Affidavit 40-5143',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/40-5143.pdf',
        note: 'Affidavit 只能作为一份 residency，仍需第二份合格证明。',
      },
      {
        label: 'ADOT MVD New to Arizona',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/new-to-arizona',
        note: '首次到访、外州证件、SSN、Travel ID 地址、resident triggers、车辆与 emissions。',
      },
      {
        label: 'ADOT MVD Foreign Applicants',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/driver-license-foreign-applicants',
        note: '访客外国驾照、IDP、authorized presence、I-94、SSN、四地免试与有效期。',
      },
      {
        label: 'ADOT MVD Permit Test',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/permit-test',
        note: '30 题、80%、Mandarin、未成年人 at-home test、6 个月和 12 个月节点。',
      },
      {
        label: 'ADOT MVD Road Tests',
        url: 'https://azdot.gov/mvd/services/driver-services/tests-manuals-and-driving-schools/road-tests',
        note: '预约、车辆、registration、insurance、English instructions、评分和天气限制。',
      },
      {
        label: 'Arizona Driver License Manual',
        url: 'https://apps.azdot.gov/files/mvd/mvd-forms-lib/99-0117.pdf',
        note: 'Arizona 交通规则、考试准备、resident definition、费用与 credential 流程。',
      },
      {
        label: 'ADOT MVD Driver License Fees',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/fees-driver-license',
        note: 'Non-Travel 年龄费率、Travel ID、permit、duplicate 与付款方式。',
      },
      {
        label: 'ADOT MVD Renew Your License',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/renew-your-license',
        note: '到期前 6 个月、online renewal、照片、vision、documents 和 office visit。',
      },
      {
        label: 'ADOT MVD Drivers FAQ',
        url: 'https://azdot.gov/mvd/drivers-faq',
        note: '外州通常免试、外国驾照与 IDP、无 renewal notice 和 12 年照片。',
      },
      {
        label: 'ADOT MVD Replace License or ID',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/replace-your-license',
        note: '$12 replacement、照片 office visit 与 Travel ID 新申请。',
      },
      {
        label: 'ADOT MVD Change Your Address',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/change-your-address',
        note: '10 天、online 免费更新、driver/vehicle 同步、$12 新卡和最多约 2 周。',
      },
      {
        label: 'ADOT MVD Change Your Name',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/change-your-name',
        note: '10 天、SSA、2 个工作日、到场和原件/认证副本。',
      },
      {
        label: 'ADOT MVD Authorized Third Parties',
        url: 'https://azdot.gov/mvd/services/professional-services/authorized-third-party-services',
        note: '私人机构、可授权业务、convenience fee 和邮寄制证。',
      },
      {
        label: 'ADOT MVD Driver License ATP Locations',
        url: 'https://azdot.gov/mvd/services/driver-services/authorized-third-party-driver-license-locations',
        note: '具体 driver license、Travel ID、written/road test 地点和额外费用提醒。',
      },
      {
        label: 'ADOT MVD Proof of Identity and Authorized Presence',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-information/proof-identification-age-and-authorized',
        note: 'Authorized presence、SSN、resident definition、学生和军人例外。',
      },
      {
        label: 'ADOT MVD Driver License and ID Information',
        url: 'https://azdot.gov/mvd/services/driver-services/driver-license-and-identification-information',
        note: 'Travel/Non-Travel 区别、$25、temporary receipt 和最多 15 天邮寄。',
      },
      {
        label: 'ADOT MVD Identification Card',
        url: 'https://azdot.gov/mvd/services/driver-license-ID/id-card',
        note: '所有年龄、材料、标准 $12、免费资格与 Travel ID 排除。',
      },
      {
        label: 'Arizona law 28-448',
        url: 'https://www.azleg.gov/ars/28/00448.htm',
        note: '姓名或地址变化后 10 天通知义务及 civil traffic violation。',
      },
      {
        label: 'Arizona law 28-2001',
        url: 'https://www.azleg.gov/ars/28/02001.htm',
        note: '车辆业务 resident definition、7 个月、工作、学校和商业触发点。',
      },
      {
        label: 'Arizona law 28-3152',
        url: 'https://www.azleg.gov/ars/28/03152.htm',
        note: '非居民持有效外州或外国 Class D 驾照在 Arizona 驾驶的豁免边界。',
      },
      {
        label: 'Arizona law 28-3158',
        url: 'https://www.azleg.gov/ars/28/03158.htm',
        note: 'Driver application 的 full legal name、DOB、residence、authorized presence 与 SSN。',
      },
      {
        label: 'Arizona law 28-3164',
        url: 'https://www.azleg.gov/ars/28/03164.htm',
        note: 'Original applicant 的 eyesight、knowledge、traffic devices 和 road demonstration。',
      },
      {
        label: 'Arizona law 28-3171',
        url: 'https://www.azleg.gov/ars/28/03171.htm',
        note: '普通 Class D/M 至 65 岁、60 岁后 5 年、renewal 和有限期限例外。',
      },
      {
        label: 'Arizona law 28-413',
        url: 'https://www.azleg.gov/ars/28/00413.htm',
        note: 'Foreign reciprocity 的法定条件、current-list 义务与非 CDL 边界。',
      },
      {
        label: 'Arizona law 28-3002',
        url: 'https://www.azleg.gov/ars/28/03002.htm',
        note: 'Class D 年龄费率、permit、duplicate 和其他法定费用。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受身份证件及没有 REAL ID 时的联邦核验说明。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'proof-of-residency',
      'name-change-chain',
      'non-citizen-license-id',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
      'lost-vehicle-title-replacement-electronic-title-lien-sale',
    ],
  },
  {
    id: 'colorado',
    abbr: 'CO',
    nameEn: 'Colorado',
    nameZh: '科罗拉多州',
    agency: 'Colorado Division of Motor Vehicles',
    agencyUrl: 'https://dmv.colorado.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    summary:
      '科罗拉多先按身份与用途分流：符合联邦条件的申请人办理带星 REAL ID，undocumented 或多数 temporarily lawfully present 居民办理带黑色限制栏的 Standard credential；成为 Colorado resident 后，驾照通常要在 30 天内转入，车辆由 county office 在 90 天内注册。',
    realIdSummary:
      '首次 Colorado REAL ID 或外州转入通常要按 DR 2300A 准备 identity 与 lawful-presence 文件、Social Security number、两份不同的 Colorado physical-address 证明和完整姓名变化链；外州卡即使已经有 REAL ID 星标，也不会免除 Colorado 的文件核验。',
    licenseSummary:
      'Colorado Standard driver license、permit 或 ID 是有效州身份证件，但不是 REAL ID，不能用于要求 REAL ID 的联邦用途；现行 CO-RCSA 路径面向 undocumented 与 temporarily lawfully present 居民，通常有效 3 年，并按身份类别使用 DR 2300B 或 DR 2300C。',
    appointmentNote:
      'State driver license office 主要实行预约制，首次申请和外州转入应先 pre-register 再预约；14 个 county office 的驾照服务、walk-in 和费用各自确认，车辆 title/registration 由 county 办理，普通 drive skills test 则直接向州批准的 third-party school 预约。',
    editorNotes: [
      'Colorado 给符合 REAL ID 条件的居民签发带黑色或旧版金色星标的 credential；带黑色横幅并写有 NOT VALID FOR FEDERAL IDENTIFICATION, VOTING OR PUBLIC BENEFIT PURPOSES 的 Standard credential 不属于 REAL ID。',
      'REAL ID 不是合法驾驶的额外许可；18 岁以上旅客自 2025 年 5 月 7 日起进入 TSA checkpoint 时，可使用 REAL ID 或有效护照等 TSA 接受的替代证件。',
      'Colorado temporary paper credential 可以立即作为临时驾驶凭证，但 DMV 与 TSA 都提醒它本身不是可接受的 REAL ID 航空身份证件。',
      '美国公民、永久居民、Freely Associated States 公民和适用 CDL 申请人的首次 Colorado credential，应按 Required Documents 或 DR 2300A 路径证明 identity、lawful presence、SSN 和 Colorado address。',
      '身份与 lawful-presence 文件通常必须是未更改的原件或签发机关认证副本；普通复印件、手机照片、层压版本和仅经公证人认证的副本不能替代。',
      'Required Documents 页面要求准备 SSN card、W-2、显示全名和完整 SSN 的 pay stub、SSA-1099 或其他 1099 之一；Driver License FAQ 也说明可口头提供号码，但材料条件复杂时携带文件更稳妥。',
      'REAL ID 路径要带两份不同的 Colorado address 文件，两份都显示全名和当前 physical address、不得只有 P.O. Box，并在过去一年内出具。',
      '电子版地址证明可以在手机上出示；junk mail、手写收据、仅有 P.O. Box 或贴标签/手写改址的信封不接受。',
      '姓名与 identity、SSN 或旧 credential 不一致时，按身份类别准备能连接每次变化的认证文件；普通 REAL ID 姓名变更还要先让 SSA 更新记录。',
      '自 2025 年 3 月 31 日起，undocumented 首次 Standard 申请人不再需要 SSN/ITIN、上一年度 Colorado income-tax filing 或过去两年居住打印证明。',
      'Undocumented Standard 首次申请通常需要一份 home-country passport、consular card 或 military ID、一份过去一年内的当前 Colorado physical-address 证明，以及 CO-RCSA affidavit；身份文件可未过期或过期不足 10 年。',
      'Temporarily lawfully present 申请人按 DR 2300B 提交 identity、当前 lawful-presence 文件和一份过去一年内的 Colorado physical-address 证明，并通过 SAVE 等适用核验。',
      'Standard credential 是有效 Colorado 身份证件但不是 REAL ID，通常自签发日起有效 3 年；未成年人驾照为 3 年或 21 岁生日后 20 天，以较早者为准。',
      '多数 temporarily lawfully present 居民即使原外州卡有 REAL ID 星标，转入 Colorado 后仍取得 Standard credential；不要把外州星标当作 Colorado REAL ID 资格证明。',
      '当前费用表列 REAL ID driver license/renewal $32、instruction permit $19、未满 60 岁 ID $13；超过 60 岁的普通 ID 免费。',
      '当前 Standard 费用表列 driver license $34、instruction permit $21.50、ID $13.30；首次 duplicate permit/license $12.30，后续 duplicate $16.40。',
      'Colorado resident 的触发条件包括在州内经营业务、在州内受雇，或连续居住 90 天；建立 residency 后驾照转入期限为 30 天，车辆注册期限为 90 天。',
      '持有效或过期不足 1 年的美国外州驾照转入时，应带原卡；也可用 30 天内出具、显示该驾照仍有效或过期不足 1 年的 MVR，原外州卡会被打孔作废。',
      '持有效美国外州驾照通常无需重新考试；证件过期超过 1 年，或从未持证、驾照取消超过 12 个月，则应准备 written test、permit 和 drive test 路径。',
      'Colorado 当前外国驾照 reciprocity 名单是 Canada、France、Germany、Republic of South Korea、Taiwan 和 Japan；符合国籍、永久居民和文件条件者可免 permit、written 与 drive tests。',
      'Taiwan 驾照还要 Denver Taipei Economic and Cultural Office 出具确认有效并含翻译的 official statement；Japan 路径限日本国民，并要带预约前 3 个月内由 Denver 日本总领馆签发的 VCDL。',
      '中国大陆驾照不在当前 reciprocity 名单中；持证人应按年龄和身份完成 Colorado permit、written test、vision 与 third-party drive test，不要套用 Taiwan 路径。',
      'Adult applicant 从未有驾照，或驾照 expired/canceled 超过 12 个月时必须先取得 permit；可在办公室或 @Home 完成 knowledge test。',
      '@Home 与州办公室 knowledge test 目前只直接提供 English 和 Spanish；需要其他口语翻译可按 office accommodation 路径自带 interpreter，interpreter 要出示未过期 driver license 或 ID，姓名和证件号会记入档案。',
      '@Home knowledge test 第一次总费用当前为 $6.50，之后每次 $17.65，每天最多两次；通过后仍要预约 state office 完成 permit 签发。',
      'State driver license offices 当前不做普通 drive skills test；申请人直接向 approved third-party testing school 预约，学校可另收自己的测试费。',
      'Drive test 车辆要有有效 registration、有效 insurance 并通过灯光等安全检查；州费表另列每次 written retest $11.50 和 drive-test retest $15.40。',
      '办公室交易先发立即有效的 paper temporary credential，实体卡通常约 10 至 14 个工作日寄到，官方统一要求最多预留 30 天。',
      '成人 regular credential 符合条件时可线上续期；常见条件包括 21 岁以上、照片不足 10 年、过期不超过 1 年、无姓名或视力变化、无 active restriction，且过去 5 年没有 DUI。',
      '21 至 79 岁线上续期要确认过去一年做过 eye exam；80 岁及以上要上传过去 6 个月内由 optometrist/ophthalmologist 签署的 DR 2498。',
      'Undocumented 居民可按资格 online renewal，并重新提交 CO-RCSA affidavit；temporarily lawfully present 居民只能到 office 续期，并带当前 lawful-presence 文件或 extension letter。',
      '只更新地址可在线、邮寄或到 office 修改记录，再自行把新地址标签贴到卡背，DMV 不会因此自动寄新卡；要让新地址印在卡上需购买新 credential 或在续期中更新。',
      '普通姓名变更要先在 SSA 留档并至少等待 24 至 48 个工作小时，再预约 state office 带认证姓名文件；TLP 或 undocumented 的姓名证据必须按其 USCIS 或 home-country 文件规则处理，不能直接套用普通 marriage-certificate 路径。',
      '遗失、被盗或严重损坏的 driver license/permit duplicate 不能在线办理，通常要预约并保留原到期日；遗失 ID 则按 renewal 处理，是否可线上取决于照片和其他资格。',
      '实体卡签发 30 天仍未收到时先查 Where is my Driver License/ID；在签发后第 30 至 90 天到 state office 申请可能免费，超过 90 天通常要重新付 duplicate 费用。',
      'Colorado 居民不能同时持有 Colorado driver license/permit 和 ID card；首次 ID 要预约并交相应身份文件，未满 21 岁通常由 legal guardian 陪同并证明 guardianship。',
    ],
    documentHighlights: [
      '先按身份选择正确清单：U.S. citizen/permanent resident/FAS/适用 CDL 用 Required Documents 或 DR 2300A；temporarily lawfully present 用 DR 2300B；undocumented 用 DR 2300C。',
      'REAL ID 身份与 lawful-presence 材料带原件或签发机关认证副本；不要带手机照片、普通 photocopy、层压件或仅由 notary 认证的副本。',
      'SSN 最稳妥的准备方式是带 signed Social Security card、W-2、显示全名和完整号码的 pay stub、SSA-1099 或其他 1099 之一。',
      '准备两份不同来源的 Colorado residency：两份都显示全名、当前 physical address、完整日期且不超过一年；电子版可在手机上展示，但不能只有 P.O. Box。',
      '身份文件与当前姓名不同，按每次变更准备 certified marriage/civil-union certificate、divorce decree 或 court order，并先完成适用的 SSA 或 USCIS/home-country 记录更新。',
      'Undocumented Standard 首次申请带一份合格 home-country passport、consular card 或 military ID、一份当前 Colorado address 和 CO-RCSA affidavit；不要再按 2025 年 3 月 31 日前的 SSN/ITIN、报税或两年居住旧清单准备。',
      'Temporarily lawfully present 申请人带 DR 2300B 所列 current passport、I-94、I-766、I-797 或其他适用 USCIS 文件及一份当前地址证明；具体组合必须能通过 SAVE。',
      '外州转入带有效或过期不足 1 年的原驾照；没有原卡时准备 30 天内出具并显示相同有效状态的 MVR，仍要另带 Colorado 身份、SSN 和地址材料。',
      '外国驾照不要单独当 identity document；reciprocity 申请人同时准备有效原驾照和该国家的附加证明，中国大陆申请人另备 knowledge、vision、permit 与 drive-test 文件。',
      '需要中文口头协助时提前确认 office interpreter 路径；自带 interpreter 要有未过期 driver license/ID，外文身份文件还要与满足 Colorado 固定声明格式的完整英文翻译一起提交。',
      'Permit 签发带通过证明和身份材料；drive test 当天带 permit、有效 vehicle registration、insurance，并先确认第三方学校的车辆、安全检查和额外费用要求。',
    ],
    commonMistakes: [
      '外州驾照已有 REAL ID 星标，就以为 Colorado 不会重新核验 identity、lawful presence、SSN 和两份地址。',
      '用带黑色限制栏的 Standard credential 单独过 TSA，忽略它不是 REAL ID。',
      '把 paper temporary credential 当作 TSA 接受的正式带星证件。',
      'REAL ID 只带一份地址证明，或文件超过一年、只有 P.O. Box、没有申请人全名。',
      '用普通复印件、手机照片、层压文件或 notary copy 代替签发机关认证副本。',
      '看到 FAQ 可口头报 SSN，就完全不准备 Required Documents 页面列出的 SSN 文件。',
      '仍按旧 CO-RCSA 清单准备 SSN/ITIN、上一年度报税和过去两年 residency，反而漏掉当前 affidavit 与一份地址。',
      'Temporarily lawfully present 申请人拿外州 REAL ID 来期待 Colorado 继续签发 REAL ID，而没有按 DR 2300B 准备 Standard credential。',
      'Undocumented 或 TLP 直接用普通 marriage certificate 改名，没有先按 home-country 或 USCIS 记录规则更新。',
      '把中国大陆驾照误当 Taiwan 驾照，缺少 written、permit 或 drive test。',
      '用外国驾照代替 Standard 申请所需的 passport、consular card 或 home-country military ID。',
      '在 Colorado state driver license office 预约普通 road test，而没有联系 approved third-party school。',
      '以为 @Home test 有中文界面，未提前安排 English/Spanish 或 office interpreter 路径。',
      '驾照过期超过 1 年仍按普通 transfer/renewal 预约，没准备重新考 written 和 drive test。',
      '首次申请或外州转入没有 pre-register，也没有 state-office appointment confirmation。',
      '把 driver license、vehicle registration 和 road test 都预约到同一个地点，忽略 state、county 与 third party 的分工。',
      '只更新 DMV address record 后等待新卡寄来，未自行贴标签或另购印有新地址的 credential。',
      '先到 DMV 改名，没有先完成 SSA 更新和至少 24 至 48 个工作小时同步。',
      '尝试在线办理 duplicate driver license，忽略该业务通常需要 office appointment。',
      '实体卡 30 天未到仍不查状态，错过签发后 30 至 90 天的可能免费 replacement 窗口。',
      '同时保留 Colorado driver license/permit 和 Colorado ID card，忽略州规则只允许二者之一。',
    ],
    recommendedSteps: [
      '先判断用途：只需驾驶或州内身份，还是需要 TSA/联邦用途；有有效 passport 等 TSA accepted ID 时，不必把临行前办理 REAL ID 当作唯一方案。',
      '再判断身份清单：DR 2300A、DR 2300B 或 DR 2300C，只使用与自己当前身份相符的一套，不混用 REAL ID 与 Standard 要求。',
      '确认交易类型：首次驾照、外州转入、外国驾照、permit、续期、duplicate、地址变更、姓名变更或 ID card。',
      '首次和转入先完成 online pre-registration，再用 Appointment Scheduling 选择 First Time CO DL/Permit/ID；保存 confirmation email 和 appointment ID。',
      'REAL ID 按 identity/lawful presence、SSN、两份 current Colorado address、name-change chain 五组整理原件或认证副本。',
      'Standard 申请人按 DR 2300B/2300C 准备 identity、适用 lawful presence、一份 current address 和 CO-RCSA affidavit，不提交已经取消的旧税表或两年居住要求。',
      '姓名不一致时先完成 SSA、USCIS 或 home-country document 更新，再准备对应认证文件；普通姓名变更至少给 SSA 24 至 48 个工作小时同步。',
      '美国外州转入核对旧证是否有效或过期不足 1 年；没有原卡时在到访前 30 天内取得合格 MVR。',
      '外国驾照先检查六地 reciprocity 及附加条件；中国大陆驾照按无 reciprocity 路径准备 permit、English/Spanish knowledge test、vision 和 third-party drive test。',
      '需要 knowledge test 时选择 @Home、state office 或 driving school；要中文口头翻译则提前确认 office interpreter 要求，不把 @Home 当作中文考试。',
      '通过 permit test 后预约 state office 完成签发；再直接联系 approved third-party school 做 drive test，核对 permit、registration、insurance、安全检查和学校收费。',
      'office 交易后核对 paper temporary credential 上的姓名和地址，并为实体卡预留 10 至 14 个工作日、最多 30 天；飞行时另带正式 TSA accepted ID。',
      '续期先让 myDMV 判断线上资格；照片满 10 年、姓名/视力/身份变化、TLP、过期超过 1 年等情形改走 office。',
      '只改地址时更新记录并贴自制地址标签；要新地址印在卡上、要改名或要 duplicate 时，按相应 office/renewal 路径付费办理。',
      '签发 30 天仍未收到就立即查 delivery status；在第 30 至 90 天窗口向 state office 处理可能的免费 replacement。',
      '成为 resident 后同时安排 driver credential 与 county vehicle registration：驾照 30 天、车辆 90 天，不把 county title/registration 约到 state driver-license office。',
    ],
    actionLinks: [
      {
        label: 'REAL ID and Colorado',
        url: 'https://dmv.colorado.gov/real-id-and-colorado',
        description: 'REAL ID 资格、星标、Standard 区别、联邦用途和 temporary credential 限制。',
      },
      {
        label: 'Required Identification Documents',
        url: 'https://dmv.colorado.gov/documents',
        description: 'DR 2300A 路径、原件、SSN、两份地址、预约和邮寄。',
      },
      {
        label: 'Standard Licenses and IDs',
        url: 'https://dmv.colorado.gov/drivers/standard-license-and-ID-cards',
        description: 'Undocumented/TLP、2025 新要求、3 年期限、DR 2300B/C 和翻译。',
      },
      {
        label: 'Welcome to Colorado',
        url: 'https://dmv.colorado.gov/new-to-colorado',
        description: 'Resident triggers、30/90 天、新居民、外州转入、学生与军人。',
      },
      {
        label: 'Out-of-Country License',
        url: 'https://dmv.colorado.gov/new-colorado-another-country',
        description: '六地 reciprocity、Taiwan/Japan 附加文件和其他国家考试路径。',
      },
      {
        label: 'Adult Permit',
        url: 'https://dmv.colorado.gov/adult-permit',
        description: '从未持证、过期超过 12 个月、knowledge test、permit 和语言协助。',
      },
      {
        label: '@Home Knowledge Test',
        url: 'https://dmv.colorado.gov/home-driving-knowledge-tests',
        description: 'English/Spanish、费用、设备、次数、预约和 proxy 要求。',
      },
      {
        label: 'Appointment Scheduling',
        url: 'https://dmv.colorado.gov/AppointmentScheduling',
        description: 'State、county、third party 分流与 state office 预约。',
      },
      {
        label: 'State DMV Fees',
        url: 'https://dmv.colorado.gov/state-dmv-fees',
        description: 'REAL ID/Standard、permit、ID、duplicate 和 retest 当前费用。',
      },
      {
        label: 'Renew License / Permit / ID',
        url: 'https://dmv.colorado.gov/renew-your-colorado-driver-license-permit-or-id-card',
        description: '线上、office、mail 资格，眼科要求和身份分类。',
      },
      {
        label: 'Change Your Address',
        url: 'https://dmv.colorado.gov/change-your-address',
        description: '在线、邮寄、office 更新记录，新卡与自行地址标签边界。',
      },
      {
        label: 'Driver License FAQ',
        url: 'https://dmv.colorado.gov/faq-driver-license',
        description: 'SSN、外州免试、地址、姓名、路考和续期常见问题。',
      },
      {
        label: 'Replace Lost/Stolen Credential',
        url: 'https://dmv.colorado.gov/replace-your-lost-stolen-or-destroyed-driver-license/permit/cdl/id',
        description: 'Duplicate、office、out-of-state mail、未收到和 30 至 90 天窗口。',
      },
      {
        label: 'Identification Cards',
        url: 'https://dmv.colorado.gov/identification-cards',
        description: '不能与驾照并持、首次申请、费用、续期和 10 至 30 天邮寄。',
      },
      {
        label: 'Colorado DMV 首页',
        url: 'https://dmv.colorado.gov/',
        description: '进入 myDMV、driver/ID、vehicle、forms、locations 和 contact。',
      },
    ],
    sources: [
      {
        label: 'Colorado DMV REAL ID and Colorado',
        url: 'https://dmv.colorado.gov/real-id-and-colorado',
        note: '资格、星标、Standard 排除、2025 联邦用途、材料和 temporary credential。',
      },
      {
        label: 'Colorado DMV Required Identification Documents',
        url: 'https://dmv.colorado.gov/documents',
        note: 'DR 2300A 路径、原件/认证副本、SSN、两份地址、姓名、预约和 30 天邮寄。',
      },
      {
        label: 'Colorado DR 2300A Identification Checklist',
        url: 'https://dmv.colorado.gov/sites/dmv/files/documents/DR%202300A_e_wo.pdf',
        note: '美国公民与永久居民 identity、lawful presence、SSN、residency 和 transfer 清单。',
      },
      {
        label: 'Colorado DMV Standard Licenses and IDs',
        url: 'https://dmv.colorado.gov/drivers/standard-license-and-ID-cards',
        note: '2025-03-31 新规则、undocumented/TLP、3 年期限、材料、翻译、续期和姓名边界。',
      },
      {
        label: 'Colorado DR 2300B TLP Checklist',
        url: 'https://dmv.colorado.gov/sites/dmv/files/documents/DR%202300B_e_wo.pdf',
        note: 'Temporarily lawfully present identity、USCIS lawful-presence、SAVE、地址和 transfer。',
      },
      {
        label: 'Colorado DR 2300C Undocumented Checklist',
        url: 'https://dmv.colorado.gov/sites/dmv/files/documents/DR2300C.pdf',
        note: '02/24/25 identity、当前地址、10 年文件期限、translation 和 Standard 限制栏。',
      },
      {
        label: 'Colorado CO-RCSA Affidavit DR 2212A',
        url: 'https://dmv.colorado.gov/sites/dmv/files/251DR2212A.pdf',
        note: 'Standard credential 的 Colorado residency affidavit 与声明法律后果。',
      },
      {
        label: 'Colorado DMV New to Colorado',
        url: 'https://dmv.colorado.gov/new-to-colorado',
        note: 'Resident triggers、30 天换证、90 天车辆注册、外州证件、MVR、学生和军人。',
      },
      {
        label: 'Colorado DMV Out-of-Country License',
        url: 'https://dmv.colorado.gov/new-colorado-another-country',
        note: 'Canada、France、Germany、South Korea、Taiwan、Japan reciprocity 和附加文件。',
      },
      {
        label: 'Colorado DMV Adult Permit',
        url: 'https://dmv.colorado.gov/adult-permit',
        note: '从未持证/过期超过 12 个月、written test、permit、语言协助和 30 天制证。',
      },
      {
        label: 'Colorado DMV Adult License',
        url: 'https://dmv.colorado.gov/adult-license',
        note: '第三方 drive test、permit、SSN、address 和 Standard 分流。',
      },
      {
        label: 'Colorado DMV @Home Knowledge Tests',
        url: 'https://dmv.colorado.gov/home-driving-knowledge-tests',
        note: 'English/Spanish、$6.50/$17.65、每天两次、appointment 和 proxy。',
      },
      {
        label: 'Colorado DMV Appointment Scheduling',
        url: 'https://dmv.colorado.gov/AppointmentScheduling',
        note: 'State/county/third-party 分工、预约类型、walk-in 和 pre-registration。',
      },
      {
        label: 'Colorado State DMV Fees',
        url: 'https://dmv.colorado.gov/state-dmv-fees',
        note: 'REAL ID、Standard、permit、ID、duplicate、written/drive retest 当前费用。',
      },
      {
        label: 'Colorado DMV Renew License Permit or ID',
        url: 'https://dmv.colorado.gov/renew-your-colorado-driver-license-permit-or-id-card',
        note: 'Online/in-office/mail eligibility、过期、照片、eye exam、NLP/TLP 和 name/address changes。',
      },
      {
        label: 'Colorado DMV Change Your Address',
        url: 'https://dmv.colorado.gov/change-your-address',
        note: 'Online/mail/office 更新、地址标签、是否寄新卡和证明要求。',
      },
      {
        label: 'Colorado DMV FAQ Driver License',
        url: 'https://dmv.colorado.gov/faq-driver-license',
        note: 'SSN、外州免试、address、SSA name change、road test 和 online renewal。',
      },
      {
        label: 'Colorado DMV Standard License FAQ',
        url: 'https://dmv.colorado.gov/sb251-co-rcsa-faqs',
        note: 'Standard 材料、English/Spanish 笔试、interpreter 和 road-test 车辆、registration、insurance。',
      },
      {
        label: 'Colorado DMV Replace Lost or Stolen Credential',
        url: 'https://dmv.colorado.gov/replace-your-lost-stolen-or-destroyed-driver-license/permit/cdl/id',
        note: 'Duplicate、appointment、identity、same expiration、mail loss 和 30 至 90 天窗口。',
      },
      {
        label: 'Colorado DMV Identification Cards',
        url: 'https://dmv.colorado.gov/identification-cards',
        note: '与驾照/permit 互斥、首次材料、over-60 fee、renewal 和 10 至 30 天邮寄。',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
        note: '国内航班可接受证件与 temporary driver license 限制。',
      },
    ],
    relatedTopicSlugs: [
      'real-id-basics',
      'document-checklist',
      'proof-of-residency',
      'name-change-chain',
      'non-citizen-license-id',
      'standard-license-driving-privilege-no-lawful-status',
      'foreign-license-idp-transfer',
      'first-driver-license-road-test',
      'dmv-test-language-translation-interpreter',
      'renewal-replacement-address',
      'moving-to-new-state',
    ],
  },
  {
    id: 'nevada',
    abbr: 'NV',
    nameEn: 'Nevada',
    nameZh: '内华达州',
    agency: 'Nevada Department of Motor Vehicles',
    agencyUrl: 'https://dmv.nv.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '内华达 DMV 把 REAL ID、地址证明、新居民和线上服务分成多个官方页面。REAL ID 或首次 license/ID 不能只靠线上完成，需要带原件到 DMV 办公室核验。',
    realIdSummary:
      'Nevada REAL ID 要围绕 identity、Social Security、Nevada residency 和姓名变更文件准备。官方材料页要求两份 Nevada 居住地址证明，并提醒外文文件需要 DMV 认可翻译。',
    licenseSummary:
      '新居民页面列出身份、姓名变更、SSN、两份 Nevada 地址证明和现有外州证件等材料。续期和地址变更可先看 MyDMV / Online Services，但 71 岁以上、非美国公民、CDL、DAC 等情况可能不能线上续期。',
    appointmentNote:
      '先用 Nevada DMV REAL ID 或材料页判断是否需要办公室；REAL ID、首次办证和很多文件核验业务要预约或到 DMV office，卡片通常不是现场永久卡片即时交付。',
    editorNotes: [
      'Nevada DMV Online Services 页面明确写明不能在线取得 REAL ID / license / ID；页面要避免暗示线上即可完成。',
      'Nevada residency 页面要求 originals 或 certified copies，并提到 DMV-approved translations，适合中文用户重点提示。',
      '续期页面对 71+、非美国公民、CDL、DAC、limited-term 等限制较多，页面只写“先判断资格”更稳妥。',
    ],
    documentHighlights: [
      'proof of identity 和所有姓名变更文件。',
      'Social Security Number 相关证明。',
      '两份 Nevada residential address 证明。',
      '外文材料要使用 Nevada DMV 认可翻译；不要带普通自译件。',
      'limited-term 或移民身份相关证件在续期、变更时可能需要重新出示。',
    ],
    commonMistakes: [
      '以为 Nevada REAL ID 可以在线申请完成。',
      '只带一份 Nevada 地址证明。',
      '外文文件没有准备 DMV 认可翻译。',
      '搬家后没先更新地址，就直接续期或补证。',
      '非美国公民或 limited-term 身份用户忽略每次续期/变更可能要带移民文件。',
    ],
    recommendedSteps: [
      '先打开 Nevada DMV REAL ID 页面，确认自己要办 REAL ID 还是普通业务。',
      '用 Nevada DMV Residency and Proof of Identity 页面整理身份、SSN、地址和姓名文件。',
      '新搬到 Nevada 的用户按 New Resident Guide 准备外州证件和两份 Nevada 地址证明。',
      '续期或地址变更先进入 Online Services 判断资格；不符合线上条件时再预约办公室。',
      '外文材料提前找 DMV 认可翻译，不要等到窗口才处理。',
    ],
    actionLinks: [
      {
        label: 'Nevada DMV REAL ID',
        url: 'https://dmv.nv.gov/realid.htm',
        description: '内华达 REAL ID 官方说明和材料准备入口。',
      },
      {
        label: 'Residency and Proof of Identity',
        url: 'https://dmv.nv.gov/dlresidency.htm',
        description: '身份、地址、SSN 和翻译文件要求。',
      },
      {
        label: 'New Resident Guide',
        url: 'https://dmv.nv.gov/newresident.htm',
        description: '新搬到 Nevada 后换证和登记相关说明。',
      },
      {
        label: 'Online Services',
        url: 'https://dmv.nv.gov/onlineservices.htm',
        description: '地址变更、续期资格和线上服务入口。',
      },
      {
        label: 'Driver License Renewal',
        url: 'https://dmv.nv.gov/dlrenewal.htm',
        description: 'Nevada 驾照续期和不能线上续期的情况。',
      },
    ],
    sources: [
      {
        label: 'Nevada DMV REAL ID',
        url: 'https://dmv.nv.gov/realid.htm',
      },
      {
        label: 'Nevada DMV Residency and Proof of Identity',
        url: 'https://dmv.nv.gov/dlresidency.htm',
      },
      {
        label: 'Nevada DMV New Resident Guide',
        url: 'https://dmv.nv.gov/newresident.htm',
      },
      {
        label: 'Nevada DMV Online Services',
        url: 'https://dmv.nv.gov/onlineservices.htm',
      },
      {
        label: 'Nevada DMV Driver License Renewal',
        url: 'https://dmv.nv.gov/dlrenewal.htm',
      },
    ],
    relatedTopicSlugs: ['proof-of-residency', 'non-citizen-license-id', 'moving-to-new-state'],
  },
  {
    id: 'oregon',
    abbr: 'OR',
    nameEn: 'Oregon',
    nameZh: '俄勒冈州',
    agency: 'Oregon Driver and Motor Vehicle Services',
    agencyUrl: 'https://www.oregon.gov/odot/dmv/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '俄勒冈 DMV 的 REAL ID 页面把旅行用途、材料清单和 DMV2U 预约放在一起说明。第一次申请 REAL ID 不能在线完成，需要到 DMV 办公室带原件或认证副本核验。',
    realIdSummary:
      'Oregon REAL ID 要准备身份证明、生日、lawful status、SSN 或不符合 SSN 的证明，以及两份来自不同来源的 Oregon 地址证明；地址证明不能只用 PO Box。',
    licenseSummary:
      '地址变更可在线或电话处理；2020 年起不再发地址贴纸，如需显示新地址可申请 replacement card。已经拥有 Oregon REAL ID 的用户在符合条件时可在线续期。',
    appointmentNote:
      'DMV2U 可用于材料清单、预约和部分线上业务。临近旅行时要预留实体卡邮寄时间；Oregon DMV 特别提醒 temporary paper ID 不被 TSA 接受，REAL ID 卡片可能需要最多约 3 周寄达。',
    editorNotes: [
      'Oregon REAL ID Traveler 页面把 temporary paper ID 不被 TSA 接受写得很清楚，机场专题和州页都要提醒。',
      'REAL ID 页面要求两份地址证明来自 different sources，且 no PO Box，是中文用户常见失误点。',
      '地址变更页面说明不再发 sticker，replacement card 只是需要新卡面时的选择。',
    ],
    documentHighlights: [
      '一份 identity / date of birth / lawful status 相关证明。',
      'SSN，或官方接受的 SSN 不适用证明。',
      '两份 Oregon 居住地址证明，来自不同来源，不能只显示 PO Box。',
      '原件或认证副本；电子版、影印件通常不能替代。',
      '非美国公民按官方页面准备未过期护照、签证、I-94 或 I-797A 等适用文件。',
    ],
    commonMistakes: [
      '临近航班才办 REAL ID，没有预留最多约 3 周收卡时间。',
      '以为 DMV 给的 temporary paper ID 可以过 TSA 安检。',
      '带两份同一来源地址证明，或只显示 PO Box。',
      '带手机照片、扫描件或普通复印件替代原件/认证副本。',
      '地址变更后等待 DMV 寄地址贴纸。',
    ],
    recommendedSteps: [
      '先在 Oregon REAL ID Traveler 页面判断是否真的需要 REAL ID，或是否可以用护照等替代证件。',
      '使用 DMV2U 或官方 checklist 整理 identity、SSN、lawful status 和两份地址证明。',
      '第一次申请 REAL ID 时预约 DMV office，并带原件或认证副本。',
      '旅行前至少预留寄卡时间；不要依赖 temporary paper ID 乘机。',
      '只是搬家时，先用 Change of Address 页面更新记录，再决定是否补办新卡。',
    ],
    actionLinks: [
      {
        label: 'Oregon REAL ID Traveler',
        url: 'https://www.oregon.gov/odot/dmv/pages/realidtraveler.aspx',
        description: '俄勒冈 REAL ID 旅行用途、材料和预约说明。',
      },
      {
        label: 'Oregon REAL ID',
        url: 'https://www.oregon.gov/odot/dmv/pages/real_id.aspx',
        description: 'REAL ID 标识、首次申请和材料要求。',
      },
      {
        label: 'Change of Address',
        url: 'https://www.oregon.gov/odot/dmv/pages/dv/chgaddress.aspx',
        description: 'Oregon DMV 地址变更说明。',
      },
      {
        label: 'DMV2U',
        url: 'https://dmv2u.oregon.gov/',
        description: '俄勒冈 DMV 线上服务、清单和预约入口。',
      },
    ],
    sources: [
      {
        label: 'Oregon DMV REAL ID Traveler',
        url: 'https://www.oregon.gov/odot/dmv/pages/realidtraveler.aspx',
        note: 'REAL ID 办理、DMV2U 预约及线上续期入口。',
      },
      {
        label: 'Oregon DMV REAL ID',
        url: 'https://www.oregon.gov/odot/dmv/pages/real_id.aspx',
        note: '首次申请、约 20 天邮寄、费用及用 DMV2U 续期或补证的官方 FAQ。',
      },
      {
        label: 'Oregon DMV Change of Address',
        url: 'https://www.oregon.gov/odot/dmv/pages/dv/chgaddress.aspx',
        note: '地址更新、停止签发地址贴纸和自愿申请 replacement card。',
      },
      {
        label: 'Oregon DMV2U',
        url: 'https://dmv2u.oregon.gov/',
        note: '线上续期、补证、地址更新和预约入口。',
      },
    ],
    relatedTopicSlugs: ['airport-travel-after-real-id', 'proof-of-residency', 'renewal-replacement-address'],
  },
  {
    id: 'connecticut',
    abbr: 'CT',
    nameEn: 'Connecticut',
    nameZh: '康涅狄格州',
    agency: 'Connecticut Department of Motor Vehicles',
    agencyUrl: 'https://portal.ct.gov/dmv',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '康涅狄格 DMV 用金色星标标识 REAL ID。续期、地址变更和转入外州驾照有独立页面；第一次申请 REAL ID、非美国公民、CDL、Drive-only 等情况通常不能按普通线上续期处理。',
    realIdSummary:
      'Connecticut REAL ID 页面要求准备 SSN、姓名变更文件和两份 Connecticut 居住地址证明。limited-term 或部分合法身份文件还要注意剩余有效期和 SAVE 验证时间。',
    licenseSummary:
      '普通续期可先看 online renewal 资格；页面列出不能线上续期的情况，例如第一次申请 REAL ID、非美国公民、CDL、驾照 suspended、Drive-only license、过期两年以上等。地址变化最好在续期前至少一周先处理。',
    appointmentNote:
      'CT DMV 线上服务可做部分续期和地址变更，但首次 REAL ID、转入外州驾照、文件核验或身份状态复杂时，应按页面要求准备原件并预约/到 DMV 或合作点办理。',
    editorNotes: [
      'CT renewal 页面明确把 first REAL ID 排除在线续期，页面要把“第一次 REAL ID 不走普通线上续期”讲清楚。',
      'CT REAL ID 页面提到 SAVE 验证可能需要 10+ business days，非公民用户应提前规划。',
      '转入外州驾照页面要求两份 Connecticut 地址证明且 PO Box 不可作为居住地址，适合放进材料提醒。',
      '2026-07-09 普通浏览器点验显示 CT DMV 页面从本环境返回 request blocked / service unavailable；如果用户也遇到阻挡，应从 USA.gov 州机动车服务目录进入 Connecticut 官方入口。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Connecticut DMV 官方深层页面在本环境普通浏览器点验中返回 request blocked / service unavailable。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录选择 Connecticut。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'Social Security Number 相关证明。',
      '两份 Connecticut 居住地址证明；PO Box 通常不能作为居住地址。',
      '姓名变化时带 marriage certificate、court order 等连接姓名的文件。',
      '非美国公民或 limited-term 文件要留意合法身份文件剩余有效期。',
      '身份状态需 SAVE 验证时，可能需要额外等待时间。',
    ],
    commonMistakes: [
      '第一次申请 REAL ID 却走普通 online renewal。',
      '地址已经变化，但没有在续期前至少一周先做地址变更。',
      '用 PO Box 当作 Connecticut 居住地址证明。',
      '非美国公民没有预留 SAVE 验证时间。',
      '姓名在 SSA 或其他证件上没有先更新，就去 DMV 改 REAL ID。',
    ],
    recommendedSteps: [
      '先看自己是否已有金色星标；如果只是驾驶用途，不一定必须马上升级。',
      '第一次申请 REAL ID 时，打开 Get REAL ID 页面核对 SSN、姓名和两份地址证明。',
      '续期前先读 renewal 页面，确认自己是否符合 online renewal 条件。',
      '搬家后先做地址变更；如果马上要续期，至少提前一周处理更稳妥。',
      '从外州搬入 Connecticut 的用户先看 transfer out-of-state license 页面准备外州证件和 CT 地址证明。',
    ],
    actionLinks: [
      {
        label: 'Get REAL ID',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/get-real-id',
        description: '康州 REAL ID 材料、身份和地址证明说明。',
      },
      {
        label: 'Renew Driver License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/renew-driver-license',
        description: '康州驾照续期和线上续期资格。',
      },
      {
        label: 'Transfer Out-of-State License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/transfer-out-of-state-license',
        description: '外州驾照转入 Connecticut 的材料和流程。',
      },
      {
        label: 'Change Driver License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/change-driver-license',
        description: '姓名、地址或驾照信息变更入口。',
      },
      {
        label: 'Online Change of Address',
        url: 'https://dmv.service.ct.gov/CustomerOnlineServices/s/Authenticate?ServiceID=COA&language=en_US',
        description: 'Connecticut DMV 在线地址变更服务。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'CT DMV 页面被拦截时，从联邦目录进入 Connecticut 官方机动车服务。',
      },
    ],
    sources: [
      {
        label: 'Connecticut DMV Get REAL ID',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/get-real-id',
      },
      {
        label: 'Connecticut DMV Renew Driver License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/renew-driver-license',
      },
      {
        label: 'Connecticut DMV Transfer Out-of-State License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/transfer-out-of-state-license',
      },
      {
        label: 'Connecticut DMV Change Driver License',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/change-driver-license',
      },
      {
        label: 'Connecticut DMV Online Change of Address',
        url: 'https://dmv.service.ct.gov/CustomerOnlineServices/s/Authenticate?ServiceID=COA&language=en_US',
      },
    ],
    relatedTopicSlugs: ['non-citizen-license-id', 'renewal-replacement-address', 'moving-to-new-state'],
  },
  {
    id: 'minnesota',
    abbr: 'MN',
    nameEn: 'Minnesota',
    nameZh: '明尼苏达州',
    agency: 'Minnesota Driver and Vehicle Services',
    agencyUrl: 'https://onlineservices.dps.mn.gov/EServices/_/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '明尼苏达驾照和 ID 由 Department of Public Safety 旗下 Driver and Vehicle Services 管理。该州同时有 Standard、REAL ID 和 Enhanced 相关证件路径，先确认自己是为了驾驶、国内航班，还是边境/联邦用途。',
    realIdSummary:
      'Minnesota REAL ID 要围绕身份、SSN、居住地址和姓名一致性准备材料。DPS 官方材料清单强调地址证明要来自可接受文件类别，并且通常要能显示当前 Minnesota 居住地址。',
    licenseSummary:
      '续期、补证、预申请和部分记录更新可从 Drive.mn.gov 或 DVS 服务入口开始；但首次 REAL ID、Enhanced 或文件核验仍要按 DVS 官方清单准备原件和现场办理路径。',
    appointmentNote:
      '明尼苏达很多驾照业务由 DVS exam station 或 deputy registrar / driver license agent 承办。先用官方服务入口确认地点、预约和业务类型，不要只按最近办公室判断能不能办。',
    editorNotes: [
      'Minnesota 页面要把 Standard、REAL ID、Enhanced 分开解释，避免用户把 Enhanced 当成普通 REAL ID。',
      '地址证明和姓名链条是高风险点；如果文件上姓名不一致，要先整理 legal name change 文件。',
      'Minnesota DPS 旧 DVS 页面和 REALID.dps.mn.gov 短域在 2026-07-09 自动检查中最终返回 404；页面改用官方材料 PDF、官方在线服务入口和 USA.gov 备用目录。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Minnesota DPS/DVS 官方页面近期迁移，旧 DVS 深层链接和 REALID.dps.mn.gov 短域会返回 404，线上服务入口在自动检查中返回 403。本站改用官方材料 PDF 和在线服务入口；如果你打不开，请从 USA.gov 州机动车服务目录选择 Minnesota。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '身份证明和 lawful presence / identity 类文件。',
      'Social Security Number 相关证明或官方接受的替代路径。',
      '两份 Minnesota 居住地址证明，优先使用官方清单列出的账单、金融、租约、保险或政府文件类别。',
      '姓名不一致时，准备结婚证、法院命令、离婚判决等能串起当前 legal name 的文件。',
      '外文文件、影印件或电子文件是否可用，要回到 DVS 当前材料要求确认。',
    ],
    commonMistakes: [
      '只知道要办 REAL ID，却没先看 Standard、REAL ID、Enhanced 的区别。',
      '用 PO Box 或不显示当前 Minnesota 居住地址的文件当地址证明。',
      'Drive.mn.gov 预申请完成后，以为现场不用带原始材料。',
      '姓名文件只带最后一次改名材料，无法串起完整姓名链条。',
    ],
    recommendedSteps: [
      '先判断自己是否需要 REAL ID 或 Enhanced；如果只是驾驶，普通证件用途不同。',
      '打开 Minnesota DVS document requirements，按身份、SSN、地址和姓名文件整理材料。',
      '需要续期、补证或预申请时，从 Drive.mn.gov 开始判断线上或现场路径。',
      '选办公室前确认该地点是否办理 driver license / ID 业务，以及是否需要预约。',
      '到场前再核对原件、认证副本、付款方式和预约确认。',
    ],
    actionLinks: [
      {
        label: 'Minnesota REAL ID Document Requirements',
        url: 'https://assets.dps.mn.gov/files/dvs/dvs-real-id-document-requirements.pdf',
        description: '明尼苏达 DVS REAL ID 官方材料清单 PDF。',
      },
      {
        label: 'Minnesota Online Services',
        url: 'https://onlineservices.dps.mn.gov/EServices/_/',
        description: '明尼苏达 DVS 线上服务、预申请和部分驾照服务入口。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'Minnesota 官方页面迁移或被拦截时，从联邦目录进入州机动车服务。',
      },
    ],
    sources: [
      {
        label: 'Minnesota DVS Document Requirements PDF',
        url: 'https://assets.dps.mn.gov/files/dvs/dvs-real-id-document-requirements.pdf',
      },
      {
        label: 'Minnesota Online Services',
        url: 'https://onlineservices.dps.mn.gov/EServices/_/',
      },
      {
        label: 'Minnesota License/Permit/ID Application PDF',
        url: 'https://assets.dps.mn.gov/files/dvs/dvs-license-permit-id-application.pdf',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'proof-of-residency'],
  },
  {
    id: 'indiana',
    abbr: 'IN',
    nameEn: 'Indiana',
    nameZh: '印第安纳州',
    agency: 'Indiana Bureau of Motor Vehicles',
    agencyUrl: 'https://www.in.gov/bmv/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '印第安纳 BMV 把 REAL ID、驾照、ID、续期、地址变更和外州转入放在 BMV 服务体系内。先判断是否要 REAL ID，再看是否属于新居民、续期、补证或信息变更。',
    realIdSummary:
      'Indiana REAL ID 通常围绕身份、lawful status、SSN、Indiana residency 和姓名变更文件准备。BMV 官方页面要求用可接受文件证明身份和居住地址，现场核验时应带原件或官方接受形式。',
    licenseSummary:
      '续期、补证和地址变更可从 myBMV / BMV online services 判断资格；搬到 Indiana 的外州驾照持有人要看 new Indiana resident / transfer 路径，而不是直接按普通 renewal 处理。',
    appointmentNote:
      'Indiana BMV 分支机构、线上服务和 myBMV 可处理不同业务。第一次 REAL ID、外州转入、姓名变化或身份文件核验时，先查 BMV 说明和分支服务，再决定是否预约或到场。',
    editorNotes: [
      'Indiana BMV REAL ID 页面是州级官方入口，页面要把“升级 REAL ID”和“普通续期”分成两条路径。',
      'myBMV 能打开不代表本人一定符合线上资格；身份、姓名、地址或 REAL ID 首次核验都可能把用户引到分支机构。',
      '新居民要先看 transfer / new resident 规则，外州驾照状态会影响是否需要考试或额外材料。',
    ],
    documentHighlights: [
      '身份证明和 lawful status 文件。',
      'Social Security Number 相关证明。',
      '两份 Indiana residency 证明，按 BMV 可接受文件清单准备；REAL ID overview 明确要求 TWO printed documents。',
      'BMV Documentation List 要求 residency 文件显示姓名和 Indiana residential address，P.O. Box 不接受。',
      'New resident packet 示例提醒部分账单类居住证明要注意 60 天内日期，SSN 文件要显示完整号码。',
      '姓名不一致时，准备能连接旧名和当前 legal name 的文件。',
      '外州驾照转入时，带现有外州证件和 BMV 要求的身份/地址材料。',
    ],
    commonMistakes: [
      '续期时才发现第一次 REAL ID 需要额外材料。',
      '把 myBMV 线上入口当作所有人都能完成续期或补证的保证。',
      '新搬到 Indiana 后没有先看外州驾照 transfer 规则。',
      '用 P.O. Box 或没有完整姓名/住址的文件凑 Indiana residency。',
      '地址变更后没有确认新卡寄送地址或 BMV 记录地址。',
    ],
    recommendedSteps: [
      '先看卡面是否已经 REAL ID 合规，并决定是否需要升级。',
      '打开 Indiana BMV REAL ID 页面和 Documentation List，按 identity、lawful status、full SSN、two residency、name change 分组。',
      '续期、补证或地址变更先进入 BMV online services / myBMV 判断资格。',
      '新居民先看 transfer / new resident 路径，确认外州驾照、地址证明和预约要求。',
      '如果涉及姓名、身份或首次 REAL ID 核验，按 BMV 分支机构路径准备原件。',
    ],
    actionLinks: [
      {
        label: 'Indiana REAL ID',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/real-id-overview/',
        description: '印第安纳 REAL ID 官方说明。',
      },
      {
        label: 'Documentation Checklist PDF',
        url: 'https://www.in.gov/bmv/files/BMV_Documentation_List.pdf',
        description: 'Indiana BMV REAL ID 和证件办理可接受文件清单。',
      },
      {
        label: 'New Indiana Residents',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/new-indiana-residents',
        description: '新搬到 Indiana 后驾照、ID、title 和 registration 路径。',
      },
      {
        label: 'BMV Licenses, Permits, and IDs',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/',
        description: '驾照、permit、ID 和相关业务总入口。',
      },
      {
        label: 'myBMV Online Services',
        url: 'https://www.in.gov/bmv/online-services-and-bmv-connect/',
        description: '线上续期、补证、地址等服务资格入口。',
      },
      {
        label: 'BMV Branch Locations',
        url: 'https://www.in.gov/bmv/branch-locations-and-hours/',
        description: '查找 Indiana BMV 分支机构和营业时间。',
      },
    ],
    sources: [
      {
        label: 'Indiana BMV REAL ID Overview',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/real-id-overview/',
      },
      {
        label: 'Indiana BMV Documentation List',
        url: 'https://www.in.gov/bmv/files/BMV_Documentation_List.pdf',
      },
      {
        label: 'Indiana BMV New Indiana Residents',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/new-indiana-residents',
      },
      {
        label: 'Indiana BMV Licenses, Permits, and IDs',
        url: 'https://www.in.gov/bmv/licenses-permits-ids/',
      },
      {
        label: 'Indiana BMV Online Services and BMV Connect',
        url: 'https://www.in.gov/bmv/online-services-and-bmv-connect/',
      },
      {
        label: 'Indiana BMV Branch Locations and Hours',
        url: 'https://www.in.gov/bmv/branch-locations-and-hours/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'tennessee',
    abbr: 'TN',
    nameEn: 'Tennessee',
    nameZh: '田纳西州',
    agency: 'Tennessee Driver Services',
    agencyUrl: 'https://www.tn.gov/safety/driver-services.html',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '田纳西 Driver Services 管理驾照、ID、REAL ID、续期、地址变更和新居民换证。该州官方页面把 REAL ID、Class D license、new resident 和 online services 分成不同入口。',
    realIdSummary:
      'Tennessee REAL ID 要按官方页面准备身份、lawful presence、SSN、Tennessee residency 和姓名变更文件。第一次 REAL ID 或文件核验通常要按 Driver Services Center 路径办理。',
    licenseSummary:
      '普通 Class D 驾照、新居民换证、续期和地址变更各有官方说明。线上续期或地址服务是否可用取决于资格；外州搬入用户应先看 New Resident 页面。',
    appointmentNote:
      'Tennessee Driver Services Center 和线上服务可处理不同业务。先确定自己是 REAL ID、new resident、renewal 还是 duplicate / address，再查看是否能线上办或需要预约现场。',
    editorNotes: [
      'Tennessee 的 Class D first license、new resident transfer 和 REAL ID 是不同流程，先按当前业务选择入口。',
      '新居民要先看 TN.gov New Resident 页面，外州驾照、地址证明和身份文件会决定下一步。',
      'REAL ID 页面应提醒用户最终材料、费用、预约和是否需要现场核验都以 TN Driver Services 当前页面为准。',
    ],
    documentHighlights: [
      'proof of identity / lawful presence 文件。',
      'Social Security Number 相关证明。',
      '两份 Tennessee residency 证明，按 TN.gov 官方清单确认。',
      '姓名不一致时，带 legal name change 文件。',
      '外州驾照转入时，准备现有外州驾照和新州地址证明。',
    ],
    commonMistakes: [
      '刚搬到 Tennessee 却按普通续期页面操作。',
      '以为线上服务可替代第一次 REAL ID 文件核验。',
      '只准备一份 Tennessee 地址证明。',
      '没有把姓名变更文件和 SSN/身份文件一起核对。',
    ],
    recommendedSteps: [
      '先决定是否需要 REAL ID；有护照的人可以把护照作为国内航班证件备选。',
      '打开 TN REAL ID 页面，按官方材料清单准备身份、SSN、地址和姓名文件。',
      '新居民先看 New Resident 页面，再处理外州驾照转入和车辆相关事项。',
      '续期、补证或地址变更先看 Online Services 判断是否能线上完成。',
      '需要现场时，查 Driver Services Center 服务和预约规则。',
    ],
    actionLinks: [
      {
        label: 'Tennessee REAL ID',
        url: 'https://www.tn.gov/safety/driver-services/helpful-information/real-id.html',
        description: '田纳西 REAL ID 官方说明和材料入口。',
      },
      {
        label: 'New Residents',
        url: 'https://www.tn.gov/safety/driver-services/classd/dlnew.html',
        description: '新搬到 Tennessee 后的驾照办理说明。',
      },
      {
        label: 'Online Services',
        url: 'https://www.tn.gov/safety/driver-services/online.html',
        description: '续期、补证、地址等线上服务入口。',
      },
      {
        label: 'Driver Services Centers',
        url: 'https://www.tn.gov/safety/driver-services/locations.html',
        description: '查找 Tennessee Driver Services 办公地点。',
      },
    ],
    sources: [
      {
        label: 'Tennessee Driver Services REAL ID',
        url: 'https://www.tn.gov/safety/driver-services/helpful-information/real-id.html',
      },
      {
        label: 'Tennessee Driver Services New Residents',
        url: 'https://www.tn.gov/safety/driver-services/classd/dlnew.html',
      },
      {
        label: 'Tennessee Driver Services Online Services',
        url: 'https://www.tn.gov/safety/driver-services/online.html',
      },
      {
        label: 'Tennessee Driver Services Locations',
        url: 'https://www.tn.gov/safety/driver-services/locations.html',
      },
    ],
    relatedTopicSlugs: ['moving-to-new-state', 'document-checklist', 'renewal-replacement-address'],
  },
  {
    id: 'wisconsin',
    abbr: 'WI',
    nameEn: 'Wisconsin',
    nameZh: '威斯康星州',
    agency: 'Wisconsin Division of Motor Vehicles',
    agencyUrl: 'https://wisconsindot.gov/Pages/online-srvcs/external/dmv.aspx',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '威斯康星 DMV 由 Wisconsin Department of Transportation 管理。REAL ID、普通驾照、外州搬入、地址变更和线上续期/补证都有独立官方页面。',
    realIdSummary:
      'Wisconsin REAL ID 要准备身份、lawful status、SSN、Wisconsin residency 和姓名变更材料。官方页面用 REAL ID / non-REAL ID 区分卡面用途，材料要求要回到 WisDOT DMV 当前清单确认。',
    licenseSummary:
      '新居民、续期、补证和地址变更要分开看。搬到 Wisconsin 后，应先查 new resident / out-of-state driver license 路径；续期和补证是否可线上处理要看 DMV online services 资格。',
    appointmentNote:
      'Wisconsin DMV Service Centers 和线上服务可办理不同事项。首次 REAL ID、外州换证、姓名变化或身份文件核验时，不要只看线上入口，先确认是否需要到 service center。',
    editorNotes: [
      'Wisconsin 页面要把 REAL ID 机场/联邦用途和普通驾驶用途分开说。',
      '新居民、地址变更、续期和 replacement 在 WisDOT 页面中是不同路径，用户要先判断当前事项。',
      'Wisconsin 部分在线服务会先判断资格；能打开入口不代表每位申请人都能在线完成。',
    ],
    documentHighlights: [
      'proof of name and date of birth / identity 文件。',
      'proof of legal presence 或公民/身份文件。',
      'Social Security Number 相关证明。',
      'Wisconsin residency 证明；REAL ID compliant card 官方页面要求 2 份，文件要显示姓名和当前 Wisconsin 地址。',
      'WisDOT residency 页面说明 utility bill、paystub 等电子文件 printouts 可接受；到场前仍要按当前清单核对。',
      '姓名不一致时，带法律姓名变更文件；WisDOT documentation 页面提醒每次姓名变化都需要证明。',
    ],
    commonMistakes: [
      '搬到 Wisconsin 后直接按 renewal 处理，而不是先看 new resident 路径。',
      '把 non-REAL ID 驾照当成可用于 TSA REAL ID 用途的证件。',
      '只准备一份 Wisconsin residency，或地址文件没有当前 Wisconsin 地址。',
      '地址变更后没有确认 DMV 记录和新卡邮寄信息。',
      '线上服务中途被资格判断挡住，却没有准备 service center 现场路径。',
    ],
    recommendedSteps: [
      '先确认是否需要 REAL ID，或是否已有护照等 TSA 接受证件。',
      '打开 Wisconsin DMV REAL ID 页面，按官方材料清单准备 identity、SSN、residency 和姓名文件。',
      '新居民先看 out-of-state / new resident 驾照页面，再处理车辆登记和保险。',
      '续期、补证、地址变更先看 online services，确认本人是否符合线上资格。',
      '需要现场时，查 DMV Service Center 地点和业务类型。',
    ],
    actionLinks: [
      {
        label: 'Wisconsin REAL ID',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/realid.aspx',
        description: '威斯康星 REAL ID 官方说明。',
      },
      {
        label: 'Driver license documentation',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/documentation.aspx',
        description: 'WisDOT 驾照或 ID 的身份、居住、SSN、姓名变化材料入口。',
      },
      {
        label: 'Proof of Wisconsin residency',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/residency.aspx',
        description: '可接受 Wisconsin residency 文件和 REAL ID 两份证明要求。',
      },
      {
        label: 'Apply for a Driver License',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/ooslicense.aspx',
        description: '首次申请或外州转入驾照说明。',
      },
      {
        label: 'DMV Online Services',
        url: 'https://wisconsindot.gov/Pages/online-srvcs/external/dmv.aspx',
        description: '威斯康星 DMV 线上服务入口。',
      },
      {
        label: 'DMV Service Centers',
        url: 'https://wisconsindot.gov/Pages/online-srvcs/find-dmv/default.aspx',
        description: '查找 Wisconsin DMV 服务中心。',
      },
    ],
    sources: [
      {
        label: 'Wisconsin DMV REAL ID',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/realid.aspx',
      },
      {
        label: 'Wisconsin DMV Driver License Documentation',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/documentation.aspx',
      },
      {
        label: 'Wisconsin DMV Proof of Residency',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/residency.aspx',
      },
      {
        label: 'Wisconsin DMV Apply for a Driver License',
        url: 'https://wisconsindot.gov/Pages/dmv/license-drvs/how-to-apply/ooslicense.aspx',
      },
      {
        label: 'Wisconsin DMV Online Services',
        url: 'https://wisconsindot.gov/Pages/online-srvcs/external/dmv.aspx',
      },
      {
        label: 'Wisconsin DMV Service Centers',
        url: 'https://wisconsindot.gov/Pages/online-srvcs/find-dmv/default.aspx',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'utah',
    abbr: 'UT',
    nameEn: 'Utah',
    nameZh: '犹他州',
    agency: 'Utah Driver License Division',
    agencyUrl: 'https://dld.utah.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '犹他驾照和 ID 由 Utah Driver License Division 管理。Utah 的驾照/ID 材料页把身份、合法身份、SSN、Utah 地址和姓名变更分成清单，适合先按材料类别整理。',
    realIdSummary:
      'Utah REAL ID / identification requirements 要围绕身份、lawful status、SSN、Utah residency 和姓名一致性准备。首次办证、外州转入或升级时，应从 DLD required documents 页面开始。',
    licenseSummary:
      '续期、地址变更、补证和外州转入不应混在一起。Utah DLD 提供 online renewal、address change 和 adult original / out-of-state 相关入口，系统会按资格分流。',
    appointmentNote:
      'Utah DLD 办事处和 online services 的可办事项不同。首次申请、REAL ID 材料核验、姓名变化或外州转入时，先看 required documents，再预约或进入对应业务入口。',
    editorNotes: [
      'Utah DLD 页面有清晰的 required documents 入口，中文页应引导用户按材料类别准备，而不是给一张固定通用清单。',
      '地址变更和 renewal 是不同业务；搬家后先确保 Utah DLD 记录地址正确，再做补证或续期更稳妥。',
      '外州转入、非公民身份、姓名不一致时，线上路径可能不足以完成核验。',
    ],
    documentHighlights: [
      'identity / lawful presence 文件。',
      'Social Security Number 相关证明。',
      '两份 Utah residency 证明，按 DLD required documents 页面确认。',
      '姓名变化时，准备能连接当前 legal name 的文件。',
      '外州转入或首次办证时，带现有证件、身份文件和 Utah 地址材料。',
    ],
    commonMistakes: [
      '先点 online renewal，却没有确认本人是否符合线上资格。',
      '搬家后没有先改 Utah DLD 记录地址，就申请补证或续期。',
      '把一份地址文件当成两份 residency proof。',
      '外州转入时没有准备 current Utah address 证明。',
    ],
    recommendedSteps: [
      '先打开 Utah DLD required documents 页面，按身份、SSN、地址、姓名四组材料整理。',
      '如果刚搬到 Utah，先看 adult original / out-of-state license 路径。',
      '地址变化时先使用 DLD address change 页面更新记录。',
      '续期先看 regular renewal / online renewal 资格，再决定线上或现场。',
      '到场前再次核对预约、原件、付款方式和是否需要额外身份文件。',
    ],
    actionLinks: [
      {
        label: 'Utah Required Documents',
        url: 'https://dld.utah.gov/required-documents/',
        description: 'Utah DLD 身份、SSN、地址和姓名文件清单。',
      },
      {
        label: 'Adult Original / Out-of-State',
        url: 'https://dld.utah.gov/regular-original/',
        description: '首次 Utah 驾照或外州转入相关路径。',
      },
      {
        label: 'Address Change',
        url: 'https://dld.utah.gov/address-change-regular/',
        description: 'Utah DLD 地址变更说明。',
      },
      {
        label: 'Renewal',
        url: 'https://dld.utah.gov/regular-renewal/',
        description: 'Utah 驾照续期说明和入口。',
      },
      {
        label: 'Driver Licensing Services / Appointment',
        url: 'https://dld.utah.gov/driver-licensing-services/',
        description: '按业务选择 Utah DLD 申请路径并进入预约。',
      },
    ],
    sources: [
      {
        label: 'Utah DLD Required Documentation',
        url: 'https://dld.utah.gov/required-documents/',
      },
      {
        label: 'Utah DLD Adult Original',
        url: 'https://dld.utah.gov/regular-original/',
      },
      {
        label: 'Utah DLD Address Change',
        url: 'https://dld.utah.gov/address-change-regular/',
      },
      {
        label: 'Utah DLD Regular Renewal',
        url: 'https://dld.utah.gov/regular-renewal/',
      },
      {
        label: 'Utah DLD Driver Licensing Services',
        url: 'https://dld.utah.gov/driver-licensing-services/',
        note: '按业务选择申请入口和预约。',
      },
    ],
    relatedTopicSlugs: ['document-checklist', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'missouri',
    abbr: 'MO',
    nameEn: 'Missouri',
    nameZh: '密苏里州',
    agency: 'Missouri Department of Revenue',
    agencyUrl: 'https://dor.mo.gov/driver-license/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '密苏里驾照和 non-driver ID 由 Department of Revenue 管理。REAL ID、普通驾照、renewal、duplicate、地址变化和材料核验都从 DOR Driver License 与 REAL ID 页面分流。',
    realIdSummary:
      'Missouri REAL ID 要在 license office 现场申请，材料围绕身份、lawful status、SSN、两份 Missouri residential address 和姓名变更文件。DOR 页面提醒申请 REAL ID 后通常要预留 10 到 15 天制卡寄送时间。',
    licenseSummary:
      'Missouri REAL ID 不影响驾驶、投票、州内用途或年龄验证；如果只是开车，普通驾照仍是驾驶证件。续期、补证和升级 REAL ID 时，要先看 required documents checklist，因为地址未变和地址已变的材料要求不同。',
    appointmentNote:
      'Missouri 有 170 多个 license office，但 REAL ID、首次申请、外州转入、姓名变化或地址变化时都要按 DOR 清单带原件或官方接受文件。若 DOR 页面在浏览器中被拦截，可从 USA.gov 州机动车服务目录重新进入。',
    editorNotes: [
      'Missouri REAL ID 页面明确说 REAL ID 是选择，不是州法强制；页面要避免把驾驶用途和机场/联邦用途混成一个问题。',
      'DOR required documents checklist 把 renewal、duplicate、office locations、地址变化和姓名变化放在同一套分流中，中文页应先让用户判断业务类型。',
      '2026-07-09 自动检查中 dor.mo.gov 返回 403 / HTTP2 framing layer 错误；保留官方链接并显示 USA.gov fallback。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Missouri DOR 官方页面在本环境自动检查中返回 403。本站保留 DOR 官方链接；如果你打不开，请从 USA.gov 州机动车服务目录选择 Missouri。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '一份 identity / date of birth 文件。',
      'lawful status 证明，常与身份文件相关但仍要按 DOR 清单核对。',
      'Social Security Number 文件，文件上通常要显示完整 SSN。',
      '两份 Missouri residential address 证明；REAL ID 和部分 CDL/CLP 情况尤其要注意两份地址文件。',
      '姓名不一致时，准备 marriage certificate、court order 或其他 legal name change 文件。',
    ],
    commonMistakes: [
      '以为 Missouri REAL ID 是开车必需，其实它主要影响机场和部分联邦用途。',
      '没有预留 10 到 15 天制卡寄送时间。',
      '地址变化后还按“地址未变”的续期材料准备。',
      '外州转入时没有准备 surrender / prior credential 和完整身份材料。',
    ],
    recommendedSteps: [
      '先判断用途：只驾驶、国内航班、联邦设施，还是同时需要 non-driver ID。',
      '打开 Missouri REAL ID 页面确认是否需要 REAL ID 或可用护照替代。',
      '用 required documents checklist 按 renewal、duplicate、新申请或地址/姓名变化整理文件。',
      '选择 license office 前确认该地点办理 driver license / ID 业务。',
      '现场办理后预留制卡寄送时间，不要把临近航班押在最后几天。',
    ],
    actionLinks: [
      {
        label: 'Missouri REAL ID',
        url: 'https://dor.mo.gov/driver-license/issuance/real-id/',
        description: 'Missouri DOR REAL ID 用途、材料和办理说明。',
      },
      {
        label: 'Required Documents Checklist',
        url: 'https://dor.mo.gov/driver-license/issuance/required-documents-checklist.html',
        description: '按 renewal、duplicate、地址变化和姓名变化核对材料。',
      },
      {
        label: 'Driver License',
        url: 'https://dor.mo.gov/driver-license/',
        description: 'Missouri DOR 驾照、ID、表格和办事入口。',
      },
      {
        label: 'License Office Locator',
        url: 'https://dor.mo.gov/license-office-locator/',
        description: '查找 Missouri license office。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'DOR 页面被拦截时，从联邦目录进入 Missouri 官方机动车服务。',
      },
    ],
    sources: [
      {
        label: 'Missouri DOR REAL ID',
        url: 'https://dor.mo.gov/driver-license/issuance/real-id/',
      },
      {
        label: 'Missouri DOR Required Documents Checklist',
        url: 'https://dor.mo.gov/driver-license/issuance/required-documents-checklist.html',
      },
      {
        label: 'Missouri DOR Driver License',
        url: 'https://dor.mo.gov/driver-license/',
      },
      {
        label: 'Missouri DOR REAL ID Acceptable Documents PDF',
        url: 'https://dor.mo.gov/driver-license/issuance/real-id/documents/RID.pdf',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'proof-of-residency'],
  },
  {
    id: 'iowa',
    abbr: 'IA',
    nameEn: 'Iowa',
    nameZh: '爱荷华州',
    agency: 'Iowa Department of Transportation',
    agencyUrl: 'https://iowadot.gov/drivers-licenses-ids',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '爱荷华驾照和 ID 由 Iowa DOT 管理。REAL ID、new to Iowa、renewal、change information、lost/stolen duplicate、预约和 DMV location 都有独立官方入口。',
    realIdSummary:
      'Iowa REAL ID 页面要求准备身份、date of birth、lawful status、SSN，以及两份打印的当前 Iowa residential address 证明；地址必须是实际居住地址，不能只用 PO Box。',
    licenseSummary:
      '搬到 Iowa 后先看 New to Iowa；续期、补证、姓名或地址变化要分开处理。Iowa DOT 页面说明姓名变化通常要预约并到 DMV 现场办理，补证和部分服务有独立费用和资格要求。',
    appointmentNote:
      'Iowa DOT 支持预约和地点查询；部分 DMV 可以 walk-in，但官方仍建议预约以获得更稳定的服务时间。REAL ID 第一次加金星通常需要现场带材料。',
    editorNotes: [
      'Iowa REAL ID 页面强调 two printed documents 和 current Iowa residential address，中文页要明确“打印”和“实际居住地址”。',
      'New to Iowa、renewal、change information 和 lost/stolen license 是不同路径，不应让用户直接从 REAL ID 页面处理所有业务。',
      '2026-07-09 自动检查中 iowadot.gov 深层页面返回 Akamai 403；保留官方链接并显示 USA.gov fallback。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Iowa DOT 官方深层页面在本环境自动检查中返回 Akamai 403。本站保留 Iowa DOT 官方链接；如果你打不开，请从 USA.gov 州机动车服务目录选择 Iowa。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'identity、date of birth 和 lawful status 文件。',
      'Social Security Number 证明。',
      '两份打印的 Iowa residential address 证明，地址应为当前实际居住地址。',
      '姓名变化时，准备能证明 legal name change 的文件。',
      '新居民或外州证件持有人准备当前证件和 Iowa 地址材料。',
    ],
    commonMistakes: [
      '带电子账单但没有打印版本。',
      '地址文件只显示 PO Box 或 mailing address。',
      '搬到 Iowa 后直接按普通 renewal 操作，没有先看 New to Iowa。',
      '姓名变化以为可以完全线上处理。',
    ],
    recommendedSteps: [
      '先确认你是 new to Iowa、REAL ID upgrade、renewal、duplicate 还是 change information。',
      'REAL ID 用户打开 Iowa DOT REAL ID 页面，按身份、SSN 和两份地址证明整理材料。',
      '新居民先看 New to Iowa，再决定是否同时处理 REAL ID。',
      '姓名或地址变化时查看 Change Information 页面，并预约需要现场处理的业务。',
      '用 Iowa DOT schedule appointment 或 location 页面确认最近 DMV 的服务方式。',
    ],
    actionLinks: [
      {
        label: 'Iowa REAL ID',
        url: 'https://iowadot.gov/drivers-licenses-ids/get-or-renew-drivers-licenses-ids-permits/real-id',
        description: 'Iowa DOT REAL ID 金星证件和材料说明。',
      },
      {
        label: 'New to Iowa',
        url: 'https://iowadot.gov/drivers-licenses-ids/new-iowa',
        description: '新搬到 Iowa 后获取驾照或 ID 的入口。',
      },
      {
        label: 'Renew Driver License',
        url: 'https://iowadot.gov/drivers-licenses-ids/get-or-renew-drivers-licenses-ids-permits/renew-drivers-license',
        description: 'Iowa 驾照续期资格和办理方式。',
      },
      {
        label: 'Change Information',
        url: 'https://iowadot.gov/drivers-licenses-ids/other-services/change-information',
        description: '更改姓名、地址或证件信息。',
      },
      {
        label: 'Schedule Appointment',
        url: 'https://iowadot.gov/drivers-licenses-ids/schedule-appointment',
        description: '预约 Iowa DOT DMV 服务。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'Iowa DOT 页面被拦截时，从联邦目录进入州机动车服务。',
      },
    ],
    sources: [
      {
        label: 'Iowa DOT REAL ID',
        url: 'https://iowadot.gov/drivers-licenses-ids/get-or-renew-drivers-licenses-ids-permits/real-id',
      },
      {
        label: 'Iowa DOT New to Iowa',
        url: 'https://iowadot.gov/drivers-licenses-ids/new-iowa',
      },
      {
        label: 'Iowa DOT Renew Driver License',
        url: 'https://iowadot.gov/drivers-licenses-ids/get-or-renew-drivers-licenses-ids-permits/renew-drivers-license',
      },
      {
        label: 'Iowa DOT Change Information',
        url: 'https://iowadot.gov/drivers-licenses-ids/other-services/change-information',
      },
      {
        label: 'Iowa DOT Schedule Appointment',
        url: 'https://iowadot.gov/drivers-licenses-ids/schedule-appointment',
      },
    ],
    relatedTopicSlugs: ['proof-of-residency', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'kansas',
    abbr: 'KS',
    nameEn: 'Kansas',
    nameZh: '堪萨斯州',
    agency: 'Kansas Department of Revenue Division of Vehicles',
    agencyUrl: 'https://www.ksrevenue.gov/dovindex.html',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '堪萨斯驾照和 ID 由 Kansas Department of Revenue Division of Vehicles 管理。REAL ID、required documents、renewal、address change、iKan online services 和 appointment 都要分路径处理。',
    realIdSummary:
      'Kansas REAL ID 要准备 lawful presence、SSN、两份当前 Kansas residential address 证明和必要的 legal name change 文件。KDOR 页面说明地址证明要在有效时间范围内，junk mail 或 personal letters 不适合作为地址证明。',
    licenseSummary:
      'Kansas 的 renewal、address change 和部分 online services 可从 KDOR 或 iKan 入口开始，但第一次 REAL ID、身份核验、姓名变化或复杂身份材料仍应按官方清单到场准备。',
    appointmentNote:
      'Kansas KDOR appointment / required documents 页面会按业务列出材料和地点要求；预约前先确认办公室类型、服务项目和需要携带的文件。',
    editorNotes: [
      'Kansas REAL ID 页面强调两份 current Kansas residential address proof，且 junk mail / personal letters 不可用，中文页要把这个风险提前说。',
      'iKan 可做部分线上服务，但 REAL ID 文件核验和姓名/身份问题不能默认线上完成。',
      '2026-07-09 自动检查中 ksrevenue.gov 多个页面超时；保留官方链接并显示 USA.gov fallback。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'Kansas KDOR 官方页面在本环境自动检查中多次超时。本站保留 KDOR 官方链接；如果你打不开，请从 USA.gov 州机动车服务目录选择 Kansas。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'lawful presence / identity 文件。',
      'Social Security Number 证明。',
      '两份 Kansas residential address 证明，通常要是近期、当前地址，不能用 junk mail 或 personal letters。',
      '姓名不一致时准备 certified legal name change 文件。',
      '预约或到场前核对 KDOR required documents 页面列出的当前版本。',
    ],
    commonMistakes: [
      '只带一份 Kansas 地址证明。',
      '用私人信件、广告邮件或过旧文件证明地址。',
      '以为 iKan 能处理第一次 REAL ID 文件核验。',
      '姓名和 SSN/身份文件不一致却没有准备 legal name change 文件。',
    ],
    recommendedSteps: [
      '先打开 Kansas REAL ID 页面，确认自己是否需要 REAL ID 或可用护照替代。',
      '用 required documents / appointment 页面核对 lawful presence、SSN、两份地址证明和姓名文件。',
      '只是地址变化或 renewal 时，再看 KDOR online services / iKan 是否可办。',
      '需要现场时使用 appointment 信息确认 office 和服务类型。',
      '如果 KDOR 页面打不开，从 USA.gov 官方目录进入 Kansas Division of Vehicles。',
    ],
    actionLinks: [
      {
        label: 'Kansas REAL ID',
        url: 'https://www.ksrevenue.gov/dovrealid.html',
        description: 'Kansas KDOR REAL ID 要求和材料说明。',
      },
      {
        label: 'Required Documents and Appointment',
        url: 'https://www.ksrevenue.gov/dovqflowreq.html',
        description: 'REAL ID 所需文件和预约前核对。',
      },
      {
        label: 'Driver License Information',
        url: 'https://www.ksrevenue.gov/dovdrlic.html',
        description: 'Kansas 驾照、renewal、address change 和常见入口。',
      },
      {
        label: 'Online Services',
        url: 'https://www.ksrevenue.gov/dovonlineservices.html',
        description: 'KDOR / iKan 线上服务入口。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'KDOR 页面超时时，从联邦目录进入 Kansas 官方机动车服务。',
      },
    ],
    sources: [
      {
        label: 'Kansas KDOR REAL ID',
        url: 'https://www.ksrevenue.gov/dovrealid.html',
      },
      {
        label: 'Kansas KDOR Required Documents and Appointment',
        url: 'https://www.ksrevenue.gov/dovqflowreq.html',
      },
      {
        label: 'Kansas KDOR Driver License Information',
        url: 'https://www.ksrevenue.gov/dovdrlic.html',
      },
      {
        label: 'Kansas KDOR Online Services',
        url: 'https://www.ksrevenue.gov/dovonlineservices.html',
      },
      {
        label: 'Kansas KDOR REAL ID FAQ',
        url: 'https://www.ksrevenue.gov/dovrealidfaq.html',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'proof-of-residency', 'renewal-replacement-address'],
  },
  {
    id: 'south-carolina',
    abbr: 'SC',
    nameEn: 'South Carolina',
    nameZh: '南卡罗来纳州',
    agency: 'South Carolina Department of Motor Vehicles',
    agencyUrl: 'https://dmv.sc.gov/driver-services',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '南卡驾照和 ID 由 SCDMV 管理。Driver License、ID card、Moving to SC、Renewals、Address or Name Change 和 branch appointment 是常用入口。',
    realIdSummary:
      'South Carolina 申请驾照或 ID 时可选择带星标的 REAL ID 或标注限制用途的标准证件。REAL ID 通常要按 SCDMV Form MV-93 准备身份、SSN、当前 SC physical address 和姓名变更文件。',
    licenseSummary:
      '新搬到 South Carolina、续期、补证、地址或姓名变化是不同业务。SCDMV 页面提示地址或姓名变化要及时更新；REAL ID 地址证明通常需要两份当前 physical SC address 文件。',
    appointmentNote:
      'SCDMV branch 和 online transaction list 可处理不同服务。首次 REAL ID、外州转入、非美国公民、姓名变化或材料核验时，应先确认 branch 是否办理对应业务。',
    editorNotes: [
      'SCDMV 页面把 REAL ID 和 standard license 放在同一申请选择里，中文页要提醒用户先按用途选择。',
      'Moving to SC 页面和 ID 页面都强调 current physical SC address；REAL ID 通常需要两份地址证明。',
      '2026-07-09 自动检查中 dmv.sc.gov 返回 CloudFront 403，scdmvonline 入口超时；保留官方链接并显示 USA.gov fallback。',
    ],
    accessStatus: {
      label: '官方页需点验',
      tone: 'watch',
      note: 'SCDMV 官方页面在本环境自动检查中返回 CloudFront 403 或超时。本站保留 SCDMV 官方链接；如果你打不开，请从 USA.gov 州机动车服务目录选择 South Carolina。',
      fallbackLabel: 'USA.gov 备用入口',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '身份和合法身份文件，按 SCDMV checklist 准备。',
      'Social Security Number 相关证明。',
      '当前 South Carolina physical address 证明；REAL ID 通常要两份。',
      '姓名变化时准备 legal name change 文件。',
      '非美国公民按 SCDMV lawfully present non-US citizens 路径确认可办理 branch。',
    ],
    commonMistakes: [
      '把 standard license 和 REAL ID 当成同一种证件。',
      '用 mailing address 或 PO Box 替代 current physical SC address。',
      '地址或姓名变化后没有及时更新 SCDMV 记录。',
      '非美国公民没有先确认可办理的 SCDMV branch。',
    ],
    recommendedSteps: [
      '先打开 SCDMV Driver License 页面，确认要 standard license 还是 REAL ID。',
      '用 MV-93 checklist 按身份、SSN、地址和姓名文件整理材料。',
      '新搬到 South Carolina 时先看 Moving to SC，再处理 REAL ID 或换证。',
      '地址或姓名变化先看 Address or Name Change 页面。',
      '预约或到 branch 前确认该地点办理 driver license / REAL ID / non-US citizen 业务。',
    ],
    actionLinks: [
      {
        label: 'SCDMV Driver License',
        url: 'https://dmv.sc.gov/driver-services/drivers-license',
        description: 'South Carolina 驾照和 REAL ID / standard license 选择。',
      },
      {
        label: 'Moving to SC',
        url: 'https://dmv.sc.gov/driver-services/moving-to-sc',
        description: '新搬到 South Carolina 后换证说明。',
      },
      {
        label: 'Renewals',
        url: 'https://dmv.sc.gov/driver-services/renewals',
        description: 'South Carolina 驾照续期说明。',
      },
      {
        label: 'Address or Name Change',
        url: 'https://dmv.sc.gov/driver-services/drivers-license/address-or-name-change',
        description: '更改地址或姓名的官方入口。',
      },
      {
        label: 'USA.gov 备用入口',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'SCDMV 页面被拦截时，从联邦目录进入州机动车服务。',
      },
    ],
    sources: [
      {
        label: 'SCDMV Driver License',
        url: 'https://dmv.sc.gov/driver-services/drivers-license',
      },
      {
        label: 'SCDMV Moving to SC',
        url: 'https://dmv.sc.gov/driver-services/moving-to-sc',
      },
      {
        label: 'SCDMV Renewals',
        url: 'https://dmv.sc.gov/driver-services/renewals',
      },
      {
        label: 'SCDMV Address or Name Change',
        url: 'https://dmv.sc.gov/driver-services/drivers-license/address-or-name-change',
      },
      {
        label: 'SCDMV Form MV-93',
        url: 'https://dmv.sc.gov/sites/scdmv/files/media/Forms/MV-93.pdf',
      },
    ],
    relatedTopicSlugs: ['moving-to-new-state', 'document-checklist', 'name-change-chain'],
  },
  {
    id: 'kentucky',
    abbr: 'KY',
    nameEn: 'Kentucky',
    nameZh: '肯塔基州',
    agency: 'Kentucky Transportation Cabinet',
    agencyUrl: 'https://drive.ky.gov/Pages/index.aspx',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '肯塔基驾照、REAL ID 和 ID 服务由 Kentucky Transportation Cabinet / DRIVE 管理。REAL ID、What You Need、New to Kentucky、renewal、update/replace 和 myDrive 是核心路径。',
    realIdSummary:
      'Kentucky REAL ID 要证明 identity、Social Security、residency，以及任何姓名或 gender changes。What You Need 页面明确要求带 original 或 certified document，不接受普通复印件。',
    licenseSummary:
      '新居民通常要在建立 Kentucky residency 后 30 天内取得 Kentucky driver license；续期要注意 vision screening。想升级 REAL ID 时，官方 renewal 页面说明不能在线或邮寄完成升级，必须到 Regional Office 并带额外材料。',
    appointmentNote:
      'Kentucky 的 myDrive 可处理部分续期、补证和地址更新，但需要创建账户并连接 credential。REAL ID 升级、姓名变化、新居民转入或材料核验时，应优先看 Regional Office 路径。',
    editorNotes: [
      'Kentucky 2026 页面加入 myDrive / Letter ID 账户连接说明，线上服务文案要提醒用户不是所有业务都能直接在线办。',
      'REAL ID upgrade 不能在线或邮寄完成，这是 renewal/replacement 专题里的高价值提醒。',
      'New To Kentucky 页面明确 30 天换证要求，中文页要在搬州路径中前置。',
    ],
    documentHighlights: [
      '一份 original 或 certified identity 文件；普通 photocopy 不适合作为身份原件。',
      'Social Security 证明。',
      'Kentucky residency 证明，按 What You Need 页面确认数量和类别。',
      '姓名或 gender changes 时准备法律证明文件。',
      '新居民带有效外州 license / permit 和 Kentucky required documents。',
    ],
    commonMistakes: [
      '想在线续期时顺便升级 REAL ID。',
      '忘记 renewal 前需要 vision screening。',
      '新搬到 Kentucky 超过 30 天还没有处理州内驾照。',
      '带普通复印件替代 original 或 certified document。',
    ],
    recommendedSteps: [
      '先用 Kentucky REAL ID 页面判断是否需要 REAL ID，或是否能用护照替代。',
      '打开 What You Need，按 identity、SSN、residency、name/gender change 分组准备材料。',
      '新居民先看 New To Kentucky，确认 30 天换证和外州 license transfer 要求。',
      '续期先看 License / Permit Renewal，确认 vision screening 和线上资格。',
      '需要 REAL ID upgrade、姓名变化或材料核验时，选择 Driver Licensing Regional Office 路径。',
    ],
    actionLinks: [
      {
        label: 'Kentucky REAL ID',
        url: 'https://drive.ky.gov/RealID/Pages/default.aspx',
        description: 'Kentucky REAL ID 用途、材料和办理入口。',
      },
      {
        label: 'What You Need',
        url: 'https://drive.ky.gov/RealID/Pages/What-You-Need.aspx',
        description: 'REAL ID identity、SSN、residency 和姓名/性别变化材料说明。',
      },
      {
        label: 'New To Kentucky',
        url: 'https://drive.ky.gov/Drivers/Pages/New-To-Kentucky.aspx',
        description: '新居民换 Kentucky 驾照说明。',
      },
      {
        label: 'License / Permit Renewal',
        url: 'https://drive.ky.gov/Drivers/Pages/License-Permit-Renewal.aspx',
        description: '续期、vision screening 和 REAL ID upgrade 限制。',
      },
      {
        label: 'Update or Replace',
        url: 'https://drive.ky.gov/Drivers/Pages/Update-Replace.aspx',
        description: '更新地址、姓名或补证说明。',
      },
    ],
    sources: [
      {
        label: 'Kentucky REAL ID',
        url: 'https://drive.ky.gov/RealID/Pages/default.aspx',
      },
      {
        label: 'Kentucky REAL ID What You Need',
        url: 'https://drive.ky.gov/RealID/Pages/What-You-Need.aspx',
      },
      {
        label: 'Kentucky New To Kentucky',
        url: 'https://drive.ky.gov/Drivers/Pages/New-To-Kentucky.aspx',
      },
      {
        label: 'Kentucky License / Permit Renewal',
        url: 'https://drive.ky.gov/Drivers/Pages/License-Permit-Renewal.aspx',
      },
      {
        label: 'Kentucky Update or Replace',
        url: 'https://drive.ky.gov/Drivers/Pages/Update-Replace.aspx',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'louisiana',
    abbr: 'LA',
    nameEn: 'Louisiana',
    nameZh: '路易斯安那州',
    agency: 'Louisiana Office of Motor Vehicles',
    agencyUrl: 'https://expresslane.la.gov/omv/drivers/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '路易斯安那州驾照、REAL ID、续期、补证和外州转入由 Office of Motor Vehicles 的 ExpressLane 系统分流。高频入口是 REAL ID、License Renewal、License Transfers、Duplicate / Replacement 和 Online Services。',
    realIdSummary:
      'Louisiana REAL ID 要证明 identity、lawful status、date of birth、Social Security number 和两份 principal residence。居住证明必须是申请人姓名和 Louisiana street address，且来自两个独立来源；SSN 信息可以口头提供并由 OMV 通过 SSOLV 核验。',
    licenseSummary:
      '续期通常要准备 proper identification、Social Security 信息、视力测试、Louisiana residency；如适用，还要有 liability insurance。外州转入和临时身份文件会进入额外核验，访问者身份不一定符合 Louisiana 驾照或 ID 资格。',
    appointmentNote:
      '很多 OMV 业务可以从 Online Services 开始，但地址、姓名、身份材料核验、首次 REAL ID 和外州转入更适合先查具体页面再预约或去 Office / Public Tag Agent。不要只从“续期”按钮判断自己是否能线上完成。',
    editorNotes: [
      'Louisiana REAL ID 页面明确 two original residence documents must be from separate/independent sources，这是中文用户最容易漏的细节。',
      'Louisiana 可通过 SSOLV 核验口头提供的 SSN，并非每位申请人都被要求携带实体 Social Security card。',
      'License Renewal 页面把 liability insurance、vision test 和 residency 放在同一组要求里，续期页需要提醒用户先确认是否适用。',
    ],
    documentHighlights: [
      '身份、出生日期和 lawful status 文件，例如有效美国护照、州签发出生纸或入籍/公民证明。',
      'Social Security 信息；可口头提供，但最好带 SSN card、W-2、1099 或 pay stub 作为备用。',
      '两份 Louisiana principal residence 原件，显示本人姓名和 Louisiana street address，且来自不同来源。',
      '续期时准备 proper identification、视力测试相关要求，以及适用时的 Louisiana liability insurance。',
      '外州转入或非美国公民身份文件，按 License Transfers 页面准备身份和移民状态核验材料。',
    ],
    commonMistakes: [
      '拿两份同一家机构的账单当作两个独立居住来源。',
      '以为 SSN 必须只能用实体 Social Security card，没看 OMV 的 SSOLV 说明。',
      '在线续期前没有处理地址或姓名变化。',
      '外州转入时只带旧驾照，没准备 Louisiana residency 和身份状态文件。',
    ],
    recommendedSteps: [
      '先打开 Louisiana REAL ID 页面，判断是否需要 REAL ID，或是否用护照等替代证件更省事。',
      '按 identity / lawful status、SSN、two proofs of residence 三组整理材料，并确认居住证明是独立来源。',
      '续期先看 License Renewal 页面，确认 vision、insurance、residency 和线上资格。',
      '外州搬入先看 License Transfers，特别是临时身份、外籍驾照和翻译要求。',
      '最后用 Online Services 或 Locations 选择线上办理、预约或最近办公室。',
    ],
    actionLinks: [
      {
        label: 'Louisiana REAL ID',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/real-id/',
        description: 'REAL ID 用途、材料、SSN 核验和两份居住证明说明。',
      },
      {
        label: 'Louisiana License Renewal',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/license-renewal/',
        description: '驾照续期要求、视力、保险和线上/线下路径。',
      },
      {
        label: 'Louisiana License Transfers',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/license-transfers/',
        description: '外州或部分境外驾照转入 Louisiana 的要求。',
      },
      {
        label: 'Duplicate / Replacement Cards',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/duplicate-replacement-reconstructed-cards/',
        description: '补证、换卡和重建卡说明。',
      },
      {
        label: 'Louisiana OMV Online Services',
        url: 'https://expresslane.la.gov/omv/online-services/',
        description: '在线续期、补证、状态查询和其他 OMV 线上服务入口。',
      },
    ],
    sources: [
      {
        label: 'Louisiana OMV REAL ID',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/real-id/',
      },
      {
        label: 'Louisiana OMV License Renewal',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/license-renewal/',
      },
      {
        label: 'Louisiana OMV License Transfers',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/license-transfers/',
      },
      {
        label: 'Louisiana OMV Duplicate / Replacement Cards',
        url: 'https://expresslane.la.gov/omv/drivers/personal-driver-s-licenses/duplicate-replacement-reconstructed-cards/',
      },
      {
        label: 'Louisiana OMV Online Services',
        url: 'https://expresslane.la.gov/omv/online-services/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'oklahoma',
    abbr: 'OK',
    nameEn: 'Oklahoma',
    nameZh: '俄克拉荷马州',
    agency: 'Service Oklahoma',
    agencyUrl: 'https://oklahoma.gov/service.html',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '俄克拉荷马州驾照和 REAL ID 由 Service Oklahoma 与 Licensed Operator / Licensing Office 路径共同处理。REAL ID checklist、Required Documents、Out-of-State Transfer、Renew/Replace 和 Address Update 是最重要的入口。',
    realIdSummary:
      'Oklahoma REAL ID 需要一份 identity、两份 Oklahoma residency、SSN 信息、所有自出生以来姓名变化文件，以及适用时的 immigration / legal presence 文件。官方页面明确实体 SSN card 不要求，但号码本身需要提供。',
    licenseSummary:
      '外州转入通常要准备 identity、lawful presence、Oklahoma residency、外州 license、SSN 和姓名变化材料；如果同时办 REAL ID，居住证明数量会按 REAL ID 标准增加到两份。续期和补证可以先看线上资格，再决定是否去办公室。',
    appointmentNote:
      '首次 REAL ID 不能只靠邮寄或线上续期完成，需要去 Licensed Operator 或 Service Oklahoma Licensing Office。Service Oklahoma 也提供 live wait times / waitlist，适合出发前先看排队情况。',
    editorNotes: [
      'Oklahoma REAL ID 页面把 physical card not required 写得很清楚，中文页应避免把 SSN card 误写成硬性必带。',
      '姓名变化要求覆盖 all name changes since birth，适合在中文页强调“每一次更名链条”。',
      'Temporary paper credential is not accepted by TSA 的提醒要放进旅行用户 FAQ 或避坑区。',
    ],
    documentHighlights: [
      '一份 proof of identity，例如 birth certificate 或 U.S. passport。',
      '两份 Oklahoma residency，REAL ID 场景通常按两份准备。',
      'Social Security number；实体 SSN card 不强制，但号码要能核验。',
      '所有自出生以来的姓名变化证明，例如 marriage certificate、divorce decree 或 court order。',
      '外州转入时带有效外州 license，以及 lawful presence / immigration 文件（如适用）。',
    ],
    commonMistakes: [
      '只带一份 Oklahoma 地址证明去办 REAL ID。',
      '以为没有实体 SSN card 就完全不能开始。',
      '只带最近一次结婚证，漏掉更早的离婚、改名或法院文件。',
      '拿临时纸质 REAL ID 去机场，以为 TSA 会接受。',
    ],
    recommendedSteps: [
      '先用 Service Oklahoma REAL ID checklist 判断自己缺哪一类文件。',
      '如果是外州搬入，先看 Out-of-State Transfer 页面，再决定是否同步升级 REAL ID。',
      '续期、补证或地址更新先看 online eligibility；姓名变化通常需要现场处理。',
      '需要首次 REAL ID 时，选择 Licensed Operator 或 Service Oklahoma Licensing Office，并出发前查看 wait times。',
      '有旅行计划时至少预留邮寄时间，不把临时纸质 credential 当作 TSA 证件。',
    ],
    actionLinks: [
      {
        label: 'Oklahoma REAL ID Checklist',
        url: 'https://oklahoma.gov/service/popular-services/real-id-checklist.html',
        description: 'REAL ID 材料、办理地点、费用和旅行提醒。',
      },
      {
        label: 'Oklahoma Required Documents',
        url: 'https://oklahoma.gov/service/all-pages/required-documents.html',
        description: '身份、居住、合法身份和姓名变化文件说明。',
      },
      {
        label: 'Transfer a Driver License',
        url: 'https://oklahoma.gov/service/all-pages/out-of-state-transfers-dl.html',
        description: '外州驾照转入 Oklahoma 的材料和流程。',
      },
      {
        label: 'Renew or Replace',
        url: 'https://oklahoma.gov/service/popular-services/renew-replace.html',
        description: '续期、补证和线上/现场办理入口。',
      },
      {
        label: 'Address Update',
        url: 'https://oklahoma.gov/service/popular-services/address-update.html',
        description: '驾照或 State ID 地址更新入口。',
      },
    ],
    sources: [
      {
        label: 'Service Oklahoma REAL ID Checklist',
        url: 'https://oklahoma.gov/service/popular-services/real-id-checklist.html',
      },
      {
        label: 'Service Oklahoma Required Documents',
        url: 'https://oklahoma.gov/service/all-pages/required-documents.html',
      },
      {
        label: 'Service Oklahoma Out-of-State Transfer',
        url: 'https://oklahoma.gov/service/all-pages/out-of-state-transfers-dl.html',
      },
      {
        label: 'Service Oklahoma Renew / Replace',
        url: 'https://oklahoma.gov/service/popular-services/renew-replace.html',
      },
      {
        label: 'Service Oklahoma Address Update',
        url: 'https://oklahoma.gov/service/popular-services/address-update.html',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'name-change-chain'],
  },
  {
    id: 'alabama',
    abbr: 'AL',
    nameEn: 'Alabama',
    nameZh: '阿拉巴马州',
    agency: 'Alabama Law Enforcement Agency',
    agencyUrl: 'https://www.alea.gov/dps/driver-license',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '阿拉巴马州把 REAL ID 称为 STAR ID，由 Alabama Law Enforcement Agency 管理。首次 STAR ID、外州转入和材料核验要看 ALEA Driver License Exam Office；县级办公室更多处理续期和 duplicate。',
    realIdSummary:
      'Alabama STAR ID 需要四类材料：身份/出生日期、完整 SSN、两份 principal residence、以及姓名变化时的 certified legal documents。官方 STAR ID document list 明确 photocopies not acceptable。',
    licenseSummary:
      '外州驾照转入通常要到 ALEA Office，带当前驾照、Social Security card、两份 principal residence、primary document 并支付相应费用。普通 license / ID 与 STAR ID 的办理地点不同，是阿拉巴马页最需要提前说清的点。',
    appointmentNote:
      '如果是首次加 STAR，优先查 ALEA Driver License Exam Office；county operated license offices 可以继续处理 renewals / duplicates，但不应被当作首次 STAR ID 的主入口。',
    editorNotes: [
      'Alabama 页面必须使用 STAR ID 这个州内名称，否则用户在 ALEA 官方站搜索时容易找不到对应入口。',
      'STAR ID originally issued only at ALEA Driver License exam offices，是页面的关键分流信息。',
      'Document List 明确 four documents 和 photocopies not acceptable，适合放在材料区第一屏。',
    ],
    documentHighlights: [
      '一份 identity / date of birth 文件，例如有效美国护照或州 vital statistics 签发的 certified birth certificate。',
      '一份显示完整 Social Security number 的文件，例如 Social Security card、W-2 或符合要求的 Medicare/Medicaid ID。',
      '两份 Alabama principal residence 文件，例如 utility bill、lease、vehicle registration 或 voter registration。',
      '姓名变化时带 certified documents，例如 marriage certificate、adoption record 或 court order。',
      '外州转入时带当前 out-of-state license 和 ALEA 要求的 primary document。',
    ],
    commonMistakes: [
      '去 county license office 首次申请 STAR ID。',
      '带普通复印件，而不是可接受的原件或 certified 文件。',
      'SSN 文件没有显示完整号码。',
      '居住证明在配偶或父母名下，却没有带婚姻或出生关系证明。',
    ],
    recommendedSteps: [
      '先确认你要办的是普通 Alabama license / ID，还是带星标的 STAR ID。',
      '首次 STAR ID 直接查 ALEA Driver License Exam Office，不要只看县办公室。',
      '按 STAR ID Document List 凑齐 identity、full SSN、two residence proofs 和姓名变化文件。',
      '外州转入查看 Document Requirements and Fees，确认当前驾照、费用和办公室路径。',
      '普通续期或 duplicate 再看 county operated offices 或 ALEA online services。',
    ],
    actionLinks: [
      {
        label: 'Alabama STAR ID',
        url: 'https://www.alea.gov/dps/driver-license/star-id',
        description: 'STAR ID 用途、办理地点和联邦 REAL ID 说明。',
      },
      {
        label: 'STAR ID Document List',
        url: 'https://www.alea.gov/dps/driver-license/star-id/star-id-document-list',
        description: '四类材料、完整 SSN、两份居住证明和复印件限制。',
      },
      {
        label: 'Document Requirements and Fees',
        url: 'https://www.alea.gov/dps/driver-license/document-requirements-and-fees',
        description: '外州转入、材料和费用说明。',
      },
      {
        label: 'License and ID Cards',
        url: 'https://www.alea.gov/dps/driver-license/license-and-id-cards',
        description: '普通驾照、ID、外州转入和不同证件类别说明。',
      },
      {
        label: 'Driver License Offices',
        url: 'https://www.alea.gov/dps/driver-license/driver-license-offices',
        description: 'ALEA Driver License office 列表和预约相关入口。',
      },
      {
        label: 'ALEA Driver License Online Services',
        url: 'https://alabamadl.alea.gov/',
        description: '符合条件时在线续期或申请 duplicate license、permit、ID。',
      },
    ],
    sources: [
      {
        label: 'ALEA STAR ID',
        url: 'https://www.alea.gov/dps/driver-license/star-id',
      },
      {
        label: 'ALEA STAR ID Document List',
        url: 'https://www.alea.gov/dps/driver-license/star-id/star-id-document-list',
      },
      {
        label: 'ALEA Document Requirements and Fees',
        url: 'https://www.alea.gov/dps/driver-license/document-requirements-and-fees',
      },
      {
        label: 'ALEA License and ID Cards',
        url: 'https://www.alea.gov/dps/driver-license/license-and-id-cards',
      },
      {
        label: 'ALEA Driver License Offices',
        url: 'https://www.alea.gov/dps/driver-license/driver-license-offices',
      },
      {
        label: 'ALEA Official Online Renewal Notice',
        url: 'https://www.alea.gov/news/alea-alerts-customers-concerning-third-party-website-upcharging-driver-license-renewals',
        note: 'ALEA 官方线上续期入口、交易费和 duplicate 可办范围提醒。',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'moving-to-new-state'],
  },
  {
    id: 'arkansas',
    abbr: 'AR',
    nameEn: 'Arkansas',
    nameZh: '阿肯色州',
    agency: 'Arkansas Department of Finance and Administration',
    agencyUrl: 'https://www.dfa.arkansas.gov/online-services/drivers/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '阿肯色州驾照、ID 和 REAL ID 由 Department of Finance and Administration / Driver Services 处理。REAL ID 页面、Revenue Office locations、MyDMV、online driver services 和 appointment 是当前最实用的入口。',
    realIdSummary:
      'Arkansas REAL ID 要带 legal presence、identity、Social Security number 和两份 residency。官方页面明确 Social Security Card must be provided；居住证明可包括水电燃气账单、六个月内工资单或银行账单、当前税表或保险文件等。',
    licenseSummary:
      '普通驾照续期和补证要区分是否需要 REAL ID 升级。DFA 的 online services 覆盖 replacement、地址更新和部分预登记，但 REAL ID 材料核验仍要按 Revenue Office 路径准备。',
    appointmentNote:
      'Arkansas DFA 表示 REAL ID 可在全州 Revenue Offices 办理；预约有帮助但不是所有场景都强制，到场前仍要确认具体办公室的服务和时间。',
    editorNotes: [
      'Arkansas REAL ID 页面明确 Social Security Card must be provided，这一点和部分州“SSN 可核验不必带卡”不同。',
      'DFA 旧 Driver Services 深层入口在自动检查中返回 500，部分 DFA / MyDMV 页面也可能返回 403；应优先保留可用的 Online Driver Services、REAL ID 和 USA.gov 备用路径。',
      'Appointment recommended but not required 的语气要谨慎，避免写成必须预约。',
    ],
    accessStatus: {
      label: '官方入口可能触发安全拦截',
      tone: 'watch',
      note: 'Arkansas DFA 部分深层页面在自动链接检查中可能返回 403 或 500。若你也打不开，请从 USA.gov 州机动车服务目录、DFA Online Driver Services 或 DFA Revenue Office locations 重新进入。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '一份 proof of legal presence，例如 U.S. birth certificate 或 U.S. passport。',
      '一份 proof of identity，例如当前 driver license / ID、school ID、vehicle registration / title、marriage certificate 或 military ID。',
      'Social Security Card；DFA REAL ID 页面写明 must be provided。',
      '两份 Arkansas residency，例如水电燃气账单、六个月内 pay stub、六个月内银行账单、当前税表或房屋/租客/机动车保险。',
      '如果只是 replacement 或 address update，先看 DFA online driver services 是否可在线处理。',
    ],
    commonMistakes: [
      '照搬其他州经验，以为只报 SSN 就够了，忘记 Arkansas 要 Social Security Card。',
      '把 appointment recommended 理解成完全不用看办公室排队和营业时间。',
      '只带一份居住证明。',
      '在线更新地址后，以为系统一定会自动寄出新卡，没看对应服务说明。',
    ],
    recommendedSteps: [
      '先打开 Arkansas REAL ID 页面或 Real ID Quiz，确认自己需要的材料组合。',
      '按 legal presence、identity、SSN card、two residency proofs 四组准备原件。',
      '使用 Revenue Office locations 查办公室，必要时预约，但也确认是否可 walk-in。',
      '补证、地址更新或预登记先看 online driver services，避免为了可在线处理的业务跑办公室。',
      '如果 DFA 页面打不开，从 USA.gov 州机动车服务目录进入 Arkansas 官方机动车服务。',
    ],
    actionLinks: [
      {
        label: 'Arkansas Real ID',
        url: 'https://www.dfa.arkansas.gov/real-id/',
        description: 'REAL ID 材料、Revenue Office、预约和 FAQ 入口。',
      },
      {
        label: 'DFA Online Driver Services',
        url: 'https://www.dfa.arkansas.gov/online-services/drivers/',
        description: 'Arkansas REAL ID、驾照、ID、permit、补证、地址更新和驾驶员在线服务入口。',
      },
      {
        label: 'DFA MyDMV',
        url: 'https://www.dfa.arkansas.gov/office/mydmv/',
        description: '预约、REAL ID、replacement 和 MyDMV 服务入口。',
      },
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
        description: 'DFA 页面打不开时使用的联邦官方州机动车服务目录。',
      },
    ],
    sources: [
      {
        label: 'Arkansas DFA Real ID',
        url: 'https://www.dfa.arkansas.gov/real-id/',
      },
      {
        label: 'Arkansas DFA Online Driver Services',
        url: 'https://www.dfa.arkansas.gov/online-services/drivers/',
      },
      {
        label: 'Arkansas DFA Online Driver Services',
        url: 'https://www.dfa.arkansas.gov/online-services/drivers/',
      },
      {
        label: 'Arkansas DFA MyDMV',
        url: 'https://www.dfa.arkansas.gov/office/mydmv/',
      },
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'renewal-replacement-address'],
  },
  {
    id: 'new-mexico',
    abbr: 'NM',
    nameEn: 'New Mexico',
    nameZh: '新墨西哥州',
    agency: 'New Mexico Motor Vehicle Division',
    agencyUrl: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '新墨西哥州 MVD 同时提供 REAL ID 和 Standard Driver License / ID。中文用户最需要先判断：自己要的是可用于联邦用途的 REAL ID，还是只用于驾驶和州内一般身份用途的 Standard credential。',
    realIdSummary:
      'New Mexico REAL ID 要证明 Lawful Identity and Age、Identification Number 和 New Mexico Residency。MVD 明确要求 original 或 certified copy；photocopies、notarized photocopies 和 non-certified copies 不接受，且法律身份和识别号码会做电子核验。',
    licenseSummary:
      'Standard Driver License / ID 只需要一份 identity and age 与两份 New Mexico residency，不需要 fingerprints，也不需要 Social Security number；两类 license 都可用于驾驶，但 Standard 不能用于 REAL ID 联邦身份用途。',
    appointmentNote:
      'REAL ID 通常需要到 MVD office 完成文件核验；部分 Standard renewal / replacement 可能符合线上资格。材料准备优先查看 REAL ID microsite 和 acceptable documents PDF。',
    editorNotes: [
      'New Mexico 与很多州不同，Standard license 不要求 SSN 和 fingerprints；页面要把 Standard 与 REAL ID 分开写清楚。',
      'REAL ID 页面明确 original or certified copy，且会通过 VLS/SAVE、USPVS、SSOLV 等系统核验，适合提醒用户不要带普通扫描件。',
      '非英文文件必须有完整 certified translation，对中文出生、婚姻或法院文件用户很关键。',
    ],
    accessStatus: {
      label: '部分 MVD 深层页面可能阻挡',
      tone: 'watch',
      note: 'New Mexico REAL ID microsite 可访问；MVD 主站部分深层链接在自动检查中可能返回 403。若页面打不开，请从 MVD 首页或 USA.gov 州机动车服务目录重新进入。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'REAL ID: Lawful Identity and Age，例如 U.S. passport、birth certificate 或符合条件的移民文件。',
      'REAL ID: Identification Number，例如 SSN card、W-2、1099 或带完整 SSN 的 pay stub。',
      'REAL ID: New Mexico residency，按官方清单准备两份，并注意账单或文件日期限制。',
      'Standard license / ID: 一份 identity and age 加两份 New Mexico residency；不需要 SSN，也不需要 fingerprints。',
      '非英文文件要配完整 certified English translation；姓名变化要提供清晰的 linking documents。',
    ],
    commonMistakes: [
      '把 Standard license 当作 REAL ID 去机场或联邦设施使用。',
      '带普通复印件、拍照件或 notarized photocopy 代替 original / certified copy。',
      '中文文件没有准备 certified English translation。',
      '只带当前姓名文件，没带从出生姓名到当前 legal name 的完整变化链。',
    ],
    recommendedSteps: [
      '先决定要 REAL ID 还是 Standard credential：只开车和州内一般用途时，Standard 可能够用。',
      '如果要 REAL ID，用 New Mexico REAL ID Companion 或 acceptable documents PDF 核对三类材料。',
      '把非英文文件送做 certified translation，并整理姓名变化链条。',
      '确认居住证明的日期和 physical residential address 要求，避免 PO Box 或过期账单。',
      '需要文件核验时安排 MVD office；只做 renewal / replacement 时再看是否符合线上资格。',
    ],
    actionLinks: [
      {
        label: 'New Mexico REAL ID',
        url: 'https://realid.mvd.newmexico.gov/',
        description: 'REAL ID 与 Standard license 区别、材料要求、FAQ 和 RIC 入口。',
      },
      {
        label: 'REAL ID Acceptable Documents PDF',
        url: 'https://realid.mvd.newmexico.gov/REALID-acceptable-docs.pdf',
        description: 'New Mexico REAL ID 可接受文件完整清单。',
      },
      {
        label: 'MVD Licenses and IDs',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/',
        description: 'New Mexico 驾照、ID、renewal、address change 和 office 入口。',
      },
      {
        label: 'Renew a Driving Credential',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/drivers-license/renew-a-driving-credential/',
        description: '驾照或 ID 续期路径。',
      },
      {
        label: 'Change Your Address',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/change-your-address/',
        description: 'MVD 地址变更说明。',
      },
    ],
    sources: [
      {
        label: 'New Mexico REAL ID',
        url: 'https://realid.mvd.newmexico.gov/',
      },
      {
        label: 'New Mexico REAL ID Acceptable Documents',
        url: 'https://realid.mvd.newmexico.gov/REALID-acceptable-docs.pdf',
      },
      {
        label: 'New Mexico MVD Licenses and IDs',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/',
      },
      {
        label: 'New Mexico MVD Renewal',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/drivers-license/renew-a-driving-credential/',
      },
      {
        label: 'New Mexico MVD Address Change',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/change-your-address/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'name-change-chain'],
  },
  {
    id: 'delaware',
    abbr: 'DE',
    nameEn: 'Delaware',
    nameZh: '特拉华州',
    agency: 'Delaware Division of Motor Vehicles',
    agencyUrl: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '特拉华州驾照、REAL ID、续期、外州转入和地址/姓名更新由 Delaware Division of Motor Vehicles 管理。Delaware DMV 页面把 REAL ID 称为 federally compliant driver license / ID card，并把材料、续期、搬入和线上服务分在不同入口。',
    realIdSummary:
      'Delaware federally compliant DL/ID 要证明 identity / lawful status、date of birth、Social Security number 和 Delaware residence。官方页面强调 existing holders 在 renewal 时也要做一次 original source documents revalidation；所有文件必须是 original 或 certified copy，普通复印件和 non-certified 文件不接受。',
    licenseSummary:
      'Delaware 要求成为 bona fide resident 后 60 天内取得 Delaware driver license。续期可在到期前 180 天内进行，可在 DMV facility 或 online 办理；续期时要交回旧 license、完成申请并通过 eye-screening，搬家或 REAL ID revalidation 时可能要补居住、SSN 或 legal presence 材料。',
    appointmentNote:
      '先用 REAL ID / SecureID 页面确认是否需要 compliant card，再看 renewal、transfer 或 address/name change 页面。地址变化后 30 天内要通知 DMV；姓名变化要先更新 Social Security 记录，并按 DMV 说明等待数据库同步后再去办公室。',
    editorNotes: [
      'Delaware 有 one-time revalidation 要求；老用户续期时也可能需要重新携带 original source documents。',
      'Residency proofs 要来自 separate sources、显示 physical address，且 mail 通常要在 60 天内；这比只写“两份地址证明”更有用。',
      'Name change 页面要求先改 SSA，并等待 48-72 小时；中文页需要把这一步放在 DMV 前面。',
    ],
    documentHighlights: [
      '一份 proof of identity / legal presence，例如 certified U.S. birth certificate、有效 U.S. passport、Certificate of Naturalization 或合格移民文件。',
      'Social Security number 证明，例如 SSN card、W-2、SSA-1099、1099、含完整 SSN 的 pay stub，或 SSA ineligibility letter。',
      '两份 Delaware residency，来自不同来源，显示 physical address；P.O. Box 不适合作为主要居住地址。',
      '姓名变化时带全部 marriage certificate、divorce decree 或 court order，且文件要能串起姓名变化链。',
      '新居民转入时带外州 license 或 certified driving record，并准备 legal presence、SSN 和两份 Delaware residency。',
    ],
    commonMistakes: [
      '以为已经有 Delaware license，REAL ID 续期时就不用再带原始身份文件。',
      '带打印账单、普通复印件或没有邮戳/日期的地址材料。',
      '姓名变化后直接去 DMV，没先更新 Social Security 记录。',
      '搬到 Delaware 后超过 60 天才处理外州 license transfer。',
    ],
    recommendedSteps: [
      '先看 SecureID / REAL ID 页面，决定要 federally compliant card 还是 non-compliant card。',
      '按 identity/legal presence、SSN、two Delaware residency、name-change chain 四组准备原件或 certified copy。',
      '如果是外州搬入，先看 New Resident Transfer License，确认 60 天要求和旧 license / driving record。',
      '如果只是续期，先看 License Renewals，确认 online eligibility、eye-screening 和是否要 REAL ID revalidation。',
      '地址或姓名变化先看 Other / Name & Address Change，尤其是 30 天地址通知和 SSA 先行规则。',
    ],
    actionLinks: [
      {
        label: 'Delaware SecureID / REAL ID',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/secureID/index.shtml',
        description: 'Federally compliant driver license / ID card 材料和 FAQ。',
      },
      {
        label: 'Delaware General Requirements',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_gen_req',
        description: '驾照申请、身份、SSN、居住和合法身份基础要求。',
      },
      {
        label: 'New Resident Transfer License',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_trsfr_ov18',
        description: '外州搬入 Delaware 后换证要求。',
      },
      {
        label: 'Delaware License Renewals',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_renewals',
        description: '续期、180 天窗口、eye-screening 和 online renewal 说明。',
      },
      {
        label: 'Name and Address Change',
        url: 'https://dmv.de.gov/DriverServices/other/index.shtml?dc=dr_oth_change',
        description: '姓名变化、地址变化和 30 天通知说明。',
      },
    ],
    sources: [
      {
        label: 'Delaware SecureID / Federally Compliant DL/ID',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/secureID/index.shtml',
      },
      {
        label: 'Delaware General Requirements',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_gen_req',
      },
      {
        label: 'Delaware New Resident Transfer License',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_trsfr_ov18',
      },
      {
        label: 'Delaware License Renewals',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/index.shtml?dc=dr_lic_renewals',
      },
      {
        label: 'Delaware Name and Address Change',
        url: 'https://dmv.de.gov/DriverServices/other/index.shtml?dc=dr_oth_change',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'name-change-chain'],
  },
  {
    id: 'rhode-island',
    abbr: 'RI',
    nameEn: 'Rhode Island',
    nameZh: '罗得岛州',
    agency: 'Rhode Island Division of Motor Vehicles',
    agencyUrl: 'https://dmv.ri.gov/licenses-permits-ids',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '罗得岛州驾照、REAL ID、续期、地址/姓名变化和外州转入由 Rhode Island DMV 管理。RI DMV 的实用入口是 REAL ID 页面、License Renewal、Out of State/Country Transfers、Name & Address Change，以及官方 Document Checklist PDF。',
    realIdSummary:
      'Rhode Island REAL ID 交易通常要 completed LI-1 form、one proof of identity、Social Security number / SSA ineligibility、two proofs of Rhode Island residency，并按交易类型补充 current license、out-of-state license 或姓名变化文件。官方 checklist 明确 P.O. Box 不接受作居住地址。',
    licenseSummary:
      'Rhode Island license 可在到期前最多 90 天续期，可 online、DMV branch、AAA branch 或 mail 等路径处理。外州转入时通常要带当前外州 license、两份 RI residency、SSN 信息；如果外州 license 不在手，需要 driving record 或 verification 加 identity document。',
    appointmentNote:
      '办理前优先查看 RI DMV 页面和 Document Checklist PDF；AAA 只承办部分会员交易，外州转入、姓名变化、州 ID 等复杂业务要确认是否必须到 DMV branch。',
    editorNotes: [
      'RI 的 LI-1 是关键动作词，页面需要提醒“不是只带材料，还要带表”。',
      'Document Checklist 对 REAL ID / non-REAL ID、renewal、address change、out-of-state transfer 有不同格子，中文页避免写成所有交易同一套。',
      'RI 官方页面自动检查 403，保留 accessStatus 和 USA.gov fallback，避免用户误以为链接硬坏。',
    ],
    accessStatus: {
      label: '官方页需普通浏览器点验',
      tone: 'watch',
      note: 'Rhode Island DMV 官方页面和 PDF 在本环境自动检查中返回 403。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录进入 Rhode Island DMV。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'Completed LI-1 form；REAL ID license / ID 交易通常都要带。',
      '一份 proof of identity，常见例子包括有效 U.S. passport 或 certified birth certificate。',
      'Social Security number 写在 LI-1 上，或带 SSA 出具的不符合取得 SSN 的证明。',
      '两份 Rhode Island residency，P.O. Box 不接受；utility bill、bank statement、payroll check 等通常要注意 60 天内日期。',
      '外州转入带当前 out-of-state license；没有旧证时准备 driving record 或 verification 和 identity document。',
    ],
    commonMistakes: [
      '只看 REAL ID 页面，没下载或填写 LI-1 表。',
      '地址证明使用 P.O. Box，或账单日期太旧。',
      '外州 license 已遗失，却没有提前准备 driving record / verification。',
      '把 AAA 分支当成所有 RI DMV 交易都能办的入口。',
    ],
    recommendedSteps: [
      '先打开 RI REAL ID 页面，确认你要 REAL ID 还是 non-REAL ID credential。',
      '下载 Document Checklist 和 LI-1，按交易类型框选所需材料。',
      '把 identity、SSN、two residency 和姓名变化文件分成四组，日期和 P.O. Box 要特别检查。',
      '续期先看 License Renewal，确认是否能 online / mail / AAA，或是否需要 DMV branch。',
      '外州转入先看 Out of State/Country Transfers，确认旧 license、driving record 和居住证明。',
    ],
    actionLinks: [
      {
        label: 'Rhode Island REAL ID',
        url: 'https://dmv.ri.gov/licenses-permits-ids/real-id',
        description: 'RI REAL ID 用途、材料和办理入口。',
      },
      {
        label: 'RI Document Checklist PDF',
        url: 'https://dmv.ri.gov/sites/g/files/xkgbur556/files/documents/forms/checklist/license_checklist.pdf',
        description: 'REAL ID / non-REAL ID、续期、地址变化和转入材料表。',
      },
      {
        label: 'RI License Renewal',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/license-renewal',
        description: '续期窗口和 online / branch / mail 路径。',
      },
      {
        label: 'Out of State/Country Transfers',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/out-statecountry-transfers',
        description: '外州或境外 license 转入 Rhode Island 的要求。',
      },
      {
        label: 'Name & Address Change',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/name-address-change',
        description: '驾照/ID 姓名和地址变更说明。',
      },
    ],
    sources: [
      {
        label: 'RI DMV REAL ID',
        url: 'https://dmv.ri.gov/licenses-permits-ids/real-id',
      },
      {
        label: 'RI DMV Document Checklist',
        url: 'https://dmv.ri.gov/sites/g/files/xkgbur556/files/documents/forms/checklist/license_checklist.pdf',
      },
      {
        label: 'RI DMV License Renewal',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/license-renewal',
      },
      {
        label: 'RI DMV Out of State/Country Transfers',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/out-statecountry-transfers',
      },
      {
        label: 'RI DMV Name & Address Change',
        url: 'https://dmv.ri.gov/licenses-permits-ids/drivers-licenses/name-address-change',
      },
    ],
    relatedTopicSlugs: ['document-checklist', 'moving-to-new-state', 'renewal-replacement-address'],
  },
  {
    id: 'new-hampshire',
    abbr: 'NH',
    nameEn: 'New Hampshire',
    nameZh: '新罕布什尔州',
    agency: 'New Hampshire Division of Motor Vehicles',
    agencyUrl: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '新罕布什尔州驾照、REAL ID、续期、外州转入和个人信息更新由 New Hampshire Division of Motor Vehicles 管理。NH DMV 的核心入口是 REAL ID、required documents、renewal、transfer from another state、update personal information 和 online renewals。',
    realIdSummary:
      'New Hampshire REAL ID 要用官方 required documents 清单证明 identity、Social Security number 和 New Hampshire residency。官方页面强调 proof of identity 文件上的姓名要与当前姓名匹配；如果出生证或护照姓名不同，需要能连接姓名变化的文件。',
    licenseSummary:
      '搬入 New Hampshire 后，官方 transfer 页面说明需要在建立 residency 后 60 天内取得 New Hampshire driver license。续期可在符合条件时 online，但要以 renewal notice / RIN 和 NH DMV online renewals 页面为准。',
    appointmentNote:
      'REAL ID upgrade 通常要到 NH DMV 并带 proof of identity、proof of residency 和相应费用；地址变化按州说明应在 30 天内通知 DMV。',
    editorNotes: [
      'NH 的两个时间点很适合前置：新居民 60 天换证，地址变化 30 天通知。',
      'REAL ID 页面强调 name matching 和 required documents PDF，中文页要引导用户先核对姓名链条。',
      '所有 NH 官方深层链接自动检查 403，必须保留 accessStatus，使用前建议普通浏览器点验一次。',
    ],
    accessStatus: {
      label: '官方页需普通浏览器点验',
      tone: 'watch',
      note: 'New Hampshire DMV 官方深层页面在本环境自动检查中返回 403。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录进入 New Hampshire DMV。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'Proof of identity，例如 birth certificate、passport 或 NH DMV REAL ID required documents list 中列出的身份文件。',
      'Proof of Social Security number，按 REAL ID required documents 清单准备。',
      'Proof of New Hampshire residency；REAL ID 和 transfer 场景都要按官方清单确认。',
      '姓名变化文件：如果 birth certificate 或 passport 与当前姓名不一致，需要连接姓名变化的法律文件。',
      '外州转入时带现有外州 license / non-driver ID，并按 transfer 页面准备 identity 和 NH residency。',
    ],
    commonMistakes: [
      '搬入 New Hampshire 后没有在 60 天内处理换证。',
      '只看 REAL ID 介绍，没下载或核对 required documents PDF。',
      '出生证、护照、SSN 文件姓名不一致，却没有带 name change chain。',
      '收到 renewal notice 后直接线上续期，没确认 RIN、资格和是否需要现场办理。',
    ],
    recommendedSteps: [
      '先看 NH REAL ID 页面和 Required Documents REAL ID compliant PDF，确认 identity、SSN、residency 三组材料。',
      '如果刚搬来，优先看 Transfer License From Another State，按 60 天规则安排 DMV。',
      '姓名不一致时先整理 marriage、divorce、court order 等连接文件。',
      '续期先看 Renew Driver License / Non Driver ID 和 Online Renewals，确认是否有 RIN、是否符合线上资格。',
      '地址变化先看 Update Personal Information，按 30 天通知要求处理。',
    ],
    actionLinks: [
      {
        label: 'NH REAL ID',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/real-id',
        description: 'REAL ID 说明、required documents 和升级入口。',
      },
      {
        label: 'NH Required Documents',
        url: 'https://www.dmv.nh.gov/sites/g/files/ehbemt416/files/inline-documents/sonh/dsmv634a.pdf',
        description: 'REAL ID compliant identity and residency requirements PDF。',
      },
      {
        label: 'Renew Driver License / Non Driver ID',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/renew-driver-licensenon-driver-id',
        description: '驾照或 non-driver ID 续期说明。',
      },
      {
        label: 'Transfer License From Another State',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/transfer-license-another-state',
        description: '外州搬入 New Hampshire 后换证说明。',
      },
      {
        label: 'Update Personal Information',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/update-personal-information',
        description: '地址或个人信息变化说明。',
      },
    ],
    sources: [
      {
        label: 'NH DMV REAL ID',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/real-id',
      },
      {
        label: 'NH DMV REAL ID Required Documents PDF',
        url: 'https://www.dmv.nh.gov/sites/g/files/ehbemt416/files/inline-documents/sonh/dsmv634a.pdf',
      },
      {
        label: 'NH DMV Renewal',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/renew-driver-licensenon-driver-id',
      },
      {
        label: 'NH DMV Transfer License From Another State',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/transfer-license-another-state',
      },
      {
        label: 'NH DMV Update Personal Information',
        url: 'https://www.dmv.nh.gov/drivers-licensenon-driver-ids/update-personal-information',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'moving-to-new-state', 'name-change-chain'],
  },
  {
    id: 'maine',
    abbr: 'ME',
    nameEn: 'Maine',
    nameZh: '缅因州',
    agency: 'Maine Bureau of Motor Vehicles',
    agencyUrl: 'https://www.maine.gov/sos/bmv',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '缅因州驾照、REAL ID、续期、补证和地址/姓名更新由 Maine Bureau of Motor Vehicles 管理。BMV 官网现在把 REAL ID、branch appointment、online renewal / replacement 和 online REAL ID renewal 放在同一组高频入口里。',
    realIdSummary:
      'Maine REAL ID 初次申请必须到 BMV branch office 或 mobile unit。需要一份 identity / date of birth / lawful status 文件、Social Security Number 或不符合 SSN 资格证明、两份 Maine residence；P.O. Box 不接受。文件必须是 original 或 issuing agency certified。',
    licenseSummary:
      'Maine online renewal / replacement 可用于部分 active non-commercial license、motorcycle license、motor driven cycle restricted license 或 Maine ID。已有 REAL ID 的用户在满足 U.S. citizen、non-commercial、无需 vision screening、不改资料、照片符合 federal guidelines 等条件时，可能可以在线 renewal / duplicate。',
    appointmentNote:
      '初次 REAL ID 仍要去 BMV branch 或 mobile unit。线上服务不能改 license / ID 当前信息；如果要改地址、姓名或其他资料，BMV online renewal 页面要求联系 207-624-9000 x 52114 或去 office。',
    editorNotes: [
      'Maine 2025 后的变化很重要：已有 REAL ID 的部分用户可以 online renewal，但初次 REAL ID 仍是现场。',
      'Maine REAL ID FAQ 明确 SSN card 不必带，但要能提供号码，这和 Arkansas 等州不同。',
      'Online renewal 页面把不能线上处理的情形列得很清楚，中文页要帮助用户先排除 name change、vision、non-citizen、out-of-state license 等情况。',
    ],
    documentHighlights: [
      '一份 identity、date of birth 和 lawful status 文件，例如 birth certificate、passport 或合格移民文件。',
      'Social Security Number；REAL ID FAQ 说明不需要带 Social Security Card，但要能提供号码。',
      '两份 Maine residence，P.O. Box 不接受。',
      '姓名变化时提供 marriage license、divorce decree 或 court order，并显示从身份文件姓名到当前姓名的 clear trail。',
      '线上续期时准备 SSN、信用卡和打印条件；如系统提示缺 legal presence 或 Maine residence，要按 BMV 指示电话或去 office。',
    ],
    commonMistakes: [
      '第一次申请 Maine REAL ID 时尝试完全在线办理。',
      '已有 REAL ID 但同时要改地址或姓名，却仍然尝试 online renewal。',
      '以为必须带实体 SSN card，忽略 BMV 只要求能提供号码。',
      '用 P.O. Box 当作 Maine residential address。',
    ],
    recommendedSteps: [
      '先看 Maine REAL ID FAQ，决定是初次 REAL ID、已有 REAL ID 续期，还是 non-REAL ID 普通续期。',
      '初次 REAL ID 按 identity/lawful status、SSN、two Maine residence、name-change chain 准备 original 或 certified documents。',
      '已有 REAL ID 续期先看 online renewal 页面，逐项排除 vision screening、data change、non-citizen、CDL 等不符合线上条件。',
      '需要改地址、姓名或其他资料时，先联系 BMV 或安排 branch office，不要直接提交线上续期。',
      '有旅行需求时仍准备护照等 TSA 接受证件作为备选。',
    ],
    actionLinks: [
      {
        label: 'Maine REAL ID',
        url: 'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/real-id',
        description: 'REAL ID FAQ、材料、branch office 和 online renewal 更新说明。',
      },
      {
        label: 'Maine BMV Home',
        url: 'https://www.maine.gov/sos/bmv',
        description: 'BMV 总入口、online services、appointments 和 branch office 入口。',
      },
      {
        label: 'Maine Online Renewal / Replacement',
        url: 'https://apps1.web.maine.gov/online/bmv/dlr_v2/',
        description: '驾照、ID 和符合条件的 REAL ID renewal / duplicate online service。',
      },
      {
        label: 'Online Renewal FAQ',
        url: 'https://www.maine.gov/online/bmv/dlr/faq.html',
        description: '线上续期资格、vision screening、地址变化和邮寄时间说明。',
      },
      {
        label: 'BMV Appointment System',
        url: 'https://mainebmvappt.cxmflow.com/',
        description: 'BMV branch office 预约入口。',
      },
    ],
    sources: [
      {
        label: 'Maine BMV REAL ID',
        url: 'https://www.maine.gov/sos/bmv/driver-licenses-and-ids/real-id',
      },
      {
        label: 'Maine BMV Home',
        url: 'https://www.maine.gov/sos/bmv',
      },
      {
        label: 'Maine Online Renewal / Replacement',
        url: 'https://apps1.web.maine.gov/online/bmv/dlr_v2/',
      },
      {
        label: 'Maine Online Renewal FAQ',
        url: 'https://www.maine.gov/online/bmv/dlr/faq.html',
      },
      {
        label: 'Maine BMV Appointment System',
        url: 'https://mainebmvappt.cxmflow.com/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'renewal-replacement-address', 'proof-of-residency'],
  },
  {
    id: 'hawaii',
    abbr: 'HI',
    nameEn: 'Hawaii',
    nameZh: '夏威夷州',
    agency: 'Hawaii Department of Transportation / County DMV Offices',
    agencyUrl: 'https://hidot.hawaii.gov/driverslicense/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '夏威夷州的 driver license / state ID 规则由 Hawaii DOT 提供州级说明，但实际办理由各县 Driver Licensing / DMV office 处理。Oahu 用户看 Honolulu Department of Customer Services，其他岛屿也要回到本县办公室确认预约和材料。',
    realIdSummary:
      'Hawaii REAL ID compliant credential 通常带 star。初次申请或材料未在档时，要证明 legal presence、legal name、date of birth、Social Security number 和 Hawaii principal residence address。Hawaii 官方 PDF 说明材料必须是 valid originals 或 certified copies；notarized copies 或 faxes 不接受。',
    licenseSummary:
      'Hawaii 有一个很容易办错的规则：Federal and state law 只允许持有一张 REAL ID-compliant card，driver license 和 state ID 不能同时都作为 REAL ID。临时卡或办理时给的 document 也不能用于 federal purposes 或旅行，Honolulu 页面提醒永久塑料卡可能需要 6-8 周寄达。',
    appointmentNote:
      '先从 HIDOT driver license 页面确认州级 documentary proof，再进入所在县预约或 office 页面。Honolulu 页面说明 REAL ID driver license 不能首次 online 申请；如果只申请带星标 duplicate，且信息已在档，Oahu 用户可能有 online duplicate 路径。',
    editorNotes: [
      'Hawaii 页面要明确“州级规则 + 县级办理”，否则用户会误以为 HIDOT 就是统一柜台。',
      'Hawaii 一人只能持有一个 REAL ID compliant credential，是 driver license 和 state ID 切换时的高风险点。',
      'SSN documentation 在 Hawaii 文档中标注 optional since 2021，但初次申请仍把 SSN category 纳入核验框架，文案要谨慎写成“号码/类别核验”而不是人人必须带卡。',
    ],
    accessStatus: {
      label: '县级页面状态不一',
      tone: 'watch',
      note: 'Hawaii DOT 与 Honolulu 官方页面可访问；部分县级 DMV 页面在自动检查中可能返回 403。请从 HIDOT county contacts 或本县官方预约系统进入最终办理页面。',
      fallbackLabel: 'HIDOT Driver License',
      fallbackUrl: 'https://hidot.hawaii.gov/driverslicense/',
    },
    documentHighlights: [
      'Legal presence、legal name、date of birth 文件，例如 U.S. birth certificate、U.S. passport、Permanent Resident Card 或合格移民文件。',
      'Social Security number 类别文件；Hawaii 官方材料说明 SSN documentation optional since June 18, 2021，但仍应按县办公室要求准备号码或证明。',
      '两份 Hawaii principal residence address，来自不同 entities 或 accounts，并显示申请人 full first and last name。',
      '姓名不一致时准备 connecting documents，例如 marriage certificate、court order、divorce 或 Hawaii Lieutenant Governor name change decree。',
      '如果 mailing address 和 physical address 不同，部分县 renewal 页面要求分别提供 mailing 和 physical address 文件。',
    ],
    commonMistakes: [
      '以为可以同时持有 REAL ID driver license 和 REAL ID state ID。',
      '拿 temporary card 去机场或联邦设施。',
      '把 notarized copy、fax、普通复印件当作 certified copy。',
      '只看 Honolulu 页面，却住在其他县，没有回到本县 DMV office 确认预约和地址材料。',
    ],
    recommendedSteps: [
      '先确认你要把 driver license 还是 state ID 作为唯一 REAL ID compliant credential。',
      '打开 HIDOT driver license 页面和 acceptable documents PDF，按五类材料核对。',
      '进入所在县 DMV / Driver Licensing office 页面，确认预约、office、支付方式和是否接受 online duplicate。',
      '如果姓名或身份状态有变化，先整理 connecting documents；非永久身份用户续期通常要现场证明 continued legal presence。',
      '有出行计划时预留永久卡邮寄时间，并准备 passport 等 TSA 接受证件作为备用。',
    ],
    actionLinks: [
      {
        label: 'HIDOT Driver License',
        url: 'https://hidot.hawaii.gov/driverslicense/',
        description: 'Hawaii driver license 州级 documentary proof FAQ 和县级联系入口。',
      },
      {
        label: 'Honolulu REAL ID',
        url: 'https://www.honolulu.gov/csd/real-id/',
        description: 'Oahu REAL ID、one compliant card、temporary card 和办理地点说明。',
      },
      {
        label: 'Hawaii Acceptable Documents PDF',
        url: 'https://hidot.hawaii.gov/highways/files/2023/07/Acceptable-Documents-for-a-REAL-ID-Compliant-Star-DL-SID-Print-Button-2023-07-18-3.pdf',
        description: 'Hawaii REAL ID compliant driver license / state ID 可接受文件清单。',
      },
      {
        label: 'Honolulu Driver License',
        url: 'https://www.honolulu.gov/csd/dllicense/',
        description: 'Oahu driver license 服务入口。',
      },
      {
        label: 'Honolulu Driver Licensing Centers',
        url: 'https://www.honolulu.gov/csd/driver-licensing-centers/',
        description: 'Oahu driver licensing center 列表。',
      },
    ],
    sources: [
      {
        label: 'HIDOT Driver License',
        url: 'https://hidot.hawaii.gov/driverslicense/',
      },
      {
        label: 'Honolulu REAL ID',
        url: 'https://www.honolulu.gov/csd/real-id/',
        note: '首次 REAL ID 不能线上办；符合条件的 Oahu 星标驾照 exact duplicate 可在线申请，并列出预约、费用和邮寄提醒。',
      },
      {
        label: 'Hawaii Acceptable Documents PDF',
        url: 'https://hidot.hawaii.gov/highways/files/2023/07/Acceptable-Documents-for-a-REAL-ID-Compliant-Star-DL-SID-Print-Button-2023-07-18-3.pdf',
      },
      {
        label: 'Honolulu Driver License',
        url: 'https://www.honolulu.gov/csd/dllicense/',
      },
      {
        label: 'Honolulu Driver Licensing Centers',
        url: 'https://www.honolulu.gov/csd/driver-licensing-centers/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'proof-of-residency'],
  },
  {
    id: 'alaska',
    abbr: 'AK',
    nameEn: 'Alaska',
    nameZh: '阿拉斯加州',
    agency: 'Alaska Division of Motor Vehicles',
    agencyUrl: 'https://dmv.alaska.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '阿拉斯加州驾照、REAL ID、续期、补证和身份信息变化由 Alaska DMV 处理。最实用的入口是 REAL ID Update、REAL ID Checklist、Credential Services、Changing Identification Details 和 Online DMV。',
    realIdSummary:
      'Alaska REAL ID 需要 proof of U.S. citizenship / permanent residency / lawful status、适用时的 name change documents、两份 Alaska residency、Social Security Number；没有 SSN 时要 SSA ineligibility letter。',
    licenseSummary:
      '普通续期、补证和地址更新很多可以从 Online DMV 开始，但 REAL ID 材料核验、姓名变化、法定身份变化和多次姓名变化链条通常要按 DMV 页面准备原件或 certified copy。',
    appointmentNote:
      'Alaska DMV 对姓名和地址变化有 30 天通知要求。Changing Identification Details 页面明确 name-change 文件必须是 original certified copy，photocopies 和 fax copies 不接受。',
    editorNotes: [
      'Alaska 的 REAL ID 页面把 SSN 和 SSA ineligibility letter 分开写，适合提醒没有 SSN 的非公民用户不要空着不处理。',
      'Changing Identification Details 页面明确 30 天 name/address change notification，是中文页的高价值提醒。',
      'Alaska 有在线 REAL ID checklist，页面要引导用户先生成材料路径，再决定是否去办公室。',
    ],
    documentHighlights: [
      'Proof of U.S. citizenship、permanent residency 或 lawful status。',
      'Social Security Number；没有 SSN 时提供 Social Security Administration 的 ineligibility letter。',
      '两份 Alaska residency 文件。',
      '姓名变化时提供 marriage certificate、divorce decree、court order、naturalization certificate 等 original certified copy。',
      '地址或身份信息变化时准备 Form D1，并确认是否需要 vision test 或 replacement credential fee。',
    ],
    commonMistakes: [
      '以为 Online DMV 能完成首次 REAL ID 材料核验。',
      '姓名变化带普通复印件或传真件。',
      '搬家或改名超过 30 天才通知 DMV。',
      '没有 SSN 时没准备 SSA ineligibility letter。',
    ],
    recommendedSteps: [
      '先用 Alaska REAL ID Checklist 判断材料组合。',
      '按 lawful status、SSN、two Alaska residency、name change 四组整理原件或 certified copy。',
      '普通续期或补证先看 Online DMV，确认能否线上处理。',
      '姓名、地址、SSN、出生日期或性别等信息变化时看 Changing Identification Details。',
      '需要现场办理时再用 DMV locations / appointment 入口安排时间。',
    ],
    actionLinks: [
      {
        label: 'Alaska REAL ID Update',
        url: 'https://dmv.alaska.gov/credential-services/realidupdate/',
        description: 'Alaska REAL ID 材料类别和官方更新说明。',
      },
      {
        label: 'Alaska REAL ID Checklist',
        url: 'https://online.dmv.alaska.gov/REALIdChecklist',
        description: '互动 REAL ID 材料清单入口。',
      },
      {
        label: 'Credential Services',
        url: 'https://dmv.alaska.gov/credential-services/credential-services/',
        description: '驾照、ID、续期、补证和 REAL ID 服务总入口。',
      },
      {
        label: 'Changing Identification Details',
        url: 'https://dmv.alaska.gov/credential-services/changing-identification-details/',
        description: '姓名、地址、SSN、出生日期和性别等信息变化说明。',
      },
      {
        label: 'Alaska Online DMV',
        url: 'https://online.dmv.alaska.gov/',
        description: '线上地址变化、续期、补证和 DMV 服务入口。',
      },
    ],
    sources: [
      {
        label: 'Alaska DMV REAL ID Update',
        url: 'https://dmv.alaska.gov/credential-services/realidupdate/',
      },
      {
        label: 'Alaska DMV REAL ID Checklist',
        url: 'https://online.dmv.alaska.gov/REALIdChecklist',
      },
      {
        label: 'Alaska DMV Credential Services',
        url: 'https://dmv.alaska.gov/credential-services/credential-services/',
      },
      {
        label: 'Alaska DMV Changing Identification Details',
        url: 'https://dmv.alaska.gov/credential-services/changing-identification-details/',
      },
      {
        label: 'Alaska Online DMV',
        url: 'https://online.dmv.alaska.gov/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'name-change-chain', 'renewal-replacement-address'],
  },
  {
    id: 'idaho',
    abbr: 'ID',
    nameEn: 'Idaho',
    nameZh: '爱达荷州',
    agency: 'Idaho Transportation Department',
    agencyUrl: 'https://itd.idaho.gov/itddmv/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '爱达荷州把 REAL ID compliant credential 称为 Star Card，由 Idaho Transportation Department / county driver license offices 处理。Star Card、acceptable documents、Add the Star tool 和 Idaho DMV portal 是核心入口。',
    realIdSummary:
      'Idaho Star Card 需要证明 identity、Social Security number 和 Idaho residency。官方说明强调 out-of-state license 即使带 REAL ID 标记，也不能单独用来证明 identity；它只能作为 photo identity document，还要补 identity、SSN 和 residency 文件。',
    licenseSummary:
      '申请 Star Card 比普通 license / ID 要多材料。两份 Idaho residency 文件必须显示 current physical address，P.O. Box 不接受，通常要在一年内、来自不同来源；originals 或 printed e-documents 可用，fax 不接受。',
    appointmentNote:
      'Idaho 驾照和 Star Card 通常由 county driver license office 办理；到场前先确认县办公室地点、预约方式和本次业务所需材料。',
    editorNotes: [
      'Idaho 的州内名称是 Star Card，中文页应同时写 Star Card 和 REAL ID，方便用户对照官方站。',
      'Out-of-state REAL ID 不能单独证明 identity，是搬州用户最容易误判的点。',
      'Residency docs 要 current legal name、within one year、physical address、different sources，页面要比泛泛“两份地址证明”更具体。',
    ],
    accessStatus: {
      label: '官方页自动检查超时',
      tone: 'watch',
      note: 'Idaho ITD / DMV 官方页面在本环境自动链接检查中超时。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录或县级 driver license office 进入。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'Identity 文件，例如 birth certificate、passport 或 ITD Star Card 清单接受的身份文件。',
      'Social Security number 证明，例如 Social Security card、W-2、1099 或含完整 SSN 的 paystub。',
      '两份 Idaho residency，显示 current physical address，P.O. Box 不接受。',
      '居住证明要在 current legal name 下、通常在一年内、来自不同来源；fax 不接受。',
      '外州搬入时带 out-of-state license，但不要把它当作唯一 identity proof。',
    ],
    commonMistakes: [
      '以为外州 REAL ID license 可以直接换 Idaho Star Card，不用再带 birth certificate 或 passport。',
      '两份地址证明来自同一来源，或只显示 P.O. Box。',
      '带 fax 文件或截图文件。',
      '只准备普通 Idaho license 材料，没看 Star Card 的额外要求。',
    ],
    recommendedSteps: [
      '先打开 Idaho Star Card 页面，确认是否需要带星卡或用护照替代。',
      '用 Acceptable Documents / Add the Star Tool 核对 identity、SSN、two residency。',
      '搬州用户特别检查 out-of-state license 只能作为 photo identity document 的限制。',
      '把 residency 文件按来源分开，并确认姓名、地址和日期。',
      '最后从 Idaho DMV portal 或 county office 选择办理地点。',
    ],
    actionLinks: [
      {
        label: 'Idaho Star Card',
        url: 'https://itd.idaho.gov/starcard/',
        description: 'Idaho REAL ID / Star Card 总入口。',
      },
      {
        label: 'Star Card Acceptable Documents',
        url: 'https://itd.idaho.gov/starcard/star-card-acceptable-documents/',
        description: 'Star Card 可接受 identity、SSN 和 Idaho residency 文件。',
      },
      {
        label: 'Add the Star Tool',
        url: 'https://itd.idaho.gov/starcard/add-the-star-tool/',
        description: '按个人情况核对 Star Card 材料。',
      },
      {
        label: 'Idaho DMV',
        url: 'https://dmv.idaho.gov/',
        description: 'Idaho DMV 线上服务和 county office 入口。',
      },
      {
        label: 'ITD DMV',
        url: 'https://itd.idaho.gov/itddmv/',
        description: 'Idaho Transportation Department DMV 服务入口。',
      },
    ],
    sources: [
      {
        label: 'Idaho ITD Star Card',
        url: 'https://itd.idaho.gov/starcard/',
      },
      {
        label: 'Idaho Star Card Acceptable Documents',
        url: 'https://itd.idaho.gov/starcard/star-card-acceptable-documents/',
      },
      {
        label: 'Idaho Add the Star Tool',
        url: 'https://itd.idaho.gov/starcard/add-the-star-tool/',
      },
      {
        label: 'Idaho DMV',
        url: 'https://dmv.idaho.gov/',
      },
      {
        label: 'ITD DMV',
        url: 'https://itd.idaho.gov/itddmv/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'moving-to-new-state'],
  },
  {
    id: 'mississippi',
    abbr: 'MS',
    nameEn: 'Mississippi',
    nameZh: '密西西比州',
    agency: 'Mississippi Driver Service Bureau',
    agencyUrl: 'https://www.driverservicebureau.dps.ms.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '密西西比州驾照、REAL ID、续期、ID card、非公民身份和地址/姓名材料由 Driver Service Bureau 处理。DSB 首页、Required Documents、Renew Driver License / ID、Identification Cards 和 Non-U.S. Citizen 页面是核心入口。',
    realIdSummary:
      'Mississippi REAL ID / compliant license 的高频材料是 original birth certificate 或其他 acceptable identity document、SSN card 或显示完整 9 位 SSN 的官方文件、两份 Mississippi residency，以及姓名变化法律文件。',
    licenseSummary:
      '续期时，如果 license / ID 过期未超过 60 个月，官方 renewal 页面说明通常不要求文件；超过 60 个月则要重新带 birth certificate、SSN 和两份 residency，且 driver license 还要重新参加 knowledge exam。',
    appointmentNote:
      'Driver Service Bureau 强烈建议预约。Mississippi residency 文件必须显示申请人姓名和 Mississippi residence address；P.O. Box、不请自来的 junk mail、信封、手写文件/信件不接受。',
    editorNotes: [
      'Mississippi 的 60 months renewal rule 很具体，页面要避免只写“续期带材料”。',
      'Residency 页面明确 no P.O. boxes、no junk mail、no envelopes、no handwritten letters，是防止白跑的重点。',
      'SSN 要 SSN card 或官方 correspondence 显示 full 9 digits，不能只写“提供 SSN”。',
    ],
    documentHighlights: [
      'Original Birth Certificate 或其他 acceptable identity document；DSB 页面明确 No Photocopies Accepted。',
      'SSN Card 或官方政府 correspondence，显示完整 9 位 SSN。',
      '两份 Mississippi residency，显示本人姓名和 Mississippi residence address。',
      '姓名变化时带 marriage license、divorce decree、adoption order 或 court order。',
      '非美国公民还要带 I-94、valid visa、resident alien card 等 official immigration papers（如适用）。',
    ],
    commonMistakes: [
      '地址证明用 P.O. Box、信封、junk mail 或手写信。',
      'license 过期超过 60 个月还按普通续期准备。',
      'SSN 文件只显示后四位。',
      '姓名变化只带普通复印件或非法律文件。',
    ],
    recommendedSteps: [
      '先看 Required Documents，把 identity、SSN、two residency、name change 分组。',
      '续期先看 Renew Driver License / ID，确认是否超过 60 个月。',
      '需要 ID card 或非公民 credential 时分别看 Identification Cards 或 Non-U.S. Citizen 页面。',
      '地址证明逐项排除 P.O. Box、junk mail、envelopes 和 handwritten documents。',
      '最后从 DSB 首页预约或选择 Driver Service location。',
    ],
    actionLinks: [
      {
        label: 'Mississippi Driver Service Bureau',
        url: 'https://www.driverservicebureau.dps.ms.gov/',
        description: '预约、线上续期、地点和 Driver Service 总入口。',
      },
      {
        label: 'Required Documents',
        url: 'https://www.driverservicebureau.dps.ms.gov/node/303',
        description: 'Mississippi residency、姓名变化和材料要求。',
      },
      {
        label: 'Renew Driver License / ID',
        url: 'https://www.driverservicebureau.dps.ms.gov/node/298',
        description: '续期材料、60 个月过期规则和预约提醒。',
      },
      {
        label: 'Identification Cards',
        url: 'https://www.driverservicebureau.dps.ms.gov/Drivers/Identification_Cards',
        description: 'State ID 申请材料。',
      },
      {
        label: 'Non-U.S. Citizen Information',
        url: 'https://www.driverservicebureau.dps.ms.gov/Drivers/Non_Citizen',
        description: '非美国公民驾照/ID 材料。',
      },
    ],
    sources: [
      {
        label: 'Mississippi Driver Service Bureau',
        url: 'https://www.driverservicebureau.dps.ms.gov/',
      },
      {
        label: 'Mississippi Required Documents',
        url: 'https://www.driverservicebureau.dps.ms.gov/node/303',
      },
      {
        label: 'Mississippi Renew Driver License / ID',
        url: 'https://www.driverservicebureau.dps.ms.gov/node/298',
      },
      {
        label: 'Mississippi Identification Cards',
        url: 'https://www.driverservicebureau.dps.ms.gov/Drivers/Identification_Cards',
      },
      {
        label: 'Mississippi Non-U.S. Citizen Information',
        url: 'https://www.driverservicebureau.dps.ms.gov/Drivers/Non_Citizen',
      },
    ],
    relatedTopicSlugs: ['document-checklist', 'renewal-replacement-address', 'name-change-chain'],
  },
  {
    id: 'montana',
    abbr: 'MT',
    nameEn: 'Montana',
    nameZh: '蒙大拿州',
    agency: 'Montana Motor Vehicle Division',
    agencyUrl: 'https://mvdmt.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '蒙大拿州驾照、REAL ID、续期、补证、地址变化和新居民换证由 Montana Motor Vehicle Division 管理。MVD 官方入口包括 REAL ID、Required Documents、Renew License / ID、Address Change 和 Drivers New to Montana。',
    realIdSummary:
      'Montana REAL ID 要证明 name/date of birth/authorized presence、Montana residency 和适用时的 name change。官方 REAL ID 页面和 checklist 要求两份 Montana residency；P.O. Box 不接受，文件要显示 physical address。',
    licenseSummary:
      'Montana 支持部分 online renewal，但要满足资格，例如 U.S. citizen、处于 renewal timeframe 等。地址变化可提交 Change of Driver License Address - Electronic Record 表更新 MVD 记录；如要新卡显示新地址，则要办理 replacement 或 renewal。',
    appointmentNote:
      'Montana REAL ID 和首次文件核验通常需要现场办理；续期、补证和地址变化则先查看 online eligibility、预约系统和具体办公室服务。',
    editorNotes: [
      'Montana 2026 REAL ID checklist 是当前来源；链接审计 403 但搜索索引能确认内容，应标 watch 而非删除。',
      'Address change record update 与重新制卡是两件事，中文页要分开解释。',
      'MVD Express 是第三方承办/便利服务，本站应优先引用 mvdmt.gov 官方来源。',
    ],
    accessStatus: {
      label: '官方页自动检查 403',
      tone: 'watch',
      note: 'Montana MVD 官方页面在本环境自动检查中返回 403。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录或 Montana DOJ / MVD 官方入口重新进入。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      '一份证明 name、date of birth 和 authorized presence 的文件，例如 certified birth certificate、valid passport、certificate of citizenship 或 naturalization。',
      '两份 Montana residency，显示本人姓名和 physical address；P.O. Box 不接受。',
      '姓名变化时每次变化都准备 certified marriage、divorce、court order 或等效法律文件。',
      '续期或补证前确认是否符合 online renewal / replacement 条件。',
      '地址变化可先更新 MVD electronic record；想让新地址印在卡面上还要申请新 credential。',
    ],
    commonMistakes: [
      '把 P.O. Box 当作 Montana residency。',
      '用第三方 MVD Express 页面替代州官方要求。',
      '只更新地址记录，却以为卡面地址也会自动变。',
      'online renewal 前没确认自己是否在 renewal timeframe 或是否符合 U.S. citizen 等资格。',
    ],
    recommendedSteps: [
      '先看 Montana REAL ID 页面和 2026 checklist，确认材料类别。',
      '按 authorized presence、two Montana residency、name change 三组准备文件。',
      '续期先看 Renew License / ID，确认 online、mail 或 in-person 路径。',
      '新居民先看 Drivers New to Montana，确认 vision/health evaluation 和外州 license 转入。',
      '地址变化先看 Address Change 页面，决定只更新记录还是申请新卡。',
    ],
    actionLinks: [
      {
        label: 'Montana REAL ID',
        url: 'https://mvdmt.gov/real-id/',
        description: 'Montana REAL ID 用途、材料和办理入口。',
      },
      {
        label: 'Montana REAL ID Checklist PDF',
        url: 'https://mvdmt.gov/wp-content/uploads/2026/04/MT-REAL-ID-Checklist-20-0060-2026.pdf',
        description: '2026 Montana REAL ID checklist。',
      },
      {
        label: 'Required Documents',
        url: 'https://mvdmt.gov/required-documents/',
        description: 'Montana driver license / ID 所需文件。',
      },
      {
        label: 'Renew License / ID',
        url: 'https://mvdmt.gov/renew-license-id/',
        description: '续期和 online renewal 资格说明。',
      },
      {
        label: 'Address Change',
        url: 'https://mvdmt.gov/address-change/',
        description: 'Montana driver license 地址记录更新说明。',
      },
    ],
    sources: [
      {
        label: 'Montana MVD REAL ID',
        url: 'https://mvdmt.gov/real-id/',
      },
      {
        label: 'Montana REAL ID Checklist',
        url: 'https://mvdmt.gov/wp-content/uploads/2026/04/MT-REAL-ID-Checklist-20-0060-2026.pdf',
      },
      {
        label: 'Montana Required Documents',
        url: 'https://mvdmt.gov/required-documents/',
      },
      {
        label: 'Montana Renew License / ID',
        url: 'https://mvdmt.gov/renew-license-id/',
      },
      {
        label: 'Montana Address Change',
        url: 'https://mvdmt.gov/address-change/',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'proof-of-residency', 'renewal-replacement-address'],
  },
  {
    id: 'nebraska',
    abbr: 'NE',
    nameEn: 'Nebraska',
    nameZh: '内布拉斯加州',
    agency: 'Nebraska Department of Motor Vehicles',
    agencyUrl: 'https://dmv.nebraska.gov/driver-license',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '内布拉斯加州驾照、REAL ID、续期、地址变化和新居民换证由 Nebraska DMV Driver Licensing 处理。Driver License、Document Verification Requirements、New Resident、Renewals 和 Change Address 是核心入口。',
    realIdSummary:
      'Nebraska 初次申请或外州文件转入时，需要一次性提供 U.S. citizenship 或 lawful status、identity、两份 Nebraska principal address，以及可由 SSA 核验的 valid Social Security number 或豁免证明。',
    licenseSummary:
      'Nebraska 新居民持有效外州 license 时，需要在 30 天内取得 Nebraska license。续期或地址变化时，如果地址未曾验证或已经搬家，通常要提供两份 proof of address。',
    appointmentNote:
      'Nebraska DMV 多个页面都把 Data Form、Acceptable Proof of Identification、Identification / Address Verification Requirements 串在一起。出发前先把表格和地址文件准备好，现场还会拍新照片，并可能要 vision / medical requirements。',
    editorNotes: [
      'Nebraska 的 one-time citizenship proof 适合解释成“首次或外州转入时做一次身份/合法状态建档”。',
      '新居民 30 天换证规则要写进搬州路径。',
      '地址变化/续期时的两份地址证明是条件触发：地址未验证或已搬家时需要。',
    ],
    documentHighlights: [
      'Proof of U.S. citizenship 或 lawful status，包含姓名、出生日期和 identity。',
      '两份 Nebraska principal address / proof of address。',
      'Valid Social Security number，可由 Social Security Administration 核验；不能提供时按 I-94 / I-94A 豁免路径。',
      '姓名变化时带 certified marriage license、certified divorce decree 或 court order，把旧名和当前名连接起来。',
      '续期、replacement 或地址变化时准备 data form，并确认是否需要 vision / medical requirements。',
    ],
    commonMistakes: [
      '搬来 Nebraska 超过 30 天还没换本州 license。',
      '地址变化时只带一份地址证明。',
      '认为以前在别州提供过 citizenship proof，Nebraska 就一定不用再看。',
      '姓名变化文件无法把两个名字连接起来。',
    ],
    recommendedSteps: [
      '先看 Driver License 页面，确认是初次、外州转入、续期还是地址变化。',
      '新居民先看 New Nebraska Resident Driver Licensing，按 30 天规则安排。',
      '用 Document Verification Requirements 核对 citizenship/lawful status、address、SSN。',
      '续期或地址变化先看 Renewals / Change Address，确认是否需要两份 proof of address。',
      '到 Driver Licensing Office 前准备 data form、费用和可能的 vision/medical requirement。',
    ],
    actionLinks: [
      {
        label: 'Nebraska Driver License',
        url: 'https://dmv.nebraska.gov/dl/driver-license',
        description: 'Class O driver license、材料和新居民 30 天要求。',
      },
      {
        label: 'Document Verification Requirements',
        url: 'https://dmv.nebraska.gov/dl/document-verification-requirements',
        description: 'Nebraska identity、citizenship/lawful status、address 和 SSN 核验。',
      },
      {
        label: 'New Nebraska Resident',
        url: 'https://dmv.nebraska.gov/dl/new-nebraska-resident-drivers-licensing',
        description: '外州搬入 Nebraska 后换证材料。',
      },
      {
        label: 'Nebraska Renewals',
        url: 'https://dmv.nebraska.gov/dl/renewals',
        description: '续期材料、地址证明和 vision / medical requirement。',
      },
      {
        label: 'Change of Address',
        url: 'https://dmv.nebraska.gov/dl/change-address',
        description: '驾照、permit 和 state ID 地址变化说明。',
      },
    ],
    sources: [
      {
        label: 'Nebraska Driver License',
        url: 'https://dmv.nebraska.gov/dl/driver-license',
      },
      {
        label: 'Nebraska Document Verification Requirements',
        url: 'https://dmv.nebraska.gov/dl/document-verification-requirements',
      },
      {
        label: 'Nebraska New Resident Driver Licensing',
        url: 'https://dmv.nebraska.gov/dl/new-nebraska-resident-drivers-licensing',
      },
      {
        label: 'Nebraska Renewals',
        url: 'https://dmv.nebraska.gov/dl/renewals',
      },
      {
        label: 'Nebraska Change of Address',
        url: 'https://dmv.nebraska.gov/dl/change-address',
      },
    ],
    relatedTopicSlugs: ['moving-to-new-state', 'document-checklist', 'proof-of-residency'],
  },
  {
    id: 'north-dakota',
    abbr: 'ND',
    nameEn: 'North Dakota',
    nameZh: '北达科他州',
    agency: 'North Dakota Department of Transportation',
    agencyUrl: 'https://www.dot.nd.gov/driver',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '北达科他州驾照、REAL ID、续期、外州转入和姓名/地址变化由 NDDOT Driver License 处理。REAL ID Information、Real ID Checklist PDF、Requirements Transferring License、Driver License 和 Driver License Renewal 是核心入口。',
    realIdSummary:
      'North Dakota REAL ID 要从四类文件中准备：proof of identification / legal presence、proof of name change、proof of Social Security Number、proof of North Dakota residence address。所有关键文件必须是 original 或 certified copies，photocopies 不接受。',
    licenseSummary:
      'North Dakota address / name change 页面要求姓名变化必须本人带 certified documentation 到 Driver License site；普通地址变化可在线处理。REAL ID 初次文件、duplicate 或转入时要按 REAL ID documentation 准备。',
    appointmentNote:
      'NDDOT 页面提示不少 driver license services 需要 appointment。REAL ID residence documents 必须显示本人姓名和 current physical residence address，Post Office Boxes 不接受。',
    editorNotes: [
      'ND REAL ID 页面结构清晰，四类材料可以直接转成中文清单。',
      'Transfer 页面注明非 REAL ID 转入时地址证明数量可能不同，但 REAL ID 需要 SSN proof 和两份地址证明，中文页应按 REAL ID 路径保守提醒。',
      'Name change 必须 in person，适合放进 common mistakes。',
    ],
    documentHighlights: [
      'Category 1: proof of identification、date of birth 和 legal presence，例如 certified birth certificate、passport、permanent resident card 等。',
      'Category 2: name change documents，例如 certified marriage certificate、adoption document 或 sealed court order。',
      'Category 3: full Social Security number proof，例如 SSN card、W-2、SSA-1099、1099 或 pay stub。',
      'Category 4: 两份 North Dakota residence address，显示 physical address；P.O. Box 不接受。',
      '外州转入或 duplicate 时，按 NDDOT transfer / replacement 页面确认是否必须去 Driver License Site。',
    ],
    commonMistakes: [
      '带 photocopy 或 hospital certificate 当作 identity document。',
      'SSN 文件只显示后四位。',
      '居住证明使用 P.O. Box。',
      '姓名变化想在线处理，而不是带 certified documents 到现场。',
    ],
    recommendedSteps: [
      '先打开 NDDOT REAL ID Information，按 Category 1-4 列材料。',
      '下载 REAL ID Checklist PDF 做逐项打勾。',
      '外州转入先看 Requirements Transferring License，确认 address 和 SSN 文件。',
      '续期先看 Driver License Renewal，确认 online / in-person 和 CDL 特殊文件。',
      '姓名变化先看 Driver License 页面，准备 certified marriage、divorce 或 court order。',
    ],
    actionLinks: [
      {
        label: 'NDDOT REAL ID Information',
        url: 'https://www.dot.nd.gov/driver/real-id-information',
        description: 'North Dakota REAL ID 四类材料和办理说明。',
      },
      {
        label: 'North Dakota REAL ID Checklist PDF',
        url: 'https://www.dot.nd.gov/sites/www/files/documents/Drivers%20-%20documents/real-id-checklist.pdf',
        description: 'REAL ID checklist PDF。',
      },
      {
        label: 'Requirements Transferring License',
        url: 'https://www.dot.nd.gov/driver/requirements-transferring-license',
        description: '外州 license 转入 North Dakota 的要求。',
      },
      {
        label: 'NDDOT Driver License',
        url: 'https://www.dot.nd.gov/driver/driver-license',
        description: '姓名/地址变化和 Driver License 总入口。',
      },
      {
        label: 'Driver License Renewal',
        url: 'https://www.dot.nd.gov/driver/online-services-drivers/driver-license-renewal',
        description: '续期和在线服务说明。',
      },
    ],
    sources: [
      {
        label: 'NDDOT REAL ID Information',
        url: 'https://www.dot.nd.gov/driver/real-id-information',
      },
      {
        label: 'North Dakota REAL ID Checklist PDF',
        url: 'https://www.dot.nd.gov/sites/www/files/documents/Drivers%20-%20documents/real-id-checklist.pdf',
      },
      {
        label: 'NDDOT Requirements Transferring License',
        url: 'https://www.dot.nd.gov/driver/requirements-transferring-license',
      },
      {
        label: 'NDDOT Driver License',
        url: 'https://www.dot.nd.gov/driver/driver-license',
      },
      {
        label: 'NDDOT Driver License Renewal',
        url: 'https://www.dot.nd.gov/driver/online-services-drivers/driver-license-renewal',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'document-checklist', 'moving-to-new-state'],
  },
  {
    id: 'south-dakota',
    abbr: 'SD',
    nameEn: 'South Dakota',
    nameZh: '南达科他州',
    agency: 'South Dakota Department of Public Safety',
    agencyUrl: 'https://www.sd.gov/dps',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '南达科他州驾照、REAL ID、续期、补证、地址更新和预约由 South Dakota DPS / SD.gov 处理。Required Documents、Renew or Replace Online、Appointment Information 和 Applications and Forms 是核心入口。',
    realIdSummary:
      'South Dakota required documents 页面把申请人分为三类：new drivers / new residents、out-of-state transfers with REAL ID compliant licenses、current South Dakota REAL ID holders。新申请或新居民通常要 identity、SSN、两份 South Dakota physical address；多次姓名变化要每一次都能追溯。',
    licenseSummary:
      '在线 renew / replace 要满足条件：通常要 U.S. citizen 或 permanent resident、当前持有未过期 federally compliant card、提供 DL/ID number、DOB、SSN 后四位，并提交两份姓名和 physical address 文件。姓名变化、十年内未现场办理、测试要求等要去 exam station。',
    appointmentNote:
      'South Dakota 对 full-time traveler / personal mailbox 用户有特殊材料要求：需要过去一年在 South Dakota overnight stay receipt、PMB 地址邮件或收据，以及 Residency Affidavit；virtual address 不接受。',
    editorNotes: [
      'South Dakota 的 full-time traveler / PMB 规则很独特，页面要单独写出来。',
      'Required documents 页面按 Section 1/2/3 分流，中文页要避免把三类申请人混在一起。',
      'Online renewal 页面有很多排除项：十年内未 in-person、name change、class/endorsement change、USCIS status 更新等。',
    ],
    documentHighlights: [
      '新申请/新居民：one identity document、one Social Security document、two proofs of South Dakota physical address。',
      '多次姓名变化时，要提供每一次 name change 文件，让 DMV 能从 birth certificate 追到当前姓名。',
      '当前 South Dakota REAL ID 持有人续期或补证：通常也要 identity document 和两份 address proofs。',
      'Online renewal / replacement：两份地址文件要显示姓名和 physical address，通常要 less than one year old。',
      'Full-time traveler / PMB 用户还要 overnight stay receipt、PMB address proof 和 Residency Affidavit。',
    ],
    commonMistakes: [
      '用 virtual address 或普通 PMB 当作完整居住证明。',
      '在线续期时没准备两份地址文件。',
      '姓名变化后仍尝试 online renewal。',
      'license 过期超过 30 天，还以为可以不用 knowledge test 或现场办理。',
    ],
    recommendedSteps: [
      '先用 Required Documents 页面判断你属于 Section 1、Section 2 还是 Section 3。',
      '按 identity、SSN、two physical address、name change chain 准备材料。',
      '如果是 full-time traveler 或 PMB 用户，先准备 overnight stay receipt 和 Residency Affidavit。',
      '续期或补证先看 Renew / Replace Online，确认是否符合线上资格。',
      '需要现场办理时看 Appointment Information，预约或选择 Driver License Exam Location。',
    ],
    actionLinks: [
      {
        label: 'South Dakota Required Documents',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0044395',
        description: 'REAL ID / driver license required documents 分区清单。',
      },
      {
        label: 'Renew or Replace Online',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043275',
        description: '在线续期、补证、地址文件和排除条件。',
      },
      {
        label: 'Appointment Information',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043548',
        description: 'Driver exam station 预约、现场办理和 testing 说明。',
      },
      {
        label: 'Applications and Forms',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043707',
        description: '申请表、renew/replace/update address 和表格入口。',
      },
      {
        label: 'South Dakota DPS',
        url: 'https://www.sd.gov/dps',
        description: 'DPS driver licensing 服务总入口。',
      },
    ],
    sources: [
      {
        label: 'South Dakota Required Documents',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0044395',
      },
      {
        label: 'South Dakota Renew or Replace Online',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043275',
      },
      {
        label: 'South Dakota Appointment Information',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043548',
      },
      {
        label: 'South Dakota Applications and Forms',
        url: 'https://www.sd.gov/dps?id=kb_article_view&sysparm_article=KB0043707',
      },
      {
        label: 'South Dakota DPS',
        url: 'https://www.sd.gov/dps',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'proof-of-residency', 'renewal-replacement-address'],
  },
  {
    id: 'vermont',
    abbr: 'VT',
    nameEn: 'Vermont',
    nameZh: '佛蒙特州',
    agency: 'Vermont Department of Motor Vehicles',
    agencyUrl: 'https://dmv.vermont.gov/',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '佛蒙特州驾照、REAL ID、Enhanced Driver License、续期、外州转入和地址变化由 Vermont DMV 管理。Vermont 是少数同时有 REAL ID 和 Enhanced Driver License / ID 路径的州，旅行用户要先判断自己需要哪一种。',
    realIdSummary:
      'Vermont REAL ID 通常要原件或 certified proof documents，包括 proof of identity、lawful presence、Social Security number 和两份 Vermont residency。Enhanced Driver License / ID 可用于部分陆路/海路边境场景，但不是护照替代所有国际旅行。',
    licenseSummary:
      '搬入 Vermont 后，持有效外州 license 的驾驶人通常要在 60 天内取得 Vermont license；CDL 转入通常有更短要求。续期、转入、地址变化和 Enhanced / REAL ID 要分别看 DMV 页面和 appointment / mail / online 选项。',
    appointmentNote:
      'Vermont REAL ID、EDL、普通续期和外州转入使用不同表格与入口；办理前确认业务类型、当前表格、付款方式和是否需要预约。',
    editorNotes: [
      'Vermont 的 EDL/EID 与 REAL ID 容易被混淆，中文页要先做用途分流。',
      '搜索索引能确认 REAL ID 材料类别，但官方页自动检查 403，应保留 accessStatus。',
      'Vermont 新居民 60 天换证规则来自 DMV license/general info 线索，页面用“通常”表达并引导官方确认。',
    ],
    accessStatus: {
      label: '官方页自动检查 403',
      tone: 'watch',
      note: 'Vermont DMV 官方页面在本环境自动检查中返回 403。本站保留官方链接；如果你也打不开，请从 USA.gov 州机动车服务目录进入 Vermont DMV。',
      fallbackLabel: 'USA.gov 州机动车服务目录',
      fallbackUrl: 'https://www.usa.gov/state-motor-vehicle-services',
    },
    documentHighlights: [
      'Proof of identity，例如 valid passport 或 official / certified birth certificate。',
      'Proof of lawful presence，按 Vermont DMV REAL ID 页面确认类别。',
      'Social Security number 证明，例如 SSN card 或显示 SSN 的税务/工资文件。',
      '两份 Vermont residency，显示姓名和 Vermont street address，而不是单纯 P.O. Box。',
      'Enhanced Driver License / ID 可能要额外申请、面谈或公民身份材料，先看 EDL 页面。',
    ],
    commonMistakes: [
      '把 REAL ID 和 Enhanced Driver License 当成同一件事。',
      '搬入 Vermont 后超过 60 天才处理外州 license transfer。',
      '只带当前 license 和 passport，忘记两份 Vermont residency。',
      '用临时纸质 credential 或 EDL 替代国际旅行护照。',
    ],
    recommendedSteps: [
      '先判断用途：国内航班/联邦设施看 REAL ID；加拿大等陆路/海路边境场景再看 EDL。',
      '打开 Vermont REAL ID 页面，核对 identity、lawful presence、SSN、two residency。',
      '外州搬入看 transfer 页面，按 60 天规则安排。',
      '续期先看 renew 页面，确认 online、mail 或 in-person 资格。',
      '地址变化看 change-address 页面，处理 DMV 记录和必要的新卡。',
    ],
    actionLinks: [
      {
        label: 'Vermont REAL ID',
        url: 'https://dmv.vermont.gov/licenses/types-of-licenses-ids/real-id',
        description: 'Vermont REAL ID 用途、材料和办理入口。',
      },
      {
        label: 'Enhanced Driver License / ID',
        url: 'https://dmv.vermont.gov/licenses/types-of-licenses-ids/enhanced-drivers-license-edl',
        description: 'Vermont Enhanced Driver License / ID 说明。',
      },
      {
        label: 'New Vermont License',
        url: 'https://dmv.vermont.gov/licenses/new',
        description: '新申请或外州转入 Vermont license 入口。',
      },
      {
        label: 'Renew License',
        url: 'https://dmv.vermont.gov/licenses/renew',
        description: 'Vermont license 续期说明。',
      },
      {
        label: 'Vermont myDMV Update My Address',
        url: 'https://mydmv.vermont.gov/?Check=1',
        description: 'Vermont myDMV 地址更新和线上服务入口。',
      },
    ],
    sources: [
      {
        label: 'Vermont DMV REAL ID',
        url: 'https://dmv.vermont.gov/licenses/types-of-licenses-ids/real-id',
      },
      {
        label: 'Vermont DMV Enhanced Driver License',
        url: 'https://dmv.vermont.gov/licenses/types-of-licenses-ids/enhanced-drivers-license-edl',
      },
      {
        label: 'Vermont DMV New License',
        url: 'https://dmv.vermont.gov/licenses/new',
      },
      {
        label: 'Vermont DMV Renew License',
        url: 'https://dmv.vermont.gov/licenses/renew',
      },
      {
        label: 'Vermont myDMV Update My Address',
        url: 'https://mydmv.vermont.gov/?Check=1',
      },
    ],
    relatedTopicSlugs: ['real-id-vs-standard-license', 'moving-to-new-state', 'airport-travel-after-real-id'],
  },
  {
    id: 'west-virginia',
    abbr: 'WV',
    nameEn: 'West Virginia',
    nameZh: '西弗吉尼亚州',
    agency: 'West Virginia Division of Motor Vehicles',
    agencyUrl: 'https://transportation.wv.gov/DMV/Pages/default.aspx',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '西弗吉尼亚州驾照、REAL ID、续期、地址变化和 HeadStart 由 WV Division of Motor Vehicles 处理。REAL ID、Driver Licenses / ID Cards、Renewal、Skip the Trip 和 REAL ID brochure 是核心入口。',
    realIdSummary:
      'West Virginia REAL ID / For Federal Use card 要到 Regional Office 带 proof of identity、proof of Social Security Number、两份 physical residency；如果姓名和 identity document 不一致，要带 name change documents 建立 link。',
    licenseSummary:
      'WV online renewal 可以处理部分 driver license / state ID，但不能在线把 Not for Federal Use 升级为 For Federal Use / REAL ID。升级 REAL ID 要预约 regional office；REAL ID HeadStart 可先上传材料，减少现场时间。',
    appointmentNote:
      'WV DMV 官方页面提示 appointments strongly encouraged。首次申请人或需要 REAL ID re-enrollment 的用户要按 brochure 准备 identity、two residency、legal name change 等文件。',
    editorNotes: [
      'West Virginia 不能在 online renewal 中升级 REAL ID；需要升级时应改走官方现场办理路径。',
      'REAL ID HeadStart 是高价值入口，可帮助用户先上传材料但不是完全在线拿卡。',
      'WV 对 For Federal Use 有额外 $10 processing/shipping fee 的页面线索，但费用容易变，中文页不硬写金额。',
    ],
    documentHighlights: [
      'Proof of identity，例如 birth certificate、passport 或 WV DMV 列出的身份文件。',
      'Proof of Social Security Number；WV appointment document 页面提示 know your number or bring proof。',
      '两份 West Virginia physical residency，显示姓名和 physical address。',
      '姓名变化时带 marriage、divorce、court order 等 documents，DMV 必须能建立所有 name changes 的 link。',
      '外州转入还要带 previous state driver license 或 driving record。',
    ],
    commonMistakes: [
      '想在线把 Not for Federal Use 升级成 REAL ID。',
      '只上传 HeadStart 文件，以为不用去 regional office。',
      '地址变化或姓名变化时没有准备两份 WV residence 或 name-change documents。',
      '外州转入忘记带旧 license 或 driving record。',
    ],
    recommendedSteps: [
      '先看 WV REAL ID 页面，判断是否需要 For Federal Use card。',
      '用 Driver Licenses / ID Cards 或 brochure 核对 identity、SSN、two residency、name changes。',
      '想节省现场时间时先用 REAL ID HeadStart 上传材料。',
      '续期先看 Online Renewal，确认是否能 online；REAL ID upgrade 直接预约 Regional Office。',
      '外州转入按 appointment documents 准备 previous license / driving record。',
    ],
    actionLinks: [
      {
        label: 'WV REAL ID',
        url: 'https://transportation.wv.gov/DMV/realid/Pages/default.aspx',
        description: 'REAL ID / For Federal Use 说明和材料类别。',
      },
      {
        label: 'Driver Licenses and ID Cards',
        url: 'https://transportation.wv.gov/DMV/drivers-licenses/Pages/default.aspx',
        description: 'WV license / ID 材料要求。',
      },
      {
        label: 'Online Renewal',
        url: 'https://apps.wv.gov/dmv/selfservice/dl',
        description: '在线续期和 REAL ID upgrade 限制。',
      },
      {
        label: 'WV DMV Skip the Trip',
        url: 'https://go.wv.gov/selfservice',
        description: '续期、REAL ID HeadStart、地址变化和自助服务入口。',
      },
      {
        label: 'WV REAL ID Brochure PDF',
        url: 'https://transportation.wv.gov/DMV/DMVFormSearch/Drivers_Licenses_REAL_ID_cards_brochure.pdf',
        description: 'West Virginia driver license / ID card requirements brochure。',
      },
    ],
    sources: [
      {
        label: 'WV DMV REAL ID',
        url: 'https://transportation.wv.gov/DMV/realid/Pages/default.aspx',
      },
      {
        label: 'WV Driver Licenses and ID Cards',
        url: 'https://transportation.wv.gov/DMV/drivers-licenses/Pages/default.aspx',
      },
      {
        label: 'WV Online Renewal',
        url: 'https://apps.wv.gov/dmv/selfservice/dl',
      },
      {
        label: 'WV DMV Skip the Trip',
        url: 'https://go.wv.gov/selfservice',
      },
      {
        label: 'WV REAL ID Brochure',
        url: 'https://transportation.wv.gov/DMV/DMVFormSearch/Drivers_Licenses_REAL_ID_cards_brochure.pdf',
      },
    ],
    relatedTopicSlugs: ['real-id-basics', 'renewal-replacement-address', 'moving-to-new-state'],
  },
  {
    id: 'wyoming',
    abbr: 'WY',
    nameEn: 'Wyoming',
    nameZh: '怀俄明州',
    agency: 'Wyoming Department of Transportation',
    agencyUrl: 'https://www.dot.state.wy.us/driverservices',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-09',
    summary:
      '怀俄明州驾照、REAL ID、续期、地址变化和 oneWYO 线上服务由 Wyoming DOT Driver Services 处理。Driver License、Lost / Renewal、Add / Change Information、General Forms 和 Driver Services 是核心入口。',
    realIdSummary:
      'Wyoming 自 2011 年起签发的 driver license / ID 规则已符合 REAL ID。续期时如果之前未提供 REAL ID documents，需要带 valid U.S. passport、state-certified birth certificate 或 immigration documents、两份 45 天内 Wyoming residency、以及姓名变化文件。',
    licenseSummary:
      'Wyoming 新居民通常在建立 residency 后一年内取得 Wyoming license；但若持有某些州 license 或 CDL，建立 residency 后要申请 Wyoming license。每 10 年必须本人到场续期一次并拍照、做 vision screening。',
    appointmentNote:
      'oneWYO 可以处理部分续期、duplicate、地址更新、driving record 和医疗/视力表上传。地址变化表只更新 driving record；如果要新地址出现在 driver license / ID card 上，需要申请新 credential。',
    editorNotes: [
      'Wyoming 的“一年内换证”和“某些州/CDL 例外”很独特，要写得谨慎。',
      'Residency proof no more than 45 days old 是非常具体的要求。',
      'Address change form does not print a new card，是常见误区。',
    ],
    documentHighlights: [
      'Valid U.S. passport、state-certified birth certificate 或 immigration documents。',
      '两份 current Wyoming residency，通常 no more than 45 days old。',
      '姓名变化时带 marriage certificate、divorce decree、court order 等文件。',
      '非美国公民每次 renewal 或服务通常要出示 USCIS / immigration documents。',
      '地址变化表只更新记录；想要卡面显示新地址需办理新 license / ID。',
    ],
    commonMistakes: [
      '用超过 45 天的地址证明去办 Wyoming REAL ID renewal。',
      '更新 address record 后，以为卡面地址也自动改变。',
      '十年内必须本人续期一次，却一直尝试 mail / online renewal。',
      '新居民持特殊州 license 或 CDL 时没有及时转 Wyoming license。',
    ],
    recommendedSteps: [
      '先看 Wyoming Driver License 页面，确认新居民、续期还是 oneWYO 在线服务。',
      '续期前看 Lost / Renewal 页面，确认是否需要重新提交 REAL ID documents。',
      '准备 identity/immigration、two Wyoming residency within 45 days、name change documents。',
      '地址变化先看 Add / Change Information 和 Notice of Change of Address form。',
      '需要线上办理时用 oneWYO；需要首次或过期 renewal 时安排 local driver exam station。',
    ],
    actionLinks: [
      {
        label: 'Wyoming Driver License',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/driver-license.html',
        description: 'Wyoming license、新居民、oneWYO 和 REAL ID 说明。',
      },
      {
        label: 'Lost / Renewal',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/driver-license/lost--renewal.html',
        description: '续期、REAL ID documents、10 年本人到场和 vision screening。',
      },
      {
        label: 'Add / Change Information',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/add_or_change_information.html',
        description: 'oneWYO、地址和信息变化说明。',
      },
      {
        label: 'Notice of Change of Address PDF',
        url: 'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/Forms/Address%20Change%2020190715.pdf',
        description: '地址变化表；只更新 record，不自动换卡。',
      },
      {
        label: 'Driver Services',
        url: 'https://www.dot.state.wy.us/driverservices',
        description: 'Wyoming DOT Driver Services 总入口。',
      },
    ],
    sources: [
      {
        label: 'Wyoming Driver License',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/driver-license.html',
      },
      {
        label: 'Wyoming Lost / Renewal',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/driver-license/lost--renewal.html',
      },
      {
        label: 'Wyoming Add / Change Information',
        url: 'https://www.dot.state.wy.us/home/driver_license_records/add_or_change_information.html',
      },
      {
        label: 'Wyoming Notice of Change of Address',
        url: 'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Driver_Services/Forms/Address%20Change%2020190715.pdf',
      },
      {
        label: 'Wyoming Driver Services',
        url: 'https://www.dot.state.wy.us/driverservices',
      },
    ],
    relatedTopicSlugs: ['renewal-replacement-address', 'moving-to-new-state', 'proof-of-residency'],
  },
];

export const topics: TopicGuide[] = [
  {
    slug: 'real-id-basics',
    title: 'REAL ID 到底要不要办',
    eyebrow: '联邦规则',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '先别急着预约。REAL ID 只解决州驾照/ID 的联邦身份用途；如果你有有效护照或其他 TSA 接受证件，很多场景可以先不升级。',
    whoNeedsIt: [
      '想用州驾照或州 ID 过美国国内航班 TSA 安检的人。',
      '需要进入某些联邦设施、军事基地或核电站的人。',
      '没有有效护照、护照卡、军人证等其他 TSA 接受证件的人。',
    ],
    keyFacts: [
      'REAL ID 是州驾照或州身份证达到联邦最低签发和安全标准后的合规版本，不是新的驾驶资格，也不会把 State ID 变成驾照。',
      '自 2025 年 5 月 7 日起，18 岁及以上旅客不能再把非 REAL ID 合规的州驾照/ID 单独用于 TSA 国内航班安检；有效护照等 TSA 接受证件仍可替代。',
      'REAL ID 是可选项。只开车、投票、看病、去邮局或领取联邦福利，并不会因为没有 REAL ID 就自动受阻；具体设施仍可有自己的进门规则。',
      '国际航空旅行仍通常需要护照；REAL ID 不能替代护照。临时纸质驾照也不在 TSA 的可接受证件清单内。',
      'USA.gov 2026 年 4 月更新说明：没有 REAL ID 或其他可接受证件的 18 岁及以上旅客，可提前支付 $45 使用 TSA ConfirmID；核验从出发日起有效 10 天。',
      '州政府决定申请路径和材料。即使联邦框架相同，各州对原件、SSN 核验、地址证明、姓名变更、费用和是否可线上预审的做法仍不同。',
    ],
    factChecks: [
      {
        claim: 'REAL ID 是州驾照或身份证的联邦安全标准，不会创造新的驾驶资格；州内驾驶权限仍由州证件规则决定。',
        sourceUrls: ['https://www.dhs.gov/real-id', 'https://www.usa.gov/real-id'],
      },
      {
        claim: '美国国内航班安检不只接受 REAL ID；有效护照、护照卡和 TSA 列出的其他证件也可以作为替代。',
        sourceUrls: ['https://www.tsa.gov/realid', 'https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: '自 2025 年 5 月 7 日起，TSA 不再接受非 REAL ID 合规的州驾照或州 ID 作为有效的州签发机场身份证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'REAL ID 并非驾驶、投票、看病、进入邮局或领取联邦福利的普遍前提。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id'],
      },
      {
        claim: '临时驾照不在 TSA 可接受身份证件清单内，纸质 temporary credential 不能默认用于登机。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'TSA 目前接受清单内证件在过期后最多两年，并通常不要求 18 岁以下儿童在美国境内旅行时向 TSA 出示身份证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'USA.gov 2026 年说明将 ConfirmID 列为没有可接受 ID 时的付费身份核验路径，费用为 $45，核验从出发日起有效 10 天。',
        sourceUrls: ['https://www.usa.gov/real-id'],
      },
      {
        claim: 'TSA ConfirmID 不会把普通州驾照升级成 REAL ID，也不能代替州 DMV 的申请和材料核验。',
        sourceUrls: ['https://www.usa.gov/real-id', 'https://www.dhs.gov/real-id'],
      },
      {
        claim: 'REAL ID 的申请过程和所需文件由各州决定，申请人应回到本州驾驶证签发机构核对。',
        sourceUrls: ['https://www.usa.gov/real-id', 'https://www.usa.gov/state-motor-vehicle-services'],
      },
      {
        claim: 'Texas 说明，没有星标的当前有效 Texas 驾照或 ID 仍可用于驾驶和非联邦身份用途。',
        sourceUrls: ['https://www.texas.gov/driver-services/texas-real-id/'],
      },
    ],
    checklist: [
      '先看卡面：有没有星标或本州说明的 REAL ID 合规标记。',
      '再看替代证件：你是否有有效护照、护照卡、军人证或 TSA 接受的其他 ID。',
      '如果你想用州驾照/ID 做联邦身份用途，再进入本州 DMV REAL ID 页面。',
      '按州官方清单准备身份、SSN、居住地址和姓名变更文件。',
      '临近出行却没有可接受 ID 时，直接查看 TSA/USA.gov 当前身份核验说明，不要把希望全押在 DMV 预约上。',
      '确认办理后何时收到实体卡；临时纸质驾照不能默认用于 TSA，出发前要保留护照等备用证件。',
    ],
    steps: [
      '第一步：先写用途。只开车、州内年龄/身份核验和国内航班，是三件不同的事。',
      '第二步：看现有证件。检查州驾照/ID 的合规标记，并确认护照、护照卡、绿卡或其他 TSA 接受证件是否仍有效。',
      '第三步：判断是否值得现在升级。有稳定替代证件、近期没有联邦身份用途的人，可以等正常续期；经常飞行的人通常更适合提前办。',
      '第四步：从 USA.gov 州目录进入本州 DMV，再使用该州 REAL ID document guide，不能拿其他州的清单照抄。',
      '第五步：核对实体卡交付时间和临时凭证限制。临近出行时，不要把办证预约当成一定能在航班前拿到卡。',
      '第六步：没有任何可接受证件且行程已迫近时，再把 TSA ConfirmID 或现场身份核验作为备选，并预留额外时间。',
    ],
    faqs: [
      {
        question: '没有 REAL ID 还能开车吗？',
        answer:
          '通常可以。REAL ID 主要影响联邦身份用途，不是驾驶资格本身；具体证件用途仍要看所在州 DMV 说明。',
      },
      {
        question: '有护照还需要 REAL ID 吗？',
        answer:
          '不一定。有效护照通常可用于 TSA 身份核验。REAL ID 的便利在于你可以用合规州驾照/ID 处理部分联邦身份用途。',
      },
      {
        question: 'TSA ConfirmID 是不是等于办了 REAL ID？',
        answer:
          '不是。USA.gov 把它描述为没有 REAL ID 或其他可接受证件时的付费 TSA 身份核验选项；目前费用为 $45、从出发日起有效 10 天。它不改变你的州驾照或 ID 是否 REAL ID 合规。',
      },
      {
        question: '孩子坐美国国内航班也必须办 REAL ID 吗？',
        answer:
          'TSA 通常不要求 18 岁以下儿童在美国境内旅行时出示身份证件，但航空公司可能有自己的未成年人、单独旅行或年龄证明要求。订票后仍要查看航空公司规则。',
      },
    ],
    editorNotes: [
      '这页只解释联邦用途，不判断个人是否必须办。有效护照、护照卡、军人证等 TSA 接受证件常可替代 REAL ID。',
      'REAL ID 不改变驾驶资格本身；没有 REAL ID 通常仍可开车，但不能把普通州证件用于相应联邦身份用途。',
      '具体材料和卡面标记由州 DMV 执行，纽约、华盛顿、佐治亚等州的名称和标记可能不同。',
      '2026-07-09 复核 USA.gov：该页最后更新为 2026-04-06，并加入 TSA ConfirmID 作为没有可接受 ID 时的身份核验选项。',
    ],
    sources: [
      ...federalSources,
      {
        label: 'PennDOT REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id',
      },
      {
        label: 'Texas.gov REAL ID',
        url: 'https://www.texas.gov/driver-services/texas-real-id/',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'michigan'],
  },
  {
    slug: 'real-id-vs-standard-license',
    title: 'REAL ID、Enhanced ID 和普通驾照怎么区分',
    eyebrow: '证件类型',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '选证件前先看用途，不要只看卡面名字。Standard、REAL ID 和 Enhanced Driver License/ID 都可能是州签发的驾照或身份证，但联邦身份用途、申请资格和边境用途不同。',
    whoNeedsIt: [
      '正在换证、续期或第一次申请驾照的人。',
      '看到 DMV 页面上有 Standard、REAL ID、Enhanced 多个选项的人。',
      '在纽约、华盛顿等提供 Enhanced 证件的州生活的人。',
    ],
    keyFacts: [
      'Standard driver license 的驾驶资格和联邦身份用途是两件事。普通驾照通常仍可用于开车，但自 2025 年 5 月 7 日起，非 REAL ID 合规的州驾照/ID 不能再单独作为 TSA 国内航班身份证件。',
      'REAL ID 不是一种驾驶等级，而是州驾照或州 ID 满足联邦最低签发和安全标准后的合规版本；driver license 才带驾驶资格，non-driver ID 不带驾驶资格。',
      '没有 REAL ID 不等于不能坐国内航班。有效护照、护照卡、绿卡、EAD、军人证和 TSA 列出的其他证件可能可以替代州 REAL ID。',
      'Enhanced Driver License/ID 只在部分州提供，通常要求美国公民身份和该州居住证明；不能因为某州有 Enhanced，就假设自己的州也有。',
      'Enhanced 既满足 REAL ID 联邦用途，又可按签发州说明用于从加拿大、墨西哥及部分加勒比地区经陆路或海路返回美国；它不能替代国际航空旅行所需的护照。',
      '卡面不一定都有星标。Washington 的 EDL/EID 用美国国旗标记，也是 REAL ID 合规证件；最稳妥的判断方式仍是查看签发州 DMV 的证件说明。',
      '对只开车、已有有效护照且没有近期联邦身份用途的人，Standard 可能已经够用；对经常国内飞行的人，REAL ID 或 Enhanced 通常更方便。',
    ],
    checklist: [
      '写下主要用途：只开车、州内 photo ID、国内航班、进入受管制联邦设施，还是陆路/海路跨境。',
      '打开所在州 DMV 的 card type / REAL ID 页面，确认该州提供 Standard、REAL ID、Enhanced 中的哪些选项。',
      '确认资格：Enhanced 常要求美国公民身份；REAL ID 要按州清单证明身份/合法身份、SSN 状态和居住地址。',
      '确认已有替代证件：护照、护照卡、绿卡、EAD、军人证或 trusted traveler card 是否仍有效。',
      '核对办理方式：从 Standard 升级到 REAL ID 或 Enhanced 通常涉及现场文件核验，普通续期未必需要同样流程。',
      '核对费用和有效期；Enhanced 可能有额外费用，提前续期也可能改变总费用或到期日。',
      '不要只凭星星、旗帜或卡面颜色判断，按签发州官方样卡和 TSA 接受证件清单复核。',
    ],
    steps: [
      '第一步：只问用途。只开车和州内证明身份，先看 Standard；想用州证件坐国内航班或处理联邦身份用途，再看 REAL ID / Enhanced。',
      '第二步：看替代证件。已有有效护照等 TSA 接受证件的人，不必为了某一次航班仓促升级州证件。',
      '第三步：看本州选项。Washington 以 EDL/EID 作为 REAL ID 合规州证件；New York 同时提供 Standard、REAL ID 和 Enhanced，其他州组合可能不同。',
      '第四步：看资格。非美国公民通常可按 lawful-status 规则申请 REAL ID，但通常不能申请要求美国公民身份的 Enhanced。',
      '第五步：用本州 document guide 整理身份、SSN、地址和姓名变更材料，再确认预约、费用、照片和旧证处理方式。',
      '第六步：办完后核对卡面类型，并在出行前再次查看 TSA 当前接受证件清单；临时纸质驾照不在 TSA 接受列表内。',
    ],
    faqs: [
      {
        question: 'Enhanced 一定比 REAL ID 更好吗？',
        answer:
          '不一定。Enhanced 可能有额外用途，也可能有更严格资格要求。对多数只关心国内航班的人，REAL ID 或护照已经足够。',
      },
      {
        question: 'Standard 证件会失效吗？',
        answer:
          '不会仅因为 REAL ID 执行而自动失去州内驾驶用途。限制的是相应联邦身份用途，例如不能把非合规州证件单独用于 TSA 国内航班安检；证件本身是否有效仍看卡面到期日和州 DMV 状态。',
      },
      {
        question: '没有 REAL ID，拿护照能坐美国国内航班吗？',
        answer:
          '通常可以。TSA 接受有效美国或外国护照，也列出护照卡、绿卡、EAD、军人证等其他证件。出发前仍应查看 TSA 当前清单，并确认具体证件未过期。',
      },
      {
        question: 'Enhanced 可以坐国际航班吗？',
        answer:
          '不能把 Enhanced 当国际航空旅行护照。它可用于美国国内航班，并可按官方规则用于从指定地区经陆路或海路返回美国；国际航空旅行仍应准备护照及目的地要求的文件。',
      },
      {
        question: '卡上没有星星，就一定不是 REAL ID 合规吗？',
        answer:
          '不一定。Washington EDL/EID 使用美国国旗而不是星标。应按签发州 DMV 的卡面说明判断，不要只靠网上流传的样图。',
      },
    ],
    factChecks: [
      {
        claim: 'Standard 驾照的驾驶资格与 REAL ID 联邦身份用途不同，普通州驾照不会仅因 REAL ID 执行而失去驾驶用途。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
          'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
        ],
      },
      {
        claim: '自 2025 年 5 月 7 日起，TSA 不再把非 REAL ID 合规的州驾照或州 ID 作为国内航班安检的有效州证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'REAL ID 是州证件达到联邦最低标准后的合规形式，不是新的驾驶等级，也不会让 non-driver ID 获得驾驶资格。',
        sourceUrls: ['https://www.dhs.gov/real-id', 'https://www.usa.gov/real-id'],
      },
      {
        claim: '护照、护照卡、绿卡、EAD、军人证和部分 trusted traveler cards 都在 TSA 当前可接受身份证件清单中。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'New York 同时比较 Standard、REAL ID 和 Enhanced 三类证件，其中 Standard 不用于联邦 REAL ID 用途。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/enhanced-or-real-id'],
      },
      {
        claim: 'New York 和 Washington 的 Enhanced 证件申请均与美国公民身份及本州居住证明要求相关。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
          'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
        ],
      },
      {
        claim: 'Enhanced 证件可用于美国国内航班，并可按签发州说明用于从指定地区经陆路或海路返回美国。',
        sourceUrls: [
          'https://www.tsa.gov/travel/security-screening/identification',
          'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
          'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
        ],
      },
      {
        claim: 'Enhanced Driver License 不能替代国际航空旅行所需的护照，Washington 明确把其跨境用途限定为陆路或海路。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl'],
      },
      {
        claim: 'Washington 的 EDL/EID 以美国国旗而非星标表示其 REAL ID 合规状态，不能只靠“有没有星星”判断。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl'],
      },
      {
        claim: '临时驾照不在 TSA 可接受身份证件列表内，办证收据或临时纸张不能默认替代永久 REAL ID。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
    ],
    editorNotes: [
      'Enhanced 不是全国统一选项，常见于纽约、华盛顿等少数州；有些 Enhanced 证件涉及美国公民身份和边境通行用途。',
      '卡面标记不能只看“星星”：华盛顿州 EDL/EID 使用美国国旗标记，佐治亚星标可能是 gold 或 black。',
      'Standard 证件通常仍可用于驾驶，但用户要回到所在州页面确认能否用于特定联邦设施或旅行场景。',
    ],
    sources: [
      ...federalSources,
      {
        label: 'NY DMV Enhanced or REAL ID',
        url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
      },
      {
        label: 'WA DOL Enhanced Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl',
      },
    ],
    relatedStateIds: ['new-york', 'washington', 'new-jersey', 'illinois'],
  },
  {
    slug: 'document-checklist',
    title: 'REAL ID 常见材料清单',
    eyebrow: '材料准备',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '各州表述不同，但 REAL ID 材料通常围绕身份/合法身份、SSN、居住地址和姓名变更四类。最终必须用州官方清单核对。',
    whoNeedsIt: [
      '第一次办理 REAL ID 的人。',
      '搬州后需要换驾照或 ID 的人。',
      '姓名、身份、地址文件不完全一致的人。',
    ],
    keyFacts: [
      'REAL ID 材料通常分成四组：身份与 lawful status、SSN 状态、州内居住地址，以及在姓名不一致时补充的法律姓名变更文件。',
      '很多州要求原件或 certified copy，不接受普通复印件；“扫描件清楚”并不等于符合签发机构的文件形式要求。',
      '居住地址证明常需要两份，但可接受类别、日期窗口、是否必须纸质、能否来自同一机构，都由州 DMV 决定。',
      '姓名不一致时，可能要从出生姓名一路连接到当前姓名。护照已经显示当前法定姓名时，部分州会减少姓名链文件要求。',
      'SSN 规则不能只看“有没有号码”。有的州核验号码、有的要求实体社安卡或显示完整九位号码的文件；没有资格取得 SSN 时，替代证明也按州变化。',
      '非美国公民可能要提供额外、未过期的移民身份文件，并等待 SAVE 等系统核验；不要把美国公民材料清单直接套用。',
    ],
    factChecks: [
      {
        claim: 'USA.gov 将 REAL ID 常见材料概括为身份、Social Security number 和本州居住证明，并要求申请人以州签发机构清单为准。',
        sourceUrls: ['https://www.usa.gov/real-id', 'https://www.usa.gov/state-motor-vehicle-services'],
      },
      {
        claim: 'Pennsylvania 的 REAL ID 清单要求一份身份与 lawful-status 文件、一份 SSN 文件、两份州内居住证明，并在适用时提供姓名变更证明。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
      {
        claim: 'Pennsylvania 明确要求 REAL ID 材料为原件或 certified copy，不接受普通 photocopy。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
      {
        claim: 'Pennsylvania 的 SSN 证明应使用当前法定姓名并显示完整九位号码；该州列出的可选文件包括社安卡、W-2、1099 或完整号码 pay stub。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
      {
        claim: '在 Pennsylvania，没有 SSN 的 REAL ID 申请人要按该州规则提交 SSA ineligibility letter，不能用 ITIN 自动替代。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-non-us-citizens'],
      },
      {
        claim: 'Pennsylvania 要求两份 physical residency documents；电子文件是否可用及打印格式不能跨州推断。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
      {
        claim: 'Texas 的 REAL ID 指引列出原件或认证出生证明/有效护照、社安卡、车辆登记或 title、车险及适用的姓名变更文件。',
        sourceUrls: ['https://www.texas.gov/driver-services/texas-real-id/'],
      },
      {
        claim: 'Texas REAL ID Document Check 会按申请人的身份和已有材料生成缺项提示，并要求相关文件上的姓名和出生日期一致。',
        sourceUrls: ['https://www.dps.texas.gov/apps/DriverLicense/RealID/'],
      },
      {
        claim: 'Pennsylvania 允许在护照已显示当前法定姓名时不再提交姓名变更文件；否则应提供 certified marriage certificate、法院命令等连接文件。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/name-changes-real-id'],
      },
      {
        claim: 'Florida 将美国公民、移民、非移民和加拿大申请人的材料路径分开，申请人应先选择自己的身份类别。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/'],
      },
    ],
    checklist: [
      '身份和合法身份文件：例如护照、出生证明、绿卡、移民身份文件等，按州要求选择。',
      'SSN 文件：社安卡、W-2、paystub 或州接受的其他文件。',
      '居住地址证明：账单、银行信、租约、保险、学校或政府信件等，必须查看州清单。',
      '姓名变更文件：结婚证、离婚判决、法院命令等。',
      '逐份检查有效期、姓名、出生日期、住宅地址和文件编号；需要认证副本时，不要带纪念证书或普通复印件。',
      '准备预约确认、申请编号、付款方式和一份不同类别的备用地址文件；线上预上传不一定替代现场原件。',
    ],
    steps: [
      '第一步：从州 DMV 的具体 REAL ID 页面进入 document guide，不使用博客或其他州的通用清单。',
      '第二步：选择自己的身份类别。美国公民、永久居民、EAD、学生/临时身份和不可取得 SSN 的路径可能不同。',
      '第三步：按 identity、SSN、residency、name change 四栏整理文件，并在每一栏写明州要求的数量。',
      '第四步：逐份核对姓名、出生日期、地址和有效期；不一致时先补齐法律连接文件，不要指望柜台口头解释。',
      '第五步：确认文件形式。原件、certified copy、打印电子账单和手机截图是四种不同概念，以州页面的措辞为准。',
      '第六步：把原件/认证副本、预约确认、申请编号、付款方式和备用文件放在同一文件夹，到场前再按官方清单复核一次。',
    ],
    faqs: [
      {
        question: '可以用手机照片或 PDF 代替纸质原件吗？',
        answer:
          '多数 REAL ID 材料核验要求原件或认证副本。电子版是否接受必须看州官方说明。',
      },
      {
        question: '地址证明没有我的名字怎么办？',
        answer:
          '不同州有不同替代路径，例如同住人声明、学校文件或政府信件。不要猜，直接看州 DMV document guide。',
      },
      {
        question: '有 ITIN，可以把它填在 SSN 一栏吗？',
        answer:
          '不要直接替代。ITIN 不是 SSN；州 DMV 可能要求 SSN、电子核验、SSA ineligibility letter 或其他声明。按本州和本人身份类别的说明处理。',
      },
      {
        question: '护照已经是现在的名字，还要带所有结婚证吗？',
        answer:
          '取决于州。Pennsylvania 明确允许护照已显示当前法定姓名时免去姓名变更文件；其他州可能仍有自己的匹配或 SSA 更新要求，必须看本州清单。',
      },
    ],
    editorNotes: [
      '这页不能替代州官方 document selector。宾州、新泽西、佛州等州都按自己的材料结构和身份类别分流。',
      '“原件或认证副本”是高频要求，但电子文件、打印件、翻译件是否接受必须看州页面。',
      '姓名、SSN、居住地址和 lawful status 是最容易互相卡住的四组材料，准备时要一起核对。',
    ],
    sources: [
      {
        label: 'DHS REAL ID',
        url: 'https://www.dhs.gov/real-id',
      },
      {
        label: 'USA.gov REAL ID',
        url: 'https://www.usa.gov/real-id',
      },
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'PA REAL ID Document Requirements',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
      },
      {
        label: 'PA REAL ID for Non-U.S. Citizens',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-info-for-non-us-citizens',
      },
      {
        label: 'PA REAL ID Name Changes',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/name-changes-real-id',
      },
      {
        label: 'FLHSMV What to Bring',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/',
      },
      {
        label: 'Texas.gov REAL ID',
        url: 'https://www.texas.gov/driver-services/texas-real-id/',
      },
      {
        label: 'Texas DPS REAL ID Document Check',
        url: 'https://www.dps.texas.gov/apps/DriverLicense/RealID/',
      },
    ],
    relatedStateIds: ['california', 'texas', 'florida', 'pennsylvania'],
  },
  {
    slug: 'proof-of-residency',
    title: '地址证明怎么准备',
    eyebrow: '材料细节',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '地址证明最容易在“看起来合理、官方却不收”这里出错。办事前要同时核对文件数量、本人姓名、住宅地址、日期范围、打印格式和替代证明路径。',
    whoNeedsIt: [
      '刚搬家或刚搬州的人。',
      '住在亲友家、宿舍、sublease 或没有自己账单的人。',
      '准备 REAL ID、换证或地址变更的人。',
    ],
    keyFacts: [
      'REAL ID 经常要求两份地址证明，但 Standard license、初次办证、换州驾照和车辆业务可能要求不同数量；必须按具体业务清单判断。',
      '文件通常要同时显示申请人姓名和当前 residential / physical address。mailing address、P.O. Box、PMB 和校园信箱不一定能证明实际居住地址。',
      '电子账单并非一律不收。California、New York 和 Texas 都接受部分打印出来的电子文件，但手机截图或现场展示 PDF 不能自动视为合格。',
      '日期范围按州和文件类型变化。New York 的常见居住文件通常要求在到访前 365 天内，Texas 对部分账单使用 180 天窗口，Florida 多类地址文件使用 60 天窗口。',
      'P.O. Box 规则差异明显：New York 不接受只列 P.O. Box 的居住证明；California 可记录 P.O. Box，但至少一份文件还要同时显示 physical residence address。',
      '住亲友家或文件不在本人名下时，不要直接拿别人的账单冒充自己的证明。California 有关系追溯文件路径，Texas 有符合条件的 Residency Affidavit。',
      '同一机构出的两份文件未必都算。Texas 只在特定情形下允许同一地方政府或多项住宅服务提供者的不同服务文件，不能用同一服务不同月份凑两份。',
      '在线预上传只是在到场前预审。California 明确要求申请人到办公室时仍带上传过的原始文件和确认码。',
    ],
    checklist: [
      '先写清业务：Standard、REAL ID、Enhanced、first license、out-of-state transfer、renewal 还是 vehicle registration。',
      '在州官方 document guide 中圈出可接受类别，并确认需要一份还是两份、是否要求不同来源。',
      '逐份检查五项：本人姓名、当前住宅地址、文件类别、签发日期、纸质/原件/打印件格式。',
      '把申请表、预约资料和地址文件的门牌号、单元号、方向词及姓名拼写统一。',
      '优先准备来自不同来源的两份材料，例如租约加银行信、保险单加政府信件，并带一份官方清单内的备用件。',
      '若只显示 P.O. Box、PMB 或 mailing address，再准备能显示 physical / residential address 的文件。',
      '若住亲友家、宿舍、shelter 或账单不在本人名下，先下载本州 affidavit / certification 表，或准备官方允许的关系追溯文件。',
      '打印电子账单完整页面，不裁掉姓名、地址、日期、机构名称或账号识别信息；不要只带手机截图。',
    ],
    steps: [
      '第一步：从具体业务页进入官方 document guide，而不是用搜索结果里的通用“地址证明清单”。',
      '第二步：确定数量和来源限制。REAL ID 常见两份，但不同州对同一来源、不同账户和不同文件类别有不同算法。',
      '第三步：核对住宅地址。只有 mailing address、P.O. Box 或 campus mailbox 时，先查本州 physical-address 规则。',
      '第四步：核对姓名和日期。姓名不一致时先准备姓名变更链；超出日期窗口的文件不要作为主材料。',
      '第五步：没有本人账单时走官方替代路径。关系证明、同住人 affidavit、学校/雇主/政府信或 shelter letter 的格式不能自行编造。',
      '第六步：按官方格式准备纸质材料。允许 printed electronic statement 不等于允许手机截图，也不等于所有电子文件都接受。',
      '第七步：到场前用清单逐项打勾，并带一份不同类别的备用地址文件；在线上传过的材料仍按州要求带原件或打印件。',
    ],
    faqs: [
      {
        question: '银行电子账单可以吗？',
        answer:
          '有些州接受打印的电子账单。California、New York 和 Texas 的官方材料都提供这种路径，但要按本州要求打印，并保留姓名、地址、日期和机构信息。不要默认手机里的 PDF 或截图可以现场替代。',
      },
      {
        question: '地址只有英文缩写不同会有问题吗？',
        answer:
          '可能不会，也可能被要求解释。为了降低风险，尽量让预约、申请表和地址证明使用一致写法。',
      },
      {
        question: '我住亲友家，账单都不是我的名字怎么办？',
        answer:
          '查本州是否有 household member、relationship tracing、residency affidavit 或 certification of address 路径。California 可在特定条件下用出生证、结婚证等追溯与文件持有人的关系；Texas 有 DL-5 affidavit，但签署人和陪同要求必须按表格执行。',
      },
      {
        question: 'P.O. Box 能不能作为地址证明？',
        answer:
          '不能一概而论。New York 居住证明不接受 P.O. Box；California 可把 P.O. Box 作为 mailing address，但至少一份文件还要显示 physical residence address。先区分收信地址和实际住宅地址。',
      },
      {
        question: '两份材料可以来自同一家银行或同一家公司吗？',
        answer:
          '不一定。部分州限制同一来源或同一类别。Texas 只对特定地方政府或多项住宅服务提供者允许不同服务分别计算，同一服务不同月份不能凑数。最稳妥是准备不同来源的文件。',
      },
    ],
    factChecks: [
      {
        claim: 'California REAL ID 要求两份不同的打印居住文件，两份都要显示申请人的姓名和申请所用地址。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/'],
      },
      {
        claim: 'New York 的 REAL ID 或 Enhanced 通常要两份州居住证明，而 Standard license 或 permit 的数量要求不同。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/enhanced-or-real-id'],
      },
      {
        claim: 'Texas driver license / ID 居住要求通常是两份打印文件，两份都要列出本人姓名和 Texas residential address。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards'],
      },
      {
        claim: 'California、New York 和 Texas 接受符合各自清单的打印电子文件，但这不等于手机截图或未打印 PDF 自动合格。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
          'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
          'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
        ],
      },
      {
        claim: 'New York 常见居住证明要在到访 DMV 前 365 天内签发，并且只列 P.O. Box 的文件不能作为居住证明。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/enhanced-or-real-id'],
      },
      {
        claim: 'California 允许使用 P.O. Box 作为收信地址时，至少一份居住文件仍要同时显示 P.O. Box 和 physical residence address。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/'],
      },
      {
        claim: 'California 在本人姓名不出现在居住文件上时，允许用出生证、结婚证或 domestic partner registration 等文件追溯关系。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/'],
      },
      {
        claim: 'Texas 无法提供两份常规居住文件的申请人，可能可使用 DL-5 Texas Residency Affidavit 和配套证明。',
        sourceUrls: ['https://www.dps.texas.gov/internetforms/Forms/DL-5.pdf'],
      },
      {
        claim: 'Texas 对同一来源文件有附加限制：同一服务的不同月份账单不能作为两份证明，部分多项住宅服务例外除外。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards'],
      },
      {
        claim: 'California 在线上传 REAL ID 文件只用于预先提交，到 DMV 办公室完成申请时仍要带已上传文件的原件和确认码。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/'],
      },
    ],
    editorNotes: [
      '地址证明是“DMV 是否接受这份文件”的问题，不等同于移民或税务意义上的 residence 判断。',
      '很多州要两份地址证明，但文件类型、日期范围、是否接受电子账单差异很大；宾州还明确强调 physical documents。',
      '住亲友家、宿舍、sublease 或账单不在自己名下时，不要套通用清单，直接查州官方替代路径。',
    ],
    sources: [
      {
        label: 'California DMV REAL ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/',
      },
      {
        label: 'California DMV REAL ID Checklist',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
      },
      {
        label: 'NJ MVC REAL ID',
        url: 'https://www.nj.gov/mvc/realid/',
      },
      {
        label: 'PA REAL ID Document Requirements',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
      },
      {
        label: 'NY DMV Enhanced or REAL ID',
        url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
      },
      {
        label: 'Texas DPS Residency Requirement',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
      },
      {
        label: 'Texas DPS Residency Affidavit DL-5',
        url: 'https://www.dps.texas.gov/internetforms/Forms/DL-5.pdf',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'new-jersey', 'pennsylvania'],
  },
  {
    slug: 'residency-proof-no-bills-po-box',
    title: '没有自己账单、住亲友家或宿舍，地址证明怎么准备',
    eyebrow: '地址证明',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '地址证明最难的情况，往往不是“没有地址”，而是没有一份写着本人姓名和当前居住地址的官方文件。住亲友家、室友家、宿舍、sublease、P.O. Box 和 mailing address，需要按不同规则判断。',
    whoNeedsIt: [
      '住在亲友家、室友家、学校宿舍、短租、sublease、公司宿舍或临时住处的人。',
      '水电、网费、租约、保险或银行信不在自己名下的人。',
      '文件只显示 P.O. Box、PMB、campus mailbox 或 mailing address 的人。',
      '搬州、首次 REAL ID、换州驾照或补证前担心地址材料被退的人。',
    ],
    keyFacts: [
      'DMV 通常核对的是 current residential address、physical address 或 residence address，不是单纯收信地址。',
      '很多 REAL ID、Enhanced 或首次驾照业务要求两份地址证明；有些州还要求来自不同来源、不同账户或不同文件类别。',
      'P.O. Box、PMB、学校信箱或只显示 mailing address 的文件，经常不能单独证明居住地址。',
      '没有自己账单时，要查州官方是否接受学校、雇主、银行、保险、政府信件、租约、同住人证明、address certification 或 affidavit。',
      '电子账单、打印件、手机截图、翻译件、同一机构两份文件是否接受，州与州差异很大。',
      '官方 affidavit 不是一张通用“担保信”。Texas DL-5 和 Florida HSMV 71120 都要求按本州表格、签署人身份和配套地址材料办理。',
      '少数 P.O. Box / PMB 例外有严格适用范围。South Dakota 的 full-time traveler 路径要求 affidavit、近期住宿收据和 PMB 证明，不能推广为普通申请规则。',
    ],
    checklist: [
      '先确认你办的是 standard license、REAL ID、Enhanced/EDL、外州转入还是地址变更；不同业务的地址证明要求可能不同。',
      '把当前居住地址写成一行标准格式，和申请表、预约、租约、银行、学校系统里的写法尽量一致。',
      '优先准备两份写有本人姓名和当前居住地址的文件，并尽量来自不同来源。',
      '如果账单不在自己名下，不要只拿别人的账单；查官方是否有 household member、certification of address 或 affidavit 路径。',
      '如果文件显示 P.O. Box、PMB 或 mailing address，另找能显示 physical / residential street address 的文件。',
      '到场前核对日期范围、原件/打印件要求、是否接受电子文件，以及外文文件是否要 certified translation。',
    ],
    steps: [
      '第一步：打开州 DMV 的 document guide、REAL ID checklist 或 required documents 页面，先看“residence / residency / address proof”栏目。',
      '第二步：给每份备选文件做五项检查：本人姓名、当前居住地址、文件类别、日期范围、文件格式。',
      '第三步：如果住亲友家或室友家，查官方是否允许同住人声明、地址认证表或 affidavit，并确认签署人是否也要提供自己的地址证明。',
      '第四步：如果住学校宿舍，优先找官方清单列出的 school record、enrollment、housing letter、tuition bill 或学校寄送文件；不要只依赖 campus mailbox。',
      '第五步：如果是 sublease、短租或没有正式租约，用官方清单里的银行、保险、工资、税务、政府、医疗或学校文件补强。',
      '第六步：如果只有 P.O. Box 或 mailing address，先补一份显示 physical residential address 的文件；有些州可单独记录 mailing address，但它不能替代居住地址。',
    ],
    faqs: [
      {
        question: '没有自己水电账单，是不是就办不了 REAL ID？',
        answer:
          '不一定。很多州接受银行、保险、学校、雇主、政府、租约或其他文件类别；关键是文件必须在该州官方清单内，并显示本人姓名和当前居住地址。',
      },
      {
        question: '住亲友家，可以直接用对方的账单吗？',
        answer:
          '通常不能把别人的账单当成自己的地址证明。若州允许 household member 证明、address certification 或 affidavit，通常还会要求按官方表格、签名、身份证明或同住关系规则办理。',
      },
      {
        question: 'P.O. Box、PMB 或学校信箱可以作为地址证明吗？',
        answer:
          '多数 DMV 地址证明要求 physical 或 residential address。P.O. Box、PMB、campus mailbox 往往只能作为收信地址；全职旅行者、无固定住址等特殊路径必须看州官方说明。',
      },
      {
        question: '两份文件都来自同一家银行可以吗？',
        answer:
          '不一定。有些州要求不同来源、不同账户或不同文件类别。最稳妥的做法是准备两份不同来源的文件，例如银行信加保险、租约加政府信件。',
      },
      {
        question: '手机里的 PDF 或电子账单可以现场给 DMV 看吗？',
        answer:
          '不要默认可以。Iowa 等州强调打印文件，Pennsylvania 等页面强调 physical documents；有些州接受打印电子账单，有些不接受手机截图。到场前按州官方格式要求准备。',
      },
    ],
    factChecks: [
      {
        claim: 'California REAL ID 申请要提交两份显示申请人姓名和 California 地址的居住证明，不能只准备一份账单。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
        ],
      },
      {
        claim: 'California AB 60 地址清单包含学校、医疗、雇佣、保险、金融和政府文件，并为部分亲属设置了关系文件衔接路径。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/assembly-bill-ab-60-wizard/'],
      },
      {
        claim: 'New Jersey Standard credential 通常要求一份地址证明，REAL ID 要求两份；其地址证明可为符合要求的纸质或电子文件。',
        sourceUrls: ['https://www.nj.gov/mvc/license/6pointid.htm'],
      },
      {
        claim: 'Pennsylvania REAL ID 要两份显示 Pennsylvania 地址的实体文件，官方页面明确说不能用电子版本替代。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
      {
        claim: 'Washington Enhanced credential 的清单要求两份写有姓名和当前 WA 住宅地址的文件，不接受 P.O. Box，并允许部分账单打印件。',
        sourceUrls: [
          'https://dol.wa.gov/media/pdf/5165/applying-enhanced-washington-license-or-idpdf/download?inline=',
        ],
      },
      {
        claim: 'Iowa REAL ID 要两份打印出的当前 Iowa 居住证明，地址必须是实际居住地址而不是邮政信箱。',
        sourceUrls: ['https://ia.iowadot.gov/mvd/realid/success5.aspx'],
      },
      {
        claim: 'Texas 通常要求两份打印的居住文件，其中一份一般要显示申请日前至少 30 天；符合清单的电子账单可打印提交。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
        ],
      },
      {
        claim: 'Texas DL-5 地址 affidavit 要由同住证明人提供两份地址文件；与申请人无亲属关系的证明人还要按表格要求陪同到场。',
        sourceUrls: ['https://www.dps.texas.gov/internetforms/Forms/DL-5.pdf'],
      },
      {
        claim: 'Florida HSMV 71120 为缺少两份本人名下地址文件的 Class E 驾照或 ID 申请人提供认证路径，但不能用于 CLP 或 CDL。',
        sourceUrls: [
          'https://www.flhsmv.gov/pdf/forms/71120.pdf',
          'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
        ],
      },
      {
        claim: 'South Dakota 允许 full-time traveler 使用 PMB 的规则要求 residency affidavit、近期住宿收据和 PMB 证明，并不适用于普通住宅地址申请。',
        sourceUrls: ['https://dps.sd.gov/driver-licensing/renew-and-duplicate/full-time-travelers'],
      },
    ],
    editorNotes: [
      '这页只解释 DMV 文件接受规则，不判断移民、税务、学费或法律意义上的 residency。',
      '官方页面里的 residence、residency、residential address、physical address 和 mailing address 不是同一个概念；中文页必须保留这些区别。',
      '“没有自己账单”没有全国统一答案，页面应引导用户回到州官方 document guide，而不是给通用承诺。',
      'South Dakota 等少数州会给 full-time traveler、PMB 或 affidavit 单独路径；不能把这些特殊规则套到所有州。',
    ],
    relatedDirectory: {
      label: '查看 DMV 材料规则表',
      href: '/directories/document-rules/',
      description: '按州查地址证明、SSN、姓名链条、原件/认证副本、P.O. Box 和翻译规则。',
    },
    sources: [
      {
        label: 'California DMV REAL ID Checklist',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
      },
      {
        label: 'NY DMV ID-44',
        url: 'https://dmv.ny.gov/forms/id44.pdf',
      },
      {
        label: 'NJ MVC 6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
      },
      {
        label: 'FLHSMV What to Bring - U.S. Citizen',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/',
      },
      {
        label: 'PA REAL ID Document Requirements',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
      },
      {
        label: 'WA DOL Enhanced Driver License Guide',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/guide-enhanced-driver-licenses-edl',
      },
      {
        label: 'Iowa DOT REAL ID',
        url: 'https://iowadot.gov/drivers-licenses-ids/get-or-renew-drivers-licenses-ids-permits/real-id',
      },
      {
        label: 'Kansas REAL ID',
        url: 'https://www.ksrevenue.gov/dovrealid.html',
      },
      {
        label: 'SCDMV Form MV-93',
        url: 'https://dmv.sc.gov/sites/scdmv/files/media/Forms/MV-93.pdf',
      },
      {
        label: 'Mississippi Required Documents',
        url: 'https://www.driverservicebureau.dps.ms.gov/node/303',
      },
      {
        label: 'Oregon REAL ID',
        url: 'https://www.oregon.gov/odot/dmv/pages/real_id.aspx',
      },
      {
        label: 'California DMV AB 60 Residency Wizard',
        url: 'https://www.dmv.ca.gov/portal/assembly-bill-ab-60-wizard/',
      },
      {
        label: 'Washington DOL Applying for an Enhanced License or ID',
        url: 'https://dol.wa.gov/media/pdf/5165/applying-enhanced-washington-license-or-idpdf/download?inline=',
      },
      {
        label: 'Iowa DOT REAL ID Residency Documents',
        url: 'https://ia.iowadot.gov/mvd/realid/success5.aspx',
      },
      {
        label: 'Texas DPS Residency Requirement',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards',
      },
      {
        label: 'Texas DPS Residency Affidavit DL-5',
        url: 'https://www.dps.texas.gov/internetforms/Forms/DL-5.pdf',
      },
      {
        label: 'FLHSMV Certification of Address HSMV 71120',
        url: 'https://www.flhsmv.gov/pdf/forms/71120.pdf',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
      {
        label: 'South Dakota DPS Full-Time Travelers',
        url: 'https://dps.sd.gov/driver-licensing/renew-and-duplicate/full-time-travelers',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'new-jersey',
      'florida',
      'pennsylvania',
      'washington',
      'iowa',
      'kansas',
      'south-carolina',
      'mississippi',
      'oregon',
      'texas',
      'south-dakota',
    ],
  },
  {
    slug: 'ssn-and-itin',
    title: 'SSN、ITIN 和不可取得 SSN 的情况',
    eyebrow: '身份文件',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      'SSN、SSA denial/ineligibility letter、无 SSN affidavit 和 ITIN 不是四种可以随意互换的材料。先判断自己是否已获发或有资格取得 SSN，再按州、证件类型和身份类别进入正确清单。',
    whoNeedsIt: [
      '留学生、工作签证、家属签证或新移民。',
      '申请 REAL ID 或首次驾照时没有 SSN 的人。',
      '州页面提到 SSN、ITIN 或 ineligibility letter 的人。',
    ],
    keyFacts: [
      'SSA 说明，一般只有获得 DHS 工作许可的非公民才能取得 SSN；少数依法认可的非工作原因另行适用。是否符合 SSN 资格由 SSA 判断，不由 DMV 或申请人自行判断。',
      'SSA 同时说明，非公民不需要仅为了取得普通 driver license 而申请 SSN，SSA 也不会仅以申请州驾照为由分配号码。',
      '如果州申请表要求 SSN，已经获发号码的人应按要求提供，并确保姓名与 SSA 记录一致；“暂时找不到实体卡”和“从未获发 SSN”不是同一场景，是否必须出示实体卡要看州清单。',
      '没有 SSN 的州级路径差异很大，可能要求 SSA denial / ineligibility letter、Affidavit of No SSN、护照与 I-94，或允许某类 Standard license 不提交这些文件。',
      'ITIN 是 IRS 为联邦税务目的签发的号码，不授权工作、不改变移民身份、不提供 Social Security 福利，也不构成联邦税务体系之外的身份证明。',
      '州表格即使要求填写 ITIN，也不代表 ITIN 在法律上变成 SSN 或身份证件。应把“州收集号码”和“用号码证明身份/资格”分开理解。',
      'REAL ID、Standard license、State ID 和 CDL 的 SSN 规则可能不同。New York Standard license 可在没有 SSN card 或 ineligibility letter 时申请，但 REAL ID-compliant document 另有要求。',
      '姓名不一致会让 SSN 验证失败。Florida 要求 SSN 记录上的姓名与驾照/ID 姓名一致，刚改名的人应先处理 SSA 记录。',
    ],
    checklist: [
      '先回答：SSN 已获发、正在申请、SSA 判定不符合资格，还是从未向 SSA 申请；不要把四种状态混写。',
      '确认办理类型：REAL ID、Standard noncommercial license、State ID、permit、CDL 或 vehicle registration。',
      '已获发 SSN 时，核对 SSA 记录中的完整姓名、生日和号码是否与 DMV 申请一致。',
      '没有 SSN 时，打开本州官方 no-SSN / non-citizen / document checklist，查要求的是 SSA letter、affidavit 还是其他路径。',
      '核对 SSA letter 的有效窗口；例如 New York REAL ID 使用的 ineligibility letter 要在申请前 30 天内签发，其他州期限不同。',
      '如果只有 ITIN，先确认州页面在哪个字段、哪类证件中提到它；不要拿 ITIN 信件替代未被官方清单列出的身份证明。',
      '把护照、I-94、I-20、DS-2019、EAD 或其他 lawful-status 文件与 SSN 栏目一起核对。',
      '遇到 DMV 与 SSA 核验不一致时，保存提示或拒绝信，分别联系签发该记录的官方机构，不要重复提交不同拼写。',
    ],
    steps: [
      '第一步：确认自己有没有已经获发的 SSN。曾经获发过的人不要改用 ITIN 或声称“无 SSN”，应处理遗失卡片或记录问题。',
      '第二步：没有 SSN 时，用 SSA 官方资格说明判断下一步；不要为了驾照单独申请 ITIN，也不要要求 SSA 仅因驾照申请分配 SSN。',
      '第三步：选择州证件类型。Standard 与 REAL ID 的无 SSN 规则可能不同，CDL 通常又是另一套要求。',
      '第四步：按本州清单取得正确替代材料。SSA denial / ineligibility letter、Affidavit of No SSN 和自我声明的效力并不相同。',
      '第五步：把姓名和身份记录对齐。刚改名时先查看 SSA 更新姓名流程，再核对 DMV 是否要求等待系统同步。',
      '第六步：把 ITIN 只放在州官方明确要求的字段里；它不能替代护照、lawful-status 文件、SSN 资格证明或州要求的 photo ID。',
      '第七步：到场前重新查看具体州和证件类型的 current checklist，并保存 SSA letter、affidavit 和预约文件的日期及副本。',
    ],
    faqs: [
      {
        question: '没有 SSN 一定不能办驾照吗？',
        answer:
          '不一定。SSA 明确说非公民不需要仅为了取得普通驾照而申请 SSN，州可以设置其他核验路径。New York Standard、Massachusetts Standard 等就有各自的无 SSN 规则，但 REAL ID、CDL 和其他州不能照搬。',
      },
      {
        question: 'ITIN 可以替代 SSN 吗？',
        answer:
          '不能把它当成全国通用替代物。IRS 明确说 ITIN 只用于联邦税务，不是税务体系之外的身份证明，也不授权工作或改变移民身份。某州业务若收集 ITIN，只能按该州对应表格和用途理解。',
      },
      {
        question: '我有 SSN，但社安卡丢了，可以走“无 SSN”路径吗？',
        answer:
          '通常不应这样做。号码一旦获发，你仍属于“有 SSN”的申请人。先看州是否只需电子核验号码、是否接受 W-2/pay stub 等材料，或按 SSA 官方流程补卡。',
      },
      {
        question: 'SSA 会为了我办驾照而给一个 SSN 吗？',
        answer:
          '通常不会。SSA 的公开说明和操作政策都写明，申请普通 driver license 本身不是分配 SSN 的有效非工作理由。是否符合工作或其他法定资格仍由 SSA 判断。',
      },
      {
        question: 'SSA denial 或 ineligibility letter 可以一直用吗？',
        answer:
          '通常有日期要求，而且州与证件类型不同。New York REAL ID 要求信件在前 30 天内签发；Massachusetts 的清单使用自己的日期窗口。预约前必须重新查看本州 current checklist。',
      },
    ],
    factChecks: [
      {
        claim: 'SSA 说明一般只有获得 DHS 工作许可的非公民可以取得 SSN，另有少数依法认可的非工作用途例外。',
        sourceUrls: ['https://www.ssa.gov/pubs/EN-05-10096.pdf'],
      },
      {
        claim: 'SSA 说明非公民不需要仅为了取得普通 driver license 而申请 SSN，并可在没有 SSN 时获得某些服务。',
        sourceUrls: ['https://www.ssa.gov/pubs/EN-05-10096.pdf'],
      },
      {
        claim: 'SSA 的操作政策明确把普通 driver license 排除在分配 SSN 的有效非工作理由之外。',
        sourceUrls: ['https://secure.ssa.gov/poms.nsf/lnx/0110211615'],
      },
      {
        claim: 'SSA 签发三类 Social Security card，其中临时工作许可和不具工作效力的卡面限制不同。',
        sourceUrls: ['https://www.ssa.gov/ssnumber/cards.htm'],
      },
      {
        claim: 'IRS 将 ITIN 定义为联邦税务用途号码，它不授权工作、不改变移民身份，也不是联邦税务体系之外的身份证明。',
        sourceUrls: ['https://www.irs.gov/tin/itin/individual-taxpayer-identification-number-itin'],
      },
      {
        claim: 'IRS 明确回答 ITIN 不能作为取得州驾照时的身份证明，并提醒 DMV 不要把它当成非税务身份证件。',
        sourceUrls: ['https://www.irs.gov/individuals/additional-itin-information'],
      },
      {
        claim: 'New York Standard license 或 permit 可在没有 Social Security Card 和 ineligibility letter 的情况下申请。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility'],
      },
      {
        claim: 'New York 申请 REAL ID-compliant license 或 permit 时，需要 Social Security Card 或前 30 天内签发的 SSA ineligibility letter。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility'],
      },
      {
        claim:
          'Massachusetts 的 Standard license 可在符合文件组合时使用 SSA denial notice 或 Affidavit of No SSN；REAL ID 的无 SSN 路径另有 denial notice、passport、visa 和 I-94 要求。',
        sourceUrls: [
          'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
          'https://www.mass.gov/doc/drivers-license-learners-permit-or-id-card-application-instructions-english/download',
        ],
      },
      {
        claim: 'Florida 非移民材料页要求 SSN 证明上的姓名与将显示在 Florida license / ID 上的姓名一致。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/'],
      },
      {
        claim:
          'Florida 说明，没有工作签证的非移民不必取得 SSA refusal letter；没有 SSN 的申请人仍要按 Florida 的具体材料入口确认适用路径。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/'],
      },
    ],
    editorNotes: [
      'SSN、ITIN 和 SSA ineligibility letter 不是全国统一替代关系；不同州会把它们放在不同业务和身份类别下。',
      '非公民读者应先走州 DMV 的 lawful presence 或 non-U.S. citizen 材料入口，再看 SSN 栏目。',
      '如果州页面没有明确写接受 ITIN，不要默认 ITIN 可以替代 SSN。',
    ],
    sources: [
      {
        label: 'SSA Social Security Numbers for Noncitizens',
        url: 'https://www.ssa.gov/pubs/EN-05-10096.pdf',
      },
      {
        label: 'SSA Invalid Nonwork Reasons for SSN Assignment',
        url: 'https://secure.ssa.gov/poms.nsf/lnx/0110211615',
      },
      {
        label: 'SSA Types of Social Security Cards',
        url: 'https://www.ssa.gov/ssnumber/cards.htm',
      },
      {
        label: 'IRS Individual Taxpayer Identification Number',
        url: 'https://www.irs.gov/tin/itin/individual-taxpayer-identification-number-itin',
      },
      {
        label: 'IRS Additional ITIN Information',
        url: 'https://www.irs.gov/individuals/additional-itin-information',
      },
      {
        label: 'NY DMV Standard License Without SSN',
        url: 'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility',
      },
      {
        label: 'Massachusetts Identification Requirements',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
      },
      {
        label: 'Massachusetts License and ID Application Instructions',
        url: 'https://www.mass.gov/doc/drivers-license-learners-permit-or-id-card-application-instructions-english/download',
      },
      {
        label: 'NJ MVC REAL ID',
        url: 'https://www.nj.gov/mvc/realid/',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
    ],
    relatedStateIds: ['new-york', 'massachusetts', 'new-jersey', 'florida', 'california'],
  },
  {
    slug: 'name-change-chain',
    title: '姓名变更文件怎么整理',
    eyebrow: '姓名一致性',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '姓名材料的目标不是证明“你平时用哪个名字”，而是用政府签发的文件，把原始身份文件上的姓名连续连接到本次申请使用的 current legal name。',
    whoNeedsIt: [
      '婚后改姓、离婚恢复旧姓或法院改名的人。',
      '英文名、中间名、拼写或顺序在不同文件上不一致的人。',
      '移民文件和州证件姓名不一致的人。',
    ],
    keyFacts: [
      '昵称、英文常用名、拼音变化和自行选择的 preferred name 通常不能代替 legal name。REAL ID / Enhanced 等证件通常只打印可由法律文件支持的完整法定姓名。',
      '常见姓名变更依据包括政府签发的 marriage certificate、divorce decree、court order、amended birth certificate 和 naturalization document。Florida 明确不接受 church-issued marriage certificate；SSA 也不接受普通 photocopy 或仅由 notary 认证的副本。',
      '多次结婚、离婚或法院改名时，要按时间顺序提供每一段连接文件。New York 明确要求一次或多次变更都要证明每一步。',
      'SSA 和州 DMV 是不同记录系统，“一定先改 SSA”不是全国统一顺序。California 和 Florida 明确要求或先核验 SSA 新姓名；New York 的部分 Standard 邮寄路径也要求 SSA 已更新且姓名准确匹配。',
      'SSA 办 corrected card 时通常要证明身份、新法定姓名和改名事件，并可能要求公民身份或 lawful noncitizen status。若改名文件不足以识别本人，或改名已超过两年（未满 18 岁为四年），SSA 还会要求旧姓名身份证明；旧姓名证件可以已经过期。',
      '原件、签发机构 certified copy、电子认证记录和翻译件是否接受，由签发机构与州 DMV 分别决定。SSA 明确不接受普通 photocopy 或仅由公证人认证的副本。',
      '外文文件不能默认现场口译。应查看州 DMV 是否要求完整 English translation、certified translation、译者声明或原文与译文同时提交。',
      '地址文件上的旧姓也可能触发补证。先用法律文件把旧姓与当前姓名相连，再确认州是否允许该地址文件继续作为 residency proof。',
    ],
    checklist: [
      '逐字抄下出生证、护照、绿卡/EAD、I-94、SSN、现有驾照和两份地址文件上的姓名。',
      '确定本次申请要使用的 current legal name，包括 middle name、hyphen、suffix 和空格，不要临场改拼写。',
      '画出时间线：原始姓名 -> 第一次婚姻/法院改名 -> 离婚/再婚 -> 当前姓名。',
      '为每一条箭头准备政府签发的 marriage certificate、divorce decree、court order、naturalization document 或 amended birth certificate。',
      '确认每份是原件还是签发机构 certified copy；不要把 notarized photocopy 当作 certified copy。',
      '核对 SSA 记录是否已更新，以及本州 DMV 是否要求先同步。California 会先向 SSA 核验；Florida 建议 SSA 更新后等待 24 至 48 小时。',
      '外文材料按本州 translation 规则准备原文和译文，并检查译者资格、签名或认证要求。',
      '再检查地址证明、预约和申请表；旧姓文件若无法由姓名链连接，就换成 current-name 文件。',
    ],
    steps: [
      '第一步：以 REAL ID / DMV 身份清单里准备使用的 primary identity 或 lawful-presence document 为起点。',
      '第二步：列出每次法律变更，不要只准备最近一次。每份文件必须能解释前一姓名如何变成后一姓名。',
      '第三步：从签发机构取得原件或 certified copy。缺失婚姻、离婚或法院记录时，应先补记录再约 DMV。',
      '第四步：查签发州的 SSA 顺序。California、Florida 和 New York 的部分路径要求先更新或匹配 SSA；其他州仍以本州姓名变更页为准。',
      '第五步：处理移民和护照记录差异。DMV 不能替 USCIS、Department of State 或外国签发机构更改其记录。',
      '第六步：按州规则准备翻译。原文姓名、音译姓名和 legal name 之间的解释不能只靠口头说明。',
      '第七步：按顺序夹好 primary identity、每段姓名变更文件、SSN 证明和地址文件，并带官方清单内的备用证据。',
    ],
    faqs: [
      {
        question: '只带结婚证可以吗？',
        answer:
          '如果原始身份文件到当前姓名之间只有一次、且政府签发的结婚证清楚连接两个姓名，可能足够；中间还有离婚、再婚、法院改名或 naturalization name change 时，应带完整链条。',
      },
      {
        question: '中文名和英文名不同怎么办？',
        answer:
          '先判断是同一个法定姓名的翻译/音译差异，还是已经采用了新的 legal name。不要自行挑一个英文名填表来“统一”文件；应以 primary identity document 为起点，用签发机构认可的翻译、姓名变更文件或源记录更正把两套写法连接起来。具体译者资格和文件形式看申请州官方清单。',
      },
      {
        question: '公证过的复印件等于 certified copy 吗？',
        answer:
          '通常不等于。Certified copy 通常由原记录的政府签发机构认证；notary 多数只见证签名或复印行为。SSA 明确不接受普通 photocopy 或仅由 notary 认证的副本，DMV 也应按州清单判断。',
      },
      {
        question: '应该先改 SSN 姓名还是先改驾照？',
        answer:
          '没有全国统一顺序。California 明确先向 SSA 核验新姓名，Florida 要求先改 SSA 并建议等待 24 至 48 小时，New York 的部分 Standard 邮寄路径要求姓名已在 SSA 更新并准确匹配。其他州应先看本州 name-change 页面，再安排 SSA 与 DMV 的先后。',
      },
      {
        question: '地址证明还是旧姓，可以继续用吗？',
        answer:
          '可能可以，但必须能用官方姓名变更文件把旧姓连接到当前 legal name，且该州允许这种组合。California REAL ID checklist 就提醒：居住文件姓名因改名不同，会要求额外姓名变更证据。',
      },
    ],
    factChecks: [
      {
        claim: 'SSA 要求因结婚、离婚、法院命令等依法改名的人更新 Social Security 记录并申请姓名正确的 replacement card。',
        sourceUrls: ['https://www.ssa.gov/faqs/en/questions/KA-01981.html'],
      },
      {
        claim: 'SSA corrected-card 申请通常要提供身份、新法定姓名和改名事件证据，并可能要证明公民身份或 lawful noncitizen status。',
        sourceUrls: ['https://www.ssa.gov/faqs/en/questions/KA-01981.html'],
      },
      {
        claim:
          '改名文件不足以识别本人，或改名已超过两年（未满 18 岁为四年）时，SSA 会要求旧姓名身份证明，并可接受已经过期的旧姓名证件。',
        sourceUrls: ['https://www.ssa.gov/ssnumber/ss5doc.htm'],
      },
      {
        claim: 'SSA 不接受普通 photocopy 或仅由 notary 认证的副本，要求原件或由记录保管机构认证的副本。',
        sourceUrls: ['https://www.ssa.gov/ssnumber/ss5doc.htm'],
      },
      {
        claim: 'New York REAL ID / Enhanced 只能显示 full legal name，昵称、缩写名或 confirmation name 可能需要额外证明。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/enhanced-or-real-id'],
      },
      {
        claim: 'New York 因一次或多次婚姻、离婚等变更姓名时，要求提供每一次变更的文件来证明连续连接。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/enhanced-or-real-id'],
      },
      {
        claim: 'New York Standard document 的部分姓名变更路径要求新姓名已经在 SSA 记录中更新并与请求的 DMV 姓名准确匹配。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/change-information-on-dmv-photo-documents'],
      },
      {
        claim: 'California REAL ID 的 identity document 姓名与申请姓名不同时，需要相应 legal name change document。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/'],
      },
      {
        claim: 'California 居住文件姓名因婚姻、离婚或法院命令而与关系追溯文件不同时，会要求额外姓名变更证明。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/'],
      },
      {
        claim:
          'California 办理 DL/ID 姓名变更时会先与 SSA 核验新姓名；SSA 信息不匹配会导致申请不能按新姓名完成。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/',
        ],
      },
      {
        claim:
          'Florida 驾照或 ID 姓名变更要求先更新 SSA，并建议等待 24 至 48 小时；婚姻、离婚或法院改名要提交原件或 certified copy，church-issued marriage certificate 不被接受。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/',
          'https://www.flhsmv.gov/name-and-address-changes/',
        ],
      },
      {
        claim: 'Massachusetts REAL ID 要求当前姓名与提交文件一致，不一致时要提供 marriage certificate 或 court document 等证明。',
        sourceUrls: ['https://www.mass.gov/info-details/massachusetts-identification-id-requirements'],
      },
      {
        claim: 'Pennsylvania REAL ID document requirements 将姓名变更文件作为身份材料不一致时的独立证明类别。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check'],
      },
    ],
    editorNotes: [
      '这页的核心不是“带一张结婚证”，而是证明从原始身份文件姓名到当前法定姓名的连续链条。',
      '不同州对认证副本、翻译件和多次改名文件要求不同；外文文件尤其要回到州页面确认。',
      '如果 SSN 记录、移民文件和驾照申请姓名不一致，可能先要处理记录更新，再办理 DMV 业务；不能把 California 或 Florida 的顺序写成全国统一规则。',
    ],
    sources: [
      {
        label: 'SSA Correct or Change Name FAQ',
        url: 'https://www.ssa.gov/faqs/en/questions/KA-01981.html',
      },
      {
        label: 'SSA Learn What Documents You Need',
        url: 'https://www.ssa.gov/ssnumber/ss5doc.htm',
      },
      {
        label: 'California DMV REAL ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/',
      },
      {
        label: 'California DMV REAL ID Checklist',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/',
      },
      {
        label: 'California DMV Update DL/ID Information',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/',
      },
      {
        label: 'NY DMV Enhanced or REAL ID',
        url: 'https://dmv.ny.gov/driver-license/enhanced-or-real-id',
      },
      {
        label: 'NY DMV Change Information on Photo Documents',
        url: 'https://dmv.ny.gov/driver-license/change-information-on-dmv-photo-documents',
      },
      {
        label: 'PA REAL ID Document Requirements',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id/real-id-document-check',
      },
      {
        label: 'Massachusetts Identification Requirements',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
      },
      {
        label: 'FLHSMV What to Bring - U.S. Citizen',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/u-s-citizen/',
      },
      {
        label: 'FLHSMV Name and Address Changes',
        url: 'https://www.flhsmv.gov/name-and-address-changes/',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'massachusetts', 'pennsylvania', 'florida'],
  },
  {
    slug: 'non-citizen-license-id',
    title: '非美国公民办理驾照或 REAL ID 的注意点',
    eyebrow: '身份类别',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '非美国公民办理驾照或州 ID 时，要把证件类型、个人移民类别、SSN 状态和联邦记录核验分开处理。F-1、J-1、H-1B、家属、绿卡、EAD、庇护等身份不能共用一张材料清单。',
    whoNeedsIt: [
      'F-1、J-1、H-1B、L-1、H-4、绿卡、庇护或其他身份持有人。',
      'I-94、I-20、DS-2019、EAD 或移民文件即将到期的人。',
      '州 DMV 页面有 “non-U.S. citizen” 或 “lawful presence” 分类的人。',
    ],
    keyFacts: [
      'REAL ID 合规州证件要求按联邦规则证明 lawful status；Standard 或其他州内驾驶路径是否要求同样材料，取决于州法和证件类型。',
      '非公民不是一个文件类别。Florida 例如要求 I-94 配有效护照，并按 F/M、J、refugee、asylee、parolee 等类别补 I-20、DS-2019 或其他材料。',
      '同一人的护照、I-94、I-20/DS-2019、EAD、I-797 和 SSA 记录中的姓名、生日、号码及身份类别应相互对得上；旧文件和新文件不要混成一套。',
      '州机构可能通过 USCIS SAVE 核验公民身份或移民状态。SAVE 向办理机构返回核验信息，但不替州机构决定申请人是否符合驾照或 ID 的签发资格。',
      'SAVE 初次未即时核验不等于自动不符合资格。机构可能提交 additional verification，申请人可用 CaseCheck 查看状态并在结果返回后联系 DMV。',
      '证件期限可能受 lawful-presence 文件影响。Florida、Georgia、California 和 Texas 都有 limited-term / temporary 相关处理，但具体期限和卡面规则不能跨州套用。',
      '移民文件即将到期不等于一律不能申请，但有些州要求文件至少剩余一定有效期，或只能签发短期凭证；例如 Florida 页面写有超过 30 天的文件有效期条件。',
      '驾照或 ID 不是美国移民身份的证明。Georgia 明确提醒，LIMITED-TERM 卡本身不证明 lawful status，卡到期也不自动说明持有人失去合法身份。',
    ],
    checklist: [
      '先选证件：REAL ID、Standard license、State ID、permit、CDL 或州内特殊驾驶证件。',
      '按当前身份类别列文件：passport、visa、I-94、I-20、DS-2019、I-797、I-766/EAD、I-551/green card 或相应法院/USCIS 文件。',
      '核对每份文件的姓名、生日、document number、A-Number、SEVIS ID、admit-until date 和类别是否一致。',
      '使用最新签发的文件，保留旧文件用于解释历史，但不要把已失效文件作为当前资格的唯一依据。',
      '确认 SSN 状态：已获发号码、SSA denial/ineligibility letter、Affidavit of No SSN 或州允许的其他路径。',
      '准备本州要求的一份或两份 residential-address 文件，并按姓名链解释旧姓或不同姓名。',
      '检查州页面是否要求所有文件为 English、原件/certified copy、完整翻译或现场办理。',
      '若 DMV 已提交 SAVE 核验，索取或保存 case verification number，用 USCIS CaseCheck 跟踪，不要每天重新申请。',
    ],
    steps: [
      '第一步：从州 DMV 的 non-U.S. citizen、temporary visitor 或 lawful presence 入口开始，不使用 U.S. citizen checklist。',
      '第二步：确认当前身份类别和最新文件。F/M 配 I-20、J 配 DS-2019 等只是州页面示例，个人还可能需要 I-94、passport、I-797 或 EAD。',
      '第三步：把记录对齐。姓名变更、护照换发、I-94 错误或 SEVIS/USCIS 记录未更新时，先联系有权更改该记录的机构。',
      '第四步：同时准备 SSN 状态、州居住地址和姓名变更文件；通过 lawful-status 核验并不代表其他材料自动合格。',
      '第五步：按州要求到场提交原件、certified copy 和译文。Georgia 要求 non-citizen 到 Customer Service Center 现场提交有效移民文件。',
      '第六步：遇到 SAVE pending 时，向 DMV 确认是否已进入 additional verification，并用 CaseCheck 跟踪；SAVE 返回后仍要联系办理机构继续申请。',
      '第七步：收到卡后核对姓名、类别、LIMITED-TERM / Federal Limits Apply 标记和到期日；发现错误立即走签发州更正流程。',
    ],
    faqs: [
      {
        question: 'F-1 学生可以办 REAL ID 吗？',
        answer:
          '有可能，但不是凭 F-1 标签自动获批。州会按 REAL ID lawful-status 规则和本州清单核验 passport、I-94、I-20、SSN 状态和地址等材料，并可能通过 SAVE 复核；证件期限也可能受文件有效期影响。',
      },
      {
        question: '驾照到期日为什么比别人短？',
        answer:
          '非公民证件有效期有时会受合法身份文件期限影响。具体规则由州 DMV 执行。',
      },
      {
        question: 'SAVE 没有马上通过，是不是我的申请被拒了？',
        answer:
          '不一定。SAVE 可能需要 additional verification。它只向办理机构提供移民状态信息，最终资格由 DMV 决定。保存 verification case number，用 USCIS CaseCheck 查看进度，并按 DMV 要求补文件或返回办理。',
      },
      {
        question: 'I-94、I-20 或护照上的姓名不一样怎么办？',
        answer:
          '不要只靠现场解释。先判断哪一条记录需要由 CBP、USCIS、学校 DSO、Department of State 或护照签发机构更正，再按州 DMV 姓名链和翻译规则准备证明。DMV 不能替这些机构修改源记录。',
      },
      {
        question: 'LIMITED-TERM 卡到期，是不是代表身份非法？',
        answer:
          '不能这样推断。Georgia DDS 明确说 Georgia DL/ID 不是 lawful status 的证明，LIMITED-TERM 卡过期也不表示持有人必然非法停留。移民状态应由相应联邦文件和机构判断。',
      },
    ],
    factChecks: [
      {
        claim: 'REAL ID 合规州证件要求证明 lawful status，州仍可依法签发明确标注为非联邦用途的其他证件。',
        sourceUrls: ['https://www.dhs.gov/real-id'],
      },
      {
        claim: 'Florida 非移民申请材料将 I-94 与有效护照配套，并要求 F/M 类别带 I-20、J 类别带 DS-2019。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/'],
      },
      {
        claim: 'Florida 非移民材料页提示相关身份文件在签发日时应有超过 30 天的有效期，并在核验后邮寄正式证件。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/'],
      },
      {
        claim: 'Georgia 要求 non-U.S. citizens 到 Customer Service Center 现场提交有效移民文件，证明 identity 和 lawful status。',
        sourceUrls: ['https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens'],
      },
      {
        claim: 'Georgia 要求提交给 DDS 的 non-citizen 文件使用 English，并对外州证件遗失等场景另设 certified driving record 规则。',
        sourceUrls: ['https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens'],
      },
      {
        claim: 'Georgia 通过 USCIS SAVE 核验非公民移民文件，少数案件可能需要数日而不能在柜台即时完成。',
        sourceUrls: ['https://dds.georgia.gov/save'],
      },
      {
        claim: 'USCIS SAVE 提供身份状态信息给签发福利或执照的机构，但不替该机构决定申请人是否有资格获得驾照或 ID。',
        sourceUrls: [
          'https://save.uscis.gov/save/app/client/ui/case-check',
          'https://www.uscis.gov/sites/default/files/document/fact-sheets/SAVE_FACT_SHEET_for_Benefit_Applicants.pdf',
        ],
      },
      {
        claim: '申请人在机构提交 SAVE 核验后，可以使用 CaseCheck 跟踪核验进度，并在结果返回后联系原办理机构。',
        sourceUrls: [
          'https://save.uscis.gov/save/app/client/ui/case-check',
          'https://www.uscis.gov/sites/default/files/document/fact-sheets/SAVE_FACT_SHEET_for_Benefit_Applicants.pdf',
        ],
      },
      {
        claim:
          'SAVE 初次未即时核验时可进入 additional verification；这表示核验仍在继续，不等于州机构已经作出不符合资格的决定。',
        sourceUrls: [
          'https://www.uscis.gov/sites/default/files/document/guides/SAVE-Guide%20to%20Understanding%20SAVE%20Verification%20Responses.pdf',
        ],
      },
      {
        claim: 'Georgia LIMITED-TERM DL/ID 的期限可与获准停留时间相关，但卡片本身不是 lawful status 证明。',
        sourceUrls: ['https://dds.georgia.gov/partners/limited-term-dlids'],
      },
      {
        claim: 'California 对 temporary lawful status 申请人设置 limited-term DL/ID 路径，并要求相应 original identity / lawful-presence 文件。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/limited-term-for-legal-presence/'],
      },
      {
        claim:
          'Texas 对符合条件的 temporary visitor 签发标有 Limited Term 的驾照或 ID，通常随 lawful-presence period 到期；duration of status 情况按 Texas 规则处理。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
        ],
      },
    ],
    editorNotes: [
      '这页不是移民建议，只提醒 DMV 办证时常见的 lawful presence、身份有效期和二次核验问题。',
      '非公民不要使用美国公民材料清单；佛州、马州、佐州等页面都会按身份类别或合法身份分流。',
      '身份文件接近到期、姓名不一致、I-94/护照/签证记录不一致时，现场失败或延迟风险更高。',
    ],
    sources: [
      {
        label: 'DHS REAL ID',
        url: 'https://www.dhs.gov/real-id',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
      {
        label: 'Massachusetts Identification Requirements',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
      },
      {
        label: 'Georgia DDS REAL ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/real-id',
      },
      {
        label: 'Georgia DDS Information for Non-US Citizens',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens',
      },
      {
        label: 'Georgia DDS SAVE',
        url: 'https://dds.georgia.gov/save',
      },
      {
        label: 'Georgia DDS Limited Term DL/IDs',
        url: 'https://dds.georgia.gov/partners/limited-term-dlids',
      },
      {
        label: 'USCIS SAVE for Benefit Applicants',
        url: 'https://www.uscis.gov/sites/default/files/document/fact-sheets/SAVE_FACT_SHEET_for_Benefit_Applicants.pdf',
      },
      {
        label: 'USCIS SAVE CaseCheck',
        url: 'https://save.uscis.gov/save/app/client/ui/case-check',
      },
      {
        label: 'USCIS Guide to Understanding SAVE Verification Responses',
        url: 'https://www.uscis.gov/sites/default/files/document/guides/SAVE-Guide%20to%20Understanding%20SAVE%20Verification%20Responses.pdf',
      },
      {
        label: 'California DMV Limited Term for Legal Presence',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/limited-term-for-legal-presence/',
      },
      {
        label: 'Texas DPS Verifying Lawful Presence',
        url: 'https://www.dps.texas.gov/driverlicense/documents/verifyinglawfulpresence.pdf',
      },
      {
        label: 'Texas DPS Driver Licenses and IDs for Temporary Visitors',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
      },
    ],
    relatedStateIds: ['florida', 'massachusetts', 'georgia', 'california', 'texas'],
  },
  {
    slug: 'standard-license-driving-privilege-no-lawful-status',
    title: '没有 lawful status，驾照、REAL ID 和 Driving Privilege Card 怎么分',
    eyebrow: '非 REAL ID 路径',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      'REAL ID 通常要求证明 lawful status，但这不等于所有州都完全不能办理驾驶用途证件。部分州有 Standard license、noncompliant license、drive-only license、AB 60 或 Driving Privilege Card 这类州内驾驶路径，规则必须按州确认。',
    whoNeedsIt: [
      '无法提供美国合法居留证明，但想确认是否能在所在州合法开车的人。',
      '看到 AB 60、Green Light Law、drive-only、DPC、noncompliant 或 standard license 等词但不确定差别的人。',
      '有外国护照、领馆证、ITIN、无 SSN affidavit 或州居住材料，但不能办 REAL ID 的人。',
      '担心拿到的证件不能登机、不能做联邦身份用途或不能作为政府 ID 的人。',
    ],
    keyFacts: [
      'REAL ID 和驾驶用途证件是两个问题。REAL ID 用于联邦身份用途，州内驾驶证件用于证明驾驶资格。',
      'DHS REAL ID 框架和州 DMV 页面通常把 REAL ID 与 lawful status / legal presence 核验绑定；无法证明 lawful status 的人不要按 REAL ID 清单准备。',
      '部分州提供非 REAL ID 驾驶路径，但名称不同：California AB 60、New York Standard license、Massachusetts Standard license、Connecticut drive-only license、Utah / Delaware Driving Privilege Card、Maryland noncompliant license、Colorado standard credential 等。',
      '这些证件都不是 REAL ID，通常不能直接用于 TSA 国内航班或其他要求 REAL ID 的联邦用途，也不会赋予投票资格或移民身份。能否作为州内一般身份证件并不统一：Colorado Standard 是有效的 Colorado ID，而 Utah / Delaware DPC 明确不是政府或一般身份证件。',
      '申请人仍然通常要证明身份、出生日期、州居住地址，并通过知识考试、视力或路考；没有 lawful status 不等于免材料、免考试。',
      'CDL、commercial license、REAL ID、Enhanced license 和部分州 ID 规则更严格，不能把普通非商业驾驶路径套过去。',
      '证件名称会更新。Illinois 已从 2024 年 7 月 1 日起用四年 Standard driver license 取代旧 TVDL，并在卡面标注 Federal Limits Apply；旧 TVDL 教程不能继续照搬。',
    ],
    checklist: [
      '先确认你的州是否有这类非 REAL ID 驾驶路径；没有全国统一申请入口。',
      '分清证件名称：standard license、noncompliant license、drive-only license、AB 60、DPC 或普通 REAL ID 不是同一种证件。',
      '核对身份文件：外国护照、领馆证、出生证明、EAD、法院/学校/银行文件或州认可文件是否在官方清单内。',
      '核对号码要求：SSN、ITIN、无 SSN/ITIN affidavit 或 SSA ineligibility letter 的规则各州不同。',
      '准备州居住地址证明，并确认 P.O. Box、PMB、宿舍信箱或别人的账单是否可用。',
      '确认卡面用途限制：是否能登机、是否能作政府 ID、是否有联邦用途限制、有效期多久。',
    ],
    steps: [
      '第一步：打开本州 DMV 的 non-citizen、standard license、drive-only、driving privilege、AB 60 或 noncompliant license 页面，而不是只看 REAL ID 页面。',
      '第二步：确认这个路径是否适用于无法证明 lawful status 的居民，还是只适用于 temporary lawful presence、无 SSN、或其他身份类别。',
      '第三步：把材料分成四组：身份和生日、州居住地址、SSN / ITIN / affidavit、考试或驾驶经历。',
      '第四步：如果文件不是英文，先查 certified translation、English translation 或领馆文件规则，避免现场被退。',
      '第五步：预约前确认办公室类型。有些州把这类申请放在指定 DMV、licensing center 或必须预约的服务中。',
      '第六步：拿到证件后，按卡面限制使用。需要登机、联邦设施、国际旅行或移民身份用途时，改查 TSA、DHS 或护照/移民文件要求。',
    ],
    faqs: [
      {
        question: '没有 lawful status 是不是一定不能办驾照？',
        answer:
          '不是全国统一答案。REAL ID 通常不行，但 California、New York、Massachusetts、Illinois、Connecticut、Colorado、Maryland、Utah、Delaware、New Mexico、New Jersey 等官方页面显示了不同形式的非 REAL ID 或驾驶用途路径。必须看所在州和当前证件名称。',
      },
      {
        question: '这类证件可以坐飞机吗？',
        answer:
          '通常不能当作 REAL ID 使用。TSA 国内航班需要 REAL ID 合规证件或 TSA 接受的其他证件，例如护照。Standard、drive-only、DPC 或 noncompliant 证件要按卡面和 TSA 页面确认。',
      },
      {
        question: 'Standard license 和 REAL ID license 外观看起来很像，怎么判断？',
        answer:
          '看卡面标记和州说明。很多州会用星标表示 REAL ID 合规；非合规证件可能写有 Federal Limits Apply、Not for Federal Identification、Not Valid for Federal Official Purposes 等类似提示。',
      },
      {
        question: '有 ITIN 或没有 SSN affidavit 就一定能办吗？',
        answer:
          '不一定。NJ、NY 等州有自己的 SSN / ITIN / affidavit 规则；其他州可能完全不同。号码文件只是材料的一组，还要满足身份、居住、考试和州资格要求。',
      },
      {
        question: '拿到 driving privilege card 等于有合法身份吗？',
        answer:
          '不是。这类证件通常只解决州内驾驶资格或有限身份用途，不提供移民身份，也不是公民身份、投票资格或联邦身份文件。',
      },
    ],
    factChecks: [
      {
        claim: 'DHS REAL ID 规则要求申请人证明 lawful status；无法完成该核验时，不能把州级驾驶用途证件当作 REAL ID。',
        sourceUrls: ['https://www.dhs.gov/real-id'],
      },
      {
        claim: 'California AB 60 允许无法提供 satisfactory legal presence 证明的合格居民申请驾照，但仍要证明身份和 California residency 并完成考试。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/',
        ],
      },
      {
        claim: 'New York Green Light Law 允许年满 16 岁者不论 citizenship 或 lawful status 申请 Standard 非商业驾照，并可用无 SSN affidavit 路径。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/driver-licenses-and-the-green-light-law'],
      },
      {
        claim: 'New York Green Light 路径不提供 non-driver ID 或 CDL，卡面也会标注其不能用于联邦用途。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/driver-licenses-and-the-green-light-law'],
      },
      {
        claim: 'New Jersey 首次申请人可不论移民身份申请 basic driver license；Standard 身份清单接受 SSN、ITIN 或符合条件的 affidavit 路径。',
        sourceUrls: [
          'https://www.nj.gov/mvc/pdf/license/FAQ_firsttime.pdf',
          'https://www.nj.gov/mvc/license/6pointid.htm',
        ],
      },
      {
        claim: 'Illinois 自 2024 年 7 月 1 日起以四年 Standard driver license 取代旧 TVDL，新的非 REAL ID 卡面写有 Federal Limits Apply。',
        sourceUrls: [
          'https://www.ilsos.gov/news/2024/july/240701d1.pdf',
          'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf',
        ],
      },
      {
        claim: 'Maryland 对没有有效 USCIS 文件的 noncompliant credential 申请人要求取得 Maryland tax certification letter，并先有两年州所得税申报记录。',
        sourceUrls: [
          'https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids',
        ],
      },
      {
        claim: 'Colorado 的 Standard credential 不是 REAL ID，但可作为 Colorado 身份证件；相关申请路径仍要求一份当前实际居住地址证明且不接受 P.O. Box。',
        sourceUrls: ['https://dmv.colorado.gov/drivers/standard-license-and-ID-cards'],
      },
      {
        claim: 'Connecticut drive-only license 只用于驾驶而不能用于一般身份证明或投票，但可用于在 Connecticut 登记车辆；外州同类证件不能直接转入。',
        sourceUrls: [
          'https://portal.ct.gov/dmv/licenses-permits-ids/get-drive-only-license/faqs-drive-only-license',
        ],
      },
      {
        claim: 'Utah Driving Privilege Card 是 Class D 驾驶用途证件，不能作为 Utah 政府 ID、不能用于 CDL，且通常在申请人下一次生日到期。',
        sourceUrls: ['https://dld.utah.gov/what-is-a-driving-privilege-card/'],
      },
      {
        claim:
          'Massachusetts 可向无法提供 lawful presence、但满足其他驾驶资格并证明身份、生日和州居住要求的申请人签发非联邦用途 Standard license。',
        sourceUrls: ['https://www.mass.gov/info-details/mass-general-laws-c90-ss-8'],
      },
      {
        claim:
          'Delaware DPC 面向无法提供 legal presence 的合格 Delaware 居民，仅用于驾驶并明确标注 Not Valid for Identification。',
        sourceUrls: ['https://dmv.de.gov/DriverServices/drivers_license/DPC/index.shtml'],
      },
      {
        claim:
          'New Mexico 为 noncommercial Standard driver license 和 not-intended-for-federal-purposes ID 设置单独材料路径，不能把它当作 REAL ID。',
        sourceUrls: [
          'https://www.mvd.newmexico.gov/chapter-7-standard-drivers-license-and-not-intended-for-federal-purposes-id/',
          'https://www.mvd.newmexico.gov/wp-content/uploads/2023/05/RevisedStandardacceptabledocs3.10.23.pdf',
        ],
      },
    ],
    editorNotes: [
      '这页不提供移民法律建议，也不判断个人是否应申请；只解释 DMV 证件路径和用途限制。',
      '“没有 lawful status”不能写成一个全国规则。不同州可能完全无此路径，或把路径限定为 standard / noncompliant / drive-only / DPC。',
      'REAL ID、Enhanced ID、CDL 和普通非商业驾驶证件要明确分开；尤其 Enhanced 通常还涉及美国公民身份。',
      '纽约 Green Light Law 页面强调这只涉及纽约州驾驶权限，不提供公民身份路径；这类句子应作为整页风险提醒。',
      '如果州页面要求 affidavit、税务 filing、领馆证、翻译件或指定预约，不要把其他州的宽松规则套用过来。',
    ],
    relatedDirectory: {
      label: '查看 SSN / 身份类别分流表',
      href: '/directories/identity-ssn/',
      description: '按州查 lawful presence、SSN、ITIN、无 SSN affidavit、非公民材料和标准/REAL ID 路径。',
    },
    sources: [
      {
        label: 'DHS REAL ID',
        url: 'https://www.dhs.gov/real-id',
      },
      {
        label: 'California DMV AB 60 Driver Licenses',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/',
      },
      {
        label: 'NY DMV Green Light Law',
        url: 'https://dmv.ny.gov/driver-license/driver-licenses-and-the-green-light-law',
      },
      {
        label: 'NY DMV Standard License Without SSN',
        url: 'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility',
      },
      {
        label: 'NJ MVC 6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
      },
      {
        label: 'Illinois SOS Standard License for Former TVDL Applicants',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_tvdl22.pdf',
      },
      {
        label: 'Illinois SOS 2024 Standard License Announcement',
        url: 'https://www.ilsos.gov/news/2024/july/240701d1.pdf',
      },
      {
        label: 'Maryland MVA Noncompliant Driver Licenses and IDs',
        url: 'https://mva.maryland.gov/licenses-ids/additional-driver-id-services/noncompliant-drivers-licenses-ids',
      },
      {
        label: 'Colorado DMV Standard Licenses and IDs',
        url: 'https://dmv.colorado.gov/drivers/standard-license-and-ID-cards',
      },
      {
        label: 'Connecticut DMV Drive-only License FAQ',
        url: 'https://portal.ct.gov/dmv/licenses-permits-ids/get-drive-only-license/faqs-drive-only-license',
      },
      {
        label: 'Utah DLD Driving Privilege Card',
        url: 'https://dld.utah.gov/what-is-a-driving-privilege-card/',
      },
      {
        label: 'Delaware DMV Driving Privilege Card',
        url: 'https://dmv.de.gov/DriverServices/drivers_license/DPC/index.shtml',
      },
      {
        label: 'New Mexico MVD Driver Licenses and IDs',
        url: 'https://www.mvd.newmexico.gov/nm-drivers-licenses-ids/',
      },
      {
        label: 'New Mexico Standard License Procedures',
        url: 'https://www.mvd.newmexico.gov/chapter-7-standard-drivers-license-and-not-intended-for-federal-purposes-id/',
      },
      {
        label: 'New Mexico Standard License Acceptable Documents',
        url: 'https://www.mvd.newmexico.gov/wp-content/uploads/2023/05/RevisedStandardacceptabledocs3.10.23.pdf',
      },
      {
        label: 'Massachusetts General Laws Chapter 90 Section 8',
        url: 'https://www.mass.gov/info-details/mass-general-laws-c90-ss-8',
      },
      {
        label: 'Washington DOL REAL ID',
        url: 'https://dol.wa.gov/id-cards/real-id',
      },
      {
        label: 'NJ MVC First Time Driver License FAQ',
        url: 'https://www.nj.gov/mvc/pdf/license/FAQ_firsttime.pdf',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'new-jersey',
      'illinois',
      'maryland',
      'colorado',
      'connecticut',
      'utah',
      'delaware',
      'new-mexico',
      'washington',
    ],
  },
  {
    slug: 'state-id-non-driver-id-real-id-card',
    title: '不考驾照，只办 State ID / non-driver ID 怎么准备',
    eyebrow: '州身份证',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '不准备开车，也可以在很多州申请 state ID、non-driver ID、photo ID、Mass ID 或 Enhanced ID。先分清普通 ID、REAL ID-compliant ID、Enhanced ID、移动 ID、驾照换 ID、未成年人 ID 和无家可归 / 低收入费用减免，避免把 ID card 当成驾照或护照来用。',
    whoNeedsIt: [
      '不准备考驾照，但需要银行、学校、租房、年龄证明、机场安检或日常身份证件的人。',
      '留学生、访问学者、H-4 / J-2 家属、老人、不会开车的人，想知道是否必须先考 permit 或 road test 的人。',
      '已经有驾照但不再开车，想把 driver license surrender / exchange 成 ID card 的人。',
      '给未成年孩子、老人、无家可归者、无固定账单者或低收入申请人准备州 ID 材料的人。',
      '不确定普通 state ID、REAL ID ID card、Enhanced ID、mobile ID 和护照各自能用在哪里的人。',
    ],
    keyFacts: [
      'State ID / non-driver ID 是身份证件，不是驾驶资格。California DMV 明确说 ID card 可用于证明身份或年龄，但不允许驾驶；PennDOT 也说明 photo ID 不是 driver license。',
      'REAL ID 可以是 driver license，也可以是 identification card。DHS、TSA、California、Florida、Virginia、Pennsylvania 等官方页面都把 REAL ID-compliant driver license / ID card 放在同一类联邦身份用途里。',
      '普通 ID 不一定能登机。California 和 Washington 都说明 standard ID 有州内身份用途，但不能替代 REAL ID、passport 或 Enhanced ID 处理特定联邦 / 边境用途。',
      'Enhanced ID 不是每个州都有。Washington DOL 说明 EID 可作为从陆路或海路返回美国的 passport alternative，但 standard ID 不能用于 border crossing；申请 EID 还有更严格材料。',
      '有些州不允许同时持有 driver license 和 ID card，或要求换 ID 时 surrender license。Texas DPS 和 Virginia DMV 都明确写到，持有 driver license 时申请 ID 需要 surrender 或 exchange；Georgia 则有自己的 online / in-person 条件。',
      '年龄门槛州别化。California 和 New York 都提到任何年龄可申请 ID / non-driver ID；Washington 说没有最低年龄；Pennsylvania photo ID 要求至少 10 岁；Virginia 把 adult ID 和 child ID 拆开。',
      '材料通常还是 identity、lawful presence / legal presence、SSN、residency、name change 这些组。State ID 不考试，但不等于材料更少。',
      '实体卡大多会邮寄。California ID 约 3-4 周寄达；Texas ID 约 2-3 周寄达；Washington ID 约 7-10 天寄达，临时 ID 因没有照片/签名不能当正式 ID 使用；Virginia 也提醒 USPS 不会转寄 ID。',
      '低收入、无家可归、老人或特定人群可能有 fee waiver / reduced fee。California 有 reduced/no-fee/senior ID；Washington 有 unhoused 和 reduced-fee ID 帮助；Pennsylvania 提供无家可归者免费 ID 入口。',
      'Mobile ID 通常是 companion，不应替代实体卡。New York 和 Virginia 都提醒仍要保留或携带 physical driver license / permit / non-driver ID，尤其在驾驶、旅行或机构不接受移动 ID 时。',
    ],
    factChecks: [
      {
        claim: 'California 的 ID card 用于证明身份或年龄，不提供驾驶资格，并可向符合条件的任何年龄申请人签发。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/'],
      },
      {
        claim: 'REAL ID 可以是 driver license，也可以是 state identification card；是否有驾驶资格取决于证件本身是不是驾照。',
        sourceUrls: ['https://www.dhs.gov/real-id', 'https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'California standard ID 仍可用于州内证明身份或年龄，但不能代替 REAL ID 或其他 TSA 接受证件处理联邦用途。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/',
          'https://www.tsa.gov/travel/security-screening/identification',
        ],
      },
      {
        claim: 'Washington standard ID 不能用于边境通行；该州 Enhanced ID 可按官方说明用于从陆路或海路返回美国。',
        sourceUrls: [
          'https://dol.wa.gov/id-cards/get-id-card',
          'https://dol.wa.gov/id-cards/enhanced-id-card-eid/get-enhanced-id-card-eid',
        ],
      },
      {
        claim: 'Texas 申请人如果已经持有 driver license，申请 identification card 时通常必须 surrender 该驾照。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card'],
      },
      {
        claim: 'State ID 的年龄规则并不统一：California 可向任何年龄签发，Washington 没有最低年龄，Virginia 则分别设置 adult 和 child ID 路径。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/',
          'https://dol.wa.gov/id-cards/get-id-card',
          'https://www.dmv.virginia.gov/licenses-ids/id-cards/adult-id',
          'https://www.dmv.virginia.gov/licenses-ids/id-cards/child-id',
        ],
      },
      {
        claim: 'State ID 不要求路考，但申请人仍可能需要证明身份、SSN、居住地址、lawful presence 和姓名一致性。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/',
          'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card',
          'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
        ],
      },
      {
        claim: 'California ID 通常在三到四周内邮寄；Texas ID 通常约两到三周寄达；Washington 的临时 ID 因缺少照片和签名不能当正式 ID 使用。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/',
          'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card',
          'https://dol.wa.gov/id-cards/get-id-card',
        ],
      },
      {
        claim: 'California 为符合条件的老人、低收入和无家可归申请人提供 no-fee 或 reduced-fee ID 路径，不能只按普通费用判断。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/'],
      },
      {
        claim: 'New Jersey non-driver ID 和 Massachusetts Mass ID 都有自己的身份与地址材料要求，不能用驾照考试清单或其他州清单替代。',
        sourceUrls: [
          'https://www.nj.gov/mvc/license/nondriverid.htm',
          'https://www.nj.gov/mvc/license/6pointid.htm',
          'https://www.mass.gov/how-to/apply-for-a-massachusetts-identification-card-mass-id',
          'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
        ],
      },
    ],
    checklist: [
      '先决定用途：州内年龄/身份、国内航班、联邦设施、陆海边境回美、银行/学校/租房，还是只是替代不再使用的驾照。',
      '确认证件类型：standard ID、REAL ID ID card、Enhanced ID / EID、Mass ID、photo ID、non-driver ID、child ID、senior ID、mobile ID 或 replacement。',
      '准备身份和生日文件：护照、出生证明、绿卡、EAD、I-94/签证文件、领馆证、州认可身份证明等，按本州清单选。',
      '准备 SSN 或替代路径：SSN、W-2、SSA 文件、ITIN、affidavit、不可取得 SSN 说明或州认可的电子核验方式。',
      '准备居住地址证明：通常需要当前州 residential address；P.O. Box、转寄地址、宿舍、shelter 或朋友家地址要单独查本州规则。',
      '姓名不一致时准备完整 name change chain：婚姻、离婚、法院改名、收养、入籍文件等原件或 certified copy。',
      '如果已经有 driver license、learner permit 或外州 ID，确认是否必须 surrender、exchange、destroy duplicate，或是否不能同时持有两种 credential。',
      '确认申请方式、预约、照片、费用、邮寄地址、临时 ID 的限制，以及实体卡预计多久寄到。',
    ],
    steps: [
      '第一步：不要从“驾照考试”入口开始。打开州 DMV / DPS / RMV / MVC / DOL 的 ID card、non-driver ID、photo ID 或 identification card 页面。',
      '第二步：按用途选证件。只要州内日常身份，可看 standard ID；要登机或联邦设施，查 REAL ID ID card；要陆海边境回美且本州提供 EID，再看 Enhanced ID。',
      '第三步：确认是否已有驾照或 permit。Texas 和 Virginia 明确把 driver license 与 ID card 持有关系写出来；如果你要把驾照换成 ID，按 exchange / surrender 路径准备。',
      '第四步：用州官方 document guide 或 checklist 整理材料。State ID 不需要路考，但 identity、SSN、residency、lawful presence、name change 仍可能要原件。',
      '第五步：预约或到 office 办理时确认照片、指纹/签名、付款方式和邮寄地址。搬家、地址不稳或使用 shelter / organization 地址时，先看无家可归或特殊地址帮助页面。',
      '第六步：拿到临时 ID 后不要马上当成正式 ID 使用。等实体卡到手；如果近期要坐飞机，带护照或 TSA 接受的其他实体证件更稳。',
      '第七步：续期、补证、升级 REAL ID 或换地址时回到同州 ID card 页面。不要用 driver license renewal 页面假设 ID card 规则完全相同。',
    ],
    faqs: [
      {
        question: '不考驾照，可以直接办 State ID 吗？',
        answer:
          '通常可以。很多州的 ID card / non-driver ID 就是给不驾驶的人使用的 photo ID。它一般不要求 permit、笔试或路考，但仍要按州要求证明身份、居住地址、SSN / lawful presence 和姓名一致性。',
      },
      {
        question: 'State ID 可以坐美国国内航班吗？',
        answer:
          '只有 REAL ID-compliant ID card 或 TSA 接受的其他证件才更稳。普通 standard ID 在很多州仍可证明州内身份或年龄，但不能用于 REAL ID 联邦用途。没有 REAL ID ID card 时，护照通常是更稳的旅行备选。',
      },
      {
        question: '我可以同时拿 driver license 和 non-driver ID 吗？',
        answer:
          '不能跨州假设。Texas 和 Virginia 明确写到，持有 driver license 时申请 ID 要 surrender 或 exchange；有些州规则不同。申请前看本州是否允许同时持有，尤其是从驾照转 ID、搬州或外州 credential 场景。',
      },
      {
        question: 'Mobile ID 能不能替代实体 ID？',
        answer:
          '不要默认可以。New York 和 Virginia 都把 mobile ID 写成便利的数字形式，但仍提醒保留或携带 physical credential。机场、银行、学校、警察、酒类销售或外州机构是否接受 mobile ID，要看具体机构和州规则。',
      },
      {
        question: '没有固定住址或没有自己账单，还能办 ID 吗？',
        answer:
          '可能有特殊路径。California 有 no-fee / reduced-fee ID，Washington 有 ID help for the unhoused 和 mailing address 说明，Pennsylvania 有无家可归者免费 ID 入口。不要自己编地址；先找州 DMV 特殊地址、shelter、community organization 或 social service 路径。',
      },
    ],
    editorNotes: [
      '这页专门服务“不考驾照但需要官方 photo ID”的用户，避免把 first-driver-license-road-test 页面拉得太宽。',
      '不要把 State ID 写成全国统一规则。年龄、是否可同时持有驾照、费用减免、实体卡邮寄、mobile ID 和 Enhanced ID 都高度州别化。',
      'REAL ID、Enhanced ID、standard ID、mobile ID 和 passport 要分开写。REAL ID 是联邦用途合规，Enhanced ID 还有边境用途，mobile ID 是接受范围问题，passport 是联邦证件。',
      '无家可归、shelter、低收入、老人、未成年人是高帮助价值分支，但每州项目不同，页面只给判断逻辑和官方入口，不承诺资格。',
      '数字 ID、临时 ID、receipt 和实体 ID 的可用性很容易被误解；所有旅行和联邦用途都应回到 TSA / DHS / 州 DMV 当前页面。',
    ],
    relatedDirectory: {
      label: '查看 DMV 材料规则表',
      href: '/directories/document-rules/',
      description: '按州查看 identity、SSN、地址证明、P.O. Box、姓名变更、原件/认证副本和翻译要求。',
    },
    sources: [
      {
        label: 'DHS REAL ID',
        url: 'https://www.dhs.gov/real-id',
      },
      {
        label: 'TSA Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
      {
        label: 'USA.gov REAL ID',
        url: 'https://www.usa.gov/real-id',
      },
      {
        label: 'California DMV ID Cards',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/identification-id-cards/',
      },
      {
        label: 'California DMV Driver License or ID Card Application',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/',
      },
      {
        label: 'California DMV REAL ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/',
      },
      {
        label: 'NY DMV Non-Driver ID Cards',
        url: 'https://dmv.ny.gov/non-driver-id-card',
      },
      {
        label: 'NY DMV Get a Non-Driver ID',
        url: 'https://dmv.ny.gov/non-driver-id/get-a-non-driver-id',
      },
      {
        label: 'NY DMV Exchange License or Permit for Non-Driver ID',
        url: 'https://dmv.ny.gov/non-driver-id/exchange-driver-license-non-driver-id',
      },
      {
        label: 'NY DMV Renew a Non-Driver ID',
        url: 'https://dmv.ny.gov/non-driver-id/renew-a-non-driver-id',
      },
      {
        label: 'NY DMV Replace a Non-Driver ID',
        url: 'https://dmv.ny.gov/non-driver-id/replace-a-non-driver-id',
      },
      {
        label: 'Texas DPS Apply for a Texas Identification Card',
        url: 'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card',
      },
      {
        label: 'Texas DPS Identification Requirements',
        url: 'https://www.dps.texas.gov/section/driver-license/identification-requirements',
      },
      {
        label: 'Texas DPS Replace Driver License or ID Card',
        url: 'https://www.dps.texas.gov/section/driver-license/replace-your-driver-license-commercial-driver-license-or-id-card',
      },
      {
        label: 'FLHSMV Driver Licenses & ID Cards',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/',
      },
      {
        label: 'FLHSMV What to Bring',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/',
      },
      {
        label: 'FLHSMV REAL ID',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/real-id/',
      },
      {
        label: 'FLHSMV Renew or Replace Your Florida Driver License or ID Card',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'Washington DOL Get an ID Card',
        url: 'https://dol.wa.gov/id-cards/get-id-card',
      },
      {
        label: 'Washington DOL Documents for Proof of Identity',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/documents-proof-identity',
      },
      {
        label: 'Washington DOL REAL ID',
        url: 'https://dol.wa.gov/id-cards/real-id',
      },
      {
        label: 'Washington DOL Enhanced ID Card',
        url: 'https://dol.wa.gov/id-cards/enhanced-id-card-eid/get-enhanced-id-card-eid',
      },
      {
        label: 'Washington DOL ID Help for the Unhoused',
        url: 'https://dol.wa.gov/id-cards/id-help-unhoused',
      },
      {
        label: 'PennDOT Get a Photo ID',
        url: 'https://www.pa.gov/services/dmv/get-a-photo-id',
      },
      {
        label: 'PennDOT Renew a Photo ID',
        url: 'https://www.pa.gov/services/dmv/renew-a-photo-id',
      },
      {
        label: 'PennDOT Replace a Photo ID',
        url: 'https://www.pa.gov/services/dmv/replace-a-photo-id',
      },
      {
        label: 'PennDOT REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id',
      },
      {
        label: 'Virginia DMV Get an Identification Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/get-id',
      },
      {
        label: 'Virginia DMV Adult ID Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/adult-id',
      },
      {
        label: 'Virginia DMV Child ID Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/child-id',
      },
      {
        label: 'Virginia DMV Replace Your Identification Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/replacement-id',
      },
      {
        label: 'Virginia DMV REAL ID',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id',
      },
      {
        label: 'Georgia DDS Get a Georgia State ID Card',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-id-card',
      },
      {
        label: 'Georgia DDS Apply for an ID Card',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/apply-id-card',
      },
      {
        label: 'Georgia DDS REAL ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/real-id',
      },
      {
        label: 'NJ MVC Non-Driver Identification Card',
        url: 'https://www.nj.gov/mvc/license/nondriverid.htm',
      },
      {
        label: 'NJ MVC 6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
      },
      {
        label: 'NJ MVC Application for Permit License or Non-Driver ID PDF',
        url: 'https://www.nj.gov/mvc/pdf/license/BA-208.pdf',
      },
      {
        label: 'NJ MVC Lost or Stolen License or Non-Driver ID',
        url: 'https://www.nj.gov/mvc/license/liclost.htm',
      },
      {
        label: 'Mass.gov Apply for a Massachusetts Identification Card',
        url: 'https://www.mass.gov/how-to/apply-for-a-massachusetts-identification-card-mass-id',
      },
      {
        label: 'Mass.gov RMV-issued Identification Cards',
        url: 'https://www.mass.gov/rmv-issued-identification-cards',
      },
      {
        label: 'Mass.gov Massachusetts Identification Requirements',
        url: 'https://www.mass.gov/info-details/massachusetts-identification-id-requirements',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'pennsylvania',
      'virginia',
      'georgia',
      'new-jersey',
      'massachusetts',
    ],
  },
  {
    slug: 'airport-travel-after-real-id',
    title: 'REAL ID 后坐美国国内航班要带什么',
    eyebrow: '机场安检',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      'REAL ID 联邦执行已经开始。18 岁及以上旅客通过 TSA 机场安检时，通常需要 REAL ID 合规驾照/ID，或护照、军人证等 TSA 接受的其他证件；没有可接受 ID 时，再查看 TSA 当前身份核验选项。',
    whoNeedsIt: [
      '计划坐美国国内航班的人。',
      '驾照上没有 REAL ID 星标或不确定是否合规的人。',
      '不想携带护照但经常飞国内的人。',
    ],
    keyFacts: [
      '18 岁及以上旅客通过 TSA 安检时，可以使用 REAL ID 合规州证件，也可以使用有效护照、护照卡、绿卡、EAD、军人证或 TSA 列出的其他证件。',
      '自 2025 年 5 月 7 日起，非 REAL ID 合规的州驾照/ID 不再是 TSA 接受的有效州证件；它是否还能用于开车，是另一个州法问题。',
      'TSA 当前接受清单内证件在过期后最多两年，但 temporary driver license 明确不在可接受列表内。州 DMV 的临时驾驶效力不能替 TSA 作保证。',
      'TSA 通常不要求 18 岁以下儿童在美国境内旅行时出示身份证件；航空公司仍可能对未成年人、单独旅行或年龄证明另有要求。',
      '没有可接受证件时，现场身份核验可能带来额外筛查，也可能因无法确认身份而不能进入安检区；不要把它当成保证登机的常规方案。',
      'USA.gov 2026 年说明：没有 REAL ID 或其他可接受证件的 18 岁及以上旅客可提前支付 $45 使用 TSA ConfirmID，核验从出发日起有效 10 天。',
    ],
    factChecks: [
      {
        claim: '18 岁及以上旅客可以使用 REAL ID 合规州证件，或 TSA 接受列表中的护照等其他身份证件。',
        sourceUrls: ['https://www.tsa.gov/realid', 'https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'REAL ID 只解决相应联邦身份用途，不能替代国际旅行所需的护照。',
        sourceUrls: ['https://www.dhs.gov/real-id', 'https://www.usa.gov/real-id'],
      },
      {
        claim: '没有 REAL ID 或其他可接受证件时，ConfirmID 属于付费身份核验备选；它不是一张临时 REAL ID。',
        sourceUrls: ['https://www.usa.gov/real-id', 'https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: '自 2025 年 5 月 7 日起，非 REAL ID 合规的州驾照和州 ID 不再被 TSA 接受为有效的州签发机场身份证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'TSA 接受列表还包括护照卡、绿卡、EAD、军人证、Trusted Traveler cards 和部分其他联邦或外国证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'TSA 当前接受清单内证件在过期后最多两年，但 temporary driver license 不属于可接受身份证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'TSA 通常不要求 18 岁以下儿童在美国境内旅行时提供身份证件，航空公司的未成年人规则需另查。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: '没有可接受 ID 的旅客可能被要求完成身份核验并接受额外筛查；身份无法确认时不能进入安检区。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
      {
        claim: 'USA.gov 2026 年列出的 ConfirmID 费用为 $45，提前办理可减少机场延误，核验从出发日起有效 10 天。',
        sourceUrls: ['https://www.usa.gov/real-id'],
      },
      {
        claim: 'REAL ID 还适用于需要联邦可接受身份文件的部分联邦设施，但设施可以有各自的访问与安保规则。',
        sourceUrls: [
          'https://www.dhs.gov/real-id',
          'https://www.dhs.gov/sites/default/files/2025-04/25_0414_fps_id-requirements-for-federal-facilities.pdf',
        ],
      },
    ],
    checklist: [
      '检查驾照/ID 是否有 REAL ID 合规标记。',
      '如果没有，准备有效护照、护照卡或 TSA 接受的其他证件。',
      '确认姓名与机票姓名一致。',
      '出发前再次查看 TSA identification 页面。',
      '如果已经临近出发且没有可接受 ID，查看 USA.gov 和 TSA 的 ConfirmID 当前说明，并预留机场核验时间。',
      '同时查看航空公司的姓名、未成年人和证件规则；TSA 接受证件不等于航空公司所有手续都自动满足。',
    ],
    steps: [
      '第一步：打开 TSA acceptable identification 页面，用你计划携带的具体证件名称逐项核对。',
      '第二步：如果要用州驾照/ID，按签发州官方样卡确认是否 REAL ID 合规，不只凭网上流传的星标图片判断。',
      '第三步：如果州证件不合规，优先选择仍有效的护照、护照卡、绿卡、EAD、军人证或清单内其他实体证件。',
      '第四步：刚续期或补证时，分清永久卡和 temporary credential；临时纸质驾照不能默认过 TSA。',
      '第五步：核对机票姓名、证件姓名、航班日期和航空公司的未成年人/国际转机规则，并把主要证件放入随身行李。',
      '第六步：没有任何可接受证件时，再查看 ConfirmID 或 TSA 现场身份核验，并为额外筛查和不能通过核验的风险预留方案。',
    ],
    faqs: [
      {
        question: '护照可以代替 REAL ID 吗？',
        answer:
          '通常可以。TSA 接受有效护照作为身份文件。REAL ID 的好处是可以用合规州驾照/ID 处理国内航班身份核验。',
      },
      {
        question: '名字有中间名差异会影响登机吗？',
        answer:
          '可能会带来额外核验。尽量让机票姓名与所用证件姓名一致。',
      },
      {
        question: '没有 REAL ID、也没有护照，还能飞吗？',
        answer:
          '可能还有 ConfirmID 或 TSA 身份核验路径，但不是保证。USA.gov 当前列出的 ConfirmID 费用为 $45、从出发日起有效 10 天；身份无法确认时，TSA 可以不让旅客进入安检区。',
      },
      {
        question: '过期一年的护照或 REAL ID 还能用吗？',
        answer:
          'TSA 当前说明接受其清单内证件在过期后最多两年，但证件必须原本就在接受列表中。航空公司、国际行程和目的地规则可能更严格，不要把这一规则用于国际旅行。',
      },
    ],
    editorNotes: [
      '机场场景优先看 TSA 接受证件列表；州 DMV 页面只解决州证件是否 REAL ID-compliant。',
      '临时纸质驾照、interim license 或刚换证的收据未必能通过 TSA，临近出行时应准备护照等替代证件。',
      'REAL ID 不替代国际旅行护照，也不解决签证、入境或航空公司姓名规则问题。',
      'ConfirmID 应写成没有可接受 ID 时的身份核验备选，不要写成“可以买一个 REAL ID 替代品”。',
    ],
    sources: [
      {
        label: 'TSA REAL ID',
        url: 'https://www.tsa.gov/realid',
      },
      {
        label: 'TSA Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
      {
        label: 'DHS REAL ID',
        url: 'https://www.dhs.gov/real-id',
      },
      {
        label: 'USA.gov REAL ID',
        url: 'https://www.usa.gov/real-id',
      },
      {
        label: 'DHS Federal Facilities ID Requirements',
        url: 'https://www.dhs.gov/sites/default/files/2025-04/25_0414_fps_id-requirements-for-federal-facilities.pdf',
      },
      {
        label: 'PennDOT REAL ID',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/real-id',
      },
      {
        label: 'Texas.gov REAL ID',
        url: 'https://www.texas.gov/driver-services/texas-real-id/',
      },
    ],
    relatedStateIds: ['texas', 'washington', 'new-york', 'michigan'],
  },
  {
    slug: 'online-office-appointment',
    title: 'DMV 业务先线上办还是预约到办公室',
    eyebrow: '线上/现场分流',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '续期、补证、地址变更、REAL ID、首次驾照、外州转入和路考，不是都要去同一个 DMV 窗口。先判断能否线上、kiosk、邮寄或必须预约现场，能少跑很多冤枉路。',
    whoNeedsIt: [
      '不知道自己的 DMV 业务能不能线上办理，或是否必须预约办公室的人。',
      '准备续期、补证、地址变更、升级 REAL ID、外州转入、首次驾照或路考的人。',
      '刚搬家、姓名变化、非公民身份、无 SSN、证件快过期或材料不一致的人。',
    ],
    keyFacts: [
      '官方线上入口能打开，不等于本人一定符合线上资格；很多州会在系统里按年龄、证件状态、REAL ID 状态、地址、身份或业务类型再判断。',
      '常规续期、补证和地址变更常有 online、kiosk、mail 或第三方路径；首次 REAL ID、首次驾照、外州转入、姓名变化和 lawful presence 核验更常需要现场。',
      '预约入口也不是通用钥匙。driver license office、vehicle office、county tax collector、licensing center、testing location 和 REAL ID center 可能办理不同业务。',
      '路考、knowledge test 和 permit 经常有单独入口。预约成功只说明拿到时段，不代表车辆、陪同人、文件、保险或考试语言当天一定合格。',
      '很多州的永久卡片会邮寄；temporary license、receipt 或 paper ID 是否可用于 TSA、驾驶或身份用途，要看州 DMV 和 TSA 当前说明。',
      '官方系统有时会跳转到州交易平台、县办公室或预约供应商；判断入口真伪的关键是从州 DMV 官网逐层进入，而不是要求所有最终域名都长得一样。',
    ],
    factChecks: [
      {
        claim: 'USA.gov 提供各州机动车与驾照服务的官方入口，适合在不知道本州机构名称时作为起点。',
        sourceUrls: ['https://www.usa.gov/state-motor-vehicle-services'],
      },
      {
        claim: 'California DMV 明确把部分常规续期、补证和记录业务移到 online、kiosk、business partner 或 mail，不提供普通柜台办理。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/appointments/'],
      },
      {
        claim: 'California 的 appointment 和 location 页面按业务与地点分流，预约并不代表任意办公室都办理同一项目。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/appointments/', 'https://www.dmv.ca.gov/portal/locations/'],
      },
      {
        claim: 'New York 要求按具体 office location 查看服务和预约安排，不能只凭“附近 DMV”判断。',
        sourceUrls: ['https://dmv.ny.gov/contact-us/office-locations'],
      },
      {
        claim: 'Texas 的 online eligibility 由 DPS 系统决定，并会按年龄、证件状态、上次续期方式、SSN、身份和驾照状态等条件判断。',
        sourceUrls: ['https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/'],
      },
      {
        claim: 'Florida 的在线续期、补证和地址更新有资格限制；首次办证、非 REAL ID 合规、姓名变化、CDL 或 TEMPORARY credential 等情形要求现场。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/'],
      },
      {
        claim: 'Florida 的服务中心和县税务官办公室可能提供不同项目，办理前应在官方 locations 页面核对地点与服务。',
        sourceUrls: ['https://www.flhsmv.gov/locations/'],
      },
      {
        claim: 'Washington 将 driver licensing office、vehicle licensing office、appointments 和 testing locations 分开，预约入口不是通用窗口。',
        sourceUrls: [
          'https://dol.wa.gov/appointments-and-locations',
          'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices',
        ],
      },
      {
        claim: 'New Jersey 在线服务分别提供地址变更、duplicate、standard/REAL ID renewal、车辆业务和 driver record 等入口。',
        sourceUrls: ['https://www.nj.gov/mvc/online-services.html'],
      },
      {
        claim: '临时纸质驾照不在 TSA 可接受身份证件清单内，线上或现场办完拿到 receipt 不等于已拿到可登机实体证件。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
    ],
    checklist: [
      '先把业务写清楚：renewal、replacement、address change、REAL ID upgrade、first license、transfer、road test、vehicle title / registration。',
      '检查当前证件：是否过期、是否有 REAL ID 星标、地址是否正确、姓名是否变化、是否 CDL / permit / limited-term / non-citizen 场景。',
      '打开州官方 online services、appointment、locations 或 service advisor 页面，不从第三方广告入口开始。',
      '如果页面要求现场核验，确认地点类型、服务项目、预约类别、材料原件/认证副本、付款方式和是否接受 walk-in。',
      '如果能线上或 kiosk 办理，先确认邮寄地址、临时凭证、处理时间、service fee 和是否需要先完成地址变更。',
      '保存预约确认、申请编号和取消/改期入口；不要为了抢时间重复创建多个预约而忘记释放不用的时段。',
    ],
    steps: [
      '第一步：不要先搜“附近 DMV”。先打开州 DMV 官方主站、online services 或 service advisor，选择你真正要办的业务。',
      '第二步：让官方系统或页面判断线上资格。Texas、New Jersey、Florida、Michigan 等州都把续期、补证、地址或 replacement 的资格拆到线上服务里。',
      '第三步：只要涉及首次 REAL ID、首次驾照、外州/外国驾照转入、姓名变化、非公民身份文件、lawful presence、路考或车辆业务，就继续查现场地点和预约类别。',
      '第四步：预约前确认办公室类型。Washington DOL 区分 driver licensing office、vehicle licensing office 和 testing location；Florida 又常由县税务官或服务中心承办。',
      '第五步：到场前一天重新核对预约确认、官方材料清单、原件/认证副本、付款方式、临时凭证和邮寄时间；政府网站临时维护或办公室服务范围变化都可能影响当天办理。',
      '第六步：办完后保存 receipt、temporary credential、tracking/status 入口和预计邮寄时间；若预约不用了，回官方确认页取消。',
    ],
    faqs: [
      {
        question: '能不能直接 walk-in 去 DMV？',
        answer:
          '有些州或地点接受 walk-in，有些服务必须预约，有些办公室只办特定业务。最稳妥是先看州官方 locations / appointment 页面，确认地点类型和服务项目。',
      },
      {
        question: '线上续期页面能打开，是不是我一定能线上续？',
        answer:
          '不是。线上入口通常还会按本人条件判断资格，例如证件类型、年龄、过期时间、上次办理方式、REAL ID 材料状态、地址、身份或是否需要视力/照片更新。',
      },
      {
        question: '预约 REAL ID、续期、补证可以选同一个类别吗？',
        answer:
          '不一定。新泽西 MVC 的预约说明就把 REAL ID 和 renewal 类别分开；如果未来几个月内符合续期资格，可能应选 Renewal Appointment。其他州也可能按业务分不同窗口。',
      },
      {
        question: '办完后拿到纸质临时证，可以直接去坐飞机吗？',
        answer:
          '不要默认可以。临时纸质证件、receipt 或 interim license 是否被 TSA 接受要看 TSA 和州 DMV 当前说明；临近旅行时应准备护照等 TSA 接受证件。',
      },
    ],
    editorNotes: [
      '这页是分流逻辑，不替代具体州页面。真正提交申请、预约、付款或上传材料，必须回到州 DMV / DPS / RMV / MVC / DOL 官方系统。',
      'California DMV 明确提醒许多常规业务不提供柜台服务，并把 online、kiosk、business partner、mail 和 office location 分开；这适合提示用户先判断是否需要到场。',
      'New York DMV office 页面强调按地点查看服务和预约；New Jersey MVC 把 Online Services、REAL ID、renewal 和 Appointment Wizard 拆开，说明预约类别本身就会影响能否办成。',
      'Florida 和 Washington 特别适合解释“办公室类型不同”：佛州许多服务由县税务官办公室或服务中心承办；华州把 driver licensing、vehicle licensing 和 testing/training location 分得很细。',
      '政府网站可能对自动化检查、地区或频率做限制。本站保留官方深层链接，但用户如果打不开，应从州官方首页或 USA.gov 州机动车服务目录重新进入。',
    ],
    relatedDirectory: {
      label: '50 州线上/现场分流表',
      href: '/directories/service-paths/',
      description: '按州查看续期、补证、地址变更、REAL ID、预约、办公室和线上服务的官方入口。',
    },
    sources: [
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'California DMV Appointments',
        url: 'https://www.dmv.ca.gov/portal/appointments/',
      },
      {
        label: 'California DMV Locations',
        url: 'https://www.dmv.ca.gov/portal/locations/',
      },
      {
        label: 'NY DMV Office Locations',
        url: 'https://dmv.ny.gov/contact-us/office-locations',
      },
      {
        label: 'Texas Online Eligibility',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/',
      },
      {
        label: 'FLHSMV Renew or Replace',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'FLHSMV Locations',
        url: 'https://www.flhsmv.gov/locations/',
      },
      {
        label: 'Washington DOL Appointments and Locations',
        url: 'https://dol.wa.gov/appointments-and-locations',
      },
      {
        label: 'Washington DOL Driver Licensing Offices',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-offices',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'NJ MVC Appointment Wizard',
        url: 'https://telegov.njportal.com/njmvc/AppointmentWizard',
      },
      {
        label: 'TSA Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'washington', 'new-jersey', 'michigan', 'north-carolina', 'virginia', 'georgia'],
  },
  {
    slug: 'dmv-scam-text-fake-ticket-toll-real-id-phishing',
    title: 'DMV 诈骗短信、假罚单和假官网怎么识别',
    eyebrow: '防诈骗',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '收到“DMV 罚单未付”“toll 欠费”“REAL ID 可加急”“驾照将 suspend”的短信、邮件、电话或广告时，先不要点链接。很多州 DMV 和联邦机构都提醒，诈骗信息会伪装成官方页面，诱导你输入驾照号、SSN、银行卡或登录信息。',
    whoNeedsIt: [
      '收到短信或邮件，说有 unpaid ticket、toll、fine、registration hold、license suspension、legal action 或 arrest risk 的人。',
      '在搜索引擎或社交媒体看到“DMV 加急”“REAL ID 快速办理”“registration discount”“pay ticket now”广告，不确定是不是官方入口的人。',
      '被要求输入 driver license number、SSN、date of birth、credit card、bank account、verification code 或上传证件照片的人。',
      '已经点过可疑链接、输入过资料、付款过，想知道下一步应该报告哪里、怎么保护账户的人。',
      '帮英文不熟的家人处理 DMV、罚单、toll 或 REAL ID 信息，担心对方被威胁性短信吓到的人。',
    ],
    keyFacts: [
      'California DMV、Florida FLHSMV、Washington DOL、Virginia DMV、Georgia DDS、Massachusetts RMV、Maryland MVA 等官方页面都反复强调：他们不会通过短信索取付款、个人信息或金融信息，也不会用短信威胁你立即付款。',
      '诈骗信息会做得像真的。New York DMV 提醒，诈骗者可能复制 DMV 或州政府网站的 logo、图片和内容，让短信、邮件、社交账号或假网站看起来很像官方页面。',
      '最常见诱饵是“欠费 + 时间压力”：unpaid toll、traffic ticket、registration violation、license suspension、late fee、legal action、arrest、REAL ID 快速办理、跳过排队、折扣 registration renewal。',
      '不要从短信链接进入付款或登录页面。FTC、FBI IC3、PennDOT、Virginia DMV、Washington DOL 等来源都建议：用你已知真实的官网、官方 app 或官方客服电话独立核验，不要用短信里的网址和电话。',
      '不是所有官方入口都长得一样。有些州会使用官方交易平台、县税务官、toll agency、E-ZPass、Texas by Texas、DDS Online Services 等系统；正确做法是从州 DMV/RMV/MVC/DOL 官网或 USA.gov 目录逐层进入，而不是相信广告或短信。',
      'Traffic ticket、toll、parking citation 和 court fine 通常分属不同机构。随机短信说“State DMV 收罚单”本身就可疑；Georgia DDS 还特别指出，Georgia 没有所谓“State Department of Motor Vehicles (DMV)”。',
      '如果只是收到可疑短信，通常应该不点击、不回复、截图保存、删除或标记 spam，并按 FTC / 7726 / IC3 / 州 DMV 提供的渠道报告。',
      '如果已经输入银行卡、SSN、driver license、账户密码或验证码，要把它当成身份盗用风险处理：联系银行/信用卡、改密码、查看信用报告、考虑 fraud alert / freeze，并按 IdentityTheft.gov 或州 DMV fraud 页面走。',
      '“我真的有罚单/欠 toll”也不能证明短信是真的。真实欠费应从法院、toll agency、DMV official account、E-ZPass / Toll By Plate 或本州官方系统核验。',
      '本站只做官方入口导航和风险提示，不替你判断某条短信是否一定违法，也不收集你的个人信息；任何付款、报案、身份盗用补救都应回到官方渠道。',
    ],
    factChecks: [
      {
        claim: 'FTC 提醒，所谓 unpaid toll 短信常把用户带到假付款页，目标可能包括银行卡资料、驾照号码和其他身份信息。',
        sourceUrls: ['https://consumer.ftc.gov/consumer-alerts/2025/01/got-text-about-unpaid-tolls-its-probably-scam'],
      },
      {
        claim: 'FTC 建议不要点击或回复意外短信，应通过已知真实的 toll agency 入口核验，并可 report junk 或转发到 7726。',
        sourceUrls: [
          'https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages',
          'https://consumer.ftc.gov/consumer-alerts/2025/01/got-text-about-unpaid-tolls-its-probably-scam',
        ],
      },
      {
        claim: 'FBI IC3 建议在 toll smishing 投诉中保留并提交发件号码和短信所列网址，再用真实 toll service 网站独立核验。',
        sourceUrls: ['https://www.ic3.gov/PSA/2024/PSA240412'],
      },
      {
        claim: 'California DMV 明确表示不会通过短信索取付款、个人信息或金融信息，并建议直接访问 dmv.ca.gov 或官方客服核验。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/dmv-scam-alert/',
          'https://www.dmv.ca.gov/portal/news-and-media/dmv-warns-of-fraudulent-text-scam-asking-for-toll-payments/',
        ],
      },
      {
        claim: 'Florida FLHSMV 不会通过短信要求立即付款，也不会以短信威胁 suspend 驾照、车辆登记或 arrest。',
        sourceUrls: [
          'https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/',
          'https://www.flhsmv.gov/2026/03/24/flhsmv-warns-motorists-of-new-scam-alert/',
        ],
      },
      {
        claim: 'Washington DOL 目前不通过短信请求付款，并把“付钱跳过排队或加快 REAL ID-compliant document”列为诈骗话术。',
        sourceUrls: ['https://dol.wa.gov/about/privacy-center/scam-alerts'],
      },
      {
        claim: 'Virginia DMV 提醒 toll 欠费应从真实 toll agency 核验，Virginia DMV 不会发送 toll bill 短信。',
        sourceUrls: ['https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam'],
      },
      {
        claim: 'Georgia 没有名为 State Department of Motor Vehicles 的机构；DDS 表示不会用未请求的短信索取费用或机密信息。',
        sourceUrls: [
          'https://dds.georgia.gov/fake-text-scams',
          'https://dds.georgia.gov/press-releases/2025-05-27/text-message-scam',
        ],
      },
      {
        claim: 'New York DMV 提醒，钓鱼页面和信息可能复制政府 logo、图片及内容，外观像官网不能证明链接真实。',
        sourceUrls: ['https://dmv.ny.gov/more-info/phishing-attacks', 'https://dmv.ny.gov/more-info/phishing-examples'],
      },
      {
        claim: '已经泄露银行卡、SSN 或驾照信息时，应按泄露类型联系金融机构、检查或冻结信用，并使用 IdentityTheft.gov 的恢复步骤。',
        sourceUrls: ['https://www.identitytheft.gov/', 'https://www.identitytheft.gov/Info-Lost-or-Stolen'],
      },
    ],
    checklist: [
      '先看来源：发件号码、邮箱、域名、链接是否来自你能从官方 DMV/RMV/MVC/DOL/Toll agency 页面反向找到的入口。',
      '看话术：是否催你今天/几天内付款、威胁 suspension、arrest、legal action、late fee、registration loss 或 license cancellation。',
      '看索取内容：是否要求 SSN、driver license number、date of birth、银行卡、bank login、one-time code、证件照片或 gift card / Venmo / Zelle 等付款方式。',
      '看业务逻辑：罚单是否应由 court clerk 处理，toll 是否应由 toll agency 处理，registration 是否应由 DMV/county tax office 处理，REAL ID 是否必须本人到 office 核验。',
      '不要点短信链接；用浏览器手动输入官方域名，或从本网站的州页面/入口表/USA.gov 州机动车目录进入。',
      '可疑信息先截图，保留号码、时间、链接和文字，再删除、block、report junk 或转发 7726。',
      '已经输入信息时，列出泄露内容：银行卡、SSN、DL/ID、密码、验证码、地址、生日、证件照片；不同信息对应不同补救动作。',
      '如果涉及 driver license / ID 被冒用，按本州 DMV fraud / identity theft 页面报；如果涉及银行卡或信用账户，先联系金融机构。',
    ],
    steps: [
      '第一步：先停下，不点、不回、不付款。诈骗信息最常用的是“马上付款，否则 suspend / arrest / legal action”。',
      '第二步：截图保存短信、链接、号码、时间和金额。不要为了“测试”而打开链接；截图足够给 FTC、IC3、手机运营商或 DMV fraud 页面使用。',
      '第三步：从官方路径独立核验。罚单查法院或 citation 所在 county；toll 查官方 toll agency / E-ZPass / Toll By Plate；驾照状态查本州 DMV / DPS / RMV / MVC / DOL；REAL ID 查本州 REAL ID 页面。',
      '第四步：报告可疑短信。普通 scam text 可按 FTC 建议转发到 7726、在手机里 report junk，并到 ReportFraud.ftc.gov；toll smishing 可按 FBI IC3 页面提交号码和网址。',
      '第五步：如果点了链接但没有输入资料，关闭页面，删除短信，留意手机和账户异常；如果下载了文件或安装了 app，尽快移除并检查设备安全。',
      '第六步：如果输入了银行卡、SSN、driver license、密码或验证码，马上联系银行/信用卡、修改相关密码、开启多因素认证、查看信用报告，并按 IdentityTheft.gov 和本州 DMV fraud 页面补救。',
      '第七步：之后把常用官方入口收藏。以后收到“DMV / toll / ticket / REAL ID”通知时，只从收藏或官方入口表进去核对。',
    ],
    faqs: [
      {
        question: '短信说我欠 DMV ticket 或 toll，链接看起来像政府网站，可以点吗？',
        answer:
          '不要从短信点。California DMV、Florida FLHSMV、Virginia DMV、Washington DOL、Massachusetts RMV 等都提醒不会用短信要求付款或索取个人/金融信息。用法院、toll agency 或州 DMV 官方入口独立核验。',
      },
      {
        question: '我真的可能有罚单或欠 toll，怎么确认？',
        answer:
          '看业务归属。交通罚单通常查 citation 上的法院或 county clerk；toll 查官方 toll agency / E-ZPass / Toll By Plate；license status 查本州 DMV。不要用短信里的网址或电话，用官方页面上列出的入口。',
      },
      {
        question: 'REAL ID 可以短信付款加急或跳过排队吗？',
        answer:
          '通常不要相信。Washington DOL 明确把“付钱跳过 DMV 排队、加快 REAL ID-compliant document”列为 scam 场景；REAL ID / Enhanced ID 是否能预申请、预约或现场核验，要按本州官方页面走。',
      },
      {
        question: '我已经点了链接并输入了 driver license / SSN / 银行卡，怎么办？',
        answer:
          '把它当身份盗用风险处理：联系银行或信用卡、改相关密码、查看信用报告、考虑 fraud alert / freeze，到 IdentityTheft.gov 建立补救步骤，并按本州 DMV fraud 页面报告 driver license / ID 相关问题。',
      },
      {
        question: '第三方 DMV 网站一定是诈骗吗？',
        answer:
          '不一定。有些州有官方授权的业务伙伴、kiosk、county office、toll app 或交易平台；但随机广告、折扣注册、付费加急、索取敏感信息的入口很危险。稳妥做法是从州 DMV 官网或 USA.gov 目录进入，再跳转到官方列出的系统。',
      },
    ],
    editorNotes: [
      '这页的定位是“官方入口安全和身份保护”，不是网络安全教程。不要写成杀毒软件推荐，也不要收集用户个人信息。',
      '核心判断句要保守：很多官方页面说“不会通过 text 要求 payment / personal / financial information”，但少数州可能提供用户主动订阅的 reminder；所以要强调 unsolicited、threatening、payment link 和 sensitive information。',
      '把 ticket / toll / DMV / court / REAL ID 分开。真实欠费可能存在，但诈骗短信不能作为付款入口。',
      '不要把所有第三方服务一概写成违法；要区分官方授权 partner / kiosk / county / toll app 与无法从官方页面反向验证的广告或短信链接。',
      '身份盗用补救要引到 IdentityTheft.gov、FTC、IC3、手机运营商和州 DMV fraud 页面，不给个案法律意见。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '从官方 DMV / DPS / RMV / MVC / DOL 入口进入，避免从可疑短信、广告或假网站付款。',
    },
    sources: [
      {
        label: 'FTC ReportFraud.gov',
        url: 'https://reportfraud.ftc.gov/',
      },
      {
        label: 'FTC How to Recognize and Report Spam Text Messages',
        url: 'https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages',
      },
      {
        label: 'FTC Unpaid Toll Text Scam Alert',
        url: 'https://consumer.ftc.gov/consumer-alerts/2025/01/got-text-about-unpaid-tolls-its-probably-scam',
      },
      {
        label: 'IdentityTheft.gov',
        url: 'https://www.identitytheft.gov/',
      },
      {
        label: 'IdentityTheft.gov When Information Is Lost or Exposed',
        url: 'https://www.identitytheft.gov/Info-Lost-or-Stolen',
      },
      {
        label: 'FTC Report Identity Theft',
        url: 'https://www.ftc.gov/news-events/topics/identity-theft/report-identity-theft',
      },
      {
        label: 'FBI IC3 Smishing Scam Regarding Road Toll Services',
        url: 'https://www.ic3.gov/PSA/2024/PSA240412',
      },
      {
        label: 'FCC Stop Unwanted Robocalls and Texts',
        url: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts',
      },
      {
        label: 'California DMV Scam Alert',
        url: 'https://www.dmv.ca.gov/portal/dmv-scam-alert/',
      },
      {
        label: 'California DMV Fraudulent Toll Text Scam Warning',
        url: 'https://www.dmv.ca.gov/portal/news-and-media/dmv-warns-of-fraudulent-text-scam-asking-for-toll-payments/',
      },
      {
        label: 'California DMV REAL ID Update Notification Warning',
        url: 'https://www.dmv.ca.gov/portal/news-and-media/dmv-notifies-customers-who-need-to-update-their-real-ids/',
      },
      {
        label: 'California DMV Fraudulent Discount Registration Ads Warning',
        url: 'https://www.dmv.ca.gov/portal/news-and-media/news-releases/dmv-warns-of-fraudulent-advertisements-on-discounted-vehicle-registration/',
      },
      {
        label: 'California DMV Customer Support and Fraud Complaint',
        url: 'https://www.dmv.ca.gov/portal/customer-service/report-an-issue-or-complaint/',
      },
      {
        label: 'NY DMV Phishing Attacks',
        url: 'https://dmv.ny.gov/more-info/phishing-attacks',
      },
      {
        label: 'NY DMV Phishing Examples',
        url: 'https://dmv.ny.gov/more-info/phishing-examples',
      },
      {
        label: 'NY DMV Latest Barrage of Scam Texts',
        url: 'https://dmv.ny.gov/news/dmv-warns-new-yorkers-about-latest-barrage-of-scam-texts',
      },
      {
        label: 'NY DMV Email and Text Reminders',
        url: 'https://dmv.ny.gov/more-info/get-email-and-text-reminders',
      },
      {
        label: 'FLHSMV Scam Alert',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/',
      },
      {
        label: 'FLHSMV 2026 Scam Alert',
        url: 'https://www.flhsmv.gov/2026/03/24/flhsmv-warns-motorists-of-new-scam-alert/',
      },
      {
        label: 'FLHSMV Fraud',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/fraud/',
      },
      {
        label: 'FLHSMV Identity Theft and Driver License Fraud',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/fraud/identity-theft-driver-license-fraud/',
      },
      {
        label: 'Washington DOL Scam Alerts',
        url: 'https://dol.wa.gov/about/privacy-center/scam-alerts',
      },
      {
        label: 'Washington DOL Identity Crimes or Fraud',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/identity-crimes-or-fraud',
      },
      {
        label: 'Washington DOL Fraud and Identity Theft',
        url: 'https://dol.wa.gov/about/privacy-center/fraud-and-identity-theft',
      },
      {
        label: 'NJ MVC REAL ID System Upgrade Scam Advisory',
        url: 'https://www.nj.gov/mvc/press/archives/2023/111523.htm',
      },
      {
        label: 'NJ MVC Contact and Fraud Tip Line',
        url: 'https://www.nj.gov/mvc/about/contact.htm',
      },
      {
        label: 'PennDOT Text Phishing Scam Warning',
        url: 'https://www.pa.gov/agencies/penndot/news-and-media/newsroom/statewide/2026/shapiro-administration-warns-of-text-phishing-scams-aimed-at-pen',
      },
      {
        label: 'PennDOT Driver and Vehicle Services Alerts',
        url: 'https://www.pa.gov/agencies/dmv/alerts',
      },
      {
        label: 'PennDOT Report Driver License, ID, or Vehicle Fraud',
        url: 'https://www.pa.gov/services/dmv/report-drivers-license-identification-card-or-vehicle-fraud',
      },
      {
        label: 'Virginia DMV Text Scam Warning',
        url: 'https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-text-scam',
      },
      {
        label: 'Virginia DMV Toll Charge Text Scam Warning',
        url: 'https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam',
      },
      {
        label: 'Virginia DMV Reporting Fraud',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/zero-fraud',
      },
      {
        label: 'Georgia DDS Fake Text Scams',
        url: 'https://dds.georgia.gov/fake-text-scams',
      },
      {
        label: 'Georgia DDS Text Message Scam',
        url: 'https://dds.georgia.gov/press-releases/2025-05-27/text-message-scam',
      },
      {
        label: 'Georgia DDS Continued Text Message Scams',
        url: 'https://dds.georgia.gov/press-releases/2025-09-15/continued-text-message-scams',
      },
      {
        label: "TxDMV Don't Click It Text Scam Warning PDF",
        url: 'https://www.txdmv.gov/sites/default/files/body-files/2025-08-07_Beware_of_Scam_Text_Messages.pdf',
      },
      {
        label: 'TxDMV Fake Fines Real Fraud PDF',
        url: 'https://www.txdmv.gov/sites/default/files/body-files/2026-03-25_Beware_of_Scam_Text_Messages.pdf',
      },
      {
        label: 'TxDMV Cyber Alert PDF',
        url: 'https://www.txdmv.gov/sites/default/files/body-files/Cyber_Alert_Media_Advisory_17JUN21.pdf',
      },
      {
        label: 'Texas DPS Failure to Appear / Failure to Pay Program',
        url: 'https://www.dps.texas.gov/section/driver-license/failure-appearfailure-pay-program',
      },
      {
        label: 'Mass.gov RMV Motor Vehicle Violation Text Scam Warning',
        url: 'https://www.mass.gov/news/rmv-cautions-public-to-beware-of-scam-texts-stating-money-is-owed-for-motor-vehicle-violations-0',
      },
      {
        label: 'Mass.gov RMV Text Scams Warning',
        url: 'https://www.mass.gov/news/massachusetts-rmv-cautions-public-to-beware-of-text-scams',
      },
      {
        label: 'MassDOT Fraudulent Text Messages Warning',
        url: 'https://www.mass.gov/news/massachusetts-department-of-transportation-reminds-residents-to-beware-of-fraudulent-text-messages',
      },
      {
        label: 'Maryland MVA Privacy and Security',
        url: 'https://mva.maryland.gov/privacy-security',
      },
      {
        label: 'Illinois DOT Text Scam Alert',
        url: 'https://idot.illinois.gov/about-idot/contact-us/report-a-problem/text-scam-alert.html',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'texas',
      'massachusetts',
    ],
  },
  {
    slug: 'lost-stolen-license-id-replacement-identity-theft',
    title: '驾照或 State ID 丢失/被盗后，补证、报案和身份盗用怎么处理',
    eyebrow: '丢证补证',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '驾照、learner permit、State ID、REAL ID 或 Enhanced ID 丢失、被盗、损坏后，最重要的不是只问“能不能马上补一张”。先判断是普通补证、地址/姓名/照片变化、REAL ID 升级、外州旅行，还是已经涉及 identity theft 或 driver license fraud。',
    whoNeedsIt: [
      '驾照、permit、State ID、non-driver ID、REAL ID 或 Enhanced ID 丢失、被偷、损坏、被洗衣机洗坏或钱包被盗的人。',
      '补证时发现地址不对、卡快过期、姓名变更、照片太旧、REAL ID / Enhanced ID 状态不确定的人。',
      '担心别人用自己的 driver license number、ID card、SSN、生日、银行卡或照片开账户、租车、被拦车或提交假申请的人。',
      '出门旅行、搬州、入职、租车、考试或银行开户前突然没有实体证件，想知道临时证、TSA 和替代 ID 怎么处理的人。',
      '人在外州、国外、学校或军队，不能马上回本州 DMV/RMV/MVC/DOL 办补证的人。',
    ],
    keyFacts: [
      'Replacement / duplicate 通常是替换现有证件，不等于 renewal、name change、first license 或 REAL ID upgrade。很多州会保留原来的 expiration date，有些州如果快过期会建议或要求 renewal。',
      '线上补证通常有条件。常见限制包括：证件已过期、被 suspend / revoked、未满 18 岁、需要改姓名、需要新照片、需要证明 legal presence、要升级 REAL ID、欠 DMV 费用、今天已申请过补证，或需要重新核验 customer number。',
      '先改地址再补证往往更稳。Washington DOL 明确提醒 replacement 会寄到系统里的地址且不能 forward；很多州也把地址变更和 replacement 分成不同步骤。',
      '被偷不一定自动换新 license number。Texas DPS 说如果证件被盗且被他人使用，要报警并带 police report，office 会判断是否需要新号码；Georgia DDS 说变更号码要到 Customer Service Center；Florida、Virginia、PennDOT、California 等也有 fraud / identity theft 路径。',
      '警察报告规则按州和场景不同。New York 对因犯罪丢失/被盗的免费 replacement 要 police agency 的 MV-78B；Texas、Florida、Virginia 等身份盗用场景都强调先联系 law enforcement；Maryland MVA 则说明普通 lost/stolen replacement 不要求 police report。',
      '补证不等于身份盗用问题解决。如果钱包里还有 SSN、银行卡、医保卡、护照、学生证或登录设备，应该按 IdentityTheft.gov、FTC、USA.gov 的步骤处理 fraud alert、credit freeze、银行/信用卡和账户密码。',
      '临时纸质证件和 mobile ID 不能无脑替代实体卡。Illinois temporary secure paper document 有期限；Virginia Mobile ID 设置通常需要扫描实体卡，且官方新闻仍提醒驾驶时继续携带实体 ID 作为 backup。',
      '临近航班要看 TSA。TSA 的 acceptable ID、forgot-ID FAQ 和 ConfirmID 页面才是机场安检依据；DMV 临时收据、paper credential 或补证确认号不一定能当作可接受 ID。',
      '如果之后找回旧证，不要把它当第二张备用。New Jersey MVC 明确说收到 replacement 后，如果原证还在，应销毁（destroy）原证，不能持有多份 license / permit。',
      '外州转入或人在外州丢证要单独看规则。Washington 支持部分 out-of-state mail replacement；Georgia 转入时若外州卡丢失/被盗，可能要求原签发州的 MVR / driving record；Maryland 新居民也可能要求 certified driving record。',
    ],
    checklist: [
      '先判断丢失对象：driver license、learner permit、non-driver ID、State ID、REAL ID、Enhanced ID、CDL、driver privilege card、vehicle registration、title 或 license plate。',
      '记录发现时间、地点、是否钱包/手机一起丢、是否可能被偷、是否已出现账户异常、罚单、贷款、银行交易或 DMV 记录异常。',
      '确认 DMV 记录地址是否正确；如果不正确，先查是否需要先 change address，再申请 replacement。',
      '看本人是否符合 online replacement：证件是否 valid、未 suspend/revoked、无需改姓名、无需新照片、无需 REAL ID upgrade、年龄和身份类别是否允许线上处理。',
      '如果被盗、被他人使用或涉及 identity theft，先报警或按州 DMV fraud 页面报告，并保存 police report / incident number / FTC Identity Theft Report。',
      '如果 SSN、银行卡、护照、医保卡、学校/公司 ID 或手机同时丢失，列出每一项并分别联系签发机构、银行、信用卡和账户服务商。',
      '有航班、入职、租车或考试时，确认是否有 passport、passport card、permanent resident card、EAD、military ID、Global Entry card 或其他 TSA / employer / school 接受的证件。',
      '补证提交后保存 receipt、temporary credential、mailing confirmation、tracking 或 status-check 页面；收到新卡后停用或销毁找回的旧卡。',
    ],
    steps: [
      '第一步：先不要反复搜索第三方“DMV replacement”广告。从本州 DMV / DPS / RMV / MVC / DOL 官网、官方 online services 或本站入口表进入。',
      '第二步：把场景分成两类：普通 lost / damaged replacement，还是 stolen / identity theft / fraud。普通补证先看 replacement 页面；盗用风险先看 police report、DMV fraud 和 IdentityTheft.gov。',
      '第三步：确认地址、姓名、REAL ID 和照片。地址错就先按官方地址变更路径处理；姓名变化、REAL ID 升级、新照片或 legal presence 复核往往需要现场。',
      '第四步：选择线上、电话、邮寄或现场。California、Texas、Florida、Washington、New Jersey、Georgia、Maryland 等州有线上补证路径，但条件不同；Virginia、Washington 等页面列出不能线上补证的情况。',
      '第五步：如果证件被盗或被人使用，联系本地 police / sheriff 取得 report 或 incident number，再按本州 DMV fraud / identity theft 页面提交材料。不要假设新卡会自动阻止旧号码被滥用。',
      '第六步：如果钱包或资料一起丢，联系银行/信用卡、改账户密码、开启多因素认证、查看信用报告，并考虑 fraud alert 或 credit freeze；用 IdentityTheft.gov 生成补救清单。',
      '第七步：如果临近旅行，优先找 TSA 可接受的其他 ID。没有实体 ID 时，查看 TSA forgot-ID 和 ConfirmID 页面，预留额外时间，并准备可能被拒绝或额外核验。',
      '第八步：收到 replacement 后核对姓名、地址、REAL ID / Federal Limits Apply 标记、expiration date 和 class / endorsement。若旧卡找回，按州规则销毁或停用，不要作为备用证件继续使用。',
    ],
    faqs: [
      {
        question: '驾照丢了或被偷，一定要报警吗？',
        answer:
          '普通丢失不一定每州都要求报警；但如果被偷、被他人使用、钱包一起被盗、想申请某些免费 replacement，或担心 identity theft，报警通常很重要。New York 因犯罪丢失/被盗的免费 replacement 要 police agency 的 MV-78B；Texas、Florida、Virginia 等身份盗用路径也强调 police report。',
      },
      {
        question: '补证会给我一个新的 driver license number 吗？',
        answer:
          '通常不会自动换。多数 replacement 只是补发同一凭证。Texas DPS 说 office 会在审核被盗且被使用的 case 时判断是否需要新号码；Georgia DDS 要到 Customer Service Center 申请号码变更；Florida、California、Virginia 等则有 fraud / identity theft 审查路径。',
      },
      {
        question: '地址已经变了，能直接补证寄到新地址吗？',
        answer:
          '不要假设可以。很多州会把 change address 和 replacement 分开。Washington DOL 明确提醒 replacement 会寄到系统记录地址，且不能转寄；如果地址变了，应先按州官方流程更新地址，再申请 replacement。',
      },
      {
        question: '补证确认页、receipt 或临时纸质证能坐飞机吗？',
        answer:
          '不稳。TSA 接受证件清单和 ConfirmID / forgot-ID 页面才是机场依据。临近航班时，优先使用护照、passport card、绿卡、EAD、military ID、Global Entry card 等 TSA 接受证件；没有可接受 ID 时按 TSA 当前身份核验流程处理。',
      },
      {
        question: '如果我后来找回旧驾照，可以留着备用吗？',
        answer:
          '不建议，也可能违反州规则。New Jersey MVC 明确说收到 replacement 后，如果原证还在，应销毁原证，不能持有多份 license 或 permit。其他州也应以 replacement 后的新凭证为准。',
      },
    ],
    factChecks: [
      {
        claim: 'Replacement 或 duplicate 通常用于替换现有证件，California、New York、Texas 和 Florida 都把它与 renewal / information change 分开说明。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/replace-your-driver-license-or-identification-dl-id-card/',
          'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
          'https://www.dps.texas.gov/section/driver-license/replace-your-driver-license-commercial-driver-license-or-id-card',
          'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
        ],
      },
      {
        claim: '线上 replacement 有资格限制，证件状态、姓名或地址变更、REAL ID 升级、身份核验和照片需求都可能要求现场办理。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/replace-your-driver-license-or-identification-dl-id-card/',
          'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/replace-your-license-or-learner-permit',
          'https://www.dmv.virginia.gov/licenses-ids/license/replace',
          'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-replace-license',
        ],
      },
      {
        claim: 'Washington replacement 会寄到 driver record 地址且邮件不能转寄，因此地址变化时应先按官方流程更新记录。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/replace-your-license-or-learner-permit'],
      },
      {
        claim: '被盗证件不会在所有州自动获得新 license number；Texas 和 Georgia 都把号码变更放在 fraud 审核或现场处理路径中。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/faq/section-4-lost-or-stolen-driver-licenseid-card',
          'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/license-fraud',
        ],
      },
      {
        claim: '警察报告要求按州和场景变化：New York 的特定犯罪丢失免费补证路径需要 MV-78B，而 Maryland 普通 lost/stolen replacement 不作同样要求。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
          'https://mva.maryland.gov/licenses-ids/replace-license-or-id',
        ],
      },
      {
        claim: '证件或个人信息被盗后，IdentityTheft.gov 和 FTC 将报告、账户处置、fraud alert 或 credit freeze 等作为独立补救步骤。',
        sourceUrls: [
          'https://www.identitytheft.gov/Info-Lost-or-Stolen',
          'https://consumer.ftc.gov/identity-theft-and-online-security/identity-theft',
        ],
      },
      {
        claim: 'TSA 不接受 temporary driver license 作为其清单内身份证件，没有其他可接受证件时应查看 TSA 当前身份核验说明。',
        sourceUrls: [
          'https://www.tsa.gov/travel/security-screening/identification',
          'https://www.tsa.gov/travel/frequently-asked-questions/i-forgot-my-identification-can-i-still-proceed-through-security',
          'https://www.tsa.gov/tsaconfirm-id',
        ],
      },
      {
        claim: 'Virginia Mobile ID 不是所有场景下对实体卡的完整替代，设置和使用仍受官方设备、验证及接受范围限制。',
        sourceUrls: ['https://www.dmv.virginia.gov/licenses-ids/mobile-id/faq'],
      },
      {
        claim: 'New Jersey 说明收到 duplicate 后如找回原 license 或 permit，应销毁旧证而不是保留两张有效凭证。',
        sourceUrls: ['https://www.nj.gov/mvc/license/liclost.htm'],
      },
      {
        claim: '人在外州申请 replacement 与转入新州时的 transfer 是不同业务；Washington 和 Georgia 分别提供对应的外州处理路径。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/replace-your-license-or-learner-permit',
          'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-transfer-out-state-drivers-licenseid',
        ],
      },
    ],
    editorNotes: [
      '这页和“续期/补证/地址变更”页分工不同：那页讲顺序，这页讲 lost/stolen/fraud 的风险分流。',
      '不要承诺“换新号码”或“报警一定免费补证”。官方来源显示不同州差异很大，且新号码通常需要 fraud / identity theft 审核。',
      '旅行相关必须引用 TSA，不要把州 DMV 的 temporary credential 写成 TSA 一定接受。',
      '移动 ID 只能写成 companion / limited acceptance，不要把 mobile ID 当实体卡的完整替代。',
      '身份盗用补救以 IdentityTheft.gov、FTC、USA.gov、州 DMV fraud 页面为主，不提供法律意见或信用修复服务推荐。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州进入官方 replacement、identity theft、driver record、status 和 DMV online services 页面。',
    },
    sources: [
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'IdentityTheft.gov',
        url: 'https://www.identitytheft.gov/',
      },
      {
        label: 'IdentityTheft.gov When Information Is Lost or Exposed',
        url: 'https://www.identitytheft.gov/Info-Lost-or-Stolen',
      },
      {
        label: 'FTC Identity Theft Consumer Advice',
        url: 'https://consumer.ftc.gov/identity-theft-and-online-security/identity-theft',
      },
      {
        label: 'FTC Report Identity Theft',
        url: 'https://www.ftc.gov/news-events/topics/identity-theft/report-identity-theft',
      },
      {
        label: 'USA.gov Identity Theft',
        url: 'https://www.usa.gov/identity-theft',
      },
      {
        label: 'TSA Acceptable Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
      {
        label: 'TSA Forgot Identification FAQ',
        url: 'https://www.tsa.gov/travel/frequently-asked-questions/i-forgot-my-identification-can-i-still-proceed-through-security',
      },
      {
        label: 'TSA ConfirmID',
        url: 'https://www.tsa.gov/tsaconfirm-id',
      },
      {
        label: "California DMV Replace Driver's License or ID Card",
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/replace-your-driver-license-or-identification-dl-id-card/',
      },
      {
        label: 'California DMV Update Information on DL/ID',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/',
      },
      {
        label: 'California DMV Fraud Review of DL/ID Record (INV 35 PDF)',
        url: 'https://www.dmv.ca.gov/portal/uploads/2020/07/inv35.pdf',
      },
      {
        label: 'NY DMV Replace a License or Permit',
        url: 'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
      },
      {
        label: 'NY DMV Replace a Non-Driver ID',
        url: 'https://dmv.ny.gov/non-driver-id/replace-a-non-driver-id',
      },
      {
        label: 'Texas DPS Replace Driver License, CDL, or ID Card',
        url: 'https://www.dps.texas.gov/section/driver-license/replace-your-driver-license-commercial-driver-license-or-id-card',
      },
      {
        label: 'Texas DPS Lost or Stolen Driver License/ID FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-4-lost-or-stolen-driver-licenseid-card',
      },
      {
        label: 'Texas DPS Identity Theft Information Guide',
        url: 'https://www.dps.texas.gov/section/driver-license/identity-theft-information-guide',
      },
      {
        label: 'Texas DPS Change Information on DL/ID',
        url: 'https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card',
      },
      {
        label: 'FLHSMV Renew or Replace Driver License or ID',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'FLHSMV Identity Theft and Driver License Fraud',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/fraud/identity-theft-driver-license-fraud/',
      },
      {
        label: 'FLHSMV Driver License General Information',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/general-information/',
      },
      {
        label: 'Washington DOL Renew or Replace Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license',
      },
      {
        label: 'Washington DOL Replace License or Learner Permit',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/replace-your-license-or-learner-permit',
      },
      {
        label: 'Washington DOL Replace ID Card',
        url: 'https://dol.wa.gov/id-cards/replace-id-card',
      },
      {
        label: 'Washington DOL Identity Crimes or Fraud',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/identity-crimes-or-fraud',
      },
      {
        label: 'Washington DOL Replace Enhanced Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/enhanced-driver-license-edl/replace-enhanced-driver-license-edl',
      },
      {
        label: 'NJ MVC Lost or Stolen Licenses / Duplicate',
        url: 'https://www.nj.gov/mvc/license/liclost.htm',
      },
      {
        label: 'NJ MVC Non-Driver Identification Card',
        url: 'https://www.nj.gov/mvc/license/nondriverid.htm',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'NJ MVC 6 Points of ID',
        url: 'https://www.nj.gov/mvc/license/6pointid.htm',
      },
      {
        label: 'NJ MVC REAL ID Emergency Issuance Program',
        url: 'https://www.nj.gov/mvc/license/realidemergency.htm',
      },
      {
        label: 'PennDOT Driver Licensing FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/dl-lp-id-faqs',
      },
      {
        label: 'PennDOT Report Driver License, ID, or Vehicle Fraud',
        url: 'https://www.pa.gov/services/dmv/report-drivers-license-identification-card-or-vehicle-fraud',
      },
      {
        label: "PennDOT Driver's Licenses and Photo IDs",
        url: 'https://www.pa.gov/agencies/dmv/driver-services/licenses-and-photo-ids',
      },
      {
        label: "PennDOT Interim Driver's Licenses and Photo IDs",
        url: 'https://www.pa.gov/agencies/dmv/driver-services/licenses-and-photo-ids/interim-product-information',
      },
      {
        label: "Virginia DMV Replace Driver's License or Learner's Permit",
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/replace',
      },
      {
        label: 'Virginia DMV Replace Identification Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/id-cards/replacement-id',
      },
      {
        label: 'Virginia DMV How DMV Protects Your Identity',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/applying/identity-theft',
      },
      {
        label: 'Virginia DMV REAL ID',
        url: 'https://www.dmv.virginia.gov/licenses-ids/real-id',
      },
      {
        label: 'Virginia Mobile ID FAQ',
        url: 'https://www.dmv.virginia.gov/licenses-ids/mobile-id/faq',
      },
      {
        label: 'Virginia DMV Replace Driver Privilege Card',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/driver-privilege-card/replacement',
      },
      {
        label: 'Georgia DDS Replace License',
        url: 'https://dds.georgia.gov/georgia-licenseid/existing-licenseid/how-do-i-replace-license',
      },
      {
        label: 'Georgia DDS Replacements FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/replacements-faqs',
      },
      {
        label: 'Georgia DDS License Fraud FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/license-fraud',
      },
      {
        label: 'Georgia DDS Transfer Out-of-State Driver License/ID',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-transfer-out-state-drivers-licenseid',
      },
      {
        label: 'Georgia DDS Online Services FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/online-services-faqs',
      },
      {
        label: "Mass.gov Replace Your Driver's License",
        url: 'https://www.mass.gov/how-to/replace-your-drivers-license',
      },
      {
        label: 'Mass.gov Replace Your Massachusetts ID Card',
        url: 'https://www.mass.gov/how-to/replace-your-massachusetts-id-card',
      },
      {
        label: 'Mass.gov Identity Theft',
        url: 'https://www.mass.gov/info-details/identity-theft',
      },
      {
        label: 'Mass.gov Report Identity Theft',
        url: 'https://www.mass.gov/info-details/report-identity-theft',
      },
      {
        label: 'Mass.gov REAL ID in Massachusetts',
        url: 'https://www.mass.gov/info-details/real-id-in-massachusetts',
      },
      {
        label: "Illinois SOS Driver's License and State ID Card Information",
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/drlicid.html',
      },
      {
        label: 'Illinois SOS Driver License and State ID FAQ',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/dlfaq.html',
      },
      {
        label: 'Illinois SOS Lost or Stolen DL/ID PDF',
        url: 'https://www.ilsos.gov/content/dam/publications/pdf_publications/dsd_x165.pdf',
      },
      {
        label: 'Illinois SOS Central Issuance FAQ',
        url: 'https://www.ilsos.gov/departments/drivers/drivers-license/central-issuance/cifaq.html',
      },
      {
        label: 'Maryland MVA Replace a License or ID',
        url: 'https://mva.maryland.gov/licenses-ids/replace-license-or-id',
      },
      {
        label: 'Maryland MVA Identification ID Card',
        url: 'https://mva.maryland.gov/licenses-ids/get-new-license-permit-or-id/identification-id-card',
      },
      {
        label: 'Maryland MVA Update Name, Address or Other Info',
        url: 'https://mva.maryland.gov/licenses-ids/update-name-address-or-other-license-info',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'massachusetts',
    ],
  },
  {
    slug: 'dmv-fees-mailing-temporary-license',
    title: 'DMV 费用、邮寄时间和临时证件怎么查',
    eyebrow: '费用 / 拿证时间',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      'DMV 办证不只是交一笔固定费用。线上服务费、现场付款方式、补证/续期类别、临时凭证、实体卡邮寄时间和 TSA 是否接受，都可能影响你什么时候真正能用上新证件。',
    whoNeedsIt: [
      '准备续期、补证、换 REAL ID、改地址或刚办完驾照/ID，想知道费用和多久拿到卡的人。',
      '临近旅行、入职、租车、考试或买保险，需要判断临时纸质证件能不能用的人。',
      '想在线办理但不确定是否有 service fee、processing fee、邮寄地址或临时凭证限制的人。',
    ],
    keyFacts: [
      'DMV 费用通常按业务、证件类型、期限、年龄、是否 REAL ID / Enhanced / duplicate / late renewal 和线上服务费分开计算，不能跨州套用。',
      '线上入口可能有额外 service fee 或 processing fee；现场可能接受现金、支票、money order、credit / debit card，但具体付款方式按州和地点变化。',
      '很多州的永久驾照或 ID 会邮寄，不一定现场打印。新泽西 MVC 明确说明因安全变化，agency 办理的 license / ID renewal 或 duplicate 也会邮寄。',
      '临时驾照、receipt、paper ID 或 interim credential 通常只能解决短期驾驶或交易证明，不要默认可用于 TSA、REAL ID 联邦用途、I-9、银行或学校场景。',
      '如果临近航班，优先准备护照等 TSA 接受证件；不要把刚办完 DMV 后的临时纸质文件当作稳定旅行方案。',
      '官方 processing time 通常只是估算。补件、照片/身份复核、地址错误、邮件退回或系统人工审查都可能延长时间；超过州页面给出的查询节点后再查 status 或联系客服。',
    ],
    factChecks: [
      {
        claim: 'California 的 licensing fee table 按 original、renewal、replacement、ID 类型和其他具体业务分别列价，不能只用一个“DMV 费用”数字。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/'],
      },
      {
        claim: 'California 公布的 DL/ID processing time 会按 online、kiosk 和 mail 等路径分别估算，线上和 kiosk 的实体卡也要等待邮寄。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/'],
      },
      {
        claim: 'California 线上续期满足要求时可立即提供 temporary driver license，但该临时文件不能作为 identification 使用。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/'],
      },
      {
        claim: 'Florida MyDMV Portal 办理后的 credential 通常在 2-3 周内邮寄，并在交易总额中加收 $2 processing fee。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/'],
      },
      {
        claim: 'Florida 对首次办证、非 REAL ID 合规、姓名变化、更新照片、CDL 或标有 TEMPORARY 的 credential 等情况要求现场办理。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/'],
      },
      {
        claim: 'New Jersey 的 online renewal 会立即生效并提供 receipt，但永久卡通常需 2-4 周邮寄；即使在 agency 办理也不现场打印永久卡。',
        sourceUrls: ['https://www.nj.gov/mvc/license/licrenew.htm'],
      },
      {
        claim: 'New Jersey 的 standard license renewal 与 duplicate/change 使用不同费用，REAL ID、endorsement 和其他类别也不能共用一个价格。',
        sourceUrls: ['https://www.nj.gov/mvc/license/licrenew.htm', 'https://www.nj.gov/mvc/license/licfees.htm?os=os'],
      },
      {
        claim: 'New York 将 license fee、refund 和 replacement 业务分开说明，最终费用会受证件类别与具体交易影响。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/fees-refunds', 'https://dmv.ny.gov/driver-license/replace-a-license-or-permit'],
      },
      {
        claim: 'Texas 说明 driver license 和 ID 费用会按 driver type、年龄以及新办或续期变化，续期方式也有不同资格要求。',
        sourceUrls: ['https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/'],
      },
      {
        claim: 'TSA 明确不接受 temporary driver license 作为机场身份证件，州内可短期驾驶不等于可用于登机。',
        sourceUrls: ['https://www.tsa.gov/travel/security-screening/identification'],
      },
    ],
    checklist: [
      '确认业务类型：original、renewal、replacement / duplicate、address change、REAL ID upgrade、Enhanced、late renewal、first license 或 transfer。',
      '打开州官方 fee table 或对应业务页，核对基础费用、附加费用、线上服务费、late fee 和 payment method。',
      '确认卡片交付方式：现场发实体卡、邮寄实体卡、先给 temporary credential，还是需要自己打印 receipt。',
      '核对 DMV 记录中的 mailing address；丢证或搬家后，很多场景应先改地址再补证或续期。',
      '有旅行或身份核验需求时，同时查看 TSA identification 页面和州 DMV 对 temporary / interim / paper credential 的说明。',
      '保存付款收据、确认号、temporary credential、状态查询入口和官方预计时间，避免重复付款或过早重新申请。',
    ],
    steps: [
      '第一步：先别只看价格。把业务类别和证件类型写清楚，因为 renewal、replacement、REAL ID upgrade、Enhanced、late renewal 和 first license 的费用口径可能不同。',
      '第二步：进入官方 fee / renew / replace 页面。加州、纽约、佛州、新泽西、华州、密歇根等州都把费用、付款方式或邮寄时间放在具体业务页里。',
      '第三步：看是否有线上资格和线上附加费。Florida MyDMV Portal 示例明确写到线上办理后通常 2-3 周邮寄，并有 $2 processing fee；其他州可能用不同名称收取服务费。',
      '第四步：看卡片多久到。California DMV processing times 会按 online、kiosk、mail 等路径给预估；NJ MVC renewal / duplicate 页面提醒实体证通常 2-4 周邮寄。',
      '第五步：临近出行时单独判断 TSA。TSA 接受证件清单和州 DMV 临时证说明要一起看；如果没有实体 REAL ID 或其他可接受 ID，准备护照或查看 TSA 当前身份核验选项。',
      '第六步：超过官方预计时间后，用 confirmation number 或 card status 页面查询；发现地址错误、退信或重复扣款时，再按州官方客服/退款流程处理。',
    ],
    faqs: [
      {
        question: 'DMV 网站上看到的费用会不会就是最终价格？',
        answer:
          '不一定。最终金额可能受证件期限、late fee、REAL ID / Enhanced、duplicate、线上服务费、县级服务费、付款方式或当地办公室规则影响。支付前以州官方系统显示为准。',
      },
      {
        question: '线上补证或续期后，新卡一般多久到？',
        answer:
          '看州和业务。加州有 processing times 页面；佛州 renew/replace 页面写 MyDMV Portal 办理后 credential 通常 2-3 周寄达；新泽西 renewal / duplicate 页面常见 2-4 周邮寄窗口。办理前看本州当前页面。',
      },
      {
        question: '临时纸质驾照可以坐美国国内航班吗？',
        answer:
          '不要默认可以。TSA 看的是可接受身份证件；很多州提醒 temporary、interim 或 paper credential 不能替代正式 REAL ID 或其他 TSA 接受证件。临近航班时带护照更稳。',
      },
      {
        question: '搬家后丢了驾照，能直接补证吗？',
        answer:
          '先确认 DMV 记录地址。很多州的新证会寄到记录地址；如果地址已经变了，通常先改地址再补证更稳，否则新卡可能寄到旧地址。',
      },
    ],
    editorNotes: [
      '这页不维护跨州固定价目表，因为金额和服务费变化快。页面目标是让用户知道该看 fee table、renew / replace 业务页、online eligibility 和 card mailing / temporary credential 说明。',
      'California DMV processing times、FLHSMV renew / replace、NJ MVC renewal / duplicate、Michigan replacement 和 Washington renewal 页面共同支持“拿到临时凭证不等于拿到永久卡”的提醒。',
      '旅行场景必须回到 TSA identification 页面；州 DMV 临时证说明只能解释州证件状态，不能替 TSA 承诺安检结果。',
      '付款方式要写成“按州和地点确认”，不要泛化成全美都收信用卡或全美都收现金。',
      '这页和 `/directories/costs-timing/` 互补：专题讲判断逻辑，目录表按州给入口和抽取线索。',
    ],
    relatedDirectory: {
      label: '50 州费用和拿证时间表',
      href: '/directories/costs-timing/',
      description: '按州查看 DMV / REAL ID / 驾照续期、补证、付款方式、临时凭证、卡片邮寄和处理时间提醒。',
    },
    sources: [
      {
        label: 'California DMV Licensing Fees',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/',
      },
      {
        label: 'California DMV Processing Times',
        url: 'https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/',
      },
      {
        label: 'NY DMV Fees and Refunds',
        url: 'https://dmv.ny.gov/driver-license/fees-refunds',
      },
      {
        label: 'NY DMV Replace a License or Permit',
        url: 'https://dmv.ny.gov/driver-license/replace-a-license-or-permit',
      },
      {
        label: 'Texas.gov Driver License Renewals and Replacements',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/',
      },
      {
        label: 'FLHSMV Renew or Replace',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'FLHSMV Fees',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/fees/',
      },
      {
        label: 'NJ MVC License Renewal',
        url: 'https://www.nj.gov/mvc/license/licrenew.htm',
      },
      {
        label: 'NJ MVC Duplicate License',
        url: 'https://www.nj.gov/mvc/license/liclost.htm',
      },
      {
        label: 'NJ MVC License and Permit Fees',
        url: 'https://www.nj.gov/mvc/license/licfees.htm?os=os',
      },
      {
        label: 'Washington DOL Renew Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/renew-or-replace-driver-license/renew-driver-license',
      },
      {
        label: 'Michigan SOS License, ID or Permit Replacement',
        url: 'https://www.michigan.gov/sos/all-services/license-id-or-permit-replacement',
      },
      {
        label: 'Oregon DMV REAL ID Traveler',
        url: 'https://www.oregon.gov/odot/dmv/pages/realidtraveler.aspx',
      },
      {
        label: 'TSA Identification',
        url: 'https://www.tsa.gov/travel/security-screening/identification',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'new-jersey', 'washington', 'michigan', 'oregon', 'georgia', 'pennsylvania'],
  },
  {
    slug: 'first-driver-license-road-test',
    title: '第一次在美国考驾照：permit、笔试和路考顺序',
    eyebrow: '首次驾照',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '第一次在美国考驾照，不要只问“哪里预约路考”。多数州会先要求身份和居住材料、learner / instruction permit、knowledge test、练车或课程，再进入 road test / skills test 和正式 license。',
    whoNeedsIt: [
      '在美国第一次申请普通非商业驾照的人。',
      '已经会开车，但没有美国州驾照、需要从 permit 或 first license 入口开始的人。',
      '准备考笔试、路考，或想确认中文/多语言考试、第三方考点和车辆要求的人。',
    ],
    keyFacts: [
      'permit、knowledge test 和 road test 的顺序由州执行；成年人是否必须先拿 learner permit、练多久、是否要课程，不能跨州套用。',
      '多数州会先核验身份、合法身份/SSN、居住地址和可能的姓名文件；非公民身份、无 SSN、外文材料或外州/外国驾照会让路径分叉。',
      'knowledge test 可能在线、现场、学校或第三方完成；road test / skills test 可能由 DMV、授权学校或第三方 testing business 执行。',
      '路考不只是预约时间。很多州会检查陪同驾驶人、车辆登记/保险、安全设备、预约确认、permit 和练车记录。',
      '如果已经持有外国驾照或外州驾照，先看 transfer / exchange 规则；它可能改变是否需要 permit、knowledge test 或 road test。',
      '通过考试不等于当天拿到永久卡。部分州先给 interim / temporary credential，再把正式驾照邮寄到记录地址；办完要核对临时凭证的驾驶效力和邮寄状态。',
    ],
    checklist: [
      '先打开所在州的 first driver license、learner permit 或 new driver 页面，不要直接跳到 road test scheduler。',
      '准备身份、合法身份、SSN 或替代文件、州居住地址证明和姓名变更文件。',
      '确认年龄路径：teen / GDL、18+ 成人、未成年人家长同意和驾驶教育要求通常不同。',
      '确认知识考试：考试语言、是否可线上考、是否要预约、是否有重考等待期和费用。',
      '确认练车/课程：是否必须持 permit 一段时间、是否要求 supervised driving、5-hour course、driver education 或证书。',
      '确认路考车辆和陪同要求：保险、registration、inspection、brake lights、turn signals、licensed driver、预约确认和 permit。',
    ],
    steps: [
      '第一步：按年龄和身份选入口。成年人通常看 first license / new driver 18+，未成年人看 teen / GDL，外州或外国驾照持有人先看 transfer。',
      '第二步：把材料准备好。即使只是考 permit，很多州也会先核验身份、SSN / lawful status 和居住地址。',
      '第三步：准备并通过 knowledge test。用官方 manual、practice test 或 sample test，不要只背第三方题库。',
      '第四步：按州规则练车或完成课程。纽约有 5-hour pre-licensing course 场景，密歇根成人通常先拿 TIP 并至少练习 30 天；其他州要看本州要求。',
      '第五步：预约 road test / skills test 前核对车辆、陪同人和文件。路考失败常见原因不是不会开，而是车、证件或预约材料不合格。',
      '第六步：通过后确认照片、姓名、地址、限制条件和 interim credential，并跟踪永久卡邮寄；没有通过则先查正式结果、等待期和重考要求。',
    ],
    faqs: [
      {
        question: '成年人第一次考驾照，也一定要 learner permit 吗？',
        answer:
          '不一定，但很多州仍有 permit、temporary instruction permit 或 first-license 入口。华盛顿成人页面还区分是否想先练车；密歇根成人通常先取得 TIP。必须按所在州 first license 页面判断。',
      },
      {
        question: '我会开车，可以直接预约路考吗？',
        answer:
          '可能不行。很多州会先要求身份材料、knowledge test、permit、课程或练车期限。已有外国驾照或外州驾照的人，也可能走 transfer / reciprocity 规则，而不是普通首次驾照路径。',
      },
      {
        question: '笔试可以用中文吗？',
        answer:
          '看州。加州、纽约、华盛顿、新泽西、佐治亚、密歇根等州页面都出现过多语言或中文相关资料/考试说明，但德州等州限制更多。应回到州官方 language / knowledge test 页面确认。',
      },
      {
        question: '路考车辆需要准备什么？',
        answer:
          '通常要合法上路、登记和保险有效，灯光、刹车、转向灯、安全带等设备正常，并符合考官检查要求。各州列法不同，预约前必须看 road test 页面。',
      },
    ],
    factChecks: [
      {
        claim: '首次普通驾照的 permit、knowledge test、练车和 road test 顺序由州分别执行，不能把一个州的流程当成全国规则。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/',
          'https://dmv.ny.gov/driver-license/get-learner-permit',
          'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18',
        ],
      },
      {
        claim: 'California instruction permit 申请和考试准备分别由官方 permit 与 knowledge / drive test 页面说明。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/',
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/',
        ],
      },
      {
        claim: 'New York 首次申请人要先取得 learner permit，再按年龄和经历进入练车、课程与 road test 流程。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/get-learner-permit'],
      },
      {
        claim: 'Texas 首次驾照申请会先核对 citizenship/lawful presence、residency、identity、SSN 和适用的车辆或课程文件。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license'],
      },
      {
        claim: 'Florida 将 Class E knowledge exam 和 driving skills test 作为独立考试环节，并发布各自的官方要求。',
        sourceUrls: ['https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/'],
      },
      {
        claim: 'Washington 对 18 岁以上首次申请人按是否已有 permit、是否需要练车和测试情况进行分流。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18'],
      },
      {
        claim: 'New Jersey 首次驾照使用 graduated driver license 路径，permit、考试和年龄要求不能按成人通用经验跳过。',
        sourceUrls: ['https://www.nj.gov/mvc/license/firstlic.htm'],
      },
      {
        claim: 'Pennsylvania 首次驾驶路径从 learner permit 开始，并由 PennDOT 官方页面列出申请和测试材料。',
        sourceUrls: ['https://www.pa.gov/services/dmv/get-a-learners-permit'],
      },
      {
        claim: 'Georgia 和 North Carolina 都通过官方 test / exam 页面说明 knowledge、vision 或 road skills 等考试要求。',
        sourceUrls: [
          'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
          'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
        ],
      },
      {
        claim: 'Michigan 18 岁以上新司机有专门流程，不能直接套用 teen driver education 或其他州的 permit 持有期限。',
        sourceUrls: ['https://www.michigan.gov/sos/license-id/new-drivers-18-older'],
      },
    ],
    editorNotes: [
      '这页只做跨州流程判断，不给某一州的固定天数或费用；permit 持有期、课程、重考等待期和第三方考点规则都高度州别化。',
      '第一次考驾照的信息容易和外州/外国驾照 transfer 混在一起。已有有效外州或外国驾照的人，应先看 transfer / reciprocity，再决定是否走 permit 路径。',
      '中文用户常把“笔试语言”和“路考语言/口译”混为一谈。多数州即使提供多语言 knowledge test，也未必允许路考口译或 CDL 口译。',
      '路考前的车辆合格性是高风险点：预约成功不代表当天车辆、陪同人、保险或 permit 文件一定合格。',
    ],
    relatedDirectory: {
      label: '50 州笔试、路考和 learner permit 入口表',
      href: '/directories/tests-permits/',
      description: '按州查看 learner permit、knowledge test、road test、GDL、practice test 和第三方考点官方入口。',
    },
    sources: [
      {
        label: 'California DMV Instruction Permits',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/',
      },
      {
        label: 'California DMV Preparing for Knowledge and Drive Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/preparing-for-knowledge-and-drive-tests/',
      },
      {
        label: 'NY DMV Get Learner Permit',
        url: 'https://dmv.ny.gov/driver-license/get-learner-permit',
      },
      {
        label: 'Texas DPS Apply for a Driver License',
        url: 'https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license',
      },
      {
        label: 'FLHSMV Class E Knowledge Exam and Driving Skills Test',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/',
      },
      {
        label: 'Washington DOL Driver License Application Ages 18+',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-18',
      },
      {
        label: 'NJ MVC First Driver License',
        url: 'https://www.nj.gov/mvc/license/firstlic.htm',
      },
      {
        label: 'PennDOT Get a Learner Permit',
        url: 'https://www.pa.gov/services/dmv/get-a-learners-permit',
      },
      {
        label: 'Georgia DDS Test and Exams Information',
        url: 'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
      },
      {
        label: 'NCDMV Driver License Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
      },
      {
        label: 'Michigan SOS New Drivers 18 and Older',
        url: 'https://www.michigan.gov/sos/license-id/new-drivers-18-older',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'washington', 'new-jersey', 'pennsylvania', 'georgia', 'north-carolina', 'michigan'],
  },
  {
    slug: 'road-test-day-vehicle-sponsor-insurance-rental-retest',
    title: '路考当天带什么：车辆、陪同人、保险、租车和失败重约',
    eyebrow: '路考当天',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '路考预约成功不等于当天一定能开考。Permit、课程证明、陪同驾驶人、registration、insurance、inspection、车辆设备、租车合同、临牌和迟到规则都可能让考试在上路前就被取消或改期。',
    whoNeedsIt: [
      '已经通过 knowledge test、拿到 learner / instruction permit，并预约了普通非商业路考的人。',
      '准备借家人或朋友的车、租车、驾校车，或使用外州登记车辆参加路考的人。',
      '不确定陪同人年龄、驾照签发州、持证年限、是否要带实体驾照或是否要留在考场的人。',
      '车辆使用 temporary tag、刚买车、inspection 快过期，或保险卡只保存在手机里的人。',
      '已经被拒考、迟到、路考失败，想确认结果、等待期、重约和额外费用的人。',
    ],
    keyFacts: [
      '路考当天通常有两道独立检查：先看申请人是否具备考试资格和文件，再看测试车辆是否能合法、安全地参加考试。预约确认本身不能替代 permit、课程证明、陪同人或车辆文件。',
      '有效 registration 和 liability insurance 是高频共同要求；部分州还明确要求 inspection sticker、emissions sticker、实体 registration card、固定车牌、current tabs 或纸质 insurance card。不要只带手机截图。',
      '陪同驾驶人不是“随便找一个有驾照的人”。年龄、持证年限、驾照签发州、是否允许外国驾照、是否必须带 physical license，以及申请人能否自己把车开到考场，都按州和年龄路径变化。',
      '租车并非全国统一禁止。California、Texas、New Jersey、Virginia 和 Georgia 等官方页面要求申请人列在 rental agreement 上，Texas 和 California 还提醒合同不能排除 road test；Washington 明确允许使用 rental car，但仍要满足测试地点要求。',
      '车辆预检常见项目包括 brakes、parking brake、brake lights、turn signals、horn、mirrors、windshield / wipers、tires、doors、seat belts 和可用座位。New Jersey 和 Massachusetts 还特别关注考官能否从乘客侧接触 emergency / parking brake。',
      '临时牌照和刚买车辆差异很大。New York 不接受 in-transit permit 参加 road test；Texas 对符合条件的新购车允许用 Buyer’s Receipt 证明登记；Georgia 对 temporary dealer tag 或近期购车要求 bill of sale。',
      '失败后的等待期、可考次数、重考费和结果领取方式不统一。New York 和 New Jersey 的普通路考通常要等至少 14 天，Virginia 前两次失败后通常等两天，Massachusetts 限制 12 个月内最多参加 6 次 Class D road test。',
    ],
    factChecks: [
      {
        claim: '测试车辆通常必须有有效登记、保险并通过现场安全检查；具体还可能要求 inspection、tabs、固定车牌或原始车辆文件。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
          'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
          'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment',
          'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/',
          'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
          'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
        ],
      },
      {
        claim: '陪同人资格按州变化：California、New York、New Jersey、Massachusetts、Pennsylvania 和 Georgia 对年龄、驾照或持证经验有各自要求。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
          'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
          'https://www.nj.gov/mvc/license/roadtest.htm',
          'https://www.mass.gov/info-details/passenger-class-d-road-tests',
          'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
          'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
        ],
      },
      {
        claim: '使用租车时，申请人通常要列在 rental agreement 上，并确认租车合同和保险允许 road test；Washington 虽明确允许租车，仍要按考点规则准备。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
          'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment',
          'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
          'https://www.nj.gov/mvc/license/roadtest.htm',
          'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
          'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
        ],
      },
      {
        claim: '车辆设备不合格会导致拒考或改期；刹车、灯光、转向灯、轮胎、安全带、雨刷和考官可接触的 parking brake 都是高频检查项。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
          'https://www.nj.gov/mvc/license/roadtest.htm',
          'https://www.mass.gov/info-details/passenger-class-d-road-tests',
          'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
          'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
        ],
      },
      {
        claim: '临牌、近期购车和电子证件不能跨州套用：New York 禁止 in-transit permit，Texas 和 Georgia 对近期购车各有替代登记文件规则。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
          'https://www.dps.texas.gov/section/driver-license/faq/section-2-scheduling-road-test',
          'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
        ],
      },
      {
        claim: '重考等待期并不统一：New York 和 New Jersey 通常至少 14 天，Virginia 前两次失败通常等待两天，Massachusetts 另有年度尝试次数限制。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
          'https://www.nj.gov/mvc/license/roadtest.htm',
          'https://www.mass.gov/info-details/passenger-class-d-road-tests',
          'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
        ],
      },
      {
        claim: '翻译人员、乘客、录音和辅助驾驶功能的规则各州不同；预约前必须分别核对，不能把倒车影像可用理解成 self-parking 也可用。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
          'https://www.nj.gov/mvc/license/roadtest.htm',
          'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
          'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
        ],
      },
      {
        claim: 'New Jersey 允许使用原厂 backup camera 和 parking sensors，但 self-parking vehicle 不符合 basic road test 车辆要求。',
        sourceUrls: ['https://www.nj.gov/mvc/license/roadtest.htm'],
      },
      {
        claim: 'Massachusetts 允许申请人自带 interpreter，也可在预约时请求 RMV 安排；口译员只能翻译考官原话，不能增加驾驶指示。',
        sourceUrls: ['https://www.mass.gov/info-details/passenger-class-d-road-tests'],
      },
      {
        claim: 'Virginia road skills test 在道路上以英语进行；使用口译员时，口译员须符合年龄和驾照要求，测试车辆还必须有带安全带的后座。',
        sourceUrls: ['https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test'],
      },
    ],
    checklist: [
      '预约确认：姓名、考试类型、地点、日期、报到时间、取消/改期规则和天气停考入口。',
      '申请人文件：physical learner / instruction permit、要求的身份证明、眼镜或隐形眼镜、预约编号。',
      '课程和练车证明：pre-licensing certificate、driver education certificate、supervised driving certification、practice log 或州指定表格；需要原件时不要带复印件替代。',
      '陪同驾驶人：实体有效驾照、年龄和持证年限符合要求，并确认其驾照类别可以驾驶测试车辆。',
      '车辆登记：current registration card、有效车牌、tabs / sticker、inspection / emissions 文件，按州要求准备实体或纸质版本。',
      '保险：current liability insurance card / policy proof，核对 VIN、车主或 policy holder 信息，并确认申请人不是 excluded driver。',
      '租车或驾校车：rental agreement、authorized driver 名单、road-test 使用许可和保险证明；驾校车要确认考点接受。',
      '临牌或刚买车：temporary tag、dealer paperwork、Buyer’s Receipt 或 bill of sale；先确认本州是否允许该类型车辆参加路考。',
      '车辆设备：brakes、parking brake、brake lights、headlights、turn signals、horn、mirrors、wipers、tires、doors、windows、seat belts 和车内清洁。',
      '考后安排：结果查询方式、interim license、permit 是否继续有效、重考等待期、额外费用和下一次预约资料。',
    ],
    steps: [
      '第一步：只看考试州的 official road test / skills test 页面和具体考点通知。不要用驾校口头说法替代 DMV 对车辆、陪同人和文件的当前要求。',
      '第二步：确认自己已经满足 permit 持有期、knowledge test、课程、练车小时、年龄和身份文件要求。把“有预约”和“有资格考试”分开核对。',
      '第三步：确认陪同驾驶人。核对年龄、持证年限、驾照签发州、实体证件和是否需要作为 sponsor 留在考场或坐在后排。',
      '第四步：选定测试车辆。借车先问车主和保险；租车先读合同并把申请人列为 authorized driver；驾校车先确认考点和时间。',
      '第五步：前一天做一次完整车辆预检。不要只看仪表盘是否亮故障灯，要实际测试 brake lights、turn signals、horn、wipers、parking brake、doors、windows 和每条 seat belt。',
      '第六步：当天带齐 permit、课程/练车证明、陪同人驾照、registration、insurance、inspection、租车合同或购车证明，提前到场并检查天气取消信息。',
      '第七步：考后按官方方式取结果。通过后确认 interim license 怎么配合 permit 使用；未通过或被拒考时，先查原因、等待期和费用，再重约。',
    ],
    faqs: [
      {
        question: '可以借家人或朋友的车参加路考吗？',
        answer:
          '很多州允许使用并非本人名下的合格车辆，但必须有车主许可，registration、insurance 和 inspection 有效，申请人也不能被保险明确排除。考官是否要求纸质文件、陪同人是否必须与车主相同，要看考试州和考点。',
      },
      {
        question: '可以用租车参加路考吗？',
        answer:
          '部分州可以，但申请人通常必须列在 rental agreement 上，并确认租车公司没有禁止 road test。California、Texas、New Jersey、Virginia 和 Georgia 都有授权驾驶人或合同要求；Washington 明确写可用 rental car。不要到考场才第一次问租车公司。',
      },
      {
        question: '保险卡上必须有我的名字吗？',
        answer:
          '没有全国统一答案。Texas DPS 明确说申请人不一定要列在保单上，但不能是 excluded driver；其他州或考点可能要求保险卡、policy、车辆信息或外州保额证明。应把保险证明和 rental agreement / owner permission 分开核对。',
      },
      {
        question: 'temporary tag 或刚买的车能参加路考吗？',
        answer:
          '取决于州和临时凭证类型。New York 不接受 in-transit permit；Texas 对有固定 metal plates 的近期购车可能接受 Buyer’s Receipt；Georgia 对 temporary dealer tag 或近期购车要求 bill of sale。不要把普通临牌、trip permit 和正式 registration 当成一回事。',
      },
      {
        question: '车辆预检没通过，算路考失败吗？',
        answer:
          '各州记录方式和费用处理不同，但通常当天不会继续上路考试。California 说车辆不合格会改期，New Jersey 会拒绝考试，Massachusetts 也把车辆未通过检查列为 unprepared 场景。先问清是 vehicle rejection、no-show、cancellation 还是 driving failure，再处理重约。',
      },
      {
        question: '倒车影像、parking sensor 或自动泊车能用吗？',
        answer:
          '不要混为一谈。New Jersey 允许原厂 backup camera 和 parking sensors，但 self-parking vehicle 不合格；California 禁止 automated parallel parking、lane departure 和 adaptive cruise control 等高级辅助完成考试动作；Pennsylvania 允许有 self-parking 的车参加，但功能必须关闭。',
      },
      {
        question: '路考失败后多久可以再考？',
        answer:
          '看州和失败次数。New York、New Jersey 普通路考通常至少等 14 天；Virginia 前两次失败后通常等两天，第三次失败后会触发额外 driver education 要求；Massachusetts 还限制 12 个月内最多 6 次 Class D road tests。重约前同时确认新费用和 permit 有效期。',
      },
    ],
    editorNotes: [
      '本专题只处理普通非商业 passenger vehicle road test，不把 motorcycle、CDL、medical re-exam 或 reinstatement road test 的规则混入通用清单。',
      '来源优先使用各州 road test / skills test 当前页面；driver handbook 只补充车辆设备和考试动作，不替代预约页面。',
      '陪同人、租车、电子保险卡、临牌、第三方考点、口译和重考规则都属于高变化字段，后续复核优先看这些项目。',
      'Florida General Information 仍可能显示旧考试语言，本专题不引用该页的语言清单；语言政策继续以 2026 English-only 公告为准。',
      'Mass.gov、Texas DPS 和 Georgia DDS 可能限制自动访问；链接状态为 watch 时仍保留官方来源，并从机构首页复核。',
    ],
    relatedDirectory: {
      label: '50 州笔试、路考和 learner permit 入口表',
      href: '/directories/tests-permits/',
      description: '按州查看 learner permit、knowledge test、road test、GDL、practice test 和第三方考点官方入口。',
    },
    sources: [
      {
        label: 'California DMV Testing Process',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/the-testing-process/',
      },
      {
        label: 'California DMV Learner Permits',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/',
      },
      {
        label: 'NY DMV Schedule and Take a Road Test',
        url: 'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test',
      },
      {
        label: 'Texas DPS Schedule Your Driving Test Appointment',
        url: 'https://www.dps.texas.gov/section/driver-license/schedule-your-driving-test-appointment',
      },
      {
        label: 'Texas DPS Scheduling a Road Test FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-2-scheduling-road-test',
      },
      {
        label: 'FLHSMV Teen Licensing and Driving Skills Test Requirements',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/',
      },
      {
        label: 'FLHSMV Driver License Exams',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/',
      },
      {
        label: 'Washington DOL Do I Need to Take a Test',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
      },
      {
        label: 'Washington State Driver Guide',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only',
      },
      {
        label: 'NJ MVC Road Test',
        url: 'https://www.nj.gov/mvc/license/roadtest.htm',
      },
      {
        label: 'Mass.gov Passenger Class D Road Tests',
        url: 'https://www.mass.gov/info-details/passenger-class-d-road-tests',
      },
      {
        label: 'PennDOT Driver Manual Testing',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
      },
      {
        label: 'Virginia DMV Road Skills Tests',
        url: 'https://www.dmv.virginia.gov/licenses-ids/exams/road-skills-test',
      },
      {
        label: 'Georgia DDS Make a Road Test Appointment',
        url: 'https://dds.georgia.gov/how-do-i-make-road-test-appointment',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'washington', 'new-jersey', 'massachusetts', 'pennsylvania', 'virginia', 'georgia'],
  },
  {
    slug: 'teen-driver-permit-gdl-parent-guide',
    title: '未成年人考驾照：parent consent、driver education 和 GDL 限制怎么准备',
    eyebrow: '青少年驾照',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '美国青少年考驾照通常不是“考过笔试和路考就结束”。未满 18 或未满 21 的申请人可能要走 graduated driver license (GDL)、父母/监护人签字、driver education、supervised driving hours、夜间练车、乘客限制、curfew、学校证明、保险和路考车辆要求。家长和学生需要逐项核对本州规则。',
    whoNeedsIt: [
      '家里有 15-17 岁孩子，准备申请 learner permit、instruction permit、junior license、provisional license、probationary license 或 Class D license 的家长。',
      '不确定孩子是否必须上 driver education、behind-the-wheel training、parent-taught course、5-hour course、TLSAE/DETS 或 Joshua’s Law 课程的人。',
      '已经有 permit，准备路考，但不确定练车小时、夜间小时、父母签字、school enrollment、保险和考试车辆要求的人。',
      '刚搬州，孩子有外州 permit、外州 driver education certificate 或外州 teen license，不确定新州是否承认的人。',
      '拿到 provisional / junior / probationary license 后，想确认夜间驾驶、乘客人数、手机、贴纸、seat belt 和违规后果的人。',
    ],
    keyFacts: [
      'Teen licensing 是州法，不是全美统一。NHTSA 说明各州和 DC 都有 GDL 类规则，但具体年龄、阶段、限制和课程要求由州决定。',
      'Permit 年龄差很多。California teen permit 是 15 1/2；Florida、Georgia 是 15；Virginia 是 15 years and 6 months；New York、Pennsylvania 和 Massachusetts 通常从 16 岁开始；New Jersey special learner permit 可在 16 岁配合 behind-the-wheel 课程取得。',
      'Parent / guardian consent 通常不是形式。California permit application、Florida parental consent、Virginia learner permit、Washington online / in-person license application、Pennsylvania under-18 consent 和 Massachusetts online permit 都要求家长或监护人参与或签字。',
      'Driver education 必须看是否“州认可”。Washington 明确不接受 online self-paced 或 parent-taught course 作为未满 18 取 license 的 approved course；Georgia Joshua’s Law 也要求 DDS-approved / certified course；California 对 under 18 有 DE / DT 要求。',
      '练车小时不是全国统一。California 要 50 小时、10 小时夜间；Florida 要 50 小时、10 小时夜间；Washington 要 40 小时白天和 10 小时夜间；Virginia 要 45 小时、15 小时日落后；Georgia 要 40 小时、6 小时夜间；Pennsylvania young driver guidance 指向 65 小时 supervised skill building。',
      'GDL 限制拿到 license 后仍然存在。New York under 18 GDL、Florida 16/17 岁 curfew、New Jersey under 21 decal / passenger / night restrictions、Georgia Class D curfew / passenger limits、Massachusetts JOL restrictions 都说明拿到卡不等于 unrestricted license。',
      '路考前要确认车辆和保险。Florida teen licensing 页面明确 road test vehicle 需要 valid registration、proof of insurance 并通过基本车辆检查；很多州也要求陪同人、车辆文件或考试预约条件。',
      '外州搬入或外州课程不能默认被承认。Washington 要把 out-of-state traffic safety education 提交给 DOL 审核；Georgia teen FAQ 对 out-of-state driver education 有特定条件；New York 对 out-of-state permit 在纽约驾驶也有单独规则。',
      '违规后果可能比成年人更重。Pennsylvania young driver materials、Georgia Class D restrictions、Massachusetts junior operator violations 和 New Jersey GDL sticker / restriction rules都把 suspension、罚款、延迟升级或额外限制写得更严。',
    ],
    checklist: [
      '确认年龄和目标阶段：learner / instruction permit、special learner permit、junior / provisional / probationary license，还是 full unrestricted license。',
      '确认居住州和学校/家庭场景：本州 resident、刚搬州、homeschool、外州 permit、外州 driver education certificate、军人家庭或临时身份。',
      '准备身份和地址材料：identity、lawful presence / legal presence、SSN、residency、name change，以及本州要求的 school enrollment / attendance 或未成年人证明。',
      '准备父母/监护人文件：签 application、notarized consent、online permission、parent/teen course、practice log、minor driving experience certification 或 completion certificate。',
      '确认课程是否被官方接受：driver education、driver training、behind-the-wheel、parent-taught guide、TLSAE/DETS、5-hour course、Joshua’s Law 或州认证 driving school。',
      '记录练车小时：总小时、夜间小时、监督驾驶人年龄和驾照条件；不要等路考当天才让家长补签。',
      '路考前确认预约、permit 持有时间、违规记录、考试车辆 registration、insurance、inspection、陪同驾驶人和文件原件。',
      '拿证后单独读 GDL restrictions：night curfew、passenger limit、cell phone、seat belt、decal/sticker、work/school exception、violation suspension 和升级时间。',
    ],
    steps: [
      '第一步：先不要只看 adult first license 页面。打开州 DMV / DPS / DOL / MVC / RMV 的 teen driver、GDL、junior operator、provisional license 或 ages 16-17 页面。',
      '第二步：按年龄确认第一张 permit。15、15 1/2、15 years 6 months、16、17 在不同州对应不同 permit 和课程路径。',
      '第三步：把 permit、课程、练车、路考、license 限制分成五张清单。permit 材料过了，不代表课程完成；路考过了，也不代表 GDL 限制结束。',
      '第四步：先验证课程。只报名“网上驾校”不一定能被州接受；Washington、Georgia、California、Massachusetts 等都要求官方认可课程、学校或证书。',
      '第五步：安排练车日志和家长签字。California、Florida、Washington、Virginia、Georgia、Pennsylvania 等州对小时数、夜间小时、监督人条件或家长认证有明确要求。',
      '第六步：路考前做车辆和保险检查。确认 registration、insurance、基本设备、陪同人、permit 原件、driver education proof、completion certificate 和预约规则。',
      '第七步：拿到 provisional / junior / probationary license 后，把夜间、乘客、手机、贴纸和违规后果贴在家庭规则里。很多限制到 18 或升级 full license 前才解除。',
    ],
    faqs: [
      {
        question: '孩子 15 岁可以开始办 learner permit 吗？',
        answer:
          '要看州。Florida 和 Georgia 通常 15 岁可开始 learner / instructional permit；California 是 15 1/2；Virginia 是 15 years and 6 months；New York、Pennsylvania、Massachusetts 一般要 16 岁。不要按朋友所在州推断。',
      },
      {
        question: '父母自己教开车，可以替代驾校吗？',
        answer:
          '有些州允许 parent-taught 或 parent/teen guide 作为某些部分，有些州不接受。Washington 明确不接受 online self-paced 或 parent-taught course 作为未满 18 取 license 的 approved course；Georgia Joshua’s Law 有多种 DDS-approved 方法，其中一些可结合 Parent/Teen Driving Guide。先查本州官方课程要求。',
      },
      {
        question: '练车小时要不要真的记录？',
        answer:
          '最好记录。Florida、California、Washington、Virginia、Georgia、Pennsylvania 都有小时数或家长/成人认证要求，只是表格和是否强制日志不同。即使州不收纸质 log，父母或监护人也可能要 certify / swear / affirm 练车小时。',
      },
      {
        question: '拿到 provisional / junior / probationary license 后，可以像成年人一样开吗？',
        answer:
          '通常不可以。GDL 阶段常有限制：夜间不能开、乘客人数限制、不能用手机、必须贴 decal、不能有 moving violation、要遵守 seat belt 等。Georgia、Florida、New Jersey、New York、Massachusetts 都有明显的 teen / junior / GDL restrictions。',
      },
      {
        question: '我们搬州了，外州 permit 或 driver education 还能用吗？',
        answer:
          '不能默认。Washington 要审核 out-of-state traffic safety education；Georgia 对外州 driver education 有特定条件；New York 对 out-of-state learner permit 在纽约驾驶也有单独规则。搬州后先查新州 teen driver 或 new resident 页面。',
      },
    ],
    factChecks: [
      {
        claim: 'NHTSA 将 graduated driver licensing 分为 learner、intermediate 和 full privilege 等阶段，但每州的年龄、等待期和限制由州规则决定。',
        sourceUrls: ['https://www.nhtsa.gov/road-safety/teen-driving'],
      },
      {
        claim: 'California 未满 18 岁申请 instruction permit 通常至少要 15 岁半，并要完成或正在参加符合要求的 driver education 且取得家长或监护人签字。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/',
        ],
      },
      {
        claim: 'California 青少年在路考前通常要持 permit 至少六个月，并完成 50 小时监督驾驶，其中 10 小时为夜间驾驶。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/teen-drivers/',
        ],
      },
      {
        claim: 'Florida learner license 通常要持有 12 个月或到 18 岁，并完成 50 小时驾驶、其中 10 小时夜间；16 岁和 17 岁驾驶人另有不同夜间时段限制。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/traffic-laws-florida-teens/',
        ],
      },
      {
        claim: 'Washington 16–17 岁申请人要完成 40 小时白天和 10 小时夜间监督驾驶；online self-paced 与 parent-taught course 不算州认可课程。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-16-17',
        ],
      },
      {
        claim: 'New Jersey 对 2025 年 2 月 1 日或之后签发 permit 的未满 21 岁申请人要求 50 小时监督驾驶、其中 10 小时在 darkness，并提交 BA-CSD。',
        sourceUrls: [
          'https://nj.gov/mvc/press/archives/2025/01312025.htm',
          'https://www.nj.gov/mvc/pdf/license/BA-CSD.pdf',
        ],
      },
      {
        claim: 'New Jersey GDL 取得 probationary license 后仍有夜间、乘客、电子设备和红色反光 decal 等限制。',
        sourceUrls: ['https://www.nj.gov/mvc/about/gdlsafety.htm'],
      },
      {
        claim: 'Pennsylvania 未满 18 岁申请人在路考前要完成 65 小时练车，其中至少 10 小时夜间和 5 小时恶劣天气，并等待 permit 满六个月。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit',
        ],
      },
      {
        claim: 'Virginia 18 岁及以下申请人通常要持 learner permit 九个月，并由家长或监护人认证 45 小时练车、其中 15 小时在夜间。',
        sourceUrls: ['https://www.dmv.virginia.gov/safety/programs/teens/faqs'],
      },
      {
        claim: 'Georgia Joshua’s Law 对 16–17 岁 Class D 路径要求认可课程，并要求 40 小时监督驾驶、其中至少 6 小时夜间。',
        sourceUrls: ['https://dds.georgia.gov/georgia-licenseid/new-licenseid/joshuas-law-requirements'],
      },
    ],
    editorNotes: [
      '这页专门服务未成年人和家长，避免把 first-driver-license-road-test 页面变成过宽的“所有新司机”页面。',
      '不要把 GDL 写成一个全国统一制度。NHTSA 可作为全国安全和 GDL 背景，但具体年龄、小时数、限制、课程和文件必须以州 DMV 为准。',
      '父母签字、课程认可、练车小时、夜间小时、permit holding period、违规后果是本页最有价值的中文解释点。',
      '外州搬入的 teen driver 要谨慎：permit、课程证书、driver training school、practice hours 和 provisional restrictions 可能不能直接转。',
      '这页不提供保险、法律或学校纪律建议；只解释 DMV / motor vehicle agency 的 permit、license 和 GDL 路径。',
    ],
    relatedDirectory: {
      label: '查看 DMV 笔试、路考和 learner permit 入口表',
      href: '/directories/tests-permits/',
      description: '按州查 permit、knowledge test、road test、driver manual、teen driver、GDL 和考试预约入口。',
    },
    sources: [
      {
        label: 'NHTSA Teen Driving',
        url: 'https://www.nhtsa.gov/road-safety/teen-driving',
      },
      {
        label: 'California DMV Learner’s Permits',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/',
      },
      {
        label: 'California DMV Driver Licenses',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/',
      },
      {
        label: 'California Driver Handbook: Instruction Permit and Driver License',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/getting-an-instruction-permit-and-drivers-license/',
      },
      {
        label: 'California DMV Driver Training Schools',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/driver-training-schools/',
      },
      {
        label: 'California DMV Teen Driver Roadmap',
        url: 'https://www.dmv.ca.gov/portal/teen-drivers/',
      },
      {
        label: 'California DMV Parent Teen Training Guide',
        url: 'https://www.dmv.ca.gov/portal/uploads/2020/06/dl603_compressed.pdf',
      },
      {
        label: 'NY DMV Get Learner Permit',
        url: 'https://dmv.ny.gov/driver-license/get-learner-permit',
      },
      {
        label: 'NY DMV Learner Permit Restrictions',
        url: 'https://dmv.ny.gov/driver-license/learner-permit-restrictions',
      },
      {
        label: 'NY DMV Graduated License Law',
        url: 'https://dmv.ny.gov/driver-license/younger-driver/the-graduated-license-law',
      },
      {
        label: 'NY DMV Younger Driver Resources',
        url: 'https://dmv.ny.gov/driver-license/younger-driver',
      },
      {
        label: 'NY DMV Drive in New York with an Out-of-State Permit',
        url: 'https://dmv.ny.gov/driver-license/younger-driver/drive-in-new-york-state-with-an-out-of-state-permit',
      },
      {
        label: 'Texas DPS Texas Learner License as a Teen',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-learners-license-teen',
      },
      {
        label: 'Texas DPS Texas Provisional License as a Teen',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-provisional-license-teen',
      },
      {
        label: 'Texas DPS Graduated Driver License and Hardship License',
        url: 'https://www.dps.texas.gov/section/driver-license/graduated-driver-license-gdl-and-hardship-license',
      },
      {
        label: 'Texas DPS Impact Texas Drivers Program',
        url: 'https://www.dps.texas.gov/section/driver-license/impact-texas-drivers-itd-program',
      },
      {
        label: 'Texas DPS Choosing a Driver Education Course',
        url: 'https://www.dps.texas.gov/section/driver-license/choosing-driver-education-course',
      },
      {
        label: 'FLHSMV Teen Licensing Requirements and GDL Laws',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/',
      },
      {
        label: 'FLHSMV Traffic Laws for Florida Teens',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/traffic-laws-florida-teens/',
      },
      {
        label: 'FLHSMV Class E Knowledge Exam and Driving Skills Test',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/class-e-knowledge-exam-driving-skills-test/',
      },
      {
        label: 'FLHSMV Required Forms for Teens',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/required-forms-teens/',
      },
      {
        label: 'FLHSMV Teen Driver FAQ',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/licensing-requirements-teens-graduated-driver-license-laws-driving-curfews/frequently-asked-questions/',
      },
      {
        label: 'FLHSMV Teen Drivers',
        url: 'https://www.flhsmv.gov/safety-center/driving-safety/teen-drivers/',
      },
      {
        label: 'Washington DOL Get Your First License or Permit',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit',
      },
      {
        label: 'Washington DOL Driver License Application Ages 16 to 17',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-your-first-license-or-permit/driver-license-application-ages-16-17',
      },
      {
        label: 'Washington DOL Washington State Driver Guide Text Only',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only',
      },
      {
        label: 'Washington DOL Driver Licensing Fees',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-licensing-fees',
      },
      {
        label: 'Washington DOL Pre-Apply Online',
        url: 'https://dol.wa.gov/pre-apply-online',
      },
      {
        label: 'NJ MVC First Driver License',
        url: 'https://www.nj.gov/mvc/license/firstlic.htm',
      },
      {
        label: 'NJ MVC Graduated Driver License',
        url: 'https://www.nj.gov/mvc/about/gdlsafety.htm',
      },
      {
        label: 'NJ MVC Testing and Preparation',
        url: 'https://www.nj.gov/mvc/license/testprep.htm',
      },
      {
        label: 'NJ MVC License and Permit Fees',
        url: 'https://www.nj.gov/mvc/license/licfees.htm',
      },
      {
        label: 'NJ MVC Supervised Driving Certification BA-CSD',
        url: 'https://www.nj.gov/mvc/pdf/license/BA-CSD.pdf',
      },
      {
        label: 'NJ MVC Practice Driving Requirement Announcement',
        url: 'https://nj.gov/mvc/press/archives/2025/01312025.htm',
      },
      {
        label: 'PennDOT Teen Drivers',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/teen-drivers',
      },
      {
        label: 'PennDOT Get a Learner Permit',
        url: 'https://www.pa.gov/services/dmv/get-a-learners-permit',
      },
      {
        label: 'PennDOT Get a Driver License',
        url: 'https://www.pa.gov/services/dmv/get-a-driver-license',
      },
      {
        label: 'PennDOT Young Driver',
        url: 'https://www.pa.gov/agencies/penndot/traveling-in-pa/safety/traffic-safety-driver-topics/young-driver',
      },
      {
        label: 'PennDOT Driver Manual Applying for a Learner Permit',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/applying-for-a-learners-permit',
      },
      {
        label: 'PennDOT Junior Learner Permit and Junior Driver License Guide',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-publications/pub%20178.pdf',
      },
      {
        label: 'Virginia DMV Apply for a Learner Permit',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/apply',
      },
      {
        label: 'Virginia DMV Driver Education',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/ed-reqs',
      },
      {
        label: 'Virginia DMV Teen Driver Resources',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/teen',
      },
      {
        label: 'Virginia DMV Teen Driving Restrictions',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/restrictions',
      },
      {
        label: 'Virginia DMV Driver Education for Home Schoolers',
        url: 'https://www.dmv.virginia.gov/licenses-ids/learners/homeschool',
      },
      {
        label: 'Virginia DMV Driver Training Schools',
        url: 'https://www.dmv.virginia.gov/licenses-ids/training/driver-training-schools',
      },
      {
        label: 'Georgia DDS Teen Drivers',
        url: 'https://dds.georgia.gov/teen-drivers',
      },
      {
        label: 'Georgia DDS Learners Permit',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-learners-permit',
      },
      {
        label: 'Georgia DDS Class D Provisional License',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/how-do-i-class-d',
      },
      {
        label: 'Georgia DDS Joshua’s Law Requirements',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/joshuas-law-requirements',
      },
      {
        label: 'Georgia DDS Teen Driving Laws FAQs',
        url: 'https://dds.georgia.gov/georgia-licenseid/licensesid-faqs/teen-driving-laws-faqs',
      },
      {
        label: 'Georgia DDS Driver Education FAQs',
        url: 'https://dds.georgia.gov/driver-education-faqs',
      },
      {
        label: 'Mass.gov Teen Drivers',
        url: 'https://www.mass.gov/info-details/teen-drivers',
      },
      {
        label: 'Mass.gov Junior Operator License Requirements',
        url: 'https://www.mass.gov/info-details/junior-operator-license-jol-requirements',
      },
      {
        label: 'Mass.gov Apply for a Passenger Class D Learner Permit',
        url: 'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit',
      },
      {
        label: 'Mass.gov Driver Education Programs',
        url: 'https://www.mass.gov/info-details/drivers-education-programs',
      },
      {
        label: 'Mass.gov Passenger Class D Road Tests',
        url: 'https://www.mass.gov/info-details/passenger-class-d-road-tests',
      },
      {
        label: 'Mass.gov Junior Operator Violations',
        url: 'https://www.mass.gov/info-details/junior-operator-violations',
      },
      {
        label: 'California DMV Teen Drivers Guide',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/teen-drivers/',
      },
      {
        label: 'Virginia DMV Teen Driver Safety FAQ',
        url: 'https://www.dmv.virginia.gov/safety/programs/teens/faqs',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'massachusetts',
    ],
  },
  {
    slug: 'older-driver-license-renewal-medical-review',
    title: '老人/高龄驾驶人续驾照、视力测试和医疗审查怎么处理',
    eyebrow: '高龄驾驶',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '在美国，older driver / mature driver 相关问题不只是“老人能不能开车”。不同州会把续驾照、视力测试、medical review、driver re-evaluation、家属担心 unsafe driver、医生报告和限制驾照分成不同程序，需要按触发原因找到对应官方入口。',
    whoNeedsIt: [
      '家里有 64、75、79、80 岁以上的父母或长辈，要续 driver license、确认是否必须现场办理或做 vision test 的人。',
      '长辈最近发生事故、迷路、意识丧失、反应明显变慢、视力变差、认知变化、服药影响驾驶，家属不知道能否向 DMV 报告的人。',
      '收到 DMV / DPS / DOL / MVC / RMV 的 medical review、driver re-evaluation、vision report、road test 或 doctor certification 信件，不知道下一步的人。',
      '想区分“年龄触发的续证/视力规则”和“医疗条件触发的安全审查”的申请人、家属或照护者。',
      '考虑把驾照换成 State ID / non-driver ID，或需要讨论替代交通、限制驾照、白天驾驶、区域驾驶的人。',
    ],
    keyFacts: [
      '年龄本身通常不是吊销或复查驾照的充分理由。NHTSA 明确把安全重点放在 vision、physical fitness、reflexes、medical conditions、medications、attention 和反应能力变化上，而不是单纯年龄。',
      '有些州确实设置年龄触发的续证或视力规则。Florida 80 岁起 Class E 驾照改为每 6 年续一次，且不能线上续时要通过 vision test；Virginia 75 岁及以上续驾照必须到 DMV customer service center，并完成 vision screening 或提交 vision report；Georgia 64 岁及以上每次续证都要 vision screening；Texas 79 岁及以上通常要现场续驾照。',
      '普通续期、视力测试、medical review 和 driver re-evaluation 是不同程序。续期是 license renewal；vision test 只看视力标准；medical review 可能要求医生表格、病情控制证明或定期 recertification；re-evaluation 可能要求面谈、eye test、written test 或 road skills test。',
      '家属或旁人报告 unsafe driver 不能只写“年纪大了”。Washington DOL 明确要求具体描述驾驶能力、medical / vision conditions，并且信息必须来自个人观察；New York 和 Georgia 也说明 age alone 不能作为行动依据。',
      '报告路径的保密性不同。New York 对非医生报告人的身份有保护口径；Washington 说明 unsafe-driver report 在州法下不保密，司机或律师可能申请副本；Virginia 对亲属或治疗医疗人员的部分来源/理由有保密规则；New Jersey 不接受匿名报告。',
      '医生/医疗人员报告在部分州不是“可选提醒”。Pennsylvania 要求 health care personnel 报告 15 岁以上、被诊断为可能影响安全驾驶状况的人，但预计少于 90 天的状况有例外；New Jersey 要求医生报告 recurrent seizure、recurrent unconsciousness 或 motor coordination impairment 等情况。',
      'DMV 的结果不一定是吊销。官方流程里常见结果包括要求 medical / vision certificate、医生复核、knowledge test、road skills test、驾驶康复评估、车辆辅助设备、限制驾照、白天驾驶、区域驾驶、定期复审，或者在风险较高时 suspend / revoke / cancel driving privilege。',
      '被要求提交 medical review 文件时，截止日期很重要。Georgia DDS 说明收到 medical / vision form 后若 30 天内不配合，可能进入 revocation notice；New Jersey Medical Review Process 也会给出表格返回期限；New York 说明不提供要求的 medical documentation 可能导致 suspension。',
      '认知障碍、意识丧失、癫痫、视力变化、运动功能或判断力问题，比年龄数字本身更关键。California、New York、Virginia、Florida、Georgia 等州都有 medical conditions / medical review 页面，用来判断是否仍能安全驾驶。',
      '如果已经不适合继续开车，把驾照换成 State ID / non-driver ID 往往比“拖着不处理”更稳。Florida older-driver 页面就把 surrender driver license and obtain an ID card 作为安全选择之一；各州 ID 规则仍要按本州身份和地址材料办。',
      'Illinois 从 2026 年 7 月 1 日起不再要求 79–86 岁驾驶人仅因年龄参加 routine behind-the-wheel test；他们仍要现场续证和视力检查，87 岁及以上仍按年度路考规则办理。但驾照在 2026 年 7 月 1 日前已经过期的 79–86 岁驾驶人，即使之后才续证，仍要路考。',
      'California 70 岁及以上仍要每五年现场续证并做视力检查，但从 2024 年 10 月起，大多数驾驶记录合格的续证人不再仅因年龄参加 written knowledge test。',
    ],
    checklist: [
      '确认所在州和年龄：64、75、79、80 岁这些门槛在 Georgia、Virginia、Texas、Florida 等州对应不同 renewal / vision 规则。',
      '确认问题类型：普通续驾照、视力不达标、医疗条件变化、医生报告、家属报告、事故后复查、road skills test，还是想主动换成 State ID。',
      '收集官方信件：DMV case number、Medical Review Unit / Driver Safety / MRS / DDS letter、表格编号、提交期限、医生填写要求、是否要求原件或线上提交。',
      '准备医疗和视力材料：vision report、eye exam、doctor certification、medical evaluation form、medication list、specialist note、driver rehabilitation evaluation 或州指定表格。',
      '记录具体驾驶观察：迷路、撞车、逆行、闯灯、刮蹭、反应迟缓、看不清路标、找不到车道、意识短暂丧失；报告 unsafe driver 时不要只写“年纪大”。',
      '确认报告是否保密、是否接受匿名、是否必须亲属/医生/执法机关提出，以及报告后 DMV 是否会向家属反馈结果。',
      '如果 DMV 要求考试，确认是 vision test、knowledge test、road skills test、supplemental driving performance evaluation、driver re-evaluation 还是完整重新申请。',
      '和家人同步替代方案：白天/熟悉路线驾驶、限制上高速、家人接送、公共交通、社区交通、rideshare、State ID / non-driver ID、保险和车辆处置。',
    ],
    steps: [
      '第一步：先查本州 mature driver / older driver / senior driver 页面。不要只按年龄猜，因为有些州写 64+、75+、79+、80+，有些州没有单独高龄续证门槛。',
      '第二步：把“能续证吗”和“还能安全驾驶吗”分开。续期页面告诉你怎么 renew；medical review / unsafe driver 页面才处理视力、意识、认知、运动功能或病情控制。',
      '第三步：如果只是续驾照，按州规则走 renewal、vision screening、线上资格、现场预约和费用。Florida、Virginia、Georgia、Texas 的年龄触发规则尤其要先看官方页面。',
      '第四步：如果是医疗或视力问题，先看本州 Medical Review / Driver Safety / Medical Advisory Board 页面，确认谁能提交、用哪张表、医生是否必须填写、多久内返回。',
      '第五步：如果家属担心 unsafe driver，先写事实清单。Washington 要具体、个人观察；New Jersey 不收匿名；New York age alone 不行动；Georgia 的 request driver review 也不能只靠年龄。',
      '第六步：收到 DMV 信后按截止日期处理。可能需要医生表格、eye doctor report、面谈、written test、road skills test、driving evaluation 或限制驾照；错过期限可能导致 suspension、revocation 或 cancel driving privilege。',
      '第七步：如果决定不再开车，查 State ID / non-driver ID 的材料和预约，同时处理保险、车辆登记、车牌、title、停车牌、医疗交通和家庭出行安排。',
    ],
    faqs: [
      {
        question: '年纪大了 DMV 会自动吊销驾照吗？',
        answer:
          '通常不会只因为年龄自动吊销。很多州有年龄触发的续证、现场办理或视力测试规则，但吊销、暂停或限制通常要看 medical condition、vision、driving record、事故、医生报告或复查结果。NHTSA 也强调 decisions should never be based on age alone。',
      },
      {
        question: '家属能不能向 DMV 报告 unsafe driver？',
        answer:
          '很多州可以，但规则差异很大。Washington 要求具体事实和个人观察，且报告不保密；New Jersey 不接受匿名报告；New York 接受 DS-7 driver review，但 age alone 不足以采取行动；Georgia 的 DDS 270 也不能只把年龄作为理由。',
      },
      {
        question: '医生报告后会马上吊销驾照吗？',
        answer:
          '不一定。New York 可能要求医生证明病情已被治疗或控制；Virginia MRS 会审核医疗/视力情况；Georgia 可能先寄 medical / vision form；New Jersey 可能要求 physician forms。部分州对特定情况有强制医生报告，结果可能是补材料、限制、复考、暂停或吊销。',
      },
      {
        question: '视力测试不达标是不是一定不能开车？',
        answer:
          '不一定，但不能硬闯。州 DMV 可能要求 eye specialist report、vision report、corrective lenses、白天限制、区域限制或进一步 road skills test。Florida 80 岁以上续证可能要 HSMV 72119 S 或 eye exam；Georgia 64+ 每次续证要 vision screening，并列出非商业驾照最低视力标准。',
      },
      {
        question: '收到 medical review / re-evaluation 信后应该怎么做？',
        answer:
          '先看截止日期、表格编号、提交方式和是否需要医生填写。不要把它当成普通 renewal。可能需要 medical documentation、vision report、interview、knowledge test、road skills test 或 driver rehabilitation evaluation；不回应可能导致 suspension、revocation 或 cancel driving privilege。',
      },
    ],
    factChecks: [
      {
        claim: 'NHTSA 提醒高龄驾驶安全决定不应只看年龄，而要结合视力、身体能力、药物、认知和实际驾驶表现。',
        sourceUrls: ['https://www.nhtsa.gov/road-safety/older-drivers'],
      },
      {
        claim:
          'Illinois 自 2026 年 7 月 1 日起取消 79–86 岁仅因年龄触发的 routine road test，但仍要求现场续证和视力检查；87 岁及以上仍需年度路考。若驾照在该日期前已过期，79–86 岁申请人之后续证仍要路考。',
        sourceUrls: [
          'https://www.ilsos.gov/departments/drivers/traffic-safety/understanding-illinois-road-safety-and-fairness-act.html',
          'https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html',
        ],
      },
      {
        claim: 'California 70 岁及以上每五年现场续证并接受视力检查；自 2024 年 10 月起，多数驾驶记录合格者不再按年龄例行参加 written knowledge test。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/senior-drivers/',
          'https://www.dmv.ca.gov/portal/news-and-media/news-releases/written-knowledge-test-requirement-eliminated-for-most-california-drivers-license-renewals/',
        ],
      },
      {
        claim: 'Florida Class E 驾照在 80 岁起改为每六年续证；80 岁及以上不符合线上续证资格时要通过 vision test。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/driver-license-renewal-requirements-options-older-drivers/',
        ],
      },
      {
        claim: 'Texas 79 岁及以上驾驶人要现场续证；79–84 岁证件通常为八年，85 岁及以上通常为两年。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/senior-drivers-age-79-or-older'],
      },
      {
        claim:
          'Virginia 75 岁及以上驾驶人必须到 DMV customer service center 现场续证，并完成 vision screening 或提交 vision report；续发驾照通常为五年。',
        sourceUrls: [
          'https://www.dmv.virginia.gov/licenses-ids/mature',
          'https://www.dmv.virginia.gov/safety/programs/mature-driver',
        ],
      },
      {
        claim:
          'Georgia 64 岁及以上驾驶人每个 renewal period 都要完成 vision screening；可在现场测试，或按线上流程上传由 optometrist / ophthalmologist 完成的视力文件。',
        sourceUrls: ['https://dds.georgia.gov/georgia-licenseid/drivers-64-and-over'],
      },
      {
        claim: 'Washington unsafe-driver report 必须基于本人观察并写具体事实，不接受匿名或二手信息，而且报告在州法下不保密。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers'],
      },
      {
        claim: 'New York 对非医疗人员提交的驾驶复查报告逐案处理，不会只因年龄采取行动，并说明不会在 FOIL 请求中披露报告人身份。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/dmv-medical-review-program'],
      },
      {
        claim:
          'Pennsylvania 要求有诊断或治疗权限的 health care personnel 报告 15 岁以上、被诊断为可能影响安全驾驶状况的人；预计持续少于 90 天的状况有例外，是否限制、recall 或 suspend 由 PennDOT 决定。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/resources/medical-reporting/information-for-health-care-personnel',
          'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/medical-reporting-faqs',
        ],
      },
      {
        claim:
          'New Jersey 法律要求医生报告 recurrent seizure、recurrent periods of unconsciousness，或因病况造成的 motor coordination impairment；普通关切报告不能匿名。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/reportconcern.htm'],
      },
      {
        claim:
          'Virginia 对 relative 或正在治疗该驾驶人的 medical professional 所提交报告，禁止 DMV 公开报告来源或理由；其他来源信息在被请求时可能披露。',
        sourceUrls: ['https://www.dmv.virginia.gov/licenses-ids/license/medical/impaired-hp'],
      },
      {
        claim: 'New Jersey medical review 表格通常要在 45 天内交回，逾期会导致 suspension；审查结果可能包括限制、复考、监测或暂停。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm'],
      },
      {
        claim: 'Medical review 并不自动等于吊销：Washington 和 New Jersey 都列出补充医疗或视力文件、重新考试、设备或限制等多种可能结果。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers',
          'https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm',
        ],
      },
    ],
    editorNotes: [
      '本页必须避免“老人不能开车”的偏见表达。官方来源的共同重点是 medical / vision / cognitive / driving behavior risk，而不是年龄本身。',
      'medical review 是高风险主题，不做医学诊断、法律建议或家庭决策建议；只解释 DMV / motor vehicle agency 的官方程序。',
      '每次更新要分清 renewal age threshold、vision standard、unsafe driver report、doctor mandatory report、medical review、driver re-evaluation、road skills test 和 ID card surrender。',
      '家属报告类内容要提醒读者写具体观察、保存信件、尊重长辈，并确认保密性；不同州对匿名和报告副本的规则非常不同。',
      'Mass.gov、Texas DPS 和部分 PDF 可能在自动链接检查中返回 403、超时或安全拦截；只要不是硬死链，保留为官方来源并在审计中标 watch。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 driver license renewal、medical review、driver safety、forms、office appointment 和 license status 官方入口。',
    },
    sources: [
      {
        label: 'NHTSA Older Drivers',
        url: 'https://www.nhtsa.gov/road-safety/older-drivers',
      },
      {
        label: 'NHTSA Driving Safely While Aging Gracefully',
        url: 'https://www.nhtsa.gov/older-drivers/driving-safely-while-aging-gracefully',
      },
      {
        label: 'NHTSA How to Understand and Influence Older Drivers',
        url: 'https://www.nhtsa.gov/older-drivers/how-understand-and-influence-older-drivers',
      },
      {
        label: 'California DMV Senior Drivers',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/senior-drivers/',
      },
      {
        label: 'California DMV Maintaining Driving Independence and Safety',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/maintaining-driving-independence-and-safety/',
      },
      {
        label: 'California DMV Deteriorated Driving Skill',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/deteriorated-driving-skill/',
      },
      {
        label: 'California Driver Handbook: Seniors and Driving',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/seniors-and-driving/',
      },
      {
        label: 'California Driver Handbook: Driver Safety',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/driver-safety/',
      },
      {
        label: 'California DMV Medical Conditions and Driving',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/medical-conditions-and-driving/',
      },
      {
        label: 'California DMV Dementia and Driving',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/medical-conditions-and-driving/dementia/',
      },
      {
        label: 'California DMV Driver Medical Evaluation DS 326',
        url: 'https://www.dmv.ca.gov/portal/uploads/2020/06/DS326.pdf',
      },
      {
        label: 'NY DMV Older Driver Driving',
        url: 'https://dmv.ny.gov/driver-license/older-driver/driving',
      },
      {
        label: 'NY DMV Renew a Driver License',
        url: 'https://dmv.ny.gov/driver-license/renew-a-driver-license',
      },
      {
        label: 'NY DMV Vision Requirements and Restrictions',
        url: 'https://dmv.ny.gov/driver-license/vision-requirements-and-restrictions',
      },
      {
        label: 'NY DMV Online Vision Registry',
        url: 'https://dmv.ny.gov/driver-license/online-vision-registry',
      },
      {
        label: 'NY DMV Medical Review Program',
        url: 'https://dmv.ny.gov/driver-license/dmv-medical-review-program',
      },
      {
        label: 'NY DMV Report a Medical Condition',
        url: 'https://dmv.ny.gov/report-a-medical-condition',
      },
      {
        label: 'NY DMV Driver Re-Evaluation Program',
        url: 'https://dmv.ny.gov/driver-re-evaluation-program',
      },
      {
        label: 'NY DMV Request for Driver Review DS-7',
        url: 'https://dmv.ny.gov/forms/ds7.pdf',
      },
      {
        label: 'Texas DPS Senior Drivers Age 79 or Older',
        url: 'https://www.dps.texas.gov/section/driver-license/senior-drivers-age-79-or-older',
      },
      {
        label: 'Texas DPS Medical Evaluation Process for Driver Licensing',
        url: 'https://www.dps.texas.gov/section/driver-license/texas-medical-evaluation-process-driver-licensing',
      },
      {
        label: 'Texas DPS Medical Advisory Board FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-11-medical-advisory-board-mab',
      },
      {
        label: 'Texas DPS Examination Request DL-76',
        url: 'https://www.dps.texas.gov/internetforms/Forms/DL-76.pdf',
      },
      {
        label: 'FLHSMV Driver License Renewal Requirements for Older Drivers',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/driver-license-renewal-requirements-options-older-drivers/',
      },
      {
        label: 'FLHSMV Vision Standards',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/vision-standards/',
      },
      {
        label: 'FLHSMV Forms for Older Drivers',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/mature-driver/forms-for-older-drivers/',
      },
      {
        label: 'FLHSMV Medical Review',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/',
      },
      {
        label: 'FLHSMV Medical Review Process',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/the-medical-review-process/',
      },
      {
        label: 'FLHSMV Medical Review Frequently Asked Questions',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/medical-review/medical-review-frequently-asked-questions/',
      },
      {
        label: 'FLHSMV Mature Driver Vision Test HSMV 72119',
        url: 'https://www.flhsmv.gov/pdf/forms/72119.pdf',
      },
      {
        label: 'Washington DOL Report Unsafe Drivers',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-safety/report-unsafe-drivers',
      },
      {
        label: 'Washington DOL Driver Evaluation Request Form',
        url: 'https://dol.wa.gov/forms/view/500008/download?inline=',
      },
      {
        label: 'Washington State Driver Guide Text Only',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides/washington-state-driver-guide-text-only',
      },
      {
        label: 'NJ MVC Reporting a Concern',
        url: 'https://www.nj.gov/mvc/drivertopics/reportconcern.htm',
      },
      {
        label: 'NJ MVC Why Medical Review Is Needed',
        url: 'https://www.nj.gov/mvc/drivertopics/medwhy.htm',
      },
      {
        label: 'NJ MVC Medical Review Process',
        url: 'https://www.nj.gov/mvc/drivertopics/medreviewprocess.htm',
      },
      {
        label: 'NJ MVC Law Enforcement and Physicians Reporting',
        url: 'https://www.nj.gov/mvc/drivertopics/lawmedreport.htm',
      },
      {
        label: 'PennDOT Mature Drivers',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/mature-drivers',
      },
      {
        label: 'PennDOT Medical Reporting',
        url: 'https://www.pa.gov/agencies/dmv/resources/medical-reporting',
      },
      {
        label: 'PennDOT Information for Health Care Personnel',
        url: 'https://www.pa.gov/agencies/dmv/resources/medical-reporting/information-for-health-care-personnel',
      },
      {
        label: 'PennDOT Medical Reporting FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/driver-licensing-faqs/medical-reporting-faqs',
      },
      {
        label: 'PennDOT PA Drivers and Families',
        url: 'https://www.pa.gov/agencies/dmv/resources/medical-reporting/pa-drivers-and-families',
      },
      {
        label: 'PennDOT Medically Impaired Driver Law',
        url: 'https://www.pa.gov/agencies/dmv/resources/laws-and-regulations/medically-impaired-driver-law',
      },
      {
        label: 'PennDOT Older Driver Safety',
        url: 'https://www.pa.gov/agencies/penndot/traveling-in-pa/safety/traffic-safety-driver-topics/older-driver',
      },
      {
        label: 'Virginia DMV Mature Drivers',
        url: 'https://www.dmv.virginia.gov/licenses-ids/mature',
      },
      {
        label: 'Virginia DMV Mature Driver Safety',
        url: 'https://www.dmv.virginia.gov/safety/programs/mature-driver',
      },
      {
        label: 'Virginia DMV Report an Impaired Driver',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/medical/impaired-hp',
      },
      {
        label: 'Virginia DMV Medical Review of Drivers',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/medical/review',
      },
      {
        label: 'Virginia DMV Medical Review Special Restrictions',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/medical/spec-restrict',
      },
      {
        label: 'Virginia DMV Vision Requirements',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/medical/vision',
      },
      {
        label: 'Virginia DMV Cognitive Impairment Policy',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/medical/cognitive',
      },
      {
        label: 'Georgia DDS Drivers 64 and Over',
        url: 'https://dds.georgia.gov/georgia-licenseid/drivers-64-and-over',
      },
      {
        label: 'Georgia DDS Medical Review Process',
        url: 'https://dds.georgia.gov/medical-review-process',
      },
      {
        label: 'Georgia DDS Request for Driver Review DDS-270',
        url: 'https://dds.georgia.gov/document/document/request-driver-review-dds-270/download',
      },
      {
        label: 'Georgia DDS Test and Exams Information',
        url: 'https://dds.georgia.gov/testing-and-training/test-and-exams-information',
      },
      {
        label: 'Mass.gov RMV Information for Older Drivers',
        url: 'https://www.mass.gov/info-details/massachusetts-rmv-information-for-older-drivers',
      },
      {
        label: 'Mass.gov Report a Medically Impaired Driver',
        url: 'https://www.mass.gov/how-to/report-a-medically-impaired-driver',
      },
      {
        label: 'Mass.gov Medical Standards for Class D and Class M Licenses',
        url: 'https://www.mass.gov/info-details/medical-standards-for-passenger-class-d-and-motorcycle-class-m-drivers-licenses',
      },
      {
        label: 'Mass.gov Your Health and Driving Safely',
        url: 'https://www.mass.gov/doc/your-health-and-driving-safely-0/download',
      },
      {
        label: 'Mass.gov RMV Forms and Applications',
        url: 'https://www.mass.gov/lists/rmv-forms-and-applications',
      },
      {
        label: 'Illinois SOS Road Safety and Fairness Act 2026',
        url: 'https://www.ilsos.gov/news/2026/june-17-2026-giannoulias-ends-mandatory-road-tests-for-drivers-ages-79-86.html',
      },
      {
        label: 'Illinois SOS Understanding the Road Safety and Fairness Act',
        url: 'https://www.ilsos.gov/departments/drivers/traffic-safety/understanding-illinois-road-safety-and-fairness-act.html',
      },
      {
        label: 'California DMV Driver License Renewal for 70+',
        url: 'https://www.dmv.ca.gov/portal/senior-drivers/',
      },
      {
        label: 'California DMV 2024 Knowledge Test Renewal Update',
        url: 'https://www.dmv.ca.gov/portal/news-and-media/news-releases/written-knowledge-test-requirement-eliminated-for-most-california-drivers-license-renewals/',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'massachusetts',
    ],
  },
  {
    slug: 'dmv-test-language-translation-interpreter',
    title: 'DMV 中文笔试、文件翻译和口译怎么判断',
    eyebrow: '语言 / 翻译',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '美国 DMV 的语言规则不能只问“有没有中文”。网页翻译、中文手册、knowledge test 语言、road test 口译、CDL / Hazmat 限制、外文文件 certified translation，常常是几套完全不同的规则。',
    whoNeedsIt: [
      '想确认驾照笔试、permit test 或 knowledge test 是否有中文、普通话、简体或繁体选项的人。',
      '需要带中文出生证明、结婚证、法院文件、外国驾照或其他非英文文件去 DMV 的人。',
      '英语不流利，想知道路考、口试、口译、audio test 或 interpreter 能不能使用的人。',
    ],
    keyFacts: [
      '有中文网页或中文手册，不代表笔试一定有中文；有中文笔试，也不代表路考可用中文或可带私人翻译。',
      '考试语言高度州别化。纽约、新泽西、华盛顿、佐治亚、宾州、密歇根等官方页面列出过中文或多语言考试/资料线索，德州则把 driver license knowledge test 限在 English / Spanish 方向。',
      'Florida 已从 2026 年 2 月 6 日起把所有 driver license knowledge 和 skills exams 改为仅使用英语，并停止考试翻译服务；旧 General Information 页面上的多语言列表属于尚未同步的历史内容。',
      'CDL、Hazmat、commercial exam 或部分特殊考试经常有更严格语言限制；不要把普通 Class D / Class E 笔试规则套到商业驾照。',
      '文件翻译和考试语言不是一回事。非英文身份、姓名、移民或外国驾照文件可能需要 certified translation、English translation、IDP 或州认可翻译格式。',
      'Texas 从 2026 年 6 月 1 日起把 CDL/CLP knowledge exams 改为 English-only，且禁止 interpreter；这项变化不能反向套到普通非商业驾照笔试。',
    ],
    factChecks: [
      {
        claim: 'Florida 从 2026 年 2 月 6 日起将 driver license knowledge 和 skills exams 改为 English-only，并停止考试翻译服务。',
        sourceUrls: [
          'https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/',
        ],
      },
      {
        claim: 'Texas 普通 driver license knowledge test 的官方语言说明集中在 English / Spanish，并对 CDL interpreter 另设限制。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/testing-other-languages'],
      },
      {
        claim: 'Washington 的 knowledge test 官方页面列出 Traditional Chinese 和 Simplified Chinese，但仍要向具体 testing location 确认可用语言。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
        ],
      },
      {
        claim: 'New Jersey 把 knowledge-test language 和 interpreter 安排放在考试规则中处理，不能仅凭中文手册判断考场语言。',
        sourceUrls: ['https://www.nj.gov/mvc/license/knowledgetest.htm'],
      },
      {
        claim: 'North Carolina 将多语言笔试、oral test 和 interpreter services 分开说明，口译需求应在到场前确认。',
        sourceUrls: [
          'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
          'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx',
        ],
      },
      {
        claim: 'Texas 从 2026 年 6 月 1 日起仅以英语提供 CDL 和 CLP knowledge examinations，并禁止考试期间使用 interpreter。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/testing-other-languages'],
      },
      {
        claim: 'New Jersey 当前普通 knowledge test 语言列表包括 Chinese (Mandarin)，缺少母语版本时可请求 MVC 通过州合同安排 interpreter。',
        sourceUrls: ['https://www.nj.gov/mvc/license/knowledgetest.htm'],
      },
      {
        claim: 'New Jersey oral knowledge test 只提供 English 和 Spanish；CDL knowledge test 与 Hazmat 又有更严格的语言限制。',
        sourceUrls: ['https://www.nj.gov/mvc/license/knowledgetest.htm'],
      },
      {
        claim: 'North Carolina 普通知识考试提供不同语言并可按请求提供 oral test，语言 interpreter 则要通过独立服务入口申请。',
        sourceUrls: [
          'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
          'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx',
        ],
      },
      {
        claim: 'California 的多语言 online learning 或 driver materials 只能证明学习资源可用，最终考试语言仍应按对应 test 页面和个人业务确认。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/'],
      },
    ],
    checklist: [
      '先分清你问的是哪一类：网页翻译、driver manual、permit / knowledge test、road test、oral / audio test、文件翻译、CDL / Hazmat。',
      '打开州 DMV 的 knowledge test、driver manual、language assistance、interpreter services 或 document requirements 页面。',
      '如果页面列出中文，确认是 Chinese、Mandarin、Traditional Chinese、Simplified Chinese，还是仅有中文学习资料。',
      '如果需要口译或 oral test，确认是否要提前预约、由 DMV 安排、是否允许私人 interpreter，以及是否适用于 road test。',
      '如果文件不是英文，按州要求准备 certified translation、English translation、IDP 或官方认可翻译，不要用普通自译件替代。',
      '记录确认日期和考点答复；由第三方学校承办考试时，再向具体 testing location 确认它实际提供的语言。',
    ],
    steps: [
      '第一步：先定位业务。普通非商业知识考试、路考、CDL / Hazmat、外国驾照转入、REAL ID 文件核验，各自语言规则可能不同。',
      '第二步：查本州官方 language / test 页面。不要只看中文社群经验，因为同一州也可能按考点、考试类别或第三方测试机构变化。',
      '第三步：把“学习资料”和“考试语言”分开。California、Washington、Michigan 等有多语言学习或线上学习线索，但最终考试可用语言仍要看对应 test 页面。',
      '第四步：把“口译”和“翻译文件”分开。New Jersey 可在缺少母语考试版本时请求 MVC 安排 interpreter；North Carolina 有 interpreter services 页面；外文文件则另看 certified translation 要求。',
      '第五步：预约或考试前重新确认。语言、口译、第三方考点、线上考试和 CDL 限制可能更新；办理 Florida 或 Texas 业务时尤其要以当前官方入口为准。',
      '第六步：保存官方页面、预约类别和 interpreter 请求确认；若考点无法提供所选语言，先改考点或日期，不要到场后临时找朋友代答。',
    ],
    faqs: [
      {
        question: '美国驾照笔试一定有中文吗？',
        answer:
          '不是。部分州明确列出 Chinese、Mandarin、Traditional Chinese 或 Simplified Chinese 选项，部分州没有中文，部分州只提供 English / Spanish 或按考点变化。必须查本州 knowledge test 页面。',
      },
      {
        question: '有中文 driver manual，是不是考试也能用中文？',
        answer:
          '不一定。中文手册或网页翻译只是学习材料或辅助阅读，不能证明考试系统一定提供中文。考试语言要看 permit test / knowledge test 官方页面。',
      },
      {
        question: '路考可以带朋友翻译吗？',
        answer:
          '不要默认可以。很多州即使有多语言笔试，也不一定允许 road test 口译；有些口译必须由 DMV 安排，或只适用于特定服务。预约前查 interpreter / language assistance 页面。',
      },
      {
        question: '中文文件翻译有什么统一格式吗？',
        answer:
          '没有全美统一格式。州 DMV 可能要求 certified translation、English translation、IDP、官方认可译者或特定文件内容。出生、婚姻、法院、外国驾照和移民文件要按本州材料页处理。',
      },
    ],
    editorNotes: [
      '这页要避免一句“有中文考试”。更准确的写法是按州、考试类型、考点和时间确认。',
      '语言规则最容易混淆四层：网页/手册语言、knowledge test 语言、road test / oral / interpreter 规则、外文文件翻译规则。',
      'Florida 和 Texas 是风险提醒样本：Florida 有 English-only 政策更新线索，Texas DPS Testing in Other Languages 对 English / Spanish 和 CDL interpreter 限制更明确。',
      '商业驾照和 Hazmat 不要套普通驾照规则。NJ MVC 和 Texas DPS 都提供过商业/特殊考试语言限制线索。',
      '这页和 `/directories/language-access/` 互补：专题解释判断逻辑，目录按州给入口和抽取线索。',
    ],
    relatedDirectory: {
      label: '50 州考试语言、翻译和口译入口表',
      href: '/directories/language-access/',
      description: '按州查看 DMV 笔试语言、中文/多语言考试、文件翻译、口译请求、driver manual 和 English-only / CDL 限制。',
    },
    sources: [
      {
        label: 'California DMV Online Learning and Tests',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/',
      },
      {
        label: 'NY DMV Permit Test',
        url: 'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test',
      },
      {
        label: 'NY DMV Language Assistance',
        url: 'https://dmv.ny.gov/more-info/language-assistance',
      },
      {
        label: 'Texas DPS Testing in Other Languages',
        url: 'https://www.dps.texas.gov/section/driver-license/testing-other-languages',
      },
      {
        label: 'FLHSMV English-only Exams Announcement',
        url: 'https://www.flhsmv.gov/2026/01/30/flhsmv-announces-driver-license-exams-to-be-administered-in-english-only/',
      },
      {
        label: 'Washington DOL Do I Need to Take a Test',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
      },
      {
        label: 'Washington DOL Driver Guides',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides',
      },
      {
        label: 'NJ MVC Knowledge Test',
        url: 'https://www.nj.gov/mvc/license/knowledgetest.htm',
      },
      {
        label: 'PennDOT Driver Manual - Testing',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/testing',
      },
      {
        label: 'Georgia DDS List of Languages',
        url: 'https://dds.georgia.gov/list-languages',
      },
      {
        label: 'NCDMV Driver License Tests',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-license-tests.aspx',
      },
      {
        label: 'NCDMV Interpreter Services',
        url: 'https://www.ncdot.gov/dmv/license-id/driver-licenses/Pages/interpreter-services.aspx',
      },
      {
        label: 'Michigan SOS New Drivers 18 and Older',
        url: 'https://www.michigan.gov/sos/license-id/new-drivers-18-older',
      },
      {
        label: 'Michigan SOS What Every Driver Must Know',
        url: 'https://www.michigan.gov/sos/resources/forms/what-every-driver-must-know',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'florida', 'washington', 'new-jersey', 'pennsylvania', 'georgia', 'north-carolina', 'michigan'],
  },
  {
    slug: 'foreign-license-idp-transfer',
    title: '中国/外国驾照、IDP 和美国州驾照怎么衔接',
    eyebrow: '外国驾照',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '持中国或其他外国驾照来美国，先分清自己是短期访客、学生/临时居民，还是已经成为某州居民。IDP 通常只是翻译辅助文件，换成本州驾照仍要看州 DMV 的测试、翻译、身份和互惠规则。',
    whoNeedsIt: [
      '持中国驾照、台湾驾照、韩国驾照、欧洲驾照或其他外国驾照来美国的人。',
      '刚搬到某州，想知道外国驾照能不能直接换成本州驾照的人。',
      '准备租车、路考、买保险，或被要求提供 International Driving Permit / certified translation 的人。',
    ],
    keyFacts: [
      'USA.gov 说明并非每个州都要求 IDP；外国访客应按计划驾驶的州逐一核对 DMV 要求，而且美国不向外国访客签发 IDP。',
      'IDP 通常是把外国驾照翻译成多语言的辅助文件，不等于单独有效的驾驶执照；宾州和密歇根官方页面都明确提醒 IDP 不能替代原驾照。',
      '成为州居民后，很多州要求在规定期限内申请本州 driver license；例如加州居民通常 10 天内要取得 California DL，纽约居民 30 天内要取得 NY license。',
      '外国驾照能否免笔试或路考取决于州和互惠国家/地区。新泽西、宾州、华盛顿、德州等州列出过部分 reciprocity 或 waiver 路径，但适用对象、年龄、非商业驾照和文件要求不同。',
      '非英文外国驾照常会触发 IDP、英文翻译、certified translation 或领馆/官方证明要求；纽约、新泽西、华盛顿、密歇根的官方页面都有相关条件。',
      '短期访客“能否凭外国驾照驾驶”和新居民“如何申请本州驾照”是两个问题。成为州居民后，原外国驾照即使未到期，也可能不再适用访客驾驶规则。',
      '办到美国州驾照后，原外国证件是否交回、作废或允许保留也按州和身份变化。不要在提交前假设一定能保留原证。',
    ],
    checklist: [
      '先确认身份：短期访客、学生/临时访客、永久居民或已经建立州居民身份。',
      '带原外国驾照；如果驾照不是英文，再核对本州是否要求 IDP、英文翻译或 certified translation。',
      '准备护照、I-94/合法身份文件、SSN 或不可取得 SSN 文件、当前州居住地址证明和姓名变更文件。',
      '如果要换本州驾照，查本州是否要求 knowledge test、road test、vision test、5-hour course、driver record 或领馆证明。',
      '如果来自互惠国家/地区，核对该州列出的国家/地区、年龄、非商业驾照、证件有效期、翻译和合法居留期限要求。',
      '路考当天确认是否必须交出外国驾照或带 accompanying driver；纽约和加州页面都对外国驾照场景写了额外要求。',
    ],
    steps: [
      '第一步：判断你是不是该州居民。只是短期访问通常先看 visitor / non-resident 规则；已经搬入并建立居民身份时，要看本州 new resident 或 first license 页面。',
      '第二步：判断你的原驾照来源。美国其他州/加拿大驾照、外国驾照、学习许可、CDL、过期驾照和互惠国家驾照通常走不同路径。',
      '第三步：判断 IDP 的角色。需要时，把 IDP 当翻译和辅助说明；不要把它当成可以单独开车、单独换证或替代身份文件的证件。',
      '第四步：把材料分成三组：驾驶经历证明、身份/合法居留证明、州居住地址证明。密歇根 SOS-428 特别说明 foreign driver license 只能证明 driving experience，不能证明 legal presence 或 identity。',
      '第五步：回到本州 DMV 官方页面确认测试和预约。外国驾照申请人常见结果是要笔试、路考或视力测试；互惠路径则可能免 knowledge / road test，但仍要文件和视力核验。',
      '第六步：申请完成前确认原外国驾照怎么处理、临时证何时生效、永久卡寄到哪里，以及保险公司是否需要新州驾照号码。',
    ],
    faqs: [
      {
        question: '中国驾照加 IDP 在美国一定能开车吗？',
        answer:
          '不能这样绝对说。USA.gov 明确提醒不是每个州都要求或按同一方式处理 IDP，必须联系或查看计划驾驶州的 DMV 要求。IDP 通常还要和原外国驾照一起使用。',
      },
      {
        question: 'IDP 可以拿去 DMV 直接换美国驾照吗？',
        answer:
          '通常不可以。IDP 更像翻译辅助文件，不是原始驾驶资格本身。马萨诸塞页面也提醒不能只把 IDP 转成 Massachusetts permit 或 license；要看原外国驾照、身份文件和该州 transfer / first license 规则。',
      },
      {
        question: '外国驾照换美国州驾照一定要路考吗？',
        answer:
          '不一定。加州页面显示外国驾照申请 California DL 仍要 driving test；纽约对非美国/加拿大驾照要求原始申请路径并在通过路考后交出外国驾照。另一方面，宾州、新泽西、华盛顿、德州等州对部分国家/地区有互惠或测试豁免路径。',
      },
      {
        question: '我的外国驾照不是英文，要翻译成什么格式？',
        answer:
          '按州看。纽约要求 road test 时带 IDP 或 certified translation，并列明翻译应包含姓名、生日、外国驾照到期日和准驾车型；密歇根要求外国文件英文翻译，外国驾照需 IDP 或 English translation。',
      },
    ],
    factChecks: [
      {
        claim: 'USA.gov 提醒外国访客逐州查询是否需要 International Driving Permit，因为美国各州对外国驾照和 IDP 的要求不同。',
        sourceUrls: ['https://www.usa.gov/non-citizen-driving'],
      },
      {
        claim: 'USA.gov 说明美国政府不向外国访客签发 IDP，访客应在出发前向本国机动车机构办理。',
        sourceUrls: ['https://www.usa.gov/non-citizen-driving'],
      },
      {
        claim: 'Pennsylvania 将 IDP 说明为外国驾照的多语言翻译辅助，驾驶人仍要持有效本国驾照并遵守原证限制。',
        sourceUrls: ['https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license'],
      },
      {
        claim: 'California 官方说明成为州居民后通常要在 10 天内申请 California driver license，外国驾照申请人仍按州流程测试。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/',
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/',
        ],
      },
      {
        claim: 'New York 允许非居民使用有效外国驾照驾驶，但成为 New York resident 后要在 30 天内取得州驾照。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/driving-in-new-york-state'],
      },
      {
        claim: 'New York 对美国或加拿大以外的外国驾照持有人采用 original-license 路径，并说明通过路考后交出外国驾照。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/drivers-from-other-countries'],
      },
      {
        claim: 'Washington 是否需要 knowledge 或 drive test 要按原驾照签发地和官方 waiver / reciprocity 页面判断。',
        sourceUrls: ['https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test'],
      },
      {
        claim: 'Michigan SOS-428 将外国驾照视为 driving experience 证明，而不是 legal presence 或 identity 证明。',
        sourceUrls: ['https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa'],
      },
      {
        claim: 'Michigan 对外国驾照要求 IDP 或 English translation，并将其与身份、合法居留和州居住证明分开审核。',
        sourceUrls: ['https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa'],
      },
      {
        claim: 'Massachusetts 明确区分使用外国驾照临时驾驶和把特定外国驾照转换为 Massachusetts license 的不同流程。',
        sourceUrls: [
          'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license',
          'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country',
        ],
      },
    ],
    editorNotes: [
      '这一页故意不写“全美国都可以”或“全美国都不可以”，因为 USA.gov 和州 DMV 都把 IDP、访客驾驶和居民换证交给州规则执行。',
      '外国驾照问题要拆成三层：能否作为访客开车、成为居民后何时必须换证、换证时能否免测试。把三层混在一起最容易误导用户。',
      'IDP / International Driving Permit 在纽约还可能指 Impaired Driver Program；写作和站内搜索时必须用上下文区分“国际驾驶许可”和纽约处罚课程。',
      '互惠国家/地区不能跨州套用。新泽西、宾州、德州、华盛顿列出的国家/地区和要求并不完全相同。',
      '外国驾照不等于身份文件。密歇根 SOS-428 的表述很适合作为风险提醒：foreign driver license 可作为 driving experience proof，但不能证明 legal presence 或 identity。',
    ],
    relatedDirectory: {
      label: '50 州外国/外州驾照转入入口表',
      href: '/directories/foreign-license/',
      description: '按州查看 foreign license、out-of-state transfer、IDP、互惠免考、翻译和交旧证官方入口。',
    },
    sources: [
      {
        label: 'USA.gov Driving in the U.S. if you are not a citizen',
        url: 'https://www.usa.gov/non-citizen-driving',
      },
      {
        label: 'California DMV Driver Licenses',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/',
      },
      {
        label: 'California DMV Fast Facts 5',
        url: 'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/',
      },
      {
        label: 'NY DMV Driving in New York State',
        url: 'https://dmv.ny.gov/driver-license/driving-in-new-york-state',
      },
      {
        label: 'NY DMV Drivers from Other Countries',
        url: 'https://dmv.ny.gov/driver-license/drivers-from-other-countries',
      },
      {
        label: 'NJ MVC Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
      },
      {
        label: 'PennDOT Driving in Pennsylvania with a Foreign Driver License',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license',
      },
      {
        label: 'Washington DOL Do I Need to Take a Test',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/do-i-need-take-test',
      },
      {
        label: 'Michigan SOS Driver License or ID Requirements PDF',
        url: 'https://www.michigan.gov/sos/-/media/Project/Websites/sos/License-and-ID/Applying_for_lic_or_ID_SOS_428.pdf?hash=0B64297F20E284527C47A01B0D4C5B0B&rev=159d4055424640e092b8f748acc50bfa',
      },
      {
        label: 'Mass.gov Driving on a Foreign Driver License',
        url: 'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license',
      },
      {
        label: 'Mass.gov Transfer a Foreign Driver License',
        url: 'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'new-jersey', 'pennsylvania', 'washington', 'michigan', 'massachusetts'],
  },
  {
    slug: 'student-temporary-resident-license-registration',
    title: '留学生、访问学者和短期工作，算不算 resident，要不要换驾照或注册车',
    eyebrow: '学生 / 非居民',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      'F-1、J-1、H-1B、访问学者、外州学生、短期工作和陪读家属最容易卡在一个问题：我到底是 visitor、non-resident、temporary visitor，还是已经成为州 resident？这会影响能不能继续用外国/外州驾照、是否要办本州驾照，以及外州车辆是否要 registration。',
    whoNeedsIt: [
      '持 F-1、J-1、H-1B、L-1、H-4、J-2、F-2 等身份在美国读书、访问或短期工作的人。',
      '拿外国驾照、IDP 或外州驾照在美国开车，不确定什么时候要换本州驾照的人。',
      '外州学生把车开到学校所在州，想知道车牌、保险和 registration 是否要换的人。',
      '刚毕业、开始工作、搬家、买车或把外州车带到新州，身份从“临时停留”变成“居住生活”的人。',
    ],
    keyFacts: [
      '“签证身份”和州法里的 resident / domiciliary 不是同一件事。F-1 / J-1 属于移民分类，不会自动回答驾照和车辆登记问题；必须回到所在州对 resident、new resident、student exemption 和 nonresident 的官方定义。',
      '纽约是重要边界例子：外州或外国学生通常不被视为纽约居民，维持住所 90 天只是居民身份的推定证据；有争议时由法官结合州法、居住意图和证据判断，NY DMV 明确说它不裁定一个人是否为居民或必须换证、登记车辆。',
      '加州、佛州、德州、华盛顿、宾州、佐州、新泽西等州把 new resident、temporary visitor、foreign license、out-of-state transfer 和 vehicle registration 分成不同入口；驾照和车辆登记也可能有不同期限。',
      '外国驾照 / IDP 只能先解决“能不能作为访客驾驶”的问题，不能自动证明你不需要本州驾照。成为州 resident 后，通常要看本州 first license、foreign license 或 out-of-state transfer 页面。',
      '临时访客办州驾照时，证件期限可能受 lawful presence 影响。德州 DPS 的 temporary visitor 页面就是典型例子，合格临时访客可能拿到 Limited Term driver license / ID。',
      '车辆 registration 更不能只看签证身份。外州车是否要转入，常取决于车辆实际停放地、使用地、保险、车主居民身份、new resident 规则和州税费规则。',
      '学校国际办公室、雇主或租车公司可以提供方向，但最终办理规则仍以 DMV / DPS / RMV / MVC / DOL / DOR 官方页面为准。',
      '驾照和车辆期限必须分开抄录：California 新居民通常是驾照 10 天、车辆 20 天；Florida 是驾照 30 天、车辆 title/registration 10 天；Texas 是车辆 30 天、驾照 90 天；Washington 两者均为 30 天；New Jersey 通常为 60 天或现有证件先到期时更早。',
      '外国驾照的 visitor 权限也不统一。New York 不要求 IDP 但建议准备；Massachusetts 对非英文外国驾照要求 IDP 或合格英文翻译；Pennsylvania 说明 IDP 建议携带但不是单独驾驶资格。',
    ],
    checklist: [
      '先写清自己的场景：只是短期访问、来上学、交换访问、短期工作、已经毕业工作、搬到新州、买车，还是把外州车带到学校所在州。',
      '确认你当前拿什么驾驶资格：外国驾照、IDP、外州驾照、学习许可、过期驾照、国际互惠国家驾照，还是没有驾照。',
      '确认州法和州机构页面如何定义 resident / non-resident / temporary visitor / new resident，并查看是否有 student exemption；不要只用移民法里的 non-immigrant 来判断。',
      '准备身份和合法停留文件：passport、visa、I-94、I-20、DS-2019、I-797、EAD、green card、SSN 或 SSA ineligibility letter。',
      '准备州居住地址证明；临时访客、学生宿舍、sublease、住亲友家或没有账单时，回到本州 proof of residency 页面确认替代路径。',
      '如果有车，准备 title / registration、insurance、VIN、plate、parking address、campus parking permit、inspection / emissions 文件。',
      '保存学校、雇主、lease、utility、bank、insurance、DMV notice 和 vehicle paperwork；这些文件可能同时影响驾照、地址证明、保险和车辆登记。',
    ],
    steps: [
      '第一步：先判断“人”的州法路径。只是访客或符合学生/非居民例外时，看 visitor / non-resident / foreign license 页面；已经建立 resident 身份时，看 new resident、first license 或 transfer 页面。存在争议时不要把 DMV 清单当成法律裁定。',
      '第二步：再判断“车”的登记路径。外州车辆是否要转入，可能和驾照期限不同；不要因为自己暂时不用换驾照，就自动认为车辆也不用 registration。',
      '第三步：把州页面分成三组读：driver license、non-citizen / temporary visitor documents、vehicle registration。三组页面的材料、期限和承办机构可能不同。',
      '第四步：如果拿外国驾照，先确认是否需要 IDP 或 certified translation；如果拿外州驾照，确认是否能 exchange、是否要 surrender old license、是否要测试。',
      '第五步：如果 status、I-20 / DS-2019、I-94 或 work authorization 快到期，先查 DMV 对 lawful presence 和 card expiration 的规则，再决定是否现在申请。',
      '第六步：如果学校州、居住州、车牌州和保险州不一致，先问保险公司覆盖是否有效，再回到 DMV / DOR / county 页面确认登记和税费规则。',
    ],
    faqs: [
      {
        question: '留学生一定不用换本州驾照吗？',
        answer:
          '不能这样一概而论。纽约 DMV 明确说外州或外国学生通常不算纽约居民，但这只是纽约规则，而且“通常”不是绝对豁免。其他州要看 resident / new resident 和 student exemption 页面；就业、住房、投票、子女入学、车辆或居住意图等事实是否触发居民义务，也只能按该州规则判断。',
      },
      {
        question: '我是 F-1 / J-1，办驾照会不会只能拿短期驾照？',
        answer:
          '很多州会按 lawful presence 期限处理非公民或 temporary visitor 证件。德州页面就把合格 temporary visitor 的 driver license / ID 与 Limited Term 和合法停留期限联系起来。具体期限和材料看本州页面。',
      },
      {
        question: '我有中国驾照和 IDP，可以一直开吗？',
        answer:
          'IDP 通常只是翻译辅助文件，不是单独驾驶资格。短期访客能否驾驶、能开多久、是否需要翻译或 IDP，都要看计划驾驶州；成为州 resident 后通常要看本州驾照申请或换证规则。',
      },
      {
        question: '外州学生把车开到学校所在州，车牌一定要换吗？',
        answer:
          '不一定，但也不能自动说不用。车辆 registration 看车辆实际使用地、停放地、保险、州 new resident 规则、学生/非居民例外和州税费规则。驾照居民身份和车辆登记可能分开判断。',
      },
      {
        question: '学校国际办公室说不用办 DMV，我还能只听学校吗？',
        answer:
          '学校建议很有用，但不能替代官方规则。国际办公室通常熟悉校园和身份文件；驾照、ID、车辆登记、地址证明、SSN / SSA letter 和 lawful presence 材料要由相应州机构按规则受理。居民身份本身若存在法律争议，也不一定由柜台或 DMV 最终裁定；纽约就明确把争议留给法官。',
      },
    ],
    factChecks: [
      {
        claim: 'USA.gov 提醒外国驾照和 International Driving Permit 的接受规则由各州决定，IDP 不能脱离本国有效驾照单独提供驾驶资格。',
        sourceUrls: ['https://www.usa.gov/non-citizen-driving'],
      },
      {
        claim:
          'New York DMV 说明外州或外国学生通常不被视为 New York resident；成为居民并驾驶时要在 30 天内取得 New York 驾照。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/driving-in-new-york-state',
          'https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state',
        ],
      },
      {
        claim:
          'New York 把 resident 定义为有意把州内住所作为固定永久居所的人，维持住所至少 90 天是推定证据；有争议时由法官判断，DMV 不决定是否为居民或必须换证、登记车辆。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/driving-in-new-york-state'],
      },
      {
        claim: 'New York 允许符合条件的 nonresident 使用有效外国驾照驾驶，IDP 不是强制文件，但在驾照非英文时可帮助说明内容。',
        sourceUrls: ['https://dmv.ny.gov/driver-license/driving-in-new-york-state'],
      },
      {
        claim: 'California DMV 说明成为 California resident 后，驾驶人要在 10 天内申请 California driver license。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/',
        ],
      },
      {
        claim: 'California 对带入州内的外州车辆通常要求在成为 resident 或开始在州内工作后的 20 天内办理登记。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/vehicle-registration-requirements/',
        ],
      },
      {
        claim: 'Florida visitor 可持居住国有效驾照驾驶；一旦符合官方 resident 触发条件，通常要在 30 天内取得 Florida 驾照。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/',
          'https://www.flhsmv.gov/new-resident/',
        ],
      },
      {
        claim:
          'Florida 新居民页面把人的驾照和车辆业务分开：驾照通常在建立 residency 后 30 天内办理，车辆要先取得 Florida insurance，并在 10 天内 title 和 register。',
        sourceUrls: ['https://www.flhsmv.gov/new-resident/'],
      },
      {
        claim: 'Texas 新居民通常要在 30 天内先登记车辆，并可在搬入后最多 90 天内使用外州驾照再申请 Texas 驾照。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/new-to-texas',
          'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
        ],
      },
      {
        claim: 'Texas 合格 temporary visitor 会取得标有 Limited Term 的驾照或 ID；证件通常随 lawful presence 到期，duration of status 场景通常为一年。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
        ],
      },
      {
        claim: 'Washington 新居民有 30 天取得 Washington 驾照并登记车辆，而且通常要先取得 Washington 驾照再办理车辆登记。',
        sourceUrls: [
          'https://dol.wa.gov/moving-washington',
          'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
        ],
      },
      {
        claim: 'New Jersey 新居民通常要在搬入后 60 天内或现有驾照和登记先到期前完成驾照与车辆 title / registration 转入。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/movetonj.htm'],
      },
    ],
    editorNotes: [
      '这页的核心是把 immigration status、state residency、driver license eligibility 和 vehicle registration 分开，避免中文用户把“非移民身份”误读成“DMV 非居民”。',
      '纽约的 student language 很适合做正例，但必须同时保留 90 天只是推定证据、争议由法官判断、不能跨州套用这三个边界。',
      '临时访客证件期限要谨慎，只写 lawful presence / Limited Term 关系，不替用户判断具体 I-20、DS-2019、I-94 或 I-797 到期日。',
      '车辆登记与驾照不同步是高风险点，特别是外州学生、跨州通勤、校园停车和保险州别不一致的场景。',
      '这页不是移民法律建议，也不判断 tax resident、in-state tuition、domicile 或保险合同义务。',
    ],
    relatedDirectory: {
      label: '查看 SSN / 身份类别分流表',
      href: '/directories/identity-ssn/',
      description: '按州查 non-citizen、temporary visitor、lawful presence、SSN、SSA letter、I-94、I-20、DS-2019 和相关材料入口。',
    },
    sources: [
      {
        label: 'USA.gov Driving in the U.S. if you are not a citizen',
        url: 'https://www.usa.gov/non-citizen-driving',
      },
      {
        label: 'California DMV New to California',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/',
      },
      {
        label: 'California DMV Fast Facts 5',
        url: 'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/',
      },
      {
        label: 'California DMV Privileges of Nonresidents',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/nonresident-vehicles/privileges-of-nonresidents/',
      },
      {
        label: 'California Driver Handbook Vehicle Registration Requirements',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/vehicle-registration-requirements/',
      },
      {
        label: 'NY DMV Driving in New York State',
        url: 'https://dmv.ny.gov/driver-license/driving-in-new-york-state',
      },
      {
        label: 'NY DMV Moving to or from New York State',
        url: 'https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state',
      },
      {
        label: 'NY DMV Resources for Non-US Citizens',
        url: 'https://dmv.ny.gov/driver-license/resources-for-non-us-citizens',
      },
      {
        label: 'FLHSMV Visiting Florida FAQs',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/visiting-florida-faqs/',
      },
      {
        label: 'FLHSMV New Resident',
        url: 'https://www.flhsmv.gov/new-resident/',
      },
      {
        label: 'FLHSMV What to Bring - Non-Immigrant',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/what-to-bring/non-immigrant/',
      },
      {
        label: 'Texas DMV New to Texas',
        url: 'https://www.txdmv.gov/motorists/new-to-texas',
      },
      {
        label: 'Texas DPS Temporary Visitors',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors',
      },
      {
        label: 'Texas DPS Moving to Texas Guide',
        url: 'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
      },
      {
        label: 'Texas DMV Register Your Vehicle',
        url: 'https://www.txdmv.gov/motorists/register-your-vehicle',
      },
      {
        label: 'Washington DOL Moving to Washington',
        url: 'https://dol.wa.gov/moving-washington',
      },
      {
        label: 'Washington DOL Get a Driver License',
        url: 'https://dol.wa.gov/moving-washington/get-driver-license',
      },
      {
        label: 'Washington DOL Get Vehicle Registration and Plates',
        url: 'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
      },
      {
        label: 'Mass.gov Driving in Massachusetts on a Foreign Driver License',
        url: 'https://www.mass.gov/info-details/driving-in-massachusetts-on-a-foreign-drivers-license',
      },
      {
        label: 'Mass.gov Transfer Your Driver License from a Foreign Country',
        url: 'https://www.mass.gov/how-to/transfer-your-drivers-license-from-a-foreign-country',
      },
      {
        label: 'PennDOT Driving in Pennsylvania with a Foreign Driver License',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/driving-in-pennsylvania-with-a-foreign-driver-s-license',
      },
      {
        label: 'PennDOT Moving to Pennsylvania',
        url: 'https://www.pa.gov/agencies/dmv/resources/relocation/moving-to-pennsylvania',
      },
      {
        label: 'PennDOT Transfer Vehicle Registration from Another State',
        url: 'https://www.pa.gov/services/dmv/transfer-vehicle-registration-from-another-state',
      },
      {
        label: 'Georgia DDS Drivers From Other Nations',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/drivers-other-nations',
      },
      {
        label: 'Georgia DDS Information for Non-US Citizens',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/information-non-us-citizens',
      },
      {
        label: 'Georgia DOR When and Where to Register Your Vehicle',
        url: 'https://dor.georgia.gov/when-where-register-your-vehicle',
      },
      {
        label: 'NJ MVC Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
      },
      {
        label: 'NJ MVC First Time Driver License FAQ',
        url: 'https://www.nj.gov/mvc/pdf/license/FAQ_firsttime.pdf',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'texas',
      'washington',
      'massachusetts',
      'pennsylvania',
      'georgia',
      'new-jersey',
    ],
  },
  {
    slug: 'moving-to-new-state',
    title: '搬到新州后先办哪件事',
    eyebrow: '搬州',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '搬州要同时处理“人”和“车”：新州驾照/ID、地址证明、保险、title、registration、inspection、车牌，以及旧州登记和保险收尾。正确顺序取决于新州，不是永远先换驾照。',
    whoNeedsIt: [
      '刚搬到美国另一个州的人。',
      '从外州带车搬入的人。',
      '已有外州驾照，需要换成本州驾照的人。',
    ],
    keyFacts: [
      '各州截止时间和起算点不同。New York 和 Georgia 常见驾照 30 天，New Jersey 常见 60 天或原证先到期者为准，Texas 常见 90 天；这些只适用于对应州。',
      '驾照与车辆的期限可能不同。Texas 新居民通常 30 天内登记车辆、90 天内换驾照；Florida 页面则把车辆 title/registration 与驾照分成不同时间窗口。',
      '办理顺序也不同。Washington 明确要求先取得 Washington driver license，再登记车辆；Texas 新居民申请驾照时通常要先出示本人车辆的 Texas registration 和保险证明。',
      '外州驾照是否能 exchange，取决于证件是否有效/过期多久、年龄、州或国家来源、CDL/permit 类型、限制状态和个人身份文件。',
      '带车搬入通常先换成新州适用的保险，再做 VIN、inspection / emissions、title / registration 和 plate。不能先取消旧州保险再想车牌怎么处理。',
      '有 lien 或 lease 时，title 可能在银行或 leasing company 手里。Florida、New Jersey 和 Washington 都提供对应处理提示，但所需授权和寄送方式不同。',
      '旧州收尾不能省。New York 明确要求在取消 NY liability insurance 前先 surrender NY plates / registration；其他州可能要求退牌、通知搬出或提交 out-of-state registration。',
      '“resident”不只看搬家日期，也可能看就业、学校、居住意图、投票、车辆或住房事实。学生、军人、跨州通勤和短期工作者要先看州的 resident / exemption 说明。',
    ],
    checklist: [
      '记录真正建立新州 resident 身份的日期，并保存 lease、employment、school、utility 或其他起算依据。',
      '打开新州官方 new resident 页面，同时开 driver license 和 vehicle title/registration 两个入口。',
      '分别写下驾照、车辆登记、inspection/emissions 和旧州退牌的截止时间，不把一个日期套给全部业务。',
      '确认外州驾照状态：valid、expired、permit、CDL、restricted、suspended，或外国驾照；查是否可免 knowledge / road test。',
      '准备人的材料：identity/lawful status、SSN 状态、姓名链、当前外州驾照和新州 residency proofs。',
      '准备车的材料：title、registration、VIN、odometer、lienholder/lease 文件、new-state insurance、inspection/emissions 和付款信息。',
      '向保险公司确认新州保单生效日、车辆 garaging address 和旧保单取消顺序，不制造 coverage lapse。',
      '查旧州 plate / registration surrender、保险取消和地址更新规则，并保存邮寄追踪、收据和新州登记证明。',
    ],
    steps: [
      '第一步：确定 resident 起算点和两个期限。用新州 new resident 页面分别记录 driver license 与 vehicle registration 的 deadline。',
      '第二步：先建立可用的新州地址材料，并预约需要现场核验的驾照或 title 业务；姓名、SSN 和 lawful-status 文件同时整理。',
      '第三步：按新州指定顺序处理保险和车辆。Florida 要先有 Florida insurance；Washington 要先有 WA driver license；Texas 通常先完成车辆登记再办驾照。',
      '第四步：处理 title / lien。title 在银行手里时，先让 lienholder 按州或当地 office 指示发送文件，不要到了柜台才联系银行。',
      '第五步：换驾照。带外州证件及 required documents，确认是否 surrender 旧证、是否免测试、临时证如何使用和正式卡寄送地址。',
      '第六步：完成 VIN、inspection/emissions、registration 和 plates，并确认保险、registration、title owner 与车辆地址一致。',
      '第七步：按旧州规则退牌或关闭登记后再取消旧保单；保留新旧州收据，继续检查 toll、parking、property tax 和 renewal notice。',
    ],
    faqs: [
      {
        question: '搬州一定要重新路考吗？',
        answer:
          '不一定。许多州对 valid out-of-state noncommercial license 有 exchange 或测试豁免，但过期证、permit、CDL、外国驾照、未成年人证件或受限/停牌记录可能走不同路径。',
      },
      {
        question: '先换驾照还是先注册车？',
        answer:
          '看新州。Washington 明确先办 WA driver license 再登记车辆；Texas 新居民通常先登记本人车辆，再在驾照申请时出示 registration；其他州可能允许同日或相反顺序。',
      },
      {
        question: '旧州保险什么时候取消？',
        answer:
          '不要在新州保单和登记生效前贸然取消。还要先看旧州是否要求退牌或关闭 registration；New York 明确要求先 surrender NY plates / registration，再取消 NY liability insurance。',
      },
      {
        question: '车贷没还完、title 在银行手里怎么办？',
        answer:
          '先看新州 lienholder / leased vehicle 指引，并提前联系银行。New Jersey、Florida 和 Washington 都有由 lienholder 发送 title、复制件或拒绝转 title 说明的路径，但不能跨州套用文件格式。',
      },
      {
        question: '留学生或短期工作搬来，也一定算新州 resident 吗？',
        answer:
          '不一定。DMV resident 判断可能参考住房、工作、学校、投票、车辆和居住意图。New York 就说明外州/外国学生通常不算 NY resident；其他州必须看各自 exemption 和 resident 定义。',
      },
    ],
    factChecks: [
      {
        claim: 'California 新居民带入外州或外国登记车辆时，通常要在成为居民或把车带入州内后 20 天内登记。',
        sourceUrls: ['https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/'],
      },
      {
        claim: 'New York 新居民通常要在成为 resident 后 30 天内取得 New York driver license。',
        sourceUrls: ['https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state'],
      },
      {
        claim: 'New York 车辆使用 NY registration 时必须有 New York insurance，搬出时应先交回 plates / registration 再取消该保险。',
        sourceUrls: ['https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state'],
      },
      {
        claim: 'New Jersey 新居民通常要在搬入后 60 天内或原 license / registration 到期前完成 license 与 vehicle transfer，以较早者为准。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/movetonj.htm'],
      },
      {
        claim: 'Georgia 要求成为州居民并在 Georgia 驾驶的人通常在 30 天内申请 Georgia driver license。',
        sourceUrls: ['https://dds.georgia.gov/georgia-licenseid/new-licenseid/new-georgia-residents-and-out-state-license-transfers'],
      },
      {
        claim: 'Texas 新居民通常在 30 天内登记车辆、90 天内取得 Texas driver license，两项业务由不同机构办理。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/new-to-texas',
          'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
        ],
      },
      {
        claim: 'Texas 新居民申请 driver license 时，通常要先完成本人车辆的 Texas registration，并准备相应保险证明。',
        sourceUrls: ['https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids'],
      },
      {
        claim: 'Florida 新居民页面分别给出驾照与车辆 title/registration 的期限，并要求车辆业务使用 Florida insurance。',
        sourceUrls: ['https://www.flhsmv.gov/new-resident/'],
      },
      {
        claim: 'Washington 新居民通常有 30 天办理 WA driver license 和 vehicle registration，并要先取得 WA driver license 再登记车辆。',
        sourceUrls: [
          'https://dol.wa.gov/moving-washington',
          'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
        ],
      },
      {
        claim: 'New Jersey、Florida 和 Washington 都对 title 由 lienholder 持有的搬州车辆提供单独文件或联系路径。',
        sourceUrls: [
          'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
          'https://www.flhsmv.gov/new-resident/',
          'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
        ],
      },
    ],
    editorNotes: [
      '搬州期限高度州别化：佐州新居民是 30 天，其他州可能不同。不要把一个州的天数套到另一个州。',
      '驾照转换、车辆登记、保险和退旧州牌照可能属于不同机构或不同顺序，先看新州 new resident 页面。',
      '外州驾照过期、商业驾照、国际驾照、非公民身份或车辆 title 问题，都会让普通 exchange 路径变复杂。',
    ],
    sources: [
      {
        label: 'California DMV New to California',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/special-interest-driver-guides/new-to-california/',
      },
      {
        label: 'NY DMV Moving to or from New York State',
        url: 'https://dmv.ny.gov/more-info/moving-to-or-from-new-york-state',
      },
      {
        label: 'NJ MVC Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
      },
      {
        label: 'Georgia DDS New Residents and Out-of-State Transfers',
        url: 'https://dds.georgia.gov/georgia-licenseid/new-licenseid/new-georgia-residents-and-out-state-license-transfers',
      },
      {
        label: 'Texas DMV New to Texas',
        url: 'https://www.txdmv.gov/motorists/new-to-texas',
      },
      {
        label: 'Texas DPS Moving to Texas Guide',
        url: 'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids',
      },
      {
        label: 'FLHSMV New Resident',
        url: 'https://www.flhsmv.gov/new-resident/',
      },
      {
        label: 'Washington DOL Moving to Washington',
        url: 'https://dol.wa.gov/moving-washington',
      },
      {
        label: 'Washington DOL Vehicle Registration and Plates',
        url: 'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'new-jersey', 'georgia', 'texas', 'florida', 'washington'],
  },
  {
    slug: 'used-car-title-lien-salvage-odometer-check',
    title: '买二手车前，title、lien、salvage 和 odometer 怎么查',
    eyebrow: '买二手车',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '私人买二手车或网上买 used car 时，不要只看价格和 Carfax 截图。先用 VIN、title、lien release、salvage / flood brand、odometer disclosure、seller name 和 DMV transfer 要求，判断这辆车能不能顺利过户和登记。',
    whoNeedsIt: [
      '准备从私人卖家、Facebook Marketplace、Craigslist、朋友或小车行买二手车的人。',
      '看到 clean title、rebuilt、salvage、flood、not actual mileage、lien、no title、lost title、bill of sale only 等关键词，不确定风险的人。',
      '准备跨州买车、网上看车、先付 deposit，或买车后才发现 title / VIN / 里程 / lien 不对的人。',
      '已经读过车辆 title / registration 顺序页，但想在付款前做买方检查的人。',
    ],
    keyFacts: [
      'Title 是买方能不能把车转到自己名下的核心文件。California 私人交易要求取得卖方签署的 title；如果眼前卖家不是 title 上的登记车主，还要有由该卖家和 title owner 共同签署的 bill of sale，把中间所有权链连接起来。',
      'Bill of sale 通常只是所有权链或交易材料的一部分，不能自动替代州要求的 title。California 在特定链条中接受 bill of sale，New York 也要求把 bill of sale 与其他 ownership proofs 一起提交；只有一张收据不等于一定能过户。',
      'Lien 是高风险项。NY DMV Driver Manual 提醒，title 上有 lien holder 时，要向卖家索取贷款已还清的官方 lien release；否则 lien holder 仍可能 repossess 车辆。',
      'Salvage、rebuilt、flood、junk、not actual mileage 等 title brand 会影响登记、保险、安全和转售。NMVTIS 说明 brand 由州用于标记车辆当前或历史状态，并且 brand washing 可能发生在跨州重新 title 时。',
      'Odometer disclosure 不是一句口头承诺。NHTSA 说明转移所有权时联邦规则要求书面 mileage disclosure；Texas DMV 和 NY DMV 都提醒要把 title 上的里程与车上 odometer、维修/检查记录对照。',
      'Vehicle history report 有用，但不能替代 DMV 文件和机械检查。Washington DOL、Texas DMV 和 FTC 都建议查历史报告，同时找独立 mechanic 检查。',
      'Dealer used car 和 private sale 不是同一套保护。FTC Used Car Rule 要求多数 used-car dealers 张贴 Buyers Guide；NY DMV 明确提醒 private seller 不受很多 dealer 规则约束，私人交易纠纷通常更难处理。',
      '付款前先验证 VIN、title owner、完整 ownership chain、title brand、lien、odometer、seller 身份和本州 transfer 要求。Texas DMV 明确提醒私人交易绝不要在没拿到 title 的情况下离开；New York 也不会接受有涂改、擦除或取消信息的 title。',
    ],
    checklist: [
      '拍下 VIN，并确认 dashboard、driver door、title、registration、insurance card 或 seller 文件里的 VIN 一致。',
      '看 title 原件：owner name、seller name、lienholder、brand、odometer、damage disclosure、签名位置、涂改、刮擦、空白转让或跳 title 痕迹；卖家与 title owner 不同时，要求州认可的完整连接文件。',
      '如果 title 上有 lien，要求官方 lien release 或按州 DMV 指示处理；不要只接受卖家的短信或口头说明。',
      '用 NMVTIS / vehiclehistory.gov 或州 DMV title-check 入口查 title、brand、latest odometer、salvage / total loss / theft history 线索。',
      '对比里程：title disclosure、车内 odometer、inspection record、maintenance record、oil-change sticker 和 seller 叙述是否一致。',
      '查 salvage / rebuilt / flood / junk / not actual mileage 等 brand 后，再确认本州能否 title、register、insure，以及是否要 salvage inspection、stolen-parts inspection 或额外文件。',
      '约独立 mechanic 做 pre-purchase inspection；不要只相信 seller inspection、dealer certified 或网上照片。',
      '付款和签约前，先确认你所在州/购买州的 title transfer deadline、sales tax / use tax、insurance、temporary permit、plate handling 和 DMV / county office 要求。',
    ],
    steps: [
      '第一步：先用 VIN 做官方路径检查。打开 NMVTIS / vehiclehistory.gov、州 DMV title check 或 buying a vehicle 页面，不要先付款或交 deposit。',
      '第二步：现场核对 title。卖家姓名必须能和 title owner、授权文件或州认可的 bill-of-sale chain 对上；有 unexplained owner mismatch、lien、lost title、only bill of sale、open title、cross-out、white-out 或 signature mismatch 时先停下来。',
      '第三步：看 brand 和 damage disclosure。出现 salvage、rebuilt、flood、junk、not actual mileage、total loss 或 out-of-state title 时，先查本州是否能登记、是否要检查、保险是否接受。',
      '第四步：核对 odometer。把 title disclosure、车上里程、维修记录、inspection record 和 NMVTIS / history report 里程线串起来，发现倒退或不合理跳跃就不要急着成交。',
      '第五步：请独立 mechanic 检查车辆，尤其是 salvage / rebuilt / flood、低价车、跨州车、无完整维修记录或网上远程交易。',
      '第六步：成交当天按州要求完成 title、bill of sale、odometer disclosure、damage disclosure、tax / price statement、temporary permit 和保险；付款凭证、卖家 ID 信息和所有文件拍照留存。',
      '第七步：在本州规定期限内完成 title transfer / registration。不要等临时牌照快过期才发现 title、lien、VIN 或 seller signature 有问题。',
    ],
    faqs: [
      {
        question: '卖家说 no title、bill of sale only，可以买吗？',
        answer:
          '高风险。Bill of sale 通常只是交易证明，不等于 ownership title。部分州有特殊无 title、bonded title、court order 或 replacement title 路径，但流程慢、费用高，且不保证成功。普通买家最好先查本州 DMV 对 no-title vehicle 的规则，再决定是否继续。',
      },
      {
        question: 'clean title 就一定没有事故或水泡吗？',
        answer:
          '不能这么理解。Clean title 只说明当前 title 没显示特定 brand，不等于没有事故、维修、洪水或历史问题。NMVTIS 说明 brand washing 可能发生；California DMV 也提醒外州车的 salvage disclosure 难 enforcement。要同时查 NMVTIS、维修记录、mechanic inspection 和 title 文件。',
      },
      {
        question: 'seller name 不在 title 上，是不是 title jumping？',
        answer:
          '不一定自动等于 title jumping，但必须解释完整。California 允许卖家不是 title owner 的私人交易使用由实际卖家和 title owner 共同签署的 bill of sale 来连接所有权；dealer reassignment、power of attorney、estate 等也可能有专门文件。没有连续签字、只有空白 title、卖家拒绝出示身份或不愿一起去办理时，应停止付款。',
      },
      {
        question: 'odometer 显示低里程，但 title 或报告里不一致怎么办？',
        answer:
          '先停。NHTSA 说明 odometer fraud 是犯罪，Texas DMV 建议把 title 里程、车上 odometer、maintenance / inspection records 和贴纸里程互相对照。看到 not actual mileage、exceeds mechanical limits、mileage discrepancy 或涂改，应按州 DMV / NHTSA 路径继续核查。',
      },
      {
        question: 'dealer 车是不是比私人车安全？',
        answer:
          '不一定，但 dealer 有不同规则。FTC Used Car Rule 要求多数 used-car dealers 张贴 Buyers Guide，说明 as-is 或 warranty 等信息；private sale 通常没有同等保护。无论 dealer 还是私人卖家，都要查 title、VIN、lien、brand、odometer 和机械状态。',
      },
    ],
    factChecks: [
      {
        claim:
          'California 私人交易要求取得卖方签署的 title；若实际卖家不是 title 上的登记车主，还要提交由实际卖家和登记车主共同签署的 bill of sale。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/registering-a-vehicle-purchased-from-a-private-party/',
        ],
      },
      {
        claim:
          'New York 指引提醒，title 显示 lienholder 时应取得贷款已清偿的正式 lien release，否则 lien 仍可能影响所有权和车辆处置。',
        sourceUrls: [
          'https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle',
        ],
      },
      {
        claim:
          'New York 不接受 odometer/damage disclosure 未完成，或姓名、签名等信息被调整、擦除、取消的 title；发现错误应先取得有效更正或 replacement，而不是自行涂改。',
        sourceUrls: [
          'https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle',
          'https://dmv.ny.gov/titles/certificate-of-title',
        ],
      },
      {
        claim:
          'NMVTIS 消费者报告可用于核对当前 title、brand、最近里程以及 junk、salvage 或 insurance total-loss 等记录线索。',
        sourceUrls: [
          'https://vehiclehistory.bja.ojp.gov/nmvtis_consumers',
          'https://vehiclehistory.bja.ojp.gov/nmvtis_vehiclehistory',
        ],
      },
      {
        claim:
          '联邦规则要求车辆所有权转移时提供书面 odometer disclosure；2011 model year 及以后车辆通常要持续披露到车龄达到 20 年。',
        sourceUrls: ['https://www.nhtsa.gov/vehicle-safety/odometer-fraud'],
      },
      {
        claim:
          'FTC Used Car Rule 要求多数二手车 dealer 展示 Buyers Guide，并在成交时把反映最终 warranty 条款的版本交给买方。',
        sourceUrls: ['https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule'],
      },
      {
        claim:
          'FTC 建议即使车辆被 dealer 标为 certified 或已经检查过，买方仍应取得 vehicle history report 并安排独立 mechanic 检查。',
        sourceUrls: [
          'https://consumer.ftc.gov/consumer-alerts/2024/07/what-know-when-buying-used-car-online',
        ],
      },
      {
        claim:
          'Texas Title Check 指引要求买方在付款前核对 VIN、title 和 brand，并警惕 salvage、rebuilt、flood 及 odometer brand。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy',
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/salvage-brands',
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/odometer-brands',
        ],
      },
      {
        claim:
          'Texas Title Check 明确提醒私人交易不能在未取得 title 的情况下离开，并要求卖方在 title 上填写姓名、出售日期和 odometer。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy',
        ],
      },
      {
        claim:
          'California 的 branded title 会显示车辆发生过重大损坏、高里程或其他重要历史；clean title 不能替代事故历史和机械状态调查。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/branded-titles/',
        ],
      },
      {
        claim:
          'Washington DOL 建议买方在签字前核对 title、VIN、卖方身份和车辆历史，并把 title fraud 当作独立风险处理。',
        sourceUrls: [
          'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle',
          'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/title-fraud',
        ],
      },
      {
        claim:
          'New Jersey 对 salvage 或 rebuilt vehicle 设有专门 title 和检查路径，不能把普通 clean-title transfer 流程直接套用。',
        sourceUrls: ['https://www.nj.gov/mvc/vehicles/salvage.htm'],
      },
    ],
    editorNotes: [
      '这页专门讲 buyer-side 风险，避免和 vehicle-title-registration-insurance-after-move 的办理顺序重复；两个页面应互相导流。',
      '不要推荐某个商业 vehicle history report。可以引用 NMVTIS / vehiclehistory.gov 和 approved providers，但必须提醒报告不能替代 title 原件、DMV 要求和 mechanic inspection。',
      '私人交易、dealer sale、online sale、cross-state sale 是四个不同风险层级。中文解释要把 Buyers Guide、private seller、open title、合法 bill-of-sale chain、lien release 和 title brand 分开。',
      'Federal odometer rule、state title transfer rule、state salvage inspection rule 和 consumer complaint route 不能混写成一个全国统一步骤。',
      '这页不提供法律、税务、贷款或保险建议；如果已经付款且过户失败，用户可能需要 DMV special title unit、state attorney general、dealer complaint unit 或法律咨询。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 vehicle title、registration、online services、office、dealer complaint 和车辆业务入口。',
    },
    sources: [
      {
        label: 'California DMV Registering a Vehicle Purchased from a Private Party',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/registering-a-vehicle-purchased-from-a-private-party/',
      },
      {
        label: 'California DMV Branded Titles',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/branded-titles/',
      },
      {
        label: 'California DMV Replacement Titles',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/transfers/duplicate-titles/',
      },
      {
        label: 'NY DMV Let the Buyer Be Aware',
        url: 'https://dmv.ny.gov/brochure/let-the-buyer-be-aware',
      },
      {
        label: 'NY DMV Driver Manual: Owning a Vehicle',
        url: 'https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle',
      },
      {
        label: 'NY DMV Certificate of Title',
        url: 'https://dmv.ny.gov/titles/certificate-of-title',
      },
      {
        label: 'NY DMV Buy, Sell, or Transfer Vehicle Ownership',
        url: 'https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership',
      },
      {
        label: 'Texas DMV Title Check - Look Before You Buy',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy',
      },
      {
        label: 'Texas DMV Buying or Selling a Vehicle',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
      },
      {
        label: 'Texas DMV Salvage Vehicles',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/salvage-brands',
      },
      {
        label: 'Texas DMV Odometer Brands',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/title-check-look-before-you-buy/odometer-brands',
      },
      {
        label: 'Washington DOL Buy and Register a Vehicle',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle',
      },
      {
        label: 'Washington DOL Title Fraud',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/title-fraud',
      },
      {
        label: 'NJ MVC Transferring Vehicle Ownership',
        url: 'https://www.nj.gov/mvc/vehicles/transowner.htm',
      },
      {
        label: 'NJ MVC Salvage/Rebuilt Vehicles',
        url: 'https://www.nj.gov/mvc/vehicles/salvage.htm',
      },
      {
        label: 'FLHSMV Consumer Education: Buying a Vehicle',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/',
      },
      {
        label: 'FLHSMV Protecting Yourself from Odometer Fraud PDF',
        url: 'https://www.flhsmv.gov/pdf/mv/mv_fraud.pdf',
      },
      {
        label: 'FLHSMV Application for Certificate of Motor Vehicle Title',
        url: 'https://www.flhsmv.gov/pdf/forms/82040.pdf',
      },
      {
        label: 'PennDOT Buying or Selling a Vehicle',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle',
      },
      {
        label: 'Virginia DMV NMVTIS Consumer Information',
        url: 'https://www.dmv.virginia.gov/vehicles/nmvtis',
      },
      {
        label: 'Virginia DMV Titling a Vehicle',
        url: 'https://www.dmv.virginia.gov/vehicles/title',
      },
      {
        label: 'Oregon DMV Titling and Registering Your Vehicle',
        url: 'https://www.oregon.gov/odot/dmv/pages/vehicle/titlereg.aspx',
      },
      {
        label: 'NCDMV Vehicle Titles',
        url: 'https://www.ncdot.gov/dmv/title-registration/vehicle/Pages/default.aspx',
      },
      {
        label: 'NMVTIS for Consumers',
        url: 'https://vehiclehistory.bja.ojp.gov/nmvtis_consumers',
      },
      {
        label: 'NMVTIS Approved Vehicle History Data Providers',
        url: 'https://vehiclehistory.bja.ojp.gov/nmvtis_vehiclehistory',
      },
      {
        label: 'NHTSA Odometer Fraud',
        url: 'https://www.nhtsa.gov/vehicle-safety/odometer-fraud',
      },
      {
        label: 'FTC Dealer Guide to the Used Car Rule',
        url: 'https://www.ftc.gov/business-guidance/resources/dealers-guide-used-car-rule',
      },
      {
        label: 'FTC Consumer Advice: Buying a Used Car Online',
        url: 'https://consumer.ftc.gov/consumer-alerts/2024/07/what-know-when-buying-used-car-online',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'washington',
      'new-jersey',
      'florida',
      'pennsylvania',
      'virginia',
      'oregon',
      'north-carolina',
    ],
  },
  {
    slug: 'lost-vehicle-title-replacement-electronic-title-lien-sale',
    title: '车辆 title 丢了怎么办：补证、电子 title 和 lien',
    eyebrow: '补车辆 title',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '纸质 vehicle title、pink slip 或 ownership certificate 丢失、损坏、被盗、一直没收到，或者贷款已还清却发现 title 仍在银行或只保留电子记录时，先确认最后签发州、登记车主、地址和 lien 状态，再决定申请 duplicate / replacement、打印 electronic title、清除 lien，还是走 correction / transfer。',
    whoNeedsIt: [
      '车辆已经在自己名下，但纸质 title / pink slip 丢失、被盗、损坏、字迹无法辨认或邮寄后一直没收到的人。',
      '汽车贷款已经还清，却不知道 lender 是否仍持有 title、DMV 记录里是否还有 lien，或手里只有 lien release 的人。',
      '州里保存的是 electronic title，准备私人卖车、trade-in、搬到外州或出口车辆，不确定是否必须先取纸质 title 的人。',
      '准备卖车、赠车或转 title，却发现 title 上姓名、地址、lienholder、共同车主或车辆信息不正确的人。',
      '买方遇到卖家说 no title、lost title、bill of sale only，想知道能否由买方直接补 title 的人。',
    ],
    keyFacts: [
      'Title 和 registration 不是同一份文件。Registration 说明车辆目前如何登记和上路，title 才是州签发的所有权凭证；补 registration card、plate 或 sticker 不会自动补出 title，也不能代替 ownership transfer。',
      '先找最后签发或记录 title 的州，不是看车辆现在停在哪里。California 对“Nontransferable/No California Title Issued”明确要求向最后 title 州取证；Texas 也说明不能替另一个州签发 replacement title。',
      '买方通常不能把卖家丢失的 title 当成自己的 duplicate 来补。Georgia 明确要求：转让完成前、title 仍在前车主名下时，由前车主申请 replacement，再重新完成 reassignment。Illinois 也要求外州买方让 Illinois owner 先申请 duplicate。',
      'Duplicate / replacement 一经签发，旧 title 通常失效。New York、Florida 和 Virginia 都明确说明此前 title 不再有效；后来找回旧证，也不要再签字、出售或交给买方使用。',
      '“只补同样信息”和“同时改信息”常是两种交易。Virginia 把 lost / mutilated / illegible 的 replacement 与修改信息的 substitute title 分开；Arizona duplicate 也要求 owner、legal status、lienholder 和车辆信息保持不变。',
      '寄送地址必须先确认。New York 把 replacement title 寄到 title record 的当前地址，并提醒 USPS 转寄不保证生效；Virginia 要求在线补 title 前至少 24 小时先完成地址更新。',
      '有 lien 时，不一定把 title 寄给车主。Texas 要求记录中的 lienholder 申请，或提交 original lien release；Washington 要求仍在还贷时由 lienholder 申请；New Jersey 会把带 lien 的 duplicate title 寄给 lienholder。',
      'Electronic title 不是“DMV 把 title 弄丢了”。Florida 把电子 title 保存在 FLHSMV 数据库；无 lien 时可申请转成纸质。私人出售或转到外州通常需要纸质 title，但交给 Florida dealer trade-in 时不一定要先打印。',
      '到办公室申请不代表当天拿证。New York 的 title 统一从安全设施打印后邮寄；California、Massachusetts、Virginia 和 Washington 公布的普通办理时间也不同，急着卖车前要先看本州当前时效和加急资格。',
      'Damaged、lost in transit、deceased owner、business / trust owner、out-of-state resident 和 no proof of ownership 可能有独立材料。不要为了走简单 duplicate 路径，把仍持有的损坏 title 误报成 lost，或用 replacement 规避 lien、brand、共同车主和所有权问题。',
    ],
    factChecks: [
      {
        claim:
          'Title 与 registration 作用不同：registration 允许车辆按登记状态上路，title certificate 用来证明车辆所有权；补 registration 不会自动补出 ownership title。',
        sourceUrls: [
          'https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle',
        ],
      },
      {
        claim:
          'Replacement title 应从最后签发或记录所有权的州开始办理；车辆现在所在州通常不能直接替另一个州补发 title。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
          'https://www.txdmv.gov/faqs',
        ],
      },
      {
        claim:
          'Title 在卖方名下、转让尚未完成时丢失，通常应由记录中的原车主先补证，买方不能把它当作自己的 duplicate 申请。',
        sourceUrls: [
          'https://dor.georgia.gov/replace-lost-or-stolen-title',
          'https://www.ilsos.gov/departments/vehicles/title-and-registration/duplicate-titles.html',
        ],
      },
      {
        claim:
          'Duplicate 或 replacement title 签发后，原 title 和此前 duplicate 通常失效；后来找回的旧证不能继续用于转让。',
        sourceUrls: [
          'https://dmv.ny.gov/titles/certificate-of-title',
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/paper-liens-and-titles/',
          'https://www.dmv.virginia.gov/vehicles/title/replacement',
        ],
      },
      {
        claim:
          '补发件会按机动车或 title 记录中的地址寄送；地址已变更时，应先按签发州要求更新并等待记录生效。',
        sourceUrls: [
          'https://dmv.ny.gov/titles/replace-a-title-certificate',
          'https://www.dmv.virginia.gov/online-services/replace-title',
        ],
      },
      {
        claim:
          '记录中仍有 lien 时，申请人、lien release 形式和收件人会改变；部分州要求 lienholder 申请或把 replacement 寄给 lienholder。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title',
          'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration',
          'https://www.nj.gov/mvc/vehicles/duptitle.htm',
          'https://www.mass.gov/how-to/replace-your-vehicles-certificate-of-title',
        ],
      },
      {
        claim:
          'Florida electronic title 是州数据库中的有效所有权记录；无 lien 时可转成纸质，私人出售与交给 Florida dealer trade-in 的纸质要求不同。',
        sourceUrls: [
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/paper-liens-and-titles/',
        ],
      },
      {
        claim:
          '只补一张相同信息的 title 与修改姓名、owner、lienholder 或车辆信息不是同一事务，后者可能要走 corrected、substitute 或 transfer。',
        sourceUrls: [
          'https://www.dmv.virginia.gov/vehicles/title/replacement',
          'https://www.dmv.virginia.gov/online-services/replace-title',
          'https://azdot.gov/faq/how-do-i-apply-duplicate-title-and-what-fee',
        ],
      },
      {
        claim:
          'Title 补发不一定现场交付：New York 明确现场不发证，California、Massachusetts 和 Virginia 也分别公布邮寄或处理时效。',
        sourceUrls: [
          'https://dmv.ny.gov/titles/replace-a-title-certificate',
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
          'https://www.mass.gov/how-to/replace-your-vehicles-certificate-of-title',
          'https://www.dmv.virginia.gov/online-services/replace-title',
        ],
      },
      {
        claim:
          'Washington 普通 lost-title 路径要求所有 registered owners 在 notary 面前签 Affidavit of Loss；仍在还贷时由 lienholder 申请，并另有费用更高且有资格限制的 Quick Title 路径。',
        sourceUrls: [
          'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration',
          'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/affidavit-lossrelease-interest',
        ],
      },
    ],
    checklist: [
      '记录 VIN、当前 plate number、registration expiration、title number（如 registration 上可查）、车辆 year / make，以及最后一次 title 的州。',
      '先把情形勾清：paper title lost、stolen、damaged / illegible、never received / lost in transit、electronic title、lienholder holds title、out-of-state title，还是从未在自己名下。',
      '确认 title record 上的 owner name、共同车主、公司 / trust / estate 身份和地址；不要只按现在 driver license 或保险上的信息填写。',
      '准备 owner 的 government-issued photo ID、current / expired registration、insurance proof 或州要求的其他 ownership record。',
      '若有共同车主，确认是否所有 owner 都要签字、是否需要 notarization。Texas 要求所有 recorded owners 签 VTR-34；Washington lost title affidavit 也要求所有 registered owners 在公证人或 licensing agent 面前签。',
      '如果曾有车贷，先查 lien 是否仍在州记录中；准备州接受的 original lien release、lender letterhead statement 或让 lienholder 直接申请。',
      '如果损坏 title 仍在手里，带上或随申请交回；不要丢弃，也不要把 damaged 情况写成 lost。',
      '确认这次是否只补证。如果同时改姓名、地址以外的信息、owner、lien、odometer、VIN 或品牌，先进入 correction / substitute / transfer 页面。',
      '准备出售或搬州时，先把办理和邮寄时间倒排；在 replacement 真正到手前，不要向买方承诺“title in hand”。',
      '保存申请副本、付款收据、tracking / case number、lien release 和寄送证明；新证签发后若找回旧 title，按州指示销毁或交回。',
    ],
    steps: [
      '第一步：确认最后 title 州。查看 registration、贷款文件、旧 title 照片、保险文件或州 vehicle record；从该州 DMV / MVC / DOL / DOR 官方入口开始。',
      '第二步：确认你是不是 record owner。卖方仍是 title owner、车辆刚买但 transfer 未完成、owner 已去世、公司 / trust 名下或只有 bill of sale 时，不要直接套普通 duplicate。',
      '第三步：核对地址。补发通常寄到 title 或 vehicle record 地址；按本州顺序先 change address，并确认需要等待多久后才能申请。',
      '第四步：解决 lien 分流。仍在还贷就联系 lienholder；已经还清但记录未解除时，取得州认可的 original release 或 lender statement，不要只交账户余额截图。',
      '第五步：选对交易和表格。常见例子是 California REG 227、New York MV-902、Texas VTR-34、Florida HSMV 82101、Washington Affidavit of Loss、New Jersey OS/SS-UTA、Virginia VSA 67 和 Illinois VSD 190。',
      '第六步：选择 online、mail、office、county tax / tag office 或 quick title。在线资格通常只适合 owner、地址和 title 信息不变且没有特殊 lien / estate / POA 情况的人。',
      '第七步：提交 ID、ownership proof、签名 / notarization、损坏原件、lien 文件和费用。寄出前逐项复印或扫描，并从官方页面再次核对收件地址和付款方式。',
      '第八步：收到后核对 owner、VIN、lien、brand 和地址。若用于出售或搬州，再进入 title transfer / new-resident registration；若旧 title 后来出现，立即停用并按州规则处理。',
    ],
    faqs: [
      {
        question: 'Title 丢了，还能只拿 bill of sale 卖车吗？',
        answer:
          '不要默认可以。普通私人交易通常需要能转让的 original 或 replacement title；bill of sale 只是交易证明，不能自动替代 ownership document。Georgia 明确要求前车主先补 title 再重新 reassignment。少数老车、无 title 州、bonded title 或 court-order 路径是特殊规则，应先看买卖双方州的官方要求。',
      },
      {
        question: '我是买方，可以替卖家申请 duplicate title 吗？',
        answer:
          '普通 duplicate 通常由 DMV 记录中的 owner、lienholder 或获授权代理申请。卖家说 title 丢了时，最稳妥的顺序是让卖家先从原 title 州补证，再在有效 title 上完成转让。不要先付款后指望凭 bill of sale 自动补成自己名下。',
      },
      {
        question: '贷款还清了，为什么 replacement title 还会寄给银行？',
        answer:
          '因为“贷款余额为零”和“州 title record 已解除 lien”不是一回事。若 lien 仍在记录中，Texas、Washington、New Jersey、Virginia 等州可能要求 lienholder 参与、提交原始 release，或把 title 寄给 lienholder。先拿到州认可的 lien satisfaction 文件并确认记录如何更新。',
      },
      {
        question: 'Electronic title 是不是等于我没有 title？',
        answer:
          '不是。Electronic title 是州系统保存的所有权记录。是否需要纸质证取决于接下来的业务。Florida 允许无 lien 的 electronic title 转成纸质，私人卖车或转外州通常需要纸质，但交给 Florida dealership trade-in 时不一定要先打印。其他州要看本州 ELT 规则。',
      },
      {
        question: '补 title 时可以顺便改名字、删除共同车主或清 lien 吗？',
        answer:
          '不一定。很多州把“原信息不变的 replacement”与 correction、substitute、lien release、owner change 和 transfer 分开。Virginia 在线 replacement 明确要求不改变 title 信息；Arizona duplicate 也限制 owner、legal status、lienholder 和车辆信息不变。先选正确业务，避免申请被退回。',
      },
      {
        question: '刚搬家，可以直接申请 replacement title 吗？',
        answer:
          '先查 title record 的地址更新顺序。New York 把新 title 寄到 title record 地址，并提醒 USPS 不保证转寄 DMV 文件；Virginia 要求至少提前 24 小时在线改地址。不同州的 vehicle registration address 和 title address 是否同步也可能不同。',
      },
      {
        question: '新 title 到了以后又找到旧 title，两个都能用吗？',
        answer:
          '不能。New York、Florida、Virginia 等官方规则都说明 replacement 签发后旧 title 失效。不要在旧证上签字，也不要把它交给买方；按州要求销毁、交回或保存作废证明。',
      },
      {
        question: '去 DMV 现场能不能当天拿到 title？',
        answer:
          '不能按“现场办理”推断“现场取证”。New York 明确说明 office 不会当场发 title；California、Massachusetts 和 Virginia 的普通路径均有不同邮寄时间。Washington 提供 Quick Title，但有额外费用和不适用情形。以申请当天官方时效为准。',
      },
    ],
    editorNotes: [
      '本页聚焦 title record 已存在但纸证 / 电子证 / lien 状态造成的 replacement 问题，不重复二手车购买前的 VIN、brand、odometer 风险检查。',
      '不要把 duplicate title、corrected title、substitute title、bonded title、court-ordered title、salvage title 和 title transfer 混写成同一条路径。',
      'Fees、mailing time、quick title 和 notarization 属于州级且易变信息，正文只保留有决策价值的实例，具体金额交给官方入口。',
      'Buyer-side 场景必须强调 recorded owner 先处理，避免内容被理解为可绕过 seller、lienholder 或 ownership evidence。',
      'Electronic title 不能泛化为全国统一系统；Florida 只作为官方可核对的代表案例，其他州回到原 title 州确认。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 vehicle title、registration、online services、forms、office、county tax / tag office 和 title service 官方入口。',
    },
    sources: [
      {
        label: 'California DMV Title Transfers and Changes',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
      },
      {
        label: 'California DMV REG 227 Replacement Title Procedure',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/duplicates-and-substitutes/application-for-duplicate-or-transfer-of-title-reg-227/',
      },
      {
        label: 'New York DMV Replace a Title Certificate',
        url: 'https://dmv.ny.gov/titles/replace-a-title-certificate',
      },
      {
        label: 'New York DMV Certificate of Title',
        url: 'https://dmv.ny.gov/titles/certificate-of-title',
      },
      {
        label: 'New York Driver Manual - Registration and Title',
        url: 'https://dmv.ny.gov/new-york-state-drivers-manual-and-practice-tests/chapter-3-owning-a-vehicle',
      },
      {
        label: 'TxDMV Get a Copy of Your Vehicle Title',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title',
      },
      {
        label: 'TxDMV Application for a Certified Copy of Title VTR-34 PDF',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/Form_VTR-34.pdf',
      },
      {
        label: 'TxDMV Motorist FAQs',
        url: 'https://www.txdmv.gov/faqs',
      },
      {
        label: 'FLHSMV Paper Liens and Titles',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/paper-liens-and-titles/',
      },
      {
        label: 'Washington DOL Replace a Lost Title or Registration',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration',
      },
      {
        label: 'Washington DOL Affidavit of Loss / Release of Interest',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/affidavit-lossrelease-interest',
      },
      {
        label: 'New Jersey MVC Duplicate Title',
        url: 'https://www.nj.gov/mvc/vehicles/duptitle.htm',
      },
      {
        label: 'Mass.gov Replace a Vehicle Certificate of Title',
        url: 'https://www.mass.gov/how-to/replace-your-vehicles-certificate-of-title',
      },
      {
        label: 'Virginia DMV Replacement Titles',
        url: 'https://www.dmv.virginia.gov/vehicles/title/replacement',
      },
      {
        label: 'Virginia DMV Online Title Replacement',
        url: 'https://www.dmv.virginia.gov/online-services/replace-title',
      },
      {
        label: 'Virginia DMV Liens on a Title',
        url: 'https://www.dmv.virginia.gov/vehicles/title/liens',
      },
      {
        label: 'Georgia DOR Replace Lost or Stolen Title',
        url: 'https://dor.georgia.gov/replace-lost-or-stolen-title',
      },
      {
        label: 'Georgia DOR Titles for Motor Vehicles',
        url: 'https://dor.georgia.gov/motor-vehicles/titles-motor-vehicles',
      },
      {
        label: 'Illinois Secretary of State Duplicate Titles',
        url: 'https://www.ilsos.gov/departments/vehicles/title-and-registration/duplicate-titles.html',
      },
      {
        label: 'Arizona MVD Duplicate Title FAQ',
        url: 'https://azdot.gov/faq/how-do-i-apply-duplicate-title-and-what-fee',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'massachusetts',
      'virginia',
      'georgia',
      'illinois',
      'arizona',
    ],
  },
  {
    slug: 'gift-inherited-vehicle-title-transfer',
    title: '亲属赠车、继承车辆和车主去世后，title 怎么转',
    eyebrow: '赠车继承',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '家里人赠车、车主去世、继承车辆、TOD beneficiary、surviving spouse、estate/probate、title 丢失或仍有 lien 时，车辆 title transfer 不是普通二手车交易。Gift、inheritance、estate、survivorship、tax exemption、registration 和 plate 必须分开判断。',
    whoNeedsIt: [
      '父母、配偶、子女、亲属之间赠车，不确定 title、tax、registration 和保险怎么处理的人。',
      '家人去世后要处理车辆 title、registration、plate、保险、parking/toll 或贷款 lien 的人。',
      '看到州页面写 surviving spouse、heir、executor、administrator、estate、TOD beneficiary、probate，但分不清该走哪条路径的人。',
      '继承车还没转到自己名下，却想马上卖掉、捐掉、换保险或跨州转入的人。',
      'title 丢失、车上有 lien、共同车主中有人去世、车牌能不能继续用、gift 是否免 sales/use tax 都不确定的人。',
    ],
    keyFacts: [
      'Gift、family transfer 和 inheritance 是不同路径。California DMV 把 family、estate、inheritance、gift 和 deceased owner 拆开；PennDOT 也把 gift affidavit 与 death-owner transfer 分开处理。',
      '赠车不等于自动免税。Washington 会看赠与人是否已缴税、车辆来源州以及是否交换金钱、物品或服务；Florida 的一般免税规则要求无付款且不承接 outstanding lien；Pennsylvania 把承接贷款余额视为 consideration；Texas 还限制可适用 gift tax 的关系并要求 Form 14-317。',
      '车主去世后，要先判断 title 上是谁。共同车主、right of survivorship、tenants in common、spouse、minor children、heirs、executor、administrator、TOD beneficiary 和 estate 的文件完全不同。',
      '继承人不一定能直接卖车。Georgia 明确规定：使用 T-20 Affidavit of Inheritance，或没有 Letters of Testamentary 的继承人，要先把车 title 到自己名下再出售或转让；executor / administrator 等其他路径的签字权限不同。',
      'TOD / beneficiary 不是生前共同车主。California、Texas、Virginia、New Jersey 都有车辆 beneficiary 或 transfer-on-death 相关规则，但通常在车主去世后才生效，并且受 lien、申请期限或表格限制。',
      'Registration、plate、title 和 insurance 不要混在一起。Virginia DMV 把 deceased owner 的 vehicle ownership transfer 和 registration transfer 分成不同页面；PennDOT 也把 title fee、registration plate transfer 和 insurance information 拆开。',
      'Title 丢失会改变流程。California REG 227、Florida duplicate title 表格、Georgia replacement title 页面都提醒，丢失 title 时不能简单手写 bill of sale 代替，通常要先走 replacement / duplicate 或特定 transfer-with-duplicate 路径。',
      'Odometer disclosure 和 lien release 仍可能需要。赠与或继承不自动跳过里程表、贷款清偿、lienholder release、税费、保险和登记条件；Florida、Texas、Washington 和 Georgia 官方材料都把这些列为转 title 时的常见条件。',
      '这类页面不是法律或遗产建议。DMV 只处理车辆 title / registration；遗嘱、probate、继承权、税务、贷款责任和家庭争议，可能需要法院、税务部门、贷款机构或律师处理。',
    ],
    checklist: [
      '先确认场景：普通 gift、family transfer、spouse transfer、inherited vehicle、estate sale、TOD beneficiary、joint owner survivorship，还是 title 丢失后转让。',
      '确认 title 当前状态：所有人姓名、and/or、right of survivorship、TOD/beneficiary、lienholder、paper title 或 electronic title、是否已签过、是否有涂改。',
      '准备身份和关系文件：photo ID、death certificate、marriage certificate、will、Letters Testamentary / Letters of Administration、court order、heirship affidavit、surviving spouse affidavit、family relationship affidavit 或州指定表格。',
      '准备车辆文件：certificate of title、duplicate title application、title application、odometer disclosure、bill of sale / notice of sale、lien release、current registration、plates 和保险信息。',
      '赠车时单独查 tax exemption / use tax / gift affidavit，不要只在 sale price 写 0 或 gift。',
      '继承车想出售前，确认州是否要求继承人或 estate 先取得 title，还是允许 executor / administrator 直接 assign title。',
      '如果车还要上路，另查 registration、insurance、inspection、temporary permit 或 plate transfer；title 转移完成不等于可以合法开车。',
      '保留提交副本、notary、county / DMV receipt、tax form、plate surrender 或 registration cancellation confirmation。',
    ],
    steps: [
      '第一步：不要从普通 private sale 页面直接套用。先找本州 vehicle title transfer、gift transfer、deceased owner、heirship、surviving spouse 或 TOD beneficiary 页面。',
      '第二步：读 title 正面。共同车主之间是 and、or、right of survivorship、tenants in common，还是只有去世者一个名字，会决定是否需要 estate / probate 文件。',
      '第三步：判断承办机构。Texas 多数 title transfer 在 county tax office；Georgia 是 County Tag Office；Florida 是 tax collector / license plate agency；Washington 是 vehicle licensing office；New Jersey 可能要求 Vehicle Center。',
      '第四步：如果是 gift，先查税务表格。确认是否真的没有付款、没有以货物服务交换、没有承接贷款或 lien，并按州表格填写 gift / family exemption。',
      '第五步：如果是死亡后转移，先整理 authority 文件。surviving spouse、minor child、executor、administrator、heir、TOD beneficiary、estate sale 需要的签名和证明不同。',
      '第六步：处理 lien、duplicate title 和 odometer。title 丢失、有贷款、电子 title 或车辆年份需要 odometer disclosure 时，先按州表格补齐，不要只靠 bill of sale。',
      '第七步：title 转完后再处理 registration、plate、保险和后续出售。很多州允许或限制 plate transfer；保险和 registration 也可能需要新 owner 名字。',
    ],
    faqs: [
      {
        question: '亲属把车送给我，只要在 title 价格写 gift 就行吗？',
        answer:
          '通常不够。Texas 要求符合关系范围并提交 Form 14-317；California 要写 Gift 并提交 REG 256；Pennsylvania 要 MV-13ST；Washington 还会检查原税款、来源州和是否交换任何价值。Florida 和 Pennsylvania 都明确提示，承接 outstanding lien / loan balance 可能让交易不再按纯 gift 处理。',
      },
      {
        question: '家人去世后，我能不能先把车卖掉再去 DMV？',
        answer:
          '不要默认可以。Georgia 明确提醒某些继承场景下继承人必须先把车 title 到自己名下再转让；New York、Pennsylvania、Virginia、New Jersey 也按 surviving spouse、heir、executor、administrator 或 estate 分不同签名规则。先确认谁有权签 title。',
      },
      {
        question: 'title 上有两个名字，其中一个人去世了，流程会简单吗？',
        answer:
          '要看 title 写法。right of survivorship、or survivor、tenants by the entireties、and/or、tenants in common 的结果不同。PennDOT、Virginia DMV、Georgia DOR 和 California DMV 都把共同车主和 survivorship 情况单独说明。',
      },
      {
        question: '车上还有贷款或 lien，可以赠与或继承过户吗？',
        answer:
          '可能会被卡住。多数州要求 lien satisfied / lien release，或让 lien 继续记录在新 title 上。New Jersey TOD 页面提醒 lien 要先处理或转到 sole owner；Texas、Florida、Georgia 等材料也把 lien release 作为 title transfer 的关键文件。',
      },
      {
        question: '车主去世后，registration 和 plate 可以继续用吗？',
        answer:
          '不要只看 title。Virginia 和 PennDOT 都把 ownership/title 与 registration / plate 分开说明。有些州允许 surviving owner 或特定亲属转 plate，有些场景需要新的 registration、保险或取消旧登记。车还要上路时，要同时查 registration 和 insurance。',
      },
    ],
    factChecks: [
      {
        claim:
          'California 将普通 title transfer、gift、family transfer、inheritance 和 deceased-owner transfer 分成不同材料路径，不能只用一张 bill of sale 处理所有情况。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/special-circumstances/handling-a-deceased-persons-dmv-matters/',
        ],
      },
      {
        claim:
          'California 赠车受让人通常要用 REG 256 声明 gift 或适用的 family transfer 事实，赠与人仍应完成卖方责任解除步骤。',
        sourceUrls: [
          'https://dmv.ca.gov/portal/file/statement-of-facts-reg-256-pdf/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
        ],
      },
      {
        claim:
          'Texas 机动车赠与 title application 必须配套 Form 14-317；只在 title 的价格栏写 gift 不能替代该州赠与申报。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
          'https://www.txdmv.gov/sites/default/files/form_files/14-317.pdf',
        ],
      },
      {
        claim:
          'Texas 在适用的无遗嘱继承场景提供 VTR-262 Affidavit of Heirship，但表格资格、签名和证明要求必须逐项满足。',
        sourceUrls: ['https://www.txdmv.gov/sites/default/files/form_files/VTR-262.pdf'],
      },
      {
        claim:
          'Washington 对 gift vehicle 仍要求单独判断 use tax；车辆被称为礼物并不自动证明整笔转移免税。',
        sourceUrls: ['https://dol.wa.gov/vehicles-and-boats/vehicles/taxes-and-fees/use-tax'],
      },
      {
        claim:
          'Florida 的一般 gift 免税规则要求转移时没有付款且新车主不承接 outstanding lien，并要在 title / registration 申请中申报适用 exemption。',
        sourceUrls: ['https://www.flhsmv.gov/pdf/proc/tl/tl-08.pdf'],
      },
      {
        claim:
          'Pennsylvania 要求赠车税务豁免使用 MV-13ST；受让人承接现有 lien 余额时，该余额属于 consideration 并可能产生 sales tax。',
        sourceUrls: [
          'https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/motor-vehicle-understated-value-program',
          'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle',
        ],
      },
      {
        claim:
          'Florida 为 surviving spouse 或适用继承人设置 HSMV 82152 等专用文件，死亡后转 title 不能直接套用普通私人出售表格。',
        sourceUrls: ['https://www.flhsmv.gov/pdf/forms/82152.pdf'],
      },
      {
        claim:
          'Pennsylvania 把 MV-13ST gift affidavit 与 deceased-owner transfer 文件分开；赠与、共同车主和死亡后转移应分别核对。',
        sourceUrls: [
          'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-13st.pdf',
          'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-fact-sheets/fs-vehtrans.pdf',
        ],
      },
      {
        claim:
          'Virginia 将 deceased owner 的 ownership transfer 和 registration transfer 分成不同业务；完成 title 变更不自动完成 plate、registration 或保险处理。',
        sourceUrls: [
          'https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership',
          'https://www.dmv.virginia.gov/records/family-deceased/transfer-registration',
        ],
      },
      {
        claim:
          'Georgia 的 estate/inheritance 路径会根据 executor、administrator、heirship affidavit 和是否已有法院文件决定谁能签字及是否应先取得新 title。',
        sourceUrls: [
          'https://dor.georgia.gov/vehicle-inherited-or-purchased-estate',
          'https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download',
        ],
      },
      {
        claim:
          'Georgia 使用 T-20 Affidavit of Inheritance，或没有 Letters of Testamentary 的继承人，必须先把车辆 title 到自己名下再出售或转让。',
        sourceUrls: [
          'https://dor.georgia.gov/vehicle-inherited-or-purchased-estate',
          'https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download',
        ],
      },
      {
        claim:
          'New Jersey 的 vehicle gift、sales-tax exemption 和 transfer-on-death beneficiary 是不同规则，申请人应分别核对 title、税务和 beneficiary 文件。',
        sourceUrls: [
          'https://www.nj.gov/mvc/vehicles/transowner.htm',
          'https://www.nj.gov/mvc/vehicletopics/taxexempt.htm',
          'https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf',
        ],
      },
      {
        claim:
          'New Jersey TOD beneficiary 要在车主死亡后连同 title、death certificate 和 title application 使用；原 title 上的 lien 要先清偿，或按规则转到 sole owner。',
        sourceUrls: [
          'https://www.nj.gov/mvc/vehicles/transowner.htm',
          'https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf',
        ],
      },
    ],
    editorNotes: [
      '这页只解释 DMV / motor vehicle agency 的 title、registration、plate 和税费入口，不提供遗产、税务、贷款或家庭纠纷法律建议。',
      '核心分叉是 gift、family transfer、deceased owner、estate/probate、TOD beneficiary、survivorship、lien、duplicate title。不要把它们写成一个通用 transfer checklist。',
      'Gift tax/use-tax 规则很容易被误解。页面要反复提醒：写 gift 不等于免税，承接 lien 或换取其他价值可能改变税务处理。',
      '死亡后转移必须强调 authority to sign。谁能签 title 是页面的主要价值点，比列费用更重要。',
      '更新时优先复查表格 PDF、death certificate 要求、notary、申请期限、title fee、tax exemption 和 plate transfer，因为这些最容易迁移或改版。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 vehicle title、registration、forms、county/tag office、tax office 和线上服务入口。',
    },
    sources: [
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'California DMV Title Transfers and Changes',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
      },
      {
        label: 'California DMV Handling a Deceased Person DMV Matters',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/new-registration/special-circumstances/handling-a-deceased-persons-dmv-matters/',
      },
      {
        label: 'California DMV Transfer on Death Beneficiary',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/transfers/transfer-on-death-tod-beneficiary/',
      },
      {
        label: 'California DMV Statement of Facts REG 256',
        url: 'https://dmv.ca.gov/portal/file/statement-of-facts-reg-256-pdf/',
      },
      {
        label: 'California DMV Replacement or Transfer of Title REG 227',
        url: 'https://dmv.ca.gov/portal/form/application-for-duplicate-or-transfer-of-title-reg-227',
      },
      {
        label: 'NY DMV Buy, Sell, or Transfer Vehicle Ownership',
        url: 'https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership',
      },
      {
        label: 'NY DMV If a Family Member Has Passed Away',
        url: 'https://dmv.ny.gov/more-info/if-a-family-member-has-passed-away',
      },
      {
        label: 'NY DMV Transfer of Ownership When Vehicle Owner is Deceased MV-843',
        url: 'https://dmv.ny.gov/forms/mv843.pdf',
      },
      {
        label: 'NY DMV Transfer of Vehicle Registered in Name of Deceased Person MV-349',
        url: 'https://dmv.ny.gov/forms/mv349.pdf',
      },
      {
        label: 'NY DMV Affidavit for Transfer of Motor Vehicle MV-349.1',
        url: 'https://dmv.ny.gov/forms/mv3491.pdf',
      },
      {
        label: 'Texas DMV Buying or Selling a Vehicle',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
      },
      {
        label: 'Texas DMV Probate and Title Transfer FAQ',
        url: 'https://www.txdmv.gov/faqs?field_faq_category_target_id=All&find=probate',
      },
      {
        label: 'Texas DMV Affidavit of Heirship for a Motor Vehicle VTR-262',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-262.pdf',
      },
      {
        label: 'Texas DMV Affidavit of Motor Vehicle Gift Transfer 14-317',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/14-317.pdf',
      },
      {
        label: 'Texas DMV Beneficiary Designation for a Motor Vehicle VTR-121',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-121.pdf',
      },
      {
        label: 'Texas DMV County Tax Offices',
        url: 'https://www.txdmv.gov/tax-assessor-collectors/county-tax-offices',
      },
      {
        label: 'Washington DOL Buy and Register a Vehicle',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle',
      },
      {
        label: 'Washington DOL Use Tax',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/taxes-and-fees/use-tax',
      },
      {
        label: 'Washington DOL Affidavit of Loss or Release of Interest',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/affidavit-lossrelease-interest',
      },
      {
        label: 'Washington DOL Affidavit of Inheritance or Litigation',
        url: 'https://dol.wa.gov/forms/view/420041/download?inline=',
      },
      {
        label: 'Washington DOL Vehicle Title Application',
        url: 'https://dol.wa.gov/forms/view/420001/download?inline=',
      },
      {
        label: 'FLHSMV Liens and Titles',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/',
      },
      {
        label: 'FLHSMV Liens and Titles FAQ',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/liens-and-titles/faqs/',
      },
      {
        label: 'FLHSMV Application for Certificate of Motor Vehicle Title HSMV 82040',
        url: 'https://www.flhsmv.gov/pdf/forms/82040.pdf',
      },
      {
        label: 'FLHSMV Surviving Spouse Transfer of Title HSMV 82152',
        url: 'https://www.flhsmv.gov/pdf/forms/82152.pdf',
      },
      {
        label: 'FLHSMV Sales and Use Tax Transfer Procedure TL-08',
        url: 'https://www.flhsmv.gov/pdf/proc/tl/tl-08.pdf',
      },
      {
        label: 'FLHSMV Notice of Sale and Bill of Sale HSMV 82050',
        url: 'https://www.flhsmv.gov/pdf/forms/82050.pdf',
      },
      {
        label: 'PennDOT Buying or Selling a Vehicle',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle',
      },
      {
        label: 'PennDOT Vehicle Transfer after Death of Owner Fact Sheet',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-fact-sheets/fs-vehtrans.pdf',
      },
      {
        label: 'PennDOT MV-39 Notification of Assignment or Correction upon Death',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-39.pdf',
      },
      {
        label: 'PennDOT MV-13ST Affidavit of Gift',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-13st.pdf',
      },
      {
        label: 'Pennsylvania Revenue Motor Vehicle Understated Value Program',
        url: 'https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/motor-vehicle-understated-value-program',
      },
      {
        label: 'Virginia DMV Transfer Vehicle Ownership after Death',
        url: 'https://www.dmv.virginia.gov/records/family-deceased/transfer-ownership',
      },
      {
        label: 'Virginia DMV Transfer Vehicle Registration after Death',
        url: 'https://www.dmv.virginia.gov/records/family-deceased/transfer-registration',
      },
      {
        label: 'Virginia DMV Designate a Beneficiary on a Vehicle Title',
        url: 'https://www.dmv.virginia.gov/vehicles/title/designative-beneficiary',
      },
      {
        label: 'Virginia DMV Guide for Family Members and Friends of the Recently Deceased',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/dmv105.pdf',
      },
      {
        label: 'Virginia DMV Certification of Authority to Transfer Virginia Title VSA 24',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/vsa24.pdf',
      },
      {
        label: 'NJ MVC Transferring Vehicle Ownership',
        url: 'https://www.nj.gov/mvc/vehicles/transowner.htm',
      },
      {
        label: 'NJ MVC Vehicles Exempt from Sales Tax',
        url: 'https://www.nj.gov/mvc/vehicletopics/taxexempt.htm',
      },
      {
        label: 'NJ MVC Transfer on Death Beneficiary Form',
        url: 'https://www.nj.gov/mvc/pdf/vehicles/beneficiary_transfer_form.pdf',
      },
      {
        label: 'NJ MVC Frequently Asked Questions',
        url: 'https://nj.gov/mvc/about/faq.htm',
      },
      {
        label: 'Mass.gov Surviving Spouse Heirship Inheritance',
        url: 'https://www.mass.gov/info-details/surviving-spouseheirshipinheritance',
      },
      {
        label: 'Mass.gov Family Gift Transfers',
        url: 'https://www.mass.gov/info-details/familygift-transfers',
      },
      {
        label: 'Mass.gov Affidavit of Surviving Spouse',
        url: 'https://www.mass.gov/doc/affidavit-of-surviving-spouse/download',
      },
      {
        label: 'Massachusetts DOR Form MVU-26 Family Transfer Exemption',
        url: 'https://www.mass.gov/doc/form-mvu-26-affidavit-in-support-of-a-claim-for-exemption-from-sales-or-use-tax-for-a-motor-vehicle-transferred-within-a-family/download',
      },
      {
        label: 'Georgia DOR Transfer Ownership of a Vehicle',
        url: 'https://dor.georgia.gov/how-do-i-transfer-ownership-vehicle',
      },
      {
        label: 'Georgia DOR Vehicle Inherited or Purchased from an Estate',
        url: 'https://dor.georgia.gov/vehicle-inherited-or-purchased-estate',
      },
      {
        label: 'Georgia DOR Transfer Vehicle Titled in Georgia',
        url: 'https://dor.georgia.gov/transfer-vehicle-titled-georgia',
      },
      {
        label: 'Georgia DOR Affidavit of Inheritance T-20',
        url: 'https://dor.georgia.gov/document/form/form-t-20-affidavit-inheritance/download',
      },
      {
        label: 'Georgia DOR Joint Ownership or Joint Tenants',
        url: 'https://dor.georgia.gov/title-application-disclosing-joint-ownership-or-joint-tenants',
      },
      {
        label: 'Georgia DOR Motor Vehicle Title Tag Application MV-1',
        url: 'https://dor.georgia.gov/mv-1-dor-motor-vehicle-titletag-application',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'washington',
      'florida',
      'pennsylvania',
      'virginia',
      'new-jersey',
      'massachusetts',
      'georgia',
    ],
  },
  {
    slug: 'disabled-parking-placard-plates',
    title: '残疾人停车 placard、disabled plates 和临时停车证怎么申请',
    eyebrow: '残疾停车牌',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '在美国申请残疾人停车 placard、disabled parking permit、disabled plates 或临时停车证时，先分清 permanent、temporary、license plate、local permit、disabled veteran plate 和跨州使用规则，再按州官方要求准备材料。',
    whoNeedsIt: [
      '本人、家人或 dependent 因行动能力、视力、临时伤病或长期医疗状况，需要申请 disabled parking placard / permit 的人。',
      '有车但不确定应该申请可移动 placard、disabled license plate、parking tab，还是只办 temporary permit 的人。',
      '准备帮父母、孩子、照护对象或机构车辆申请停车证，不确定谁签名、谁认证、车主是谁的人。',
      '已经有外州 placard、disabled veteran plate 或临时停车证，准备搬州、旅行、换车、续期或补证的人。',
      '收到罚单、被怀疑 misuse，或不清楚 metered parking、access aisle、红黄白 curb、校园/机场/市区规则的人。',
    ],
    keyFacts: [
      'Placard / permit 通常跟随符合资格的人，不是随便借给某辆车。California DMV、Washington DOL 和 PennDOT 都强调，停车特权只能在符合资格的人本人或 dependent 被运送时使用。',
      'Disabled plate / tab 通常和车辆登记绑定。California 要求 DP plates 所在车辆登记在申请人名下或同时办理登记；New York 也说明 disability plates 只发给登记在残疾人名下的车辆；Washington plates/tabs 要求申请人是登记车主。',
      'Permanent 和 temporary 不是同一张证。California permanent placard 两年一轮，temporary 最长按医疗证明期限；Florida permanent permit / plate 为四年，temporary 最多六个月；Washington temporary placard 可按医生注明最长一年。',
      '医疗证明规则州别化。多数州要求 physician、nurse practitioner、optometrist 或其他合格 medical provider 完成认证；有些州允许特定情况免重新认证，或允许处方/letterhead 替代固定表格。',
      'New York 是典型分工例子：parking permit 通常由 city / town / village clerk 这类 local government 发，DMV 不发停车 permit；但 disability license plates 由 DMV 办。',
      '跨州能否使用一般比本地免费停车规则更复杂。New York 说 plates / permit 可在纽约和多数其他州使用，PennDOT 说宾州 placard / plate 在 50 州通用；但 meter 免费、时间限制、resident permit、NYC curbside、市区、机场、校园和私人停车场规则仍要看所在地标志和地方机构。',
      '旅行时承认外州 placard，不等于搬州后可以直接换证。New York 明确要求新搬入者按本州规则重新提交 disability proof，外州 permit 不能直接交换成 New York permit 或 plates。',
      '不要把 disabled veteran plate 自动当作 disabled parking privilege。Texas DMV 明确说明，没有 International Symbol of Access 的 DV plate 不能停 disabled parking space；想使用 disabled space，需要符合 disabled placard 或带 ISA 的 plate 要求。',
      'Access aisle 不是停车位。California 明确禁止停在带斜线的 access aisle；ADA.gov 也把 accessible parking space 和 access aisle 作为不同设计要素说明。',
      '滥用或虚假申请可能有明确处罚。Texas 对 placard misuse 可处最高 1,250 美元罚款和/或最多 50 小时 community service；New York 对虚假 permit 申请可按 misdemeanor 处理，并列有 250 至 1,000 美元罚款及可能的额外民事处罚。',
      '申请入口可能是 DMV、county tax office、vehicle licensing office、local clerk 或 online portal。Texas placard / plate 走 county tax assessor-collector；Washington 走 vehicle licensing office 或邮寄；Pennsylvania 可在线续期/换证；Florida 多由 tax collector / license plate agency 办。',
    ],
    checklist: [
      '确认申请对象：本人、dependent / minor child、照护对象、组织车辆，还是 disabled veteran plate / ISA plate。',
      '确认产品类型：permanent placard、temporary placard、travel placard、disabled plate、parking tab、wheelchair plate、local city permit 或 replacement。',
      '准备身份证明、现有 driver license / ID、车辆 registration、current plates、车主姓名、mailing address 和联系方式。',
      '下载本州官方表格，并确认是否需要 medical provider certification、prescription、letterhead statement、police officer verification 或 disabled veteran eligibility 文件。',
      '如果申请 license plate / tab，先确认车辆是否登记在符合资格的人名下，是否要 surrender current plates，是否要付普通 registration / plate 费用。',
      '如果是 temporary permit，确认医生写的期限、续办次数、费用，以及过期后是否要交回 placard。',
      '如果是搬州或旅行，先查目的州是否承认外州 placard，以及当地 meter、curb、airport、campus、private lot 和 residential permit 规则。',
      '申请后保存表格副本、收据、mailing proof、online confirmation、placard number、ID card 或 enforcement card；丢失、被盗或损坏时用这些信息补证。',
    ],
    steps: [
      '第一步：先分清你要的是可挂在不同车上的 placard，还是固定在自己车辆上的 disabled plate / tab。照护者经常更适合 placard；本人长期驾驶同一辆车才更可能考虑 plate。',
      '第二步：打开本州官方 disabled parking 页面，确认承办机构。不要默认都是 DMV；New York permit 通常找 local clerk，Texas 找 county tax office，Washington 找 vehicle licensing office。',
      '第三步：下载官方表格，让合格 medical provider 按州要求填写。不要只拿诊断截图、医院账单或中文病历替代表格，除非州页面明确接受 provider statement 或 prescription。',
      '第四步：按产品类型补齐车辆材料。申请 plate / tab 时核对车辆登记姓名、现有车牌、普通 registration fee、plate fee 和 surrender plate 要求；只申请 placard 时通常不需要把某辆车固定绑定。',
      '第五步：提交申请并记录处理方式：online、mail、office、tax collector、county office 或 local clerk。邮寄时保留副本；线上提交时保存 confirmation。',
      '第六步：拿到 placard / plate 后，单独读本州“where to park / privileges / limitations”页面。不要把蓝色 wheelchair sign 当作万能通行证，红 curb、access aisle、fire lane、no parking、private lot 和 local meter 规则仍然可能限制停车。',
      '第七步：续期、补证、地址变更或换车时回到原州官方入口。搬州后不要只依赖旧州 placard；看新州是否要求重新申请、重新医疗认证或更换 plate / tab。',
    ],
    faqs: [
      {
        question: 'placard 和 disabled license plate 怎么选？',
        answer:
          'Placard 通常可以跟着符合资格的人在不同车辆之间使用，适合照护者、家人接送或不固定坐同一辆车的情况。Disabled plate / tab 通常固定在某辆登记车辆上，适合符合资格的人长期使用自己的车。申请 plate 前一定要看本州是否要求车辆登记在本人名下。',
      },
      {
        question: '外州 placard 到另一个州能用吗？',
        answer:
          '很多州承认外州 disabled parking placard 或 plate，但本地 parking privileges 不一定完全一样。比如 meter 是否免费、能否停 resident / merchant permit 区、NYC 街边规则、机场和校园规则，都可能由当地政府或停车场另行规定。旅行前查目的州 DMV 和当地停车规则最稳妥。',
      },
      {
        question: '家人可以拿我的 placard 自己去停车吗？',
        answer:
          '不可以。官方页面普遍把 misuse 写得很重：只有符合资格的人本人或 dependent 在车上、正在被接送时，placard / plate 才能提供 disabled parking privilege。把 placard 借给别人、使用别人的 placard、伪造医生签名或提交虚假信息，可能导致罚款、吊销或执法处理。',
      },
      {
        question: '临时伤病、手术恢复或怀孕相关行动不便可以办 temporary permit 吗？',
        answer:
          '可能可以，但要看州定义和 medical provider 认证。Temporary permit 通常针对短期 mobility impairment，并有明确有效期和续办限制。不要按症状自己判断资格；让本州认可的 provider 按官方表格或处方说明期限。',
      },
      {
        question: 'disabled veteran plate 可以直接停残疾人车位吗？',
        answer:
          '不要默认可以。Texas DMV 明确区分普通 DV plate 和带 International Symbol of Access 的 disabled parking privilege。各州退伍军人车牌、免 registration fee 和 disabled parking space 权限可能是不同事项；看本州 DV plate 页面和 ISA 标志要求。',
      },
    ],
    factChecks: [
      {
        claim:
          'Disabled placard 或带 ISA 的 plate 只能在符合资格的人本人使用或正在被接送时提供停车特权，不能借给家人单独使用。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/',
          'https://www.txdmv.gov/motorists/disabled-parking-placards-plates',
          'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/using-disabled-parking',
        ],
      },
      {
        claim:
          'Disabled license plate 或 tab 通常绑定符合资格者名下的登记车辆；New York、California 和 Washington 都把 plate/tab 申请与车辆 owner/registration 条件联系起来。',
        sourceUrls: [
          'https://dmv.ny.gov/parking-for-people-with-disabilities-the-law',
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/',
          'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits',
        ],
      },
      {
        claim:
          'Texas 普通 Disabled Veteran plate 若没有 International Symbol of Access，不授权停 disabled space；需要 placard 或带 ISA 的合格 plate。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/disabled-parking-placards-plates',
          'https://www.txdmv.gov/sites/default/files/form_files/VTR-615.pdf',
        ],
      },
      {
        claim:
          'New York parking permit 通常由 city、town 或 village 的 local issuing agent 签发，DMV 签发的是 disability license plates，不直接发 local permit。',
        sourceUrls: [
          'https://dmv.ny.gov/more-info/parking-for-people-with-disabilities',
          'https://dmv.ny.gov/forms/mv6641.pdf',
        ],
      },
      {
        claim:
          'Texas temporary placard 为红色且最长 6 个月，permanent placard 为蓝色并按 4 年周期续办。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/disabled-parking-placards-plates',
          'https://www.txdmv.gov/sites/default/files/body-files/Disabled-Persons-Placard-Brochure.pdf',
        ],
      },
      {
        claim:
          'Florida permanent disabled parking permit 与 temporary permit 是不同产品；temporary permit 的有效期按医疗证明且最长 6 个月。',
        sourceUrls: [
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/permanent-disabled-person-parking-permits/',
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/temporary-disabled-person-parking-permits/',
        ],
      },
      {
        claim:
          '申请资格通常需要州认可的 medical provider 在官方表格、处方或合格 letterhead statement 上认证，医院账单本身不能替代。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/uploads/2020/12/reg195.pdf',
          'https://dmv.ny.gov/forms/mv6641.pdf',
          'https://www.txdmv.gov/sites/default/files/form_files/VTR-214.pdf',
        ],
      },
      {
        claim:
          '外州 placard 常可获得 reciprocal recognition，但 meter、time limit、airport、campus 和 local permit 特权仍由目的地规则决定。',
        sourceUrls: [
          'https://dmv.ny.gov/parking-for-people-with-disabilities-the-law',
          'https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/placard-faqs',
        ],
      },
      {
        claim:
          '搬到 New York 后不能把外州 permit 直接交换成本州 permit 或 plates；申请人仍要按 New York 规则重新提交 disability proof。',
        sourceUrls: ['https://dmv.ny.gov/parking-for-people-with-disabilities-the-law'],
      },
      {
        claim:
          'Access aisle 或斜线区域不是额外停车位；它用于轮椅和无障碍设备进出，即使持有 placard 也不能占用。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/',
          'https://www.ada.gov/resources/restriping-parking-spaces/',
        ],
      },
      {
        claim:
          'Washington temporary disabled parking placard 的期限由医疗人员注明，自注明日期起最长一年；到期后必须交回 vehicle licensing office 或邮寄退回。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits',
          'https://dol.wa.gov/forms/view/420073/download?inline=',
        ],
      },
      {
        claim:
          'Texas 对 disabled parking placard misuse 可处最高 1,250 美元罚款和/或最多 50 小时 community service；New York 对虚假 permit 申请列有 misdemeanor、250 至 1,000 美元罚款及可能的额外民事处罚。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/disabled-parking-placards-plates',
          'https://dmv.ny.gov/parking-for-people-with-disabilities-the-law',
        ],
      },
    ],
    editorNotes: [
      '这页不判断个人是否符合残疾资格，只解释 DMV / 州机构流程。资格、医疗认证和执法解释必须回到州官方表格和当地规则。',
      '把 placard、permit、plate、tab、wheelchair plate、DV plate 和 NYC / local permit 分开写，避免中文用户把所有“残疾停车牌”混成一个东西。',
      '跨州使用要谨慎：承认外州 placard 不等于所有 meter、time limit、resident permit、campus、airport 或 private lot 都免费或无限时。',
      '不要把 ADA parking-space design 误写成个人申请资格。ADA.gov 适合说明 access aisle、van-accessible space 和设施义务；个人 placard 申请仍看州 DMV / motor vehicle agency。',
      '更新这页时优先复查表格 PDF、费用、有效期、renewal 入口和 misuse wording，因为这些最容易迁移或改版。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、vehicle registration、license plates、forms、office 和 online services 官方入口。',
    },
    sources: [
      {
        label: 'California DMV Disabled Person Parking Placards & Plates',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/disabled-person-parking-placards-plates/',
      },
      {
        label: 'California DMV Disabled Person Parking Placard Form Application',
        url: 'https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-application/',
      },
      {
        label: 'California DMV Disabled Person Parking Placard Renewal',
        url: 'https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-renewal/',
      },
      {
        label: 'California DMV Disabled Person Parking Placard Replacement',
        url: 'https://www.dmv.ca.gov/portal/dmv-virtual-office/dpp-replacement/',
      },
      {
        label: 'California DMV REG 195 Disabled Person Placard or Plates PDF',
        url: 'https://www.dmv.ca.gov/portal/uploads/2020/12/reg195.pdf',
      },
      {
        label: 'NY DMV Parking for People with Disabilities',
        url: 'https://dmv.ny.gov/more-info/parking-for-people-with-disabilities',
      },
      {
        label: 'NY DMV Parking for People with Disabilities: The Law',
        url: 'https://dmv.ny.gov/parking-for-people-with-disabilities-the-law',
      },
      {
        label: 'NY DMV MV-664.1 Parking Permit or License Plates PDF',
        url: 'https://dmv.ny.gov/forms/mv6641.pdf',
      },
      {
        label: 'Texas DMV Disabled Parking Placards & Plates',
        url: 'https://www.txdmv.gov/motorists/disabled-parking-placards-plates',
      },
      {
        label: 'Texas DMV VTR-214 Persons with Disabilities Parking Placard and License Plate PDF',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-214.pdf',
      },
      {
        label: 'Texas DMV Disabled Persons Placard Brochure PDF',
        url: 'https://www.txdmv.gov/sites/default/files/body-files/Disabled-Persons-Placard-Brochure.pdf',
      },
      {
        label: 'Texas DMV VTR-615 Disabled Veteran License Plates and Parking Placards PDF',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-615.pdf',
      },
      {
        label: 'FLHSMV Disabled Person Parking Permits',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/',
      },
      {
        label: 'FLHSMV Permanent Disabled Person Parking Permits',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/permanent-disabled-person-parking-permits/',
      },
      {
        label: 'FLHSMV Temporary Disabled Person Parking Permits',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/temporary-disabled-person-parking-permits/',
      },
      {
        label: 'FLHSMV Disabled Person Parking Permits for Florida Visitors',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/disabled-person-parking-permits-for-florida-visitors/',
      },
      {
        label: 'FLHSMV Wheelchair License Plate',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/wheelchair-license-plate/',
      },
      {
        label: 'FLHSMV Disabled Person Parking Permit FAQs',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/disabled-person-parking-permits/frequently-asked-questions/',
      },
      {
        label: 'FLHSMV HSMV 83039 Disabled Person Parking Permit PDF',
        url: 'https://www.flhsmv.gov/pdf/forms/83039.pdf',
      },
      {
        label: 'PennDOT Apply for or Renew a Persons with Disability Parking Placard',
        url: 'https://www.pa.gov/services/dmv/apply-for-or-renew-a-persons-with-disability-parking-placard',
      },
      {
        label: 'PennDOT Persons with Disabilities Placards and Plates',
        url: 'https://www.pa.gov/agencies/dmv/resources/persons-with-disabilities-placards-plates',
      },
      {
        label: 'PennDOT Placard FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/placard-faqs',
      },
      {
        label: 'PennDOT MV-145A Persons with Disability Parking Placard Application PDF',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-145a.pdf',
      },
      {
        label: 'Mass.gov Apply for a Disability Placard or License Plate',
        url: 'https://www.mass.gov/how-to/apply-for-a-disability-placard-or-license-plate',
      },
      {
        label: 'Mass.gov Disability Plates and Placards',
        url: 'https://www.mass.gov/disability-plates-and-placards',
      },
      {
        label: 'Mass.gov Eligibility for Disability Plates and Placards',
        url: 'https://www.mass.gov/info-details/eligibility-for-disability-plates-and-placards',
      },
      {
        label: 'Mass.gov Renew Your Temporary Disability Placard',
        url: 'https://www.mass.gov/how-to/renew-your-temporary-disability-placard',
      },
      {
        label: 'Mass.gov Replace Your Disability Placard',
        url: 'https://www.mass.gov/how-to/replace-your-disability-placard',
      },
      {
        label: 'Mass.gov Report Disability Parking Abuse',
        url: 'https://www.mass.gov/how-to/report-disability-parking-abuse',
      },
      {
        label: 'Mass.gov Application for Disabled Parking PDF',
        url: 'https://www.mass.gov/doc/application-for-disabled-parking/download',
      },
      {
        label: 'Washington DOL Get or Renew Disabled Parking Permits',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits',
      },
      {
        label: 'Washington DOL Disabled Parking Eligibility',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/disabled-parking-eligibility',
      },
      {
        label: 'Washington DOL Using Disabled Parking',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/get-or-renew-disabled-parking-permits/using-disabled-parking',
      },
      {
        label: 'Washington DOL Disabled Parking Application for Individuals PDF',
        url: 'https://dol.wa.gov/forms/view/420073/download?inline=',
      },
      {
        label: 'Washington DOL Disabled Parking Replacement PDF',
        url: 'https://dol.wa.gov/forms/view/420076/download?inline=',
      },
      {
        label: 'Virginia DMV Disability Programs',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability',
      },
      {
        label: 'Virginia DMV Apply for a Disabled Parking Placard or License Plate',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability/apply-assist',
      },
      {
        label: 'Virginia DMV Disabled Parking Plates Assistance',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability/plates-assist',
      },
      {
        label: 'Virginia DMV Renew or Replace a Disabled Parking Placard or License Plate',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability/renewal',
      },
      {
        label: 'Virginia DMV Disabled Parking Placards and Plates Privileges',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability/rights',
      },
      {
        label: 'Virginia DMV Description of Parking Placards and Plates',
        url: 'https://www.dmv.virginia.gov/licenses-ids/disability/descrip',
      },
      {
        label: 'Virginia DMV MED 10 Disabled Parking Placard or License Plates Application PDF',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/med10.pdf',
      },
      {
        label: 'ADA.gov Restriping Parking Spaces',
        url: 'https://www.ada.gov/resources/restriping-parking-spaces/',
      },
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'pennsylvania',
      'massachusetts',
      'washington',
      'virginia',
    ],
  },
  {
    slug: 'vehicle-title-registration-insurance-after-move',
    title: '买车或搬州后，车辆 title、registration、保险和车牌先办哪个',
    eyebrow: '车辆登记',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      'DMV 不只管驾照。买车、搬州或从外州带车时，title、registration、insurance、inspection / emissions、license plates 和 driver license 可能互相卡住，办理顺序需要按州和交易类型确认。',
    whoNeedsIt: [
      '刚搬到新州并把外州车辆一起带来的人。',
      '在美国第一次买车，分不清 title、registration、plate 和 insurance 的人。',
      '从私人卖家买二手车、从 dealer 买车，或准备把车转到自己名下的人。',
      '已经换了驾照地址，但车牌、登记、保险或旧州退牌还没处理的人。',
    ],
    keyFacts: [
      'Driver license、vehicle title、vehicle registration 和 license plate 是不同事项，可能由同一 DMV 管，也可能由税务官、县办公室或车辆 licensing office 承办。',
      'Title 主要证明车辆所有权；registration 和 plate 让车辆可以在路上合法行驶；insurance / inspection / emissions 往往是登记前置条件。',
      '搬州后，驾照转换期限和车辆 title / registration 期限可能不同。Florida 例子里新居民驾照和车辆 title / registration 就是不同天数。',
      'Dealer 买车和私人交易流程不同。Dealer 可能代办 title / registration，私人交易通常要买卖双方签 title，并由买方在规定时间内去 DMV / county 完成转移。',
      '旧州车牌、旧州保险、旧州 registration 不能随便丢。部分州要求退牌、取消登记或先确认新州保险生效，避免罚款或保险断档。',
      '路考车辆、搬州车辆和刚买车辆都要看合法上路状态；有效 registration、insurance、inspection 和设备检查可能影响考试或上路。',
    ],
    checklist: [
      '确认场景：刚搬州、dealer 买车、私人买车、继承/赠与、外州 title 转入，还是只是地址变化。',
      '找出承办机构：DMV、MVC、RMV、county tax office、tag office、vehicle licensing office 或 license plate agency。',
      '准备所有权文件：signed title、bill of sale、lien release、dealer documents、out-of-state title 或 registration。',
      '准备保险文件，并确认新州是否要求先买本州保险才能登记车辆。',
      '查 inspection / emissions / VIN verification 要求，确认是登记前、登记后还是续期前完成。',
      '确认车牌处理：新牌照、临时牌照、转移旧牌照、退旧州牌照、保留个性牌照或取消旧登记。',
      '核对期限、税费和付款方式；title fee、registration fee、sales tax / use tax、plate fee 和 county fee 可能分开收。',
    ],
    steps: [
      '第一步：先看新州或购买州的 vehicle title / registration 页面，不要只看 driver license 页面。',
      '第二步：如果是搬州，先按 new resident 页面确认驾照、车辆登记、保险、车检和旧州车牌的顺序。',
      '第三步：如果是 dealer 买车，确认 dealer 是否代办 title / registration、临时牌照多久有效、实体牌照或 registration 何时到。',
      '第四步：如果是私人交易，现场核对 title 是否可签、VIN 是否一致、是否有 lien、卖家签名和里程表信息是否完整。',
      '第五步：在去 DMV / county 前买好符合新州要求的保险，并查是否需要 inspection、emissions、VIN check 或 safety check。',
      '第六步：拿到新州 registration / plate 后，再处理旧州 plate return、registration cancellation 和保险更新，保存收据或确认号。',
    ],
    faqs: [
      {
        question: '搬到新州后，是先换驾照还是先注册车？',
        answer:
          '没有全国统一顺序。很多州的新居民页面会同时列出驾照和车辆事项，但期限、保险、车检和 title 文件不同。最稳妥是先看新州 new resident 页面，再按保险和车辆文件倒排。',
      },
      {
        question: 'title 和 registration 有什么区别？',
        answer:
          'title 更接近“谁拥有这辆车”的所有权文件；registration 是“这辆车当前获准在路上行驶”的登记。买车后通常要处理 title transfer，同时办理或更新 registration / plates。',
      },
      {
        question: 'dealer 说他们会代办，我还需要查 DMV 吗？',
        answer:
          '需要。Dealer 代办不代表你不用确认临时牌照有效期、保险生效日期、registration 邮寄时间、费用和旧州车牌处理。跨州买车尤其要看买车州和居住州规则。',
      },
      {
        question: '私人买车只签 bill of sale 可以吗？',
        answer:
          '通常不够。很多州要求 signed title、里程表信息、lien release、保险、税费和登记申请。Bill of sale 可能是补充文件，不一定能替代 title。',
      },
      {
        question: '旧州车牌可以直接扔掉吗？',
        answer:
          '不要这么做。有些州要求退牌或取消登记，保险公司也可能要求先处理 plate / registration，避免罚款、税费或保险责任问题。按旧州 DMV 规则保存退牌或取消确认。',
      },
    ],
    factChecks: [
      {
        claim:
          'Vehicle title 记录所有权，registration 和 plate 记录车辆当前上路登记；California 把 title transfer 与 vehicle registration 作为不同业务入口。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
        ],
      },
      {
        claim:
          'Florida 新居民应先取得由 Florida licensed agent 提供的州内保险，并在建立 residency 后 10 天内 title/register 车辆；驾照期限为 30 天。',
        sourceUrls: ['https://www.flhsmv.gov/new-resident/'],
      },
      {
        claim:
          'New Jersey 新居民必须在搬入后 60 天内，或在原 license/registration 更早到期前，完成驾照及车辆 title/registration 转入。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/movetonj.htm'],
      },
      {
        claim:
          'Washington 新居民有 30 天办理州驾照和车辆登记，并且通常要先取得 Washington driver license 才能注册车辆。',
        sourceUrls: [
          'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
        ],
      },
      {
        claim:
          'Massachusetts 对成为居民后的外州车辆转入不提供 grace period，并要求由 Massachusetts insurer 在 Registration and Title Application 上完成保险确认。',
        sourceUrls: [
          'https://www.mass.gov/how-to/transfer-your-registration-and-title-from-out-of-state',
        ],
      },
      {
        claim:
          'New Jersey dealer 通常代办本州购车的 title/registration；private sale 或外州转入则由车主准备 title、保险和 BA-49 等材料到 MVC 办理。',
        sourceUrls: ['https://www.nj.gov/mvc/vehicles/reginitial.htm'],
      },
      {
        claim:
          'New York 的 register-and-title 路径会同时核对 ownership、identity、insurance、tax 和 registration 文件，bill of sale 本身通常不足以完成业务。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/register-and-title-a-vehicle',
          'https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership',
        ],
      },
      {
        claim:
          'Texas 私人交易要求正确签署 title、核对 lien 和 odometer，并由买方按 county tax office 流程申请 title 和 registration。',
        sourceUrls: [
          'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
          'https://www.txdmv.gov/motorists/register-your-vehicle',
        ],
      },
      {
        claim:
          'New Jersey 搬州车辆若 title 由 lienholder 或 leasing company 持有，需要先提交 release/title request，收到通知后才能完成转入。',
        sourceUrls: ['https://www.nj.gov/mvc/drivertopics/movetonj.htm'],
      },
      {
        claim:
          'Pennsylvania 私人车辆转让由 authorized PennDOT agent 处理 title 和 registration，并会分别核对所有权签字、保险、税费及 plate 事项。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle',
        ],
      },
    ],
    editorNotes: [
      '这页把车辆 title / registration 与 driver license 分开，避免用户以为换了驾照地址就完成车辆登记。',
      '跨州车辆问题必须承认州别差异：Florida、NJ、NY、TX、WA、PA、NC、MA、VA 等页面的承办机构、期限和检查顺序都不完全相同。',
      'Dealer 与 private party 是两个核心分叉。中文页不要把 dealer 代办流程套到私人交易。',
      '保险、inspection / emissions、VIN verification 和 plate return 是车辆登记页的高风险细节，应比“去 DMV 注册车”写得更具体。',
      '这页不是车辆买卖法律建议，也不替代税务、贷款、lien 或保险合同判断。',
    ],
    relatedDirectory: {
      label: '查看搬到新州后 DMV 办事入口表',
      href: '/directories/new-residents/',
      description: '按州查新居民、外州驾照转入、地址更新和车辆登记顺序入口。',
    },
    sources: [
      {
        label: 'California DMV Vehicle Registration',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/',
      },
      {
        label: 'California DMV Title Transfers and Changes',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
      },
      {
        label: 'NY DMV Register and Title a Vehicle',
        url: 'https://dmv.ny.gov/registration/register-and-title-a-vehicle',
      },
      {
        label: 'NY DMV Buy, Sell, or Transfer Vehicle Ownership',
        url: 'https://dmv.ny.gov/titles/buy-sell-or-transfer-vehicle-ownership',
      },
      {
        label: 'FLHSMV New Resident',
        url: 'https://www.flhsmv.gov/new-resident/',
      },
      {
        label: 'NJ MVC Moving To New Jersey',
        url: 'https://www.nj.gov/mvc/drivertopics/movetonj.htm',
      },
      {
        label: 'NJ MVC Vehicle Registration',
        url: 'https://www.nj.gov/mvc/vehicles/reginitial.htm',
      },
      {
        label: 'Texas DMV Buying or Selling a Vehicle',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
      },
      {
        label: 'Texas DMV Vehicle Registration',
        url: 'https://www.txdmv.gov/motorists/register-your-vehicle',
      },
      {
        label: 'Washington DOL Moving to Washington: Vehicles',
        url: 'https://dol.wa.gov/moving-washington/vehicle-registration-and-plates',
      },
      {
        label: 'PennDOT Buying or Selling a Vehicle',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/buying-or-selling-a-vehicle',
      },
      {
        label: 'NCDMV Title and Registration',
        url: 'https://www.ncdot.gov/dmv/title-registration/Pages/default.aspx',
      },
      {
        label: 'Massachusetts RMV Transfer your registration and title',
        url: 'https://www.mass.gov/how-to/transfer-your-registration-and-title-from-out-of-state',
      },
      {
        label: 'Virginia DMV Titling a Vehicle',
        url: 'https://www.dmv.virginia.gov/vehicles/title',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'new-jersey',
      'texas',
      'washington',
      'pennsylvania',
      'north-carolina',
      'massachusetts',
      'virginia',
    ],
  },
  {
    slug: 'vehicle-registration-renewal-expired-tags-non-operation',
    title: '车辆 registration 续期：过期、车检和停驶',
    eyebrow: '车辆登记续期',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '车牌 sticker / decal / tab 快过期、registration 已过期、没收到 renewal notice、线上续不了，或车辆准备长期停驶时，先确认登记州和准确截止日，再处理地址、保险、inspection / emissions、税费或 hold，最后选择 renewal、重新登记、补 sticker，还是本州认可的 non-operation / plate deactivation 路径。',
    whoNeedsIt: [
      '车辆 registration、plate sticker、decal 或 tabs 快到期或已经 expired，不确定还能不能线上续的人。',
      '没有收到 renewal notice、刚搬家、旧地址仍在 DMV 记录里，担心错过续期的人。',
      '线上系统提示 insurance、smog / emissions、inspection、tax、toll、parking、suspension 或 registration stop，无法完成 renewal 的人。',
      '已经付款但没收到新的 registration card / sticker，或只拿到 receipt / temporary registration，不确定现在能不能合法上路的人。',
      '车辆长期不开、存放维修、人在外州或准备取消保险，想知道能否只让 registration 自然过期的人。',
    ],
    keyFacts: [
      'Vehicle registration renewal 和 driver license renewal 是两件事。Title 证明所有权，registration / plate 关联车辆上路资格；驾照没过期，不代表车辆 registration 仍有效。',
      '美国没有统一的 registration 周期或全国宽限期。California 明确没有 grace period；North Carolina 有 15 天 “valid through” 规则但过期日后付款仍收 late fee；Texas 和 New York 又使用不同的过期续期窗口。',
      '没收到 renewal notice 通常不会暂停截止日。Georgia 明确提醒即使没收到 notice，错过 renewal period 仍可能有 penalty；New York、Texas 和 North Carolina 都提供不用 notice 也能查找或续期的材料路径。',
      '先核对 registration card 上的准确到期日，不要只看 plate 上的月份。California 提醒 registration 在具体日期到期；Washington License Express 也会显示 month、day 和 year。',
      '搬家后要先处理 vehicle record 地址。California 要求 online renewal 前至少提前 3 天改地址；Georgia 要先更新 Georgia license / ID 再改 registration；Washington 和 Virginia 也要求保持 mailing / vehicle address 正确。',
      '保险是常见前置条件。California online renewal 依赖 insurer electronic report；Florida 无法验证 valid insurance 就不发 registration；Massachusetts、Virginia 和 North Carolina 也要求有效或持续的 liability coverage。',
      'Inspection / emissions 不是全国统一，但可能直接挡住 renewal。New York 要求近 12 个月 inspection 记录；Texas 部分县仍要 emissions；Georgia 按县；North Carolina 通常要求在续期前 90 天内完成 safety 或 emissions inspection。',
      '付了钱不一定代表 renewal 已完成。California 明确说明，即使已交 renewal fees，缺 smog 或仍有 parking citation，registration 也不会完成；用于避免 late penalty 的付款 receipt 也不一定授权上路。',
      'Online renewal 被拒，不代表只能重新注册。先读 reason：insurance / inspection 记录未同步、需要纸质文件、地址、vehicle class、tax、toll、parking 或 suspension 都可能要求 mail、office、county tax office 或发起机构先处理。',
      '续期后的即时凭证按州不同。New York online renewal 可打印 temporary registration；Florida app 提供 digital document；Pennsylvania online renewal 可打印 permanent registration credential；Georgia kiosk 可当场打印文件。普通付款截图不能自动替代这些官方凭证。',
      'Registration 过期太久后，业务可能从 renewal 变成重新登记。New York 对过期超过 1 年的 registration 要重新 register；Texas online 过期续期受 12 个月和是否收到 citation 限制；Washington 对过期不足 12 个月的 military 场景另有新周期规则。',
      '车辆不开时，不要直接取消保险然后放着。California 的 PNO 禁止整年在 public road 上驾驶、拖行、存放或停车；Virginia 可 deactivate plates；Pennsylvania 和 North Carolina 强调取消保险前处理或交回 plate。各州没有统一的“停驶状态”。',
    ],
    factChecks: [
      {
        claim:
          'Registration 过期没有全国统一宽限期：California 明确无 grace period，而 North Carolina 的 15 天 valid-through 规则仍伴随过期日后的 late fee。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/registration-fees/penalties/',
          'https://www.ncdot.gov/dmv/title-registration/registration/Pages/default.aspx',
        ],
      },
      {
        claim:
          '没有收到 renewal notice 通常不会免除按时续期责任；多个州允许用 plate、VIN、title number、旧 registration 或申请表继续办理。',
        sourceUrls: [
          'https://dor.georgia.gov/motor-vehicles/vehicle-registration-license-plates/renew-vehicle-registration',
          'https://dmv.ny.gov/registration/renew-a-registration',
          'https://www.txdmv.gov/motorists/register-your-vehicle',
          'https://www.ncdot.gov/dmv/title-registration/registration/Pages/default.aspx',
        ],
      },
      {
        claim:
          '车辆或邮寄地址不正确时应先按登记州顺序更新；部分 online renewal 要求地址变更先处理并等待记录生效。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/',
          'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs',
          'https://dor.georgia.gov/motor-vehicles/vehicle-registration-license-plates/renew-vehicle-registration',
          'https://www.dmv.virginia.gov/vehicles/registration',
        ],
      },
      {
        claim:
          '有效保险或 DMV 可核验的保险记录是多州 registration renewal 前置条件；验证失败可能阻止线上或全部续期。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/',
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/renew-replace-registration/',
          'https://www.mass.gov/how-to/renew-your-vehicle-or-trailer-registration',
          'https://www.dmv.virginia.gov/vehicles/insurance-requirements',
          'https://www.ncdot.gov/dmv/title-registration/registration/Pages/default.aspx',
        ],
      },
      {
        claim:
          'Inspection 或 emissions 是否挡住 renewal 取决于州、县和车辆；New York、Texas、Georgia 与 North Carolina 的触发条件并不相同。',
        sourceUrls: [
          'https://dmv.ny.gov/inspections/registration-based-enforcement-of-inspections',
          'https://www.txdmv.gov/motorists/register-your-vehicle',
          'https://dor.georgia.gov/motor-vehicles/vehicle-registration-license-plates/renew-vehicle-registration',
          'https://www.ncdot.gov/dmv/title-registration/emissions-safety/Pages/default.aspx',
        ],
      },
      {
        claim:
          '缴纳 renewal fees 不一定完成 registration；California 对缺 smog、保险或未清 parking 的申请明确区分“避免罚金”和“获准上路”。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/',
          'https://www.dmv.ca.gov/portal/important-vehicle-information/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/file-for-planned-non-operation/',
        ],
      },
      {
        claim:
          '过期后仍能否按 renewal 办理取决于州和时长：New York、Texas 与 Washington 公布了不同的一年或 12 个月边界及条件。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/renew-a-registration',
          'https://www.txdmv.gov/motorists/register-your-vehicle',
          'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs',
        ],
      },
      {
        claim:
          'Online renewal 后可立即使用的凭证也有州别差异：New York 提供 temporary registration，Florida 提供 digital document，Pennsylvania 可打印 permanent credential。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/renew-a-registration',
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/renew-replace-registration/',
          'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/renew-registration',
        ],
      },
      {
        claim:
          '长期停驶不是简单让 registration 过期：California PNO、Virginia plate deactivation、Pennsylvania 与 North Carolina 的 plate / insurance 顺序各不相同。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/file-for-planned-non-operation/',
          'https://www.dmv.virginia.gov/licenses-ids/license/outside-va',
          'https://www.pa.gov/agencies/dmv/vehicle-services/insurance-overview',
          'https://www.ncdot.gov/dmv/title-registration/license-plates/Pages/default.aspx',
        ],
      },
    ],
    checklist: [
      '确认车辆目前登记在哪个州；不要按 driver license 州、保险公司地址或车辆停放地猜 renewal 入口。',
      '查看 registration card、plate、DMV account 的准确 expiration date，记录 plate number、VIN 和 title / registration number。',
      '检查 registered owner、residence / garaging address、mailing address 和 email 是否正确，先按州要求完成地址更新。',
      '找到 renewal notice；没有也准备旧 registration、plate、VIN、title number、owner ID 或本州替代表格。',
      '确认 liability insurance 当前有效，owner、VIN、effective date 与 DMV 记录一致，并准备 insurance card / policy information。',
      '查车辆是否需要 safety inspection、emissions / smog、STAR station、county test 或 out-of-state exemption，并确认结果已回传。',
      '查看 DMV account / notice 是否有 toll、parking、tax、insurance lapse、emissions、suspension、recall notice 或其他 stop；记录发起机构。',
      '确定车辆接下来是否上路、停在 private property、长期维修、在外州、已出售、totaled 或不再保留保险。',
      '比较 online、mail、kiosk、office、county tax / tag office 的资格、交付时间和凭证形式，不要只选看起来最快的入口。',
      '保存确认号、payment receipt、temporary / permanent credential、inspection report、insurance proof 和 mailing tracking；收到新 sticker 后再处理旧凭证。',
    ],
    steps: [
      '第一步：从原 registration 州的官方 vehicle registration renewal 页面开始，先核对 expiration date 和车辆状态，不要进入 driver license renewal。',
      '第二步：更新地址和 owner record。若刚搬州，还要先判断应该续旧州 registration，还是已经必须 title / register 到新州。',
      '第三步：核对保险。系统查不到 coverage 时，确认保险公司是否已电子报送、owner / VIN 是否一致，以及本州是否接受上传、邮寄或现场证明。',
      '第四步：完成本州、县和车型要求的 inspection / emissions / smog。保留 Vehicle Inspection Report 或 receipt，以便电子记录未同步时人工核验。',
      '第五步：清理 renewal stop。Parking / toll / local tax / court / insurance suspension 往往要先找发起机构；付款后还要等 clearance 回传。',
      '第六步：选择办理渠道。信息完全匹配且无特殊文件时优先官方 online / kiosk；需要 insurance stamp、tax certificate、special plate、vehicle class 或人工 proof 时改走 mail / office / county。',
      '第七步：确认交易结果。只有官方状态显示 renewed / complete，并提供州认可的 temporary 或 permanent credential，才按该州说明使用；若仍是 pending、fees paid 或 requirements due，不要默认 registration 已有效。',
      '第八步：若车辆长期不用，先查本州 PNO、non-use、plate deactivation、registration cancellation 或 plate surrender 规则，再决定保险；不要把“不开车”当作可以忽略 registration / insurance record。',
    ],
    faqs: [
      {
        question: '没收到 renewal notice，还需要按时续 registration 吗？',
        answer:
          '通常需要。Georgia 明确提醒即使没收到 notice，错过 renewal period 仍可能有 penalties。New York 可用 MV-82，Texas 可用 plate / VIN / prior receipt，North Carolina 可用 plate 和 title number。先查官方账户和到期日，不要等纸质 notice。',
      },
      {
        question: 'Registration 过期后有统一 grace period 吗？',
        answer:
          '没有。California 明确没有 grace period；North Carolina 有 15 天 valid-through 规则，但过期日后 renewal 仍有 late fee；Texas 的 online late renewal 又受 12 个月和是否收到 citation 限制。只按本州 registration card 和官方页面判断。',
      },
      {
        question: '已经交了 renewal fee，为什么系统仍显示 expired 或 incomplete？',
        answer:
          '付款可能只是申请的一部分。California 明确说明缺 smog 或仍有 parking citation 时，即使费用已付也不会完成 renewal；保险、inspection、tax 或 clearance 记录未同步也可能让状态 pending。查看 receipt 上的 requirements due，并继续查 status。',
      },
      {
        question: '线上续期失败，是不是一定要重新注册车辆？',
        answer:
          '不一定。常见原因是保险未电子核验、inspection 未回传、地址、特殊 vehicle class、需要原件、tax / toll / parking stop 或 registration 已 suspended。只有像 New York 过期超过 1 年等明确情形，才可能需要重新 register。先读错误原因。',
      },
      {
        question: '续期后打印的 receipt 可以当 registration 开车吗？',
        answer:
          '只有官方明确把它称为 temporary 或 permanent registration credential 时才按该州说明使用。New York 提供 temporary registration，Florida app 提供 digital document，Pennsylvania 可打印 permanent credential。普通付款截图、pending receipt 或 California incomplete receipt 不等同于上路许可。',
      },
      {
        question: '车检通过了，为什么 renewal 还看不到记录？',
        answer:
          '电子回传可能有延迟或匹配问题。Texas 允许在系统无法验证时向 county 出示 VIR；New York 也提供 inspection receipt / report 的补充路径。先核对 VIN、inspection date 和登记县，再按官方页面提交证明，不要重复付 renewal fee。',
      },
      {
        question: '车长期不开，可以直接取消保险、让 registration 过期吗？',
        answer:
          '风险很高。California 要按 PNO 条件处理；Virginia 取消保险时可 deactivate 或 surrender plates；Pennsylvania 和 North Carolina 强调先交回 plate 或按州流程处理。顺序错了可能触发 insurance lapse、registration suspension 或罚金。',
      },
      {
        question: '刚搬到外州，应该续旧州 registration 还是办新州 registration？',
        answer:
          '先查新州 resident / vehicle registration deadline 和旧州 plate / insurance 退出规则。不要为了赶一个 renewal notice 自动续旧州，也不要在新州登记完成前贸然取消旧保险。可结合“搬州后车辆 title、registration、保险和车牌顺序”专题处理。',
      },
    ],
    editorNotes: [
      '本页只负责 registration renewal 主流程；inspection、registration hold、临时牌照和 replacement sticker 的细节分别交给现有专题并做相关链接。',
      '不要把 North Carolina 的 15-day valid-through、Texas 12-month online window 或 California PNO 泛化为全国规则。',
      '正文不建立费用对比表，因为 plate type、vehicle weight、county tax、late period、service fee 和 multi-year choice 会快速变化。',
      '“已付款”和“已续期”必须持续区分；California incomplete application 是最强官方示例，但不能说所有州付款都不生效。',
      '停驶段落只做 DMV / insurance record 分流，不提供保险取消或法律意见。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 vehicle registration renewal、online services、county / tag office、insurance、inspection 和 plate handling 官方入口。',
    },
    sources: [
      {
        label: 'California DMV Vehicle Registration Renewal',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/',
      },
      {
        label: 'California DMV Planned Nonoperation Filing',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/vehicle-registration-renewal/file-for-planned-non-operation/',
      },
      {
        label: 'California DMV Registration Penalties',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/registration-fees/penalties/',
      },
      {
        label: 'California DMV Important Vehicle Information',
        url: 'https://www.dmv.ca.gov/portal/important-vehicle-information/',
      },
      {
        label: 'New York DMV Renew a Registration',
        url: 'https://dmv.ny.gov/registration/renew-a-registration',
      },
      {
        label: 'New York DMV Registration-Based Enforcement of Inspections',
        url: 'https://dmv.ny.gov/inspections/registration-based-enforcement-of-inspections',
      },
      {
        label: 'New York DMV Check Registration Status',
        url: 'https://dmv.ny.gov/registration/check-registration-status',
      },
      {
        label: 'TxDMV Register Your Vehicle and Renew Registration',
        url: 'https://www.txdmv.gov/motorists/register-your-vehicle',
      },
      {
        label: 'FLHSMV Renew or Replace Your Registration',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/renew-replace-registration/',
      },
      {
        label: 'Washington DOL Renew or Replace Vehicle Tabs',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs',
      },
      {
        label: 'Washington DOL Tabs Renewal Requirements',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs/tabs-renewal-requirements',
      },
      {
        label: 'Washington DOL Renewal Notices',
        url: 'https://dol.wa.gov/renewal-notices',
      },
      {
        label: 'Mass.gov Renew Vehicle or Trailer Registration',
        url: 'https://www.mass.gov/how-to/renew-your-vehicle-or-trailer-registration',
      },
      {
        label: 'Mass.gov Vehicle Registration',
        url: 'https://www.mass.gov/vehicle-registration',
      },
      {
        label: 'PennDOT Renew Registration',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/title-and-registration/renew-registration',
      },
      {
        label: 'PennDOT Insurance Overview',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/insurance-overview',
      },
      {
        label: 'Virginia DMV Vehicle Registration and Renewal',
        url: 'https://www.dmv.virginia.gov/vehicles/registration',
      },
      {
        label: 'Virginia DMV Insurance Requirements',
        url: 'https://www.dmv.virginia.gov/vehicles/insurance-requirements',
      },
      {
        label: 'Virginia DMV Temporarily Outside Virginia',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/outside-va',
      },
      {
        label: 'Georgia DOR Renew Vehicle Registration',
        url: 'https://dor.georgia.gov/motor-vehicles/vehicle-registration-license-plates/renew-vehicle-registration',
      },
      {
        label: 'NCDMV Vehicle Registration Renewals',
        url: 'https://www.ncdot.gov/dmv/title-registration/registration/Pages/default.aspx',
      },
      {
        label: 'NCDMV Emissions and Safety Inspections',
        url: 'https://www.ncdot.gov/dmv/title-registration/emissions-safety/Pages/default.aspx',
      },
      {
        label: 'NCDMV License Plates and Plate Return',
        url: 'https://www.ncdot.gov/dmv/title-registration/license-plates/Pages/default.aspx',
      },
      {
        label: 'NCDMV Vehicle Property Taxes and Tag & Tax Together',
        url: 'https://www.ncdot.gov/dmv/title-registration/Pages/vehicle-property-tax.aspx',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'massachusetts',
      'pennsylvania',
      'virginia',
      'georgia',
      'north-carolina',
    ],
  },
  {
    slug: 'lost-stolen-license-plates-registration-card-sticker',
    title: '车牌、registration card 或 sticker 丢失/被盗后怎么补办',
    eyebrow: '车牌补办',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '车辆凭证丢失时，先别只问“能不能补一个 sticker”。License plate、registration card、registration sticker / decal / tab、inspection sticker 和 title 是不同事项；被盗、没收到邮件、车牌损坏、地址错误、toll / parking / insurance hold 的处理路径也不同。',
    whoNeedsIt: [
      '车牌、前牌/后牌、registration card、windshield sticker、plate decal、tab 或 registration ID card 丢失、被偷、损坏、褪色或没收到的人。',
      '收到 toll、parking ticket、red-light camera、保险或警察通知，怀疑车牌被盗用的人。',
      '刚搬家、刚续 registration、刚买车、刚卖车，发现 sticker、registration card 或 plates 没寄到正确地址的人。',
      '有 personalized / specialty plate、disabled plate、commercial plate、trailer plate 或只剩一块牌，想知道能否保留原号码的人。',
      '车辆登记被 toll、parking citation、insurance lapse、local tax 或 registration stop 卡住，补牌/补贴纸也办不了的人。',
    ],
    keyFacts: [
      'Plate、registration card 和 sticker / decal / tab 是三类东西。California、Texas、North Carolina 等页面都把 replacement plate、registration card、registration sticker 分成不同选项；North Carolina 明确说 duplicate registration card 不会发 renewal sticker。',
      '被盗和普通丢失不是同一条路。California 替换被盗 plates 要 police report；New York 免 stolen plate replacement fee 要 police report 或 MV-78B；New Jersey、PennDOT、Georgia、Florida 等也把 stolen plate / decal 与 police report 或 law enforcement report 关联起来。',
      '丢失车牌通常会换新号码。California 说 lost or stolen plates 需要 substitute plates with a new configuration；Washington 说 reported stolen 后不能用同一号码；PennDOT personalized plate 丢失或被盗时要选择新 configuration。',
      '旧牌、剩余牌或损坏牌不要随便留着。California 要 surrender remaining plates；New Jersey 要交回 damaged plates；Texas VTR-60 要声明若找回旧 plate / sticker 不再使用；New York 也提醒销毁旧牌以防他人使用。',
      '没收到邮件和已经丢失的处理可能不同。California 说若原件已寄出但未收到，可提交 REG 156 申请 replacement；Washington 对 15-90 天未收到 tabs 有免费 replacement 条件；Florida 邮寄丢失在 180 天内可能免 replacement fee；Georgia 邮寄丢失在 90 天内可能免 fee。',
      '登记不是 current / valid 时，可能不能只补 sticker。California FAQ 说未 current registered 的车辆不能补 replacement plates / stickers；Florida registration stop、Washington unpaid tickets / tolling fees、Virginia registration withholding 都可能阻止 renewal 或 reissue。',
      'Sticker 名称按州不同。California / Illinois 常写 sticker，Florida / Virginia 写 decal，Washington 写 tabs，New York 的 registration 通常包含 windshield sticker 和 paper registration certificate；查官方入口时要同时对照这些英文名称。',
      'Inspection sticker 是另一件事。New York inspection sticker missing 要走 inspection sticker replacement 或重新 inspection；不要把 registration sticker、plate decal 和 safety / emissions inspection sticker 混在一起。',
      '卖车、搬州或取消保险时，plate surrender / deactivation 比补牌更关键。North Carolina、New York、Virginia 等都把退牌、取消保险和 suspension / fine 风险连在一起。',
      '保存证据很重要。被盗车牌可能带来 toll、parking、camera ticket、police stop 或 collection notice；保留 police report、replacement receipt、plate surrender receipt、mailing confirmation、photos 和 DMV case number。',
    ],
    checklist: [
      '先确认丢的是哪一项：front plate、rear plate、both plates、registration card、registration sticker / decal / tab、windshield sticker、inspection sticker、title、parking permit 或 disabled placard。',
      '记录发现日期、车辆 VIN、plate number、registration expiration、title number、mailing address、是否刚续期、是否刚搬家、是否收到 toll / ticket / insurance notice。',
      '如果车牌或 sticker 可能被偷，先查本州是否要求 police report、MV-78B、incident number 或 law enforcement statement；保存报告副本。',
      '确认车辆 registration 是否 current、保险是否有效、是否有 toll / parking / local tax / insurance lapse hold，是否已经 sold / totaled / moved out of state。',
      '准备身份证明、现有 registration、insurance card、VIN、title number、剩余 plate、损坏 plate / sticker、付款方式和官方表格。',
      '地址不对时先查 vehicle registration address change；replacement 通常寄到 DMV 记录地址，错地址会继续造成没收到。',
      '如果是 personalized / specialty / disabled / commercial / trailer plate，单独看对应 plate 类型是否能保留原号码或必须换新号码。',
      '补办后把旧 plate / sticker / registration card 按州规则 surrender、destroy、deface 或停用；不要让找回的旧凭证继续在路上使用。',
    ],
    steps: [
      '第一步：从原登记州的 DMV / MVC / DOL / DOR / Secretary of State / county tax office 进入，不要用第三方“快速补牌”广告。',
      '第二步：把事项分成 plate、registration card、sticker / decal / tab、inspection sticker、title。每一项可能有不同表格、费用和办理地点。',
      '第三步：如果涉及被盗，先处理 police report。California、New York、New Jersey、PennDOT、Georgia、Florida、North Carolina 等来源都显示 stolen plate / decal 通常需要执法记录或会影响费用/号码。',
      '第四步：检查车辆记录是否能补。registration expired、toll violation、parking citation、insurance lapse、local tax、registration stop 或地址错误，可能要先清掉。',
      '第五步：选择线上、邮寄或现场。California 和 New York 支持部分 registration card / sticker online replacement；Texas、Georgia、North Carolina 等常要 county / license plate agency；Virginia 允许在线打印 replacement registration card。',
      '第六步：提交表格和材料。常见表格包括 California REG 156、New York MV-82、Texas VTR-60、Florida HSMV 83146、Washington Affidavit of Loss、PennDOT MV-44、Virginia VSA 14、Georgia MV-7、North Carolina MVR-18。',
      '第七步：收到新凭证后立即安装正确 sticker / decal / tab，保存 receipt，并确认旧 plate number、old sticker 或 lost/stolen status 已按州规则处理。',
      '第八步：如果之后收到旧 plate 造成的 toll、parking 或 camera ticket，拿 police report、replacement receipt、surrender / status verification、bill of sale 或 registration record 去对应机构申诉。',
    ],
    faqs: [
      {
        question: '车牌被偷，一定要报警吗？',
        answer:
          '很多州在 stolen plate 场景要求或强烈依赖 police report。比如 California 替换被盗 plates 要 police report；New York 免 stolen plate replacement fee 要 police report 或 MV-78B；New Jersey 要向当地 police 报告并带报告；PennDOT MV-44 也写明 lost/stolen plate 要报告 State Police 或 local law enforcement。',
      },
      {
        question: '只丢了 registration sticker，可以只补 sticker 吗？',
        answer:
          '通常可以，但要看州和车辆状态。California 可线上补 sticker 或 registration card，且 replacement sticker order 会包含新 registration card；Texas VTR-60 可勾选 plate sticker 或 windshield sticker；North Carolina 则要求 replacement sticker 去 license plate agency 或邮寄申请，duplicate registration card online 不会发 sticker。',
      },
      {
        question: '被盗车牌能不能保留原来的号码？',
        answer:
          '不要默认可以。California lost/stolen plates 通常要 substitute plates with a new configuration；Washington 说 reported stolen 后不能用同一号码；PennDOT personalized plate 丢失或被盗时要选择新 configuration。特殊 plate / personalized plate 是否可保留，要看本州对应规则。',
      },
      {
        question: '刚续期但 sticker 没收到，要重新付钱吗？',
        answer:
          '可能不用，也可能要看期限和原因。California 有“mailed but not received”的 replacement 路径；Washington 对 15-90 天未收到 tabs 有免费 replacement 条件；Florida 规定 mail lost in transit 在 180 天内可能免费；Georgia 邮寄丢失在 90 天内可能免 replacement fee。先看本州“not received / lost in mail”规则。',
      },
      {
        question: '补了新 plate 或 sticker 后，旧的找回来可以继续用吗？',
        answer:
          '不应继续用。Texas VTR-60 要声明找回旧 plate / sticker 后不会再使用；California 要 surrender remaining plates；New York 也提醒旧 plate 不处理可能带来 ticket / fine 责任。按州规则 surrender、destroy、deface 或停用旧凭证。',
      },
    ],
    factChecks: [
      {
        claim:
          'License plate、registration card 和 registration sticker/decal/tab 是不同凭证，California 的 replacement 页面为它们提供不同选项和材料。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/replacement-license-plates-and-stickers/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/replace-your-registration-card/',
        ],
      },
      {
        claim:
          'California 被盗车牌补办需要 police report，并通常改发 new configuration；车主还应交回仍持有的另一块牌。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/replacement-license-plates-and-stickers/',
        ],
      },
      {
        claim:
          'New York 在两块牌均丢失、被盗或毁坏时要求 police report；证明属于 theft/crime 时可免 replacement plate fee。',
        sourceUrls: ['https://dmv.ny.gov/plates/lost-stolen-or-destroyed-plates'],
      },
      {
        claim:
          'Washington 明确规定，车牌被报告为 stolen 后，为保护公众不会重新使用相同的 number/letter combination。',
        sourceUrls: ['https://dol.wa.gov/vehicles-and-boats/vehicles/license-plates'],
      },
      {
        claim:
          'Texas VTR-60 将 replacement plate、windshield sticker 和 plate sticker 分开申请，并要求申请人承诺找回旧凭证后不再使用。',
        sourceUrls: ['https://www.txdmv.gov/sites/default/files/form_files/VTR-60.pdf'],
      },
      {
        claim:
          'Florida HSMV 83146 分别处理 replacement plate、decal 和 parking permit，并按 lost、stolen、damaged 等原因要求相应证明。',
        sourceUrls: ['https://www.flhsmv.gov/pdf/forms/83146.pdf'],
      },
      {
        claim:
          'North Carolina 的 online duplicate registration card 不会同时签发 renewal sticker；需要 sticker 时应走 plate agency 或指定申请路径。',
        sourceUrls: [
          'https://www.ncdot.gov/dmv/offices-services/online/Pages/my-ncdmv-duplicate-registration.aspx',
          'https://www.ncdot.gov/dmv/downloads/Documents/MVR-18.pdf',
        ],
      },
      {
        claim:
          'Virginia 允许符合条件的车主在线取得 replacement registration card；replacement plate 则可能需要 registration application 和附加材料。',
        sourceUrls: [
          'https://www.dmv.virginia.gov/online-services/replace-reg',
          'https://www.dmv.virginia.gov/sites/default/files/forms/vsa14.pdf',
        ],
      },
      {
        claim:
          'Georgia 的 MV-7 用于申请 replacement license plate、tag 或 decal，被盗情形和邮寄未收到情形应按表格分别说明。',
        sourceUrls: [
          'https://dor.georgia.gov/replace-license-plate',
          'https://dor.georgia.gov/document/form/mv-7-application-replacement-license-plate-tag-and-or-decal/download',
        ],
      },
      {
        claim:
          '续期后尚未收到邮件与已经持有后丢失是不同问题；New York 提供 registration status/where-is-my-registration 查询后再决定 replacement。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/where-is-my-registration',
          'https://dmv.ny.gov/registration/replace-registration',
        ],
      },
    ],
    editorNotes: [
      '这页和“买车/搬州后 registration 顺序”不同：本页聚焦已经登记后的 plate/card/sticker replacement 和 stolen plate 风险。',
      '要持续区分 registration sticker、inspection sticker、disabled placard、title、temporary permit 和 toll transponder；中文用户很容易把这些都叫“车贴”。',
      '不要承诺 stolen plate 一定免费或一定保留原号码。官方来源显示费用、号码和 police report 规则州别差异很大。',
      '将 toll / parking / insurance hold 写成“可能阻止 renewal/reissue/replacement”，避免过度泛化。',
      '对 Mass.gov、Illinois SOS、Michigan SOS 等自动审计常返回 403 的政府站点，保留官方 URL 并在外链审计中按 watch 管理。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、vehicle registration、license plates、forms、online services、county tax office 和 office locator 官方入口。',
    },
    sources: [
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'California DMV Replacement License Plates and Stickers',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/replacement-license-plates-and-stickers/',
      },
      {
        label: 'California DMV Online Replacement Sticker or Registration Card',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/online-replacement-sticker-or-registration-card/',
      },
      {
        label: 'California DMV Registration Card Replacement',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/replace-your-registration-card/',
      },
      {
        label: 'California DMV REG 156 Replacement Procedure',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/duplicates-and-substitutes/application-for-replacement-plates-stickers-documents-reg-156-form/',
      },
      {
        label: 'NY DMV Lost, Stolen or Destroyed Plates',
        url: 'https://dmv.ny.gov/plates/lost-stolen-or-destroyed-plates',
      },
      {
        label: 'NY DMV Replace a Registration',
        url: 'https://dmv.ny.gov/registration/replace-registration',
      },
      {
        label: 'NY DMV Registrations',
        url: 'https://dmv.ny.gov/registrations',
      },
      {
        label: 'NY DMV Peeling and Damaged License Plates',
        url: 'https://dmv.ny.gov/plates/peeling-and-damaged-license-plates',
      },
      {
        label: 'NY DMV Where Is My Registration',
        url: 'https://dmv.ny.gov/registration/where-is-my-registration',
      },
      {
        label: 'NY DMV Surrender Plates and Registration',
        url: 'https://dmv.ny.gov/registration/surrender-return-or-turn-in-your-vehicle-plates-and-registration',
      },
      {
        label: 'TxDMV License Plates',
        url: 'https://www.txdmv.gov/motorists/license-plates',
      },
      {
        label: 'TxDMV Form VTR-60 Replacement Plates or Sticker PDF',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-60.pdf',
      },
      {
        label: 'Texas.gov Vehicle Registration',
        url: 'https://www.texas.gov/driver-services/texas-vehicle-registration/',
      },
      {
        label: 'FLHSMV Renew or Replace Your Registration',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/renew-replace-registration/',
      },
      {
        label: 'FLHSMV License Plates and Registration',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/',
      },
      {
        label: 'FLHSMV Form HSMV 83146 Replacement Plates Decals or Parking Permits PDF',
        url: 'https://www.flhsmv.gov/pdf/forms/83146.pdf',
      },
      {
        label: 'FLHSMV Toll-by-Plate Information',
        url: 'https://www.flhsmv.gov/toll-by-plate-information/',
      },
      {
        label: 'Washington DOL License Plates',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/license-plates',
      },
      {
        label: 'Washington DOL Renew or Replace Vehicle Tabs',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/renew-or-replace-vehicle-tabs',
      },
      {
        label: 'Washington DOL Replace Lost Title or Registration',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/vehicle-registration/vehicle-title/replace-lost-title-or-registration',
      },
      {
        label: 'Washington DOL Vehicle Licensing Offices',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicle-licensing-offices',
      },
      {
        label: 'NJ MVC Plates',
        url: 'https://www.nj.gov/mvc/vehicles/aboutplates.htm',
      },
      {
        label: 'NJ MVC Replacing a Lost Vehicle Registration',
        url: 'https://www.nj.gov/mvc/vehicles/regreplace.htm',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'PennDOT Form MV-44 Duplicate Registration Card or Replacement Plate PDF',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bmv/bmv-forms/mv-44.pdf',
      },
      {
        label: 'Virginia DMV Replace Vehicle Registration Card',
        url: 'https://www.dmv.virginia.gov/online-services/replace-reg',
      },
      {
        label: 'Virginia DMV Registration-Only Mail Applications and Replacement Plates',
        url: 'https://www.dmv.virginia.gov/vehicles/registration/title-mail-reg-only',
      },
      {
        label: 'Virginia DMV Vehicle Registration Application VSA 14 PDF',
        url: 'https://www.dmv.virginia.gov/sites/default/files/forms/vsa14.pdf',
      },
      {
        label: 'Virginia DMV Register Your Vehicle',
        url: 'https://www.dmv.virginia.gov/vehicles/registration',
      },
      {
        label: 'Virginia DMV What to Do with Your License Plates',
        url: 'https://www.dmv.virginia.gov/vehicles/license-plates/surrender',
      },
      {
        label: 'Georgia DOR Replace License Plate',
        url: 'https://dor.georgia.gov/replace-license-plate',
      },
      {
        label: 'Georgia DOR Form MV-7 Replacement License Plate or Decal PDF',
        url: 'https://dor.georgia.gov/document/form/mv-7-application-replacement-license-plate-tag-and-or-decal/download',
      },
      {
        label: 'Mass.gov Replace Vehicle Registration or Plate Decal',
        url: 'https://www.mass.gov/how-to/replace-your-vehicle-registration-or-plate-decal',
      },
      {
        label: 'Mass.gov Order Replacement Vehicle License Plates',
        url: 'https://www.mass.gov/how-to/order-replacement-vehicle-license-plates',
      },
      {
        label: 'Mass.gov Vehicle Registration',
        url: 'https://www.mass.gov/vehicle-registration',
      },
      {
        label: 'Illinois SOS License Plates and Sticker Replacement',
        url: 'https://apps.ilsos.gov/platereplacement/',
      },
      {
        label: 'Illinois SOS Vehicle Fees',
        url: 'https://www.ilsos.gov/departments/vehicles/basicfees.html',
      },
      {
        label: 'Illinois SOS Vehicle Title and Registration FAQ',
        url: 'https://www.ilsos.gov/departments/vehicles/title-and-registration/faq.html',
      },
      {
        label: 'Illinois SOS Registration Renewal and ID Cards',
        url: 'https://www.ilsos.gov/departments/vehicles/title-and-registration/regid.html',
      },
      {
        label: 'NCDMV Order Duplicate Registration Cards',
        url: 'https://www.ncdot.gov/dmv/offices-services/online/Pages/my-ncdmv-duplicate-registration.aspx',
      },
      {
        label: 'NCDMV License Plates',
        url: 'https://www.ncdot.gov/dmv/title-registration/license-plates/Pages/default.aspx',
      },
      {
        label: 'NCDMV Form MVR-18 Replacement Plate or Sticker PDF',
        url: 'https://www.ncdot.gov/dmv/downloads/Documents/MVR-18.pdf',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'massachusetts',
      'illinois',
      'north-carolina',
    ],
  },
  {
    slug: 'temporary-tag-trip-permit-dealer-plate',
    title: '临时牌照、temporary tag 和 trip permit：买车、搬州或没牌上路怎么办',
    eyebrow: '临时牌照',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '买车当天、跨州开回家、正式 plates / sticker 没到、车辆还没完成 smog / inspection / registration 时，常见词有 temporary tag、temporary operating permit、trip permit、transit permit、one-trip permit 和 dealer temp tag。它们不是全国通用通行证，也不能替代 title、insurance 或正式 registration。',
    whoNeedsIt: [
      '从 dealer 或私人卖家买车，正式车牌、registration card 或 sticker 还没办好的人。',
      '跨州把车开回家、搬州、把车送去 inspection / smog / VIN verification / repair shop / DMV 的人。',
      'dealer temporary tag 快过期、没收到正式牌照或登记文件、担心还能不能继续开的买车人。',
      '想分清 temporary tag、trip permit、transit permit、temporary operating permit、one-trip permit 和 dealer plate 的人。',
      '车辆涉及 out-of-state sale、private sale、salvage / nonrepairable title、commercial vehicle、trailer、RV 或 weight limit 的人。',
    ],
    keyFacts: [
      'Temporary tag、trip permit、transit permit、TOP 和 temporary registration 不是同一种东西。名称、期限、费用、办理地点、能否跨州、能否用于私人交易，都由签发州决定。',
      '临时许可通常只解决“短期合法移动或等待登记”的问题，不会自动完成 title transfer、tax、insurance、smog / inspection、VIN verification 或 permanent registration。',
      '加州的 Temporary Operating Permit 更像特定登记场景下的例外许可。California DMV 把 one-time 30-day TOP、60-day TOP、90-day TOP、one-day vehicle moving permit 和 one-trip permit 分开说明，并把 smog、VIN、CHP、specialty plates 等场景列为不同触发条件。',
      '德州有多种 temporary permit：72-hour / 144-hour、One-Trip Permit、30-Day Permit 和 Vehicle Transit Permit。TxDMV 明确提醒，去外州前要确认目的州是否承认该 permit；Vehicle Transit Permit 通常用于卖家保留 Texas plates 后把车开回家或去 county tax office。',
      '德州 2025 年 7 月 1 日以后又有单独变化：licensed dealers 不再像过去那样签发若干纸质 temporary tags，dealer sales 逐步转为 metal plates / limited-use plates；但 Vehicle Transit Permit、72/144-hour permit 等仍要按 TxDMV 页面区分。',
      '纽约把 in-transit vehicle permit / temporary registration 用于把车辆从纽约开到外州，或在纽约州内转移去登记；NY DMV 页面列出 MV-82ITP、ownership proof、identity、insurance 和 fee 等材料。',
      '佛州 temporary license plate 按用途可能是 10、30 或 90 天。FLHSMV 把 dealer use、casual / private sale、VIN verification / inspection、out-of-state resident 和 personalized / special plate manufacturing 等场景分开。',
      '华盛顿 trip permit 用于 unlicensed vehicle，并不是长期注册。Washington DOL 说明每张 permit 有 3 consecutive days、同一车辆 30 天内最多 3 张、特定车辆不符合资格等限制；买私人车且没有 plate 时，DOL 还提醒要先买 trip permit 才能合法开走。',
      '俄勒冈 trip permit 可以用于 Oregon roads 上的 unregistered vehicle 或与现有登记用途不同的使用方式，但不同车种期限不同；light vehicle trip permit 是 21 consecutive days，RV / heavy vehicle / trailer 又是不同规则。',
      'Virginia 的 trip permit 明确只在 Virginia 有效；如果路线经过外州，要联系其他州。Georgia 的 dealer TOP 是新购车辆登记前的短期许可，过期后 dealer 不能自己延长或再发一个。',
      'Colorado、Massachusetts 等州提醒了另一个现实：dealer temp tag 快过期、Title Complete notice 没到、或 registration transfer grace period 场景，可能需要找 county / RMV 路径，而不是搜索一个全国通用的“临牌”。',
      '过期、涂改、路线不符、车种不符、没有 insurance、salvage / nonrepairable、commercial weight、loaded trailer 或跨州不被承认，都可能让临时许可失效。能不能开，最后看签发州和行驶州的官方规则。',
    ],
    checklist: [
      '先写下自己的真实场景：dealer 买车、private sale、外州买车开回本州、搬州、去 inspection / smog、去 repair shop、没收到正式牌、还是正式 registration 被卡住。',
      '确认三个州别：车辆现在所在州、购买或签发 permit 的州、最终要登记的州；如果中途跨州，逐一确认路线州是否承认该临时许可。',
      '准备 ownership proof：title、manufacturer certificate / statement、bill of sale、dealer invoice、lease / lien 文件、原 registration 或 transfer paperwork。',
      '准备车辆信息：VIN、year / make / model、plate number、vehicle weight、trailer / RV / commercial / bus / motorcycle / salvage / nonrepairable 状态。',
      '准备个人和保险材料：driver license / state ID、当前地址、insurance card / policy number、临时 insurance ID、付款方式和官方表格。',
      '确认 permit 限制：valid dates、start date、origin、destination、intermediate points、single trip / round trip、display 方式、receipt 是否必须随车。',
      '确认下一步 deadline：title application、registration application、tax / fee、inspection / smog / VIN verification、sticker / permanent plate 到达时间。',
      '如果 dealer 处理 title / registration，保留 buyer receipt、temporary tag、purchase agreement、dealer contact、case number，并在过期前联系 dealer、county office 或 DMV。',
    ],
    steps: [
      '第一步：不要先问“能不能没牌开”。先打开车辆所在州或购车州的官方 DMV / DOR / county motor vehicle 页面，查 temporary tag、trip permit、temporary operating permit、temporary registration 或 transit permit。',
      '第二步：判断是谁能签发。Dealer temporary tag 通常由 dealer 或 dealer system 发；private sale / trip permit 往往要本人去 DMV、county tax office、vehicle licensing office 或官方线上系统申请。',
      '第三步：把许可类型和用途配对。买车开回家、外州销售、去 VIN verification、去 smog、等待 specialty plate、正式登记未完成、commercial weight movement，可能对应完全不同的 permit。',
      '第四步：核对 eligibility。重点看 insurance、ownership proof、valid driver license、VIN、vehicle weight、salvage / nonrepairable、commercial / trailer、是否载货、是否只在本州有效。',
      '第五步：申请并保存证据。打印或保存 permit、receipt、buyer receipt、bill of sale、insurance proof、inspection/smog appointment、dealer title paperwork；很多州要求 permit 或 receipt 随车携带或按规定展示。',
      '第六步：只按 permit 授权的时间和路线开。不要把 3-day trip permit、one-day moving permit、one-trip permit 或 dealer tag 当成临时通勤证；过期、涂改或换车使用通常会出问题。',
      '第七步：在过期前完成正式 title / registration / inspection / smog / sticker。临时许可的价值是争取办理窗口，不是无限续命。',
      '第八步：如果 permit 快过期但正式牌没到，先联系 dealer、county / DMV 和签发机构；不要默认 dealer 可以再给一张，也不要用旧 permit 继续开。',
    ],
    faqs: [
      {
        question: '买车后没有正式牌照，可以直接开回家吗？',
        answer:
          '不要默认可以。Dealer 购买、私人交易、外州购买、卖家保留旧牌、需要 VIN verification / smog 的情况都不同。比如 Texas 有 Vehicle Transit Permit；Washington 说私人买车且没有 plate 时要先买 trip permit；New York 对从纽约开到外州有 in-transit permit。先看签发州官方页面。',
      },
      {
        question: 'temporary tag、trip permit 和 temporary operating permit 是一回事吗？',
        answer:
          '不是。Temporary tag 常和 dealer sale 或临时车牌有关；trip permit 常是短期移动 unregistered / unlicensed vehicle；California TOP 又是 registration application、smog、VIN、specialty plate 等场景下的特定许可。中文可以都叫“临牌”，但办事时必须按官方英文名称选。',
      },
      {
        question: '临时牌照可以跨州开吗？',
        answer:
          '看签发州和行驶州。California one-trip permit 可以覆盖特定进出加州的连续路线；Virginia trip permit 明确只在 Virginia 有效；TxDMV 提醒去外州前要确认目的州是否接受 Texas permit。跨州时不要只看卖家或 dealer 的口头说法。',
      },
      {
        question: 'dealer 给了临时牌照，我还要管 title / registration 吗？',
        answer:
          '要。Dealer tag 只是短期上路凭证，不等于 title 已转到你名下、registration 已完成、税费已处理或 permanent plate / sticker 已寄出。Georgia 还特别说明 dealer 不能给过期 TOP 续发或再发一个；Colorado 也提醒 temporary tag 快过期但 Title Complete notice 没到时要联系 county。',
      },
      {
        question: '临时牌照或 trip permit 过期了还能继续开吗？',
        answer:
          '通常不要继续开。许多 permit 都按连续天数、指定日期或单次路线有效；过期、涂改、车辆不匹配或路线不符可能让 permit 失效。更稳妥的做法是停开并联系签发机构，确认是否有新的 permit、extension、registration completion 或 towing / transport 方案。',
      },
    ],
    factChecks: [
      {
        claim:
          'Temporary tag、trip permit、transit permit 和 Temporary Operating Permit 对应不同用途、期限与签发机构，不能把其中一种当作全国通用临牌。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/temporary-operating-permits/',
          'https://www.txdmv.gov/motorists/register-your-vehicle/temporary-permits',
          'https://dmv.ny.gov/registration/in-transit-vehicle-permits-temporary-registrations',
        ],
      },
      {
        claim:
          'Texas HB 718 自 2025 年 7 月 1 日生效后，licensed dealer 在多数成交场景改为交付 metal plate，不再打印旧式 paper buyer temporary tag。',
        sourceUrls: ['https://www.txdmv.gov/dealers/HB718'],
      },
      {
        claim:
          'Texas 的 30-Day 和 One-Trip Permit 仍存在，但 HB 718 后由 county tax office 或 TxDMV regional service center 签发 Temporary Registration metal plate。',
        sourceUrls: [
          'https://www.txdmv.gov/dealers/HB718',
          'https://www.txdmv.gov/motorists/register-your-vehicle/temporary-permits',
        ],
      },
      {
        claim:
          'California 把 30、60、90-day TOP、one-day vehicle moving permit 和 one-trip permit 分开，并按 smog、VIN、CHP 或登记缺项决定资格。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/temporary-operating-permits/',
        ],
      },
      {
        claim:
          'Washington 的 unlicensed-vehicle trip permit 每张覆盖 3 个连续日，同一车辆在任意 30 天内最多使用 3 张。',
        sourceUrls: [
          'https://dol.wa.gov/vehicles-and-boats/vehicles/license-plates/trip-permits-unlicensed-vehicles',
        ],
      },
      {
        claim:
          'Oregon 的 light vehicle trip permit 通常为 21 个连续日，RV、heavy vehicle 和 trailer 另有不同 permit 与期限。',
        sourceUrls: ['https://www.oregon.gov/odot/dmv/pages/vehicle/trippermit.aspx'],
      },
      {
        claim:
          'Virginia 的 trip permit 只授权在 Virginia 境内行驶；路线经过其他州时，申请人必须另行确认其他州许可。',
        sourceUrls: ['https://www.dmv.virginia.gov/vehicles/registration/temp-permit'],
      },
      {
        claim:
          'New York in-transit permit 申请要求对应的 ownership、identity、insurance、申请表和费用，不能只凭 bill of sale 上路。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/in-transit-vehicle-permits-temporary-registrations',
          'https://dmv.ny.gov/forms/mv82itp.pdf',
        ],
      },
      {
        claim:
          'Florida temporary plate 会按 dealer sale、private sale、inspection/VIN、out-of-state buyer 或特制车牌等待等用途采用不同期限和资格。',
        sourceUrls: [
          'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/',
          'https://www.flhsmv.gov/pdf/forms/83091.pdf',
        ],
      },
      {
        claim:
          'Georgia dealer TOP 是完成正式 title 和 registration 前的短期凭证；原 TOP 过期时，dealer 不能把重复签发当作无限延期办法。',
        sourceUrls: ['https://dor.georgia.gov/temporary-operating-permits-tops'],
      },
    ],
    editorNotes: [
      '这页故意不写成“全美临牌规则”，因为各州 temporary tag / trip permit 差异很大，尤其 dealer sale 和 private sale 差异明显。',
      'Texas 2025 HB 718 是高价值更新点，但不要把它误写成所有 Texas permits 都取消；TxDMV 页面仍保留 Vehicle Transit Permit、72/144-hour permit 等类别。',
      'Massachusetts 内容只作为 registration transfer / non-resident short-term registration 例子，不泛化成普通居民都能申请临时牌。',
      '这页和“车牌/sticker 丢失补办”不同：本页聚焦正式登记完成前或车辆短途移动时的临时许可。',
      '后续扩展可拆成州级表：CA TOP、TX permits/HB718、NY in-transit、FL temp plates、WA trip permits、OR trip permits、VA trip permit、GA TOP、CO dealer temp tags、MA non-resident short-term registration。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、vehicle registration、title、license plates、temporary permits、county office、dealer services 和 online services 官方入口。',
    },
    sources: [
      {
        label: 'USA.gov State Motor Vehicle Services',
        url: 'https://www.usa.gov/state-motor-vehicle-services',
      },
      {
        label: 'California DMV Temporary Operating Permits',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/license-plates-decals-and-placards/temporary-operating-permits/',
      },
      {
        label: 'California DMV Registration Fees',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/registration-fees/',
      },
      {
        label: 'California DMV Smog Inspections',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/',
      },
      {
        label: 'TxDMV Temporary Permits',
        url: 'https://www.txdmv.gov/motorists/register-your-vehicle/temporary-permits',
      },
      {
        label: 'TxDMV Application for Timed Temporary Permits VTR-66 PDF',
        url: 'https://www.txdmv.gov/sites/default/files/form_files/VTR-66.pdf',
      },
      {
        label: 'TxDMV Vehicle Transit Permit',
        url: 'https://permit.txdmv.gov/Permit/VTPermit',
      },
      {
        label: 'TxDMV Permit Eligibility',
        url: 'https://permit.txdmv.gov/Permit/Eligibility#nbb',
      },
      {
        label: 'TxDMV House Bill 718 Implementation',
        url: 'https://www.txdmv.gov/dealers/HB718',
      },
      {
        label: 'TxDMV Buying or Selling a Vehicle',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
      },
      {
        label: 'NY DMV In-Transit Vehicle Permits',
        url: 'https://dmv.ny.gov/registration/in-transit-vehicle-permits-temporary-registrations',
      },
      {
        label: 'NY DMV In-Transit Permit / Title Application MV-82ITP PDF',
        url: 'https://dmv.ny.gov/forms/mv82itp.pdf',
      },
      {
        label: 'NY DMV Registrations',
        url: 'https://dmv.ny.gov/registrations',
      },
      {
        label: 'FLHSMV License Plates and Registration',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/license-plates-registration/',
      },
      {
        label: 'FLHSMV Electronic Temporary Registration System',
        url: 'https://www.flhsmv.gov/motor-vehicles-tags-titles/dealers-installers-manufacturers-distributors-importers/authorized-service-providers/electronic-temporary-registration-system/',
      },
      {
        label: 'FLHSMV Application for Temporary License Plate HSMV 83091 PDF',
        url: 'https://www.flhsmv.gov/pdf/forms/83091.pdf',
      },
      {
        label: 'FLHSMV Forms',
        url: 'https://www.flhsmv.gov/resources/forms/',
      },
      {
        label: 'Washington DOL Trip Permits for Unlicensed Vehicles',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/license-plates/trip-permits-unlicensed-vehicles',
      },
      {
        label: 'Washington DOL Buy and Register a Vehicle',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/buy-and-register-vehicle',
      },
      {
        label: 'Washington DOL Vehicle Licensing Offices',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicle-licensing-offices',
      },
      {
        label: 'Oregon DMV Vehicle Trip Permits',
        url: 'https://www.oregon.gov/odot/dmv/pages/vehicle/trippermit.aspx',
      },
      {
        label: 'Oregon DMV Vehicle Title Registration and Permit Fees',
        url: 'https://www.oregon.gov/odot/dmv/pages/fees/vehicle.aspx',
      },
      {
        label: 'Oregon DMV Online Services and Trip Permit Quick Tips',
        url: 'https://www.oregon.gov/odot/dmv/pages/online_quick_tips/services.aspx',
      },
      {
        label: 'Virginia DMV Trip Permit',
        url: 'https://www.dmv.virginia.gov/vehicles/registration/temp-permit',
      },
      {
        label: 'Virginia DMV Register Your Vehicle',
        url: 'https://www.dmv.virginia.gov/vehicles/registration',
      },
      {
        label: 'Virginia DMV Insurance Requirements',
        url: 'https://www.dmv.virginia.gov/vehicles/#insurance',
      },
      {
        label: 'Georgia DOR Temporary Operating Permits',
        url: 'https://dor.georgia.gov/temporary-operating-permits-tops',
      },
      {
        label: 'Georgia DOR Motor Vehicles',
        url: 'https://dor.georgia.gov/motor-vehicles',
      },
      {
        label: 'Colorado DMV Registration',
        url: 'https://dmv.colorado.gov/registration',
      },
      {
        label: 'Colorado DMV Dealer Issued Temporary Permits',
        url: 'https://dmv.colorado.gov/dealer-issued-temporary-permits',
      },
      {
        label: 'Colorado DMV County Motor Vehicle Offices',
        url: 'https://dmv.colorado.gov/county-motor-vehicle-offices',
      },
      {
        label: 'Mass.gov Transfer Registration from Dealer Purchase',
        url: 'https://www.mass.gov/how-to/transfer-your-registration-to-a-vehicle-or-trailer-purchased-from-a-dealer',
      },
      {
        label: 'Mass.gov Transfer Registration from Individual Purchase',
        url: 'https://www.mass.gov/how-to/transfer-your-registration-to-a-vehicle-or-trailer-purchased-from-an-individual',
      },
      {
        label: 'Mass.gov Non-Resident Short-Term Registration',
        url: 'https://www.mass.gov/how-to/apply-for-a-non-resident-short-term-registration',
      },
      {
        label: 'Mass.gov Registration and Title for Dealer Purchase',
        url: 'https://www.mass.gov/how-to/apply-for-a-registration-and-title-for-a-vehicle-purchased-from-a-dealer',
      },
    ],
    relatedStateIds: [
      'california',
      'texas',
      'new-york',
      'florida',
      'washington',
      'oregon',
      'virginia',
      'georgia',
      'colorado',
      'massachusetts',
    ],
  },
  {
    slug: 'vehicle-inspection-emissions-smog-vin-check',
    title: '车辆年检、emissions、smog 和 VIN inspection，registration 卡住怎么办',
    eyebrow: '车辆检查',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '美国没有全国统一的车辆年检规则。买车、搬州、续 registration 或从外州带车时，先分清 safety inspection、emissions / smog check、VIN verification 和 registration hold，才能知道该找 DMV、排放项目、检查站还是 county office。',
    whoNeedsIt: [
      '刚搬到新州，把外州车辆带来登记的人。',
      'registration renewal 被提示 inspection、emissions、smog、VIN 或 insurance 卡住的人。',
      '在美国买二手车，不确定 title transfer 前后要不要验车的人。',
      '住在加州、纽约、德州、新泽西、宾州、维州、马州、北卡、亚利桑那、科罗拉多或俄勒冈等有检查/排放规则州的人。',
    ],
    keyFacts: [
      'Safety inspection、emissions inspection、California smog check、VIN verification 和 road-test vehicle check 不是同一件事。一个州可能只要求其中一项，也可能按县、车型、燃料、年份或登记场景组合要求。',
      '加州常见关键词是 smog inspection。California DMV 和 BAR 都把 smog check 与 vehicle registration、renewal、seller responsibility、车型年份和豁免条件放在同一体系里说明。',
      '纽约 DMV 把 vehicle safety inspection 和 emissions inspection 放在同一 inspection 体系下；车辆通常需要在登记后按期限检查，并在续期时保持 inspection sticker 有效。',
      '德州 2025 年 1 月 1 日起，多数非商用车辆不再做年度 safety inspection，但 TCEQ / Texas DMV 仍要求指定县的适用车辆完成 emissions inspection 才能登记或续 registration；Bexar County 将从 2026 年 11 月 1 日加入。',
      '新泽西、宾州、维州、马州、北卡、亚利桑那、科罗拉多和俄勒冈等州的规则差异很大。有的州按县或都会区要求排放，有的州把安全检查和排放检查分开，有的州使用指定检查站。',
      '佛州这类问题更常见在 out-of-state vehicle 的 VIN / odometer verification 或 title / registration 文件核验，而不是把“年检”当作全国统一前置条件。',
      '检查失败通常不是驾照问题，也不等于 DMV 能现场解除。大多数场景要先修车、复检、按官方项目申请 waiver / extension，或等检查记录回传后再续 registration。',
    ],
    checklist: [
      '先确认场景：新居民车辆登记、买二手车、registration renewal、title transfer、外州车辆转入、路考用车，还是收到 hold / denial 通知。',
      '确认车辆所在地和登记地：州、county、ZIP code、车牌州、车辆年份、fuel type、weight class、commercial / non-commercial。',
      '打开本州 DMV / motor vehicle 页面，查关键词：inspection、emissions、smog、VIN verification、new resident、registration renewal。',
      '准备车辆文件：title 或 registration、VIN、plate number、insurance proof、renewal notice、inspection notice、dealer paperwork 或 bill of sale。',
      '如果是排放或 smog，确认是否必须去授权站点、是否需要先修理 check engine light、是否有 grace period、waiver、exemption 或 retest 程序。',
      '如果是 VIN verification，确认谁可以验：DMV / county office、law enforcement、licensed dealer、notary、inspection station 或州表格指定人员。',
      '保留 inspection certificate、smog certificate、repair invoice、waiver approval、VIN verification form、online confirmation 和 registration receipt。',
    ],
    steps: [
      '第一步：不要直接搜索“美国车辆年检”。先打开车辆登记州的官方 DMV / motor vehicle inspection 页面，确认本州是否真的有 safety inspection、emissions / smog 或 VIN verification。',
      '第二步：把问题拆成四类。Safety inspection 看车辆安全设备；emissions / smog 看排放系统；VIN verification 看车辆身份号码和文件一致性；registration hold 看是否有保险、罚单、toll 或系统记录未解除。',
      '第三步：按 county 和车辆类型确认。德州、北卡、亚利桑那、科罗拉多、俄勒冈等排放规则常按地区或空气质量项目划分，不能只看州名。',
      '第四步：如果是买车或搬州，先看 title / registration 页面要求的顺序。有些地方要求先拿保险和 VIN verification，有些地方允许先登记再在期限内完成 inspection。',
      '第五步：如果检查失败，先看官方 failure / retest / waiver 规则。不要只拿失败单去 DMV 排队；多数情况下 DMV 需要合格记录、豁免记录或检查系统更新。',
      '第六步：完成检查后再回到 registration renewal、title transfer 或 county tax / tag office 流程，确认记录已同步，实体 sticker、registration card 或 plate 是否已经更新。',
    ],
    faqs: [
      {
        question: '美国车辆年检是全国统一的吗？',
        answer:
          '不是。每个州甚至同一州不同 county 都可能不同。加州偏 smog，纽约同时讲 safety 和 emissions，德州 2025 后多数非商用车不做年度 safety inspection 但部分县仍要 emissions，佛州常见卡点反而是 VIN / odometer verification。',
      },
      {
        question: 'smog、emissions 和 safety inspection 有什么区别？',
        answer:
          'Smog / emissions 主要看排放系统和污染控制；safety inspection 主要看灯、刹车、轮胎、玻璃、转向等安全项目。名称和项目由州决定，不能用中文“年检”一词全部概括。',
      },
      {
        question: '搬到新州后，外州车一定要先检查才能登记吗？',
        answer:
          '不一定。要看新州 new resident、title / registration 和 inspection 页面。有的州把 VIN verification 放在 title / registration 前，有的州给登记后检查期限，有的州只对特定 county 或车型要求排放。',
      },
      {
        question: '检查失败后还能续 registration 吗？',
        answer:
          '看州和失败类型。通常要先维修并复检，或按官方项目申请 waiver / extension。DMV 柜台通常不能把失败的 emissions / smog 记录直接改成通过。',
      },
      {
        question: 'VIN inspection 和 emissions inspection 是一回事吗？',
        answer:
          '不是。VIN verification 是核对车辆识别号码和文件是否一致，常见于外州车辆、title transfer 或登记核验；emissions / smog 是排放检查，通常和空气质量项目、车型年份、燃料类型或 county 相关。',
      },
    ],
    factChecks: [
      {
        claim:
          'Safety inspection、emissions/smog 和 VIN verification 对应不同检查目标；申请人必须按登记州、county、车型和业务场景分别判断。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/',
          'https://dmv.ny.gov/inspection/inspection-requirements',
          'https://www.flhsmv.gov/pdf/forms/82042.pdf',
        ],
      },
      {
        claim:
          'California Smog Check 与 registration renewal、title transfer、seller responsibility 和车型豁免相关，不能用普通 safety inspection 代替。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/',
          'https://www.bar.ca.gov/consumer/smog-check-program',
        ],
      },
      {
        claim:
          'New York 将 safety 与 emissions 纳入州 inspection 体系，并要求车辆按登记和 sticker 期限保持有效检查状态。',
        sourceUrls: [
          'https://dmv.ny.gov/inspections',
          'https://dmv.ny.gov/inspection/inspection-requirements',
        ],
      },
      {
        claim:
          'Texas 自 2025 年 1 月 1 日起取消多数非商用车辆的年度 safety inspection，但 commercial vehicle 和 emissions program 仍有独立要求。',
        sourceUrls: [
          'https://www.dps.texas.gov/news/dps-reminds-texans-vehicle-safety-inspection-changes',
          'https://www.txdmv.gov/motorists/register-your-vehicle',
        ],
      },
      {
        claim:
          'Texas 目前有 17 个 county 执行 annual emissions inspection；Bexar County 将从 2026 年 11 月 1 日开始执行，未合规会阻止 registration renewal。',
        sourceUrls: [
          'https://www.tceq.texas.gov/airquality/mobilesource/vim/overview.html',
        ],
      },
      {
        claim:
          'New Jersey 的 inspection 资格、到期时间和指定检查方式按车辆类型与登记状态决定，不能假设所有车辆都走同一检查周期。',
        sourceUrls: [
          'https://www.nj.gov/mvc/inspection/aboutinsp.htm',
          'https://www.nj.gov/mvc/inspection/inspecthow.htm',
        ],
      },
      {
        claim:
          'Pennsylvania 的 safety inspection 与 emissions inspection 是两个官方项目，后者还会按 county 和车辆条件判断。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/safety-inspection-program',
          'https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/emission-inspections-program',
        ],
      },
      {
        claim:
          'Virginia 的 annual safety inspection 由 State Police 体系管理，emissions 则由 DMV 按适用地区和 registration 条件处理。',
        sourceUrls: [
          'https://vsp.virginia.gov/safety-and-enforcement/vehicle-safety-inspection/',
          'https://www.dmv.virginia.gov/vehicles/registration/emissions',
        ],
      },
      {
        claim:
          'Florida 新居民车辆 title/registration 常见的是 VIN 与 odometer verification；该表格不能被概括成全州年度 emissions inspection。',
        sourceUrls: [
          'https://www.flhsmv.gov/new-resident/',
          'https://www.flhsmv.gov/pdf/forms/82042.pdf',
        ],
      },
      {
        claim:
          'Oregon Vehicle Inspection Program 只覆盖指定地区和适用车辆，检查要求应按车辆登记地址与 DEQ 边界查询。',
        sourceUrls: [
          'https://www.oregon.gov/deq/Vehicle-Inspection/Pages/default.aspx',
        ],
      },
    ],
    editorNotes: [
      '这页避免使用“美国年检”作为单一规则，因为官方来源显示 inspection、emissions、smog 和 VIN verification 的触发条件完全不同。',
      '德州是必须写清的变化点：2025 年后多数非商用车 annual safety inspection 取消，但 emissions county 规则仍可影响 registration。',
      '佛州不要硬写成“也要排放年检”。更准确的中文提醒是：外州车 title / registration 场景里先查 VIN / odometer verification。',
      '车辆检查不是机械维修建议。本站只解释 DMV / registration 路径，不判断车辆故障、维修报价或排放系统是否能通过。',
      '后续扩展可以把这页拆成 state-by-state inspection directory；当前阶段先用高质量专题承接搜索需求。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 vehicle registration、title、inspection、emissions、VIN verification、线上服务和办公室入口。',
    },
    sources: [
      {
        label: 'California DMV Smog Inspections',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/smog-inspections/',
      },
      {
        label: 'California BAR Smog Check Program',
        url: 'https://www.bar.ca.gov/consumer/smog-check-program',
      },
      {
        label: 'NY DMV Inspections',
        url: 'https://dmv.ny.gov/inspections',
      },
      {
        label: 'NY DMV Inspection Requirements',
        url: 'https://dmv.ny.gov/inspection/inspection-requirements',
      },
      {
        label: 'Texas DPS Vehicle Safety Inspection Program Changes',
        url: 'https://www.dps.texas.gov/news/dps-reminds-texans-vehicle-safety-inspection-changes',
      },
      {
        label: 'Texas DMV Register Your Vehicle',
        url: 'https://www.txdmv.gov/motorists/register-your-vehicle',
      },
      {
        label: 'TCEQ Vehicle Inspection and Maintenance Program',
        url: 'https://www.tceq.texas.gov/airquality/mobilesource/vim/overview.html',
      },
      {
        label: 'NJ MVC Vehicle Inspection',
        url: 'https://www.nj.gov/mvc/inspection/aboutinsp.htm',
      },
      {
        label: 'NJ MVC How to Get Your Vehicle Inspected',
        url: 'https://www.nj.gov/mvc/inspection/inspecthow.htm',
      },
      {
        label: 'PennDOT Safety Inspection Program',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/safety-inspection-program',
      },
      {
        label: 'PennDOT Emission Inspections Program',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/inspection-and-safety-requirements/emission-inspections-program',
      },
      {
        label: 'Virginia DMV Emissions Inspections',
        url: 'https://www.dmv.virginia.gov/vehicles/registration/emissions',
      },
      {
        label: 'Virginia State Police Vehicle Safety Inspection',
        url: 'https://vsp.virginia.gov/safety-and-enforcement/vehicle-safety-inspection/',
      },
      {
        label: 'Mass.gov Vehicle Inspections',
        url: 'https://www.mass.gov/info-details/vehicle-inspections',
      },
      {
        label: 'NCDMV Safety and Emissions Inspections',
        url: 'https://www.ncdot.gov/dmv/title-registration/emissions-safety/Pages/default.aspx',
      },
      {
        label: 'FLHSMV New Resident',
        url: 'https://www.flhsmv.gov/new-resident/',
      },
      {
        label: 'FLHSMV VIN and Odometer Verification Form',
        url: 'https://www.flhsmv.gov/pdf/forms/82042.pdf',
      },
      {
        label: 'Arizona MVD Emissions',
        url: 'https://azdot.gov/mvd/services/vehicle-services/vehicle-registration/emissions',
      },
      {
        label: 'Arizona Vehicle Emissions Testing',
        url: 'https://www.myazcar.com/',
      },
      {
        label: 'Colorado DMV Emissions',
        url: 'https://dmv.colorado.gov/emissions',
      },
      {
        label: 'Oregon DEQ Vehicle Inspection Program',
        url: 'https://www.oregon.gov/deq/Vehicle-Inspection/Pages/default.aspx',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'massachusetts',
      'north-carolina',
      'arizona',
      'colorado',
      'oregon',
    ],
  },
  {
    slug: 'sold-car-release-liability-plates-insurance',
    title: '卖车、捐车或报废后，DMV 责任解除、车牌和保险怎么收尾',
    eyebrow: '车辆收尾',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '卖车不是把钥匙和 title 交出去就结束。很多州还要提交 sold notice / release of liability、移除或退还车牌、确认买方 title transfer，并按正确顺序取消保险。',
    whoNeedsIt: [
      '刚把车卖给私人买家、dealer、亲友或捐赠机构的人。',
      '卖车后仍收到停车罚单、toll、registration renewal 或保险通知的人。',
      '准备取消保险、退牌、转移车牌或申请 registration refund 的车主。',
      '车辆被报废、junked、destroyed、保险公司收走或搬出原州的人。',
    ],
    keyFacts: [
      'Seller notice / release of liability、title transfer、plate surrender 和 insurance cancellation 是不同动作；提交卖车通知通常不能替代买方完成 title transfer。',
      '部分州有明确卖车通知期限：California 要求卖方在出售或转让后 5 个 calendar days 内提交 NRL；Washington 要在 sale date 后 5 个 business days 内提交 Report of Sale；Texas 的 Vehicle Transfer Notification 保护期围绕 30 天；Oregon 和 Arizona sold notice 以 10 天为核心提醒。',
      '车牌规则高度州别化。Florida、New Jersey、Washington 和 Virginia 都强调卖方移除车牌；New York、New Jersey、Virginia、North Carolina、Pennsylvania 等州还会把退牌、登记和保险顺序连在一起。',
      '保险不能随便先取消。New York、North Carolina、Virginia 和 Pennsylvania 的官方页面都把 plate surrender / inactivation / return 与取消保险或避免 registration suspension、driver license suspension、civil penalty 关联起来。',
      '卖给 dealer 或 trade-in 不一定自动清掉卖方记录。Texas 提醒车辆可能仍在卖方名下直到 dealer 转售；Washington 也提醒 owner 要确认 dealer 是否提交 Report of Sale。',
      '保留确认号、plate surrender receipt、bill of sale、title 复印件、dealer trade-in 文件和保险取消确认，是日后处理罚单、toll、保险 lapse 或 registration renewal 的关键证据。',
    ],
    checklist: [
      '确认交易类型：private sale、trade-in、donation、gift、junked/destroyed、insurance total loss、out-of-state sale 或搬出原州。',
      '在 title 上填写卖方签名、买方姓名地址、sale date、sale price / gift、odometer reading；有 lien 时先看 lien release 或 payoff 规则。',
      '准备 bill of sale、title 复印件或 dealer/trade-in paperwork，至少保存买方信息、VIN、plate number、成交日期和价格。',
      '按原登记州提交 sold notice、report of sale、notice of transfer 或 release of liability，并保存 confirmation。',
      '处理车牌：移除、转移、surrender、inactivate、deface、mail back 或保留，按本州官方页面执行。',
      '按正确顺序取消保险：先确认 plate / registration 已 surrender、inactivate 或按州要求处理，再让保险公司取消或转移 coverage。',
      '检查电子 toll pass、parking permit、city/county tax account、online DMV account 或 License Express / MyDMV 里是否还挂着这辆车。',
    ],
    steps: [
      '第一步：先打开原登记州的 selling a vehicle / notice of sale / plate surrender 页面，不要只看买方 title transfer 页面。',
      '第二步：成交当天完成 title、bill of sale、odometer、sale date、buyer information 和 lien release 文件；不要把空白 title 或原件复印件随意交出去。',
      '第三步：立即移除车牌和个人文件；如果州允许转移车牌，确认只能转到符合条件的自己名下车辆。',
      '第四步：在州规定期限内提交 release of liability、report of sale、sold notice 或 vehicle transfer notification，并下载或截图确认。',
      '第五步：如果不再使用该 registration，按州规则退牌、取消 registration 或 inactivate plates；New York、North Carolina、Virginia 等州尤其要先处理 plate 再取消保险。',
      '第六步：等 DMV 记录、plate receipt 和保险取消/转移确认都保存后，再处理 toll pass、停车许可、车库、城市税或贷款账户等非 DMV 收尾。',
    ],
    faqs: [
      {
        question: '我已经把 title 签给买家了，还要通知 DMV 吗？',
        answer:
          '很多州仍然建议或要求卖方单独提交 notice / report。California 明确说明 NRL 不等于转移所有权；Washington 的 Report of Sale 也不是 title transfer。它们主要保护卖方免受后续罚单、toll 或责任牵连。',
      },
      {
        question: '卖给 dealer 或 trade-in，还需要自己提交 sold notice 吗？',
        answer:
          '要看州。Texas 提醒卖给 licensed dealer 后车辆可能还留在卖方名下，直到 dealer 卖给个人；Washington 也说 dealer 可能代交 Report of Sale，但 owner 仍要确认。保险和车牌也要按原州规则收尾。',
      },
      {
        question: '卖车后可以先取消保险吗？',
        answer:
          '不要直接取消。New York、North Carolina、Virginia 和 Pennsylvania 都把保险取消与退牌、登记或 suspension 风险联系在一起。安全顺序通常是先处理 plate / registration，再取消或转移 insurance。',
      },
      {
        question: '车牌可以留给买家吗？',
        answer:
          '不能跨州套用。Florida、New Jersey、Washington、Virginia 都强调卖方移除车牌；Texas 允许卖方选择移除、转移、保留或按规则毁坏不用的牌照。按原登记州页面执行。',
      },
      {
        question: '卖车后还收到 renewal、罚单或 toll 怎么办？',
        answer:
          '先找 confirmation、plate surrender receipt、bill of sale、title 复印件或 dealer/trade-in 文件，再按原州 DMV 页面补交 sold notice、NRL 或证明文件。California、Texas、Pennsylvania 等官方页面都提醒卖方记录不完整会带来后续责任或通知。',
      },
    ],
    factChecks: [
      {
        claim:
          'California 卖方必须在出售或转让后 5 个 calendar days 内提交 Notice of Transfer and Release of Liability，并保存确认。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
        ],
      },
      {
        claim:
          'California 明确说明 NRL 只更新卖方责任记录，不构成 ownership transfer；买方仍需完成 title transfer 和费用。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/',
        ],
      },
      {
        claim:
          'Washington 卖方应在成交后 5 个 business days 内提交 Vehicle Report of Sale，买方 title/registration 是另一项手续。',
        sourceUrls: [
          'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/sell-vehicle',
        ],
      },
      {
        claim:
          'Texas 建议卖方在转让后 30 天内提交 Vehicle Transfer Notification；卖给 dealer 或 trade-in 也应确认该记录是否已提交。',
        sourceUrls: ['https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle'],
      },
      {
        claim:
          'Oregon 卖方应在出售、赠与或转让车辆后 10 天内通知 DMV，并保存 transaction information。',
        sourceUrls: [
          'https://www.oregon.gov/odot/dmv/pages/online_quick_tips/vehicle_information.aspx',
        ],
      },
      {
        claim:
          'Arizona 的 sold notice 应在车辆出售、trade-in、赠与或其他转让后 10 天内提交，以更新卖方记录。',
        sourceUrls: ['https://azdot.gov/mvd/services/registration-plates-title/selling-vehicle'],
      },
      {
        claim:
          'New York 要求在 liability insurance 结束前先 surrender registration 和 plates；车辆只是停放或卖出也不能跳过该顺序。',
        sourceUrls: [
          'https://dmv.ny.gov/insurance/change-reinstate-or-cancel-insurance-coverage',
          'https://dmv.ny.gov/registration/surrender-return-or-turn-in-your-vehicle-plates-and-registration',
        ],
      },
      {
        claim:
          'Florida 卖车时 seller 应从车辆上移除 license plate，并完成 title、odometer 和 notice of sale 等收尾。',
        sourceUrls: [
          'https://www.flhsmv.gov/safety-center/consumer-education/selling-vehicle-florida/',
        ],
      },
      {
        claim:
          'New Jersey seller 应移除车牌；不转移到另一辆本人车辆时，应按 MVC 路径 surrender plates/registration 并保留 receipt。',
        sourceUrls: [
          'https://www.nj.gov/mvc/vehicles/transowner.htm',
          'https://www.nj.gov/mvc/vehicles/surrenderreg.htm',
        ],
      },
      {
        claim:
          'North Carolina 要求登记车辆持续保持 liability insurance；出售或停用车辆时，应先按 DMV plate/registration 规则处理再取消保险。',
        sourceUrls: [
          'https://www.ncdot.gov/dmv/title-registration/insurance-requirements/Pages/default.aspx',
        ],
      },
    ],
    editorNotes: [
      '这页必须和“买车或搬州后登记顺序”分开：前者是买方/新居民登记路径，本页是卖方从 DMV、车牌和保险记录里退出。',
      '避免写成全国统一期限。正文只把 CA 5 calendar days、WA 5 days、TX 30 days、OR/AZ 10 days 作为官方例子，并提醒回到原登记州确认。',
      '退牌与保险顺序是高风险点。NY、NC、VA、PA 的规则都支持“不要先取消保险再想起车牌”的中文提醒。',
      'NRL / Report of Sale / Vehicle Transfer Notification 保护卖方，但不自动完成 buyer title transfer；FAQ 需要反复拆开这两个概念。',
      '这页不是二手车交易法律建议，不判断贷款 payoff、sale tax、dealer 合同或保险理赔争议。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、车辆服务、登记、title、plate、线上服务和办公室入口。',
    },
    sources: [
      {
        label: 'California DMV Notice of Transfer and Release of Liability',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/notice-of-transfer-and-release-of-liability-nrl/',
      },
      {
        label: 'California DMV Title Transfers and Changes',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/titles/title-transfers-and-changes/',
      },
      {
        label: 'NY DMV Surrender Vehicle Plates and Registration',
        url: 'https://dmv.ny.gov/registration/surrender-return-or-turn-in-your-vehicle-plates-and-registration',
      },
      {
        label: 'NY DMV Change, Reinstate or Cancel Insurance Coverage',
        url: 'https://dmv.ny.gov/insurance/change-reinstate-or-cancel-insurance-coverage',
      },
      {
        label: 'FLHSMV Selling a Vehicle',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/selling-vehicle-florida/',
      },
      {
        label: 'NJ MVC Transferring Vehicle Ownership',
        url: 'https://www.nj.gov/mvc/vehicles/transowner.htm',
      },
      {
        label: 'NJ MVC Surrendering Registration',
        url: 'https://www.nj.gov/mvc/vehicles/surrenderreg.htm',
      },
      {
        label: 'Texas DMV Buying or Selling a Vehicle',
        url: 'https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle',
      },
      {
        label: 'Washington DOL Sell a Vehicle',
        url: 'https://dol.wa.gov/vehicles-and-boats/vehicles/buying-and-selling-vehicle/sell-vehicle',
      },
      {
        label: 'PennDOT Types of Insurance Letters',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/insurance-overview/types-of-insurance-letters-from-penndot',
      },
      {
        label: 'NCDMV Vehicle Insurance Requirements',
        url: 'https://www.ncdot.gov/dmv/title-registration/insurance-requirements/Pages/default.aspx',
      },
      {
        label: 'NCDMV Vehicle Titles',
        url: 'https://www.ncdot.gov/dmv/title-registration/vehicle/Pages/default.aspx',
      },
      {
        label: 'Virginia DMV Buying/Selling a Vehicle',
        url: 'https://www.dmv.virginia.gov/vehicles/buy-sell',
      },
      {
        label: 'Virginia DMV What to Do with Your License Plates',
        url: 'https://www.dmv.virginia.gov/vehicles/license-plates/surrender',
      },
      {
        label: 'Oregon DMV Vehicle Information',
        url: 'https://www.oregon.gov/odot/dmv/pages/online_quick_tips/vehicle_information.aspx',
      },
      {
        label: 'Arizona MVD Selling Your Vehicle',
        url: 'https://azdot.gov/mvd/services/registration-plates-title/selling-vehicle',
      },
      {
        label: 'Massachusetts RMV Cancel Your Vehicle Registration',
        url: 'https://www.mass.gov/how-to/cancel-your-vehicle-registration-license-plates',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'new-jersey',
      'texas',
      'washington',
      'pennsylvania',
      'north-carolina',
      'virginia',
      'oregon',
      'arizona',
      'massachusetts',
    ],
  },
  {
    slug: 'tickets-tolls-insurance-lapse-registration-hold',
    title: '罚单、toll、保险 lapse 或 registration hold，先查 DMV 还是法院',
    eyebrow: '问题排查',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      'DMV 系统显示 hold、suspension、denial 或不能续 registration，不一定是 DMV 自己能解除。罚单、toll、保险 lapse、parking ticket、court suspension 和地方税费常常要先找发起机构处理。',
    whoNeedsIt: [
      '续 registration、换驾照或办线上服务时被系统提示 hold、suspended、denied、blocked 的人。',
      '收到 DMV、法院、toll agency、保险 lapse 或 parking ticket 通知的人。',
      '卖车后仍收到 toll、parking ticket 或 renewal notice，需要判断是不是 DMV 记录没清的人。',
      '不知道应该先联系 DMV、法院 clerk、city parking、toll authority、insurance company 还是 county tax office 的人。',
    ],
    keyFacts: [
      '同一个“卡住”可能影响不同对象：driver license、vehicle registration、license plate、title transfer、online renewal 或 registration renewal。先看通知写的是哪一个。',
      'Unpaid parking / toll / owner-responsibility citation 常常不是 DMV 直接判定。California、Virginia、Pennsylvania、Massachusetts 等官方页面都显示，地方机构、parking authority、toll agency 或 municipality 可能把记录发给 DMV/RMV，解除也通常要先回到发起机构。',
      'Insurance lapse 是另一条线，而且后果不是全国统一：New York 的 lapse 会先影响 registration，达到 91 天或期限尚未确定时还会影响 driver license；Florida 可能暂停 driving privilege、plate 或 registration；Pennsylvania、Virginia 和 New Jersey 也分别有 registration、driving privilege、费用或其他处罚规则。',
      'Traffic ticket / court suspension 经常要找法院。Florida 明确失败缴纳罚款、未出庭或未完成 court-ordered school 时，应联系 citation 所在 county 的 traffic court。',
      'Toll hold 和普通 parking ticket 不一定同一机构。NY DMV、FLHSMV、PennDOT、Virginia DMV 都把 toll authority / tolling agency 作为解决入口之一。',
      '“已付款”不等于 DMV 立刻恢复。Texas DPS FAQ、Virginia local-fee pages、PennDOT toll/parking pages都提醒，需要 reporting agency、locality、toll entity 或 court 把 clearance / compliance 回传，DMV 记录才会更新。',
    ],
    checklist: [
      '把所有通知拍照保存：DMV letter、court notice、toll invoice、parking ticket、insurance lapse letter、renewal denial、order number、case number、plate/VIN。',
      '先判断对象：是 driver license suspended，还是 vehicle registration suspended / denied / non-renewal，还是 plate / insurance / toll hold。',
      '看发起机构：DMV、court clerk、city parking authority、toll agency、insurance company、county tax assessor、municipality、child support agency 或 state revenue/tax agency。',
      '确认是否需要 payment、proof of insurance、plate surrender、court compliance、traffic school、restoration fee、reinstatement fee 或 clearance letter。',
      '如果已经卖车或搬州，准备 sold notice、release of liability、bill of sale、plate surrender receipt、insurance cancellation confirmation 和 toll account 关闭证明。',
      '完成处理后保存 receipt / confirmation，并等官方系统更新；如果 DMV 仍显示 hold，再拿确认号找原发起机构或 DMV compliance / restoration 页面。',
    ],
    steps: [
      '第一步：不要只看“DMV 卡住”四个字，先读通知的 reason code、order number、case number、plate、VIN 和发起机构。',
      '第二步：如果是 parking ticket、toll 或地方税费，先联系发出记录的 city / locality / toll authority / parking authority；DMV 多半只能看到 hold，不能解释每笔费用。',
      '第三步：如果是 insurance lapse，先确认车当时是否仍 registered、是否有 coverage、是否已退牌或 deactivate plate；必要时让保险公司电子提交 proof。',
      '第四步：如果是 traffic citation、failure to appear、failure to pay 或 court-ordered school，先联系 citation 所在法院或 clerk，满足 court requirements。',
      '第五步：按州规则支付 restoration / reinstatement / civil penalty；但不要把付款当成唯一动作，很多州还要求 proof、plate surrender 或 clearance 回传。',
      '第六步：记录恢复后再续 registration、办 license、卖车转移、取消保险或处理 toll pass，避免同一个问题反复挂回 DMV 记录。',
    ],
    faqs: [
      {
        question: 'DMV 显示 registration renewal 被 hold，是不是直接去 DMV 付款就好？',
        answer:
          '不一定。California 的 parking / toll 记录、Virginia 的 local tax / parking / toll denial、Pennsylvania 的 parking / toll suspension、Massachusetts 的 non-renewal 都说明，很多 hold 要先由发起机构处理或回传 clearance。',
      },
      {
        question: '保险 lapse 为什么会影响 registration 或驾照？',
        answer:
          '很多州要求登记车辆持续保持 liability insurance，但触发条件和后果不同。New York 在 lapse 达到 91 天或期限尚未确定时还会暂停 driver license；Florida 要求取消保险前先退牌；Pennsylvania、Virginia 和 New Jersey 的 registration、driving privilege、费用及处罚路径也各不相同。先按本州通知处理，不要套用别州经验。',
      },
      {
        question: '我已经交了罚单或 toll，为什么 DMV 还没恢复？',
        answer:
          '付款后系统更新可能需要原机构通知 DMV。Texas DPS 的 FTA/FTP FAQ 提醒已付款仍 suspended 时要联系 reporting agency；Virginia 和 PennDOT 页面也强调 locality、toll entity 或 parking authority 的 clearance / compliance。',
      },
      {
        question: '收到短信说 unpaid ticket 会 suspension，可以点链接付款吗？',
        answer:
          '不要直接点。Florida 和 Virginia DMV 都发布过类似 scam alert，提醒不要通过短信里的可疑链接付款。应从州 DMV、法院、toll agency 或官方账单上的网址/电话独立进入。',
      },
      {
        question: '卖车后收到 toll 或 parking ticket，是买家的事还是我的事？',
        answer:
          '先看违章日期、plate/VIN、title transfer、sold notice 和 plate surrender 是否完整。卖车通知、release of liability、bill of sale、退牌收据和 toll account 关闭记录，是向 DMV、toll agency 或 city parking 解释的核心证据。',
      },
    ],
    factChecks: [
      {
        claim:
          'California registration record 上的 parking、toll 或 owner-responsibility citation 来自对应 issuing agency；争议和 clearance 通常应先找发起机构。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/parking-toll-violations-on-record/',
          'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/owner-responsibility-citations-on-record/',
        ],
      },
      {
        claim:
          'New York 可因 5 年内 3 次以上 toll violation，或同一期间未付 toll、fee 和 charge 达到 200 美元，暂停相关 vehicle registration。',
        sourceUrls: [
          'https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls',
        ],
      },
      {
        claim:
          'Pennsylvania registration 可能因 4 张以上 unpaid toll invoice、欠款与费用达到 250 美元，或 toll payment plan default 而被暂停。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-tolls',
        ],
      },
      {
        claim:
          'Virginia 在一张 invoice 涉及两笔或以上 unpaid toll 时，toll facility operator 可限制相关车辆 registration 的 reissue 或 renewal；车主应联系报告该记录的 toll facility。',
        sourceUrls: ['https://www.dmv.virginia.gov/vehicles/registration/denials'],
      },
      {
        claim:
          'Florida 因 failure to pay、failure to appear 或未完成 court-ordered school 被暂停时，应先满足 citation 所在 county court 的要求，再等待电子 clearance 并处理 reinstatement fee。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/traffic-citations-court-suspensions/',
        ],
      },
      {
        claim:
          'New York 的 liability insurance lapse 会导致 registration suspension；lapse 达到 91 天或期限尚未确定时，driver license 也会被暂停。',
        sourceUrls: ['https://dmv.ny.gov/insurance/insurance-lapses'],
      },
      {
        claim:
          'Pennsylvania 保险中断超过 30 天可导致三个月 vehicle registration suspension，并要求退回 plate/card；恢复前还要提交有效保险证明和 restoration fee。',
        sourceUrls: [
          'https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/financial-responsibility-faqs',
        ],
      },
      {
        claim:
          'Florida 要求有有效 registration 的车辆持续保持 PIP/PDL；取消保险前应先退牌，否则 driving privilege、plate 或 registration 可能被暂停，并可能产生 reinstatement fee。',
        sourceUrls: ['https://www.flhsmv.gov/insurance/'],
      },
      {
        claim:
          'New Jersey 要求登记车辆保持强制保险；驾驶 uninsured vehicle 可能带来罚款、community service、license suspension 和 insurance surcharge。',
        sourceUrls: ['https://www.nj.gov/mvc/vehicles/insurancerequirements.htm'],
      },
      {
        claim:
          'Virginia 在 registration period 内保险终止时，车主必须重新投保、deactivate plates 或永久退牌；未保险车主可能被暂停 driving 和 vehicle registration privileges，并被要求缴费及提交 SR-22。',
        sourceUrls: ['https://www.dmv.virginia.gov/vehicles/insurance-requirements'],
      },
      {
        claim:
          'Massachusetts Non-Renewal Program 由参与的 municipality 或 authority 报送 unpaid obligation，RMV 不能替发起机构裁定或清除原始欠款。',
        sourceUrls: ['https://www.mass.gov/info-details/non-renewal-program'],
      },
      {
        claim:
          'Texas FTA/FTP 记录即使已经付款，也需要 reporting agency 或 court 正确回传 compliance；driver license status 不会只凭付款截图自动恢复。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/faq/section-8-failure-appear-and-failure-pay-ftaftp',
        ],
      },
      {
        claim:
          '政府机构已警告存在以 unpaid toll、ticket 或 suspension 为由的诈骗短信；用户应从 DMV、court 或 toll agency 官方入口独立核验，不点击短信付款链接。',
        sourceUrls: [
          'https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam',
          'https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/',
        ],
      },
    ],
    editorNotes: [
      '这页的重点不是“如何逃罚单”，而是帮助用户判断哪个机构有权解除 hold，以及哪些文件能证明自己已经合规。',
      '避免把 registration hold、driver license suspension、insurance lapse、parking ticket、toll invoice、court fine 写成同一件事。每个州会把发起机构、恢复费用和 clearance 路径拆开。',
      '高风险提醒必须保守：未缴罚单、法院未出庭、保险中断和无保险驾驶都可能有法律后果，本站只做官方入口导航，不提供法律辩护或责任判断。',
      '诈骗提醒很重要。Florida 和 Virginia DMV 官方 scam alert 支持提示用户不要从短信链接付款，要从官方入口独立核验。',
      '卖车后 toll/parking 问题应链接到上一轮卖车/退牌主题的逻辑：sold notice、bill of sale、plate surrender 和 toll account closeout 是证据链。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、线上服务、恢复/续期、登记、保险和车辆业务官方入口。',
    },
    sources: [
      {
        label: 'California DMV Parking/Toll Violations on Record',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/parking-toll-violations-on-record/',
      },
      {
        label: 'California DMV Owner Responsibility Citations on Record',
        url: 'https://www.dmv.ca.gov/portal/handbook/vehicle-industry-registration-procedures-manual-2/renewals/owner-responsibility-citations-on-record/',
      },
      {
        label: 'NY DMV Registration Suspensions for Failure to Pay Tolls',
        url: 'https://dmv.ny.gov/registration/registration-suspensions-for-failure-to-pay-tolls',
      },
      {
        label: 'NY DMV Insurance Lapses',
        url: 'https://dmv.ny.gov/insurance/insurance-lapses',
      },
      {
        label: 'NY DMV Traffic Ticket Payment Plans',
        url: 'https://dmv.ny.gov/tickets/payment-plans',
      },
      {
        label: 'FLHSMV Traffic Citations or Court Suspensions',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/traffic-citations-court-suspensions/',
      },
      {
        label: 'FLHSMV Florida Insurance Requirements',
        url: 'https://www.flhsmv.gov/insurance/',
      },
      {
        label: 'FLHSMV Toll-by-Plate Information',
        url: 'https://www.flhsmv.gov/toll-by-plate-information/',
      },
      {
        label: 'NJ MVC Suspensions and Restorations',
        url: 'https://www.nj.gov/mvc/license/suspension.htm',
      },
      {
        label: 'NJ MVC Insurance Requirements',
        url: 'https://www.nj.gov/mvc/vehicles/insurancerequirements.htm',
      },
      {
        label: 'Texas DPS Failure to Appear and Failure to Pay FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-8-failure-appear-and-failure-pay-ftaftp',
      },
      {
        label: 'Texas DMV Motor Vehicle Registration Manual',
        url: 'https://www.txdmv.gov/sites/default/files/body-files/Motor_Vehicle_Registration_Manual_Book_298.pdf',
      },
      {
        label: 'PennDOT Suspensions Due to Unpaid Tolls',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-tolls',
      },
      {
        label: 'PennDOT Suspensions Due to Unpaid Parking Tickets',
        url: 'https://www.pa.gov/agencies/dmv/vehicle-services/registration-suspensions/suspensions-due-to-unpaid-parking-tickets',
      },
      {
        label: 'PennDOT Financial Responsibility FAQs',
        url: 'https://www.pa.gov/agencies/dmv/faqs/motor-vehicle-faqs/financial-responsibility-faqs',
      },
      {
        label: 'Virginia DMV Denial of Registrations or Renewal',
        url: 'https://www.dmv.virginia.gov/vehicles/registration/denials',
      },
      {
        label: 'Virginia DMV Insurance Requirements',
        url: 'https://www.dmv.virginia.gov/vehicles/insurance-requirements',
      },
      {
        label: 'Mass.gov RMV Non-Renewal Program',
        url: 'https://www.mass.gov/info-details/non-renewal-program',
      },
      {
        label: 'Mass.gov Non-motor Vehicle Suspensions',
        url: 'https://www.mass.gov/info-details/non-motor-vehicle-suspensions',
      },
      {
        label: 'Virginia DMV Toll Charge Text Scam Warning',
        url: 'https://www.dmv.virginia.gov/news/virginia-dmv-warns-customers-toll-charge-text-scam',
      },
      {
        label: 'FLHSMV Scam Alert',
        url: 'https://www.flhsmv.gov/safety-center/consumer-education/scam-alert/',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'new-jersey',
      'texas',
      'pennsylvania',
      'virginia',
      'massachusetts',
      'north-carolina',
      'washington',
    ],
  },
  {
    slug: 'driving-record-points-traffic-school',
    title: '驾照记录、points 和 traffic school：怎么查、怎么影响保险和停牌',
    eyebrow: '驾照记录',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '收到交通罚单、想查 driving record / MVR、担心 points、想上 traffic school / defensive driving / driver improvement，或雇主/保险要看驾驶记录时，不要只问“能不能消分”。不同州把驾驶记录、扣分、课程、保险折扣、停牌和商业驾照规则分得很细。',
    whoNeedsIt: [
      '收到 speeding、red light、careless driving、failure to appear 或 moving violation citation，不确定是否会进 driving record 或产生 points 的人。',
      '保险公司、雇主、法院、志愿组织、TNC 平台或自己想要 driving record、MVR、abstract、certified record 的人。',
      '想用 traffic school、defensive driving、driver improvement、PIRP、BDI 或 safe driving course 降低 points、避免停牌、满足法院要求或争取保险折扣的人。',
      '持有 CDL、开 commercial vehicle，或担心 commercial driver 记录保存更久、课程规则不同的人。',
      '看到网上说“上课就能消分”“德州 points 还在”“保险一定不涨”，想回到官方规则核对的人。',
    ],
    keyFacts: [
      'Driving record、MVR、abstract 和 license status 不是同一份东西。记录可能显示 violation、conviction、collision、departmental action、restriction、suspension、course completion 或 insurance/employment version；license status 只回答当前驾驶资格是否有效。',
      'Points 没有全国统一算法。California 成人常见 negligent operator 阈值是 12 个月 4 分、24 个月 6 分、36 个月 8 分；Florida 是 12 points / 12 months、18 points / 18 months、24 points / 36 months；Georgia 是 24 个月 15 分；Virginia 同时有 demerit points 和 safe driving points；Pennsylvania 到 6 分会触发纠正措施；New York 6 分以上可能有 Driver Responsibility Assessment，Texas 的 Driver Responsibility Program 已废止。',
      'Traffic school 不等于罚单从世界上消失。California 的 traffic violator school 可让合格 citation 不报给保险，但记录仍按规则存在；New York PIRP 最多只在停牌计算中减 4 分，ticket/points 不会从记录上物理删除；Florida BDI election 要按期限完成；Georgia、Virginia、Pennsylvania、Washington 的课程用途也各不相同。',
      '课程必须看“谁要求、谁批准、谁接收完成记录”。同样叫 defensive driving，在法院、DMV、保险公司、雇主或 CDL 场景下意义可能不同；Florida 课程完成由 provider 电子报告，California 要按法院给的 deadline 走，Virginia court-required clinic 是否给 safe driving points 由法院决定。',
      '雇主和保险看的 record type 可能不同。Washington 把 Full、Insurance、Employment、Alcohol/Drug Treatment record 分开；Virginia 有 personal use、employment、insurance、TNC 等类型；Texas defensive driving 通常要买 Type 3A certified complete driving history，买错版本可能白花钱。',
      'Out-of-state ticket 可能影响本州驾照。Florida 明确说明外州 citation 可传回佛州并按佛州规则给分，但不能用佛州学校去移除外州 citation 的 points；其他州也可能通过法院、DMV 或 interstate reporting 影响记录。',
      'CDL 和 commercial driver 规则更严格。California 记录保留期里 commercial driver / hazardous-materials / out-of-service 等场景会明显更长；Florida BDI election 排除 CDL；Virginia 对 CDL 或 commercial motor vehicle 要求 commercial driver improvement clinic。',
      'DMV points 和 insurance-company points 不是同一套。New York PIRP 页面特别提醒，课程对 DMV point calculation 和保险折扣的作用，不等于清除保险公司自己的评分或承保判断。',
      '时间线很关键：California traffic school 通常受 18-month 规则影响，New York PIRP 的保险折扣周期、Florida BDI 的 30 天 election、Virginia DMV-required clinic 的 90 天期限、New York sponsor report 的处理时间，都可能决定课程是否有效。',
      '这类页面只能做官方入口和规则解释，不能替你决定是否认罪、是否 contest ticket、是否影响具体保费；有争议的 citation、事故责任、商业驾驶或移民/刑事后果，应问法院、律师、保险公司或雇主。',
    ],
    checklist: [
      '先确定两件事：你的 license state 是哪里，citation / court / agency 是哪个州或县。',
      '决定你要买哪种记录：status check、driving record、MVR、abstract、certified complete history、employment record、insurance record，还是 court-specific 版本。',
      '看 citation 当前状态：pending、paid、convicted、dismissed、adjudication withheld、failure to appear、failure to pay、court-ordered course，或已经传给 DMV。',
      '查本州 points 页面，不要只看罚单金额；确认 violation 是否有 points、points 保留多久、多少 points 会导致 warning、probation、suspension 或 driver improvement requirement。',
      '如果考虑课程，确认 eligibility、deadline、provider approval、是否 CDL、是否 commercial vehicle、法院是否同意、保险公司是否认可。',
      '保存课程完成证明、court receipt、provider confirmation、DMV receipt、record order PDF 和保险/雇主要求的 record type。',
      '课程或付款后再查一次 status / driving record；如果 record 错误，按官方 record correction、court abstract 或 DMV contact 流程更正。',
      '商业驾驶、雇主审查、TNC、校车/巴士/危险品或保险争议场景，不要用普通 noncommercial driver 的经验套用。',
    ],
    steps: [
      '第一步：打开本州 DMV / DPS / RMV / MVC / DOL 的 driving record 页面，先确认 record 类型、费用、是否需要 certified copy、是否可在线打印。',
      '第二步：如果是为 court 或 defensive driving 准备 record，先看法院或州页面指定的 record type；Texas 这类州会区分 Type 2、Type 2A、Type 3、Type 3A。',
      '第三步：打开本州 points / penalties 页面，把 ticket 的 violation date、conviction date、disposition date 和 points 阈值分开看。',
      '第四步：若 ticket 还没结案，先查 court traffic school / defensive driving eligibility；不要在没看清后果前直接付款或报名。',
      '第五步：只选官方批准或法院接受的 provider，记录 deadline、完成报告方式、是否要自己提交 certificate，以及是否适用于 insurance discount。',
      '第六步：完成课程或缴费后，等待 provider / court / DMV 更新，再查 license status 和 driving record；如果仍有 suspension、FTA/FTP 或错误 conviction，回到发起机构处理。',
      '第七步：把给保险、雇主、法院的 record 和 receipt 分开存档；同一份 PDF 不一定满足所有用途。',
    ],
    faqs: [
      {
        question: 'Traffic school 能把罚单从 driving record 上删除吗？',
        answer:
          '通常不要这样理解。California 的合格 traffic school 更接近“不把某个 point 报给保险”，但 citation 仍按规则存在；New York PIRP 只是最多减 4 分用于 suspension calculation，points/tickets 不会从记录上物理删除。每州规则不同，先看法院和 DMV 页面。',
      },
      {
        question: '我该买哪种 driving record / MVR？',
        answer:
          '看用途。自己核对 status 可能只要普通 record；法院、defensive driving、雇主、保险、TNC 或官方证明可能要 certified、employment、insurance 或 complete history。Texas 明确把 Type 3A 标为 defensive driving 可用；Washington 和 Virginia 也把 employment / insurance 类型分开。',
      },
      {
        question: 'Points 和保险涨价是一回事吗？',
        answer:
          '不是。DMV points 用于州的 warning、course、probation、suspension 或 reinstatement 判断；保险公司可能看 driving record、事故、claims、SDIP 或自己的 rating plan。New York 明确提醒 PIRP 对 DMV points 和 insurance-company points 不是同一个概念。',
      },
      {
        question: '外州罚单会不会影响本州驾照？',
        answer:
          '可能会。Florida 明确说明外州 citation 可传回并按佛州规则评估 points，但佛州学校不能移除外州 citation 的 points。稳妥做法是同时看 ticket 所在法院/州规则，以及自己 license state 的 DMV 记录和 points 页面。',
      },
      {
        question: 'CDL 可以上 traffic school / defensive driving 消分吗？',
        answer:
          '不要套普通驾照规则。California、Florida、Virginia 等官方页面都把 CDL 或 commercial vehicle 场景单独处理；有些普通课程福利不适用于 CDL，或要上 commercial driver improvement clinic。商业驾驶最好直接核对 CDL-specific 页面、法院要求和雇主政策。',
      },
    ],
    factChecks: [
      {
        claim:
          'License status 与完整 driving record 不是同一产品；Texas Type 1 主要显示身份和当前 status，Type 3/3A 才列出完整事故与违规记录。',
        sourceUrls: [
          'https://txapps.texas.gov/apps/dps/txldr/html/recordTypes.html',
          'https://txapps.texas.gov/apps/dps/txldr/html/faq.html',
        ],
      },
      {
        claim:
          'Texas Type 3A 是 defensive driving course 可接受的 certified complete history；Type 2A 和 Type AR 官方说明为不适用于该用途。',
        sourceUrls: [
          'https://txapps.texas.gov/apps/dps/txldr/html/recordTypes.html',
          'https://txapps.texas.gov/apps/dps/txldr/html/faq.html',
        ],
      },
      {
        claim:
          'California 普通 Class C/M negligent-operator 常见阈值是 12 个月 4 分、24 个月 6 分和 36 个月 8 分，达到阈值可触发 DMV action。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/negligence/negligent-operator-actions/',
        ],
      },
      {
        claim:
          'Florida point suspension 阈值是 12 个月 12 分停 30 天、18 个月 18 分停 3 个月、36 个月 24 分停 1 年。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/points-point-suspensions/',
        ],
      },
      {
        claim:
          'New York PIRP 不会从 driving record 删除 violation、conviction 或 points；它最多把 suspension calculation 使用的 active points 减少 4 分。',
        sourceUrls: [
          'https://dmv.ny.gov/points-and-penalties/point-and-insurance-reduction-program',
        ],
      },
      {
        claim:
          'California 合格 noncommercial citation 通常在过去 18 个月未使用 traffic school 时才可能符合资格，并必须按法院期限完成 approved school。',
        sourceUrls: [
          'https://selfhelp.courts.ca.gov/traffic/traffic-school',
          'https://www.dmv.ca.gov/portal/vehicle-industry-services/occupational-licensing/occupational-license-lookup/traffic-school-list/',
        ],
      },
      {
        claim:
          'Washington 提供 Full、Insurance、Employment 和 Alcohol/Drug Treatment 等不同 driving record，使用人和可见字段并不相同。',
        sourceUrls: [
          'https://dol.wa.gov/driver-licenses-and-permits/driving-records/guide-driving-records',
        ],
      },
      {
        claim:
          'Texas Driver Responsibility Program 已被废止，旧文章所说的 DRP surcharge 不能当作当前 Texas points 或恢复规则。',
        sourceUrls: [
          'https://www.dps.texas.gov/news/driver-responsibility-program-repealed',
          'https://www.dps.texas.gov/section/driver-license/faq/driver-responsibility-program-surcharge-repeal-faqs',
        ],
      },
      {
        claim:
          'Georgia 驾驶人在任意连续 24 个月累积 15 分可被 suspension，points reduction 和 defensive driving 另有资格与时间限制。',
        sourceUrls: [
          'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations/points-and-points-reduction',
        ],
      },
      {
        claim:
          'DMV points 与保险公司 rating 不是同一套判断；New York PIRP 同时规定 DMV point calculation 和保险折扣，但不会清除原始违规记录。',
        sourceUrls: [
          'https://dmv.ny.gov/points-and-penalties/point-and-insurance-reduction-program',
          'https://dmv.ny.gov/points-and-penalties/pirp-and-ipirp',
        ],
      },
    ],
    editorNotes: [
      '这页不要承诺“消分”“不涨保险”或“上课就没事”。官方材料支持的说法是：课程可能影响 DMV 计算、保险折扣、法院合规或记录显示方式，但机制按州和用途不同。',
      '必须把 DMV、court、insurance company、employer、traffic school provider 分开写。用户真正需要的是知道哪个机构有权决定哪件事。',
      'Texas Driver Responsibility Program 已废止，不能写旧式“Texas points surcharge”逻辑；应提醒旧 DRP surcharge / points 信息可能过时。',
      '商业驾驶和 CDL 是高风险例外：不要把 noncommercial traffic school 规则推给 CDL 用户。',
      '不提供法律建议、事故责任判断或保险报价建议；争议罚单、吊销风险、商业驾驶和雇佣审查应让用户回到法院、律师、保险公司或雇主。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、driver record、license status、points、suspension、课程和车辆业务官方入口。',
    },
    sources: [
      {
        label: "California DMV Driver's Record Request",
        url: 'https://www.dmv.ca.gov/portal/customer-service/records-request/online-driver-record-request/',
      },
      {
        label: 'California Driver Handbook Laws and Rules of the Road',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/laws-and-rules-of-the-road-cont2/',
      },
      {
        label: 'California DMV Traffic School List',
        url: 'https://www.dmv.ca.gov/portal/vehicle-industry-services/occupational-licensing/occupational-license-lookup/traffic-school-list/',
      },
      {
        label: 'California Courts Traffic School',
        url: 'https://selfhelp.courts.ca.gov/traffic/traffic-school',
      },
      {
        label: 'California DMV Negligent Operator Actions',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/negligence/negligent-operator-actions/',
      },
      {
        label: 'California DMV NOTS Hearings',
        url: 'https://www.dmv.ca.gov/portal/driver-education-and-safety/dmv-safety-guidelines-actions/negligence/negligent-operator-treatment-system-nots-hearings/',
      },
      {
        label: 'NY DMV Get My Own Driving Record Abstract',
        url: 'https://dmv.ny.gov/records/get-my-own-driving-record-abstract',
      },
      {
        label: 'NY DMV Driver License Points and Penalties',
        url: 'https://dmv.ny.gov/driver-license-points-and-penalties',
      },
      {
        label: 'NY DMV Point and Insurance Reduction Program',
        url: 'https://dmv.ny.gov/points-and-penalties/point-and-insurance-reduction-program',
      },
      {
        label: 'NY DMV PIRP and IPIRP',
        url: 'https://dmv.ny.gov/points-and-penalties/pirp-and-ipirp',
      },
      {
        label: 'NY DMV Online and Alternative Delivery Method Courses',
        url: 'https://dmv.ny.gov/points-and-penalties/online-and-alternative-delivery-method-courses',
      },
      {
        label: 'Texas DPS How to Order a Driver Record',
        url: 'https://www.dps.texas.gov/section/driver-license/how-order-driver-record',
      },
      {
        label: 'Texas DPS Online Driver Record Request',
        url: 'https://txapps.texas.gov/tolapp/txldrcdr/TXDPSLicenseeManager',
      },
      {
        label: 'Texas Online Driver Record FAQ',
        url: 'https://txapps.texas.gov/apps/dps/txldr/html/faq.html',
      },
      {
        label: 'Texas Driver Record Types',
        url: 'https://txapps.texas.gov/apps/dps/txldr/html/recordTypes.html',
      },
      {
        label: 'Texas DPS Driver Responsibility Program',
        url: 'https://www.dps.texas.gov/section/driver-license/driver-responsibility-program',
      },
      {
        label: 'Texas DPS Driver Responsibility Program Repealed',
        url: 'https://www.dps.texas.gov/news/driver-responsibility-program-repealed',
      },
      {
        label: 'Texas DPS Driver Responsibility Program Surcharge Repeal FAQs',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/driver-responsibility-program-surcharge-repeal-faqs',
      },
      {
        label: 'FLHSMV Questions About Driving Records',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/general-information/questions-about-driving-records/',
      },
      {
        label: 'FLHSMV Driving Record History',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driving-record-history/',
      },
      {
        label: 'FLHSMV Points and Point Suspensions',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/points-point-suspensions/',
      },
      {
        label: 'FLHSMV Driver Improvement Schools',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/education-courses/driver-improvement-schools/',
      },
      {
        label: 'FLHSMV Education Courses',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/education-courses/',
      },
      {
        label: 'FLHSMV Traffic School Completion Check',
        url: 'https://services.flhsmv.gov/trafficschoolcompletioncheck/studentsearchpage.aspx',
      },
      {
        label: 'Washington DOL Driving Records',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driving-records',
      },
      {
        label: 'Washington DOL Guide to Driving Records',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driving-records/guide-driving-records',
      },
      {
        label: 'Washington DOL Get Your Driving Record',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driving-records/get-your-driving-record',
      },
      {
        label: 'Washington DOL Approved Safe Driving Course Providers',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/driver-safety/approved-safe-driving-course-providers',
      },
      {
        label: 'Washington DOL Accumulation of Moving Violations',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/suspended-driver-license/types-driver-license-suspensions/accumulation-traffic-tickets-moving-violations-traffic-infractions',
      },
      {
        label: 'NJ MVC Driver History Abstract',
        url: 'https://www.nj.gov/mvc/license/driverhist.htm',
      },
      {
        label: 'NJ MVC Driver History Abstract Application PDF',
        url: 'https://www.nj.gov/mvc/pdf/license/DO-21.pdf',
      },
      {
        label: 'NJ MVC Driver Programs',
        url: 'https://www.nj.gov/mvc/license/driverprograms.htm',
      },
      {
        label: 'NJ MVC Points Schedule',
        url: 'https://www.nj.gov/mvc/license/points-schedule.htm',
      },
      {
        label: 'NJ MVC Suspensions and Restorations',
        url: 'https://www.nj.gov/mvc/license/suspension.htm',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'PennDOT Driving Record Information',
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/chapter-4-driving-record-information',
      },
      {
        label: "PennDOT Pennsylvania's Point System",
        url: 'https://www.pa.gov/agencies/dmv/driver-services/pennsylvania-drivers-manual/online-drivers-manual/pennsylvanias-point-system',
      },
      {
        label: 'PennDOT Pennsylvania Point System Fact Sheet PDF',
        url: 'https://www.pa.gov/content/dam/copapwp-pagov/en/penndot/documents/public/dvspubsforms/bdl/bdl-fact-sheets/fs-ps.pdf',
      },
      {
        label: 'PennDOT Individual Driver Records',
        url: 'https://appsca.pwp.pa.gov/idr',
      },
      {
        label: 'Virginia DMV Request Driver or Vehicle Record',
        url: 'https://www.dmv.virginia.gov/records/request-driver-vehicle-record',
      },
      {
        label: 'Virginia DMV Driver Improvement',
        url: 'https://www.dmv.virginia.gov/licenses-ids/improvement',
      },
      {
        label: 'Virginia DMV Points and Driver Improvement Program',
        url: 'https://www.dmv.virginia.gov/licenses-ids/improvement/points',
      },
      {
        label: 'Virginia DMV Points System',
        url: 'https://www.dmv.virginia.gov/licenses-ids/improvement/points/system',
      },
      {
        label: 'Virginia DMV Driver Improvement Clinics',
        url: 'https://www.dmv.virginia.gov/licenses-ids/improvement/clinics',
      },
      {
        label: 'Georgia DDS MVR Driving History',
        url: 'https://dds.georgia.gov/dds-forms-and-manuals/how-do-i-mvr-driving-history',
      },
      {
        label: 'Georgia DDS Violations, Suspensions, and Revocations',
        url: 'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations',
      },
      {
        label: 'Georgia DDS Points and Points Reduction',
        url: 'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations/points-and-points-reduction',
      },
      {
        label: 'Georgia DDS Driver Improvement Program',
        url: 'https://dds.georgia.gov/regulated-programs/driver-improvement-program',
      },
      {
        label: 'Georgia DDS Defensive Driving Program FAQs',
        url: 'https://dds.georgia.gov/defensive-driving-program-faqs',
      },
      {
        label: 'Georgia DDS Section 10 Continued',
        url: 'https://dds.georgia.gov/section-10-continued',
      },
      {
        label: 'Mass.gov Request a Driving Record',
        url: 'https://www.mass.gov/how-to/request-a-driving-record',
      },
      {
        label: 'Mass.gov RMV Records Requests',
        url: 'https://www.mass.gov/rmv-records-requests',
      },
      {
        label: 'Mass.gov Safe Driver Insurance Plan',
        url: 'https://www.mass.gov/info-details/safe-driver-insurance-plan-sdip',
      },
      {
        label: 'Mass.gov Suspensions from Multiple Offenses',
        url: 'https://www.mass.gov/info-details/suspensions-from-multiple-offenses',
      },
      {
        label: 'Mass.gov Required Classes and Programs to Reinstate',
        url: 'https://www.mass.gov/info-details/required-classes-and-programs-to-reinstate-your-drivers-license',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'texas',
      'florida',
      'washington',
      'new-jersey',
      'pennsylvania',
      'virginia',
      'georgia',
      'massachusetts',
    ],
  },
  {
    slug: 'driver-license-suspension-reinstatement-sr22',
    title: '驾照被 suspend 或 revoke 后，恢复驾驶资格先做什么',
    eyebrow: '恢复驾照',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-17',
    reviewedAt: '2026-07-17',
    description:
      '收到 suspension、revocation、cancellation、denial、reinstatement 或 SR-22 / FR-44 通知时，先不要只问“交多少钱”。恢复驾驶资格通常要同时看 DMV status、法院或发起机构 clearance、保险/financial responsibility、课程、测试、等待期和恢复费用。',
    whoNeedsIt: [
      '收到 DMV / DPS / RMV / MVC / DOL suspension、revocation、cancellation、denial 或 reinstatement 通知的人。',
      '因为 failure to appear、failure to pay、罚单、保险中断、points、DUI / OUI、medical review、child support 或无保险事故导致驾驶资格被限制的人。',
      '系统提示需要 SR-22、FR-44、proof of financial responsibility、reinstatement fee、restoration fee、termination fee 或 court clearance 的人。',
      '想知道能不能办 restricted / hardship / conditional license，或恢复后是否要重考的人。',
    ],
    keyFacts: [
      'Suspension、revocation、cancellation 和 denial 不是同一件事。纽约 DMV 明确区分 suspended 和 revoked：revoked 往往意味着 license 被取消，期满后还可能要先请求 DMV approval、重新申请、缴费或重考。',
      '恢复通常不会自动发生。即使 suspension period 结束，仍可能要满足 court requirements、提交 proof of insurance / financial responsibility、完成课程、缴 reinstatement / restoration / termination fee，或等待 DMV 收到 clearance。',
      '先查 status 和 official order。纽约、德州、佐州、华盛顿等官方入口都把 license status、eligibility 或 reinstatement steps 放在恢复流程前面。',
      'Court suspension 和 DMV suspension 要分开。Failure to appear / failure to pay、court-ordered school、traffic citation 或 criminal case 常常要先找 court clerk / reporting agency，DMV 才能更新记录。',
      'SR-22 / FR-44 通常属于 financial responsibility certification / proof。加州、佛州、维州等官方来源都把这类证明与无保险、事故、DUI / reckless driving 或保险监控场景联系起来；是否需要、维持多久和如何提交按州规则执行。',
      'Restricted / hardship / conditional license 不是所有人都有。部分州会要求 court order、program enrollment、IID、保险证明、等待期或 DMV hearing；不能把一个州的 restricted license 规则套到另一个州。',
      '恢复前不要开车。只拿到付款收据、课程报名、保险报价或法院付款确认，并不等于 driving privilege 已恢复。',
    ],
    checklist: [
      '保存所有通知：DMV suspension order、court notice、citation、insurance letter、SR-22 / FR-44 notice、reinstatement requirement letter、case number、ticket number、driver license number。',
      '先查当前 status：valid、suspended、revoked、cancelled、denied、eligible to reinstate、restricted、conditional，或 only ID card / limited permit。',
      '找出 suspension reason：FTA/FTP、points、DUI / OUI、insurance lapse、uninsured crash、medical review、child support、toll / parking、out-of-state offense、registration issue。',
      '列出需要谁清除：DMV / DPS / RMV / MVC、court clerk、insurance company、toll agency、child support agency、medical review unit、school/program provider。',
      '确认是否需要 proof of insurance、SR-22、FR-44、SR-26 / FR-46 lapse repair、driver improvement school、ADI / risk reduction course、IID、knowledge / road test、hearing 或 court order。',
      '确认费用：reinstatement fee、restoration fee、suspension termination fee、license reapplication fee、civil penalty、service fee 或 court fine，并保存 receipt。',
      '恢复后再确认 status 已变成 valid / eligible / reinstated；不要只看“付款成功”。',
    ],
    steps: [
      '第一步：打开本州 DMV / DPS / RMV / MVC 的 suspension / reinstatement 页面，先查 driver license 或 driving privilege status，不要先找保险报价或第三方文章。',
      '第二步：按 order 上的 reason code 或 case number 把问题分流：DMV 自己、法院、保险、课程、医疗、child support、toll / parking 或外州记录。',
      '第三步：如果涉及法院，先完成 court requirements 并确认 court / reporting agency 会向 DMV 回传 clearance；付款和回传之间可能有延迟。',
      '第四步：如果涉及保险或 financial responsibility，确认是普通 proof of insurance、SR-22、FR-44，还是 registration/plate 相关证明；让保险公司按州要求电子提交或出具证明。',
      '第五步：如果涉及课程、IID、hearing、medical review 或测试，按官方 letter 列出的项目逐项完成，不要只缴 reinstatement fee。',
      '第六步：严格按个人 order 或 restoration letter 规定的顺序提交文件、clearance 和费用；有的州允许先缴费，有的要求先完成其他项目。最后重新查官方 status，确认已经恢复后再驾驶。',
    ],
    faqs: [
      {
        question: 'suspended 和 revoked 有什么区别？',
        answer:
          '法律效果和恢复流程按州而异，不能只用“哪个更严重”概括。以纽约为例，suspension 是在一定期间或完成指定动作前拿走驾驶资格；revocation 则表示 license 被取消，期满后通常还要请求 DMV approval、重新申请，并可能重考或缴 re-application fee。',
      },
      {
        question: '我交了 reinstatement fee，为什么状态还没恢复？',
        answer:
          '费用只是其中一项。还可能缺 court clearance、proof of insurance、SR-22 / FR-44、课程完成记录、medical clearance、hearing 结果、等待期或外州记录解除。先按官方 status / requirement letter 逐项核对。',
      },
      {
        question: 'SR-22 或 FR-44 是一种保险吗？',
        answer:
          '更准确地说，它是州要求的 financial responsibility certification / proof，通常由保险公司向 DMV 提交。你仍然需要符合州要求的保险或证明；是否要 SR-22、FR-44、维持多久、若 lapse 会怎样，都按州和 suspension reason 看。',
      },
      {
        question: '能不能申请 restricted、hardship 或 conditional license？',
        answer:
          '不一定。部分州有 restricted / hardship / conditional 路径，但可能要求 court order、program enrollment、IID、保险证明、等待期、hearing 或特定 suspension 类型。先看本州官方 reinstatement 或 restricted-license 页面。',
      },
      {
        question: '我人在外州，原州驾照被 suspend，还能在别州申请新驾照吗？',
        answer:
          '不要假设可以绕过。很多州会检查 out-of-state suspension、driving privilege 或 national record。先按原州要求恢复或解决记录，再看新州 out-of-state transfer 页面。',
      },
    ],
    factChecks: [
      {
        claim: 'New York 明确区分 suspension 与 revocation，revoked license 在期限结束后仍可能需要 DMV approval、重新申请、缴费或测试。',
        sourceUrls: [
          'https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations',
          'https://dmv.ny.gov/points-and-penalties/request-restoration-after-a-driver-license-revocation',
        ],
      },
      {
        claim: 'Suspension period 结束不代表自动恢复；Texas、Pennsylvania 和 Massachusetts 都要求先核对个案 reinstatement requirements。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege',
          'https://www.pa.gov/services/dmv/request-a-driver-license-restoration-requirements-letter',
          'https://www.mass.gov/how-to/reinstate-your-drivers-license',
        ],
      },
      {
        claim: 'New York 与 Texas 都提供官方 license status / eligibility 查询，恢复前应核对系统状态而不是只看付款收据。',
        sourceUrls: [
          'https://dmv.ny.gov/driver-license/check-license-or-driving-privilege-status',
          'https://texas.gov/licenseeligibility',
        ],
      },
      {
        claim: 'Reinstatement fee 只是可能要求之一，Texas 和 Pennsylvania 仍可能要求提交其他 compliance documents 或完成额外项目。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege',
          'https://www.pa.gov/agencies/dmv/online-services-dvs/license-and-vehicle-restoration-services',
        ],
      },
      {
        claim: '法院或其他 reporting agency 发起的 suspension 通常要先由对应机构完成 clearance，再由 DMV 更新 driving privilege。',
        sourceUrls: [
          'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/other-suspensions-revocations/',
          'https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege',
        ],
      },
      {
        claim: 'SR-22 与 FR-44 属于按州要求提交的 financial responsibility certification，Virginia 对两种证明分别列出适用和提交规则。',
        sourceUrls: ['https://www.dmv.virginia.gov/businesses/insurance/certifications'],
      },
      {
        claim: 'California 将保险或 financial responsibility 与车辆及驾驶资格的 suspension / reissue 流程分开说明。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/suspensions/',
          'https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/',
          'https://www.dmv.ca.gov/portal/dmv-virtual-office/reissue-fees/',
        ],
      },
      {
        claim: 'Massachusetts 将 required classes / programs 与 suspension hearing 设为独立恢复环节，不能仅靠缴费替代。',
        sourceUrls: [
          'https://www.mass.gov/info-details/required-classes-and-programs-to-reinstate-your-drivers-license',
          'https://www.mass.gov/guides/suspension-hearings-information',
        ],
      },
      {
        claim: '恢复相关的例外路径并不统一：Texas 单列 special-license 问题，Virginia 则为符合条件的 reinstatement fees 提供 payment plan。',
        sourceUrls: [
          'https://www.dps.texas.gov/section/driver-license/faq/section-7-reinstatement-fees-and-special-licenses',
          'https://www.dmv.virginia.gov/licenses-ids/payment-plan-program',
        ],
      },
      {
        claim: 'Georgia、Washington 和 New Jersey 都要求按本州 violations / suspended-license / restoration 流程完成要求后再恢复驾驶资格。',
        sourceUrls: [
          'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations',
          'https://dol.wa.gov/driver-licenses-and-permits/suspended-driver-license',
          'https://www.nj.gov/mvc/license/suspension.htm',
        ],
      },
      {
        claim:
          '驾照或 driving privilege 被暂停、撤销时，付款收据本身不代表可以驾驶：New York 要求满足 suspension 条件并持有有效 license，New Jersey 要求等到收到书面 restoration notice。',
        sourceUrls: [
          'https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations',
          'https://www.nj.gov/mvc/license/suspension.htm',
        ],
      },
    ],
    editorNotes: [
      '这页和“罚单 / toll / hold”页分工不同：上一页找发起机构，本页讲 driver license / driving privilege 的恢复路径。',
      '不能写具体法律结论或承诺恢复时间。Suspension / revocation 可能涉及法院、刑事、行政听证、保险合同、医疗审核和外州记录。',
      'SR-22 / FR-44 只做官方路径解释，不推荐保险公司，不估价，不判断用户是否一定需要。',
      '恢复前不能驾驶是高风险提醒；付款成功、课程报名或保险报价都不是 official reinstatement status。',
      '这页不是法律建议，也不替代律师、法院、保险公司或 DMV 的个案判断。',
    ],
    relatedDirectory: {
      label: '查看 50 州 DMV 常用业务入口表',
      href: '/directories/dmv-services/',
      description: '按州查 DMV、线上服务、suspension、reinstatement、driver record、保险和车辆业务官方入口。',
    },
    sources: [
      {
        label: 'California DMV Suspensions',
        url: 'https://www.dmv.ca.gov/portal/suspensions/',
      },
      {
        label: 'California DMV Reissue Fees',
        url: 'https://www.dmv.ca.gov/portal/dmv-virtual-office/reissue-fees/',
      },
      {
        label: 'California DMV Insurance Requirements',
        url: 'https://www.dmv.ca.gov/portal/vehicle-registration/insurance-requirements/',
      },
      {
        label: 'California Driver Handbook Financial Responsibility',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/financial-responsibility-insurance-requirements-and-collisions/',
      },
      {
        label: 'NY DMV Suspensions and Revocations',
        url: 'https://dmv.ny.gov/points-and-penalties/suspensions-and-revocations',
      },
      {
        label: 'NY DMV Check License or Driving Privilege Status',
        url: 'https://dmv.ny.gov/driver-license/check-license-or-driving-privilege-status',
      },
      {
        label: 'NY DMV Pay a Suspension Termination Fee',
        url: 'https://dmv.ny.gov/points-and-penalties/pay-a-suspension-termination-fee',
      },
      {
        label: 'NY DMV Request Restoration After a Driver License Revocation',
        url: 'https://dmv.ny.gov/points-and-penalties/request-restoration-after-a-driver-license-revocation',
      },
      {
        label: 'FLHSMV Driver License Suspensions and Revocations',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/',
      },
      {
        label: 'FLHSMV Other Suspensions and Revocations',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-suspensions-revocations/other-suspensions-revocations/',
      },
      {
        label: 'FLHSMV Insurance Letter Guidance',
        url: 'https://www.flhsmv.gov/insurance/received-a-letter/',
      },
      {
        label: 'FLHSMV Financial Responsibility Manual PDF',
        url: 'https://www.flhsmv.gov/pdf/frmanual/ftp-procedure-manual.pdf',
      },
      {
        label: 'Texas DPS Reinstating Your Driver License or Driving Privilege',
        url: 'https://www.dps.texas.gov/section/driver-license/reinstating-your-driver-license-or-driving-privilege',
      },
      {
        label: 'Texas DPS Suspensions and Reinstatements',
        url: 'https://www.dps.texas.gov/section/driver-license/suspensions-reinstatements',
      },
      {
        label: 'Texas License Eligibility System',
        url: 'https://texas.gov/licenseeligibility',
      },
      {
        label: 'Texas DPS Reinstatement Fees and Special Licenses FAQ',
        url: 'https://www.dps.texas.gov/section/driver-license/faq/section-7-reinstatement-fees-and-special-licenses',
      },
      {
        label: 'NJ MVC Suspensions and Restorations',
        url: 'https://www.nj.gov/mvc/license/suspension.htm',
      },
      {
        label: 'Mass.gov Reinstate Your Driver License',
        url: 'https://www.mass.gov/how-to/reinstate-your-drivers-license',
      },
      {
        label: 'Mass.gov Required Classes and Programs',
        url: 'https://www.mass.gov/info-details/required-classes-and-programs-to-reinstate-your-drivers-license',
      },
      {
        label: 'Mass.gov Suspension Hearings Information',
        url: 'https://www.mass.gov/guides/suspension-hearings-information',
      },
      {
        label: 'Washington DOL Suspended Driver License',
        url: 'https://dol.wa.gov/driver-licenses-and-permits/suspended-driver-license',
      },
      {
        label: 'Georgia DDS Violations, Suspensions, and Revocations',
        url: 'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations',
      },
      {
        label: 'Georgia DDS Reinstatement Fees and Payment',
        url: 'https://dds.georgia.gov/georgia-licenseid/violations-suspensions-revocations/reinstatement-fees-and-payment',
      },
      {
        label: 'PennDOT License and Vehicle Restoration Services',
        url: 'https://www.pa.gov/agencies/dmv/online-services-dvs/license-and-vehicle-restoration-services',
      },
      {
        label: 'PennDOT Driver License Restoration Requirements Letter',
        url: 'https://www.pa.gov/services/dmv/request-a-driver-license-restoration-requirements-letter',
      },
      {
        label: 'Virginia DMV Reinstate Driver License',
        url: 'https://www.dmv.virginia.gov/licenses-ids/license/reinstate',
      },
      {
        label: 'Virginia DMV SR-22/SR-26 and FR-44 Certifications',
        url: 'https://www.dmv.virginia.gov/businesses/insurance/certifications',
      },
      {
        label: 'Virginia DMV Payment Plan Program',
        url: 'https://www.dmv.virginia.gov/licenses-ids/payment-plan-program',
      },
    ],
    relatedStateIds: [
      'california',
      'new-york',
      'florida',
      'texas',
      'new-jersey',
      'massachusetts',
      'washington',
      'georgia',
      'pennsylvania',
      'virginia',
    ],
  },
  {
    slug: 'renewal-replacement-address',
    title: '续期、补证、地址变更先后顺序',
    eyebrow: '线上服务',
    publishedAt: '2026-07-13',
    modifiedAt: '2026-07-13',
    reviewedAt: '2026-07-13',
    description:
      '最常见的坑是顺序错了：搬家后直接补证，结果新卡寄到旧地址；想线上续期，系统又因为 REAL ID、身份状态或过期时间把你挡住。',
    whoNeedsIt: [
      '搬家后准备换新驾照的人。',
      '驾照快过期、丢失或损坏的人。',
      '想在线办理而不想去 DMV 办公室的人。',
    ],
    keyFacts: [
      '很多州提供线上续期、补证或地址变更，但入口能打开不等于本人符合资格；年龄、过期时间、证件类别、上次办理方式、SSN 和驾照状态都可能影响结果。',
      '地址变化时，先更新 DMV 记录再续期或补证通常更稳妥，否则新卡可能寄到旧地址，或线上交易继续带出旧资料。',
      '地址更新期限按州变化：California 和 New York 通常是 10 天，Florida 和 Massachusetts 通常是 30 天，不能把一个州的期限当成全国规则。',
      '更改数据库地址不一定自动寄一张新卡。California、New York、Massachusetts 和 New Jersey 都把“更新记录”与“另付费订购 replacement”分开。',
      'REAL ID 首次核验、姓名变化、CDL、limited-term / temporary credential、非公民身份复核或过期太久，常常需要现场或额外材料。',
      'driver license / ID 地址与 vehicle title / registration 地址不一定是同一笔交易。Florida 明确要求两组记录都更新，并给出先更新 DL/ID、再处理 title/registration 的顺序。',
    ],
    factChecks: [
      {
        claim: 'California 搬家后通常要在 10 天内通知 DMV；在线续期前应先确认地址正确，并给地址变更留出处理时间。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/changing-replacing-and-renewing-your-drivers-license/',
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-renewal/',
        ],
      },
      {
        claim: 'New York 搬家后通常要在 10 天内更新 license、permit、non-driver ID 和 vehicle records 的地址。',
        sourceUrls: ['https://dmv.ny.gov/change-address'],
      },
      {
        claim: 'Florida 的 driver license / ID 和 title / registration 地址变化通常要在 30 天内更新，并按证件与车辆记录分别处理。',
        sourceUrls: [
          'https://www.flhsmv.gov/name-and-address-changes/',
          'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
        ],
      },
      {
        claim: 'Massachusetts 要求在地址变化后 30 天内通知 RMV。',
        sourceUrls: ['https://www.mass.gov/how-to/change-your-address-with-the-rmv'],
      },
      {
        claim: '线上入口是否可用仍要由州系统判断；Texas 和 New Jersey 都提供资格或 online-services 分流。',
        sourceUrls: [
          'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/',
          'https://www.nj.gov/mvc/online-services.html',
        ],
      },
      {
        claim: 'California 更改地址不会自动发新驾照；线上续期前应至少提前五天更新地址，并等待记录处理。',
        sourceUrls: [
          'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/changing-replacing-and-renewing-your-drivers-license/',
          'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-renewal/',
        ],
      },
      {
        claim: 'New York 更新地址后不强制订购新 license、permit 或 non-driver ID，但 license/ID 和 vehicle records 都要在期限内更新。',
        sourceUrls: ['https://dmv.ny.gov/change-address'],
      },
      {
        claim: 'Florida 要求先处理 driver license/ID 的姓名或地址，再更新 title 和 registration；姓名变化还要先完成 SSA 更新。',
        sourceUrls: ['https://www.flhsmv.gov/name-and-address-changes/'],
      },
      {
        claim: 'New Jersey 把地址变更与订购显示新地址的 replacement credential 分开；只改记录不等于自动收到新卡。',
        sourceUrls: ['https://www.nj.gov/mvc/Licenses/ChangeAddress.htm', 'https://www.nj.gov/mvc/online-services.html'],
      },
      {
        claim: 'Massachusetts 只改地址时不强制申请新卡；需要新卡显示地址时，要另办 replacement 并支付相应费用。',
        sourceUrls: ['https://www.mass.gov/how-to/change-your-address-with-the-rmv'],
      },
    ],
    checklist: [
      '先确认 DMV 记录里的地址是不是当前地址。',
      '看证件状态：是否过期、过期多久、是否 CDL、learner permit 或特殊身份证件。',
      '看是否涉及 REAL ID 首次核验、姓名变更或非公民身份文件。',
      '确认付款方式、邮寄地址、临时证明和确认号保存方式。',
      '查本州地址变更期限，并区分 residential address、mailing address、driver record 和 vehicle/title/registration record。',
      '确认“只更新记录”还是“还要订购显示新地址的实体卡”，避免为并不需要的新卡重复付费。',
    ],
    steps: [
      '第一步：先改地址，或确认 DMV 记录中的地址已经正确。',
      '第二步：再检查续期、补证或 replacement 的线上资格。',
      '第三步：如果系统提示不符合线上资格，再预约现场服务，不要反复重试同一个入口。',
      '第四步：保存确认号、临时证明、收据和邮寄追踪信息。',
      '第五步：有车辆时，再核对 title / registration 地址是否同步更新；不要只看驾照页面就认为车辆记录已经完成。',
      '第六步：超过官方预计时间仍未收到新卡时，使用 status 查询并检查退信、旧地址或重复交易，再联系州官方客服。',
    ],
    faqs: [
      {
        question: '丢了驾照又搬家了，先补证还是先改地址？',
        answer:
          '很多州建议先改地址，再申请 replacement，这样新证件寄到正确地址。具体看州 DMV 说明。',
      },
      {
        question: 'REAL ID 可以线上续期吗？',
        answer:
          '已有 REAL ID 后的后续续期可能可以线上；首次 REAL ID 或未核验材料的人通常需要现场或预验证。',
      },
      {
        question: '在线改完地址，DMV 会自动寄一张新驾照吗？',
        answer:
          '通常不能这样假设。California、New York、Massachusetts 和 New Jersey 都把记录更新与 replacement card 分开；需要卡面显示新地址时，可能要另行订购并付费。',
      },
      {
        question: '驾照地址改了，车辆 registration 地址也一定改了吗？',
        answer:
          '不一定。New York 和 Florida 都明确提到车辆相关记录；Florida 还要求 DL/ID 与 title/registration 两部分都更新。完成后应分别检查 driver 和 vehicle records。',
      },
    ],
    editorNotes: [
      '地址变更和续期顺序是实际办事高风险点：加州建议先改地址再办其他 DMV 产品，佛州和马州有 30 天地址更新要求，纽约有 10 天地址更新要求。',
      '线上入口能打开不等于本人符合资格；Texas.gov、FLHSMV、PennDOT 等页面都会把资格判断交给系统或预验证状态。',
      '首次 REAL ID、姓名变更、非公民身份核验、CDL 或过期太久的证件，通常不能按普通线上续期理解。',
    ],
    sources: [
      {
        label: 'California DMV Changing, Replacing, and Renewing a Driver License',
        url: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/changing-replacing-and-renewing-your-drivers-license/',
      },
      {
        label: 'California DMV Online Renewal',
        url: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-renewal/',
      },
      {
        label: 'NY DMV Renew a Driver License',
        url: 'https://dmv.ny.gov/driver-license/renew-a-driver-license',
      },
      {
        label: 'NY DMV Change Your Address',
        url: 'https://dmv.ny.gov/change-address',
      },
      {
        label: 'Texas Online Eligibility',
        url: 'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/',
      },
      {
        label: 'FLHSMV Name and Address Changes',
        url: 'https://www.flhsmv.gov/name-and-address-changes/',
      },
      {
        label: 'FLHSMV Renew or Replace',
        url: 'https://www.flhsmv.gov/driver-licenses-id-cards/renew-or-replace-your-florida-driver-license-or-id-card/',
      },
      {
        label: 'NJ MVC Online Services',
        url: 'https://www.nj.gov/mvc/online-services.html',
      },
      {
        label: 'NJ MVC Change of Address',
        url: 'https://www.nj.gov/mvc/Licenses/ChangeAddress.htm',
      },
      {
        label: 'Massachusetts Change your address with the RMV',
        url: 'https://www.mass.gov/how-to/change-your-address-with-the-rmv',
      },
    ],
    relatedStateIds: ['california', 'new-york', 'texas', 'new-jersey'],
  },
];

export function getStateById(id: string) {
  return states.find((state) => state.id === id);
}

export function getTopicBySlug(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function uniqueSources(sources: Source[]) {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}
