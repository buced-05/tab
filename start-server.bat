@echo off
echo 🔧 Démarrage du serveur backend AllAdsMarket
echo.

cd bestserver
echo 📦 Vérification des dépendances...
call npm install

echo.
echo 🚀 Démarrage du serveur sur le port 5000...
echo 🌐 Accès: http://localhost:5000
echo 👤 Admin: admin/password
echo.

npm start
