import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getSampleProducts } from '../utils/sampleData';
import SEOHead from '../components/SEOHead';
import '../styles/articles.css';

// Import generated articles
import articlesData from '../data/articles.json';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Use generated articles instead of products
    setArticles(articlesData);
    setFilteredArticles(articlesData);
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchTerm]);

  const categories = ['all', 'electronics', 'fashion', 'home', 'sports', 'beauty', 'books', 'toys', 'automotive', 'pets'];

  // Function to get product data for an article
  const getProductForArticle = (article) => {
    const products = getSampleProducts();
    return products.find(product => product._id === article.productId);
  };

  const formatDate = (date) => {
    const currentLanguage = localStorage.getItem('i18nextLng') || 'fr';
    return new Date(date).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEOHead 
        title="Articles Produits - Guides d'Achat Professionnels | AllAdsMarket"
        description="Découvrez nos guides d'achat professionnels pour chaque produit. Conseils d'experts, avis détaillés et recommandations pour faire le meilleur choix."
        keywords="guides achat, articles produits, conseils experts, reviews produits, recommandations"
      />
      
      <div className="articles-page">
        <div className="articles-header">
          <h1>{t('articles.title')}</h1>
          <p>{t('articles.subtitle')}</p>
        </div>

        <div className="articles-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder={t('articles.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? t('articles.allCategories') : category}
              </button>
            ))}
          </div>
        </div>

        <div className="articles-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => {
              const product = getProductForArticle(article);
              if (!product) return null;

              return (
                <div key={article.productId || index} className="professional-article-card">
                  <div className="article-header">
                    <div className="article-image-container">
                      <img 
                        src={product.images?.[0]?.url || '/placeholder.jpg'} 
                        alt={product.name}
                        className="article-main-image"
                      />
                      <div className="article-badges">
                        {product.isFeatured && <span className="featured-badge">{t('articles.featured')}</span>}
                        {product.isTrending && <span className="trending-badge">{t('articles.trending')}</span>}
                      </div>
                    </div>
                    
                    <div className="article-meta-header">
                      <span className="article-category-tag">{article.category}</span>
                      <span className="article-date">{formatDate(new Date())}</span>
                    </div>
                  </div>

                  <div className="article-content">
                    <h2 className="article-title">{article.title}</h2>
                    <p className="article-excerpt">{article.excerpt}</p>
                    
                    <div className="article-highlights">
                      <div className="highlight-item">
                        <span className="highlight-label">{t('articles.brand')}:</span>
                        <span className="highlight-value">{product.brand}</span>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-label">{t('articles.status')}:</span>
                        <span className="highlight-value">{product.inStock ? t('articles.inStock') : t('articles.outOfStock')}</span>
                      </div>
                      <div className="highlight-item">
                        <span className="highlight-label">{t('articles.reviews')}:</span>
                        <span className="highlight-value">{product.rating.count} {t('articles.evaluations')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="article-cta-section">
                    <Link 
                      to={`/article/${product._id}`}
                      className="primary-cta-btn"
                    >
                      <span className="btn-icon">→</span>
                      <span className="btn-text">{t('articles.readFullArticle')}</span>
                    </Link>
                    
                    <a 
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="secondary-cta-btn"
                    >
                      <span className="btn-icon">→</span>
                      <span className="btn-text">{t('articles.viewOnAmazon')}</span>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-articles">
              <h3>{t('articles.noArticles')}</h3>
              <p>{t('articles.noArticlesDescription')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Articles;
