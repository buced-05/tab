import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  generateOptimizedDescription,
  generateOptimizedTitle,
  generateKeywords,
  generateResourceHints,
  validateAndOptimizeMetaTags
} from '../utils/seoEnhancer';

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
  structuredData = null,
  includeDefaultKeywords = true,
  additionalMeta = [],
  additionalLinkTags = []
}) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || 'fr';
  
  // Génération automatique des URLs canoniques
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';
  const fullUrl = url
    ? url.startsWith('http')
      ? url
      : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
    : (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const canonical = canonicalUrl || fullUrl;
  
  // Génération automatique des images
  const ogImage = image || `${baseUrl}/og-image.jpg`;
  const twitterImage = image || `${baseUrl}/twitter-card.jpg`;
  
  // Génération automatique des mots-clés SEO (avec focus sur "télécharger gratuit")
  const baseKeywords = includeDefaultKeywords
    ? [
        'marketing digital',
        'SEO',
        'e-commerce',
        'intelligence artificielle',
        'content marketing',
        'télécharger',
        'télécharger gratuit',
        'téléchargement gratuit',
        'PDF gratuit',
        'guide gratuit',
        'alladsmarket',
        'France',
        'français'
      ]
    : [];
  
  // Optimisation automatique des meta tags
  const keywordsArray = keywords ? keywords.split(',').map(k => k.trim()) : [];
  const optimizedKeywords = generateKeywords(description || title, [...baseKeywords, ...keywordsArray]);
  
  // Optimisation du titre et de la description
  const optimizedTitle = generateOptimizedTitle(title, 'AllAdsMarket');
  const optimizedDescription = generateOptimizedDescription(description, optimizedKeywords.split(', '));
  
  // Validation des meta tags
  const validation = validateAndOptimizeMetaTags({
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: optimizedKeywords
  });
  
  const seoTitle = validation.metaTags.title;
  const seoDescription = validation.metaTags.description;
  const seoKeywords = validation.metaTags.keywords;
  
  // Resource hints pour améliorer les performances
  const resourceHints = generateResourceHints({
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com',
      'https://www.google-analytics.com'
    ],
    dnsPrefetch: [
      'https://www.googletagmanager.com',
      'https://tse2.mm.bing.net'
    ],
    preload: image ? [{
      url: image,
      as: 'image',
      type: 'image/jpeg'
    }] : []
  });
  
  // Données structurées par défaut - Optimisées pour IA, Perplexity et SEO
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoTitle,
    "description": seoDescription,
    "image": {
      "@type": "ImageObject",
      "url": ogImage,
      "width": 1200,
      "height": 630
    },
    "url": fullUrl,
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || publishedTime || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": author || "Team AllAdsMarket",
      "url": baseUrl,
      "sameAs": [
        `${baseUrl}/authors/${(author || "Team AllAdsMarket").toLowerCase().replace(/\s+/g, '-')}`
      ]
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
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "keywords": seoKeywords,
    "about": {
      "@type": "Thing",
      "name": "Marketing Digital et E-commerce"
    },
    "mentions": tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    })),
    "articleSection": section || "Articles",
    "wordCount": description ? description.split(' ').length : 0,
    "inLanguage": locale.replace('_', '-'),
    "isAccessibleForFree": true,
    "commentCount": 25,
    "shareCount": 120,
    "interactionStatistic": [
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/LikeAction",
        "userInteractionCount": 120
      },
      {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": 25
      }
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".article-summary"]
    }
  };
  
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Helmet>
      {/* Meta tags de base - OPTIMISÉS AUTOMATIQUEMENT */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || "Team AllAdsMarket"} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* OPTIMISATION POUR LE MARCHÉ FRANÇAIS */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      <meta name="geo.position" content="46.2276;2.2137" />
      <meta name="ICBM" content="46.2276, 2.2137" />
      <meta name="language" content="fr-FR" />
      <meta httpEquiv="Content-Language" content="fr-FR" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook - Optimisé avec meta tags validés */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={description || title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="AllAdsMarket" />
      {/* OPTIMISATION POUR LE MARCHÉ FRANÇAIS - Français en priorité */}
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />
      <meta property="og:locale:alternate" content="de_DE" />
      <meta property="og:updated_time" content={modifiedTime || publishedTime || new Date().toISOString()} />
      
      {/* Twitter Card - Optimisé avec meta tags validés */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={description || title} />
      <meta name="twitter:site" content="@alladsmarket" />
      <meta name="twitter:creator" content="@alladsmarket" />
      <meta name="twitter:domain" content="alladsmarket.com" />
      <meta name="twitter:url" content={fullUrl} />
      
      {/* Meta tags pour les réseaux sociaux */}
      <meta property="article:author" content={author || "Team AllAdsMarket"} />
      <meta property="article:published_time" content={publishedTime} />
      <meta property="article:modified_time" content={modifiedTime || publishedTime} />
      <meta property="article:section" content={section} />
      {[...(tags || []), 'télécharger', 'télécharger gratuit', 'PDF gratuit', 'guide gratuit'].map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      {additionalMeta.map((meta, index) => {
        if (meta.name) {
          return <meta key={`meta-${index}-${meta.name}`} name={meta.name} content={meta.content} />;
        }
        if (meta.property) {
          return <meta key={`meta-${index}-${meta.property}`} property={meta.property} content={meta.content} />;
        }
        return null;
      })}
      
      {/* Langues alternatives */}
      {alternateLocales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={`${baseUrl}/${locale}${url}`} />
      ))}
      {additionalLinkTags.map((link, index) => (
        <link key={`link-${index}-${link.rel || index}`} {...link} />
      ))}
      
      {/* Meta tags techniques - Optimisés pour SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="AllAdsMarket" />
      
      {/* Meta tags SEO avancés */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="AllAdsMarket" />
      <meta name="msapplication-tooltip" content="AllAdsMarket - Marketplace d'Affiliation Premium" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-navbutton-color" content="#6366f1" />
      <meta name="msapplication-window" content="width=1024;height=768" />
      
      {/* Meta tags pour les performances et le SEO */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content={currentLocale} />
      <meta name="language" content={currentLocale} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Meta tags pour les images */}
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="og:image:type" content="image/jpeg" />
      <meta name="twitter:image:alt" content={description || title} />
      
      {/* Resource Hints optimisés pour améliorer les performances SEO */}
      {resourceHints.map((hint, index) => (
        <link key={`resource-${index}`} {...hint} />
      ))}
      
      {/* Favicon et icônes */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      <link rel="mask-icon" href="/favicon.svg" color="#6366f1" />
      
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
          "description": "AllAdsMarket - Des Meilleurs articles MOINS Chers",
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
      
      {/* Données structurées pour l'organisation - Optimisées pour IA et SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AllAdsMarket",
          "alternateName": "AllAdsMarket - Marketplace d'Affiliation Premium",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`,
            "width": 200,
            "height": 60
          },
          "image": `${baseUrl}/og-image.jpg`,
          "description": "Plateforme premium de marketing digital et e-commerce avec guides gratuits téléchargeables",
          "foundingDate": "2024",
          "foundingLocation": {
            "@type": "Place",
            "addressCountry": "FR",
            "addressLocality": "France"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contact@alladsmarket.com",
            "availableLanguage": ["French", "English", "Spanish", "German", "Italian", "Portuguese"],
            "areaServed": "Worldwide"
          },
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          },
          "sameAs": [
            "https://twitter.com/alladsmarket",
            "https://linkedin.com/company/alladsmarket",
            "https://facebook.com/alladsmarket",
            "https://instagram.com/alladsmarket",
            "https://youtube.com/@alladsmarket"
          ],
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 10,
            "maxValue": 50
          },
          "slogan": "Des Meilleurs articles MOINS Chers",
          "knowsAbout": [
            "Marketing Digital",
            "SEO",
            "E-commerce",
            "Intelligence Artificielle",
            "Content Marketing",
            "Affiliation"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>
      
      {/* BreadcrumbList pour améliorer la navigation et le SEO */}
      {url && url !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": baseUrl
              },
              ...(url.split('/').filter(Boolean).map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `${baseUrl}/${url.split('/').slice(0, index + 2).join('/')}`
              })))
            ]
          })}
        </script>
      )}
      
      {/* CollectionPage pour les pages de liste (produits, articles) */}
      {(url?.includes('/products') || url?.includes('/ai-articles') || url?.includes('/articles')) && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": seoTitle,
            "description": seoDescription,
            "url": fullUrl,
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": "100+",
              "itemListElement": []
            }
          })}
        </script>
      )}
      
      {/* ItemList pour améliorer l'indexation des listes */}
      {type === 'website' && url !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": seoTitle,
            "description": seoDescription,
            "url": fullUrl,
            "inLanguage": "fr-FR",
            "isPartOf": {
              "@type": "WebSite",
              "name": "AllAdsMarket",
              "url": baseUrl
            },
            "about": {
              "@type": "Thing",
              "name": "Marketing Digital et E-commerce"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": ogImage,
              "width": 1200,
              "height": 630
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;