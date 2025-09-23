import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  canonical?: string;
  keywords?: string;
  author?: string;
  children?: React.ReactNode;
}

export function SEO({
  title = 'iconza',
  description = 'A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations.',
  image = '/iconza.avif',
  url = 'https://iconza.vercel.app',
  type = 'website',
  canonical,
  keywords = 'icon library, react icons, developer icons, brand icons, iconza, svg icons, website icons, animated icons, accessible icons',
  author = 'iconza',
  children,
}: SEOProps) {
  const siteTitle = title.includes('iconza') ? title : `${title} | iconza`;

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
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="iconza" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Browser-specific metadata */}
      <meta name="theme-color" content="#94c748" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Search Engine Optimization */}
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Chrome, Firefox, Edge */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <link rel="icon" type="image/avif" href="/iconza.avif" media="(prefers-color-scheme: dark)" />
      
      {/* Microsoft Edge */}
      <meta name="msapplication-TileColor" content="#94c748" />
      <meta name="msapplication-TileImage" content="/iconza.avif" />

      {/* Safari */}
      <link rel="apple-touch-icon" href="/iconza.avif" />
      <meta name="apple-mobile-web-app-title" content="iconza" />

      {/* Chrome for Android */}
      <meta name="mobile-web-app-capable" content="yes" />

      {children}
    </Helmet>
  );
}