@echo off
echo 🚀 Déploiement VPS avec corrections des traductions...

REM 1. Sauvegarder les fichiers de traduction
echo 📁 Sauvegarde des fichiers de traduction...
if not exist backup mkdir backup
if not exist backup\translations mkdir backup\translations
xcopy /E /I /Y src\i18n\locales\ backup\translations\

REM 2. Vérifier que tous les fichiers de traduction existent
echo 🔍 Vérification des fichiers de traduction...
set "required_files=src\i18n\locales\fr-complete.json src\i18n\locales\en-complete.json src\i18n\locales\es-complete.json src\i18n\locales\de-complete.json src\i18n\locales\it-complete.json"

for %%f in (%required_files%) do (
    if not exist "%%f" (
        echo ❌ Fichier manquant: %%f
        exit /b 1
    ) else (
        echo ✅ %%f trouvé
    )
)

REM 3. Vérifier que articleGenerator.js existe
if not exist "src\utils\articleGenerator.js" (
    echo ❌ Fichier manquant: src\utils\articleGenerator.js
    exit /b 1
) else (
    echo ✅ src\utils\articleGenerator.js trouvé
)

REM 4. Nettoyer le cache npm
echo 🧹 Nettoyage du cache npm...
npm cache clean --force

REM 5. Supprimer node_modules et package-lock.json
echo 🗑️ Suppression des dépendances existantes...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM 6. Réinstaller les dépendances
echo 📦 Réinstallation des dépendances...
npm install

REM 7. Vérifier que i18next est installé
echo 🔍 Vérification de i18next...
npm list i18next >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ i18next manquant, installation...
    npm install i18next react-i18next i18next-browser-languagedetector
) else (
    echo ✅ i18next installé
)

REM 8. Build de production
echo 🏗️ Build de production...
npm run build

REM 9. Vérifier que le build contient les traductions
echo 🔍 Vérification du build...
if exist dist (
    echo ✅ Dossier dist créé
    
    REM Vérifier que les fichiers de traduction sont dans le build
    dir /s /b dist\*.json | findstr "locales" >nul
    if %errorlevel% equ 0 (
        echo ✅ Fichiers de traduction dans le build
    ) else (
        echo ⚠️ Fichiers de traduction non trouvés dans le build
    )
) else (
    echo ❌ Échec du build
    exit /b 1
)

echo ✅ Déploiement terminé avec succès!
echo 🌍 Les traductions devraient maintenant fonctionner sur le VPS
pause
