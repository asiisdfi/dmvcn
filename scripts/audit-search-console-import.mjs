import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { strToU8, zipSync } from 'fflate';
import {
  importSearchConsoleExport,
  parseCsv,
} from './lib/search-console-import.mjs';
import {
  isHumanReviewClassification,
  isRoutingReviewQuerySignal,
  isTargetQuerySignal,
  isUnreviewedClassification,
} from './lib/search-console-query-policy.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const execFileAsync = promisify(execFile);
const errors = [];

function currentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(date, offset) {
  return new Date(Date.parse(`${date}T00:00:00.000Z`) + offset * 86_400_000)
    .toISOString()
    .slice(0, 10);
}

function check(condition, message) {
  if (!condition) errors.push(message);
}

async function writeZip(target, files) {
  const entries = Object.fromEntries(
    Object.entries(files).map(([name, text]) => [name, strToU8(text)]),
  );
  await writeFile(target, Buffer.from(zipSync(entries)));
}

function pageExport(route, queryRows) {
  return {
    '查询数.csv': `热门查询,点击次数,展示,点击率,排名\n${queryRows.join('\n')}\n`,
    '过滤器.csv': `过滤器,值\n搜索类型,网络\n日期,过去 28 天\n网页,https://dmvcn.com${route}\n`,
  };
}

const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'dmvcn-sc-import-'));
try {
  const observedAt = currentCalendarDate();
  const inputDir = path.join(tempRoot, 'input');
  const outputRoot = path.join(tempRoot, 'output');
  await mkdir(inputDir, { recursive: true });

  const globalZip = path.join(
    inputDir,
    `dmvcn.com-Performance-on-Search-${observedAt}.zip`,
  );
  const globalFiles = {
    '图表.csv':
      '日期,点击次数,展示,点击率,排名\n' +
      `${addDays(observedAt, -4)},1,100,1%,10\n` +
      `${addDays(observedAt, -3)},2,200,1%,20\n` +
      `${addDays(observedAt, -2)},0,0,,\n`,
    '查询数.csv':
      '热门查询,点击次数,展示,点击率,排名\n' +
      '示例中文搜索词,1,5,20%,12\n' +
      'synthetic motor vehicle query,0,20,0%,9\n',
    '网页.csv':
      '排名靠前的网页,点击次数,展示,点击率,排名\n' +
      'https://dmvcn.com/states/massachusetts/real-id/,2,150,1.33%,15\n' +
      'https://dmvcn.com/topics/proof-of-residency/,1,100,1%,20\n' +
      'https://dmvcn.com/topics/older-driver-license-renewal-medical-review/,0,1,0%,25\n' +
      'https://dmvcn.com/directories/new-residents/,0,48,0%,22\n' +
      'https://dmvcn.com/topics/real-id-basics/,0,1,0%,18\n',
    '国家_地区.csv':
      '国家/地区,点击次数,展示,点击率,排名\n' +
      '美国,3,250,1.2%,15\n' +
      '越南,0,50,0%,25\n',
    '设备.csv':
      '设备,点击次数,展示,点击率,排名\n' +
      '移动设备,2,100,2%,12\n' +
      '桌面,1,200,0.5%,19\n' +
      '平板电脑,0,0,,\n',
    '过滤器.csv': '过滤器,值\n搜索类型,网络\n日期,过去 28 天\n',
  };
  await writeZip(globalZip, globalFiles);

  const massachusettsZip = path.join(inputDir, 'massachusetts.zip');
  const proofZip = path.join(inputDir, 'proof.zip');
  const medicalZip = path.join(inputDir, 'medical.zip');
  const newResidentsZip = path.join(inputDir, 'new-residents.zip');
  const realIdBasicsZip = path.join(inputDir, 'real-id-basics.zip');
  await writeZip(
    massachusettsZip,
    pageExport('/states/massachusetts/real-id/', [
      '示例中文办证词,0,2,0%,8',
      'synthetic state id query,0,3,0%,25',
    ]),
  );
  await writeZip(
    proofZip,
    pageExport('/topics/proof-of-residency/', [
      '示例地址材料词,0,6,0%,18',
    ]),
  );
  await writeZip(
    medicalZip,
    pageExport('/topics/older-driver-license-renewal-medical-review/', [
      '示例精神健康办证词,0,1,0%,12',
    ]),
  );
  await writeZip(
    newResidentsZip,
    pageExport('/directories/new-residents/', [
      '示例误落页面词,0,7,0%,9',
    ]),
  );
  await writeZip(
    realIdBasicsZip,
    pageExport('/topics/real-id-basics/', [
      '示例低样本目标词,0,1,0%,18',
    ]),
  );

  const manifestPath = path.join(inputDir, 'pages.csv');
  await writeFile(
    manifestPath,
    'route,export\n' +
      '/states/massachusetts/real-id/,massachusetts.zip\n' +
      '/topics/proof-of-residency/,proof.zip\n' +
      '/topics/older-driver-license-renewal-medical-review/,medical.zip\n' +
      '/directories/new-residents/,new-residents.zip\n' +
      '/topics/real-id-basics/,real-id-basics.zip\n',
  );
  const classificationPath = path.join(inputDir, 'classifications.csv');
  await writeFile(
    classificationPath,
    'route,query,classification\n' +
      '/topics/proof-of-residency/,示例地址材料词,selected-title\n' +
      '/directories/new-residents/,示例误落页面词,misrouted-intent\n' +
      '/topics/real-id-basics/,示例低样本目标词,selected-title\n',
  );

  const summary = await importSearchConsoleExport({
    projectRoot,
    outputRoot,
    globalExportPath: globalZip,
    pageManifestPath: manifestPath,
    classificationCsvPath: classificationPath,
  });

  check(summary.observedAt === observedAt, 'Export date was not inferred.');
  check(summary.window.days === 28, '28-day filter was not recognized.');
  check(summary.propertyTotals.clicks === 3, 'Click total is incorrect.');
  check(summary.propertyTotals.impressions === 300, 'Impression total is incorrect.');
  check(summary.propertyTotals.ctr === 1, 'CTR total is incorrect.');
  check(summary.propertyTotals.position === 16.7, 'Weighted position is incorrect.');
  check(summary.pageExports === 5, 'Page export count is incorrect.');
  check(summary.refreshedPageSignals === 6, 'Page signal count is incorrect.');
  check(summary.classifications.target === 2, 'Reviewed target count is incorrect.');
  check(summary.classifications.routingReview === 1, 'Routing-review count is incorrect.');
  check(summary.classifications.unreviewed === 1, 'Unreviewed count is incorrect.');
  check(summary.classifications.humanReview === 1, 'Human-review count is incorrect.');
  check(summary.classifications.observed === 1, 'Observed count is incorrect.');

  const segmentPath = path.join(
    outputRoot,
    'reports/private/search-console-segments.json',
  );
  const signalsPath = path.join(
    outputRoot,
    'reports/private/search-console-page-query-signals.csv',
  );
  const segments = JSON.parse(await readFile(segmentPath, 'utf8'));
  const signals = parseCsv(await readFile(signalsPath, 'utf8')).rows;
  check(
    segments.countries.reduce((sum, item) => sum + item.impressions, 0) === 300,
    'Country totals were not preserved.',
  );
  check(
    segments.devices.reduce((sum, item) => sum + item.impressions, 0) === 300,
    'Device totals were not preserved.',
  );

  const unreviewed = signals.find(
    (signal) => signal.classification === 'unreviewed-intent',
  );
  const humanReview = signals.find((signal) =>
    isHumanReviewClassification(signal.classification),
  );
  const target = signals.find((signal) =>
    isTargetQuerySignal(signal),
  );
  const routingReview = signals.find((signal) =>
    isRoutingReviewQuerySignal(signal),
  );
  check(Boolean(unreviewed), 'Unreviewed Chinese signal was not quarantined.');
  check(Boolean(humanReview), 'High-risk Chinese signal was not quarantined.');
  check(Boolean(target), 'Reviewed target signal was not retained.');
  check(Boolean(routingReview), 'Misrouted signal was not retained.');
  check(
    !isTargetQuerySignal(unreviewed),
    'Unreviewed signal can incorrectly trigger a content action.',
  );
  check(
    !isTargetQuerySignal(humanReview),
    'Human-review signal can incorrectly trigger a content action.',
  );
  check(
    !isTargetQuerySignal(routingReview),
    'Misrouted signal can incorrectly trigger a content action.',
  );
  check(
    isUnreviewedClassification(unreviewed?.classification),
    'Unreviewed classification policy is inconsistent.',
  );

  await importSearchConsoleExport({
    projectRoot,
    outputRoot,
    globalExportPath: globalZip,
    pageManifestPath: manifestPath,
    classificationCsvPath: classificationPath,
  });
  const refreshedSignals = parseCsv(await readFile(signalsPath, 'utf8')).rows;
  check(
    refreshedSignals.length === 6,
    'Refreshing page exports duplicated existing page-query signals.',
  );

  const actionLogPath = path.join(inputDir, 'actions.json');
  const routingReviewLogPath = path.join(inputDir, 'routing-reviews.json');
  const planOutputDir = path.join(outputRoot, 'plan');
  const planPrivateDir = path.join(outputRoot, 'plan-private');
  await writeFile(actionLogPath, '[]\n');
  await writeFile(routingReviewLogPath, '[]\n');
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/build-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_REPORT_PATH: path.join(
          outputRoot,
          'reports/search-console-export.csv',
        ),
        SC_QUERY_REPORT_PATH: path.join(
          outputRoot,
          'reports/private/search-console-query-export.csv',
        ),
        SC_PAGE_QUERY_REPORT_PATH: signalsPath,
        SC_SEGMENT_REPORT_PATH: segmentPath,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
        SC_OUTPUT_DIR: planOutputDir,
        SC_PRIVATE_OUTPUT_DIR: planPrivateDir,
        SC_PLAN_DATE: observedAt,
      },
    },
  );
  const planPath = path.join(planOutputDir, 'search-console-priority.json');
  const plan = JSON.parse(await readFile(planPath, 'utf8'));
  check(plan.dataSnapshot.readyForPlanning, 'Synthetic plan is not ready.');
  check(plan.execution.status === 'ready', 'Reviewed target was not executable.');
  check(
    plan.execution.executeNow.some(
      (item) => item.route === '/topics/proof-of-residency/',
    ),
    'Reviewed target did not enter the execution queue.',
  );
  check(
    plan.execution.queryReviewQueue.some(
      (item) => item.route === '/states/massachusetts/real-id/',
    ),
    'Unreviewed Chinese intent did not enter the query-review queue.',
  );
  check(
    !plan.execution.executeNow.some(
      (item) => item.route === '/states/massachusetts/real-id/',
    ),
    'Unreviewed Chinese intent entered the execution queue.',
  );
  check(
    plan.execution.humanReviewQueue.some(
      (item) =>
        item.route ===
        '/topics/older-driver-license-renewal-medical-review/',
    ),
    'High-risk intent did not enter the human-review queue.',
  );
  check(
    plan.execution.routingReviewQueue.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Misrouted intent did not enter the routing-review queue.',
  );
  check(
    !plan.execution.executeNow.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Misrouted intent entered the execution queue.',
  );
  check(
    plan.execution.lowEvidenceQueue.some(
      (item) => item.route === '/topics/real-id-basics/',
    ),
    'Weak target intent did not enter the low-evidence queue.',
  );
  check(
    !plan.execution.executeNow.some(
      (item) => item.route === '/topics/real-id-basics/',
    ),
    'Weak target intent entered the execution queue.',
  );
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/audit-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SEARCH_CONSOLE_PLAN_PATH: planPath,
      },
    },
  );

  await writeFile(
    routingReviewLogPath,
    `${JSON.stringify(
      [
        {
          id: 'synthetic-misroute',
          routes: ['/directories/new-residents/'],
          targetRoutes: ['/states/washington/'],
          reviewedAt: observedAt,
          reviewedThrough: observedAt,
          plannedFor: observedAt,
          action: 'intent-links',
          summary: 'Synthetic routing decision.',
        },
      ],
      null,
      2,
    )}\n`,
  );
  const routingDueOutputDir = path.join(outputRoot, 'plan-routing-due');
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/build-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_REPORT_PATH: path.join(
          outputRoot,
          'reports/search-console-export.csv',
        ),
        SC_QUERY_REPORT_PATH: path.join(
          outputRoot,
          'reports/private/search-console-query-export.csv',
        ),
        SC_PAGE_QUERY_REPORT_PATH: signalsPath,
        SC_SEGMENT_REPORT_PATH: segmentPath,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
        SC_OUTPUT_DIR: routingDueOutputDir,
        SC_PRIVATE_OUTPUT_DIR: path.join(
          outputRoot,
          'plan-routing-due-private',
        ),
        SC_PLAN_DATE: observedAt,
      },
    },
  );
  const routingDuePlanPath = path.join(
    routingDueOutputDir,
    'search-console-priority.json',
  );
  const routingDuePlan = JSON.parse(
    await readFile(routingDuePlanPath, 'utf8'),
  );
  check(
    routingDuePlan.execution.routingAllowedNow === 1,
    'Due routing action did not consume one editorial slot.',
  );
  check(
    routingDuePlan.execution.routingExecuteNow.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Due routing action did not enter the current execution queue.',
  );
  check(
    !routingDuePlan.execution.routingActionQueue.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Due routing action remained in the scheduled action queue.',
  );
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/audit-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SEARCH_CONSOLE_PLAN_PATH: routingDuePlanPath,
      },
    },
  );

  await writeFile(
    routingReviewLogPath,
    `${JSON.stringify(
      [
        {
          id: 'synthetic-misroute',
          routes: ['/directories/new-residents/'],
          targetRoutes: ['/states/washington/'],
          reviewedAt: observedAt,
          reviewedThrough: observedAt,
          plannedFor: addDays(observedAt, 1),
          action: 'intent-links',
          summary: 'Synthetic routing decision.',
        },
      ],
      null,
      2,
    )}\n`,
  );
  const routingActionOutputDir = path.join(outputRoot, 'plan-routing-action');
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/build-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_REPORT_PATH: path.join(
          outputRoot,
          'reports/search-console-export.csv',
        ),
        SC_QUERY_REPORT_PATH: path.join(
          outputRoot,
          'reports/private/search-console-query-export.csv',
        ),
        SC_PAGE_QUERY_REPORT_PATH: signalsPath,
        SC_SEGMENT_REPORT_PATH: segmentPath,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
        SC_OUTPUT_DIR: routingActionOutputDir,
        SC_PRIVATE_OUTPUT_DIR: path.join(
          outputRoot,
          'plan-routing-action-private',
        ),
        SC_PLAN_DATE: observedAt,
      },
    },
  );
  const routingActionPlanPath = path.join(
    routingActionOutputDir,
    'search-console-priority.json',
  );
  const routingActionPlan = JSON.parse(
    await readFile(routingActionPlanPath, 'utf8'),
  );
  check(
    routingActionPlan.execution.routingActionQueue.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Reviewed misroute did not enter the routing-action queue.',
  );
  check(
    !routingActionPlan.execution.routingReviewQueue.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Reviewed misroute remained in the unresolved routing-review queue.',
  );
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/audit-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SEARCH_CONSOLE_PLAN_PATH: routingActionPlanPath,
      },
    },
  );

  const completionScript = path.join(
    projectRoot,
    'scripts/complete-search-console-routing-action.mjs',
  );
  const completionArgs = [
    completionScript,
    '--id',
    'synthetic-misroute',
    '--changed-route',
    '/directories/new-residents/',
    '--completed-at',
    observedAt,
    '--baseline-period-end',
    addDays(observedAt, -1),
    '--evaluate-after',
    addDays(observedAt, 14),
    '--summary',
    'Synthetic routing implementation completed.',
  ];
  let earlyCompletionRejected = false;
  try {
    await execFileAsync(process.execPath, [...completionArgs, '--dry-run'], {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
      },
    });
  } catch (error) {
    earlyCompletionRejected = String(
      error?.stderr ?? error?.message ?? error,
    ).includes('cannot be completed before');
  }
  check(
    earlyCompletionRejected,
    'Routing completion command allowed work before its planned date.',
  );

  await writeFile(
    routingReviewLogPath,
    `${JSON.stringify(
      [
        {
          id: 'synthetic-misroute',
          routes: ['/directories/new-residents/'],
          targetRoutes: ['/states/washington/'],
          reviewedAt: observedAt,
          reviewedThrough: observedAt,
          plannedFor: observedAt,
          action: 'intent-links',
          summary: 'Synthetic routing decision.',
        },
      ],
      null,
      2,
    )}\n`,
  );
  await writeFile(
    actionLogPath,
    `${JSON.stringify(
      [
        {
          route: '/states/alabama/',
          action: 'synthetic',
          completedAt: observedAt,
          evaluateAfter: addDays(observedAt, 14),
        },
        {
          route: '/states/alaska/',
          action: 'synthetic',
          completedAt: observedAt,
          evaluateAfter: addDays(observedAt, 14),
        },
        {
          route: '/states/arizona/',
          action: 'synthetic',
          completedAt: observedAt,
          evaluateAfter: addDays(observedAt, 14),
        },
      ],
      null,
      2,
    )}\n`,
  );
  let overCapacityCompletionRejected = false;
  try {
    await execFileAsync(process.execPath, [...completionArgs, '--dry-run'], {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
      },
    });
  } catch (error) {
    overCapacityCompletionRejected = String(
      error?.stderr ?? error?.message ?? error,
    ).includes('rolling 7-day limit');
  }
  check(
    overCapacityCompletionRejected,
    'Routing completion command allowed work beyond weekly capacity.',
  );
  await writeFile(actionLogPath, '[]\n');
  await execFileAsync(process.execPath, completionArgs, {
    cwd: projectRoot,
    env: {
      ...process.env,
      SC_ACTION_LOG_PATH: actionLogPath,
      SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
    },
  });
  const completedRoutingReviews = JSON.parse(
    await readFile(routingReviewLogPath, 'utf8'),
  );
  const completedRoutingActions = JSON.parse(
    await readFile(actionLogPath, 'utf8'),
  );
  check(
    completedRoutingReviews[0]?.implementedAt === observedAt &&
      completedRoutingReviews[0]?.changedRoutes?.includes(
        '/directories/new-residents/',
      ),
    'Routing completion command did not update the decision log.',
  );
  check(
    completedRoutingActions.some(
      (item) =>
        item.routingReviewId === 'synthetic-misroute' &&
        item.route === '/directories/new-residents/',
    ),
    'Routing completion command did not append a matching action-log record.',
  );
  const routingMonitorOutputDir = path.join(outputRoot, 'plan-routing-monitor');
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/build-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SC_REPORT_PATH: path.join(
          outputRoot,
          'reports/search-console-export.csv',
        ),
        SC_QUERY_REPORT_PATH: path.join(
          outputRoot,
          'reports/private/search-console-query-export.csv',
        ),
        SC_PAGE_QUERY_REPORT_PATH: signalsPath,
        SC_SEGMENT_REPORT_PATH: segmentPath,
        SC_ACTION_LOG_PATH: actionLogPath,
        SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
        SC_OUTPUT_DIR: routingMonitorOutputDir,
        SC_PRIVATE_OUTPUT_DIR: path.join(
          outputRoot,
          'plan-routing-monitor-private',
        ),
        SC_PLAN_DATE: observedAt,
      },
    },
  );
  const routingMonitorPlanPath = path.join(
    routingMonitorOutputDir,
    'search-console-priority.json',
  );
  const routingMonitorPlan = JSON.parse(
    await readFile(routingMonitorPlanPath, 'utf8'),
  );
  check(
    routingMonitorPlan.execution.routingMonitoringQueue.some(
      (item) => item.route === '/directories/new-residents/',
    ),
    'Implemented misroute did not enter the routing-monitoring queue.',
  );
  check(
    routingMonitorPlan.execution.currentPeriod.weeklyActions === 1,
    'Completed routing action was not counted against editorial cadence.',
  );
  await execFileAsync(
    process.execPath,
    [path.join(projectRoot, 'scripts/audit-search-console-plan.mjs')],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        SEARCH_CONSOLE_PLAN_PATH: routingMonitorPlanPath,
      },
    },
  );
  await writeFile(
    actionLogPath,
    `${JSON.stringify(
      completedRoutingActions.map((item) => ({
        ...item,
        summary: 'Mismatched synthetic implementation record.',
      })),
      null,
      2,
    )}\n`,
  );
  let mismatchedCompletionRejected = false;
  try {
    await execFileAsync(
      process.execPath,
      [path.join(projectRoot, 'scripts/build-search-console-plan.mjs')],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          SC_REPORT_PATH: path.join(
            outputRoot,
            'reports/search-console-export.csv',
          ),
          SC_QUERY_REPORT_PATH: path.join(
            outputRoot,
            'reports/private/search-console-query-export.csv',
          ),
          SC_PAGE_QUERY_REPORT_PATH: signalsPath,
          SC_SEGMENT_REPORT_PATH: segmentPath,
          SC_ACTION_LOG_PATH: actionLogPath,
          SC_ROUTING_REVIEW_PATH: routingReviewLogPath,
          SC_OUTPUT_DIR: path.join(outputRoot, 'plan-routing-mismatch'),
          SC_PRIVATE_OUTPUT_DIR: path.join(
            outputRoot,
            'plan-routing-mismatch-private',
          ),
          SC_PLAN_DATE: observedAt,
        },
      },
    );
  } catch (error) {
    mismatchedCompletionRejected = String(
      error?.stderr ?? error?.message ?? error,
    ).includes('action-log record does not match');
  }
  check(
    mismatchedCompletionRejected,
    'Planner accepted a routing decision and action-log mismatch.',
  );
  await writeFile(
    actionLogPath,
    `${JSON.stringify(completedRoutingActions, null, 2)}\n`,
  );

  const filteredGlobalZip = path.join(inputDir, 'filtered-global.zip');
  await writeZip(filteredGlobalZip, {
    ...globalFiles,
    '过滤器.csv':
      '过滤器,值\n搜索类型,网络\n日期,过去 28 天\n网页,https://dmvcn.com/states/massachusetts/real-id/\n',
  });
  let filteredGlobalRejected = false;
  try {
    await importSearchConsoleExport({
      projectRoot,
      outputRoot,
      globalExportPath: filteredGlobalZip,
      observedAt,
      dryRun: true,
    });
  } catch (error) {
    filteredGlobalRejected = String(error).includes('dimension filters');
  }
  check(
    filteredGlobalRejected,
    'A page-filtered export was accepted as the global property export.',
  );

  const unfilteredPageZip = path.join(inputDir, 'unfiltered-page.zip');
  await writeZip(unfilteredPageZip, {
    '查询数.csv':
      '热门查询,点击次数,展示,点击率,排名\n示例中文办证词,0,1,0%,8\n',
    '过滤器.csv': '过滤器,值\n搜索类型,网络\n日期,过去 28 天\n',
  });
  const unfilteredManifestPath = path.join(
    inputDir,
    'unfiltered-pages.csv',
  );
  await writeFile(
    unfilteredManifestPath,
    'route,export\n/states/massachusetts/real-id/,unfiltered-page.zip\n',
  );
  let unfilteredPageRejected = false;
  try {
    await importSearchConsoleExport({
      projectRoot,
      outputRoot,
      globalExportPath: globalZip,
      pageManifestPath: unfilteredManifestPath,
      observedAt,
      dryRun: true,
    });
  } catch (error) {
    unfilteredPageRejected = String(error).includes('no page filter');
  }
  check(
    unfilteredPageRejected,
    'An unfiltered export was accepted as page-query evidence.',
  );
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

console.log('# Search Console Import Gate');
console.log('');
console.log('Synthetic ZIP exports: 8');
console.log('Property totals: 3 clicks / 300 impressions');
console.log('Page-query signals: 6');
console.log(`Errors: ${errors.length}`);

if (errors.length) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('ZIP parsing, totals, refresh, privacy classification, and target gating passed.');
