# 部署清单

本站是 Astro 静态站点。生产部署只需要 Node.js 22、构建命令和两个公开环境变量，不需要数据库或服务器运行时。

## 部署前需要准备

- 一个正式域名，或托管平台提供的稳定临时域名。
- 一个会持续收件的公开邮箱，建议使用域名邮箱。
- Vercel、Cloudflare Pages、Netlify 或其他静态托管账号。

## 环境变量

在托管平台的 Production 环境中设置：

```text
PUBLIC_SITE_URL=https://www.your-domain.com
PUBLIC_CONTACT_EMAIL=contact@your-domain.com
```

`PUBLIC_SITE_URL` 只能填写 HTTPS 站点根地址，不能附加目录、查询参数或 `#`。如果同时使用 `www` 和裸域名，应选定一个 canonical 主域名，并把另一个重定向到主域名。

## 构建设置

```text
Node.js: 22 或更高
Install command: npm ci
Build command: npm run build
Output directory: dist
```

项目不需要服务端函数。Astro 会在构建时生成全部 HTML、`robots.txt` 和 sitemap。

## 上线校验

在真实生产变量下执行：

```sh
PUBLIC_SITE_URL=https://www.your-domain.com \
PUBLIC_CONTACT_EMAIL=contact@your-domain.com \
npm run verify:launch
```

该命令会检查内容、构建、全站内部链接与资源、SEO、首页 canonical、Contact 邮箱、robots 和 sitemap。正式发布前可另跑 `npm run audit:links`；政府站点的 `403`、`429` 和超时会列为 `watch`，只有 `fail` 是明确硬失败。

## 首次发布后

1. 打开首页、Contact、Privacy、一个州页、一个 REAL ID 页和一个专题页。
2. 确认 `https://你的域名/sitemap.xml` 和 `https://你的域名/robots.txt` 可以访问。
3. 在 Google Search Console 验证域名并提交 `sitemap.xml`。
4. 先观察收录和查询词，再决定下一批内容。
5. Google Analytics 和 AdSense 当前保持关闭；接入前应同时完成脚本、隐私披露和适用的同意机制。

## 当前不能预填的项目

- Search Console 所有权验证记录由 Google 在创建资源时生成。
- GA4 Measurement ID 由 Analytics 资源生成。
- AdSense publisher / client ID 由 AdSense 账号生成。
- DNS 记录由所选托管平台和域名服务商决定。

这些值不应使用占位符发布。取得真实值后再接入对应服务。
