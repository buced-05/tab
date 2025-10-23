// BEST.com Express Server Configuration
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware for best.com
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "https://best.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "https://best.com"],
      imgSrc: ["'self'", "data:", "https://best.com"],
      connectSrc: ["'self'", "https://best.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration for best.com
app.use(cors({
  origin: [
    'https://best.com',
    'https://www.best.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting for best.com
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    domain: 'best.com'
  }
});

app.use(limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files serving for best.com
app.use(express.static('dist', {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

// API routes for best.com
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    domain: 'best.com',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    domain: 'best.com',
    apiUrl: 'https://best.com/api',
    siteUrl: 'https://best.com',
    version: '2.0.0',
    features: {
      pwa: true,
      analytics: true,
      security: true
    }
  });
});

// Catch-all handler for SPA routing
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: '.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('BEST.com Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    domain: 'best.com',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BEST.com server running on port ${PORT}`);
  console.log(`🌐 Domain: best.com`);
  console.log(`📁 Serving from: ${process.cwd()}/dist`);
});

export default app;

