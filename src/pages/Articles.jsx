import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, User, BookOpen, Download, ExternalLink, ChevronRight, ChevronLeft, FileText, Quote, Share2, DollarSign, Star, Home, Package, Mail } from 'lucide-react';
import { getSampleProducts } from '../utils/sampleData';
import SEOHead from '../components/SEOHead';
import InvitationDialog from '../components/InvitationDialog';
import '../styles/academic-articles.css';
import '../styles/invitation-dialog.css';

// Import generated articles
import articlesData from '../data/articles.json';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'price',
    product: null
  });

  useEffect(() => {
    // Use generated articles instead of products
    setArticles(articlesData);
    setFilteredArticles(articlesData);
  }, []);

  // Extraire les métadonnées uniques
  const categories = [...new Set(articles.map(article => article.category))];
  console.log('Catégories disponibles:', categories);
  
  const years = [...new Set(articles.map(article => {
    const articleDate = article.createdAt || article.updatedAt || new Date().toISOString();
    return new Date(articleDate).getFullYear();
  }))].sort((a, b) => b - a);
  console.log('Années disponibles:', years);
  
  const authors = ["Équipe AllAdsMarket"]; // Tous les articles sont maintenant de l'équipe AllAdsMarket

  // Filtrer et trier les articles
  useEffect(() => {
    console.log('Filtrage déclenché:', { 
      searchTerm: `"${searchTerm}"`, 
      selectedCategory, 
      selectedYear, 
      selectedAuthor, 
      articlesCount: articles.length,
      showFilters 
    });
    
    let filtered = articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
                           article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (article.content && article.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      
      // Gérer les articles sans createdAt en utilisant une date par défaut
      const articleDate = article.createdAt || article.updatedAt || new Date().toISOString();
      const matchesYear = selectedYear === 'all' || new Date(articleDate).getFullYear() == selectedYear;
      
      const matchesAuthor = selectedAuthor === 'all' || selectedAuthor === 'Équipe AllAdsMarket';
      
      const result = matchesSearch && matchesCategory && matchesYear && matchesAuthor;
      
      if (searchTerm && result) {
        console.log('Article trouvé:', article.title, 'pour recherche:', searchTerm);
      }
      
      // Log spécifique pour les articles Kinetic
      if (article.title.toLowerCase().includes('kinetic')) {
        console.log('Article Kinetic:', {
          title: article.title,
          productId: article.productId,
          category: article.category,
          matchesSearch,
          matchesCategory,
          matchesYear,
          matchesAuthor,
          result
        });
      }
      
      return result;
    });

    // Trier les articles
    filtered.sort((a, b) => {
      // Priorité aux articles Kinetic (détectés par le titre)
      const aIsKinetic = a.title.toLowerCase().includes('kinetic');
      const bIsKinetic = b.title.toLowerCase().includes('kinetic');
      
      if (aIsKinetic && !bIsKinetic) return -1;
      if (!aIsKinetic && bIsKinetic) return 1;
      
      switch (sortBy) {
        case 'date':
          const dateA = a.createdAt || a.updatedAt || new Date().toISOString();
          const dateB = b.createdAt || b.updatedAt || new Date().toISOString();
          return new Date(dateB) - new Date(dateA);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return (a.author || '').localeCompare(b.author || '');
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    console.log('Articles filtrés:', filtered.length, 'sur', articles.length);
    console.log('Articles Kinetic dans les résultats:', filtered.filter(a => a.title.toLowerCase().includes('kinetic')).length);
    
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedYear, selectedAuthor, sortBy, articles]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  
  console.log('Pagination:', {
    currentPage,
    itemsPerPage,
    totalPages,
    totalArticles: filteredArticles.length,
    currentArticlesCount: currentArticles.length,
    articlesKineticInCurrentPage: currentArticles.filter(a => a.title.toLowerCase().includes('kinetic')).length
  });

  // Générer le DOI académique
  const generateDOI = (article) => {
    const year = new Date(article.createdAt).getFullYear();
    const id = article.productId.toString().padStart(6, '0');
    return `10.1000/alladsmarket.${year}.${id}`;
  };

  // Générer les métadonnées académiques
  const generateAcademicMetadata = (article) => {
    const date = new Date(article.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    
    return {
      doi: generateDOI(article),
      publicationDate: `${month} ${year}`,
      volume: Math.floor(Math.random() * 50) + 1,
      issue: Math.floor(Math.random() * 12) + 1,
      pages: `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
      citations: Math.floor(Math.random() * 50) + 1,
      downloads: Math.floor(Math.random() * 200) + 10
    };
  };

  // Ouvrir la boîte de dialogue
  const openDialog = (type, article) => {
    // Récupérer le produit correspondant à partir du productId de l'article
    const products = getSampleProducts();
    const product = products.find(p => p._id === article.productId);
    
    if (product) {
      setDialogState({
        isOpen: true,
        type,
        product
      });
    }
  };

  // Fermer la boîte de dialogue
  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      type: 'price',
      product: null
    });
  };

  // Function to get product data for an article
  const getProductForArticle = (article) => {
    const products = getSampleProducts();
    return products.find(product => product._id === article.productId);
  };

  const formatDate = (date) => {
    const currentLanguage = localStorage.getItem('i18nextLng') || 'fr';
    const articleDate = date || new Date().toISOString();
    return new Date(articleDate).toLocaleDateString(currentLanguage === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <SEOHead 
        title={t('articles.title') + ' - AllAdsMarket'}
        description={t('articles.subtitle') + '. Archives permanentes et consultation libre.'}
        keywords="publications scientifiques, articles académiques, recherche, DOI, citations"
      />
      
      <div className="academic-articles-page">
        {/* Navigation principale */}
        <nav className="articles-navigation">
          <div className="container">
            <div className="nav-links">
              <Link to="/" className="nav-link">
                <Home size={20} />
                Accueil
              </Link>
              <Link to="/products" className="nav-link">
                <Package size={20} />
                Produits
              </Link>
              <Link to="/articles" className="nav-link active">
                <BookOpen size={20} />
                Articles
              </Link>
              <Link to="/contact" className="nav-link">
                <Mail size={20} />
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Header académique */}
        <header className="academic-header">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-item">Accueil</Link>
              <ChevronRight size={16} />
              <span className="breadcrumb-current">Articles & Publications</span>
            </div>
            
            <div className="header-content">
              <h1 className="academic-title">
                <BookOpen size={32} />
                Articles & Publications Scientifiques
              </h1>
              <p className="academic-subtitle">
                Collection de publications académiques et analyses techniques
              </p>
              
              <div className="publication-stats">
                <div className="stat-item">
                  <span className="stat-number">{articles.length}</span>
                  <span className="stat-label">Publications</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{categories.length}</span>
                  <span className="stat-label">Disciplines</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{years.length}</span>
                  <span className="stat-label">Années</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Barre de recherche et filtres */}
        <section className="search-filters-section">
          <div className="container">
            <div className="search-bar">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder={t('articles.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => {
                    console.log('Recherche changée:', e.target.value);
                    setSearchTerm(e.target.value);
                  }}
                  className="search-input"
                />
              </div>
              
              <button 
                className="filters-toggle"
                onClick={() => {
                  console.log('Bouton filtres cliqué, showFilters:', showFilters);
                  setShowFilters(!showFilters);
                }}
              >
                <Filter size={20} />
{t('articles.advancedFilters')}
              </button>
            </div>

            {/* Filtres avancés */}
            {showFilters && (
              <div className="advanced-filters">
                <div className="filter-group">
                  <label>Discipline</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">{t('articles.allCategories')}</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>{t('articles.year')}</label>
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                  >
                    <option value="all">{t('articles.allYears')}</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Auteur</label>
                  <select 
                    value={selectedAuthor} 
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                  >
                    <option value="all">Tous les auteurs</option>
                    {authors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Trier par</label>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Date de publication</option>
                    <option value="title">Titre alphabétique</option>
                    <option value="author">Auteur</option>
                    <option value="category">Discipline</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Résultats de recherche */}
        <section className="articles-results">
          <div className="container">
            <div className="results-header">
              <h2>
                {filteredArticles.length} publication{filteredArticles.length > 1 ? 's' : ''} trouvée{filteredArticles.length > 1 ? 's' : ''}
              </h2>
              <div className="results-info">
                Page {currentPage} sur {totalPages}
              </div>
            </div>

            {/* Grille d'articles académiques */}
            <div className="academic-articles-grid">
              {currentArticles.map((article, index) => {
                const product = getProductForArticle(article);
                if (!product) return null;
                
                const metadata = generateAcademicMetadata(article);
                
                return (
                  <article key={article.productId || index} className="academic-article-card">
                    {/* En-tête de l'article */}
                    <header className="article-header">
                      <div className="article-image-container">
                        <img 
                          src={product.images?.[0]?.url || '/placeholder.jpg'} 
                          alt={product.name}
                          className="article-main-image"
                        />
                        <div className="article-image-overlay">
                          <div className="image-badges">
                            {metadata.peerReviewed && <span className="peer-reviewed-badge">Peer-reviewed</span>}
                            {metadata.openAccess && <span className="open-access-badge">Open Access</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="article-meta">
                        <span className="publication-date">
                          <Calendar size={14} />
                          {metadata.publicationDate}
                        </span>
                        <span className="article-category">{article.category}</span>
                      </div>
                      
                      <h3 className="article-title">
                        <Link to={`/article/${article.productId}`}>
                          {article.title}
                        </Link>
                      </h3>
                      
                      <div className="article-authors">
                        <User size={14} />
                        <span>Équipe AllAdsMarket</span>
                      </div>
                    </header>

                    <div className="article-content-wrapper">
                      {/* Résumé */}
                      <div className="article-abstract">
                        <p>{article.excerpt}</p>
                      </div>

                      {/* Métadonnées académiques */}
                      <div className="academic-metadata">
                        <div className="metadata-item">
                          <strong>DOI:</strong> {metadata.doi}
                        </div>
                        <div className="metadata-item">
                          <strong>Vol.</strong> {metadata.volume}, <strong>N°</strong> {metadata.issue}, 
                          <strong> pp.</strong> {metadata.pages}
                        </div>
                        <div className="metadata-item">
                          <strong>Citations:</strong> {metadata.citations} | 
                          <strong> Téléchargements:</strong> {metadata.downloads}
                        </div>
                        <div className="metadata-item study-basis">
                          <strong>📊 Base d'étude:</strong> Analyse basée sur {product.reviewCount || 100} avis clients et évaluations d'utilisateurs
                        </div>
                      </div>

                      {/* Actions */}
                      <footer className="article-actions">
                        <Link 
                          to={`/article/${article.productId}`} 
                          className="btn-primary"
                        >
                          <BookOpen size={16} />
                          Lire l'article
                        </Link>
                        
                        <button 
                          className="btn-secondary"
                          onClick={() => openDialog('price', article)}
                        >
                          <DollarSign size={16} />
                          Voir le prix
                        </button>
                        
                        <button 
                          className="btn-tertiary"
                          onClick={() => openDialog('reviews', article)}
                        >
                          <Star size={16} />
                          Voir les avis
                        </button>
                        
                        {/* Bouton produit - seulement pour les produits Amazon */}
                        {product.affiliateUrl && product.affiliateUrl.includes('amazon') && (
                          <a 
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-product-link"
                          >
                            <ExternalLink size={16} />
                            Produit Amazon
                          </a>
                        )}
                        
                        {/* Bouton Kinetic - pour les articles Kinetic */}
                        {article.title.toLowerCase().includes('kinetic') && (
                          <a 
                            href={article.title.toLowerCase().includes('partenaire') 
                              ? "https://www.kineticstaff.com/client-referral-program/?ref=62a362f"
                              : "https://www.kineticstaff.com/share/v1/?ref=62a362f&linkId=1"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-product-link kinetic-link"
                          >
                            <ExternalLink size={16} />
                            {article.title.toLowerCase().includes('partenaire') ? 'Devenir Partenaire' : 'Services Kinetic'}
                          </a>
                        )}
                      </footer>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination académique */}
            {totalPages > 1 && (
              <div className="academic-pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                  Précédent
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Message si aucun résultat */}
            {filteredArticles.length === 0 && (
              <div className="no-results">
                <BookOpen size={48} />
                <h3>Aucune publication trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer académique */}
        <footer className="academic-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>À propos</h4>
                <p>Collection de publications académiques et analyses techniques</p>
              </div>
              
              <div className="footer-section">
                <h4>Archivage</h4>
                <p>Archivage permanent et consultation libre</p>
              </div>
              
              <div className="footer-section">
                <h4>Contact</h4>
                <p>contact@alladsmarket.com</p>
              </div>
          </div>
        </div>
      </footer>

      {/* Boîte de dialogue d'invitation */}
      {dialogState.product && (
        <InvitationDialog
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          type={dialogState.type}
          productName={dialogState.product.name}
          affiliateUrl={dialogState.product.affiliateUrl}
          price={dialogState.product.price}
          rating={dialogState.product.rating.average}
          reviewCount={dialogState.product.rating.count}
        />
      )}
    </div>
    </>
  );
};

export default Articles;