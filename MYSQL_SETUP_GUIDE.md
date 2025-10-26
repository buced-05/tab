# 🗄️ Guide d'Installation MySQL pour AllAdsMarket.com

## 📋 Prérequis

### 🌐 Configuration du Domaine
- **Domaine de production** : `alladsmarket.com`
- **WWW** : `www.alladsmarket.com`
- **SSL** : Let's Encrypt (recommandé)
- **Base de données** : `alladsmarket`
- **Utilisateur MySQL** : `tab`
- **Mot de passe** : `Newtiv15@t`

### 1. Installation de MySQL

#### Windows
1. **Télécharger MySQL** : https://dev.mysql.com/downloads/mysql/
2. **Choisir** : MySQL Community Server
3. **Installer** : MySQL Installer for Windows
4. **Configuration** :
   - Root password : `password` (ou votre choix)
   - Port : `3306` (par défaut)
   - Service : Démarrer automatiquement

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

#### macOS
```bash
brew install mysql
brew services start mysql
```

### 2. Vérification de l'installation
```bash
mysql --version
```

## 🔧 Configuration de la Base de Données

### 1. Connexion à MySQL
```bash
mysql -u root -p
```

### 2. Création de la base de données
```sql
CREATE DATABASE alladsmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Création d'un utilisateur pour AllAdsMarket
```sql
-- Créer l'utilisateur 'tab' avec le mot de passe 'Newtiv15@t'
CREATE USER 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';
FLUSH PRIVILEGES;

-- Pour l'accès distant (VPS), créer aussi l'utilisateur pour toutes les adresses IP
CREATE USER 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';
FLUSH PRIVILEGES;
```

## 🚀 Démarrage de l'Application

### Option 1 : Démarrage Automatique
```bash
# Double-clic sur le fichier
start-with-database.bat
```

### Option 2 : Démarrage Manuel

#### 1. Migration de la base de données
```bash
cd bestserver
node scripts/migrate.js migrate
```

#### 2. Importation des données
```bash
node scripts/import-data.js all
```

#### 3. Démarrage du serveur
```bash
npm start
```

#### 4. Démarrage du frontend
```bash
cd ..
npm run dev
```

## 📊 Scripts de Gestion

### Migration
```bash
# Créer/mettre à jour la base de données
node scripts/migrate.js migrate

# Réinitialiser la base de données
node scripts/migrate.js reset

# Vérifier l'état
node scripts/migrate.js status
```

### Importation des Données
```bash
# Importer tous les produits et articles
node scripts/import-data.js all

# Importer seulement les produits
node scripts/import-data.js products

# Importer seulement les articles
node scripts/import-data.js articles
```

## 🔍 Vérification de l'Installation

### 1. Test de connexion complet
```bash
cd bestserver
node scripts/test-mysql-connection.js
```

### 2. Vérification complète de la base de données
```bash
cd bestserver
node scripts/verify-mysql.js
```

### 3. Test de connexion simple
```bash
cd bestserver
node -e "require('./config/database').testConnection()"
```

### 4. Vérifier les tables
```sql
USE alladsmarket;
SHOW TABLES;
```

### 5. Vérifier les données
```sql
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM articles;
SELECT COUNT(*) FROM categories;
```

### 6. Vérifier les utilisateurs MySQL
```sql
SELECT User, Host FROM mysql.user WHERE User = 'tab';
```

### 7. Vérifier les privilèges
```sql
SHOW GRANTS FOR 'tab'@'localhost';
SHOW GRANTS FOR 'tab'@'%';
```

## 🛠️ Configuration Avancée

### Variables d'Environnement
Créez un fichier `.env` dans `bestserver/` :
```env
# Configuration du serveur
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Configuration de la base de données MySQL
DB_HOST=localhost
DB_USER=tab
DB_PASSWORD=Newtiv15@t
DB_NAME=alladsmarket
DB_PORT=3306

# Configuration pour le VPS (à adapter selon votre serveur)
# DB_HOST=your-vps-ip-address
# DB_USER=tab
# DB_PASSWORD=Newtiv15@t
# DB_NAME=alladsmarket
# DB_PORT=3306

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Production Domain Configuration
PRODUCTION_DOMAIN=alladsmarket.com
PRODUCTION_URL=https://alladsmarket.com
```

### Configuration MySQL
```sql
-- Optimisation pour l'application
SET GLOBAL innodb_buffer_pool_size = 256M;
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 32M;
```

## 🚨 Dépannage

### Erreur de Connexion
```
❌ ER_ACCESS_DENIED_ERROR
```
**Solution** : Vérifiez le mot de passe MySQL

### Erreur de Base de Données
```
❌ ER_BAD_DB_ERROR
```
**Solution** : Créez la base de données manuellement

### Erreur de Port
```
❌ EADDRINUSE
```
**Solution** : Changez le port dans `.env` ou arrêtez le service MySQL

### Erreur de Permissions
```
❌ ER_DBACCESS_DENIED_ERROR
```
**Solution** : Accordez les permissions à l'utilisateur

## 📈 Optimisation des Performances

### 1. Index MySQL
```sql
-- Index pour les recherches
CREATE INDEX idx_products_search ON products(name, description, brand);
CREATE INDEX idx_articles_search ON articles(title, content);

-- Index pour les filtres
CREATE INDEX idx_products_category ON products(category_id, status);
CREATE INDEX idx_articles_status ON articles(status, published_at);
```

### 2. Configuration MySQL
```ini
# my.cnf
[mysqld]
innodb_buffer_pool_size = 512M
max_connections = 200
query_cache_size = 64M
slow_query_log = 1
long_query_time = 2
```

### 3. Nettoyage Automatique
```sql
-- Script de nettoyage (à exécuter périodiquement)
CALL CleanupOldData(30); -- Supprimer les données de plus de 30 jours
```

## 🔒 Sécurité

### 1. Utilisateur Dédié (Déjà Configuré)
```sql
-- Utilisateur principal pour AllAdsMarket
CREATE USER 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';

-- Utilisateur pour l'accès distant (VPS)
CREATE USER 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';

-- Utilisateur pour l'application (optionnel)
CREATE USER 'alladsmarket_app'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON alladsmarket.* TO 'alladsmarket_app'@'localhost';
```

### 2. Sauvegarde
```bash
# Sauvegarde complète avec l'utilisateur configuré
mysqldump -u tab -p'Newtiv15@t' alladsmarket > backup_$(date +%Y%m%d).sql

# Sauvegarde avec compression
mysqldump -u tab -p'Newtiv15@t' alladsmarket | gzip > backup_$(date +%Y%m%d).sql.gz

# Restauration
mysql -u tab -p'Newtiv15@t' alladsmarket < backup_20240101.sql

# Restauration depuis un fichier compressé
gunzip -c backup_20240101.sql.gz | mysql -u tab -p'Newtiv15@t' alladsmarket
```

### 3. Monitoring
```sql
-- Vérifier les connexions actives
SHOW PROCESSLIST;

-- Vérifier l'utilisation des ressources
SHOW STATUS LIKE 'Innodb_buffer_pool%';
```

## 📊 Monitoring et Maintenance

### 1. Statistiques de la Base
```sql
-- Taille de la base de données
SELECT 
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'alladsmarket'
GROUP BY table_schema;
```

### 2. Nettoyage des Données
```sql
-- Supprimer les analytics anciennes
DELETE FROM analytics WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Archiver les messages de contact anciens
UPDATE contact_messages 
SET is_archived = TRUE 
WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

## 🌐 Configuration pour le Déploiement VPS

### 1. Configuration DNS
```
Type: A
Name: @
Value: YOUR_VPS_IP
TTL: 300

Type: CNAME
Name: www
Value: alladsmarket.com
TTL: 300
```

### 2. Configuration SSL
```bash
# Installation de Certbot
sudo apt install certbot python3-certbot-nginx -y

# Génération du certificat SSL
sudo certbot --nginx -d alladsmarket.com -d www.alladsmarket.com
```

### 3. Configuration Nginx
```bash
# Copier la configuration
sudo cp nginx.conf /etc/nginx/sites-available/alladsmarket.com
sudo ln -s /etc/nginx/sites-available/alladsmarket.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4. Déploiement avec PM2
```bash
# Installation de PM2
sudo npm install -g pm2

# Démarrage de l'application
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Scripts de Déploiement Automatique

### Script de Configuration MySQL VPS
```bash
# Exécuter le script de configuration
mysql -u root -p < bestserver/scripts/setup-mysql-vps.sql
```

### Script de Déploiement Complet
```bash
# Déploiement automatique
chmod +x scripts/deploy-vps-mysql.sh
./scripts/deploy-vps-mysql.sh
```

## 🔍 Vérification du Déploiement

### Tests de Fonctionnalité
- [ ] Site accessible sur https://alladsmarket.com
- [ ] Redirection HTTPS fonctionnelle
- [ ] Base de données connectée (utilisateur: tab)
- [ ] API endpoints fonctionnels
- [ ] SSL certificate valide

### Tests de Performance
- [ ] Temps de chargement < 3 secondes
- [ ] Score Lighthouse > 90
- [ ] Mobile-friendly
- [ ] SEO optimisé

---

**🎉 Base de données MySQL configurée et prête pour AllAdsMarket.com !**

### 📋 Résumé de la Configuration
- **Domaine** : alladsmarket.com
- **Base de données** : alladsmarket
- **Utilisateur** : tab
- **Mot de passe** : Newtiv15@t
- **SSL** : Let's Encrypt
- **Serveur** : Nginx + PM2
