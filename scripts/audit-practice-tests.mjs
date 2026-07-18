import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { practiceTests } from '../src/data/practice-tests.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const seenSlugs = new Set();
const seenStates = new Set();
const forbiddenLegacyPatterns = [
  /atlanta\.americachineselife\.com/i,
  /安大略|Ontario/i,
  /省警察/,
  /加拿大通用|美国通用版/,
];

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function daysBetween(start, end) {
  return Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000);
}

function isOfficialGovernmentUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname.endsWith('.gov') || url.hostname === 'georgia.gov');
  } catch {
    return false;
  }
}

for (const test of practiceTests) {
  const prefix = `practice:${test.slug}`;
  if (seenSlugs.has(test.slug)) errors.push(`${prefix}: duplicate slug`);
  if (seenStates.has(test.stateId)) errors.push(`${prefix}: duplicate stateId ${test.stateId}`);
  seenSlugs.add(test.slug);
  seenStates.add(test.stateId);

  for (const field of ['publishedAt', 'modifiedAt', 'reviewedAt', 'nextReviewAt']) {
    if (!isIsoDate(test[field])) errors.push(`${prefix}: ${field} must be a real ISO date`);
  }
  if (isIsoDate(test.publishedAt) && isIsoDate(test.modifiedAt) && test.modifiedAt < test.publishedAt) {
    errors.push(`${prefix}: modifiedAt precedes publishedAt`);
  }
  if (isIsoDate(test.modifiedAt) && isIsoDate(test.reviewedAt) && test.reviewedAt < test.modifiedAt) {
    errors.push(`${prefix}: reviewedAt precedes modifiedAt`);
  }
  if (isIsoDate(test.reviewedAt) && isIsoDate(test.nextReviewAt)) {
    const reviewWindow = daysBetween(test.reviewedAt, test.nextReviewAt);
    if (reviewWindow < 1 || reviewWindow > 120) {
      errors.push(`${prefix}: next review must be 1-120 days after the fact-check date`);
    }
  }

  const sourceIds = new Set();
  const sourceUrls = new Set();
  for (const source of test.sources) {
    if (sourceIds.has(source.id)) errors.push(`${prefix}: duplicate source id ${source.id}`);
    if (sourceUrls.has(source.url)) errors.push(`${prefix}: duplicate source URL ${source.url}`);
    sourceIds.add(source.id);
    sourceUrls.add(source.url);
    if (!isOfficialGovernmentUrl(source.url)) errors.push(`${prefix}: non-government source ${source.url}`);
    if (!source.label.trim() || !source.scope.trim()) errors.push(`${prefix}: source ${source.id} lacks label or scope`);
    if (!isIsoDate(source.checkedAt)) errors.push(`${prefix}: source ${source.id} lacks a real checkedAt date`);
    if (isIsoDate(source.checkedAt) && source.checkedAt > test.reviewedAt) {
      errors.push(`${prefix}: source ${source.id} was checked after page reviewedAt`);
    }
  }

  for (const sourceId of test.officialExam.sourceIds) {
    if (!sourceIds.has(sourceId)) errors.push(`${prefix}: official exam note references unknown source ${sourceId}`);
  }
  if (!/(?:15[^\d]*20|20[^\d]*15)/.test(test.officialExam.summary) || !/Road Rules/.test(test.officialExam.summary) || !/Road Signs/.test(test.officialExam.summary)) {
    errors.push(`${prefix}: official exam summary must state both sections and the current 15/20 threshold`);
  }
  if (!/不一致|差异|冲突/.test(test.officialExam.conflictNote)) {
    errors.push(`${prefix}: known official-language discrepancy is not disclosed`);
  }

  if (test.questions.length < 20) errors.push(`${prefix}: fewer than 20 questions`);
  const questionIds = new Set();
  const prompts = new Set();
  const usedSourceIds = new Set(test.officialExam.sourceIds);
  const categoryCounts = { 'road-rules': 0, 'road-signs': 0 };

  for (const question of test.questions) {
    const questionPrefix = `${prefix}:${question.id}`;
    if (questionIds.has(question.id)) errors.push(`${questionPrefix}: duplicate question id`);
    if (prompts.has(question.prompt)) errors.push(`${questionPrefix}: duplicate prompt`);
    questionIds.add(question.id);
    prompts.add(question.prompt);

    if (!(question.category in categoryCounts)) errors.push(`${questionPrefix}: invalid category ${question.category}`);
    else categoryCounts[question.category] += 1;
    if (question.prompt.trim().length < 16) errors.push(`${questionPrefix}: prompt is too thin`);
    if (!/[\u3400-\u9fff]/.test(question.prompt)) errors.push(`${questionPrefix}: prompt lacks Chinese explanation`);
    if (question.choices.length !== 4) errors.push(`${questionPrefix}: must have exactly four choices`);
    if (new Set(question.choices.map((choice) => choice.trim())).size !== 4) {
      errors.push(`${questionPrefix}: choices must be unique`);
    }
    if (!Number.isInteger(question.correctIndex) || question.correctIndex < 0 || question.correctIndex >= question.choices.length) {
      errors.push(`${questionPrefix}: correctIndex is out of range`);
    }
    if (question.explanation.trim().length < 45 || !/[\u3400-\u9fff]/.test(question.explanation)) {
      errors.push(`${questionPrefix}: explanation is too thin`);
    }
    if (question.commonTrap.trim().length < 12) errors.push(`${questionPrefix}: commonTrap is too thin`);
    if (!sourceIds.has(question.sourceId)) errors.push(`${questionPrefix}: unknown source ${question.sourceId}`);
    if (question.sourceSection.trim().length < 8) errors.push(`${questionPrefix}: source section is missing`);
    usedSourceIds.add(question.sourceId);

    const serialized = JSON.stringify(question);
    for (const pattern of forbiddenLegacyPatterns) {
      if (pattern.test(serialized)) errors.push(`${questionPrefix}: contains legacy or non-US question-bank wording`);
    }
  }

  if (categoryCounts['road-rules'] < 10) errors.push(`${prefix}: fewer than 10 Road Rules questions`);
  if (categoryCounts['road-signs'] < 10) errors.push(`${prefix}: fewer than 10 Road Signs questions`);

  for (const sourceId of sourceIds) {
    if (!usedSourceIds.has(sourceId)) errors.push(`${prefix}: registered source ${sourceId} is unused`);
  }

  try {
    await access(new URL(`../src/pages/practice-tests/${test.slug}.astro`, import.meta.url));
  } catch {
    errors.push(`${prefix}: route page src/pages/practice-tests/${test.slug}.astro is missing`);
  }
}

if (!practiceTests.length) errors.push('No practice tests are registered.');

console.log('# Practice Test Audit');
console.log('');
console.log(`Tests: ${practiceTests.length}`);
console.log(`Questions: ${practiceTests.reduce((total, test) => total + test.questions.length, 0)}`);
console.log(`Official sources: ${practiceTests.reduce((total, test) => total + test.sources.length, 0)}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('All practice-test source and structure checks passed.');
}
