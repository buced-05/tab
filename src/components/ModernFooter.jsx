import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  ArrowUp
} from 'lucide-react';

/**
 * Footer moderne pour la page d'accueil ultra contemporaine
 * Design 2025 avec glassmorphism et animations fluides
 */
const ModernFooter = ({ darkMode }) => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    products: [
      { label: 'Tous les produits', path: '/products' },
      { label: 'Produits tendances', path: '/trending' },
      { label: 'Produits vedettes', path: '/featured' },
      { label: 'Catégories', path: '/categories' }
    ],
    articles: [
      { label: 'Blog récent', path: '/articles' },
      { label: 'Analyses SEO', path: '/articles?category=seo' },
      { label: 'Marketing Digital', path: '/articles?category=marketing' },
      { label: 'Business', path: '/articles?category=business' }
    ],
    support: [
      { label: 'Centre d\'aide', path: '/help' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Nous contacter', path: '/contact' },
      { label: 'Politique de confidentialité', path: '/privacy' }
    ],
    company: [
      { label: 'À propos', path: '/about' },
      { label: 'Équipe', path: '/team' },
      { label: 'Carrières', path: '/careers' },
      { label: 'Presse', path: '/press' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/alladsmarket', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/alladsmarket', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/alladsmarket', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/alladsmarket', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/alladsmarket', label: 'GitHub' }
  ];

  return (
    <footer className={`modern-footer ${darkMode ? 'dark' : 'light'}`}>
      {/* Section principale du footer */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo et description */}
          <div className="footer-brand">
            <div className="brand-section">
              <div className="brand-icon">
                <Sparkles size={32} />
              </div>
              <div className="brand-text">
                <h3>AllAdsMarket</h3>
                <p>Blog Innovant avec Intelligence Artificielle</p>
              </div>
            </div>
            <p className="brand-description">
              Découvrez des articles de blog générés par IA, analyses approfondies et insights révolutionnaires 
              sur le marketing digital, SEO et business moderne.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Liens de navigation */}
          <div className="footer-links">
            <div className="link-section">
              <h4>Produits</h4>
              <ul>
                {footerLinks.products.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-section">
              <h4>Blog</h4>
              <ul>
                {footerLinks.articles.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-section">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-section">
              <h4>Entreprise</h4>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter et contact */}
      <div className="footer-newsletter">
        <div className="footer-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Restez informé</h3>
              <p>Recevez nos derniers articles de blog et analyses directement dans votre boîte mail.</p>
            </div>
            <div className="newsletter-form">
              <div className="email-input-group">
                <Mail size={20} className="email-icon" />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="email-input"
                />
                <button className="subscribe-btn">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations de contact */}
      <div className="footer-contact">
        <div className="footer-container">
          <div className="contact-info">
            <div className="contact-item">
              <MapPin size={18} />
              <span>Paris, France</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <span>contact@alladsmarket.com</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>+33 1 23 45 67 89</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                © 2024 AllAdsMarket. Tous droits réservés.
                <span className="made-with">
                  Fait avec <Heart size={16} className="heart-icon" /> en France
                </span>
              </p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/terms" className="bottom-link">Conditions d'utilisation</Link>
              <Link to="/privacy" className="bottom-link">Confidentialité</Link>
              <Link to="/cookies" className="bottom-link">Cookies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton retour en haut */}
      <button 
        className="scroll-to-top"
        onClick={scrollToTop}
        title="Retour en haut"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default ModernFooter;
