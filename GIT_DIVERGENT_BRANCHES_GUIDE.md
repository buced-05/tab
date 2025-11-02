# Guide: Résoudre les Branches Divergentes Git

## ⚠️ Problème

Vous voyez cette erreur:
```
hint: You have divergent branches and need to specify how to reconcile them.
fatal: Need to specify how to reconcile divergent branches.
```

Cela signifie que votre branche locale et la branche distante (`origin/main`) ont des commits différents.

## ✅ Solutions

### Solution 1: Merge (Recommandé pour la plupart des cas)

```bash
# Configurer Git pour utiliser merge par défaut
git config pull.rebase false

# Faire le pull avec merge
git pull origin main

# Ou directement
git pull origin main --no-rebase
```

**Avantages:**
- Préserve l'historique complet
- Facile à comprendre
- Pas de réécriture d'historique

### Solution 2: Rebase (Pour un historique linéaire)

```bash
# Configurer Git pour utiliser rebase par défaut
git config pull.rebase true

# Faire le pull avec rebase
git pull origin main

# Ou directement
git pull origin main --rebase
```

**Avantages:**
- Historique linéaire et propre
- Pas de commits de merge inutiles

**⚠️ Attention:** Ne pas rebaser sur des branches partagées si d'autres personnes travaillent dessus

### Solution 3: Fast-Forward Only (Plus sûr mais peut échouer)

```bash
# Configurer Git pour n'accepter que fast-forward
git config pull.ff only

# Faire le pull
git pull origin main
```

**Avantages:**
- Force un historique propre
- Pas de merge/rebase inattendu

**⚠️ Attention:** Échouera si les branches ont divergé

## 🚀 Solution Recommandée pour VPS

Pour votre VPS, je recommande **merge** car c'est le plus sûr:

```bash
# Sur le VPS
cd /var/www/tab

# 1. Nettoyer les fichiers générés (si le script existe)
npm run git:clean 2>/dev/null || true

# 2. Configurer pour merge
git config pull.rebase false

# 3. Récupérer les changements
git fetch origin

# 4. Faire le merge
git pull origin main --no-rebase

# 5. Si conflits, résoudre puis:
git add .
git commit -m "Merge origin/main"
```

## 🔄 Workflow Complet pour VPS

### Étape 1: Sauvegarder vos changements locaux (si nécessaire)

```bash
# Voir vos changements locaux
git status

# Sauvegarder vos changements locaux dans un stash
git stash

# Ou créer une branche de sauvegarde
git branch backup-$(date +%Y%m%d-%H%M%S)
```

### Étape 2: Nettoyer les fichiers générés

```bash
# Supprimer dist/ si présent
rm -rf dist/

# Supprimer du cache Git si tracké
git rm -r --cached dist/ 2>/dev/null || true
```

### Étape 3: Faire le pull avec merge

```bash
# Configurer merge comme stratégie par défaut
git config pull.rebase false

# Faire le pull
git pull origin main --no-rebase
```

### Étape 4: Résoudre les conflits (si nécessaire)

Si des conflits apparaissent:

```bash
# Voir les fichiers en conflit
git status

# Ouvrir les fichiers et résoudre les conflits manuellement
# Chercher les marqueurs: <<<<<<< ======= >>>>>>>

# Après résolution
git add .
git commit -m "Résolution des conflits avec origin/main"
```

### Étape 5: Rebuild si nécessaire

```bash
# Rebuild après le merge
npm run build

# Redémarrer les services
pm2 restart alladsmarket-backend
sudo systemctl restart nginx
```

## 📋 Script Complet pour VPS

```bash
#!/bin/bash
# Script de pull pour VPS avec gestion des branches divergentes

cd /var/www/tab

echo "🧹 Nettoyage des fichiers générés..."
rm -rf dist/
git rm -r --cached dist/ 2>/dev/null || true

echo "📥 Récupération des changements..."
git fetch origin

echo "🔄 Fusion avec origin/main..."
git config pull.rebase false
git pull origin main --no-rebase

if [ $? -eq 0 ]; then
    echo "✅ Pull réussi!"
    echo "🔨 Build de l'application..."
    npm run build
    
    echo "🔄 Redémarrage des services..."
    pm2 restart alladsmarket-backend
    sudo systemctl restart nginx
    
    echo "✅ Déploiement terminé!"
else
    echo "⚠️ Conflits détectés. Résolvez-les manuellement."
    echo "Fichiers en conflit:"
    git status
fi
```

## 🛠️ Commande Rapide pour VPS

```bash
# Tout en une commande
cd /var/www/tab && rm -rf dist/ && git rm -r --cached dist/ 2>/dev/null; git config pull.rebase false && git pull origin main --no-rebase && npm run build && pm2 restart alladsmarket-backend && sudo systemctl restart nginx
```

## ⚠️ Si vous avez des changements non commités

### Option 1: Stash (Recommandé)
```bash
# Sauvegarder vos changements
git stash

# Faire le pull
git pull origin main --no-rebase

# Restaurer vos changements
git stash pop
```

### Option 2: Commit vos changements
```bash
# Commit vos changements
git add .
git commit -m "Vos changements avant merge"

# Faire le pull
git pull origin main --no-rebase
```

### Option 3: Abandonner vos changements locaux
```bash
# ⚠️ ATTENTION: Ceci supprime vos changements locaux
git reset --hard HEAD
git clean -fd

# Faire le pull
git pull origin main --no-rebase
```

## 🔍 Vérification Post-Merge

```bash
# Vérifier que tout est à jour
git status

# Vérifier les dernières commits
git log --oneline -5

# Vérifier que dist/ n'est pas tracké
git ls-files dist/  # Ne doit rien retourner

# Vérifier que les services tournent
pm2 status
sudo systemctl status nginx
```

## 📝 Configuration Globale (Optionnel)

Pour éviter de spécifier la stratégie à chaque fois:

```bash
# Merge par défaut (recommandé)
git config --global pull.rebase false

# Ou rebase par défaut
git config --global pull.rebase true

# Ou fast-forward seulement
git config --global pull.ff only
```

## 🚨 En Cas de Problème

Si le pull échoue complètement:

```bash
# Voir l'état actuel
git status
git log --oneline --graph --all -10

# Annuler le merge en cours (si bloqué)
git merge --abort

# Recommencer avec une stratégie différente
git pull origin main --rebase
# ou
git pull origin main --no-rebase
```

