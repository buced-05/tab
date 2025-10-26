const fs = require('fs');
const path = require('path');
const { testConnection, query, closePool } = require('../config/database');

// Lire le fichier de schéma
const schemaPath = path.join(__dirname, '../database/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

// Fonction pour exécuter la migration
async function migrate() {
  console.log('🚀 Début de la migration de la base de données...');
  
  try {
    // Tester la connexion
    console.log('🔍 Test de connexion à la base de données...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Impossible de se connecter à la base de données');
      console.log('💡 Vérifiez que MySQL est démarré et que les paramètres de connexion sont corrects');
      process.exit(1);
    }

    console.log('✅ Connexion à la base de données réussie');
    
    // Diviser le schéma en requêtes individuelles
    const queries = schema
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0 && !query.startsWith('--'));

    console.log(`📝 Exécution de ${queries.length} requêtes...`);

    // Exécuter chaque requête
    for (let i = 0; i < queries.length; i++) {
      const queryText = queries[i];
      
      try {
        if (queryText.trim()) {
          await query(queryText);
          console.log(`✅ Requête ${i + 1}/${queries.length} exécutée`);
        }
      } catch (error) {
        // Ignorer certaines erreurs communes
        if (error.message.includes('already exists') || 
            error.message.includes('Duplicate entry') ||
            error.message.includes('Table') && error.message.includes('already exists')) {
          console.log(`⚠️  Requête ${i + 1}/${queries.length} ignorée (déjà existant)`);
        } else {
          console.error(`❌ Erreur dans la requête ${i + 1}:`, error.message);
          throw error;
        }
      }
    }

    console.log('🎉 Migration terminée avec succès !');
    console.log('📊 Base de données AllAdsMarket créée et configurée');
    
    // Afficher les statistiques
    await showStats();

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Fonction pour afficher les statistiques
async function showStats() {
  try {
    console.log('\n📊 Statistiques de la base de données:');
    
    // Compter les tables
    const tables = await query(`
      SELECT COUNT(*) as table_count 
      FROM information_schema.tables 
      WHERE table_schema = 'alladsmarket'
    `);
    console.log(`📋 Tables créées: ${tables[0].table_count}`);

    // Compter les utilisateurs
    const users = await query('SELECT COUNT(*) as user_count FROM users');
    console.log(`👥 Utilisateurs: ${users[0].user_count}`);

    // Compter les catégories
    const categories = await query('SELECT COUNT(*) as category_count FROM categories');
    console.log(`📂 Catégories: ${categories[0].category_count}`);

    // Compter les produits
    const products = await query('SELECT COUNT(*) as product_count FROM products');
    console.log(`🛍️  Produits: ${products[0].product_count}`);

    // Compter les articles
    const articles = await query('SELECT COUNT(*) as article_count FROM articles');
    console.log(`📝 Articles: ${articles[0].article_count}`);

    console.log('\n🎯 Base de données prête pour l\'utilisation !');
    
  } catch (error) {
    console.error('⚠️  Erreur lors de l\'affichage des statistiques:', error.message);
  }
}

// Fonction pour réinitialiser la base de données
async function reset() {
  console.log('🔄 Réinitialisation de la base de données...');
  
  try {
    // Supprimer toutes les tables
    await query('DROP DATABASE IF EXISTS alladsmarket');
    console.log('🗑️  Base de données supprimée');
    
    // Recréer la base de données
    await migrate();
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error.message);
    process.exit(1);
  }
}

// Fonction pour vérifier l'état de la base de données
async function status() {
  console.log('🔍 Vérification de l\'état de la base de données...');
  
  try {
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.log('❌ Base de données non accessible');
      return;
    }

    // Vérifier les tables principales
    const tables = ['users', 'categories', 'products', 'articles', 'comments'];
    
    for (const table of tables) {
      try {
        const result = await query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`✅ Table ${table}: ${result[0].count} enregistrements`);
      } catch (error) {
        console.log(`❌ Table ${table}: Non trouvée`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message);
  } finally {
    await closePool();
  }
}

// Gestion des arguments de ligne de commande
const command = process.argv[2];

switch (command) {
  case 'migrate':
    migrate();
    break;
  case 'reset':
    reset();
    break;
  case 'status':
    status();
    break;
  default:
    console.log('📋 Utilisation:');
    console.log('  node migrate.js migrate  - Créer/mettre à jour la base de données');
    console.log('  node migrate.js reset    - Réinitialiser la base de données');
    console.log('  node migrate.js status   - Vérifier l\'état de la base de données');
    break;
}

module.exports = { migrate, reset, status };
