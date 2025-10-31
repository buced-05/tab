// Script de vérification SEO
const https = require('https');

const SITE_URL = 'https://alladsmarket.com'; // Remplacez par votre URL

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🔍 Vérification SEO de votre site...\n');
  
  const urls = [
    SITE_URL,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/robots.txt`,
    `${SITE_URL}/products`,
    `${SITE_URL}/featured`,
    `${SITE_URL}/trending`
  ];
  
  for (const url of urls) {
    await checkUrl(url);
  }
  
  console.log('\n📋 Checklist SEO:');
  console.log('□ Site accessible publiquement');
  console.log('□ Sitemap.xml accessible');
  console.log('□ Robots.txt configuré');
  console.log('□ Pages principales accessibles');
  console.log('□ Soumis à Google Search Console');
  console.log('□ Soumis à Bing Webmaster Tools');
  console.log('\n⏱️ Temps d\'indexation: 24-48h');
}

main().catch(console.error);
