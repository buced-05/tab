@echo off
echo "🔄 Restarting development server with clean cache..."

echo "📦 Cleaning node_modules cache..."
if exist node_modules\.vite rmdir /s /q node_modules\.vite

echo "🗑️ Cleaning dist folder..."
if exist dist rmdir /s /q dist

echo "🚀 Starting development server..."
npm run dev

