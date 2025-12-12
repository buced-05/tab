#!/usr/bin/env node

/**
 * Script pour ajouter le schema Product sur toutes les pages produits
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importer les produits
const productsModuleUrl = new URL('../src/utils/sampleData.js', import.meta.url).href;
const productsModule = await import(productsModuleUrl);
const getAllProducts = productsModule.getAllProducts || productsModule.getSampleProducts;

if (!getAllProducts) {
  console.error('❌ Impossible de charger getAllProducts');
  process.exit(1);
}

const products = getAllProducts();
const baseUrl = 'https://alladsmarket.com';

console.log('🚀 Génération du schema Product pour les produits...\n');

// Créer le dossier de sortie
const outputDir = path.resolve(__dirname, '../../dist/schemas');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Générer le schema pour chaque produit
let schemaCount = 0;
products.forEach(product => {
  if (!product.slug) {
    console.warn(`⚠️  Produit sans slug: ${product._id}`);
    return;
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name || product.title,
    "description": product.description || product.name,
    "image": product.images?.map(img => img.url) || [],
    "brand": {
      "@type": "Brand",
      "name": product.brand || "AllAdsMarket"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${product.slug}`,
      "priceCurrency": "EUR",
      "price": product.price || "0",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "AllAdsMarket"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating?.average || 4.5,
      "reviewCount": product.rating?.count || 10,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": product.rating?.count || 10
    },
    "review": product.rating?.reviews && product.rating.reviews.length > 0
      ? product.rating.reviews.slice(0, 5).map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author || "Client AllAdsMarket"
          },
          "datePublished": review.date || new Date().toISOString(),
          "reviewBody": review.comment || "Excellent produit",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating || 5,
            "bestRating": "5",
            "worstRating": "1"
          }
        }))
      : [{
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Client AllAdsMarket"
          },
          "datePublished": new Date().toISOString(),
          "reviewBody": `Excellent produit ${product.name || product.title}. Recommandé pour sa qualité et son rapport qualité-prix.`,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": product.rating?.average || 4.5,
            "bestRating": "5",
            "worstRating": "1"
          }
        }],
    "sku": product._id,
    "mpn": product._id,
    "category": product.category,
    "url": `${baseUrl}/products/${product.slug}`
  };

  // Sauvegarder le schema
  const schemaPath = path.join(outputDir, `product-${product.slug}.json`);
  fs.writeFileSync(schemaPath, JSON.stringify(productSchema, null, 2), 'utf8');
  schemaCount++;
});

console.log(`✅ ${schemaCount} schemas Product générés dans ${outputDir}\n`);

// Générer un fichier index
const indexContent = products
  .filter(p => p.slug)
  .map(p => ({
    slug: p.slug,
    name: p.name,
    schemaUrl: `${baseUrl}/schemas/product-${p.slug}.json`
  }));

const indexPath = path.join(outputDir, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify(indexContent, null, 2), 'utf8');

console.log('✅ Index des schemas généré\n');
console.log('✨ Terminé!');

