import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, Loader } from 'lucide-react';
import ProductCard from './ProductCard';
import { productAPI, productService } from '../services/minimalAPI';
import { formatNumber, getLocaleFromLanguage } from '../utils/numberFormatter';
import { useTranslation } from 'react-i18next';

const ProductList = ({ 
  initialProducts = [], 
  showFilters = true, 
  showSearch = true,
  onProductClick,
  initialSearchQuery = ''
}) => {
  const { i18n } = useTranslation();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Update products when initialProducts change
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      // Randomize the order of products
      const randomizedProducts = [...initialProducts].sort(() => Math.random() - 0.5);
      setProducts(randomizedProducts);
      setError(null); // Clear any existing errors
    }
  }, [initialProducts]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await productAPI.getCategories();
        setCategories(response.data.data || []);
      } catch (error) {
        // Use fallback categories
        setCategories(['electronics', 'fashion', 'home', 'sports', 'beauty', 'books', 'automotive', 'health', 'toys', 'garden']);
      }
    };
    loadCategories();
  }, []);

  // Initial load disabled - using sample data instead
  // useEffect(() => {
  //   // Only load if we don't have search query or category filters initially
  //   if (!initialSearchQuery && selectedCategory === 'all') {
  //     loadProducts(1, true);
  //   }
  // }, []);

  // Load products
  const loadProducts = async (page = 1, reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        limit: 10000, // Augmenté pour afficher tous les produits
        search: searchQuery || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        sortBy,
        sortOrder,
      };

      // Try new product service first, fallback to old API
      let response;
      try {
        response = await productService.getProducts(params);
      } catch (error) {
        console.warn('New product service failed, trying fallback:', error);
        response = await productAPI.getProducts(params);
      }
      
      const { data, pagination: paginationData } = response.data;

      // Randomize the order of products
      const randomizedData = [...data].sort(() => Math.random() - 0.5);

      if (reset) {
        setProducts(randomizedData);
      } else {
        setProducts(prev => page === 1 ? randomizedData : [...prev, ...randomizedData]);
      }
      
      setPagination(paginationData);
    } catch (error) {
      setError('Failed to load products. Please try again.');
      // Error loading products
    } finally {
      setLoading(false);
    }
  };

  // Load products when filters change - disabled, using sample data
  // useEffect(() => {
  //   loadProducts(1, true);
  // }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  // Listen for product updates to reload in real-time - disabled
  useEffect(() => {
    const handleProductUpdate = () => {
      // loadProducts(1, true); // Disabled, using sample data
    };
    
    window.addEventListener('productUpdated', handleProductUpdate);
    
    return () => {
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    setSortBy(field);
    setSortOrder(order);
  };

  // Load more products
  const loadMore = () => {
    // Disabled - using sample data
    // if (pagination.hasNextPage && !loading) {
    //   loadProducts(pagination.currentPage + 1, false);
    // }
  };

  // Handle product click
  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="product-list-container">
      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="product-filters">
          {showSearch && (
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
          )}

          {showFilters && (
            <div className="filter-controls">
              <div className="filter-group">
                <Filter size={16} />
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={category.category || `category-${index}`} value={category.category}>
                      {category.category} ({formatNumber(category.count, getLocaleFromLanguage(i18n.language))})
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={handleSortChange}
                  className="filter-select"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => {
            setError(null);
            setProducts(initialProducts);
          }} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {/* Products Grid/List */}
      {!error && (
        <div className={`products-container ${viewMode}`}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))
          ) : !loading && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="clear-filters-button"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <Loader size={24} className="loading-spinner" />
          <p>Loading products...</p>
        </div>
      )}

      {/* Load More Button */}
      {!loading && pagination.hasNextPage && (
        <div className="load-more-container">
          <button onClick={loadMore} className="load-more-button">
            Load More Products
          </button>
        </div>
      )}

      {/* Results Summary */}
      {!error && products.length > 0 && (
        <div className="results-summary">
          <p>
            Showing {products.length} of {pagination.totalProducts} products
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
