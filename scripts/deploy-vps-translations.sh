#!/bin/bash

# Script de déploiement VPS avec corrections des traductions
echo "🚀 Déploiement VPS avec corrections des traductions..."

# 1. Sauvegarder les fichiers de traduction
echo "📁 Sauvegarde des fichiers de traduction..."
cp -r src/i18n/locales/ backup/translations/

# 2. Vérifier que tous les fichiers de traduction existent
echo "🔍 Vérification des fichiers de traduction..."
required_files=(
    "src/i18n/locales/fr-complete.json"
    "src/i18n/locales/en-complete.json"
    "src/i18n/locales/es-complete.json"
    "src/i18n/locales/de-complete.json"
    "src/i18n/locales/it-complete.json"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Fichier manquant: $file"
        exit 1
    else
        echo "✅ $file trouvé"
    fi
done

# 3. Vérifier que articleGenerator.js existe
if [ ! -f "src/utils/articleGenerator.js" ]; then
    echo "❌ Fichier manquant: src/utils/articleGenerator.js"
    exit 1
else
    echo "✅ src/utils/articleGenerator.js trouvé"
fi

# 4. Nettoyer le cache npm
echo "🧹 Nettoyage du cache npm..."
npm cache clean --force

# 5. Supprimer node_modules et package-lock.json
echo "🗑️ Suppression des dépendances existantes..."
rm -rf node_modules
rm -f package-lock.json

# 6. Réinstaller les dépendances
echo "📦 Réinstallation des dépendances..."
npm install

# 7. Vérifier que i18next est installé
echo "🔍 Vérification de i18next..."
if npm list i18next > /dev/null 2>&1; then
    echo "✅ i18next installé"
else
    echo "❌ i18next manquant, installation..."
    npm install i18next react-i18next i18next-browser-languagedetector
fi

# 8. Build de production
echo "🏗️ Build de production..."
npm run build

# 9. Vérifier que le build contient les traductions
echo "🔍 Vérification du build..."
if [ -d "dist" ]; then
    echo "✅ Dossier dist créé"
    
    # Vérifier que les fichiers de traduction sont dans le build
    if find dist -name "*.json" | grep -q "locales"; then
        echo "✅ Fichiers de traduction dans le build"
    else
        echo "⚠️ Fichiers de traduction non trouvés dans le build"
    fi
else
    echo "❌ Échec du build"
    exit 1
fi

# 10. Redémarrer le serveur
echo "🔄 Redémarrage du serveur..."
if command -v pm2 > /dev/null 2>&1; then
    pm2 restart all
    echo "✅ Serveur redémarré avec PM2"
elif command -v systemctl > /dev/null 2>&1; then
    sudo systemctl restart nginx
    echo "✅ Nginx redémarré"
else
    echo "⚠️ Aucun gestionnaire de processus trouvé"
fi

echo "✅ Déploiement terminé avec succès!"
echo "🌍 Les traductions devraient maintenant fonctionner sur le VPS"
