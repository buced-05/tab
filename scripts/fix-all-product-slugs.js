#!/usr/bin/env node

/**
 * Script pour s'assurer que TOUS les produits ont des slugs uniques et SEO-friendly
 * Usage: node scripts/fix-all-product-slugs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour générer un slug SEO-friendly à partir d'un nom
function generateSlug(name, id) {
  if (!name) {
    return id || 'product';
  }
  
  return name
    .toLowerCase()
    .trim()
    // Remplacer les caractères spéciaux par des tirets
    .replace(/[^\w\s-]/g, '')
    // Remplacer les espaces multiples par un seul tiret
    .replace(/\s+/g, '-')
    // Remplacer les tirets multiples par un seul tiret
    .replace(/-+/g, '-')
    // Supprimer les tirets en début et fin
    .replace(/^-+|-+$/g, '')
    // Limiter la longueur à 100 caractères
    .substring(0, 100)
    // Supprimer le tiret final si présent
    .replace(/-+$/, '');
}

// Fonction pour rendre un slug unique
function makeSlugUnique(slug, existingSlugs, productId) {
  if (!existingSlugs.has(slug)) {
    return slug;
  }
  
  // Essayer avec le productId
  const withId = `${slug}-${productId}`;
  if (!existingSlugs.has(withId)) {
    return withId;
  }
  
  // Essayer avec un numéro
  let counter = 2;
  let uniqueSlug = `${slug}-${counter}`;
  while (existingSlugs.has(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }
  
  return uniqueSlug;
}

// Lire le fichier sampleData.js
const filePath = path.resolve(__dirname, '../src/utils/sampleData.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔍 Analyse des produits...');

// Extraire tous les produits du fichier
const productMatches = content.match(/\{\s*\/\/\s*Product\s+\d+[^}]*\}/gs) || [];
const allProductBlocks = content.match(/\{[^}]*_id:\s*['"]([^'"]+)['"][^}]*\}/gs) || [];

// Compter les produits
const productCount = (content.match(/_id:\s*['"]product-/g) || []).length;
console.log(`📊 ${productCount} produits trouvés`);

// Extraire les slugs existants
const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
const existingSlugs = new Set();
const slugMap = new Map(); // Map pour stocker slug -> productId

slugMatches.forEach(match => {
  const slug = match.match(/['"]([^'"]+)['"]/)[1];
  existingSlugs.add(slug);
});

console.log(`📝 ${existingSlugs.size} slugs existants trouvés`);

// Trouver les produits sans slug ou avec slugs dupliqués
let fixedCount = 0;
let addedCount = 0;
let duplicateCount = 0;

// Parcourir tous les produits et vérifier/corriger les slugs
const productIdMatches = content.matchAll(/_id:\s*['"]([^'"]+)['"]/g);
const productNameMatches = content.matchAll(/name:\s*['"]([^'"]+)['"]/g);

// Créer une liste de tous les produits avec leurs IDs et noms
const products = [];
let currentProduct = null;

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Détecter le début d'un produit
  if (line.match(/_id:\s*['"]([^'"]+)['"]/)) {
    const idMatch = line.match(/_id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      currentProduct = { id: idMatch[1], lineIndex: i, name: null, slug: null };
    }
  }
  
  // Détecter le nom du produit
  if (currentProduct && line.match(/name:\s*['"]([^'"]+)['"]/)) {
    const nameMatch = line.match(/name:\s*['"]([^'"]+)['"]/);
    if (nameMatch) {
      currentProduct.name = nameMatch[1];
    }
  }
  
  // Détecter le slug du produit
  if (currentProduct && line.match(/slug:\s*['"]([^'"]+)['"]/)) {
    const slugMatch = line.match(/slug:\s*['"]([^'"]+)['"]/);
    if (slugMatch) {
      currentProduct.slug = slugMatch[1];
    }
  }
  
  // Détecter la fin d'un produit (ligne avec juste '},' ou '}')
  if (currentProduct && (line.trim() === '},' || line.trim() === '}')) {
    products.push(currentProduct);
    currentProduct = null;
  }
}

console.log(`📦 ${products.length} produits analysés`);

// Vérifier et corriger les slugs
const newSlugs = new Set();
const corrections = [];

products.forEach((product, index) => {
  let needsFix = false;
  let newSlug = product.slug;
  
  // Si pas de slug, en générer un
  if (!product.slug || product.slug.trim() === '') {
    newSlug = generateSlug(product.name, product.id);
    needsFix = true;
    addedCount++;
  }
  
  // Vérifier les duplications
  if (newSlugs.has(newSlug)) {
    newSlug = makeSlugUnique(newSlug, newSlugs, product.id);
    needsFix = true;
    duplicateCount++;
  }
  
  // S'assurer que le slug est unique
  newSlug = makeSlugUnique(newSlug, newSlugs, product.id);
  newSlugs.add(newSlug);
  
  if (needsFix || newSlug !== product.slug) {
    corrections.push({
      productId: product.id,
      oldSlug: product.slug || '(manquant)',
      newSlug: newSlug,
      name: product.name?.substring(0, 60) || 'N/A',
      lineIndex: product.lineIndex
    });
    fixedCount++;
  }
});

console.log(`\n📊 Résultats:`);
console.log(`  ✅ Produits avec slug: ${products.length - addedCount}`);
console.log(`  ➕ Slugs ajoutés: ${addedCount}`);
console.log(`  🔄 Slugs dupliqués corrigés: ${duplicateCount}`);
console.log(`  🔧 Total corrections: ${fixedCount}`);

if (corrections.length > 0) {
  console.log(`\n🔧 Corrections à appliquer:`);
  corrections.slice(0, 20).forEach(corr => {
    console.log(`  - ${corr.productId}: "${corr.oldSlug}" → "${corr.newSlug}"`);
  });
  if (corrections.length > 20) {
    console.log(`  ... et ${corrections.length - 20} autres`);
  }
  
  // Appliquer les corrections
  console.log(`\n🚀 Application des corrections...`);
  
  corrections.forEach(corr => {
    // Trouver la ligne avec le slug à corriger
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      // Chercher la ligne avec l'ID du produit
      if (lines[i].includes(`_id: '${corr.productId}'`) || lines[i].includes(`_id: "${corr.productId}"`)) {
        // Chercher la ligne slug dans les 20 lignes suivantes
        for (let j = i; j < Math.min(i + 20, lines.length); j++) {
          if (lines[j].match(/slug:\s*['"]([^'"]*)['"]/)) {
            // Remplacer le slug
            lines[j] = lines[j].replace(/slug:\s*['"]([^'"]*)['"]/, `slug: '${corr.newSlug}'`);
            break;
          } else if (lines[j].match(/name:\s*['"]([^'"]+)['"]/) && !lines.slice(i, j).some(l => l.includes('slug:'))) {
            // Si pas de slug trouvé, l'ajouter après le name
            const indent = lines[j].match(/^(\s*)/)[1];
            lines.splice(j + 1, 0, `${indent}slug: '${corr.newSlug}',`);
            break;
          }
        }
        break;
      }
    }
    content = lines.join('\n');
  });
  
  // Sauvegarder le fichier
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fichier mis à jour: ${filePath}`);
  
  // Vérification finale
  console.log(`\n🔍 Vérification finale...`);
  const finalSlugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
  const finalSlugs = finalSlugMatches.map(m => m.match(/['"]([^'"]+)['"]/)[1]);
  const finalUniqueSlugs = new Set(finalSlugs);
  const finalDuplicates = finalSlugs.filter((slug, index) => finalSlugs.indexOf(slug) !== index);
  
  console.log(`  ✅ Total slugs: ${finalSlugs.length}`);
  console.log(`  ✅ Slugs uniques: ${finalUniqueSlugs.size}`);
  console.log(`  ${finalDuplicates.length === 0 ? '✅' : '❌'} Duplications: ${finalDuplicates.length}`);
  
  if (finalDuplicates.length > 0) {
    console.log(`  ⚠️  Slugs dupliqués restants:`, [...new Set(finalDuplicates)].slice(0, 10));
  } else {
    console.log(`\n🎉 Tous les produits ont maintenant des slugs uniques !`);
  }
} else {
  console.log(`\n✅ Tous les produits ont déjà des slugs uniques !`);
}

console.log(`\n✨ Terminé !`);

