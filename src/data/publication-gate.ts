import { HIGH_RISK_DIRECTORY_ROUTES, HIGH_RISK_TOPIC_SLUGS } from './editorial.ts';
import { semanticReviews } from './review-registry.ts';

export type PublicationGate = {
  route: string;
  requiresHumanApproval: boolean;
  humanApproved: boolean;
  indexable: boolean;
};

function normalizeRoute(route: string): string {
  const pathname = route.split(/[?#]/, 1)[0] || '/';
  if (pathname === '/') return pathname;
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export const HUMAN_REVIEW_REQUIRED_ROUTES = new Set([
  ...HIGH_RISK_DIRECTORY_ROUTES,
  ...[...HIGH_RISK_TOPIC_SLUGS].map((slug) => `/topics/${slug}/`),
]);

export function getPublicationGate(route: string): PublicationGate {
  const normalizedRoute = normalizeRoute(route);
  const requiresHumanApproval = HUMAN_REVIEW_REQUIRED_ROUTES.has(normalizedRoute);
  const review = semanticReviews[normalizedRoute];
  const humanApproved = review?.status === 'human-approved' && review.method === 'human';

  return {
    route: normalizedRoute,
    requiresHumanApproval,
    humanApproved,
    indexable: !requiresHumanApproval || humanApproved,
  };
}

export function isRouteIndexable(route: string): boolean {
  return getPublicationGate(route).indexable;
}

export function isPlausibleHumanReviewer(reviewer: string): boolean {
  const normalized = reviewer.trim();
  if (normalized.length < 2) return false;
  if (/^(?:dmv中文办事库)?编辑部$|^(?:editorial\s+)?team$/i.test(normalized)) return false;
  return !/(?:\bcodex\b|\bchatgpt\b|\bopenai\b|\bai\b|人工智能|自动(?:化)?核对|机器人)/i.test(normalized);
}

export function isValidReviewDate(reviewedAt: string, today = new Date().toISOString().slice(0, 10)): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt) || reviewedAt > today) return false;
  const parsed = new Date(`${reviewedAt}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === reviewedAt;
}
