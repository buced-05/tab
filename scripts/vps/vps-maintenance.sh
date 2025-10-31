#!/bin/bash

# 🛠️ Script de Maintenance VPS AllAdsMarket
# VPS: root@91.108.120.78
# Domaine: alladsmarket.com

echo "🛠️ Maintenance VPS AllAdsMarket"
echo "==============================="
echo "VPS: root@91.108.120.78"
echo "Domaine: alladsmarket.com"
echo ""

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration VPS
VPS_HOST="91.108.120.78"
VPS_USER="root"
VPS_DOMAIN="alladsmarket.com"
APP_DIR="/var/www/alladsmarket"

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Menu de maintenance
show_menu() {
    echo "Choisissez une option de maintenance:"
    echo "1. Vérifier le statut des services"
    echo "2. Redémarrer l'application"
    echo "3. Vérifier les logs"
    echo "4. Mettre à jour l'application"
    echo "5. Sauvegarder la base de données"
    echo "6. Vérifier l'espace disque"
    echo "7. Vérifier les certificats SSL"
    echo "8. Optimiser les performances"
    echo "9. Surveillance complète"
    echo "0. Quitter"
    echo ""
    read -p "Votre choix (0-9): " choice
}

# 1. Vérifier le statut des services
check_services() {
    print_status "Vérification du statut des services..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
echo "=== Statut des services ==="
echo "Nginx:"
systemctl status nginx --no-pager -l
echo ""
echo "MySQL:"
systemctl status mysql --no-pager -l
echo ""
echo "PM2:"
pm2 status
echo ""
echo "Ports ouverts:"
netstat -tlnp | grep -E ':(80|443|5000|3306)'
EOF
}

# 2. Redémarrer l'application
restart_app() {
    print_status "Redémarrage de l'application..."
    ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR
pm2 restart all
pm2 save
echo "✅ Application redémarrée"
EOF
}

# 3. Vérifier les logs
check_logs() {
    print_status "Vérification des logs..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
echo "=== Logs Nginx (dernières 20 lignes) ==="
tail -20 /var/log/nginx/access.log
echo ""
echo "=== Logs d'erreur Nginx (dernières 20 lignes) ==="
tail -20 /var/log/nginx/error.log
echo ""
echo "=== Logs PM2 (dernières 20 lignes) ==="
pm2 logs --lines 20
EOF
}

# 4. Mettre à jour l'application
update_app() {
    print_status "Mise à jour de l'application..."
    ssh $VPS_USER@$VPS_HOST << EOF
cd $APP_DIR

# Sauvegarder avant mise à jour
cp -r bestserver bestserver.backup.\$(date +%Y%m%d_%H%M%S)

# Mise à jour du code (si git est configuré)
# git pull origin main

# Mise à jour des dépendances
npm install
cd bestserver && npm install && cd ..

# Build de l'application
npm run build

# Redémarrage
pm2 restart all

echo "✅ Application mise à jour"
EOF
}

# 5. Sauvegarder la base de données
backup_database() {
    print_status "Sauvegarde de la base de données..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
BACKUP_DIR="/var/backups/alladsmarket"
mkdir -p $BACKUP_DIR

# Sauvegarde de la base de données
mysqldump -u tab -p'Newtiv15@t' alladsmarket > $BACKUP_DIR/alladsmarket_$(date +%Y%m%d_%H%M%S).sql

# Compression
gzip $BACKUP_DIR/alladsmarket_$(date +%Y%m%d_%H%M%S).sql

# Nettoyage des anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "alladsmarket_*.sql.gz" -mtime +7 -delete

echo "✅ Base de données sauvegardée"
ls -la $BACKUP_DIR/
EOF
}

# 6. Vérifier l'espace disque
check_disk_space() {
    print_status "Vérification de l'espace disque..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
echo "=== Espace disque ==="
df -h
echo ""
echo "=== Top 10 des plus gros répertoires ==="
du -h /var/www/alladsmarket | sort -hr | head -10
echo ""
echo "=== Logs volumineux ==="
du -h /var/log/nginx/ | sort -hr | head -5
EOF
}

# 7. Vérifier les certificats SSL
check_ssl() {
    print_status "Vérification des certificats SSL..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
echo "=== Certificats SSL ==="
certbot certificates
echo ""
echo "=== Test de renouvellement ==="
certbot renew --dry-run
echo ""
echo "=== Vérification SSL ==="
openssl s_client -connect alladsmarket.com:443 -servername alladsmarket.com < /dev/null 2>/dev/null | openssl x509 -noout -dates
EOF
}

# 8. Optimiser les performances
optimize_performance() {
    print_status "Optimisation des performances..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
# Optimisation MySQL
mysql -u root << 'MYSQL_EOF'
SET GLOBAL innodb_buffer_pool_size = 256M;
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 32M;
MYSQL_EOF

# Nettoyage des logs
find /var/log -name "*.log" -mtime +7 -delete

# Optimisation Nginx
nginx -t && systemctl reload nginx

echo "✅ Performances optimisées"
EOF
}

# 9. Surveillance complète
full_monitoring() {
    print_status "Surveillance complète..."
    ssh $VPS_USER@$VPS_HOST << 'EOF'
echo "=== Surveillance complète AllAdsMarket ==="
echo "Date: $(date)"
echo ""

echo "=== Uptime ==="
uptime
echo ""

echo "=== Mémoire ==="
free -h
echo ""

echo "=== CPU ==="
top -bn1 | grep "Cpu(s)"
echo ""

echo "=== Services ==="
systemctl is-active nginx mysql
pm2 status
echo ""

echo "=== Connexions actives ==="
netstat -an | grep -E ':(80|443|5000|3306)' | wc -l
echo ""

echo "=== Espace disque ==="
df -h | grep -E '(/$|/var)'
echo ""

echo "=== Certificats SSL ==="
certbot certificates | grep -E "(Certificate Name|Expiry Date)"
echo ""

echo "=== Base de données ==="
mysql -u tab -p'Newtiv15@t' -e "SELECT COUNT(*) as products FROM alladsmarket.products; SELECT COUNT(*) as articles FROM alladsmarket.articles;"
EOF
}

# Menu principal
while true; do
    show_menu
    case $choice in
        1) check_services ;;
        2) restart_app ;;
        3) check_logs ;;
        4) update_app ;;
        5) backup_database ;;
        6) check_disk_space ;;
        7) check_ssl ;;
        8) optimize_performance ;;
        9) full_monitoring ;;
        0) 
            print_success "Maintenance terminée"
            exit 0
            ;;
        *)
            print_error "Choix invalide"
            ;;
    esac
    echo ""
    read -p "Appuyez sur Entrée pour continuer..."
    echo ""
done
