import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdvancedSEOHead = ({ 
  title, 
  description, 
  keywords = '', 
  canonical = '', 
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData = null,
  lang = 'fr',
  noindex = false,
  priority = '0.5',
  changefreq = 'weekly'
}) => {
  const baseUrl = 'https://alladsmarket.com';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${window.location.pathname}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Générer des métadonnées optimisées
  const optimizedTitle = title.includes('AllAdsMarket') ? title : `${title} | AllAdsMarket`;
  const optimizedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const optimizedKeywords = keywords || 'avis produits, guides d\'achat, comparatifs, tests produits, recommandations, électronique, maison, beauté, sport, technologie';

  return (
    <Helmet>
      {/* Meta Tags de Base Optimisés */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={optimizedKeywords} />
      <meta name="author" content="AllAdsMarket Team" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Language */}
      <html lang={lang} />
      
      {/* Open Graph Optimisé */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="AllAdsMarket" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Card Optimisé */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@AllAdsMarket" />
      <meta name="twitter:creator" content="@AllAdsMarket" />
      
      {/* Meta Tags Avancés */}
      <meta name="theme-color" content="#007bff" />
      <meta name="msapplication-TileColor" content="#007bff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Performance et Sécurité */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Favicon et Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect pour Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Sitemap et Robots */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      <link rel="sitemap" type="application/xml" href="/sitemap-images.xml" />
      <link rel="sitemap" type="application/xml" href="/sitemap-news.xml" />
      
      {/* Meta Tags pour les Moteurs de Recherche */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Meta Tags Géographiques */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      <meta name="geo.position" content="46.227638;2.213749" />
      <meta name="ICBM" content="46.227638, 2.213749" />
      
      {/* Meta Tags de Distribution */}
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />
      <meta name="cache-control" content="public, max-age=31536000" />
      
      {/* Meta Tags pour les Réseaux Sociaux */}
      <meta property="article:author" content="AllAdsMarket Team" />
      <meta property="article:publisher" content="https://www.facebook.com/AllAdsMarket" />
      <meta property="article:section" content="Technology" />
      <meta property="article:tag" content={keywords} />
      
      {/* Meta Tags pour les Applications */}
      <meta name="application-name" content="AllAdsMarket" />
      <meta name="apple-mobile-web-app-title" content="AllAdsMarket" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Meta Tags pour les Performances */}
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      <meta name="apple-touch-fullscreen" content="yes" />
      
      {/* Meta Tags pour les Données */}
      <meta name="data-format-detection" content="telephone=no" />
      <meta name="data-format-detection" content="date=no" />
      <meta name="data-format-detection" content="address=no" />
      <meta name="data-format-detection" content="email=no" />
    </Helmet>
  );
};

export default AdvancedSEOHead;
