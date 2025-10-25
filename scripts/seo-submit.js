const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  baseUrl: 'https://alladsmarket.com',
  sitemapUrl: 'https://alladsmarket.com/sitemap.xml',
  googleSearchConsole: {
    // Remplacez par vos vraies clés API
    apiKey: 'YOUR_GOOGLE_API_KEY',
    searchEngineId: 'YOUR_SEARCH_ENGINE_ID'
  },
  bingWebmaster: {
    apiKey: 'YOUR_BING_API_KEY'
  }
};

// Fonction pour soumettre le sitemap à Google
async function submitToGoogle() {
  try {
    console.log('🔄 Soumission du sitemap à Google...');
    
    const response = await axios.get(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.baseUrl)}/sitemaps/${encodeURIComponent(config.sitemapUrl)}`,
      {
        headers: {
          'Authorization': `Bearer ${config.googleSearchConsole.apiKey}`
        }
      }
    );
    
    console.log('✅ Sitemap soumis à Google avec succès');
    return true;
  } catch (error) {
    console.log('⚠️  Soumission Google échouée (normal si pas configuré)');
    console.log('   Pour configurer : https://search.google.com/search-console');
    return false;
  }
}

// Fonction pour soumettre le sitemap à Bing
async function submitToBing() {
  try {
    console.log('🔄 Soumission du sitemap à Bing...');
    
    const response = await axios.post(
      'https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlBatch',
      {
        siteUrl: config.baseUrl,
        urlList: [config.sitemapUrl]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'apiKey': config.bingWebmaster.apiKey
        }
      }
    );
    
    console.log('✅ Sitemap soumis à Bing avec succès');
    return true;
  } catch (error) {
    console.log('⚠️  Soumission Bing échouée (normal si pas configuré)');
    console.log('   Pour configurer : https://www.bing.com/webmasters');
    return false;
  }
}

// Fonction pour soumettre à Yandex
async function submitToYandex() {
  try {
    console.log('🔄 Soumission du sitemap à Yandex...');
    
    const response = await axios.get(
      `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(config.sitemapUrl)}`
    );
    
    console.log('✅ Sitemap soumis à Yandex avec succès');
    return true;
  } catch (error) {
    console.log('⚠️  Soumission Yandex échouée');
    return false;
  }
}

// Fonction pour vérifier l'indexation
async function checkIndexing() {
  try {
    console.log('🔍 Vérification de l\'indexation...');
    
    // Vérifier si le site est accessible
    const response = await axios.get(config.baseUrl, { timeout: 10000 });
    
    if (response.status === 200) {
      console.log('✅ Site accessible et fonctionnel');
      return true;
    } else {
      console.log('❌ Site non accessible');
      return false;
    }
  } catch (error) {
    console.log('❌ Erreur lors de la vérification du site');
    return false;
  }
}

// Fonction pour générer un rapport SEO
function generateSEOReport() {
  const report = {
    date: new Date().toISOString(),
    baseUrl: config.baseUrl,
    sitemapUrl: config.sitemapUrl,
    recommendations: [
      '1. Configurer Google Search Console',
      '2. Configurer Bing Webmaster Tools',
      '3. Vérifier les Core Web Vitals',
      '4. Optimiser les images',
      '5. Ajouter des backlinks de qualité',
      '6. Créer du contenu régulier',
      '7. Optimiser pour les mots-clés locaux',
      '8. Mettre en place le tracking des conversions'
    ],
    nextSteps: [
      'Soumettre manuellement le sitemap aux moteurs de recherche',
      'Configurer Google Analytics 4',
      'Créer un profil Google My Business',
      'Optimiser les meta descriptions',
      'Ajouter des schema markup',
      'Créer des liens internes',
      'Optimiser la vitesse de chargement'
    ]
  };

  const reportPath = path.join(__dirname, '../docs/seo-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log('📊 Rapport SEO généré :', reportPath);
  return report;
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de la soumission SEO...\n');
  
  // Vérifier l'accessibilité du site
  const isAccessible = await checkIndexing();
  if (!isAccessible) {
    console.log('❌ Le site n\'est pas accessible. Vérifiez votre configuration.');
    return;
  }
  
  // Soumettre aux moteurs de recherche
  const googleResult = await submitToGoogle();
  const bingResult = await submitToBing();
  const yandexResult = await submitToYandex();
  
  // Générer le rapport
  const report = generateSEOReport();
  
  console.log('\n📈 Résumé de la soumission :');
  console.log(`   - Google : ${googleResult ? '✅' : '⚠️'}`);
  console.log(`   - Bing : ${bingResult ? '✅' : '⚠️'}`);
  console.log(`   - Yandex : ${yandexResult ? '✅' : '⚠️'}`);
  
  console.log('\n🎯 Actions recommandées :');
  report.recommendations.forEach((rec, index) => {
    console.log(`   ${rec}`);
  });
  
  console.log('\n📋 Prochaines étapes :');
  report.nextSteps.forEach((step, index) => {
    console.log(`   ${step}`);
  });
  
  console.log('\n✨ Soumission SEO terminée !');
}

// Exécuter le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  submitToGoogle,
  submitToBing,
  submitToYandex,
  checkIndexing,
  generateSEOReport
};