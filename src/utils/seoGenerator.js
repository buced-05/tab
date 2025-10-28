/**
 * Système de métadonnées SEO avancé pour les articles
 * Optimise automatiquement le SEO de chaque article
 */

export const generateArticleSEO = (article, author, locale = 'fr') => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';
  
  // Génération automatique des métadonnées
  const seoData = {
    // Meta tags de base
    title: `${article.title} | AllAdsMarket Blog`,
    description: article.description || generateDescription(article.title),
    keywords: generateKeywords(article),
    
    // Open Graph
    ogTitle: article.title,
    ogDescription: article.description,
    ogImage: article.image || `${baseUrl}/og-image.jpg`,
    ogUrl: `${baseUrl}/articles/${article.slug || article.id}`,
    ogType: 'article',
    
    // Twitter Card
    twitterTitle: article.title,
    twitterDescription: article.description,
    twitterImage: article.image || `${baseUrl}/twitter-card.jpg`,
    
    // Article spécifique
    author: author?.name || 'Team AllAdsMarket',
    publishedTime: article.date,
    modifiedTime: article.modifiedDate || article.date,
    section: article.category,
    tags: article.tags || [],
    
    // Données structurées
    structuredData: generateStructuredData(article, author, baseUrl),
    
    // URLs canoniques
    canonicalUrl: `${baseUrl}/articles/${article.slug || article.id}`,
    
    // Langues alternatives
    alternateLocales: generateAlternateLocales(article, baseUrl)
  };
  
  return seoData;
};

/**
 * Génère une description automatique basée sur le titre
 */
const generateDescription = (title) => {
  const descriptions = {
    'ia': 'Découvrez comment l\'intelligence artificielle transforme le marketing digital avec des insights exclusifs et des cas d\'usage concrets.',
    'seo': 'Analyse approfondie des dernières tendances SEO et stratégies d\'optimisation pour améliorer votre visibilité en ligne.',
    'ecommerce': 'Techniques avancées pour maximiser vos conversions e-commerce avec des exemples concrets et des métriques mesurables.',
    'blockchain': 'Exploration des applications blockchain dans le marketing digital et leur impact sur la confiance des consommateurs.',
    'analytics': 'Méthodes sophistiquées d\'analyse de données pour extraire des insights actionnables de vos métriques marketing.',
    'content': 'Stratégies créatives et techniques pour produire du contenu engageant qui génère des résultats mesurables.'
  };
  
  const titleLower = title.toLowerCase();
  for (const [key, description] of Object.entries(descriptions)) {
    if (titleLower.includes(key)) {
      return description;
    }
  }
  
  return `Article expert sur ${title.toLowerCase()} - Analyses et conseils pratiques par AllAdsMarket.`;
};

/**
 * Génère des mots-clés SEO automatiques
 */
const generateKeywords = (article) => {
  const baseKeywords = [
    'marketing digital',
    'alladsmarket',
    'expertise',
    'conseils pratiques'
  ];
  
  const categoryKeywords = {
    'ia-tech': ['intelligence artificielle', 'IA', 'machine learning', 'automatisation'],
    'seo': ['SEO', 'référencement', 'moteurs de recherche', 'optimisation'],
    'ecommerce': ['e-commerce', 'conversion', 'vente en ligne', 'optimisation'],
    'blockchain': ['blockchain', 'cryptocurrency', 'transparence', 'sécurité'],
    'analytics': ['analytics', 'données', 'métriques', 'business intelligence'],
    'content': ['content marketing', 'contenu', 'rédaction', 'stratégie']
  };
  
  const keywords = [...baseKeywords];
  
  if (article.category && categoryKeywords[article.category]) {
    keywords.push(...categoryKeywords[article.category]);
  }
  
  if (article.tags) {
    keywords.push(...article.tags);
  }
  
  return keywords.join(', ');
};

/**
 * Génère les données structurées JSON-LD
 */
const generateStructuredData = (article, author, baseUrl) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || `${baseUrl}/og-image.jpg`,
    "url": `${baseUrl}/articles/${article.slug || article.id}`,
    "datePublished": article.date,
    "dateModified": article.modifiedDate || article.date,
    "author": {
      "@type": "Person",
      "name": author?.name || "Team AllAdsMarket",
      "url": author?.social?.website || baseUrl,
      "sameAs": author?.social ? Object.values(author.social) : []
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllAdsMarket",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${article.slug || article.id}`
    },
    "keywords": generateKeywords(article),
    "articleSection": article.category,
    "wordCount": article.content ? article.content.split(' ').length : 0,
    "inLanguage": "fr-FR",
    "isAccessibleForFree": true,
    "genre": "Business",
    "about": {
      "@type": "Thing",
      "name": article.category
    }
  };
};

/**
 * Génère les URLs alternatives pour toutes les langues
 */
const generateAlternateLocales = (article, baseUrl) => {
  const languages = ['en', 'es', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'hi', 'ar'];
  const baseSlug = article.slug || article.id;
  
  return languages.map(lang => ({
    locale: lang,
    url: `${baseUrl}/${lang}/articles/${baseSlug}`
  }));
};

export default generateArticleSEO;
