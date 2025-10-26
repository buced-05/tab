import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';
import Logo from './Logo';
import HiddenHashtags from './HiddenHashtags';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <Logo size="small" showText={true} className="footer-logo" />
            <p className="footer-description">
              {t('footer.aboutDescription')}
            </p>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">{t('navigation.home')}</Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">{t('products.allProducts')}</Link>
              </li>
              <li>
                <Link to="/featured" className="footer-link">{t('products.featuredProducts')}</Link>
              </li>
              <li>
                <Link to="/trending" className="footer-link">{t('products.trendingProducts')}</Link>
              </li>
              <li>
                <Link to="/categories" className="footer-link">{t('navigation.categories')}</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('navigation.categories')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/products?category=electronics" className="footer-link">
                  Électronique
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="footer-link">
                  Mode
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="footer-link">
                  Maison et jardin
                </Link>
              </li>
              <li>
                <Link to="/products?category=sports" className="footer-link">
                  Sports
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="footer-link">
                  Beauté
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Service client</h4>
            <ul className="footer-links">
              <li>
                <Link to="/help" className="footer-link">{t('navigation.help')}</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">{t('navigation.contact')}</Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="footer-link">{t('navigation.shipping')}</Link>
              </li>
              <li>
                <Link to="/returns" className="footer-link">{t('navigation.returns')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Informations de contact</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <Mail size={18} />
                </div>
                <div className="footer-contact-details">
                  <span className="footer-contact-label">E-mail</span>
                  <a 
                    href="mailto:newtiv05@gmail.com" 
                    className="footer-contact-value footer-email-link"
                    title="Cliquez pour nous envoyer un e-mail"
                  >
                    newtiv05@gmail.com
                    <ExternalLink size={14} className="email-external-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p>
                © {currentYear} BEST. All rights reserved.
              </p>
            </div>
            <div className="footer-bottom-right">
              <Link to="/privacy" className="footer-bottom-link">
                {t('navigation.privacy')}
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                {t('navigation.terms')}
              </Link>
              <Link to="/cookies" className="footer-bottom-link">
                {t('navigation.cookies')}
              </Link>
            </div>
          </div>
          
          {/* Affiliate Disclaimer */}
          <div className="affiliate-disclaimer">
            <p>
              <ExternalLink size={14} />
              BEST is a participant in various affiliate programs. 
              We may earn commissions from qualifying purchases made through our links.
            </p>
          </div>
        </div>
      </div>
      <HiddenHashtags />
    </footer>
  );
};

export default Footer;
