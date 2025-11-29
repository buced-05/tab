import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import { getAllProducts } from '../utils/sampleData';
import { getCanonicalUrl } from '../utils/canonicalUtils';

const ProductDetail = () => {
  const { slug, id } = useParams(); // Support both slug and id
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

        // Normaliser le slug (décode URL si nécessaire)
        const normalizedSlug = slug ? decodeURIComponent(slug) : null;
        const normalizedId = id ? decodeURIComponent(id) : null;
        const identifier = normalizedSlug || normalizedId;

        if (!identifier) {
          setError('Product identifier missing');
          setLoading(false);
          return;
        }

        // Méthode 1: Utiliser l'API
        let response = await productAPI.getProduct(identifier);
        
        // Méthode 2: Fallback - recherche directe dans les données locales
        if (!response.success || !response.data) {
          const allProducts = getAllProducts();
          
          // Recherche exacte par slug
          let foundProduct = allProducts.find(p => p.slug === identifier);
          
          // Si pas trouvé, essayer par ID
          if (!foundProduct) {
            foundProduct = allProducts.find(p => p._id === identifier);
          }
          
          // Si pas trouvé, essayer insensible à la casse
          if (!foundProduct) {
            foundProduct = allProducts.find(p =>
              p.slug?.toLowerCase() === identifier?.toLowerCase() ||
              p._id?.toLowerCase() === identifier?.toLowerCase()
            );
          }
          
          // Si pas trouvé, essayer correspondance partielle
          if (!foundProduct && identifier.length > 5) {
            foundProduct = allProducts.find(p =>
              p.slug && identifier && (
                p.slug.includes(identifier.substring(0, Math.min(20, identifier.length))) ||
                identifier.includes(p.slug.substring(0, Math.min(20, p.slug.length)))
              )
            );
          }
          
          if (foundProduct) {
            response = {
              success: true,
              data: foundProduct
            };
          }
        }

        if (response.success && response.data) {
          setProduct(response.data);
          
          // Track product view
          const productId = response.data._id || identifier;
          await analyticsAPI.trackEvent('view', { productId }, productId);
        } else {
          setError('Product not found');
          if (process.env.NODE_ENV === 'development') {
            console.warn('[ProductDetail] Produit non trouvé pour:', {
              originalSlug: slug,
              originalId: id,
              normalizedSlug,
              normalizedId,
              identifier
            });
          }
        }
      } catch (error) {
        console.error('[ProductDetail] Erreur lors du chargement:', error);
        setError('Product not found or failed to load');
      } finally {
        setLoading(false);
      }
    };

    if (slug || id) {
      loadProduct();
    }
  }, [slug, id]);

  const handleBuyClick = async () => {
    setIsBuying(true);
    
    try {
      const productId = product._id || slug || id;
      // Track the click in analytics
      await productAPI.trackClick(productId);
      await analyticsAPI.trackEvent('click', { productId }, productId);
      
      // Google security compliant: Same-window redirect
      if (product.affiliateUrl) {
        window.location.href = product.affiliateUrl;
      }
    } catch (error) {
      // Error tracking click
      // Still redirect even if tracking fails
      if (product.affiliateUrl) {
        window.location.href = product.affiliateUrl;
      }
    } finally {
      setIsBuying(false);
    }
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleShareClick = async () => {
    const { shareLink } = await import('../utils/shareUtils');
    // Construire l'URL du produit avec le slug
    const productSlug = product?.slug || slug || id || product?._id;
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/products/${productSlug}`;
    
    await shareLink({
      title: product.name,
      text: product.description,
      url: shareUrl
    });
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
    // Page non trouvée : ajouter meta robots noindex pour éviter l'indexation
    return (
      <>
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
          <title>Product Not Found - AllAdsMarket</title>
          <link rel="canonical" href={getCanonicalUrl('/products')} />
        </Helmet>
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
      </>
    );
  }

  const discount = calculateDiscount();
  const primaryImage = product.images?.[selectedImage] || product.images?.[0];
  const canonicalUrl = getCanonicalUrl(`/products/${product.slug || product._id}`);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alladsmarket.com';
  const productUrl = `${baseUrl}/products/${product.slug || product._id}`;
  const productImages = product.images?.map(img => img.url) || [primaryImage?.url].filter(Boolean);
  const availability = product.stock?.status === 'out_of_stock' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
  const price = product.price || 0;
  const originalPrice = product.originalPrice || product.price || 0;

  // Schema.org Product structured data - Optimisé pour SEO
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || product.shortDescription || `${product.name} - Découvrez ce produit sur AllAdsMarket`,
    "image": productImages.length > 0 ? productImages.map(img => ({
      "@type": "ImageObject",
      "url": img,
      "width": 1200,
      "height": 1200
    })) : [{
      "@type": "ImageObject",
      "url": `${baseUrl}/og-image.jpg`,
      "width": 1200,
      "height": 630
    }],
    "sku": product.sku || product._id,
    "mpn": product.mpn || product._id,
    "gtin": product.gtin || product.ean || undefined,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "AllAdsMarket",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": product.affiliateUrl || productUrl,
      "priceCurrency": product.currency || "USD",
      "lowPrice": originalPrice > price ? price : originalPrice,
      "highPrice": originalPrice,
      "price": price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": availability,
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "AllAdsMarket",
        "url": baseUrl
      },
      "offerCount": 1,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": price,
        "priceCurrency": product.currency || "USD",
        "valueAddedTaxIncluded": true
      }
    },
    "aggregateRating": product.rating?.average ? {
      "@type": "AggregateRating",
      "ratingValue": product.rating.average,
      "reviewCount": product.rating.count || 0,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": product.rating.count || 0
    } : {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": 10,
      "bestRating": "5",
      "worstRating": "1"
    },
    "category": product.category || "Products",
    "productID": product._id,
    "url": productUrl,
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "product_id",
      "value": product._id
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Category",
        "value": product.category || "General"
      },
      ...(product.features ? product.features.map(feature => ({
        "@type": "PropertyValue",
        "name": feature.name || feature,
        "value": feature.value || feature
      })) : [])
    ],
    "review": product.rating?.reviews ? product.rating.reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author || "Client AllAdsMarket"
      },
      "datePublished": review.date || new Date().toISOString(),
      "reviewBody": review.comment || "Excellent produit",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating || 5,
        "bestRating": "5",
        "worstRating": "1"
      }
    })) : []
  };

  // Remove undefined fields
  if (!productStructuredData.gtin) {
    delete productStructuredData.gtin;
  }
  if (productStructuredData.review.length === 0) {
    delete productStructuredData.review;
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - AllAdsMarket</title>
        <meta name="description" content={product.description || product.shortDescription || `${product.name} - Découvrez ce produit sur AllAdsMarket`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph optimisé */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || product.shortDescription || `${product.name} - Découvrez ce produit sur AllAdsMarket`} />
        <meta property="og:image" content={primaryImage?.url || '/og-image.jpg'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="AllAdsMarket" />
        
        {/* Product meta tags */}
        <meta property="product:price:amount" content={price.toString()} />
        <meta property="product:price:currency" content={product.currency || "USD"} />
        <meta property="product:availability" content={product.stock?.status === 'out_of_stock' ? 'out of stock' : 'in stock'} />
        {product.brand && <meta property="product:brand" content={product.brand} />}
        {product.category && <meta property="product:category" content={product.category} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description || product.shortDescription || `${product.name} - Découvrez ce produit sur AllAdsMarket`} />
        <meta name="twitter:image" content={primaryImage?.url || '/og-image.jpg'} />
        <meta name="twitter:site" content="@alladsmarket" />
        
        {/* Keywords */}
        <meta name="keywords" content={`${product.name}, ${product.category || ''}, ${product.brand || ''}, produit, achat, prix, avis`} />
        <script type="application/ld+json">
          {JSON.stringify(productStructuredData)}
        </script>
      </Helmet>
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
    </>
  );
};

export default ProductDetail;
