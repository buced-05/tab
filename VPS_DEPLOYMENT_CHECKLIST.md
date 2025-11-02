# Checklist de Déploiement VPS - Éviter les Conflits

## ✅ Avant le Déploiement

### 1. Configuration Environnement
- [ ] Créer `.env.production` sur le VPS avec les variables d'environnement correctes
- [ ] Vérifier que `NODE_ENV=production` est défini
- [ ] Vérifier les credentials de base de données
- [ ] Vérifier que `CORS_ORIGIN` pointe vers le domaine de production

### 2. Configuration Nginx
- [ ] Vérifier que `root /var/www/alladsmarket/dist;` pointe vers le bon répertoire
- [ ] Vérifier que le port backend (5000) est correct dans la configuration
- [ ] Vérifier que les certificats SSL sont à jour
- [ ] Tester la configuration: `nginx -t`

### 3. Configuration PM2
- [ ] Vérifier `ecosystem.config.js` avec les bonnes variables
- [ ] Vérifier que le chemin `cwd` est correct
- [ ] Vérifier que le script pointe vers `bestserver/index.js`

### 4. Build de l'Application
- [ ] Exécuter `npm run build` localement pour tester
- [ ] Vérifier que le dossier `dist/` est généré correctement
- [ ] Vérifier que tous les fichiers statiques sont présents

## 🔧 Configuration VPS

### 1. Structure de Répertoires
```
/var/www/alladsmarket/
├── dist/              # Fichiers build (servis par Nginx)
├── bestserver/        # Code serveur Node.js
├── node_modules/      # Dépendances
└── ecosystem.config.js
```

### 2. Permissions
```bash
sudo chown -R www-data:www-data /var/www/alladsmarket/dist
sudo chmod -R 755 /var/www/alladsmarket/dist
```

### 3. Variables d'Environnement Production
Créer `/var/www/alladsmarket/bestserver/.env.production`:
```env
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_USER=tab
DB_PASSWORD=Newtiv15@t
DB_NAME=alladsmarket
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://alladsmarket.com
```

## 🚀 Déploiement

### 1. Build sur VPS
```bash
cd /var/www/alladsmarket
npm run build
```

### 2. Redémarrer Services
```bash
# Redémarrer Nginx
sudo systemctl restart nginx

# Redémarrer PM2
pm2 restart alladsmarket-backend
# ou
pm2 reload ecosystem.config.js
```

### 3. Vérifications Post-Déploiement
```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier PM2
pm2 status
pm2 logs alladsmarket-backend --lines 50

# Vérifier les ports
sudo netstat -tlnp | grep -E ':(80|443|5000|3306)'

# Vérifier les fichiers statiques
curl -I https://alladsmarket.com/assets/js/index-*.js
curl -I https://alladsmarket.com/assets/css/index-*.css
```

## ⚠️ Points d'Attention - Éviter les Conflits

### 1. Conflits de Ports
- ✅ Backend Node.js: port 5000 (en production)
- ✅ Nginx: ports 80 (HTTP) et 443 (HTTPS)
- ✅ MySQL: port 3306 (localhost uniquement)
- ⚠️ Ne pas utiliser le port 3000 en production (réservé pour dev)

### 2. Conflits de Cache
- ✅ Nginx sert les fichiers statiques directement (plus rapide)
- ✅ Cache long (1 an) pour assets avec hash
- ✅ Pas de cache pour `index.html`
- ⚠️ Vider le cache navigateur après déploiement

### 3. Conflits CORS
- ✅ CORS strict en production (uniquement alladsmarket.com)
- ✅ CORS permissif en développement (localhost)
- ⚠️ Vérifier que les headers sont corrects

### 4. Conflits CSP (Content Security Policy)
- ✅ CSP autorise Google Analytics et Tag Manager
- ✅ CSP autorise les endpoints de collecte GA4
- ⚠️ Vérifier dans la console navigateur qu'il n'y a pas d'erreurs CSP

### 5. Conflits de Chemins
- ✅ Nginx root: `/var/www/alladsmarket/dist`
- ✅ PM2 cwd: `/var/www/alladsmarket`
- ✅ Script serveur: `bestserver/index.js`
- ⚠️ Vérifier les chemins absolus dans les scripts

### 6. Conflits de Variables d'Environnement
- ✅ `.env.production` sur le VPS (ne jamais commit dans git)
- ✅ `NODE_ENV=production` obligatoire
- ⚠️ Ne pas utiliser `.env` local en production

## 🔍 Dépannage

### Problème: 502 Bad Gateway
```bash
# Vérifier que le serveur Node.js tourne
pm2 status

# Vérifier les logs
pm2 logs alladsmarket-backend

# Vérifier que le port 5000 écoute
sudo netstat -tlnp | grep 5000
```

### Problème: Fichiers statiques 404
```bash
# Vérifier que dist/ existe et contient les fichiers
ls -la /var/www/alladsmarket/dist/

# Vérifier les permissions
sudo chown -R www-data:www-data /var/www/alladsmarket/dist
```

### Problème: Erreurs CORS
```bash
# Vérifier les variables d'environnement
cat /var/www/alladsmarket/bestserver/.env.production | grep CORS

# Vérifier les logs
pm2 logs alladsmarket-backend | grep CORS
```

### Problème: Erreurs CSP dans la console
- Vérifier que `nginx.conf` contient tous les domaines nécessaires
- Vérifier que Google Analytics endpoints sont autorisés
- Redémarrer Nginx: `sudo systemctl restart nginx`

## 📝 Notes Importantes

1. **NE JAMAIS** commit les fichiers `.env.production` dans git
2. **TOUJOURS** tester localement avec `NODE_ENV=production` avant de déployer
3. **VÉRIFIER** que le build fonctionne avant de déployer
4. **SAUVEGARDER** la configuration avant de modifier
5. **MONITORER** les logs après déploiement pendant 24h

