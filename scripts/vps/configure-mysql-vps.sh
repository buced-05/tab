#!/bin/bash

# 🗄️ Configuration MySQL pour AllAdsMarket VPS
# VPS: root@91.108.120.78
# Utilisateur: tab
# Mot de passe: Newtiv15@t

echo "🗄️ Configuration MySQL pour AllAdsMarket VPS"
echo "=============================================="
echo "VPS: root@91.108.120.78"
echo "Utilisateur: tab"
echo "Mot de passe: Newtiv15@t"
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration VPS
VPS_HOST="91.108.120.78"
VPS_USER="root"

print_status "Connexion au VPS et configuration MySQL..."

ssh $VPS_USER@$VPS_HOST << 'EOF'
# Mise à jour du système
apt update && apt upgrade -y

# Installation de MySQL
apt install mysql-server -y

# Démarrage et activation de MySQL
systemctl start mysql
systemctl enable mysql

# Sécurisation de MySQL
mysql_secure_installation << 'MYSQL_EOF'
n
n
n
n
n
n
MYSQL_EOF

# Configuration MySQL pour AllAdsMarket
mysql -u root << 'MYSQL_EOF'
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS alladsmarket 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Créer l'utilisateur pour l'accès local
CREATE USER IF NOT EXISTS 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';

-- Créer l'utilisateur pour l'accès distant
CREATE USER IF NOT EXISTS 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';

-- Appliquer les privilèges
FLUSH PRIVILEGES;

-- Vérifier la création
SELECT User, Host FROM mysql.user WHERE User = 'tab';
SHOW DATABASES;
MYSQL_EOF

# Configuration MySQL pour les performances
cat > /etc/mysql/mysql.conf.d/alladsmarket.cnf << 'MYSQL_CONFIG'
[mysqld]
# Configuration pour AllAdsMarket
innodb_buffer_pool_size = 256M
max_connections = 200
query_cache_size = 32M
query_cache_type = 1
slow_query_log = 1
long_query_time = 2
slow_query_log_file = /var/log/mysql/slow.log

# Configuration InnoDB
innodb_log_file_size = 64M
innodb_log_buffer_size = 8M
innodb_flush_log_at_trx_commit = 2

# Configuration des connexions
wait_timeout = 28800
interactive_timeout = 28800
MYSQL_CONFIG

# Redémarrer MySQL pour appliquer la configuration
systemctl restart mysql

# Vérifier le statut
systemctl status mysql --no-pager -l

echo "✅ MySQL configuré avec succès"
EOF

print_success "Configuration MySQL terminée !"
echo ""
echo "📊 Configuration appliquée:"
echo "  - Base de données: alladsmarket"
echo "  - Utilisateur: tab"
echo "  - Mot de passe: Newtiv15@t"
echo "  - Optimisations de performance activées"
echo ""
echo "🔧 Prochaines étapes:"
echo "  1. Exécuter la migration: node scripts/migrate.js migrate"
echo "  2. Importer les données: node scripts/import-data.js all"
echo "  3. Tester la connexion: node scripts/verify-mysql.js"
echo ""
