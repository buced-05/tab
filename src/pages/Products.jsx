import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';
// import apiService from '../services/apiService'; // Removed unused service
import { getFeaturedProducts, getTrendingProducts, getAllProducts } from '../utils/sampleData';

const Products = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentPath = location.pathname;
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        
        let result;
        
        // Try to load from API first
        if (currentPath === '/featured') {
          result = await apiService.getFeaturedProducts();
        } else if (currentPath === '/trending') {
          result = await apiService.getTrendingProducts();
        } else if (search) {
          result = await apiService.searchProducts(search);
        } else if (category && category !== 'all') {
          result = await apiService.getProductsByCategory(category);
        } else {
          result = await apiService.getProducts();
        }
        
        if (result.success) {
          setProducts(result.data || []);
        } else {
          throw new Error(result.error || 'Failed to load products from API');
        }
      } catch (error) {
        console.warn('API failed, falling back to sample data:', error);
        
        // Fallback to sample data
        const currentPath = location.pathname;
        let products = [];
        
        if (currentPath === '/featured') {
          products = getFeaturedProducts();
        } else if (currentPath === '/trending') {
          products = getTrendingProducts();
        } else {
          products = getAllProducts();
        }
        
        // Apply search filter if present
        const search = searchParams.get('search');
        if (search) {
          products = products.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            (product.brand && product.brand.toLowerCase().includes(search.toLowerCase()))
          );
        }
        
        // Apply category filter if present
        const category = searchParams.get('category');
        if (category && category !== 'all') {
          products = products.filter(product => product.category === category);
        }
        
        // Randomize the order of products
        products = [...products].sort(() => Math.random() - 0.5);
        
        setProducts(products);
      }
      
      setLoading(false);
    };

    loadProducts();

    // Listen for storage changes to reload products
    const handleStorageChange = (e) => {
      if (e.key === 'customProducts' || e.key === null) {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    const handleProductUpdate = () => {
      loadProducts();
    };
    
    window.addEventListener('productUpdated', handleProductUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, [searchParams, location.pathname]);

  const handleProductClick = (product) => {
    // Navigate to product detail page
    window.location.href = `/products/${product._id}`;
  };

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    
    // Route-based titles take priority
    if (currentPath === '/featured') {
      return 'Featured Products';
    } else if (currentPath === '/trending') {
      return 'Trending Products';
    }
    const discounted = searchParams.get('discounted');

    if (search) return `Search Results for "${search}"`;
    if (featured === 'true') return 'Featured Products';
    if (trending === 'true') return 'Trending Products';
    if (discounted === 'true') return 'Discounted Products';
    if (category) return `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    return 'All Products';
  };

  const getPageDescription = () => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    const discounted = searchParams.get('discounted');

    if (search) return `Find the best products matching "${search}"`;
    if (featured === 'true') return 'Discover our handpicked featured products';
    if (trending === 'true') return 'See what\'s popular right now';
    if (discounted === 'true') return 'Great deals on discounted products';
    if (category) return `Browse our selection of ${category} products`;
    return 'Browse our complete collection of amazing products';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            // Reload products using sample data
            const currentPath = location.pathname;
            let products = [];
            
            if (currentPath === '/featured') {
              products = getFeaturedProducts();
            } else if (currentPath === '/trending') {
              products = getTrendingProducts();
            } else {
              products = getAllProducts();
            }
            
            setProducts(products);
            setLoading(false);
          }} 
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">{getPageTitle()}</h1>
          <p className="page-description">{getPageDescription()}</p>
        </div>

        {/* Products List */}
        <ProductList
          initialProducts={products}
          showFilters={true}
          showSearch={true}
          onProductClick={handleProductClick}
          initialSearchQuery={searchParams.get('search') || ''}
        />
      </div>
    </div>
  );
};

export default Products;
