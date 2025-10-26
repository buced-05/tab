@echo off
echo 🚀 Démarrage de l'application AllAdsMarket
echo.

echo 📦 Installation des dépendances du serveur...
cd bestserver
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances du serveur
    pause
    exit /b 1
)

echo.
echo 🔧 Démarrage du serveur backend...
start "Backend Server" cmd /k "cd bestserver && npm start"

echo.
echo ⏳ Attente du démarrage du serveur...
timeout /t 5 /nobreak > nul

echo.
echo 🌐 Démarrage du frontend...
cd ..
call npm run dev

echo.
echo ✅ Application démarrée avec succès !
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo 👤 Admin: http://localhost:3000/admin (admin/password)
echo.
pause
