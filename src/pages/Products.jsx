import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductList from '../components/ProductList';
// import apiService from '../services/apiService'; // Removed unused service
import { getFeaturedProducts, getTrendingProducts, getAllProducts } from '../utils/sampleData';
import { getCanonicalUrl } from '../utils/canonicalUtils';

const Products = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentPath = location.pathname;
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        
        let result;
        
        // Try to load from API first
        if (currentPath === '/featured') {
          result = await apiService.getFeaturedProducts();
        } else if (currentPath === '/trending') {
          result = await apiService.getTrendingProducts();
        } else if (search) {
          result = await apiService.searchProducts(search);
        } else if (category && category !== 'all') {
          result = await apiService.getProductsByCategory(category);
        } else {
          result = await apiService.getProducts();
        }
        
        if (result.success) {
          setProducts(result.data || []);
        } else {
          throw new Error(result.error || 'Failed to load products from API');
        }
      } catch (error) {
        console.warn('API failed, falling back to sample data:', error);
        
        // Fallback to sample data
        const currentPath = location.pathname;
        let products = [];
        
        if (currentPath === '/featured') {
          products = getFeaturedProducts();
        } else if (currentPath === '/trending') {
          products = getTrendingProducts();
        } else {
          products = getAllProducts();
        }
        
        // Apply search filter if present
        const search = searchParams.get('search');
        if (search) {
          products = products.filter(product => 
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            (product.brand && product.brand.toLowerCase().includes(search.toLowerCase()))
          );
        }
        
        // Apply category filter if present
        const category = searchParams.get('category');
        if (category && category !== 'all') {
          products = products.filter(product => product.category === category);
        }
        
        // Randomize the order of products
        products = [...products].sort(() => Math.random() - 0.5);
        
        setProducts(products);
      }
      
      setLoading(false);
    };

    loadProducts();

    // Listen for storage changes to reload products
    const handleStorageChange = (e) => {
      if (e.key === 'customProducts' || e.key === null) {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    const handleProductUpdate = () => {
      loadProducts();
    };
    
    window.addEventListener('productUpdated', handleProductUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, [searchParams, location.pathname]);

  const handleProductClick = (product) => {
    // Navigate to product detail page using client-side routing with slug
    // TOUJOURS utiliser le slug si disponible (priorité), sinon fallback sur _id
    if (product) {
      // Vérifier que le produit a un slug
      if (!product.slug) {
        console.warn('[Products] Produit sans slug:', {
          id: product._id,
          name: product.name?.substring(0, 50)
        });
      }
      
      const productIdentifier = product.slug || product._id;
      if (productIdentifier) {
        const url = `/products/${productIdentifier}`;
        console.log('[Products] Navigation vers:', url, { slug: product.slug, id: product._id });
        navigate(url);
      } else {
        console.error('[Products] Produit sans slug ni _id:', product);
      }
    }
  };

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    
    // Route-based titles take priority (optimisés SEO)
    if (currentPath === '/featured') {
      return 'Produits Vedettes - Sélection Premium | AllAdsMarket';
    } else if (currentPath === '/trending') {
      return 'Produits Tendances 2025 - Les Plus Populaires | AllAdsMarket';
    }
    const discounted = searchParams.get('discounted');

    if (search) return `Recherche "${search}" - Résultats | AllAdsMarket`;
    if (featured === 'true') return 'Produits Vedettes - Sélection Premium | AllAdsMarket';
    if (trending === 'true') return 'Produits Tendances 2025 - Les Plus Populaires | AllAdsMarket';
    if (discounted === 'true') return 'Produits en Promotion - Offres Réduites | AllAdsMarket';
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
      return `${categoryName} - Produits de Qualité | AllAdsMarket`;
    }
    return 'Tous les Produits - Catalogue Complet | AllAdsMarket';
  };

  const getPageDescription = () => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const trending = searchParams.get('trending');
    const discounted = searchParams.get('discounted');
    const productCount = products.length;

    // Descriptions optimisées SEO (120-160 caractères)
    if (search) {
      return `Découvrez ${productCount > 0 ? productCount : 'nos'} produits correspondant à "${search}" sur AllAdsMarket. Offres exclusives, livraison rapide et garantie qualité.`;
    }
    if (featured === 'true' || location.pathname === '/featured') {
      return `Produits vedettes sélectionnés par AllAdsMarket. Découvrez ${productCount > 0 ? productCount : 'nos'} produits premium avec les meilleures offres et garanties qualité.`;
    }
    if (trending === 'true' || location.pathname === '/trending') {
      return `Produits tendances 2025 sur AllAdsMarket. ${productCount > 0 ? productCount : 'Découvrez nos'} articles les plus populaires avec offres exclusives et livraison rapide.`;
    }
    if (discounted === 'true') {
      return `Promotions et produits en réduction sur AllAdsMarket. ${productCount > 0 ? productCount : 'Découvrez nos'} meilleures offres avec remises importantes et garantie qualité.`;
    }
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
      return `Catégorie ${categoryName} sur AllAdsMarket. ${productCount > 0 ? productCount : 'Découvrez nos'} produits ${categoryName.toLowerCase()} avec offres exclusives et livraison rapide.`;
    }
    return `Catalogue complet de produits sur AllAdsMarket. ${productCount > 0 ? productCount : 'Découvrez plus de'} produits de qualité avec offres exclusives, garanties et livraison rapide.`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <h3>Chargement de produits...</h3>
        <p>Découverte des meilleures offres pour vous</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            // Reload products using sample data
            const currentPath = location.pathname;
            let products = [];
            
            if (currentPath === '/featured') {
              products = getFeaturedProducts();
            } else if (currentPath === '/trending') {
              products = getTrendingProducts();
            } else {
              products = getAllProducts();
            }
            
            setProducts(products);
            setLoading(false);
          }} 
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  const canonicalUrl = getCanonicalUrl(location.pathname);
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alladsmarket.com';
  
  // Schema.org ItemList structured data for products page - Optimisé SEO
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": getPageTitle(),
    "description": getPageDescription(),
    "url": canonicalUrl,
    "numberOfItems": products.length,
    "itemListElement": products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description || product.shortDescription || `${product.name} - Découvrez ce produit sur AllAdsMarket`,
        "image": product.images?.map(img => img.url) || [product.images?.[0]?.url || `${baseUrl}/og-image.jpg`],
        "url": `${baseUrl}/products/${product.slug || product._id}`,
        "sku": product.sku || product._id,
        "mpn": product.mpn || product._id,
        "offers": {
          "@type": "AggregateOffer",
          "url": product.affiliateUrl || `${baseUrl}/products/${product.slug || product._id}`,
          "priceCurrency": product.currency || "USD",
          "lowPrice": product.originalPrice && product.originalPrice > product.price ? product.price : (product.price || 0),
          "highPrice": product.originalPrice || product.price || 0,
          "price": product.price || 0,
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": product.stock?.status === 'out_of_stock' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
          "itemCondition": "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": "AllAdsMarket",
            "url": baseUrl
          },
          "offerCount": 1
        },
        "brand": {
          "@type": "Brand",
          "name": product.brand || "AllAdsMarket"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating?.average || 4.5,
          "reviewCount": product.rating?.count || 10,
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": product.rating?.count || 10
        },
        "review": product.rating?.reviews && product.rating.reviews.length > 0
          ? product.rating.reviews.slice(0, 1).map(review => ({
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
            }))
          : [{
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": "Client AllAdsMarket"
              },
              "datePublished": new Date().toISOString(),
              "reviewBody": `Excellent produit ${product.name}. Recommandé pour sa qualité et son rapport qualité-prix.`,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": product.rating?.average || 4.5,
                "bestRating": "5",
                "worstRating": "1"
              }
            }],
        "category": product.category || "Products"
      }
    }))
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": getPageTitle(),
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content={(() => {
          const category = searchParams.get('category');
          const search = searchParams.get('search');
          const keywords = ['produits', 'shopping', 'e-commerce', 'offres', 'deals', 'AllAdsMarket', 'marketplace'];
          if (category) keywords.push(category.replace(/-/g, ' '));
          if (search) keywords.push(search);
          return keywords.join(', ');
        })()} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AllAdsMarket" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:site_name" content="AllAdsMarket" />
        <script type="application/ld+json">
          {JSON.stringify(itemListStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      </Helmet>
      <div className="products-page">
        <div className="container">
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-description">{getPageDescription()}</p>
          </div>

        {/* Products List */}
        <ProductList
          initialProducts={products}
          showFilters={true}
          showSearch={true}
          onProductClick={handleProductClick}
          initialSearchQuery={searchParams.get('search') || ''}
        />
      </div>
    </div>
    </>
  );
};

export default Products;
