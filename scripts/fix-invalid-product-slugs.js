#!/usr/bin/env node

/**
 * Script pour corriger les slugs invalides (se terminant par un tiret, etc.)
 * Usage: node scripts/fix-invalid-product-slugs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour nettoyer un slug
function cleanSlug(slug) {
  if (!slug) return '';
  
  return slug
    .trim()
    // Supprimer les tirets en début et fin
    .replace(/^-+|-+$/g, '')
    // Remplacer les tirets multiples par un seul
    .replace(/-+/g, '-')
    // Limiter la longueur à 100 caractères
    .substring(0, 100)
    // Supprimer le tiret final si présent
    .replace(/-+$/, '');
}

// Lire le fichier
const filePath = path.resolve(__dirname, '../src/utils/sampleData.js');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔍 Recherche des slugs invalides...\n');

// Trouver tous les slugs
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const matches = [...content.matchAll(slugRegex)];

let fixedCount = 0;
const corrections = [];

matches.forEach(match => {
  const originalSlug = match[1];
  const cleanedSlug = cleanSlug(originalSlug);
  
  // Vérifier si le slug est invalide (se termine par un tiret, etc.)
  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanedSlug);
  
  if (!isValid || cleanedSlug !== originalSlug) {
    // Trouver le produit correspondant
    const matchIndex = match.index;
    const beforeMatch = content.substring(Math.max(0, matchIndex - 500), matchIndex);
    const idMatch = beforeMatch.match(/_id:\s*['"]([^'"]+)['"]/);
    const nameMatch = beforeMatch.match(/name:\s*['"]([^'"]+)['"]/);
    
    const productId = idMatch ? idMatch[1] : 'unknown';
    const productName = nameMatch ? nameMatch[1].substring(0, 60) : 'N/A';
    
    // Générer un nouveau slug propre
    let newSlug = cleanedSlug;
    if (!isValid && nameMatch) {
      // Régénérer le slug à partir du nom
      newSlug = nameMatch[1]
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100)
        .replace(/-+$/, '');
    }
    
    if (newSlug && newSlug !== originalSlug) {
      corrections.push({
        productId,
        productName,
        oldSlug: originalSlug,
        newSlug: newSlug
      });
    }
  }
});

if (corrections.length > 0) {
  console.log(`🔧 ${corrections.length} slugs à corriger:\n`);
  corrections.forEach(corr => {
    console.log(`  - ${corr.productId}: "${corr.oldSlug}" → "${corr.newSlug}"`);
  });
  
  // Appliquer les corrections
  console.log(`\n🚀 Application des corrections...`);
  
  corrections.forEach(corr => {
    // Remplacer le slug dans le contenu
    const oldPattern = new RegExp(`slug:\\s*['"]${corr.oldSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
    content = content.replace(oldPattern, `slug: '${corr.newSlug}'`);
    fixedCount++;
  });
  
  // Sauvegarder
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${fixedCount} slugs corrigés et fichier sauvegardé\n`);
  
  // Vérification finale
  console.log('🔍 Vérification finale...');
  const finalMatches = [...content.matchAll(slugRegex)];
  const invalidSlugs = [];
  
  finalMatches.forEach(match => {
    const slug = match[1];
    const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
    if (!isValid) {
      invalidSlugs.push(slug);
    }
  });
  
  if (invalidSlugs.length === 0) {
    console.log('✅ Tous les slugs sont maintenant valides !\n');
  } else {
    console.log(`⚠️  ${invalidSlugs.length} slugs invalides restants:`, invalidSlugs.slice(0, 10));
  }
} else {
  console.log('✅ Aucun slug invalide trouvé !\n');
}

console.log('✨ Terminé !');

