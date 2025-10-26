const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://alladsmarket.com', 'https://www.alladsmarket.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Données en mémoire
let products = [];
let articles = [];
let users = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    role: 'admin'
  }
];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Auth header:', authHeader);
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('JWT Error:', err.message);
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes de santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Authentification
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Produits
app.get('/api/products', (req, res) => {
  try {
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// Articles
app.get('/api/articles', (req, res) => {
  try {
    res.json({
      success: true,
      data: articles,
      total: articles.length
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching articles'
    });
  }
});

// Admin - Dashboard
app.get('/api/admin/dashboard', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        products: products.length,
        articles: articles.length,
        users: users.length
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});

// Admin - Produits
app.get('/api/admin/products', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

app.post('/api/admin/products', authenticateToken, (req, res) => {
  try {
    const { 
      name, 
      price, 
      category, 
      description, 
      images, 
      brand,
      originalPrice,
      inStock,
      isFeatured,
      isTrending,
      affiliateUrl,
      rating
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      });
    }

    const newProduct = {
      _id: `product_${Date.now()}`,
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      brand: brand || '',
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      inStock: inStock !== undefined ? inStock : true,
      isFeatured: isFeatured || false,
      isTrending: isTrending || false,
      affiliateUrl: affiliateUrl || '',
      images: images || [],
      rating: rating || { average: 0, count: 0 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});

// Admin - Articles
app.get('/api/admin/articles', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Admin articles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching articles'
    });
  }
});

app.post('/api/admin/articles', authenticateToken, (req, res) => {
  try {
    const { title, content, excerpt, category, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const newArticle = {
      _id: `article_${Date.now()}`,
      title,
      content,
      excerpt: excerpt || content.substring(0, 200) + '...',
      category: category || 'General',
      tags: tags || [],
      author: req.user.username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    articles.push(newArticle);

    res.status(201).json({
      success: true,
      data: newArticle,
      message: 'Article created successfully'
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating article'
    });
  }
});

// Catégories
app.get('/api/categories', (req, res) => {
  try {
    const categories = [
      { id: 'electronics', name: 'Electronics', slug: 'electronics' },
      { id: 'clothing', name: 'Clothing', slug: 'clothing' },
      { id: 'home', name: 'Home & Garden', slug: 'home-garden' },
      { id: 'sports', name: 'Sports & Outdoors', slug: 'sports-outdoors' },
      { id: 'books', name: 'Books', slug: 'books' }
    ];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Simple BEST server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Access: http://localhost:${PORT}`);
  console.log(`🏆 BEST - Your trusted marketplace`);
  console.log(`👤 Admin credentials: admin / password`);
});
