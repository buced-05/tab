# 🚀 Guide de Pull sur VPS SANS CONFLITS

## 📋 Vue d'ensemble

Ce guide explique comment effectuer un pull sur le VPS **sans jamais avoir de conflits**.

## ✅ Solution recommandée : `git-pull-no-conflict.sh`

Ce script utilise `git reset --hard origin/main` pour **forcer** la correspondance exacte avec le dépôt distant, éliminant ainsi **tous les risques de conflits**.

### 🎯 Avantages

- ✅ **ZÉRO conflit** - Utilise `reset --hard` pour forcer la synchronisation
- ✅ **Nettoyage automatique** - Supprime tous les fichiers générés (dist/, cache, etc.)
- ✅ **Sauvegarde automatique** - Stash les changements locaux avant le reset
- ✅ **Rebuild automatique** - Reconstruit l'application après le pull
- ✅ **Vérifications** - Vérifie que la synchronisation est réussie

## 📝 Utilisation

### Sur le VPS (recommandé)

```bash
# Se connecter au VPS
ssh root@91.108.120.78

# Aller dans le répertoire du projet
cd /var/www/alladsmarket

# Exécuter le script
bash scripts/vps/git-pull-no-conflict.sh

# OU utiliser npm
npm run git:pull-no-conflict
```

### Depuis Windows (via SSH)

```bash
# Exécuter directement sur le VPS
ssh root@91.108.120.78 "cd /var/www/alladsmarket && bash scripts/vps/git-pull-no-conflict.sh"
```

## 🔧 Ce que fait le script

1. **Nettoyage complet** - Supprime `dist/`, cache, fichiers générés
2. **Sauvegarde** - Stash les changements locaux (si présents)
3. **Fetch** - Récupère les dernières modifications depuis GitHub
4. **Reset hard** - Force la correspondance exacte avec `origin/main`
5. **Vérification** - Vérifie que la synchronisation est réussie
6. **Rebuild** - Reconstruit l'application (npm run build)
7. **Redémarrage** - Redémarre les services si nécessaire

## ⚠️ Important

### Ce script ÉCRASE tous les changements locaux

Sur un VPS de production, c'est **exactement ce qu'on veut** :
- ✅ Le VPS doit toujours correspondre à `origin/main`
- ✅ Aucune modification locale ne doit être conservée
- ✅ Tous les fichiers sont régénérés après le pull

### Si vous avez des modifications locales importantes

1. **Avant le pull**, sauvegardez-les :
   ```bash
   git stash push -m "Ma modification importante"
   ```

2. **Après le pull**, récupérez-les :
   ```bash
   git stash list  # Voir les stashes
   git stash pop   # Récupérer le dernier
   ```

## 🔄 Alternatives

### Script avec merge (peut causer des conflits)

```bash
npm run git:pull-safe
# OU
bash scripts/vps/git-pull-safe.sh
```

### Script avec reset hard (recommandé)

```bash
npm run git:update-vps
# OU
bash scripts/vps/git-update-vps.sh
```

## 📊 Comparaison des scripts

| Script | Stratégie | Conflits possibles | Recommandé pour |
|-------|----------|-------------------|-----------------|
| `git-pull-no-conflict.sh` | `reset --hard` | ❌ **AUCUN** | ✅ **Production VPS** |
| `git-update-vps.sh` | `reset --hard` | ❌ **AUCUN** | ✅ Production VPS |
| `git-pull-safe.sh` | `pull --merge` | ⚠️ **OUI** | Développement |

## 🚨 Résolution de conflits (si nécessaire)

Si vous utilisez `git-pull-safe.sh` et qu'il y a des conflits :

```bash
# Voir les fichiers en conflit
git status

# Utiliser la version distante (recommandé pour VPS)
git checkout --theirs <fichier>

# OU utiliser la version locale
git checkout --ours <fichier>

# Ajouter les fichiers résolus
git add .

# Finaliser
git commit -m "Résolution des conflits"
```

## 🔍 Vérifications après le pull

```bash
# Vérifier le statut
git status

# Vérifier le commit actuel
git log --oneline -1

# Vérifier la branche
git branch --show-current

# Vérifier la synchronisation
git log origin/main..HEAD  # Doit être vide
```

## 📝 Exemple complet

```bash
# 1. Se connecter au VPS
ssh root@91.108.120.78

# 2. Aller dans le projet
cd /var/www/alladsmarket

# 3. Pull sans conflit
npm run git:pull-no-conflict

# 4. Vérifier
git log --oneline -1
pm2 status

# 5. Redémarrer si nécessaire
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

## 🎯 Bonnes pratiques

1. **Toujours utiliser `git-pull-no-conflict.sh` sur le VPS**
2. **Ne jamais modifier directement les fichiers sur le VPS**
3. **Toujours faire les modifications localement, puis push sur GitHub**
4. **Utiliser le script après chaque push sur GitHub**

## ❓ FAQ

### Q: Pourquoi utiliser `reset --hard` au lieu de `pull` ?

**R:** Sur un VPS de production, on veut **toujours** que le code corresponde exactement à `origin/main`. `reset --hard` garantit cela sans conflits.

### Q: Mes modifications locales seront-elles perdues ?

**R:** Oui, mais elles sont sauvegardées dans un stash avant le reset. Utilisez `git stash list` pour les voir.

### Q: Que faire si le build échoue ?

**R:** Vérifiez les logs, corrigez les erreurs, puis relancez `npm run build` manuellement.

### Q: Le script peut-il être exécuté automatiquement (cron) ?

**R:** Oui, mais soyez prudent. Testez d'abord manuellement.

---

**Dernière mise à jour :** 2025-01-XX  
**Script recommandé :** `git-pull-no-conflict.sh`

