/**
 * Writes public/sitemap.xml from static routes + published blog posts in ../../backend/content.json.
 * Override base URL: SITEMAP_BASE_URL=https://example.com npm run generate:sitemap
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoBackendContent = join(__dirname, '..', '..', 'backend', 'content.json');

const BASE =
  (process.env.SITEMAP_BASE_URL || 'https://rourepersonaltraining.nl').replace(/\/$/, '');

const STATIC_PATHS = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'about-us', changefreq: 'monthly', priority: '0.9' },
  { path: 'methods', changefreq: 'monthly', priority: '0.9' },
  { path: 'blog', changefreq: 'weekly', priority: '0.9' },
  { path: 'programs', changefreq: 'monthly', priority: '0.9' },
  { path: 'free-intake', changefreq: 'monthly', priority: '0.9' },
  { path: 'programs/weight-loss-muscle-mass', changefreq: 'monthly', priority: '0.8' },
  { path: 'programs/peak-performance', changefreq: 'monthly', priority: '0.8' },
  { path: 'programs/vitality-longevity', changefreq: 'monthly', priority: '0.8' },
  { path: 'programs/prenatal-postpartum', changefreq: 'monthly', priority: '0.8' },
];

function toW3cDate(iso) {
  if (!iso || typeof iso !== 'string') return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function loadPublishedPosts() {
  if (!existsSync(repoBackendContent)) {
    console.warn(`generate-sitemap: missing ${repoBackendContent} — blog URLs omitted`);
    return [];
  }
  try {
    const raw = readFileSync(repoBackendContent, 'utf8');
    const data = JSON.parse(raw);
    const posts = data?.blog?.posts;
    if (!Array.isArray(posts)) return [];
    return posts
      .filter((p) => p?.status === 'published' && typeof p.slug === 'string' && p.slug.length)
      .map((p) => ({
        path: `blog/${p.slug}`,
        lastmod: toW3cDate(p.updatedAt || p.publishedAt),
        changefreq: 'monthly',
        priority: '0.7',
      }));
  } catch (e) {
    console.warn('generate-sitemap: failed to read content.json', e?.message || e);
    return [];
  }
}

function siteUpdatedAt() {
  if (!existsSync(repoBackendContent)) return null;
  try {
    const data = JSON.parse(readFileSync(repoBackendContent, 'utf8'));
    return toW3cDate(data?.meta?.updatedAt);
  } catch {
    return null;
  }
}

const siteLastmod = siteUpdatedAt();
const blogEntries = loadPublishedPosts();

const urls = [
  ...STATIC_PATHS.map((s) => ({
    loc: s.path ? `${BASE}/${s.path}` : `${BASE}/`,
    lastmod: siteLastmod,
    changefreq: s.changefreq,
    priority: s.priority,
  })),
  ...blogEntries.map((b) => ({
    loc: `${BASE}/${b.path}`,
    lastmod: b.lastmod,
    changefreq: b.changefreq,
    priority: b.priority,
  })),
];

const body = urls
  .map((u) => {
    const parts = [
      '    <url>',
      `      <loc>${escapeXml(u.loc)}</loc>`,
      u.lastmod ? `      <lastmod>${u.lastmod}</lastmod>` : '',
      u.changefreq ? `      <changefreq>${u.changefreq}</changefreq>` : '',
      u.priority ? `      <priority>${u.priority}</priority>` : '',
      '    </url>',
    ].filter(Boolean);
    return parts.join('\n');
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`generate-sitemap: wrote ${urls.length} URLs → public/sitemap.xml (${BASE})`);
