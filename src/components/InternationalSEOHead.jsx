import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const InternationalSEOHead = ({ 
  title, 
  description, 
  keywords = '', 
  canonical = '', 
  ogImage = '/og-image.jpg',
  ogType = 'website',
  structuredData = null,
  lang = 'fr',
  alternateLanguages = [],
  geoRegion = 'FR',
  geoCountry = 'France'
}) => {
  const { t } = useTranslation();
  const baseUrl = 'https://alladsmarket.com';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${window.location.pathname}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  // Configuration des langues et régions
  const languageConfig = {
    'fr': { locale: 'fr_FR', region: 'FR', country: 'France', currency: 'EUR' },
    'en': { locale: 'en_US', region: 'US', country: 'United States', currency: 'USD' },
    'en-GB': { locale: 'en_GB', region: 'GB', country: 'United Kingdom', currency: 'GBP' },
    'de': { locale: 'de_DE', region: 'DE', country: 'Germany', currency: 'EUR' },
    'es': { locale: 'es_ES', region: 'ES', country: 'Spain', currency: 'EUR' },
    'it': { locale: 'it_IT', region: 'IT', country: 'Italy', currency: 'EUR' },
    'pt': { locale: 'pt_PT', region: 'PT', country: 'Portugal', currency: 'EUR' },
    'pt-BR': { locale: 'pt_BR', region: 'BR', country: 'Brazil', currency: 'BRL' },
    'nl': { locale: 'nl_NL', region: 'NL', country: 'Netherlands', currency: 'EUR' },
    'sv': { locale: 'sv_SE', region: 'SE', country: 'Sweden', currency: 'SEK' },
    'no': { locale: 'no_NO', region: 'NO', country: 'Norway', currency: 'NOK' },
    'ru': { locale: 'ru_RU', region: 'RU', country: 'Russia', currency: 'RUB' },
    'ja': { locale: 'ja_JP', region: 'JP', country: 'Japan', currency: 'JPY' },
    'zh': { locale: 'zh_CN', region: 'CN', country: 'China', currency: 'CNY' },
    'hi': { locale: 'hi_IN', region: 'IN', country: 'India', currency: 'INR' },
    'ar': { locale: 'ar_SA', region: 'SA', country: 'Saudi Arabia', currency: 'SAR' },
    'sw': { locale: 'sw_KE', region: 'KE', country: 'Kenya', currency: 'KES' },
    'am': { locale: 'am_ET', region: 'ET', country: 'Ethiopia', currency: 'ETB' }
  };

  const currentLang = languageConfig[lang] || languageConfig['fr'];
  const currentLocale = currentLang.locale;
  const currentRegion = currentLang.region;
  const currentCountry = currentLang.country;
  const currentCurrency = currentLang.currency;

  // Génération des balises hreflang pour toutes les langues supportées
  const supportedLanguages = [
    'fr', 'en', 'en-GB', 'de', 'es', 'it', 'pt', 'pt-BR', 
    'nl', 'sv', 'no', 'ru', 'ja', 'zh', 'hi', 'ar', 'sw', 'am'
  ];

  // Données structurées internationales
  const internationalStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AllAdsMarket",
    "alternateName": "AllAdsMarket - Premium Affiliate Marketplace",
    "url": baseUrl,
    "description": description || t('seo.metaDescription', 'Premium affiliate marketplace with trending products and exclusive offers'),
    "inLanguage": currentLocale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllAdsMarket",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 200,
        "height": 60
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": currentRegion
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": currentLocale
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": currentCurrency,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  // Données structurées pour l'organisation internationale
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AllAdsMarket",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Premium affiliate marketplace specialized in trending products and exclusive offers",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": currentRegion
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": supportedLanguages.map(lang => languageConfig[lang]?.locale).filter(Boolean)
    },
    "sameAs": [
      "https://facebook.com/alladsmarket",
      "https://twitter.com/alladsmarket",
      "https://instagram.com/alladsmarket",
      "https://linkedin.com/company/alladsmarket"
    ]
  };

  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AllAdsMarket" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Langue et région */}
      <html lang={lang} />
      <meta name="language" content={lang} />
      <meta name="geo.region" content={currentRegion} />
      <meta name="geo.country" content={currentCountry} />
      <meta name="geo.placename" content={currentCountry} />
      <meta name="ICBM" content="46.0,2.0" />
      
      {/* Open Graph international */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="AllAdsMarket" />
      <meta property="og:locale" content={currentLocale} />
      <meta property="og:locale:alternate" content={supportedLanguages.map(lang => languageConfig[lang]?.locale).filter(Boolean).join(', ')} />
      
      {/* Twitter Card international */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@AllAdsMarket" />
      <meta name="twitter:creator" content="@AllAdsMarket" />
      
      {/* Balises hreflang pour le SEO international */}
      {supportedLanguages.map(langCode => {
        const langConfig = languageConfig[langCode];
        if (!langConfig) return null;
        
        return (
          <link 
            key={langCode}
            rel="alternate" 
            hrefLang={langCode} 
            href={`${baseUrl}/${langCode}${window.location.pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '')}`} 
          />
        );
      })}
      
      {/* Balise hreflang x-default */}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${window.location.pathname}`} />
      
      {/* Meta tags techniques avancés */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AllAdsMarket" />
      
      {/* Performance et sécurité */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Favicon et icônes */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect pour performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Données structurées */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Données structurées internationales */}
      <script type="application/ld+json">
        {JSON.stringify(internationalStructuredData)}
      </script>
      
      {/* Données structurées organisation */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
      
      {/* Sitemap et robots */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      <link rel="sitemap" type="application/xml" href="/sitemap-images.xml" />
      <link rel="sitemap" type="application/xml" href="/sitemap-news.xml" />
      
      {/* Meta tags pour les moteurs de recherche spécifiques */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      <meta name="baidu-site-verification" content="your-baidu-verification-code" />
      
      {/* Meta tags pour les réseaux sociaux spécifiques */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="linkedin:owner" content="your-linkedin-id" />
      
      {/* Meta tags pour l'accessibilité */}
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      
      {/* Meta tags pour les performances */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="AllAdsMarket" />
      <meta name="msapplication-tooltip" content="AllAdsMarket - Premium Affiliate Marketplace" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-tap-highlight" content="no" />
    </Helmet>
  );
};

export default InternationalSEOHead;
