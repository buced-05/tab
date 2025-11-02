# Guide: git reset --hard origin/main

## ✅ Solution Utilisée

Vous avez utilisé:
```bash
git config pull.rebase true
git fetch origin
git reset --hard origin/main
```

Cette méthode force votre branche locale à correspondre **exactement** à `origin/main`.

## ⚠️ Attention

**`git reset --hard` supprime tous vos changements locaux non commités.**

- ✅ Tous les fichiers locaux sont écrasés
- ✅ Votre branche correspond exactement à `origin/main`
- ⚠️ **Perte de tous les changements non commités**

## 📋 Étapes Post-Reset

Après `git reset --hard`, vous devez:

### 1. Vérifier l'état
```bash
git status
git log --oneline -5
```

### 2. Nettoyer les fichiers générés (si nécessaire)
```bash
rm -rf dist/
npm run git:clean 2>/dev/null || true
```

### 3. Rebuild l'application
```bash
npm run build
```

### 4. Redémarrer les services
```bash
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

### 5. Vérifier que tout fonctionne
```bash
pm2 status
sudo systemctl status nginx
curl -I https://alladsmarket.com
```

## 🎯 Quand Utiliser reset --hard

### ✅ Recommandé pour:
- VPS de production (comme votre cas)
- Environnement où on veut juste suivre la branche principale
- Quand vous n'avez pas de changements locaux importants
- Après avoir sauvegardé vos changements (git stash)

### ⚠️ Éviter si:
- Vous avez des changements locaux non sauvegardés
- Vous travaillez sur une fonctionnalité en cours
- Vous avez des fichiers de configuration locaux importants

## 🔄 Alternative: Sauvegarder d'abord

Si vous avez des changements locaux importants:

```bash
# Sauvegarder vos changements
git stash push -m "Sauvegarde avant reset"

# Faire le reset
git reset --hard origin/main

# Restaurer vos changements si nécessaire
git stash pop
```

## 📝 Workflow Complet pour VPS

```bash
# 1. Aller dans le projet
cd /var/www/tab

# 2. Sauvegarder (optionnel, si vous avez des changements)
git stash push -m "Sauvegarde avant update"

# 3. Nettoyer les fichiers générés
rm -rf dist/
git rm -r --cached dist/ 2>/dev/null || true

# 4. Récupérer les changements
git fetch origin

# 5. Reset hard (correspond exactement à origin/main)
git reset --hard origin/main

# 6. Rebuild
npm run build

# 7. Redémarrer les services
pm2 restart alladsmarket-backend
sudo systemctl restart nginx

# 8. Vérifier
pm2 status
sudo systemctl status nginx
```

## 🔍 Différence avec git pull --rebase

| Commande | Résultat |
|----------|----------|
| `git pull --rebase` | Réapplique vos commits locaux par-dessus origin/main |
| `git reset --hard origin/main` | Écrase tout pour correspondre exactement à origin/main |

## ✅ Avantages de reset --hard sur VPS

1. **Simplicité**: Pas de conflits à résoudre
2. **Propreté**: Branche locale identique à la branche distante
3. **Rapidité**: Pas besoin de gérer les merges
4. **Sécurité**: Sur production, on veut juste suivre la branche principale

## 🛠️ Script Automatique pour VPS

```bash
#!/bin/bash
# scripts/vps/git-reset-hard.sh

cd /var/www/tab

echo "🧹 Nettoyage des fichiers générés..."
rm -rf dist/
git rm -r --cached dist/ 2>/dev/null || true

echo "📥 Récupération des changements..."
git fetch origin

echo "🔄 Reset hard vers origin/main..."
git reset --hard origin/main

echo "🔨 Build de l'application..."
npm run build

echo "🔄 Redémarrage des services..."
pm2 restart alladsmarket-backend
sudo systemctl restart nginx

echo "✅ Mise à jour terminée!"
pm2 status
```

