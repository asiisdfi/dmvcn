import {
  HUMAN_REVIEW_REQUIRED_ROUTES,
  NON_SEARCH_LANDING_ROUTES,
  getPublicationGate,
  isRouteIndexable,
} from '../src/data/publication-gate.ts';

const errors = [];

for (const route of HUMAN_REVIEW_REQUIRED_ROUTES) {
  const gate = getPublicationGate(route);
  if (!gate.indexable || !isRouteIndexable(route)) {
    errors.push(`${route}: substantive content must not depend on a manual signoff to publish`);
  }
}

for (const route of NON_SEARCH_LANDING_ROUTES) {
  if (getPublicationGate(route).indexable || isRouteIndexable(route)) {
    errors.push(`${route}: utility page should remain outside search indexing`);
  }
}

for (const route of ['/', '/states/', '/topics/', '/directories/dmv-services/', '/directories/service-paths/']) {
  if (!isRouteIndexable(route)) errors.push(`${route}: public navigation page should be indexable`);
}

console.log('# Publication Policy Tests');
console.log('');
console.log(`Published content routes checked: ${HUMAN_REVIEW_REQUIRED_ROUTES.size}`);
console.log(`Hidden utility routes checked: ${NON_SEARCH_LANDING_ROUTES.size}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Publication policy tests passed.');
}
