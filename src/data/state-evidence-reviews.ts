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
};

export function getReviewedStateEvidence(stateId: string) {
  return reviewedStateEvidence[stateId];
}

export function getReviewedStateClaimSources(stateId: string, claim: string) {
  return reviewedStateEvidence[stateId]?.claims[claim];
}
