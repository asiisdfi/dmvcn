import {
  copyFile,
  cp,
  mkdtemp,
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const execFileAsync = promisify(execFile);
const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'dmvcn-intent-audit-'));
const tempDist = path.join(tempRoot, 'dist');
const tempReports = path.join(tempRoot, 'reports');
const sourceRoute = '/topics/disabled-parking-placard-plates/';
const targetRoute = '/topics/dmv-scam-text-fake-ticket-toll-real-id-phishing/';

function routeFile(root, route) {
  return path.join(root, route.slice(1), 'index.html');
}

async function runAudit() {
  try {
    const result = await execFileAsync(
      process.execPath,
      [
        '--experimental-strip-types',
        path.join(projectRoot, 'scripts/audit-search-intent-overlap.mjs'),
      ],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          SEARCH_INTENT_DIST_DIR: tempDist,
          SEARCH_INTENT_OUTPUT_DIR: tempReports,
        },
      },
    );
    return {
      rejected: false,
      output: `${result.stdout}\n${result.stderr}`,
    };
  } catch (error) {
    return {
      rejected: true,
      output: `${error.stdout ?? ''}\n${error.stderr ?? ''}`,
    };
  }
}

function checkRejection(result, expectedMessages, description, failures) {
  const missing = expectedMessages.filter(
    (message) => !result.output.includes(message),
  );
  if (!result.rejected || missing.length) {
    failures.push(
      `${description}: rejected=${result.rejected}; missing=${missing.join(' | ')}`,
    );
  }
}

try {
  await cp(path.join(projectRoot, 'dist'), tempDist, { recursive: true });
  await mkdir(tempReports, { recursive: true });
  await copyFile(
    routeFile(tempDist, sourceRoute),
    routeFile(tempDist, targetRoute),
  );

  const failures = [];
  const sortedRoutes = [sourceRoute, targetRoute].sort();
  const duplicateResult = await runAudit();
  checkRejection(
    duplicateResult,
    [
      `Exact normalized main-content duplicate: ${sortedRoutes.join(', ')}.`,
      `${sortedRoutes.join(' <> ')}: normalized main-content similarity 1 reaches the 0.45 near-duplicate limit.`,
      `${sortedRoutes.join(' <> ')}: similarity 1 requires an explicit search-intent boundary.`,
    ],
    'Copied-content fixture',
    failures,
  );

  await writeFile(
    routeFile(tempDist, targetRoute),
    '<!doctype html><html lang="zh-CN"><head><title>薄页测试</title></head><body><main><h1>薄页</h1><p>信息不足</p></main></body></html>\n',
  );
  const thinResult = await runAudit();
  checkRejection(
    thinResult,
    [
      `${targetRoute}: topic main content has`,
      'minimum is 2000.',
    ],
    'Thin-content fixture',
    failures,
  );

  if (failures.length) {
    failures.forEach((failure) => console.error(failure));
    console.error(duplicateResult.output.trim());
    console.error(thinResult.output.trim());
    process.exitCode = 1;
  } else {
    console.log('Search intent audit rejected copied and thin fixtures.');
  }
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
