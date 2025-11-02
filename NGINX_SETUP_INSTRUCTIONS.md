# 📋 INSTRUCTIONS D'INSTALLATION NGINX - ALLADSMARKET

Ce document explique comment installer et configurer Nginx pour AllAdsMarket sur votre serveur VPS.

---

## 🎯 OBJECTIF

Configurer Nginx pour servir l'application React avec :
- ✅ HTTP → HTTPS redirection
- ✅ SSL/TLS (Let's Encrypt)
- ✅ React Router SPA support
- ✅ Optimisations de cache
- ✅ Compression Gzip
- ✅ Headers de sécurité

---

## 📁 FICHIERS FOURNIS

- `nginx-alladsmarket-complete.conf` : Configuration Nginx complète
- `install-nginx-config.sh` : Script d'installation automatique
- `nginx.conf` : Configuration existante (référence)

---

## 🚀 INSTALLATION RAPIDE

### Option 1 : Script automatique (Recommandé)

```bash
# 1. Se connecter au serveur VPS
ssh root@votre-serveur

# 2. Aller dans le répertoire du projet
cd /var/www/tab

# 3. Récupérer les fichiers depuis Git
git pull origin main

# 4. Rendre le script exécutable
chmod +x install-nginx-config.sh

# 5. Exécuter l'installation
sudo ./install-nginx-config.sh
```

**Le script fait automatiquement :**
- ✅ Sauvegarde l'ancienne configuration
- ✅ Copie la nouvelle configuration
- ✅ Crée le lien symbolique
- ✅ Teste la configuration
- ✅ Redémarre Nginx

---

### Option 2 : Installation manuelle

```bash
# 1. Se connecter au serveur VPS
ssh root@votre-serveur

# 2. Sauvegarder l'ancienne configuration
sudo cp /etc/nginx/sites-available/alladsmarket /etc/nginx/sites-available/alladsmarket.backup

# 3. Copier la nouvelle configuration
sudo cp nginx-alladsmarket-complete.conf /etc/nginx/sites-available/alladsmarket

# 4. Créer le lien symbolique (si nécessaire)
sudo ln -sf /etc/nginx/sites-available/alladsmarket /etc/nginx/sites-enabled/alladsmarket

# 5. Tester la configuration
sudo nginx -t

# 6. Si le test réussit, redémarrer Nginx
sudo systemctl restart nginx

# 7. Vérifier le statut
sudo systemctl status nginx
```

---

## ⚙️ CONFIGURATION SSL (Let's Encrypt)

Si SSL n'est pas encore configuré, installez Certbot :

```bash
# Installer Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Obtenir le certificat SSL
sudo certbot --nginx -d alladsmarket.com -d www.alladsmarket.com

# Renouvellement automatique
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 🔧 VÉRIFICATIONS POST-INSTALLATION

### 1. Vérifier Nginx
```bash
sudo systemctl status nginx
```

### 2. Vérifier les logs
```bash
# Logs d'accès
sudo tail -f /var/log/nginx/alladsmarket.access.log

# Logs d'erreurs
sudo tail -f /var/log/nginx/alladsmarket.error.log
```

### 3. Tester l'application
```bash
# Test HTTP
curl -I http://alladsmarket.com

# Test HTTPS
curl -I https://alladsmarket.com

# Test redirection (devrait renvoyer 301)
curl -I http://www.alladsmarket.com
```

### 4. Tester une URL React Router
```bash
# Cette URL devrait retourner 200 et index.html
curl -I https://alladsmarket.com/products/test-product
```

---

## 🐛 DÉPANNAGE

### Nginx ne démarre pas

```bash
# Vérifier la configuration
sudo nginx -t

# Voir les erreurs détaillées
sudo journalctl -u nginx -n 50
```

### Erreur 502 Bad Gateway

- **Cause probable** : Le backend Node.js n'est pas démarré
- **Solution** :
```bash
pm2 status
pm2 restart alladsmarket-backend
```

### Erreur SSL

- **Cause probable** : Certificat Let's Encrypt manquant ou expiré
- **Solution** :
```bash
# Renouveler le certificat
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

### Page blanche / 404 sur routes React

- **Cause probable** : `try_files` mal configuré
- **Vérification** :
```bash
grep -A 2 "location /" /etc/nginx/sites-available/alladsmarket
```
- **Devrait afficher** : `try_files $uri $uri/ /index.html;`

### Assets non chargés

- **Cause probable** : Chemin `root` incorrect
- **Vérification** :
```bash
# Le chemin root doit pointer vers /var/www/tab/dist
grep "root" /etc/nginx/sites-available/alladsmarket
```

---

## 📊 STRUCTURE DE CONFIGURATION

```
/etc/nginx/sites-available/alladsmarket  ← Fichier de configuration
/etc/nginx/sites-enabled/alladsmarket    ← Lien symbolique
/var/www/tab/dist                        ← Fichiers à servir
/var/log/nginx/alladsmarket.*.log        ← Logs
```

---

## 🔄 REDÉPLOIEMENT APRÈS BUILD

Après chaque build de l'application :

```bash
# Sur le serveur VPS
cd /var/www/tab

# 1. Pull latest code
git pull origin main

# 2. Installer les dépendances si nécessaire
npm install

# 3. Build l'application
npm run build

# 4. Redémarrer PM2 (backend)
pm2 restart alladsmarket-backend

# 5. Redémarrer Nginx (recharger les fichiers statiques)
sudo systemctl reload nginx
```

---

## ✅ CHECKLIST FINALE

- [ ] Nginx installé et démarré
- [ ] Configuration copiée dans `/etc/nginx/sites-available/alladsmarket`
- [ ] Lien symbolique créé dans `/etc/nginx/sites-enabled/`
- [ ] `nginx -t` retourne "syntax is ok"
- [ ] SSL configuré et actif
- [ ] HTTP redirige vers HTTPS (301)
- [ ] Site accessible sur https://alladsmarket.com
- [ ] Routes React Router fonctionnent (pas de 404)
- [ ] Assets (JS/CSS/images) chargés correctement
- [ ] Sitemaps accessibles sur https://alladsmarket.com/sitemap.xml
- [ ] Logs créés dans `/var/log/nginx/`

---

## 📞 COMMANDES UTILES

```bash
# Voir le statut Nginx
sudo systemctl status nginx

# Redémarrer Nginx
sudo systemctl restart nginx

# Recharger Nginx (sans interruption)
sudo systemctl reload nginx

# Tester la configuration
sudo nginx -t

# Voir les processus Nginx
ps aux | grep nginx

# Voir les ports ouverts
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Voir les logs en temps réel
sudo tail -f /var/log/nginx/alladsmarket.error.log
```

---

**Configuration prête ! Votre site AllAdsMarket devrait maintenant être accessible avec toutes les optimisations.** 🎉

