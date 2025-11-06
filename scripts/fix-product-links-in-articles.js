#!/usr/bin/env node

/**
 * Script pour remplacer les liens produits hardcodés (/products/1, /products/2, etc.)
 * par les slugs SEO-friendly correspondants
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importer les produits
const productsModuleUrl = `file://${path.resolve(__dirname, '../src/utils/sampleData.js')}`;
const productsModule = await import(productsModuleUrl);
const getAllProducts = productsModule.getAllProducts || productsModule.getSampleProducts;

const products = getAllProducts();

// Créer un mapping ID -> slug
const productIdToSlug = new Map();
products.forEach(product => {
  if (product._id && product.slug) {
    productIdToSlug.set(product._id, product.slug);
  }
  // Aussi mapper par productNumber si disponible
  if (product.productNumber && product.slug) {
    productIdToSlug.set(`product-${product.productNumber}`, product.slug);
    productIdToSlug.set(product.productNumber.toString(), product.slug);
  }
});

console.log('🔍 Recherche et correction des liens produits hardcodés...\n');
console.log(`📊 ${productIdToSlug.size} produits mappés\n`);

// Fichiers à vérifier
const filesToCheck = [
  'src/data/trending-articles-2025.js',
  'src/data/seo-articles-30.js',
  'src/data/custom-articles-2025.js',
  'src/pages/RevolutionaryBlog.jsx',
  'src/pages/RevolutionaryArticleDetail.jsx',
  'src/pages/AIArticleDetail.jsx'
];

let totalReplacements = 0;

filesToCheck.forEach(filePath => {
  const fullPath = path.resolve(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Fichier non trouvé: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let fileReplacements = 0;
  const originalContent = content;
  
  // Remplacer les liens markdown [texte](/products/1)
  productIdToSlug.forEach((slug, id) => {
    // Pattern markdown: [texte](/products/1) ou [texte](/products/product-1)
    const patterns = [
      new RegExp(`\\[([^\\]]+)\\]\\(/products/${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
      new RegExp(`\\[([^\\]]+)\\]\\(/products/${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?\\)`, 'g'),
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, `[$1](/products/${slug})`);
        fileReplacements += matches.length;
      }
    });
    
    // Pattern HTML: href="/products/1" ou href="/products/product-1"
    const htmlPatterns = [
      new RegExp(`href=["']/products/${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["'])`, 'g'),
      new RegExp(`href=["']/products/${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/(["'])`, 'g'),
    ];
    
    htmlPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, `href="/products/${slug}$1`);
        fileReplacements += matches.length;
      }
    });
  });
  
  // Remplacer les liens numériques simples (/products/1, /products/2, etc.)
  for (let i = 1; i <= 200; i++) {
    const product = products.find(p => p.productNumber === i || p._id === `product-${i}`);
    if (product && product.slug) {
      // Pattern markdown
      const markdownPattern = new RegExp(`\\[([^\\]]+)\\]\\(/products/${i}(/)?\\)`, 'g');
      const markdownMatches = content.match(markdownPattern);
      if (markdownMatches) {
        content = content.replace(markdownPattern, `[$1](/products/${product.slug})`);
        fileReplacements += markdownMatches.length;
      }
      
      // Pattern HTML
      const htmlPattern = new RegExp(`href=["']/products/${i}(["'/])`, 'g');
      const htmlMatches = content.match(htmlPattern);
      if (htmlMatches) {
        content = content.replace(htmlPattern, `href="/products/${product.slug}$1`);
        fileReplacements += htmlMatches.length;
      }
    }
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath}: ${fileReplacements} remplacements effectués`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`✓ ${filePath}: Aucun remplacement nécessaire`);
  }
});

console.log(`\n🎉 Total: ${totalReplacements} remplacements effectués dans ${filesToCheck.length} fichiers`);

// Vérification finale
console.log('\n🔍 Vérification finale...');
let remainingLinks = 0;

filesToCheck.forEach(filePath => {
  const fullPath = path.resolve(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const numericLinks = content.match(/\/products\/[0-9]+/g);
    if (numericLinks) {
      remainingLinks += numericLinks.length;
      console.log(`⚠️  ${filePath}: ${numericLinks.length} liens numériques restants`);
      console.log(`   Exemples: ${numericLinks.slice(0, 5).join(', ')}`);
    }
  }
});

if (remainingLinks === 0) {
  console.log('\n✅ Tous les liens produits utilisent maintenant des slugs!');
  process.exit(0);
} else {
  console.log(`\n⚠️  Il reste ${remainingLinks} liens numériques à corriger manuellement.`);
  process.exit(1);
}

