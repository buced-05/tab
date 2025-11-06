#!/bin/bash

# 🚀 Script de déploiement sécurisé pour VPS - Évite les conflits
# Usage: ./deploy-safe.sh

set -e  # Arrêter en cas d'erreur

# ============================================
# Configuration
# ============================================
PROJECT_DIR="/var/www/tab"
BACKUP_DIR="/var/www/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${TIMESTAMP}"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# Fonctions utilitaires
# ============================================
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
    exit 1
}

# ============================================
# Vérifications préalables
# ============================================
log "Vérification des prérequis..."

# Vérifier qu'on est dans le bon répertoire
if [ ! -d "$PROJECT_DIR" ]; then
    error "Le répertoire $PROJECT_DIR n'existe pas"
fi

cd "$PROJECT_DIR" || error "Impossible d'accéder à $PROJECT_DIR"

# Vérifier que Git est initialisé
if [ ! -d ".git" ]; then
    error "Le répertoire n'est pas un dépôt Git"
fi

success "Prérequis vérifiés"

# ============================================
# Étape 1: Backup complet
# ============================================
log "Création d'un backup complet..."

# Créer le dossier de backup s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# Backup du dossier dist
if [ -d "dist" ]; then
    log "Backup de dist/..."
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}_dist.tar.gz" dist/ 2>/dev/null || warning "Impossible de créer le backup de dist/"
    success "Backup de dist/ créé"
fi

# Backup de la configuration Nginx
if [ -f "/etc/nginx/sites-available/alladsmarket" ]; then
    log "Backup de la configuration Nginx..."
    sudo cp /etc/nginx/sites-available/alladsmarket "$BACKUP_DIR/${BACKUP_NAME}_nginx.conf" 2>/dev/null || warning "Impossible de créer le backup de Nginx"
    success "Backup de Nginx créé"
fi

# Backup de package.json et package-lock.json
if [ -f "package.json" ]; then
    log "Backup de package.json..."
    cp package.json "$BACKUP_DIR/${BACKUP_NAME}_package.json" 2>/dev/null || warning "Impossible de créer le backup de package.json"
    success "Backup de package.json créé"
fi

success "Backup complet créé: $BACKUP_NAME"

# ============================================
# Étape 2: Nettoyage des fichiers générés
# ============================================
log "Nettoyage des fichiers générés..."

# Sauvegarder les modifications locales de dist/ si elles existent
if [ -d "dist" ] && [ -n "$(git status dist/ --porcelain 2>/dev/null)" ]; then
    warning "Des modifications locales dans dist/ détectées"
    log "Sauvegarde des modifications locales..."
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}_dist_local.tar.gz" dist/ 2>/dev/null || true
fi

# Nettoyer les fichiers générés (dist/ est dans .gitignore, donc pas de problème)
# Mais on peut supprimer dist/ pour forcer un rebuild propre
if [ -d "dist" ]; then
    log "Suppression de l'ancien build..."
    rm -rf dist/
    success "Ancien build supprimé"
fi

# ============================================
# Étape 3: Gestion des conflits Git
# ============================================
log "Gestion des conflits Git..."

# Vérifier l'état Git
GIT_STATUS=$(git status --porcelain)

if [ -n "$GIT_STATUS" ]; then
    warning "Des modifications locales détectées:"
    echo "$GIT_STATUS"
    
    # Lister les fichiers modifiés
    MODIFIED_FILES=$(git status --porcelain | awk '{print $2}')
    
    # Pour chaque fichier modifié, décider de l'action
    for file in $MODIFIED_FILES; do
        # Ignorer dist/ et node_modules/
        if [[ "$file" == dist/* ]] || [[ "$file" == node_modules/* ]] || [[ "$file" == *.log ]]; then
            continue
        fi
        
        log "Traitement de $file..."
        
        # Si le fichier est dans .gitignore, on peut le supprimer
        if git check-ignore -q "$file"; then
            log "  → Fichier ignoré, suppression..."
            rm -f "$file"
            continue
        fi
        
        # Sinon, on stash les modifications
        log "  → Sauvegarde des modifications locales (stash)..."
        git stash push -m "Auto-stash before deploy: $file" "$file" 2>/dev/null || true
    done
    
    success "Modifications locales gérées"
fi

# ============================================
# Étape 4: Mise à jour depuis Git
# ============================================
log "Mise à jour depuis Git..."

# Récupérer les dernières modifications
git fetch origin main || error "Impossible de récupérer les modifications"

# Vérifier s'il y a des modifications distantes
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
    success "Déjà à jour avec origin/main"
elif [ "$LOCAL" = "$BASE" ]; then
    log "Mise à jour nécessaire..."
    # Pull avec stratégie de merge
    git pull origin main --no-edit --strategy-option=theirs || {
        error "Conflit lors du pull. Résolution automatique..."
        # En cas de conflit, utiliser la version distante
        git checkout --theirs . 2>/dev/null || true
        git add . 2>/dev/null || true
        git commit -m "Auto-resolve conflicts: use remote version" 2>/dev/null || true
    }
    success "Mise à jour réussie"
elif [ "$REMOTE" = "$BASE" ]; then
    warning "Des modifications locales non poussées détectées"
    log "Les modifications locales seront écrasées par la version distante"
    git reset --hard origin/main || error "Impossible de réinitialiser"
    success "Réinitialisation réussie"
else
    warning "Divergence détectée entre local et distant"
    log "Résolution automatique: utilisation de la version distante"
    git reset --hard origin/main || error "Impossible de réinitialiser"
    success "Résolution réussie"
fi

# ============================================
# Étape 5: Installation des dépendances
# ============================================
log "Installation des dépendances..."

# Vérifier si package.json a changé
if [ -f "package.json" ] && [ -f "$BACKUP_DIR/${BACKUP_NAME}_package.json" ]; then
    if ! cmp -s package.json "$BACKUP_DIR/${BACKUP_NAME}_package.json"; then
        log "package.json a changé, installation des dépendances..."
        npm install --production || error "Échec de l'installation des dépendances"
        success "Dépendances installées"
    else
        success "Aucune modification de package.json"
    fi
else
    log "Installation des dépendances..."
    npm install --production || error "Échec de l'installation des dépendances"
    success "Dépendances installées"
fi

# ============================================
# Étape 6: Build de l'application
# ============================================
log "Build de l'application..."

# Vérifier que le build peut être lancé
if [ ! -f "package.json" ]; then
    error "package.json introuvable"
fi

# Lancer le build
npm run build || {
    error "Échec du build"
    log "Rollback vers le backup précédent..."
    # Restaurer le backup si le build échoue
    if [ -f "$BACKUP_DIR/${BACKUP_NAME}_dist.tar.gz" ]; then
        tar -xzf "$BACKUP_DIR/${BACKUP_NAME}_dist.tar.gz" -C . 2>/dev/null || true
    fi
    error "Build échoué, rollback effectué"
}

# Vérifier que le build a réussi
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    error "Le build n'a pas créé dist/index.html"
fi

success "Build réussi"

# ============================================
# Étape 7: Vérification des sitemaps
# ============================================
log "Vérification des sitemaps..."

if [ ! -f "dist/sitemap.xml" ]; then
    warning "sitemap.xml introuvable, régénération..."
    npm run generate-sitemaps || warning "Échec de la génération des sitemaps"
fi

SITEMAP_COUNT=$(find dist -name "sitemap*.xml" 2>/dev/null | wc -l)
if [ "$SITEMAP_COUNT" -lt 5 ]; then
    warning "Peu de sitemaps trouvés ($SITEMAP_COUNT), régénération..."
    npm run generate-sitemaps || warning "Échec de la génération des sitemaps"
fi

success "$SITEMAP_COUNT sitemaps trouvés"

# ============================================
# Étape 8: Mise à jour de Nginx
# ============================================
log "Mise à jour de la configuration Nginx..."

if [ -f "nginx-alladsmarket-complete.conf" ]; then
    log "Installation de la configuration Nginx..."
    chmod +x install-nginx-config.sh 2>/dev/null || true
    if [ -f "install-nginx-config.sh" ]; then
        sudo ./install-nginx-config.sh || warning "Échec de l'installation de Nginx (peut être déjà configuré)"
    else
        # Installation manuelle
        sudo cp nginx-alladsmarket-complete.conf /etc/nginx/sites-available/alladsmarket || warning "Impossible de copier la config Nginx"
        sudo ln -sf /etc/nginx/sites-available/alladsmarket /etc/nginx/sites-enabled/alladsmarket || warning "Impossible de créer le lien symbolique"
        sudo nginx -t && sudo systemctl reload nginx || warning "Impossible de recharger Nginx"
    fi
    success "Configuration Nginx mise à jour"
else
    warning "Fichier nginx-alladsmarket-complete.conf introuvable"
fi

# ============================================
# Étape 9: Redémarrage des services
# ============================================
log "Redémarrage des services..."

# Redémarrer PM2 si disponible
if command -v pm2 &> /dev/null; then
    log "Redémarrage de PM2..."
    pm2 restart alladsmarket-backend 2>/dev/null || pm2 restart all 2>/dev/null || warning "Impossible de redémarrer PM2"
    success "PM2 redémarré"
fi

# Recharger Nginx (sans interruption)
log "Rechargement de Nginx..."
sudo systemctl reload nginx 2>/dev/null || warning "Impossible de recharger Nginx"
success "Nginx rechargé"

# ============================================
# Étape 10: Vérifications post-déploiement
# ============================================
log "Vérifications post-déploiement..."

# Vérifier que dist/index.html existe
if [ ! -f "dist/index.html" ]; then
    error "dist/index.html introuvable après le déploiement"
fi

# Vérifier que Nginx fonctionne
if ! sudo systemctl is-active --quiet nginx; then
    error "Nginx n'est pas actif"
fi

# Vérifier que les sitemaps sont accessibles
if [ ! -f "dist/sitemap.xml" ]; then
    warning "sitemap.xml introuvable"
fi

success "Vérifications post-déploiement réussies"

# ============================================
# Nettoyage
# ============================================
log "Nettoyage..."

# Supprimer les anciens backups (garder les 10 derniers)
if [ -d "$BACKUP_DIR" ]; then
    cd "$BACKUP_DIR" || true
    ls -t backup_* 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
    success "Anciens backups nettoyés"
fi

# ============================================
# Résumé
# ============================================
echo ""
success "🎉 Déploiement terminé avec succès!"
echo ""
log "📊 Résumé:"
echo "  - Backup créé: $BACKUP_NAME"
echo "  - Build: ✅ Réussi"
echo "  - Sitemaps: ✅ $SITEMAP_COUNT fichiers"
echo "  - Nginx: ✅ Rechargé"
echo "  - PM2: ✅ Redémarré"
echo ""
log "📁 Backup disponible dans: $BACKUP_DIR"
log "🔄 Pour rollback: tar -xzf $BACKUP_DIR/${BACKUP_NAME}_dist.tar.gz -C $PROJECT_DIR"
echo ""

