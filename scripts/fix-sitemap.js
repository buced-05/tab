#!/usr/bin/env node

/**
 * 🔧 Correcteur de Sitemap - AllAdsMarket
 * Corrige les erreurs détectées par Google
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://alladsmarket.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

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

// Fonction pour échapper les caractères XML
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// Fonction pour valider les URLs
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 1. Génération des URLs principales (corrigées)
function generateMainURLs() {
  log('\n1️⃣ Génération des URLs principales (corrigées)...', 'blue');
  
  const mainURLs = [
    {
      url: '/',
      priority: '1.0',
      changefreq: 'daily',
      lastmod: CURRENT_DATE
    },
    {
      url: '/produits',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: CURRENT_DATE
    },
    {
      url: '/articles',
      priority: '0.9',
      changefreq: 'daily',
      lastmod: CURRENT_DATE
    },
    {
      url: '/categories',
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: CURRENT_DATE
    },
    {
      url: '/a-propos',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: CURRENT_DATE
    },
    {
      url: '/contact',
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: CURRENT_DATE
    },
    {
      url: '/politique-confidentialite',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: CURRENT_DATE
    },
    {
      url: '/conditions-utilisation',
      priority: '0.3',
      changefreq: 'yearly',
      lastmod: CURRENT_DATE
    }
  ];
  
  log(`✅ ${mainURLs.length} URLs principales générées`, 'green');
  return mainURLs;
}

// 2. Génération des URLs de catégories (corrigées)
function generateCategoryURLs() {
  log('\n2️⃣ Génération des URLs de catégories (corrigées)...', 'blue');
  
  const categories = [
    { slug: 'electronique', priority: '0.8' },
    { slug: 'maison-jardin', priority: '0.8' },
    { slug: 'mode-beaute', priority: '0.8' },
    { slug: 'sport-loisirs', priority: '0.8' },
    { slug: 'automobile', priority: '0.8' },
    { slug: 'alimentation', priority: '0.8' },
    { slug: 'bebe-enfant', priority: '0.8' },
    { slug: 'animaux', priority: '0.8' },
    { slug: 'bricolage', priority: '0.8' },
    { slug: 'livres', priority: '0.8' }
  ];
  
  const categoryURLs = categories.map(category => ({
    url: `/categories/${category.slug}`,
    priority: category.priority,
    changefreq: 'weekly',
    lastmod: CURRENT_DATE
  }));
  
  log(`✅ ${categoryURLs.length} URLs de catégories générées`, 'green');
  return categoryURLs;
}

// 3. Génération des URLs de produits (corrigées)
async function generateProductURLs() {
  log('\n3️⃣ Génération des URLs de produits (corrigées)...', 'blue');
  
  try {
    const productsPath = path.join(__dirname, '../src/utils/sampleData.js');
    
    if (!fs.existsSync(productsPath)) {
      log('⚠️  Fichier sampleData.js non trouvé', 'yellow');
      return [];
    }
    
    const { getSampleProducts } = await import('../src/utils/sampleData.js');
    const products = getSampleProducts();
    
    const productURLs = products.map(product => {
      // Générer un slug sécurisé
      const slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50); // Limiter la longueur
      
      return {
        url: `/produit/${product._id}`,
        priority: product.isFeatured ? '0.9' : '0.7',
        changefreq: 'weekly',
        lastmod: CURRENT_DATE
      };
    });
    
    log(`✅ ${productURLs.length} URLs de produits générées`, 'green');
    return productURLs;
    
  } catch (error) {
    log(`❌ Erreur lors de la génération des produits: ${error.message}`, 'red');
    return [];
  }
}

// 4. Génération des URLs d'articles (corrigées)
async function generateArticleURLs() {
  log('\n4️⃣ Génération des URLs d\'articles (corrigées)...', 'blue');
  
  try {
    const articlesPath = path.join(__dirname, '../src/data/articles.json');
    
    if (!fs.existsSync(articlesPath)) {
      log('⚠️  Fichier articles.json non trouvé', 'yellow');
      return [];
    }
    
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    
    const articleURLs = articlesData.map(article => ({
      url: `/article/${article.productId}`,
      priority: article.status === 'published' ? '0.8' : '0.5',
      changefreq: 'monthly',
      lastmod: CURRENT_DATE
    }));
    
    log(`✅ ${articleURLs.length} URLs d'articles générées`, 'green');
    return articleURLs;
    
  } catch (error) {
    log(`❌ Erreur lors de la génération des articles: ${error.message}`, 'red');
    return [];
  }
}

// 5. Génération du sitemap XML corrigé
function generateCorrectedSitemapXML(allURLs) {
  log('\n5️⃣ Génération du sitemap XML corrigé...', 'blue');
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allURLs.forEach(urlData => {
    const fullUrl = `${SITE_URL}${urlData.url}`;
    
    // Valider l'URL
    if (!isValidUrl(fullUrl)) {
      log(`⚠️  URL invalide ignorée: ${fullUrl}`, 'yellow');
      return;
    }
    
    sitemap += `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${urlData.lastmod}</lastmod>
    <changefreq>${urlData.changefreq}</changefreq>
    <priority>${urlData.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  
  log('✅ Sitemap XML corrigé généré', 'green');
  return sitemap;
}

// 6. Validation du sitemap
function validateSitemap(sitemapContent) {
  log('\n6️⃣ Validation du sitemap...', 'blue');
  
  const errors = [];
  
  // Vérifier la structure XML de base
  if (!sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('En-tête XML manquant');
  }
  
  if (!sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
    errors.push('Namespace urlset manquant');
  }
  
  if (!sitemapContent.includes('</urlset>')) {
    errors.push('Balise de fermeture urlset manquante');
  }
  
  // Compter les URLs
  const urlMatches = sitemapContent.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  // Vérifier les balises obligatoires
  const requiredTags = ['<loc>', '<lastmod>', '<changefreq>', '<priority>'];
  requiredTags.forEach(tag => {
    if (!sitemapContent.includes(tag)) {
      errors.push(`Balise obligatoire manquante: ${tag}`);
    }
  });
  
  // Vérifier les valeurs de priorité
  const priorityMatches = sitemapContent.match(/<priority>([^<]+)<\/priority>/g);
  if (priorityMatches) {
    priorityMatches.forEach(match => {
      const priority = match.replace(/<\/?priority>/g, '');
      const numPriority = parseFloat(priority);
      if (isNaN(numPriority) || numPriority < 0 || numPriority > 1) {
        errors.push(`Priorité invalide: ${priority}`);
      }
    });
  }
  
  // Vérifier les fréquences de changement
  const changefreqValues = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  const changefreqMatches = sitemapContent.match(/<changefreq>([^<]+)<\/changefreq>/g);
  if (changefreqMatches) {
    changefreqMatches.forEach(match => {
      const freq = match.replace(/<\/?changefreq>/g, '');
      if (!changefreqValues.includes(freq)) {
        errors.push(`Fréquence invalide: ${freq}`);
      }
    });
  }
  
  if (errors.length === 0) {
    log(`✅ Sitemap valide (${urlCount} URLs)`, 'green');
    return { valid: true, urlCount, errors: [] };
  } else {
    log(`❌ ${errors.length} erreurs trouvées:`, 'red');
    errors.forEach(error => log(`   - ${error}`, 'red'));
    return { valid: false, urlCount, errors };
  }
}

// Fonction principale
async function fixSitemap() {
  log('🔧 Correction du Sitemap - AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  try {
    // 1. Générer toutes les URLs corrigées
    const mainURLs = generateMainURLs();
    const categoryURLs = generateCategoryURLs();
    const productURLs = await generateProductURLs();
    const articleURLs = await generateArticleURLs();
    
    // 2. Combiner toutes les URLs
    const allURLs = [
      ...mainURLs,
      ...categoryURLs,
      ...productURLs,
      ...articleURLs
    ];
    
    log(`\n📊 Total des URLs: ${allURLs.length}`, 'magenta');
    
    // 3. Générer le sitemap corrigé
    const sitemapXML = generateCorrectedSitemapXML(allURLs);
    
    // 4. Valider le sitemap
    const validation = validateSitemap(sitemapXML);
    
    if (validation.valid) {
      // 5. Sauvegarder le fichier corrigé
      const publicDir = path.join(__dirname, '../public');
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML);
      log('✅ sitemap.xml corrigé sauvegardé', 'green');
      
      // 6. Créer une sauvegarde
      const backupPath = path.join(publicDir, `sitemap-backup-${Date.now()}.xml`);
      fs.writeFileSync(backupPath, sitemapXML);
      log(`✅ Sauvegarde créée: ${backupPath}`, 'green');
      
      // Résumé
      log('\n📊 Résumé de la correction:', 'magenta');
      log('='.repeat(60), 'magenta');
      
      log(`✅ URLs principales: ${mainURLs.length}`, 'green');
      log(`✅ URLs catégories: ${categoryURLs.length}`, 'green');
      log(`✅ URLs produits: ${productURLs.length}`, 'green');
      log(`✅ URLs articles: ${articleURLs.length}`, 'green');
      log(`✅ Total URLs: ${allURLs.length}`, 'green');
      log(`✅ Sitemap valide: OUI`, 'green');
      
      log('\n💡 Corrections apportées:', 'blue');
      log('   📝 Format de date corrigé (YYYY-MM-DD)', 'blue');
      log('   📝 Échappement XML des caractères spéciaux', 'blue');
      log('   📝 Validation des URLs', 'blue');
      log('   📝 Validation des priorités (0.0-1.0)', 'blue');
      log('   📝 Validation des fréquences', 'blue');
      log('   📝 Structure XML simplifiée', 'blue');
      
      log('\n🚀 Prochaines étapes:', 'blue');
      log('   1. Soumettez le sitemap corrigé à Google', 'blue');
      log('   2. Vérifiez dans Search Console', 'blue');
      log('   3. Surveillez les erreurs', 'blue');
      
    } else {
      log('\n❌ Le sitemap contient encore des erreurs', 'red');
      log('💡 Vérifiez les erreurs ci-dessus et corrigez-les', 'yellow');
    }
    
    return validation;
    
  } catch (error) {
    log(`❌ Erreur lors de la correction: ${error.message}`, 'red');
    return null;
  }
}

// Exécuter la correction
fixSitemap();

export { fixSitemap };
