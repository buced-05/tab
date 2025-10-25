// Configuration SEO avancée pour AllAdsMarket
export const seoConfig = {
  // Configuration de base
  baseUrl: 'https://alladsmarket.com',
  siteName: 'AllAdsMarket',
  siteDescription: 'Marketplace d\'affiliation premium spécialisé dans la sélection de produits tendances et offres exclusives',
  
  // Mots-clés principaux
  primaryKeywords: [
    'produits tendance',
    'meilleurs produits',
    'offres exclusives',
    'marketplace affiliation',
    'avis produits',
    'guides d\'achat',
    'produits tech',
    'électronique',
    'mode',
    'maison'
  ],
  
  // Mots-clés longue traîne
  longTailKeywords: [
    'meilleurs produits électroniques 2024',
    'offres exclusives produits tech',
    'marketplace produits tendance France',
    'avis produits qualité prix',
    'guide achat smartphone',
    'meilleurs écouteurs bluetooth',
    'produits mode tendance',
    'déco maison moderne',
    'avis produits Amazon',
    'comparatif produits tech'
  ],
  
  // Configuration des moteurs de recherche
  searchEngines: {
    google: {
      verification: 'YOUR_GOOGLE_VERIFICATION_CODE',
      analytics: 'YOUR_GA4_MEASUREMENT_ID',
      searchConsole: true
    },
    bing: {
      verification: 'YOUR_BING_VERIFICATION_CODE',
      webmasterTools: true
    },
    yandex: {
      verification: 'YOUR_YANDEX_VERIFICATION_CODE'
    },
    baidu: {
      verification: 'YOUR_BAIDU_VERIFICATION_CODE'
    }
  },
  
  // Configuration des réseaux sociaux
  socialMedia: {
    facebook: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      pageId: 'YOUR_FACEBOOK_PAGE_ID',
      domainVerification: 'YOUR_FACEBOOK_DOMAIN_VERIFICATION'
    },
    twitter: {
      site: '@alladsmarket',
      creator: '@alladsmarket',
      card: 'summary_large_image'
    },
    linkedin: {
      owner: 'YOUR_LINKEDIN_ID'
    },
    pinterest: {
      verification: 'YOUR_PINTEREST_VERIFICATION_CODE',
      richPins: true
    },
    instagram: {
      username: 'alladsmarket'
    }
  },
  
  // Configuration géographique
  geo: {
    country: 'FR',
    region: 'France',
    city: 'Paris',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    },
    timezone: 'Europe/Paris',
    currency: 'EUR',
    language: 'fr-FR'
  },
  
  // Configuration des performances
  performance: {
    coreWebVitals: {
      lcp: 2.5, // seconds
      fid: 100, // milliseconds
      cls: 0.1 // score
    },
    caching: {
      static: '1 year',
      dynamic: '1 hour',
      api: '5 minutes'
    },
    compression: {
      gzip: true,
      brotli: true,
      images: 'WebP'
    }
  },
  
  // Configuration du contenu
  content: {
    minLength: {
      title: 30,
      description: 120,
      article: 1500
    },
    maxLength: {
      title: 60,
      description: 160,
      keywords: 10
    },
    frequency: {
      blog: '2-3 articles/semaine',
      products: 'quotidien',
      sitemap: 'quotidien'
    }
  },
  
  // Configuration des images
  images: {
    formats: ['WebP', 'AVIF', 'JPEG', 'PNG'],
    sizes: {
      og: '1200x630',
      twitter: '1200x630',
      thumbnail: '300x300',
      product: '800x600'
    },
    optimization: {
      quality: 85,
      progressive: true,
      lazy: true
    }
  },
  
  // Configuration des liens
  linking: {
    internal: {
      maxDepth: 3,
      minLinks: 3,
      maxLinks: 5
    },
    external: {
      nofollow: true,
      sponsored: true,
      ugc: false
    },
    affiliate: {
      disclosure: true,
      nofollow: true,
      sponsored: true
    }
  },
  
  // Configuration des cookies et tracking
  tracking: {
    googleAnalytics: {
      gtag: true,
      enhancedEcommerce: true,
      customEvents: true
    },
    facebookPixel: {
      enabled: true,
      events: ['ViewContent', 'AddToCart', 'Purchase']
    },
    consent: {
      gdpr: true,
      ccpa: true,
      cookieBanner: true
    }
  },
  
  // Configuration de la sécurité
  security: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    https: true,
    hsts: true,
    csp: true
  },
  
  // Configuration des notifications
  notifications: {
    searchConsole: {
      errors: true,
      coverage: true,
      performance: true
    },
    analytics: {
      traffic: true,
      conversions: true,
      goals: true
    }
  },
  
  // Configuration des tests
  testing: {
    lighthouse: {
      performance: 90,
      accessibility: 95,
      bestPractices: 90,
      seo: 95
    },
    pagespeed: {
      mobile: 90,
      desktop: 95
    },
    coreWebVitals: {
      lcp: 2.5,
      fid: 100,
      cls: 0.1
    }
  }
};

// Fonctions utilitaires SEO
export const seoUtils = {
  // Générer des meta tags optimisés
  generateMetaTags: (page, product = null) => {
    const config = seoConfig;
    const baseUrl = config.baseUrl;
    
    return {
      title: `${page.title} | ${config.siteName}`,
      description: page.description || config.siteDescription,
      keywords: page.keywords || config.primaryKeywords.join(', '),
      canonical: `${baseUrl}${page.url}`,
      ogTitle: page.title,
      ogDescription: page.description,
      ogImage: product ? product.images[0]?.url : `${baseUrl}/og-image.jpg`,
      twitterTitle: page.title,
      twitterDescription: page.description,
      twitterImage: product ? product.images[0]?.url : `${baseUrl}/og-image.jpg`
    };
  },
  
  // Valider les meta tags
  validateMetaTags: (metaTags) => {
    const errors = [];
    
    if (!metaTags.title || metaTags.title.length < 30 || metaTags.title.length > 60) {
      errors.push('Title doit faire entre 30 et 60 caractères');
    }
    
    if (!metaTags.description || metaTags.description.length < 120 || metaTags.description.length > 160) {
      errors.push('Description doit faire entre 120 et 160 caractères');
    }
    
    if (!metaTags.keywords || metaTags.keywords.split(',').length > 10) {
      errors.push('Maximum 10 mots-clés');
    }
    
    return errors;
  },
  
  // Générer des URLs SEO-friendly
  generateSEOUrl: (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },
  
  // Calculer la densité de mots-clés
  calculateKeywordDensity: (text, keyword) => {
    const words = text.toLowerCase().split(/\s+/);
    const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
    return (keywordCount / words.length) * 100;
  },
  
  // Générer des suggestions de mots-clés
  generateKeywordSuggestions: (baseKeyword) => {
    const suggestions = [
      `${baseKeyword} 2024`,
      `meilleurs ${baseKeyword}`,
      `${baseKeyword} avis`,
      `${baseKeyword} test`,
      `${baseKeyword} guide`,
      `${baseKeyword} comparatif`,
      `${baseKeyword} prix`,
      `${baseKeyword} pas cher`,
      `${baseKeyword} qualité`,
      `${baseKeyword} recommandé`
    ];
    
    return suggestions;
  }
};

export default seoConfig;
