import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = path.resolve(
  process.env.PERFORMANCE_DIST_DIR ?? path.join(projectRoot, 'dist'),
);
const cssPath = path.resolve(
  process.env.PERFORMANCE_CSS_PATH ??
    path.join(projectRoot, 'src', 'styles', 'global.css'),
);
const budgets = {
  headerLogoBytes: 8 * 1024,
  touchIconBytes: 12 * 1024,
  cssFileBytes: 60 * 1024,
  javascriptFileBytes: 20 * 1024,
  javascriptTotalBytes: 100 * 1024,
  indexableHtmlBytes: 600 * 1024,
  noindexHtmlBytes: 1100 * 1024,
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(filePath));
    if (entry.isFile()) files.push(filePath);
  }
  return files;
}

function hasAttribute(tag, attribute) {
  return new RegExp(`\\s${attribute}(?:\\s*=|\\s|>)`, 'i').test(tag);
}

function colorChannel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((value) => parseInt(value, 16));
  if (!channels || channels.length !== 3) return null;
  const [red, green, blue] = channels.map(colorChannel);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  if (foregroundLuminance === null || backgroundLuminance === null) return null;
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

const errors = [];
let allFiles;
let cssSource;
try {
  [allFiles, cssSource] = await Promise.all([
    walk(distDir),
    readFile(cssPath, 'utf8'),
  ]);
} catch {
  console.error('Missing build output or global stylesheet. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = allFiles.filter((filePath) => filePath.endsWith('.html'));
const cssFiles = allFiles.filter((filePath) => filePath.endsWith('.css'));
const javascriptFiles = allFiles.filter((filePath) => filePath.endsWith('.js'));
const headerLogoPath = path.join(distDir, 'assets', 'dmvcn-mark-72.png');
const touchIconPath = path.join(distDir, 'assets', 'dmvcn-touch-icon-v2.png');
const assetStats = await Promise.all([
  stat(headerLogoPath).catch(() => null),
  stat(touchIconPath).catch(() => null),
]);
const [headerLogoStat, touchIconStat] = assetStats;

if (!headerLogoStat) {
  errors.push('Missing optimized 72px header logo.');
} else if (headerLogoStat.size > budgets.headerLogoBytes) {
  errors.push(
    `Header logo is ${headerLogoStat.size} bytes; budget is ${budgets.headerLogoBytes}.`,
  );
}
if (!touchIconStat) {
  errors.push('Missing optimized Apple touch icon.');
} else if (touchIconStat.size > budgets.touchIconBytes) {
  errors.push(
    `Touch icon is ${touchIconStat.size} bytes; budget is ${budgets.touchIconBytes}.`,
  );
}

let indexablePages = 0;
let noindexPages = 0;
let utilityPages = 0;
let imageElements = 0;
let largestIndexableHtml = { route: '', bytes: 0 };
let largestNoindexHtml = { route: '', bytes: 0 };
for (const filePath of htmlFiles) {
  const html = await readFile(filePath, 'utf8');
  const route = `/${path.relative(distDir, filePath).replace(/index\.html$/, '').replace(/\\/g, '/')}`;
  const bytes = Buffer.byteLength(html);
  const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  const utility = route === '/404.html';
  const budget = noindex || utility
    ? budgets.noindexHtmlBytes
    : budgets.indexableHtmlBytes;
  if (utility) {
    utilityPages += 1;
  } else if (noindex) {
    noindexPages += 1;
    if (bytes > largestNoindexHtml.bytes) largestNoindexHtml = { route, bytes };
  } else {
    indexablePages += 1;
    if (bytes > largestIndexableHtml.bytes) largestIndexableHtml = { route, bytes };
  }
  if (bytes > budget) {
    errors.push(
      `${route}: ${bytes} bytes of HTML exceeds the ${noindex || utility ? 'non-indexable' : 'indexable'} budget of ${budget}.`,
    );
  }

  if (/<(?:img|link)\b[^>]*\/assets\/dmvcn-mark\.png/i.test(html)) {
    errors.push(`${route}: downloads the 512px source logo in visible page chrome.`);
  }
  if (!html.includes('rel="apple-touch-icon" sizes="180x180" href="/assets/dmvcn-touch-icon-v2.png"')) {
    errors.push(`${route}: does not use the optimized touch icon.`);
  }
  if (!html.includes('class="brand-mark" src="/assets/dmvcn-mark-72.png"')) {
    errors.push(`${route}: does not use the optimized header logo.`);
  }
  if (/<a\s+class="brand"[^>]*aria-label=/i.test(html)) {
    errors.push(`${route}: brand link overrides its visible accessible name.`);
  }
  const externalScripts = html.match(/<script\b[^>]*\ssrc="https?:\/\/[^"]+"[^>]*>/gi) ?? [];
  for (const scriptTag of externalScripts) {
    const nonBlocking =
      hasAttribute(scriptTag, 'async') ||
      hasAttribute(scriptTag, 'defer') ||
      /\stype="module"/i.test(scriptTag);
    if (!nonBlocking) {
      errors.push(
        `${route}: contains a render-blocking third-party script: ${scriptTag.slice(0, 120)}`,
      );
    }
  }
  if (/<link\b[^>]*rel="stylesheet"[^>]*href="https?:\/\//i.test(html)) {
    errors.push(`${route}: contains a render-blocking third-party stylesheet.`);
  }

  const imageTags = html.match(/<img\b[^>]*>/gi) ?? [];
  imageElements += imageTags.length;
  for (const imageTag of imageTags) {
    for (const attribute of ['alt', 'width', 'height']) {
      if (!hasAttribute(imageTag, attribute)) {
        errors.push(`${route}: image is missing ${attribute}: ${imageTag.slice(0, 120)}`);
      }
    }
  }
}

let cssTotalBytes = 0;
for (const filePath of cssFiles) {
  const { size } = await stat(filePath);
  cssTotalBytes += size;
  if (size > budgets.cssFileBytes) {
    errors.push(
      `${path.relative(distDir, filePath)} is ${size} bytes; CSS file budget is ${budgets.cssFileBytes}.`,
    );
  }
}

let javascriptTotalBytes = 0;
for (const filePath of javascriptFiles) {
  const { size } = await stat(filePath);
  javascriptTotalBytes += size;
  if (size > budgets.javascriptFileBytes) {
    errors.push(
      `${path.relative(distDir, filePath)} is ${size} bytes; JavaScript file budget is ${budgets.javascriptFileBytes}.`,
    );
  }
}
if (javascriptTotalBytes > budgets.javascriptTotalBytes) {
  errors.push(
    `Built JavaScript totals ${javascriptTotalBytes} bytes; budget is ${budgets.javascriptTotalBytes}.`,
  );
}

const red = cssSource.match(/--red:\s*(#[a-f\d]{6})/i)?.[1];
const contrastBackgrounds = ['#f1f4f2', '#f3f6f4', '#edf6f1'];
if (!red) {
  errors.push('Unable to find the eyebrow foreground color.');
} else {
  for (const background of contrastBackgrounds) {
    const ratio = contrastRatio(red, background);
    if (ratio === null || ratio < 4.5) {
      errors.push(
        `Eyebrow contrast is ${ratio?.toFixed(2) ?? 'invalid'}:1 for ${red} on ${background}; minimum is 4.5:1.`,
      );
    }
  }
}

console.log('# Mobile Performance Budget Audit');
console.log('');
console.log(`HTML pages: ${htmlFiles.length} (${indexablePages} indexable, ${noindexPages} noindex, ${utilityPages} utility)`);
console.log(`Images with intrinsic dimensions: ${imageElements}`);
console.log(`Header logo: ${headerLogoStat?.size ?? 0}/${budgets.headerLogoBytes} bytes`);
console.log(`Touch icon: ${touchIconStat?.size ?? 0}/${budgets.touchIconBytes} bytes`);
console.log(`Built CSS: ${cssTotalBytes} bytes across ${cssFiles.length} file(s)`);
console.log(`Built JavaScript: ${javascriptTotalBytes} bytes across ${javascriptFiles.length} file(s)`);
console.log(`Largest indexable HTML: ${largestIndexableHtml.route} (${largestIndexableHtml.bytes} bytes)`);
console.log(`Largest noindex HTML: ${largestNoindexHtml.route} (${largestNoindexHtml.bytes} bytes)`);
console.log(`Eyebrow contrast floor: ${red ?? 'missing'} on three site backgrounds`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('');
  errors.forEach((error) => console.log(`- ${error}`));
  process.exit(1);
}

console.log('');
console.log('Mobile performance budgets passed.');
