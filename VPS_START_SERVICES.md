# Guide: Démarrer les Services sur VPS

## ⚠️ Erreur Commune

Si vous voyez:
```
Error: Cannot find module '/var/www/tab/server.js'
```

C'est parce que le serveur Node.js est dans `bestserver/index.js`, pas `server.js`.

## ✅ Solution: Démarrer avec PM2

### 1. Vérifier l'Installation

```bash
# Vérifier que PM2 est installé
pm2 --version

# Si pas installé:
npm install -g pm2
```

### 2. Aller dans le Répertoire du Projet

```bash
cd /var/www/tab
```

### 3. Rebuild l'Application Frontend

```bash
# Build de l'application React
npm run build
```

### 4. Démarrer le Serveur avec PM2

```bash
# Option 1: Démarrer directement
cd bestserver
pm2 start index.js --name alladsmarket-backend --env production

# Option 2: Utiliser ecosystem.config.js (recommandé)
cd /var/www/tab
pm2 start ecosystem.config.js --env production

# Option 3: Si le chemin est différent, spécifier le cwd
pm2 start ecosystem.config.js --env production --update-env
```

### 5. Sauvegarder la Configuration PM2

```bash
# Sauvegarder pour redémarrage automatique
pm2 save

# Configurer le démarrage automatique au boot
pm2 startup
# Suivre les instructions affichées
```

### 6. Redémarrer Nginx

```bash
sudo systemctl restart nginx
# ou
sudo service nginx restart
```

## 🔍 Vérifications

```bash
# Vérifier PM2
pm2 status
pm2 logs alladsmarket-backend --lines 50

# Vérifier Nginx
sudo systemctl status nginx
sudo nginx -t

# Vérifier les ports
sudo netstat -tlnp | grep -E ':(80|443|5000)'

# Tester l'application
curl -I http://localhost:5000
curl -I https://alladsmarket.com
```

## 🚀 Script Complet de Démarrage

```bash
#!/bin/bash
# scripts/vps/start-services.sh

cd /var/www/tab

echo "🔨 Build de l'application..."
npm run build

echo "📦 Installation des dépendances serveur..."
cd bestserver
npm install
cd ..

echo "🚀 Démarrage avec PM2..."
pm2 delete alladsmarket-backend 2>/dev/null || true
pm2 start ecosystem.config.js --env production

echo "💾 Sauvegarde de la configuration PM2..."
pm2 save

echo "🔄 Redémarrage de Nginx..."
sudo systemctl restart nginx

echo "✅ Services démarrés!"
echo ""
echo "Statut PM2:"
pm2 status

echo ""
echo "Logs récents:"
pm2 logs alladsmarket-backend --lines 20 --nostream
```

## 📋 Commandes PM2 Utiles

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs alladsmarket-backend
pm2 logs alladsmarket-backend --lines 100

# Redémarrer
pm2 restart alladsmarket-backend

# Arrêter
pm2 stop alladsmarket-backend

# Supprimer
pm2 delete alladsmarket-backend

# Monitoring
pm2 monit

# Reload (zero downtime)
pm2 reload alladsmarket-backend

# Voir les informations
pm2 info alladsmarket-backend

# List des processus
pm2 list

# Sauvegarder la configuration
pm2 save

# Supprimer la sauvegarde
pm2 unstartup
```

## 🔧 Correction du Chemin dans ecosystem.config.js

Si votre répertoire est `/var/www/tab` au lieu de `/var/www/alladsmarket`, vous devez:

### Option 1: Modifier ecosystem.config.js

```bash
cd /var/www/tab
nano ecosystem.config.js
```

Changez:
```javascript
cwd: '/var/www/alladsmarket',
```

Par:
```javascript
cwd: '/var/www/tab',
```

### Option 2: Utiliser une Variable d'Environnement

Le fichier est déjà configuré pour utiliser `process.env.APP_DIR`:

```bash
export APP_DIR=/var/www/tab
pm2 start ecosystem.config.js --env production
```

## ⚠️ Problèmes Courants

### Problème: PM2 ne trouve pas le script

**Solution:** Utiliser le chemin absolu ou vérifier `cwd` dans ecosystem.config.js

```bash
# Vérifier le chemin
pwd  # Doit afficher /var/www/tab

# Démarrer avec chemin explicite
cd /var/www/tab/bestserver
pm2 start index.js --name alladsmarket-backend
```

### Problème: Port 5000 déjà utilisé

**Solution:** Vérifier et libérer le port

```bash
# Voir qui utilise le port 5000
sudo lsof -i :5000
# ou
sudo netstat -tlnp | grep 5000

# Arrêter l'ancien processus
pm2 stop alladsmarket-backend
pm2 delete alladsmarket-backend

# Redémarrer
pm2 start ecosystem.config.js --env production
```

### Problème: Erreur de connexion à MySQL

**Solution:** Vérifier les variables d'environnement

```bash
# Vérifier que MySQL tourne
sudo systemctl status mysql

# Tester la connexion
mysql -u tab -p -h localhost alladsmarket
# Mot de passe: Newtiv15@t
```

## 📝 Workflow Complet Post-Reset

Après `git reset --hard origin/main`:

```bash
# 1. Aller dans le projet
cd /var/www/tab

# 2. Nettoyer les fichiers générés
rm -rf dist/

# 3. Installer les dépendances (si nécessaire)
npm install
cd bestserver && npm install && cd ..

# 4. Build l'application
npm run build

# 5. Vérifier/corriger ecosystem.config.js
# Le chemin cwd doit être /var/www/tab

# 6. Démarrer avec PM2
pm2 start ecosystem.config.js --env production
pm2 save

# 7. Redémarrer Nginx
sudo systemctl restart nginx

# 8. Vérifier
pm2 status
pm2 logs alladsmarket-backend --lines 50
sudo systemctl status nginx
```

