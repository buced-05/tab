const fs = require('fs');
const path = require('path');

// Configuration
const baseUrl = 'https://alladsmarket.com';
const outputPath = path.join(__dirname, '../public/sitemap.xml');

// Données des produits (à remplacer par votre source de données)
const products = [
  {
    _id: 'ecouteurs-bluetooth-sans-fil',
    name: 'Écouteurs Bluetooth sans fil',
    category: 'electronics',
    lastmod: '2024-12-19',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    _id: 'montre-connectee-intelligente',
    name: 'Montre connectée intelligente',
    category: 'electronics',
    lastmod: '2024-12-19',
    priority: 0.8,
    changefreq: 'weekly'
  },
  {
    _id: 'smartphone-android-haute-performance',
    name: 'Smartphone Android haute performance',
    category: 'electronics',
    lastmod: '2024-12-19',
    priority: 0.8,
    changefreq: 'weekly'
  }
];

// Catégories
const categories = [
  { name: 'electronics', displayName: 'Électronique' },
  { name: 'fashion', displayName: 'Mode' },
  { name: 'home', displayName: 'Maison' },
  { name: 'sports', displayName: 'Sport' },
  { name: 'beauty', displayName: 'Beauté' },
  { name: 'books', displayName: 'Livres' }
];

// Pages statiques
const staticPages = [
  {
    url: '/',
    lastmod: '2024-12-19',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: '/products',
    lastmod: '2024-12-19',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: '/featured',
    lastmod: '2024-12-19',
    changefreq: 'daily',
    priority: 0.8
  },
  {
    url: '/trending',
    lastmod: '2024-12-19',
    changefreq: 'hourly',
    priority: 0.8
  },
  {
    url: '/articles',
    lastmod: '2024-12-19',
    changefreq: 'daily',
    priority: 0.7
  },
  {
    url: '/contact',
    lastmod: '2024-12-19',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: '/about',
    lastmod: '2024-12-19',
    changefreq: 'monthly',
    priority: 0.6
  }
];

// Fonction pour générer le sitemap
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

  // Pages statiques
  staticPages.forEach(page => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Pages de catégories
  categories.forEach(category => {
    sitemap += `  <url>
    <loc>${baseUrl}/products?category=${category.name}</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Pages de produits
  products.forEach(product => {
    sitemap += `  <url>
    <loc>${baseUrl}/product/${product._id}</loc>
    <lastmod>${product.lastmod}</lastmod>
    <changefreq>${product.changefreq}</changefreq>
    <priority>${product.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/images/${product._id}.jpg</image:loc>
      <image:title>${product.name}</image:title>
      <image:caption>Découvrez ${product.name} - Meilleure offre disponible</image:caption>
    </image:image>
  </url>
`;
  });

  // Pages d'articles
  products.forEach(product => {
    sitemap += `  <url>
    <loc>${baseUrl}/article/${product._id}</loc>
    <lastmod>${product.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

// Générer et sauvegarder le sitemap
try {
  const sitemap = generateSitemap();
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  console.log('✅ Sitemap généré avec succès :', outputPath);
  console.log(`📊 Statistiques :`);
  console.log(`   - Pages statiques : ${staticPages.length}`);
  console.log(`   - Catégories : ${categories.length}`);
  console.log(`   - Produits : ${products.length}`);
  console.log(`   - Articles : ${products.length}`);
  console.log(`   - Total URLs : ${staticPages.length + categories.length + products.length * 2}`);
} catch (error) {
  console.error('❌ Erreur lors de la génération du sitemap :', error);
}

module.exports = { generateSitemap };
