import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Eye, Heart, Share2, Star, User, Tag, Bookmark, Search, X, BookOpen } from 'lucide-react';
import { shareLink } from '../utils/shareUtils';
import RealtimeClock from '../components/RealtimeClock';
import { Helmet } from 'react-helmet-async';
import ArticleDate from '../components/ArticleDate';
import Pagination from '../components/Pagination';
import { getCanonicalUrl } from '../utils/canonicalUtils';
import contentService from '../services/contentService';
import { getAllPremiumAIArticlesWithDynamicDates } from '../data/premium-ai-articles';
import '../styles/ai-articles.css';
import '../styles/premium-animations.css';
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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingArticleId, setLoadingArticleId] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [likedArticles, setLikedArticles] = useState(new Set());
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [viewedArticles, setViewedArticles] = useState(new Set());
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const ensureArticleMetrics = (items = []) => {
    return (items || []).map((article, index) => {
      const seed = index + 1;
      const views =
        typeof article.views === 'number' && article.views > 0
          ? article.views
          : 12000 + ((seed * 137) % 6000);
      const likes =
        typeof article.likes === 'number' && article.likes > 0
          ? article.likes
          : 300 + ((seed * 7) % 250);
      const shares =
        typeof article.shares === 'number' && article.shares > 0
          ? article.shares
          : 70 + ((seed * 3) % 120);
      const favorites =
        typeof article.favorites === 'number' && article.favorites > 0
          ? article.favorites
          : 140 + ((seed * 5) % 100);
      const ratingValue =
        typeof article.rating === 'number'
          ? article.rating
          : parseFloat(article.rating);
      const rating =
        !Number.isNaN(ratingValue) && ratingValue > 0
          ? ratingValue.toFixed(1)
          : (4 + ((seed % 5) * 0.2)).toFixed(1);

      return {
        ...article,
        views,
        likes,
        shares,
        favorites,
        rating,
      };
    });
  };

  const updateStatsFromArticles = (items = []) => {
    const totalArticles = items.length;
    const totalViews = items.reduce((sum, article) => sum + (article.views || 0), 0);
    const totalLikes = items.reduce((sum, article) => sum + (article.likes || 0), 0);
    const totalShares = items.reduce((sum, article) => sum + (article.shares || 0), 0);
    const avgRating =
      items.reduce((sum, article) => sum + (parseFloat(article.rating) || 0), 0) /
      (totalArticles || 1);

    setStats({
      totalArticles,
      totalViews,
      totalLikes,
      totalShares,
      avgRating: avgRating.toFixed(1),
    });
  };
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [paginatedArticles, setPaginatedArticles] = useState([]);
  
  // Debounce pour la recherche (améliore les performances)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Générer des suggestions de recherche basées sur les articles
  useEffect(() => {
    if (searchTerm.length >= 2 && articles.length > 0) {
      const suggestions = [];
      const searchLower = searchTerm.toLowerCase();
      
      // Suggestions basées sur les titres
      articles.forEach(article => {
        if (article.title.toLowerCase().includes(searchLower)) {
          suggestions.push({
            type: 'title',
            text: article.title,
            articleId: article.id
          });
        }
      });
      
      // Suggestions basées sur les tags
      articles.forEach(article => {
        article.tags?.forEach(tag => {
          if (tag.toLowerCase().includes(searchLower) && 
              !suggestions.some(s => s.text === tag)) {
            suggestions.push({
              type: 'tag',
              text: tag
            });
        }
        });
      });
      
      // Suggestions basées sur les catégories
      const categories = [...new Set(articles.map(a => a.category))];
      categories.forEach(cat => {
        if (cat.toLowerCase().includes(searchLower) && 
            !suggestions.some(s => s.text === cat)) {
          suggestions.push({
            type: 'category',
            text: cat
          });
        }
      });
      
      setSearchSuggestions(suggestions.slice(0, 8));
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, articles]);
  
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
    let isMounted = true;
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { results } = await contentService.getArticles({ page_size: 200 });
        if (!isMounted) return;
        if (!results || !Array.isArray(results) || results.length === 0) {
          throw new Error('Aucun article renvoyé par l’API');
        }
        const withMetrics = ensureArticleMetrics(results);
        setArticles(withMetrics);
        setFilteredArticles(withMetrics);
        updateStatsFromArticles(withMetrics);
      } catch (error) {
        if (!isMounted) return;
        console.error('[AIArticles] Échec du chargement via API Django:', error);
        console.warn('[AIArticles] Impossible de charger les articles via API, fallback local:', error);

        const fallbackArticles = getAllPremiumAIArticlesWithDynamicDates();
        if (Array.isArray(fallbackArticles) && fallbackArticles.length > 0) {
          const withMetrics = ensureArticleMetrics(fallbackArticles);
          setArticles(withMetrics);
          setFilteredArticles(withMetrics);
          updateStatsFromArticles(withMetrics);
        } else {
          setArticles([]);
          setFilteredArticles([]);
          updateStatsFromArticles([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fonction de recherche améliorée - recherche dans tout le contenu
  const searchInArticle = (article, searchTerms) => {
    const searchLower = searchTerms.toLowerCase();
    const titleLower = (article.title || '').toLowerCase();
    const excerptLower = (article.excerpt || '').toLowerCase();
    const contentLower = (article.content || '').toLowerCase();
    const authorLower = (article.authorName || article.author || '').toLowerCase();
    const categoryLower = (article.category || '').toLowerCase();
    const tagsLower = (article.tags || []).map(tag => tag.toLowerCase()).join(' ');
    const metaKeywordsLower = (article.metaKeywords || '').toLowerCase();
    
    // Séparer les termes de recherche multiples
    const terms = searchLower.split(/\s+/).filter(term => term.length > 0);
    
    // Calculer un score de pertinence
    let score = 0;
    
    terms.forEach(term => {
      // Titre = score le plus élevé (priorité maximale)
      if (titleLower.includes(term)) {
        score += 10;
        // Si le terme est au début du titre, bonus
        if (titleLower.startsWith(term)) {
          score += 5;
        }
      }
      
      // Tags = score élevé
      if (tagsLower.includes(term)) {
        score += 8;
      }
      
      // Catégorie = score moyen-élevé
      if (categoryLower.includes(term)) {
        score += 6;
      }
      
      // Meta keywords = score moyen
      if (metaKeywordsLower.includes(term)) {
        score += 5;
      }
      
      // Auteur = score moyen
      if (authorLower.includes(term)) {
        score += 4;
      }
      
      // Excerpt = score moyen
      if (excerptLower.includes(term)) {
        score += 3;
      }
      
      // Contenu = score faible mais présent
      if (contentLower.includes(term)) {
        score += 1;
      }
    });
    
    // Vérifier si tous les termes sont présents (recherche AND)
    const allTermsMatch = terms.every(term =>
      titleLower.includes(term) ||
      excerptLower.includes(term) ||
      contentLower.includes(term) ||
      tagsLower.includes(term) ||
      categoryLower.includes(term) ||
      metaKeywordsLower.includes(term) ||
      authorLower.includes(term)
    );
    
    return { matches: allTermsMatch, score };
  };

  useEffect(() => {
    let filtered = [...articles];

    // Filtrage par recherche amélioré
    if (debouncedSearchTerm) {
      const searchResults = filtered
        .map(article => ({
          article,
          ...searchInArticle(article, debouncedSearchTerm)
        }))
        .filter(result => result.matches)
        .sort((a, b) => b.score - a.score) // Trier par score de pertinence
        .map(result => result.article);
      
      filtered = searchResults;
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
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
    // Réinitialiser la page à 1 lors d'un changement de filtre
    setCurrentPage(1);
  }, [articles, debouncedSearchTerm, selectedCategory, sortBy]);

  // Effet pour la pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = filteredArticles.slice(startIndex, endIndex);
    
    setPaginatedArticles(paginated);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const categories = [...new Set(articles.map(article => article.category).filter(Boolean))];

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
    const wasLiked = newLikedArticles.has(articleId);
    
    if (wasLiked) {
      newLikedArticles.delete(articleId);
    } else {
      newLikedArticles.add(articleId);
    }
    setLikedArticles(newLikedArticles);
    localStorage.setItem('likedArticles', JSON.stringify([...newLikedArticles]));
    
    // Mettre à jour les likes de l'article
    const updatedArticles = articles.map(a => {
      if (a.id === articleId) {
        return { 
          ...a, 
          likes: Math.max(0, (a.likes || 0) + (wasLiked ? -1 : 1))
        };
      }
      return a;
    });
    setArticles(updatedArticles);
    setFilteredArticles(prevFiltered => {
      return prevFiltered.map(a => {
        if (a.id === articleId) {
          return { 
            ...a, 
            likes: Math.max(0, (a.likes || 0) + (wasLiked ? -1 : 1))
          };
        }
        return a;
      });
    });
    
    // Mettre à jour les stats
    if (stats) {
      const increment = wasLiked ? -1 : 1;
      setStats({
        ...stats,
        totalLikes: Math.max(0, stats.totalLikes + increment)
      });
    }
  };

  const handleBookmark = (articleId) => {
    const newBookmarkedArticles = new Set(bookmarkedArticles);
    const wasBookmarked = newBookmarkedArticles.has(articleId);
    
    if (wasBookmarked) {
      newBookmarkedArticles.delete(articleId);
    } else {
      newBookmarkedArticles.add(articleId);
    }
    setBookmarkedArticles(newBookmarkedArticles);
    localStorage.setItem('bookmarkedArticles', JSON.stringify([...newBookmarkedArticles]));
    
    // Mettre à jour l'article si nécessaire
    const updatedArticles = articles.map(a => {
      if (a.id === articleId) {
        return { 
          ...a, 
          favorites: Math.max(0, (a.favorites || 0) + (wasBookmarked ? -1 : 1))
        };
      }
      return a;
    });
    setArticles(updatedArticles);
    setFilteredArticles(prevFiltered => {
      return prevFiltered.map(a => {
        if (a.id === articleId) {
          return { 
            ...a, 
            favorites: Math.max(0, (a.favorites || 0) + (wasBookmarked ? -1 : 1))
          };
        }
        return a;
      });
    });
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
      
      // Mettre à jour les likes de tous les articles
      const updatedArticles = articles.map(a => ({
        ...a,
        likes: Math.max(0, (a.likes || 0) - 1)
      }));
      setArticles(updatedArticles);
      
      // Calculer le total des likes mis à jour
      const newTotalLikes = updatedArticles.reduce((sum, a) => sum + (a.likes || 0), 0);
      setStats({ ...stats, totalLikes: newTotalLikes });
    } else {
      // Liker tous
      const newLikedArticles = new Set(allArticleIds);
      setLikedArticles(newLikedArticles);
      localStorage.setItem('likedArticles', JSON.stringify([...newLikedArticles]));
      
      // Mettre à jour les likes de tous les articles
      const updatedArticles = articles.map(a => ({
        ...a,
        likes: (a.likes || 0) + (likedArticles.has(a.id) ? 0 : 1)
      }));
      setArticles(updatedArticles);
      
      // Calculer le total des likes mis à jour
      const newTotalLikes = updatedArticles.reduce((sum, a) => sum + (a.likes || 0), 0);
      setStats({ ...stats, totalLikes: newTotalLikes });
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
      
      // Mettre à jour les favoris de tous les articles
      const updatedArticles = articles.map(a => ({
        ...a,
        favorites: Math.max(0, (a.favorites || 0) - 1)
      }));
      setArticles(updatedArticles);
    } else {
      const newBookmarkedArticles = new Set(allArticleIds);
      setBookmarkedArticles(newBookmarkedArticles);
      localStorage.setItem('bookmarkedArticles', JSON.stringify([...newBookmarkedArticles]));
      
      // Mettre à jour les favoris de tous les articles
      const updatedArticles = articles.map(a => ({
        ...a,
        favorites: (a.favorites || 0) + (bookmarkedArticles.has(a.id) ? 0 : 1)
      }));
      setArticles(updatedArticles);
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
      await shareLink({
        title: 'Articles Intelligence Artificielle',
        text: 'Découvrez notre collection d\'articles experts sur l\'IA'
      });
      
      // Mettre à jour les stats globales
      if (stats) {
        setStats({
          ...stats,
          totalShares: (stats.totalShares || 0) + 1
        });
      }
      return;
    }
    
    // Mettre à jour les partages de l'article
    const updatedArticles = articles.map(a => {
      if (a.id === article.id) {
        return { ...a, shares: (a.shares || 0) + 1 };
      }
      return a;
    });
    setArticles(updatedArticles);
    setFilteredArticles(prevFiltered => {
      return prevFiltered.map(a => {
        if (a.id === article.id) {
          return { ...a, shares: (a.shares || 0) + 1 };
        }
        return a;
      });
    });
    
    // Mettre à jour les stats globales
    if (stats) {
      setStats({
        ...stats,
        totalShares: (stats.totalShares || 0) + 1
      });
    }
    
    await shareLink({
      title: article.title,
      text: article.excerpt,
      url: `${window.location.origin}/ai-article/${article.slug}`
    });
  };


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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={getCanonicalUrl(location.pathname)} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": getCanonicalUrl('/')
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Articles",
                "item": getCanonicalUrl('/ai-articles')
              }
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
            
          </div>
        </div>


        {/* Filtres et recherche */}
        <div className="articles-filters" id="articles-filters-container">
          <div className="search-box" id="search-box-container" style={{ position: 'relative' }}>
            <Search size={20} className="search-icon-input" style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b',
              pointerEvents: 'none',
              zIndex: 1
            }} />
            <input
              type="text"
              id="search-input"
              placeholder="Rechercher dans les articles (titre, contenu, tags, auteur, catégorie)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              style={{
                paddingLeft: '48px',
                paddingRight: searchTerm ? '48px' : '16px',
                width: '100%',
                fontSize: '1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                paddingTop: '14px',
                paddingBottom: '14px',
                transition: 'all 0.3s ease',
                background: '#ffffff'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchSuggestions([]);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  zIndex: 1
                }}
                title="Effacer la recherche"
              >
                <X size={18} />
              </button>
            )}
            
            {/* Suggestions de recherche */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="search-suggestions" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTerm(suggestion.text);
                      setShowSuggestions(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      borderBottom: index < searchSuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                      transition: 'background 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                  >
                    {suggestion.type === 'title' && <BookOpen size={16} style={{ color: '#667eea' }} />}
                    {suggestion.type === 'tag' && <Tag size={16} style={{ color: '#8b5cf6' }} />}
                    {suggestion.type === 'category' && <Star size={16} style={{ color: '#10b981' }} />}
                    <span style={{ 
                      color: '#1e293b',
                      fontSize: '0.95rem',
                      fontWeight: suggestion.type === 'title' ? 600 : 500
                    }}>
                      {suggestion.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Affichage du nombre de résultats */}
            {debouncedSearchTerm && (
              <div style={{
                marginTop: '8px',
                fontSize: '0.875rem',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Search size={14} />
                <span>
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
                  {debouncedSearchTerm && ` pour "${debouncedSearchTerm}"`}
                </span>
              </div>
            )}
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
              if (process.env.NODE_ENV === 'development') {
                console.warn('[AIArticles] Article invalide ignoré:', article);
              }
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
                      {formatNumber(article.likes)}
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
