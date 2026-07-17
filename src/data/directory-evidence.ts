import type { StateGuide } from './content';
import { getReviewedStateClaimSources } from './state-evidence-reviews.ts';

export type DirectoryEvidence = {
  label: string;
  url: string;
};

export function splitDirectoryClaims(text: string) {
  return text
    .split(/\s*[；;。]\s*/)
    .map((claim) => claim.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export const directoryEvidenceSemanticRules = [
  {
    id: 'ab-60',
    claim: /\bab\s*60\b/i,
    source: /\bab(?:-|%20|\s)*60\b/i,
  },
  {
    id: 'id-44',
    claim: /\bid-?44\b/i,
    source: /\bid-?44\b|id44\.pdf/i,
  },
  {
    id: 'what-to-bring',
    claim: /\bwhat to bring\b/i,
    source: /what(?:-|%20|\s)*to(?:-|%20|\s)*bring/i,
  },
  {
    id: 'fee',
    claim: /\$\d|\bfees?\b|\bcost\b|\bpayment\b|费用|付款|支付/i,
    source: /\bfees?\b|\bcost\b|\bpayment\b|licensing-fees|\/fees\//i,
  },
  {
    id: 'temporary-credential',
    claim: /temporary (?:paper )?(?:permit|license|credential)|临时(?:纸质)?(?:许可|凭证|驾照)|limited term/i,
    source: /temporary|non-immigrant|limited-term/i,
  },
  {
    id: 'processing-or-mail',
    claim: /processing times?|business days?|weeks?|credential (?:mail )?status|processed|mailed|邮寄|寄到|处理时间|工作日|卡片状态/i,
    source: /processing|mail|status|temporary|credential/i,
  },
  {
    id: 'address-change',
    claim: /change (?:of )?address|address (?:change|update)|搬家后.{0,16}(?:通知|更新)|地址(?:变化|变更|更新)|更新地址/i,
    source: /change.*(?:address|information)|address.*change|moves?/i,
  },
  {
    id: 'residency-documents',
    claim: /residential address|residency|proof of (?:address|residency)|physical address|p\.?o\.?\s*box|居住证明|地址证明|两份.*(?:文件|材料|地址)|账单/i,
    source: /residen|what.*to.*bring|document|checklist|proof|real.?id|requirements/i,
  },
  {
    id: 'document-checklist',
    claim: /document (?:guide|checklist)|required documents?|acceptable documents?|材料清单|文件清单|checklist/i,
    source: /document|checklist|what.*to.*bring|requirements|real.?id/i,
  },
  {
    id: 'renewal',
    claim: /\brenew(?:al|ed|ing)?\b|续期|到期前/i,
    source: /renew|replacement|online services/i,
  },
  {
    id: 'appointment',
    claim: /\bappointment\b|预约/i,
    source: /appointment|location|office|service center/i,
  },
  {
    id: 'new-resident',
    claim: /new resident|moving to|新.{0,8}居民|搬入|搬到|建立.{0,12}residency/i,
    source: /new.?resident|moving|move.?to/i,
  },
  {
    id: 'foreign-license',
    claim: /foreign (?:driver )?license|drivers? from other countries|out[- ]of[- ]country|外国驾照|境外驾照/i,
    source: /foreign|other.?countr|out.?of.?country|driver.?licenses/i,
  },
  {
    id: 'out-of-state',
    claim: /out[- ]of[- ]state|外州(?:驾照|转入|换证)/i,
    source: /out.?of.?state|exchange|transfer|moving|new.?resident/i,
  },
  {
    id: 'reciprocity',
    claim: /reciprocity|reciprocal|互惠/i,
    source: /reciproc|moving.*guide/i,
  },
  {
    id: 'translation',
    claim: /certified translation|english translation|翻译|译文/i,
    source: /translation|language|foreign|other.?countr|document/i,
  },
  {
    id: 'ssn',
    claim: /\bssn\b|social security|\bssa\b|无 ssn|没有 ssn/i,
    source: /\bssn\b|social.?security|\bssa\b|document|what.*to.*bring|id-?44|id44|checklist|real.?id|requirements/i,
  },
  {
    id: 'non-citizen',
    claim: /non[- ]?immigrant|non[- ]?citizen|temporary visitor|非公民|非移民|临时访客/i,
    source: /non.?immigrant|non.?citizen|temporary.?visitor|legal.?presence|what.*to.*bring|ab.?60|immigra/i,
  },
  {
    id: 'lawful-presence',
    claim: /lawful presence|legal (?:presence|status)|authorized presence|合法(?:居留|身份)/i,
    source: /lawful|legal.?presence|authorized.?presence|non.?immigrant|temporary.?visitor|ab.?60|required.?documents|documentation|checklist|identity|real.?id|immigra/i,
  },
  {
    id: 'immigration-verification',
    claim: /\bsave\b|uscis|immigration documents?|移民文件|身份核验/i,
    source: /\bsave\b|uscis|immigra|non.?immigrant|legal.?presence|document|identity/i,
  },
];

const attributionCue = /页面|网页|page|pdf|faq|guide|checklist|table|公告|announcement/i;
const attributionStopWords = new Set([
  'acceptable',
  'agency',
  'card',
  'cards',
  'department',
  'dds',
  'dld',
  'dmv',
  'dor',
  'document',
  'documents',
  'dol',
  'driver',
  'drivers',
  'driving',
  'dps',
  'flhsmv',
  'gov',
  'guide',
  'id',
  'itd',
  'kdor',
  'license',
  'licenses',
  'mva',
  'mvd',
  'mvc',
  'ncdmv',
  'omv',
  'official',
  'page',
  'penndot',
  'requirements',
  'scdmv',
  'sos',
  'state',
  'table',
  'wisdot',
]);
const editorialMetaPattern =
  /文案|中文用户|中文页|本站|分流页|要提醒读者|应提醒用户|要写进|适合解释成|适合(?:放到|作为).*(?:表|提醒|页面)|这比只写|更有用|是非常具体的要求|应写成|不要写成|需要写清|最需要提前说清|页面措辞/i;

function stateStopWords(state?: StateGuide) {
  if (!state) return new Set<string>();
  const text = `${state.id} ${state.abbr} ${state.nameEn} ${state.agency}`.toLowerCase();
  return new Set(text.match(/[a-z][a-z0-9-]{1,}/g) ?? []);
}

function sourceTokenMatches(token: string, sourceTokens: Set<string>) {
  if (sourceTokens.has(token)) return true;
  const variants: Record<string, string[]> = {
    fee: ['fees'],
    renew: ['renewal', 'renewals', 'renewed', 'renewing'],
    replace: ['replacement', 'replacements', 'replaced', 'replacing'],
    test: ['tests', 'tested', 'testing'],
  };
  return (variants[token] ?? []).some((variant) => sourceTokens.has(variant));
}

function hasExplicitSourceAttribution(noteText: string, sourceText: string, state?: StateGuide) {
  const cue = noteText.match(attributionCue);
  if (!cue || cue.index === undefined) return false;
  const stateWords = stateStopWords(state);
  const sourceTitle = noteText.slice(0, cue.index + cue[0].length);
  const noteTokens = sourceTitle.toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) ?? [];
  const strongTokens = [...new Set(noteTokens)].filter(
    (token) => !attributionStopWords.has(token) && !stateWords.has(token),
  );
  const sourceTokens = new Set(sourceText.toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) ?? []);
  return strongTokens.length > 0 && strongTokens.every((token) => sourceTokenMatches(token, sourceTokens));
}

export function isPublishableDirectoryClaim(noteText: string) {
  return noteText.trim().length >= 12 && !editorialMetaPattern.test(noteText);
}

export function evaluateDirectoryEvidence(noteText: string, sourceText: string, state?: StateGuide) {
  const matchedRules = directoryEvidenceSemanticRules.filter((rule) => rule.claim.test(noteText));
  const requiresExplicitSource = attributionCue.test(noteText);
  const explicitSourceAttribution = hasExplicitSourceAttribution(noteText, sourceText, state);
  const failedRules = requiresExplicitSource && !explicitSourceAttribution
    ? matchedRules
    : explicitSourceAttribution
      ? []
      : matchedRules.filter((rule) => !rule.source.test(sourceText));
  const failedThemes = failedRules.map((rule) => rule.id);
  if (requiresExplicitSource && !explicitSourceAttribution) failedThemes.push('explicit-source-title');

  return {
    themes: matchedRules.map((rule) => rule.id),
    failedThemes,
    explicitSourceAttribution,
    valid:
      (matchedRules.length > 0 || explicitSourceAttribution) &&
      failedThemes.length === 0,
  };
}

type EvidenceCandidate = DirectoryEvidence & {
  order: number;
  searchText: string;
  sourceWeight: number;
};

function evidenceCandidates(state: StateGuide) {
  const byUrl = new Map<string, EvidenceCandidate>();
  let order = 0;

  for (const source of state.sources) {
    byUrl.set(source.url, {
      label: source.label,
      url: source.url,
      order,
      searchText: `${source.label} ${source.note ?? ''} ${source.url}`.toLowerCase(),
      sourceWeight: 2,
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
      order,
      searchText: `${link.label} ${link.description} ${link.url}`.toLowerCase(),
      sourceWeight: 1,
    });
    order += 1;
  }

  return [...byUrl.values()];
}

function keywordOverlap(noteText: string, candidateText: string) {
  const ignored = new Set([
    'about',
    'after',
    'before',
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
  const tokens = noteText
    .toLowerCase()
    .match(/[a-z][a-z0-9-]{3,}/g)
    ?.filter((token) => !ignored.has(token)) ?? [];

  return [...new Set(tokens)].filter((token) => candidateText.includes(token)).length;
}

export function pickDirectoryEvidence(
  state: StateGuide,
  noteText: string,
  patterns: RegExp[],
): DirectoryEvidence | null {
  if (!isPublishableDirectoryClaim(noteText)) return null;

  const candidates = evidenceCandidates(state);
  const reviewedUrls = getReviewedStateClaimSources(state.id, noteText);
  const rank = (pool: EvidenceCandidate[]) =>
    pool
      .map((candidate) => {
        const patternIndex = patterns.findIndex((pattern) => pattern.test(candidate.searchText));
        if (patternIndex < 0) return null;
        if (!evaluateDirectoryEvidence(noteText, candidate.searchText, state).valid) return null;

        return {
          candidate,
          score:
            (patterns.length - patternIndex) * 100 +
            keywordOverlap(noteText, candidate.searchText) * 8 +
            candidate.sourceWeight * 3 -
            candidate.order / 1000,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .sort((a, b) => b.score - a.score);

  const ranked = rank(candidates);
  if (!ranked.length) return null;

  if (reviewedUrls?.length) {
    for (const url of reviewedUrls) {
      const reviewedCandidate = candidates.find((candidate) => candidate.url === url);
      if (reviewedCandidate) {
        return { label: reviewedCandidate.label, url: reviewedCandidate.url };
      }
    }
  }

  const match = ranked[0]?.candidate;
  return match ? { label: match.label, url: match.url } : null;
}
