#!/usr/bin/env node

/**
 * 🚀 Script de Soumission Automatique des Sitemaps
 * Soumet automatiquement tous les sitemaps aux moteurs de recherche
 */

import https from 'https';
import http from 'http';

// Configuration
const SITE_URL = 'https://alladsmarket.com';
const SITEMAPS = [
  'sitemap.xml',
  'sitemap-index.xml',
  'sitemap-images.xml',
  'sitemap-news.xml'
];

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

// 1. Soumission à Google
async function submitToGoogle() {
  log('\n1️⃣ Soumission à Google Search Console...', 'blue');
  
  try {
    // URLs de soumission Google
    const googleUrls = [
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-index.xml`)}`,
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-images.xml`)}`,
      `https://www.google.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-news.xml`)}`
    ];
    
    log('📤 Soumission des sitemaps à Google...', 'yellow');
    
    for (const url of googleUrls) {
      try {
        const response = await makeRequest(url);
        if (response.status === 200) {
          log(`✅ Sitemap soumis avec succès: ${url.split('sitemap=')[1]}`, 'green');
        } else {
          log(`⚠️  Réponse ${response.status} pour: ${url.split('sitemap=')[1]}`, 'yellow');
        }
      } catch (error) {
        log(`❌ Erreur pour ${url.split('sitemap=')[1]}: ${error.message}`, 'red');
      }
    }
    
    log('\n💡 Instructions manuelles Google Search Console:', 'cyan');
    log('   1. Allez sur: https://search.google.com/search-console', 'cyan');
    log('   2. Ajoutez votre propriété: alladsmarket.com', 'cyan');
    log('   3. Vérifiez la propriété', 'cyan');
    log('   4. Allez dans "Sitemaps"', 'cyan');
    log('   5. Ajoutez ces URLs:', 'cyan');
    SITEMAPS.forEach(sitemap => {
      log(`      - ${SITE_URL}/${sitemap}`, 'cyan');
    });
    
    return true;
  } catch (error) {
    log(`❌ Erreur Google: ${error.message}`, 'red');
    return false;
  }
}

// 2. Soumission à Bing
async function submitToBing() {
  log('\n2️⃣ Soumission à Bing Webmaster Tools...', 'blue');
  
  try {
    const bingUrls = [
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-index.xml`)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-images.xml`)}`,
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-news.xml`)}`
    ];
    
    log('📤 Soumission des sitemaps à Bing...', 'yellow');
    
    for (const url of bingUrls) {
      try {
        const response = await makeRequest(url);
        if (response.status === 200) {
          log(`✅ Sitemap soumis avec succès: ${url.split('sitemap=')[1]}`, 'green');
        } else {
          log(`⚠️  Réponse ${response.status} pour: ${url.split('sitemap=')[1]}`, 'yellow');
        }
      } catch (error) {
        log(`❌ Erreur pour ${url.split('sitemap=')[1]}: ${error.message}`, 'red');
      }
    }
    
    log('\n💡 Instructions manuelles Bing Webmaster Tools:', 'cyan');
    log('   1. Allez sur: https://www.bing.com/webmasters', 'cyan');
    log('   2. Ajoutez votre site: alladsmarket.com', 'cyan');
    log('   3. Vérifiez la propriété', 'cyan');
    log('   4. Allez dans "Sitemaps"', 'cyan');
    log('   5. Ajoutez ces URLs:', 'cyan');
    SITEMAPS.forEach(sitemap => {
      log(`      - ${SITE_URL}/${sitemap}`, 'cyan');
    });
    
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
    const yandexUrls = [
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap.xml`)}`,
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-index.xml`)}`,
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-images.xml`)}`,
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(`${SITE_URL}/sitemap-news.xml`)}`
    ];
    
    log('📤 Soumission des sitemaps à Yandex...', 'yellow');
    
    for (const url of yandexUrls) {
      try {
        const response = await makeRequest(url);
        if (response.status === 200) {
          log(`✅ Sitemap soumis avec succès: ${url.split('sitemap=')[1]}`, 'green');
        } else {
          log(`⚠️  Réponse ${response.status} pour: ${url.split('sitemap=')[1]}`, 'yellow');
        }
      } catch (error) {
        log(`❌ Erreur pour ${url.split('sitemap=')[1]}: ${error.message}`, 'red');
      }
    }
    
    log('\n💡 Instructions manuelles Yandex Webmaster:', 'cyan');
    log('   1. Allez sur: https://webmaster.yandex.com', 'cyan');
    log('   2. Ajoutez votre site: alladsmarket.com', 'cyan');
    log('   3. Vérifiez la propriété', 'cyan');
    log('   4. Allez dans "Sitemaps"', 'cyan');
    log('   5. Ajoutez ces URLs:', 'cyan');
    SITEMAPS.forEach(sitemap => {
      log(`      - ${SITE_URL}/${sitemap}`, 'cyan');
    });
    
    return true;
  } catch (error) {
    log(`❌ Erreur Yandex: ${error.message}`, 'red');
    return false;
  }
}

// 4. Vérification des sitemaps
async function verifySitemaps() {
  log('\n4️⃣ Vérification des sitemaps...', 'blue');
  
  try {
    for (const sitemap of SITEMAPS) {
      const url = `${SITE_URL}/${sitemap}`;
      log(`🔍 Vérification: ${sitemap}`, 'cyan');
      
      try {
        const response = await makeRequest(url);
        if (response.status === 200) {
          log(`✅ ${sitemap} accessible (${response.status})`, 'green');
          
          // Vérifier le contenu XML
          if (response.data.includes('<?xml') && response.data.includes('<urlset')) {
            log(`✅ ${sitemap} contient du XML valide`, 'green');
          } else {
            log(`⚠️  ${sitemap} ne semble pas être un XML valide`, 'yellow');
          }
        } else {
          log(`❌ ${sitemap} inaccessible (${response.status})`, 'red');
        }
      } catch (error) {
        log(`❌ Erreur lors de la vérification de ${sitemap}: ${error.message}`, 'red');
      }
    }
    
    return true;
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red');
    return false;
  }
}

// 5. Génération des liens de soumission
function generateSubmissionLinks() {
  log('\n5️⃣ Génération des liens de soumission...', 'blue');
  
  const submissionLinks = [
    {
      name: 'Google Search Console',
      url: 'https://search.google.com/search-console',
      description: 'Ajoutez alladsmarket.com et soumettez tous les sitemaps'
    },
    {
      name: 'Bing Webmaster Tools',
      url: 'https://www.bing.com/webmasters',
      description: 'Ajoutez alladsmarket.com et soumettez tous les sitemaps'
    },
    {
      name: 'Yandex Webmaster',
      url: 'https://webmaster.yandex.com',
      description: 'Ajoutez alladsmarket.com et soumettez tous les sitemaps'
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
  
  log('📄 Sitemaps à soumettre:', 'green');
  SITEMAPS.forEach((sitemap, index) => {
    log(`   ${index + 1}. ${SITE_URL}/${sitemap}`, 'cyan');
  });
  
  return true;
}

// Fonction principale
async function submitSitemaps() {
  log('🚀 Soumission Automatique des Sitemaps - AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let successCount = 0;
  const totalSteps = 5;
  
  try {
    // 1. Soumission Google
    if (await submitToGoogle()) successCount++;
    
    // 2. Soumission Bing
    if (await submitToBing()) successCount++;
    
    // 3. Soumission Yandex
    if (await submitToYandex()) successCount++;
    
    // 4. Vérification sitemaps
    if (await verifySitemaps()) successCount++;
    
    // 5. Génération liens
    if (generateSubmissionLinks()) successCount++;
    
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
    log('   2. Vérifiez l\'indexation dans Search Console', 'blue');
    log('   3. Surveillez les erreurs de crawl', 'blue');
    log('   4. Mettez à jour les sitemaps régulièrement', 'blue');
    
    log('\n📈 Résultats attendus:', 'blue');
    log('   - Indexation dans 1-2 semaines', 'blue');
    log('   - Premières visites dans 2-4 semaines', 'blue');
    log('   - Trafic organique stable dans 2-3 mois', 'blue');
    
  } catch (error) {
    log(`❌ Erreur générale: ${error.message}`, 'red');
  }
}

// Exécuter la soumission
submitSitemaps();

export { submitSitemaps };
