const path = require('path');

const appDir = process.env.APP_DIR || '/var/www/alladsmarket';
const venvDir = process.env.VENV_DIR || path.join(appDir, '.venv');
const binDir = process.platform === 'win32' ? 'Scripts' : 'bin';
const defaultGunicorn = path.join(venvDir, binDir, process.platform === 'win32' ? 'gunicorn.exe' : 'gunicorn');

module.exports = {
  apps: [
    {
      name: 'alladsmarket-backend',
      cwd: appDir,
      script: process.env.GUNICORN_BIN || defaultGunicorn,
      interpreter: 'none',
      args: process.env.GUNICORN_ARGS || 'backend.wsgi:application --config backend/gunicorn.conf.py',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        DJANGO_SETTINGS_MODULE: process.env.DJANGO_SETTINGS_MODULE || 'backend.settings',
        DJANGO_ALLOWED_HOSTS: process.env.DJANGO_ALLOWED_HOSTS || 'alladsmarket.com,www.alladsmarket.com',
        DJANGO_DEBUG: process.env.DJANGO_DEBUG || 'False',
        FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || 'https://alladsmarket.com',
      },
      env_production: {
        DJANGO_SETTINGS_MODULE: process.env.DJANGO_SETTINGS_MODULE || 'backend.settings',
        DJANGO_ALLOWED_HOSTS: process.env.DJANGO_ALLOWED_HOSTS || 'alladsmarket.com,www.alladsmarket.com',
        DJANGO_DEBUG: 'False',
        FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || 'https://alladsmarket.com',
      },
    },
  ],
};
