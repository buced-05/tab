import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Grid, Filter, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import ProductList from '../components/ProductList';
import SEOHead from '../components/SEOHead';
import HiddenHashtags from '../components/HiddenHashtags';
import { productAPI } from '../services/minimalAPI';
import { getTrendingProducts, getAllProducts } from '../utils/sampleData';

const Home = () => {
  const { t } = useTranslation();
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadHomeData = () => {
      setLoading(true);
      setError(null);
      
      // Use sample data directly since we don't have a backend API
      console.log('Loading sample data for home page');
      
      // Randomize the order of products
      const trendingData = getTrendingProducts();
      const allData = getAllProducts();
      
      setTrendingProducts([...trendingData].sort(() => Math.random() - 0.5));
      setAllProducts([...allData].sort(() => Math.random() - 0.5));
      setLoading(false);
    };
    
    loadHomeData();

    // Listen for product updates to reload data
    const handleProductUpdate = () => {
      loadHomeData();
    };
    
    window.addEventListener('productUpdated', handleProductUpdate);

    return () => {
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, []);

  const handleProductClick = (product) => {
    // Utiliser le slug si disponible, sinon fallback sur _id
    if (!product) {
      console.error('[Home] Produit invalide');
      return;
    }
    
    // Vérifier que le produit a un slug
    if (!product.slug) {
      console.warn('[Home] Produit sans slug:', {
        id: product._id,
        name: product.name?.substring(0, 50)
      });
    }
    
    const productIdentifier = product.slug || product._id;
    if (productIdentifier) {
      const url = `/products/${productIdentifier}`;
      console.log('[Home] Navigation vers:', url, { slug: product.slug, id: product._id });
      window.location.href = url;
    } else {
      console.error('[Home] Produit sans slug ni _id:', product);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h3>{t('home.loading')}</h3>
        <p>{t('home.loadingSubtitle')}</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <SEOHead 
        title={t('home.title')}
        description="Découvrez une sélection soigneusement choisie de produits exceptionnels. Trouvez les meilleures offres, des produits de qualité et des marques de confiance."
        keywords="produits tendances, offres exclusives, deals, shopping en ligne, e-commerce, marques premium, bonnes affaires, produits populaires, qualité, sélection"
        url="/"
      />
      <HiddenHashtags />
      
      {/* Site Introduction */}
      <section className="site-introduction">
        <div className="container">
          <div className="intro-content">
            <h1 className="intro-title">
              {t('home.welcome')} <span className="intro-highlight">AllAdsMarket</span>
            </h1>
            <p className="intro-description">
              {t('home.introDescription')}
            </p>
            <div className="intro-stats">
              <div className="intro-stat">
                <span className="stat-number">100K+</span>
                <span className="stat-label">{t('home.statsProducts')}</span>
              </div>
              <div className="intro-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">{t('home.statsBrands')}</span>
              </div>
              <div className="intro-stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">{t('home.statsClients')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Categories */}
      <section className="quick-categories">
        <div className="container">
            <h2 className="section-title">{t('home.buyByCategory')}</h2>
          <div className="categories-grid">
            <Link to="/products?category=electronics" className="category-card">
              <div className="category-icon">📱</div>
              <h3>{t('home.categoryElectronics')}</h3>
              <p>{t('home.categoryElectronicsDesc')}</p>
            </Link>
            <Link to="/products?category=fashion" className="category-card">
              <div className="category-icon">👕</div>
              <h3>{t('home.categoryFashion')}</h3>
              <p>{t('home.categoryFashionDesc')}</p>
            </Link>
            <Link to="/products?category=home" className="category-card">
              <div className="category-icon">🏠</div>
              <h3>{t('home.categoryHome')}</h3>
              <p>{t('home.categoryHomeDesc')}</p>
            </Link>
            <Link to="/products?category=sports" className="category-card">
              <div className="category-icon">⚽</div>
              <h3>{t('home.categorySports')}</h3>
              <p>{t('home.categorySportsDesc')}</p>
            </Link>
            <Link to="/products?category=beauty" className="category-card">
              <div className="category-icon">💄</div>
              <h3>{t('home.categoryBeauty')}</h3>
              <p>{t('home.categoryBeautyDesc')}</p>
            </Link>
            <Link to="/products?category=books" className="category-card">
              <div className="category-icon">📚</div>
              <h3>{t('home.categoryBooks')}</h3>
              <p>{t('home.categoryBooksDesc')}</p>
            </Link>
          </div>
        </div>
      </section>


      {/* Trending Products Section */}
      {trendingProducts.length > 0 && (
        <section className="trending-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-container">
                <h2 className="section-title">
                  <TrendingUp size={20} className="title-icon" />
                  {t('home.trendingNow')}
                </h2>
                <p className="section-subtitle">{t('home.trendingSubtitle')}</p>
              </div>
              <Link to="/trending" className="section-link">
                {t('home.viewAllTrends')}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="products-showcase">
              {trendingProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="all-products-section">
        <div className="container">
            <div className="section-header">
              <div className="section-title-container">
                <h2 className="section-title">
                  <Grid size={32} className="title-icon" />
                  {t('home.allProducts')}
                </h2>
                <p className="section-subtitle">{t('home.allProductsSubtitle')}</p>
              </div>
            </div>
          <ProductList
            initialProducts={allProducts}
            showFilters={true}
            showSearch={true}
            onProductClick={handleProductClick}
            initialSearchQuery=""
          />
        </div>
      </section>
    </div>
  );
};

export default Home;