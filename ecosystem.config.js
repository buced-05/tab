module.exports = {
  apps: [
    {
      name: 'alladsmarket-backend',
      script: 'bestserver/index.js',
      cwd: '/var/www/alladsmarket',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        DB_HOST: 'localhost',
        DB_USER: 'tab',
        DB_PASSWORD: 'Newtiv15@t',
        DB_NAME: 'alladsmarket',
        DB_PORT: 3306,
        JWT_SECRET: 'your-super-secret-jwt-key-change-this-in-production',
        CORS_ORIGIN: 'https://alladsmarket.com'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        DB_HOST: 'localhost',
        DB_USER: 'tab',
        DB_PASSWORD: 'Newtiv15@t',
        DB_NAME: 'alladsmarket',
        DB_PORT: 3306,
        JWT_SECRET: 'your-super-secret-jwt-key-change-this-in-production',
        CORS_ORIGIN: 'https://alladsmarket.com'
      }
    }
  ]
};
