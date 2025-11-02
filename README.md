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
npm run git:clean
git pull
```

Voir [GIT_MERGE_GUIDE.md](GIT_MERGE_GUIDE.md) pour plus de détails.
