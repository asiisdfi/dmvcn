import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import {
  getHighRiskContentRevision,
  getPublicationGate,
} from '../src/data/publication-gate.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const execFileAsync = promisify(execFile);
const route = '/directories/costs-timing/';
const revision = getHighRiskContentRevision(route);

if (!revision) {
  console.error(`${route}: missing high-risk content revision fixture.`);
  process.exit(1);
}

const currentContentDate = [revision.modifiedAt, revision.reviewedAt]
  .sort()
  .at(-1);
const staleDate = new Date(
  Date.parse(`${currentContentDate}T00:00:00.000Z`) - 86_400_000,
)
  .toISOString()
  .slice(0, 10);
const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'dmvcn-signoff-test-'));

const changedDirectoryGate = getPublicationGate('/directories/deadlines/');
if (
  changedDirectoryGate.humanApprovalFingerprintCurrent ||
  changedDirectoryGate.indexable
) {
  console.error('A changed high-risk directory kept its old fingerprint approval.');
  process.exit(1);
}

const unchangedDirectoryGate = getPublicationGate('/directories/foreign-license/');
if (
  !unchangedDirectoryGate.humanApprovalFingerprintCurrent ||
  !unchangedDirectoryGate.indexable
) {
  console.error('An unchanged high-risk directory lost its matching fingerprint approval.');
  process.exit(1);
}

const changedTopicGate = getPublicationGate(
  '/topics/gift-inherited-vehicle-title-transfer/',
);
if (
  changedTopicGate.humanApprovalFingerprintCurrent ||
  changedTopicGate.indexable
) {
  console.error('A changed high-risk topic kept its old fingerprint approval.');
  process.exit(1);
}

const unchangedTopicGate = getPublicationGate(
  '/topics/older-driver-license-renewal-medical-review/',
);
if (
  !unchangedTopicGate.humanApprovalFingerprintCurrent ||
  !unchangedTopicGate.indexable
) {
  console.error('An unchanged high-risk topic lost its matching fingerprint approval.');
  process.exit(1);
}

try {
  const csvPath = path.join(tempRoot, 'stale-signoff.csv');
  await writeFile(
    csvPath,
    [
      'route,reviewer,reviewedAt,scope,notes',
      `${route},测试审核人,${staleDate},核对当前费用目录的金额期限材料和官方来源,这是一条必须被拒绝的过期测试签字`,
      '',
    ].join('\n'),
    'utf8',
  );

  let rejected = false;
  try {
    await execFileAsync(
      process.execPath,
      [
        '--experimental-strip-types',
        path.join(projectRoot, 'scripts/import-review-signoffs.mjs'),
      ],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          SIGNOFF_CSV: csvPath,
        },
      },
    );
  } catch (error) {
    const output = [
      error?.stdout,
      error?.stderr,
      error?.message,
    ]
      .filter(Boolean)
      .join('\n');
    rejected = output.includes(`早于当前内容版本 ${currentContentDate}`);
  }

  if (!rejected) {
    console.error('A stale human signoff was not rejected.');
    process.exitCode = 1;
  } else {
    console.log(
      `Stale signoff fixture was rejected before import: ${staleDate} < ${currentContentDate}.`,
    );
  }
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
