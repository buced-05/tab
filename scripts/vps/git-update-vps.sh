#!/bin/bash

# Script de mise à jour pour VPS avec reset --hard
# Recommandé pour les VPS de production
# Écrase tous les changements locaux pour correspondre exactement à origin/main

set -e

echo ""
echo "========================================"
echo "Mise à jour VPS (reset --hard)"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire du projet"
    exit 1
fi

# Étape 1: Nettoyer les fichiers générés
echo "[1/6] Nettoyage des fichiers générés..."
npm run git:clean 2>/dev/null || {
    rm -rf dist/
    rm -rf dist/sitemap*.xml 2>/dev/null || true
    rm -rf dist/index.html 2>/dev/null || true
    git rm -r --cached dist/ 2>/dev/null || true
}
echo "  ✓ Fichiers générés nettoyés (dist/, sitemap*.xml, index.html)"

# Étape 2: Sauvegarder les changements locaux (optionnel)
echo ""
echo "[2/6] Vérification des changements locaux..."
if ! git diff-index --quiet HEAD --; then
    echo "  ⚠️ Changements locaux détectés"
    echo "  Sauvegarde dans stash..."
    git stash push -m "Sauvegarde avant reset $(date +%Y%m%d-%H%M%S)"
    echo "  ✓ Changements sauvegardés dans stash"
    echo "  Note: Récupérez avec 'git stash pop' si nécessaire"
else
    echo "  ✓ Aucun changement local"
fi

# Étape 3: Fetch
echo ""
echo "[3/6] Récupération des changements depuis origin..."
git fetch origin
echo "  ✓ Changements récupérés"

# Étape 4: Reset hard
echo ""
echo "[4/6] Reset hard vers origin/main..."
echo "  ⚠️ ATTENTION: Tous les changements locaux seront écrasés"
git reset --hard origin/main
echo "  ✓ Reset terminé"

# Étape 5: Rebuild et redémarrage
echo ""
echo "[5/6] Build et redémarrage des services..."

# Rebuild
if command -v npm &> /dev/null; then
    echo "  Build de l'application..."
    npm run build
    echo "  ✓ Build terminé"
else
    echo "  ⚠️ npm non trouvé, build ignoré"
fi

# Redémarrer PM2 si disponible
if command -v pm2 &> /dev/null; then
    echo "  Redémarrage PM2..."
    pm2 restart alladsmarket-backend 2>/dev/null || pm2 restart all 2>/dev/null || true
    echo "  ✓ PM2 redémarré"
fi

# Redémarrer Nginx si disponible
if command -v systemctl &> /dev/null; then
    echo "  Redémarrage Nginx..."
    sudo systemctl restart nginx 2>/dev/null || true
    echo "  ✓ Nginx redémarré"
fi

echo ""
echo "========================================"
echo "✅ Mise à jour terminée avec succès!"
echo "========================================"
echo ""
echo "Vérifications:"
if command -v pm2 &> /dev/null; then
    echo "  Statut PM2:"
    pm2 status
fi
echo ""
echo "Commit actuel:"
git log --oneline -1
echo ""

