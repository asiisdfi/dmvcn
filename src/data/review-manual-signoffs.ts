export type ReviewManualSignoff = {
  route: string;
  reviewer: string;
  reviewedAt: string;
  scope: string;
  notes?: string;
};

export const REVIEW_MANUAL_SIGNOFFS: ReviewManualSignoff[] = [
];
