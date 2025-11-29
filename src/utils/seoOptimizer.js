/**
 * Utilitaire d'optimisation SEO automatique
 * Améliore automatiquement les meta descriptions, titres et mots-clés
 */

/**
 * Optimise une description pour le SEO
 * @param {string} description - Description à optimiser
 * @param {number} minLength - Longueur minimale (défaut: 120)
 * @param {number} maxLength - Longueur maximale (défaut: 160)
 * @returns {string} Description optimisée
 */
export const optimizeDescription = (description, minLength = 120, maxLength = 160) => {
  if (!description) return '';
  
  // Nettoyer la description
  let optimized = description.trim();
  
  // Supprimer les espaces multiples
  optimized = optimized.replace(/\s+/g, ' ');
  
  // Si trop courte, ajouter des mots-clés pertinents
  if (optimized.length < minLength) {
    optimized += '. Découvrez nos offres exclusives et produits de qualité.';
  }
  
  // Si trop longue, tronquer intelligemment
  if (optimized.length > maxLength) {
    optimized = optimized.substring(0, maxLength - 3);
    // Tronquer à la dernière phrase complète
    const lastPeriod = optimized.lastIndexOf('.');
    const lastExclamation = optimized.lastIndexOf('!');
    const lastQuestion = optimized.lastIndexOf('?');
    const lastPunctuation = Math.max(lastPeriod, lastExclamation, lastQuestion);
    
    if (lastPunctuation > maxLength * 0.7) {
      optimized = optimized.substring(0, lastPunctuation + 1);
    } else {
      optimized += '...';
    }
  }
  
  return optimized;
};

/**
 * Optimise un titre pour le SEO
 * @param {string} title - Titre à optimiser
 * @param {string} siteName - Nom du site (défaut: 'AllAdsMarket')
 * @param {number} maxLength - Longueur maximale (défaut: 60)
 * @returns {string} Titre optimisé
 */
export const optimizeTitle = (title, siteName = 'AllAdsMarket', maxLength = 60) => {
  if (!title) return siteName;
  
  let optimized = title.trim();
  
  // Si le titre ne contient pas le nom du site et qu'il y a de la place
  if (!optimized.includes(siteName) && optimized.length + siteName.length + 3 <= maxLength) {
    optimized = `${optimized} | ${siteName}`;
  }
  
  // Tronquer si trop long
  if (optimized.length > maxLength) {
    optimized = optimized.substring(0, maxLength - 3) + '...';
  }
  
  return optimized;
};

/**
 * Génère des mots-clés optimisés à partir d'un contenu
 * @param {string} content - Contenu à analyser
 * @param {Array} additionalKeywords - Mots-clés additionnels
 * @param {number} maxKeywords - Nombre maximum de mots-clés (défaut: 10)
 * @returns {string} Mots-clés optimisés séparés par des virgules
 */
export const generateKeywords = (content = '', additionalKeywords = [], maxKeywords = 10) => {
  const keywords = new Set(additionalKeywords.map(k => k.toLowerCase().trim()));
  
  if (content) {
    // Extraire les mots importants (3+ caractères, pas de stop words)
    const stopWords = new Set(['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'pour', 'avec', 'sans', 'sur', 'dans', 'par', 'est', 'sont', 'être', 'avoir', 'faire', 'aller', 'voir', 'savoir', 'vouloir', 'pouvoir', 'devoir', 'falloir', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can']);
    
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= 3 && !stopWords.has(word));
    
    // Compter les occurrences
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Trier par fréquence et prendre les plus fréquents
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords - keywords.size)
      .map(([word]) => word);
    
    sortedWords.forEach(word => keywords.add(word));
  }
  
  // Ajouter les mots-clés par défaut si pas assez
  const defaultKeywords = ['alladsmarket', 'marketplace', 'affiliation', 'produits', 'offres', 'deals', 'shopping', 'e-commerce'];
  defaultKeywords.forEach(keyword => {
    if (keywords.size < maxKeywords) {
      keywords.add(keyword);
    }
  });
  
  return Array.from(keywords).slice(0, maxKeywords).join(', ');
};

/**
 * Valide et optimise les meta tags d'une page
 * @param {Object} metaTags - Objet contenant title, description, keywords
 * @returns {Object} Meta tags optimisés avec erreurs éventuelles
 */
export const validateAndOptimizeMetaTags = (metaTags) => {
  const errors = [];
  const warnings = [];
  
  const optimized = {
    title: optimizeTitle(metaTags.title, metaTags.siteName),
    description: optimizeDescription(metaTags.description),
    keywords: generateKeywords(metaTags.content || metaTags.description, metaTags.keywords ? metaTags.keywords.split(',') : [])
  };
  
  // Validation du titre
  if (!optimized.title || optimized.title.length < 30) {
    warnings.push('Titre trop court (recommandé: 30-60 caractères)');
  } else if (optimized.title.length > 60) {
    errors.push('Titre trop long (max: 60 caractères)');
  }
  
  // Validation de la description
  if (!optimized.description || optimized.description.length < 120) {
    warnings.push('Description trop courte (recommandé: 120-160 caractères)');
  } else if (optimized.description.length > 160) {
    warnings.push('Description trop longue (recommandé: max 160 caractères)');
  }
  
  // Validation des mots-clés
  const keywordCount = optimized.keywords.split(',').length;
  if (keywordCount > 10) {
    warnings.push(`Trop de mots-clés (${keywordCount}, recommandé: max 10)`);
  }
  
  return {
    ...optimized,
    errors,
    warnings,
    isValid: errors.length === 0
  };
};

/**
 * Génère des données structurées optimisées pour le SEO
 * @param {Object} data - Données de base
 * @returns {Object} Données structurées Schema.org
 */
export const generateOptimizedStructuredData = (data) => {
  const baseUrl = 'https://alladsmarket.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': data.type || 'WebPage',
    name: data.title,
    description: optimizeDescription(data.description),
    url: data.url || baseUrl,
    ...(data.image && {
      image: {
        '@type': 'ImageObject',
        url: data.image,
        width: 1200,
        height: 630
      }
    }),
    ...(data.author && {
      author: {
        '@type': 'Person',
        name: data.author
      }
    }),
    ...(data.publishDate && {
      datePublished: data.publishDate,
      dateModified: data.modifiedDate || data.publishDate
    }),
    ...(data.organization && {
      publisher: {
        '@type': 'Organization',
        name: data.organization.name || 'AllAdsMarket',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`
        }
      }
    })
  };
};

export default {
  optimizeDescription,
  optimizeTitle,
  generateKeywords,
  validateAndOptimizeMetaTags,
  generateOptimizedStructuredData
};

