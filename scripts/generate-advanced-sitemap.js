import fs from 'fs';
import path from 'path';

// Configuration
const baseUrl = 'https://alladsmarket.com';
const outputDir = './public';

// Données statiques des pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/products', priority: '0.9', changefreq: 'daily' },
  { url: '/articles', priority: '0.9', changefreq: 'weekly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/faq', priority: '0.6', changefreq: 'monthly' },
  { url: '/help', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  { url: '/returns', priority: '0.5', changefreq: 'yearly' },
  { url: '/shipping', priority: '0.5', changefreq: 'yearly' },
  { url: '/affiliate-links', priority: '0.6', changefreq: 'monthly' }
];

// Fonction pour générer le sitemap principal
function generateMainSitemap() {
  const timestamp = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Ajouter les pages statiques
  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Ajouter les pages de produits
  try {
    const productsData = JSON.parse(fs.readFileSync('./src/utils/sampleData.js', 'utf8'));
    const products = productsData.default || productsData;
    
    products.forEach(product => {
      sitemap += `  <url>
    <loc>${baseUrl}/product/${product._id}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.name}</image:title>
      <image:caption>${product.description}</image:caption>
    </image:image>
  </url>
`;
    });
  } catch (error) {
    console.log('Could not read products data:', error.message);
  }

  // Ajouter les pages d'articles
  try {
    const articlesData = JSON.parse(fs.readFileSync('./src/data/articles.json', 'utf8'));
    
    articlesData.forEach(article => {
      sitemap += `  <url>
    <loc>${baseUrl}/article/${article.productId}</loc>
    <lastmod>${article.updatedAt || article.createdAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${article.featuredImage}</image:loc>
      <image:title>${article.title}</image:title>
      <image:caption>${article.excerpt}</image:caption>
    </image:image>
  </url>
`;
    });
  } catch (error) {
    console.log('Could not read articles data:', error.message);
  }

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Fonction pour générer le sitemap des images
function generateImageSitemap() {
  const timestamp = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Ajouter les images des produits
  try {
    const productsData = JSON.parse(fs.readFileSync('./src/utils/sampleData.js', 'utf8'));
    const products = productsData.default || productsData;
    
    products.forEach(product => {
      sitemap += `  <url>
    <loc>${baseUrl}/product/${product._id}</loc>
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.name}</image:title>
      <image:caption>${product.description}</image:caption>
    </image:image>
  </url>
`;
    });
  } catch (error) {
    console.log('Could not read products data for images:', error.message);
  }

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Fonction pour générer le sitemap des actualités
function generateNewsSitemap() {
  const timestamp = new Date().toISOString();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Ajouter les articles récents comme actualités
  try {
    const articlesData = JSON.parse(fs.readFileSync('./src/data/articles.json', 'utf8'));
    const recentArticles = articlesData
      .filter(article => {
        const articleDate = new Date(article.createdAt || article.updatedAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return articleDate > thirtyDaysAgo;
      })
      .slice(0, 10); // Limiter à 10 articles récents
    
    recentArticles.forEach(article => {
      sitemap += `  <url>
    <loc>${baseUrl}/article/${article.productId}</loc>
    <news:news>
      <news:publication>
        <news:name>AllAdsMarket</news:name>
        <news:language>fr</news:language>
      </news:publication>
      <news:publication_date>${article.createdAt || article.updatedAt}</news:publication_date>
      <news:title>${article.title}</news:title>
    </news:news>
  </url>
`;
    });
  } catch (error) {
    console.log('Could not read articles data for news:', error.message);
  }

  sitemap += `</urlset>`;
  
  return sitemap;
}

// Fonction pour générer le sitemap index
function generateSitemapIndex() {
  const timestamp = new Date().toISOString();
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${timestamp}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Fonction principale
function generateAllSitemaps() {
  try {
    // Créer le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Générer tous les sitemaps
    console.log('🔄 Generating main sitemap...');
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), generateMainSitemap());
    console.log('✅ Main sitemap generated');

    console.log('🔄 Generating image sitemap...');
    fs.writeFileSync(path.join(outputDir, 'sitemap-images.xml'), generateImageSitemap());
    console.log('✅ Image sitemap generated');

    console.log('🔄 Generating news sitemap...');
    fs.writeFileSync(path.join(outputDir, 'sitemap-news.xml'), generateNewsSitemap());
    console.log('✅ News sitemap generated');

    console.log('🔄 Generating sitemap index...');
    fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), generateSitemapIndex());
    console.log('✅ Sitemap index generated');

    console.log('🎉 All sitemaps generated successfully!');
    console.log('📁 Files created:');
    console.log('   - sitemap.xml (main sitemap)');
    console.log('   - sitemap-images.xml (image sitemap)');
    console.log('   - sitemap-news.xml (news sitemap)');
    console.log('   - sitemap-index.xml (sitemap index)');

  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
  }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllSitemaps();
}

export { generateAllSitemaps, generateMainSitemap, generateImageSitemap, generateNewsSitemap, generateSitemapIndex };
