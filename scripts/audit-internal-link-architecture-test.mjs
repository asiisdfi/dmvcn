import { execFile } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const execFileAsync = promisify(execFile);
const sourceRoute = '/topics/real-id-basics/';
const targetRoute = '/topics/real-id-vs-standard-license/';
const reviewedAnchor =
  '比较 REAL ID、Enhanced ID 和普通驾照的办理用途';
const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'dmvcn-link-contract-'));

async function runAudit(testDist, reviewPath) {
  return execFileAsync(
    process.execPath,
    [
      '--experimental-strip-types',
      path.join(projectRoot, 'scripts/audit-internal-link-architecture.mjs'),
    ],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        INTERNAL_LINK_DIST_DIR: testDist,
        INTERNAL_LINK_ROUTING_REVIEW_PATH: reviewPath,
      },
    },
  );
}

try {
  const testDist = path.join(tempRoot, 'dist');
  const reviewPath = path.join(tempRoot, 'routing-reviews.json');
  await cp(distDir, testDist, { recursive: true });

  const sourceFile = path.join(
    testDist,
    'topics',
    'real-id-basics',
    'index.html',
  );
  const originalHtml = await readFile(sourceFile, 'utf8');
  if (!originalHtml.includes('</main>')) {
    throw new Error('Routing-link fixture source page has no main landmark.');
  }

  const review = {
    id: 'reviewed-anchor-contract-fixture',
    routes: [sourceRoute],
    targetRoutes: [targetRoute],
    expectedLinks: [
      {
        from: sourceRoute,
        to: targetRoute,
        anchorText: reviewedAnchor,
      },
    ],
    reviewedAt: '2026-07-29',
    reviewedThrough: '2026-07-29',
    plannedFor: '2026-07-29',
    implementedAt: '2026-07-29',
    evaluateAfter: '2026-08-12',
    changedRoutes: [sourceRoute],
    action: 'intent-links',
    summary: 'Verify that a reviewed routing anchor appears in main content.',
    implementationSummary:
      'Added the reviewed intent link to the source page main content.',
  };
  await writeFile(
    reviewPath,
    `${JSON.stringify([review], null, 2)}\n`,
    'utf8',
  );

  const reviewedLink =
    `<section><a href="${targetRoute}">${reviewedAnchor}</a></section>`;
  await writeFile(
    sourceFile,
    originalHtml.replace('</main>', `${reviewedLink}</main>`),
    'utf8',
  );
  await runAudit(testDist, reviewPath);

  await writeFile(
    sourceFile,
    originalHtml.replace(
      '</main>',
      `<section><a href="${targetRoute}">查看详情</a></section></main>`,
    ),
    'utf8',
  );
  let genericAnchorRejected = false;
  try {
    await runAudit(testDist, reviewPath);
  } catch (error) {
    genericAnchorRejected = String(
      error?.stdout ?? error?.stderr ?? error?.message ?? error,
    ).includes('must use the reviewed anchor text');
  }
  if (!genericAnchorRejected) {
    throw new Error(
      'Internal-link audit accepted a generic anchor in place of the reviewed text.',
    );
  }

  console.log(
    'Internal-link audit accepted the reviewed Chinese anchor and rejected a generic replacement.',
  );
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
