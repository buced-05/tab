# AllAdsMarket

For full documentation, guides, and production notes, see:

- DOCS.md (single consolidated documentation file)
- VPS_DEPLOYMENT_CHECKLIST.md (checklist de déploiement VPS)
- GIT_MERGE_GUIDE.md (éviter les conflits Git avec dist/)

## 🚀 Quick Start

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Nettoyer avant merge/pull (IMPORTANT!)
npm run git:clean
```

## ⚠️ Important: Avant chaque Git Pull/Merge

Pour éviter les conflits avec `dist/index.html` et `dist/sitemap.xml`:

```bash
# Méthode simple
npm run git:clean
git pull

# Méthode sécurisée (recommandée pour VPS)
npm run git:pull-safe
```

### Si vous avez des branches divergentes:

#### Option 1: Merge (préserve l'historique)
```bash
git config pull.rebase false
git pull origin main --no-rebase
```

#### Option 2: Reset Hard (recommandé pour VPS - écrase les changements locaux)
```bash
git fetch origin
git reset --hard origin/main
npm run build
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

#### Option 3: Script Automatique (VPS)
```bash
npm run git:update-vps
```

Voir [GIT_MERGE_GUIDE.md](GIT_MERGE_GUIDE.md) et [GIT_DIVERGENT_BRANCHES_GUIDE.md](GIT_DIVERGENT_BRANCHES_GUIDE.md) pour plus de détails.
