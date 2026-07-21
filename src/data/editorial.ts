export const SITE_LAUNCH_DATE = '2026-07-13';
export const EDITORIAL_POLICY_DATE = '2026-07-17';
export const EDITORIAL_POLICY_MODIFIED_DATE = '2026-07-21';
export const HIGH_RISK_DIRECTORY_REVIEW_DATE = '2026-07-21';
export const DIRECTORY_REVIEW_DATE = '2026-07-21';
export const STATE_EVIDENCE_RELEASE_DATE = '2026-07-17';

export const EDITORIAL_AUTHOR = {
  name: 'DMVCN 官方编辑',
  shortName: 'DMVCN 编辑',
  role: '政府资料整理与中文编辑',
  path: '/authors/editorial-team/',
  description:
    '负责维护 DMV、REAL ID、驾照和车辆办事资料，包括查找政府来源、核对易变信息、整理中文办事步骤和更新失效链接。',
  limitations:
    '“DMVCN 官方编辑”只代表 dmvcn.com 的内容编辑身份，不代表任何美国政府或 DMV。本站也不是律师事务所或移民服务机构，不能替代政府答复或专业意见。',
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
    date: '2026-07-21',
    title: '完成高风险页面人工复核并恢复索引',
    summary:
      '17 个高风险专题和目录页已由站长对照政府来源复核并登记日期与范围。今后同类页面在人工复核完成前不会进入 sitemap；完成复核后，网站会在下一次更新时恢复收录。',
    scope: [
      '12 个高风险专题页',
      '5 个高风险目录页',
      'sitemap 与 robots 元数据',
      '人工复核记录',
      '内容质量与 SEO 检查',
    ],
  },
  {
    date: '2026-07-21',
    title: '修复 Minnesota 与 Kentucky 官方来源迁移',
    summary:
      '根据当前州政府导航和页面实际链接，将 Minnesota 旧 dvsinfohub PDF 替换为 DVS 当前 REAL ID、证件类型、同日制卡说明与 assets.dps.mn.gov 材料图解，修正新居民车辆登记路径；Kentucky 驾驶手册改用 KSP 当前办事页实际引用的官方 PDF。',
    scope: [
      'Minnesota REAL ID 与证件类型来源',
      'Minnesota 同日制卡、新居民车辆登记与 DVS 服务点',
      'Kentucky State Police Driver Manual',
      '官方链接可达性审计',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成最后 8 个中风险驾驶与车辆专题语义核对',
    summary:
      '逐条回查联邦与州政府正文，核对 DMV 诈骗、搬州后车辆登记、registration 续期、车牌补办、临时牌照、车辆检查、卖车收尾和驾驶记录共 79 条关键声明；修正 Virginia plate deactivation 入口，明确 Texas HB 718 后 30-Day / One-Trip 的金属临时登记牌路径，并补齐 Washington Report of Sale 工作日期限的表格证据。',
    scope: [
      '诈骗短信与身份保护',
      '车辆 title、registration、inspection 与临时牌照',
      '卖车、退牌、保险与责任解除',
      'driving record、points 与 traffic school',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 5 个首次驾照、路考与考试语言专题语义核对',
    summary:
      '逐条回查联邦与九州政府页面，核对首次驾照顺序、路考车辆与陪同人、青少年 GDL、考试语言、外国驾照与互惠免试；更新 California learner-permit 与 Georgia road-test 入口，移除 North Carolina 无法由当前官方正文确认的多语言笔试泛化，并补齐 New Jersey、Pennsylvania、Texas 外国驾照互惠的逐条来源。',
    scope: [
      '首次驾照与 learner permit',
      '路考车辆、租车、口译与重考',
      '青少年 GDL 与家长清单',
      '考试语言、外国驾照、IDP 与互惠免试',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 6 个证件办理生命周期专题语义核对',
    summary:
      '逐条回查 59 个联邦与州政府入口，核对 State ID、线上和现场分流、丢失补证、费用与寄卡、搬州、续期和改址共 60 条关键声明；将丢证旅行说明更新为 2026 年 $45 TSA ConfirmID 流程，并把 Washington 外州邮寄补证绑定到专门办理页。',
    scope: [
      'State ID 与 non-driver ID',
      '线上、现场与预约分流',
      '丢证、补证与身份盗用',
      '费用、邮寄、搬州与改址顺序',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成首批 6 个 REAL ID 与地址材料专题语义核对',
    summary:
      '逐条比对 TSA、DHS、USA.gov 以及 California、New York、Washington、Texas、Pennsylvania、Florida、New Jersey、Iowa 和 South Dakota 当前官方资料；修正无可接受证件时的 2026 TSA ConfirmID 付费流程、失败风险和处理时间，替换 South Dakota full-time traveler 失效入口，并为 60 条关键声明保留就近来源。',
    scope: [
      'REAL ID 基础与证件类型比较',
      'REAL ID 材料与地址证明',
      '无本人账单、P.O. Box 与 PMB 特例',
      '国内航班与 TSA ConfirmID 当前流程',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 West Virginia 两页州法、外国驾照与考试路线核对',
    summary:
      '逐条比对 West Virginia DMV 的 Driver Licenses、REAL ID、Moving to WV、2026 Driver Licensing Handbook、DMV-DS-23P、residency affidavit、DMV-8-FL、DMV-10-DLT、线上与现场考试、续期、改址、HeadStart 和办公室页面，以及九项现行州法与 TSA 规则；登记 104 条去重声明的显式来源，并公开保留 Drive for Five 与八年州法、过期重考 3 年与 6 个月、permit 180 天与 90 天、续期补证材料之间的官方口径冲突。',
    scope: [
      '西弗吉尼亚州办事总览',
      '西弗吉尼亚州 REAL ID',
      '104 条去重声明显式核对',
      '中国大陆驾照、口译、考试、费用与官方冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Vermont 两页州法、三类证件与口译路线核对',
    summary:
      '逐条比对 Vermont DMV 的 Driver License、REAL ID、Enhanced Driver License / ID、Driver Privilege Card、VL-011 / VL-021 / VL-017 / VL-002 / VL-040 / VN-142 / VT-009、Driver Manual、当前州法与 2025 Act 66，以及 TSA 和 CBP 页面；登记 90 条独立声明的显式来源，并补齐 2025 年口译规则、DPC 居住证明组合、2026 年 7 月路考预约费、中国大陆与其他外国驾照路线，以及州法三年和申请表一年口径不一致的处理方式。',
    scope: [
      '佛蒙特州办事总览',
      '佛蒙特州 REAL ID / EDL / Driver Privilege Card',
      '90 条独立声明显式核对',
      '外国驾照、口译、费用与官方口径冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 South Carolina 两页官方清单、考试与非公民路线核对',
    summary:
      '逐条比对 SCDMV 的 Driver License、Moving to SC、lawfully present non-US citizens、2026 MV-93 / MV-94、beginner permit、testing、road test、appointment、Driver Manual、renewal、vision、replacement、address / name、fees、ID、online services、locations、forms、Form 4030、visiting SC、中央制证资料与 TSA 页面；登记 83 条独立声明的显式来源，并补齐中国大陆非互惠路线、官网未保证中文考试、45 天转入、九个月考试门槛、standard / REAL ID 材料、points 官方措辞差异、road-test 时段和邮寄制证风险。',
    scope: [
      '南卡罗来纳州办事总览',
      '南卡罗来纳州 REAL ID',
      '83 条独立声明显式核对',
      '中国驾照、考试语言、非公民网点与中央制证',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Montana 两页官方资料、互惠文件与费用语义核对',
    summary:
      '逐条比对 Montana MVD 的 new resident、adult first driver、required documents、REAL ID 与 2026 checklist、renewal、replacement、address、name、fees、ID card、forms、manual、exam stations 和 FAQ，以及 Taiwan / Republic of Korea 互惠文件、2025 新卡公告、citizenship marker、2026 年 7 月临时费用公告、Class D / ID application、USCIS SAVE 与 TSA 页面；登记 137 条独立声明的显式来源，并补齐中国大陆非互惠路线、官网未公布中文考试的证据边界、60 天转入、standard / REAL ID 材料、非公民核验、当前费用和续补证时限。',
    scope: [
      '蒙大拿州办事总览',
      '蒙大拿州 REAL ID',
      '137 条独立声明显式核对',
      '中国驾照、考试语言、SAVE 与新版证件标志',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Iowa 两页官方正文、行政规则与州法语义核对',
    summary:
      '逐条比对 Iowa DOT 的 driver-license hub、New to Iowa、Immigrant & Refugee、REAL ID 与互动材料清单、renewal、fees、change、replacement、test、manual、appointment、location 和 ID-card 正文，current Iowa Administrative Code 761-604、2026 Iowa Code 321.1A / 321.176 / 321.196、SF 2187、HF 2102 当前状态与 TSA 页面；登记 106 条独立声明的显式来源，并补齐中国大陆与 Taiwan 互惠边界、Chinese knowledge test、residency triggers、SSN / SAVE、1-1-2 材料、考试、费用和未来核验条款。',
    scope: [
      '爱荷华州办事总览',
      '爱荷华州 REAL ID',
      '106 条独立声明显式核对',
      '中国驾照、中文考试、SAVE 与州法适用日期',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 North Dakota 两页官方正文、手册与州法语义核对',
    summary:
      '逐条比对 NDDOT 的 driver license、requirements、U.S. transfer、foreign driver、permit、REAL ID、renewal、online renewal、replacement、ID、sites、classes 与 IDP 正文，current REAL ID / proof PDFs、2025–2027 Class D manual、2026 SFN 6763 application、current NDCC Chapter 39-06 和 TSA 页面；登记 118 条独立声明的显式来源，并补齐中国大陆驾照、Chinese knowledge / English road test、residency 双时钟、SSN exception 官方冲突、standard / REAL ID 文件差异、当前费用和线上资格。',
    scope: [
      '北达科他州办事总览',
      '北达科他州 REAL ID',
      '118 条独立声明显式核对',
      '中国驾照、中文笔试、SSN 冲突与 residency',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Nebraska 两页官方正文与手册语义核对',
    summary:
      '逐条比对 Nebraska DMV 的 Class O、document verification、new resident、renewal、replacement、address、name、State ID、LPD、practice test、locations、non-federal credential 与 licensing-services 正文，2024 Document Verification Form、2025 Class O / examiner manuals、2026 card notice 和 TSA 页面；登记 114 条独立声明的显式来源，并补齐中国大陆驾照、无官方 Chinese written test、non-verbal picture test、外州卡遗失 / 过期、SAVE、2026 REAL ID 星标、当前费用和领卡时限。',
    scope: [
      '内布拉斯加州办事总览',
      '内布拉斯加州 REAL ID',
      '114 条独立声明显式核对',
      '中国驾照、考试语言、SAVE 与 2026 星标',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Kentucky 两页官方正文语义核对',
    summary:
      '逐条比对 Kentucky DRIVE 的 REAL ID、材料 PDF、standard 对比、upgrade、pricing、first issuance、new resident、non-U.S. citizen、外国驾照国家名单、renewal、vision、update / replace、ID card、Regional Office、myDrive，KSP testing、当前 Driver Manual 与 TSA 正文；登记 110 条独立声明的显式来源，并补齐中国大陆驾照、Chinese standard-operator test、2026 Letter ID、视力续期、当前费用，以及非公民 REAL ID、互惠考试和 permit online renewal 的官方冲突。',
    scope: [
      '肯塔基州办事总览',
      '肯塔基州 REAL ID',
      '110 条独立声明显式核对',
      '中国驾照、中文考试、myDrive 与官方冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Idaho 两页官方正文语义核对',
    summary:
      '逐条比对 Idaho ITD 的 Star Card、acceptable documents、2026 checklist、Add the Star、FAQ、New to Idaho、required documents、2026-07-01 identity update、Taking the Driver’s Test、July 2026 Driver’s Handbook、county locations、license / ID、online renewal、ID card、address form 与 TSA 当前正文；登记 76 条独立声明的显式来源，并补齐中国大陆驾照、Chinese written / aural knowledge test、外国驾照互惠、县级与第三方考试分工、线上续期和最新照片身份证要求。',
    scope: [
      '爱达荷州办事总览',
      '爱达荷州 Star Card / REAL ID',
      '76 条独立声明显式核对',
      '2026 身份规则、外国驾照、中文考试与县级办理',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 New Hampshire 两页官方正文语义核对',
    summary:
      '逐条比对 New Hampshire DMV 的 REAL ID、DSMV634A / 634B、申请表、Driver Manual、美国外州转入、首次申请、续期、资料变更、地点与预约，现行 Saf-C 1000 行政规则、RSA 263:9 / 10 / 35 / 39-a / 42、Domicile / Residence FAQ 与 TSA 当前正文；登记 86 条独立声明的显式来源，并补齐中国大陆驾照与非公民首次申请、Mandarin Chinese 知识考试、60 天新居民期限、隔周期线上续期，以及旧 DSMV30 与 2026 州法的地址换卡费用冲突。',
    scope: [
      '新罕布什尔州办事总览',
      '新罕布什尔州 REAL ID',
      '86 条独立声明显式核对',
      '外国驾照、普通话考试、非公民与费用冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Rhode Island 两页官方正文语义核对',
    summary:
      '逐条比对 Rhode Island DMV 的 REAL ID、document checklist、LI-1、美国外州与外国驾照、permit、knowledge / road tests、DPC、renewal、name / address、fee、reservation、locations、online services、Driver Manual，Division of Taxation DPC 指引、现行 permit 州法与 TSA 当前正文；登记 69 条独立声明的显式来源，并补齐中国大陆驾照路线、其他语言考试两步预约、DPC 税务验证、30 天转入、当前费用，以及 DMV 网页与 2025 州法在 permit 续期次数上的冲突。',
    scope: [
      '罗得岛州办事总览',
      '罗得岛州 REAL ID',
      '69 条独立声明显式核对',
      '外国驾照、DPC、考试语言与 permit 冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Delaware 两页官方正文语义核对',
    summary:
      '逐条比对 Delaware DMV 的 Driver Services、SecureID、required documents、noncitizen / SAVE、adult transfer、first license、knowledge / road exams、DPC、renewal、name / address、2025 fee chart、online services、appointments、locations、wait times、July 2025 Driver Manual 与 TSA 当前正文；登记 112 条独立声明的显式来源，并补齐中国大陆与 Taiwan 互惠边界、DPC 指纹与报税路径、考试语言证据边界、SecureID one-time revalidation、SAVE、60 天转入、当前费用和 road-test 车辆要求。',
    scope: [
      '特拉华州办事总览',
      '特拉华州 SecureID / REAL ID',
      '112 条独立声明显式核对',
      'DPC、外国驾照、考试与非公民边界',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Alabama 两页官方正文语义核对',
    summary:
      '逐条比对 ALEA 的 Driver License、STAR ID、材料清单、FAQ、首证与外州转入、offices、2024 Driver Manual、GDL、road-test guide、forms、address form、online portal，以及 Alabama 州法、行政规则、官方 phishing warning 与 TSA 当前正文；登记 80 条独立声明的显式来源，并补齐 ALEA / county / ADOR 分工、新居民 30 天、Chinese written examination、外国驾照非免试、四年续期、60 天宽限和非公民 160 天 / 30 天官方冲突。',
    scope: [
      '阿拉巴马州办事总览',
      '阿拉巴马州 STAR ID',
      '80 条独立声明显式核对',
      '考试语言、外国驾照与非公民期限冲突',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Oklahoma 两页官方正文语义核对',
    summary:
      '逐条比对 Service Oklahoma 的 REAL ID、required documents、首次成人、Learner Permit、written / road tests、美国外州与外国驾照转入、续补证、State ID、改址、locations、公开业务 SOP、Oklahoma 州法与 TSA 当前正文；登记 86 条独立声明的显式来源，并补齐中国大陆与 Taiwan 路线、online English-only written test、English-only road test、SAVE、4 / 8 年费用、10 天改名改址和 temporary credential 邮寄风险。',
    scope: [
      '俄克拉荷马州办事总览',
      '俄克拉荷马州 REAL ID',
      '86 条独立声明显式核对',
      '外国驾照、考试语言与线上资格边界',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Louisiana 两页官方正文语义核对',
    summary:
      '逐条比对 Louisiana OMV 的 REAL ID、identification、residency、immigrant / non-immigrant、foreign reciprocity、new license / TIP、permits、driver education、knowledge / road tests、车辆检查、续补证、姓名与 SSN、费用、预约、线上服务、地点与 TSA 当前正文；登记 145 条独立声明的显式来源，并补齐中国大陆与 Taiwan 路线、Cantonese / interpreter 边界、30 天外州转入、Limited-Term、线上资格、2026 fee policy 和邮寄处理。',
    scope: [
      '路易斯安那州办事总览',
      '路易斯安那州 REAL ID',
      '145 条独立声明显式核对',
      '外国驾照、身份、语言与费用边界',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Wisconsin 两页官方正文语义核对',
    summary:
      '逐条比对 Wisconsin DMV 的 REAL ID、documentation、BDS316、name / DOB、identity、legal presence、residency、SSN / SSOLV、new resident / out-of-state、foreign license / reciprocity、knowledge / road tests、Motorists Handbook、续补证、改名改址、费用、ID、制卡状态、线上服务、MV3001 与 TSA 当前正文；登记 125 条独立声明的显式来源，并补齐 China / Taiwan 边界、Chinese 现场笔试、teen online test、60 / 30 天转入、8 年考试门槛、费用和邮寄流程。',
    scope: [
      '威斯康星州办事总览',
      '威斯康星州 REAL ID',
      '125 条独立声明显式核对',
      '外国驾照、中文考试与转入边界',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Utah 两页官方正文语义核对',
    summary:
      '逐条比对 Utah DLD 的 required documents、公民 / 非公民 / DPC 材料、Regular / Limited-Term / DPC 定义、original / transfer、知识与驾驶考试、2026 handbook、续补证、改名改址、费用、limited-term prequalification、fingerprint、services、locations 与 TSA 当前身份证件正文；登记 114 条独立声明的显式来源，并补齐中国驾照考试路线、Mandarin Chinese 与 DPC English-only 边界、SAVE、ITIN、10 天改址、费用、temporary license 和 no-privilege receipt。',
    scope: [
      '犹他州办事总览',
      '犹他州 REAL ID',
      '114 条独立声明显式核对',
      '三类证件、外国驾照与考试语言边界',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 New Mexico 两页官方正文语义核对',
    summary:
      '逐条比对 New Mexico MVD 的 Driver Licenses、new credential、REAL ID / Standard 材料表、non-commercial / testing procedures、knowledge updates、续补证、改名改址、费用、预约、地点、线上服务、制卡状态与 TSA 当前身份证件正文；登记 98 条独立声明的显式来源，并补齐无 SSN 的 Standard 路径、中文笔试、外国驾照考试边界、None for the Road、10 天改址、45 天 temporary credential、费用和预约差异。',
    scope: [
      '新墨西哥州办事总览',
      '新墨西哥州 REAL ID',
      '98 条独立声明显式核对',
      '考试门槛冲突与 Standard 路径',
    ],
  },
  {
    date: '2026-07-21',
    title: '完成 Missouri 两页官方正文语义核对',
    summary:
      '逐条比对 Missouri DOR 的 Driver Licensing Checklist、identity / address requirements、REAL ID、license terms / fees、general / new-card FAQ、law changes，以及 MSHP 的考试 FAQ、DOR-FUSION、Class F language list、exam locator 与 TSA 当前身份证件正文；登记 105 条独立声明的显式来源，并补齐 DOR 签发 / MSHP 考试双入口、美国外州 184 天免试边界、中国驾照完整考试路线、中文笔试、remote renewal、SAVE、费用和 temporary credential 限制。',
    scope: ['密苏里州办事总览', '密苏里州 REAL ID', '105 条独立声明显式核对', '考试、中文与远程办理边界'],
  },
  {
    date: '2026-07-21',
    title: '完成 Kansas 两页官方正文语义核对',
    summary:
      '逐条比对 Kansas DOR 的 Licensing hub、Required Documents、DE-56A、REAL ID / FAQ、proof of identity、首次与外州转入、driver FAQ、续期、iKan、改址、预约、地点、South Korea reciprocity、forms、fee chart 与 TSA 当前身份证件正文；登记 81 条独立声明的显式来源，并公开标注 90 天转入、Taiwan / South Korea 互惠、中国大陆考试路线、非公民 SAVE、邮寄和 address-change $8 / $10 官方差异。',
    scope: ['堪萨斯州办事总览', '堪萨斯州 REAL ID', '81 条独立声明显式核对', '互惠、邮寄与费用冲突'],
  },
  {
    date: '2026-07-21',
    title: '完成 South Dakota 两页官方正文语义核对',
    summary:
      '逐条比对 South Dakota 当前 Required Documents、online / in-person renewal、duplicate / address、testing、FAQ、fees、full-time traveler、locations、appointment、2025 application、Residency Affidavit 与现行州法；登记 93 条独立声明的显式来源，更新为当前 $38 / $20 fee，并公开标注旧费用、3–4 / 4–6 周寄送差异、外国驾照和考试语言边界。',
    scope: ['南达科他州办事总览', '南达科他州 REAL ID', '93 条独立声明显式核对', '费用、寄送与外国驾照边界'],
  },
  {
    date: '2026-07-21',
    title: '完成 Mississippi 两页官方正文语义核对',
    summary:
      '逐条比对 Mississippi DSB 的 Class R、2025 Driver Manual 与申请表、Required Documents、续期、线上续补证与改址、State ID、non-citizen / SAVE、learner permit、interpreter oath、2026 driver-education update、费用、地点、预约和 FAQ 正文；登记 96 条独立声明的显式来源，并公开标注过期外州驾照考试门槛冲突和 FAQ 内已经失效的 2023 REAL ID deadline。',
    scope: ['密西西比州办事总览', '密西西比州 REAL ID', '96 条独立声明显式核对', '考试门槛与旧截止日期冲突'],
  },
  {
    date: '2026-07-21',
    title: '完成 Maine 两页官方正文语义核对',
    summary:
      '逐条比对 Maine BMV 的当前 REAL ID、online transaction、new-resident、续期、改址、补证、legal presence、residency、考试口译、费用、branch 与 appointment 正文；补齐 104 条页面级显式来源映射，并公开标注 2022 brochure、旧 online FAQ 与当前办理渠道之间的冲突。',
    scope: ['缅因州办事总览', '缅因州 REAL ID', '104 条显式来源映射', '旧文档与当前渠道冲突'],
  },
  {
    date: '2026-07-19',
    title: '完成 Hawaii 两页官方正文语义核对',
    summary:
      '逐条比对 HIDOT 州级 Driver License FAQ、Rev. 3/13/2024 材料表，以及 Honolulu、Maui County、Hawaii County、Kauai County 的 REAL ID、驾照、外州/外国驾照、续期、考试、预约和 office 正文；补齐 90 条页面级显式来源映射，更新失效县级入口，并公开标注唯一 REAL ID credential、SSN 页面差异及 China/Taiwan reciprocity 边界。',
    scope: ['夏威夷州办事总览', '夏威夷州 REAL ID', '90 条显式来源映射', '四县办理与外国驾照边界'],
  },
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
    scope: ['佐治亚州中文笔试练习', '中文笔试题库索引', '题库发布检查', '90 天扩州计划'],
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
    scope: ['德州办事总览', '德州 REAL ID', '官方来源核对', '关键要求与来源对应'],
  },
  {
    date: '2026-07-17',
    title: '完成纽约州两页官方正文语义核对',
    summary:
      '逐条打开 New York DMV 的证件类型、ID-44、Social Security、预约、续期、地址、费用、补证、考试、语言和换证页面，按实际办事路径重写纽约州总览与 REAL ID 清单，并纠正线上 permit test 的年龄范围。',
    scope: ['纽约州办事总览', '纽约州 REAL ID', '官方来源核对', '关键要求与来源对应'],
  },
  {
    date: '2026-07-17',
    title: '完成加州两页官方正文语义核对',
    summary:
      '逐条打开 California DMV 的 REAL ID、材料、预约、地址、费用、处理时间、AB 60、考试和外国驾照页面，重写加州总览与 REAL ID 清单，并把每条声明改为显式来源映射。',
    scope: ['加州办事总览', '加州 REAL ID', '官方来源核对', '关键要求与来源对应'],
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
    title: '公开编辑身份、日期和质量规则',
    summary:
      '增加编辑介绍、编辑政策、纠错政策、工具使用说明和公开更新记录；区分首次发布、内容修改与事实核对日期，并启动第一批高风险专题的官方来源核对。',
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

export const HIGH_RISK_DIRECTORY_ROUTES = new Set([
  '/directories/costs-timing/',
  '/directories/deadlines/',
  '/directories/document-rules/',
  '/directories/foreign-license/',
  '/directories/identity-ssn/',
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
