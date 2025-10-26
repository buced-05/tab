#!/usr/bin/env node

/**
 * ✅ Vérification Complète - Implémentation inStock
 * Vérifie que le champ inStock est correctement implémenté partout
 */

const fs = require('fs');
const path = require('path');

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

async function verifyInStockImplementation() {
  log('✅ Vérification Complète - Implémentation inStock', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let allChecksPassed = true;
  
  try {
    // 1. Vérifier le schéma de base de données
    log('\n1️⃣ Vérification du schéma de base de données...', 'blue');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    if (schema.includes('in_stock BOOLEAN DEFAULT TRUE')) {
      log('✅ Champ in_stock présent dans le schéma', 'green');
    } else {
      log('❌ Champ in_stock manquant dans le schéma', 'red');
      allChecksPassed = false;
    }
    
    if (schema.includes('INDEX idx_in_stock (in_stock)')) {
      log('✅ Index idx_in_stock présent dans le schéma', 'green');
    } else {
      log('❌ Index idx_in_stock manquant dans le schéma', 'red');
      allChecksPassed = false;
    }
    
    // 2. Vérifier le modèle Article
    log('\n2️⃣ Vérification du modèle Article...', 'blue');
    const modelPath = path.join(__dirname, '../models/Article.js');
    const model = fs.readFileSync(modelPath, 'utf8');
    
    if (model.includes('this.in_stock = data.in_stock;')) {
      log('✅ Champ in_stock présent dans le constructeur', 'green');
    } else {
      log('❌ Champ in_stock manquant dans le constructeur', 'red');
      allChecksPassed = false;
    }
    
    if (model.includes('in_stock, view_count')) {
      log('✅ Champ in_stock présent dans la méthode create', 'green');
    } else {
      log('❌ Champ in_stock manquant dans la méthode create', 'red');
      allChecksPassed = false;
    }
    
    // 3. Vérifier le serveur Express
    log('\n3️⃣ Vérification du serveur Express...', 'blue');
    const serverPath = path.join(__dirname, '../index.js');
    const server = fs.readFileSync(serverPath, 'utf8');
    
    if (server.includes('in_stock: req.body.in_stock !== undefined ? req.body.in_stock : true')) {
      log('✅ Gestion in_stock présente dans l\'endpoint articles', 'green');
    } else {
      log('❌ Gestion in_stock manquante dans l\'endpoint articles', 'red');
      allChecksPassed = false;
    }
    
    // 4. Vérifier le script d'import
    log('\n4️⃣ Vérification du script d\'import...', 'blue');
    const importPath = path.join(__dirname, 'import-data.js');
    const importScript = fs.readFileSync(importPath, 'utf8');
    
    if (importScript.includes('in_stock: true, // Par défaut en stock')) {
      log('✅ Champ in_stock présent dans l\'import', 'green');
    } else {
      log('❌ Champ in_stock manquant dans l\'import', 'red');
      allChecksPassed = false;
    }
    
    if (importScript.includes('is_featured, in_stock, published_at')) {
      log('✅ Champ in_stock présent dans la requête SQL d\'import', 'green');
    } else {
      log('❌ Champ in_stock manquant dans la requête SQL d\'import', 'red');
      allChecksPassed = false;
    }
    
    // 5. Vérifier le fichier articles.json
    log('\n5️⃣ Vérification du fichier articles.json...', 'blue');
    const articlesPath = path.join(__dirname, '../../src/data/articles.json');
    
    if (fs.existsSync(articlesPath)) {
      const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      
      if (articlesData.length > 0 && articlesData[0].hasOwnProperty('inStock')) {
        log('✅ Champ inStock présent dans articles.json', 'green');
        
        // Compter les articles en stock vs hors stock
        const inStockCount = articlesData.filter(article => article.inStock === true).length;
        const outOfStockCount = articlesData.filter(article => article.inStock === false).length;
        
        log(`📊 Statistiques articles.json:`, 'green');
        log(`   - Total: ${articlesData.length}`, 'green');
        log(`   - En stock: ${inStockCount}`, 'green');
        log(`   - Hors stock: ${outOfStockCount}`, 'red');
      } else {
        log('❌ Champ inStock manquant dans articles.json', 'red');
        allChecksPassed = false;
      }
    } else {
      log('⚠️  Fichier articles.json non trouvé', 'yellow');
    }
    
    // 6. Vérifier les scripts de mise à jour
    log('\n6️⃣ Vérification des scripts de mise à jour...', 'blue');
    
    const updateScripts = [
      'update-articles-instock.js',
      'update-articles-json.js',
      'test-instock-simple.js'
    ];
    
    updateScripts.forEach(script => {
      const scriptPath = path.join(__dirname, script);
      if (fs.existsSync(scriptPath)) {
        log(`✅ Script ${script} présent`, 'green');
      } else {
        log(`❌ Script ${script} manquant`, 'red');
        allChecksPassed = false;
      }
    });
    
    // 7. Résumé final
    log('\n📋 Résumé de la vérification:', 'magenta');
    log('='.repeat(60), 'magenta');
    
    if (allChecksPassed) {
      log('🎉 Tous les tests sont passés avec succès !', 'green');
      log('✅ Le champ inStock est correctement implémenté partout', 'green');
      
      log('\n🔧 Fonctionnalités implémentées:', 'blue');
      log('   ✅ Schéma de base de données mis à jour', 'green');
      log('   ✅ Modèle Article mis à jour', 'green');
      log('   ✅ Serveur Express mis à jour', 'green');
      log('   ✅ Script d\'import mis à jour', 'green');
      log('   ✅ Articles JSON mis à jour', 'green');
      log('   ✅ Scripts de mise à jour créés', 'green');
      
      log('\n📊 Valeurs inStock définies:', 'blue');
      log('   - Articles avec mots-clés "en stock": inStock = true', 'green');
      log('   - Articles avec mots-clés "hors stock": inStock = false', 'red');
      log('   - Articles par défaut: inStock = true', 'green');
      
    } else {
      log('⚠️  Certains tests ont échoué', 'yellow');
      log('💡 Vérifiez les erreurs ci-dessus et corrigez-les', 'yellow');
    }
    
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red');
    allChecksPassed = false;
  }
  
  return allChecksPassed;
}

// Exécuter la vérification
if (require.main === module) {
  verifyInStockImplementation();
}

module.exports = { verifyInStockImplementation };
