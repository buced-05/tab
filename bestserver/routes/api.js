const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// Products endpoints
router.get('/products', (req, res) => {
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

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  
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

// Categories endpoint
router.get('/categories', (req, res) => {
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

// Tracking endpoint
router.post('/track', (req, res) => {
  const { event, data } = req.body;
  
  console.log('Tracking event:', event, data);
  
  res.json({
    success: true,
    message: 'Event tracked successfully'
  });
});

module.exports = router;

