#!/usr/bin/env node

/**
 * 🔍 Script de Vérification MySQL pour AllAdsMarket
 * Vérifie la configuration, la connexion et l'intégrité de la base de données
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

async function verifyMySQL() {
  log('🔍 Vérification de la configuration MySQL AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let allTestsPassed = true;

  try {
    // 1. Test de connexion
    log('\n1️⃣ Test de connexion à la base de données...', 'blue');
    const isConnected = await testConnection();
    
    if (isConnected) {
      log('✅ Connexion MySQL réussie', 'green');
    } else {
      log('❌ Échec de la connexion MySQL', 'red');
      allTestsPassed = false;
      return;
    }

    // 2. Vérification de la base de données
    log('\n2️⃣ Vérification de la base de données...', 'blue');
    const databases = await query('SHOW DATABASES');
    const alladsmarketExists = databases.some(db => db.Database === 'alladsmarket');
    
    if (alladsmarketExists) {
      log('✅ Base de données "alladsmarket" trouvée', 'green');
    } else {
      log('❌ Base de données "alladsmarket" non trouvée', 'red');
      allTestsPassed = false;
    }

    // 3. Vérification des utilisateurs MySQL
    log('\n3️⃣ Vérification des utilisateurs MySQL...', 'blue');
    const users = await query("SELECT User, Host FROM mysql.user WHERE User = 'tab'");
    
    if (users.length > 0) {
      log('✅ Utilisateur "tab" trouvé:', 'green');
      users.forEach(user => {
        log(`   - ${user.User}@${user.Host}`, 'green');
      });
    } else {
      log('❌ Utilisateur "tab" non trouvé', 'red');
      allTestsPassed = false;
    }

    // 4. Vérification des tables
    log('\n4️⃣ Vérification des tables...', 'blue');
    await query('USE alladsmarket');
    const tables = await query('SHOW TABLES');
    
    const expectedTables = [
      'users', 'categories', 'products', 'product_images', 'product_tags',
      'product_specifications', 'articles', 'comments', 'reviews', 'analytics',
      'settings', 'newsletters', 'contact_messages'
    ];
    
    const existingTables = tables.map(table => Object.values(table)[0]);
    const missingTables = expectedTables.filter(table => !existingTables.includes(table));
    
    if (missingTables.length === 0) {
      log('✅ Toutes les tables requises sont présentes', 'green');
    } else {
      log('⚠️  Tables manquantes:', 'yellow');
      missingTables.forEach(table => {
        log(`   - ${table}`, 'yellow');
      });
    }

    // 5. Vérification des données
    log('\n5️⃣ Vérification des données...', 'blue');
    
    // Compter les produits
    try {
      const productCount = await query('SELECT COUNT(*) as count FROM products');
      log(`📦 Produits: ${productCount[0].count}`, 'green');
    } catch (error) {
      log('⚠️  Table products non accessible', 'yellow');
    }

    // Compter les articles
    try {
      const articleCount = await query('SELECT COUNT(*) as count FROM articles');
      log(`📰 Articles: ${articleCount[0].count}`, 'green');
    } catch (error) {
      log('⚠️  Table articles non accessible', 'yellow');
    }

    // Compter les catégories
    try {
      const categoryCount = await query('SELECT COUNT(*) as count FROM categories');
      log(`📂 Catégories: ${categoryCount[0].count}`, 'green');
    } catch (error) {
      log('⚠️  Table categories non accessible', 'yellow');
    }

    // 6. Vérification des index
    log('\n6️⃣ Vérification des index...', 'blue');
    try {
      const indexes = await query(`
        SELECT TABLE_NAME, INDEX_NAME, COLUMN_NAME 
        FROM INFORMATION_SCHEMA.STATISTICS 
        WHERE TABLE_SCHEMA = 'alladsmarket'
        ORDER BY TABLE_NAME, INDEX_NAME
      `);
      
      const indexCount = indexes.length;
      log(`📊 Index trouvés: ${indexCount}`, 'green');
    } catch (error) {
      log('⚠️  Impossible de vérifier les index', 'yellow');
    }

    // 7. Vérification des performances
    log('\n7️⃣ Vérification des performances...', 'blue');
    try {
      const status = await query('SHOW STATUS LIKE "Innodb_buffer_pool%"');
      log('📈 Configuration InnoDB:', 'green');
      status.forEach(stat => {
        log(`   - ${stat.Variable_name}: ${stat.Value}`, 'green');
      });
    } catch (error) {
      log('⚠️  Impossible de vérifier les performances', 'yellow');
    }

    // 8. Test de création/lecture/suppression
    log('\n8️⃣ Test CRUD (Create, Read, Update, Delete)...', 'blue');
    try {
      // Test de création
      const testData = {
        name: 'Test Product MySQL',
        description: 'Produit de test pour vérification MySQL',
        price: 99.99,
        category_id: 1
      };
      
      const insertResult = await query(`
        INSERT INTO products (name, description, price, category_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
      `, [testData.name, testData.description, testData.price, testData.category_id]);
      
      const testId = insertResult.insertId;
      log('✅ Test de création réussi', 'green');
      
      // Test de lecture
      const readResult = await query('SELECT * FROM products WHERE id = ?', [testId]);
      if (readResult.length > 0) {
        log('✅ Test de lecture réussi', 'green');
      } else {
        log('❌ Test de lecture échoué', 'red');
        allTestsPassed = false;
      }
      
      // Test de mise à jour
      await query('UPDATE products SET name = ? WHERE id = ?', ['Test Product Updated', testId]);
      log('✅ Test de mise à jour réussi', 'green');
      
      // Test de suppression
      await query('DELETE FROM products WHERE id = ?', [testId]);
      log('✅ Test de suppression réussi', 'green');
      
    } catch (error) {
      log(`❌ Test CRUD échoué: ${error.message}`, 'red');
      allTestsPassed = false;
    }

    // 9. Vérification de la sécurité
    log('\n9️⃣ Vérification de la sécurité...', 'blue');
    try {
      const privileges = await query(`
        SELECT GRANTEE, PRIVILEGE_TYPE 
        FROM INFORMATION_SCHEMA.USER_PRIVILEGES 
        WHERE GRANTEE LIKE '%tab%'
      `);
      
      log('🔒 Privilèges utilisateur "tab":', 'green');
      privileges.forEach(priv => {
        log(`   - ${priv.PRIVILEGE_TYPE}`, 'green');
      });
    } catch (error) {
      log('⚠️  Impossible de vérifier les privilèges', 'yellow');
    }

    // 10. Résumé final
    log('\n📋 Résumé de la vérification:', 'magenta');
    log('='.repeat(60), 'magenta');
    
    if (allTestsPassed) {
      log('🎉 Tous les tests MySQL sont passés avec succès !', 'green');
      log('✅ La base de données est prête pour la production', 'green');
    } else {
      log('⚠️  Certains tests ont échoué', 'yellow');
      log('💡 Vérifiez la configuration et réessayez', 'yellow');
    }

  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red');
    allTestsPassed = false;
  } finally {
    await closePool();
  }

  process.exit(allTestsPassed ? 0 : 1);
}

// Exécuter la vérification
if (require.main === module) {
  verifyMySQL();
}

module.exports = { verifyMySQL };
