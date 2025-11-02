#!/usr/bin/env node

/**
 * 🔒 Configuration de Sécurité Avancée - AllAdsMarket
 * Protection contre phishing, injections SQL, et failles de sécurité
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

// Configuration de sécurité
const SECURITY_CONFIG = {
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-' + Date.now(),
  JWT_EXPIRES_IN: '24h',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100, // 100 requêtes par fenêtre
  
  // CORS
  ALLOWED_ORIGINS: [
    'https://alladsmarket.com',
    'https://www.alladsmarket.com',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  
  // Headers de sécurité - Optimisés pour SEO et bots IA
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN', // Changé de DENY à SAMEORIGIN pour bots
    // Note: X-XSS-Protection obsolète, protection moderne via CSP
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    // Cross-Origin headers désactivés pour permettre l'indexation par les bots IA
    // 'Cross-Origin-Embedder-Policy': 'require-corp',
    // 'Cross-Origin-Opener-Policy': 'same-origin',
    // 'Cross-Origin-Resource-Policy': 'same-origin'
  }
};

// Configuration de la base de données sécurisée
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'your_mysql_user',
  password: process.env.DB_PASSWORD || 'your_mysql_password',
  database: process.env.DB_NAME || 'alladsmarket',
  port: process.env.DB_PORT || 3306,
  // Configuration de sécurité MySQL
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Protection contre les injections SQL
  multipleStatements: false,
  // Timeout de connexion
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // Charset sécurisé
  charset: 'utf8mb4',
  timezone: '+00:00'
};

// Créer le pool de connexions sécurisé
const pool = mysql.createPool(dbConfig);

// Middleware de sécurité avancé
function createSecurityMiddleware() {
  const app = express();
  
  // 1. Helmet pour les headers de sécurité - Optimisé pour SEO et bots IA
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
        connectSrc: ["'self'", "https://alladsmarket.com"],
        frameSrc: ["'self'", "https:"], // Changé de 'none' à permettre les frames pour bots IA
        objectSrc: ["'none'"],
        // upgradeInsecureRequests: [] // Désactivé pour compatibilité avec certains bots
      }
    },
    crossOriginEmbedderPolicy: false, // Désactivé pour bots IA
    crossOriginOpenerPolicy: false, // Désactivé pour bots IA
    crossOriginResourcePolicy: false, // Désactivé pour bots IA
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));
  
  // 2. CORS sécurisé
  app.use(cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`🚨 Tentative d'accès non autorisée depuis: ${origin}`);
        callback(new Error('Non autorisé par CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count']
  }));
  
  // 3. Rate Limiting
  const limiter = rateLimit({
    windowMs: SECURITY_CONFIG.RATE_LIMIT_WINDOW,
    max: SECURITY_CONFIG.RATE_LIMIT_MAX,
    message: {
      error: 'Trop de requêtes depuis cette IP, réessayez plus tard.',
      retryAfter: Math.ceil(SECURITY_CONFIG.RATE_LIMIT_WINDOW / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Ignorer les IPs de confiance (optionnel)
    skip: (req) => {
      const trustedIPs = ['127.0.0.1', '::1'];
      return trustedIPs.includes(req.ip);
    }
  });
  
  app.use('/api/', limiter);
  
  // 4. Protection contre les injections NoSQL
  app.use(mongoSanitize());
  
  // 5. Protection XSS
  app.use(xss());
  
  // 6. Protection contre la pollution des paramètres HTTP
  app.use(hpp());
  
  // 7. Compression sécurisée
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    }
  }));
  
  // 8. Parsing sécurisé du JSON
  app.use(express.json({ 
    limit: '10mb',
    verify: (req, res, buf) => {
      // Vérifier la taille du payload
      if (buf.length > 10 * 1024 * 1024) {
        throw new Error('Payload trop volumineux');
      }
    }
  }));
  
  app.use(express.urlencoded({ 
    extended: true, 
    limit: '10mb',
    parameterLimit: 100
  }));
  
  // 9. Headers de sécurité personnalisés
  app.use((req, res, next) => {
    Object.entries(SECURITY_CONFIG.SECURITY_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    // Ajouter un header de sécurité personnalisé
    res.setHeader('X-Security-Level', 'High');
    res.setHeader('X-Content-Security', 'Protected');
    
    next();
  });
  
  return app;
}

// Validation des données d'entrée
const validationRules = {
  // Validation pour les produits
  product: [
    body('name').trim().isLength({ min: 3, max: 255 }).escape(),
    body('description').trim().isLength({ min: 10, max: 5000 }).escape(),
    body('price').isFloat({ min: 0, max: 999999.99 }),
    body('category').trim().isLength({ min: 2, max: 100 }).escape(),
    body('brand').optional().trim().isLength({ max: 100 }).escape(),
    body('sku').optional().trim().isLength({ max: 100 }).escape()
  ],
  
  // Validation pour les articles
  article: [
    body('title').trim().isLength({ min: 10, max: 255 }).escape(),
    body('content').trim().isLength({ min: 100, max: 50000 }).escape(),
    body('excerpt').optional().trim().isLength({ max: 500 }).escape(),
    body('category_id').isInt({ min: 1 })
  ],
  
  // Validation pour l'authentification
  auth: [
    body('username').trim().isLength({ min: 3, max: 50 }).escape(),
    body('password').isLength({ min: 8, max: 128 })
  ]
};

// Middleware de validation
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors: errors.array()
    });
  }
  next();
}

// Protection contre les injections SQL
class SecureDatabase {
  constructor(pool) {
    this.pool = pool;
  }
  
  // Requête sécurisée avec paramètres préparés
  async query(sql, params = []) {
    try {
      // Vérifier que la requête ne contient pas de mots-clés dangereux
      const dangerousKeywords = [
        'DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'CREATE', 'TRUNCATE',
        'EXEC', 'EXECUTE', 'UNION', 'SELECT *', 'INFORMATION_SCHEMA'
      ];
      
      const upperSql = sql.toUpperCase();
      for (const keyword of dangerousKeywords) {
        if (upperSql.includes(keyword) && !upperSql.includes('WHERE')) {
          throw new Error(`Requête potentiellement dangereuse détectée: ${keyword}`);
        }
      }
      
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('🚨 Erreur de base de données sécurisée:', error.message);
      throw new Error('Erreur de base de données');
    }
  }
  
  // Requête sécurisée pour les produits
  async getProducts(limit = 50, offset = 0) {
    const sql = 'SELECT * FROM products WHERE status = ? LIMIT ? OFFSET ?';
    return await this.query(sql, ['active', limit, offset]);
  }
  
  // Requête sécurisée pour un produit spécifique
  async getProductById(id) {
    // Vérifier que l'ID est un nombre
    if (!Number.isInteger(parseInt(id))) {
      throw new Error('ID de produit invalide');
    }
    
    const sql = 'SELECT * FROM products WHERE id = ? AND status = ?';
    const results = await this.query(sql, [id, 'active']);
    return results[0] || null;
  }
  
  // Requête sécurisée pour les articles
  async getArticles(limit = 50, offset = 0) {
    const sql = 'SELECT * FROM articles WHERE status = ? LIMIT ? OFFSET ?';
    return await this.query(sql, ['published', limit, offset]);
  }
}

// Protection contre le phishing
class PhishingProtection {
  static checkUrl(url) {
    const suspiciousPatterns = [
      /bit\.ly/i,
      /tinyurl/i,
      /goo\.gl/i,
      /t\.co/i,
      /amzn\.to/i,
      /amazon\.com\/dp\//i,
      /amazon\.fr\/dp\//i,
      /amazon\.co\.uk\/dp\//i
    ];
    
    // Vérifier les patterns suspects
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url)) {
        console.log(`🚨 URL suspecte détectée: ${url}`);
        return false;
      }
    }
    
    return true;
  }
  
  static sanitizeUrl(url) {
    try {
      const urlObj = new URL(url);
      
      // Vérifier le protocole
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Protocole non autorisé');
      }
      
      // Vérifier le domaine
      const allowedDomains = [
        'alladsmarket.com',
        'amazon.com',
        'amazon.fr',
        'amazon.co.uk',
        'amazon.de',
        'amazon.it',
        'amazon.es'
      ];
      
      const hostname = urlObj.hostname.toLowerCase();
      const isAllowed = allowedDomains.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain)
      );
      
      if (!isAllowed) {
        throw new Error('Domaine non autorisé');
      }
      
      return urlObj.toString();
    } catch (error) {
      console.log(`🚨 URL invalide: ${url} - ${error.message}`);
      return null;
    }
  }
}

// Middleware de protection contre le phishing
function phishingProtection(req, res, next) {
  // Vérifier les URLs dans le body
  if (req.body && typeof req.body === 'object') {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string' && value.startsWith('http')) {
        const sanitizedUrl = PhishingProtection.sanitizeUrl(value);
        if (!sanitizedUrl) {
          return res.status(400).json({
            success: false,
            message: 'URL non autorisée détectée'
          });
        }
        req.body[key] = sanitizedUrl;
      }
    }
  }
  
  next();
}

// Protection CSRF
function csrfProtection(req, res, next) {
  // Vérifier le token CSRF pour les requêtes POST/PUT/DELETE
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const csrfToken = req.headers['x-csrf-token'];
    const sessionToken = req.session?.csrfToken;
    
    if (!csrfToken || !sessionToken || csrfToken !== sessionToken) {
      return res.status(403).json({
        success: false,
        message: 'Token CSRF invalide'
      });
    }
  }
  
  next();
}

// Logging de sécurité
function securityLogger(req, res, next) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      duration: duration,
      contentLength: res.get('Content-Length')
    };
    
    // Log des activités suspectes
    if (res.statusCode >= 400) {
      console.log('🚨 Activité suspecte détectée:', logData);
    }
    
    // Log des requêtes lentes
    if (duration > 5000) {
      console.log('⚠️ Requête lente détectée:', logData);
    }
  });
  
  next();
}

// Fonction principale pour créer l'application sécurisée
function createSecureApp() {
  const app = createSecurityMiddleware();
  
  // Ajouter les middlewares de sécurité
  app.use(securityLogger);
  app.use(phishingProtection);
  app.use(csrfProtection);
  
  // Créer l'instance de base de données sécurisée
  const secureDB = new SecureDatabase(pool);
  
  // Routes sécurisées
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'OK',
      security: 'High',
      timestamp: new Date().toISOString()
    });
  });
  
  // Route pour les produits (sécurisée)
  app.get('/api/products', async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      
      const products = await secureDB.getProducts(limit, offset);
      res.json({
        success: true,
        data: products,
        pagination: {
          limit,
          offset,
          total: products.length
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  });
  
  // Route pour un produit spécifique (sécurisée)
  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await secureDB.getProductById(req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produit non trouvé'
        });
      }
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  });
  
  // Route pour les articles (sécurisée)
  app.get('/api/articles', async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const offset = Math.max(parseInt(req.query.offset) || 0, 0);
      
      const articles = await secureDB.getArticles(limit, offset);
      res.json({
        success: true,
        data: articles,
        pagination: {
          limit,
          offset,
          total: articles.length
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur'
      });
    }
  });
  
  // Gestionnaire d'erreurs global
  app.use((error, req, res, next) => {
    console.error('🚨 Erreur de sécurité:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur',
      timestamp: new Date().toISOString()
    });
  });
  
  // Route 404 sécurisée
  app.use('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route non trouvée',
      timestamp: new Date().toISOString()
    });
  });
  
  return app;
}

// Export des composants de sécurité
export {
  createSecureApp,
  SECURITY_CONFIG,
  PhishingProtection,
  SecureDatabase,
  validationRules,
  validateRequest
};

// Si exécuté directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createSecureApp();
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`🔒 Serveur sécurisé démarré sur le port ${PORT}`);
    console.log(`🛡️ Protection: Phishing, SQL Injection, XSS, CSRF`);
    console.log(`🚀 Mode: ${process.env.NODE_ENV || 'development'}`);
  });
}
