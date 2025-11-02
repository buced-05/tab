@echo off
REM Script pour nettoyer les fichiers générés avant un merge/pull
REM Évite les conflits avec dist/index.html, dist/sitemap.xml, etc.

echo.
echo ========================================
echo Nettoyage des fichiers generes
echo ========================================
echo.

REM Vérifier si Git est disponible
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Git n'est pas installe ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo [1/4] Suppression du dossier dist/...
if exist dist (
    rmdir /s /q dist
    echo   ✓ Dossier dist/ supprime
) else (
    echo   ℹ Dossier dist/ n'existe pas
)

echo.
echo [2/4] Suppression des fichiers generes dans Git cache...
git rm -r --cached dist/ 2>nul
if %ERRORLEVEL% EQU 0 (
    echo   ✓ Fichiers dist/ supprimes du cache Git
) else (
    echo   ℹ Aucun fichier dist/ dans le cache Git
)

echo.
echo [3/4] Verification des fichiers tracks dans dist/...
git ls-files dist/ 2>nul >nul
if %ERRORLEVEL% EQU 0 (
    echo   ⚠ Des fichiers dist/ sont encore tracks dans Git
    echo   Execution: git rm -r --cached dist/
    git rm -r --cached dist/
    echo   ✓ Fichiers supprimes du cache Git
) else (
    echo   ✓ Aucun fichier dist/ n'est track dans Git
)

echo.
echo [4/4] Verification du .gitignore...
findstr /C:"dist/" .gitignore >nul
if %ERRORLEVEL% EQU 0 (
    echo   ✓ dist/ est bien dans .gitignore
) else (
    echo   ⚠ ATTENTION: dist/ n'est pas dans .gitignore
)

echo.
echo ========================================
echo Nettoyage termine avec succes!
echo ========================================
echo.
echo Vous pouvez maintenant executer:
echo   git pull
echo   git merge
echo   git rebase
echo.
pause

