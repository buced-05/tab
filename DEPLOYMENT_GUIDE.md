# 🚀 Guide de Déploiement AllAdsMarket.com

## 📋 Configuration du Domaine

### 🌐 Domaine Principal
- **Domaine** : `alladsmarket.com`
- **WWW** : `www.alladsmarket.com`
- **VPS** : `root@91.108.120.78`
- **SSL** : Let's Encrypt (recommandé)

### 🔧 Configuration des DNS

#### 1. Configuration A Record
```
Type: A
Name: @
Value: 91.108.120.78
TTL: 300
```

#### 2. Configuration CNAME pour WWW
```
Type: CNAME
Name: www
Value: alladsmarket.com
TTL: 300
```

#### 3. Configuration CAA (optionnel)
```
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
```

## 🛠️ Configuration du Serveur

### 1. Installation des Prérequis

#### Sur Ubuntu/Debian
```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installation de MySQL
sudo apt install mysql-server -y

# Installation de Nginx
sudo apt install nginx -y

# Installation de PM2
sudo npm install -g pm2
```

### 2. Configuration de MySQL

```bash
# Sécurisation de MySQL
sudo mysql_secure_installation

# Connexion à MySQL
sudo mysql -u root -p

# Exécution du script de configuration
mysql -u root -p < bestserver/scripts/setup-mysql-vps.sql
```

### 3. Configuration SSL avec Let's Encrypt

```bash
# Installation de Certbot
sudo apt install certbot python3-certbot-nginx -y

# Génération du certificat SSL
sudo certbot --nginx -d alladsmarket.com -d www.alladsmarket.com

# Test du renouvellement automatique
sudo certbot renew --dry-run
```

### 4. Configuration de Nginx

```bash
# Copier la configuration
sudo cp nginx.conf /etc/nginx/sites-available/alladsmarket.com

# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/alladsmarket.com /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### 5. Déploiement de l'Application

```bash
# Cloner le repository (si pas déjà fait)
git clone https://github.com/your-username/alladsmarket.git
cd alladsmarket

# Installation des dépendances
npm install
cd bestserver && npm install && cd ..

# Build de l'application
npm run build

# Migration de la base de données
cd bestserver
node scripts/migrate.js migrate
node scripts/import-data.js all

# Démarrage avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔒 Configuration de Sécurité

### 1. Firewall
```bash
# Configuration UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Configuration MySQL
```bash
# Éditer la configuration MySQL
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Ajouter ces lignes :
bind-address = 127.0.0.1
max_connections = 100
innodb_buffer_pool_size = 256M
```

### 3. Configuration PM2
```bash
# Configuration PM2 pour la production
pm2 set pm2:autodump true
pm2 install pm2-logrotate
```

## 📊 Monitoring et Maintenance

### 1. Monitoring des Services
```bash
# Statut des services
pm2 status
sudo systemctl status nginx
sudo systemctl status mysql

# Logs
pm2 logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 2. Sauvegarde de la Base de Données
```bash
# Script de sauvegarde quotidienne
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u tab -p'Newtiv15@t' alladsmarket > /backup/alladsmarket_$DATE.sql
find /backup -name "alladsmarket_*.sql" -mtime +7 -delete
```

### 3. Mise à Jour de l'Application
```bash
# Script de mise à jour
#!/bin/bash
cd /path/to/alladsmarket
git pull origin main
npm install
cd bestserver && npm install && cd ..
npm run build
pm2 restart all
```

## 🌐 Configuration DNS Avancée

### 1. Configuration CDN (Cloudflare)
1. Ajouter le domaine dans Cloudflare
2. Configurer les DNS records
3. Activer SSL/TLS (Full)
4. Activer Always Use HTTPS
5. Configurer Page Rules pour le cache

### 2. Configuration Email
```
Type: MX
Name: @
Value: mail.alladsmarket.com
Priority: 10
```

## 📈 Optimisation des Performances

### 1. Configuration Nginx
- Gzip compression activée
- Cache des fichiers statiques
- HTTP/2 activé
- Headers de sécurité

### 2. Configuration MySQL
- Buffer pool optimisé
- Index sur les colonnes fréquemment utilisées
- Requêtes optimisées

### 3. Configuration PM2
- Clustering activé
- Auto-restart en cas d'erreur
- Monitoring des ressources

## 🔍 Vérification du Déploiement

### 1. Tests de Fonctionnalité
- [ ] Site accessible sur https://alladsmarket.com
- [ ] Redirection HTTPS fonctionnelle
- [ ] Base de données connectée
- [ ] API endpoints fonctionnels
- [ ] SSL certificate valide

### 2. Tests de Performance
- [ ] Temps de chargement < 3 secondes
- [ ] Score Lighthouse > 90
- [ ] Mobile-friendly
- [ ] SEO optimisé

### 3. Tests de Sécurité
- [ ] Headers de sécurité présents
- [ ] SSL/TLS configuré correctement
- [ ] Firewall activé
- [ ] Base de données sécurisée

## 📞 Support et Maintenance

### Commandes Utiles
```bash
# Redémarrer tous les services
pm2 restart all
sudo systemctl restart nginx
sudo systemctl restart mysql

# Vérifier les logs
pm2 logs --lines 100
sudo journalctl -u nginx -f
sudo journalctl -u mysql -f

# Sauvegarder la base de données
mysqldump -u tab -p'Newtiv15@t' alladsmarket > backup.sql

# Restaurer la base de données
mysql -u tab -p'Newtiv15@t' alladsmarket < backup.sql
```

### Monitoring
- **Uptime** : UptimeRobot ou Pingdom
- **Performance** : New Relic ou DataDog
- **Logs** : Logrotate configuré
- **Backups** : Automatiques quotidiens

---

## 🎯 Résumé de la Configuration

- **Domaine** : alladsmarket.com
- **SSL** : Let's Encrypt
- **Serveur** : Nginx + PM2
- **Base de données** : MySQL (utilisateur: tab)
- **Monitoring** : PM2 + Nginx logs
- **Sécurité** : UFW + Headers de sécurité
- **Performance** : Gzip + Cache + HTTP/2
