import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  User, 
  UserPlus,
  Menu, 
  X, 
  LogOut,
  Home,
  Grid3X3,
  Filter,
  ChevronDown,
  History,
  BarChart3,
  BookOpen
} from 'lucide-react';
import { useModal } from '../contexts/ModalContext';
import ModernLanguageSelector from './ModernLanguageSelector';
import '../styles/header.css';
import '../styles/language-selector.css';
import CurrencySelector from './CurrencySelector';
import Logo from './Logo';
// import '../styles/search-overlay.css'; // Removed unused CSS
// import '../styles/cta-messages.css'; // Removed unused CSS
// Google security compliant: Removed cookie and tracking components

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [isClickStatsOpen, setIsClickStatsOpen] = useState(false); // Removed for client-side only app
  
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCategoriesOpen && !event.target.closest('.nav-dropdown')) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen]);

  // Handle search overlay
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const toggleCategoriesMenu = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <Logo size="default" className="header-logo" />

        <nav className="desktop-nav">
          <Link to="/" className="nav-link" data-cta="🏠 Découvrez des produits incroyables">
            <Home size={16} />
            <span>{t('navigation.home')}</span>
          </Link>
          <Link to="/products" className="nav-link" data-cta="🛍️ Parcourez tous les produits">
            <Grid3X3 size={16} />
            <span>{t('navigation.products')}</span>
          </Link>
          <Link to="/articles" className="nav-link" data-cta="📚 Découvrez nos guides d'achat">
            <BookOpen size={16} />
            <span>Articles</span>
          </Link>
          <div className="nav-dropdown">
            <button 
              className="nav-link dropdown-trigger"
              onClick={toggleCategoriesMenu}
              data-cta="🔍 Explorez les catégories"
            >
              <Filter size={16} />
              <span>{t('navigation.categories')}</span>
              <ChevronDown size={14} />
            </button>
            <div className={`dropdown-menu ${isCategoriesOpen ? 'show' : ''}`}>
              <Link 
                to="/products?category=electronics" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">📱</span>
                <span>Électronique</span>
              </Link>
              <Link 
                to="/products?category=fashion" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">👕</span>
                <span>Mode</span>
              </Link>
              <Link 
                to="/products?category=home" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">🏠</span>
                <span>Maison et jardin</span>
              </Link>
              <Link 
                to="/products?category=sports" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">⚽</span>
                <span>Sports</span>
              </Link>
              <Link 
                to="/products?category=beauty" 
                className="dropdown-item"
                onClick={() => setIsCategoriesOpen(false)}
              >
                <span className="dropdown-icon">💄</span>
                <span>Beauté</span>
              </Link>
            </div>
          </div>
          <Link to="/visited-items" className="nav-link" data-cta="📋 Voir l'historique de navigation">
            <History size={16} />
            <span>{t('navigation.visited')}</span>
          </Link>
          {/* Click Stats button removed for client-side only app
          <button 
            className="nav-link click-stats-button" 
            onClick={() => setIsClickStatsOpen(true)}
            data-cta="📊 Voir les statistiques de clics"
          >
            <BarChart3 size={16} />
            <span>{t('navigation.clickStats', 'Click Stats')}</span>
          </button>
          */}
        </nav>

        <button 
          onClick={openSearch}
          className="search-trigger"
          title="Rechercher"
          data-cta="🔍 Rechercher des produits"
        >
          <Search size={20} />
        </button>

        <ModernLanguageSelector />
        <CurrencySelector />

        {/* User profile icon removed - Use 3-click logo to access login */}

        <button 
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label="Basculer le menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              <div className="mobile-search">
                <form onSubmit={handleSearch} className="mobile-search-form">
                  <Search size={20} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mobile-search-input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="search-clear"
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>
              </div>
              
              <div className="mobile-nav-links">
                <Link 
                  to="/" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} />
                  <span>Home</span>
                </Link>
                <Link 
                  to="/products" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Grid3X3 size={18} />
                  <span>Products</span>
                </Link>
                <Link 
                  to="/articles" 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen size={18} />
                  <span>Articles</span>
                </Link>
                <Link
                  to="/visited-items"
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <History size={18} />
                  <span>Visited</span>
                </Link>
                {/* Click Stats mobile button removed for client-side only app
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    setIsClickStatsOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <BarChart3 size={18} />
                  <span>Click Stats</span>
                </button>
                */}
                
                {/* Login/Register removed - Use 3-click logo to access login */}
              </div>
            </nav>
          </div>
        )}


        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="search-overlay" onClick={closeSearch}>
            <div className="search-overlay-content" onClick={(e) => e.stopPropagation()}>
              <div className="search-overlay-header desktop-only">
                <div className="search-header-content">
                  <h2>Recherche de Produits</h2>
                  <p className="search-overlay-cta">Découvrez des milliers de produits avec notre moteur de recherche intelligent</p>
                </div>
                <button 
                  onClick={closeSearch}
                  className="search-overlay-close"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Bouton de fermeture mobile */}
              <button 
                onClick={closeSearch}
                className="search-overlay-close mobile-only"
              >
                <X size={24} />
              </button>
              
              <form onSubmit={handleSearch} className="search-overlay-form">
                <div className="search-overlay-input-container">
                  <Search size={24} className="search-overlay-icon" />
                  <input
                    type="text"
                    placeholder="Tapez votre recherche... (ex: iPhone, Nike, ordinateur)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-overlay-input"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="search-overlay-clear"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                
                {/* Suggestions dynamiques basées sur la recherche - Desktop seulement */}
                {searchQuery && (
                  <div className="search-dynamic-suggestions desktop-only">
                    <h4>Suggestions pour "{searchQuery}"</h4>
                    <div className="suggestion-chips">
                      <button 
                        type="button"
                        onClick={() => {
                          setSearchQuery(`${searchQuery} pas cher`);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="suggestion-chip"
                      >
                        {searchQuery} pas cher
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setSearchQuery(`${searchQuery} avis`);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="suggestion-chip"
                      >
                        {searchQuery} avis
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setSearchQuery(`${searchQuery} comparatif`);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="suggestion-chip"
                      >
                        {searchQuery} comparatif
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setSearchQuery(`${searchQuery} meilleur prix`);
                          handleSearch({ preventDefault: () => {} });
                        }}
                        className="suggestion-chip"
                      >
                        {searchQuery} meilleur prix
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Catégories populaires - Desktop seulement */}
                <div className="search-overlay-suggestions desktop-only">
                  <h3>Catégories Populaires</h3>
                  <div className="search-suggestions-grid">
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('smartphone');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card electronics"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM17 20H7V4H17V20Z"/>
                          <path d="M12 18C12.55 18 13 17.55 13 17C13 16.45 12.55 16 12 16C11.45 16 11 16.45 11 17C11 17.55 11.45 18 12 18Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Smartphones</span>
                        <span className="suggestion-count">2,847 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('laptop');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card electronics"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 6H20V4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20V18H4V6ZM20 18H4V6H20V18Z"/>
                          <path d="M22 20H2V22H22V20Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Ordinateurs</span>
                        <span className="suggestion-count">1,234 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('mode femme');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card fashion"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9L3 7V9H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V9H21ZM17 20H7V9H17V20Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Mode Femme</span>
                        <span className="suggestion-count">3,456 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('chaussures');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card fashion"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 7H16V6C16 4.9 15.1 4 14 4H10C8.9 4 8 4.9 8 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 6H14V7H10V6ZM19 19H5V9H19V19Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Chaussures</span>
                        <span className="suggestion-count">1,789 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('maison décoration');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card home"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Maison & Déco</span>
                        <span className="suggestion-count">2,123 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('sport fitness');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card sports"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z"/>
                          <path d="M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Sport & Fitness</span>
                        <span className="suggestion-count">987 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('beauté soins');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card beauty"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20Z"/>
                          <path d="M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Beauté & Soins</span>
                        <span className="suggestion-count">1,567 produits</span>
                      </div>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('livres');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="search-suggestion-card books"
                    >
                      <div className="suggestion-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"/>
                          <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"/>
                        </svg>
                      </div>
                      <div className="suggestion-content">
                        <span className="suggestion-title">Livres</span>
                        <span className="suggestion-count">3,210 produits</span>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Recherches populaires - Desktop seulement */}
                <div className="search-trending desktop-only">
                  <h3>Recherches Populaires</h3>
                  <div className="trending-searches">
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('iPhone 15');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="trending-search"
                    >
                      <span className="trending-rank">1</span>
                      <span className="trending-text">iPhone 15</span>
                      <span className="trending-trend">↗</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('Nike Air Max');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="trending-search"
                    >
                      <span className="trending-rank">2</span>
                      <span className="trending-text">Nike Air Max</span>
                      <span className="trending-trend">↗</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('MacBook Pro');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="trending-search"
                    >
                      <span className="trending-rank">3</span>
                      <span className="trending-text">MacBook Pro</span>
                      <span className="trending-trend">↗</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('Samsung Galaxy');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="trending-search"
                    >
                      <span className="trending-rank">4</span>
                      <span className="trending-text">Samsung Galaxy</span>
                      <span className="trending-trend">↗</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('Adidas');
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="trending-search"
                    >
                      <span className="trending-rank">5</span>
                      <span className="trending-text">Adidas</span>
                      <span className="trending-trend">↗</span>
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="search-overlay-submit desktop-only"
                  disabled={!searchQuery.trim()}
                >
                  <Search size={20} />
                  Rechercher "{searchQuery || 'produits'}"
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Click Statistics Panel - Removed for client-side only app */}
      {/* <ClickStats /> */}
      
      {/* Affiliate Cookie Display - Removed for client-side only app */}
      {/* <AffiliateCookieDisplay /> */}

      {/* Logout Confirmation Modal */}
      
      {/* <ClickStats
        isOpen={isClickStatsOpen}
        onClose={() => setIsClickStatsOpen(false)}
      /> */}
    </>
  );
};

export default Header;
