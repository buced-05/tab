# 🚀 AUT Scripts - Guide Rapide

## ⚡ Lancement Rapide

### Menu Interactif
```bash
cd scripts
index.bat
```

Le menu interactif vous permet d'accéder à tous les scripts facilement.

## 📂 Structure Organisée

```
scripts/
├── index.bat                    # Menu principal interactif
├── organize-scripts.bat         # Script d'organisation automatique
├── README.md                    # Documentation complète
├── QUICK_GUIDE.md              # Ce guide rapide
│
├── dev/                        # 🔧 Scripts de développement
│   ├── clean-restart.bat       # Nettoie et redémarre le serveur
│   ├── restart-dev-server.bat  # Redémarre le serveur dev
│   ├── clear-browser-data.bat  # Efface le cache du navigateur
│   └── fix-431-error.bat       # Corrige l'erreur 431
│
├── test/                       # 🧪 Scripts de test
│   ├── test-translations.js    # Test toutes les traductions
│   ├── test-product-translations.js  # Test traductions produits
│   └── test-final-translations.js    # Test final avant déploiement
│
├── utils/                      # 🛠️ Scripts utilitaires
│   ├── generate-product-translations.js      # Génère les traductions
│   └── generate-real-product-translations.js # Génère données réelles
│
├── deploy/                     # 🚀 Scripts de déploiement
│   ├── deploy-alladsmarket.sh  # Déploiement production
│   ├── deploy-vps.sh          # Déploiement VPS
│   └── ecosystem.config.js    # Config PM2
│
└── build/                      # 🏗️ Scripts de build (réservé)
```

## 🎯 Commandes Essentielles

### Développement
```bash
# Nettoyer et redémarrer
cd scripts/dev
clean-restart.bat

# Redémarrer seulement
restart-dev-server.bat

# Effacer cache navigateur
clear-browser-data.bat
```

### Tests
```bash
# Tester toutes les traductions
cd scripts/test
node test-translations.js

# Tester traductions produits
node test-product-translations.js
```

### Utilitaires
```bash
# Générer traductions produits
cd scripts/utils
node generate-product-translations.js

# Générer traductions réelles
node generate-real-product-translations.js
```

### Déploiement
```bash
# Déployer sur AllAdsMarket.com
cd scripts/deploy
bash deploy-alladsmarket.sh

# Déployer sur VPS
bash deploy-vps.sh
```

## 💡 Raccourcis Package.json

Ajoutez ces scripts dans votre `package.json` pour un accès rapide :

```json
{
  "scripts": {
    "scripts": "cd scripts && index.bat",
    "dev:clean": "cd scripts/dev && clean-restart.bat",
    "dev:restart": "cd scripts/dev && restart-dev-server.bat",
    "test:i18n": "cd scripts/test && node test-translations.js",
    "generate:i18n": "cd scripts/utils && node generate-product-translations.js",
    "deploy:prod": "cd scripts/deploy && bash deploy-alladsmarket.sh"
  }
}
```

Puis utilisez :
```bash
npm run scripts        # Ouvre le menu interactif
npm run dev:clean      # Nettoyage et redémarrage
npm run test:i18n      # Test des traductions
npm run deploy:prod    # Déploiement production
```

## 🔍 Catégories de Scripts

### 🔧 DEV - Développement
Pour le développement quotidien, le debugging et le nettoyage.

### 🧪 TEST - Tests
Pour valider les traductions et les données avant commit/déploiement.

### 🛠️ UTILS - Utilitaires
Pour générer des données, traductions et autres tâches auxiliaires.

### 🚀 DEPLOY - Déploiement
Pour déployer en production (ATTENTION : Production only!)

### 🏗️ BUILD - Construction
Réservé pour les futurs scripts de build personnalisés.

## 📋 Workflow Recommandé

### Développement
1. `dev/clean-restart.bat` - Démarrer proprement
2. Faire vos modifications
3. `test/test-translations.js` - Tester
4. Commit & Push

### Avant Déploiement
1. `test/test-final-translations.js` - Validation finale
2. `npm run build` - Build production
3. Vérification manuelle
4. `deploy/deploy-alladsmarket.sh` - Déploiement

### Génération de Données
1. Modifier `sampleData.js` si nécessaire
2. `utils/generate-real-product-translations.js` - Générer traductions
3. `test/test-product-translations.js` - Valider
4. Commit les fichiers générés

## 🆘 Dépannage

### Le script ne se lance pas
- Vérifiez que vous êtes dans le bon répertoire
- Pour les scripts `.bat`, utilisez Windows
- Pour les scripts `.sh`, utilisez Git Bash ou WSL

### Erreurs de traduction
```bash
cd scripts/test
node test-translations.js
```
Le script vous dira exactement quelles traductions sont manquantes.

### Problème de cache
```bash
cd scripts/dev
clean-restart.bat
```
Nettoie tout et redémarre.

### Erreur 431
```bash
cd scripts/dev
fix-431-error.bat
```

## 🔐 Sécurité

- ⚠️ Ne jamais commiter de credentials
- ⚠️ Tester en local avant déploiement
- ⚠️ Les scripts deploy/ sont pour production uniquement
- ⚠️ Toujours vérifier les variables d'environnement

## 📞 Support

Pour toute question sur les scripts :
1. Consultez `README.md` pour la documentation complète
2. Vérifiez ce guide rapide
3. Examinez le code du script concerné

---

**AUT Project** - Scripts organisés pour une productivité maximale! 🚀


