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
      '/directories/document-rules/',
      '/directories/identity-ssn/',
    ],
    reviewedAt: '2026-07-29',
    distinction:
      '材料规则表比较原件、认证副本、地址和翻译要求；身份与 SSN 表比较身份类别、SSN 核验和无 SSN 分支。',
  },
  {
    routes: [
      '/directories/appointments/',
      '/directories/dmv-services/',
    ],
    reviewedAt: '2026-08-24',
    distinction:
      '预约目录按州查预约系统、办公室类型与地点；服务目录按州查主管机构和具体业务入口。',
  },
  {
    routes: [
      '/directories/appointments/',
      '/directories/service-paths/',
    ],
    reviewedAt: '2026-08-24',
    distinction:
      '预约目录回答在哪里约、去哪个办公室；渠道目录回答某项业务能否在线、邮寄、kiosk 或必须现场办理。',
  },
  {
    routes: [
      '/directories/dmv-services/',
      '/directories/service-paths/',
    ],
    reviewedAt: '2026-08-24',
    distinction:
      '服务目录用于找到主管机构与业务页面；渠道目录用于比较线上、现场、邮寄和预约路径。',
  },
];
