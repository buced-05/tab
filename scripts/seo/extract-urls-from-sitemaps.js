#!/usr/bin/env node

/**
 * Script pour extraire toutes les URLs des sitemaps générés
 * Usage: node scripts/seo/extract-urls-from-sitemaps.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chercher le dossier dist (peut être à différents endroits)
// Utiliser process.cwd() pour obtenir le répertoire de travail actuel
const cwd = process.cwd();
let distDir = path.resolve(cwd, 'dist');

// Si pas trouvé, essayer les chemins relatifs au script
if (!fs.existsSync(distDir)) {
  distDir = path.resolve(__dirname, '../../../dist');
}
if (!fs.existsSync(distDir)) {
  distDir = path.resolve(__dirname, '../../dist');
}

console.log(`📁 Recherche des sitemaps dans: ${distDir}`);
if (!fs.existsSync(distDir)) {
  console.error(`❌ Dossier dist non trouvé: ${distDir}`);
  console.error(`   CWD: ${cwd}`);
  process.exit(1);
}

const baseUrl = 'https://alladsmarket.com';

// Fonction pour extraire les URLs d'un fichier XML
function extractUrlsFromXml(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
    return urlMatches.map(match => match.replace('<loc>', '').replace('</loc>', ''));
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture de ${filePath}:`, error.message);
    return [];
  }
}

// Extraire toutes les URLs des sitemaps
const allUrls = new Set();

// Sitemap principal (contient les références aux autres sitemaps)
const mainSitemap = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(mainSitemap)) {
  const mainUrls = extractUrlsFromXml(mainSitemap);
  console.log(`📄 sitemap.xml: ${mainUrls.length} sitemaps référencés`);
}

// Extraire les URLs de tous les sitemaps
const sitemapFiles = [
  'sitemap-pages.xml',
  'sitemap-articles.xml',
  'sitemap-products.xml',
  'sitemap-images.xml',
  'sitemap-categories.xml',
  'sitemap-authors.xml',
  'sitemap-news.xml'
];

// Ajouter les sitemaps par langue
const languages = ['fr', 'en', 'en-GB', 'de', 'es', 'it', 'pt', 'pt-BR', 'nl', 'sv', 'no', 'ru', 'ja', 'zh', 'hi', 'ar', 'sw', 'am'];
languages.forEach(lang => {
  sitemapFiles.push(`sitemap-${lang}.xml`);
});

let totalUrls = 0;
sitemapFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  if (fs.existsSync(filePath)) {
    const urls = extractUrlsFromXml(filePath);
    urls.forEach(url => allUrls.add(url));
    totalUrls += urls.length;
    console.log(`✅ ${file}: ${urls.length} URLs`);
  } else {
    console.log(`⚠️  ${file}: non trouvé`);
  }
});

// Convertir en tableau trié
const urlsArray = Array.from(allUrls).sort();

console.log(`\n📊 Total URLs uniques: ${urlsArray.length}`);

// Créer le dossier dist s'il n'existe pas
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Générer un fichier avec toutes les URLs
const outputFile = path.join(distDir, 'urls-to-index.txt');
fs.writeFileSync(outputFile, urlsArray.join('\n'), 'utf8');
console.log(`\n✅ Fichier généré: ${outputFile}`);

// Générer un fichier JSON
const jsonOutput = {
  urls: urlsArray,
  total: urlsArray.length,
  generated: new Date().toISOString(),
  breakdown: {
    pages: extractUrlsFromXml(path.join(distDir, 'sitemap-pages.xml')).length,
    articles: extractUrlsFromXml(path.join(distDir, 'sitemap-articles.xml')).length,
    products: extractUrlsFromXml(path.join(distDir, 'sitemap-products.xml')).length
  }
};

const jsonOutputFile = path.join(distDir, 'urls-to-index.json');
fs.writeFileSync(jsonOutputFile, JSON.stringify(jsonOutput, null, 2), 'utf8');
console.log(`✅ Fichier JSON généré: ${jsonOutputFile}`);

// Instructions
console.log('\n📋 INSTRUCTIONS POUR INDEXATION RAPIDE:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n1. Aller sur https://search.google.com/search-console');
console.log('2. Sélectionner la propriété: alladsmarket.com');
console.log('3. Soumettre le sitemap principal: https://alladsmarket.com/sitemap.xml');
console.log('4. Aller dans "Inspection d\'URL"');
console.log('5. Pour les pages prioritaires, utiliser "Demander une indexation"');
console.log('\n📄 Fichiers générés:');
console.log(`  - ${outputFile}`);
console.log(`  - ${jsonOutputFile}`);
console.log(`\n🎯 Total: ${urlsArray.length} URLs prêtes pour l'indexation`);

