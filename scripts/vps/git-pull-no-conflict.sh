#!/bin/bash

# Script de pull SANS CONFLITS pour VPS
# Utilise git reset --hard pour forcer la correspondance exacte avec origin/main
# Recommandé pour les VPS de production où on ne veut JAMAIS de conflits

set -e  # Arrêter en cas d'erreur

echo ""
echo "========================================"
echo "🚀 Pull VPS SANS CONFLITS"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire du projet"
    exit 1
fi

# Étape 1: Nettoyer TOUS les fichiers générés
echo "[1/7] 🧹 Nettoyage complet des fichiers générés..."
rm -rf dist/ 2>/dev/null || true
rm -rf dist/** 2>/dev/null || true
rm -rf dist/sitemap*.xml 2>/dev/null || true
rm -rf dist/index.html 2>/dev/null || true
rm -rf .cache/ 2>/dev/null || true
rm -rf node_modules/.cache/ 2>/dev/null || true
git clean -fd 2>/dev/null || true
git rm -r --cached dist/ 2>/dev/null || true
echo "  ✅ Fichiers générés nettoyés"

# Étape 2: Sauvegarder les changements locaux (si nécessaire)
echo ""
echo "[2/7] 💾 Vérification des changements locaux..."
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "  ⚠️  Changements locaux détectés"
    STASH_NAME="vps-backup-$(date +%Y%m%d-%H%M%S)"
    git stash push -m "$STASH_NAME" 2>/dev/null || true
    echo "  ✅ Changements sauvegardés dans stash: $STASH_NAME"
    echo "  💡 Pour récupérer: git stash list puis git stash pop"
else
    echo "  ✅ Aucun changement local"
fi

# Étape 3: Nettoyer le working directory
echo ""
echo "[3/7] 🧹 Nettoyage du working directory..."
git clean -fd 2>/dev/null || true
git reset --hard HEAD 2>/dev/null || true
echo "  ✅ Working directory nettoyé"

# Étape 4: Fetch depuis origin
echo ""
echo "[4/7] 📥 Récupération des changements depuis origin/main..."
git fetch origin main 2>&1 || {
    echo "  ❌ Erreur lors du fetch"
    exit 1
}
echo "  ✅ Changements récupérés"

# Étape 5: Vérifier s'il y a des changements
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo ""
    echo "  ✅ Déjà à jour avec origin/main"
    echo "  📌 Commit actuel: $(git log --oneline -1)"
    echo ""
    echo "========================================"
    echo "✅ Aucune mise à jour nécessaire"
    echo "========================================"
    exit 0
fi

# Étape 6: Reset hard vers origin/main (PAS DE CONFLITS)
echo ""
echo "[5/7] 🔄 Reset hard vers origin/main..."
echo "  ⚠️  ATTENTION: Tous les changements locaux seront écrasés"
echo "  📌 Commit local:  $(git log --oneline -1)"
echo "  📌 Commit distant: $(git log --oneline -1 origin/main)"
git reset --hard origin/main
git clean -fd 2>/dev/null || true
echo "  ✅ Reset terminé - Aucun conflit possible"

# Étape 7: Vérification finale
echo ""
echo "[6/7] ✅ Vérification finale..."
CURRENT=$(git rev-parse HEAD)
if [ "$CURRENT" = "$REMOTE" ]; then
    echo "  ✅ Synchronisation réussie avec origin/main"
    echo "  📌 Commit actuel: $(git log --oneline -1)"
else
    echo "  ⚠️  Attention: La synchronisation semble incomplète"
    exit 1
fi

# Étape 8: Rebuild (optionnel, peut être fait manuellement)
echo ""
echo "[7/7] 🔨 Build de l'application..."
if command -v npm &> /dev/null; then
    echo "  Installation des dépendances (si nécessaire)..."
    npm install --production 2>/dev/null || npm install 2>/dev/null || true
    
    echo "  Build de l'application..."
    npm run build 2>&1 || {
        echo "  ⚠️  Erreur lors du build (peut être normal si build non nécessaire)"
    }
    echo "  ✅ Build terminé"
else
    echo "  ⚠️  npm non trouvé, build ignoré"
fi

echo ""
echo "========================================"
echo "✅ Pull terminé SANS CONFLITS!"
echo "========================================"
echo ""
echo "📊 Statut:"
echo "  Commit: $(git log --oneline -1)"
echo "  Branche: $(git branch --show-current)"
echo "  Status: $(git status --short | wc -l) fichiers modifiés"
echo ""
echo "🔧 Prochaines étapes (si nécessaire):"
if command -v pm2 &> /dev/null; then
    echo "  pm2 restart alladsmarket-backend  # Redémarrer le backend"
fi
if command -v systemctl &> /dev/null; then
    echo "  sudo systemctl restart nginx       # Redémarrer Nginx"
fi
echo ""

