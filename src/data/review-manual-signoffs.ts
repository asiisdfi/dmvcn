export type ReviewManualSignoff = {
  route: string;
  reviewer: string;
  reviewedAt: string;
  scope: string;
  notes?: string;
};

export const REVIEW_MANUAL_SIGNOFFS: ReviewManualSignoff[] = [
  {
    route: '/directories/costs-timing/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对各州费用、付款方式、临时凭证和寄送时间，并确认正文提示与所列政府来源一致。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/directories/deadlines/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对地址变更、新居民转入、续期和材料时效等期限，并检查适用范围和例外提示。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/directories/document-rules/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对身份、住址、姓名链、原件和认证副本要求，以及不同州规则之间的边界。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/directories/foreign-license/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对外国驾照、外州驾照、IDP、互惠免试、翻译和交旧证提示及其政府来源。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/directories/identity-ssn/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对 SSN、无 SSN、ITIN、合法身份和临时访客分流，确认页面没有替读者判断移民身份。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/disabled-parking-placard-plates/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对残疾停车证、车牌、医疗证明、续期、补发、跨州使用和违规风险。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/driver-license-suspension-reinstatement-sr22/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对驾照暂停、撤销、恢复、费用、SR-22 或 FR-44 及法院和 DMV 的职责边界。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/gift-inherited-vehicle-title-transfer/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对赠与、继承、共同车主、遗产、税费、留置权和车辆所有权转移要求。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对遗失车辆所有权证、电子 title、留置权、补发和出售前处理要求。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/name-change-chain/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对姓名变更、SSA 同步、身份文件衔接、翻译和各机构办理顺序。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/non-citizen-license-id/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对非公民申请驾照或州身份证的身份文件、有效期、核验和州别差异。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/older-driver-license-renewal-medical-review/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对高龄驾驶人续期、视力检查、医疗复核、家属报告和驾驶限制。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/ssn-and-itin/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对 SSN、ITIN、无 SSN 文件和 DMV 身份材料之间的区别与适用条件。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/standard-license-driving-privilege-no-lawful-status/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对 standard license、驾驶特权证件、REAL ID 限制、资格和使用边界。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/student-temporary-resident-license-registration/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对学生、访问学者、临时居民和访客的驾照、车辆登记与居住身份分流。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/tickets-tolls-insurance-lapse-registration-hold/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对罚单、收费公路、保险中断、车辆登记限制及不同机构的处理顺序。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
  {
    route: '/topics/used-car-title-lien-salvage-odometer-check/',
    reviewer: 'DMVCN 站长',
    reviewedAt: '2026-07-21',
    scope: '人工核对二手车 title、留置权、salvage、里程表、VIN 和交易前风险检查。',
    notes: '站长确认已完成页面与官方来源的人工复核，未发现需要退回的关键问题。',
  },
];
