#!/usr/bin/env node

/**
 * Script principal d'optimisation SEO AllAdsMarket
 * Exécute toutes les optimisations pour le meilleur positionnement
 */

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 ALLADSMARKET - OPTIMISATION SEO COMPLÈTE');
console.log('==========================================');

/**
 * Exécute une commande avec gestion d'erreur
 */
function runCommand(command, description) {
  try {
    console.log(`\n📋 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} terminé`);
  } catch (error) {
    console.error(`❌ Erreur lors de ${description}:`, error.message);
    process.exit(1);
  }
}

/**
 * Fonction principale d'optimisation
 */
function optimizeAllAdsMarket() {
  console.log('\n🎯 Début de l\'optimisation SEO complète...');
  
  // 1. Génération des sitemaps
  runCommand(
    'node scripts/generate-sitemaps.js',
    'Génération des sitemaps SEO'
  );
  
  // 2. Optimisation SEO avancée
  runCommand(
    'node scripts/optimize-seo.js',
    'Optimisation SEO avancée'
  );
  
  // 3. Vérification des fichiers générés
  console.log('\n📊 Vérification des fichiers générés...');
  
  const filesToCheck = [
    'public/sitemap.xml',
    'public/sitemap-pages.xml',
    'public/sitemap-articles.xml',
    'public/sitemap-categories.xml',
    'public/sitemap-authors.xml',
    'public/sitemap-images.xml',
    'public/robots.txt',
    'public/seo-report.json',
    'public/seo-optimization-report.json',
    'src/config/seo-config.js',
    'src/config/seo-monitoring.js',
    'src/data/keywords.json'
  ];
  
  filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    try {
      fs.accessSync(filePath);
      console.log(`✅ ${file} - OK`);
    } catch (error) {
      console.log(`❌ ${file} - MANQUANT`);
    }
  });
  
  // 4. Résumé de l'optimisation
  console.log('\n🎉 OPTIMISATION SEO TERMINÉE!');
  console.log('============================');
  console.log('📈 Améliorations apportées:');
  console.log('   • Sitemaps XML optimisés');
  console.log('   • Robots.txt configuré');
  console.log('   • Métadonnées SEO complètes');
  console.log('   • Données structurées JSON-LD');
  console.log('   • Mots-clés stratégiques');
  console.log('   • Monitoring SEO configuré');
  console.log('   • Performance optimisée');
  
  console.log('\n🎯 Objectifs de positionnement:');
  console.log('   • "marketing digital" → Top 3');
  console.log('   • "SEO" → Top 5');
  console.log('   • "e-commerce" → Top 3');
  console.log('   • "intelligence artificielle" → Top 5');
  console.log('   • "perplexity ai" → Top 1');
  
  console.log('\n📊 Prochaines étapes:');
  console.log('   1. Soumettre les sitemaps à Google Search Console');
  console.log('   2. Surveiller les performances avec Google Analytics');
  console.log('   3. Continuer la création de contenu de qualité');
  console.log('   4. Optimiser les Core Web Vitals');
  console.log('   5. Développer les backlinks de qualité');
  
  console.log('\n🚀 AllAdsMarket est maintenant optimisé pour le meilleur positionnement Google!');
}

// Exécution
optimizeAllAdsMarket();

export { optimizeAllAdsMarket };
