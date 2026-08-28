import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { unzipSync } from 'fflate';
import {
  ALLOWED_QUERY_CLASSIFICATIONS,
  isHumanReviewClassification,
  isRoutingReviewQuerySignal,
  isTargetQuerySignal,
  isUnreviewedClassification,
} from './search-console-query-policy.mjs';
import { resolveImportedWindow } from './search-console-window.mjs';

const COUNTRY_CODES = new Map(Object.entries({
  美国: 'US',
  台湾: 'TW',
  日本: 'JP',
  中国: 'CN',
  加拿大: 'CA',
  越南: 'VN',
  印度尼西亚: 'ID',
  英国: 'GB',
  俄罗斯: 'RU',
  泰国: 'TH',
  马来西亚: 'MY',
  乌克兰: 'UA',
  菲律宾: 'PH',
  摩洛哥: 'MA',
  孟加拉: 'BD',
  土耳其: 'TR',
  卡塔尔: 'QA',
  阿尔及利亚: 'DZ',
  印度: 'IN',
  约旦: 'JO',
  墨西哥: 'MX',
  埃及: 'EG',
  沙特阿拉伯: 'SA',
  巴基斯坦: 'PK',
  伊拉克: 'IQ',
  韩国: 'KR',
  西班牙: 'ES',
  巴西: 'BR',
  中国香港: 'HK',
  澳门: 'MO',
  中国澳门: 'MO',
  法国: 'FR',
  新加坡: 'SG',
  德国: 'DE',
  意大利: 'IT',
  爱尔兰: 'IE',
  哥伦比亚: 'CO',
  阿拉伯联合酋长国: 'AE',
  澳大利亚: 'AU',
  葡萄牙: 'PT',
  厄瓜多尔: 'EC',
  新西兰: 'NZ',
  老挝: 'LA',
  巴林: 'BH',
  柬埔寨: 'KH',
  以色列: 'IL',
  匈牙利: 'HU',
  荷兰: 'NL',
  南非: 'ZA',
  科威特: 'KW',
  乌兹别克斯坦: 'UZ',
  尼日利亚: 'NG',
  黎巴嫩: 'LB',
  叙利亚: 'SY',
  阿富汗: 'AF',
  白俄罗斯: 'BY',
  喀麦隆: 'CM',
  哥斯达黎加: 'CR',
  缅甸: 'MM',
  阿曼: 'OM',
  亚美尼亚: 'AM',
  布基纳法索: 'BF',
  斐济: 'FJ',
  智利: 'CL',
  毛里求斯: 'MU',
  巴拿马: 'PA',
  秘鲁: 'PE',
  留尼汪岛: 'RE',
  委内瑞拉: 'VE',
  阿根廷: 'AR',
  几内亚比绍: 'GW',
  尼加拉瓜: 'NI',
  瑞典: 'SE',
  挪威: 'NO',
  奥地利: 'AT',
  格鲁吉亚: 'GE',
  斯里兰卡: 'LK',
  尼泊尔: 'NP',
  瑞士: 'CH',
  塞内加尔: 'SN',
  突尼斯: 'TN',
  哈萨克斯坦: 'KZ',
  阿塞拜疆: 'AZ',
  危地马拉: 'GT',
  波多黎各: 'PR',
  拉脱维亚: 'LV',
  卢森堡: 'LU',
  爱沙尼亚: 'EE',
  冰岛: 'IS',
  立陶宛: 'LT',
  比利时: 'BE',
  肯尼亚: 'KE',
  安道尔: 'AD',
  芬兰: 'FI',
  坦桑尼亚: 'TZ',
  斯洛伐克: 'SK',
  文莱: 'BN',
  埃塞俄比亚: 'ET',
  波兰: 'PL',
  图瓦卢: 'TV',
  丹麦: 'DK',
  多米尼加共和国: 'DO',
  卢旺达: 'RW',
  格林纳达: 'GD',
  乌拉圭: 'UY',
  安哥拉: 'AO',
  美属维尔京群岛: 'VI',
  伊朗: 'IR',
  赤道几内亚: 'GQ',
  加纳: 'GH',
  洪都拉斯: 'HN',
  科特迪瓦: 'CI',
  希腊: 'GR',
  圭亚那: 'GY',
  马其顿: 'MK',
  蒙古: 'MN',
  巴拉圭: 'PY',
  'United States': 'US',
  Taiwan: 'TW',
  Japan: 'JP',
  China: 'CN',
  Canada: 'CA',
  Vietnam: 'VN',
  Indonesia: 'ID',
  Macao: 'MO',
  Macau: 'MO',
  Nepal: 'NP',
  Austria: 'AT',
  Georgia: 'GE',
  'United Kingdom': 'GB',
  Russia: 'RU',
}));

const DEVICE_CODES = new Map([
  ['移动设备', 'MOBILE'],
  ['桌面', 'DESKTOP'],
  ['平板电脑', 'TABLET'],
  ['Mobile', 'MOBILE'],
  ['Desktop', 'DESKTOP'],
  ['Tablet', 'TABLET'],
]);

const REQUIRED_GLOBAL_ROLES = [
  'chart',
  'queries',
  'pages',
  'countries',
  'devices',
  'filters',
];

function normalizedHeader(value) {
  return String(value ?? '')
    .replace(/^\uFEFF/, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
}

export function parseCsv(text) {
  const normalized = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const grid = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];
    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (!inQuotes && char === ',') {
      row.push(value);
      value = '';
      continue;
    }
    if (!inQuotes && char === '\n') {
      row.push(value);
      grid.push(row);
      row = [];
      value = '';
      continue;
    }
    value += char;
  }

  if (inQuotes) throw new Error('CSV contains an unterminated quoted field.');
  if (value.length > 0 || row.length > 0) {
    row.push(value);
    grid.push(row);
  }

  const nonEmpty = grid.filter((cells) =>
    cells.some((cell) => String(cell ?? '').trim() !== ''),
  );
  const headers = (nonEmpty[0] ?? []).map((header) =>
    String(header).trim().replace(/^\uFEFF/, ''),
  );
  const rows = nonEmpty.slice(1).map((cells) =>
    Object.fromEntries(
      headers.map((header, index) => [header, String(cells[index] ?? '').trim()]),
    ),
  );
  return { headers, rows };
}

function csvCell(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text)
    ? `"${text.replaceAll('"', '""')}"`
    : text;
}

function serializeCsv(headers, rows) {
  return `${[
    headers,
    ...rows.map((row) => headers.map((header) => row[header] ?? '')),
  ]
    .map((line) => line.map(csvCell).join(','))
    .join('\n')}\n`;
}

function cell(row, names) {
  const entries = Object.entries(row);
  for (const name of names) {
    const wanted = normalizedHeader(name);
    const match = entries.find(([key]) => normalizedHeader(key) === wanted);
    if (match) return match[1];
  }
  return '';
}

function toNumber(value) {
  const parsed = Number.parseFloat(
    String(value ?? '')
      .replaceAll(',', '')
      .replace('%', '')
      .trim(),
  );
  return Number.isFinite(parsed) ? parsed : 0;
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function identifyRole(headers) {
  const first = normalizedHeader(headers[0]);
  if (['日期', 'date'].includes(first)) return 'chart';
  if (['热门查询', 'topqueries'].includes(first)) return 'queries';
  if (['排名靠前的网页', 'toppages'].includes(first)) return 'pages';
  if (['国家/地区', 'country'].includes(first)) return 'countries';
  if (['设备', 'device'].includes(first)) return 'devices';
  if (['过滤器', 'filters'].includes(first)) return 'filters';
  return null;
}

function decodeZipEntries(buffer) {
  const entries = unzipSync(new Uint8Array(buffer));
  const decoder = new TextDecoder('utf-8', { fatal: true });
  return Object.entries(entries)
    .filter(([name]) => name.toLowerCase().endsWith('.csv'))
    .map(([name, bytes]) => ({ name, text: decoder.decode(bytes) }));
}

async function readExportEntries(inputPath) {
  const resolved = path.resolve(inputPath);
  const details = await stat(resolved);
  if (details.isDirectory()) {
    const names = (await readdir(resolved))
      .filter((name) => name.toLowerCase().endsWith('.csv'))
      .sort();
    return Promise.all(
      names.map(async (name) => ({
        name,
        text: await readFile(path.join(resolved, name), 'utf8'),
      })),
    );
  }
  if (!details.isFile() || path.extname(resolved).toLowerCase() !== '.zip') {
    throw new Error(`Search Console export must be a ZIP or directory: ${resolved}`);
  }
  return decodeZipEntries(await readFile(resolved));
}

export async function loadSearchConsoleExport(inputPath) {
  const files = {};
  for (const entry of await readExportEntries(inputPath)) {
    const parsed = parseCsv(entry.text);
    const role = identifyRole(parsed.headers);
    if (!role) continue;
    if (files[role]) {
      throw new Error(`Search Console export has more than one ${role} CSV.`);
    }
    files[role] = {
      name: entry.name,
      text: entry.text.endsWith('\n') ? entry.text : `${entry.text}\n`,
      ...parsed,
    };
  }
  return files;
}

function normalizeRoute(value) {
  const raw = String(value ?? '').trim().replace(/^[+*]/, '');
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (!['dmvcn.com', 'www.dmvcn.com'].includes(url.hostname)) return '';
      return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    } catch {
      return '';
    }
  }
  const route = raw.startsWith('/') ? raw : `/${raw}`;
  return route.endsWith('/') ? route : `${route}/`;
}

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''))) return false;
  return !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`));
}

function inferObservedAt(inputPath) {
  return path.basename(path.resolve(inputPath)).match(/\b(\d{4}-\d{2}-\d{2})\b/)?.[1] ?? '';
}

function getWindowLabel(filters) {
  const dateRow = filters.rows.find((row) =>
    ['日期', 'date'].includes(
      normalizedHeader(cell(row, ['过滤器', 'filters'])),
    ),
  );
  return dateRow ? cell(dateRow, ['值', 'value']) : '';
}

function exportFilterNames(filters) {
  return filters.rows
    .map((row) =>
      normalizedHeader(cell(row, ['过滤器', 'filters'])),
    )
    .filter(Boolean);
}

function buildPropertyTotals(chartRows) {
  const clicks = chartRows.reduce(
    (sum, row) => sum + toNumber(cell(row, ['点击次数', 'clicks'])),
    0,
  );
  const impressions = chartRows.reduce(
    (sum, row) => sum + toNumber(cell(row, ['展示', 'impressions'])),
    0,
  );
  const positionedRows = chartRows.filter(
    (row) =>
      toNumber(cell(row, ['展示', 'impressions'])) > 0 &&
      String(cell(row, ['排名', 'position'])).trim() !== '',
  );
  const positionedImpressions = positionedRows.reduce(
    (sum, row) => sum + toNumber(cell(row, ['展示', 'impressions'])),
    0,
  );
  const weightedPosition = positionedRows.reduce(
    (sum, row) =>
      sum +
      toNumber(cell(row, ['展示', 'impressions'])) *
        toNumber(cell(row, ['排名', 'position'])),
    0,
  );
  return {
    clicks: Math.round(clicks),
    impressions: Math.round(impressions),
    ctr: impressions > 0 ? round((clicks / impressions) * 100) : 0,
    position:
      positionedImpressions > 0
        ? round(weightedPosition / positionedImpressions)
        : 0,
  };
}

function ensureTotalsMatch(label, rows, propertyTotals) {
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  if (
    clicks !== propertyTotals.clicks ||
    impressions !== propertyTotals.impressions
  ) {
    throw new Error(
      `${label} totals ${clicks}/${impressions} do not match property totals ${propertyTotals.clicks}/${propertyTotals.impressions}.`,
    );
  }
}

async function previousCountryCodes(segmentPath) {
  const codes = new Map(COUNTRY_CODES);
  try {
    const previous = JSON.parse(await readFile(segmentPath, 'utf8'));
    for (const country of previous.countries ?? []) {
      if (country.label && country.code) codes.set(country.label, country.code);
    }
  } catch {
    // The first import relies on the built-in country map.
  }
  return codes;
}

async function readSiteRoutes(projectRoot) {
  const inventoryPath = path.join(projectRoot, 'reports', 'eeat-inventory.json');
  const inventory = JSON.parse(await readFile(inventoryPath, 'utf8'));
  return new Set(
    (inventory.pages ?? [])
      .filter((page) => page.indexable)
      .map((page) => page.route),
  );
}

function defaultClassification(query) {
  if (!/\p{Script=Han}/u.test(query)) return 'observe-non-target';
  if (/(精神|病史|痊愈|复职|吊销|暂停|债务|承担债务|法律责任)/.test(query)) {
    return 'human-review-untriaged';
  }
  return 'unreviewed-intent';
}

function assertClassification(classification, route) {
  if (!ALLOWED_QUERY_CLASSIFICATIONS.has(classification)) {
    throw new Error(
      `${route}: unsupported query classification "${classification}".`,
    );
  }
}

function pageFilterRoute(exportFiles) {
  const filters = exportFiles.filters;
  if (!filters) return '';
  const pageRow = filters.rows.find((row) =>
    ['网页', 'page'].includes(
      normalizedHeader(cell(row, ['过滤器', 'filters'])),
    ),
  );
  return pageRow
    ? normalizeRoute(cell(pageRow, ['值', 'value']))
    : '';
}

async function readOptionalCsv(csvPath) {
  if (!csvPath) return [];
  return parseCsv(await readFile(path.resolve(csvPath), 'utf8')).rows;
}

function classificationSummary(rows) {
  return {
    target: rows.filter(isTargetQuerySignal).length,
    routingReview: rows.filter(isRoutingReviewQuerySignal).length,
    unreviewed: rows.filter((row) =>
      isUnreviewedClassification(row.classification),
    ).length,
    humanReview: rows.filter((row) =>
      isHumanReviewClassification(row.classification),
    ).length,
    observed: rows.filter(
      (row) =>
        !isTargetQuerySignal(row) &&
        !isRoutingReviewQuerySignal(row) &&
        !isUnreviewedClassification(row.classification) &&
        !isHumanReviewClassification(row.classification),
    ).length,
  };
}

export async function importSearchConsoleExport({
  projectRoot,
  outputRoot = projectRoot,
  globalExportPath,
  pageManifestPath,
  classificationCsvPath,
  observedAt: requestedObservedAt,
  property = 'sc-domain:dmvcn.com',
  windowDays: requestedWindowDays,
  dryRun = false,
}) {
  if (!projectRoot || !globalExportPath) {
    throw new Error('projectRoot and globalExportPath are required.');
  }
  const globalFiles = await loadSearchConsoleExport(globalExportPath);
  const missingRoles = REQUIRED_GLOBAL_ROLES.filter((role) => !globalFiles[role]);
  if (missingRoles.length) {
    throw new Error(
      `Global Search Console export is missing: ${missingRoles.join(', ')}.`,
    );
  }
  const unexpectedGlobalFilters = exportFilterNames(globalFiles.filters).filter(
    (name) => !['搜索类型', 'searchtype', '日期', 'date'].includes(name),
  );
  if (unexpectedGlobalFilters.length) {
    throw new Error(
      `Global Search Console export contains dimension filters: ${[
        ...new Set(unexpectedGlobalFilters),
      ].join(', ')}.`,
    );
  }
  for (const row of globalFiles.pages.rows) {
    const pageValue = cell(row, ['排名靠前的网页', 'top pages', 'page']);
    if (!normalizeRoute(pageValue)) {
      throw new Error(
        'Global page export contains a URL outside dmvcn.com or an invalid route.',
      );
    }
  }

  const observedAt =
    requestedObservedAt || inferObservedAt(globalExportPath);
  if (!isCalendarDate(observedAt)) {
    throw new Error(
      'observedAt is required as YYYY-MM-DD when it cannot be inferred from the export name.',
    );
  }

  const chartDates = globalFiles.chart.rows
    .map((row) => cell(row, ['日期', 'date']))
    .filter(isCalendarDate)
    .sort();
  if (!chartDates.length) throw new Error('Chart CSV has no valid dates.');
  if (chartDates.at(-1) > observedAt) {
    throw new Error('Chart data cannot be newer than the export observation date.');
  }

  const windowLabel = getWindowLabel(globalFiles.filters);
  const importedWindow = resolveImportedWindow({
    label: windowLabel,
    requestedDays: requestedWindowDays,
    chartDates,
  });
  const windowDays = importedWindow.days;

  const reportsDir = path.join(outputRoot, 'reports');
  const privateDir = path.join(reportsDir, 'private');
  const segmentPath = path.join(privateDir, 'search-console-segments.json');
  const countryCodes = await previousCountryCodes(segmentPath);
  const propertyTotals = buildPropertyTotals(globalFiles.chart.rows);
  const missingCountryLabels = [
    ...new Set(
      globalFiles.countries.rows
        .map((row) => cell(row, ['国家/地区', 'country']))
        .filter((label) => label && !countryCodes.has(label)),
    ),
  ];
  if (missingCountryLabels.length) {
    throw new Error(
      `Country codes are not registered for: ${missingCountryLabels
        .map((label) => `"${label}"`)
        .join(', ')}; add them before importing.`,
    );
  }
  const countries = globalFiles.countries.rows.map((row) => {
    const label = cell(row, ['国家/地区', 'country']);
    const code = countryCodes.get(label);
    return {
      code,
      label,
      clicks: Math.round(toNumber(cell(row, ['点击次数', 'clicks']))),
      impressions: Math.round(toNumber(cell(row, ['展示', 'impressions']))),
    };
  });
  const devices = globalFiles.devices.rows.map((row) => {
    const label = cell(row, ['设备', 'device']);
    const code = DEVICE_CODES.get(label);
    if (!code) throw new Error(`Device code is not registered for "${label}".`);
    return {
      code,
      label,
      clicks: Math.round(toNumber(cell(row, ['点击次数', 'clicks']))),
      impressions: Math.round(toNumber(cell(row, ['展示', 'impressions']))),
    };
  });
  ensureTotalsMatch('Country', countries, propertyTotals);
  ensureTotalsMatch('Device', devices, propertyTotals);

  const segments = {
    observedAt,
    property,
    source: 'Google Search Console Performance',
    window: {
      label: windowLabel || `${windowDays} 天`,
      days: windowDays,
      dataShownFrom: chartDates[0],
      dataShownThrough: chartDates.at(-1),
      timeZone: 'Asia/Shanghai',
      verification: importedWindow.verification,
    },
    propertyTotals,
    countries,
    devices,
  };

  const signalPath = path.join(
    privateDir,
    'search-console-page-query-signals.csv',
  );
  let existingSignals = [];
  try {
    existingSignals = parseCsv(await readFile(signalPath, 'utf8')).rows;
  } catch {
    // A first import can start with an empty page-query registry.
  }
  for (const signal of existingSignals) {
    assertClassification(signal.classification, signal.route || '(missing route)');
  }

  const manifestRows = await readOptionalCsv(pageManifestPath);
  const overrideRows = await readOptionalCsv(classificationCsvPath);
  const overrides = new Map();
  for (const row of overrideRows) {
    const route = normalizeRoute(cell(row, ['route', 'page', 'url']));
    const query = cell(row, ['query', '热门查询']);
    const classification = cell(row, ['classification', 'class']);
    if (!route || !query || !classification) {
      throw new Error('Classification CSV requires route, query, and classification.');
    }
    assertClassification(classification, route);
    overrides.set(`${route}\u0000${query}`, classification);
  }

  const siteRoutes = manifestRows.length
    ? await readSiteRoutes(projectRoot)
    : new Set();
  const manifestBase = pageManifestPath
    ? path.dirname(path.resolve(pageManifestPath))
    : projectRoot;
  const importedRoutes = new Set();
  const refreshedSignals = [];
  for (const manifestRow of manifestRows) {
    const route = normalizeRoute(cell(manifestRow, ['route', 'page', 'url']));
    const exportValue = cell(manifestRow, ['export', 'path', 'file']);
    if (!route || !exportValue) {
      throw new Error('Page manifest requires route and export columns.');
    }
    if (!siteRoutes.has(route)) {
      throw new Error(`${route}: page export route is not currently indexable.`);
    }
    if (importedRoutes.has(route)) {
      throw new Error(`${route}: duplicate route in page manifest.`);
    }
    importedRoutes.add(route);

    const exportPath = path.isAbsolute(exportValue)
      ? exportValue
      : path.resolve(manifestBase, exportValue);
    const exportFiles = await loadSearchConsoleExport(exportPath);
    if (!exportFiles.queries) {
      throw new Error(`${route}: page export has no query CSV.`);
    }
    const unexpectedPageFilters = exportFiles.filters
      ? exportFilterNames(exportFiles.filters).filter(
          (name) =>
            ![
              '搜索类型',
              'searchtype',
              '日期',
              'date',
              '网页',
              'page',
            ].includes(name),
        )
      : [];
    if (unexpectedPageFilters.length) {
      throw new Error(
        `${route}: page export contains additional dimension filters.`,
      );
    }
    const filteredRoute = pageFilterRoute(exportFiles);
    if (!filteredRoute) {
      throw new Error(`${route}: page export has no page filter.`);
    }
    if (filteredRoute !== route) {
      throw new Error(
        `${route}: page export filter belongs to ${filteredRoute}.`,
      );
    }

    const previousByQuery = new Map(
      existingSignals
        .filter((signal) => normalizeRoute(signal.route) === route)
        .map((signal) => [signal.query, signal.classification]),
    );
    for (const queryRow of exportFiles.queries.rows) {
      const query = cell(queryRow, ['热门查询', 'top queries', 'query']);
      if (!query) continue;
      const classification =
        overrides.get(`${route}\u0000${query}`) ||
        previousByQuery.get(query) ||
        defaultClassification(query);
      assertClassification(classification, route);
      refreshedSignals.push({
        route,
        query,
        clicks: Math.round(toNumber(cell(queryRow, ['点击次数', 'clicks']))),
        impressions: Math.round(
          toNumber(cell(queryRow, ['展示', 'impressions'])),
        ),
        position: toNumber(cell(queryRow, ['排名', 'position'])),
        classification,
        observedAt,
      });
    }
  }

  const mergedSignals = manifestRows.length
    ? [
        ...existingSignals
          .filter(
            (signal) => !importedRoutes.has(normalizeRoute(signal.route)),
          )
          .map((signal) => ({
            route: normalizeRoute(signal.route),
            query: signal.query,
            clicks: toNumber(signal.clicks),
            impressions: toNumber(signal.impressions),
            position: toNumber(signal.position),
            classification: signal.classification,
            observedAt: signal.observedAt,
          })),
        ...refreshedSignals,
      ]
    : existingSignals;

  if (!dryRun) {
    await mkdir(privateDir, { recursive: true });
    await writeFile(
      path.join(reportsDir, 'search-console-export.csv'),
      globalFiles.pages.text,
      'utf8',
    );
    await writeFile(
      path.join(privateDir, 'search-console-query-export.csv'),
      globalFiles.queries.text,
      'utf8',
    );
    await writeFile(segmentPath, `${JSON.stringify(segments, null, 2)}\n`);
    if (manifestRows.length) {
      await writeFile(
        signalPath,
        serializeCsv(
          [
            'route',
            'query',
            'clicks',
            'impressions',
            'position',
            'classification',
            'observedAt',
          ],
          mergedSignals,
        ),
        'utf8',
      );
    }
  }

  return {
    observedAt,
    property,
    window: segments.window,
    propertyTotals,
    pageRows: globalFiles.pages.rows.length,
    queryRows: globalFiles.queries.rows.length,
    countries: countries.length,
    devices: devices.length,
    pageExports: manifestRows.length,
    refreshedPageSignals: refreshedSignals.length,
    retainedPageSignals: mergedSignals.length - refreshedSignals.length,
    classifications: classificationSummary(refreshedSignals),
    dryRun,
  };
}
