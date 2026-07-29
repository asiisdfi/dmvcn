export type SearchIntentBoundary = {
  routes: [string, string];
  reviewedAt: string;
  distinction: string;
};

export const SEARCH_INTENT_BOUNDARIES: SearchIntentBoundary[] = [
  {
    routes: [
      '/topics/airport-travel-after-real-id/',
      '/topics/real-id-basics/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '机场页解决出行当天带什么证件、临时证件和 ConfirmID；基础页解决是否需要升级 REAL ID 以及可用替代证件。',
  },
  {
    routes: [
      '/topics/real-id-basics/',
      '/topics/real-id-vs-standard-license/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '基础页回答要不要办理及联邦用途；比较页专门区分 Standard、REAL ID 与 Enhanced 三类州证件。',
  },
  {
    routes: [
      '/topics/driver-license-suspension-reinstatement-sr22/',
      '/topics/tickets-tolls-insurance-lapse-registration-hold/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '吊销复职页处理驾驶资格恢复与 SR-22；罚单和欠费页处理 registration hold、保险中断及先清哪一项。',
  },
  {
    routes: [
      '/topics/proof-of-residency/',
      '/topics/residency-proof-no-bills-po-box/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '一般地址证明页解释常规文件组合；特殊地址页只处理没有本人账单、P.O. Box、同住或无固定住址等例外路径。',
  },
  {
    routes: [
      '/directories/document-rules/',
      '/directories/identity-ssn/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '材料规则表比较原件、认证副本、地址和翻译要求；身份与 SSN 表比较身份类别、SSN 核验和无 SSN 分支。',
  },
];
