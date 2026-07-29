import { createHash } from 'node:crypto';
import { topics } from '../src/data/content.ts';
import { HIGH_RISK_TOPIC_SLUGS } from '../src/data/editorial.ts';
import {
  HIGH_RISK_TOPIC_FINGERPRINTS,
  getHighRiskTopicFingerprintPayload,
} from '../src/data/high-risk-topic-fingerprints.ts';

const errors = [];
const topicsBySlug = new Map(topics.map((topic) => [topic.slug, topic]));
const seenRoutes = new Set();

function routeForSlug(slug) {
  return `/topics/${slug}/`;
}

function fingerprintTopic(topic) {
  return createHash('sha256')
    .update(JSON.stringify(getHighRiskTopicFingerprintPayload(topic)))
    .digest('hex');
}

for (const entry of HIGH_RISK_TOPIC_FINGERPRINTS) {
  if (seenRoutes.has(entry.route)) {
    errors.push(`${entry.route}: duplicate topic fingerprint registry entry`);
  }
  seenRoutes.add(entry.route);

  if (!/^\/topics\/[^/]+\/$/.test(entry.route)) {
    errors.push(`${entry.route}: invalid high-risk topic route`);
    continue;
  }
  if (!/^[a-f0-9]{64}$/.test(entry.currentFingerprint)) {
    errors.push(`${entry.route}: currentFingerprint must be a SHA-256 digest`);
  }

  const slug = entry.route.slice('/topics/'.length, -1);
  if (!HIGH_RISK_TOPIC_SLUGS.has(slug)) {
    errors.push(`${entry.route}: registry entry is not a declared high-risk topic`);
    continue;
  }

  const topic = topicsBySlug.get(slug);
  if (!topic) {
    errors.push(`${entry.route}: registered topic is missing from content data`);
    continue;
  }

  const actualFingerprint = fingerprintTopic(topic);
  if (actualFingerprint !== entry.currentFingerprint) {
    errors.push(
      `${entry.route}: content fingerprint changed; register the new digest only after reviewing the substantive diff (${entry.currentFingerprint} -> ${actualFingerprint})`,
    );
  }
}

for (const slug of HIGH_RISK_TOPIC_SLUGS) {
  const route = routeForSlug(slug);
  if (!seenRoutes.has(route)) {
    errors.push(`${route}: high-risk topic is missing a fingerprint registry entry`);
  }
  if (!topicsBySlug.has(slug)) {
    errors.push(`${route}: high-risk topic slug is missing from content data`);
  }
}

console.log('# High-risk Topic Fingerprint Audit');
console.log('');
console.log(`Declared high-risk topics: ${HIGH_RISK_TOPIC_SLUGS.size}`);
console.log(`Registered fingerprints: ${HIGH_RISK_TOPIC_FINGERPRINTS.length}`);
console.log(`Errors: ${errors.length}`);
console.log('');

if (errors.length) {
  for (const error of errors) console.log(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Every high-risk topic matches its registered substantive-content fingerprint.');
}
