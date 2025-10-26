# 🔒 Guide de Sécurité AllAdsMarket

## ⚠️ **ALERTE SÉCURITÉ - GitGuardian**

GitGuardian a détecté une exposition de données sensibles dans le repository. Ce guide vous aide à corriger et prévenir ces problèmes.

## 🚨 **Actions Immédiates Requises**

### 1. **Changer les mots de passe exposés**
```bash
# Changer le mot de passe MySQL
mysql -u root -p
ALTER USER 'tab'@'localhost' IDENTIFIED BY 'NOUVEAU_MOT_DE_PASSE_SECURISE';
ALTER USER 'tab'@'%' IDENTIFIED BY 'NOUVEAU_MOT_DE_PASSE_SECURISE';
FLUSH PRIVILEGES;
```

### 2. **Mettre à jour les variables d'environnement**
```bash
# Créer le fichier .env avec vos vraies données
cp bestserver/env.example bestserver/.env
# Éditer le fichier .env avec vos vraies données
```

### 3. **Supprimer l'historique Git des données sensibles**
```bash
# Supprimer les fichiers sensibles de l'historique Git
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch bestserver/scripts/setup-mysql-vps.sql' \
--prune-empty --tag-name-filter cat -- --all

# Forcer le push pour nettoyer l'historique
git push origin --force --all
```

## 🛡️ **Bonnes Pratiques de Sécurité**

### ✅ **Fichiers à NE JAMAIS commiter :**
- `.env` (variables d'environnement)
- `*.key` (clés privées)
- `*.pem` (certificats)
- `config/production.js` (configurations de production)
- `secrets/` (dossier de secrets)

### ✅ **Fichiers sécurisés :**
- `env.example` (exemple sans données sensibles)
- `config/development.js` (configuration de développement)
- `README.md` (documentation publique)

### ✅ **Variables d'environnement recommandées :**
```bash
# Base de données
DB_HOST=localhost
DB_USER=your_secure_user
DB_PASSWORD=your_secure_password_123!
DB_NAME=alladsmarket
DB_PORT=3306

# JWT
JWT_SECRET=your-super-secret-jwt-key-$(date +%s)

# Production
PRODUCTION_DOMAIN=your-domain.com
VPS_HOST=your-vps-ip
VPS_USER=your-vps-user
```

## 🔧 **Configuration Sécurisée**

### 1. **Fichier .env sécurisé**
```bash
# Créer le fichier .env
touch bestserver/.env

# Ajouter au .gitignore
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets/" >> .gitignore
```

### 2. **Scripts sécurisés**
- Utiliser `process.env.VARIABLE` au lieu de valeurs en dur
- Valider les variables d'environnement au démarrage
- Utiliser des valeurs par défaut sécurisées

### 3. **Base de données sécurisée**
```sql
-- Créer un utilisateur avec privilèges limités
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'mot_de_passe_securise';
GRANT SELECT, INSERT, UPDATE, DELETE ON alladsmarket.* TO 'app_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🚀 **Déploiement Sécurisé**

### 1. **VPS Configuration**
```bash
# Sur le VPS, créer le fichier .env
ssh root@your-vps-ip
cd /path/to/app
cp env.example .env
nano .env  # Éditer avec les vraies données
```

### 2. **Permissions sécurisées**
```bash
# Permissions restrictives
chmod 600 .env
chown app:app .env
```

### 3. **Monitoring de sécurité**
```bash
# Installer des outils de monitoring
npm install --save-dev husky
npm install --save-dev lint-staged

# Ajouter des hooks Git
echo "npm run security-check" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## 🔍 **Vérification de Sécurité**

### 1. **Scan des secrets**
```bash
# Installer GitGuardian CLI
pip install ggshield

# Scanner le repository
ggshield scan path .

# Scanner un commit spécifique
ggshield scan commit HEAD~1
```

### 2. **Vérification des variables d'environnement**
```bash
# Vérifier que .env n'est pas committé
git status
git log --name-only | grep -E "\.env|password|secret"

# Vérifier les permissions
ls -la .env
```

### 3. **Test de sécurité**
```bash
# Tester la configuration
node bestserver/scripts/verify-security.js
```

## 📋 **Checklist de Sécurité**

- [ ] ✅ Mots de passe changés
- [ ] ✅ Fichier .env créé et sécurisé
- [ ] ✅ Variables d'environnement configurées
- [ ] ✅ Historique Git nettoyé
- [ ] ✅ Permissions de fichiers vérifiées
- [ ] ✅ Base de données sécurisée
- [ ] ✅ Secrets supprimés du code
- [ ] ✅ Monitoring activé
- [ ] ✅ Tests de sécurité passés

## 🆘 **En Cas de Compromission**

### 1. **Actions immédiates**
```bash
# Changer tous les mots de passe
# Révoquer les tokens JWT
# Vérifier les logs d'accès
# Notifier les utilisateurs
```

### 2. **Investigation**
```bash
# Vérifier les logs
tail -f /var/log/mysql/error.log
tail -f /var/log/nginx/access.log

# Vérifier les connexions
mysql -u root -p -e "SHOW PROCESSLIST;"
```

### 3. **Restauration**
```bash
# Restaurer depuis une sauvegarde
# Redéployer avec une configuration sécurisée
# Mettre à jour tous les secrets
```

## 📞 **Support**

En cas de problème de sécurité :
1. **Immédiat** : Changer tous les mots de passe
2. **Court terme** : Nettoyer l'historique Git
3. **Long terme** : Mettre en place un monitoring

---

**⚠️ IMPORTANT : Ce guide doit être suivi immédiatement pour sécuriser l'application !**
