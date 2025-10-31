import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Star, Heart, Zap, ArrowLeft, ArrowRight, 
  CheckCircle, Info, Share2, Bookmark, ChevronDown,
  Award, Clock, Users, Eye, ExternalLink
} from 'lucide-react';
import affiliateService from '../services/minimalAffiliate';
import { analyticsAPI } from '../services/minimalAPI';
import currencyService from '../utils/currency';
import { translateProduct } from '../utils/productTranslations';
import { formatReviewCount } from '../utils/numberFormatter';
import { safeRedirect } from '../utils/redirectUtils';
import StarRating from './StarRating';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Translate product information
  const translatedProduct = translateProduct(product, t);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(currencyService.getCurrentCurrency());
  
  // Check if current language is French
  const isFrench = i18n.language === 'fr';

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      // Track quick view open
      analyticsAPI.trackEvent('quick_view_open', { productId: product._id }, product._id);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product?._id]);

  // Listen for currency changes
  useEffect(() => {
    const handleCurrencyChange = (event) => {
      setCurrentCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChanged', handleCurrencyChange);
    return () => window.removeEventListener('currencyChanged', handleCurrencyChange);
  }, []);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest('.share-menu') && !event.target.closest('.share-btn')) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showShareMenu]);

  // Reset image state when product changes
  useEffect(() => {
    if (isOpen && product) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
      setIsLiked(false);
    }
  }, [product?._id, isOpen]);


  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    
    setIsLiked(!isLiked);
    
    // Capturer le clic sur le bouton like dans le modal
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'button',
      'quick-view-like-button',
      productImage
    );
    
    // Track like/unlike action
    analyticsAPI.trackEvent(isLiked ? 'product_unliked' : 'product_liked', { 
      productId: product._id 
    }, product._id);
  };

  const handleProductClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product) return;
    
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    // Capturer le clic sur le bouton "Voir prix" dans le modal
    const clickResult = affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'buy',
      'quick-view-see-price-button',
      productImage
    );
    
    if (clickResult.success) {
      console.log('✅ Quick View See Price button click captured:', clickResult.message);
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
      console.warn('❌ No affiliate URL found for product:', translatedProduct.name || product.name);
      // Silent fallback - redirect to home
      window.location.href = '/';
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Capturer le clic sur l'image dans le modal
    const affiliateUrl = product.affiliateUrl || product.affiliate_url || '#';
    const productImage = product.images?.find(img => img.isPrimary)?.url || product.images?.[0]?.url;
    
    affiliateService.captureClick(
      product._id,
      translatedProduct.name || product.name || product.title,
      affiliateUrl,
      'image',
      'quick-view-image',
      productImage
    );
  };

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;
    
    setIsBookmarked(!isBookmarked);
    
    // Track bookmark action
    analyticsAPI.trackEvent(isBookmarked ? 'product_unbookmarked' : 'product_bookmarked', { 
      productId: product._id 
    }, product._id);
  };

  const handleSocialShare = (platform) => {
    if (!product) return;
    
    const shareUrl = window.location.href;
    const productName = translatedProduct.name || product.name || product.title || 'Product';
    const shareText = `Check out this amazing product: ${productName}`;
    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        setShowShareMenu(false);
        return;
      default:
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
      
      // Track share action
      if (product) {
        analyticsAPI.trackEvent('product_shared', { 
          productId: product._id,
          platform: platform
        }, product._id);
      }
    }
  };


  const handleImageNavigation = useCallback((direction) => {
    if (!product || !product.images || product.images.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  }, [product?.images]);

  const formatPrice = (price) => {
    return currencyService.formatPrice(price, currentCurrency);
  };

  const calculateDiscount = () => {
    if (!product || product.price == null) return 0;
    
    if (product.discount > 0) {
      return product.discount;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const calculateSavings = () => {
    if (!product || product.price == null) return 0;
    
    if (product.savings > 0) {
      return product.savings;
    }
    if (product.originalPrice && product.originalPrice > product.price) {
      return product.originalPrice - product.price;
    }
    return 0;
  };

  // Early return if no product
  if (!isOpen || !product) return null;

  const discount = calculateDiscount();
  const savings = calculateSavings();
  const currentImage = product.images?.[currentImageIndex] || product.images?.[0];
  const productName = translatedProduct.name || product.name || product.title || 'Product';
  const fallbackImage = `https://via.placeholder.com/600x600/f8fafc/64748b?text=${encodeURIComponent(productName.split(' ')[0])}`;

  return (
    <div className="quick-view-modal-overlay" onClick={onClose}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header with close button and actions */}
        <div className="modal-header">
          <div className="modal-actions">
            <button 
              className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="action-btn share-btn"
              onClick={handleShareClick}
              aria-label="Share product"
            >
              <Share2 size={18} />
            </button>
            <button 
              className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmarkClick}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark product'}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="share-menu">
              <div className="share-menu-header">
                <h4>Partager ce produit</h4>
                <button 
                  className="close-share-menu" 
                  onClick={() => setShowShareMenu(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="share-options">
                <button 
                  className="share-option facebook"
                  onClick={() => handleSocialShare('facebook')}
                >
                  <span>📘</span>
                  Facebook
                </button>
                <button 
                  className="share-option twitter"
                  onClick={() => handleSocialShare('twitter')}
                >
                  <span>🐦</span>
                  Twitter
                </button>
                <button 
                  className="share-option linkedin"
                  onClick={() => handleSocialShare('linkedin')}
                >
                  <span>💼</span>
                  LinkedIn
                </button>
                <button 
                  className="share-option whatsapp"
                  onClick={() => handleSocialShare('whatsapp')}
                >
                  <span>📱</span>
                  WhatsApp
                </button>
                <button 
                  className="share-option copy"
                  onClick={() => handleSocialShare('copy')}
                >
                  <span>📋</span>
                  Copier le lien
                </button>
              </div>
            </div>
          )}
          
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="quick-view-content">
          {/* Image Section */}
          <div className="quick-view-images">
            <div className="main-image-container">
              {discount > 0 && (
                <div className="discount-badge">
                  <Zap size={14} />
                  -{discount}%
                </div>
              )}
              
              <div className="image-wrapper">
                {!imageLoaded && (
                  <div className="image-skeleton">
                    <div className="skeleton-shimmer"></div>
                  </div>
                )}
                
                <img
                  src={currentImage?.url || fallbackImage}
                  alt={currentImage?.alt || productName}
                  className={`main-image ${imageLoaded ? 'loaded' : 'loading'}`}
                  onClick={handleImageClick}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    setImageLoaded(true);
                    e.target.src = fallbackImage;
                  }}
                />
              </div>

              {/* Image Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    className="image-nav-btn prev"
                    onClick={() => handleImageNavigation('prev')}
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    className="image-nav-btn next"
                    onClick={() => handleImageNavigation('next')}
                    aria-label="Next image"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {/* Image counter */}
              {product.images && product.images.length > 1 && (
                <div className="image-counter">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.url || fallbackImage}
                      alt={image.alt || `${productName} ${index + 1}`}
                      onClick={handleImageClick}
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="quick-view-details">
            {product.category && (
              <div className="product-category">
                {product.category}
              </div>
            )}
            
            <div className="product-title-header">
              <h1 className="product-title">{productName}</h1>
              {product.productNumber && (
                <div className="product-number-modal" style={{
                  backgroundColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 90%)`,
                  borderColor: `hsl(${(product.productNumber * 30) % 360}, 60%, 80%)`,
                  color: `hsl(${(product.productNumber * 30) % 360}, 60%, 40%)`
                }}>
                  {product.productNumber}
                </div>
              )}
            </div>
            
            {product.brand && (
              <div className="product-brand">
                <Award size={16} />
                <span className="brand-name">{product.brand}</span>
              </div>
            )}

            {product.author?.name && (
              <div className="product-author">
                <div className="author-info">
                  <img 
                    src={product.author.avatar || 'https://via.placeholder.com/40x40/f8fafc/64748b?text=A'} 
                    alt={product.author.name}
                    className="author-avatar"
                  />
                  <div className="author-details">
                    <span className="author-label">Par</span>
                    <span className="author-name">{product.author.name}</span>
                    {product.author.bio && (
                      <span className="author-bio">{product.author.bio}</span>
                    )}
                  </div>
                </div>
                {product.author.social && (
                  <div className="author-social">
                    {product.author.social.twitter && (
                      <a href={`https://twitter.com/${product.author.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        <span>Twitter</span>
                      </a>
                    )}
                    {product.author.social.instagram && (
                      <a href={`https://instagram.com/${product.author.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                        <span>Instagram</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {product.publisher?.name && (
              <div className="product-publisher">
                <div className="publisher-info">
                  <img 
                    src={product.publisher.logo || 'https://via.placeholder.com/32x32/f8fafc/64748b?text=P'} 
                    alt={product.publisher.name}
                    className="publisher-logo"
                  />
                  <div className="publisher-details">
                    <span className="publisher-label">Publié par</span>
                    <span className="publisher-name">{product.publisher.name}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="product-rating">
              <StarRating rating={product.rating?.average || 0} size={18} showText={false} />
              <span className="rating-text">
                {product.rating?.average?.toFixed(1) || '0.0'} ({formatReviewCount(product.rating?.count || 0, i18n.language)} avis)
              </span>
            </div>

                {/* Social Stats - Moved up for better visibility */}
                {product.social && (
                  <div className="product-social-stats">
                    <h4>Engagement Social</h4>
                <div className="social-stats-grid">
                  <div className="social-stat">
                    <Heart size={16} />
                    <span className="stat-label">J'aime</span>
                    <span className="stat-value">{product.social.likes || 0}</span>
                  </div>
                  <div className="social-stat">
                    <Share2 size={16} />
                    <span className="stat-label">Partages</span>
                    <span className="stat-value">{product.social.shares?.total || 0}</span>
                  </div>
                  <div className="social-stat">
                    <Bookmark size={16} />
                    <span className="stat-label">Signets</span>
                    <span className="stat-value">{product.social.bookmarks || 0}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags - Moved up for better visibility */}
                {product.tags && product.tags.length > 0 && (
                  <div className="product-tags">
                    <h4>Étiquettes</h4>
                <div className="tags-list">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

                {product.hashtags && product.hashtags.length > 0 && (
                  <div className="product-hashtags">
                    <h4>Hashtags</h4>
                <div className="hashtags-list">
                  {product.hashtags.map((hashtag, index) => (
                    <span key={index} className="hashtag">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}

                {/* Price section hidden */}
                {false && product.price != null && (
                  <div className={`product-price ${isFrench ? 'price-french' : ''}`}>
                    <span className="current-price">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {savings > 0 && (
                      <span className="savings">
                        You save {formatPrice(savings)}
                      </span>
                    )}
                  </div>
                )}



                {(translatedProduct.description || product.description) && (
                  <div className="product-description">
                    <div className="description-header">
                      <h3>Description du Produit</h3>
                      <div className="description-badge">
                        <Info size={14} />
                        <span>Détails</span>
                      </div>
                    </div>
                <div className={`description-content ${isDescriptionExpanded ? 'expanded' : 'collapsed'}`}>
                  <div className="description-text">
                    <p>{translatedProduct.description || product.description}</p>
                        {(translatedProduct.features?.length > 0 || product.features?.length > 0) && (
                          <div className="description-features">
                            <h4>Caractéristiques Clés:</h4>
                        <ul>
                          {(translatedProduct.features || product.features || []).map((feature, index) => (
                            <li key={index}>
                              <CheckCircle size={14} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {product.description && product.description.length > 150 && (
                  <button 
                    className="description-toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDescriptionExpanded(!isDescriptionExpanded);
                    }}
                  >
                        <span>{isDescriptionExpanded ? 'Voir moins' : 'Lire plus'}</span>
                    <ChevronDown size={14} className={`chevron ${isDescriptionExpanded ? 'expanded' : ''}`} />
                  </button>
                )}
              </div>
            )}

                {/* Product Specifications */}
                {product.specifications && (
                  <div className="product-specifications">
                    <h3>Spécifications</h3>
                <div className="specs-list">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {product.keywords && product.keywords.length > 0 && (
                  <div className="product-keywords">
                    <h4>Mots-clés</h4>
                <div className="keywords-list">
                  {product.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

                {product.features && product.features.length > 0 && (
                  <div className="product-features">
                    <h4>Fonctionnalités</h4>
                <div className="features-list">
                  {product.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {(translatedProduct.benefits?.length > 0 || product.benefits?.length > 0) && (
                  <div className="product-benefits">
                    <h4>Avantages</h4>
                <div className="benefits-list">
                  {(translatedProduct.benefits || product.benefits || []).map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      <CheckCircle size={16} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {product.pros && product.pros.length > 0 && (
                  <div className="product-pros">
                    <h4>Avantages</h4>
                <div className="pros-list">
                  {product.pros.map((pro, index) => (
                    <div key={index} className="pro-item">
                      <CheckCircle size={16} />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {product.cons && product.cons.length > 0 && (
                  <div className="product-cons">
                    <h4>Inconvénients</h4>
                <div className="cons-list">
                  {product.cons.map((con, index) => (
                    <div key={index} className="con-item">
                      <X size={16} />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                {product.videos && product.videos.length > 0 && (
                  <div className="product-videos">
                    <h4>Vidéos</h4>
                <div className="videos-list">
                  {product.videos.map((video, index) => (
                    <div key={index} className="video-item">
                      <div className="video-thumbnail">
                        <img 
                          src={video.thumbnail || 'https://via.placeholder.com/200x112/f8fafc/64748b?text=Video'} 
                          alt={video.title}
                        />
                        <div className="video-play-button">
                          <span>▶</span>
                        </div>
                      </div>
                      <div className="video-info">
                        <h5>{video.title}</h5>
                        {video.description && <p>{video.description}</p>}
                        {video.duration && (
                          <span className="video-duration">
                            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Analytics section hidden as per user request */}
            {false && product.analytics && (
              <div className="product-analytics">
                <h4>Analytiques</h4>
                <div className="analytics-grid">
                  <div className="analytics-stat">
                    <Eye size={16} />
                    <span className="stat-label">Vues</span>
                    <span className="stat-value">{product.analytics.views || 0}</span>
                  </div>
                  <div className="analytics-stat">
                    <ExternalLink size={16} />
                    <span className="stat-label">Clics</span>
                    <span className="stat-value">{product.analytics.clicks || 0}</span>
                  </div>
                  <div className="analytics-stat">
                    <CheckCircle size={16} />
                    <span className="stat-label">Conversions</span>
                    <span className="stat-value">{product.analytics.conversions || 0}</span>
                  </div>
                  <div className="analytics-stat">
                    <span className="stat-label">Taux de Conversion</span>
                    <span className="stat-value">{product.analytics.conversionRate || 0}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="stock-status">
              <div className="stock-indicator">
                <div className="stock-dot in-stock"></div>
                <span>En stock</span>
              </div>
              <div className="stock-info">
                <Clock size={14} />
                <span>Expédition habituelle sous 1-2 jours ouvrables</span>
              </div>
            </div>


            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <Users size={16} />
                <span>10,000+ Clients Satisfaits</span>
              </div>
              <div className="trust-item">
                <Award size={16} />
                <span>Mieux Noté</span>
              </div>
            </div>

            {/* Product Actions */}
            <div className="product-actions">
              <button
                className="buy-button primary"
                onClick={handleProductClick}
              >
                <ExternalLink size={16} />
                Voir le Prix
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
