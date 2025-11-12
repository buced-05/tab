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

// Importer les articles dynamiques
let allAIArticles = [];
try {
  // Dynamically import the articles data
  const articlesModuleUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/premium-ai-articles.js')).href;
  const articlesModule = await import(articlesModuleUrl);
  allAIArticles = articlesModule.getAllPremiumAIArticles ? articlesModule.getAllPremiumAIArticles() : [];
  console.log(`📚 ${allAIArticles.length} articles IA chargés pour le sitemap`);
} catch (error) {
  console.log('⚠️  Impossible de charger les articles IA, utilisation des articles statiques uniquement');
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
  const lastmod = new Date().toISOString();
  
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

  staticPages.forEach(page => {
    const lastmod = page.lastmod || new Date().toISOString();
    const changefreq = page.changefreq || 'weekly';
    const priority = page.priority || 0.8;
    const basePath = normalizePath(page.path);

    // Page par défaut (français)
    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, page.path);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

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

  // Ajouter tous les articles IA dynamiquement chargés
  allAIArticles.forEach(article => {
    const lastmod = article.publishDate ? new Date(article.publishDate).toISOString() : new Date().toISOString();
    const priority = article.trending ? 0.9 : (article.featured ? 0.85 : 0.8);
    const changefreq = 'weekly';
    const basePath = normalizePath(`/ai-article/${article.slug}`);

    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/ai-article/${article.slug}`);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

    sitemap += `
  </url>`;
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

  // Ajouter tous les produits dynamiquement chargés
  allProducts.forEach(product => {
    const lastmod = new Date().toISOString();
    const priority = product.isFeatured ? 0.85 : (product.isTrending ? 0.8 : 0.75);
    const changefreq = 'weekly';
    
    // Use slug for SEO-friendly URLs, fallback to _id if no slug
    const productSlug = product.slug || product._id;
    const basePath = normalizePath(`/products/${productSlug}`);

    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/products/${productSlug}`);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

    sitemap += `
  </url>`;
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

  staticPages.forEach(page => {
    const lastmod = page.lastmod || new Date().toISOString();
    const changefreq = page.changefreq || 'weekly';
    const priority = (page.priority || 0.8) * langConfig.priority;

    const langPath = buildLocalizedPath(lang, page.path);
    const basePath = normalizePath(page.path);

    sitemap += `
  <url>
    <loc>${baseUrl}${langPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(altLang => {
      const altLangConfig = languageConfig[altLang];
      if (altLangConfig) {
        const altLangPath = buildLocalizedPath(altLang, page.path);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${baseUrl}${altLangPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

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
    sitemap += `
  <url>
    <loc>${baseUrl}${image.pagePath}</loc>
    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      <image:license>${image.license}</image:license>
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
    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${category.changefreq}</changefreq>
    <priority>${category.priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, category.slug);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

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
    const basePath = normalizePath(`/authors/${author.id}`);
    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${author.priority}</priority>`;

    // Balises hreflang pour toutes les langues
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        const langPath = buildLocalizedPath(lang, `/authors/${author.id}`);
        sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
      }
    });

    // Balise hreflang x-default
    sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${basePath}" />`;

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
    const langConfig = languageConfig['fr'];
    const publicationDate = article.publishDate ? new Date(article.publishDate).toISOString() : new Date().toISOString();
    const basePath = normalizePath(`/ai-article/${article.slug}`);
    
    sitemap += `
  <url>
    <loc>${baseUrl}${basePath}</loc>
    <news:news>
      <news:publication>
        <news:name>AllAdsMarket</news:name>
        <news:language>${langConfig.locale}</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${article.title || 'Article'}</news:title>
      <news:keywords>${article.metaKeywords || article.tags?.join(', ') || ''}</news:keywords>
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

    // Générer le sitemap principal
    const mainSitemap = generateMainSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), mainSitemap);
    // Also write a duplicate as sitemap-index.xml for compatibility
    fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), mainSitemap);
    console.log('✅ sitemap.xml généré');

    // Générer le sitemap des pages
    const pagesSitemap = generatePagesSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-pages.xml'), pagesSitemap);
    console.log('✅ sitemap-pages.xml généré');

    // Générer le sitemap des articles IA
    const articlesSitemap = generateArticlesSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-articles.xml'), articlesSitemap);
    console.log('✅ sitemap-articles.xml généré');

    // Générer le sitemap des produits
    const productsSitemap = generateProductsSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap-products.xml'), productsSitemap);
    console.log('✅ sitemap-products.xml généré');

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
    for (const sitemapFile of referencedSitemaps) {
      const filePath = path.join(outputDir, sitemapFile);
      if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${sitemapFile} existe`);
      } else {
        console.log(`  ❌ ${sitemapFile} MANQUANT!`);
        allFound = false;
      }
    }

    if (allFound) {
      console.log('\n🎉 Tous les sitemaps multilingues ont été générés avec succès!');
      console.log(`📁 Fichiers générés dans: ${outputDir}`);
      console.log(`📊 Total: ${referencedSitemaps.length} sitemaps référencés`);
    } else {
      console.log('\n⚠️  Certains sitemaps référencés sont manquants!');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Erreur lors de la génération des sitemaps:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateAllSitemaps();
