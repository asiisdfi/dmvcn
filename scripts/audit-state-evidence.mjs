import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { getPublicEditorialNotes, states } from '../src/data/content.ts';
import {
  buildStateEvidence,
  evaluateStateEvidence,
} from '../src/data/state-evidence.ts';
import {
  getReviewedStateClaimSources,
  getReviewedStateEvidence,
} from '../src/data/state-evidence-reviews.ts';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.join(projectRoot, 'dist');
const reportDir = path.join(projectRoot, 'reports');
const surfaces = ['overview', 'real-id'];
const requiredFields = {
  overview: ['summary', 'licenseSummary', 'realIdSummary', 'appointmentNote'],
  'real-id': ['realIdSummary', 'documentHighlights', 'recommendedSteps', 'commonMistakes'],
};
const minimumClaims = {
  overview: 4,
  'real-id': 10,
};

const errors = [];
const records = [];

function attrs(node) {
  return new Map((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
}

function classes(node) {
  return new Set((attrs(node).get('class') ?? '').split(/\s+/).filter(Boolean));
}

function text(node) {
  if (node.nodeName === '#text') return node.value ?? '';
  return (node.childNodes ?? []).map(text).join('');
}

function descendants(node, predicate) {
  const matches = [];

  function walk(current) {
    if (predicate(current)) matches.push(current);
    for (const child of current.childNodes ?? []) walk(child);
    if (current.content) walk(current.content);
  }

  walk(node);
  return matches;
}

function officialUrlsFor(state) {
  return new Set([
    state.agencyUrl,
    ...state.sources.map((source) => source.url),
    ...state.actionLinks.map((link) => link.url),
  ]);
}

function itemKey(field, claim) {
  return `${field}\u0000${claim}`;
}

function builtPathFor(stateId, surface) {
  return surface === 'overview'
    ? path.join(distDir, 'states', stateId, 'index.html')
    : path.join(distDir, 'states', stateId, 'real-id', 'index.html');
}

for (const state of states) {
  const publicNotes = getPublicEditorialNotes(state.editorNotes);
  const officialUrls = officialUrlsFor(state);
  const reviewedEvidence = getReviewedStateEvidence(state.id);
  const renderedClaims = new Set();

  if (reviewedEvidence) {
    if (new Set(reviewedEvidence.sourceBodiesChecked).size !== reviewedEvidence.sourceBodiesChecked.length) {
      errors.push(`${state.id}: reviewed source body list contains duplicates`);
    }
    for (const url of reviewedEvidence.sourceBodiesChecked) {
      if (!officialUrls.has(url)) {
        errors.push(`${state.id}: reviewed source body is not registered for this state: ${url}`);
      }
    }
    for (const [claim, sourceUrls] of Object.entries(reviewedEvidence.claims)) {
      if (!sourceUrls.length) errors.push(`${state.id}: reviewed claim has no source: ${claim}`);
      for (const url of sourceUrls) {
        if (!officialUrls.has(url)) {
          errors.push(`${state.id}: reviewed claim uses an unregistered source: ${url}`);
        }
        if (!reviewedEvidence.sourceBodiesChecked.includes(url)) {
          errors.push(`${state.id}: reviewed claim source body was not recorded as checked: ${url}`);
        }
      }
    }
  }

  for (const surface of surfaces) {
    const expected = buildStateEvidence(state, surface, publicNotes);
    const expectedByKey = new Map(expected.map((item) => [itemKey(item.field, item.claim), item]));
    const seen = new Map();
    let html;

    try {
      html = await readFile(builtPathFor(state.id, surface), 'utf8');
    } catch {
      errors.push(`${state.id}/${surface}: built HTML is missing; run npm run build first`);
      continue;
    }

    const tree = parse(html);
    const items = descendants(tree, (node) => classes(node).has('state-evidence-item'));

    if (items.length !== expected.length) {
      errors.push(
        `${state.id}/${surface}: expected ${expected.length} evidence claims, found ${items.length}`,
      );
    }
    if (items.length < minimumClaims[surface]) {
      errors.push(
        `${state.id}/${surface}: only ${items.length} evidence claims; minimum is ${minimumClaims[surface]}`,
      );
    }

    for (const field of requiredFields[surface]) {
      if (!expected.some((item) => item.field === field)) {
        errors.push(`${state.id}/${surface}: required evidence field is empty: ${field}`);
      }
    }

    for (const itemNode of items) {
      const attributes = attrs(itemNode);
      const context = attributes.get('data-evidence-context') ?? '';
      const field = attributes.get('data-evidence-field') ?? '';
      const mappingMethod = attributes.get('data-evidence-method') ?? '';
      const claimNode = descendants(itemNode, (node) => node.tagName === 'p')[0];
      const claim = text(claimNode ?? {}).replace(/\s+/g, ' ').trim();
      const links = descendants(itemNode, (node) => classes(node).has('state-evidence-link'));
      const sourceUrls = links.map((link) => attrs(link).get('href') ?? '');
      const key = itemKey(field, claim);
      const expectedItem = expectedByKey.get(key);
      const semantic = evaluateStateEvidence(state, claim, context, sourceUrls);
      const reviewedSourceUrls = getReviewedStateClaimSources(state.id, claim);
      const reviewApplies = reviewedEvidence?.surfaces.includes(surface);
      const reviewedMappingMatches =
        mappingMethod === 'ai-assisted' &&
        Boolean(reviewedSourceUrls) &&
        JSON.stringify(sourceUrls) === JSON.stringify(reviewedSourceUrls);

      seen.set(key, (seen.get(key) ?? 0) + 1);
      renderedClaims.add(claim);

      if (!expectedItem) {
        errors.push(`${state.id}/${surface}: rendered claim is not in the evidence model: ${claim}`);
      }
      if (expectedItem && mappingMethod !== expectedItem.mappingMethod) {
        errors.push(
          `${state.id}/${surface}: rendered mapping method ${mappingMethod || 'missing'} does not match ${expectedItem.mappingMethod}: ${claim}`,
        );
      }
      if (!claim) errors.push(`${state.id}/${surface}: evidence item has no claim text`);
      if (/[；;]/.test(claim)) {
        errors.push(`${state.id}/${surface}: compound claim was not split: ${claim}`);
      }
      if (links.length < 1 || links.length > 6) {
        errors.push(
          `${state.id}/${surface}: claim must have 1-6 official sources, found ${links.length}: ${claim}`,
        );
      }
      if (new Set(sourceUrls).size !== sourceUrls.length) {
        errors.push(`${state.id}/${surface}: claim has duplicate source links: ${claim}`);
      }
      for (const url of sourceUrls) {
        if (!officialUrls.has(url)) {
          errors.push(`${state.id}/${surface}: source is not registered for this state: ${url}`);
        }
      }
      if (reviewApplies && !reviewedMappingMatches) {
        errors.push(
          `${state.id}/${surface}: evidence-checked surface lacks an explicit reviewed mapping: ${claim}`,
        );
      }
      if (!reviewApplies && mappingMethod !== 'automated') {
        errors.push(
          `${state.id}/${surface}: unreviewed surface must remain automated: ${claim}`,
        );
      }
      if (mappingMethod === 'automated' && !semantic.valid) {
        errors.push(
          `${state.id}/${surface}: evidence mismatch (${[
            ...semantic.uncoveredThemes,
            ...(semantic.hasContextMatch ? [] : ['context']),
          ].join(', ')}): ${claim}`,
        );
      }

      records.push({
        stateId: state.id,
        surface,
        field,
        context: semantic.context,
        claim,
        sourceUrls,
        sourceLabels: links.map((link) => text(link).replace(/\s+/g, ' ').trim()),
        mappingMethod,
        themes: semantic.themes,
        uncoveredThemes: semantic.uncoveredThemes,
        valid: mappingMethod === 'ai-assisted' ? reviewedMappingMatches : semantic.valid,
      });
    }

    for (const expectedItem of expected) {
      const count = seen.get(itemKey(expectedItem.field, expectedItem.claim)) ?? 0;
      if (count !== 1) {
        errors.push(
          `${state.id}/${surface}: expected claim rendered ${count} times: ${expectedItem.claim}`,
        );
      }
      if (!expectedItem.sources.length || expectedItem.uncoveredThemes.length) {
        errors.push(
          `${state.id}/${surface}: model produced incomplete evidence (${expectedItem.uncoveredThemes.join(', ')}): ${expectedItem.claim}`,
        );
      }
    }
  }

  if (reviewedEvidence) {
    for (const claim of Object.keys(reviewedEvidence.claims)) {
      if (!renderedClaims.has(claim)) {
        errors.push(`${state.id}: reviewed claim is no longer rendered: ${claim}`);
      }
    }
  }
}

const coverage = Object.fromEntries(
  surfaces.map((surface) => {
    const surfaceRecords = records.filter((record) => record.surface === surface);
    return [
      surface,
      {
        claims: surfaceRecords.length,
        links: surfaceRecords.reduce((total, record) => total + record.sourceUrls.length, 0),
        states: new Set(surfaceRecords.map((record) => record.stateId)).size,
      },
    ];
  }),
);

const summary = {
  generatedAt: new Date().toISOString(),
  pages: states.length * surfaces.length,
  states: states.length,
  claims: records.length,
  links: records.reduce((total, record) => total + record.sourceUrls.length, 0),
  aiAssistedClaims: records.filter((record) => record.mappingMethod === 'ai-assisted').length,
  aiAssistedPages: new Set(
    records
      .filter((record) => record.mappingMethod === 'ai-assisted')
      .map((record) => `${record.stateId}/${record.surface}`),
  ).size,
  errors: errors.length,
  coverage,
};

await mkdir(reportDir, { recursive: true });
await writeFile(
  path.join(reportDir, 'state-evidence-audit.json'),
  `${JSON.stringify({ summary, errors, records }, null, 2)}\n`,
);

console.log('# State Evidence Audit');
console.log('');
console.log(`Pages: ${summary.pages}`);
console.log(`States: ${summary.states}`);
console.log(`Claims: ${summary.claims}`);
console.log(`Official source links: ${summary.links}`);
console.log(`AI-assisted explicit mappings: ${summary.aiAssistedClaims} claims / ${summary.aiAssistedPages} pages`);
console.log(`Errors: ${summary.errors}`);
for (const surface of surfaces) {
  const actual = coverage[surface];
  console.log(`${surface}: ${actual.claims} claims / ${actual.links} links / ${actual.states} states`);
}
console.log('');

if (errors.length) {
  errors.forEach((error) => console.log(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    'All 100 state pages render complete claim-level official-source mappings that pass the registered-source and theme rules.',
  );
}
