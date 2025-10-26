#!/usr/bin/env node

/**
 * 🗄️ Script de Création de Base de Données AllAdsMarket
 * Crée la base de données et l'utilisateur MySQL
 */

const mysql = require('mysql2/promise');

// Configuration pour la connexion root
const rootConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Mot de passe root MySQL
  port: 3306
};

// Configuration pour l'utilisateur (depuis variables d'environnement)
const tabConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_mysql_user',
  password: process.env.DB_PASSWORD || 'your_mysql_password',
  database: process.env.DB_NAME || 'alladsmarket',
  port: process.env.DB_PORT || 3306
};

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

async function createDatabase() {
  log('🗄️ Création de la base de données AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let connection;
  
  try {
    // 1. Connexion en tant que root
    log('\n1️⃣ Connexion en tant que root...', 'blue');
    connection = await mysql.createConnection(rootConfig);
    log('✅ Connexion root réussie', 'green');
    
    // 2. Créer la base de données
    log('\n2️⃣ Création de la base de données...', 'blue');
    await connection.execute('CREATE DATABASE IF NOT EXISTS alladsmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    log('✅ Base de données "alladsmarket" créée', 'green');
    
    // 3. Créer l'utilisateur tab
    // Créer l'utilisateur (depuis variables d'environnement)
    const dbUser = process.env.DB_USER || 'your_mysql_user';
    const dbPassword = process.env.DB_PASSWORD || 'your_mysql_password';
    
    log(`\n3️⃣ Création de l'utilisateur "${dbUser}"...`, 'blue');
    
    // Supprimer l'utilisateur s'il existe déjà
    try {
      await connection.execute(`DROP USER IF EXISTS "${dbUser}"@"localhost"`);
      await connection.execute(`DROP USER IF EXISTS "${dbUser}"@"%"`);
    } catch (error) {
      // Ignorer les erreurs si l'utilisateur n'existe pas
    }
    
    // Créer l'utilisateur pour l'accès local
    await connection.execute(`CREATE USER "${dbUser}"@"localhost" IDENTIFIED BY "${dbPassword}"`);
    await connection.execute(`GRANT ALL PRIVILEGES ON alladsmarket.* TO "${dbUser}"@"localhost"`);
    
    // Créer l'utilisateur pour l'accès distant
    await connection.execute(`CREATE USER "${dbUser}"@"%" IDENTIFIED BY "${dbPassword}"`);
    await connection.execute(`GRANT ALL PRIVILEGES ON alladsmarket.* TO "${dbUser}"@"%"`);
    
    // Appliquer les privilèges
    await connection.execute('FLUSH PRIVILEGES');
    log(`✅ Utilisateur "${dbUser}" créé avec succès`, 'green');
    
    // 4. Vérifier la création
    log('\n4️⃣ Vérification de la création...', 'blue');
    const [users] = await connection.execute(`SELECT User, Host FROM mysql.user WHERE User = "${dbUser}"`);
    log('👤 Utilisateurs créés:', 'green');
    users.forEach(user => {
      log(`   - ${user.User}@${user.Host}`, 'green');
    });
    
    const [databases] = await connection.execute('SHOW DATABASES');
    const alladsmarketExists = databases.some(db => db.Database === 'alladsmarket');
    if (alladsmarketExists) {
      log('✅ Base de données "alladsmarket" confirmée', 'green');
    } else {
      log('❌ Base de données "alladsmarket" non trouvée', 'red');
    }
    
    // 5. Test de connexion avec l'utilisateur tab
    log('\n5️⃣ Test de connexion avec l\'utilisateur "tab"...', 'blue');
    await connection.end();
    
    const tabConnection = await mysql.createConnection(tabConfig);
    log('✅ Connexion avec l\'utilisateur "tab" réussie', 'green');
    await tabConnection.end();
    
    log('\n🎉 Base de données créée avec succès !', 'green');
    log('📊 Configuration:', 'magenta');
    log('   - Base de données: alladsmarket', 'green');
    log('   - Utilisateur: tab', 'green');
    log('   - Mot de passe: Newtiv15@t', 'green');
    log('   - Charset: utf8mb4', 'green');
    log('   - Collation: utf8mb4_unicode_ci', 'green');
    
    log('\n🔧 Prochaines étapes:', 'blue');
    log('   1. Exécuter la migration: node scripts/migrate.js migrate', 'blue');
    log('   2. Importer les données: node scripts/import-data.js all', 'blue');
    log('   3. Mettre à jour les articles: node scripts/update-articles-instock.js', 'blue');
    
  } catch (error) {
    log(`❌ Erreur lors de la création: ${error.message}`, 'red');
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      log('\n💡 Solutions possibles:', 'yellow');
      log('   1. Vérifiez le mot de passe root MySQL', 'yellow');
      log('   2. Connectez-vous à MySQL et exécutez:', 'yellow');
      log('      mysql -u root -p', 'yellow');
      log('      CREATE DATABASE alladsmarket;', 'yellow');
      log('      CREATE USER "tab"@"localhost" IDENTIFIED BY "Newtiv15@t";', 'yellow');
      log('      GRANT ALL PRIVILEGES ON alladsmarket.* TO "tab"@"localhost";', 'yellow');
      log('      FLUSH PRIVILEGES;', 'yellow');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Exécuter la création
if (require.main === module) {
  createDatabase();
}

module.exports = { createDatabase };
