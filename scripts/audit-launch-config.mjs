import { access, readFile } from 'node:fs/promises';

const projectRoot = new URL('../', import.meta.url);
const dataFile = new URL('src/data/content.ts', projectRoot);
const configFile = new URL('astro.config.mjs', projectRoot);
const privacyFile = new URL('src/pages/privacy.astro', projectRoot);
const distDir = new URL('dist/', projectRoot);
const errors = [];
const warnings = [];
const notes = [];

async function exists(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

function readEnvSiteUrl() {
  const raw = process.env.PUBLIC_SITE_URL?.trim() ?? '';
  if (!raw) return '';

  try {
    const parsed = new URL(raw);
    const hostname = parsed.hostname.toLowerCase();
    const isPlaceholder =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.test') ||
      hostname.endsWith('.invalid') ||
      hostname.endsWith('.example') ||
      hostname === 'your-domain.com' ||
      hostname.endsWith('.your-domain.com') ||
      /(^|\.)example\.(?:com|net|org)$/.test(hostname);

    if (parsed.protocol !== 'https:') {
      errors.push(`PUBLIC_SITE_URL must use https: ${raw}`);
    }
    if (parsed.username || parsed.password) {
      errors.push('PUBLIC_SITE_URL must not contain a username or password.');
    }
    if (parsed.pathname !== '/' || parsed.search || parsed.hash) {
      errors.push('PUBLIC_SITE_URL must be the site origin only, without a path, query, or fragment.');
    }
    if (isPlaceholder) {
      errors.push(`PUBLIC_SITE_URL must be a real production domain, not ${raw}`);
    }

    return `${parsed.origin}/`;
  } catch {
    errors.push(`PUBLIC_SITE_URL is not a valid URL: ${raw}`);
    return '';
  }
}

function readEnvContactEmail() {
  const email = process.env.PUBLIC_CONTACT_EMAIL?.trim() ?? '';
  if (!email) return '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push(`PUBLIC_CONTACT_EMAIL is not a valid email address: ${email}`);
    return email;
  }

  const domain = email.split('@').at(-1)?.toLowerCase() ?? '';
  const isPlaceholder =
    domain.endsWith('.test') ||
    domain.endsWith('.invalid') ||
    domain.endsWith('.example') ||
    domain === 'your-domain.com' ||
    domain.endsWith('.your-domain.com') ||
    /(^|\.)example\.(?:com|net|org)$/.test(domain);
  if (isPlaceholder) {
    errors.push(`PUBLIC_CONTACT_EMAIL must use a real mailbox, not ${email}`);
  }

  return email;
}

const siteUrl = readEnvSiteUrl();
const contactEmail = readEnvContactEmail();
const dataSource = await readFile(dataFile, 'utf8');
const configSource = await readFile(configFile, 'utf8');
const privacySource = await readFile(privacyFile, 'utf8');

if (!siteUrl) {
  errors.push('PUBLIC_SITE_URL is not set. Set it to the real production domain before launch.');
}

if (!configSource.includes('PUBLIC_SITE_URL')) {
  errors.push('astro.config.mjs is not wired to PUBLIC_SITE_URL.');
}

if (!contactEmail) {
  errors.push('PUBLIC_CONTACT_EMAIL is not set. Set it to a monitored public mailbox before launch.');
}

if (!dataSource.includes('PUBLIC_CONTACT_EMAIL')) {
  errors.push('SITE.contactEmail is not wired to PUBLIC_CONTACT_EMAIL.');
}

if (!(await exists(distDir))) {
  errors.push('dist directory is missing; run npm run build before launch checks.');
} else {
  for (const path of [
    'index.html',
    'contact/index.html',
    'privacy/index.html',
    'authors/editorial-team/index.html',
    'editorial-policy/index.html',
    'corrections/index.html',
    'ai-policy/index.html',
    'updates/index.html',
    'robots.txt',
    'llms.txt',
    'sitemap.xml',
  ]) {
    if (!(await exists(new URL(path, distDir)))) errors.push(`dist/${path} is missing.`);
  }

  if (await exists(new URL('index.html', distDir))) {
    const homepage = await readFile(new URL('index.html', distDir), 'utf8');
    const canonical = homepage.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1] ?? '';
    if (!canonical) {
      errors.push('Built homepage is missing a canonical URL.');
    } else if (siteUrl && canonical !== siteUrl) {
      errors.push(`Built homepage canonical is ${canonical}; expected ${siteUrl}. Rebuild with the production environment.`);
    }
  }

  if (await exists(new URL('contact/index.html', distDir))) {
    const contactPage = await readFile(new URL('contact/index.html', distDir), 'utf8');
    if (contactEmail && !contactPage.includes(`mailto:${contactEmail}`)) {
      errors.push('Built Contact page does not contain PUBLIC_CONTACT_EMAIL. Rebuild with the production environment.');
    }
    if (contactEmail && contactPage.includes('维护邮箱暂未公开')) {
      errors.push('Built Contact page still shows the unconfigured-email fallback.');
    }
  }

  if (await exists(new URL('robots.txt', distDir))) {
    const robots = await readFile(new URL('robots.txt', distDir), 'utf8');
    if (!robots.includes('Sitemap:')) errors.push('robots.txt does not include a Sitemap line.');
    if (siteUrl && !robots.includes(`Sitemap: ${siteUrl}sitemap.xml`)) {
      errors.push('Built robots.txt does not point to the production sitemap entry.');
    }
  }

  if (await exists(new URL('llms.txt', distDir))) {
    const llmsText = await readFile(new URL('llms.txt', distDir), 'utf8');
    const llmsLinks = [...llmsText.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(
      (match) => match[1],
    );

    if (!llmsText.startsWith('# DMV中文办事库\n\n> ')) {
      errors.push('Built llms.txt must start with the site H1 followed by a blockquote summary.');
    }
    if (Buffer.byteLength(llmsText, 'utf8') > 20 * 1024) {
      errors.push('Built llms.txt exceeds the 20 KB concise-index budget.');
    }
    if (llmsLinks.length < 20) {
      errors.push(`Built llms.txt has only ${llmsLinks.length} absolute links; expected at least 20.`);
    }
    if (siteUrl && llmsLinks.some((url) => !url.startsWith(siteUrl))) {
      errors.push('Built llms.txt contains a link outside PUBLIC_SITE_URL.');
    }
    if (siteUrl && !llmsText.includes(`[首页](${siteUrl})`)) {
      errors.push('Built llms.txt does not link to the production homepage.');
    }
    if (llmsText.includes('dmv-cn-guide.example.com')) {
      errors.push('Built llms.txt still contains the placeholder domain.');
    }
  }

  if (await exists(new URL('sitemap.xml', distDir)) && siteUrl) {
    const sitemap = await readFile(new URL('sitemap.xml', distDir), 'utf8');
    const sitemapUrls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );
    if (!/<urlset\b/.test(sitemap) || /<sitemapindex\b/.test(sitemap)) {
      errors.push('Built sitemap.xml must directly contain a URL set.');
    }
    if (sitemap.includes('sitemap-0.xml')) {
      errors.push('Built sitemap.xml still points through sitemap-0.xml.');
    }
    if (sitemapUrls.length < 160) {
      errors.push(`Built sitemap.xml has only ${sitemapUrls.length} page URLs.`);
    }
    if (sitemapUrls.some((url) => !url.startsWith(siteUrl))) {
      errors.push('Built sitemap.xml contains a URL outside PUBLIC_SITE_URL.');
    }
  }
}

if (/本站目前未启用 Google AdSense|启用任何广告或统计服务/.test(privacySource)) {
  notes.push('Privacy mode: Google Analytics and AdSense are intentionally disabled for the initial launch.');
} else {
  warnings.push('Privacy page no longer states the current analytics and advertising status; verify the disclosure manually.');
}

console.log('# Launch Config Audit');
console.log('');
console.log(`PUBLIC_SITE_URL: ${siteUrl || 'not set'}`);
console.log(`PUBLIC_CONTACT_EMAIL: ${contactEmail || 'not set'}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log('');

if (errors.length) {
  console.log('Errors');
  errors.forEach((error) => console.log(`- ${error}`));
  console.log('');
}

if (warnings.length) {
  console.log('Warnings');
  warnings.forEach((warning) => console.log(`- ${warning}`));
  console.log('');
}

if (notes.length) {
  console.log('Notes');
  notes.forEach((note) => console.log(`- ${note}`));
  console.log('');
}

if (!errors.length) {
  console.log('Launch configuration checks passed.');
} else {
  process.exitCode = 1;
}
