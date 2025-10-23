const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
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
}));

// CORS configuration for BEST
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://best.com', 'https://www.best.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Static files
app.use(express.static(path.join(__dirname, '../dist'), {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API endpoint for products (mock data)
app.get('/api/products', (req, res) => {
  const products = [
    {
      _id: '1',
      name: 'Smartphone Premium',
      price: 599.99,
      currency: 'EUR',
      description: 'Latest smartphone with advanced features and premium design.',
      images: [
        { url: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Smartphone', isPrimary: true }
      ],
      affiliateUrl: 'https://example.com/smartphone',
      category: 'electronics',
      inStock: true,
      rating: 4.8,
      reviews: 1247
    },
    {
      _id: '2',
      name: 'Laptop Pro',
      price: 1299.99,
      currency: 'EUR',
      description: 'High-performance laptop for professionals and creators.',
      images: [
        { url: 'https://via.placeholder.com/400x300/10b981/ffffff?text=Laptop', isPrimary: true }
      ],
      affiliateUrl: 'https://example.com/laptop',
      category: 'electronics',
      inStock: true,
      rating: 4.9,
      reviews: 892
    },
    {
      _id: '3',
      name: 'Wireless Headphones',
      price: 299.99,
      currency: 'EUR',
      description: 'Premium wireless headphones with noise cancellation.',
      images: [
        { url: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Headphones', isPrimary: true }
      ],
      affiliateUrl: 'https://example.com/headphones',
      category: 'electronics',
      inStock: true,
      rating: 4.7,
      reviews: 2156
    }
  ];

  res.json({
    success: true,
    data: products,
    total: products.length
  });
});

// API endpoint for single product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  
  // Mock product data
  const product = {
    _id: productId,
    name: 'Smartphone Premium',
    price: 599.99,
    currency: 'EUR',
    description: 'Latest smartphone with advanced features and premium design. Perfect for professionals and tech enthusiasts.',
    images: [
      { url: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Smartphone+Front', isPrimary: true },
      { url: 'https://via.placeholder.com/600x400/1d4ed8/ffffff?text=Smartphone+Back', isPrimary: false },
      { url: 'https://via.placeholder.com/600x400/2563eb/ffffff?text=Smartphone+Side', isPrimary: false }
    ],
    affiliateUrl: 'https://example.com/smartphone',
    category: 'electronics',
    inStock: true,
    rating: 4.8,
    reviews: 1247,
    specifications: {
      display: '6.1" OLED',
      processor: 'A17 Pro',
      storage: '256GB',
      camera: '48MP Triple Camera',
      battery: 'Up to 23 hours'
    }
  };

  res.json({
    success: true,
    data: product
  });
});

// API endpoint for categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'beauty', name: 'Beauty', icon: '💄' }
  ];

  res.json({
    success: true,
    data: categories
  });
});

// API endpoint for tracking (mock)
app.post('/api/track', (req, res) => {
  const { event, data } = req.body;
  
  console.log('Tracking event:', event, data);
  
  res.json({
    success: true,
    message: 'Event tracked successfully'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BEST server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access: http://localhost:${PORT}`);
  console.log(`🏆 BEST - Your trusted marketplace`);
});

module.exports = app;

