import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * Composant SEO Head ultra-optimisé pour le meilleur positionnement
 * Implémente toutes les meilleures pratiques SEO 2024
 */
const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'article',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  locale = 'fr_FR',
  alternateLocales = [],
  canonicalUrl,
  noindex = false,
  nofollow = false,
  structuredData = null
}) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || 'fr';
  
  // Génération automatique des URLs canoniques
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';
  const fullUrl = url ? `${baseUrl}${url}` : window.location.href;
  const canonical = canonicalUrl || fullUrl;
  
  // Génération automatique des images
  const ogImage = image || `${baseUrl}/og-image.jpg`;
  const twitterImage = image || `${baseUrl}/twitter-card.jpg`;
  
  // Génération automatique des mots-clés SEO
  const seoKeywords = keywords || [
    'marketing digital',
    'SEO',
    'e-commerce',
    'intelligence artificielle',
    'blockchain',
    'analytics',
    'content marketing',
    'alladsmarket'
  ].join(', ');
  
  // Données structurées par défaut
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": ogImage,
    "url": fullUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Person",
      "name": author || "Team AllAdsMarket"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllAdsMarket",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "keywords": seoKeywords,
    "articleSection": section,
    "wordCount": description ? description.split(' ').length : 0
  };
  
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Helmet>
      {/* Meta tags de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || "Team AllAdsMarket"} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="AllAdsMarket" />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content="@alladsmarket" />
      <meta name="twitter:creator" content="@alladsmarket" />
      
      {/* Meta tags pour les réseaux sociaux */}
      <meta property="article:author" content={author || "Team AllAdsMarket"} />
      <meta property="article:published_time" content={publishedTime} />
      <meta property="article:modified_time" content={modifiedTime || publishedTime} />
      <meta property="article:section" content={section} />
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Langues alternatives */}
      {alternateLocales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={`${baseUrl}/${locale}${url}`} />
      ))}
      
      {/* Meta tags techniques */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Données structurées JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Données structurées supplémentaires pour le site */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AllAdsMarket",
          "url": baseUrl,
          "description": "Plateforme premium de marketing digital et e-commerce",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "AllAdsMarket",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          }
        })}
      </script>
      
      {/* Données structurées pour l'organisation */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AllAdsMarket",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "Plateforme premium de marketing digital et e-commerce",
          "foundingDate": "2024",
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@alladsmarket.com"
          },
          "sameAs": [
            "https://twitter.com/alladsmarket",
            "https://linkedin.com/company/alladsmarket",
            "https://facebook.com/alladsmarket"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;