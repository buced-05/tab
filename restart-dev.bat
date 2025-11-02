@echo off
echo ========================================
echo Redemarrage du Serveur de Developpement
echo ========================================
echo.

echo [1/3] Arret des processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
echo   Termine
echo.

echo [2/3] Nettoyage du cache Vite...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo   Cache Vite supprime
) else (
    echo   Cache Vite inexistant
)
echo.

echo [3/3] Demarrage du serveur de developpement...
echo   Le serveur va demarrer sur http://localhost:3000
echo.
npm run dev

