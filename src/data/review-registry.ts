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
