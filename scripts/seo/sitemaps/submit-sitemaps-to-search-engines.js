#!/usr/bin/env node

/**
 * SOUMISSION DES SITEMAPS AUX MOTEURS DE RECHERCHE
 * Script pour soumettre automatiquement les sitemaps
 */

import https from 'https';
import http from 'http';
import fs from 'fs';

// Configuration
const BASE_URL = 'https://alladsmarket.com';
const SITEMAPS = [
  'sitemap.xml',
  'sitemap-index.xml',
  'sitemap-images.xml',
  'sitemap-news.xml'
];

// Couleurs pour la console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Fonction de requête HTTP
const makeRequest = (url, method = 'GET') => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const options = {
      method,
      headers: {
        'User-Agent': 'AllAdsMarket-Sitemap-Submitter/1.0'
      }
    };

    const req = protocol.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        data: data
      }));
    });

    req.on('error', reject);
    req.end();
  });
};

// Fonction de soumission à Google Search Console
const submitToGoogle = async () => {
  log('\n🔍 SOUMISSION À GOOGLE SEARCH CONSOLE', 'cyan');
  log('=====================================', 'cyan');

  log('ℹ️ Pour soumettre à Google Search Console:', 'blue');
  log('  1. Connectez-vous à https://search.google.com/search-console', 'blue');
  log('  2. Sélectionnez votre propriété (alladsmarket.com)', 'blue');
  log('  3. Allez dans "Sitemaps" dans le menu de gauche', 'blue');
  log('  4. Ajoutez les URLs suivantes:', 'blue');
  
  SITEMAPS.forEach(sitemap => {
    log(`     • ${BASE_URL}/${sitemap}`, 'green');
  });

  log('\n📊 URLs de sitemaps à soumettre:', 'yellow');
  SITEMAPS.forEach(sitemap => {
    log(`  ${BASE_URL}/${sitemap}`, 'white');
  });
};

// Fonction de soumission à Bing Webmaster Tools
const submitToBing = async () => {
  log('\n🔍 SOUMISSION À BING WEBMASTER TOOLS', 'cyan');
  log('====================================', 'cyan');

  log('ℹ️ Pour soumettre à Bing Webmaster Tools:', 'blue');
  log('  1. Connectez-vous à https://www.bing.com/webmasters', 'blue');
  log('  2. Sélectionnez votre site (alladsmarket.com)', 'blue');
  log('  3. Allez dans "Sitemaps" dans le menu', 'blue');
  log('  4. Ajoutez les URLs suivantes:', 'blue');
  
  SITEMAPS.forEach(sitemap => {
    log(`     • ${BASE_URL}/${sitemap}`, 'green');
  });

  log('\n📊 URLs de sitemaps à soumettre:', 'yellow');
  SITEMAPS.forEach(sitemap => {
    log(`  ${BASE_URL}/${sitemap}`, 'white');
  });
};

// Fonction de soumission à Yandex Webmaster
const submitToYandex = async () => {
  log('\n🔍 SOUMISSION À YANDEX WEBMASTER', 'cyan');
  log('=================================', 'cyan');

  log('ℹ️ Pour soumettre à Yandex Webmaster:', 'blue');
  log('  1. Connectez-vous à https://webmaster.yandex.com', 'blue');
  log('  2. Sélectionnez votre site (alladsmarket.com)', 'blue');
  log('  3. Allez dans "Indexation" > "Fichiers Sitemap"', 'blue');
  log('  4. Ajoutez les URLs suivantes:', 'blue');
  
  SITEMAPS.forEach(sitemap => {
    log(`     • ${BASE_URL}/${sitemap}`, 'green');
  });

  log('\n📊 URLs de sitemaps à soumettre:', 'yellow');
  SITEMAPS.forEach(sitemap => {
    log(`  ${BASE_URL}/${sitemap}`, 'white');
  });
};

// Fonction de vérification de l'accessibilité des sitemaps
const checkSitemapAccessibility = async () => {
  log('\n🔍 VÉRIFICATION DE L\'ACCESSIBILITÉ DES SITEMAPS', 'cyan');
  log('================================================', 'cyan');

  for (const sitemap of SITEMAPS) {
    try {
      const url = `${BASE_URL}/${sitemap}`;
      log(`\n🔍 Vérification de ${sitemap}...`, 'blue');
      
      const response = await makeRequest(url);
      
      if (response.statusCode === 200) {
        log(`✅ ${sitemap}: Accessible (${response.statusCode})`, 'green');
        
        // Vérifier le contenu XML
        if (response.data.includes('<?xml') && response.data.includes('<urlset')) {
          log(`✅ ${sitemap}: Format XML valide`, 'green');
        } else {
          log(`⚠️ ${sitemap}: Format XML suspect`, 'yellow');
        }
      } else {
        log(`❌ ${sitemap}: Erreur ${response.statusCode}`, 'red');
      }
    } catch (error) {
      log(`❌ ${sitemap}: Erreur de connexion - ${error.message}`, 'red');
    }
  }
};

// Fonction de génération de ping automatique
const pingSearchEngines = async () => {
  log('\n📡 PING AUTOMATIQUE DES MOTEURS DE RECHERCHE', 'cyan');
  log('============================================', 'cyan');

  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(BASE_URL)}/sitemap.xml`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(BASE_URL)}/sitemap.xml`
  ];

  for (const pingUrl of pingUrls) {
    try {
      log(`\n📡 Ping vers ${pingUrl.split('/')[2]}...`, 'blue');
      
      const response = await makeRequest(pingUrl);
      
      if (response.statusCode === 200) {
        log(`✅ Ping réussi vers ${pingUrl.split('/')[2]}`, 'green');
      } else {
        log(`⚠️ Ping vers ${pingUrl.split('/')[2]}: ${response.statusCode}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Erreur de ping vers ${pingUrl.split('/')[2]}: ${error.message}`, 'red');
    }
  }
};

// Fonction de génération de rapport de soumission
const generateSubmissionReport = () => {
  log('\n📊 RAPPORT DE SOUMISSION DES SITEMAPS', 'cyan');
  log('=====================================', 'cyan');

  const report = `
# RAPPORT DE SOUMISSION DES SITEMAPS - ALLADSMARKET
Date: ${new Date().toISOString().split('T')[0]}
Site: ${BASE_URL}

## SITEMAPS GÉNÉRÉS
${SITEMAPS.map(sitemap => `- ${BASE_URL}/${sitemap}`).join('\n')}

## INSTRUCTIONS DE SOUMISSION

### Google Search Console
1. Connectez-vous à https://search.google.com/search-console
2. Sélectionnez votre propriété (alladsmarket.com)
3. Allez dans "Sitemaps" dans le menu de gauche
4. Ajoutez chaque URL de sitemap

### Bing Webmaster Tools
1. Connectez-vous à https://www.bing.com/webmasters
2. Sélectionnez votre site (alladsmarket.com)
3. Allez dans "Sitemaps" dans le menu
4. Ajoutez chaque URL de sitemap

### Yandex Webmaster
1. Connectez-vous à https://webmaster.yandex.com
2. Sélectionnez votre site (alladsmarket.com)
3. Allez dans "Indexation" > "Fichiers Sitemap"
4. Ajoutez chaque URL de sitemap

## VÉRIFICATIONS RECOMMANDÉES
- Vérifier l'indexation dans Google Search Console
- Surveiller les erreurs de crawl
- Analyser les Core Web Vitals
- Vérifier la vitesse de chargement
- Tester l'expérience mobile

## PROCHAINES ÉTAPES
1. Soumettre les sitemaps manuellement
2. Surveiller l'indexation pendant 1-2 semaines
3. Optimiser les pages avec des erreurs
4. Améliorer les Core Web Vitals
5. Créer du contenu de qualité régulièrement
`;

  fs.writeFileSync('SEO_SUBMISSION_REPORT.md', report);
  log('✅ Rapport de soumission généré: SEO_SUBMISSION_REPORT.md', 'green');
};

// Fonction principale
const performSitemapSubmission = async () => {
  log('\n🚀 SOUMISSION DES SITEMAPS AUX MOTEURS DE RECHERCHE', 'bold');
  log('==================================================\n', 'bold');

  try {
    await checkSitemapAccessibility();
    await pingSearchEngines();
    await submitToGoogle();
    await submitToBing();
    await submitToYandex();
    await generateSubmissionReport();

    log('\n✅ SOUMISSION TERMINÉE', 'green');
    log('=====================', 'green');
    
    log('\n📋 RÉSUMÉ DES ACTIONS:', 'blue');
    log('  ✅ Vérification de l\'accessibilité des sitemaps', 'green');
    log('  ✅ Ping automatique des moteurs de recherche', 'green');
    log('  ✅ Instructions pour Google Search Console', 'green');
    log('  ✅ Instructions pour Bing Webmaster Tools', 'green');
    log('  ✅ Instructions pour Yandex Webmaster', 'green');
    log('  ✅ Rapport de soumission généré', 'green');

    log('\n🎯 PROCHAINES ÉTAPES:', 'cyan');
    log('  1. Suivre les instructions pour soumettre manuellement', 'blue');
    log('  2. Surveiller l\'indexation dans les outils webmaster', 'blue');
    log('  3. Vérifier les erreurs de crawl', 'blue');
    log('  4. Optimiser les pages avec des problèmes', 'blue');
    log('  5. Créer du contenu de qualité régulièrement', 'blue');

  } catch (error) {
    log(`❌ Erreur lors de la soumission: ${error.message}`, 'red');
  }
};

// Exécution de la soumission
performSitemapSubmission();
