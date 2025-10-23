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
  const baseUrl = 'https://adsmarket.com';
  const defaultTitle = 'AdsMarket - Marketplace d\'Affiliation Premium | Produits Tendances & Offres Exclusives';
  const defaultDescription = 'Découvrez AdsMarket, votre marketplace d\'affiliation premium. Trouvez les meilleurs produits tendances, offres exclusives et deals incroyables. Plus de 100K+ produits de marques de confiance.';
  const defaultImage = `${baseUrl}/og-image.jpg`;

  // Generate optimized keywords for the page
  const getPageKeywords = (pageType, category, product) => {
    const baseKeywords = ['adsmarket', 'marketplace', 'affiliation', 'produits', 'offres'];
    
    switch (pageType) {
      case 'product':
        return [...baseKeywords, 'produit', product?.name || '', category || ''];
      case 'category':
        return [...baseKeywords, 'catégorie', category || ''];
      case 'home':
      default:
        return [...baseKeywords, 'accueil', 'tendances', 'deals'];
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
      <meta property="og:site_name" content="AdsMarket" />
      
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


