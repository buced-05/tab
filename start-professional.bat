@echo off
echo ========================================
echo   AllAdsMarket Professional Setup
echo ========================================
echo.

echo [1/4] Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing frontend dependencies...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Setting up environment...
if not exist server\.env (
    copy server\env.example server\.env
    echo Created .env file. Please update with your database credentials.
)

echo.
echo [4/4] Starting servers...
echo.
echo Starting backend server on port 5000...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting frontend server on port 3000...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Backend API: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:3000/admin
echo.
echo Default Admin Credentials:
echo Username: admin
echo Password: admin123
echo.
echo Please change the default password!
echo.
pause
