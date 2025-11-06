#!/usr/bin/env node

/**
 * Script complet d'amélioration SEO
 * Optimise tous les aspects SEO du site
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://alladsmarket.com';

console.log('🚀 Amélioration SEO complète...\n');

// 1. Vérifier les sitemaps
console.log('1️⃣ Vérification des sitemaps...');
const distDir = path.resolve(__dirname, '../../dist');
const sitemapFiles = [
  'sitemap.xml',
  'sitemap-pages.xml',
  'sitemap-articles.xml',
  'sitemap-products.xml',
  'sitemap-images.xml',
  'sitemap-categories.xml',
  'sitemap-authors.xml',
  'sitemap-news.xml'
];

let sitemapCount = 0;
sitemapFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const urlCount = (content.match(/<url>/g) || []).length;
    console.log(`  ✅ ${file}: ${urlCount} URLs`);
    sitemapCount += urlCount;
  } else {
    console.log(`  ❌ ${file}: MANQUANT`);
  }
});
console.log(`  📊 Total: ${sitemapCount} URLs dans les sitemaps\n`);

// 2. Vérifier robots.txt
console.log('2️⃣ Vérification de robots.txt...');
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const hasSitemap = robotsContent.includes('Sitemap:');
  const hasAllow = robotsContent.includes('Allow: /');
  console.log(`  ${hasSitemap ? '✅' : '❌'} Sitemaps référencés`);
  console.log(`  ${hasAllow ? '✅' : '❌'} Allow: / présent`);
} else {
  console.log('  ❌ robots.txt MANQUANT');
}
console.log('');

// 3. Vérifier les meta tags dans index.html
console.log('3️⃣ Vérification des meta tags...');
const indexHtmlPath = path.resolve(__dirname, '../../index.html');
if (fs.existsSync(indexHtmlPath)) {
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  const hasTitle = indexContent.includes('<title>');
  const hasDescription = indexContent.includes('name="description"');
  const hasKeywords = indexContent.includes('name="keywords"');
  const hasOG = indexContent.includes('property="og:');
  const hasTwitter = indexContent.includes('name="twitter:');
  const hasSchema = indexContent.includes('application/ld+json');
  
  console.log(`  ${hasTitle ? '✅' : '❌'} Title tag`);
  console.log(`  ${hasDescription ? '✅' : '❌'} Meta description`);
  console.log(`  ${hasKeywords ? '✅' : '❌'} Meta keywords`);
  console.log(`  ${hasOG ? '✅' : '❌'} Open Graph tags`);
  console.log(`  ${hasTwitter ? '✅' : '❌'} Twitter Cards`);
  console.log(`  ${hasSchema ? '✅' : '❌'} Schema markup`);
} else {
  console.log('  ❌ index.html non trouvé');
}
console.log('');

// 4. Recommandations
console.log('📋 Recommandations SEO:\n');

console.log('✅ Actions Immédiates:');
console.log('  1. Soumettre sitemap.xml à Google Search Console');
console.log('  2. Soumettre sitemap.xml à Bing Webmaster Tools');
console.log('  3. Vérifier l\'indexation dans Google Search Console');
console.log('  4. Demander l\'indexation des pages importantes');
console.log('  5. Optimiser les images (WebP, compression)');
console.log('  6. Améliorer les Core Web Vitals');
console.log('  7. Créer du contenu de blog régulier');
console.log('  8. Construire des backlinks');
console.log('');

console.log('📊 Métriques à Suivre:');
console.log('  - Indexation Google (objectif: 500+ pages)');
console.log('  - Mots-clés organiques (objectif: 500+ mots-clés)');
console.log('  - Backlinks (objectif: 500+ backlinks)');
console.log('  - Trafic organique (objectif: 10,000+ visiteurs/mois)');
console.log('');

console.log('✨ Terminé!');

