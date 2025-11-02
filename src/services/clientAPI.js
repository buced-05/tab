// Client-side only API service - No server, no cookies, no tracking
import { getAllProducts } from '../utils/sampleData.js';

// Simple delay function for realistic loading
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Client-side only product API
export const productAPI = {
  // Get all products with filtering and pagination
  getProducts: async (params = {}) => {
    try {
      await delay(100); // Simulate loading
      
      let products = getAllProducts();
      
      // Apply filters
      if (params.category) {
        products = products.filter(p => p.category === params.category);
      }
      
      if (params.featured === 'true') {
        products = products.filter(p => p.isFeatured);
      }
      
      if (params.trending === 'true') {
        products = products.filter(p => p.isTrending);
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply pagination
      const page = parseInt(params.page) || 1;
      const limit = parseInt(params.limit) || 12;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedProducts = products.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: {
          products: paginatedProducts,
          pagination: {
            page,
            limit,
            total: products.length,
            totalPages: Math.ceil(products.length / limit)
          }
        }
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get single product by ID or slug
  getProduct: async (idOrSlug) => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      // Try to find by slug first, then by id
      const product = products.find(p => p.slug === idOrSlug || p._id === idOrSlug);
      
      if (!product) {
        return {
          success: false,
          error: 'Product not found'
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
        error: error.message
      };
    }
  },

  // Get trending products
  getTrendingProducts: async () => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      const trendingProducts = products.filter(p => p.isTrending);
      
      return {
        success: true,
        data: trendingProducts
      };
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get featured products
  getFeaturedProducts: async () => {
    try {
      await delay(50);
      
      const products = getAllProducts();
      const featuredProducts = products.filter(p => p.isFeatured);
      
      return {
        success: true,
        data: featuredProducts
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Simple click tracking (no storage)
  trackClick: async (productId) => {
    try {
      console.log('Product click:', productId);
      return {
        success: true,
        message: 'Click logged (no storage)'
      };
    } catch (error) {
      console.error('Error tracking click:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Simple analytics (no tracking)
export const analyticsAPI = {
  trackEvent: async (eventName, eventData = {}, productId = null) => {
    // No tracking - client-side only
    return {
      success: true,
      message: 'Analytics disabled (client-side only)'
    };
  },

  trackPageView: async (pageName, pageData = {}) => {
    // No tracking - client-side only
    return {
      success: true,
      message: 'Page view tracking disabled (client-side only)'
    };
  }
};

// Product service alias
export const productService = productAPI;

// Export default
export default {
  productAPI,
  analyticsAPI,
  productService
};



