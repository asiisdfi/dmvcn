export type ReviewedStateEvidence = {
  reviewedAt: string;
  reviewer: string;
  surfaces: ('overview' | 'real-id')[];
  sourceBodiesChecked: string[];
  scope: string;
  notes: string;
  claims: Record<string, string[]>;
};

const CA_REAL_ID =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/';
const CA_WHAT_IS_REAL_ID =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/what-is-real-id/';
const CA_REAL_ID_CHECKLIST =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/real-id/real-id-checklist/';
const CA_DOCUMENT_VERIFICATION =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/dl-id-online-app-edl-44/document-verification-faqs/';
const CA_APPOINTMENTS = 'https://www.dmv.ca.gov/portal/appointments/';
const CA_ADDRESS =
  'https://www.dmv.ca.gov/portal/online-change-of-address-coa-system/';
const CA_UPDATE_INFORMATION =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/updating-information-on-your-driver-license-or-identification-dl-id-card/';
const CA_FEES =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/licensing-fees/';
const CA_PROCESSING =
  'https://www.dmv.ca.gov/portal/about-the-california-department-of-motor-vehicles/renewal-processing-times/';
const CA_AB60 =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/assembly-bill-ab-60-driver-licenses/';
const CA_LEARNER_PERMITS =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/learners-permits/';
const CA_ONLINE_LEARNING =
  'https://www.dmv.ca.gov/portal/driver-education-and-safety/online-learning-and-tests/';
const CA_FAST_FACTS =
  'https://www.dmv.ca.gov/portal/file/fast-facts-5-requirements-for-a-california-drivers-license/';
const CA_DRIVER_LICENSES =
  'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/driver-licenses-dl/';

const NY_REAL_ID = 'https://dmv.ny.gov/driver-license/enhanced-or-real-id';
const NY_DOCUMENT_GUIDE = 'https://dmv.ny.gov/more-info/dmv-document-guide';
const NY_ID44 = 'https://dmv.ny.gov/forms/id44.pdf';
const NY_NO_SSN =
  'https://dmv.ny.gov/driver-license/applying-for-a-standard-license-without-a-social-security-number-or-ineligibility';
const NY_PERMIT_TEST =
  'https://dmv.ny.gov/driver-license/prepare-for-and-take-your-permit-test';
const NY_FOREIGN =
  'https://dmv.ny.gov/driver-license/drivers-from-other-countries';
const NY_OUT_OF_STATE =
  'https://dmv.ny.gov/driver-license/exchange-out-of-state-driver-license';
const NY_LANGUAGE = 'https://dmv.ny.gov/more-info/language-assistance';
const NY_ROAD_TEST =
  'https://dmv.ny.gov/driver-license/schedule-and-take-a-road-test';
const NY_RENEW =
  'https://dmv.ny.gov/driver-license/renew-a-driver-license';
const NY_ADDRESS = 'https://dmv.ny.gov/records/change-your-address';
const NY_FEES = 'https://dmv.ny.gov/driver-license/fees-refunds';
const NY_REPLACE =
  'https://dmv.ny.gov/driver-license/replace-a-license-or-permit';
const NY_OFFICES = 'https://dmv.ny.gov/contact-us/office-locations';

const TX_REAL_ID = 'https://www.texas.gov/driver-services/texas-real-id/';
const TX_ONLINE_ELIGIBILITY =
  'https://www.texas.gov/driver-services/texas-driver-license-id-renewals-replacements/online-eligibility/';
const TX_RESIDENCY =
  'https://www.dps.texas.gov/section/driver-license/texas-residency-requirement-driver-licenses-and-id-cards';
const TX_DOCUMENT_CHECK = 'https://www.dps.texas.gov/apps/DriverLicense/RealID/';
const TX_APPLY =
  'https://www.dps.texas.gov/section/driver-license/apply-texas-driver-license';
const TX_MOVING =
  'https://www.dps.texas.gov/section/driver-license/moving-texas-guide-driver-licenses-and-ids';
const TX_RECIPROCITY =
  'https://www.dps.texas.gov/section/driver-license/driving-privilege-reciprocity';
const TX_TESTING =
  'https://www.dps.texas.gov/section/driver-license/testing-other-languages';
const TX_ADDRESS =
  'https://www.dps.texas.gov/section/driver-license/how-change-information-your-driver-license-or-id-card';
const TX_FEES =
  'https://www.dps.texas.gov/section/driver-license/driver-license-fees';
const TX_TEMPORARY_VISITORS =
  'https://www.dps.texas.gov/section/driver-license/driver-licenses-and-id-cards-temporary-visitors';
const TX_TEMPORARY_LICENSE =
  'https://www.dps.texas.gov/section/driver-license/faq/section-3-issuing-temporary-permit';
const TX_IDENTIFICATION_CARD =
  'https://www.dps.texas.gov/section/driver-license/how-apply-texas-identification-card';
const TX_FAQ =
  'https://www.dps.texas.gov/section/driver-license/faq/section-1-applying-or-renewing-driver-license-identification-card-or';
const TX_LAWFUL_PRESENCE =
  'https://www.dps.texas.gov/section/driver-license/us-citizenship-or-lawful-presence-requirement';
const TX_SSN =
  'https://www.dps.texas.gov/section/driver-license/social-security-number-ssn';
const TX_CDL_TESTING =
  'https://www.dps.texas.gov/news/dps-announces-changes-cdl-knowledge-testing';
const TSA_IDENTIFICATION =
  'https://www.tsa.gov/travel/security-screening/identification';

export const reviewedStateEvidence: Record<string, ReviewedStateEvidence> = {
  california: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      CA_REAL_ID,
      CA_WHAT_IS_REAL_ID,
      CA_REAL_ID_CHECKLIST,
      CA_DOCUMENT_VERIFICATION,
      CA_APPOINTMENTS,
      CA_ADDRESS,
      CA_UPDATE_INFORMATION,
      CA_FEES,
      CA_PROCESSING,
      CA_AB60,
      CA_LEARNER_PERMITS,
      CA_ONLINE_LEARNING,
      CA_FAST_FACTS,
      CA_DRIVER_LICENSES,
    ],
    scope:
      '逐条打开并比对 California DMV 的 REAL ID、材料、预约、地址、费用、处理时间、AB 60、考试、语言和外国驾照正文。',
    notes:
      '重写 REAL ID 材料与失败原因，更新当前费用，改用 learner permit 新路径，并把自动匹配错误改成显式来源；仍待真实人工签字。',
    claims: {
      '加州首次 REAL ID 可以先在线填写申请并上传材料，但最后仍要到 DMV office 出示原件和 confirmation code 才能完成申请': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '标有 Federal Limits Apply 的普通加州驾照仍可用于驾驶，但不能用于 REAL ID 联邦用途': [
        CA_WHAT_IS_REAL_ID,
        CA_DRIVER_LICENSES,
      ],
      '如果你有有效美国护照、护照卡或其他联邦接受证件，不必只为国内航班办理 REAL ID': [
        CA_WHAT_IS_REAL_ID,
      ],
      '首次申请加州 REAL ID 需要一份身份证明、Social Security number（例外情况按官方说明）、两份不同的 California residency 证明，并亲自到 DMV office 完成文件核验': [
        CA_WHAT_IS_REAL_ID,
        CA_REAL_ID_CHECKLIST,
      ],
      '首次 REAL ID 必须到 DMV office': [CA_WHAT_IS_REAL_ID],
      '多数驾照或 ID 续期、replacement 和记录服务不提供柜台办理，应先用 online、kiosk、DMV business partner 或 mail': [
        CA_APPOINTMENTS,
      ],
      '加州法律要求地址变更后 10 天内通知 DMV，在线变更应在办理或续办其他 DMV 业务前最多预留 3 天处理': [
        CA_UPDATE_INFORMATION,
        CA_ADDRESS,
      ],
      'California DMV 当前费用页列出非商业 Class C 原办或续期 $46，replacement 或信息变更 $37，普通 ID card $40': [
        CA_FEES,
      ],
      '信用卡、借记卡和移动支付的 service fee 会因线上、办公室或 kiosk 渠道不同而变化，付款前应看费用页的最新表格': [
        CA_FEES,
      ],
      'California DMV 当前估算 DL/ID online 处理约 2 周、kiosk 实体卡邮寄约 2 周、mail 约 4 周，实际可能因额外审查延长': [
        CA_PROCESSING,
      ],
      '即时获得的 temporary driver license 不能当作身份证明使用': [CA_PROCESSING],
      '不能提供美国合法居留证明、但能提供身份和 California residency 并满足 DMV 要求的人，应走 AB 60 driver license 路径': [
        CA_AB60,
      ],
      'AB 60 不能升级为 REAL ID': [CA_WHAT_IS_REAL_ID],
      '加州 instruction permit 的 knowledge test 通常要求 80% 通过，办公室测试须在 4:30 p.m. 前开始': [
        CA_LEARNER_PERMITS,
      ],
      '符合条件的非商业 Class C 续期申请人可用 eLearning 满足 knowledge test 要求，课程提供 Traditional Chinese 和 Mandarin audio': [
        CA_ONLINE_LEARNING,
      ],
      '18 岁以上访客持有效本州或本国驾照时可在加州驾驶': [CA_FAST_FACTS],
      '成为 California resident 后须在 10 天内取得 California DL': [CA_FAST_FACTS],
      '持外国驾照申请 California DL 时按外州驾照流程办理并额外参加 driving test': [
        CA_DRIVER_LICENSES,
      ],
      '持有效外国驾照去参加 drive test 仍需 accompanying driver': [CA_LEARNER_PERMITS],
      'California DMV 明确英文网页才是官方准确来源，机器翻译差异不具有法律效力': [
        CA_REAL_ID,
      ],
      '准备一份身份证明原件或认证副本，文件要显示出生日期和 true full legal name': [
        CA_REAL_ID_CHECKLIST,
      ],
      '准备两份不同的打印版 California residency 文件，均要显示申请人的 first and last name，并与申请中的 mailing address 一致': [
        CA_REAL_ID_CHECKLIST,
      ],
      '使用 P.O. Box 时，一份居住文件必须同时显示 P.O. Box 和 physical residence address': [
        CA_REAL_ID_CHECKLIST,
      ],
      '身份文件姓名与当前法定姓名不一致时，要提交能够串起每次变更的 marriage certificate、court order 或其他法定姓名变更文件': [
        CA_REAL_ID_CHECKLIST,
      ],
      'REAL ID 申请中要提供 Social Security number，官方注明某些情况可能例外': [
        CA_WHAT_IS_REAL_ID,
      ],
      '在线上传文件后，去 DMV office 时仍要带原件和 confirmation code': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '先判断自己是否要用加州驾照或 ID 处理联邦身份用途': [CA_WHAT_IS_REAL_ID],
      '有效美国护照、护照卡等联邦接受证件也可用于这些用途': [CA_WHAT_IS_REAL_ID],
      '打开 California DMV REAL ID checklist，逐项确认 identity、SSN、residency 和 name-change 文件': [
        CA_WHAT_IS_REAL_ID,
        CA_REAL_ID_CHECKLIST,
      ],
      '在线提交申请并上传文件后，保存 confirmation code': [CA_REAL_ID],
      '到 DMV office 完成首次申请，带齐上传过的原件和 confirmation code，并提前查看 wait times 或预约入口': [
        CA_REAL_ID,
        CA_DOCUMENT_VERIFICATION,
      ],
      '以为在线上传文件后，现场就不用带原件': [CA_DOCUMENT_VERIFICATION],
      '用 photocopy 或 informational copy 代替身份证明原件或认证副本': [
        CA_REAL_ID_CHECKLIST,
        CA_FAST_FACTS,
      ],
      '两份 residency 文件并非不同文件，或姓名和地址与申请不一致': [
        CA_REAL_ID_CHECKLIST,
      ],
      '当前姓名与身份文件不同，却没有带齐每一次法定姓名变更的证明': [
        CA_REAL_ID_CHECKLIST,
      ],
      '以为首次 REAL ID 可以只靠线上或邮寄续期完成': [CA_WHAT_IS_REAL_ID],
    },
  },
  'new-york': {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      NY_REAL_ID,
      NY_DOCUMENT_GUIDE,
      NY_ID44,
      NY_NO_SSN,
      NY_PERMIT_TEST,
      NY_FOREIGN,
      NY_OUT_OF_STATE,
      NY_LANGUAGE,
      NY_ROAD_TEST,
      NY_RENEW,
      NY_ADDRESS,
      NY_FEES,
      NY_REPLACE,
      NY_OFFICES,
    ],
    scope:
      '逐条打开并比对 New York DMV 的证件类型、ID-44、Social Security、预约、续期、地址、费用、补证、permit test、路考、语言、外国驾照和外州换证正文。',
    notes:
      '按办事路径重写纽约州总览与 REAL ID 清单，纠正线上 permit test 的未满 18 岁适用范围，并把费用、期限、材料和身份声明改为显式来源；仍待真实人工签字。',
    claims: {
      '纽约州有 Standard、REAL ID 和 Enhanced 三类照片证件': [NY_REAL_ID],
      '先按用途选证件，再用官方 pre-screening 生成材料清单': [
        NY_REAL_ID,
        NY_DOCUMENT_GUIDE,
      ],
      '从 Standard 升级为 REAL ID 或 Enhanced 必须到 DMV office': [
        NY_REAL_ID,
        NY_RENEW,
      ],
      'Standard 驾照仍可用于驾驶和普通照片 ID，但不能用于登美国国内航班或进入要求 REAL ID 的联邦场所': [
        NY_REAL_ID,
      ],
      '有效护照可替代 REAL ID': [NY_REAL_ID],
      'REAL ID 没有额外证件费，但正常交易费仍适用': [NY_REAL_ID],
      'Enhanced 仅面向美国公民和纽约州居民，并在普通交易费之外加收 $30': [
        NY_REAL_ID,
      ],
      '按城市或 ZIP 搜索办公室后，点 View Details 查看现场服务和预约入口': [
        NY_OFFICES,
      ],
      '并非所有办公室提供预约，且长等待时可能只允许有 reservation 的人进入': [
        NY_OFFICES,
      ],
      '搬家后必须在 10 天内更新 license、permit、non-driver ID 和 vehicle records': [
        NY_ADDRESS,
      ],
      'USPS 地址变更不会更新 DMV 记录': [NY_ADDRESS],
      '驾照可在到期前 1 年至到期后 2 年续期': [NY_RENEW],
      '已有 REAL ID 或 Enhanced，或保持 Standard 时可线上或邮寄续期，证件类型不变，Standard 升级要到办公室': [
        NY_RENEW,
        NY_REAL_ID,
      ],
      '常见 Class D 续期费为 $64.50，MCTD 地区为 $80.50': [NY_RENEW],
      'REAL ID 不额外收费，Enhanced 另加 $30': [NY_REAL_ID, NY_RENEW],
      'replacement driver license 或 permit 为 $17.50，amend 信息变更为 $12.50': [
        NY_FEES,
      ],
      '首次 license 或 permit 费用按年龄和居住地区计算': [NY_FEES],
      '线上补证只能保留原证件类型，且寄往下单时 DMV 记录地址': [
        NY_REPLACE,
      ],
      '搬家应先改地址，线上补证不能使用临时邮寄地址': [
        NY_REPLACE,
        NY_ADDRESS,
      ],
      'Class D permit test 提供 20 种语言，包括 Chinese': [NY_PERMIT_TEST],
      '线上 permit test 选项目前仅面向未满 18 岁申请人，在线通过后应至少留出 3 个工作日供 DMV 审核': [
        NY_PERMIT_TEST,
      ],
      '未满 18 岁的申请人从取得 learner permit 起至少等 6 个月才能预约 road test': [
        NY_ROAD_TEST,
      ],
      '路考前还需完成 5-hour pre-licensing course 或符合条件的 driver education course': [
        NY_ROAD_TEST,
      ],
      '持有效外国驾照可在成为纽约州居民前驾驶': [NY_FOREIGN],
      '申请纽约驾照需通过 written test、5-hour course 和 road test，路考通过时会交出 foreign license': [
        NY_FOREIGN,
      ],
      '外国驾照不是英文时，参加 road test 要带 International Driving Permit 或由领事馆、美国国务院或其他政府机构认证的翻译': [
        NY_FOREIGN,
      ],
      'NY DMV 提供免费语言协助，中文属于重要表格和文件覆盖的 12 种主要语言之一': [
        NY_LANGUAGE,
      ],
      '官方电话为 1-518-486-9786': [NY_LANGUAGE],
      '成为纽约居民后，应在 30 天内把美国其他州或领地、联邦特区或加拿大省份的合格驾照换成纽约驾照': [
        NY_OUT_OF_STATE,
      ],
      '换证仅可到办公室办理': [NY_OUT_OF_STATE],
      '先用 NY DMV pre-screening 生成个人清单，再以当前 ID-44（2/26）复核接受的文件和分值': [
        NY_DOCUMENT_GUIDE,
        NY_ID44,
      ],
      'REAL ID 需要 Social Security 证明、citizenship 或 lawful status、两份纽约州居住证明，以及累计 6 points 的姓名证明': [
        NY_ID44,
      ],
      '材料须为原件或签发机构认证副本': [NY_ID44],
      '除官方特别说明外，过期文件不接受': [NY_ID44],
      '两份居住证明都必须显示当前纽约州地址，P.O. Box 不接受': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '电子 statement 或 e-bill 要打印，且同一来源或同一类型只能使用一份': [
        NY_ID44,
      ],
      '用于 REAL ID 的 Social Security ineligibility letter 必须由 SSA 在办公室访问前 30 天内签发，并同时带向 SSA 出示过的 DHS 文件': [
        NY_ID44,
        NY_NO_SSN,
      ],
      '身份证明姓名与当前法定姓名不同时，需用原件或认证副本串起每一次姓名变化': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '非英文文件必须附 certified English translation': [NY_ID44],
      '先按用途判断：Standard 可用于驾驶和普通照片 ID，但不满足 REAL ID 联邦用途': [
        NY_REAL_ID,
      ],
      'REAL ID 解决联邦身份用途': [NY_REAL_ID],
      'Enhanced 另含限定的陆路或海路边境返美用途': [NY_REAL_ID],
      '打开 NY DMV pre-screening，选择申请、升级或换证场景并生成个人材料清单': [
        NY_DOCUMENT_GUIDE,
        NY_REAL_ID,
      ],
      '按当前 ID-44 逐项核对 Social Security、citizenship 或 lawful status、两份 residency 和 6-point name proof': [
        NY_ID44,
      ],
      '逐份检查姓名链、当前地址、签发日期、原件或认证副本以及英文翻译': [
        NY_ID44,
      ],
      '按城市或 ZIP 查办公室，打开 View Details 确认该地点的服务和 reservation 规则': [
        NY_OFFICES,
      ],
      '到办公室提交文件并领取 temporary document': [NY_REAL_ID],
      '官方提示新 REAL ID 或 Enhanced 通常约 2 周寄到': [NY_REAL_ID],
      '把 Enhanced 与 REAL ID 当作同一证件，或误以为 Enhanced 可替代加拿大、墨西哥和部分加勒比地区之间的航空旅行证件': [
        NY_REAL_ID,
      ],
      '只带一份居住证明，或用 P.O. Box、同一金融机构的 bank statement 与 credit card statement 凑两份': [
        NY_ID44,
        NY_REAL_ID,
      ],
      '姓名改过多次却只带最后一次改名文件': [NY_ID44, NY_REAL_ID],
      '认为网上 pre-screening 或上传审核完成后就不用到办公室提交文件': [
        NY_REAL_ID,
      ],
      '到办公室才发现非英文材料没有 certified English translation，或原件已经过期': [
        NY_ID44,
      ],
    },
  },
  texas: {
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    surfaces: ['overview', 'real-id'],
    sourceBodiesChecked: [
      TX_REAL_ID,
      TX_ONLINE_ELIGIBILITY,
      TX_RESIDENCY,
      TX_DOCUMENT_CHECK,
      TX_APPLY,
      TX_MOVING,
      TX_RECIPROCITY,
      TX_TESTING,
      TX_ADDRESS,
      TX_FEES,
      TX_TEMPORARY_VISITORS,
      TX_TEMPORARY_LICENSE,
      TX_IDENTIFICATION_CARD,
      TX_FAQ,
      TX_LAWFUL_PRESENCE,
      TX_SSN,
      TX_CDL_TESTING,
      TSA_IDENTIFICATION,
    ],
    scope:
      '逐条打开并比对 Texas.gov、Texas DPS 和 TSA 的 REAL ID、线上资格、居住证明、个人化清单、首次申请、预约、费用、地址、身份核验、考试、临时证件、外国驾照与新居民正文。',
    notes:
      '重写 Texas 总览与 REAL ID 清单，纠正简版公民材料清单和车辆登记证明的适用范围，更新 2026 年 CDL 语言规则，并为费用、期限、身份和材料声明建立显式来源；仍待真实人工签字。',
    claims: {
      'Texas DPS 管理德州驾照和身份证': [TX_FAQ],
      '首次申请和外州换证必须到 driver license office': [TX_FAQ],
      '续期、补证、升级和改地址应先让官方系统判断线上资格': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '首次申请德州驾照前，先用 DPS REAL ID Document Check 生成个人材料清单': [
        TX_DOCUMENT_CHECK,
        TX_APPLY,
      ],
      '申请人通常还要完成视力、knowledge 和 driving skills 测试，符合外州换证或互惠条件者可能免试': [
        TX_APPLY,
        TX_MOVING,
      ],
      '德州 REAL ID 合规驾照或 ID 的右上角有星标': [TX_REAL_ID],
      '当前有效但没有星标的德州证件仍可用于驾驶和非联邦身份用途': [
        TX_REAL_ID,
      ],
      '自 2025 年 5 月 7 日起，乘坐美国国内航班须使用带星标证件、有效护照、美国军人证或其他 TSA 接受证件': [
        TX_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      'DPS 的现场驾照和 ID 服务以预约为主，部分办公室仅提供数量有限的 walk-in appointment': [
        TX_FAQ,
      ],
      '可在最多提前 180 天预约后前往任一 driver license office': [TX_FAQ],
      '续期、补证或改地址先检查线上资格': [TX_ONLINE_ELIGIBILITY],
      '多数 Texas driver license 和 ID 可在到期前两年至到期后两年内续期，但证件类型和个人状态可能改变办理方式': [
        TX_FAQ,
        TX_ONLINE_ELIGIBILITY,
      ],
      '79 岁及以上驾照持有人须现场续期，learner license 不能在线续期': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '18 至 84 岁 Class A、B 或 C 驾照常见新办和续期费为 $33，replacement 为 $11': [
        TX_FEES,
      ],
      '59 岁及以下普通 ID 新办或续期费为 $16，60 岁及以上为 $6，replacement 为 $11': [
        TX_FEES,
      ],
      '地址变化后 30 天内要更新 driver license 或 ID，改地址和改姓名都按 replacement 办理并支付适用费用': [
        TX_ADDRESS,
        TX_FEES,
      ],
      'temporary driver license 自业务办理日起有效 60 天，正式驾照通常约 2 至 3 周邮寄到达': [
        TX_TEMPORARY_LICENSE,
        TX_APPLY,
      ],
      '符合要求的 temporary visitor 会收到标有 Limited Term 的驾照或 ID': [
        TX_TEMPORARY_VISITORS,
      ],
      '证件通常随 lawful presence 期限到期': [TX_TEMPORARY_VISITORS],
      '若身份期限为 duration of status，证件一年后到期': [
        TX_TEMPORARY_VISITORS,
      ],
      'DPS 会通过 DHS 核验 lawful presence，在核验完成前不能签发驾照或 ID': [
        TX_LAWFUL_PRESENCE,
      ],
      '需要额外核验时，申请人要按 DPS 指示继续处理': [TX_LAWFUL_PRESENCE],
      '非商业驾照 knowledge test 只提供 English 或 Spanish，翻译人员只能在考试前后协助，不能在考试过程中提供帮助': [
        TX_TESTING,
      ],
      '自 2026 年 6 月 1 日起，Texas CDL 和 CLP knowledge exams 只用 English，考试中禁止 interpreter': [
        TX_CDL_TESTING,
        TX_TESTING,
      ],
      '新居民持有效、未过期的美国其他州或领地、加拿大省份或符合条件国家驾照，可在搬到 Texas 后最多驾驶 90 天': [
        TX_MOVING,
      ],
      '交出有效的美国其他州、领地或加拿大驾照时，通常免 knowledge 和 skills exams': [
        TX_MOVING,
      ],
      'Texas 与 France、Germany、South Korea、United Arab Emirates 和 Taiwan 有驾照互惠': [
        TX_MOVING,
      ],
      '持有效未过期证件且交出外国驾照者可能免 knowledge 和 skills exams': [
        TX_MOVING,
      ],
      '外国驾照不是 English 或 Spanish 时，去办公室前要由翻译服务机构或领事馆完成翻译': [
        TX_MOVING,
      ],
      '持有效未过期外国驾照的非居民驾驶期限最多为一年或到成为 Texas resident 为止，以较早者为准': [
        TX_RECIPROCITY,
      ],
      '成为新居民后须在 90 天内申请 Texas license': [
        TX_RECIPROCITY,
        TX_MOVING,
      ],
      '先用 DPS REAL ID Document Check 回答申请类型、身份和现有材料问题，生成个人化清单': [
        TX_DOCUMENT_CHECK,
      ],
      '准备 citizenship 或 lawful presence、identity 和 Social Security number 对应文件': [
        TX_APPLY,
        TX_IDENTIFICATION_CARD,
      ],
      'DPS 会与联邦系统核验 SSN 和 lawful presence': [
        TX_SSN,
        TX_LAWFUL_PRESENCE,
      ],
      '准备两份打印的 Texas residency 文件，两份都要显示申请人姓名和 residential address': [
        TX_RESIDENCY,
      ],
      '通常至少一份要证明已在 Texas 居住 30 天': [TX_RESIDENCY],
      '交出有效未过期外州证件者和 CDL 申请人免除 30 天要求，但仍要交两份居住证明': [
        TX_RESIDENCY,
      ],
      '符合清单的电子 statement 可以打印提交': [TX_RESIDENCY],
      '同一来源仅在地方政府或提供多项住宅服务的机构分别出具不同服务账单时可算两份': [
        TX_RESIDENCY,
      ],
      '同一服务不同月份不能凑两份': [TX_RESIDENCY],
      '驾照申请中的 Texas vehicle registration 证明只适用于交出外州驾照的新居民': [
        TX_APPLY,
      ],
      '申请人还要提供本人拥有的每辆车的保险证明，或签署不拥有车辆的声明': [
        TX_APPLY,
      ],
      '身份文件与当前姓名不一致时，准备能够连接每次变更的法定姓名文件': [
        TX_DOCUMENT_CHECK,
        TX_ADDRESS,
      ],
      '非美国公民要按本人身份提供 lawful presence 文件，DPS 在 DHS 核验完成前不能签发证件': [
        TX_LAWFUL_PRESENCE,
      ],
      '符合 temporary visitor 定义者会收到标有 Limited Term 的证件': [
        TX_TEMPORARY_VISITORS,
      ],
      '先看现有证件右上角是否有星标，再判断是否需要用州证件乘坐国内航班或进入受管制联邦设施': [
        TX_REAL_ID,
        TSA_IDENTIFICATION,
      ],
      '已有 Texas DL 或 ID 的续期、补证、升级或改地址，先运行 online eligibility': [
        TX_ONLINE_ELIGIBILITY,
      ],
      '首次申请和外州换证直接准备现场路径': [TX_FAQ],
      '运行 REAL ID Document Check，并按结果准备原件、认证副本、打印的 residency 文件和完整姓名链': [
        TX_DOCUMENT_CHECK,
        TX_REAL_ID,
        TX_RESIDENCY,
        TX_ADDRESS,
      ],
      '需要现场办理时，用 Texas Scheduler 选择准确服务和办公室': [TX_FAQ],
      '首次申请或外州换证必须亲自办理': [TX_FAQ],
      '现场核对申请、材料、照片、指纹、费用和适用考试': [TX_APPLY],
      '常见 18 至 84 岁 Class A、B 或 C 新办或续期费为 $33，replacement 为 $11': [
        TX_FEES,
      ],
      '最终以当前 fee table 和个人业务为准': [TX_FEES],
      '领取 temporary driver license 后当场核对信息': [TX_APPLY],
      '临时驾照有效 60 天，正式卡通常约 2 至 3 周邮寄到达': [
        TX_TEMPORARY_LICENSE,
        TX_APPLY,
      ],
      '搬家后 30 天内更新驾照或 ID 地址': [TX_ADDRESS],
      '地址或姓名变更属于 replacement，并要支付适用费用': [
        TX_ADDRESS,
        TX_FEES,
      ],
      '把 Texas.gov 的简版公民材料示例当成所有申请人的通用清单，或没有运行 DPS REAL ID Document Check': [
        TX_REAL_ID,
        TX_DOCUMENT_CHECK,
        TX_LAWFUL_PRESENCE,
      ],
      '只带一份 residency 文件，或两份文件没有同时显示本人姓名和 Texas residential address': [
        TX_RESIDENCY,
      ],
      '用同一项服务不同月份的账单凑两份居住证明': [TX_RESIDENCY],
      '误以为所有续期、补证和改地址都能在线办理': [
        TX_ONLINE_ELIGIBILITY,
      ],
      'DPS 会按年龄、证件类型和状态、上次续期方式、SSN、身份核验、欠票或 warrant 等条件决定资格': [
        TX_ONLINE_ELIGIBILITY,
        TX_FAQ,
      ],
      '79 岁及以上驾照持有人须现场续期': [TX_ONLINE_ELIGIBILITY],
      '未预约就直接前往办公室，或没有确认所选服务和 appointment': [TX_FAQ],
      '只带最后一次改名文件，没有把出生姓名到当前法定姓名完整连接起来': [
        TX_DOCUMENT_CHECK,
        TX_ADDRESS,
      ],
      '默认普通 knowledge test 有中文版本': [TX_TESTING],
      '非商业驾照知识考试只提供 English 或 Spanish，翻译人员不能在考试过程中协助': [
        TX_TESTING,
      ],
    },
  },
};

export function getReviewedStateEvidence(stateId: string) {
  return reviewedStateEvidence[stateId];
}

export function getReviewedStateClaimSources(stateId: string, claim: string) {
  return reviewedStateEvidence[stateId]?.claims[claim];
}
