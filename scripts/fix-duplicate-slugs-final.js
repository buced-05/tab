#!/usr/bin/env node

/**
 * Script pour corriger les slugs dupliqués en ajoutant des suffixes uniques
 * Usage: node scripts/fix-duplicate-slugs-final.js
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

console.log('🔍 Correction des slugs dupliqués...\n');

// Lire le fichier
const filePath = path.resolve(__dirname, '../src/utils/sampleData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Identifier les duplications
const slugMap = new Map(); // slug -> [productIds]
const productSlugMap = new Map(); // productId -> slug

products.forEach(product => {
  if (product.slug) {
    if (!slugMap.has(product.slug)) {
      slugMap.set(product.slug, []);
    }
    slugMap.get(product.slug).push(product._id);
    productSlugMap.set(product._id, product.slug);
  }
});

// Trouver les duplications
const duplicates = [];
slugMap.forEach((productIds, slug) => {
  if (productIds.length > 1) {
    duplicates.push({ slug, productIds });
  }
});

console.log(`📊 ${duplicates.length} slugs dupliqués trouvés\n`);

if (duplicates.length === 0) {
  console.log('✅ Aucun slug dupliqué !\n');
  process.exit(0);
}

// Générer des slugs uniques pour les duplications
let fixedCount = 0;
const corrections = [];

duplicates.forEach(({ slug, productIds }) => {
  // Le premier produit garde le slug original
  const firstProductId = productIds[0];
  
  // Les autres produits reçoivent un suffixe unique basé sur leur ID
  productIds.slice(1).forEach((productId, index) => {
    // Extraire un identifiant unique du productId
    let uniqueSuffix = '';
    
    // Si le productId contient "copy", utiliser ce numéro
    const copyMatch = productId.match(/copy(\d+)/i);
    if (copyMatch) {
      uniqueSuffix = `-v${copyMatch[1]}`;
    } else if (productId.includes('-copy')) {
      // Extraire le numéro après "copy"
      const parts = productId.split('-copy');
      if (parts.length > 1) {
        uniqueSuffix = `-v${parts[1] || (index + 2)}`;
      } else {
        uniqueSuffix = `-v${index + 2}`;
      }
    } else {
      // Utiliser les derniers caractères de l'ID
      const idSuffix = productId.replace(/^product-/, '').replace(/[^a-z0-9]/gi, '-');
      uniqueSuffix = `-${idSuffix}`;
    }
    
    // Créer le nouveau slug
    // Si le slug est trop long, le tronquer avant d'ajouter le suffixe
    let newSlug = slug;
    const maxLength = 100;
    const suffixLength = uniqueSuffix.length;
    
    if (newSlug.length + suffixLength > maxLength) {
      newSlug = newSlug.substring(0, maxLength - suffixLength);
      // S'assurer qu'on ne coupe pas au milieu d'un mot
      const lastDash = newSlug.lastIndexOf('-');
      if (lastDash > maxLength - suffixLength - 10) {
        newSlug = newSlug.substring(0, lastDash);
      }
    }
    
    newSlug = newSlug + uniqueSuffix;
    
    // Nettoyer le slug final
    newSlug = newSlug
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    corrections.push({
      productId,
      oldSlug: slug,
      newSlug: newSlug
    });
  });
});

console.log(`🔧 ${corrections.length} corrections à appliquer:\n`);
corrections.slice(0, 20).forEach(corr => {
  const product = products.find(p => p._id === corr.productId);
  console.log(`  - ${corr.productId}: "${corr.oldSlug}" → "${corr.newSlug}"`);
});
if (corrections.length > 20) {
  console.log(`  ... et ${corrections.length - 20} autres`);
}

// Appliquer les corrections
console.log(`\n🚀 Application des corrections...`);

corrections.forEach(corr => {
  // Remplacer le slug dans le contenu
  // Chercher la ligne avec le productId et remplacer le slug correspondant
  const lines = content.split('\n');
  let inProduct = false;
  let productIdFound = false;
  
  for (let i = 0; i < lines.length; i++) {
    // Détecter le début d'un produit
    if (lines[i].includes(`_id: '${corr.productId}'`) || lines[i].includes(`_id: "${corr.productId}"`)) {
      inProduct = true;
      productIdFound = true;
    }
    
    // Si on est dans le produit et qu'on trouve le slug, le remplacer
    if (inProduct && productIdFound && lines[i].includes(`slug:`) && lines[i].includes(corr.oldSlug)) {
      lines[i] = lines[i].replace(
        new RegExp(`slug:\\s*['"]${corr.oldSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
        `slug: '${corr.newSlug}'`
      );
      fixedCount++;
      inProduct = false;
      productIdFound = false;
      break;
    }
    
    // Si on trouve la fin du produit sans avoir trouvé le slug, chercher dans les lignes suivantes
    if (inProduct && (lines[i].trim() === '},' || lines[i].trim() === '}')) {
      // Chercher le slug dans les 10 lignes précédentes
      for (let j = Math.max(0, i - 10); j < i; j++) {
        if (lines[j].includes(`slug:`) && lines[j].includes(corr.oldSlug)) {
          lines[j] = lines[j].replace(
            new RegExp(`slug:\\s*['"]${corr.oldSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
            `slug: '${corr.newSlug}'`
          );
          fixedCount++;
          break;
        }
      }
      inProduct = false;
      productIdFound = false;
    }
  }
  
  content = lines.join('\n');
});

// Sauvegarder
fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ ${fixedCount} slugs corrigés et fichier sauvegardé\n`);

// Vérification finale
console.log('🔍 Vérification finale...');
const updatedProducts = getAllProducts();
const finalSlugMap = new Map();
const finalDuplicates = [];

updatedProducts.forEach(product => {
  if (product.slug) {
    if (!finalSlugMap.has(product.slug)) {
      finalSlugMap.set(product.slug, []);
    }
    finalSlugMap.get(product.slug).push(product._id);
  }
});

finalSlugMap.forEach((productIds, slug) => {
  if (productIds.length > 1) {
    finalDuplicates.push({ slug, productIds });
  }
});

if (finalDuplicates.length === 0) {
  console.log('✅ Tous les slugs sont maintenant uniques !\n');
  console.log(`✨ ${updatedProducts.length} produits avec slugs uniques\n`);
} else {
  console.log(`⚠️  ${finalDuplicates.length} slugs dupliqués restants:`);
  finalDuplicates.slice(0, 10).forEach(({ slug, productIds }) => {
    console.log(`  - "${slug}" utilisé par ${productIds.length} produits: ${productIds.join(', ')}`);
  });
}

console.log('✨ Terminé !');

