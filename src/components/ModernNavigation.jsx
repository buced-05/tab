import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  ShoppingBag, 
  BookOpen, 
  HelpCircle, 
  Mail, 
  Menu, 
  X,
  Globe,
  Sparkles,
  TrendingUp,
  Star,
  Sun,
  Moon
} from 'lucide-react';

/**
 * Navigation moderne pour la page d'accueil ultra contemporaine
 * Design 2025 avec glassmorphism et animations fluides
 */
const ModernNavigation = ({ darkMode, onThemeToggle }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gestion du scroll pour l'effet glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/products', label: 'Produits', icon: ShoppingBag },
    { path: '/articles', label: 'Blog', icon: BookOpen },
    { path: '/help', label: 'Aide', icon: HelpCircle },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  const quickActions = [
    { path: '/trending', label: 'Tendances', icon: TrendingUp },
    { path: '/featured', label: 'Vedettes', icon: Star },
    { path: '/classic', label: 'Version Classique', icon: Globe }
  ];

  return (
    <>
      {/* Navigation principale */}
      <nav className={`modern-nav ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}>
        <div className="nav-container">
          {/* Logo et titre */}
          <Link to="/" className="nav-brand">
            <div className="brand-icon">
              <Sparkles size={28} />
            </div>
            <div className="brand-text">
              <h1>AllAdsMarket</h1>
              <span>Blog Innovant</span>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="nav-links">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Actions rapides */}
          <div className="nav-actions">
            <div className="quick-actions">
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="quick-action"
                  title={action.label}
                >
                  <action.icon size={16} />
                </Link>
              ))}
            </div>

            {/* Bouton thème */}
            <button 
              className="theme-toggle"
              onClick={onThemeToggle}
              title={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Bouton menu mobile */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mobile-quick-actions">
            <h4>Actions rapides</h4>
            <div className="mobile-quick-grid">
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="mobile-quick-action"
                  onClick={() => setIsOpen(false)}
                >
                  <action.icon size={18} />
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mobile-theme-section">
            <button 
              className="mobile-theme-toggle"
              onClick={() => {
                onThemeToggle();
                setIsOpen(false);
              }}
            >
              <div className="theme-toggle-content">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? 'Mode clair' : 'Mode sombre'}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ModernNavigation;
