import { federalSources, states, topics, uniqueSources } from '../src/data/content.ts';

const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function assertUsefulText(value, label, minimum = 1) {
  assert(typeof value === 'string' && value.trim().length >= minimum, `${label} is missing or too short`);
}

function assertDate(value, label) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(value ?? ''), `${label} must be YYYY-MM-DD`);
}

function assertUrl(value, label) {
  assert(/^https?:\/\//.test(value ?? ''), `${label} is not http(s): ${value ?? ''}`);
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) errors.push(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

function assertStringList(values, label, minimum, minimumItemLength = 8) {
  assert(Array.isArray(values) && values.length >= minimum, `${label} needs at least ${minimum} items`);
  for (const [index, value] of (values ?? []).entries()) {
    assertUsefulText(value, `${label}[${index}]`, minimumItemLength);
  }
}

const stateIds = new Set(states.map((state) => state.id));
const topicSlugs = new Set(topics.map((topic) => topic.slug));

assertUnique([...stateIds], 'state id');
assertUnique([...topicSlugs], 'topic slug');

for (const state of states) {
  const label = state.id || 'unknown-state';

  assertUsefulText(state.id, `${label}: id`);
  assertUsefulText(state.abbr, `${label}: abbr`, 2);
  assertUsefulText(state.nameEn, `${label}: nameEn`, 2);
  assertUsefulText(state.nameZh, `${label}: nameZh`, 2);
  assertUsefulText(state.agency, `${label}: agency`, 4);
  assertUrl(state.agencyUrl, `${label}: agencyUrl`);
  assertDate(state.reviewedAt, `${label}: reviewedAt`);
  assertUsefulText(state.summary, `${label}: summary`, 35);
  assertUsefulText(state.realIdSummary, `${label}: realIdSummary`, 35);
  assertUsefulText(state.licenseSummary, `${label}: licenseSummary`, 35);
  assertUsefulText(state.appointmentNote, `${label}: appointmentNote`, 35);

  assertStringList(state.documentHighlights, `${label}: documentHighlights`, 4);
  assertStringList(state.commonMistakes, `${label}: commonMistakes`, 3);
  assertStringList(state.recommendedSteps, `${label}: recommendedSteps`, 3);
  assertStringList(state.editorNotes, `${label}: editorNotes`, 2);
  assertStringList(state.relatedTopicSlugs, `${label}: relatedTopicSlugs`, 3, 2);

  assert(state.actionLinks.length >= 3, `${label}: actionLinks needs at least 3 official entries`);
  assert(state.sources.length >= 3, `${label}: sources needs at least 3 official sources`);
  assertUnique(state.actionLinks.map((link) => link.url), `${label} action URL`);

  for (const [index, link] of state.actionLinks.entries()) {
    assertUsefulText(link.label, `${label}: actionLinks[${index}].label`, 3);
    assertUsefulText(link.description, `${label}: actionLinks[${index}].description`, 4);
    assertUrl(link.url, `${label}: actionLinks[${index}].url`);
  }
  for (const [index, source] of state.sources.entries()) {
    assertUsefulText(source.label, `${label}: sources[${index}].label`, 3);
    assertUrl(source.url, `${label}: sources[${index}].url`);
  }
  for (const slug of state.relatedTopicSlugs) {
    assert(topicSlugs.has(slug), `${label}: related topic does not exist: ${slug}`);
  }
}

for (const topic of topics) {
  const label = topic.slug || 'unknown-topic';
  const officialSources = uniqueSources(topic.sources);
  const sourceUrls = new Set(officialSources.map((source) => source.url));

  assertUsefulText(topic.slug, `${label}: slug`);
  assertUsefulText(topic.title, `${label}: title`, 8);
  assertUsefulText(topic.eyebrow, `${label}: eyebrow`, 2);
  assertDate(topic.reviewedAt, `${label}: reviewedAt`);
  assertUsefulText(topic.description, `${label}: description`, 35);

  assertStringList(topic.whoNeedsIt, `${label}: whoNeedsIt`, 2);
  assertStringList(topic.keyFacts, `${label}: keyFacts`, 3);
  assertStringList(topic.checklist, `${label}: checklist`, 3);
  assertStringList(topic.steps, `${label}: steps`, 3);
  assertStringList(topic.editorNotes, `${label}: editorNotes`, 2);
  assertStringList(topic.relatedStateIds, `${label}: relatedStateIds`, 3, 2);
  assert(topic.faqs.length >= 2, `${label}: faqs needs at least 2 items`);
  assert(officialSources.length >= 2, `${label}: sources needs at least 2 unique official sources`);

  for (const [index, faq] of topic.faqs.entries()) {
    assertUsefulText(faq.question, `${label}: faqs[${index}].question`, 6);
    assertUsefulText(faq.answer, `${label}: faqs[${index}].answer`, 20);
  }
  for (const [index, source] of officialSources.entries()) {
    assertUsefulText(source.label, `${label}: sources[${index}].label`, 3);
    assertUrl(source.url, `${label}: sources[${index}].url`);
  }
  for (const id of topic.relatedStateIds) {
    assert(stateIds.has(id), `${label}: related state does not exist: ${id}`);
  }

  for (const [index, factCheck] of (topic.factChecks ?? []).entries()) {
    assertUsefulText(factCheck.claim, `${label}: factChecks[${index}].claim`, 25);
    assert(
      Array.isArray(factCheck.sourceUrls) && factCheck.sourceUrls.length >= 1,
      `${label}: factChecks[${index}] needs at least 1 source URL`,
    );
    assertUnique(factCheck.sourceUrls, `${label} factChecks[${index}] source URL`);
    for (const url of factCheck.sourceUrls) {
      assertUrl(url, `${label}: factChecks[${index}] source URL`);
      assert(sourceUrls.has(url), `${label}: factChecks[${index}] source is missing from topic.sources: ${url}`);
    }
  }
}

console.log('# Content Quality Audit');
console.log('');
console.log(`States: ${states.length}`);
console.log(`Topics: ${topics.length}`);
console.log(`Federal sources: ${federalSources.length}`);
console.log(`Fact-checked topics: ${topics.filter((topic) => topic.factChecks?.length).length}`);
console.log(`Fact checks: ${topics.reduce((total, topic) => total + (topic.factChecks?.length ?? 0), 0)}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('All required content quality checks passed.');
}
