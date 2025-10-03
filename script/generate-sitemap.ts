import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { writeFileSync } from 'fs';
import path from 'path';

const routes = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/icons', priority: 0.8, changefreq: 'daily' },
  { url: '/docs', priority: 0.7, changefreq: 'weekly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
];

async function generateSitemap() {
  const sitemapStream = new SitemapStream({
    hostname: 'https://iconza.vercel.app',
  });

  const links = routes.map(route => ({
    ...route,
    lastmod: new Date().toISOString(),
  }));

  const xml = await streamToPromise(Readable.from(links).pipe(sitemapStream));

  const sitemapPath = path.resolve('public', 'sitemap.xml');
  writeFileSync(sitemapPath, xml.toString());

  console.log(`✅ Sitemap written to: ${sitemapPath}`);
}

generateSitemap().catch(err => {
  console.error('❌ Failed to generate sitemap:', err);
  process.exit(1);
});
