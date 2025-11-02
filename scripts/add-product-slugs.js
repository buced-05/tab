#!/usr/bin/env node

/**
 * Script pour ajouter automatiquement des slugs à tous les produits
 * Usage: node scripts/add-product-slugs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sampleDataPath = path.resolve(__dirname, '../src/utils/sampleData.js');

// Fonction pour générer un slug SEO-friendly
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

// Lire le fichier sampleData.js
let content = fs.readFileSync(sampleDataPath, 'utf8');

// Compter les produits
const productMatches = content.match(/^\s+_id: 'product-/gm);
console.log(`📦 ${productMatches ? productMatches.length : 0} produits détectés`);

// Pattern pour détecter un produit sans slug
const productWithoutSlugPattern = /(\s+_id: '[^']+',\s+productNumber: \d+,\s+name: '[^']+'),\s+description:/g;
let count = 0;

// Remplacer tous les produits sans slug par des produits avec slug
content = content.replace(productWithoutSlugPattern, (match, before) => {
  // Extraire le nom du produit
  const nameMatch = match.match(/name: '([^']+)'/);
  if (!nameMatch) return match;
  
  const name = nameMatch[1];
  const slug = generateSlug(name);
  count++;
  
  // Ajouter le slug après le name
  return before + `,\n      slug: '${slug}',\n      description:`;
});

// Sauvegarder le fichier
fs.writeFileSync(sampleDataPath, content, 'utf8');

console.log(`✅ ${count} slugs de produits ajoutés avec succès!`);
console.log(`📁 Fichier mis à jour: ${sampleDataPath}`);

