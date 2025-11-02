# Déploiement Rapide VPS - AllAdsMarket

## 🚀 Déploiement Automatique en 1 Commande

Sur le VPS, exécutez simplement :

```bash
cd /var/www/tab
bash scripts/vps/git-resolve-conflicts-vps.sh
```

Le script fait automatiquement :
1. ✅ Backup complet
2. ✅ Nettoyage fichiers générés
3. ✅ Pull des dernières modifications
4. ✅ Résolution auto conflits
5. ✅ Build de l'application
6. ✅ Redémarrage services

## 📋 Checklist Manuelle Alternative

Si vous préférez un déploiement manuel :

### 1. Backup et Nettoyage
```bash
cd /var/www/tab

# Backup
sudo mkdir -p /var/backups/alladsmarket/$(date +%Y%m%d)
sudo cp -r dist /var/backups/alladsmarket/$(date +%Y%m%d)/

# Nettoyage
rm -rf dist/
```

### 2. Pull et Résolution Conflits
```bash
# Git setup
git config pull.rebase false

# Pull
git fetch origin
git pull origin main --no-edit

# Si conflits
git status  # Voir les fichiers
# Résoudre les conflits puis :
git add .
git commit -m "Résolution conflits VPS"
```

### 3. Build
```bash
# Install deps si nécessaire
npm install --production

# Build
npm run build
```

### 4. Redémarrage Services
```bash
# PM2
pm2 restart alladsmarket-backend

# Nginx
sudo systemctl restart nginx

# Vérification
pm2 status
sudo nginx -t
```

## 🔍 Vérifications Post-Déploiement

```bash
# Vérifier les services
pm2 logs alladsmarket-backend --lines 50
sudo systemctl status nginx

# Tester le site
curl -I https://alladsmarket.com

# Vérifier les sitemaps
curl https://alladsmarket.com/sitemap.xml
curl https://alladsmarket.com/sitemap-articles.xml
```

## 📊 État Actuel du Projet

### ✅ Complet et Optimisé
- **SEO** : Mots-clés 2025, structure data
- **Sitemaps** : 20 sitemaps multilingues
- **Traductions** : 19 langues
- **Robots.txt** : Optimisé pour tous les crawlers
- **Build** : Production ready

### 📈 Statistiques
- 61 articles IA indexés
- 191 produits multilingues
- 20 langues supportées
- Sitemaps générés : 20 fichiers

## ⚠️ En Cas de Problème

### Rollback
```bash
# Restaurer depuis backup
sudo cp -r /var/backups/alladsmarket/[DATE]/dist/ /var/www/tab/
pm2 restart alladsmarket-backend
```

### Logs
```bash
# PM2
pm2 logs

# Nginx
sudo tail -f /var/log/nginx/error.log

# Build
npm run build 2>&1 | tee build.log
```

## 🔗 Liens Utiles

- Documentation complète : `docs/SEO_TRANSLATIONS_UPDATES_2025.md`
- Script déploiement : `scripts/vps/git-resolve-conflicts-vps.sh`
- Checklist VPS : `docs/VPS_DEPLOYMENT_CHECKLIST.md`

---

**Dernière mise à jour** : 29 Octobre 2025  
**Status** : ✅ Ready for Production

