export type HighRiskDirectoryFingerprint = {
  route: string;
  rowClass: string;
  claimCount: number;
  currentFingerprint: string;
};

export const HIGH_RISK_DIRECTORY_FINGERPRINTS: HighRiskDirectoryFingerprint[] = [
  {
    route: '/directories/costs-timing/',
    rowClass: 'cost-timing-row',
    claimCount: 172,
    currentFingerprint: '78d9ebed6895a9fedea0fdf20922905aeed27bda5da1d64252bdb8221ce65a84',
  },
  {
    route: '/directories/deadlines/',
    rowClass: 'deadline-row',
    claimCount: 126,
    currentFingerprint: '16dd88469e8da47918da3d94e09b71a0e8a3975adb36040a19729fdf7ef262d7',
  },
  {
    route: '/directories/document-rules/',
    rowClass: 'document-rule-row',
    claimCount: 196,
    currentFingerprint: '4391ec8044dd55beb3ea01907d6b045e32a97ae718402306d514034272498b78',
  },
  {
    route: '/directories/foreign-license/',
    rowClass: 'foreign-license-row',
    claimCount: 144,
    currentFingerprint: 'a67db58ca93077dfbdb702d265269883d1c39da3cf78111abeccf0187349a4a8',
  },
  {
    route: '/directories/identity-ssn/',
    rowClass: 'identity-ssn-row',
    claimCount: 186,
    currentFingerprint: 'b3d1d7462f8c5ed2241a95581c1543def77ad4f5787b3c7db7da37a726c6de93',
  },
];

const fingerprintsByRoute = new Map(
  HIGH_RISK_DIRECTORY_FINGERPRINTS.map((entry) => [entry.route, entry]),
);

export function getHighRiskDirectoryFingerprint(
  route: string,
): HighRiskDirectoryFingerprint | null {
  return fingerprintsByRoute.get(route) ?? null;
}
