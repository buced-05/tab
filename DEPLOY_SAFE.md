# 🚀 Guide de Déploiement Sécurisé - Éviter les Conflits

## 📋 Vue d'ensemble

Ce guide explique comment déployer l'application sur le VPS **sans conflits** en utilisant le script de déploiement sécurisé.

## 🎯 Problèmes Évités

Le script `deploy-safe.sh` évite automatiquement :

1. ✅ **Conflits Git** : Gestion automatique des modifications locales
2. ✅ **Perte de données** : Backup complet avant chaque déploiement
3. ✅ **Build cassé** : Vérifications et rollback automatique
4. ✅ **Interruption de service** : Rechargement Nginx sans interruption
5. ✅ **Dépendances obsolètes** : Installation automatique si nécessaire

---

## 🚀 Déploiement Automatique

### Option 1 : Depuis Windows (recommandé)

```bash
# Exécuter le script Windows
scripts\vps\deploy-safe.bat
```

### Option 2 : Depuis le VPS directement

```bash
# Se connecter au VPS
ssh root@91.108.120.78

# Aller dans le répertoire du projet
cd /var/www/tab

# Copier le script (si pas déjà présent)
# Ou le créer directement sur le VPS

# Rendre le script exécutable
chmod +x scripts/vps/deploy-safe.sh

# Exécuter le déploiement
./scripts/vps/deploy-safe.sh
```

---

## 🔍 Ce que fait le Script

### 1. **Backup Complet**
- ✅ Backup de `dist/` (build précédent)
- ✅ Backup de la configuration Nginx
- ✅ Backup de `package.json`
- ✅ Sauvegarde des modifications locales

### 2. **Nettoyage**
- ✅ Suppression de l'ancien build
- ✅ Nettoyage des fichiers générés

### 3. **Gestion des Conflits Git**
- ✅ Détection des modifications locales
- ✅ Stash automatique des modifications
- ✅ Résolution automatique des conflits
- ✅ Utilisation de la version distante en cas de conflit

### 4. **Mise à Jour**
- ✅ Pull depuis `origin/main`
- ✅ Installation des dépendances si nécessaire
- ✅ Build de l'application
- ✅ Génération des sitemaps

### 5. **Déploiement**
- ✅ Mise à jour de la configuration Nginx
- ✅ Rechargement de Nginx (sans interruption)
- ✅ Redémarrage de PM2

### 6. **Vérifications**
- ✅ Vérification du build
- ✅ Vérification des sitemaps
- ✅ Vérification des services

---

## 🔄 Rollback en Cas de Problème

Si le déploiement échoue, le script restaure automatiquement le backup.

### Rollback Manuel

```bash
# Se connecter au VPS
ssh root@91.108.120.78

# Aller dans le répertoire du projet
cd /var/www/tab

# Lister les backups disponibles
ls -lah /var/www/backups/

# Restaurer un backup spécifique
tar -xzf /var/www/backups/backup_YYYYMMDD_HHMMSS_dist.tar.gz -C /var/www/tab

# Redémarrer les services
sudo systemctl reload nginx
pm2 restart alladsmarket-backend
```

---

## 📊 Vérifications Post-Déploiement

### 1. Vérifier le Build

```bash
# Sur le VPS
cd /var/www/tab
ls -lah dist/
ls -lah dist/index.html
ls -lah dist/sitemap*.xml | wc -l  # Devrait être ~25
```

### 2. Vérifier Nginx

```bash
# Tester la configuration
sudo nginx -t

# Vérifier le statut
sudo systemctl status nginx

# Vérifier les logs
sudo tail -f /var/log/nginx/alladsmarket.error.log
```

### 3. Vérifier PM2

```bash
# Statut des processus
pm2 status

# Logs en temps réel
pm2 logs alladsmarket-backend
```

### 4. Vérifier l'Application

```bash
# Page d'accueil
curl -I https://alladsmarket.com

# Un produit
curl -I https://alladsmarket.com/products/dreamquest-support-windows-computers-bluetooth5-3

# Sitemap
curl -I https://alladsmarket.com/sitemap.xml
```

---

## 🛡️ Stratégie de Gestion des Conflits

### Conflits Git

Le script gère automatiquement :

1. **Modifications locales dans `dist/`** :
   - ✅ Ignorées (dist/ est dans .gitignore)
   - ✅ Supprimées avant le build

2. **Modifications locales dans d'autres fichiers** :
   - ✅ Sauvegardées avec `git stash`
   - ✅ Version distante utilisée

3. **Conflits de merge** :
   - ✅ Résolution automatique avec `--strategy-option=theirs`
   - ✅ Version distante prioritaire

### Fichiers Ignorés

Les fichiers suivants sont automatiquement ignorés :
- `dist/` (généré)
- `node_modules/` (dépendances)
- `*.log` (logs)
- Fichiers dans `.gitignore`

---

## 📝 Logs et Debugging

### Logs du Script

Le script affiche des logs détaillés :
- 🔵 **Logs normaux** : Informations générales
- ✅ **Succès** : Opérations réussies
- ⚠️ **Avertissements** : Problèmes non critiques
- ❌ **Erreurs** : Problèmes critiques (arrêt du script)

### Debugging

Pour activer le mode debug :

```bash
# Ajouter -x pour voir les commandes exécutées
bash -x scripts/vps/deploy-safe.sh
```

---

## 🔧 Configuration

### Variables du Script

Modifier dans `deploy-safe.sh` :

```bash
PROJECT_DIR="/var/www/tab"        # Répertoire du projet
BACKUP_DIR="/var/www/backups"     # Répertoire des backups
```

### Personnalisation

Pour personnaliser le script :

1. Modifier les variables de configuration
2. Ajouter des étapes personnalisées
3. Modifier la stratégie de résolution des conflits

---

## 🚨 Problèmes Courants

### Erreur : "Conflit lors du pull"

**Solution** : Le script résout automatiquement en utilisant la version distante.

### Erreur : "Échec du build"

**Solution** : Le script restaure automatiquement le backup précédent.

### Erreur : "Nginx n'est pas actif"

**Solution** :
```bash
sudo systemctl start nginx
sudo systemctl status nginx
```

### Erreur : "PM2 n'est pas disponible"

**Solution** : Le script continue sans PM2 (avertissement seulement).

---

## 📊 Checklist de Déploiement

Avant de déployer :

- [ ] Vérifier que les modifications sont commitées et poussées
- [ ] Vérifier que le build fonctionne localement
- [ ] Vérifier la connexion SSH au VPS
- [ ] Vérifier que les services sont actifs

Après le déploiement :

- [ ] Vérifier que le site est accessible
- [ ] Vérifier que les sitemaps sont générés
- [ ] Vérifier que les produits sont accessibles
- [ ] Vérifier les logs pour les erreurs

---

## 🎉 Résultat Attendu

Après un déploiement réussi :

- ✅ **Site accessible** : https://alladsmarket.com
- ✅ **Build à jour** : Dernière version déployée
- ✅ **Sitemaps générés** : ~25 sitemaps disponibles
- ✅ **Services actifs** : Nginx et PM2 fonctionnels
- ✅ **Aucun conflit** : Déploiement propre

---

## 📞 Support

En cas de problème :

1. Vérifier les logs du script
2. Vérifier les logs Nginx : `/var/log/nginx/alladsmarket.error.log`
3. Vérifier les logs PM2 : `pm2 logs`
4. Restaurer le backup précédent si nécessaire

---

**Date de création** : 2025-01-02  
**Dernière mise à jour** : 2025-01-02

