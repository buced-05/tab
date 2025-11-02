#!/bin/bash

# Script d'installation de la configuration Nginx pour AllAdsMarket
# Usage: ./install-nginx-config.sh

echo "🚀 Installation de la configuration Nginx pour AllAdsMarket"
echo "=============================================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier qu'on est root ou sudo
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}❌ Veuillez exécuter ce script avec sudo${NC}"
    exit 1
fi

# Chemin du fichier de configuration
CONFIG_FILE="nginx-alladsmarket-complete.conf"
NGINX_CONFIG_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
TARGET_FILE="${NGINX_CONFIG_DIR}/alladsmarket"

# Vérifier que le fichier source existe
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}❌ Fichier $CONFIG_FILE non trouvé${NC}"
    echo "Assurez-vous d'être dans le répertoire du projet"
    exit 1
fi

# Sauvegarder la configuration existante si elle existe
if [ -f "$TARGET_FILE" ]; then
    BACKUP_FILE="${TARGET_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${YELLOW}⚠️  Configuration existante trouvée, sauvegarde dans $BACKUP_FILE${NC}"
    cp "$TARGET_FILE" "$BACKUP_FILE"
fi

# Copier la nouvelle configuration
echo -e "${BLUE}📋 Copie de la configuration Nginx...${NC}"
cp "$CONFIG_FILE" "$TARGET_FILE"
echo -e "${GREEN}✅ Configuration copiée vers $TARGET_FILE${NC}"

# Créer le lien symbolique si nécessaire
if [ ! -L "${NGINX_ENABLED_DIR}/alladsmarket" ]; then
    echo -e "${BLUE}🔗 Création du lien symbolique...${NC}"
    ln -s "$TARGET_FILE" "${NGINX_ENABLED_DIR}/alladsmarket"
    echo -e "${GREEN}✅ Lien symbolique créé${NC}"
fi

# Tester la configuration Nginx
echo -e "${BLUE}🧪 Test de la configuration Nginx...${NC}"
if nginx -t; then
    echo -e "${GREEN}✅ Configuration Nginx valide${NC}"
else
    echo -e "${RED}❌ Erreur dans la configuration Nginx${NC}"
    exit 1
fi

# Redémarrer Nginx
echo -e "${BLUE}🔄 Redémarrage de Nginx...${NC}"
systemctl restart nginx

# Vérifier le statut
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx redémarré avec succès${NC}"
else
    echo -e "${RED}❌ Erreur lors du redémarrage de Nginx${NC}"
    exit 1
fi

# Afficher le statut final
echo ""
echo -e "${GREEN}=============================================================="
echo "✅ Configuration Nginx installée avec succès!"
echo "=============================================================="
echo -e "${NC}"
echo "Configuration déployée: $TARGET_FILE"
echo "Lien activé: ${NGINX_ENABLED_DIR}/alladsmarket"
echo ""
echo "Vérifications:"
echo "  - Status Nginx: systemctl status nginx"
echo "  - Logs: tail -f /var/log/nginx/alladsmarket.error.log"
echo "  - Test SSL: curl -I https://alladsmarket.com"
echo ""

