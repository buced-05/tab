# 🚀 DÉPLOIEMENT COMPLET ALLADSMARKET - VPS

Ce document explique le déploiement complet de l'application AllAdsMarket sur le serveur VPS.

---

## ✅ CE QUI A ÉTÉ CORRIGÉ

- ✅ **Tous les produits ont maintenant des slugs SEO valides** (19 fixes)
- ✅ **Article Repetiteur Pro** : ID unique `trending-043` (doublon corrigé)
- ✅ **Sitemaps régénérés** : 191 produits + 62 articles avec URLs valides
- ✅ **Configuration Nginx** : SSL, SPA routing, sécurité
- ✅ **Build local** : Tout fonctionne à 100%

---

## 📋 ÉTAPES DE DÉPLOIEMENT COMPLET

### 1️⃣ Se connecter au serveur VPS

```bash
ssh root@votre-serveur-ip
```

### 2️⃣ Aller dans le répertoire du projet

```bash
cd /var/www/tab
```

Si le projet n'est pas dans `/var/www/tab`, adapter selon votre installation (ex: `/var/www/alladsmarket`).

### 3️⃣ Récupérer la dernière version

```bash
# Vérifier le statut
git status

# Récupérer les changements
git pull origin main

# Vérifier qu'on a les derniers commits
git log -1 --oneline
# Devrait afficher: "Add: Complete Nginx configuration..."
```

### 4️⃣ Installer les dépendances (si nécessaire)

```bash
# Installer les nouvelles dépendances
npm install
```

### 5️⃣ REBUILD L'APPLICATION (CRITIQUE)

```bash
# Build complet avec génération des sitemaps
npm run build
```

**Cette commande va :**
- ✅ Compiler React en fichiers statiques
- ✅ Générer les sitemaps (27 fichiers)
- ✅ Tout mettre dans le dossier `dist/`

**Vérifier que le build a réussi :**

```bash
# Vérifier que dist/ existe
ls -lah dist/

# Vérifier que index.html existe
ls -lah dist/index.html

# Vérifier que les assets JS existent
ls -lah dist/assets/js/ | head -5

# Vérifier les sitemaps
ls -lah dist/sitemap*.xml | head -5
```

### 6️⃣ Installer la configuration Nginx

```bash
# Rendre le script exécutable
chmod +x install-nginx-config.sh

# Exécuter l'installation
sudo ./install-nginx-config.sh
```

Le script va :
- ✅ Vérifier que `dist/` existe
- ✅ Copier la configuration Nginx
- ✅ Créer le lien symbolique
- ✅ Tester la configuration
- ✅ Redémarrer Nginx

### 7️⃣ Redémarrer PM2 (backend Node.js)

```bash
# Vérifier le statut
pm2 status

# Redémarrer le backend
pm2 restart alladsmarket-backend

# Voir les logs si nécessaire
pm2 logs alladsmarket-backend --lines 50
```

---

## 🧪 VÉRIFICATIONS POST-DÉPLOIEMENT

### Vérifier l'application

```bash
# 1. Test de la page d'accueil
curl -I https://alladsmarket.com

# 2. Test d'une route React
curl -I https://alladsmarket.com/products

# 3. Test d'un article
curl -I https://alladsmarket.com/ai-article/innovation-educative-eleves-ivoiriens-repetiteur-pro

# 4. Test des sitemaps
curl -I https://alladsmarket.com/sitemap.xml
```

### Vérifier les assets JS/CSS

Le problème d'erreur `Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"` devrait être résolu.

**Pour vérifier :**

```bash
# Tester un fichier JS
curl -I https://alladsmarket.com/assets/js/vendor-B1reopnr.js

# Devrait retourner : Content-Type: application/javascript; charset=utf-8
# PAS : Content-Type: text/html
```

### Vérifier Google Search Console

1. Aller sur Google Search Console
2. Soumettre/Re-soumettre le sitemap : `https://alladsmarket.com/sitemap.xml`
3. Attendre quelques heures
4. Vérifier les "Pages découvertes" (devrait être ~478)

---

## 🐛 PROBLÈMES COURANTS & SOLUTIONS

### Erreur : "Expected a JavaScript-or-Wasm module script..."

**Causes possibles :**
1. Le build n'a pas été fait → Solution : `npm run build`
2. Les fichiers dist ne sont pas sur le serveur → Solution : Vérifier `/var/www/tab/dist/`
3. Nginx pointe vers le mauvais chemin → Solution : Vérifier `root` dans la config

**Diagnostic :**

```bash
# Sur le serveur
cd /var/www/tab

# 1. Vérifier que dist existe
ls -lah dist/

# 2. Vérifier les fichiers JS
ls -lah dist/assets/js/ | head -10

# 3. Vérifier la config Nginx
sudo grep "root" /etc/nginx/sites-available/alladsmarket

# Devrait afficher : root /var/www/tab/dist;
```

### Page blanche / 404 sur routes React

**Solution :** La configuration Nginx doit avoir `try_files $uri $uri/ /index.html;`

```bash
# Vérifier
sudo grep -A 2 "location /" /etc/nginx/sites-available/alladsmarket

# Devrait afficher :
# location / {
#     try_files $uri $uri/ /index.html;
# }
```

### Assets non trouvés (404)

**Solution :** Vérifier que Nginx sert bien les fichiers statiques

```bash
# Tester un fichier directement
curl -I https://alladsmarket.com/assets/js/index-DzdSm9iN.js

# Si 404 : Vérifier que le fichier existe
ls -lah /var/www/tab/dist/assets/js/index-DzdSm9iN.js
```

---

## 📊 COMMANDES UTILES

```bash
# Voir l'état général
pm2 status
sudo systemctl status nginx

# Logs en temps réel
pm2 logs
sudo tail -f /var/log/nginx/alladsmarket.error.log

# Vérifier les ports
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Tester la config Nginx
sudo nginx -t

# Redémarrer les services
pm2 restart all
sudo systemctl restart nginx

# Recharger Nginx (sans interruption)
sudo systemctl reload nginx
```

---

## 🎯 CHECKLIST FINALE

- [ ] Git pull réussi
- [ ] Dependencies installées (`npm install`)
- [ ] Build réussi (`npm run build`)
- [ ] `dist/` existe avec tous les fichiers
- [ ] Sitemaps générés (27 fichiers)
- [ ] Configuration Nginx installée
- [ ] Nginx redémarré et actif
- [ ] PM2 redémarré
- [ ] Site accessible HTTPS
- [ ] Routes React fonctionnent
- [ ] Assets JS/CSS chargés
- [ ] Sitemap accessible
- [ ] Aucune erreur MIME type

---

## 🎉 RÉSULTAT ATTENDU

**Une fois tout déployé :**

- ✅ **478+ pages découvertes** par Google
- ✅ **Tous les articles accessibles** (dont Repetiteur Pro)
- ✅ **Tous les produits accessibles** avec slugs SEO
- ✅ **Sitemaps complets** et indexés
- ✅ **Aucune erreur MIME** dans la console
- ✅ **Performance optimale** avec cache et compression

---

**Votre site AllAdsMarket sera 100% fonctionnel et indexable !** 🚀

