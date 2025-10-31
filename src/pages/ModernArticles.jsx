import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  Moon, 
  Sun, 
  TrendingUp, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  MessageCircle,
  Sparkles,
  Zap,
  Globe,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Star,
  Eye,
  ThumbsUp
} from 'lucide-react';

/**
 * Page d'articles ultra moderne avec IA de vibe coding
 * Design 2025 avec dark mode, animations fluides et génération IA
 */
const ModernArticlesPage = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const searchRef = useRef(null);
  const feedRef = useRef(null);

  // Articles simulés avec données modernes
  const mockArticles = [
    {
      id: 1,
      title: "L'Intelligence Artificielle Révolutionne le Marketing Digital",
      excerpt: "Découvrez comment l'IA transforme les stratégies marketing avec des insights révolutionnaires et des prédictions précises.",
      author: "Équipe AllAdsMarket",
      date: "2024-12-19",
      readTime: "8 min",
      category: "IA & Tech",
      tags: ["IA", "Marketing", "Innovation", "Digital"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      likes: 1247,
      views: 15420,
      comments: 89,
      trending: true,
      featured: true,
      aiGenerated: true
    },
    {
      id: 2,
      title: "Guide Complet : Optimisation SEO en 2025",
      excerpt: "Les nouvelles tendances SEO qui vont dominer 2025. Stratégies avancées pour améliorer votre visibilité organique.",
      author: "Équipe AllAdsMarket",
      date: "2024-12-18",
      readTime: "12 min",
      category: "SEO",
      tags: ["SEO", "Optimisation", "2025", "Visibilité"],
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop",
      likes: 892,
      views: 12300,
      comments: 56,
      trending: true,
      featured: false,
      aiGenerated: false
    },
    {
      id: 3,
      title: "Kinetic Staffing : Révolutionner le Recrutement à Distance",
      excerpt: "Analyse approfondie des solutions Kinetic pour l'optimisation des ressources humaines et la réduction des coûts.",
      author: "Équipe AllAdsMarket",
      date: "2024-12-17",
      readTime: "6 min",
      category: "Business",
      tags: ["Kinetic", "Recrutement", "Remote", "Business"],
      image: "https://www.uc.edu/content/dam/uc/news/units/one-stop/summer-jobs.png/_jcr_content/renditions/cq5dam.web.1280.1280.png",
      likes: 654,
      views: 8900,
      comments: 34,
      trending: false,
      featured: true,
      aiGenerated: true
    },
    {
      id: 4,
      title: "E-commerce 2025 : Les Tendances qui Changent la Donne",
      excerpt: "Exploration des innovations e-commerce qui redéfinissent l'expérience client et les modèles commerciaux.",
      author: "Équipe AllAdsMarket",
      date: "2024-12-16",
      readTime: "10 min",
      category: "E-commerce",
      tags: ["E-commerce", "Tendances", "Innovation", "2025"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
      likes: 1123,
      views: 18700,
      comments: 78,
      trending: true,
      featured: false,
      aiGenerated: false
    },
    {
      id: 5,
      title: "Analyse : Partenariat Kinetic et Optimisation des Coûts",
      excerpt: "Étude détaillée sur les avantages du programme de partenariat Kinetic pour les entreprises modernes.",
      author: "Équipe AllAdsMarket",
      date: "2024-12-15",
      readTime: "7 min",
      category: "Business",
      tags: ["Kinetic", "Partenariat", "Coûts", "Optimisation"],
      image: "https://tse4.mm.bing.net/th/id/OIP.MiFi-iU4-Rk4XEHIR4X3HAHaFN?pid=ImgDet&w=179&h=126&c=7&dpr=1.5&o=7&rm=3",
      likes: 445,
      views: 6700,
      comments: 23,
      trending: false,
      featured: true,
      aiGenerated: true
    }
  ];

  // Simulation du chargement des articles
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setArticles(mockArticles);
      setLoading(false);
    };
    loadArticles();
  }, []);

  // Gestion du scroll pour les animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrage et tri des articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         article.category.toLowerCase() === selectedFilter.toLowerCase() ||
                         (selectedFilter === 'trending' && article.trending) ||
                         (selectedFilter === 'featured' && article.featured) ||
                         (selectedFilter === 'ai' && article.aiGenerated);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.likes - a.likes;
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'popular':
        return b.views - a.views;
      default:
        return 0;
    }
  });

  // Génération IA d'articles
  const generateAIArticle = async (prompt) => {
    setAiGenerating(true);
    // Simulation de génération IA
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newArticle = {
      id: Date.now(),
      title: `Article IA : ${prompt}`,
      excerpt: "Cet article a été généré automatiquement par notre IA de vibe coding pour vous offrir un contenu personnalisé et innovant.",
      author: "IA AllAdsMarket",
      date: new Date().toISOString().split('T')[0],
      readTime: "5 min",
      category: "IA Generated",
      tags: ["IA", "Généré", "Innovation"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      likes: 0,
      views: 0,
      comments: 0,
      trending: false,
      featured: false,
      aiGenerated: true
    };
    
    setArticles(prev => [newArticle, ...prev]);
    setAiGenerating(false);
    setShowAIModal(false);
  };

  // Composant de carte d'article moderne
  const ArticleCard = ({ article, index }) => (
    <div
      className={`article-card ${hoveredCard === article.id ? 'hovered' : ''} ${article.featured ? 'featured' : ''}`}
      style={{
        transform: `translateY(${scrollY * 0.02}px)`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setHoveredCard(article.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="card-image-container">
        <img 
          src={article.image} 
          alt={article.title}
          loading="lazy"
          className="card-image"
        />
        {article.aiGenerated && (
          <div className="ai-badge">
            <Sparkles size={16} />
            <span>IA</span>
          </div>
        )}
        {article.trending && (
          <div className="trending-badge">
            <TrendingUp size={16} />
            <span>Trending</span>
          </div>
        )}
      </div>
      
      <div className="card-content">
        <div className="card-meta">
          <span className="category">{article.category}</span>
          <span className="read-time">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>
        
        <h3 className="card-title">{article.title}</h3>
        <p className="card-excerpt">{article.excerpt}</p>
        
        <div className="card-tags">
          {article.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="card-footer">
          <div className="author-info">
            <User size={16} />
            <span>{article.author}</span>
            <span className="date">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
          </div>
          
          <div className="engagement-stats">
            <div className="stat">
              <Heart size={14} />
              <span>{article.likes}</span>
            </div>
            <div className="stat">
              <Eye size={14} />
              <span>{article.views}</span>
            </div>
            <div className="stat">
              <MessageCircle size={14} />
              <span>{article.comments}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="action-btn like">
          <Heart size={18} />
        </button>
        <button className="action-btn share">
          <Share2 size={18} />
        </button>
        <button className="action-btn comment">
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  );

  // Composant de sidebar flottante
  const FloatingSidebar = () => (
    <div className={`floating-sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Navigation</h3>
        <button onClick={() => setSidebarOpen(false)}>
          <X size={20} />
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h4>Catégories</h4>
          <div className="category-list">
            {['IA & Tech', 'SEO', 'Business', 'E-commerce'].map(category => (
              <button 
                key={category}
                className={`category-btn ${selectedFilter === category.toLowerCase() ? 'active' : ''}`}
                onClick={() => setSelectedFilter(category.toLowerCase())}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="sidebar-section">
          <h4>Trier par</h4>
          <div className="sort-options">
            {[
              { value: 'trending', label: 'Tendance', icon: TrendingUp },
              { value: 'recent', label: 'Récent', icon: Clock },
              { value: 'popular', label: 'Populaire', icon: Eye }
            ].map(option => (
              <button 
                key={option.value}
                className={`sort-btn ${sortBy === option.value ? 'active' : ''}`}
                onClick={() => setSortBy(option.value)}
              >
                <option.icon size={16} />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Modal IA pour génération d'articles
  const AIModal = () => (
    <div className={`ai-modal ${showAIModal ? 'open' : ''}`}>
      <div className="modal-backdrop" onClick={() => setShowAIModal(false)} />
      <div className="modal-content">
        <div className="modal-header">
          <h2>
            <Sparkles size={24} />
            Générateur IA d'Articles
          </h2>
          <button onClick={() => setShowAIModal(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <p>Décrivez le sujet de l'article que vous souhaitez générer :</p>
          <textarea 
            placeholder="Ex: Guide complet sur l'optimisation SEO en 2025..."
            className="ai-prompt-input"
            rows={4}
          />
          
          <div className="ai-suggestions">
            <h4>Suggestions populaires :</h4>
            <div className="suggestion-chips">
              {[
                "Tendances marketing digital 2025",
                "Optimisation Core Web Vitals",
                "Stratégies e-commerce innovantes",
                "IA et automatisation business"
              ].map(suggestion => (
                <button 
                  key={suggestion}
                  className="suggestion-chip"
                  onClick={() => generateAIArticle(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button 
            className="generate-btn"
            onClick={() => generateAIArticle("Article personnalisé")}
            disabled={aiGenerating}
          >
            {aiGenerating ? (
              <>
                <Zap size={16} className="spinning" />
                Génération en cours...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Générer l'article
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Articles & Analyses - AllAdsMarket | Blog Innovant avec IA</title>
        <meta name="description" content="Découvrez notre collection d'articles ultra modernes avec génération IA, analyses approfondies et insights révolutionnaires sur le marketing digital, SEO et business." />
        <meta name="keywords" content="articles IA, blog marketing, analyses SEO, insights business, génération contenu IA, publications" />
      </Helmet>

      <div className={`modern-homepage ${darkMode ? 'dark' : 'light'}`}>
        {/* Hero section avec animation */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="gradient-text">Articles & Analyses</span>
                <br />
                avec Intelligence Artificielle
              </h1>
              <p className="hero-subtitle">
                Explorez notre collection d'articles ultra modernes, analyses approfondies et insights révolutionnaires 
                sur le marketing digital, SEO et business moderne.
              </p>
              
              {/* Barre de recherche hero */}
              <div className="hero-search">
                <div className="search-container">
                  <Search size={20} className="search-icon" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Rechercher des articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button 
                    className="ai-generate-btn"
                    onClick={() => setShowAIModal(true)}
                  >
                    <Sparkles size={20} />
                    <span>IA</span>
                  </button>
                </div>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{articles.length}+</span>
                  <span className="stat-label">Articles</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Lecteurs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="floating-cards">
                {articles.slice(0, 3).map((article, index) => (
                  <div 
                    key={article.id}
                    className="floating-card"
                    style={{
                      animationDelay: `${index * 0.5}s`,
                      transform: `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`
                    }}
                  >
                    <img src={article.image} alt={article.title} />
                    <div className="card-overlay">
                      <h4>{article.title}</h4>
                      <div className="card-meta">
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Filtres et tri */}
        <section className="filters-section">
          <div className="filters-container">
            <div className="filter-tabs">
              {[
                { value: 'all', label: 'Tous', icon: Globe },
                { value: 'trending', label: 'Tendance', icon: TrendingUp },
                { value: 'featured', label: 'Vedettes', icon: Star },
                { value: 'ai', label: 'IA Générés', icon: Sparkles }
              ].map(filter => (
                <button
                  key={filter.value}
                  className={`filter-tab ${selectedFilter === filter.value ? 'active' : ''}`}
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  <filter.icon size={18} />
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="sort-controls">
              <Filter size={18} />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="trending">Tendance</option>
                <option value="recent">Récent</option>
                <option value="popular">Populaire</option>
              </select>
            </div>
          </div>
        </section>

        {/* Feed d'articles avec animations */}
        <main className="articles-feed" ref={feedRef}>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner-large"></div>
              <h3>Chargement des articles...</h3>
              <p>Découverte des meilleurs articles pour vous</p>
            </div>
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  index={index}
                />
              ))}
            </div>
          )}
          
          {filteredArticles.length === 0 && !loading && (
            <div className="empty-state">
              <BookOpen size={64} />
              <h3>Aucun article trouvé</h3>
              <p>Essayez de modifier vos critères de recherche</p>
              <button 
                className="ai-generate-btn"
                onClick={() => setShowAIModal(true)}
              >
                <Sparkles size={20} />
                Générer un article IA
              </button>
            </div>
          )}
        </main>

        {/* Sidebar flottante */}
        <FloatingSidebar />
        
        {/* Modal IA */}
        <AIModal />
        
        {/* Overlay pour sidebar */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default ModernArticlesPage;
