/**
 * Générateur de sitemap dynamique ultra-optimisé pour SEO
 * Génère automatiquement des sitemaps pour tous les contenus
 */

import { authors } from '../data/authors';

// Configuration SEO
const SEO_CONFIG = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com',
  defaultPriority: 0.8,
  defaultChangeFreq: 'weekly',
  lastMod: new Date().toISOString().split('T')[0]
};

// Articles statiques avec métadonnées SEO
const STATIC_ARTICLES = [
  {
    id: 1,
    slug: 'intelligence-artificielle-marketing-digital',
    title: "L'Intelligence Artificielle Révolutionne le Marketing Digital",
    category: 'ia-tech',
    priority: 0.9,
    changeFreq: 'weekly',
    lastMod: '2024-01-15'
  },
  {
    id: 2,
    slug: 'seo-2024-nouvelles-regles',
    title: "SEO 2024 : Les Nouvelles Règles du Jeu",
    category: 'seo',
    priority: 0.9,
    changeFreq: 'weekly',
    lastMod: '2024-01-12'
  },
  {
    id: 3,
    slug: 'ecommerce-strategies-conversion',
    title: "E-commerce : Stratégies de Conversion Ultra-Performantes",
    category: 'ecommerce',
    priority: 0.8,
    changeFreq: 'monthly',
    lastMod: '2024-01-10'
  },
  {
    id: 4,
    slug: 'blockchain-marketing-transparence',
    title: "Blockchain et Marketing : L'Avenir de la Transparence",
    category: 'blockchain',
    priority: 0.7,
    changeFreq: 'monthly',
    lastMod: '2024-01-08'
  },
  {
    id: 5,
    slug: 'analytics-avancees-donnees',
    title: "Analytics Avancées : Décoder les Données Complexes",
    category: 'analytics',
    priority: 0.8,
    changeFreq: 'monthly',
    lastMod: '2024-01-05'
  },
  {
    id: 6,
    slug: 'content-marketing-contenu-convertit',
    title: "Content Marketing : Créer du Contenu qui Convertit",
    category: 'content',
    priority: 0.8,
    changeFreq: 'monthly',
    lastMod: '2024-01-03'
  },
  {
    id: 7,
    slug: 'perplexity-ai-revolution-recherche-intelligente',
    title: "Perplexity AI 2025 : La Révolution de la Recherche Intelligente",
    category: 'ia-tech',
    priority: 0.95,
    changeFreq: 'weekly',
    lastMod: '2025-01-20'
  }
];

// Pages principales avec métadonnées SEO
const MAIN_PAGES = [
  {
    slug: '',
    title: 'Accueil - AllAdsMarket',
    priority: 1.0,
    changeFreq: 'daily'
  },
  {
    slug: 'products',
    title: 'Produits - AllAdsMarket',
    priority: 0.9,
    changeFreq: 'daily'
  },
  {
    slug: 'articles',
    title: 'Blog - AllAdsMarket',
    priority: 0.9,
    changeFreq: 'daily'
  },
  {
    slug: 'about',
    title: 'À Propos - AllAdsMarket',
    priority: 0.6,
    changeFreq: 'monthly'
  },
  {
    slug: 'contact',
    title: 'Contact - AllAdsMarket',
    priority: 0.5,
    changeFreq: 'monthly'
  },
  {
    slug: 'privacy',
    title: 'Politique de Confidentialité - AllAdsMarket',
    priority: 0.3,
    changeFreq: 'yearly'
  },
  {
    slug: 'terms',
    title: 'Conditions d\'Utilisation - AllAdsMarket',
    priority: 0.3,
    changeFreq: 'yearly'
  }
];

// Catégories avec métadonnées SEO
const CATEGORIES = [
  {
    slug: 'products/electronics',
    title: 'Électronique - AllAdsMarket',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    slug: 'products/home-garden',
    title: 'Maison et Jardin - AllAdsMarket',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    slug: 'articles/ia-tech',
    title: 'IA et Technologie - AllAdsMarket',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    slug: 'articles/seo',
    title: 'SEO - AllAdsMarket',
    priority: 0.8,
    changeFreq: 'weekly'
  },
  {
    slug: 'articles/ecommerce',
    title: 'E-commerce - AllAdsMarket',
    priority: 0.8,
    changeFreq: 'weekly'
  }
];

// Langues supportées
const SUPPORTED_LANGUAGES = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'hi', 'ar'];
const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_LANGUAGES);

const normalizePath = (input = '') => {
  let normalized = input || '/';
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length > 0 && SUPPORTED_LANGUAGE_SET.has(segments[0])) {
    segments.shift();
  }
  if (segments.length === 0) {
    return '/';
  }
  return `/${segments.join('/')}`;
};

const buildLocalizedPath = (lang, slug = '') => {
  const basePath = normalizePath(slug);
  if (lang === 'fr') {
    return basePath;
  }
  return basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
};

/**
 * Génère le sitemap XML principal
 */
export const generateMainSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SEO_CONFIG.baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.baseUrl}/sitemap-articles.xml</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.baseUrl}/sitemap-authors.xml</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.baseUrl}/sitemap-images.xml</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return sitemap;
};

/**
 * Génère le sitemap des pages principales
 */
export const generatePagesSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // Pages principales
  MAIN_PAGES.forEach(page => {
    const basePath = normalizePath(page.slug);
    sitemap += `
  <url>
    <loc>${SEO_CONFIG.baseUrl}${basePath}</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>`;
    
    // Langues alternatives
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (lang !== 'fr') {
        const langPath = buildLocalizedPath(lang, page.slug);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SEO_CONFIG.baseUrl}${langPath}" />`;
      }
    });
    
    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Génère le sitemap des articles
 */
export const generateArticlesSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  STATIC_ARTICLES.forEach(article => {
    const basePath = normalizePath(`articles/${article.slug}`);
    sitemap += `
  <url>
    <loc>${SEO_CONFIG.baseUrl}${basePath}</loc>
    <lastmod>${article.lastMod}</lastmod>
    <changefreq>${article.changeFreq}</changefreq>
    <priority>${article.priority}</priority>`;
    
    // Langues alternatives
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (lang !== 'fr') {
        const langPath = buildLocalizedPath(lang, `articles/${article.slug}`);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SEO_CONFIG.baseUrl}${langPath}" />`;
      }
    });
    
    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Génère le sitemap des catégories
 */
export const generateCategoriesSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  CATEGORIES.forEach(category => {
    const basePath = normalizePath(category.slug);
    sitemap += `
  <url>
    <loc>${SEO_CONFIG.baseUrl}${basePath}</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
    <changefreq>${category.changeFreq}</changefreq>
    <priority>${category.priority}</priority>`;
    
    // Langues alternatives
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (lang !== 'fr') {
        const langPath = buildLocalizedPath(lang, category.slug);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SEO_CONFIG.baseUrl}${langPath}" />`;
      }
    });
    
    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Génère le sitemap des auteurs
 */
export const generateAuthorsSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  Object.values(authors).forEach(author => {
    const basePath = normalizePath(`authors/${author.id}`);
    sitemap += `
  <url>
    <loc>${SEO_CONFIG.baseUrl}${basePath}</loc>
    <lastmod>${SEO_CONFIG.lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>`;
    
    // Langues alternatives
    SUPPORTED_LANGUAGES.forEach(lang => {
      if (lang !== 'fr') {
        const langPath = buildLocalizedPath(lang, `authors/${author.id}`);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${SEO_CONFIG.baseUrl}${langPath}" />`;
      }
    });
    
    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Génère le sitemap des images
 */
export const generateImagesSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // Images principales du site
  const mainImages = [
    {
      url: `${SEO_CONFIG.baseUrl}/logo.png`,
      caption: 'Logo AllAdsMarket',
      title: 'AllAdsMarket Logo'
    },
    {
      url: `${SEO_CONFIG.baseUrl}/og-image.jpg`,
      caption: 'Image Open Graph AllAdsMarket',
      title: 'AllAdsMarket Social Media Image'
    },
    {
      url: `${SEO_CONFIG.baseUrl}/twitter-card.jpg`,
      caption: 'Twitter Card AllAdsMarket',
      title: 'AllAdsMarket Twitter Card'
    }
  ];

  mainImages.forEach(image => {
    sitemap += `
  <url>
    <loc>${SEO_CONFIG.baseUrl}</loc>
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:caption>${image.caption}</image:caption>
      <image:title>${image.title}</image:title>
    </image:image>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

/**
 * Génère tous les sitemaps
 */
export const generateAllSitemaps = () => {
  return {
    main: generateMainSitemap(),
    pages: generatePagesSitemap(),
    articles: generateArticlesSitemap(),
    categories: generateCategoriesSitemap(),
    authors: generateAuthorsSitemap(),
    images: generateImagesSitemap()
  };
};

export default {
  generateMainSitemap,
  generatePagesSitemap,
  generateArticlesSitemap,
  generateCategoriesSitemap,
  generateAuthorsSitemap,
  generateImagesSitemap,
  generateAllSitemaps
};
