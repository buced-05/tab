#!/bin/bash

# Script de démarrage unifié pour le VPS (frontend React uniquement)

set -euo pipefail

echo ""
echo "========================================"
echo "Démarrage des Services VPS (React Frontend)"
echo "========================================"
echo ""

PROJECT_ROOT="$(pwd)"

if [ ! -f "${PROJECT_ROOT}/package.json" ]; then
    echo "❌ Erreur: lancer ce script depuis la racine du dépôt (/var/www/alladsmarket)"
    exit 1
fi

echo ""
echo "[1/3] Installation dépendances npm & build frontend..."
if command -v npm >/dev/null 2>&1; then
    npm ci
    npm run build
    echo "  ✓ Build frontend terminé"
else
    echo "  ❌ npm introuvable. Installer Node.js avant de relancer."
    exit 1
fi

echo ""
echo "[2/3] Redémarrage de Nginx..."
if command -v systemctl &> /dev/null; then
    sudo systemctl reload nginx || sudo systemctl restart nginx
    echo "  ✓ Nginx rechargé"
else
    echo "  ⚠️ systemctl non disponible, redémarrez Nginx manuellement"
fi

echo ""
echo "========================================"
echo "✅ Déploiement terminé"
echo "========================================"
echo ""
