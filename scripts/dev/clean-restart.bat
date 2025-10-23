@echo off
echo "🧹 Cleaning all caches and restarting..."

echo "📦 Cleaning node_modules cache..."
if exist node_modules\.vite rmdir /s /q node_modules\.vite
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo "🗑️ Cleaning dist folder..."
if exist dist rmdir /s /q dist

echo "🔄 Cleaning npm cache..."
npm cache clean --force

echo "🚀 Starting development server..."
npm run dev

