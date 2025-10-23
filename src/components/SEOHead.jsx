import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHeadNew = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  product = null,
  category = null,
  pageType = 'home'
}) => {
  const baseUrl = 'https://best.com';
  const defaultTitle = 'BEST - Marketplace d\'Affiliation Premium | Produits Tendances & Offres Exclusives';
  const defaultDescription = 'Découvrez BEST, votre marketplace d\'affiliation premium. Trouvez les meilleurs produits tendances, offres exclusives et deals incroyables. Plus de 100K+ produits de marques de confiance.';
  const defaultImage = `${baseUrl}/og-image.jpg`;

  // Generate optimized keywords for the page with extensive hashtags
  const getPageKeywords = (pageType, category, product) => {
    const baseKeywords = [
      'best', 'marketplace', 'affiliation', 'produits', 'offres',
      'amazon', 'amazon affiliate', 'amazon products', 'amazon deals', 'amazon affiliate marketing',
      'ecommerce', 'online shopping', 'shopping', 'deals', 'discounts', 'coupons', 'promotions',
      'electronics', 'fashion', 'home', 'beauty', 'sports', 'books', 'automotive', 'health', 'toys', 'garden',
      'trending', 'popular', 'best sellers', 'top rated', 'reviews', 'ratings', 'recommendations',
      'affiliate marketing', 'affiliate links', 'commission', 'partnership', 'collaboration',
      'shopping online', 'buy online', 'purchase', 'order', 'delivery', 'shipping', 'returns',
      'product reviews', 'customer reviews', 'user feedback', 'testimonials', 'ratings',
      'price comparison', 'best price', 'lowest price', 'cheap', 'affordable', 'budget',
      'premium', 'quality', 'brand', 'brands', 'manufacturer', 'supplier', 'retailer',
      'marketplace', 'platform', 'website', 'site', 'store', 'shop', 'boutique',
      'digital', 'technology', 'innovation', 'modern', 'contemporary', 'latest', 'new',
      'sustainable', 'eco-friendly', 'green', 'organic', 'natural', 'healthy',
      'lifestyle', 'fashion', 'style', 'trend', 'trending', 'viral', 'popular',
      'business', 'entrepreneur', 'startup', 'investment', 'finance', 'money',
      'social media', 'instagram', 'facebook', 'twitter', 'tiktok', 'youtube',
      'influencer', 'blogger', 'content creator', 'marketing', 'advertising', 'promotion',
      'seo', 'search engine optimization', 'google', 'bing', 'yahoo', 'search',
      'analytics', 'tracking', 'metrics', 'performance', 'conversion', 'roi',
      'mobile', 'responsive', 'app', 'application', 'software', 'tool',
      'security', 'privacy', 'safe', 'secure', 'trusted', 'reliable', 'authentic',
      'customer service', 'support', 'help', 'faq', 'contact', 'assistance',
      'international', 'global', 'worldwide', 'shipping', 'delivery', 'logistics',
      'payment', 'checkout', 'cart', 'basket', 'order', 'purchase', 'buy',
      'refund', 'return', 'exchange', 'warranty', 'guarantee', 'policy',
      'newsletter', 'subscription', 'membership', 'account', 'profile', 'login',
      'register', 'signup', 'sign up', 'join', 'become member', 'community'
    ];
    
    switch (pageType) {
      case 'product':
        return [...baseKeywords, 'produit', product?.name || '', category || '', 'buy now', 'shop now', 'order now'];
      case 'category':
        return [...baseKeywords, 'catégorie', category || '', 'browse', 'explore', 'discover'];
      case 'home':
      default:
        return [...baseKeywords, 'accueil', 'tendances', 'deals', 'homepage', 'main page', 'landing page'];
    }
  };
  
  const pageKeywords = getPageKeywords(pageType, category, product);
  const seoKeywords = keywords ? `${keywords}, ${pageKeywords.join(', ')}` : pageKeywords.join(', ');
  
  // Generate optimized title and description
  const generateTitle = (title, keywords) => {
    return title || defaultTitle;
  };
  
  const generateMetaDescription = (description, keywords) => {
    return description || defaultDescription;
  };
  
  const seoTitle = generateTitle(title || defaultTitle, pageKeywords);
  const seoDescription = generateMetaDescription(description || defaultDescription, pageKeywords);
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="BEST" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
    </Helmet>
  );
};

export default SEOHeadNew;
