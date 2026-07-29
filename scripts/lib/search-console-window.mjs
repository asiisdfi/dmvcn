function positiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function calendarDate(value) {
  const text = String(value ?? '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return '';
  const timestamp = Date.parse(`${text}T00:00:00.000Z`);
  if (Number.isNaN(timestamp)) return '';
  return new Date(timestamp).toISOString().slice(0, 10) === text ? text : '';
}

export function windowDaysFromLabel(label) {
  const text = String(label ?? '');
  const dayMatch = text.match(/(\d+)\s*(?:天|days?)/i);
  if (dayMatch) return positiveInteger(dayMatch[1]);
  if (/3\s*(?:个月|months?)/i.test(text)) return 90;
  return null;
}

export function inclusiveDateSpan(dates = []) {
  const validDates = [...new Set(dates.map(calendarDate).filter(Boolean))].sort();
  if (!validDates.length) return null;
  return (
    Math.round(
      (
        Date.parse(`${validDates.at(-1)}T00:00:00.000Z`) -
        Date.parse(`${validDates[0]}T00:00:00.000Z`)
      ) / 86_400_000,
    ) + 1
  );
}

export function resolveImportedWindow({
  label,
  requestedDays,
  chartDates,
}) {
  const labelDays = windowDaysFromLabel(label);
  const chartSpanDays = inclusiveDateSpan(chartDates);
  const hasRequestedDays =
    requestedDays !== undefined &&
    requestedDays !== null &&
    requestedDays !== '';
  const overrideDays = hasRequestedDays
    ? positiveInteger(requestedDays)
    : null;

  if (hasRequestedDays && !overrideDays) {
    throw new Error('windowDays must be a positive integer.');
  }
  if (overrideDays && labelDays && overrideDays !== labelDays) {
    throw new Error(
      `windowDays=${overrideDays} conflicts with the ${labelDays}-day export filter label.`,
    );
  }

  const days = overrideDays ?? labelDays ?? chartSpanDays;
  if (!days) {
    throw new Error('Unable to determine the Search Console window length.');
  }

  let method = '';
  if (labelDays === days) method = 'filter-label';
  else if (chartSpanDays === days) method = 'chart-span';
  if (!method) {
    throw new Error(
      `windowDays=${days} cannot be verified from the export filter or chart date span.`,
    );
  }

  return {
    days,
    verification: {
      verified: true,
      method,
      labelDays,
      chartSpanDays,
      requestedDays: overrideDays,
    },
  };
}

export function evaluateSerializedWindow(window) {
  const days = positiveInteger(window?.days);
  const labelDays = windowDaysFromLabel(window?.label);
  const chartSpanDays = inclusiveDateSpan([
    window?.dataShownFrom,
    window?.dataShownThrough,
  ]);

  let method = '';
  if (days && labelDays === days) method = 'filter-label';
  else if (days && !labelDays && chartSpanDays === days) method = 'chart-span';

  return {
    verified: Boolean(method),
    method: method || 'unverified',
    days,
    labelDays,
    chartSpanDays,
  };
}
