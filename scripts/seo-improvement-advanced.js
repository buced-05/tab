#!/usr/bin/env node

/**
 * AMÉLIORATION SEO AVANCÉE - ALLADSMARKET
 * Script d'optimisation et d'amélioration du SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://alladsmarket.com';
const SITE_NAME = 'AllAdsMarket';

// Couleurs pour la console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Fonction de génération de sitemap avancé
const generateAdvancedSitemap = () => {
  log('\n🗺️ GÉNÉRATION DE SITEMAP AVANCÉ', 'cyan');
  log('================================', 'cyan');

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.jpg</image:loc>
      <image:title>${SITE_NAME} - Marketplace d'Affiliation Premium</image:title>
      <image:caption>Découvrez les meilleurs produits tendances et offres exclusives</image:caption>
    </image:image>
  </url>
  
  <!-- Products Page -->
  <url>
    <loc>${BASE_URL}/products</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Articles Page -->
  <url>
    <loc>${BASE_URL}/articles</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Featured Products -->
  <url>
    <loc>${BASE_URL}/featured</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Trending Products -->
  <url>
    <loc>${BASE_URL}/trending</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Categories -->
  <url>
    <loc>${BASE_URL}/categories</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Electronics Category -->
  <url>
    <loc>${BASE_URL}/products?category=electronics</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Fashion Category -->
  <url>
    <loc>${BASE_URL}/products?category=fashion</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Home & Garden Category -->
  <url>
    <loc>${BASE_URL}/products?category=home</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Beauty Category -->
  <url>
    <loc>${BASE_URL}/products?category=beauty</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Sports Category -->
  <url>
    <loc>${BASE_URL}/products?category=sports</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Books Category -->
  <url>
    <loc>${BASE_URL}/products?category=books</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Automotive Category -->
  <url>
    <loc>${BASE_URL}/products?category=automotive</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Baby Category -->
  <url>
    <loc>${BASE_URL}/products?category=baby</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Pet Category -->
  <url>
    <loc>${BASE_URL}/products?category=pet</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Tools Category -->
  <url>
    <loc>${BASE_URL}/products?category=tools</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Business Category -->
  <url>
    <loc>${BASE_URL}/products?category=business</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Contact Page -->
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- FAQ Page -->
  <url>
    <loc>${BASE_URL}/faq</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Help Center -->
  <url>
    <loc>${BASE_URL}/help</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Shipping Info -->
  <url>
    <loc>${BASE_URL}/shipping</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Returns -->
  <url>
    <loc>${BASE_URL}/returns</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Privacy Policy -->
  <url>
    <loc>${BASE_URL}/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Terms of Service -->
  <url>
    <loc>${BASE_URL}/terms</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Affiliate Links Page -->
  <url>
    <loc>${BASE_URL}/visited-items</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
  </url>
  
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemapContent);
  log('✅ Sitemap principal généré', 'green');
};

// Fonction de génération de sitemap d'images
const generateImageSitemap = () => {
  log('\n📸 GÉNÉRATION DE SITEMAP D\'IMAGES', 'cyan');
  log('==================================', 'cyan');

  const imageSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage Images -->
  <url>
    <loc>${BASE_URL}/</loc>
    <image:image>
      <image:loc>${BASE_URL}/og-image.jpg</image:loc>
      <image:title>${SITE_NAME} - Marketplace d'Affiliation Premium</image:title>
      <image:caption>Découvrez les meilleurs produits tendances et offres exclusives</image:caption>
    </image:image>
    <image:image>
      <image:loc>${BASE_URL}/logo.png</image:loc>
      <image:title>Logo ${SITE_NAME}</image:title>
      <image:caption>Logo officiel de ${SITE_NAME}</image:caption>
    </image:image>
  </url>
  
  <!-- Products Page Images -->
  <url>
    <loc>${BASE_URL}/products</loc>
    <image:image>
      <image:loc>${BASE_URL}/images/products/featured-products.jpg</image:loc>
      <image:title>Produits Vedettes</image:title>
      <image:caption>Collection des meilleurs produits du moment</image:caption>
    </image:image>
  </url>
  
  <!-- Articles Page Images -->
  <url>
    <loc>${BASE_URL}/articles</loc>
    <image:image>
      <image:loc>${BASE_URL}/images/articles/academic-articles.jpg</image:loc>
      <image:title>Articles Académiques</image:title>
      <image:caption>Publications scientifiques et analyses techniques</image:caption>
    </image:image>
  </url>
  
  <!-- Category Images -->
  <url>
    <loc>${BASE_URL}/categories</loc>
    <image:image>
      <image:loc>${BASE_URL}/images/categories/electronics.jpg</image:loc>
      <image:title>Électronique</image:title>
      <image:caption>Produits électroniques et technologiques</image:caption>
    </image:image>
    <image:image>
      <image:loc>${BASE_URL}/images/categories/fashion.jpg</image:loc>
      <image:title>Mode</image:title>
      <image:caption>Vêtements et accessoires de mode</image:caption>
    </image:image>
    <image:image>
      <image:loc>${BASE_URL}/images/categories/home.jpg</image:loc>
      <image:title>Maison & Jardin</image:title>
      <image:caption>Décoration et équipement pour la maison</image:caption>
    </image:image>
  </url>
  
</urlset>`;

  fs.writeFileSync('public/sitemap-images.xml', imageSitemapContent);
  log('✅ Sitemap d\'images généré', 'green');
};

// Fonction de génération de sitemap de news
const generateNewsSitemap = () => {
  log('\n📰 GÉNÉRATION DE SITEMAP DE NEWS', 'cyan');
  log('=================================', 'cyan');

  const newsSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  
  <!-- Recent Articles -->
  <url>
    <loc>${BASE_URL}/articles</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE_NAME}</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${new Date().toISOString()}</news:publication_date>
      <news:title>Articles & Publications Scientifiques</news:title>
      <news:keywords>articles, publications, scientifiques, analyses, produits</news:keywords>
    </news:news>
  </url>
  
</urlset>`;

  fs.writeFileSync('public/sitemap-news.xml', newsSitemapContent);
  log('✅ Sitemap de news généré', 'green');
};

// Fonction de génération de sitemap index
const generateSitemapIndex = () => {
  log('\n📋 GÉNÉRATION DE SITEMAP INDEX', 'cyan');
  log('===============================', 'cyan');

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <sitemap>
    <loc>${BASE_URL}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  
  <sitemap>
    <loc>${BASE_URL}/sitemap-news.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  
</sitemapindex>`;

  fs.writeFileSync('public/sitemap-index.xml', sitemapIndexContent);
  log('✅ Sitemap index généré', 'green');
};

// Fonction d'amélioration du robots.txt
const improveRobotsTxt = () => {
  log('\n🤖 AMÉLIORATION DU ROBOTS.TXT', 'cyan');
  log('=============================', 'cyan');

  const robotsContent = `# ${SITE_NAME} - Robots.txt
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
Disallow: /*.map$

# Sitemap principal
Sitemap: ${BASE_URL}/sitemap.xml

# Sitemaps spécifiques
Sitemap: ${BASE_URL}/sitemap-index.xml
Sitemap: ${BASE_URL}/sitemap-images.xml
Sitemap: ${BASE_URL}/sitemap-news.xml

# Règles spécifiques pour Google
User-agent: Googlebot
Allow: /
Allow: /products/
Allow: /featured/
Allow: /trending/
Allow: /categories/
Allow: /articles/
Allow: /affiliate-links/
Crawl-delay: 1

# Règles spécifiques pour Bing
User-agent: Bingbot
Allow: /
Allow: /products/
Allow: /featured/
Allow: /trending/
Allow: /categories/
Allow: /articles/
Allow: /affiliate-links/
Crawl-delay: 1

# Règles spécifiques pour Yahoo
User-agent: Slurp
Allow: /
Allow: /products/
Allow: /featured/
Allow: /trending/
Allow: /categories/
Allow: /articles/
Allow: /affiliate-links/
Crawl-delay: 2

# Règles pour les robots d'images
User-agent: Googlebot-Image
Allow: /images/
Allow: /assets/
Allow: /public/

# Règles pour les robots de vidéos
User-agent: Googlebot-Video
Allow: /videos/
Allow: /media/

# Bloquer les robots malveillants
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

# Règles pour les réseaux sociaux
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Délai de crawl respectueux
Crawl-delay: 1

# Host directive
Host: ${BASE_URL}`;

  fs.writeFileSync('public/robots.txt', robotsContent);
  log('✅ robots.txt amélioré', 'green');
};

// Fonction de génération de manifest.json amélioré
const improveManifestJson = () => {
  log('\n📱 AMÉLIORATION DU MANIFEST.JSON', 'cyan');
  log('=================================', 'cyan');

  const manifestContent = {
    "name": SITE_NAME,
    "short_name": "AllAdsMarket",
    "description": "Marketplace d'affiliation premium avec plus de 100K+ produits tendances et offres exclusives",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#667eea",
    "orientation": "portrait-primary",
    "scope": "/",
    "lang": "fr",
    "dir": "ltr",
    "categories": ["shopping", "business", "lifestyle"],
    "icons": [
      {
        "src": "/favicon.svg",
        "sizes": "any",
        "type": "image/svg+xml",
        "purpose": "any maskable"
      },
      {
        "src": "/logo.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/logo.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      }
    ],
    "screenshots": [
      {
        "src": "/og-image.jpg",
        "sizes": "1280x720",
        "type": "image/jpeg",
        "form_factor": "wide"
      }
    ],
    "shortcuts": [
      {
        "name": "Produits",
        "short_name": "Produits",
        "description": "Découvrir les produits",
        "url": "/products",
        "icons": [
          {
            "src": "/favicon.svg",
            "sizes": "96x96"
          }
        ]
      },
      {
        "name": "Articles",
        "short_name": "Articles",
        "description": "Lire les articles",
        "url": "/articles",
        "icons": [
          {
            "src": "/favicon.svg",
            "sizes": "96x96"
          }
        ]
      }
    ]
  };

  fs.writeFileSync('public/manifest.json', JSON.stringify(manifestContent, null, 2));
  log('✅ manifest.json amélioré', 'green');
};

// Fonction principale d'amélioration SEO
const performSEOImprovement = () => {
  log('\n🚀 AMÉLIORATION SEO AVANCÉE - ALLADSMARKET', 'bold');
  log('==========================================\n', 'bold');

  try {
    generateAdvancedSitemap();
    generateImageSitemap();
    generateNewsSitemap();
    generateSitemapIndex();
    improveRobotsTxt();
    improveManifestJson();

    log('\n✅ AMÉLIORATIONS SEO TERMINÉES', 'green');
    log('==============================', 'green');
    
    log('\n📊 FICHIERS GÉNÉRÉS/AMÉLIORÉS:', 'blue');
    log('  ✅ sitemap.xml - Sitemap principal', 'green');
    log('  ✅ sitemap-images.xml - Sitemap d\'images', 'green');
    log('  ✅ sitemap-news.xml - Sitemap de news', 'green');
    log('  ✅ sitemap-index.xml - Index des sitemaps', 'green');
    log('  ✅ robots.txt - Configuration robots améliorée', 'green');
    log('  ✅ manifest.json - Manifest PWA amélioré', 'green');

    log('\n🎯 PROCHAINES ÉTAPES:', 'cyan');
    log('  1. Soumettre les sitemaps à Google Search Console', 'blue');
    log('  2. Soumettre les sitemaps à Bing Webmaster Tools', 'blue');
    log('  3. Vérifier l\'indexation dans les moteurs de recherche', 'blue');
    log('  4. Surveiller les Core Web Vitals', 'blue');
    log('  5. Optimiser les métadonnées des pages', 'blue');

  } catch (error) {
    log(`❌ Erreur lors de l'amélioration SEO: ${error.message}`, 'red');
  }
};

// Exécution de l'amélioration
performSEOImprovement();
