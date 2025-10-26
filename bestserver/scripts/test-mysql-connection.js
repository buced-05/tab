#!/usr/bin/env node

/**
 * 🔌 Test de Connexion MySQL pour AllAdsMarket
 * Teste la connexion avec différents paramètres
 */

const mysql = require('mysql2/promise');

// Configuration de test
const testConfigs = [
  {
    name: 'Configuration par défaut',
    config: {
      host: 'localhost',
      user: 'tab',
      password: 'Newtiv15@t',
      database: 'alladsmarket',
      port: 3306
    }
  },
  {
    name: 'Configuration root',
    config: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'alladsmarket',
      port: 3306
    }
  },
  {
    name: 'Configuration sans base de données',
    config: {
      host: 'localhost',
      user: 'tab',
      password: 'Newtiv15@t',
      port: 3306
    }
  }
];

async function testConnection(testConfig) {
  try {
    const connection = await mysql.createConnection(testConfig.config);
    console.log(`✅ ${testConfig.name}: Connexion réussie`);
    
    // Test de requête simple
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log(`   - Test de requête: ${rows[0].test}`);
    
    // Test de la base de données si spécifiée
    if (testConfig.config.database) {
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`   - Tables trouvées: ${tables.length}`);
    }
    
    await connection.end();
    return true;
  } catch (error) {
    console.log(`❌ ${testConfig.name}: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🔌 Test de Connexion MySQL AllAdsMarket');
  console.log('='.repeat(50));
  
  let successCount = 0;
  
  for (const testConfig of testConfigs) {
    console.log(`\n🧪 Test: ${testConfig.name}`);
    const success = await testConnection(testConfig);
    if (success) successCount++;
  }
  
  console.log('\n📊 Résumé des tests:');
  console.log(`✅ Succès: ${successCount}/${testConfigs.length}`);
  console.log(`❌ Échecs: ${testConfigs.length - successCount}/${testConfigs.length}`);
  
  if (successCount > 0) {
    console.log('\n🎉 Au moins une configuration fonctionne !');
  } else {
    console.log('\n💡 Aucune configuration ne fonctionne. Vérifiez:');
    console.log('   - MySQL est-il démarré ?');
    console.log('   - L\'utilisateur "tab" existe-t-il ?');
    console.log('   - Le mot de passe est-il correct ?');
    console.log('   - La base de données "alladsmarket" existe-t-elle ?');
  }
}

// Exécuter les tests
if (require.main === module) {
  runTests();
}

module.exports = { testConnection, runTests };
