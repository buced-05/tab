@echo off
REM Script de déploiement sécurisé pour VPS (Windows)
REM Usage: deploy-safe.bat

echo ========================================
echo 🚀 Déploiement sécurisé sur VPS
echo ========================================
echo.

REM Configuration
set VPS_USER=root
set VPS_HOST=91.108.120.78
set VPS_PATH=/var/www/tab

echo 📋 Vérification de la connexion SSH...
ssh -o ConnectTimeout=10 -o BatchMode=yes %VPS_USER%@%VPS_HOST% "echo 'SSH OK'" 2>nul
if %errorlevel% neq 0 (
    echo ❌ Impossible de se connecter au VPS
    echo 💡 Vérifiez votre connexion SSH
    pause
    exit /b 1
)
echo ✅ Connexion SSH réussie
echo.

echo 🚀 Lancement du déploiement sécurisé...
echo.

REM Copier le script de déploiement sur le VPS
echo 📤 Upload du script de déploiement...
scp scripts/vps/deploy-safe.sh %VPS_USER%@%VPS_HOST%:/tmp/deploy-safe.sh
if %errorlevel% neq 0 (
    echo ❌ Échec de l'upload du script
    pause
    exit /b 1
)
echo ✅ Script uploadé
echo.

REM Exécuter le script sur le VPS
echo 🔧 Exécution du déploiement sur le VPS...
ssh %VPS_USER%@%VPS_HOST% << 'EOF'
chmod +x /tmp/deploy-safe.sh
cd /var/www/tab
/tmp/deploy-safe.sh
EOF

if %errorlevel% neq 0 (
    echo ❌ Échec du déploiement
    pause
    exit /b 1
)

echo.
echo ✅ Déploiement terminé avec succès!
echo.
echo 📊 Pour vérifier le statut:
echo   ssh %VPS_USER%@%VPS_HOST% "pm2 status"
echo   ssh %VPS_USER%@%VPS_HOST% "systemctl status nginx"
echo.
pause

