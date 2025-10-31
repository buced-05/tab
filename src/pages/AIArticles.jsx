import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Eye, Heart, Share2, Star, User, Tag, Bookmark } from 'lucide-react';
import { getAllPremiumAIArticlesWithDynamicDates } from '../data/premium-ai-articles';
import RealtimeClock from '../components/RealtimeClock';
import { Helmet } from 'react-helmet-async';
import ArticleDate from '../components/ArticleDate';
import Pagination from '../components/Pagination';
import '../styles/ai-articles.css';
import '../styles/realtime-clock.css';
import '../styles/article-date.css';
import '../styles/pagination.css';
import '../styles/loading.css';

const AIArticlesPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingArticleId, setLoadingArticleId] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [likedArticles, setLikedArticles] = useState(new Set());
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [viewedArticles, setViewedArticles] = useState(new Set());
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  
  // Charger les états depuis localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedArticles');
    const savedBookmarks = localStorage.getItem('bookmarkedArticles');
    const savedViews = localStorage.getItem('viewedArticles');
    
    if (savedLikes) setLikedArticles(new Set(JSON.parse(savedLikes)));
    if (savedBookmarks) setBookmarkedArticles(new Set(JSON.parse(savedBookmarks)));
    if (savedViews) setViewedArticles(new Set(JSON.parse(savedViews)));
  }, []);

  // Réinitialiser l'état de chargement quand on change de page
  useEffect(() => {
    setLoadingArticleId(null);
  }, [location.pathname]);

  useEffect(() => {
    const loadArticles = () => {
      setLoading(true);
      const allArticles = getAllPremiumAIArticlesWithDynamicDates();
      
      // DEBUG: Logs pour vérifier les articles chargés
      console.log('[AIArticles] Nombre total d\'articles chargés:', allArticles ? allArticles.length : 'undefined');
      console.log('[AIArticles] Type:', typeof allArticles);
      console.log('[AIArticles] Est un array:', Array.isArray(allArticles));
      if (allArticles && allArticles.length > 0) {
        console.log('[AIArticles] Premiers 5 articles:', allArticles.slice(0, 5).map(a => ({
          id: a.id,
          title: a.title?.substring(0, 50),
          image: a.image ? 'présent' : 'MANQUANT',
          category: a.category,
          tags: a.tags?.length || 0
        })));
      }
      
      // Vérification de sécurité
      if (!allArticles || !Array.isArray(allArticles)) {
        console.error('Erreur: getAllPremiumAIArticles() retourne une valeur invalide:', allArticles);
        setArticles([]);
        setFilteredArticles([]);
        setStats({
          totalArticles: 0,
          totalViews: 0,
          totalLikes: 0,
          totalShares: 0,
          avgRating: '0.0'
        });
        setLoading(false);
        return;
      }
      
      // Inject default counters when missing or zero for better card display
      const withCounts = (allArticles || []).map((a, i) => {
        const seed = i + 1;
        const v = (typeof a.views === 'number' && a.views > 0) ? a.views : (12000 + ((seed * 137) % 6000));
        const l = (typeof a.likes === 'number' && a.likes > 0) ? a.likes : (300 + ((seed * 7) % 250));
        const s = (typeof a.shares === 'number' && a.shares > 0) ? a.shares : (70 + ((seed * 3) % 120));
        return { ...a, views: v, likes: l, shares: s };
      });

      setArticles(withCounts);
      setFilteredArticles(withCounts);
      // Calculer les stats depuis les articles
      const totalArticles = withCounts.length;
      const totalViews = withCounts.reduce((sum, article) => sum + (article.views || 0), 0);
      const totalLikes = withCounts.reduce((sum, article) => sum + (article.likes || 0), 0);
      const totalShares = withCounts.reduce((sum, article) => sum + (article.shares || 0), 0);
      const avgRating = withCounts.reduce((sum, article) => sum + (article.rating || 0), 0) / (totalArticles || 1);
      
      setStats({
        totalArticles,
        totalViews,
        totalLikes,
        totalShares,
        avgRating: avgRating.toFixed(1)
      });
      setLoading(false);
    };

    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = [...articles];

    // Filtrage par recherche
    if (searchTerm) {
      console.log('Recherche avec terme:', searchTerm);
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      console.log('Articles trouvés après recherche:', filtered.length);
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      console.log('Filtrage par catégorie:', selectedCategory);
      filtered = filtered.filter(article => article.category === selectedCategory);
      console.log('Articles trouvés après filtrage catégorie:', filtered.length);
    }

    // Tri
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'trending':
        filtered.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.views - a.views;
        });
        break;
      default:
        break;
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory, sortBy]);

  // Effet pour la pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredArticles.slice(startIndex, endIndex);
    
    // DEBUG: Logs pour vérifier la pagination
    console.log('[AIArticles] Pagination:', {
      totalArticles: filteredArticles.length,
      currentPage,
      itemsPerPage,
      startIndex,
      endIndex,
      paginatedCount: paginated.length,
      firstArticle: paginated[0] ? {
        id: paginated[0].id,
        title: paginated[0].title?.substring(0, 50),
        image: paginated[0].image ? 'présent' : 'MANQUANT'
      } : 'aucun'
    });
    
    setPaginatedArticles(paginated);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const categories = [...new Set(articles.map(article => article.category))];

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  // Fonctions pour la pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Retourner à la première page
  };

  // Fonctions pour les interactions
  const handleLike = (articleId) => {
    const newLikedArticles = new Set(likedArticles);
    if (newLikedArticles.has(articleId)) {
      newLikedArticles.delete(articleId);
    } else {
      newLikedArticles.add(articleId);
    }
    setLikedArticles(newLikedArticles);
    localStorage.setItem('likedArticles', JSON.stringify([...newLikedArticles]));
    
    // Mettre à jour les stats
    if (stats) {
      const increment = newLikedArticles.has(articleId) ? 1 : -1;
      setStats({
        ...stats,
        totalLikes: Math.max(0, stats.totalLikes + increment)
      });
    }
  };

  const handleBookmark = (articleId) => {
    const newBookmarkedArticles = new Set(bookmarkedArticles);
    if (newBookmarkedArticles.has(articleId)) {
      newBookmarkedArticles.delete(articleId);
    } else {
      newBookmarkedArticles.add(articleId);
    }
    setBookmarkedArticles(newBookmarkedArticles);
    localStorage.setItem('bookmarkedArticles', JSON.stringify([...newBookmarkedArticles]));
  };

  const handleView = (articleId) => {
    if (!viewedArticles.has(articleId)) {
      const newViewedArticles = new Set(viewedArticles);
      newViewedArticles.add(articleId);
      setViewedArticles(newViewedArticles);
      localStorage.setItem('viewedArticles', JSON.stringify([...newViewedArticles]));
      
      // Mettre à jour les stats
      if (stats) {
        setStats({
          ...stats,
          totalViews: stats.totalViews + 1
        });
      }
    }
  };

  const handleHeaderLike = () => {
    // Toggle like sur tous les articles
    const allArticleIds = articles.map(a => a.id);
    const allLiked = allArticleIds.every(id => likedArticles.has(id));
    
    if (allLiked) {
      // Unliker tous
      const newLikedArticles = new Set();
      setLikedArticles(newLikedArticles);
      localStorage.setItem('likedArticles', '[]');
      setStats({ ...stats, totalLikes: 0 });
    } else {
      // Liker tous
      const newLikedArticles = new Set(allArticleIds);
      setLikedArticles(newLikedArticles);
      localStorage.setItem('likedArticles', JSON.stringify([...newLikedArticles]));
      setStats({ ...stats, totalLikes: stats.totalLikes + allArticleIds.length });
    }
  };

  const handleHeaderBookmark = () => {
    // Toggle bookmark sur tous les articles
    const allArticleIds = articles.map(a => a.id);
    const allBookmarked = allArticleIds.every(id => bookmarkedArticles.has(id));
    
    if (allBookmarked) {
      const newBookmarkedArticles = new Set();
      setBookmarkedArticles(newBookmarkedArticles);
      localStorage.setItem('bookmarkedArticles', '[]');
    } else {
      const newBookmarkedArticles = new Set(allArticleIds);
      setBookmarkedArticles(newBookmarkedArticles);
      localStorage.setItem('bookmarkedArticles', JSON.stringify([...newBookmarkedArticles]));
    }
  };

  const handleHeaderView = () => {
    // Marquer tous les articles comme vus
    const allArticleIds = articles.map(a => a.id);
    const newViewedArticles = new Set([...viewedArticles, ...allArticleIds]);
    setViewedArticles(newViewedArticles);
    localStorage.setItem('viewedArticles', JSON.stringify([...newViewedArticles]));
    
    // Mettre à jour les stats
    const newViews = allArticleIds.filter(id => !viewedArticles.has(id)).length;
    if (stats && newViews > 0) {
      setStats({
        ...stats,
        totalViews: stats.totalViews + newViews
      });
    }
  };

  const handleShare = async (article) => {
    if (!article) {
      // Partage de toute la page
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Articles Intelligence Artificielle',
            text: 'Découvrez notre collection d\'articles experts sur l\'IA',
            url: window.location.href,
          });
        } catch (err) {
          console.log('Erreur lors du partage:', err);
        }
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      }
      return;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `${window.location.origin}/ai-article/${article.slug}`,
        });
      } catch (err) {
        console.log('Erreur lors du partage:', err);
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      const url = `${window.location.origin}/ai-article/${article.slug}`;
      navigator.clipboard.writeText(url);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  // Fonction utilitaire pour le debugging des identifiants
  const debugArticleIds = () => {
    console.log('=== DEBUG ARTICLES IDS ===');
    console.log('Articles chargés:', articles.length);
    articles.forEach((article, index) => {
      console.log(`Article ${index + 1}:`, {
        id: article.id,
        slug: article.slug,
        title: article.title.substring(0, 50) + '...',
        cardId: `article-card-${article.id}`,
        numberId: `article-number-${article.id}`,
        numberBadge: `#${index + 1}`,
        orderNumber: index + 1,
        imageId: `article-img-${article.id}`,
        titleId: `article-title-${article.id}`,
        linkId: `article-link-${article.id}`
      });
    });
    console.log('========================');
  };

  // Appeler la fonction de debug au chargement
  useEffect(() => {
    if (articles.length > 0) {
      debugArticleIds();
      console.log('🎯 NUMÉROS D\'ORDRE GÉNÉRÉS:', articles.map((article, index) => `#${index + 1}`));
    }
  }, [articles]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h3>{t('article.loadingArticles')}</h3>
        <p>Découverte des meilleurs articles pour vous</p>
      </div>
    );
  }

  return (
    <div className="ai-articles-page">
      <Helmet>
        <title>Articles et Guides Professionnels | AllAdsMarket</title>
        <meta name="description" content="Guides approfondis, analyses et tutoriels couvrant technologie, business, logiciels, IA et plus. Découvrez nos articles professionnels et ressources." />
        <link rel="canonical" href={window.location.href.split('#')[0].split('?')[0]} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Accueil","item":"/"},
              {"@type":"ListItem","position":2,"name":"Articles","item":"/ai-articles"}
            ]
          })}
        </script>
      </Helmet>
      <div className="container">
        {/* Header avec statistiques */}
        <div className="articles-header">
          <div className="header-content">
            <div className="header-top">
              <div>
                <h1>Articles et Guides Professionnels</h1>
                <p>Guides approfondis, analyses et tutoriels couvrant technologie, business, logiciels, IA et bien plus.</p>
              </div>
              <RealtimeClock showSeconds={true} showDate={true} />
            </div>
            
            {stats && (
              <div className="stats-grid">
                <button 
                  className={`stat-item clickable ${viewedArticles.size === articles.length ? 'active' : ''}`}
                  onClick={handleHeaderView}
                  title="Marquer tous les articles comme vus"
                >
                  <Eye size={24} />
                  <div className="stat-content">
                    <span className="stat-value">{formatNumber(stats.totalViews)}</span>
                    <span className="stat-label">vues</span>
                  </div>
                </button>
                <button 
                  className={`stat-item clickable ${likedArticles.size === articles.length ? 'active' : ''}`}
                  onClick={handleHeaderLike}
                  title="Aimer tous les articles"
                >
                  <Heart size={24} className={likedArticles.size === articles.length ? 'liked' : ''} fill={likedArticles.size === articles.length ? 'currentColor' : 'none'} />
                  <div className="stat-content">
                    <span className="stat-value">{formatNumber(stats.totalLikes)}</span>
                    <span className="stat-label">likes</span>
                  </div>
                </button>
                <button 
                  className={`stat-item clickable ${bookmarkedArticles.size === articles.length ? 'active' : ''}`}
                  onClick={handleHeaderBookmark}
                  title="Sauvegarder tous les articles"
                >
                  <Bookmark size={24} className={bookmarkedArticles.size === articles.length ? 'bookmarked' : ''} fill={bookmarkedArticles.size === articles.length ? 'currentColor' : 'none'} />
                  <div className="stat-content">
                    <span className="stat-value">{formatNumber(bookmarkedArticles.size)}</span>
                    <span className="stat-label">favoris</span>
                  </div>
                </button>
                <button 
                  className="stat-item clickable"
                  onClick={() => handleShare(null)}
                  title="Partager cette page"
                >
                  <Share2 size={24} />
                  <div className="stat-content">
                    <span className="stat-value">{formatNumber(stats.totalShares || 0)}</span>
                    <span className="stat-label">partages</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="articles-filters" id="articles-filters-container">
          <div className="search-box" id="search-box-container">
            <input
              type="text"
              id="search-input"
              placeholder="Rechercher dans les articles IA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters-row" id="filters-row-container">
            <div className="filter-group" id="category-filter-group">
              <label htmlFor="category-select">Catégorie :</label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group" id="sort-filter-group">
              <label htmlFor="sort-select">Trier par :</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Plus récents</option>
                <option value="popular">Plus populaires</option>
                <option value="rating">Mieux notés</option>
                <option value="trending">Tendances</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille d'articles */}
        {/* DEBUG: Informations sur les articles */}
        {console.log('[AIArticles RENDER] paginatedArticles.length:', paginatedArticles.length)}
        {console.log('[AIArticles RENDER] filteredArticles.length:', filteredArticles.length)}
        {console.log('[AIArticles RENDER] articles.length:', articles.length)}
        
        {paginatedArticles.length === 0 && filteredArticles.length > 0 && (
          <div className="empty-state" style={{padding: '2rem', textAlign: 'center'}}>
            <p>Aucun article à afficher sur cette page. Total articles: {filteredArticles.length}</p>
          </div>
        )}
        
        {paginatedArticles.length === 0 && filteredArticles.length === 0 && articles.length > 0 && (
          <div className="empty-state" style={{padding: '2rem', textAlign: 'center'}}>
            <p>Aucun article ne correspond aux filtres. Total articles: {articles.length}</p>
          </div>
        )}
        
        <div className="articles-grid" id="articles-grid-container">
          {paginatedArticles.map((article, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
            // Vérification de sécurité : s'assurer que toutes les propriétés nécessaires sont présentes
            if (!article || !article.id || !article.title || !article.slug) {
              console.warn('[AIArticles] Article invalide ignoré:', article);
              return null;
            }
            
            return (
            <article 
              key={article.id} 
              id={`article-card-${article.id}`}
              className="article-card"
              data-article-id={article.id}
              data-article-slug={article.slug}
              data-article-index={index + 1}
            >
              {/* Numéro d'ordre de l'article */}
              <div className="article-number" id={`article-number-${article.id}`}>
                <span className="number-badge">#{globalIndex}</span>
              </div>
              
              <div className="article-image" id={`article-image-${article.id}`}>
                <img
                  src={article.image || 'https://via.placeholder.com/800x400'}
                  alt={article.title || 'Article'}
                  loading="lazy"
                  id={`article-img-${article.id}`}
                />
                <div className="article-badges" id={`article-badges-${article.id}`}>
                  {article.featured && <span className="featured-badge" id={`featured-badge-${article.id}`}>Vedette</span>}
                  {article.trending && <span className="trending-badge" id={`trending-badge-${article.id}`}>Tendance</span>}
                </div>
              </div>

              <div className="article-content" id={`article-content-${article.id}`}>
                <div className="article-meta" id={`article-meta-${article.id}`}>
                  <span className="category-tag" id={`category-tag-${article.id}`}>{article.category}</span>
                  <div className="meta-info" id={`meta-info-${article.id}`}>
                    <span className="meta-item" id={`meta-date-${article.id}`}>
                      <ArticleDate date={article.publishDate || article.date} showFullDate={true} showRelative={true} />
                    </span>
                    {/* Removed read time to avoid unrealistic minutes */}
                    <span className="meta-item" id={`meta-author-${article.id}`}>
                      <User size={14} />
                      Newtiv Team
                    </span>
                  </div>
                </div>

                <h2 className="article-title" id={`article-title-${article.id}`}>
                  <Link to={`/ai-article/${article.slug}`} id={`article-link-${article.id}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="article-excerpt" id={`article-excerpt-${article.id}`}>{article.excerpt}</p>

                <div className="article-tags" id={`article-tags-${article.id}`}>
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag" id={`tag-${tag.replace(/\s+/g, '-').toLowerCase()}-${article.id}`}>
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="article-stats" id={`article-stats-${article.id}`}>
                  <div className="stat-group" id={`stat-group-${article.id}`}>
                    <button className="stat-btn" onClick={() => handleView(article.id)} id={`stat-view-${article.id}`}>
                      <Eye size={16} />
                      {formatNumber(article.views)}
                    </button>
                    <button 
                      className={`stat-btn ${likedArticles.has(article.id) ? 'liked' : ''}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(article.id);
                      }} 
                      id={`stat-like-${article.id}`}
                    >
                      <Heart size={16} fill={likedArticles.has(article.id) ? 'currentColor' : 'none'} />
                      {formatNumber(article.likes + (likedArticles.has(article.id) ? 1 : 0))}
                    </button>
                    <button 
                      className={`stat-btn ${bookmarkedArticles.has(article.id) ? 'bookmarked' : ''}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookmark(article.id);
                      }} 
                      id={`stat-bookmark-${article.id}`}
                    >
                      <Bookmark size={16} fill={bookmarkedArticles.has(article.id) ? 'currentColor' : 'none'} />
                      {bookmarkedArticles.has(article.id) ? 'Sauvegardé' : 'Sauvegarder'}
                    </button>
                    <button className="stat-btn" onClick={() => handleShare(article)} id={`stat-share-${article.id}`}>
                      <Share2 size={16} />
                      {formatNumber(article.shares)}
                    </button>
                  </div>
                  <div className="rating" id={`rating-${article.id}`}>
                    <Star size={16} className="star-icon" />
                    <span>{article.rating}</span>
                  </div>
                </div>

                <div className="article-actions" id={`article-actions-${article.id}`}>
                  <Link 
                    to={`/ai-article/${article.slug}`} 
                    className={`read-more-btn ${loadingArticleId === article.id ? 'loading' : ''}`}
                    id={`read-more-btn-${article.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setLoadingArticleId(article.id);
                      setIsNavigating(true);
                      
                      // Animation du bouton puis transition
                      setTimeout(() => {
                        navigate(`/ai-article/${article.slug}`);
                        // Réinitialiser après navigation
                        setTimeout(() => {
                          setIsNavigating(false);
                          setLoadingArticleId(null);
                        }, 100);
                      }, 800);
                    }}
                  >
                    {loadingArticleId === article.id ? (
                      <>
                        <span className="btn-loading-spinner"></span>
                        <span className="btn-loading-text">{t('article.loading')}</span>
                        <span className="btn-loading-pulse"></span>
                      </>
                    ) : (
                      <>
                        <span>{t('article.readFullArticle')}</span>
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </article>
            );
          })}
        </div>

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredArticles.length}
            showInfo={true}
            id="articles-pagination"
          />
        )}

        {filteredArticles.length === 0 && (
          <div className="no-results" id="no-results-container">
            <h3>Aucun article trouvé</h3>
            <p>Aucun article ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
      
      {/* Transition avec animation de la page d'accueil - Overlay plein écran */}
      {isNavigating && (
        <div className="loading-container fullscreen">
          <div className="loading-spinner-large"></div>
          <h3>{t('article.loading')}</h3>
          <p>Préparation de l'article</p>
        </div>
      )}
    </div>
  );
};

export default AIArticlesPage;
