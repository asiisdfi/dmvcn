export function GET({ site }: { site: URL }) {
  const base = site?.toString().replace(/\/$/, '') || 'https://dmv-cn-guide.example.com';
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
