import { createHash } from 'node:crypto';

export const REVIEW_CYCLE_DAYS = Object.freeze({
  high: 60,
  medium: 90,
  standard: 120,
  policy: 180,
});

export function currentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: process.env.REPORT_TIME_ZONE ?? 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function addDays(value, days) {
  if (!isCalendarDate(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function daysBetween(from, through) {
  if (!isCalendarDate(from) || !isCalendarDate(through)) return null;
  return Math.round(
    (
      Date.parse(`${through}T00:00:00.000Z`) -
      Date.parse(`${from}T00:00:00.000Z`)
    ) / 86_400_000,
  );
}

function fingerprintForSources(eeat, officialLinkAudit) {
  const pageSource = (eeat.pages ?? [])
    .map((page) => ({
      dates: page.dates,
      indexable: page.indexable,
      reviewMethod: page.reviewMethod,
      reviewStatus: page.reviewStatus,
      risk: page.risk,
      route: page.route,
      semanticReviewedAt: page.semanticReview?.reviewedAt ?? null,
    }))
    .sort((a, b) => a.route.localeCompare(b.route));
  return createHash('sha256')
    .update(
      JSON.stringify({
        officialAuditDate: officialLinkAudit.auditDate,
        officialInventoryFingerprint:
          officialLinkAudit.inventory?.fingerprint ?? null,
        pages: pageSource,
      }),
    )
    .digest('hex');
}

function emptyRiskSummary() {
  return {
    current: 0,
    dueWithin30Days: 0,
    earliestDue: null,
    missingReviewDate: 0,
    overdue: 0,
    pages: 0,
  };
}

export function deriveReviewCycleReport({ asOf, eeat, officialLinkAudit }) {
  const items = (eeat.pages ?? [])
    .map((page) => {
      const cycleDays = REVIEW_CYCLE_DAYS[page.risk];
      const visibleReviewedAt = page.dates?.reviewedAt ?? '';
      const evidenceReviewedAt = page.semanticReview?.reviewedAt ?? null;
      const evidenceDateRequired = page.reviewStatus !== 'not-required';
      const reviewDatesComplete =
        isCalendarDate(visibleReviewedAt) &&
        (!evidenceDateRequired || isCalendarDate(evidenceReviewedAt));
      const reviewAnchorDate = reviewDatesComplete
        ? [visibleReviewedAt, evidenceReviewedAt]
            .filter(isCalendarDate)
            .sort()[0]
        : '';
      const reviewDue = addDays(reviewAnchorDate, cycleDays);
      const daysUntilDue = reviewDue ? daysBetween(asOf, reviewDue) : null;
      const state =
        daysUntilDue === null
          ? 'missing-review-date'
          : daysUntilDue < 0
            ? 'overdue'
            : daysUntilDue <= 30
              ? 'due-within-30-days'
              : 'current';
      return {
        cycleDays: cycleDays ?? null,
        daysUntilDue,
        indexable: Boolean(page.indexable),
        overdueDays:
          daysUntilDue !== null && daysUntilDue < 0
            ? Math.abs(daysUntilDue)
            : 0,
        pageType: page.pageType,
        evidenceReviewedAt,
        reviewAnchorDate,
        reviewDue,
        reviewMethod: page.reviewMethod,
        reviewStatus: page.reviewStatus,
        risk: page.risk,
        route: page.route,
        state,
        visibleReviewedAt,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));

  const orderedQueue = [...items].sort(
    (a, b) =>
      (a.reviewDue ?? '0000-00-00').localeCompare(
        b.reviewDue ?? '0000-00-00',
      ) || a.route.localeCompare(b.route),
  );
  const overdue = orderedQueue.filter((item) => item.state === 'overdue');
  const dueWithin30Days = orderedQueue.filter(
    (item) => item.state === 'due-within-30-days',
  );
  const missingReviewDate = orderedQueue.filter(
    (item) => item.state === 'missing-review-date',
  );
  const validDueItems = orderedQueue.filter((item) => item.reviewDue);
  const officialAuditAgeDays = daysBetween(
    officialLinkAudit.auditDate,
    asOf,
  );
  const officialSourceCurrent =
    officialAuditAgeDays !== null &&
    officialAuditAgeDays >= 0 &&
    officialAuditAgeDays <= 30 &&
    officialLinkAudit.coverage?.fullCoverage === true &&
    officialLinkAudit.coverage?.dueRemaining === 0 &&
    officialLinkAudit.status?.monthlyGatePassed === true &&
    officialLinkAudit.status?.highRiskGatePassed === true;

  const byRisk = Object.fromEntries(
    Object.keys(REVIEW_CYCLE_DAYS).map((risk) => {
      const riskItems = items.filter((item) => item.risk === risk);
      const summary = emptyRiskSummary();
      summary.pages = riskItems.length;
      summary.current = riskItems.filter((item) => item.state === 'current').length;
      summary.dueWithin30Days = riskItems.filter(
        (item) => item.state === 'due-within-30-days',
      ).length;
      summary.overdue = riskItems.filter((item) => item.state === 'overdue').length;
      summary.missingReviewDate = riskItems.filter(
        (item) => item.state === 'missing-review-date',
      ).length;
      summary.earliestDue =
        riskItems
          .map((item) => item.reviewDue)
          .filter(Boolean)
          .sort()[0] ?? null;
      return [risk, summary];
    }),
  );

  const gatePassed =
    items.length === (eeat.summary?.pages ?? 0) &&
    overdue.length === 0 &&
    missingReviewDate.length === 0 &&
    items.every((item) => Number.isInteger(item.cycleDays)) &&
    officialSourceCurrent;

  return {
    schemaVersion: 1,
    generatedAt: `${asOf}T00:00:00.000Z`,
    asOf,
    policy: {
      cycleDays: REVIEW_CYCLE_DAYS,
      dueSoonWindowDays: 30,
      enforcement:
        '任何页面超过所属风险周期后，构建和发布门禁必须失败；完成真实事实复核并更新 reviewedAt 后才能恢复。',
      reviewAnchor:
        '办事页使用公开事实核对日期与证据复核日期中较早的一天计时；政策页使用公开事实核对日期。',
    },
    source: {
      eeatGeneratedAt: eeat.summary?.generatedAt ?? null,
      officialAuditAgeDays,
      officialAuditDate: officialLinkAudit.auditDate ?? null,
      officialInventoryFingerprint:
        officialLinkAudit.inventory?.fingerprint ?? null,
      officialUrls: officialLinkAudit.inventory?.urls ?? 0,
      pageFingerprint: fingerprintForSources(eeat, officialLinkAudit),
    },
    summary: {
      current: items.filter((item) => item.state === 'current').length,
      dueWithin30Days: dueWithin30Days.length,
      earliestDue: validDueItems[0]?.reviewDue ?? null,
      indexableOverdue: overdue.filter((item) => item.indexable).length,
      missingReviewDate: missingReviewDate.length,
      overdue: overdue.length,
      pages: items.length,
    },
    byRisk,
    queues: {
      overdue,
      dueWithin30Days,
      upcoming: validDueItems
        .filter((item) => item.state === 'current')
        .slice(0, 25),
    },
    items,
    status: {
      gatePassed,
      officialSourceCurrent,
      reviewDatesComplete: missingReviewDate.length === 0,
      reviewPeriodsCurrent: overdue.length === 0,
    },
  };
}
