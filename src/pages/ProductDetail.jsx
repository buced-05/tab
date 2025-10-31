import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  ExternalLink, 
  Heart, 
  Share2, 
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw,
  Loader
} from 'lucide-react';
import { productAPI, analyticsAPI } from '../services/minimalAPI';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productAPI.getProduct(id);
        setProduct(response.data.data);

        // Track product view
        await analyticsAPI.trackEvent('view', { productId: id }, id);
      } catch (error) {
        setError('Product not found or failed to load');
        // Error loading product
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleBuyClick = async () => {
    setIsBuying(true);
    
    try {
      // Track the click in analytics
      await productAPI.trackClick(id);
      await analyticsAPI.trackEvent('click', { productId: id }, id);
      
      // Google security compliant: Same-window redirect
      window.location.href = product.affiliateUrl;
    } catch (error) {
      // Error tracking click
      // Still redirect even if tracking fails
      window.location.href = product.affiliateUrl;
    } finally {
      setIsBuying(false);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // Error sharing product
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Link copied to clipboard - could show a toast notification here
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h3>Chargement des détails du produit...</h3>
        <p>Préparation des informations</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>{error || 'The product you\'re looking for doesn\'t exist.'}</p>
        <button 
          onClick={() => navigate('/products')} 
          className="back-button"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>
    );
  }

  const discount = calculateDiscount();
  const primaryImage = product.images?.[selectedImage] || product.images?.[0];

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="back-button"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={primaryImage?.url || '/placeholder-product.jpg'}
                alt={primaryImage?.alt || product.name}
                className="product-main-image"
              />
              {discount > 0 && (
                <div className="discount-badge">
                  -{discount}%
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating?.average || 0) ? '#fbbf24' : 'none'}
                      className={i < Math.floor(product.rating?.average || 0) ? 'filled' : ''}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating?.average?.toFixed(1) || '0.0'} ({product.rating?.count || 0} reviews)
                </span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="product-description">
              <h3>Product Description</h3>
              <div className="description-content">
                <p>{product.description}</p>
              </div>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="product-features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div className="product-specifications">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="spec-item">
                      <span className="spec-name">{spec.name}:</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="product-actions">
              <button
                className={`buy-button ${isBuying ? 'loading' : ''}`}
                onClick={handleBuyClick}
                disabled={isBuying || product.stock?.status === 'out_of_stock'}
              >
                {isBuying ? (
                  <Loader size={20} className="loading-spinner" />
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Buy Now
                    <ExternalLink size={16} />
                  </>
                )}
              </button>
              
              <button
                className={`like-button ${isLiked ? 'liked' : ''}`}
                onClick={handleLikeClick}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
              
              <button
                className="share-button"
                onClick={handleShareClick}
              >
                <Share2 size={20} />
                Share
              </button>
            </div>

            {product.stock?.status === 'out_of_stock' && (
              <div className="out-of-stock-notice">
                <p>This product is currently out of stock.</p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <Truck size={20} />
                <span>Free Shipping</span>
              </div>
              <div className="trust-badge">
                <Shield size={20} />
                <span>Secure Payment</span>
              </div>
              <div className="trust-badge">
                <RotateCcw size={20} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
