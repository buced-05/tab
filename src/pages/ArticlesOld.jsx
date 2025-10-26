import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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

  const categories = ['all', 'electronics', 'fashion', 'home', 'sports', 'beauty', 'books', 'toys'];

  const generateArticleContent = (product) => {
    const discount = product.originalPrice > product.price ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    // Generate professional, detailed excerpts based on category
    const getProfessionalExcerpt = (product) => {
      const category = product.category;
      const brand = product.brand;
      const name = product.name;
      const price = product.price;
      const rating = product.rating.average;
      const reviewCount = product.rating.count;

      switch (category) {
        case 'electronics':
          return {
            title: `${t('articles.articleContent.technicalAnalysis')} : ${name}`,
            excerpt: `${t('articles.articleContent.whyChoose')} ${name} ? ${t('articles.articleContent.thisProductStandsOut')} ${t('articles.articleContent.mainFeatures')}, ${t('articles.articleContent.brand')} ${brand}, ${t('articles.articleContent.rating')} ${rating}/5, ${reviewCount} ${t('articles.articleContent.reviews')}.`
          };
        case 'fashion':
          return {
            title: `${t('articles.articleContent.styleGuide')} : ${name}`,
            excerpt: `${t('articles.articleContent.whyChoose')} ${name} ? ${t('articles.articleContent.thisProductStandsOut')} ${t('articles.articleContent.mainFeatures')}, ${t('articles.articleContent.brand')} ${brand}, ${t('articles.articleContent.rating')} ${rating}/5, ${reviewCount} ${t('articles.articleContent.reviews')}.`
          };
        case 'home':
          return {
            title: `${t('articles.articleContent.homeGuide')} : ${name}`,
            excerpt: `${t('articles.articleContent.whyChoose')} ${name} ? ${t('articles.articleContent.thisProductStandsOut')} ${t('articles.articleContent.mainFeatures')}, ${t('articles.articleContent.brand')} ${brand}, ${t('articles.articleContent.rating')} ${rating}/5, ${reviewCount} ${t('articles.articleContent.reviews')}.`
          };
        default:
          return {
            title: `${t('articles.articleContent.expertGuide')} : ${name}`,
            excerpt: `${t('articles.articleContent.whyChoose')} ${name} ? ${t('articles.articleContent.thisProductStandsOut')} ${t('articles.articleContent.mainFeatures')}, ${t('articles.articleContent.brand')} ${brand}, ${t('articles.articleContent.rating')} ${rating}/5, ${reviewCount} ${t('articles.articleContent.reviews')}.`
          };
      }
    };

    const content = getProfessionalExcerpt(product);

    return {
      title: content.title,
      excerpt: content.excerpt,
      content: `
        <div class="article-content">
          <h2>${t('articles.articleContent.whyChoose')} ${product.name} ?</h2>
          <p>${t('articles.articleContent.thisProductStandsOut')} ${t('articles.articleContent.excellentValue')}. ${product.rating.average}/5 ${t('articles.articleContent.rating')} (${product.rating.count} ${t('articles.articleContent.reviews')}).</p>
          
          ${discount > 0 ? `<div class="discount-badge">💰 ${t('articles.articleContent.save')} ${discount}% - ${t('articles.articleContent.reducedPrice')} ${t('articles.articleContent.from')} ${product.originalPrice}€ ${t('articles.articleContent.to')} ${product.price}€</div>` : ''}
          
          <h3>${t('articles.articleContent.mainFeatures')}</h3>
          <ul>
            <li><strong>${t('articles.articleContent.brand')} :</strong> ${product.brand}</li>
            <li><strong>${t('articles.articleContent.price')} :</strong> ${product.price}€ ${product.originalPrice > product.price ? `(${t('articles.articleContent.insteadOf')} ${product.originalPrice}€)` : ''}</li>
            <li><strong>${t('articles.articleContent.rating')} :</strong> ${product.rating.average}/5 ⭐ (${product.rating.count} ${t('articles.articleContent.reviews')})</li>
            <li><strong>${t('articles.articleContent.availability')} :</strong> ${product.inStock ? t('articles.articleContent.inStock') : t('articles.articleContent.outOfStock')}</li>
            <li><strong>${t('articles.articleContent.category')} :</strong> ${product.category}</li>
          </ul>

          <h3>${t('articles.articleContent.whyWeRecommend')}</h3>
          <p>${t('articles.articleContent.thisProductStandsOut')} ${product.isFeatured ? t('articles.articleContent.featuredProduct') : ''} ${product.isTrending ? t('articles.articleContent.trendingSuccess') : ''}.</p>

          <h3>${t('articles.articleContent.keyPoints')}</h3>
          <ul>
            <li>✅ ${t('articles.articleContent.recognizedQuality').replace('{brand}', product.brand)}</li>
            <li>✅ ${t('articles.articleContent.excellentValue')}</li>
            <li>✅ ${product.rating.count} ${t('articles.articleContent.positiveReviews')}</li>
            <li>✅ ${product.isFeatured ? t('articles.articleContent.featuredProductStatus') : t('articles.articleContent.recommendedProduct')}</li>
          </ul>

          <div class="cta-section">
            <h3>${t('articles.articleContent.readyToOrder')}</h3>
            <p>${t('articles.articleContent.dontMissOpportunity')}</p>
            <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="cta-button">
              🛒 ${t('articles.articleContent.viewProductOnAmazon')}
            </a>
          </div>

          <div class="tags">
            ${product.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
        </div>
      `
    };
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
        url="/articles"
      />
      
      <div className="articles-page">
        <div className="articles-header">
          <div className="container">
            <h1>{t('articles.title')}</h1>
            <p>{t('articles.subtitle')}</p>
          </div>
        </div>

        <div className="articles-filters">
          <div className="container">
            <div className="filters-row">
              <div className="search-box">
                <input
                  type="text"
                  placeholder={t('articles.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">S</span>
              </div>
              
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? t('articles.allCategories') : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="articles-content">
          <div className="container">
            <div className="articles-grid">
              {filteredProducts.map((product, index) => {
                const article = generateArticleContent(product);
                return (
                  <article key={product._id} className="professional-article-card">
                    <div className="article-header">
                      <div className="article-image-container">
                        <img 
                          src={product.images[0]?.url} 
                          alt={product.images[0]?.alt || product.name}
                          loading="lazy"
                          className="article-main-image"
                        />
                        <div className="article-badges">
                          {product.isFeatured && <span className="featured-badge">{t('articles.featured')}</span>}
                          {product.isTrending && <span className="trending-badge">{t('articles.trending')}</span>}
                        </div>
                      </div>
                      
                      <div className="article-meta-header">
                        <div className="article-category-tag">{product.category}</div>
                        <div className="article-date">{formatDate(new Date())}</div>
                      </div>
                    </div>
                    
                    <div className="article-body">
                      <h2 className="article-title">{article.title}</h2>
                      <p className="article-excerpt">{article.excerpt}</p>
                      
                      <div className="article-highlights">
                        <div className="highlight-item">
                          <span className="highlight-label">Marque</span>
                          <span className="highlight-value">{product.brand}</span>
                        </div>
                        <div className="highlight-item">
                          <span className="highlight-label">Statut</span>
                          <span className="highlight-value">{product.isFeatured ? 'Produit vedette' : 'Recommandé'}</span>
                        </div>
                        <div className="highlight-item">
                          <span className="highlight-label">Avis</span>
                          <span className="highlight-value">{product.rating.count} évaluations</span>
                        </div>
                      </div>
                      
                      <div className="article-cta-section">
                        <a 
                          href={`/article/${product._id}`}
                          className="primary-cta-btn"
                        >
                          <span className="btn-icon">→</span>
                          <span className="btn-text">
                            <strong>{t('articles.readFullArticle')}</strong>
                            <small>{t('articles.readFullArticleSubtitle')}</small>
                          </span>
                        </a>
                        
                        <a 
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="secondary-cta-btn"
                        >
                          <span className="btn-icon">→</span>
                          <span className="btn-text">
                            <strong>{t('articles.viewOnAmazon')}</strong>
                            <small>{t('articles.viewOnAmazonSubtitle')}</small>
                          </span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="no-results">
                <h3>{t('articles.noArticles')}</h3>
                <p>{t('articles.noArticlesDescription')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
