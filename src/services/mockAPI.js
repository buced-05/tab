// Mock API for development when backend is not available
const mockAPI = {
  // Mock data
  users: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: 'password',
      role: 'admin'
    }
  ],
  products: [],
  articles: [],
  comments: [],

  // Mock authentication
  async login(username, password) {
    console.log('Mock login attempt:', username);
    
    const user = this.users.find(u => 
      u.username === username || u.email === username
    );

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    console.log('Mock login successful for user:', username);
    
    return {
      success: true,
      token: 'mock-token-' + Date.now(),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  },

  // Mock products
  async getProducts() {
    return this.products;
  },

  async createProduct(productData) {
    const newProduct = {
      id: this.products.length + 1,
      ...productData,
      created_at: new Date()
    };
    this.products.push(newProduct);
    return {
      success: true,
      message: 'Product created',
      product: newProduct
    };
  },

  // Mock articles
  async getArticles() {
    return this.articles;
  },

  async createArticle(articleData) {
    const newArticle = {
      id: this.articles.length + 1,
      ...articleData,
      created_at: new Date()
    };
    this.articles.push(newArticle);
    return {
      success: true,
      message: 'Article created',
      article: newArticle
    };
  },

  // Mock dashboard stats
  async getDashboardStats() {
    return {
      productCount: this.products.length,
      articleCount: this.articles.length,
      userCount: this.users.length
    };
  }
};

export default mockAPI;
