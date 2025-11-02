# Supprimer dist/ du tracking Git

Si vous avez des erreurs de merge avec `dist/index.html` ou `dist/sitemap.xml`, c'est parce que ces fichiers ont été commités dans Git avant que `dist/` soit ajouté au `.gitignore`.

## Solution Rapide

### Windows (PowerShell ou CMD)
```cmd
git rm -r --cached dist/
git commit -m "Remove dist/ from Git tracking"
```

### Linux/Mac
```bash
git rm -r --cached dist/
git commit -m "Remove dist/ from Git tracking"
```

## Solution Automatique

Utilisez les scripts fournis:

### Windows
```cmd
scripts\git\clean-generated-files.bat
```

### Linux/Mac
```bash
chmod +x scripts/git/clean-generated-files.sh
./scripts/git/clean-generated-files.sh
```

## Prévention - Avant chaque merge/pull

### Option 1: Script manuel
Exécutez le script de nettoyage avant chaque merge/pull:
```bash
./scripts/git/clean-generated-files.sh  # Linux/Mac
scripts\git\clean-generated-files.bat   # Windows
```

### Option 2: Git Hook automatique
Installez le hook pre-merge:
```bash
# Linux/Mac
chmod +x scripts/git/pre-merge-cleanup.sh
cp scripts/git/pre-merge-cleanup.sh .git/hooks/pre-merge

# Windows
copy scripts\git\pre-merge-cleanup.bat .git\hooks\pre-merge.bat
```

## Vérification

Après avoir supprimé les fichiers du cache, vérifiez qu'ils ne sont plus trackés:
```bash
git ls-files dist/
```

Cette commande ne doit rien retourner. Si des fichiers apparaissent, réexécutez:
```bash
git rm -r --cached dist/
```

## Important

⚠️ **NE JAMAIS** commit le dossier `dist/` - tous les fichiers dans `dist/` sont générés automatiquement par `npm run build`

✅ **TOUJOURS** exécuter le script de nettoyage avant un `git pull` ou `git merge`

