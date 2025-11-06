# 🔒 Guide de Configuration Nginx BULLETPROOF pour AllAdsMarket

## 🎯 Objectif

Cette configuration garantit que **TOUS les slugs et liens partagés fonctionnent** correctement, sans jamais servir `index.html` pour les fichiers statiques.

---

## 📋 Principes de la Configuration

### 1. **Priorité stricte des locations**

La configuration Nginx utilise une **hiérarchie stricte** :

1. **PRIORITÉ 1** : Fichiers statiques réels (assets JS/CSS/images)
2. **PRIORITÉ 2** : Fichiers spécifiques à la racine
3. **PRIORITÉ 3** : Sitemaps
4. **PRIORITÉ 4** : Dossiers spécifiques (images/)
5. **PRIORITÉ 5** : Routes API
6. **PRIORITÉ 6** : Routes React SPA (dernière priorité)

### 2. **Protection contre les erreurs MIME**

- Les fichiers JS retournent `Content-Type: application/javascript`
- Les fichiers CSS retournent `Content-Type: text/css`
- Les fichiers statiques retournent **404** si non trouvés (PAS index.html)

### 3. **SPA Routing robuste**

- Les routes React (`/products/:slug`, `/ai-article/:slug`) servent `index.html`
- Les fichiers statiques ne servent JAMAIS `index.html`
- Les sitemaps sont accessibles directement

---

## 🔍 Structure Détaillée

### Fichiers Statiques JS

```nginx
location ~* ^/assets/js/.*\.(js|jsx|mjs)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Content-Type "application/javascript; charset=utf-8" always;
    access_log off;
    try_files $uri =404;  # ← 404 si non trouvé, PAS index.html
}
```

**Pourquoi c'est important :**
- Garantit que les fichiers JS sont servis avec le bon MIME type
- Retourne 404 si le fichier n'existe pas (pas de confusion avec index.html)
- Cache optimisé pour les performances

### Routes SPA (React Router)

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Pourquoi c'est important :**
- Toutes les routes React (`/products/my-slug`, `/ai-article/my-article`) fonctionnent
- Les liens partagés fonctionnent même si la page n'existe pas physiquement
- Support du deep linking

---

## ✅ Garanties de cette Configuration

### ✅ **Slugs de produits fonctionnent**

- ✅ `/products/dreamquest-support-windows-computers-bluetooth5-3` → fonctionne
- ✅ `/products/product-12` → fonctionne (fallback)
- ✅ Partagé sur les réseaux sociaux → fonctionne
- ✅ Indexé par Google → fonctionne

### ✅ **Slugs d'articles fonctionnent**

- ✅ `/ai-article/innovation-educative-eleves-ivoiriens-repetiteur-pro` → fonctionne
- ✅ `/article/chatgpt-service-client` → fonctionne
- ✅ Partagé sur les réseaux sociaux → fonctionne
- ✅ Indexé par Google → fonctionne

### ✅ **Fichiers statiques servis correctement**

- ✅ `/assets/js/vendor-B1reopnr.js` → `Content-Type: application/javascript`
- ✅ `/assets/css/index-D5p9idUM.css` → `Content-Type: text/css`
- ✅ Fichier inexistant → 404 (pas index.html)

### ✅ **Sitemaps accessibles**

- ✅ `/sitemap.xml` → accessible
- ✅ `/sitemap-products.xml` → accessible
- ✅ `/sitemap-articles.xml` → accessible
- ✅ Tous les sitemaps → `Content-Type: application/xml`

---

## 🚀 Installation

### 1. Sur le VPS

```bash
cd /var/www/tab
git pull origin main
npm run build
chmod +x install-nginx-config.sh
sudo ./install-nginx-config.sh
```

### 2. Vérification

```bash
# Tester la configuration
sudo nginx -t

# Vérifier le statut
sudo systemctl status nginx

# Tester les URLs
curl -I https://alladsmarket.com/products/dreamquest-support-windows-computers-bluetooth5-3
curl -I https://alladsmarket.com/assets/js/vendor-B1reopnr.js
```

### 3. Tests complets

```bash
chmod +x test-nginx-config.sh
./test-nginx-config.sh
```

---

## 🐛 Dépannage

### Problème : "Failed to load module script: Expected a JavaScript-or-Wasm module script"

**Cause :** Nginx sert `index.html` au lieu du fichier JS.

**Solution :**
1. Vérifier que la configuration est bien déployée :
   ```bash
   sudo cat /etc/nginx/sites-available/alladsmarket | grep "assets/js"
   ```

2. Vérifier que le build est à jour :
   ```bash
   ls -lah /var/www/tab/dist/assets/js/
   ```

3. Recharger Nginx :
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Problème : Les slugs ne fonctionnent pas (404)

**Cause :** La route SPA n'est pas configurée correctement.

**Solution :**
1. Vérifier que la route `/` existe dans la config :
   ```bash
   sudo cat /etc/nginx/sites-available/alladsmarket | grep "location /"
   ```

2. Vérifier que `index.html` existe :
   ```bash
   ls -lah /var/www/tab/dist/index.html
   ```

3. Vérifier les logs :
   ```bash
   sudo tail -50 /var/log/nginx/alladsmarket.error.log
   ```

### Problème : Les sitemaps ne sont pas accessibles

**Cause :** Les sitemaps ne sont pas générés ou pas au bon endroit.

**Solution :**
1. Vérifier que les sitemaps existent :
   ```bash
   ls -lah /var/www/tab/dist/sitemap*.xml
   ```

2. Vérifier la configuration :
   ```bash
   sudo cat /etc/nginx/sites-available/alladsmarket | grep "sitemap"
   ```

3. Régénérer les sitemaps :
   ```bash
   npm run build
   ```

---

## 📊 Vérifications Post-Installation

### Checklist

- [ ] Configuration Nginx valide (`nginx -t`)
- [ ] Nginx actif (`systemctl status nginx`)
- [ ] Page d'accueil accessible
- [ ] Un produit avec slug accessible
- [ ] Un article avec slug accessible
- [ ] Fichiers JS servis avec `Content-Type: application/javascript`
- [ ] Fichiers CSS servis avec `Content-Type: text/css`
- [ ] Sitemaps accessibles
- [ ] Aucune erreur dans les logs

### Commandes de vérification

```bash
# Test rapide
curl -I https://alladsmarket.com
curl -I https://alladsmarket.com/products/dreamquest-support-windows-computers-bluetooth5-3
curl -I https://alladsmarket.com/sitemap.xml

# Test complet
./test-nginx-config.sh

# Logs en temps réel
sudo tail -f /var/log/nginx/alladsmarket.error.log
```

---

## 🔐 Sécurité

### Headers de sécurité

La configuration inclut :
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### Protection des fichiers sensibles

- `.env`, `.git`, `.svn` → bloqués
- Fichiers cachés (`.htaccess`, etc.) → bloqués

---

## 📈 Performance

### Optimisations

- **Cache long** : Assets statiques (1 an)
- **Compression Gzip** : Tous les fichiers texte
- **HTTP/2** : Activé pour HTTPS
- **Pas de cache** : `index.html` (pour les mises à jour)

### Métriques attendues

- **Temps de chargement** : < 2s
- **First Contentful Paint** : < 1s
- **Largest Contentful Paint** : < 2.5s

---

## 🎉 Résultat Final

Avec cette configuration :

✅ **Tous les slugs fonctionnent** (produits et articles)  
✅ **Tous les liens partagés fonctionnent**  
✅ **Aucune erreur MIME type**  
✅ **Sitemaps accessibles**  
✅ **Performance optimale**  
✅ **Sécurité renforcée**  

**Votre site AllAdsMarket est 100% fonctionnel et prêt pour la production !** 🚀

