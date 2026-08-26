import {
  INDEXNOW_ENDPOINTS,
  INDEXNOW_KEY,
  INDEXNOW_KEY_FILE,
  INDEXNOW_ORIGIN,
} from './lib/indexnow-config.mjs';

const origin = new URL(process.env.INDEXNOW_ORIGIN ?? INDEXNOW_ORIGIN);
const sitemapUrl = new URL('/sitemap.xml', origin);
const keyLocation = new URL(`/${INDEXNOW_KEY_FILE}`, origin);
const dryRun = process.argv.includes('--dry-run');

async function getText(url, label) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'DMVCN-IndexNow/1.0' },
  });
  if (!response.ok) {
    throw new Error(`${label} returned HTTP ${response.status}: ${url}`);
  }
  return response.text();
}

const hostedKey = (await getText(keyLocation, 'IndexNow key file')).trim();
if (hostedKey !== INDEXNOW_KEY) {
  throw new Error(`IndexNow key file does not match ${INDEXNOW_KEY_FILE}.`);
}

const sitemap = await getText(sitemapUrl, 'Production sitemap');
const urlList = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const uniqueUrls = [...new Set(urlList)];

if (!uniqueUrls.length) throw new Error('Production sitemap does not contain any URLs.');
if (uniqueUrls.length > 10_000) throw new Error('IndexNow accepts at most 10,000 URLs per request.');
if (uniqueUrls.some((url) => new URL(url).hostname !== origin.hostname)) {
  throw new Error('Production sitemap contains a URL outside the configured IndexNow host.');
}

if (dryRun) {
  console.log(`IndexNow dry run passed for ${uniqueUrls.length} URLs.`);
  console.log(`Key location: ${keyLocation}`);
  process.exit(0);
}

const payload = JSON.stringify({
  host: origin.hostname,
  key: INDEXNOW_KEY,
  keyLocation: keyLocation.toString(),
  urlList: uniqueUrls,
});
let accepted = null;
let lastNetworkError = null;

for (const endpoint of INDEXNOW_ENDPOINTS) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'user-agent': 'DMVCN-IndexNow/1.0',
        },
        body: payload,
        signal: AbortSignal.timeout(20_000),
      });

      if ([200, 202].includes(response.status)) {
        accepted = { endpoint, status: response.status };
        break;
      }

      const details = (await response.text()).trim();
      if (response.status < 500) {
        throw new Error(
          `IndexNow rejected the request with HTTP ${response.status}${details ? `: ${details}` : ''}`,
        );
      }
      lastNetworkError = new Error(`IndexNow endpoint returned HTTP ${response.status}: ${endpoint}`);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('IndexNow rejected')) throw error;
      lastNetworkError = error;
    }

    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
  }
  if (accepted) break;
}

if (!accepted) {
  throw lastNetworkError ?? new Error('No IndexNow endpoint accepted the request.');
}

console.log(
  `Submitted ${uniqueUrls.length} URLs to IndexNow via ${accepted.endpoint} (HTTP ${accepted.status}).`,
);
console.log(`Key location: ${keyLocation}`);
