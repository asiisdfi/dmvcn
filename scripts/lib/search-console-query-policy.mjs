export const TARGET_QUERY_CLASSIFICATIONS = new Set([
  'selected-title',
  'target-intent',
  'misrouted-intent',
]);

export const ALLOWED_QUERY_CLASSIFICATIONS = new Set([
  ...TARGET_QUERY_CLASSIFICATIONS,
  'overlap-review',
  'human-review',
  'human-review-legal-liability',
  'human-review-untriaged',
  'unreviewed-intent',
  'observe',
  'observe-generic-English',
  'observe-local',
  'observe-non-target',
  'observe-non-target-language',
]);

export function isHumanReviewClassification(classification) {
  return String(classification ?? '').startsWith('human-review');
}

export function isUnreviewedClassification(classification) {
  return String(classification ?? '').startsWith('unreviewed');
}

export function isTargetQuerySignal(signal) {
  return TARGET_QUERY_CLASSIFICATIONS.has(String(signal?.classification ?? ''));
}
