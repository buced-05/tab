#!/bin/bash

# Script de résolution de conflit package.json sur VPS
# Utilise la version distante et réinstalle les dépendances

set -euo pipefail

echo ""
echo "========================================"
echo "Résolution Conflit package.json"
echo "========================================"
echo ""

PROJECT_ROOT="$(pwd)"

if [ ! -f "${PROJECT_ROOT}/package.json" ]; then
    echo "❌ Erreur: lancer ce script depuis la racine du dépôt (/var/www/alladsmarket)"
    exit 1
fi

# Sauvegarder les modifications locales
echo "[1/4] Sauvegarde des modifications locales..."
if [ -n "$(git status --porcelain package.json)" ]; then
    cp package.json package.json.local.backup
    echo "  ✓ package.json sauvegardé dans package.json.local.backup"
fi

# Récupérer la version distante
echo "[2/4] Récupération de la version distante..."
git fetch origin main

# Utiliser la version distante pour package.json
echo "[3/4] Application de la version distante..."
git checkout origin/main -- package.json
echo "  ✓ package.json mis à jour avec la version distante"

# Vérifier si package.json a changé
if [ -f "package.json.local.backup" ]; then
    if ! cmp -s package.json package.json.local.backup; then
        echo "[4/4] Réinstallation des dépendances..."
        npm install --production
        echo "  ✓ Dépendances réinstallées"
    else
        echo "[4/4] Aucun changement dans package.json, pas besoin de réinstaller"
    fi
    # Nettoyer la sauvegarde
    rm -f package.json.local.backup
else
    echo "[4/4] Aucune sauvegarde trouvée, vérification des dépendances..."
    npm install --production
fi

echo ""
echo "========================================"
echo "✅ Conflit résolu - Vous pouvez maintenant faire:"
echo "   git pull origin main"
echo "========================================"
echo ""
