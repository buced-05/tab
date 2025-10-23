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
    window.location.href = `/products/${product._id}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h3>Chargement de produits incroyables...</h3>
        <p>Découverte des meilleures offres pour vous</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <SEOHead 
        title="Accueil - Le Marché des Annonces"
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
              {t('home.welcomeTitle')} <span className="intro-highlight">{t('home.welcomeHighlight')}</span>
            </h1>
            <p className="intro-description">
              {t('home.welcomeDescription')}
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
                <span className="stat-label">{t('home.statsCustomers')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Categories */}
      <section className="quick-categories">
        <div className="container">
            <h2 className="section-title">{t('home.shopByCategory')}</h2>
          <div className="categories-grid">
            <Link to="/products?category=electronics" className="category-card">
              <div className="category-icon">📱</div>
              <h3>{t('home.electronics')}</h3>
              <p>{t('home.electronicsDesc')}</p>
            </Link>
            <Link to="/products?category=fashion" className="category-card">
              <div className="category-icon">👕</div>
              <h3>{t('home.fashion')}</h3>
              <p>{t('home.fashionDesc')}</p>
            </Link>
            <Link to="/products?category=home" className="category-card">
              <div className="category-icon">🏠</div>
              <h3>{t('home.homeGarden')}</h3>
              <p>{t('home.homeGardenDesc')}</p>
            </Link>
            <Link to="/products?category=sports" className="category-card">
              <div className="category-icon">⚽</div>
              <h3>{t('home.sports')}</h3>
              <p>{t('home.sportsDesc')}</p>
            </Link>
            <Link to="/products?category=beauty" className="category-card">
              <div className="category-icon">💄</div>
              <h3>{t('home.beauty')}</h3>
              <p>{t('home.beautyDesc')}</p>
            </Link>
            <Link to="/products?category=books" className="category-card">
              <div className="category-icon">📚</div>
              <h3>{t('home.books')}</h3>
              <p>{t('home.booksDesc')}</p>
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
                {t('home.viewAllTrending')}
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