#!/usr/bin/env node

/**
 * 🗺️ Générateur de Sitemap SEO Avancé - AllAdsMarket
 * Crée un sitemap XML optimisé pour le référencement
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://alladsmarket.com';
const SITE_NAME = 'AllAdsMarket';
const CURRENT_DATE = new Date().toISOString();

// Couleurs pour les messages
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 1. Génération des URLs principales
function generateMainURLs() {
  log('\n1️⃣ Génération des URLs principales...', 'blue');
  
  const mainURLs = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: CURRENT_DATE,
      title: 'Accueil - AllAdsMarket',
      description: 'Guide d\'achat et comparatifs produits'
    },
    {
      url: '/produits',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: CURRENT_DATE,
      title: 'Produits - AllAdsMarket',
      description: 'Découvrez tous nos produits et guides d\'achat'
    },
    {
      url: '/articles',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: CURRENT_DATE,
      title: 'Articles - AllAdsMarket',
      description: 'Guides d\'achat détaillés et tests produits'
    },
    {
      url: '/categories',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: CURRENT_DATE,
      title: 'Catégories - AllAdsMarket',
      description: 'Explorez nos catégories de produits'
    },
    {
      url: '/a-propos',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: CURRENT_DATE,
      title: 'À Propos - AllAdsMarket',
      description: 'Découvrez notre équipe et notre mission'
    },
    {
      url: '/contact',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: CURRENT_DATE,
      title: 'Contact - AllAdsMarket',
      description: 'Contactez notre équipe d\'experts'
    },
    {
      url: '/politique-confidentialite',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: CURRENT_DATE,
      title: 'Politique de Confidentialité - AllAdsMarket',
      description: 'Notre politique de confidentialité'
    },
    {
      url: '/conditions-utilisation',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: CURRENT_DATE,
      title: 'Conditions d\'Utilisation - AllAdsMarket',
      description: 'Nos conditions d\'utilisation'
    }
  ];
  
  log(`✅ ${mainURLs.length} URLs principales générées`, 'green');
  return mainURLs;
}

// 2. Génération des URLs de catégories
function generateCategoryURLs() {
  log('\n2️⃣ Génération des URLs de catégories...', 'blue');
  
  const categories = [
    { slug: 'electronique', name: 'Électronique', priority: '0.8' },
    { slug: 'maison-jardin', name: 'Maison et Jardin', priority: '0.8' },
    { slug: 'mode-beaute', name: 'Mode et Beauté', priority: '0.8' },
    { slug: 'sport-loisirs', name: 'Sport et Loisirs', priority: '0.8' },
    { slug: 'automobile', name: 'Automobile', priority: '0.8' },
    { slug: 'alimentation', name: 'Alimentation', priority: '0.8' },
    { slug: 'bebe-enfant', name: 'Bébé et Enfant', priority: '0.8' },
    { slug: 'animaux', name: 'Animaux', priority: '0.8' },
    { slug: 'bricolage', name: 'Bricolage', priority: '0.8' },
    { slug: 'livres', name: 'Livres', priority: '0.8' }
  ];
  
  const categoryURLs = categories.map(category => ({
    url: `/categories/${category.slug}`,
    priority: category.priority,
    changefreq: 'weekly',
    lastmod: CURRENT_DATE,
    title: `${category.name} - AllAdsMarket`,
    description: `Guide d'achat ${category.name.toLowerCase()}`
  }));
  
  log(`✅ ${categoryURLs.length} URLs de catégories générées`, 'green');
  return categoryURLs;
}

// 3. Génération des URLs de produits
async function generateProductURLs() {
  log('\n3️⃣ Génération des URLs de produits...', 'blue');
  
  try {
    // Lire les données des produits
    const productsPath = path.join(__dirname, '../src/utils/sampleData.js');
    
    if (!fs.existsSync(productsPath)) {
      log('⚠️  Fichier sampleData.js non trouvé', 'yellow');
      return [];
    }
    
    // Import dynamique du module
    const { getSampleProducts } = await import('../src/utils/sampleData.js');
    const products = getSampleProducts();
    
    const productURLs = products.map(product => {
      // Générer un slug à partir du nom
      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100);
      
      return {
        url: `/produit/${product._id}`,
        priority: product.isFeatured ? '0.9' : '0.7',
        changefreq: 'weekly',
        lastmod: CURRENT_DATE,
        title: `${product.name} - AllAdsMarket`,
        description: product.description || `Guide d'achat ${product.name}`,
        images: product.images ? product.images.map(img => ({
          url: img.url,
          title: `${product.name} - Image`,
          caption: product.name
        })) : []
      };
    });
    
    log(`✅ ${productURLs.length} URLs de produits générées`, 'green');
    return productURLs;
    
  } catch (error) {
    log(`❌ Erreur lors de la génération des produits: ${error.message}`, 'red');
    return [];
  }
}

// 4. Génération des URLs d'articles
async function generateArticleURLs() {
  log('\n4️⃣ Génération des URLs d\'articles...', 'blue');
  
  try {
    const articlesPath = path.join(__dirname, '../src/data/articles.json');
    
    if (!fs.existsSync(articlesPath)) {
      log('⚠️  Fichier articles.json non trouvé', 'yellow');
      return [];
    }
    
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    
    const articleURLs = articlesData.map(article => {
      // Générer un slug à partir du titre
      const slug = article.title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100);
      
      return {
        url: `/article/${article.productId}`,
        priority: article.status === 'published' ? '0.8' : '0.5',
        changefreq: 'monthly',
        lastmod: CURRENT_DATE,
        title: article.title,
        description: article.excerpt || article.title,
        images: article.featuredImage ? [{
          url: article.featuredImage,
          title: article.title,
          caption: article.title
        }] : []
      };
    });
    
    log(`✅ ${articleURLs.length} URLs d'articles générées`, 'green');
    return articleURLs;
    
  } catch (error) {
    log(`❌ Erreur lors de la génération des articles: ${error.message}`, 'red');
    return [];
  }
}

// 5. Génération des URLs de recherche et filtres
function generateSearchURLs() {
  log('\n5️⃣ Génération des URLs de recherche...', 'blue');
  
  const searchTerms = [
    'guide-achat',
    'comparatif',
    'test-produit',
    'avis-expert',
    'meilleur-produit',
    'recommandation',
    'prix-bas',
    'promotion',
    'nouveaute',
    'tendance'
  ];
  
  const searchURLs = searchTerms.map(term => ({
    url: `/recherche/${term}`,
    priority: '0.6',
    changefreq: 'weekly',
    lastmod: CURRENT_DATE,
    title: `${term.replace('-', ' ')} - AllAdsMarket`,
    description: `Recherche ${term.replace('-', ' ')}`
  }));
  
  log(`✅ ${searchURLs.length} URLs de recherche générées`, 'green');
  return searchURLs;
}

// 6. Génération du sitemap XML
function generateSitemapXML(allURLs) {
  log('\n6️⃣ Génération du sitemap XML...', 'blue');
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  allURLs.forEach(urlData => {
    sitemap += `  <url>
    <loc>${SITE_URL}${urlData.url}</loc>
    <lastmod>${urlData.lastmod}</lastmod>
    <changefreq>${urlData.changefreq}</changefreq>
    <priority>${urlData.priority}</priority>`;
    
    // Ajouter les images si présentes
    if (urlData.images && urlData.images.length > 0) {
      urlData.images.forEach(image => {
        sitemap += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
    </image:image>`;
      });
    }
    
    sitemap += `
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  log('✅ Sitemap XML généré', 'green');
  return sitemap;
}

// 7. Génération du sitemap index
function generateSitemapIndex() {
  log('\n7️⃣ Génération du sitemap index...', 'blue');
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-news.xml</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
  </sitemap>
</sitemapindex>`;
  
  log('✅ Sitemap index généré', 'green');
  return sitemapIndex;
}

// 8. Génération du sitemap images
function generateImageSitemap(allURLs) {
  log('\n8️⃣ Génération du sitemap images...', 'blue');
  
  let imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  allURLs.forEach(urlData => {
    if (urlData.images && urlData.images.length > 0) {
      imageSitemap += `  <url>
    <loc>${SITE_URL}${urlData.url}</loc>
    <lastmod>${urlData.lastmod}</lastmod>`;
      
      urlData.images.forEach(image => {
        imageSitemap += `
    <image:image>
      <image:loc>${image.url}</image:loc>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
    </image:image>`;
      });
      
      imageSitemap += `
  </url>
`;
    }
  });

  imageSitemap += `</urlset>`;
  
  log('✅ Sitemap images généré', 'green');
  return imageSitemap;
}

// 9. Génération du sitemap news
function generateNewsSitemap(allURLs) {
  log('\n7️⃣ Génération du sitemap news...', 'blue');
  
  let newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Filtrer les articles récents (derniers 2 jours)
  const recentArticles = allURLs.filter(url => 
    url.url.startsWith('/article/') && 
    new Date(url.lastmod) > new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  );

  recentArticles.forEach(article => {
    newsSitemap += `  <url>
    <loc>${SITE_URL}${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${article.lastmod}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>
`;
  });

  newsSitemap += `</urlset>`;
  
  log(`✅ Sitemap news généré (${recentArticles.length} articles récents)`, 'green');
  return newsSitemap;
}

// Fonction principale
async function generateSEOSitemap() {
  log('🗺️ Génération du Sitemap SEO Avancé - AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  try {
    // 1. Générer toutes les URLs
    const mainURLs = generateMainURLs();
    const categoryURLs = generateCategoryURLs();
    const productURLs = await generateProductURLs();
    const articleURLs = await generateArticleURLs();
    const searchURLs = generateSearchURLs();
    
    // 2. Combiner toutes les URLs
    const allURLs = [
      ...mainURLs,
      ...categoryURLs,
      ...productURLs,
      ...articleURLs,
      ...searchURLs
    ];
    
    log(`\n📊 Total des URLs: ${allURLs.length}`, 'magenta');
    
    // 3. Générer les sitemaps
    const sitemapXML = generateSitemapXML(allURLs);
    const sitemapIndex = generateSitemapIndex();
    const imageSitemap = generateImageSitemap(allURLs);
    const newsSitemap = generateNewsSitemap(allURLs);
    
    // 4. Sauvegarder les fichiers
    const publicDir = path.join(__dirname, '../public');
    
    // Sitemap principal
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML);
    log('✅ sitemap.xml sauvegardé', 'green');
    
    // Sitemap index
    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
    log('✅ sitemap-index.xml sauvegardé', 'green');
    
    // Sitemap images
    fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imageSitemap);
    log('✅ sitemap-images.xml sauvegardé', 'green');
    
    // Sitemap news
    fs.writeFileSync(path.join(publicDir, 'sitemap-news.xml'), newsSitemap);
    log('✅ sitemap-news.xml sauvegardé', 'green');
    
    // 5. Mettre à jour robots.txt
    updateRobotsTxt();
    
    // Résumé
    log('\n📊 Résumé de la génération:', 'magenta');
    log('='.repeat(60), 'magenta');
    
    log(`✅ URLs principales: ${mainURLs.length}`, 'green');
    log(`✅ URLs catégories: ${categoryURLs.length}`, 'green');
    log(`✅ URLs produits: ${productURLs.length}`, 'green');
    log(`✅ URLs articles: ${articleURLs.length}`, 'green');
    log(`✅ URLs recherche: ${searchURLs.length}`, 'green');
    log(`✅ Total URLs: ${allURLs.length}`, 'green');
    
    log('\n📁 Fichiers générés:', 'blue');
    log('   📄 sitemap.xml (principal)', 'cyan');
    log('   📄 sitemap-index.xml (index)', 'cyan');
    log('   📄 sitemap-images.xml (images)', 'cyan');
    log('   📄 sitemap-news.xml (actualités)', 'cyan');
    log('   📄 robots.txt (mis à jour)', 'cyan');
    
    log('\n💡 Prochaines étapes:', 'blue');
    log('   1. Soumettez les sitemaps aux moteurs de recherche', 'blue');
    log('   2. Vérifiez l\'indexation dans Search Console', 'blue');
    log('   3. Surveillez les erreurs de crawl', 'blue');
    log('   4. Mettez à jour régulièrement', 'blue');
    
    return {
      totalURLs: allURLs.length,
      mainURLs: mainURLs.length,
      categoryURLs: categoryURLs.length,
      productURLs: productURLs.length,
      articleURLs: articleURLs.length,
      searchURLs: searchURLs.length
    };
    
  } catch (error) {
    log(`❌ Erreur lors de la génération: ${error.message}`, 'red');
    return null;
  }
}

// Mettre à jour robots.txt
function updateRobotsTxt() {
  log('\n9️⃣ Mise à jour de robots.txt...', 'blue');
  
  const robotsContent = `# AllAdsMarket - Robots.txt
# Optimisé pour le SEO et l'indexation des moteurs de recherche

# Règles générales pour tous les robots
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /_next/
Disallow: /node_modules/
Disallow: /*.json$
Disallow: /*.js$
Disallow: /*.css$

# Règles spécifiques pour Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Règles spécifiques pour Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Règles spécifiques pour Yandex
User-agent: YandexBot
Allow: /
Crawl-delay: 2

# Règles pour les images
User-agent: Googlebot-Image
Allow: /images/
Allow: /assets/
Disallow: /admin/images/

# Règles pour les vidéos
User-agent: Googlebot-Video
Allow: /videos/
Disallow: /admin/videos/

# Bloquer les bots malveillants
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-index.xml
Sitemap: ${SITE_URL}/sitemap-images.xml
Sitemap: ${SITE_URL}/sitemap-news.xml

# Informations sur le site
Host: ${SITE_URL}`;

  const publicDir = path.join(__dirname, '../public');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent);
  
  log('✅ robots.txt mis à jour', 'green');
}

// Exécuter la génération
generateSEOSitemap();

export { generateSEOSitemap };
