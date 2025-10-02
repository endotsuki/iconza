import { RequestHandler } from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

interface RouteConfig {
  url: string;
  priority: number;
  changefreq?: string;
}

const routes: RouteConfig[] = [
  { url: '/', priority: 1.0, changefreq: 'weekly' },
  { url: '/icons', priority: 0.8, changefreq: 'daily' },
  { url: '/docs', priority: 0.7, changefreq: 'weekly' },
  { url: '/contact', priority: 0.7, changefreq: 'monthly' },
];

export const handleSitemap: RequestHandler = async (req, res) => {
  try {
    const sitemapStream = new SitemapStream({ 
      hostname: 'https://iconza.vercel.app'
    });

    const links = routes.map(route => ({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: new Date().toISOString()
    }));

    // Generate sitemap from routes
    const sitemap = await streamToPromise(
      Readable.from(links).pipe(sitemapStream)
    );

    // Set headers and send response
    res.header('Content-Type', 'application/xml');
    res.header('Content-Length', Buffer.byteLength(sitemap.toString()).toString());
    res.send(sitemap.toString());
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).end();
  }
};