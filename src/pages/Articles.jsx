import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSampleProducts } from '../utils/sampleData';
import SEOHead from '../components/SEOHead';
import '../styles/articles.css';

const Articles = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allProducts = getSampleProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

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
            title: `Analyse Technique Complète : ${name}`,
            excerpt: `Plongez dans notre analyse approfondie du ${name} de ${brand}. Découvrez les spécifications techniques détaillées, les performances réelles et les retours d'expérience de ${reviewCount} utilisateurs. Notre guide expert vous révèle tout ce que vous devez savoir avant votre achat.`
          };
        case 'fashion':
          return {
            title: `Guide Style & Mode : ${name}`,
            excerpt: `Explorez notre guide complet sur le ${name} de ${brand}. Conseils d'experts en stylisme, guide d'association, retours clients authentiques et recommandations professionnelles pour intégrer ce produit dans votre garde-robe avec style.`
          };
        case 'home':
          return {
            title: `Guide Décoration & Aménagement : ${name}`,
            excerpt: `Transformez votre intérieur avec notre guide détaillé sur le ${name} de ${brand}. Conseils d'aménagement, retours d'expérience de propriétaires, et recommandations d'experts en décoration d'intérieur pour optimiser votre espace de vie.`
          };
        default:
          return {
            title: `Guide Expert : ${name}`,
            excerpt: `Découvrez notre analyse professionnelle du ${name} de ${brand}. Guide complet avec spécifications détaillées, retours clients authentiques, et recommandations d'experts pour faire le meilleur choix dans la catégorie ${category}.`
          };
      }
    };

    const content = getProfessionalExcerpt(product);

    return {
      title: content.title,
      excerpt: content.excerpt,
      content: `
        <div class="article-content">
          <h2>Pourquoi choisir ${product.name} ?</h2>
          <p>Le ${product.name} de ${product.brand} représente un excellent choix pour tous ceux qui recherchent qualité et performance. Avec une note de ${product.rating.average}/5 basée sur ${product.rating.count} avis clients, ce produit a su convaincre de nombreux utilisateurs.</p>
          
          ${discount > 0 ? `<div class="discount-badge">💰 Économisez ${discount}% - Prix réduit de ${product.originalPrice}€ à ${product.price}€</div>` : ''}
          
          <h3>Caractéristiques principales</h3>
          <ul>
            <li><strong>Marque :</strong> ${product.brand}</li>
            <li><strong>Prix :</strong> ${product.price}€ ${product.originalPrice > product.price ? `(au lieu de ${product.originalPrice}€)` : ''}</li>
            <li><strong>Note :</strong> ${product.rating.average}/5 ⭐ (${product.rating.count} avis)</li>
            <li><strong>Disponibilité :</strong> ${product.inStock ? 'En stock' : 'Rupture de stock'}</li>
            <li><strong>Catégorie :</strong> ${product.category}</li>
          </ul>

          <h3>Pourquoi nous le recommandons</h3>
          <p>Ce produit se distingue par sa qualité exceptionnelle et sa valeur ajoutée. ${product.isFeatured ? 'Il fait partie de nos produits vedettes' : ''} ${product.isTrending ? 'et connaît un succès croissant' : ''}.</p>

          <h3>Points forts</h3>
          <ul>
            <li>✅ Qualité ${product.brand} reconnue</li>
            <li>✅ Excellent rapport qualité-prix</li>
            <li>✅ ${product.rating.count} avis clients positifs</li>
            <li>✅ ${product.isFeatured ? 'Produit vedette' : 'Produit recommandé'}</li>
          </ul>

          <div class="cta-section">
            <h3>Prêt à commander ?</h3>
            <p>Ne manquez pas cette opportunité d'acquérir un produit de qualité à un prix attractif.</p>
            <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="cta-button">
              🛒 Voir le produit sur Amazon
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
    return new Date(date).toLocaleDateString('fr-FR', {
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
            <h1>Articles & Guides Produits</h1>
            <p>Découvrez nos guides d'achat professionnels et nos analyses détaillées pour chaque produit</p>
          </div>
        </div>

        <div className="articles-filters">
          <div className="container">
            <div className="filters-row">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
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
                    {category === 'all' ? 'Tous' : category}
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
                            <strong>Lire l'analyse complète</strong>
                            <small>Guide détaillé et tests</small>
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
                            <small>Disponibilité et détails</small>
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
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
