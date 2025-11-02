#!/bin/bash

# Script sécurisé pour git pull sur VPS
# Gère automatiquement les branches divergentes et les fichiers générés
# Option: utilise reset --hard pour forcer la correspondance avec origin/main

set -e  # Arrêter en cas d'erreur

# Option: utiliser reset --hard au lieu de merge (pour VPS production)
USE_RESET_HARD=${USE_RESET_HARD:-false}

echo ""
echo "========================================"
echo "Pull sécurisé pour VPS"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire du projet"
    exit 1
fi

# Étape 1: Nettoyer les fichiers générés
echo "[1/5] Nettoyage des fichiers générés..."
rm -rf dist/
git rm -r --cached dist/ 2>/dev/null || true
echo "  ✓ Fichiers générés nettoyés"

# Étape 2: Vérifier l'état Git
echo ""
echo "[2/5] Vérification de l'état Git..."
git status --short

# Étape 3: Stash les changements locaux (si nécessaire)
if ! git diff-index --quiet HEAD --; then
    echo ""
    echo "[3/5] Changements locaux détectés, sauvegarde dans stash..."
    git stash push -m "Sauvegarde avant pull $(date +%Y%m%d-%H%M%S)"
    echo "  ✓ Changements sauvegardés"
    STASHED=true
else
    echo ""
    echo "[3/5] Aucun changement local"
    STASHED=false
fi

# Étape 4: Nettoyer les fichiers générés AVANT le pull pour éviter les conflits
echo ""
echo "[3.5/5] Nettoyage final des fichiers générés (dist, sitemap, etc.)..."
npm run git:clean 2>/dev/null || {
    rm -rf dist/
    rm -rf dist/sitemap*.xml 2>/dev/null || true
    git rm -r --cached dist/ 2>/dev/null || true
}
echo "  ✓ Fichiers générés nettoyés"

# Étape 5: Fetch et pull avec merge
echo ""
echo "[4/6] Récupération des changements..."
git fetch origin

# Configurer merge comme stratégie par défaut
git config pull.rebase false 2>/dev/null || true

# Faire le pull
echo "  Fusion avec origin/main..."
if git pull origin main --no-rebase; then
    echo "  ✓ Pull réussi"
else
    echo "  ⚠️ Conflits détectés lors du merge"
    
    # Restaurer le stash si nécessaire
    if [ "$STASHED" = true ]; then
        echo "  Restauration des changements locaux..."
        git stash pop 2>/dev/null || true
    fi
    
    echo ""
    echo "========================================"
    echo "⚠️ Conflits à résoudre manuellement"
    echo "========================================"
    echo ""
    echo "Fichiers en conflit:"
    git status
    echo ""
    echo "Après résolution:"
    echo "  git add ."
    echo "  git commit -m 'Résolution des conflits'"
    echo ""
    exit 1
fi

# Étape 6: Restaurer les changements locaux (si stashé)
if [ "$STASHED" = true ]; then
    echo ""
    echo "[5/6] Restauration des changements locaux..."
    if git stash pop; then
        echo "  ✓ Changements restaurés"
    else
        echo "  ⚠️ Conflits lors de la restauration du stash"
        echo "  Résolvez manuellement avec: git stash show"
    fi
else
    echo ""
    echo "[5/6] Aucun changement local à restaurer"
fi

echo ""
echo "========================================"
echo "✅ Pull terminé avec succès!"
echo "========================================"
echo ""
echo "Prochaines étapes recommandées:"
echo "  npm run build          # Rebuild l'application"
echo "  pm2 restart alladsmarket-backend  # Redémarrer le serveur"
echo "  sudo systemctl restart nginx       # Redémarrer Nginx"
echo ""

