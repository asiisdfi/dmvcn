import { topics } from './content.ts';
import {
  COSTS_TIMING_MODIFIED_DATE,
  COSTS_TIMING_REVIEW_DATE,
  DEADLINES_MODIFIED_DATE,
  DEADLINES_REVIEW_DATE,
  DOCUMENT_RULES_MODIFIED_DATE,
  DOCUMENT_RULES_REVIEW_DATE,
  HIGH_RISK_DIRECTORY_REVIEW_DATE,
  HIGH_RISK_DIRECTORY_ROUTES,
  HIGH_RISK_TOPIC_SLUGS,
  IDENTITY_SSN_MODIFIED_DATE,
  IDENTITY_SSN_REVIEW_DATE,
  SEARCH_CONSOLE_UPDATE_DATE,
} from './editorial.ts';
import { getHighRiskDirectoryFingerprint } from './high-risk-directory-fingerprints.ts';
import { getHighRiskTopicFingerprint } from './high-risk-topic-fingerprints.ts';
import { semanticReviews } from './review-registry.ts';

export type PublicationGate = {
  route: string;
  requiresHumanApproval: boolean;
  humanApprovalRecorded: boolean;
  humanApprovalDateCurrent: boolean;
  humanApprovalFingerprintCurrent: boolean;
  humanApprovalCurrent: boolean;
  humanApproved: boolean;
  indexable: boolean;
  approvalReviewedAt: string | null;
  approvalContentFingerprint: string | null;
  contentModifiedAt: string | null;
  contentReviewedAt: string | null;
  contentRevisionAt: string | null;
  contentFingerprint: string | null;
};

type HighRiskContentRevision = {
  modifiedAt: string;
  reviewedAt: string;
  contentFingerprint: string | null;
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

export const NON_SEARCH_LANDING_ROUTES = new Set([
  '/ai-policy/',
  '/corrections/',
  '/editorial-policy/',
  '/quality/',
  '/sources/',
  '/updates/',
]);

const HIGH_RISK_DIRECTORY_REVISIONS = new Map<string, HighRiskContentRevision>([
  [
    '/directories/costs-timing/',
    {
      modifiedAt: COSTS_TIMING_MODIFIED_DATE,
      reviewedAt: COSTS_TIMING_REVIEW_DATE,
      contentFingerprint:
        getHighRiskDirectoryFingerprint('/directories/costs-timing/')
          ?.currentFingerprint ?? null,
    },
  ],
  [
    '/directories/deadlines/',
    {
      modifiedAt: DEADLINES_MODIFIED_DATE,
      reviewedAt: DEADLINES_REVIEW_DATE,
      contentFingerprint:
        getHighRiskDirectoryFingerprint('/directories/deadlines/')
          ?.currentFingerprint ?? null,
    },
  ],
  [
    '/directories/document-rules/',
    {
      modifiedAt: DOCUMENT_RULES_MODIFIED_DATE,
      reviewedAt: DOCUMENT_RULES_REVIEW_DATE,
      contentFingerprint:
        getHighRiskDirectoryFingerprint('/directories/document-rules/')
          ?.currentFingerprint ?? null,
    },
  ],
  [
    '/directories/foreign-license/',
    {
      modifiedAt: HIGH_RISK_DIRECTORY_REVIEW_DATE,
      reviewedAt: HIGH_RISK_DIRECTORY_REVIEW_DATE,
      contentFingerprint:
        getHighRiskDirectoryFingerprint('/directories/foreign-license/')
          ?.currentFingerprint ?? null,
    },
  ],
  [
    '/directories/identity-ssn/',
    {
      modifiedAt: IDENTITY_SSN_MODIFIED_DATE,
      reviewedAt: IDENTITY_SSN_REVIEW_DATE,
      contentFingerprint:
        getHighRiskDirectoryFingerprint('/directories/identity-ssn/')
          ?.currentFingerprint ?? null,
    },
  ],
]);

const HIGH_RISK_TOPIC_REVISIONS = new Map<string, HighRiskContentRevision>(
  topics
    .filter((topic) => HIGH_RISK_TOPIC_SLUGS.has(topic.slug))
    .map((topic) => [
      `/topics/${topic.slug}/`,
      {
        modifiedAt: topic.modifiedAt,
        reviewedAt: topic.reviewedAt,
        contentFingerprint:
          getHighRiskTopicFingerprint(`/topics/${topic.slug}/`)
            ?.currentFingerprint ?? null,
      },
    ]),
);

export function getHighRiskContentRevision(
  route: string,
): HighRiskContentRevision | null {
  const normalizedRoute = normalizeRoute(route);
  return (
    HIGH_RISK_DIRECTORY_REVISIONS.get(normalizedRoute) ??
    HIGH_RISK_TOPIC_REVISIONS.get(normalizedRoute) ??
    null
  );
}

export function getPublicationGate(route: string): PublicationGate {
  const normalizedRoute = normalizeRoute(route);
  const requiresHumanApproval = HUMAN_REVIEW_REQUIRED_ROUTES.has(normalizedRoute);
  const review = semanticReviews[normalizedRoute];
  const revision = requiresHumanApproval
    ? getHighRiskContentRevision(normalizedRoute)
    : null;
  const humanApprovalRecorded =
    review?.status === 'human-approved' && review.method === 'human';
  const contentRevisionAt = revision
    ? [revision.modifiedAt, revision.reviewedAt].sort().at(-1) ?? null
    : null;
  const contentFingerprint = revision?.contentFingerprint ?? null;
  const approvalContentFingerprint =
    humanApprovalRecorded ? review?.contentFingerprint ?? null : null;
  const humanApprovalDateCurrent = Boolean(
    humanApprovalRecorded &&
      contentRevisionAt &&
      isValidReviewDate(review.reviewedAt) &&
      review.reviewedAt >= contentRevisionAt,
  );
  const humanApprovalFingerprintCurrent = Boolean(
    humanApprovalRecorded &&
      (
        !contentFingerprint ||
        approvalContentFingerprint === contentFingerprint
      ),
  );
  const humanApprovalCurrent =
    humanApprovalDateCurrent && humanApprovalFingerprintCurrent;
  const humanApproved = humanApprovalCurrent;

  return {
    route: normalizedRoute,
    requiresHumanApproval,
    humanApprovalRecorded,
    humanApprovalDateCurrent,
    humanApprovalFingerprintCurrent,
    humanApprovalCurrent,
    humanApproved,
    approvalReviewedAt: humanApprovalRecorded ? review.reviewedAt : null,
    approvalContentFingerprint,
    contentModifiedAt: revision?.modifiedAt ?? null,
    contentReviewedAt: revision?.reviewedAt ?? null,
    contentRevisionAt,
    contentFingerprint,
    indexable: !NON_SEARCH_LANDING_ROUTES.has(normalizedRoute),
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

function currentReviewCalendarDate(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

export function isValidReviewDate(
  reviewedAt: string,
  today = currentReviewCalendarDate(),
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewedAt) || reviewedAt > today) return false;
  const parsed = new Date(`${reviewedAt}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === reviewedAt;
}
