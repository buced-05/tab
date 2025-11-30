/**
 * Utilitaires SEO avancés pour améliorer le référencement
 * Optimisations automatiques pour le marché français
 */

/**
 * Génère une meta description optimisée (150-160 caractères)
 * Optimisée pour le CTR et le SEO avec appel à l'action
 */
export const generateOptimizedDescription = (text, keywords = [], options = {}) => {
  if (!text) return '';
  
  const {
    includeCTA = true,
    maxLength = 160,
    minLength = 150,
    addValueProposition = true
  } = options;
  
  // Nettoyer le texte
  let description = text
    .replace(/\s+/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Supprimer les liens markdown
    .replace(/https?:\/\/[^\s]+/g, '') // Supprimer les URLs
    .trim();
  
  // Extraire les phrases clés (première phrase souvent la plus importante)
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 20);
  let optimizedDescription = sentences[0] || description;
  
  // Ajouter des mots-clés stratégiques si manquants
  if (keywords.length > 0) {
    const missingKeywords = keywords
      .filter(kw => kw && kw.length > 3)
      .filter(kw => !optimizedDescription.toLowerCase().includes(kw.toLowerCase()))
      .slice(0, 2);
    
    if (missingKeywords.length > 0 && optimizedDescription.length < 140) {
      optimizedDescription += ` - ${missingKeywords.join(', ')}`;
    }
  }
  
  // Ajouter une proposition de valeur si possible
  if (addValueProposition && optimizedDescription.length < 130) {
    const valueProps = [
      'Guide complet',
      'Stratégies avancées',
      'Techniques éprouvées',
      'Découvrez comment',
      'Apprenez à',
      'Maîtrisez'
    ];
    
    // Vérifier si on a déjà une valeur ajoutée
    const hasValueProp = valueProps.some(prop => 
      optimizedDescription.toLowerCase().includes(prop.toLowerCase())
    );
    
    if (!hasValueProp && optimizedDescription.length < 120) {
      optimizedDescription = `Guide complet : ${optimizedDescription}`;
    }
  }
  
  // Ajouter un appel à l'action si demandé
  if (includeCTA && optimizedDescription.length < 145) {
    const ctas = [
      'Découvrez',
      'Apprenez',
      'Maîtrisez',
      'Explorez',
      'Développez'
    ];
    
    // Vérifier si on a déjà un CTA
    const hasCTA = ctas.some(cta => 
      optimizedDescription.toLowerCase().startsWith(cta.toLowerCase())
    );
    
    if (!hasCTA && !optimizedDescription.toLowerCase().startsWith('découvrez')) {
      // Ne pas ajouter si ça dépasse la limite
      if (optimizedDescription.length < 130) {
        optimizedDescription = `Découvrez ${optimizedDescription.toLowerCase()}`;
      }
    }
  }
  
  // Tronquer intelligemment à la limite (150-160 caractères optimal)
  if (optimizedDescription.length > maxLength) {
    // Chercher le dernier point, virgule ou espace avant la limite
    const cutPoint = optimizedDescription.substring(0, maxLength - 3).lastIndexOf(/[.,;:]/);
    if (cutPoint > minLength) {
      optimizedDescription = optimizedDescription.substring(0, cutPoint + 1).trim();
    } else {
      // Couper à un espace
      const spaceCut = optimizedDescription.substring(0, maxLength - 3).lastIndexOf(' ');
      if (spaceCut > minLength) {
        optimizedDescription = optimizedDescription.substring(0, spaceCut).trim() + '...';
      } else {
        optimizedDescription = optimizedDescription.substring(0, maxLength - 3).trim() + '...';
      }
    }
  }
  
  // S'assurer qu'on a au moins 150 caractères (optimal pour Google)
  if (optimizedDescription.length < minLength && text.length > minLength) {
    // Prendre plus de contenu du texte original
    const extended = text.substring(0, maxLength - 3).trim();
    const lastSpace = extended.lastIndexOf(' ');
    optimizedDescription = extended.substring(0, lastSpace > minLength ? lastSpace : maxLength - 3).trim() + '...';
  }
  
  // Capitaliser la première lettre
  if (optimizedDescription.length > 0) {
    optimizedDescription = optimizedDescription.charAt(0).toUpperCase() + optimizedDescription.slice(1);
  }
  
  return optimizedDescription;
};

/**
 * Génère un titre SEO optimisé (30-60 caractères)
 */
export const generateOptimizedTitle = (title, siteName = 'AllAdsMarket') => {
  if (!title) return siteName;
  
  let optimizedTitle = title.trim();
  
  // Si le titre est trop court, ajouter le site name
  if (optimizedTitle.length < 30) {
    optimizedTitle = `${optimizedTitle} | ${siteName}`;
  }
  
  // Si le titre est trop long, le tronquer intelligemment
  if (optimizedTitle.length > 60) {
    // Essayer de couper à un espace proche de 60
    const cutPoint = optimizedTitle.substring(0, 57).lastIndexOf(' ');
    if (cutPoint > 30) {
      optimizedTitle = optimizedTitle.substring(0, cutPoint) + '...';
    } else {
      optimizedTitle = optimizedTitle.substring(0, 57) + '...';
    }
  }
  
  return optimizedTitle;
};

/**
 * Génère des mots-clés optimisés à partir du contenu
 */
export const generateKeywords = (text, existingKeywords = []) => {
  if (!text) return existingKeywords.join(', ');
  
  // Mots-clés français courants pour le marché
  const commonKeywords = [
    'marketing digital',
    'SEO',
    'e-commerce',
    'intelligence artificielle',
    'affiliation',
    'France',
    'français'
  ];
  
  // Extraire les mots importants du texte
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4);
  
  // Compter les occurrences
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Prendre les 5 mots les plus fréquents
  const topWords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
  
  // Combiner avec les mots-clés existants et communs
  const allKeywords = [
    ...existingKeywords,
    ...topWords,
    ...commonKeywords
  ].filter((v, i, a) => a.indexOf(v) === i); // Dédupliquer
  
  return allKeywords.slice(0, 10).join(', ');
};

/**
 * Génère un alt text optimisé pour les images
 */
export const generateAltText = (imageUrl, context = '', productName = '') => {
  // Si un alt text est fourni dans le contexte, l'utiliser
  if (context && context.length > 0) {
    return context.substring(0, 125); // Limite recommandée pour alt text
  }
  
  // Si c'est un produit, utiliser le nom du produit
  if (productName) {
    return `${productName} - AllAdsMarket`;
  }
  
  // Extraire des informations du nom de fichier
  const fileName = imageUrl.split('/').pop().split('.')[0];
  const cleanFileName = fileName
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .trim();
  
  if (cleanFileName.length > 3) {
    return `${cleanFileName} - AllAdsMarket`;
  }
  
  // Fallback générique
  return 'Image AllAdsMarket - Marketplace d\'affiliation premium';
};

/**
 * Valide et optimise les meta tags
 */
export const validateAndOptimizeMetaTags = (metaTags) => {
  const errors = [];
  const warnings = [];
  const optimized = { ...metaTags };
  
  // Valider le titre
  if (!optimized.title) {
    errors.push('Le titre est requis');
  } else if (optimized.title.length < 30) {
    warnings.push('Le titre est trop court (< 30 caractères)');
    optimized.title = generateOptimizedTitle(optimized.title);
  } else if (optimized.title.length > 60) {
    warnings.push('Le titre est trop long (> 60 caractères)');
    optimized.title = generateOptimizedTitle(optimized.title);
  }
  
  // Valider la description
  if (!optimized.description) {
    errors.push('La description est requise');
  } else if (optimized.description.length < 120) {
    warnings.push('La description est trop courte (< 120 caractères)');
    optimized.description = generateOptimizedDescription(optimized.description, optimized.keywords?.split(', '));
  } else if (optimized.description.length > 160) {
    warnings.push('La description est trop longue (> 160 caractères)');
    optimized.description = generateOptimizedDescription(optimized.description);
  }
  
  // Valider les mots-clés
  if (optimized.keywords) {
    const keywordCount = optimized.keywords.split(',').length;
    if (keywordCount > 10) {
      warnings.push('Trop de mots-clés (> 10 recommandé)');
      const keywords = optimized.keywords.split(',').slice(0, 10);
      optimized.keywords = keywords.join(', ');
    }
  }
  
  return {
    metaTags: optimized,
    errors,
    warnings,
    isValid: errors.length === 0
  };
};

/**
 * Génère des données structurées FAQ
 */
export const generateFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Génère des données structurées HowTo
 */
export const generateHowToSchema = (howTo) => {
  if (!howTo) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    "step": howTo.steps?.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image,
      "url": step.url
    })) || []
  };
};

/**
 * Génère des données structurées VideoObject
 */
export const generateVideoSchema = (video) => {
  if (!video) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": video.contentUrl,
    "embedUrl": video.embedUrl
  };
};

/**
 * Génère des données structurées Review/AggregateRating
 */
export const generateReviewSchema = (reviews) => {
  if (!reviews || reviews.length === 0) return null;
  
  const ratings = reviews.map(r => r.rating).filter(r => r);
  const averageRating = ratings.length > 0
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;
  
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": averageRating.toFixed(1),
    "reviewCount": reviews.length,
    "bestRating": "5",
    "worstRating": "1",
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author || "Client AllAdsMarket"
      },
      "datePublished": review.date || new Date().toISOString(),
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };
};

/**
 * Génère des resource hints pour améliorer les performances
 */
export const generateResourceHints = (resources) => {
  const hints = [];
  
  if (resources.preconnect) {
    resources.preconnect.forEach(url => {
      hints.push({
        rel: 'preconnect',
        href: url,
        crossOrigin: 'anonymous'
      });
    });
  }
  
  if (resources.dnsPrefetch) {
    resources.dnsPrefetch.forEach(url => {
      hints.push({
        rel: 'dns-prefetch',
        href: url
      });
    });
  }
  
  if (resources.preload) {
    resources.preload.forEach(resource => {
      hints.push({
        rel: 'preload',
        href: resource.url,
        as: resource.as || 'image',
        ...(resource.type && { type: resource.type })
      });
    });
  }
  
  if (resources.prefetch) {
    resources.prefetch.forEach(url => {
      hints.push({
        rel: 'prefetch',
        href: url
      });
    });
  }
  
  return hints;
};

/**
 * Calcule la priorité SEO d'une page pour le sitemap
 */
export const calculateSitemapPriority = (url, pageType = 'page') => {
  // Priorités par type de page
  const priorities = {
    'home': 1.0,
    'category': 0.8,
    'product': 0.9,
    'article': 0.8,
    'page': 0.7,
    'tag': 0.6,
    'author': 0.5
  };
  
  // Ajuster selon l'URL
  if (url === '/' || url === '') return 1.0;
  if (url.includes('/products')) return 0.9;
  if (url.includes('/ai-article') || url.includes('/article')) return 0.8;
  if (url.includes('/categories')) return 0.7;
  
  return priorities[pageType] || 0.5;
};

/**
 * Calcule la fréquence de changement pour le sitemap
 */
export const calculateChangeFreq = (url, lastModified, pageType = 'page') => {
  // Fréquences par type de page
  const frequencies = {
    'home': 'daily',
    'category': 'weekly',
    'product': 'weekly',
    'article': 'monthly',
    'page': 'monthly',
    'tag': 'weekly',
    'author': 'monthly'
  };
  
  // Si la page a été modifiée récemment, augmenter la fréquence
  if (lastModified) {
    const daysSinceModification = (Date.now() - new Date(lastModified).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceModification < 7) return 'daily';
    if (daysSinceModification < 30) return 'weekly';
  }
  
  return frequencies[pageType] || 'monthly';
};

/**
 * Génère des liens internes optimisés
 */
export const generateInternalLinks = (currentUrl, relatedContent) => {
  const links = [];
  
  if (!relatedContent || relatedContent.length === 0) return links;
  
  relatedContent.forEach(item => {
    if (item.url && item.url !== currentUrl) {
      links.push({
        url: item.url,
        text: item.title || item.name,
        rel: 'internal',
        title: item.description || item.title
      });
    }
  });
  
  return links;
};

/**
 * Optimise les URLs pour le SEO
 */
export const optimizeUrl = (text, maxLength = 100) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, '') // Supprimer les tirets en début/fin
    .substring(0, maxLength)
    .replace(/-+$/, ''); // Supprimer le dernier tiret si on a coupé
};

export default {
  generateOptimizedDescription,
  generateOptimizedTitle,
  generateKeywords,
  generateAltText,
  validateAndOptimizeMetaTags,
  generateFAQSchema,
  generateHowToSchema,
  generateVideoSchema,
  generateReviewSchema,
  generateResourceHints,
  calculateSitemapPriority,
  calculateChangeFreq,
  generateInternalLinks,
  optimizeUrl
};

