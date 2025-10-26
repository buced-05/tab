#!/bin/bash

# 🚀 Script de Déploiement AllAdsMarket sur VPS
# VPS: root@91.108.120.78
# Domaine: alladsmarket.com

echo "🚀 Déploiement d'AllAdsMarket sur VPS"
echo "======================================"
echo "VPS: root@91.108.120.78"
echo "Domaine: alladsmarket.com"
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
VPS_DOMAIN="alladsmarket.com"
APP_DIR="/var/www/alladsmarket"
BACKEND_PORT="5000"

print_status "Configuration VPS:"
echo "  Host: $VPS_HOST"
echo "  User: $VPS_USER"
echo "  Domain: $VPS_DOMAIN"
echo "  App Directory: $APP_DIR"
echo "  Backend Port: $BACKEND_PORT"
echo ""

# Vérification de la connexion SSH
print_status "Test de connexion SSH..."
if ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_USER@$VPS_HOST "echo 'SSH connection successful'" 2>/dev/null; then
    print_success "Connexion SSH réussie"
else
    print_error "Impossible de se connecter au VPS"
    echo "Vérifiez que:"
    echo "1. L'adresse IP est correcte: $VPS_HOST"
    echo "2. SSH est activé sur le VPS"
    echo "3. Votre clé SSH est configurée"
    exit 1
fi

# Installation des prérequis sur le VPS
print_status "Installation des prérequis sur le VPS..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
# Mise à jour du système
apt update && apt upgrade -y

# Installation de Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Installation de MySQL
apt install mysql-server -y
systemctl start mysql
systemctl enable mysql

# Installation de Nginx
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# Installation de PM2
npm install -g pm2

# Installation de Certbot pour SSL
apt install certbot python3-certbot-nginx -y

# Installation d'outils utiles
apt install git curl wget unzip -y

echo "✅ Prérequis installés"
EOF

# Création du répertoire de l'application
print_status "Création du répertoire de l'application..."
ssh $VPS_USER@$VPS_HOST "mkdir -p $APP_DIR"

# Upload des fichiers de l'application
print_status "Upload des fichiers de l'application..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' ./ $VPS_USER@$VPS_HOST:$APP_DIR/

# Installation des dépendances sur le VPS
print_status "Installation des dépendances..."
ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR

# Installation des dépendances frontend
npm install

# Installation des dépendances backend
cd bestserver
npm install
cd ..

echo "✅ Dépendances installées"
EOF

# Configuration de MySQL
print_status "Configuration de MySQL..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
# Sécurisation de MySQL
mysql_secure_installation << 'MYSQL_EOF'
n
n
n
n
n
n
MYSQL_EOF

# Création de la base de données et de l'utilisateur
mysql -u root << 'MYSQL_EOF'
CREATE DATABASE IF NOT EXISTS alladsmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';
CREATE USER IF NOT EXISTS 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';
FLUSH PRIVILEGES;
MYSQL_EOF

echo "✅ MySQL configuré"
EOF

# Migration de la base de données
print_status "Migration de la base de données..."
ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR/bestserver

# Migration de la base de données
node scripts/migrate.js migrate

# Import des données
node scripts/import-data.js all

echo "✅ Base de données migrée"
EOF

# Configuration de Nginx
print_status "Configuration de Nginx..."
ssh $VPS_USER@$VPS_HOST << EOF
# Copier la configuration Nginx
cp $APP_DIR/nginx.conf /etc/nginx/sites-available/$VPS_DOMAIN

# Créer le lien symbolique
ln -sf /etc/nginx/sites-available/$VPS_DOMAIN /etc/nginx/sites-enabled/

# Supprimer la configuration par défaut
rm -f /etc/nginx/sites-enabled/default

# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx

echo "✅ Nginx configuré"
EOF

# Configuration SSL avec Let's Encrypt
print_status "Configuration SSL avec Let's Encrypt..."
ssh $VPS_USER@$VPS_HOST << EOF
# Génération du certificat SSL
certbot --nginx -d $VPS_DOMAIN -d www.$VPS_DOMAIN --non-interactive --agree-tos --email admin@$VPS_DOMAIN

# Configuration du renouvellement automatique
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

echo "✅ SSL configuré"
EOF

# Build de l'application
print_status "Build de l'application..."
ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR

# Build de l'application frontend
npm run build

echo "✅ Application buildée"
EOF

# Configuration de PM2
print_status "Configuration de PM2..."
ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR

# Créer le fichier de configuration PM2
cat > ecosystem.config.js << 'PM2_EOF'
module.exports = {
  apps: [
    {
      name: 'alladsmarket-backend',
      script: 'bestserver/index.js',
      cwd: '$APP_DIR',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: $BACKEND_PORT,
        DB_HOST: 'localhost',
        DB_USER: 'tab',
        DB_PASSWORD: 'Newtiv15@t',
        DB_NAME: 'alladsmarket',
        DB_PORT: 3306
      }
    }
  ]
};
PM2_EOF

# Démarrer l'application avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ PM2 configuré"
EOF

# Configuration du firewall
print_status "Configuration du firewall..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
# Installation et configuration d'UFW
apt install ufw -y

# Règles de base
ufw default deny incoming
ufw default allow outgoing

# Autoriser SSH
ufw allow ssh

# Autoriser HTTP et HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Autoriser le port backend (optionnel pour l'admin)
ufw allow 5000/tcp

# Activer le firewall
ufw --force enable

echo "✅ Firewall configuré"
EOF

# Test final
print_status "Test final de l'application..."
ssh $VPS_USER@$VPS_HOST << EOF
# Vérifier le statut des services
echo "=== Statut des services ==="
systemctl status nginx --no-pager -l
echo ""
systemctl status mysql --no-pager -l
echo ""
pm2 status
echo ""

# Vérifier les ports
echo "=== Ports ouverts ==="
netstat -tlnp | grep -E ':(80|443|5000|3306)'
echo ""

# Vérifier les certificats SSL
echo "=== Certificats SSL ==="
certbot certificates
echo ""
EOF

print_success "🎉 Déploiement terminé avec succès !"
echo ""
echo "🌐 Application accessible sur:"
echo "  Frontend: https://$VPS_DOMAIN"
echo "  Backend: https://$VPS_DOMAIN:5000"
echo "  Admin: https://$VPS_DOMAIN/admin"
echo ""
echo "📊 Commandes utiles:"
echo "  pm2 status          - Voir le statut des services"
echo "  pm2 logs            - Voir les logs"
echo "  pm2 restart all     - Redémarrer tous les services"
echo "  pm2 stop all        - Arrêter tous les services"
echo ""
echo "🔧 Maintenance:"
echo "  Certificats SSL: certbot renew"
echo "  Logs Nginx: tail -f /var/log/nginx/access.log"
echo "  Logs App: pm2 logs"
echo ""
