@echo off
echo 🚀 Démarrage de AllAdsMarket avec Base de Données MySQL
echo.

echo 📋 Vérification des prérequis...
echo.

echo 🔍 Vérification de MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL n'est pas installé ou n'est pas dans le PATH
    echo 💡 Installez MySQL et ajoutez-le au PATH
    echo 📥 Téléchargement: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)
echo ✅ MySQL détecté

echo.
echo 📦 Installation des dépendances du serveur...
cd bestserver
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation des dépendances
    pause
    exit /b 1
)

echo.
echo 🗄️  Configuration de la base de données...
echo 💡 Assurez-vous que MySQL est démarré et accessible
echo.

echo 🔧 Création/migration de la base de données...
echo 💡 Utilisation de l'utilisateur MySQL: tab
node scripts/migrate.js migrate
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la migration de la base de données
    echo 💡 Vérifiez que MySQL est démarré et que l'utilisateur 'tab' existe
    echo 💡 Créez l'utilisateur avec: CREATE USER 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
    pause
    exit /b 1
)

echo.
echo 🚀 Démarrage du serveur backend...
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
echo 🗄️  Base de données: MySQL alladsmarket
echo.
echo 📊 Pour vérifier la base de données:
echo    node bestserver/scripts/migrate.js status
echo.
pause
