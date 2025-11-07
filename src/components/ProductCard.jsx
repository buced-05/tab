import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Eye, Zap, ExternalLink } from 'lucide-react';
import { productAPI, analyticsAPI } from '../services/minimalAPI';
import affiliateService from '../services/minimalAffiliate';
import { translateProduct } from '../utils/productTranslations';
import { debugTranslations } from '../utils/debugTranslations';
import { useModal } from '../contexts/ModalContext';
import currencyService from '../utils/currency';
import { formatReviewCount } from '../utils/numberFormatter';
import { safeRedirect } from '../utils/redirectUtils';
import StarRating from './StarRating';

const ProductCard = ({ product, onProductClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(currencyService.getCurrentCurrency());
  const { openModal } = useModal();

  // Protection contre les produits invalides
  if (!product || !product._id) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('ProductCard: Invalid product data', product);
    }
    return null;
  }
  
  // Translate product information
  const translatedProduct = translateProduct(product, t);
  
  // Check if current language is French
  const isFrench = i18n.language === 'fr';

  useEffect(() => {
    const handleCurrencyChange = (event) => {
      setCurrentCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, []);


  const handleProductClick = async (clickSource = 'card', e) => {
    if (!product) return;
    
    // Empêcher la propagation si c'est un clic sur un bouton ou un lien
    if (e) {
      const target = e.target;
      const isButton = target.closest('button') || target.closest('.product-actions') || target.closest('.quick-view-button') || target.closest('.buy-button');
      if (isButton) {
        return; // Laisser les boutons gérer leur propre clic
      }
    }
    
    // For card clicks, prefer parent-provided navigation (e.g., to product detail)
    // Cette fonction est appelée quand on clique sur la carte elle-même
    if (clickSource === 'card' && typeof onProductClick === 'function') {
      // Utiliser le slug si disponible
      const productToNavigate = {
        ...product,
        // S'assurer que le slug est présent
        slug: product.slug || product._id
      };
      onProductClick(productToNavigate);
      return;
    }
    
    // Capturer le clic immédiatement
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    // Utiliser le service de tracking complet
    clickTrackingService.trackProductInteraction(
      product._id,
      product.name,
      clickSource,
      affiliateUrl
    );
    
    // Capturer le clic avec tous les détails
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'quickView',
      clickSource,
      productImage
    );
    
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // On mobile, redirect directly to affiliate link
      if (affiliateUrl && affiliateUrl !== '#') {
        const redirectSuccess = safeRedirect(affiliateUrl, true);
        if (!redirectSuccess) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to redirect to affiliate URL:', affiliateUrl);
          }
          window.location.href = affiliateUrl;
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No affiliate URL found for product:', product.name);
        }
        window.location.href = '/';
      }
    } else {
      // On desktop, open modal
      openModal('quickView', product);
      
      // Use setTimeout to prevent blocking the UI
      setTimeout(async () => {
        try {
          // Track the quick view in analytics
          await analyticsAPI.trackEvent('quick_view', { 
            productId: product._id,
            affiliateId: clickResult.affiliateInfo?.affiliateId 
          }, product._id);
          
        } catch (error) {
          // Error tracking quick view
          console.error('Quick view error:', error);
        }
      }, 0);
    }
  };

  const handleStarsClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    // Capturer le clic sur les étoiles
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    // Capturer le clic avec le service d'affiliation
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'stars',
      'rating-stars',
      productImage
    );
    
    // Rediriger vers le lien d'affiliation
    if (affiliateUrl && affiliateUrl !== '#') {
      const redirectSuccess = safeRedirect(affiliateUrl, true);
      if (!redirectSuccess) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to redirect to affiliate URL:', affiliateUrl);
        }
        window.location.href = affiliateUrl;
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.warn('No affiliate URL found for product:', product.name);
      }
    }
  };

  const handleSeePriceClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    // Capturer le clic sur le bouton "Voir prix"
    const clickResult = affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'buy',
      'see-price-button',
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ See Price button click captured:', clickResult.message);
    }
    
    // Redirection vers le lien d'affiliation avec ouverture forcée dans un nouvel onglet
    if (affiliateUrl && affiliateUrl !== '#') {
      const redirectSuccess = safeRedirect(affiliateUrl, true); // Force new tab
      
      if (!redirectSuccess) {
        console.warn('❌ Failed to redirect to affiliate URL:', affiliateUrl);
        // Silent redirect - no user interruption
        window.location.href = affiliateUrl;
      } else {
        console.log('✅ Successfully redirected to:', affiliateUrl);
      }
    } else {
      console.warn('❌ No affiliate URL found for product:', product.name);
      // Silent fallback - redirect to home
      window.location.href = '/';
    }
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    
    // Capturer le clic sur le bouton like
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'button',
      'like-button',
      productImage
    );
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capturer le clic sur l'image
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'image',
      'product-image',
      productImage
    );
    
    // Naviguer vers la page produit avec le slug dans l'URL
    const productSlug = product.slug || product._id;
    if (productSlug) {
      navigate(`/products/${productSlug}`);
    }
  };

  const handleQuickViewClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    // Capturer le clic sur le bouton Quick View
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    
    const clickResult = affiliateService.captureClick(
      product._id,
      product.name || product.title,
      affiliateUrl,
      'button',
      'quick-view-button',
      productImage
    );
    
    // Naviguer vers la page produit avec le slug dans l'URL
    const productSlug = product.slug || product._id;
    if (productSlug) {
      navigate(`/products/${productSlug}`);
    }
  };

  const formatPrice = (price) => {
    return currencyService.formatPrice(price, currentCurrency);
  };

  const calculateDiscount = () => {
    if (product.discount > 0) {
      return product.discount;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const calculateSavings = () => {
    if (product.savings > 0) {
      return product.savings;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return product.originalPrice - product.price;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const savings = calculateSavings();
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const productName = translatedProduct.name || product.name || product.title || 'Product';
  
  // Enhanced fallback image with better styling
  const fallbackImage = `https://via.placeholder.com/400x400/f8fafc/64748b?text=${encodeURIComponent(productName.split(' ')[0])}`;
  
  // Enhanced product tags display
  const displayTags = product.tags?.slice(0, 2) || [];
  
  // Enhanced rating display
  const rating = product.rating?.average || 0;
  const ratingCount = product.rating?.count || 0;

  return (
    <div 
      className="product-card"
      data-product-id={product._id}
      data-product-slug={product.slug || product._id}
      onClick={(e) => handleProductClick('card', e)}
    >
      <div className="product-image-container">
        {discount > 0 && (
          <div className="discount-badge">
            <Zap size={12} />
            -{discount}%
          </div>
        )}
        

        <div className="image-wrapper">
          {!imageLoaded && !imageError && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          
          <img
            src={primaryImage?.url || fallbackImage}
            alt={primaryImage?.alt || product.name}
            className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            onClick={handleImageClick}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={(e) => {
              setImageError(true);
              e.target.src = fallbackImage;
            }}
          />
        </div>

        <div className="product-overlay">
          <button 
            className="quick-view-button"
            onClick={handleQuickViewClick}
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>
      </div>
      
          <div className="product-info">
            <div className="product-header">
              <h3 className="product-name" title={translatedProduct.name || product.name}>
                {translatedProduct.name || product.name}
              </h3>
              {product.productNumber && (
                <div className="product-number" style={{
                  backgroundColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 90%)`,
                  borderColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 80%)`,
                  color: `hsl(${(product.productNumber * 30) % 360}, 60%, 40%)`
                }}>
                  {product.productNumber}
                </div>
              )}
            </div>

            <div className="product-rating-mobile" onClick={handleStarsClick} style={{ cursor: 'pointer' }}>
              <StarRating rating={rating} size={14} showText={false} />
              <span className="rating-text-mobile">
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="product-rating-desktop" onClick={handleStarsClick} style={{ cursor: 'pointer' }}>
              <StarRating rating={rating} size={16} showText={false} />
              <span className="rating-text">
                {rating.toFixed(1)} ({formatReviewCount(ratingCount, i18n.language)})
              </span>
            </div>
        
            {/* Price section hidden */}
            {/* <div className={`product-price-modern ${isFrench ? 'price-french' : ''}`}>
              <div className="price-current">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="price-original">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="price-savings">
                  -{formatPrice(product.originalPrice - product.price)}
                </div>
              )}
            </div> */}
        
        <div className="product-actions">
          <button
            className="quick-view-button quick-view-desktop"
            onClick={handleQuickViewClick}
            title="Aperçu Rapide"
          >
            <Eye size={16} />
            <span className="quick-view-text">Aperçu Rapide</span>
          </button>
          <button
            className="buy-button buy-button-desktop"
            onClick={handleSeePriceClick}
          >
            <ExternalLink size={16} />
            <span className="buy-button-text">Voir le Prix</span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;