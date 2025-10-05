import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  author?: string;
  children?: React.ReactNode;
}

export function SEO({
  title = 'Iconza',
  description = 'A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations.',
  image = '/iconza-og.png',
  url = 'https://iconza.vercel.app',
  type = 'website',
  canonical,
  author = 'Iconza',
  children,
}: SEOProps) {
  const siteTitle = title.toLowerCase().includes('iconza') ? title : `${title} | Iconza`;
  const logoUrl = `https://iconza.vercel.app/iconza.png`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://iconza.vercel.app${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Iconza" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://iconza.vercel.app${image}`} />

      {/* Browser-specific metadata */}
      <meta name="theme-color" content="#94c748" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Search Engine Optimization */}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* ✅ Favicon */}
      <link rel="icon" href="/iconza.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Microsoft Edge */}
      <meta name="msapplication-TileColor" content="#94c748" />
      <meta name="msapplication-TileImage" content="/iconza.png" />

      {/* Chrome for Android */}
      <meta name="mobile-web-app-capable" content="yes" />

      {/* ✅ Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Iconza",
          url: "https://iconza.vercel.app",
          logo: logoUrl,
        })}
      </script>

      {children}
    </Helmet>
  );
}
