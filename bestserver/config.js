// Server configuration
module.exports = {
  // Server settings
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  
  // CORS settings
  cors: {
    origins: process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  
  // Security
  security: {
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:", "http:"],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'"],
        },
      },
    }
  },
  
  // Static files
  static: {
    maxAge: '1d',
    etag: true,
    lastModified: true
  }
};

