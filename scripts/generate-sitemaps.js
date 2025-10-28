#!/usr/bin/env node

/**
 * Générateur de sitemaps automatique pour AllAdsMarket
 * Optimise le SEO en générant tous les sitemaps nécessaires
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAllSitemaps } from '../src/utils/sitemapGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public');
const SITEMAPS = {
  'sitemap.xml': 'main',
  'sitemap-pages.xml': 'pages',
  'sitemap-articles.xml': 'articles',
  'sitemap-categories.xml': 'categories',
  'sitemap-authors.xml': 'authors',
  'sitemap-images.xml': 'images'
};

/**
 * Génère tous les sitemaps et les sauvegarde
 */
function generateSitemaps() {
  console.log('🚀 Génération des sitemaps SEO...');
  
  try {
    // Générer tous les sitemaps
    const sitemaps = generateAllSitemaps();
    
    // Créer le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Sauvegarder chaque sitemap
    Object.entries(SITEMAPS).forEach(([filename, type]) => {
      const filepath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(filepath, sitemaps[type], 'utf8');
      console.log(`✅ Sitemap généré: ${filename}`);
    });
    
    // Générer le robots.txt optimisé
    generateRobotsTxt();
    
    console.log('🎉 Tous les sitemaps ont été générés avec succès!');
    console.log('📊 SEO optimisé pour le meilleur positionnement Google');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération des sitemaps:', error);
    process.exit(1);
  }
}

/**
 * Génère un robots.txt optimisé
 */
function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Sitemaps optimisés
Sitemap: https://alladsmarket.com/sitemap.xml
Sitemap: https://alladsmarket.com/sitemap-pages.xml
Sitemap: https://alladsmarket.com/sitemap-articles.xml
Sitemap: https://alladsmarket.com/sitemap-categories.xml
Sitemap: https://alladsmarket.com/sitemap-authors.xml
Sitemap: https://alladsmarket.com/sitemap-images.xml

# Crawl delay optimisé
Crawl-delay: 1

# Zones protégées
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /_next/
Disallow: /node_modules/

# Pages importantes autorisées
Allow: /articles/
Allow: /products/
Allow: /authors/
Allow: /categories/

# Optimisations SEO
Host: https://alladsmarket.com`;

  const robotsPath = path.join(OUTPUT_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ Robots.txt généré');
}

/**
 * Génère un rapport SEO
 */
function generateSEOReport() {
  const report = {
    timestamp: new Date().toISOString(),
    sitemaps: Object.keys(SITEMAPS),
    totalPages: 7, // Articles principaux
    totalCategories: 5,
    totalAuthors: 6,
    languages: ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'hi', 'ar'],
    seoOptimizations: [
      'Données structurées JSON-LD',
      'Meta tags optimisés',
      'URLs canoniques',
      'Hreflang multilingue',
      'Sitemaps XML',
      'Robots.txt optimisé',
      'Images avec alt text',
      'Temps de chargement optimisé'
    ]
  };
  
  const reportPath = path.join(OUTPUT_DIR, 'seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log('📊 Rapport SEO généré: seo-report.json');
}

// Exécution
generateSitemaps();
generateSEOReport();

export { generateSitemaps, generateRobotsTxt, generateSEOReport };
