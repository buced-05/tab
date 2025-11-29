/**
 * Script pour générer un feed XML Google Shopping (Google Merchant Center)
 * 
 * Ce script génère un fichier XML conforme aux spécifications de Google Merchant Center
 * pour permettre l'indexation des produits dans Google Shopping.
 * 
 * Usage:
 *   node scripts/seo/generate-google-shopping-feed.js
 * 
 * Le fichier généré sera: public/google-shopping-feed.xml
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://alladsmarket.com';
const OUTPUT_FILE = path.join(__dirname, '../../public/google-shopping-feed.xml');

// Fonction pour échapper les caractères XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Fonction pour normaliser le prix
function normalizePrice(price) {
  if (!price || price === 0) {
    // Si le prix est 0 ou non défini, utiliser un prix par défaut pour Google Shopping
    // Google Shopping nécessite un prix valide
    return '0.01';
  }
  return price.toFixed(2);
}

// Fonction pour obtenir la catégorie Google Shopping
function getGoogleCategory(category) {
  const categoryMap = {
    'electronics': 'Electronics > Computers',
    'fashion': 'Apparel & Accessories',
    'home': 'Home & Garden',
    'sports': 'Sporting Goods',
    'beauty': 'Health & Personal Care > Personal Care',
    'books': 'Media > Books',
    'automotive': 'Vehicles & Parts',
    'health': 'Health & Personal Care',
    'toys': 'Toys & Games',
    'garden': 'Home & Garden > Yard & Garden'
  };
  return categoryMap[category] || 'Miscellaneous';
}

// Fonction pour obtenir la condition du produit
function getCondition(product) {
  return product.condition || 'new';
}

// Fonction pour obtenir la disponibilité
function getAvailability(product) {
  if (product.stock?.status === 'out_of_stock') {
    return 'out of stock';
  }
  return 'in stock';
}

// Fonction pour générer le feed XML
async function generateFeed() {
  console.log('🛍️  Génération du feed Google Shopping...\n');

  try {
    // Charger les produits depuis sampleData.js
    const productsModuleUrl = pathToFileURL(
      path.resolve(__dirname, '../../src/utils/sampleData.js')
    ).href;
    const productsModule = await import(productsModuleUrl);
    const getAllProducts = productsModule.getAllProducts || (() => []);
    const allProducts = getAllProducts();

    console.log(`📦 ${allProducts.length} produits chargés\n`);

    // Filtrer les produits valides (avec prix, images, etc.)
    const validProducts = allProducts.filter(product => {
      // Google Shopping nécessite:
      // - Un titre (name)
      // - Une description
      // - Une image
      // - Un prix valide
      // - Un lien (affiliateUrl ou URL produit)
      const hasName = product.name && product.name.trim().length > 0;
      const hasDescription = (product.description || product.shortDescription) && 
                            (product.description || product.shortDescription).trim().length > 0;
      const hasImage = product.images && product.images.length > 0 && product.images[0].url;
      const hasPrice = product.price !== undefined && product.price !== null;
      const hasLink = product.affiliateUrl || (product.slug || product._id);

      return hasName && hasDescription && hasImage && hasPrice !== undefined && hasLink;
    });

    console.log(`✅ ${validProducts.length} produits valides pour Google Shopping\n`);

    // Générer le XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
    xml += '  <channel>\n';
    xml += `    <title>AllAdsMarket - Google Shopping Feed</title>\n`;
    xml += `    <link>${BASE_URL}</link>\n`;
    xml += `    <description>Feed de produits AllAdsMarket pour Google Shopping</description>\n`;
    xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n\n`;

    // Ajouter chaque produit
    validProducts.forEach((product, index) => {
      const productUrl = product.affiliateUrl || `${BASE_URL}/products/${product.slug || product._id}`;
      const imageUrl = product.images?.[0]?.url || `${BASE_URL}/og-image.jpg`;
      const price = normalizePrice(product.price);
      const originalPrice = product.originalPrice ? normalizePrice(product.originalPrice) : null;
      const description = escapeXml(product.description || product.shortDescription || product.name);
      const title = escapeXml(product.name);
      const googleCategory = getGoogleCategory(product.category);
      const condition = getCondition(product);
      const availability = getAvailability(product);
      const brand = escapeXml(product.brand || 'AllAdsMarket');
      const gtin = product.gtin || '';
      const mpn = product.mpn || product._id;
      const sku = product.sku || product._id;

      xml += '    <item>\n';
      xml += `      <g:id>${escapeXml(product._id)}</g:id>\n`;
      xml += `      <title>${title}</title>\n`;
      xml += `      <description>${description}</description>\n`;
      xml += `      <link>${escapeXml(productUrl)}</link>\n`;
      xml += `      <g:image_link>${escapeXml(imageUrl)}</g:image_link>\n`;
      
      // Images supplémentaires
      if (product.images && product.images.length > 1) {
        product.images.slice(1, 10).forEach((img, idx) => {
          if (img.url) {
            xml += `      <g:additional_image_link>${escapeXml(img.url)}</g:additional_image_link>\n`;
          }
        });
      }

      xml += `      <g:price>${price} ${product.currency || 'USD'}</g:price>\n`;
      
      if (originalPrice && parseFloat(originalPrice) > parseFloat(price)) {
        xml += `      <g:sale_price>${price} ${product.currency || 'USD'}</g:sale_price>\n`;
      }

      xml += `      <g:availability>${availability}</g:availability>\n`;
      xml += `      <g:condition>${condition}</g:condition>\n`;
      xml += `      <g:brand>${brand}</g:brand>\n`;
      xml += `      <g:product_type>${escapeXml(googleCategory)}</g:product_type>\n`;
      xml += `      <g:google_product_category>${escapeXml(googleCategory)}</g:google_product_category>\n`;
      
      if (gtin) {
        xml += `      <g:gtin>${escapeXml(gtin)}</g:gtin>\n`;
      }
      
      xml += `      <g:mpn>${escapeXml(mpn)}</g:mpn>\n`;
      xml += `      <g:identifier_exists>FALSE</g:identifier_exists>\n`;
      
      if (product.rating?.average) {
        xml += `      <g:rating>${product.rating.average.toFixed(1)}</g:rating>\n`;
        xml += `      <g:review_count>${product.rating.count || 0}</g:review_count>\n`;
      }

      // Tags comme mots-clés
      if (product.tags && product.tags.length > 0) {
        const keywords = product.tags.slice(0, 10).join(', ');
        xml += `      <g:custom_label_0>${escapeXml(keywords)}</g:custom_label_0>\n`;
      }

      // Featured/Trending
      if (product.isFeatured) {
        xml += `      <g:custom_label_1>featured</g:custom_label_1>\n`;
      }
      if (product.isTrending) {
        xml += `      <g:custom_label_2>trending</g:custom_label_2>\n`;
      }

      xml += '    </item>\n';
    });

    xml += '  </channel>\n';
    xml += '</rss>\n';

    // Écrire le fichier
    fs.writeFileSync(OUTPUT_FILE, xml, 'utf8');

    console.log(`✅ Feed Google Shopping généré avec succès!`);
    console.log(`📁 Fichier: ${OUTPUT_FILE}`);
    console.log(`📊 Produits inclus: ${validProducts.length}`);
    console.log(`\n📝 Prochaines étapes:`);
    console.log(`   1. Vérifier le feed: ${BASE_URL}/google-shopping-feed.xml`);
    console.log(`   2. Créer un compte Google Merchant Center`);
    console.log(`   3. Soumettre le feed dans Google Merchant Center`);
    console.log(`   4. Configurer la synchronisation automatique (optionnel)`);

  } catch (error) {
    console.error('❌ Erreur lors de la génération du feed:', error);
    process.exit(1);
  }
}

// Exécuter le script
generateFeed();

