#!/usr/bin/env node

/**
 * 🔒 Script de Vérification de Sécurité
 * Vérifie que l'application est correctement sécurisée
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

async function verifySecurity() {
  log('🔒 Vérification de Sécurité AllAdsMarket', 'cyan');
  log('='.repeat(60), 'cyan');
  
  let securityScore = 0;
  let totalChecks = 0;
  
  try {
    // 1. Vérifier que .env n'est pas committé
    log('\n1️⃣ Vérification des fichiers sensibles...', 'blue');
    totalChecks++;
    
    const envPath = path.join(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      log('✅ Fichier .env présent (bon)', 'green');
      securityScore++;
    } else {
      log('⚠️  Fichier .env manquant - créez-le depuis env.example', 'yellow');
    }
    
    // 2. Vérifier .gitignore
    log('\n2️⃣ Vérification du .gitignore...', 'blue');
    totalChecks++;
    
    const gitignorePath = path.join(__dirname, '../../.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignore = fs.readFileSync(gitignorePath, 'utf8');
      
      const requiredIgnores = ['.env', '*.key', 'secrets/', '*.pem'];
      const missingIgnores = requiredIgnores.filter(ignore => !gitignore.includes(ignore));
      
      if (missingIgnores.length === 0) {
        log('✅ .gitignore correctement configuré', 'green');
        securityScore++;
      } else {
        log(`⚠️  .gitignore manque: ${missingIgnores.join(', ')}`, 'yellow');
      }
    } else {
      log('❌ Fichier .gitignore manquant', 'red');
    }
    
    // 3. Vérifier les mots de passe en dur
    log('\n3️⃣ Vérification des mots de passe en dur...', 'blue');
    totalChecks++;
    
    const sensitiveFiles = [
      '../index.js',
      '../models/Article.js',
      '../models/Product.js',
      '../config/database.js'
    ];
    
    let hasHardcodedPasswords = false;
    
    for (const file of sensitiveFiles) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Vérifier les patterns sensibles
        const sensitivePatterns = [
          /password\s*[:=]\s*['"][^'"]+['"]/gi,
          /secret\s*[:=]\s*['"][^'"]+['"]/gi,
          /key\s*[:=]\s*['"][^'"]+['"]/gi,
          /Newtiv15@t/gi,
          /91\.108\.120\.78/gi
        ];
        
        for (const pattern of sensitivePatterns) {
          if (pattern.test(content)) {
            log(`❌ Mot de passe en dur trouvé dans ${file}`, 'red');
            hasHardcodedPasswords = true;
          }
        }
      }
    }
    
    if (!hasHardcodedPasswords) {
      log('✅ Aucun mot de passe en dur détecté', 'green');
      securityScore++;
    }
    
    // 4. Vérifier les variables d'environnement
    log('\n4️⃣ Vérification des variables d\'environnement...', 'blue');
    totalChecks++;
    
    const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingVars.length === 0) {
      log('✅ Toutes les variables d\'environnement sont définies', 'green');
      securityScore++;
    } else {
      log(`⚠️  Variables manquantes: ${missingVars.join(', ')}`, 'yellow');
    }
    
    // 5. Vérifier les permissions des fichiers
    log('\n5️⃣ Vérification des permissions...', 'blue');
    totalChecks++;
    
    try {
      const envPath = path.join(__dirname, '../.env');
      if (fs.existsSync(envPath)) {
        const stats = fs.statSync(envPath);
        const mode = stats.mode & parseInt('777', 8);
        
        if (mode <= parseInt('600', 8)) {
          log('✅ Permissions .env sécurisées (≤600)', 'green');
          securityScore++;
        } else {
          log('⚠️  Permissions .env trop permissives', 'yellow');
        }
      } else {
        log('⚠️  Fichier .env non trouvé pour vérification des permissions', 'yellow');
      }
    } catch (error) {
      log('⚠️  Impossible de vérifier les permissions', 'yellow');
    }
    
    // 6. Vérifier la configuration de base de données
    log('\n6️⃣ Vérification de la configuration de base de données...', 'blue');
    totalChecks++;
    
    const dbConfig = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'your_mysql_user',
      password: process.env.DB_PASSWORD || 'your_mysql_password',
      database: process.env.DB_NAME || 'alladsmarket'
    };
    
    if (dbConfig.user !== 'your_mysql_user' && dbConfig.password !== 'your_mysql_password') {
      log('✅ Configuration de base de données personnalisée', 'green');
      securityScore++;
    } else {
      log('⚠️  Configuration de base de données par défaut détectée', 'yellow');
    }
    
    // 7. Vérifier les secrets JWT
    log('\n7️⃣ Vérification des secrets JWT...', 'blue');
    totalChecks++;
    
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret && jwtSecret !== 'your-super-secret-jwt-key-change-this-in-production') {
      log('✅ Secret JWT personnalisé', 'green');
      securityScore++;
    } else {
      log('⚠️  Secret JWT par défaut détecté', 'yellow');
    }
    
    // 8. Résumé de sécurité
    log('\n📊 Résumé de la sécurité:', 'magenta');
    log('='.repeat(60), 'magenta');
    
    const securityPercentage = Math.round((securityScore / totalChecks) * 100);
    
    log(`🔒 Score de sécurité: ${securityScore}/${totalChecks} (${securityPercentage}%)`, 
        securityPercentage >= 80 ? 'green' : securityPercentage >= 60 ? 'yellow' : 'red');
    
    if (securityPercentage >= 80) {
      log('🎉 Excellent niveau de sécurité !', 'green');
    } else if (securityPercentage >= 60) {
      log('⚠️  Niveau de sécurité acceptable, améliorations recommandées', 'yellow');
    } else {
      log('❌ Niveau de sécurité insuffisant, action immédiate requise', 'red');
    }
    
    // Recommandations
    log('\n💡 Recommandations:', 'blue');
    
    if (securityPercentage < 80) {
      log('   1. Créez un fichier .env avec vos vraies données', 'blue');
      log('   2. Changez tous les mots de passe par défaut', 'blue');
      log('   3. Vérifiez que .env est dans .gitignore', 'blue');
      log('   4. Utilisez des secrets forts et uniques', 'blue');
      log('   5. Configurez les permissions de fichiers', 'blue');
    }
    
    return securityPercentage >= 80;
    
  } catch (error) {
    log(`❌ Erreur lors de la vérification: ${error.message}`, 'red');
    return false;
  }
}

// Exécuter la vérification
if (require.main === module) {
  verifySecurity();
}

module.exports = { verifySecurity };
