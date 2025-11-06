#!/usr/bin/env node

/**
 * Script pour vérifier que TOUS les produits ont des slugs uniques et valides
 * Usage: node scripts/verify-all-product-slugs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importer les produits
const productsModuleUrl = pathToFileURL(path.resolve(__dirname, '../src/utils/sampleData.js')).href;
const productsModule = await import(productsModuleUrl);
const getAllProducts = productsModule.getAllProducts || productsModule.getSampleProducts;

if (!getAllProducts) {
  console.error('❌ Impossible de charger la fonction getAllProducts');
  process.exit(1);
}

const products = getAllProducts();

console.log('🔍 Vérification des slugs de produits...\n');

// Vérifications
const issues = [];
const slugs = new Map();
const missingSlugs = [];
const duplicateSlugs = [];
const invalidSlugs = [];

products.forEach((product, index) => {
  // Vérifier si le produit a un slug
  if (!product.slug || product.slug.trim() === '') {
    missingSlugs.push({
      id: product._id,
      name: product.name?.substring(0, 60) || 'N/A',
      index: index + 1
    });
    return;
  }
  
  // Vérifier si le slug est valide (pas de caractères spéciaux, pas d'espaces)
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(product.slug)) {
    invalidSlugs.push({
      id: product._id,
      name: product.name?.substring(0, 60) || 'N/A',
      slug: product.slug,
      index: index + 1
    });
  }
  
  // Vérifier les duplications
  if (slugs.has(product.slug)) {
    duplicateSlugs.push({
      id: product._id,
      name: product.name?.substring(0, 60) || 'N/A',
      slug: product.slug,
      existingId: slugs.get(product.slug),
      index: index + 1
    });
  } else {
    slugs.set(product.slug, product._id);
  }
});

// Afficher les résultats
console.log(`📊 Total produits: ${products.length}`);
console.log(`✅ Produits avec slug: ${products.length - missingSlugs.length}`);
console.log(`❌ Produits sans slug: ${missingSlugs.length}`);
console.log(`⚠️  Slugs invalides: ${invalidSlugs.length}`);
console.log(`🔄 Slugs dupliqués: ${duplicateSlugs.length}`);
console.log(`✨ Slugs uniques: ${slugs.size}\n`);

// Afficher les problèmes
if (missingSlugs.length > 0) {
  console.log('❌ PRODUITS SANS SLUG:');
  missingSlugs.slice(0, 20).forEach(item => {
    console.log(`  - ${item.id}: "${item.name}"`);
  });
  if (missingSlugs.length > 20) {
    console.log(`  ... et ${missingSlugs.length - 20} autres`);
  }
  console.log('');
}

if (invalidSlugs.length > 0) {
  console.log('⚠️  SLUGS INVALIDES:');
  invalidSlugs.slice(0, 20).forEach(item => {
    console.log(`  - ${item.id}: "${item.slug}" (produit: "${item.name}")`);
  });
  if (invalidSlugs.length > 20) {
    console.log(`  ... et ${invalidSlugs.length - 20} autres`);
  }
  console.log('');
}

if (duplicateSlugs.length > 0) {
  console.log('🔄 SLUGS DUPLIQUÉS:');
  const uniqueDuplicates = new Map();
  duplicateSlugs.forEach(item => {
    if (!uniqueDuplicates.has(item.slug)) {
      uniqueDuplicates.set(item.slug, []);
    }
    uniqueDuplicates.get(item.slug).push(item);
  });
  
  uniqueDuplicates.forEach((items, slug) => {
    console.log(`  - Slug "${slug}" utilisé par ${items.length + 1} produits:`);
    items.forEach(item => {
      console.log(`    • ${item.id}: "${item.name}"`);
    });
  });
  console.log('');
}

// Résumé
if (missingSlugs.length === 0 && invalidSlugs.length === 0 && duplicateSlugs.length === 0) {
  console.log('✅ Tous les produits ont des slugs uniques et valides !\n');
  process.exit(0);
} else {
  console.log('❌ Des problèmes ont été détectés. Utilisez le script fix-all-product-slugs.js pour les corriger.\n');
  process.exit(1);
}

