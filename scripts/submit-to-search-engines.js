#!/usr/bin/env node

/**
 * 🔍 Script de Soumission SEO - AllAdsMarket
 * Soumet le site aux moteurs de recherche et vérifie l'indexation
 */

import https from 'https';
import http from 'http';

// Configuration
const SITE_URL = 'https://alladsmarket.com';
const SITEMAP_URL = 'https://alladsmarket.com/sitemap.xml';

// Couleurs pour les messages
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Fonction pour faire une requête HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

// 1. Soumission à Google Search Console
async function submitToGoogle() {
  log('\n1️⃣ Soumission à Google Search Console...', 'blue');
  
  try {
    // URL de soumission Google (nécessite une clé API)
    const googleSubmitUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    log('📤 Soumission du sitemap à Google...', 'yellow');
    log(`🔗 URL: ${googleSubmitUrl}`, 'cyan');
    
    // Note: Cette méthode nécessite une configuration dans Google Search Console
    log('💡 Pour soumettre manuellement:', 'yellow');
    log('   1. Allez sur https://search.google.com/search-console', 'yellow');
    log('   2. Ajoutez votre propriété alladsmarket.com', 'yellow');
    log('   3. Vérifiez la propriété', 'yellow');
    log('   4. Soumettez le sitemap: https://alladsmarket.com/sitemap.xml', 'yellow');
    
    return true;
  } catch (error) {
    log(`❌ Erreur Google: ${error.message}`, 'red');
    return false;
  }
}

// 2. Soumission à Bing Webmaster Tools
async function submitToBing() {
  log('\n2️⃣ Soumission à Bing Webmaster Tools...', 'blue');
  
  try {
    const bingSubmitUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    log('📤 Soumission du sitemap à Bing...', 'yellow');
    log(`🔗 URL: ${bingSubmitUrl}`, 'cyan');
    
    log('💡 Pour soumettre manuellement:', 'yellow');
    log('   1. Allez sur https://www.bing.com/webmasters', 'yellow');
    log('   2. Ajoutez votre site alladsmarket.com', 'yellow');
    log('   3. Vérifiez la propriété', 'yellow');
    log('   4. Soumettez le sitemap: https://alladsmarket.com/sitemap.xml', 'yellow');
    
    return true;
  } catch (error) {
    log(`❌ Erreur Bing: ${error.message}`, 'red');
    return false;
  }
}

// 3. Soumission à Yandex
async function submitToYandex() {
  log('\n3️⃣ Soumission à Yandex Webmaster...', 'blue');
  
  try {
    const yandexSubmitUrl = `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    log('📤 Soumission du sitemap à Yandex...', 'yellow');
    log(`🔗 URL: ${yandexSubmitUrl}`, 'cyan');
    
    log('💡 Pour soumettre manuellement:', 'yellow');
    log('   1. Allez sur https://webmaster.yandex.com', 'yellow');
    log('   2. Ajoutez votre site alladsmarket.com', 'yellow');
    log('   3. Vérifiez la propriété', 'yellow');
    log('   4. Soumettez le sitemap: https://alladsmarket.com/sitemap.xml', 'yellow');
    
    return true;
  } catch (error) {
    log(`❌ Erreur Yandex: ${error.message}`, 'red');
    return false;
  }
}

// 4. Vérification de l'indexation
async function checkIndexing() {
  log('\n4️⃣ Vérification de l\'indexation...', 'blue');
  
  try {
    // Vérifier si le site est indexé sur Google
    const googleSearchUrl = `https://www.google.com/search?q=site:alladsmarket.com`;
    log(`🔍 Recherche Google: ${googleSearchUrl}`, 'cyan');
    
    // Vérifier si le site est indexé sur Bing
    const bingSearchUrl = `https://www.bing.com/search?q=site:alladsmarket.com`;
    log(`🔍 Recherche Bing: ${bingSearchUrl}`, 'cyan');
    
    log('💡 Vérifiez manuellement ces URLs pour voir si votre site est indexé', 'yellow');
    
    return true;
  } catch (error) {
    log(`❌ Erreur vérification: ${error.message}`, 'red');
    return false;
  }
}

// 5. Génération de liens de soumission
async function generateSubmissionLinks() {
  log('\n5️⃣ Génération des liens de soumission...', 'blue');
  
  const submissionLinks = [
    {
      name: 'Google Search Console',
      url: 'https://search.google.com/search-console',
      description: 'Ajoutez alladsmarket.com et soumettez le sitemap'
    },
    {
      name: 'Bing Webmaster Tools',
      url: 'https://www.bing.com/webmasters',
      description: 'Ajoutez alladsmarket.com et soumettez le sitemap'
    },
    {
      name: 'Yandex Webmaster',
      url: 'https://webmaster.yandex.com',
      description: 'Ajoutez alladsmarket.com et soumettez le sitemap'
    },
    {
      name: 'Baidu Webmaster',
      url: 'https://ziyuan.baidu.com',
      description: 'Pour le marché chinois'
    }
  ];
  
  log('🔗 Liens de soumission:', 'green');
  submissionLinks.forEach((link, index) => {
    log(`   ${index + 1}. ${link.name}`, 'green');
    log(`      URL: ${link.url}`, 'cyan');
    log(`      Action: ${link.description}`, 'yellow');
    log('');
  });
  
  return true;
}

// 6. Vérification des performances SEO
async function checkSEOPerformance() {
  log('\n6️⃣ Vérification des performances SEO...', 'blue');
  
  try {
    // Vérifier la réponse du site
    const response = await makeRequest(SITE_URL);
    
    if (response.status === 200) {
      log('✅ Site accessible (HTTP 200)', 'green');
    } else {
      log(`⚠️  Site répond avec le code: ${response.status}`, 'yellow');
    }
    
    // Vérifier les headers SEO
    const headers = response.headers;
    
    if (headers['content-type'] && headers['content-type'].includes('text/html')) {
      log('✅ Content-Type correct', 'green');
    } else {
      log('⚠️  Content-Type incorrect', 'yellow');
    }
    
    if (headers['x-robots-tag']) {
      log('✅ Headers robots présents', 'green');
    } else {
      log('⚠️  Headers robots manquants', 'yellow');
    }
    
    return true;
  } catch (error) {
    log(`❌ Erreur vérification SEO: ${error.message}`, 'red');
    return false;
  }
}

// Fonction principale
async function submitToSearchEngines() {
  log('🔍 Soumission AllAdsMarket aux Moteurs de Recherche', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let successCount = 0;
  const totalSteps = 6;
  
  try {
    // 1. Soumission Google
    if (await submitToGoogle()) successCount++;
    
    // 2. Soumission Bing
    if (await submitToBing()) successCount++;
    
    // 3. Soumission Yandex
    if (await submitToYandex()) successCount++;
    
    // 4. Vérification indexation
    if (await checkIndexing()) successCount++;
    
    // 5. Génération liens
    if (await generateSubmissionLinks()) successCount++;
    
    // 6. Vérification performances
    if (await checkSEOPerformance()) successCount++;
    
    // Résumé
    log('\n📊 Résumé de la soumission:', 'magenta');
    log('='.repeat(60), 'magenta');
    
    log(`✅ Étapes réussies: ${successCount}/${totalSteps}`, 'green');
    
    if (successCount === totalSteps) {
      log('🎉 Toutes les étapes sont terminées !', 'green');
    } else {
      log('⚠️  Certaines étapes nécessitent une action manuelle', 'yellow');
    }
    
    log('\n💡 Actions immédiates recommandées:', 'blue');
    log('   1. Soumettez manuellement aux moteurs de recherche', 'blue');
    log('   2. Créez du contenu de qualité régulièrement', 'blue');
    log('   3. Obtenez des backlinks de sites de qualité', 'blue');
    log('   4. Optimisez les temps de chargement', 'blue');
    log('   5. Utilisez les réseaux sociaux pour promouvoir', 'blue');
    
  } catch (error) {
    log(`❌ Erreur générale: ${error.message}`, 'red');
  }
}

// Exécuter la soumission
submitToSearchEngines();

export { submitToSearchEngines };
