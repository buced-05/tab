import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  Moon, 
  Sun, 
  TrendingUp, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Play, 
  Download, 
  ExternalLink,
  Star,
  BookOpen,
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  Globe,
  Zap,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  X,
  Bell,
  Settings,
  Grid3X3,
  List,
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  Lock,
  Shield,
  Brain,
  Cpu,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Calendar,
  User,
  Tag,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2
} from 'lucide-react';
import ModernNavigation from '../components/ModernNavigation';
import ModernFooter from '../components/ModernFooter';
import '../styles/modern-navigation.css';
import '../styles/modern-footer.css';
import '../styles/modern-home.css';

/**
 * Page d'Accueil Moderne - Version Simplifiée
 * Interface utilisateur épurée et fonctionnelle
 */

const ModernHome = () => {
  const { t } = useTranslation();
  
  // États principaux
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Articles de base
  const baseArticles = [
    {
      id: 1,
      title: "L'Intelligence Artificielle dans le Marketing",
      description: "Découvrez comment l'IA transforme le marketing digital avec des exemples concrets et des stratégies éprouvées.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      category: "IA & Tech",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      readTime: "12 min",
      views: 15420,
      likes: 892,
      comments: 156,
      rating: 4.9,
      featured: true,
      premium: true,
      trending: true,
      tags: ["IA", "Marketing", "Innovation", "Tech"]
    },
    {
      id: 2,
      title: "SEO 2024 : Les Nouvelles Règles",
      description: "Une analyse approfondie des dernières mises à jour des algorithmes de recherche et leurs implications.",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
      category: "SEO",
      author: "Marc Dubois",
      date: "2024-01-12",
      readTime: "8 min",
      views: 12850,
      likes: 756,
      comments: 89,
      rating: 4.8,
      featured: true,
      premium: false,
      trending: true,
      tags: ["SEO", "Algorithmes", "Optimisation", "2024"]
    },
    {
      id: 3,
      title: "E-commerce : Stratégies de Conversion",
      description: "Techniques avancées pour maximiser vos conversions e-commerce avec des exemples concrets.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      category: "E-commerce",
      author: "Sophie Martin",
      date: "2024-01-10",
      readTime: "10 min",
      views: 9870,
      likes: 634,
      comments: 78,
      rating: 4.7,
      featured: false,
      premium: true,
      trending: false,
      tags: ["E-commerce", "Conversion", "Stratégie", "Optimisation"]
    }
  ];

  // Initialisation
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(baseArticles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  // Filtrage des articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         article.category.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  // Actions des articles
  const handleReadArticle = (article) => {
    console.log('📖 Lecture de l\'article:', article.title);
    // Navigation vers la page de détail
  };

  const handlePlayArticle = (article) => {
    console.log('▶️ Lecture vidéo de l\'article:', article.title);
  };

  const handleDownloadArticle = (article) => {
    console.log('📥 Téléchargement de l\'article:', article.title);
  };

  const handleShareArticle = (article) => {
    console.log('📤 Partage de l\'article:', article.title);
  };

  // Composant de carte d'article
  const ArticleCard = ({ article }) => (
    <article
      className={`article-card ${hoveredCard === article.id ? 'hovered' : ''} ${article.featured ? 'featured' : ''} ${article.premium ? 'premium' : ''}`}
      onMouseEnter={() => setHoveredCard(article.id)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={() => handleReadArticle(article)}
    >
      {/* Image principale */}
      <div className="article-image-container">
        <img src={article.image} alt={article.title} className="article-image" />
        
        {/* Badges de statut */}
        <div className="article-badges">
          {article.featured && <span className="badge featured">En Vedette</span>}
          {article.premium && <span className="badge premium">Premium</span>}
          {article.trending && <span className="badge trending">Tendance</span>}
        </div>

        {/* Actions rapides */}
        <div className="quick-actions">
          <button 
            className="quick-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePlayArticle(article);
            }}
            title="Lire la vidéo"
          >
            <Play size={16} />
          </button>
          <button 
            className="quick-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadArticle(article);
            }}
            title="Télécharger"
          >
            <Download size={16} />
          </button>
          <button 
            className="quick-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleShareArticle(article);
            }}
            title="Partager"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="article-content">
        <div className="article-meta">
          <span className="category">{article.category}</span>
          <span className="read-time">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>

        <h3 className="article-title">{article.title}</h3>
        <p className="article-description">{article.description}</p>

        <div className="article-author">
          <div className="author-info">
            <span className="author-name">{article.author}</span>
            <span className="publish-date">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
          </div>
        </div>

        <div className="article-stats">
          <div className="stat">
            <Eye size={14} />
            <span>{article.views.toLocaleString()}</span>
          </div>
          <div className="stat">
            <Heart size={14} />
            <span>{article.likes}</span>
          </div>
          <div className="stat">
            <MessageCircle size={14} />
            <span>{article.comments}</span>
          </div>
          <div className="stat rating">
            <Star size={14} fill="currentColor" />
            <span>{article.rating}</span>
          </div>
        </div>

        <div className="article-tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="article-actions">
          <button 
            className="action-btn primary"
            onClick={(e) => {
              e.stopPropagation();
              handleReadArticle(article);
            }}
          >
            <BookOpen size={16} />
            Lire l'article
          </button>
          <button 
            className="action-btn secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleShareArticle(article);
            }}
          >
            <Share2 size={16} />
            Partager
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <Helmet>
        <title>AllAdsMarket - Plateforme Marketing Digital</title>
        <meta name="description" content="Découvrez les dernières tendances du marketing digital avec AllAdsMarket. Articles experts, stratégies éprouvées et insights exclusifs." />
        <meta name="keywords" content="marketing digital, articles marketing, stratégies digitales, AllAdsMarket" />
      </Helmet>

      <div className={`modern-home ${darkMode ? 'dark' : 'light'}`}>
        {/* Navigation moderne */}
        <ModernNavigation darkMode={darkMode} />

        {/* Section Hero */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Découvrez l'Avenir du 
                <span className="gradient-text"> Marketing Digital</span>
              </h1>
              <p className="hero-description">
                Explorez les dernières tendances, stratégies et innovations qui transforment 
                le paysage du marketing digital. Des articles experts pour propulser votre business.
              </p>
              
              <div className="hero-actions">
                <button className="cta-button primary">
                  <Sparkles size={20} />
                  Explorer les Articles
                </button>
                <button className="cta-button secondary">
                  <BarChart3 size={20} />
                  Voir les Statistiques
                </button>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Articles Experts</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Lecteurs Actifs</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">95%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section de recherche et filtres */}
        <section className="search-section">
          <div className="search-container">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Rechercher des articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-controls">
              <button 
                className={`filter-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filtres
              </button>

              <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={16} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Catégorie</label>
                <select 
                  value={selectedFilter} 
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="IA & Tech">IA & Tech</option>
                  <option value="SEO">SEO</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Trier par</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="trending">Tendances</option>
                  <option value="recent">Récent</option>
                  <option value="popular">Populaire</option>
                  <option value="rating">Note</option>
                </select>
              </div>
            </div>
          )}
        </section>

        {/* Section des articles */}
        <section className="articles-section">
          <div className="articles-container">
            <div className="section-header">
              <h2 className="section-title">Articles Récents</h2>
              <div className="section-stats">
                <span>{filteredArticles.length} articles trouvés</span>
              </div>
            </div>

            {loading ? (
              <div className="loading-state">
                <Loader2 size={48} className="spinning" />
                <p>Chargement des articles...</p>
              </div>
            ) : (
              <div className={`articles-grid ${viewMode}`}>
                {filteredArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {filteredArticles.length === 0 && !loading && (
              <div className="empty-state">
                <AlertCircle size={48} />
                <h3>Aucun article trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer moderne */}
        <ModernFooter darkMode={darkMode} />
      </div>
    </>
  );
};

export default ModernHome;