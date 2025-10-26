#!/usr/bin/env node

/**
 * 📦 Script de Mise à Jour des Articles - Champ inStock
 * Met à jour tous les articles existants avec des valeurs inStock appropriées
 */

const { testConnection, query, closePool } = require('../config/database');

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

// Règles pour déterminer inStock basées sur le contenu de l'article
function determineInStock(article) {
  const title = (article.title || '').toLowerCase();
  const content = (article.content || '').toLowerCase();
  const excerpt = (article.excerpt || '').toLowerCase();
  
  // Mots-clés indiquant que l'article est en stock
  const inStockKeywords = [
    'disponible', 'en stock', 'livraison', 'commander', 'acheter',
    'prix', 'offre', 'promotion', 'réduction', 'deal', 'bon plan',
    'test', 'avis', 'review', 'comparaison', 'guide d\'achat',
    'meilleur', 'top', 'recommandé', 'populaire', 'tendance'
  ];
  
  // Mots-clés indiquant que l'article n'est pas en stock
  const outOfStockKeywords = [
    'rupture', 'épuisé', 'indisponible', 'plus disponible',
    'arrêté', 'discontinué', 'fin de série', 'limité',
    'édition limitée', 'sold out', 'out of stock'
  ];
  
  // Vérifier les mots-clés "en stock"
  const hasInStockKeywords = inStockKeywords.some(keyword => 
    title.includes(keyword) || content.includes(keyword) || excerpt.includes(keyword)
  );
  
  // Vérifier les mots-clés "hors stock"
  const hasOutOfStockKeywords = outOfStockKeywords.some(keyword => 
    title.includes(keyword) || content.includes(keyword) || excerpt.includes(keyword)
  );
  
  // Logique de décision
  if (hasOutOfStockKeywords) {
    return false; // Hors stock
  } else if (hasInStockKeywords) {
    return true; // En stock
  } else {
    // Par défaut, considérer comme en stock si c'est un article publié
    return article.status === 'published';
  }
}

async function updateArticlesInStock() {
  log('📦 Mise à jour des articles - Champ inStock', 'cyan');
  log('='.repeat(60), 'cyan');
  
  try {
    // Test de connexion
    log('\n1️⃣ Test de connexion à la base de données...', 'blue');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      log('❌ Impossible de se connecter à la base de données', 'red');
      return;
    }
    
    log('✅ Connexion à la base de données réussie', 'green');
    
    // Vérifier si la colonne in_stock existe
    log('\n2️⃣ Vérification de la colonne in_stock...', 'blue');
    try {
      const columns = await query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = 'alladsmarket' 
        AND TABLE_NAME = 'articles' 
        AND COLUMN_NAME = 'in_stock'
      `);
      
      if (columns.length === 0) {
        log('⚠️  Colonne in_stock non trouvée, ajout de la colonne...', 'yellow');
        await query('ALTER TABLE articles ADD COLUMN in_stock BOOLEAN DEFAULT TRUE');
        await query('ALTER TABLE articles ADD INDEX idx_in_stock (in_stock)');
        log('✅ Colonne in_stock ajoutée', 'green');
      } else {
        log('✅ Colonne in_stock existe déjà', 'green');
      }
    } catch (error) {
      log(`❌ Erreur lors de la vérification de la colonne: ${error.message}`, 'red');
      return;
    }
    
    // Récupérer tous les articles
    log('\n3️⃣ Récupération des articles...', 'blue');
    const articles = await query(`
      SELECT id, title, content, excerpt, status, created_at, updated_at
      FROM articles 
      ORDER BY created_at DESC
    `);
    
    log(`📰 ${articles.length} articles trouvés`, 'green');
    
    if (articles.length === 0) {
      log('⚠️  Aucun article à mettre à jour', 'yellow');
      return;
    }
    
    // Mettre à jour chaque article
    log('\n4️⃣ Mise à jour des articles...', 'blue');
    let updatedCount = 0;
    let inStockCount = 0;
    let outOfStockCount = 0;
    
    for (const article of articles) {
      try {
        const inStock = determineInStock(article);
        
        await query(
          'UPDATE articles SET in_stock = ? WHERE id = ?',
          [inStock, article.id]
        );
        
        updatedCount++;
        if (inStock) {
          inStockCount++;
        } else {
          outOfStockCount++;
        }
        
        log(`✅ Article "${article.title.substring(0, 50)}..." - ${inStock ? 'En stock' : 'Hors stock'}`, 'green');
        
      } catch (error) {
        log(`❌ Erreur lors de la mise à jour de l'article ${article.id}: ${error.message}`, 'red');
      }
    }
    
    // Résumé
    log('\n📊 Résumé de la mise à jour:', 'magenta');
    log('='.repeat(60), 'magenta');
    log(`✅ Articles mis à jour: ${updatedCount}/${articles.length}`, 'green');
    log(`📦 En stock: ${inStockCount}`, 'green');
    log(`❌ Hors stock: ${outOfStockCount}`, 'red');
    
    // Vérification finale
    log('\n5️⃣ Vérification finale...', 'blue');
    const finalStats = await query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN in_stock = 1 THEN 1 ELSE 0 END) as in_stock,
        SUM(CASE WHEN in_stock = 0 THEN 1 ELSE 0 END) as out_of_stock
      FROM articles
    `);
    
    const stats = finalStats[0];
    log(`📊 Statistiques finales:`, 'green');
    log(`   - Total: ${stats.total}`, 'green');
    log(`   - En stock: ${stats.in_stock}`, 'green');
    log(`   - Hors stock: ${stats.out_of_stock}`, 'red');
    
    log('\n🎉 Mise à jour terminée avec succès !', 'green');
    
  } catch (error) {
    log(`❌ Erreur lors de la mise à jour: ${error.message}`, 'red');
  } finally {
    await closePool();
  }
}

// Exécuter la mise à jour
if (require.main === module) {
  updateArticlesInStock();
}

module.exports = { updateArticlesInStock, determineInStock };
