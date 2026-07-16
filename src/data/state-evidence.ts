import type { Source, StateGuide } from './content';
import { STATE_EVIDENCE_RELEASE_DATE } from './editorial.ts';

export type StateEvidenceSurface = 'overview' | 'real-id';
export type StateEvidenceContext =
  | 'overview'
  | 'real-id'
  | 'license'
  | 'appointment'
  | 'document'
  | 'detail';

export type StateEvidenceSource = Source & {
  searchText: string;
};

export type StateEvidenceItem = {
  claim: string;
  context: StateEvidenceContext;
  field: string;
  sources: Source[];
  themes: string[];
  uncoveredThemes: string[];
};

export function getStatePageModifiedAt(state: StateGuide) {
  return state.modifiedAt > STATE_EVIDENCE_RELEASE_DATE
    ? state.modifiedAt
    : STATE_EVIDENCE_RELEASE_DATE;
}

type SemanticRule = {
  id: string;
  claim: RegExp;
  source: RegExp;
};

export const stateEvidenceSemanticRules: SemanticRule[] = [
  {
    id: 'real-id',
    claim: /\breal\s*id\b|travel id|star id|secureid|联邦合规|星标/i,
    source:
      /real.?id|travel.?id|star.?id|secure.?id|enhanced|federally.?compliant|compliant.?license|document|requirements?/i,
  },
  {
    id: 'enhanced-id',
    claim: /\benhanced\b|\bedl\b|增强型|旗帜标记/i,
    source: /enhanced|\bedl\b|real.?id/i,
  },
  {
    id: 'document',
    claim:
      /documents?|材料|文件|原件|certified copy|认证副本|passport|birth certificate|护照|出生证明|marriage certificate|court order/i,
    source:
      /document|checklist|requirements?|what.?to.?bring|proof|identity|real.?id|travel.?id|star.?id|secure.?id|6.?points|id-?44|id44|brochure/i,
  },
  {
    id: 'residency-proof',
    claim:
      /proof of (?:address|residency)|residen(?:ce|cy)|居住证明|地址证明|utility bill|bank statement|账单|p\.?o\.?\s*box|physical address/i,
    source:
      /residen|document|checklist|requirements?|what.?to.?bring|proof|identity|real.?id|travel.?id|star.?id|secure.?id|6.?points|id-?44|id44/i,
  },
  {
    id: 'address-change',
    claim:
      /change (?:of )?address|address (?:change|update)|update.{0,20}address|地址(?:变化|变更|更新)|更新.{0,12}地址|搬家后.{0,20}(?:通知|更新)/i,
    source:
      /address|地址|change.*information|update.*information|personal.*information|chang(?:e|ing).*identification|moving|moves?|online.?services|portal|document|requirements?|real.?id/i,
  },
  {
    id: 'ssn',
    claim: /\bssn\b|social security|\bssa\b|社会安全号|无 ssn|没有 ssn/i,
    source:
      /\bssn\b|social.?security|\bssa\b|document|checklist|requirements?|what.?to.?bring|identity|real.?id|6.?points|id-?44|id44|affidavit/i,
  },
  {
    id: 'name-change',
    claim: /name change|change.{0,12}name|姓名(?:变化|变更)|改名|姓名链/i,
    source: /name|change.*information|document|checklist|requirements?|identity|real.?id|id-?44|id44/i,
  },
  {
    id: 'lawful-presence',
    claim:
      /lawful presence|legal status|authorized presence|immigration documents?|uscis|非公民|非移民|移民文件|合法(?:居留|身份)|temporary visitor/i,
    source:
      /lawful|legal.?presence|authorized.?presence|immigra|non.?citizen|non.?immigrant|temporary.?visitor|required.?documents|documentation|what.?to.?bring|identity|real.?id|ab.?60/i,
  },
  {
    id: 'renewal',
    claim: /\brenew(?:al|ed|ing)?\b|续期|到期(?:前|后|时|续)/i,
    source: /renew|续期|replacement|online.?services|license|credential/i,
  },
  {
    id: 'replacement',
    claim: /\breplace(?:ment|d|ing)?\b|\bduplicate\b|补证|换发|丢失/i,
    source: /replace|duplicate|补证|换发|新卡|丢失|renew|online.?services|license|credential|address/i,
  },
  {
    id: 'appointment',
    claim: /\bappointment\b|预约|排队|wait times?|waitlist/i,
    source:
      /appointment|预约|location|地点|office|办公室|service.?center|branch|station|排队|license|service|dmv2u/i,
  },
  {
    id: 'online-service',
    claim: /\bonline\b|portal|线上|网上|kiosk|自助/i,
    source:
      /online|线上|在线|网上|自助|portal|service|renew|replace|appointment|onewyo|dmv2u|mydmv|skip.?the.?trip|dmv\.idaho\.gov/i,
  },
  {
    id: 'transfer',
    claim:
      /(?:new resident|moving to|move to|搬入|搬到|新居民|外州转入).{0,28}(?:within|days?|天|日|年|must|required|需要|必须|应|换证|转入|surrender)|(?:transfer|换证|转入).{0,20}(?:license|驾照|证件)/i,
    source:
      /new.?resident|新居民|moving|搬入|move.?to|transfer|转入|换证|out.?of.?state|外州|new.?to|driver.?license|licenses?.{0,8}ids?|license.?id|credential|document|requirements?/i,
  },
  {
    id: 'foreign-license',
    claim: /foreign (?:driver )?license|other countries|out[- ]of[- ]country|外国驾照|境外驾照/i,
    source: /foreign|other.?countr|out.?of.?country|transfer|reciproc|driver.?license/i,
  },
  {
    id: 'test',
    claim: /\btest(?:ing|s|ed)?\b|\bexam(?:s)?\b|knowledge|road test|vision|考试|路考|笔试|视力/i,
    source: /test|考试|路考|笔试|exam|permit|manual|driver.?guide|vision|视力|renew|first.?license|office|license|real.?id/i,
  },
  {
    id: 'language',
    claim: /language|translation|interpreter|语言|翻译|口译|非英文文件|外文文件/i,
    source: /language|translation|interpreter|manual|driver.?guide|test|document|requirements?|real.?id/i,
  },
  {
    id: 'fee',
    claim: /\$\s?\d|\bfees?\b|\bcost\b|\bpayment\b|费用|付款|支付|免费|额外收费/i,
    source: /fees?|费用|付款|支付|cost|payment|licensing.?fees|real.?id|renew|document.*requirements?/i,
  },
  {
    id: 'processing-or-mail',
    claim: /processing time|business days?|weeks?|mailed|mailing|邮寄|寄到|处理时间|实体卡/i,
    source: /processing|mail|renew|replace|online|credential|license|real.?id|travel.?id/i,
  },
  {
    id: 'temporary-credential',
    claim: /temporary (?:paper )?(?:permit|license|credential)|临时(?:纸质)?(?:许可|凭证|驾照)|limited term/i,
    source: /temporary|permit|non.?immigrant|limited.?term|credential|license/i,
  },
];

const contextSourcePatterns: Record<StateEvidenceContext, RegExp[]> = {
  overview: [/driver|license|credential|service|dmv|mvd|mvc|dld|dol|bmv|rmv|sos|dot/i],
  'real-id': [
    /real.?id|travel.?id|star.?id|secure.?id|enhanced|\bedl\b|federally.?compliant/i,
    /document|checklist|requirements?|what.?to.?bring|identity|license/i,
  ],
  license: [
    /driver.?license|licenses?.?and.?id|license.?id|credential|driver.?services/i,
    /renew|replace|new.?resident|moving|transfer|online.?services|dmv|mvd|mvc|dld|bmv|rmv/i,
  ],
  appointment: [
    /appointment|预约|location|地点|office|办公室|service.?center|branch|station|排队/i,
    /online.?services|线上|在线|portal|service|renew|replace|dmv|mvd|mvc|dld|bmv|rmv/i,
  ],
  document: [
    /document|checklist|requirements?|what.?to.?bring|proof|identity|6.?points|id-?44|id44|brochure/i,
    /real.?id|travel.?id|star.?id|secure.?id|license/i,
  ],
  detail: [
    /document|checklist|requirements?|renew|replace|address|appointment|location|moving|transfer|test|fee|license|real.?id/i,
    /driver|service|dmv|mvd|mvc|dld|dol|bmv|rmv|sos|dot/i,
  ],
};

const ignoredTokens = new Set([
  'about',
  'after',
  'before',
  'card',
  'cards',
  'driver',
  'drivers',
  'license',
  'licenses',
  'official',
  'page',
  'state',
  'their',
  'this',
  'with',
]);

export function splitStateClaims(text: string) {
  return text
    .split(/\s*[；;。]\s*/)
    .map((claim) => claim.replace(/\s+/g, ' ').trim())
    .filter((claim) => claim.length >= 8);
}

function candidateSources(state: StateGuide): StateEvidenceSource[] {
  const byUrl = new Map<string, StateEvidenceSource & { order: number; weight: number }>();
  let order = 0;

  for (const source of state.sources) {
    byUrl.set(source.url, {
      ...source,
      order,
      weight: 3,
      searchText: `${source.label} ${source.note ?? ''} ${source.url}`.toLowerCase(),
    });
    order += 1;
  }

  for (const link of state.actionLinks) {
    const existing = byUrl.get(link.url);
    if (existing) {
      existing.searchText += ` ${link.label} ${link.description}`.toLowerCase();
      continue;
    }

    byUrl.set(link.url, {
      label: link.label,
      url: link.url,
      note: link.description,
      order,
      weight: 1,
      searchText: `${link.label} ${link.description} ${link.url}`.toLowerCase(),
    });
    order += 1;
  }

  return [...byUrl.values()].map(({ order: _order, weight: _weight, ...source }) => source);
}

function sourceMetadata(state: StateGuide, url: string) {
  const source = state.sources.find((item) => item.url === url);
  const action = state.actionLinks.find((item) => item.url === url);
  const order = state.sources.findIndex((item) => item.url === url);
  const actionOrder = state.actionLinks.findIndex((item) => item.url === url);

  return {
    order: order >= 0 ? order : state.sources.length + Math.max(0, actionOrder),
    weight: source ? 3 : 1,
    searchText: [
      source?.label,
      source?.note,
      action?.label,
      action?.description,
      url,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

function keywordOverlap(claim: string, sourceText: string) {
  const tokens =
    claim
      .toLowerCase()
      .match(/[a-z][a-z0-9-]{3,}/g)
      ?.filter((token) => !ignoredTokens.has(token)) ?? [];

  return [...new Set(tokens)].filter((token) => sourceText.includes(token)).length;
}

function inferredContext(claim: string, requested: StateEvidenceContext): StateEvidenceContext {
  if (/\breal\s*id\b|travel id|star id|secureid|\benhanced\b|\bedl\b/i.test(claim)) return 'real-id';
  if (
    /documents?|材料|文件|identity|proof|residen|地址证明|居住证明|\bssn\b|social security|passport|birth certificate|姓名/i.test(
      claim,
    )
  ) {
    return 'document';
  }
  if (/\bappointment\b|预约|wait times?|waitlist|排队/i.test(claim)) return 'appointment';
  if (/driver.?license|驾照|续期|补证|renew|replace|new resident|moving|外州转入/i.test(claim)) return 'license';
  return requested;
}

function rankCandidate(
  state: StateGuide,
  claim: string,
  context: StateEvidenceContext,
  source: StateEvidenceSource,
  semanticSource?: RegExp,
) {
  const metadata = sourceMetadata(state, source.url);
  if (semanticSource && !semanticSource.test(metadata.searchText)) return Number.NEGATIVE_INFINITY;
  const patterns = contextSourcePatterns[context];
  const contextIndex = patterns.findIndex((pattern) => pattern.test(metadata.searchText));
  const contextScore = contextIndex < 0 ? 0 : (patterns.length - contextIndex) * 30;

  return (
    contextScore +
    keywordOverlap(claim, metadata.searchText) * 8 +
    metadata.weight * 3 -
    metadata.order / 1000
  );
}

function bestCandidate(
  state: StateGuide,
  claim: string,
  context: StateEvidenceContext,
  sources: StateEvidenceSource[],
  semanticSource?: RegExp,
) {
  return sources
    .map((source) => ({
      source,
      score: rankCandidate(state, claim, context, source, semanticSource),
    }))
    .filter((entry) => Number.isFinite(entry.score))
    .sort((a, b) => b.score - a.score)[0]?.source;
}

export function evaluateStateEvidence(
  state: StateGuide,
  claim: string,
  context: StateEvidenceContext,
  sourceUrls: string[],
) {
  const actualContext = inferredContext(claim, context);
  const sources = candidateSources(state).filter((source) => sourceUrls.includes(source.url));
  const rules = stateEvidenceSemanticRules.filter((rule) => rule.claim.test(claim));
  const uncoveredThemes = rules
    .filter((rule) => !sources.some((source) => rule.source.test(source.searchText)))
    .map((rule) => rule.id);
  const hasContextMatch = sources.some((source) =>
    contextSourcePatterns[actualContext].some((pattern) => pattern.test(source.searchText)),
  );

  return {
    context: actualContext,
    themes: rules.map((rule) => rule.id),
    uncoveredThemes,
    hasContextMatch,
    valid:
      sourceUrls.length > 0 &&
      uncoveredThemes.length === 0 &&
      (rules.length > 0 || hasContextMatch),
  };
}

export function resolveStateEvidence(
  state: StateGuide,
  claim: string,
  requestedContext: StateEvidenceContext,
  field: string,
): StateEvidenceItem {
  const context = inferredContext(claim, requestedContext);
  const sources = candidateSources(state);
  const rules = stateEvidenceSemanticRules.filter((rule) => rule.claim.test(claim));
  const selected = new Map<string, StateEvidenceSource>();
  const uncoveredThemes: string[] = [];

  for (const rule of rules) {
    const source = bestCandidate(state, claim, context, sources, rule.source);
    if (source) selected.set(source.url, source);
    else uncoveredThemes.push(rule.id);
  }

  if (selected.size === 0) {
    const contextSource = bestCandidate(state, claim, context, sources);
    if (contextSource) selected.set(contextSource.url, contextSource);
  }

  const ranked = [...selected.values()]
    .map((source) => ({
      source,
      score: rankCandidate(state, claim, context, source),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ source }) => ({
      label: source.label,
      url: source.url,
      note: source.note,
    }));

  const evaluation = evaluateStateEvidence(
    state,
    claim,
    context,
    ranked.map((source) => source.url),
  );

  return {
    claim,
    context,
    field,
    sources: ranked,
    themes: evaluation.themes,
    uncoveredThemes: [...new Set([...uncoveredThemes, ...evaluation.uncoveredThemes])],
  };
}

type EvidenceInput = {
  text: string;
  context: StateEvidenceContext;
  field: string;
};

function buildEvidenceItems(state: StateGuide, inputs: EvidenceInput[]) {
  const seen = new Set<string>();
  const items: StateEvidenceItem[] = [];

  for (const input of inputs) {
    for (const claim of splitStateClaims(input.text)) {
      const normalized = claim.toLowerCase();
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      items.push(resolveStateEvidence(state, claim, input.context, input.field));
    }
  }

  return items;
}

export function buildStateEvidence(
  state: StateGuide,
  surface: StateEvidenceSurface,
  publicNotes: string[] = [],
) {
  if (surface === 'overview') {
    return buildEvidenceItems(state, [
      { text: state.summary, context: 'overview', field: 'summary' },
      { text: state.licenseSummary, context: 'license', field: 'licenseSummary' },
      { text: state.realIdSummary, context: 'real-id', field: 'realIdSummary' },
      { text: state.appointmentNote, context: 'appointment', field: 'appointmentNote' },
      ...publicNotes.map((text) => ({ text, context: 'detail' as const, field: 'editorNotes' })),
    ]);
  }

  return buildEvidenceItems(state, [
    { text: state.realIdSummary, context: 'real-id', field: 'realIdSummary' },
    ...state.documentHighlights.map((text) => ({
      text,
      context: 'document' as const,
      field: 'documentHighlights',
    })),
    ...state.recommendedSteps.map((text) => ({
      text,
      context: 'detail' as const,
      field: 'recommendedSteps',
    })),
    ...state.commonMistakes.map((text) => ({
      text,
      context: 'detail' as const,
      field: 'commonMistakes',
    })),
  ]);
}
