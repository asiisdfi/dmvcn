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
    currentFingerprint: '5a7c27951f1c74d602e86cb5857746f4c984ba431150161ff4604ab40e3c8507',
  },
  {
    route: '/directories/deadlines/',
    rowClass: 'deadline-row',
    claimCount: 126,
    currentFingerprint: '4a4086f3c12f1234b7c13a6cb0062664ab64ee4af3a47fba5506369711f09512',
  },
  {
    route: '/directories/document-rules/',
    rowClass: 'document-rule-row',
    claimCount: 196,
    currentFingerprint: 'f30fb5095fdb3093ef33eb52bd3fcef69c87d46f091de1d1df750dfc6f0c0d86',
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
    claimCount: 184,
    currentFingerprint: '56ea7508a602303250d33d45bda7a8324c41cb4358f0ea1f197ccc6235dfe815',
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
