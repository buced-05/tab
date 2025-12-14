import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import realAPI from '../services/realAPI';
import { getDiscoveryStats, initializeDiscoveryStats } from '../services/discoveryStatsService';
import '../styles/admin.css';

const Admin = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Authentication state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Dashboard data
  const [dashboardData, setDashboardData] = useState(null);

  // Products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Articles state
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // New product/article forms
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    originalPrice: '',
    inStock: true,
    isFeatured: false,
    isTrending: false,
    affiliateUrl: '',
    tags: [],
    images: [],
    specifications: {},
    rating: {
      average: 0,
      count: 0
    }
  });

  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    productId: '',
    tags: [],
    featuredImage: '',
    status: 'draft'
  });

  // API base URL - using mock for development
  const API_BASE = 'http://localhost:5001/api';

  // Authentication functions
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use real API
      const data = await realAPI.login(loginData.username, loginData.password);

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        setIsAuthenticated(true);
        setUser(data.user);
        await loadDashboardData();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
    setDashboardData(null);
  };

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      loadDashboardData();
    }

    // Initialize and load discovery statistics
    initializeDiscoveryStats();
    const stats = getDiscoveryStats();
    setDiscoveryStats(stats);
  }, []);

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['new-product', 'new-article'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      const data = await realAPI.getDashboardStats();
      setDashboardData(data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  // Load products
  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await realAPI.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  // Load articles
  const loadArticles = async () => {
    setArticlesLoading(true);
    try {
      const data = await realAPI.getArticles();
      setArticles(data);
    } catch (err) {
      console.error('Error loading articles:', err);
    } finally {
      setArticlesLoading(false);
    }
  };

  // Create new product
  const createProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await realAPI.createProduct(newProduct);
      if (data.success) {
        alert('Product created successfully!');
        setNewProduct({
          name: '',
          description: '',
          brand: '',
          category: '',
          price: '',
          originalPrice: '',
          inStock: true,
          isFeatured: false,
          isTrending: false,
          affiliateUrl: '',
          tags: [],
          images: [],
          specifications: {}
        });
        loadProducts();
      } else {
        alert('Error creating product: ' + data.message);
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create new article
  const createArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await realAPI.createArticle(newArticle);
      if (data.success) {
        alert('Article created successfully!');
        setNewArticle({
          title: '',
          content: '',
          excerpt: '',
          author: '',
          category: '',
          productId: '',
          tags: [],
          featuredImage: '',
          status: 'draft'
        });
        loadArticles();
      } else {
        alert('Error creating article: ' + data.message);
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load data when switching tabs
  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'products') {
        loadProducts();
      } else if (activeTab === 'articles') {
        loadArticles();
      }
    }
  }, [activeTab, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <SEOHead
          title="Admin Login - AllAdsMarket"
          description="Admin panel for managing products and articles"
          url="/app-admin"
        />

        <div className="login-container">
          <div className="login-card">
            <h1>Admin Login</h1>
            <form onSubmit={login}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <SEOHead
        title="Admin Panel - AllAdsMarket"
        description="Admin panel for managing products and articles"
        url="/app-admin"
      />

      <div className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-user">
          Welcome, {user?.username} ({user?.role})
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={activeTab === 'articles' ? 'active' : ''}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
        <button
          className={activeTab === 'new-product' ? 'active' : ''}
          onClick={() => setActiveTab('new-product')}
        >
          New Product
        </button>
        <button
          className={activeTab === 'new-article' ? 'active' : ''}
          onClick={() => setActiveTab('new-article')}
        >
          New Article
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Dashboard</h2>
            {dashboardData ? (
              <div className="dashboard-stats">
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <p>{dashboardData.statistics?.totalProducts || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Articles</h3>
                  <p>{dashboardData.statistics?.totalArticles || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Published Articles</h3>
                  <p>{dashboardData.statistics?.publishedArticles || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p>{dashboardData.statistics?.totalUsers || 0}</p>
                </div>
              </div>
            ) : (
              <p>Loading dashboard data...</p>
            )}

            {/* Discovery Statistics Section */}
            {discoveryStats && (
              <div className="discovery-stats-section" style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Discovery Statistics</h3>
                <div className="dashboard-stats">
                  <div className="stat-card" style={{ backgroundColor: '#f0f9ff', border: '1px solid #0ea5e9' }}>
                    <h3>Pages découvertes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0ea5e9' }}>
                      {discoveryStats.pagesDiscovered || 0}
                    </p>
                    {discoveryStats.lastUpdateDate && (
                      <small style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        Last update: {new Date(discoveryStats.lastUpdateDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </small>
                    )}
                  </div>
                  <div className="stat-card" style={{ backgroundColor: '#fef3f2', border: '1px solid #ef4444' }}>
                    <h3>Vidéos découvertes</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                      {discoveryStats.videosDiscovered || 0}
                    </p>
                    {discoveryStats.lastUpdateDate && (
                      <small style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        Last update: {new Date(discoveryStats.lastUpdateDate).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <h2>Products Management</h2>
            {productsLoading ? (
              <p>Loading products...</p>
            ) : (
              <div className="products-list">
                {products.map(product => (
                  <div key={product._id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>Brand: {product.brand}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <div className="product-actions">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="articles-section">
            <h2>Articles Management</h2>
            {articlesLoading ? (
              <p>Loading articles...</p>
            ) : (
              <div className="articles-list">
                {articles.map(article => (
                  <div key={article._id} className="article-item">
                    <h3>{article.title}</h3>
                    <p>Author: {article.author}</p>
                    <p>Status: {article.status}</p>
                    <p>Category: {article.category}</p>
                    <div className="article-actions">
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'new-product' && (
          <div className="new-product-section">
            <h2>Create New Product</h2>
            <form onSubmit={createProduct}>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating (0-5 stars)</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newProduct.rating.average}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      rating: { ...newProduct.rating, average: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="4.5"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Reviews</label>
                  <input
                    type="number"
                    min="0"
                    value={newProduct.rating.count}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      rating: { ...newProduct.rating, count: parseInt(e.target.value) || 0 }
                    })}
                    placeholder="150"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Affiliate URL</label>
                <input
                  type="url"
                  value={newProduct.affiliateUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.inStock}
                      onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    />
                    In Stock
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.isFeatured}
                      onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                    />
                    Featured
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.isTrending}
                      onChange={(e) => setNewProduct({ ...newProduct, isTrending: e.target.checked })}
                    />
                    Trending
                  </label>
                </div>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'new-article' && (
          <div className="new-article-section">
            <h2>Create New Article</h2>
            <form onSubmit={createArticle}>
              <div className="form-group">
                <label>Article Title</label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  rows="10"
                  required
                />
              </div>

              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newArticle.status}
                    onChange={(e) => setNewArticle({ ...newArticle, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Featured Image URL</label>
                <input
                  type="url"
                  value={newArticle.featuredImage}
                  onChange={(e) => setNewArticle({ ...newArticle, featuredImage: e.target.value })}
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Article'}
              </button>
            </form>
          </div>
        )}

        {/* New Product Tab */}
        {activeTab === 'new-product' && (
          <div className="tab-content">
            <h2>Create New Product</h2>
            <form onSubmit={createProduct} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Original Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Affiliate URL</label>
                  <input
                    type="url"
                    value={newProduct.affiliateUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, affiliateUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URLs (one per line)</label>
                <textarea
                  value={newProduct.images.join('\n')}
                  onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value.split('\n').filter(url => url.trim()) })}
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.isFeatured}
                      onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                    />
                    Featured Product
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.isTrending}
                      onChange={(e) => setNewProduct({ ...newProduct, isTrending: e.target.checked })}
                    />
                    Trending Product
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={newProduct.inStock}
                      onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    />
                    In Stock
                  </label>
                </div>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </form>
          </div>
        )}

        {/* New Article Tab */}
        {activeTab === 'new-article' && (
          <div className="tab-content">
            <h2>Create New Article</h2>
            <form onSubmit={createArticle} className="admin-form">
              <div className="form-group">
                <label>Article Title *</label>
                <input
                  type="text"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content *</label>
                <textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports</option>
                    <option value="beauty">Beauty</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Featured Image URL</label>
                <input
                  type="url"
                  value={newArticle.featuredImage}
                  onChange={(e) => setNewArticle({ ...newArticle, featuredImage: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newArticle.status}
                    onChange={(e) => setNewArticle({ ...newArticle, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Product ID (optional)</label>
                  <input
                    type="number"
                    value={newArticle.productId}
                    onChange={(e) => setNewArticle({ ...newArticle, productId: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Article'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
