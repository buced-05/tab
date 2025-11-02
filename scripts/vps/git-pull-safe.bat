@echo off
REM Script sécurisé pour git pull sur VPS (Windows)
REM Gère automatiquement les branches divergentes et les fichiers générés

echo.
echo ========================================
echo Pull securise pour VPS
echo ========================================
echo.

REM Vérifier qu'on est dans le bon répertoire
if not exist "package.json" (
    echo [ERREUR] Vous devez etre dans le repertoire du projet
    pause
    exit /b 1
)

REM Étape 1: Nettoyer les fichiers générés
echo [1/5] Nettoyage des fichiers generes...
if exist dist (
    rmdir /s /q dist
    echo   ✓ Dossier dist/ supprime
)
git rm -r --cached dist/ 2>nul
if %ERRORLEVEL% EQU 0 (
    echo   ✓ Fichiers dist/ supprimes du cache Git
) else (
    echo   ℹ Aucun fichier dist/ dans le cache Git
)

REM Étape 2: Vérifier l'état Git
echo.
echo [2/5] Verification de l'etat Git...
git status --short

REM Étape 3: Stash les changements locaux (si nécessaire)
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [3/5] Changements locaux detectes, sauvegarde dans stash...
    for /f "tokens=2-4 delims=/ " %%a in ('date /t') do set mydate=%%c-%%a-%%b
    for /f "tokens=1-2 delims=/:" %%a in ('time /t') do set mytime=%%a%%b
    set mytime=!mytime: =0!
    git stash push -m "Sauvegarde avant pull !mydate!-!mytime!"
    echo   ✓ Changements sauvegardes
    set STASHED=true
) else (
    echo.
    echo [3/5] Aucun changement local
    set STASHED=false
)

REM Étape 4: Fetch et pull avec merge
echo.
echo [4/5] Recuperation des changements...
git fetch origin

REM Configurer merge comme stratégie par défaut
git config pull.rebase false 2>nul

REM Faire le pull
echo   Fusion avec origin/main...
git pull origin main --no-rebase
if %ERRORLEVEL% NEQ 0 (
    echo   ⚠️ Conflits detectes lors du merge
    
    REM Restaurer le stash si nécessaire
    if "%STASHED%"=="true" (
        echo   Restauration des changements locaux...
        git stash pop 2>nul
    )
    
    echo.
    echo ========================================
    echo ⚠️ Conflits a resoudre manuellement
    echo ========================================
    echo.
    echo Fichiers en conflit:
    git status
    echo.
    echo Apres resolution:
    echo   git add .
    echo   git commit -m "Resolution des conflits"
    echo.
    pause
    exit /b 1
)
echo   ✓ Pull reussi

REM Étape 5: Restaurer les changements locaux (si stashé)
if "%STASHED%"=="true" (
    echo.
    echo [5/5] Restauration des changements locaux...
    git stash pop
    if %ERRORLEVEL% EQU 0 (
        echo   ✓ Changements restores
    ) else (
        echo   ⚠️ Conflits lors de la restauration du stash
        echo   Resolvez manuellement avec: git stash show
    )
) else (
    echo.
    echo [5/5] Aucun changement local a restaurer
)

echo.
echo ========================================
echo ✅ Pull termine avec succes!
echo ========================================
echo.
echo Prochaines etapes recommandees:
echo   npm run build          # Rebuild l'application
echo   pm2 restart alladsmarket-backend  # Redemarrer le serveur
echo   sudo systemctl restart nginx       # Redemarrer Nginx
echo.
pause

