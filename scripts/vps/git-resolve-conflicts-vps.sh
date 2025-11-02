#!/bin/bash

# Script pour résoudre les conflits VPS avec la version précédente
# Utilise une approche sécurisée avec backup et validation

set -e  # Arrêter en cas d'erreur

echo ""
echo "========================================"
echo "Résolution Conflits VPS - Version Sécurisée"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire du projet"
    exit 1
fi

# Configuration
BACKUP_DIR="/var/backups/alladsmarket"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
VPS_ROOT="/var/www/tab"

# Fonction de sauvegarde
backup_project() {
    echo ""
    echo "[Backup] Création d'une sauvegarde complète..."
    
    # Créer le répertoire de backup
    sudo mkdir -p "$BACKUP_DIR/$TIMESTAMP"
    
    # Sauvegarder les fichiers critiques
    sudo cp -r dist "$BACKUP_DIR/$TIMESTAMP/" 2>/dev/null || true
    sudo cp -r node_modules "$BACKUP_DIR/$TIMESTAMP/" 2>/dev/null || true
    sudo cp package*.json "$BACKUP_DIR/$TIMESTAMP/" 2>/dev/null || true
    sudo cp .env.production "$BACKUP_DIR/$TIMESTAMP/" 2>/dev/null || true
    sudo cp ecosystem.config.js "$BACKUP_DIR/$TIMESTAMP/" 2>/dev/null || true
    
    echo "  ✓ Backup créé dans $BACKUP_DIR/$TIMESTAMP"
}

# Fonction de nettoyage
clean_generated_files() {
    echo ""
    echo "[Nettoyage] Suppression des fichiers générés..."
    
    # Nettoyer dist
    rm -rf dist/
    git rm -r --cached dist/ 2>/dev/null || true
    
    # Nettoyer fichiers générés
    rm -f public/sitemap*.xml dist/sitemap*.xml 2>/dev/null || true
    
    echo "  ✓ Fichiers générés nettoyés"
}

# Fonction de pull
pull_latest_changes() {
    echo ""
    echo "[Pull] Récupération des dernières modifications..."
    
    # Configurer git
    git config pull.rebase false 2>/dev/null || true
    git config user.name "VPS Bot" 2>/dev/null || true
    git config user.email "vps@alladsmarket.com" 2>/dev/null || true
    
    # Fetch et pull
    git fetch origin
    git pull origin main --no-edit || {
        echo "  ⚠️ Pull avec erreurs - tentative de résolution..."
        return 1
    }
    
    echo "  ✓ Pull réussi"
    return 0
}

# Fonction de résolution de conflits
resolve_conflicts() {
    echo ""
    echo "[Résolution] Tentative de résolution automatique des conflits..."
    
    # Lister les fichiers en conflit
    CONFLICTED_FILES=$(git diff --name-only --diff-filter=U)
    
    if [ -z "$CONFLICTED_FILES" ]; then
        echo "  ✓ Aucun conflit détecté"
        return 0
    fi
    
    echo "  Fichiers en conflit:"
    echo "$CONFLICTED_FILES"
    echo ""
    
    # Stratégie: toujours utiliser la version distante pour les fichiers générés
    for file in $CONFLICTED_FILES; do
        if [[ "$file" == "dist/"* ]] || [[ "$file" == "sitemap"* ]] || [[ "$file" == "public/sitemap"* ]]; then
            echo "  Auto-résolution: $file (version distante)"
            git checkout --theirs "$file" 2>/dev/null || true
        fi
    done
    
    # Ajouter les fichiers résolus
    git add . 2>/dev/null || true
    
    return 0
}

# Fonction de rebuild
rebuild_project() {
    echo ""
    echo "[Build] Reconstruction du projet..."
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "  Installation des dépendances..."
        npm install --production
    fi
    
    # Build
    echo "  Build de l'application..."
    npm run build || {
        echo "  ❌ Erreur lors du build"
        return 1
    }
    
    echo "  ✓ Build réussi"
    return 0
}

# Fonction de redémarrage des services
restart_services() {
    echo ""
    echo "[Services] Redémarrage des services..."
    
    # Redémarrer PM2
    if command -v pm2 &> /dev/null; then
        echo "  Redémarrage PM2..."
        pm2 restart alladsmarket-backend || pm2 reload alladsmarket-backend || true
    fi
    
    # Redémarrer Nginx
    if command -v nginx &> /dev/null; then
        echo "  Redémarrage Nginx..."
        sudo systemctl restart nginx 2>/dev/null || true
    fi
    
    echo "  ✓ Services redémarrés"
}

# Main execution
main() {
    # 1. Backup
    backup_project
    
    # 2. Nettoyage
    clean_generated_files
    
    # 3. Pull
    if pull_latest_changes; then
        echo "  ✓ Pull direct réussi"
    else
        echo ""
        echo "[Conflits] Résolution des conflits..."
        
        # Résoudre les conflits
        if resolve_conflicts; then
            # Commit de résolution
            git commit -m "Auto-résolution conflits VPS - $TIMESTAMP" 2>/dev/null || true
            echo "  ✓ Conflits résolus"
        else
            echo ""
            echo "⚠️ Conflits détectés nécessitant résolution manuelle"
            echo ""
            echo "Fichiers en conflit:"
            git status
            echo ""
            echo "Résoudre manuellement:"
            echo "  1. Éditez les fichiers en conflit"
            echo "  2. Exécutez: git add ."
            echo "  3. Exécutez: git commit -m 'Résolution manuelle conflits'"
            echo ""
            exit 1
        fi
    fi
    
    # 4. Rebuild
    if ! rebuild_project; then
        echo ""
        echo "❌ Échec du build"
        echo "Restaurer depuis backup: sudo cp -r $BACKUP_DIR/$TIMESTAMP/* $VPS_ROOT/"
        exit 1
    fi
    
    # 5. Services
    restart_services
    
    echo ""
    echo "========================================"
    echo "✅ Déploiement terminé avec succès!"
    echo "========================================"
    echo ""
    echo "Backup disponible dans: $BACKUP_DIR/$TIMESTAMP"
    echo ""
}

# Exécuter le script
main

