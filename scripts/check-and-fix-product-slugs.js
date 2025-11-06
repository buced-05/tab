#!/usr/bin/env node

/**
 * Script pour vérifier et corriger les slugs des produits
 * Vérifie que tous les produits ont des slugs uniques
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

console.log('🔍 Vérification des slugs des produits...\n');
console.log(`📊 Total de produits: ${products.length}\n`);

// Vérifier les produits sans slug
const productsWithoutSlug = products.filter(p => !p.slug || p.slug.trim() === '');
console.log(`❌ Produits sans slug: ${productsWithoutSlug.length}`);

if (productsWithoutSlug.length > 0) {
  console.log('\n📋 Liste des produits sans slug:');
  productsWithoutSlug.forEach((p, index) => {
    console.log(`  ${index + 1}. ${p._id} - ${p.name?.substring(0, 60)}`);
  });
}

// Vérifier les slugs dupliqués
const slugMap = new Map();
const duplicates = [];

products.forEach(product => {
  if (product.slug) {
    if (slugMap.has(product.slug)) {
      duplicates.push({
        slug: product.slug,
        products: [slugMap.get(product.slug), product._id]
      });
    } else {
      slugMap.set(product.slug, product._id);
    }
  }
});

console.log(`\n⚠️  Slugs dupliqués: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.log('\n📋 Liste des slugs dupliqués:');
  duplicates.forEach((dup, index) => {
    console.log(`  ${index + 1}. Slug: "${dup.slug}"`);
    console.log(`     Produits: ${dup.products.join(', ')}`);
  });
}

// Fonction pour générer un slug à partir du nom
function generateSlug(name) {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/[\s_]+/g, '-') // Remplacer espaces et underscores par des tirets
    .replace(/-+/g, '-') // Remplacer les tirets multiples par un seul
    .replace(/^-+|-+$/g, ''); // Supprimer les tirets en début et fin
}

// Fonction pour rendre un slug unique
function makeSlugUnique(baseSlug, existingSlugs, productId) {
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }
  
  let counter = 2;
  let uniqueSlug = `${baseSlug}-v${counter}`;
  
  while (existingSlugs.has(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-v${counter}`;
  }
  
  return uniqueSlug;
}

// Lire le fichier source
const filePath = path.resolve(__dirname, '../src/utils/sampleData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Statistiques
let fixedCount = 0;
let duplicateFixedCount = 0;
const allSlugs = new Set();

// Corriger les produits sans slug
productsWithoutSlug.forEach(product => {
  const baseSlug = generateSlug(product.name);
  const uniqueSlug = makeSlugUnique(baseSlug, allSlugs, product._id);
  
  // Trouver la ligne du produit dans le fichier
  const productPattern = new RegExp(`(_id:\\s*['"]${product._id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][^}]*?)(\\n\\s*\\})`, 's');
  const match = fileContent.match(productPattern);
  
  if (match) {
    const productBlock = match[1];
    
    // Vérifier si le slug existe déjà dans le bloc
    if (!productBlock.includes('slug:')) {
      // Ajouter le slug après le name
      const namePattern = /(name:\s*['"][^'"]*['"])/;
      const nameMatch = productBlock.match(namePattern);
      
      if (nameMatch) {
        const newProductBlock = productBlock.replace(
          nameMatch[0],
          `${nameMatch[0]},\n      slug: '${uniqueSlug}'`
        );
        fileContent = fileContent.replace(productBlock, newProductBlock);
        fixedCount++;
        allSlugs.add(uniqueSlug);
        console.log(`✅ Ajouté slug pour ${product._id}: ${uniqueSlug}`);
      }
    }
  }
});

// Corriger les slugs dupliqués
duplicates.forEach(dup => {
  const productsToFix = dup.products.slice(1); // Garder le premier, corriger les autres
  
  productsToFix.forEach(productId => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const baseSlug = product.slug;
      const uniqueSlug = makeSlugUnique(baseSlug, allSlugs, productId);
      
      // Remplacer le slug dans le fichier
      const slugPattern = new RegExp(`(_id:\\s*['"]${productId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][^}]*?slug:\\s*['"])${baseSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`, 's');
      fileContent = fileContent.replace(slugPattern, `$1${uniqueSlug}$2`);
      
      duplicateFixedCount++;
      allSlugs.delete(baseSlug);
      allSlugs.add(uniqueSlug);
      console.log(`✅ Corrigé slug dupliqué pour ${productId}: ${baseSlug} → ${uniqueSlug}`);
    }
  });
});

// Sauvegarder le fichier si des corrections ont été faites
if (fixedCount > 0 || duplicateFixedCount > 0) {
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`\n✅ Fichier sauvegardé: ${fixedCount} slugs ajoutés, ${duplicateFixedCount} slugs dupliqués corrigés`);
} else {
  console.log('\n✅ Tous les produits ont déjà des slugs uniques!');
}

// Vérification finale
console.log('\n🔍 Vérification finale...');
const finalProducts = getAllProducts();
const finalWithoutSlug = finalProducts.filter(p => !p.slug || p.slug.trim() === '');
const finalSlugs = finalProducts.map(p => p.slug).filter(Boolean);
const finalDuplicates = finalSlugs.filter((slug, index) => finalSlugs.indexOf(slug) !== index);

console.log(`📊 Produits sans slug: ${finalWithoutSlug.length}`);
console.log(`📊 Slugs dupliqués: ${[...new Set(finalDuplicates)].length}`);

if (finalWithoutSlug.length === 0 && finalDuplicates.length === 0) {
  console.log('\n🎉 Tous les produits ont des slugs uniques!');
  process.exit(0);
} else {
  console.log('\n⚠️  Il reste des problèmes à corriger.');
  process.exit(1);
}

