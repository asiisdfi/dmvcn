export const SEARCH_CONSOLE_EDITORIAL_TARGETS = Object.freeze({
  weekly: Object.freeze({ min: 2, max: 3 }),
  monthly: Object.freeze({ min: 8, max: 12 }),
});

export function countsTowardEditorialCadence(entry) {
  return entry?.countsTowardCadence !== false;
}
