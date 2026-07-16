export type SemanticReview = {
  status: 'evidence-checked' | 'human-approved';
  method: 'ai-assisted' | 'human';
  reviewedAt: string;
  reviewer: string;
  scope: string;
  notes: string;
};

/**
 * "evidence-checked" records an AI-assisted, sentence-level comparison against
 * the official sources shown on the page. It is not a human or professional
 * approval. "human-approved" may be used only after a real person completes
 * the same comparison and is accurately identified. Automated audits never
 * create or upgrade entries in this registry.
 */
export const semanticReviews: Record<string, SemanticReview> = {
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
};
