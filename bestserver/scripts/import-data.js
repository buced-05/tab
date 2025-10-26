const { query, testConnection } = require('../config/database');
const { getSampleProducts } = require('../../src/utils/sampleData');
const fs = require('fs');
const path = require('path');

// Fonction pour importer les produits depuis sampleData.js
async function importProducts() {
  console.log('📦 Importation des produits depuis sampleData.js...');
  
  try {
    const products = getSampleProducts();
    console.log(`📊 ${products.length} produits trouvés`);

    let imported = 0;
    let skipped = 0;

    for (const product of products) {
      try {
        // Vérifier si le produit existe déjà
        const existing = await query('SELECT id FROM products WHERE _id = ?', [product._id]);
        
        if (existing.length > 0) {
          console.log(`⚠️  Produit ${product._id} déjà existant - ignoré`);
          skipped++;
          continue;
        }

        // Récupérer l'ID de la catégorie
        let categoryId = null;
        if (product.category) {
          const category = await query('SELECT id FROM categories WHERE slug = ?', [product.category]);
          if (category.length > 0) {
            categoryId = category[0].id;
          }
        }

        // Insérer le produit
        const productData = {
          _id: product._id,
          product_number: product.productNumber || Math.floor(Math.random() * 10000),
          name: product.name,
          description: product.description,
          brand: product.brand || 'Unknown',
          price: product.price || 0,
          original_price: product.originalPrice || product.price || 0,
          currency: 'EUR',
          category_id: categoryId,
          is_featured: product.isFeatured || false,
          is_trending: product.isTrending || false,
          in_stock: product.inStock !== false,
          affiliate_url: product.affiliateUrl || '',
          rating_average: product.rating?.average || 0,
          rating_count: product.rating?.count || 0,
          status: 'published'
        };

        const result = await query(`
          INSERT INTO products (
            _id, product_number, name, description, brand, price, original_price,
            currency, category_id, is_featured, is_trending, in_stock,
            affiliate_url, rating_average, rating_count, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          productData._id, productData.product_number, productData.name,
          productData.description, productData.brand, productData.price,
          productData.original_price, productData.currency, productData.category_id,
          productData.is_featured, productData.is_trending, productData.in_stock,
          productData.affiliate_url, productData.rating_average, productData.rating_count,
          productData.status
        ]);

        const productId = result.insertId;

        // Importer les images
        if (product.images && product.images.length > 0) {
          for (let i = 0; i < product.images.length; i++) {
            const image = product.images[i];
            await query(`
              INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
              VALUES (?, ?, ?, ?, ?)
            `, [productId, image.url, image.alt || '', image.isPrimary || false, i]);
          }
        }

        // Importer les tags
        if (product.tags && product.tags.length > 0) {
          for (const tagName of product.tags) {
            // Créer le tag s'il n'existe pas
            let tagResult = await query('SELECT id FROM product_tags WHERE name = ?', [tagName]);
            let tagId;
            
            if (tagResult.length === 0) {
              const newTag = await query('INSERT INTO product_tags (name, slug) VALUES (?, ?)', 
                [tagName, tagName.toLowerCase().replace(/\s+/g, '-')]);
              tagId = newTag.insertId;
            } else {
              tagId = tagResult[0].id;
            }

            // Lier le tag au produit
            await query(`
              INSERT IGNORE INTO product_tag_relations (product_id, tag_id)
              VALUES (?, ?)
            `, [productId, tagId]);
          }
        }

        imported++;
        console.log(`✅ Produit ${product._id} importé`);

      } catch (error) {
        console.error(`❌ Erreur lors de l'importation du produit ${product._id}:`, error.message);
        skipped++;
      }
    }

    console.log(`\n📊 Importation terminée:`);
    console.log(`✅ ${imported} produits importés`);
    console.log(`⚠️  ${skipped} produits ignorés`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation des produits:', error.message);
    throw error;
  }
}

// Fonction pour importer les articles générés
async function importArticles() {
  console.log('📝 Importation des articles générés...');
  
  try {
    const articlesPath = path.join(__dirname, '../../src/data/articles.json');
    
    if (!fs.existsSync(articlesPath)) {
      console.log('⚠️  Fichier articles.json non trouvé - exécutez d\'abord le script de génération');
      return;
    }

    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    console.log(`📊 ${articlesData.length} articles trouvés`);

    let imported = 0;
    let skipped = 0;

    for (const article of articlesData) {
      try {
        // Trouver le produit correspondant
        const product = await query('SELECT id FROM products WHERE _id = ?', [article.productId]);
        
        if (product.length === 0) {
          console.log(`⚠️  Produit ${article.productId} non trouvé pour l'article - ignoré`);
          skipped++;
          continue;
        }

        // Récupérer l'ID de la catégorie
        let categoryId = null;
        if (article.category) {
          const category = await query('SELECT id FROM categories WHERE slug = ?', [article.category]);
          if (category.length > 0) {
            categoryId = category[0].id;
          }
        }

        // Créer l'article
        const articleData = {
          product_id: product[0].id,
          title: article.title,
          slug: article.title.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'),
          content: article.content,
          excerpt: article.excerpt,
          author_id: 1, // Admin user
          category_id: categoryId,
          status: 'published',
          is_featured: false,
          in_stock: true, // Par défaut en stock
          published_at: new Date()
        };

        await query(`
          INSERT INTO articles (
            product_id, title, slug, content, excerpt, author_id,
            category_id, status, is_featured, in_stock, published_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          articleData.product_id, articleData.title, articleData.slug,
          articleData.content, articleData.excerpt, articleData.author_id,
          articleData.category_id, articleData.status, articleData.is_featured,
          articleData.in_stock, articleData.published_at
        ]);

        imported++;
        console.log(`✅ Article "${article.title}" importé`);

      } catch (error) {
        console.error(`❌ Erreur lors de l'importation de l'article:`, error.message);
        skipped++;
      }
    }

    console.log(`\n📊 Importation des articles terminée:`);
    console.log(`✅ ${imported} articles importés`);
    console.log(`⚠️  ${skipped} articles ignorés`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation des articles:', error.message);
    throw error;
  }
}

// Fonction principale
async function importAll() {
  console.log('🚀 Début de l\'importation des données...');
  
  try {
    // Tester la connexion
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('❌ Impossible de se connecter à la base de données');
      process.exit(1);
    }

    // Importer les produits
    await importProducts();
    
    // Importer les articles
    await importArticles();

    console.log('\n🎉 Importation terminée avec succès !');
    
    // Afficher les statistiques finales
    const [productCount, articleCount] = await Promise.all([
      query('SELECT COUNT(*) as count FROM products'),
      query('SELECT COUNT(*) as count FROM articles')
    ]);

    console.log('\n📊 Statistiques finales:');
    console.log(`🛍️  Produits: ${productCount[0].count}`);
    console.log(`📝 Articles: ${articleCount[0].count}`);

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error.message);
    process.exit(1);
  }
}

// Gestion des arguments de ligne de commande
const command = process.argv[2];

switch (command) {
  case 'products':
    importProducts();
    break;
  case 'articles':
    importArticles();
    break;
  case 'all':
  default:
    importAll();
    break;
}

module.exports = { importProducts, importArticles, importAll };
