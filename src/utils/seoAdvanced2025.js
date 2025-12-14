/**
 * Améliorations SEO avancées pour 2025
 * Implémente les dernières pratiques: E-E-A-T, Helpful Content, Core Web Vitals
 */

/**
 * Génère des données structurées Product optimisées pour SEO 2025
 */
export const generateProductSchema = (product) => {
  if (!product) return null;

  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || product.excerpt,
    "image": product.images && product.images.length > 0
      ? product.images.map(img => typeof img === 'string' ? img : img.url || img.src)
      : [`${baseUrl}/og-image.jpg`],
    "brand": {
      "@type": "Brand",
      "name": product.brand || "AllAdsMarket"
    },
    "category": product.category || "General",
    "sku": product.sku || product._id,
    "mpn": product.mpn || product._id,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${product.slug || product._id}`,
      "priceCurrency": "EUR",
      "price": product.price || "0",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "AllAdsMarket"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "FR"
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
      }
    },
    "aggregateRating": product.rating ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating.average || product.rating,
      "reviewCount": product.rating.count || 0,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": product.reviews && product.reviews.length > 0 ? product.reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author || "Client AllAdsMarket"
      },
      "datePublished": review.date || new Date().toISOString(),
      "reviewBody": review.text || review.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || 5,
        "bestRating": "5",
        "worstRating": "1"
      }
    })) : undefined
  };
};

/**
 * Génère des données structurées Video optimisées
 */
export const generateVideoSchemaAdvanced = (video) => {
  if (!video) return null;

  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnail || video.image,
    "uploadDate": video.uploadDate || new Date().toISOString(),
    "duration": video.duration || "PT5M",
    "contentUrl": video.contentUrl || video.url,
    "embedUrl": video.embedUrl || video.url,
    "publisher": {
      "@type": "Organization",
      "name": "AllAdsMarket",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };
};

/**
 * Génère des meta tags E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 */
export const generateEEATMetaTags = (content) => {
  const metaTags = [];

  // Experience
  if (content.experience) {
    metaTags.push({
      name: "experience",
      content: content.experience
    });
  }

  // Expertise
  if (content.expertise) {
    metaTags.push({
      name: "expertise",
      content: Array.isArray(content.expertise)
        ? content.expertise.join(', ')
        : content.expertise
    });
  }

  // Authoritativeness
  if (content.author) {
    metaTags.push({
      name: "author",
      content: content.author
    });
    metaTags.push({
      property: "article:author",
      content: content.author
    });
  }

  // Trustworthiness
  metaTags.push({
    name: "trustworthiness",
    content: content.trustworthiness || "verified"
  });

  // Publication date for freshness
  if (content.publishedTime) {
    metaTags.push({
      property: "article:published_time",
      content: content.publishedTime
    });
  }

  // Last modified for freshness
  if (content.modifiedTime) {
    metaTags.push({
      property: "article:modified_time",
      content: content.modifiedTime
    });
  }

  return metaTags;
};

/**
 * Génère des données structurées pour Helpful Content
 */
export const generateHelpfulContentSchema = (content) => {
  if (!content) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.description,
    "author": {
      "@type": "Person",
      "name": content.author || "Team AllAdsMarket",
      "jobTitle": content.authorTitle || "Expert Marketing Digital"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllAdsMarket",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com'}/logo.png`
      }
    },
    "datePublished": content.publishedTime || new Date().toISOString(),
    "dateModified": content.modifiedTime || content.publishedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": content.url
    },
    "articleSection": content.section || "Marketing Digital",
    "keywords": content.keywords || "",
    "wordCount": content.wordCount || (content.description ? content.description.split(' ').length : 0),
    "inLanguage": "fr-FR",
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".article-summary", ".article-intro"]
    },
    "about": {
      "@type": "Thing",
      "name": content.topic || "Marketing Digital"
    }
  };
};

/**
 * Génère des données structurées FAQPage améliorées
 */
export const generateFAQSchemaAdvanced = (faqs) => {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "author": {
          "@type": "Person",
          "name": faq.author || "Team AllAdsMarket"
        },
        "dateCreated": faq.dateCreated || new Date().toISOString(),
        "upvoteCount": faq.upvotes || 0
      }
    }))
  };
};

/**
 * Génère des données structurées BreadcrumbList améliorées
 */
export const generateBreadcrumbSchemaAdvanced = (items) => {
  if (!items || items.length === 0) return null;

  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
    }))
  };
};

/**
 * Génère des resource hints intelligents basés sur le contexte
 */
export const generateSmartResourceHints = (pageType, resources = {}) => {
  const hints = [];
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  // Preconnect pour les domaines critiques selon le type de page
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  if (pageType === 'product') {
    criticalDomains.push('https://m.media-amazon.com');
  }

  if (pageType === 'article') {
    criticalDomains.push('https://images.unsplash.com');
  }

  criticalDomains.forEach(domain => {
    hints.push({
      rel: 'preconnect',
      href: domain,
      crossOrigin: 'anonymous'
    });
  });

  // Preload pour les ressources critiques
  if (resources.criticalImages) {
    resources.criticalImages.forEach(img => {
      hints.push({
        rel: 'preload',
        href: img.url,
        as: 'image',
        fetchPriority: img.priority || 'high'
      });
    });
  }

  // Prefetch pour les pages suivantes probables
  if (resources.prefetchPages) {
    resources.prefetchPages.forEach(page => {
      hints.push({
        rel: 'prefetch',
        href: page.url,
        as: 'document'
      });
    });
  }

  return hints;
};

/**
 * Calcule et optimise les Core Web Vitals
 */
export const optimizeCoreWebVitals = () => {
  // LCP (Largest Contentful Paint) - Optimiser les images critiques
  const optimizeLCP = () => {
    const lcpElements = document.querySelectorAll('img, video');
    lcpElements.forEach(el => {
      if (el.tagName === 'IMG') {
        el.loading = 'eager';
        el.fetchPriority = 'high';
      }
    });
  };

  // CLS (Cumulative Layout Shift) - Prévenir les shifts
  const preventCLS = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.width || !img.height) {
        // Ajouter des dimensions par défaut si manquantes
        img.style.aspectRatio = '16/9';
      }
    });
  };

  // FID (First Input Delay) - Optimiser l'interactivité
  const optimizeFID = () => {
    // Déferrer les scripts non critiques
    const nonCriticalScripts = document.querySelectorAll('script[data-non-critical]');
    nonCriticalScripts.forEach(script => {
      script.defer = true;
    });
  };

  // Exécuter les optimisations
  if (typeof window !== 'undefined') {
    optimizeLCP();
    preventCLS();
    optimizeFID();
  }
};

/**
 * Génère des meta tags pour les réseaux sociaux améliorés
 */
export const generateEnhancedSocialMetaTags = (content) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  return {
    // Open Graph amélioré
    'og:title': content.title,
    'og:description': content.description,
    'og:image': content.image || `${baseUrl}/og-image.jpg`,
    'og:url': content.url,
    'og:type': content.type || 'website',
    'og:site_name': 'AllAdsMarket',
    'og:locale': 'fr_FR',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': content.imageAlt || content.title,

    // Twitter Card amélioré
    'twitter:card': 'summary_large_image',
    'twitter:title': content.title,
    'twitter:description': content.description,
    'twitter:image': content.image || `${baseUrl}/twitter-card.jpg`,
    'twitter:image:alt': content.imageAlt || content.title,
    'twitter:site': '@alladsmarket',
    'twitter:creator': '@alladsmarket',

    // LinkedIn
    'linkedin:owner': 'alladsmarket'
  };
};

/**
 * Génère des données structurées LocalBusiness pour SEO local
 */
export const generateLocalBusinessSchema = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#organization`,
    "name": "AllAdsMarket",
    "image": `${baseUrl}/logo.png`,
    "url": baseUrl,
    "telephone": "+33-1-XX-XX-XX-XX",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "France",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "75000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://facebook.com/alladsmarket",
      "https://twitter.com/alladsmarket",
      "https://instagram.com/alladsmarket",
      "https://linkedin.com/company/alladsmarket"
    ]
  };
};

export default {
  generateProductSchema,
  generateVideoSchemaAdvanced,
  generateEEATMetaTags,
  generateHelpfulContentSchema,
  generateFAQSchemaAdvanced,
  generateBreadcrumbSchemaAdvanced,
  generateSmartResourceHints,
  optimizeCoreWebVitals,
  generateEnhancedSocialMetaTags,
  generateLocalBusinessSchema
};
