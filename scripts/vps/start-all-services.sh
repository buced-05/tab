#!/bin/bash

# Script pour démarrer tous les services sur VPS
# Utilise PM2 pour le serveur Node.js et redémarre Nginx

set -e

echo ""
echo "========================================"
echo "Démarrage des Services VPS"
echo "========================================"
echo ""

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: Vous devez être dans le répertoire du projet"
    exit 1
fi

# Étape 1: Rebuild l'application
echo "[1/5] Build de l'application frontend..."
npm run build
echo "  ✓ Build terminé"

# Étape 2: Installer les dépendances serveur si nécessaire
echo ""
echo "[2/5] Vérification des dépendances serveur..."
if [ ! -d "bestserver/node_modules" ]; then
    echo "  Installation des dépendances..."
    cd bestserver
    npm install
    cd ..
    echo "  ✓ Dépendances installées"
else
    echo "  ✓ Dépendances déjà installées"
fi

# Étape 3: Corriger le chemin dans ecosystem.config.js si nécessaire
echo ""
echo "[3/5] Vérification de la configuration PM2..."
CURRENT_DIR=$(pwd)
if [ "$CURRENT_DIR" != "/var/www/alladsmarket" ]; then
    # Le chemin est différent, mettre à jour ecosystem.config.js
    if [ -f "ecosystem.config.js" ]; then
        echo "  Mise à jour du chemin dans ecosystem.config.js..."
        # S'assurer que le chemin est correct (utilise process.env.APP_DIR maintenant)
        export APP_DIR="$CURRENT_DIR"
        echo "  ✓ Chemin configuré: $CURRENT_DIR"
    fi
fi

# Étape 4: Démarrer avec PM2
echo ""
echo "[4/5] Démarrage du serveur avec PM2..."

# Arrêter l'ancien processus si existant
pm2 delete alladsmarket-backend 2>/dev/null || true

# S'assurer qu'on est dans le bon répertoire
if [ ! -f "ecosystem.config.js" ]; then
    echo "  ⚠️ ecosystem.config.js non trouvé dans $(pwd)"
    echo "  Vérification du répertoire parent..."
    if [ -f "../ecosystem.config.js" ]; then
        cd ..
        CURRENT_DIR=$(pwd)
        echo "  ✓ Trouvé dans: $CURRENT_DIR"
    else
        echo "  ❌ ecosystem.config.js non trouvé"
        echo "  Utilisation du démarrage direct..."
        cd bestserver
        APP_DIR="$CURRENT_DIR" pm2 start index.js --name alladsmarket-backend --cwd "$CURRENT_DIR" --env production
        cd ..
        echo "  ✓ Serveur démarré directement"
        pm2 save
        echo "  ✓ Configuration sauvegardée"
        exit 0
    fi
fi

# Démarrer avec ecosystem.config.js
APP_DIR="$CURRENT_DIR" pm2 start ecosystem.config.js --env production --update-env

# Sauvegarder la configuration
pm2 save
echo "  ✓ Serveur démarré avec PM2"

# Étape 5: Redémarrer Nginx
echo ""
echo "[5/5] Redémarrage de Nginx..."
if command -v systemctl &> /dev/null; then
    sudo systemctl restart nginx
    echo "  ✓ Nginx redémarré"
else
    echo "  ⚠️ systemctl non disponible, redémarrez Nginx manuellement"
fi

echo ""
echo "========================================"
echo "✅ Services démarrés avec succès!"
echo "========================================"
echo ""
echo "Statut PM2:"
pm2 status

echo ""
echo "Logs récents (20 dernières lignes):"
pm2 logs alladsmarket-backend --lines 20 --nostream

echo ""
echo "Vérifications:"
echo "  Port 5000:"
sudo netstat -tlnp | grep 5000 || echo "    ⚠️ Port 5000 non détecté"
echo ""
echo "  Nginx:"
sudo systemctl status nginx --no-pager -l | head -5 || echo "    ⚠️ Impossible de vérifier Nginx"
echo ""

