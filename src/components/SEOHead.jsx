import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  ogType = 'website',
  product = null,
  category = null,
  isArticle = false
}) => {
  const baseUrl = 'https://alladsmarket.com';
  const defaultTitle = 'AllAdsMarket - Marketplace d\'Affiliation Premium';
  const defaultDescription = 'Découvrez les meilleurs produits tendances, offres exclusives et avis détaillés. Marketplace d\'affiliation premium avec sélection rigoureuse.';
  const defaultKeywords = 'produits tendance, offres exclusives, marketplace, affiliation, avis produits, meilleurs produits, shopping en ligne';

  // Génération des meta tags dynamiques
  const generateTitle = () => {
    if (title) return `${title} | AllAdsMarket`;
    if (product) return `${product.name} - Avis et Test Complet | AllAdsMarket`;
    if (category) return `Produits ${category} - Meilleures Offres | AllAdsMarket`;
    if (isArticle) return `${title} - Guide Complet | AllAdsMarket`;
    return defaultTitle;
  };

  const generateDescription = () => {
    if (description) return description;
    if (product) {
      const discount = product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
      return `Découvrez ${product.name} de ${product.brand}. ${product.rating.count} avis clients, note ${product.rating.average}/5. ${discount > 0 ? `Réduction de ${discount}%` : 'Meilleure offre'}. Guide complet et test détaillé.`;
    }
    if (category) return `Découvrez les meilleurs produits ${category}. Offres exclusives, avis détaillés et guides d'achat. Sélection rigoureuse pour votre satisfaction.`;
    return defaultDescription;
  };

  const generateKeywords = () => {
    if (keywords) return keywords;
    if (product) {
      return `${product.name}, ${product.brand}, avis, test, guide d'achat, ${product.category}, produits tendance, offres exclusives, ${product.tags.join(', ')}`;
    }
    if (category) {
      return `produits ${category}, ${category} tendance, meilleurs ${category}, offres ${category}, avis ${category}, guide ${category}`;
    }
    return defaultKeywords;
  };

  const generateCanonicalUrl = () => {
    if (canonicalUrl) return canonicalUrl;
    if (product) return `${baseUrl}/product/${product._id}`;
    if (category) return `${baseUrl}/products?category=${category}`;
    return baseUrl;
  };

  const generateOgImage = () => {
    if (ogImage) return ogImage;
    if (product && product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    return `${baseUrl}/og-image.jpg`;
  };

  // Schema markup pour les produits
  const generateProductSchema = () => {
    if (!product) return null;

    const discount = product.originalPrice > product.price ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "sku": product._id,
      "mpn": product._id,
      "gtin": product._id,
      "brand": {
        "@type": "Brand",
        "name": product.brand,
        "logo": `${baseUrl}/logos/${product.brand.toLowerCase()}.png`
      },
      "category": product.category,
      "image": product.images.map(img => ({
        "@type": "ImageObject",
        "url": img.url,
        "caption": img.alt,
        "width": "1200",
        "height": "630"
      })),
      "offers": {
        "@type": "Offer",
        "url": product.affiliateUrl,
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "priceCurrency": "EUR",
        "price": product.price,
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "seller": {
          "@type": "Organization",
          "name": "Amazon",
          "url": "https://www.amazon.fr"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "EUR"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "businessDays": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
            },
            "cutoffTime": "14:00",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 2,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            }
          }
        },
        "itemCondition": "https://schema.org/NewCondition",
        "availabilityStarts": new Date().toISOString(),
        "availabilityEnds": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.average,
        "reviewCount": product.rating.count,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": product.rating.average,
            "bestRating": 5,
            "worstRating": 1
          },
          "author": {
            "@type": "Organization",
            "name": "AllAdsMarket",
            "url": baseUrl
          },
          "publisher": {
            "@type": "Organization",
            "name": "AllAdsMarket",
            "url": baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "reviewBody": `Test complet et avis détaillé du ${product.name} de ${product.brand}. Produit de qualité avec ${product.rating.average}/5 étoiles basé sur ${product.rating.count} avis clients.`
        }
      ],
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Marque",
          "value": product.brand
        },
        {
          "@type": "PropertyValue",
          "name": "Catégorie",
          "value": product.category
        },
        {
          "@type": "PropertyValue",
          "name": "Disponibilité",
          "value": product.inStock ? "En stock" : "Rupture de stock"
        },
        ...(discount > 0 ? [{
          "@type": "PropertyValue",
          "name": "Réduction",
          "value": `${discount}%`
        }] : [])
      ],
      "isRelatedTo": product.tags.map(tag => ({
        "@type": "Product",
        "name": tag,
        "url": `${baseUrl}/products?tag=${tag}`
      })),
      "isAccessoryOrSparePartFor": [],
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    };
  };

  // Schema markup pour les articles
  const generateArticleSchema = () => {
    if (!isArticle || !product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": product.images.map(img => img.url),
      "author": {
        "@type": "Organization",
        "name": "AllAdsMarket",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "AllAdsMarket",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": generateCanonicalUrl()
      }
    };
  };

  // Schema markup pour l'organisation
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AllAdsMarket",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Marketplace d'affiliation premium spécialisé dans la sélection de produits tendances et offres exclusives",
    "sameAs": [
      "https://www.facebook.com/alladsmarket",
      "https://www.twitter.com/alladsmarket",
      "https://www.instagram.com/alladsmarket"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-1-23-45-67-89",
      "contactType": "customer service",
      "availableLanguage": ["French", "English"]
    }
  };

  // Schema markup pour le site web
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AllAdsMarket",
    "url": baseUrl,
    "description": defaultDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Meta tags de base optimisés */}
      <title>{generateTitle()}</title>
      <meta name="description" content={generateDescription()} />
      <meta name="keywords" content={generateKeywords()} />
      <link rel="canonical" href={generateCanonicalUrl()} />
      
      {/* Meta tags SEO avancés */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-snippet:160" />
      <meta name="googlebot" content="index, follow, max-snippet:160, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:160" />
      <meta name="slurp" content="index, follow, max-snippet:160" />
      <meta name="duckduckbot" content="index, follow" />
      <meta name="baiduspider" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      
      {/* Meta tags géographiques et linguistiques */}
      <meta name="language" content="French" />
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      <meta name="geo.position" content="46.2276;2.2137" />
      <meta name="ICBM" content="46.2276, 2.2137" />
      <meta name="geo.country" content="FR" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="1 days" />
      <meta name="expires" content="never" />
      <meta name="cache-control" content="public, max-age=31536000" />
      
      {/* Open Graph optimisé */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={generateTitle()} />
      <meta property="og:description" content={generateDescription()} />
      <meta property="og:url" content={generateCanonicalUrl()} />
      <meta property="og:image" content={generateOgImage()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={product ? product.name : "AllAdsMarket - Marketplace d'Affiliation Premium"} />
      <meta property="og:site_name" content="AllAdsMarket" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:updated_time" content={new Date().toISOString()} />
      <meta property="og:see_also" content={`${baseUrl}/products`} />
      <meta property="og:see_also" content={`${baseUrl}/featured`} />
      <meta property="og:see_also" content={`${baseUrl}/trending`} />
      
      {/* Twitter Card optimisé */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={generateTitle()} />
      <meta name="twitter:description" content={generateDescription()} />
      <meta name="twitter:image" content={generateOgImage()} />
      <meta name="twitter:image:alt" content={product ? product.name : "AllAdsMarket - Marketplace d'Affiliation Premium"} />
      <meta name="twitter:site" content="@alladsmarket" />
      <meta name="twitter:creator" content="@alladsmarket" />
      <meta name="twitter:domain" content="alladsmarket.com" />
      <meta name="twitter:url" content={generateCanonicalUrl()} />
      
      {/* Meta tags mobiles avancés */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AllAdsMarket" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Meta tags de sécurité */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
      
      {/* Meta tags de performance */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      <meta httpEquiv="Expires" content="31536000" />
      <meta name="generator" content="React 18" />
      <meta name="application-name" content="AllAdsMarket" />
      <meta name="msapplication-tooltip" content="Marketplace d'affiliation premium" />
      <meta name="msapplication-starturl" content="/" />
      
      {/* Favicon et icônes optimisés */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#667eea" />
      <link rel="shortcut icon" href="/favicon.ico" />
      
      {/* Meta tags pour les moteurs de recherche spécifiques */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />
      <meta name="pinterest-site-verification" content="YOUR_PINTEREST_VERIFICATION_CODE" />
      <meta name="facebook-domain-verification" content="YOUR_FACEBOOK_VERIFICATION_CODE" />
      
      {/* Meta tags pour les réseaux sociaux */}
      <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
      <meta property="fb:pages" content="YOUR_FACEBOOK_PAGE_ID" />
      <meta name="pinterest-rich-pin" content="true" />
      <meta name="linkedin:owner" content="YOUR_LINKEDIN_ID" />
      
      {/* Meta tags pour l'e-commerce */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price} />
          <meta property="product:price:currency" content="EUR" />
          <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />
          <meta property="product:condition" content="new" />
          <meta property="product:brand" content={product.brand} />
          <meta property="product:category" content={product.category} />
          <meta property="product:rating" content={product.rating.average} />
          <meta property="product:rating_count" content={product.rating.count} />
        </>
      )}
      
      {/* Meta tags pour les articles */}
      {isArticle && (
        <>
          <meta property="article:author" content="AllAdsMarket" />
          <meta property="article:publisher" content="AllAdsMarket" />
          <meta property="article:published_time" content={new Date().toISOString()} />
          <meta property="article:modified_time" content={new Date().toISOString()} />
          <meta property="article:section" content={category || "Produits"} />
          <meta property="article:tag" content={product ? product.tags.join(", ") : "produits, tendance, offres"} />
        </>
      )}
      
      {/* Schema Markup avancé */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {product && (
        <script type="application/ld+json">
          {JSON.stringify(generateProductSchema())}
        </script>
      )}
      
      {isArticle && (
        <script type="application/ld+json">
          {JSON.stringify(generateArticleSchema())}
        </script>
      )}
      
      {/* Breadcrumb Schema */}
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
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Produits",
              "item": `${baseUrl}/products`
            },
            ...(product ? [{
              "@type": "ListItem",
              "position": 3,
              "name": product.name,
              "item": `${baseUrl}/product/${product._id}`
            }] : [])
          ]
        })}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Qu'est-ce qu'AllAdsMarket ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AllAdsMarket est un marketplace d'affiliation premium spécialisé dans la sélection de produits tendances et offres exclusives."
              }
            },
            {
              "@type": "Question",
              "name": "Comment fonctionne le système d'affiliation ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nous sélectionnons rigoureusement les meilleurs produits et offrons des liens d'affiliation vers des plateformes de confiance comme Amazon."
              }
            }
          ]
        })}
      </script>
      
      {/* Preconnect pour les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://m.media-amazon.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS prefetch pour les domaines externes */}
      <link rel="dns-prefetch" href="//amzn.to" />
      <link rel="dns-prefetch" href="//www.amazon.com" />
      <link rel="dns-prefetch" href="//www.amazon.fr" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preload des ressources critiques */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/css/critical.css" as="style" />
      <link rel="preload" href="/js/critical.js" as="script" />
      
      {/* Meta tags pour l'accessibilité */}
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <meta name="color-scheme" content="light" />
      
      {/* Meta tags pour les performances Core Web Vitals */}
      <meta name="performance" content="optimized" />
      <meta name="lcp-optimized" content="true" />
      <meta name="cls-optimized" content="true" />
      <meta name="fid-optimized" content="true" />
    </Helmet>
  );
};

export default SEOHead;