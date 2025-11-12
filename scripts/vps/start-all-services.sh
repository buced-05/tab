#!/bin/bash

# Script de démarrage unifié pour le VPS (frontend + backend Django)

set -euo pipefail

echo ""
echo "========================================"
echo "Démarrage des Services VPS (React + Django)"
echo "========================================"
echo ""

PROJECT_ROOT="$(pwd)"

if [ ! -f "${PROJECT_ROOT}/package.json" ] || [ ! -f "${PROJECT_ROOT}/backend/manage.py" ]; then
    echo "❌ Erreur: lancer ce script depuis la racine du dépôt (/var/www/alladsmarket)"
    exit 1
fi

VENV_DIR="${PROJECT_ROOT}/.venv"
PYTHON_BIN="${VENV_DIR}/bin/python"
PIP_BIN="${VENV_DIR}/bin/pip"

if [ -d "${VENV_DIR}" ]; then
    echo "[1/6] Environnement virtuel détecté → ${VENV_DIR}"
else
    echo "[1/6] Création de l'environnement virtuel..."
    python3 -m venv "${VENV_DIR}"
    echo "  ✓ venv créé"
fi

echo ""
echo "[2/6] Installation / mise à jour des dépendances Python..."
"${PIP_BIN}" install --upgrade pip setuptools wheel
"${PIP_BIN}" install -r backend/requirements.txt
echo "  ✓ Dépendances Python à jour"

echo ""
echo "[3/6] Migrations & collectstatic..."
"${PYTHON_BIN}" backend/manage.py makemigrations --check --dry-run || true
"${PYTHON_BIN}" backend/manage.py migrate
"${PYTHON_BIN}" backend/manage.py collectstatic --noinput
echo "  ✓ Migrations & fichiers statiques à jour"

echo ""
echo "[4/6] Installation dépendances npm & build frontend..."
if command -v npm >/dev/null 2>&1; then
    npm ci
    npm run build
    echo "  ✓ Build frontend terminé"
else
    echo "  ❌ npm introuvable. Installer Node.js avant de relancer."
    exit 1
fi

echo ""
echo "[5/6] Redémarrage du backend (Gunicorn via PM2)..."
export APP_DIR="${PROJECT_ROOT}"
export VENV_DIR
export GUNICORN_BIN="${PROJECT_ROOT}/.venv/bin/gunicorn"

pm2 delete alladsmarket-backend 2>/dev/null || true
pm2 start ecosystem.config.js --env production --update-env
pm2 save
echo "  ✓ Backend relancé (processus PM2: alladsmarket-backend)"

echo ""
echo "[6/6] Redémarrage de Nginx..."
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
pm2 status alladsmarket-backend
