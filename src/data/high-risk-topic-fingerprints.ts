import type { TopicGuide } from './content.ts';

export type HighRiskTopicFingerprint = {
  route: string;
  currentFingerprint: string;
};

export const HIGH_RISK_TOPIC_FINGERPRINTS: HighRiskTopicFingerprint[] = [
  {
    route: '/topics/disabled-parking-placard-plates/',
    currentFingerprint: '825a5b44f9ddf420e1d2b94fc286eb61a5e85a84f7f506ff084d8a3ce9ee800b',
  },
  {
    route: '/topics/driver-license-suspension-reinstatement-sr22/',
    currentFingerprint: '3c6e740a4e47b8c11a1927de8e4b5ee9b484ed96fa59c851da3ea9ad3d34a9b2',
  },
  {
    route: '/topics/gift-inherited-vehicle-title-transfer/',
    currentFingerprint: '691925a488c8d6d99fbd0f11645404eefc4d85893772ca2f263a2d534f8292b5',
  },
  {
    route: '/topics/lost-vehicle-title-replacement-electronic-title-lien-sale/',
    currentFingerprint: '321294e487ed390c91f0b9e2535873c91b1f6ee1d489082b83a60fcd5ac0e67f',
  },
  {
    route: '/topics/name-change-chain/',
    currentFingerprint: '77adf1bb34ef55c29d3ad6fb4f4bf8299a3e7eb2b309d24578d48816e11fb7be',
  },
  {
    route: '/topics/non-citizen-license-id/',
    currentFingerprint: 'aeac1ae2907135a6ee98e09c19879e6d3360d6e3edd9d5ae744080f869740411',
  },
  {
    route: '/topics/older-driver-license-renewal-medical-review/',
    currentFingerprint: '794e6fad9ad41ed84427a7a0444f23405515700953679aefff58166b2b4072d9',
  },
  {
    route: '/topics/ssn-and-itin/',
    currentFingerprint: '548a166b0aebf6f9746b62e15abd14698207d80845cd235a1613890c84b08a3e',
  },
  {
    route: '/topics/standard-license-driving-privilege-no-lawful-status/',
    currentFingerprint: 'f61021702982da0c32ea3c417a5c29d68c415842d261763b652f0d3074a723d0',
  },
  {
    route: '/topics/student-temporary-resident-license-registration/',
    currentFingerprint: '700ce8486872b1d03359de44911307279cade5727b1c6491c1835047bf3a74e5',
  },
  {
    route: '/topics/tickets-tolls-insurance-lapse-registration-hold/',
    currentFingerprint: 'afd77218247c408371b8d9a883e42fd415717270b1ef89eaa05a07b68886cea9',
  },
  {
    route: '/topics/used-car-title-lien-salvage-odometer-check/',
    currentFingerprint: '34726acab0be4fb876341daf43e9388ed8381a547b79695975f0fba0d2756401',
  },
];

const fingerprintsByRoute = new Map(
  HIGH_RISK_TOPIC_FINGERPRINTS.map((entry) => [entry.route, entry]),
);

export function getHighRiskTopicFingerprint(
  route: string,
): HighRiskTopicFingerprint | null {
  return fingerprintsByRoute.get(route) ?? null;
}

export function getHighRiskTopicFingerprintPayload(topic: TopicGuide) {
  return {
    slug: topic.slug,
    title: topic.title,
    eyebrow: topic.eyebrow,
    description: topic.description,
    quickAnswer: topic.quickAnswer ?? null,
    whoNeedsIt: topic.whoNeedsIt,
    keyFacts: topic.keyFacts,
    checklist: topic.checklist,
    steps: topic.steps,
    faqs: topic.faqs,
    factChecks: topic.factChecks ?? [],
    relatedDirectory: topic.relatedDirectory ?? null,
    sources: topic.sources,
    relatedStateIds: topic.relatedStateIds,
  };
}
