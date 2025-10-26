@echo off
echo 🚀 Déploiement AllAdsMarket sur VPS
echo ====================================
echo VPS: root@91.108.120.78
echo Domaine: alladsmarket.com
echo.

echo 📋 Vérification des prérequis...
echo.

echo 🔍 Vérification de SSH...
ssh -o ConnectTimeout=10 -o BatchMode=yes root@91.108.120.78 "echo 'SSH connection successful'" 2>nul
if %errorlevel% neq 0 (
    echo ❌ Impossible de se connecter au VPS
    echo 💡 Vérifiez que:
    echo   1. L'adresse IP est correcte: 91.108.120.78
    echo   2. SSH est activé sur le VPS
    echo   3. Votre clé SSH est configurée
    pause
    exit /b 1
)
echo ✅ Connexion SSH réussie

echo.
echo 🚀 Démarrage du déploiement...
echo.

echo 📤 Upload des fichiers...
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'dist' ./ root@91.108.120.78:/var/www/alladsmarket/

echo.
echo 🔧 Configuration du serveur...
ssh root@91.108.120.78 << 'EOF'
# Mise à jour du système
apt update && apt upgrade -y

# Installation des prérequis
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs mysql-server nginx pm2 certbot python3-certbot-nginx

# Démarrage des services
systemctl start mysql nginx
systemctl enable mysql nginx

# Configuration MySQL
mysql_secure_installation << 'MYSQL_EOF'
n
n
n
n
n
n
MYSQL_EOF

# Création de la base de données
mysql -u root << 'MYSQL_EOF'
CREATE DATABASE IF NOT EXISTS alladsmarket CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';
CREATE USER IF NOT EXISTS 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';
FLUSH PRIVILEGES;
MYSQL_EOF

# Installation des dépendances
cd /var/www/alladsmarket
npm install
cd bestserver && npm install && cd ..

# Migration de la base de données
cd bestserver
node scripts/migrate.js migrate
node scripts/import-data.js all
cd ..

# Build de l'application
npm run build

# Configuration Nginx
cp nginx.conf /etc/nginx/sites-available/alladsmarket.com
ln -sf /etc/nginx/sites-available/alladsmarket.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx

# Configuration SSL
certbot --nginx -d alladsmarket.com -d www.alladsmarket.com --non-interactive --agree-tos --email admin@alladsmarket.com

# Configuration PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configuration du firewall
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 5000/tcp
ufw --force enable

echo ✅ Déploiement terminé
EOF

echo.
echo ✅ Déploiement terminé avec succès !
echo.
echo 🌐 Application accessible sur:
echo   Frontend: https://alladsmarket.com
echo   Backend: https://alladsmarket.com:5000
echo   Admin: https://alladsmarket.com/admin
echo.
echo 📊 Commandes utiles:
echo   ssh root@91.108.120.78
echo   pm2 status
echo   pm2 logs
echo.
pause
