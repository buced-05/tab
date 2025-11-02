# Guide: Éviter les Erreurs de Merge avec dist/

## ⚠️ Problème

Si vous voyez cette erreur lors d'un `git pull` ou `git merge`:
```
error: Your local changes to the following files would be overwritten by merge:
        dist/index.html
        dist/sitemap.xml
```

C'est parce que des fichiers générés dans `dist/` ont été commités dans Git avant que `dist/` soit ajouté au `.gitignore`.

## ✅ Solution Immédiate

### Option 1: Script Automatique (Recommandé)

#### Windows
```cmd
npm run git:clean
```

#### Linux/Mac
```bash
npm run git:clean
```

### Option 2: Script Manuel

#### Windows
```cmd
scripts\git\clean-generated-files.bat
```

#### Linux/Mac
```bash
chmod +x scripts/git/clean-generated-files.sh
./scripts/git/clean-generated-files.sh
```

### Option 3: Commandes Git Directes

```bash
# Supprimer dist/ du tracking Git (mais garder les fichiers locaux)
git rm -r --cached dist/

# Supprimer physiquement le dossier dist/
rm -rf dist/  # Linux/Mac
rmdir /s /q dist  # Windows

# Maintenant vous pouvez faire le merge/pull
git pull
# ou
git merge
```

## 🔄 Prévention - Avant Chaque Merge/Pull

### Méthode 1: Script NPM (Recommandé)
```bash
# Avant chaque pull/merge
npm run git:clean
git pull
```

### Méthode 2: Git Hooks (Automatique)

Installez le hook pre-merge pour nettoyer automatiquement:

#### Windows
```cmd
copy scripts\git\pre-merge-cleanup.bat .git\hooks\pre-merge.bat
```

#### Linux/Mac
```bash
chmod +x scripts/git/pre-merge-cleanup.sh
cp scripts/git/pre-merge-cleanup.sh .git/hooks/pre-merge
chmod +x .git/hooks/pre-merge
```

Maintenant, le nettoyage se fera automatiquement avant chaque merge!

## 📋 Checklist Avant Pull/Merge

- [ ] Exécuter `npm run git:clean`
- [ ] Vérifier que `dist/` n'est pas tracké: `git ls-files dist/` (ne doit rien retourner)
- [ ] Vérifier que `dist/` est dans `.gitignore`
- [ ] Exécuter `git pull` ou `git merge`

## 🛠️ Vérification Post-Cleanup

Vérifiez que les fichiers ne sont plus trackés:
```bash
git ls-files dist/
```

Cette commande ne doit rien retourner. Si des fichiers apparaissent, réexécutez:
```bash
git rm -r --cached dist/
```

## ⚠️ Important

**NE JAMAIS** commit le dossier `dist/` - tous les fichiers dans `dist/` sont générés automatiquement par `npm run build`

**TOUJOURS** exécuter `npm run git:clean` avant un `git pull` ou `git merge`

**REMEMBER**: Le dossier `dist/` est généré à chaque build, il ne doit pas être versionné dans Git

## 🔍 Pourquoi ce Problème Arrive?

Le dossier `dist/` contient des fichiers générés automatiquement:
- `dist/index.html` - généré par Vite
- `dist/sitemap*.xml` - générés par `npm run generate-sitemaps`
- `dist/assets/*` - fichiers JS/CSS compilés avec hash

Ces fichiers changent à chaque build et causent des conflits inutiles lors des merges.

## 📝 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run git:clean` | Nettoie automatiquement les fichiers générés |
| `npm run git:pre-merge` | Alias pour `git:clean` |
| `npm run prepull` | Alias pour `git:clean` |
| `npm run premerge` | Alias pour `git:clean` |

## 🚀 Workflow Recommandé

```bash
# 1. Nettoyer les fichiers générés
npm run git:clean

# 2. Faire le pull/merge
git pull origin main

# 3. Rebuild si nécessaire
npm run build

# 4. Continuer votre travail
npm run dev
```

## 🔗 Fichiers Créés

- `scripts/git/clean-generated-files.js` - Script Node.js principal
- `scripts/git/clean-generated-files.sh` - Script Bash pour Linux/Mac
- `scripts/git/clean-generated-files.bat` - Script Batch pour Windows
- `scripts/git/pre-merge-cleanup.sh` - Hook Git pour Linux/Mac
- `scripts/git/pre-merge-cleanup.bat` - Hook Git pour Windows
- `scripts/git/remove-dist-from-git.md` - Documentation détaillée

