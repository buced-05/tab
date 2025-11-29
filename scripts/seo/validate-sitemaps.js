#!/usr/bin/env node

/**
 * Script de validation et optimisation des sitemaps
 * Vérifie les doublons, les erreurs et optimise les sitemaps
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../../dist');

function extractUrlsFromSitemap(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const urlMatches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  return urlMatches.map(match => match.replace('<loc>', '').replace('</loc>', ''));
}

function validateSitemaps() {
  console.log('🔍 Validation des sitemaps...\n');
  
  const sitemapFiles = fs.readdirSync(distDir)
    .filter(file => file.startsWith('sitemap') && file.endsWith('.xml'))
    .filter(file => file !== 'sitemap-index.xml'); // Exclure l'index
  
  const allUrls = new Map();
  const duplicates = [];
  const errors = [];
  
  // Analyser chaque sitemap
  for (const file of sitemapFiles) {
    const filePath = path.join(distDir, file);
    const urls = extractUrlsFromSitemap(filePath);
    
    console.log(`📄 ${file}: ${urls.length} URLs`);
    
    // Vérifier les doublons
    for (const url of urls) {
      if (allUrls.has(url)) {
        duplicates.push({
          url,
          files: [allUrls.get(url), file]
        });
      } else {
        allUrls.set(url, file);
      }
      
      // Valider l'URL
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname !== 'alladsmarket.com') {
          errors.push(`URL invalide dans ${file}: ${url} (mauvais domaine)`);
        }
        if (urlObj.protocol !== 'https:') {
          errors.push(`URL invalide dans ${file}: ${url} (doit être HTTPS)`);
        }
      } catch (e) {
        errors.push(`URL invalide dans ${file}: ${url}`);
      }
    }
  }
  
  // Résultats
  console.log(`\n📊 Statistiques:`);
  console.log(`   - Total URLs uniques: ${allUrls.size}`);
  console.log(`   - Sitemaps analysés: ${sitemapFiles.length}`);
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  ${duplicates.length} URLs en double détectées:`);
    duplicates.slice(0, 10).forEach(dup => {
      console.log(`   - ${dup.url}`);
      console.log(`     Présent dans: ${dup.files.join(', ')}`);
    });
    if (duplicates.length > 10) {
      console.log(`   ... et ${duplicates.length - 10} autres`);
    }
  } else {
    console.log(`\n✅ Aucun doublon détecté`);
  }
  
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} erreurs détectées:`);
    errors.slice(0, 10).forEach(error => {
      console.log(`   - ${error}`);
    });
    if (errors.length > 10) {
      console.log(`   ... et ${errors.length - 10} autres`);
    }
  } else {
    console.log(`\n✅ Aucune erreur détectée`);
  }
  
  // Vérifier le sitemap index
  const indexPath = path.join(distDir, 'sitemap-index.xml');
  if (fs.existsSync(indexPath)) {
    const indexUrls = extractUrlsFromSitemap(indexPath);
    console.log(`\n📑 sitemap-index.xml: ${indexUrls.length} sitemaps référencés`);
    
    // Vérifier que tous les sitemaps référencés existent
    const missing = [];
    indexUrls.forEach(sitemapUrl => {
      const sitemapFile = sitemapUrl.split('/').pop();
      const sitemapPath = path.join(distDir, sitemapFile);
      if (!fs.existsSync(sitemapPath)) {
        missing.push(sitemapFile);
      }
    });
    
    if (missing.length > 0) {
      console.log(`\n⚠️  ${missing.length} sitemaps référencés mais manquants:`);
      missing.forEach(file => console.log(`   - ${file}`));
    } else {
      console.log(`✅ Tous les sitemaps référencés existent`);
    }
  }
  
  return {
    totalUrls: allUrls.size,
    duplicates: duplicates.length,
    errors: errors.length,
    isValid: duplicates.length === 0 && errors.length === 0
  };
}

// Exécuter la validation
try {
  const result = validateSitemaps();
  
  if (result.isValid) {
    console.log('\n🎉 Tous les sitemaps sont valides et optimisés!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Des problèmes ont été détectés dans les sitemaps');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Erreur lors de la validation:', error);
  process.exit(1);
}

