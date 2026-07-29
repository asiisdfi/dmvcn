import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { importSearchConsoleExport } from './lib/search-console-import.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

function usage() {
  return `Usage:
  npm run import:sc -- --global <export.zip|directory> [options]

Options:
  --pages <manifest.csv>          Page-filter exports: route,export
  --classifications <review.csv>  Reviewed overrides: route,query,classification
  --observed-at <YYYY-MM-DD>      Export date; inferred from ZIP name when possible
  --property <property>           Defaults to sc-domain:dmvcn.com
  --window-days <number>          Assert an ambiguous custom window; chart span must match
  --output-root <directory>       Test/output root; defaults to the repository
  --dry-run                       Validate and summarize without writing files
  --help                          Show this help

Raw queries and page mappings are written only to reports/private/, which is
gitignored. The public reports are generated later by npm run plan:sc.`;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) {
      throw new Error(`${arg} requires a value.`);
    }
    index += 1;
    if (arg === '--global') options.globalExportPath = value;
    else if (arg === '--pages') options.pageManifestPath = value;
    else if (arg === '--classifications') options.classificationCsvPath = value;
    else if (arg === '--observed-at') options.observedAt = value;
    else if (arg === '--property') options.property = value;
    else if (arg === '--window-days') options.windowDays = Number(value);
    else if (arg === '--output-root') options.outputRoot = path.resolve(value);
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    process.exit(0);
  }
  if (!options.globalExportPath) {
    console.error(usage());
    process.exit(1);
  }
  const summary = await importSearchConsoleExport({
    projectRoot,
    outputRoot: projectRoot,
    ...options,
  });
  console.log('# Search Console Import');
  console.log('');
  console.log(`Observed: ${summary.observedAt}`);
  console.log(`Window: ${summary.window.label} (${summary.window.days} days)`);
  console.log(`Window evidence: ${summary.window.verification.method}`);
  console.log(
    `Property clicks / impressions: ${summary.propertyTotals.clicks} / ${summary.propertyTotals.impressions}`,
  );
  console.log(
    `CTR / position: ${summary.propertyTotals.ctr}% / ${summary.propertyTotals.position}`,
  );
  console.log(`Page / query rows: ${summary.pageRows} / ${summary.queryRows}`);
  console.log(
    `Page exports / refreshed signals: ${summary.pageExports} / ${summary.refreshedPageSignals}`,
  );
  console.log(
    `Classifications: target=${summary.classifications.target}, routing-review=${summary.classifications.routingReview}, unreviewed=${summary.classifications.unreviewed}, human-review=${summary.classifications.humanReview}, observed=${summary.classifications.observed}`,
  );
  console.log(`Mode: ${summary.dryRun ? 'dry-run' : 'written'}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
