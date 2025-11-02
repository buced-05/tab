# Solution Immédiate - PM2 sur VPS

## ❌ Erreur
```
[PM2][ERROR] File ecosystem.config.js not found
```

**Cause:** Vous êtes dans `/var/www/tab/bestserver` mais `ecosystem.config.js` est dans `/var/www/tab`

## ✅ Solution Immédiate

### Option 1: Retourner au répertoire parent (Recommandé)

```bash
# Revenir à la racine du projet
cd /var/www/tab

# Vérifier que ecosystem.config.js existe
ls -la ecosystem.config.js

# Démarrer avec PM2
pm2 start ecosystem.config.js --env production
```

### Option 2: Spécifier le chemin complet

```bash
# Depuis /var/www/tab/bestserver
pm2 start ../ecosystem.config.js --env production
```

### Option 3: Démarrer directement depuis bestserver

```bash
# Depuis /var/www/tab/bestserver
pm2 start index.js --name alladsmarket-backend --cwd /var/www/tab --env production
```

## 🚀 Commande Complète Recommandée

```bash
# Sur votre VPS
cd /var/www/tab

# Rebuild (si nécessaire)
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.js --env production

# Sauvegarder
pm2 save

# Vérifier
pm2 status
pm2 logs alladsmarket-backend --lines 50
```

