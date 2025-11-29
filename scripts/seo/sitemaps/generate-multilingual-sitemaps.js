#!/usr/bin/env node

/**
 * Script pour générer les sitemaps multilingues pour le SEO international
 * Usage: node scripts/generate-multilingual-sitemaps.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const baseUrl = 'https://alladsmarket.com';
// Always write to the project root dist directory
const outputDir = path.resolve(__dirname, '../../../dist');

// Fonction pour échapper les caractères XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Fonction pour valider une URL
function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname === 'alladsmarket.com';
  } catch {
    return false;
  }
}

// Limites Google Sitemap
const MAX_URLS_PER_SITEMAP = 50000;
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Importer les articles dynamiques
let allAIArticles = [];
try {
  // Utiliser premium-ai-articles.js qui a la fonction getAllPremiumAIArticles qui combine tout
  const premiumArticlesUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/premium-ai-articles.js')).href;
  const premiumModule = await import(premiumArticlesUrl);
  
  // Utiliser la fonction qui combine tous les articles
  if (premiumModule.getAllPremiumAIArticles) {
    allAIArticles = premiumModule.getAllPremiumAIArticles();
  } else if (premiumModule.getAllArticles) {
    allAIArticles = premiumModule.getAllArticles();
  } else {
    // Fallback : importer directement les fichiers individuels
    const customArticlesUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/custom-articles-2025.js')).href;
    const seoArticlesUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/seo-articles-30.js')).href;
    
    const [customModule, seoModule] = await Promise.all([
      import(customArticlesUrl).catch(() => ({ customArticles2025: [] })),
      import(seoArticlesUrl).catch(() => ({ seoArticles30: [] }))
    ]);
    
    const customArticles = customModule.customArticles2025 || [];
    const seoArticles = seoModule.seoArticles30 || [];
    allAIArticles = [...customArticles, ...seoArticles];
  }
  
  // Filtrer les articles valides (avec slug)
  allAIArticles = allAIArticles.filter(article => article && article.slug);
  
  // Compter par source pour le rapport
  const trendingCount = allAIArticles.filter(a => a.id && a.id.startsWith('trending-')).length;
  const customCount = allAIArticles.filter(a => a.id && a.id.includes('custom')).length;
  const seoCount = allAIArticles.filter(a => a.id && a.id.includes('seo')).length;
  
  console.log(`📚 ${allAIArticles.length} articles IA chargés pour le sitemap`);
  console.log(`   - ${trendingCount} articles trending`);
  console.log(`   - ${customCount} articles custom`);
  console.log(`   - ${seoCount} articles SEO`);
  
  if (allAIArticles.length === 0) {
    console.warn('⚠️  Aucun article trouvé dans les fichiers sources');
  }
} catch (error) {
  console.error('❌ Erreur lors du chargement des articles IA:', error.message);
  console.log('⚠️  Tentative de chargement alternatif...');
  
  // Tentative alternative : charger les fichiers un par un
  try {
    const customArticlesUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/custom-articles-2025.js')).href;
    const seoArticlesUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/seo-articles-30.js')).href;
    
    const [customModule, seoModule] = await Promise.all([
      import(customArticlesUrl).catch(() => ({ customArticles2025: [] })),
      import(seoArticlesUrl).catch(() => ({ seoArticles30: [] }))
    ]);
    
    const customArticles = customModule.customArticles2025 || [];
    const seoArticles = seoModule.seoArticles30 || [];
    allAIArticles = [...customArticles, ...seoArticles].filter(article => article && article.slug);
    
    console.log(`📚 ${allAIArticles.length} articles chargés (méthode alternative)`);
  } catch (fallbackError) {
    console.error('❌ Erreur lors du chargement alternatif:', fallbackError.message);
    console.log('⚠️  Utilisation des articles statiques uniquement');
  }
}

// Importer les produits dynamiques
let allProducts = [];
try {
  // Dynamically import the products data
  const productsModuleUrl = pathToFileURL(path.resolve(__dirname, '../../../src/utils/sampleData.js')).href;
  const productsModule = await import(productsModuleUrl);
  allProducts = productsModule.getAllProducts ? productsModule.getAllProducts() : [];
  console.log(`🛍️  ${allProducts.length} produits chargés pour le sitemap`);
} catch (error) {
  console.log('⚠️  Impossible de charger les produits, utilisation des produits statiques uniquement');
}

// Pages statiques
const staticPages = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/ai-articles',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/products',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/trending',
    priority: 0.85,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/featured',
    priority: 0.8,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/categories',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/articles',
    priority: 0.8,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/revolutionary-blog',
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/about',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/contact',
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/privacy',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/terms',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  }
];

// Langues supportées
const supportedLanguages = [
  'fr', 'en', 'en-GB', 'de', 'es', 'it', 'pt', 'pt-BR',
  'nl', 'sv', 'no', 'ru', 'ja', 'zh', 'hi', 'ar', 'sw', 'am'
];
const supportedLanguageSet = new Set(supportedLanguages);

// Configuration des langues
const languageConfig = {
  'fr': { locale: 'fr_FR', region: 'FR', country: 'France', priority: 1.0 },
  'en': { locale: 'en_US', region: 'US', country: 'United States', priority: 0.9 },
  'en-GB': { locale: 'en_GB', region: 'GB', country: 'United Kingdom', priority: 0.9 },
  'de': { locale: 'de_DE', region: 'DE', country: 'Germany', priority: 0.8 },
  'es': { locale: 'es_ES', region: 'ES', country: 'Spain', priority: 0.8 },
  'it': { locale: 'it_IT', region: 'IT', country: 'Italy', priority: 0.8 },
  'pt': { locale: 'pt_PT', region: 'PT', country: 'Portugal', priority: 0.7 },
  'pt-BR': { locale: 'pt_BR', region: 'BR', country: 'Brazil', priority: 0.7 },
  'nl': { locale: 'nl_NL', region: 'NL', country: 'Netherlands', priority: 0.7 },
  'sv': { locale: 'sv_SE', region: 'SE', country: 'Sweden', priority: 0.6 },
  'no': { locale: 'no_NO', region: 'NO', country: 'Norway', priority: 0.6 },
  'ru': { locale: 'ru_RU', region: 'RU', country: 'Russia', priority: 0.6 },
  'ja': { locale: 'ja_JP', region: 'JP', country: 'Japan', priority: 0.5 },
  'zh': { locale: 'zh_CN', region: 'CN', country: 'China', priority: 0.5 },
  'hi': { locale: 'hi_IN', region: 'IN', country: 'India', priority: 0.5 },
  'ar': { locale: 'ar_SA', region: 'SA', country: 'Saudi Arabia', priority: 0.4 },
  'sw': { locale: 'sw_KE', region: 'KE', country: 'Kenya', priority: 0.4 },
  'am': { locale: 'am_ET', region: 'ET', country: 'Ethiopia', priority: 0.4 }
};

const normalizePath = (inputPath = '/') => {
  let normalized = inputPath || '/';
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  const segments = normalized.split('/').filter(Boolean);
  if (segments.length > 0 && supportedLanguageSet.has(segments[0])) {
    segments.shift();
  }
  if (segments.length === 0) {
    return '/';
  }
  return `/${segments.join('/')}`;
};

const buildLocalizedPath = (lang, inputPath = '/') => {
  const sanitized = normalizePath(inputPath);
  if (lang === 'fr') {
    return sanitized;
  }
  return sanitized === '/' ? `/${lang}` : `/${lang}${sanitized}`;
};

// Générer le sitemap principal
function generateMainSitemap() {
  const lastmod = new Date().toISOString(); // Toujours utiliser la date actuelle
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-articles.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-products.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-authors.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;

  // Ajouter des sitemaps par langue
  supportedLanguages.forEach(lang => {
    const langConfig = languageConfig[lang];
    if (langConfig) {
      sitemap += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    }
  });

  sitemap += `
</sitemapindex>`;
  return sitemap;
}

// Générer le sitemap des pages multilingues
function generatePagesSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const currentDate = new Date().toISOString();
  
  staticPages.forEach(page => {
    const lastmod = currentDate; // Toujours utiliser la date actuelle
    const changefreq = page.changefreq || 'weekly';
    const priority = page.priority || 0.8;
    const basePath = normalizePath(page.path);
    const fullUrl = `${baseUrl}${basePath}`;

    // Valider l'URL
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    // Page par défaut (français)
    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, page.path);
        const langUrl = `${baseUrl}${langPath}`;
        if (isValidUrl(langUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />`;

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des articles IA
function generateArticlesSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  let urlCount = 0;
  const currentDate = new Date().toISOString();

  // Ajouter tous les articles IA dynamiquement chargés
  allAIArticles.forEach(article => {
    // Vérifier les limites
    if (urlCount >= MAX_URLS_PER_SITEMAP) {
      console.warn(`⚠️  Limite de ${MAX_URLS_PER_SITEMAP} URLs atteinte pour sitemap-articles.xml`);
      return;
    }

    if (!article.slug) {
      console.warn(`⚠️  Article sans slug ignoré: ${article.title || 'Unknown'}`);
      return;
    }

    const lastmod = article.publishDate ? new Date(article.publishDate).toISOString() : currentDate;
    const priority = article.trending ? 0.9 : (article.featured ? 0.85 : 0.8);
    const changefreq = 'weekly';
    const basePath = normalizePath(`/ai-article/${escapeXml(article.slug)}`);
    const fullUrl = `${baseUrl}${basePath}`;

    // Valider l'URL
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/ai-article/${article.slug}`);
        const langUrl = `${baseUrl}${langPath}`;
        if (isValidUrl(langUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />`;

    sitemap += `
  </url>`;
    urlCount++;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des produits
function generateProductsSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  let urlCount = 0;
  const currentDate = new Date().toISOString();

  // Ajouter tous les produits dynamiquement chargés
  allProducts.forEach(product => {
    // Vérifier les limites
    if (urlCount >= MAX_URLS_PER_SITEMAP) {
      console.warn(`⚠️  Limite de ${MAX_URLS_PER_SITEMAP} URLs atteinte pour sitemap-products.xml`);
      return;
    }

    const lastmod = currentDate;
    const priority = product.isFeatured ? 0.85 : (product.isTrending ? 0.8 : 0.75);
    const changefreq = 'weekly';
    
    // Use slug for SEO-friendly URLs, fallback to _id if no slug
    const productSlug = product.slug || product._id;
    if (!productSlug) {
      console.warn(`⚠️  Produit sans slug ni _id ignoré: ${product.name || 'Unknown'}`);
      return;
    }

    const basePath = normalizePath(`/products/${escapeXml(productSlug)}`);
    const fullUrl = `${baseUrl}${basePath}`;

    // Valider l'URL
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/products/${productSlug}`);
        const langUrl = `${baseUrl}${langPath}`;
        if (isValidUrl(langUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />`;

    sitemap += `
  </url>`;
    urlCount++;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap par langue
function generateLanguageSitemap(lang) {
  const langConfig = languageConfig[lang];
  if (!langConfig) return '';

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const currentDate = new Date().toISOString();
  
  staticPages.forEach(page => {
    const lastmod = currentDate; // Toujours utiliser la date actuelle
    const changefreq = page.changefreq || 'weekly';
    const priority = (page.priority || 0.8) * langConfig.priority;

    const langPath = buildLocalizedPath(lang, page.path);
    const basePath = normalizePath(page.path);
    const fullUrl = `${baseUrl}${langPath}`;

    // Valider l'URL
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(altLang => {
      const altLangConfig = languageConfig[altLang];
      if (altLangConfig) {
        const altLangPath = buildLocalizedPath(altLang, page.path);
        const altLangUrl = `${baseUrl}${altLangPath}`;
        if (isValidUrl(altLangUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(altLangUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    const defaultUrl = `${baseUrl}${basePath}`;
    if (isValidUrl(defaultUrl)) {
      sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(defaultUrl)}" />`;
    }

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des images
function generateImagesSitemap() {
  const images = [
    {
      pagePath: '/',
      url: '/og-image.jpg',
      title: 'AllAdsMarket - Premium Affiliate Marketplace',
      caption: 'AllAdsMarket - Votre marketplace d\'affiliation premium',
      license: baseUrl
    },
    {
      pagePath: '/',
      url: '/logo.png',
      title: 'AllAdsMarket Logo',
      caption: 'Logo AllAdsMarket',
      license: baseUrl
    }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  images.forEach(image => {
    const pageUrl = `${baseUrl}${image.pagePath}`;
    const imageUrl = `${baseUrl}${image.url}`;
    
    if (!isValidUrl(pageUrl) || !isValidUrl(imageUrl)) {
      console.warn(`⚠️  URL invalide ignorée pour image: ${imageUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(pageUrl)}</loc>
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
      <image:license>${escapeXml(image.license)}</image:license>
    </image:image>
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des catégories
function generateCategoriesSitemap() {
  // Catégories de produits
  const categories = [
    { slug: 'categories/electronics', priority: 0.8, changefreq: 'weekly' },
    { slug: 'categories/clothing', priority: 0.8, changefreq: 'weekly' },
    { slug: 'categories/home-garden', priority: 0.8, changefreq: 'weekly' },
    { slug: 'categories/sports', priority: 0.7, changefreq: 'weekly' },
    { slug: 'categories/books', priority: 0.7, changefreq: 'weekly' },
    { slug: 'categories/toys', priority: 0.7, changefreq: 'weekly' },
    { slug: 'categories/beauty', priority: 0.8, changefreq: 'weekly' },
    { slug: 'categories/health', priority: 0.8, changefreq: 'weekly' }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const lastmod = new Date().toISOString();

  categories.forEach(category => {
    const basePath = normalizePath(category.slug);
    const fullUrl = `${baseUrl}${basePath}`;
    
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${category.changefreq}</changefreq>
    <priority>${category.priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, category.slug);
        const langUrl = `${baseUrl}${langPath}`;
        if (isValidUrl(langUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />`;

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des auteurs
function generateAuthorsSitemap() {
  // Auteurs par défaut (peut être étendu avec des données réelles)
  const authors = [
    { id: 'alladsmarket', name: 'AllAdsMarket Team', priority: 0.7 },
    { id: 'admin', name: 'Administrator', priority: 0.6 }
  ];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  const lastmod = new Date().toISOString();

  authors.forEach(author => {
    if (!author.id) {
      console.warn(`⚠️  Auteur sans ID ignoré: ${author.name || 'Unknown'}`);
      return;
    }

    const basePath = normalizePath(`/authors/${escapeXml(author.id)}`);
    const fullUrl = `${baseUrl}${basePath}`;
    
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${author.priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/authors/${author.id}`);
        const langUrl = `${baseUrl}${langPath}`;
        if (isValidUrl(langUrl)) {
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(langUrl)}" />`;
        }
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fullUrl)}" />`;

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Générer le sitemap des actualités
function generateNewsSitemap() {
  // Utiliser les articles récents pour le sitemap news
  const recentArticles = allAIArticles
    .filter(article => article.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 10); // Limiter à 10 articles récents

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  recentArticles.forEach(article => {
    if (!article.slug) {
      console.warn(`⚠️  Article sans slug ignoré pour news sitemap: ${article.title || 'Unknown'}`);
      return;
    }

    const langConfig = languageConfig['fr'];
    const publicationDate = article.publishDate ? new Date(article.publishDate).toISOString() : new Date().toISOString();
    const basePath = normalizePath(`/ai-article/${escapeXml(article.slug)}`);
    const fullUrl = `${baseUrl}${basePath}`;
    
    if (!isValidUrl(fullUrl)) {
      console.warn(`⚠️  URL invalide ignorée: ${fullUrl}`);
      return;
    }

    const title = escapeXml(article.title || 'Article');
    const keywords = escapeXml(article.metaKeywords || article.tags?.join(', ') || '');
    
    sitemap += `
  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <news:news>
      <news:publication>
        <news:name>AllAdsMarket</news:name>
        <news:language>${langConfig.locale}</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${title}</news:title>
      <news:keywords>${keywords}</news:keywords>
    </news:news>
  </url>`;
  });

  sitemap += `
</urlset>`;
  return sitemap;
}

// Fonction principale
async function generateAllSitemaps() {
  try {
    console.log('🚀 Génération des sitemaps multilingues...');

    // Créer le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Générer le sitemap principal avec date actuelle
    const mainSitemap = generateMainSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), mainSitemap, 'utf8');
    // Also write a duplicate as sitemap-index.xml for compatibility
    fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), mainSitemap, 'utf8');
    console.log('✅ sitemap.xml et sitemap-index.xml générés');

    // Générer le sitemap des pages
    const pagesSitemap = generatePagesSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-pages.xml'), pagesSitemap);
    console.log('✅ sitemap-pages.xml généré');

    // Générer le sitemap des articles IA
    const articlesSitemap = generateArticlesSitemap();
    const articlesSitemapPath = path.join(outputDir, 'sitemap-articles.xml');
    fs.writeFileSync(articlesSitemapPath, articlesSitemap, 'utf8');
    const articlesSize = fs.statSync(articlesSitemapPath).size;
    if (articlesSize > MAX_FILE_SIZE_BYTES) {
      console.warn(`⚠️  sitemap-articles.xml dépasse ${MAX_FILE_SIZE_MB}MB (${(articlesSize / 1024 / 1024).toFixed(2)}MB)`);
    }
    console.log(`✅ sitemap-articles.xml généré (${(articlesSize / 1024).toFixed(2)}KB)`);

    // Générer le sitemap des produits
    const productsSitemap = generateProductsSitemap();
    const productsSitemapPath = path.join(outputDir, 'sitemap-products.xml');
    fs.writeFileSync(productsSitemapPath, productsSitemap, 'utf8');
    const productsSize = fs.statSync(productsSitemapPath).size;
    if (productsSize > MAX_FILE_SIZE_BYTES) {
      console.warn(`⚠️  sitemap-products.xml dépasse ${MAX_FILE_SIZE_MB}MB (${(productsSize / 1024 / 1024).toFixed(2)}MB)`);
    }
    console.log(`✅ sitemap-products.xml généré (${(productsSize / 1024).toFixed(2)}KB)`);

    // Générer le sitemap des images
    const imagesSitemap = generateImagesSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-images.xml'), imagesSitemap);
    console.log('✅ sitemap-images.xml généré');

    // Générer le sitemap des catégories
    const categoriesSitemap = generateCategoriesSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-categories.xml'), categoriesSitemap);
    console.log('✅ sitemap-categories.xml généré');

    // Générer le sitemap des auteurs
    const authorsSitemap = generateAuthorsSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-authors.xml'), authorsSitemap);
    console.log('✅ sitemap-authors.xml généré');

    // Générer le sitemap des actualités
    const newsSitemap = generateNewsSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-news.xml'), newsSitemap);
    console.log('✅ sitemap-news.xml généré');

    // Générer les sitemaps par langue
    for (const lang of supportedLanguages) {
      const langSitemap = generateLanguageSitemap(lang);
      if (langSitemap) {
        fs.writeFileSync(path.join(outputDir, `sitemap-${lang}.xml`), langSitemap);
        console.log(`✅ sitemap-${lang}.xml généré`);
      }
    }

    // Vérifier que tous les sitemaps référencés existent
    console.log('\n🔍 Vérification des sitemaps...');
    const mainSitemapContent = fs.readFileSync(path.join(outputDir, 'sitemap.xml'), 'utf8');
    const sitemapMatches = mainSitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];
    const referencedSitemaps = sitemapMatches.map(match => {
      const url = match.replace('<loc>', '').replace('</loc>', '');
      return url.split('/').pop();
    });

    let allFound = true;
    let validationErrors = [];

    for (const sitemapFile of referencedSitemaps) {
      const filePath = path.join(outputDir, sitemapFile);
      if (fs.existsSync(filePath)) {
        const fileSize = fs.statSync(filePath).size;
        const fileSizeMB = fileSize / 1024 / 1024;
        
        // Vérifier la taille du fichier
        if (fileSize > MAX_FILE_SIZE_BYTES) {
          validationErrors.push(`${sitemapFile} dépasse ${MAX_FILE_SIZE_MB}MB (${fileSizeMB.toFixed(2)}MB)`);
        }
        
        // Vérifier le format XML de base
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          // Vérifier que c'est du XML valide (structure de base)
          if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
            validationErrors.push(`${sitemapFile} n'a pas d'en-tête XML valide`);
          }
          if (!content.includes('<urlset') && !content.includes('<sitemapindex')) {
            validationErrors.push(`${sitemapFile} n'a pas de structure XML valide`);
          }
          
          // Compter les URLs
          const urlMatches = content.match(/<url>/g) || [];
          const urlCount = urlMatches.length;
          if (urlCount > MAX_URLS_PER_SITEMAP) {
            validationErrors.push(`${sitemapFile} contient ${urlCount} URLs (limite: ${MAX_URLS_PER_SITEMAP})`);
          }
          
          console.log(`  ✅ ${sitemapFile} existe (${(fileSize / 1024).toFixed(2)}KB, ${urlCount} URLs)`);
        } catch (error) {
          validationErrors.push(`Erreur lors de la lecture de ${sitemapFile}: ${error.message}`);
        }
      } else {
        console.log(`  ❌ ${sitemapFile} MANQUANT!`);
        allFound = false;
      }
    }

    if (validationErrors.length > 0) {
      console.log('\n⚠️  Erreurs de validation détectées:');
      validationErrors.forEach(error => console.log(`  - ${error}`));
    }

    if (allFound && validationErrors.length === 0) {
      console.log('\n🎉 Tous les sitemaps multilingues ont été générés avec succès!');
      console.log(`📁 Fichiers générés dans: ${outputDir}`);
      console.log(`📊 Total: ${referencedSitemaps.length} sitemaps référencés`);
      console.log('✅ Validation réussie - Prêt pour Google Search Console');
    } else {
      console.log('\n⚠️  Certains problèmes ont été détectés!');
      if (!allFound) {
        console.log('  - Certains sitemaps référencés sont manquants');
      }
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erreur lors de la génération des sitemaps:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateAllSitemaps();
