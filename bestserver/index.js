const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { testConnection, query } = require('./config/database');
const Product = require('./models/Product');
const Article = require('./models/Article');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test de connexion à la base de données au démarrage
testConnection().then(connected => {
  if (connected) {
    console.log('✅ Base de données MySQL connectée');
  } else {
    console.log('⚠️  Base de données MySQL non accessible - Mode dégradé');
  }
});

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

// CORS configuration for AllAdsMarket
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://alladsmarket.com', 'https://www.alladsmarket.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// API endpoint for products (MySQL data)
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    
    const options = {
      category_id: category,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const products = await Product.findAll(options);
    
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits'
    });
  }
});

// API endpoint for single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    // Récupérer les images, tags et spécifications
    const [images, tags, specifications] = await Promise.all([
      product.getImages(),
      product.getTags(),
      product.getSpecifications()
    ]);

    res.json({
      success: true,
      data: {
        ...product,
        images,
        tags,
        specifications
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du produit'
    });
  }
});

// API endpoint for categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await query(`
      SELECT id, name, slug, description, icon, color, is_active, sort_order
      FROM categories 
      WHERE is_active = TRUE 
      ORDER BY sort_order ASC, name ASC
    `);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories'
    });
  }
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

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/api/auth/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // For demo purposes, we'll use a simple password check
  // In production, use bcrypt.compare(password, user.password)
  if (password !== 'password') {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    token,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// Dashboard stats endpoint
app.get('/api/admin/dashboard', authenticateToken, async (req, res) => {
  try {
    const [productStats, articleStats, userStats] = await Promise.all([
      query('SELECT COUNT(*) as count FROM products'),
      query('SELECT COUNT(*) as count FROM articles'),
      query('SELECT COUNT(*) as count FROM users')
    ]);

    res.json({
      success: true,
      data: {
        productCount: productStats[0].count,
        articleCount: articleStats[0].count,
        userCount: userStats[0].count
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

// Articles endpoints
app.get('/api/articles', async (req, res) => {
  try {
    const { status, category, search, limit = 20, offset = 0 } = req.query;
    
    const options = {
      status: status || 'published',
      category_id: category,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const articles = await Article.findAll(options);
    
    res.json({
      success: true,
      data: articles,
      total: articles.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles'
    });
  }
});

app.post('/api/articles', authenticateToken, [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category_id').isInt().withMessage('Category ID is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const articleData = {
      ...req.body,
      author_id: req.user.id,
      slug: Article.generateSlug(req.body.title),
      reading_time: Article.calculateReadingTime(req.body.content),
      in_stock: req.body.in_stock !== undefined ? req.body.in_stock : true,
      published_at: req.body.status === 'published' ? new Date() : null
    };

    const articleId = await Article.create(articleData);
    const newArticle = await Article.findById(articleId);

    res.json({
      success: true,
      data: newArticle,
      message: 'Article created successfully'
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'article'
    });
  }
});

// Products management endpoints
app.get('/api/admin/products', authenticateToken, async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;
    
    const options = {
      category_id: category,
      search,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };

    const products = await Product.findAll(options);
    
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des produits'
    });
  }
});

app.post('/api/admin/products', authenticateToken, [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category_id').isInt().withMessage('Category ID is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const productData = {
      ...req.body,
      _id: `product-${Date.now()}`,
      product_number: Math.floor(Math.random() * 10000),
      status: 'published'
    };

    const productId = await Product.create(productData);
    const newProduct = await Product.findById(productId);

    res.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du produit'
    });
  }
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

