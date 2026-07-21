import { states, topics } from '../data/content.ts';
import { practiceTests } from '../data/practice-tests.ts';
import { isRouteIndexable } from '../data/publication-gate.ts';

const DIRECTORY_ROUTES = [
  '/directories/',
  '/directories/appointments/',
  '/directories/costs-timing/',
  '/directories/deadlines/',
  '/directories/dmv-services/',
  '/directories/document-rules/',
  '/directories/foreign-license/',
  '/directories/identity-ssn/',
  '/directories/language-access/',
  '/directories/new-residents/',
  '/directories/real-id/',
  '/directories/service-paths/',
  '/directories/tests-permits/',
];

const STATIC_ROUTES = [
  '/',
  '/about/',
  '/ai-policy/',
  '/authors/editorial-team/',
  '/contact/',
  '/corrections/',
  '/editorial-policy/',
  '/practice-tests/',
  '/privacy/',
  '/quality/',
  '/sources/',
  '/states/',
  '/terms/',
  '/topics/',
  '/updates/',
];

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET({ site }: { site: URL }) {
  const base = site ?? new URL('https://dmv-cn-guide.example.com');
  const routes = [
    ...STATIC_ROUTES,
    ...DIRECTORY_ROUTES,
    ...practiceTests.map((test) => `/practice-tests/${test.slug}/`),
    ...states.flatMap((state) => [`/states/${state.id}/`, `/states/${state.id}/real-id/`]),
    ...topics.map((topic) => `/topics/${topic.slug}/`),
  ];
  const uniqueRoutes = [...new Set(routes)].filter(isRouteIndexable).sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });
  const entries = uniqueRoutes
    .map((route) => `  <url><loc>${escapeXml(new URL(route, base).toString())}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
