// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  site:
    process.env.PUBLIC_SITE_URL ||
    env.PUBLIC_SITE_URL ||
    'https://dmv-cn-guide.example.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
