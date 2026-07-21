import { states, topics } from './content.ts';
import { getReviewedStateEvidence } from './state-evidence-reviews.ts';
import { REVIEW_MANUAL_SIGNOFFS } from './review-manual-signoffs.ts';

export type SemanticReview = {
  status: 'source-mapped' | 'evidence-checked' | 'human-approved';
  method: 'automated' | 'ai-assisted' | 'human';
  reviewedAt: string;
  reviewer: string;
  scope: string;
  notes: string;
};

const REGISTRY_REVIEW_DATE = '2026-07-18';

const COLLECTION_ROUTES = ['/', '/states/', '/topics/', '/directories/'];
const DIRECTORY_ROUTES = [
  '/directories/appointments/',
  '/directories/dmv-services/',
  '/directories/service-paths/',
  '/directories/tests-permits/',
  '/directories/language-access/',
  '/directories/costs-timing/',
  '/directories/identity-ssn/',
  '/directories/new-residents/',
  '/directories/real-id/',
  '/directories/foreign-license/',
  '/directories/document-rules/',
  '/directories/deadlines/',
];

function ensureEvidenceChecked(route: string, scope: string, reviewer?: string, note?: string): void {
  if (semanticReviews[route]) return;

  semanticReviews[route] = {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: REGISTRY_REVIEW_DATE,
    reviewer: reviewer ?? 'Codex AI 辅助语义核对',
    scope,
    notes:
      note ??
      '该页面已接入可追踪版本，完成规则结构核对与入口映射；高风险页面仍需安排真实人工语义签字。',
  };
}

function ensureSourceMapped(route: string, scope: string, note?: string): void {
  if (semanticReviews[route]) return;

  semanticReviews[route] = {
    status: 'source-mapped',
    method: 'automated',
    reviewedAt: REGISTRY_REVIEW_DATE,
    reviewer: '站内证据映射审计',
    scope,
    notes:
      note ??
      '已核对数据模型、官方域名、声明主题与成品 HTML 的来源映射；尚未逐页打开官方来源正文进行语义比对。',
  };
}

/**
 * "source-mapped" records an automated claim-to-source match and does not
 * imply that a person or AI opened and compared every source body.
 * "evidence-checked" records an AI-assisted, sentence-level comparison against
 * the official sources shown on the page. Neither status is a human or
 * professional approval. "human-approved" may be used only after a real person
 * completes the same comparison and is accurately identified.
 */
export const semanticReviews: Record<string, SemanticReview> = {
  '/directories/appointments/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州 appointmentNote、办理步骤和官方 action links 的预约、walk-in、办公室类型与地点分工抽取；逐项回查已显式核验的州级声明和对应官方入口。',
    notes:
      '目录只重排 100 个已完成显式来源核查的州页声明；预约可用不等于该地点可办目标业务，页面保留到场前核对服务类型的限制。',
  },
  '/directories/dmv-services/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州主管机构、appointmentNote 和 action links 的成品输出，确认每个机构与业务入口继承自已显式核验的州级来源集合。',
    notes:
      '本页是官方业务入口索引，不替代州级资格判断；复杂材料继续进入对应州指南和政府业务页。',
  },
  '/directories/service-paths/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州线上、现场、预约、改址、续期、补证和 REAL ID 分流提示的抽取逻辑，并回查每条入选文本在州页显式来源映射中的限定条件。',
    notes:
      '页面把线上资格提示与必须到场情形分开；未把 portal 存在扩大为所有申请人都可在线完成。',
  },
  '/directories/tests-permits/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州 learner permit、knowledge test、road test、first license、GDL、practice test 和第三方考点提示，逐项回查州级手册、考试页和显式声明来源。',
    notes:
      '目录不把 practice test 当正式题目，也不把某类考试入口扩大为所有年龄、证件或语言均可使用。',
  },
  '/directories/language-access/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州 Chinese、Mandarin、translated test、interpreter、文件翻译、driver manual 与 English-only / CDL 限制的抽取，并回查已核验官方语言与考试来源。',
    notes:
      '页面继续明确区分网页翻译、中文手册、中文笔试、口译和路考 / CDL 语言；没有固定官方依据的州只显示需确认。',
  },
  '/directories/new-residents/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州新居民、外州转入、地址和车辆办理的第一步提示与官方入口，逐项回查州级 recommendedSteps、documentHighlights 和 licenseSummary 的显式来源。',
    notes:
      '本页只给第一步分流，不把摘要替代具体期限、考试、车辆登记或保险规则；读者仍回州页和官方入口确认。',
  },
  '/directories/real-id/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '核对 50 州 REAL ID、STAR ID、Star Card、Travel ID、Secure ID 或相应材料入口，并逐州比对 action links 与已核验 REAL ID 来源。',
    notes:
      '修正原先固定选取第一个 action link 的逻辑：现在优先州级 REAL ID / STAR ID 专页，材料清单兜底，并排除 TSA 通用页作为州级主入口。',
  },
  '/topics/real-id-basics/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 REAL ID 联邦用途、替代证件、临时驾照、儿童证件、州级申请差异，以及 2026 年 TSA ConfirmID 的费用、机场核验、有效期和失败风险。',
    notes:
      '已移除过时的免费现场核验暗示，改为 2026-02-01 起的 $45 ConfirmID 现行流程，并明确付款不保证身份核验成功。',
  },
  '/topics/real-id-vs-standard-license/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 Standard、REAL ID、Enhanced Driver License / ID 的驾驶用途、联邦用途、公民资格、陆海路边境用途、国际航空限制和卡面标记。',
    notes:
      'New York 与 Washington 的州别差异均回查现行官方正文；Washington 声明改绑当前 REAL ID 专页，保留 EDL 业务入口供办理。',
  },
  '/topics/document-checklist/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对身份与 lawful status、SSN、州内地址、姓名链、原件或认证副本、非公民分流和州级互动材料清单。',
    notes:
      '通用四组材料只作为分拣框架；数量、文件形式、无 SSN 路径和护照当前姓名例外均保留 Pennsylvania、Texas、Florida 等州的明确边界。',
  },
  '/topics/proof-of-residency/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对地址文件数量、本人姓名与住宅地址、电子文件、日期窗口、P.O. Box、关系追溯、affidavit、同一来源限制和预上传边界。',
    notes:
      'California、New York、Texas 的不同规则分别绑定州级官方来源，没有把某州的打印件、日期窗口或 P.O. Box 规则推广到全国。',
  },
  '/topics/residency-proof-no-bills-po-box/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对无本人账单、同住人证明、学校或雇主文件、P.O. Box / PMB、打印格式、Texas DL-5、Florida HSMV 71120 和 South Dakota full-time traveler 特例。',
    notes:
      '替换 South Dakota 已失效旧入口，并按当前知识库限定为过去一年州内一晚住宿收据、PMB 证明和 Residency Affidavit；virtual address 不被接受。',
  },
  '/topics/airport-travel-after-real-id/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对成人与儿童证件、REAL ID 替代证件、过期证件、临时驾照、联邦设施，以及 TSA ConfirmID 的费用、处理时间、付款凭证、机场核验和失败风险。',
    notes:
      '已按 2026 年 TSA 正文重写无可接受 ID 的处理路径：$45 ConfirmID 可提前或到机场付款，但实际核验在机场完成且不保证通过。',
  },
  '/topics/state-id-non-driver-id-real-id-card/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 State ID 的非驾驶用途、REAL ID / standard / Enhanced 区别、年龄、驾照 surrender、材料、邮寄、临时 ID、费用减免和 mobile ID 边界。',
    notes:
      'California、Texas、Washington、Virginia、New Jersey 和 Massachusetts 的年龄、持证关系、材料与寄卡规则分别绑定州级来源，没有写成全国统一资格。',
  },
  '/topics/online-office-appointment/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对线上资格、kiosk / mail / office 分流、地点服务范围、预约、考试入口、交易供应商和临时证件限制。',
    notes:
      '保留“入口可用不等于本人符合资格”和“预约不等于地点可办目标业务”两层限制，并核对 California、New York、Texas、Florida、Washington、New Jersey 当前入口。',
  },
  '/topics/lost-stolen-license-id-replacement-identity-theft/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对补证资格、地址与邮寄、被盗号码、警察报告、身份盗用、临时或移动 ID、旧证销毁、外州补证与 TSA 旅行处理。',
    notes:
      '已将旅行部分切换为 2026 年 $45 ConfirmID 现行流程，并把 Washington 邮寄补普通驾照的限制绑定专门 out-of-state 页面；没有承诺换新号码或免费补证。',
  },
  '/topics/dmv-fees-mailing-temporary-license/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 original / renewal / replacement 费用分类、线上附加费、处理时间、实体卡邮寄、receipt、temporary credential 和 TSA 接受范围。',
    notes:
      'California、Florida、New Jersey、New York 与 Texas 的费用和寄卡规则均按具体交易表达，页面未给跨州统一价格或把临时驾驶效力扩大为身份用途。',
  },
  '/topics/moving-to-new-state/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对新居民驾照、车辆 title / registration、保险、车牌、办理顺序、期限和 lienholder 文件路径。',
    notes:
      'California、New York、New Jersey、Georgia、Texas、Florida 与 Washington 的期限和先后顺序分别回查当前官方正文，未把某州顺序推广到全国。',
  },
  '/topics/renewal-replacement-address/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对续期、补证、地址更新期限、线上资格、实体卡订购，以及驾照与车辆 title / registration 记录是否同步。',
    notes:
      'California 10 天与续期前 5 天、New York 10 天、Florida 与 Massachusetts 30 天等易变数字均保留对应州政府来源；地址记录更新与订购新卡分开表达。',
  },
  '/topics/first-driver-license-road-test/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对首次普通驾照、learner permit、knowledge test、年龄路径、课程、练车、road test 和临时凭证等跨州分流。',
    notes:
      '页面只提供判断顺序，不给全国统一天数或费用；已切换 California 当前 learner-permit 入口，并把考试语言问题导向按州、考试类型和考点确认。',
  },
  '/topics/road-test-day-vehicle-sponsor-insurance-rental-retest/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 road-test 资格、陪同人、登记与保险、车辆设备、租车、临牌或近期购车、口译、辅助驾驶功能和重考限制。',
    notes:
      'California、New York、Texas、Washington、New Jersey、Massachusetts、Pennsylvania、Virginia 与 Georgia 的州别规则分别绑定当前官方正文；Georgia 已切换现行 road-test 入口。',
  },
  '/topics/teen-driver-permit-gdl-parent-guide/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 teen / GDL 阶段、permit 年龄、家长同意、认可课程、监督驾驶与夜间小时、路考车辆和拿证后的限制。',
    notes:
      '数值规则均按 California、Florida、Washington、New Jersey、Pennsylvania、Virginia 与 Georgia 当前官方页面表达，并补齐家长参与和 Florida 路考车辆的就近来源。',
  },
  '/topics/dmv-test-language-translation-interpreter/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对网页与手册语言、普通 knowledge test、road test、oral / audio test、interpreter、文件翻译及 CDL / Hazmat 限制。',
    notes:
      '保留 Florida 2026-02-06 全部驾照考试 English-only 与 Texas 2026-06-01 CDL / CLP knowledge English-only 更新；移除无法由 North Carolina 当前官方正文确认的多语言笔试泛化。',
  },
  '/topics/foreign-license-idp-transfer/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对外国访客驾驶、IDP、州居民期限、外文翻译、original-license 路径、交回原证和互惠免试条件。',
    notes:
      '明确区分“访客可驾驶”“成为居民后申请”和“特定来源地可免测试”；新增 New Jersey、Pennsylvania 与 Texas 当前互惠国家及限制的显式来源。',
  },
  '/topics/dmv-scam-text-fake-ticket-toll-real-id-phishing/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 unpaid toll、ticket、REAL ID 加急、付款威胁、短信链接、独立核验、7726 / IC3 报告和身份盗用补救路径。',
    notes:
      'FTC、FBI、IdentityTheft.gov 与 California、Florida、Washington、Virginia、Georgia、New York 的当前警告分别提供就近来源；页面未把合法提醒或官方授权合作方一概写成诈骗。',
  },
  '/topics/vehicle-title-registration-insurance-after-move/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对搬州后 vehicle title、registration、保险、车牌、dealer / private sale、lienholder 文件、县级办理和各州期限。',
    notes:
      'California、Florida、New Jersey、Washington、Massachusetts、New York、Texas 与 Pennsylvania 的顺序和期限分别绑定当前州政府页面，没有把一州流程推广为全国规则。',
  },
  '/topics/vehicle-registration-renewal-expired-tags-non-operation/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 registration renewal、grace period、notice、地址、保险、inspection / emissions、未完成申请、过期窗口、即时凭证和停驶路径。',
    notes:
      '保留 California 无宽限期与 North Carolina 15-day valid-through 的差异，并将 Virginia 停驶来源修正为当前 plate surrender / deactivation 页面。',
  },
  '/topics/lost-stolen-license-plates-registration-card-sticker/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 plate、registration card、sticker / decal 的补办差异、警方报告、剩余车牌、新号码、未收到邮件与各州办理表格。',
    notes:
      'California、New York、Washington、Texas、Florida、North Carolina、Virginia 与 Georgia 的失窃和补发条件分别回查官方正文，未承诺保留原号码或统一免收费用。',
  },
  '/topics/temporary-tag-trip-permit-dealer-plate/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 temporary tag、TOP、trip / transit permit、dealer plate 的用途、期限、跨州限制、保险、车辆类别和正式登记衔接。',
    notes:
      '按 Texas HB 718 当前正文明确旧式纸质 30-Day / One-Trip permit 展示方式已由 Temporary Registration metal plate 取代，同时保留其他 permit 类别的区别。',
  },
  '/topics/vehicle-inspection-emissions-smog-vin-check/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 safety inspection、emissions / smog、VIN verification、州县适用范围、registration renewal 阻断和失败后处理。',
    notes:
      '确认 Texas 2025 safety inspection 变化、当前 17 个 emissions counties 与 Bexar County 2026-11-01 生效日期；Florida 仅按 VIN / odometer verification 表达。',
  },
  '/topics/sold-car-release-liability-plates-insurance/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 seller notice、release of liability、title transfer、车牌移除或退还、保险取消顺序，以及卖给 dealer 后的记录风险。',
    notes:
      'California 5 calendar days、Washington 5 business days、Texas 30 days、Oregon 与 Arizona 10 days 均保留对应官方页面或表格；另以 New York、North Carolina 等来源约束退牌后取消保险的顺序。',
  },
  '/topics/driving-record-points-traffic-school/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-21',
    reviewer: 'Codex AI 辅助证据核查',
    scope:
      '逐条比对 driving record 类型、points 阈值、traffic school / defensive driving、保险评分、CDL 例外和 Texas DRP 废止状态。',
    notes:
      'California、Florida、New York、Washington、Georgia 与 Texas 的当前数字均回查官方正文；Texas 仅把 Type 3A 写成明确可用于 DDC，并避免把 Type AR 的用途作无来源断言。',
  },
  '/practice-tests/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助结构复核',
    scope: '核对州级题库入口、题目数量、官方来源覆盖、发布日期和扩展边界。',
    notes: '当前只发布已完成逐题来源核对的 Georgia 题库；未核对州不生成占位内容页。',
  },
  '/practice-tests/georgia/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-19',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐题比对 20 道原创练习与 Georgia DDS 考试页、Driver Manual、Road Rules、Road Signs、Safety 和 Sharing the Road 官方正文。',
    notes: '未使用旧站或第三方题目；已公开正式考试与短练习的区别，并披露 DDS 当前考试页与旧版手册对中文 Road Signs 的冲突。',
  },
  '/topics/driver-license-suspension-reinstatement-sr22/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 suspension、revocation、恢复顺序、SR-22/FR-44 和恢复前驾驶提醒。',
    notes: '已修正费用顺序和 suspension/revocation 表述；高风险页面仍待真实人工语义签字。',
  },
  '/topics/non-citizen-license-id/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 SAVE、limited-term credential、身份文件和州级非公民办理路径。',
    notes: '已明确 SAVE 不决定驾照资格，并补充 additional verification 与 Texas limited-term 证据；仍待人工签字。',
  },
  '/topics/ssn-and-itin/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 SSA、IRS 以及州 DMV 对 SSN、无 SSN 和 ITIN 的适用边界。',
    notes: '已补充 Massachusetts 与 Florida 的州别例外；高风险页面仍待真实人工语义签字。',
  },
  '/topics/standard-license-driving-privilege-no-lawful-status/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对无 lawful status 的州级证件路径、联邦用途限制和证件是否可作州内身份证明。',
    notes: '已纠正“所有此类证件都不能作身份证明”的过度概括；仍待人工签字。',
  },
  '/topics/tickets-tolls-insurance-lapse-registration-hold/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 toll threshold、court clearance、insurance lapse、registration hold 和诈骗提醒。',
    notes: '已修正 Virginia toll invoice 条件并拆分五州保险后果；高风险页面仍待真实人工语义签字。',
  },
  '/topics/name-change-chain/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 SSA corrected card、连续姓名链、SSA/DMV 同步顺序、认证副本和州级姓名变更材料。',
    notes: '已增加 SSA 两年/四年旧姓名证据规则，并将 SSA 先后顺序限定到 California、Florida 和 New York 具体路径；仍待人工签字。',
  },
  '/topics/student-temporary-resident-license-registration/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对学生/临时居民、外国驾照、州 resident 定义、驾照期限和车辆登记期限。',
    notes: '已明确 New York 居民争议由法官判断而非 DMV 裁定，并补充 Florida 驾照 30 天与车辆 10 天的不同期限；仍待人工签字。',
  },
  '/topics/used-car-title-lien-salvage-odometer-check/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对私人交易 ownership chain、title/lien、brand、odometer、history report 和 dealer/private-sale 边界。',
    notes: '已纠正 California 卖家与 title owner 不同的过度概括，加入合法 bill-of-sale chain 与 New York 涂改 title 规则；仍待人工签字。',
  },
  '/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 replacement title、record owner、lienholder、electronic title、地址、旧证失效和办理时效。',
    notes: '已补充 title 与 registration 的证据映射，以及 Washington 全体登记车主签字、公证和 Quick Title 边界；仍待人工签字。',
  },
  '/topics/gift-inherited-vehicle-title-transfer/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 gift tax、lien consideration、继承签字权限、TOD beneficiary、title 与 registration 分流。',
    notes: '已补充 Florida、Pennsylvania 的 gift/lien 税务边界，并限定 Georgia 必须先 title 的具体继承路径；仍待人工签字。',
  },
  '/topics/older-driver-license-renewal-medical-review/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对年龄触发续证、视力筛查、medical review、报告保密、强制医疗报告和 Illinois 2026 过渡规则。',
    notes: '已增加 Illinois 旧到期日例外、Virginia/Georgia 年龄规则及 Pennsylvania/New Jersey 医疗报告边界；仍待人工签字。',
  },
  '/topics/disabled-parking-placard-plates/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '逐条比对 placard/plate 绑定、temporary/permanent 期限、跨州使用、迁州重新申请、DV ISA 和 misuse 后果。',
    notes: '已补充 New York 迁州不能直接换 permit、Washington temporary permit 退回要求及 Texas/New York 滥用处罚；仍待人工签字。',
  },
  '/directories/costs-timing/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '核查 50 州费用、付款、临时凭证、邮寄和处理时间提示的抽取规则，并给每条保留提示绑定政府来源。',
    notes: '目录只显示能够匹配到州级官方费用、处理、续期或补证页面的具体提示；仍待人工签字。',
  },
  '/directories/deadlines/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '核查 50 州搬家、地址、续期、材料时效和处理期限提示的抽取与逐条来源绑定。',
    notes: '无法绑定到对应政府入口的具体期限不作为已核实事实显示；仍待人工签字。',
  },
  '/directories/document-rules/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '核查 50 州地址证明、SSN、姓名链、认证副本和非公民材料提示，并逐条绑定 document/checklist 来源。',
    notes: '具体材料提示现在直接链接到最相关的州政府清单或身份要求页面；仍待人工签字。',
  },
  '/directories/foreign-license/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '核查 50 州外国/外州驾照、IDP、互惠、测试、翻译和交旧证提示，并逐条绑定官方办理入口。',
    notes: '“能驾驶”和“可直接换证”继续分开表达，无法找到对应 transfer/foreign-license 来源的具体提示不会展示；仍待人工签字。',
  },
  '/directories/identity-ssn/': {
    status: 'evidence-checked',
    method: 'ai-assisted',
    reviewedAt: '2026-07-17',
    reviewer: 'Codex AI 辅助证据核查',
    scope: '核查 50 州 SSN、无 SSN、ITIN、lawful presence、非公民和 temporary visitor 提示，并逐条绑定官方身份入口。',
    notes: '目录不判断移民身份，仅显示可映射到州政府身份或材料页面的分流提示；仍待人工签字。',
  },
};

for (const signoff of REVIEW_MANUAL_SIGNOFFS) {
  semanticReviews[signoff.route] = {
    status: 'human-approved',
    method: 'human',
    reviewedAt: signoff.reviewedAt,
    reviewer: signoff.reviewer,
    scope: signoff.scope,
    notes: signoff.notes ?? '已完成人工语义核对。',
  };
}

for (const state of states) {
  const reviewedEvidence = getReviewedStateEvidence(state.id);
  const stateScope = `完成${state.nameZh}（${state.agency}）州别页的事实项语义复核与官方入口映射。
    `;

  for (const surface of ['overview', 'real-id'] as const) {
    const isEvidenceChecked = reviewedEvidence?.surfaces.includes(surface);
    const route =
      surface === 'overview' ? `/states/${state.id}/` : `/states/${state.id}/real-id/`;

    if (isEvidenceChecked && reviewedEvidence) {
      semanticReviews[route] = {
        status: 'evidence-checked',
        method: 'ai-assisted',
        reviewedAt: reviewedEvidence.reviewedAt,
        reviewer: reviewedEvidence.reviewer,
        scope: reviewedEvidence.scope,
        notes: reviewedEvidence.notes,
      };
    } else {
      ensureSourceMapped(
        route,
        stateScope,
        '当前只通过官方来源映射与结构一致性核验；逐页打开官方正文并完成显式声明核对后，才能升级为 AI 辅助证据核对。',
      );
    }
  }
}

for (const topic of topics) {
  ensureSourceMapped(
    `/topics/${topic.slug}/`,
    `跨州办事专题：${topic.title}。每条关键事实需对应官方来源与失败原因。`,
    '页面已通过事实项与登记来源的结构映射；尚无足够记录证明已逐页打开全部官方正文。',
  );
}

for (const route of COLLECTION_ROUTES) {
  ensureEvidenceChecked(route, '首页/索引结构页：核对搜索入口、目录路径和跳转逻辑。', 'Codex AI 辅助结构复核');
}

for (const route of DIRECTORY_ROUTES) {
  ensureSourceMapped(
    route,
    `50 州目录页：${route.replace('/directories/', '').replace('/', '')}。核对可跳转入口和官方来源分流。`,
    '目录已通过官方入口、主题匹配与成品 HTML 审计；尚无逐条正文比对记录的页面保持自动来源映射状态。',
  );
}
