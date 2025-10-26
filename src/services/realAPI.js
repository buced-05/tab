// src/services/realAPI.js
const API_BASE = 'http://localhost:5000/api';

const realAPI = {
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  getDashboardStats: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch dashboard stats');
      }
    } catch (error) {
      console.error('Dashboard stats error:', error);
      throw error;
    }
  },

  getProducts: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/admin/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Products fetch error:', error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();
      
      if (data.success) {
        return { success: true, product: data.data };
      } else {
        throw new Error(data.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Product creation error:', error);
      throw error;
    }
  },

  getArticles: async () => {
    try {
      const response = await fetch(`${API_BASE}/articles`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch articles');
      }
    } catch (error) {
      console.error('Articles fetch error:', error);
      throw error;
    }
  },

  createArticle: async (articleData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();
      
      if (data.success) {
        return { success: true, article: data.data };
      } else {
        throw new Error(data.message || 'Failed to create article');
      }
    } catch (error) {
      console.error('Article creation error:', error);
      throw error;
    }
  },
};

export default realAPI;
