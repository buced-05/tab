// Minimal client-side API - No external dependencies
import { getAllProducts } from '../utils/sampleData.js';

// Simple delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Minimal product API
export const productAPI = {
  getProducts: async (params = {}) => {
    try {
      await delay(50);
      
      let products = getAllProducts();
      
      // Simple filtering
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (params.category) {
        products = products.filter(p => p.category === params.category);
      }
      
      return {
        success: true,
        data: {
          products: products.slice(0, 12), // Limit to 12 products
          pagination: {
            page: 1,
            limit: 12,
            total: products.length,
            totalPages: 1
          }
        }
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message,
        data: { products: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } }
      };
    }
  },

  getProduct: async (idOrSlug) => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      // Try to find by slug first, then by id
      const product = products.find(p => p.slug === idOrSlug || p._id === idOrSlug);
      
      if (!product) {
        return {
          success: false,
          error: 'Product not found',
          data: null
        };
      }
      
      return {
        success: true,
        data: product
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  },

  getTrendingProducts: async () => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      const trendingProducts = products.filter(p => p.isTrending).slice(0, 6);
      
      return {
        success: true,
        data: trendingProducts
      };
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  getFeaturedProducts: async () => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
      
      return {
        success: true,
        data: featuredProducts
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  trackClick: async (productId) => {
    // No tracking - just return success
    return { success: true, message: 'Click logged' };
  }
};

// Minimal analytics
export const analyticsAPI = {
  trackEvent: async (eventName, eventData = {}, productId = null) => {
    return { success: true, message: 'Event logged' };
  },

  trackPageView: async (pageName, pageData = {}) => {
    return { success: true, message: 'Page view logged' };
  }
};

// Product service alias
export const productService = productAPI;

export default {
  productAPI,
  analyticsAPI,
  productService
};


