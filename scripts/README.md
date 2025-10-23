# 📜 AUT Project Scripts

This directory contains all scripts organized by category for the AUT project.

## 📁 Directory Structure

```
scripts/
├── dev/          # Development scripts
├── build/        # Build scripts
├── test/         # Testing scripts
├── deploy/       # Deployment scripts
└── utils/        # Utility scripts
```

## 🔧 Development Scripts (`dev/`)

### `clean-restart.bat`
Cleans all caches and restarts the development server.
```bash
cd scripts/dev
clean-restart.bat
```

### `restart-dev-server.bat`
Restarts the development server without cleaning caches.
```bash
cd scripts/dev
restart-dev-server.bat
```

### `clear-browser-data.bat`
Clears browser cache and data for testing.
```bash
cd scripts/dev
clear-browser-data.bat
```

## 🏗️ Build Scripts (`build/`)

Build scripts for production deployment will be placed here.

## 🧪 Test Scripts (`test/`)

### `test-translations.js`
Tests all translation files for completeness and validity.
```bash
cd scripts/test
node test-translations.js
```

### `test-product-translations.js`
Tests product-specific translations.
```bash
cd scripts/test
node test-product-translations.js
```

### `test-final-translations.js`
Final validation of all translations before deployment.
```bash
cd scripts/test
node test-final-translations.js
```

## 🚀 Deployment Scripts (`deploy/`)

### `deploy-alladsmarket.sh`
Deployment script for alladsmarket.com production environment.
```bash
cd scripts/deploy
bash deploy-alladsmarket.sh
```

### `deploy-vps.sh`
Deployment script for VPS servers.
```bash
cd scripts/deploy
bash deploy-vps.sh
```

### `ecosystem.config.js`
PM2 ecosystem configuration for production deployment.

## 🛠️ Utility Scripts (`utils/`)

### `generate-product-translations.js`
Generates product translations for all supported languages.
```bash
cd scripts/utils
node generate-product-translations.js
```

### `generate-real-product-translations.js`
Generates real product data translations from the product catalog.
```bash
cd scripts/utils
node generate-real-product-translations.js
```

## 📋 Quick Commands

Add these to your `package.json` for easy access:

```json
{
  "scripts": {
    "clean:dev": "cd scripts/dev && clean-restart.bat",
    "test:translations": "cd scripts/test && node test-translations.js",
    "generate:translations": "cd scripts/utils && node generate-product-translations.js",
    "deploy:prod": "cd scripts/deploy && bash deploy-alladsmarket.sh"
  }
}
```

## 🔑 Usage Tips

1. **Development**: Use `dev/` scripts during active development
2. **Testing**: Run `test/` scripts before committing changes
3. **Building**: Use `build/` scripts to create production builds
4. **Deployment**: Only run `deploy/` scripts when deploying to production
5. **Utilities**: Run `utils/` scripts when you need to regenerate data

## 📝 Adding New Scripts

When adding new scripts, place them in the appropriate category:

- **Development tools** → `dev/`
- **Build processes** → `build/`
- **Testing utilities** → `test/`
- **Deployment automation** → `deploy/`
- **Data generation/helpers** → `utils/`

## 🆘 Troubleshooting

If a script fails:

1. Check that you're in the correct directory
2. Verify all dependencies are installed (`npm install`)
3. Check file permissions (especially for `.sh` scripts)
4. Review the script's error messages

## 🔒 Security Notes

- Never commit sensitive credentials in scripts
- Use environment variables for configuration
- Review deployment scripts before running in production
- Keep deployment scripts access-restricted

---

**AUT Project** - Organized and efficient script management


