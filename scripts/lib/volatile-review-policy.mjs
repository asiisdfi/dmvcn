export const VOLATILE_REVIEW_CYCLE_DAYS = 30;

export const VOLATILE_REVIEW_ROUTES = Object.freeze([
  {
    route: '/directories/costs-timing/',
    category: 'fees-processing',
    label: '费用、付款与处理时间',
    scope: '州级费用、付款方式、临时凭证、制证和寄送时间',
  },
  {
    route: '/directories/deadlines/',
    category: 'deadlines',
    label: '期限与宽限期',
    scope: '搬州、改址、续期、转入、材料有效期和宽限期',
  },
  {
    route: '/directories/document-rules/',
    category: 'document-rules',
    label: '材料规则',
    scope: '地址证明、姓名链、原件、认证副本和翻译要求',
  },
  {
    route: '/directories/identity-ssn/',
    category: 'identity-ssn',
    label: '身份与 SSN',
    scope: 'SSN、无 SSN、ITIN、lawful presence 和临时访客分流',
  },
  {
    route: '/directories/foreign-license/',
    category: 'foreign-license',
    label: '外国驾照与 IDP',
    scope: '外国或外州驾照、IDP、互惠免试、翻译和交旧证规则',
  },
  {
    route: '/topics/airport-travel-after-real-id/',
    category: 'federal-travel-id',
    label: '联邦旅行证件',
    scope: '国内航班证件、REAL ID、替代证件和 TSA 身份确认流程',
  },
  {
    route: '/topics/dmv-test-language-translation-interpreter/',
    category: 'testing-language',
    label: '考试语言与口译',
    scope: '笔试语言、口试、音频、口译、文件翻译和 CDL 限制',
  },
  {
    route: '/topics/older-driver-license-renewal-medical-review/',
    category: 'medical-age',
    label: '年龄与医疗复核',
    scope: '年龄触发续证、视力、medical review 和报告规则',
  },
  {
    route: '/topics/temporary-tag-trip-permit-dealer-plate/',
    category: 'temporary-permits',
    label: '临时牌照与通行许可',
    scope: 'temporary tag、trip permit、dealer plate、期限和适用车辆',
  },
  {
    route: '/topics/tickets-tolls-insurance-lapse-registration-hold/',
    category: 'holds-sanctions',
    label: '欠费、保险中断与限制',
    scope: '罚单、toll、insurance lapse、registration hold 和解除顺序',
  },
  {
    route: '/topics/vehicle-inspection-emissions-smog-vin-check/',
    category: 'inspection-emissions',
    label: '车辆检查与排放',
    scope: '安全检查、emissions、smog、VIN check 和州级豁免',
  },
  {
    route: '/topics/vehicle-registration-renewal-expired-tags-non-operation/',
    category: 'registration-renewal',
    label: '车辆登记续期',
    scope: 'registration renewal、过期标签、宽限期和停驶路径',
  },
]);
