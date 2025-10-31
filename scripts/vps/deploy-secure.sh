#!/bin/bash

# ===========================================
# 🔒 SCRIPT DE DÉPLOIEMENT SÉCURISÉ
# AllAdsMarket - Protection complète
# ===========================================

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VPS_HOST="91.108.120.78"
VPS_USER="root"
DOMAIN="alladsmarket.com"
BACKUP_DIR="/var/backups/alladsmarket"
LOG_FILE="/var/log/alladsmarket-security.log"

# Fonction de logging
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Vérification des prérequis
check_prerequisites() {
    log "🔍 Vérification des prérequis..."
    
    # Vérifier SSH
    if ! command -v ssh &> /dev/null; then
        error "SSH n'est pas installé"
    fi
    
    # Vérifier rsync
    if ! command -v rsync &> /dev/null; then
        error "rsync n'est pas installé"
    fi
    
    # Vérifier la connectivité VPS
    if ! ping -c 1 "$VPS_HOST" &> /dev/null; then
        error "Impossible de joindre le VPS $VPS_HOST"
    fi
    
    success "Prérequis vérifiés"
}

# Configuration du firewall
setup_firewall() {
    log "🔥 Configuration du firewall..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Installer UFW si pas déjà installé
        apt-get update
        apt-get install -y ufw
        
        # Réinitialiser les règles
        ufw --force reset
        
        # Règles par défaut
        ufw default deny incoming
        ufw default allow outgoing
        
        # Autoriser SSH
        ufw allow ssh
        
        # Autoriser HTTP et HTTPS
        ufw allow 80/tcp
        ufw allow 443/tcp
        
        # Autoriser le port de l'API (si différent)
        ufw allow 5000/tcp
        
        # Activer le firewall
        ufw --force enable
        
        # Vérifier le statut
        ufw status verbose
EOF
    
    success "Firewall configuré"
}

# Installation des modules de sécurité Apache
install_apache_security() {
    log "🛡️ Installation des modules de sécurité Apache..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Installer les modules de sécurité
        apt-get install -y apache2-utils libapache2-mod-security2 libapache2-mod-evasive
        
        # Activer les modules
        a2enmod security2
        a2enmod evasive
        a2enmod headers
        a2enmod rewrite
        a2enmod ssl
        
        # Configuration ModSecurity
        cat > /etc/apache2/conf-available/mod-security.conf << 'MODSEC'
# ModSecurity Configuration
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess On
SecResponseBodyMimeType text/plain text/html text/xml application/json
SecRule REQUEST_HEADERS:Content-Type "text/xml" "id:2001,phase:1,pass,t:urlDecodeUni,t:normalizePath,t:lowercase,block,msg:'XML Attack Detected'"
SecRule REQUEST_BODY "@detectSQLi" "id:2002,phase:2,block,msg:'SQL Injection Attack Detected'"
SecRule REQUEST_BODY "@detectXSS" "id:2003,phase:2,block,msg:'XSS Attack Detected'"
MODSEC
        
        # Configuration mod_evasive
        cat > /etc/apache2/conf-available/mod-evasive.conf << 'EVASIVE'
<IfModule mod_evasive.c>
    DOSHashTableSize    2048
    DOSPageCount        20
    DOSSiteCount        50
    DOSPageInterval     1
    DOSSiteInterval     1
    DOSBlockingPeriod   600
    DOSLogDir           /var/log/apache2/evasive
    DOSEmailNotify      admin@alladsmarket.com
</IfModule>
EVASIVE
        
        # Activer les configurations
        a2enconf mod-security
        a2enconf mod-evasive
        
        # Créer le répertoire de logs
        mkdir -p /var/log/apache2/evasive
        chown www-data:www-data /var/log/apache2/evasive
        
        # Redémarrer Apache
        systemctl restart apache2
EOF
    
    success "Modules de sécurité Apache installés"
}

# Configuration SSL sécurisée
setup_ssl_security() {
    log "🔐 Configuration SSL sécurisée..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Installer Certbot si pas déjà installé
        apt-get install -y certbot python3-certbot-apache
        
        # Obtenir le certificat SSL
        certbot --apache -d alladsmarket.com -d www.alladsmarket.com --non-interactive --agree-tos --email admin@alladsmarket.com
        
        # Configuration SSL avancée
        cat > /etc/apache2/conf-available/ssl-security.conf << 'SSL'
# SSL Security Configuration
SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305
SSLHonorCipherOrder on
SSLCompression off
SSLSessionTickets off
SSLOpenSSLConfCmd DHParameters /etc/ssl/certs/dhparam.pem

# HSTS
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# OCSP Stapling
SSLUseStapling on
SSLStaplingCache "shmcb:logs/ssl_stapling(32768)"
SSLStaplingStandardCacheTimeout 3600
SSLStaplingReturnResponderErrors off
SSLStaplingResponderTimeout 5
SSLStaplingResponseMaxAge 86400
SSL

        # Générer les paramètres DH
        openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
        
        # Activer la configuration SSL
        a2enconf ssl-security
        
        # Redémarrer Apache
        systemctl restart apache2
        
        # Configurer le renouvellement automatique
        echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
EOF
    
    success "SSL sécurisé configuré"
}

# Configuration de la base de données sécurisée
setup_database_security() {
    log "🗄️ Configuration de la base de données sécurisée..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Configuration MySQL sécurisée
        mysql -u root -p << 'MYSQL'
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS alladsmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Créer l'utilisateur sécurisé
CREATE USER IF NOT EXISTS 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
CREATE USER IF NOT EXISTS 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';

-- Accorder les privilèges
GRANT SELECT, INSERT, UPDATE, DELETE ON alladsmarket.* TO 'tab'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON alladsmarket.* TO 'tab'@'%';

-- Supprimer les utilisateurs anonymes
DELETE FROM mysql.user WHERE User='';

-- Supprimer les bases de données de test
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

-- Recharger les privilèges
FLUSH PRIVILEGES;
MYSQL

        # Configuration MySQL sécurisée
        cat > /etc/mysql/mysql.conf.d/security.cnf << 'MYSQLSEC'
[mysqld]
# Sécurité générale
local-infile = 0
skip-show-database
skip-networking = 0
bind-address = 0.0.0.0

# Logs de sécurité
log-error = /var/log/mysql/error.log
log-warnings = 2
log-bin = /var/log/mysql/mysql-bin.log
binlog-format = ROW
expire-logs-days = 7

# Limites de connexion
max_connections = 100
max_user_connections = 50
max_connect_errors = 10

# Timeouts
wait_timeout = 600
interactive_timeout = 600
connect_timeout = 10

# Charset sécurisé
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# Moteur de stockage
default-storage-engine = InnoDB

# Configuration InnoDB
innodb_buffer_pool_size = 256M
innodb_log_file_size = 64M
innodb_flush_log_at_trx_commit = 1
innodb_lock_wait_timeout = 50
MYSQLSEC

        # Redémarrer MySQL
        systemctl restart mysql
        
        # Sécuriser l'installation MySQL
        mysql_secure_installation << 'SECURE'
y
Newtiv15@t
Newtiv15@t
y
y
y
y
SECURE
EOF
    
    success "Base de données sécurisée configurée"
}

# Configuration du monitoring de sécurité
setup_security_monitoring() {
    log "📊 Configuration du monitoring de sécurité..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Installer les outils de monitoring
        apt-get install -y fail2ban logwatch rkhunter chkrootkit
        
        # Configuration Fail2ban
        cat > /etc/fail2ban/jail.local << 'FAIL2BAN'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[apache-auth]
enabled = true
port = http,https
logpath = /var/log/apache2/error.log
maxretry = 3

[apache-noscript]
enabled = true
port = http,https
logpath = /var/log/apache2/access.log
maxretry = 3

[apache-overflows]
enabled = true
port = http,https
logpath = /var/log/apache2/error.log
maxretry = 3

[apache-nohome]
enabled = true
port = http,https
logpath = /var/log/apache2/access.log
maxretry = 3

[apache-badbots]
enabled = true
port = http,https
logpath = /var/log/apache2/access.log
maxretry = 3

[apache-fakegooglebot]
enabled = true
port = http,https
logpath = /var/log/apache2/access.log
maxretry = 3

[apache-modsecurity]
enabled = true
port = http,https
logpath = /var/log/apache2/modsec_audit.log
maxretry = 3
FAIL2BAN
        
        # Configuration Logwatch
        cat > /etc/logwatch/conf/logwatch.conf << 'LOGWATCH'
LogDir = /var/log
TmpDir = /var/cache/logwatch
MailTo = admin@alladsmarket.com
MailFrom = logwatch@alladsmarket.com
Detail = Med
Service = All
Format = html
Range = yesterday
LOGWATCH
        
        # Configuration RKHunter
        cat > /etc/rkhunter.conf << 'RKHUNTER'
UPDATE_MIRRORS=1
MIRRORS_MODE=0
WEB_CMD=""
MAIL-ON-WARNING=admin@alladsmarket.com
MAIL-ON-ERROR=admin@alladsmarket.com
RKHUNTER
        
        # Démarrer les services
        systemctl enable fail2ban
        systemctl start fail2ban
        systemctl enable logwatch
        
        # Exécuter les scans de sécurité
        rkhunter --update
        rkhunter --propupd
        chkrootkit
EOF
    
    success "Monitoring de sécurité configuré"
}

# Déploiement de l'application sécurisée
deploy_secure_app() {
    log "🚀 Déploiement de l'application sécurisée..."
    
    # Créer le répertoire de l'application
    ssh "$VPS_USER@$VPS_HOST" "mkdir -p /var/www/alladsmarket"
    
    # Synchroniser les fichiers
    rsync -avz --delete \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude '*.log' \
        ./ "$VPS_USER@$VPS_HOST:/var/www/alladsmarket/"
    
    # Installer les dépendances et démarrer l'application
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        cd /var/www/alladsmarket
        
        # Installer les dépendances
        npm install --production
        
        # Installer PM2 si pas déjà installé
        npm install -g pm2
        
        # Démarrer l'application avec PM2
        pm2 start ecosystem.config.js
        pm2 save
        pm2 startup
        
        # Configurer les permissions
        chown -R www-data:www-data /var/www/alladsmarket
        chmod -R 755 /var/www/alladsmarket
        chmod 600 /var/www/alladsmarket/.env
EOF
    
    success "Application déployée et sécurisée"
}

# Configuration des sauvegardes sécurisées
setup_secure_backups() {
    log "💾 Configuration des sauvegardes sécurisées..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Créer le répertoire de sauvegarde
        mkdir -p "$BACKUP_DIR"
        
        # Script de sauvegarde
        cat > /usr/local/bin/backup-alladsmarket.sh << 'BACKUP'
#!/bin/bash
BACKUP_DIR="/var/backups/alladsmarket"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="alladsmarket_backup_$DATE.tar.gz"

# Sauvegarder la base de données
mysqldump -u tab -p'Newtiv15@t' alladsmarket > "$BACKUP_DIR/database_$DATE.sql"

# Sauvegarder les fichiers de l'application
tar -czf "$BACKUP_DIR/$BACKUP_FILE" /var/www/alladsmarket

# Sauvegarder les configurations
tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" /etc/apache2 /etc/mysql /etc/nginx

# Supprimer les sauvegardes anciennes (plus de 30 jours)
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete
find "$BACKUP_DIR" -name "*.sql" -mtime +30 -delete

# Log de la sauvegarde
echo "$(date): Sauvegarde créée: $BACKUP_FILE" >> /var/log/alladsmarket-backup.log
BACKUP
        
        # Rendre le script exécutable
        chmod +x /usr/local/bin/backup-alladsmarket.sh
        
        # Programmer les sauvegardes quotidiennes
        echo "0 2 * * * /usr/local/bin/backup-alladsmarket.sh" | crontab -
EOF
    
    success "Sauvegardes sécurisées configurées"
}

# Test de sécurité
run_security_tests() {
    log "🧪 Exécution des tests de sécurité..."
    
    ssh "$VPS_USER@$VPS_HOST" << 'EOF'
        # Test de connectivité
        echo "Test de connectivité..."
        curl -I https://alladsmarket.com
        
        # Test SSL
        echo "Test SSL..."
        openssl s_client -connect alladsmarket.com:443 -servername alladsmarket.com < /dev/null
        
        # Test des headers de sécurité
        echo "Test des headers de sécurité..."
        curl -I https://alladsmarket.com | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection|Strict-Transport-Security)"
        
        # Test de la base de données
        echo "Test de la base de données..."
        mysql -u tab -p'Newtiv15@t' -e "SELECT 1;" alladsmarket
        
        # Test des logs de sécurité
        echo "Test des logs de sécurité..."
        tail -n 10 /var/log/apache2/error.log
        tail -n 10 /var/log/mysql/error.log
EOF
    
    success "Tests de sécurité terminés"
}

# Fonction principale
main() {
    log "🔒 Déploiement sécurisé d'AllAdsMarket"
    log "======================================"
    
    check_prerequisites
    setup_firewall
    install_apache_security
    setup_ssl_security
    setup_database_security
    setup_security_monitoring
    deploy_secure_app
    setup_secure_backups
    run_security_tests
    
    log "🎉 Déploiement sécurisé terminé avec succès!"
    log "🌐 Site accessible sur: https://alladsmarket.com"
    log "📊 Monitoring: /var/log/alladsmarket-security.log"
    log "💾 Sauvegardes: $BACKUP_DIR"
}

# Exécuter le script
main "$@"
