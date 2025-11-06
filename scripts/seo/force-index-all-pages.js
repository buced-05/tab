#!/usr/bin/env node

/**
 * Script pour forcer l'indexation de toutes les pages
 * Soumet toutes les URLs importantes à Google Search Console via l'API
 * 
 * Usage: node scripts/seo/force-index-all-pages.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://alladsmarket.com';

// Importer les articles
let allAIArticles = [];
try {
  // Dynamically import the articles data (même méthode que generate-multilingual-sitemaps.js)
  const articlesModuleUrl = pathToFileURL(path.resolve(__dirname, '../../../src/data/premium-ai-articles.js')).href;
  const articlesModule = await import(articlesModuleUrl);
  allAIArticles = articlesModule.getAllPremiumAIArticles ? articlesModule.getAllPremiumAIArticles() : [];
  console.log(`📚 ${allAIArticles.length} articles chargés`);
} catch (error) {
  console.error('❌ Erreur lors du chargement des articles:', error.message);
}

// Importer les produits
let allProducts = [];
try {
  // Dynamically import the products data (même méthode que generate-multilingual-sitemaps.js)
  const productsModuleUrl = pathToFileURL(path.resolve(__dirname, '../../../src/utils/sampleData.js')).href;
  const productsModule = await import(productsModuleUrl);
  allProducts = productsModule.getAllProducts ? productsModule.getAllProducts() : [];
  console.log(`🛍️  ${allProducts.length} produits chargés`);
} catch (error) {
  console.error('❌ Erreur lors du chargement des produits:', error.message);
}

// Pages statiques importantes
const staticPages = [
  '/',
  '/products',
  '/ai-articles',
  '/articles',
  '/revolutionary-blog',
  '/trending',
  '/featured',
  '/categories',
  '/about',
  '/contact'
];

// Générer toutes les URLs à indexer
const allUrls = [];

// Pages statiques
staticPages.forEach(page => {
  allUrls.push({
    url: `${baseUrl}${page}`,
    type: 'page',
    priority: page === '/' ? 1.0 : 0.9
  });
});

// Articles
allAIArticles.forEach(article => {
  if (article.slug) {
    allUrls.push({
      url: `${baseUrl}/ai-article/${article.slug}`,
      type: 'article',
      priority: article.trending ? 0.9 : (article.featured ? 0.85 : 0.8)
    });
  }
});

// Produits
allProducts.forEach(product => {
  const slug = product.slug || product._id;
  if (slug) {
    allUrls.push({
      url: `${baseUrl}/products/${slug}`,
      type: 'product',
      priority: product.isFeatured ? 0.85 : (product.isTrending ? 0.8 : 0.75)
    });
  }
});

console.log(`\n📊 Total URLs à indexer: ${allUrls.length}`);
console.log(`  - Pages statiques: ${staticPages.length}`);
console.log(`  - Articles: ${allAIArticles.length}`);
console.log(`  - Produits: ${allProducts.length}`);

// Créer le dossier dist s'il n'existe pas
const distDir = path.resolve(__dirname, '../../../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Générer un fichier avec toutes les URLs pour Google Search Console
const outputFile = path.resolve(distDir, 'urls-to-index.txt');
const urlsList = allUrls.map(item => item.url).join('\n');
fs.writeFileSync(outputFile, urlsList, 'utf8');
console.log(`\n✅ Fichier généré: ${outputFile}`);

// Générer un fichier JSON pour l'API Google Search Console
const jsonOutput = {
  urls: allUrls.map(item => item.url),
  total: allUrls.length,
  generated: new Date().toISOString(),
  breakdown: {
    pages: staticPages.length,
    articles: allAIArticles.length,
    products: allProducts.length
  }
};

const jsonOutputFile = path.resolve(distDir, 'urls-to-index.json');
fs.writeFileSync(jsonOutputFile, JSON.stringify(jsonOutput, null, 2), 'utf8');
console.log(`✅ Fichier JSON généré: ${jsonOutputFile}`);

// Instructions pour Google Search Console
console.log('\n📋 INSTRUCTIONS POUR GOOGLE SEARCH CONSOLE:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n1. Aller sur https://search.google.com/search-console');
console.log('2. Sélectionner la propriété: alladsmarket.com');
console.log('3. Aller dans "Inspection d\'URL"');
console.log('4. Pour chaque URL importante, utiliser "Demander une indexation"');
console.log('\nOU');
console.log('\n1. Utiliser l\'API Google Search Console');
console.log('2. Soumettre toutes les URLs du fichier urls-to-index.json');
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n📄 Fichiers générés:`);
console.log(`  - ${outputFile}`);
console.log(`  - ${jsonOutputFile}`);
console.log(`\n🎯 Prochaine étape: Soumettre ces URLs à Google Search Console`);

