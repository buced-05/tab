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
            title: `Analyse Technique : ${name}`,
            excerpt: `$Pourquoi choisir ${name} ? $Ce produit se distingue par ses $caractéristiques principales, $marque ${brand}, $note ${rating}/5, ${reviewCount} $avis.`
          };
        case 'fashion':
          return {
            title: `$Guide de Style : ${name}`,
            excerpt: `$Pourquoi choisir ${name} ? $Ce produit se distingue par ses $caractéristiques principales, $marque ${brand}, $note ${rating}/5, ${reviewCount} $avis.`
          };
        case 'home':
          return {
            title: `$Guide Maison : ${name}`,
            excerpt: `$Pourquoi choisir ${name} ? $Ce produit se distingue par ses $caractéristiques principales, $marque ${brand}, $note ${rating}/5, ${reviewCount} $avis.`
          };
        default:
          return {
            title: `$Guide Expert : ${name}`,
            excerpt: `$Pourquoi choisir ${name} ? $Ce produit se distingue par ses $caractéristiques principales, $marque ${brand}, $note ${rating}/5, ${reviewCount} $avis.`
          };
      }
    };

    const content = getProfessionalExcerpt(product);

    return {
      title: content.title,
      excerpt: content.excerpt,
      content: `
        <div class="article-content">
          <h2>$Pourquoi choisir ${product.name} ?</h2>
          <p>$Ce produit se distingue par ses $excellente valeur. ${product.rating.average}/5 $note (${product.rating.count} $avis).</p>
          
          ${discount > 0 ? `<div class="discount-badge">💰 $Économisez ${discount}% - $prix réduit $de ${product.originalPrice}€ $à ${product.price}€</div>` : ''}
          
          <h3>$caractéristiques principales</h3>
          <ul>
            <li><strong>$marque :</strong> ${product.brand}</li>
            <li><strong>$prix :</strong> ${product.price}€ ${product.originalPrice > product.price ? `($au lieu de ${product.originalPrice}€)` : ''}</li>
            <li><strong>$note :</strong> ${product.rating.average}/5 ⭐ (${product.rating.count} $avis)</li>
            <li><strong>$disponibilité :</strong> ${product.inStock ? En Stock : Rupture de Stock}</li>
            <li><strong>$catégorie :</strong> ${product.category}</li>
          </ul>

          <h3>$Pourquoi nous recommandons</h3>
          <p>$Ce produit se distingue par ses ${product.isFeatured ? produit vedette : ''} ${product.isTrending ? succès tendance : ''}.</p>

          <h3>$Points Clés</h3>
          <ul>
            <li>✅ Qualité reconnue de la marque ${product.brand}</li>
            <li>✅ $excellente valeur</li>
            <li>✅ ${product.rating.count} $avis positifs</li>
            <li>✅ ${product.isFeatured ? statut de produit vedette : produit recommandé}</li>
          </ul>

          <div class="cta-section">
            <h3>$Prêt à commander</h3>
            <p>$Ne manquez pas cette opportunité</p>
            <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="cta-button">
              🛒 $Voir le produit sur Amazon
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
            <h1>Articles</h1>
            <p>Découvrez nos analyses approfondies et guides experts</p>
          </div>
        </div>

        <div className="articles-filters">
          <div className="container">
            <div className="filters-row">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Rechercher dans les articles..."
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
                    {category === 'all' ? Toutes les catégories : category}
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
                          {product.isFeatured && <span className="featured-badge">Vedette</span>}
                          {product.isTrending && <span className="trending-badge">Tendance</span>}
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
                            <strong>Lire l'Article Complet</strong>
                            <small>Analyse détaillée et guide d'achat</small>
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
                            <strong>Voir sur Amazon</strong>
                            <small>Prix et disponibilité actuels</small>
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
                <h3>Aucun article trouvé</h3>
                <p>Aucun article ne correspond à votre recherche. Essayez avec d'autres mots-clés.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
