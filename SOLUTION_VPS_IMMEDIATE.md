# Solution Immédiate pour VPS - Branches Divergentes

## 🚀 Commandes à Exécuter sur VPS

Copiez et exécutez ces commandes **dans l'ordre**:

```bash
# 1. Aller dans le répertoire du projet
cd /var/www/tab

# 2. Nettoyer les fichiers générés
rm -rf dist/
git rm -r --cached dist/ 2>/dev/null || true

# 3. Configurer Git pour utiliser merge
git config pull.rebase false

# 4. Faire le pull avec merge
git pull origin main --no-rebase

# 5. Si conflits, voir les fichiers en conflit
git status
```

## ✅ Si le Pull Réussit

```bash
# Rebuild l'application
npm run build

# Redémarrer les services
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

## ⚠️ Si des Conflits Apparaissent

### Résoudre les conflits manuellement:

```bash
# 1. Voir les fichiers en conflit
git status

# 2. Ouvrir les fichiers et résoudre les conflits
# Chercher les marqueurs: <<<<<<< ======= >>>>>>>

# 3. Après résolution de chaque fichier:
git add <fichier-résolu>

# 4. Finaliser le merge
git commit -m "Résolution des conflits avec origin/main"

# 5. Rebuild et redémarrer
npm run build
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

## 🔄 Alternative: Script Automatique

Utilisez le script sécurisé (si disponible):

```bash
cd /var/www/tab
chmod +x scripts/vps/git-pull-safe.sh
./scripts/vps/git-pull-safe.sh
```

