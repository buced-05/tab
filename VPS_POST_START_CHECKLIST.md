# Checklist Post-Démarrage VPS

## ✅ Serveur PM2 Démarré

Votre serveur est maintenant en ligne:
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ bestserver         │ fork     │ 0    │ online    │ 0%       │ 38.1mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

## 🔍 Étapes de Vérification

### 1. Vérifier les Logs

```bash
# Voir les logs du serveur
pm2 logs bestserver --lines 50

# Suivre les logs en temps réel
pm2 logs bestserver --follow
```

### 2. Vérifier que le Port 5000 Écoute

```bash
# Vérifier le port 5000
sudo netstat -tlnp | grep 5000
# ou
sudo ss -tlnp | grep 5000

# Tester l'API
curl http://localhost:5000/api/health
```

### 3. Rebuild l'Application Frontend (si nécessaire)

```bash
cd /var/www/tab
npm run build
```

### 4. Redémarrer Nginx

```bash
sudo systemctl restart nginx
sudo nginx -t  # Vérifier la configuration
```

### 5. Vérifier Nginx

```bash
# Vérifier le statut
sudo systemctl status nginx

# Tester le site
curl -I https://alladsmarket.com
curl -I http://alladsmarket.com  # Devrait rediriger vers HTTPS
```

### 6. Sauvegarder la Configuration PM2

```bash
# Sauvegarder pour redémarrage automatique
pm2 save

# Configurer le démarrage automatique au boot
pm2 startup
# Suivre les instructions affichées
```

## 🚀 Commandes Utiles PM2

```bash
# Statut
pm2 status

# Logs
pm2 logs bestserver
pm2 logs bestserver --lines 100
pm2 logs bestserver --follow

# Redémarrer
pm2 restart bestserver

# Arrêter
pm2 stop bestserver

# Monitoring
pm2 monit

# Informations détaillées
pm2 info bestserver

# Reload (zero downtime)
pm2 reload bestserver
```

## 📋 Commandes Complètes

Exécutez ces commandes dans l'ordre:

```bash
# 1. Voir les logs (vérifier les erreurs)
pm2 logs bestserver --lines 50

# 2. Tester l'API
curl http://localhost:5000/api/health

# 3. Build l'application frontend
cd /var/www/tab
npm run build

# 4. Redémarrer Nginx
sudo systemctl restart nginx

# 5. Sauvegarder PM2
pm2 save

# 6. Tester le site web
curl -I https://alladsmarket.com
```

## ⚠️ Si des Erreurs Apparaissent

### Erreur de connexion MySQL

```bash
# Vérifier que MySQL tourne
sudo systemctl status mysql

# Tester la connexion
mysql -u tab -p -h localhost alladsmarket
# Mot de passe: Newtiv15@t
```

### Erreur de port déjà utilisé

```bash
# Voir qui utilise le port 5000
sudo lsof -i :5000

# Arrêter l'ancien processus si nécessaire
pm2 stop all
pm2 delete all
pm2 start index.js --name bestserver --cwd /var/www/tab --env production
```

### Erreur de permissions

```bash
# Vérifier les permissions
ls -la /var/www/tab/bestserver/index.js

# Si nécessaire, corriger
sudo chown -R www-data:www-data /var/www/tab
```

## ✅ Vérification Finale

```bash
# 1. PM2 Status
pm2 status

# 2. Port 5000
sudo netstat -tlnp | grep 5000

# 3. Nginx Status
sudo systemctl status nginx

# 4. Test API
curl http://localhost:5000/api/health

# 5. Test Site Web
curl -I https://alladsmarket.com
```

