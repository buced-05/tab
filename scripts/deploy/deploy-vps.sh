#!/bin/bash

# 🚀 AllAdsMarket VPS Deployment Script
echo "🚀 Déploiement AllAdsMarket sur VPS..."

# Configuration
VPS_USER="root"
VPS_HOST="your-vps-ip"
VPS_PATH="/var/www/alladsmarket"
DOMAIN="alladsmarket.com"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Vérification des prérequis
log "Vérification des prérequis..."

# Vérifier si git est disponible
if ! command -v git &> /dev/null; then
    error "Git n'est pas installé"
fi

# Vérifier si ssh est disponible
if ! command -v ssh &> /dev/null; then
    error "SSH n'est pas installé"
fi

# Vérifier la connexion SSH
log "Test de connexion SSH..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes $VPS_USER@$VPS_HOST exit 2>/dev/null; then
    error "Impossible de se connecter au VPS. Vérifiez vos clés SSH."
fi

success "Connexion SSH établie"

# 1. Build local
log "Build de production local..."
npm run build
if [ $? -ne 0 ]; then
    error "Échec du build local"
fi
success "Build local réussi"

# 2. Préparation du package
log "Préparation du package de déploiement..."
tar -czf alladsmarket-deployment.tar.gz dist/ server/ package.json ecosystem.config.js nginx.conf
success "Package créé: alladsmarket-deployment.tar.gz"

# 3. Upload vers le VPS
log "Upload vers le VPS..."
scp alladsmarket-deployment.tar.gz $VPS_USER@$VPS_HOST:/tmp/
if [ $? -ne 0 ]; then
    error "Échec de l'upload"
fi
success "Upload réussi"

# 4. Déploiement sur le VPS
log "Déploiement sur le VPS..."
ssh $VPS_USER@$VPS_HOST << 'EOF'
    # Créer le répertoire si nécessaire
    mkdir -p /var/www/alladsmarket
    cd /var/www/alladsmarket
    
    # Extraire le package
    tar -xzf /tmp/alladsmarket-deployment.tar.gz -C .
    
    # Installer les dépendances
    npm install --production
    
    # Créer les logs
    mkdir -p logs
    
    # Configurer PM2
    npm install -g pm2
    
    # Démarrer/redémarrer l'application
    pm2 delete alladsmarket 2>/dev/null || true
    pm2 start ecosystem.config.js --env production
    pm2 save
    pm2 startup
    
    # Configurer Nginx
    cp nginx.conf /etc/nginx/sites-available/alladsmarket
    ln -sf /etc/nginx/sites-available/alladsmarket /etc/nginx/sites-enabled/
    nginx -t && systemctl reload nginx
    
    # Nettoyer
    rm -f /tmp/alladsmarket-deployment.tar.gz
    
    echo "✅ Déploiement terminé!"
    echo "🌐 Application disponible sur: https://alladsmarket.com"
    echo "📊 Status PM2:"
    pm2 status
EOF

if [ $? -ne 0 ]; then
    error "Échec du déploiement sur le VPS"
fi

# 5. Nettoyage local
log "Nettoyage local..."
rm -f alladsmarket-deployment.tar.gz

success "🎉 Déploiement terminé avec succès!"
log "🌐 Votre application est maintenant disponible sur: https://$DOMAIN"
log "📊 Pour vérifier le statut: ssh $VPS_USER@$VPS_HOST 'pm2 status'"
log "📝 Pour voir les logs: ssh $VPS_USER@$VPS_HOST 'pm2 logs alladsmarket'"
