import {
  deriveReviewCycleReport,
} from './lib/review-cycles.mjs';
import {
  VOLATILE_REVIEW_ROUTES,
} from './lib/volatile-review-policy.mjs';

const highRiskRoutes = new Set([
  '/directories/costs-timing/',
  '/directories/deadlines/',
  '/directories/document-rules/',
  '/directories/foreign-license/',
  '/directories/identity-ssn/',
  '/topics/older-driver-license-renewal-medical-review/',
  '/topics/tickets-tolls-insurance-lapse-registration-hold/',
]);

function pageFor(entry, reviewedAt = '2026-07-21') {
  const highRisk = highRiskRoutes.has(entry.route);
  return {
    route: entry.route,
    pageType: entry.route.startsWith('/directories/') ? 'directory' : 'topic',
    risk: highRisk ? 'high' : 'medium',
    pass: true,
    indexable: true,
    reviewStatus: highRisk ? 'human-approved' : 'ai-assisted',
    reviewMethod: highRisk ? 'human' : 'ai-assisted',
    semanticReview: {
      status: highRisk ? 'human-approved' : 'evidence-checked',
      reviewedAt,
    },
    dates: {
      reviewedAt,
    },
    signals: {
      sourceCount: 1,
    },
  };
}

function inventory(reviewedAt = '2026-07-21') {
  const pages = VOLATILE_REVIEW_ROUTES.map((entry) =>
    pageFor(entry, reviewedAt));
  return {
    summary: {
      generatedAt: '2026-07-29T00:00:00.000Z',
      pages: pages.length,
    },
    pages,
  };
}

function officialLinks(asOf) {
  return {
    auditDate: asOf,
    coverage: {
      fullCoverage: true,
      dueRemaining: 0,
    },
    highRiskCoverage: {
      gatePassed: true,
    },
    inventory: {
      fingerprint: 'synthetic',
      urls: 12,
    },
    status: {
      monthlyGatePassed: true,
      highRiskGatePassed: true,
    },
  };
}

const failures = [];
function check(condition, message) {
  if (!condition) failures.push(message);
}

const dueToday = deriveReviewCycleReport({
  asOf: '2026-08-20',
  eeat: inventory(),
  officialLinkAudit: officialLinks('2026-08-20'),
});
check(dueToday.status.gatePassed, 'Reviews due today should still pass.');
check(
  dueToday.summary.monthlyVolatileDueWithin30Days ===
    VOLATILE_REVIEW_ROUTES.length,
  'All synthetic volatile reviews should be due within 30 days.',
);
check(
  dueToday.summary.earliestDue === '2026-08-20',
  'The 30-day review due date is incorrect.',
);

const overdue = deriveReviewCycleReport({
  asOf: '2026-08-21',
  eeat: inventory(),
  officialLinkAudit: officialLinks('2026-08-21'),
});
check(!overdue.status.gatePassed, 'Overdue volatile reviews must fail.');
check(
  overdue.summary.monthlyVolatileOverdue === VOLATILE_REVIEW_ROUTES.length,
  'Every stale volatile route should enter the overdue queue.',
);

const oneSidedDates = inventory();
for (const page of oneSidedDates.pages) {
  page.semanticReview.reviewedAt = '2026-08-01';
}
const oneSided = deriveReviewCycleReport({
  asOf: '2026-08-21',
  eeat: oneSidedDates,
  officialLinkAudit: officialLinks('2026-08-21'),
});
check(
  !oneSided.status.gatePassed,
  'Updating only the hidden evidence date must not extend the review cycle.',
);

const refreshed = deriveReviewCycleReport({
  asOf: '2026-08-21',
  eeat: inventory('2026-08-01'),
  officialLinkAudit: officialLinks('2026-08-21'),
});
check(refreshed.status.gatePassed, 'Matching visible and evidence dates should refresh the cycle.');
check(
  refreshed.summary.earliestDue === '2026-08-31',
  'Refreshed volatile reviews should receive a new 30-day deadline.',
);

const missingRouteInventory = inventory();
missingRouteInventory.pages.pop();
missingRouteInventory.summary.pages -= 1;
const missingRoute = deriveReviewCycleReport({
  asOf: '2026-07-29',
  eeat: missingRouteInventory,
  officialLinkAudit: officialLinks('2026-07-29'),
});
check(
  !missingRoute.status.gatePassed && missingRoute.errors.length > 0,
  'A missing volatile-review owner route must fail the policy gate.',
);

const staleApprovalInventory = inventory();
const staleApprovalPage = staleApprovalInventory.pages.find(
  (page) => page.route === '/directories/costs-timing/',
);
staleApprovalPage.indexable = false;
staleApprovalPage.pass = false;
staleApprovalPage.reviewStatus = 'human-approval-stale';
const staleApprovalHeld = deriveReviewCycleReport({
  asOf: '2026-07-29',
  eeat: staleApprovalInventory,
  officialLinkAudit: officialLinks('2026-07-29'),
});
check(
  staleApprovalHeld.status.gatePassed,
  'A stale human approval held noindex should not block unrelated publication.',
);

staleApprovalPage.indexable = true;
const staleApprovalLeaked = deriveReviewCycleReport({
  asOf: '2026-07-29',
  eeat: staleApprovalInventory,
  officialLinkAudit: officialLinks('2026-07-29'),
});
check(
  !staleApprovalLeaked.status.gatePassed,
  'A stale human approval must fail when its page remains indexable.',
);

if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Monthly volatile-review fixtures passed for ${VOLATILE_REVIEW_ROUTES.length} routes.`,
);
