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
              AllAdsMarket - Des Meilleurs articles MOINS Chers. 
              Nous proposons une sélection soigneusement choisie d'articles de qualité supérieure pour une expérience d'achat exceptionnelle.
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
            <h4 className="footer-subtitle">{t('footer.quickLinks', 'Liens Rapides')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">{t('nav.home', 'Accueil')}</Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">{t('nav.allProducts', 'Tous les Produits')}</Link>
              </li>
              <li>
                <Link to="/featured" className="footer-link">{t('nav.featured', 'Produits Vedettes')}</Link>
              </li>
              <li>
                <Link to="/trending" className="footer-link">{t('nav.trending', 'Produits Tendances')}</Link>
              </li>
              <li>
                <Link to="/categories" className="footer-link">{t('nav.categories', 'Catégories')}</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.categories', 'Catégories')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/products?category=electronics" className="footer-link">
                  {t('categories.electronics', 'Électronique')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="footer-link">
                  {t('categories.fashion', 'Mode')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="footer-link">
                  {t('categories.home', 'Maison et jardin')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=sports" className="footer-link">
                  {t('categories.sports', 'Sports')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=beauty" className="footer-link">
                  {t('categories.beauty', 'Beauté')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.support', 'Service client')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/help" className="footer-link">{t('nav.help', 'Aide')}</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">{t('nav.contact', 'Contact')}</Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">{t('nav.faq', 'FAQ')}</Link>
              </li>
              <li>
                <Link to="/shipping" className="footer-link">{t('nav.shipping', 'Livraison')}</Link>
              </li>
              <li>
                <Link to="/returns" className="footer-link">{t('nav.returns', 'Retours')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">{t('footer.contactInfo', 'Informations de contact')}</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <Mail size={18} />
                </div>
                <div className="footer-contact-details">
                  <span className="footer-contact-label">{t('footer.email', 'E-mail')}</span>
                  <a 
                    href="mailto:newtiv05@gmail.com" 
                    className="footer-contact-value footer-email-link"
                    title={t('footer.clickToEmail', 'Cliquez pour nous envoyer un e-mail')}
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
                © 2025 newtiv. {t('footer.allRightsReserved', 'All rights reserved.')}
              </p>
            </div>
            <div className="footer-bottom-right">
              <Link to="/privacy" className="footer-bottom-link">
                {t('legal.privacy', 'Politique de Confidentialité')}
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                {t('legal.terms', "Conditions d'Utilisation")}
              </Link>
              <Link to="/cookies" className="footer-bottom-link">
                {t('legal.cookies', 'Cookies')}
              </Link>
            </div>
          </div>
          
          {/* Affiliate Disclaimer */}
          <div className="affiliate-disclaimer">
            <p>
              <ExternalLink size={14} />
              {t('footer.affiliateDisclaimer', 'BEST is a participant in various affiliate programs. We may earn commissions from qualifying purchases made through our links.')}
            </p>
          </div>
        </div>
      </div>
      <HiddenHashtags />
    </footer>
  );
};

export default Footer;
