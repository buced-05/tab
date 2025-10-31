#!/bin/bash

# 🚀 Script de Déploiement AllAdsMarket sur VPS avec MySQL
# Utilisateur MySQL: tab
# Mot de passe: Newtiv15@t

echo "🚀 Déploiement d'AllAdsMarket sur VPS avec MySQL"
echo "================================================"
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

# Vérification des prérequis
print_status "Vérification des prérequis..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    echo "Installez Node.js: https://nodejs.org/"
    exit 1
fi

# Vérifier npm
if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

# Vérifier MySQL
if ! command -v mysql &> /dev/null; then
    print_error "MySQL n'est pas installé"
    echo "Installez MySQL: sudo apt install mysql-server"
    exit 1
fi

print_success "Prérequis vérifiés"

# Installation des dépendances
print_status "Installation des dépendances..."

# Backend
print_status "Installation des dépendances backend..."
cd bestserver
npm install
if [ $? -ne 0 ]; then
    print_error "Erreur lors de l'installation des dépendances backend"
    exit 1
fi

# Frontend
print_status "Installation des dépendances frontend..."
cd ..
npm install
if [ $? -ne 0 ]; then
    print_error "Erreur lors de l'installation des dépendances frontend"
    exit 1
fi

print_success "Dépendances installées"

# Configuration de la base de données
print_status "Configuration de la base de données MySQL..."

# Demander les informations de connexion MySQL
echo ""
echo "🔐 Configuration de la base de données MySQL"
echo "============================================="
echo ""
echo "💡 Utilisateur configuré: tab"
echo "💡 Mot de passe configuré: Newtiv15@t"
echo ""

read -p "Entrez le mot de passe root MySQL: " MYSQL_ROOT_PASSWORD

# Exécuter le script de configuration MySQL
print_status "Création de la base de données et de l'utilisateur..."
mysql -u root -p$MYSQL_ROOT_PASSWORD < bestserver/scripts/setup-mysql-vps.sql

if [ $? -ne 0 ]; then
    print_error "Erreur lors de la configuration de la base de données"
    echo "Vérifiez que MySQL est démarré et que le mot de passe root est correct"
    exit 1
fi

print_success "Base de données configurée"

# Migration de la base de données
print_status "Migration de la base de données..."
cd bestserver
node scripts/migrate.js migrate

if [ $? -ne 0 ]; then
    print_error "Erreur lors de la migration de la base de données"
    exit 1
fi

print_success "Migration terminée"

# Import des données
print_status "Import des données existantes..."
node scripts/import-data.js all

if [ $? -ne 0 ]; then
    print_warning "Erreur lors de l'import des données (optionnel)"
fi

print_success "Données importées"

# Configuration de PM2
print_status "Configuration de PM2 pour la production..."

# Installer PM2 globalement si pas déjà fait
if ! command -v pm2 &> /dev/null; then
    print_status "Installation de PM2..."
    npm install -g pm2
fi

# Créer le fichier de configuration PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'alladsmarket-backend',
      script: 'bestserver/index.js',
      cwd: '/path/to/your/app',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        DB_HOST: 'localhost',
        DB_USER: 'tab',
        DB_PASSWORD: 'Newtiv15@t',
        DB_NAME: 'alladsmarket',
        DB_PORT: 3306
      }
    }
  ]
};
EOF

print_success "Configuration PM2 créée"

# Build de l'application
print_status "Build de l'application frontend..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Erreur lors du build de l'application"
    exit 1
fi

print_success "Application buildée"

# Démarrage des services
print_status "Démarrage des services..."

# Démarrer le backend avec PM2
pm2 start ecosystem.config.js

# Démarrer le serveur web (Nginx recommandé)
print_status "Configuration du serveur web..."
echo ""
echo "📋 Étapes suivantes:"
echo "1. Configurez Nginx pour servir l'application"
echo "2. Configurez SSL/HTTPS"
echo "3. Configurez le firewall"
echo ""

print_success "Déploiement terminé!"
echo ""
echo "🌐 Application accessible sur votre VPS"
echo "🔧 Backend: http://your-vps-ip:5000"
echo "📱 Frontend: http://your-vps-ip (après configuration Nginx)"
echo "🗄️  Base de données: MySQL alladsmarket"
echo ""
echo "📊 Commandes utiles:"
echo "  pm2 status          - Voir le statut des services"
echo "  pm2 logs            - Voir les logs"
echo "  pm2 restart all     - Redémarrer tous les services"
echo "  pm2 stop all        - Arrêter tous les services"
echo ""
