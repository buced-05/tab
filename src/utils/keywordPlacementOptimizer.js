/**
 * Optimiseur de placement des mots-clés selon les meilleures pratiques SEO
 * Assure que les mots-clés sont placés naturellement dans tous les emplacements clés :
 * 1. Title tag, meta description, URL slug
 * 2. H1 (titre principal)
 * 3. H2 (au moins un)
 * 4. Début du body text (introduction)
 * 5. Tout au long du reste de la page naturellement
 * 6. Alt text des images et nom de fichier
 */

/**
 * Extrait le mot-clé principal d'un titre ou d'une description
 */
export const extractPrimaryKeyword = (text, keywords = []) => {
  if (!text) return '';
  
  // Si des mots-clés sont fournis, prendre le plus pertinent
  if (keywords.length > 0) {
    // Trouver le mot-clé le plus long qui apparaît dans le texte
    const sortedKeywords = keywords
      .filter(kw => kw && kw.length > 3)
      .sort((a, b) => b.length - a.length);
    
    for (const kw of sortedKeywords) {
      if (text.toLowerCase().includes(kw.toLowerCase())) {
        return kw;
      }
    }
    
    // Sinon, prendre le premier mot-clé pertinent
    return sortedKeywords[0] || '';
  }
  
  // Extraire les mots importants du texte (mots de 4+ caractères)
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4)
    .slice(0, 3);
  
  return words.join(' ') || text.split(' ').slice(0, 3).join(' ');
};

/**
 * Vérifie si un mot-clé est présent dans un H1
 */
export const hasKeywordInH1 = (h1Text, keyword) => {
  if (!h1Text || !keyword) return false;
  return h1Text.toLowerCase().includes(keyword.toLowerCase());
};

/**
 * Vérifie si au moins un H2 contient le mot-clé
 */
export const hasKeywordInH2 = (h2Texts, keyword) => {
  if (!h2Texts || !Array.isArray(h2Texts) || !keyword) return false;
  return h2Texts.some(h2 => 
    h2 && h2.toLowerCase().includes(keyword.toLowerCase())
  );
};

/**
 * Vérifie si le mot-clé apparaît dans les 100 premiers mots du contenu
 */
export const hasKeywordInIntroduction = (content, keyword, wordLimit = 100) => {
  if (!content || !keyword) return false;
  
  const words = content.split(/\s+/).slice(0, wordLimit).join(' ');
  return words.toLowerCase().includes(keyword.toLowerCase());
};

/**
 * Compte le nombre d'occurrences naturelles d'un mot-clé dans le contenu
 */
export const countNaturalKeywordOccurrences = (content, keyword) => {
  if (!content || !keyword) return 0;
  
  const keywordLower = keyword.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Compter les occurrences (mots complets uniquement)
  const regex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
  const matches = contentLower.match(regex);
  
  return matches ? matches.length : 0;
};

/**
 * Génère un alt text optimisé avec le mot-clé principal
 */
export const generateOptimizedAltText = (imageUrl, keyword, context = '') => {
  if (!imageUrl) return '';
  
  // Si un contexte est fourni, l'utiliser
  if (context && context.length > 0) {
    const altText = context.substring(0, 125);
    // Ajouter le mot-clé s'il n'est pas déjà présent
    if (keyword && !altText.toLowerCase().includes(keyword.toLowerCase())) {
      return `${altText} - ${keyword}`;
    }
    return altText;
  }
  
  // Extraire des informations du nom de fichier
  const fileName = imageUrl.split('/').pop().split('.')[0];
  const cleanFileName = fileName
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .trim();
  
  let altText = cleanFileName || 'Image';
  
  // Ajouter le mot-clé si pertinent
  if (keyword) {
    if (!altText.toLowerCase().includes(keyword.toLowerCase())) {
      altText = `${altText} ${keyword}`;
    }
  }
  
  // Limiter à 125 caractères (recommandation SEO)
  return altText.substring(0, 125).trim();
};

/**
 * Optimise un slug URL avec le mot-clé principal
 */
export const optimizeSlugWithKeyword = (title, keyword = '') => {
  if (!title) return '';
  
  // Utiliser le mot-clé si fourni, sinon extraire du titre
  const primaryKeyword = keyword || extractPrimaryKeyword(title);
  
  // Créer le slug à partir du titre
  let slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, '') // Supprimer les tirets en début/fin
    .substring(0, 100);
  
  // S'assurer que le mot-clé principal est dans le slug
  if (primaryKeyword && !slug.includes(primaryKeyword.toLowerCase().replace(/\s+/g, '-'))) {
    const keywordSlug = primaryKeyword
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Ajouter le mot-clé au début du slug s'il n'est pas trop long
    if (slug.length + keywordSlug.length < 100) {
      slug = `${keywordSlug}-${slug}`;
    }
  }
  
  return slug;
};

/**
 * Analyse complète du placement des mots-clés dans une page
 */
export const analyzeKeywordPlacement = (pageData) => {
  const {
    title,
    metaDescription,
    slug,
    h1,
    h2s = [],
    content,
    images = [],
    keywords = []
  } = pageData;
  
  const primaryKeyword = extractPrimaryKeyword(title, keywords);
  const analysis = {
    primaryKeyword,
    score: 0,
    maxScore: 6,
    checks: {
      titleTag: false,
      metaDescription: false,
      urlSlug: false,
      h1: false,
      h2: false,
      introduction: false,
      naturalOccurrences: 0,
      imageAltTexts: 0
    },
    recommendations: []
  };
  
  // 1. Vérifier le title tag
  if (title && primaryKeyword) {
    analysis.checks.titleTag = title.toLowerCase().includes(primaryKeyword.toLowerCase());
    if (analysis.checks.titleTag) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans le title tag`);
    }
  }
  
  // 2. Vérifier la meta description
  if (metaDescription && primaryKeyword) {
    analysis.checks.metaDescription = metaDescription.toLowerCase().includes(primaryKeyword.toLowerCase());
    if (analysis.checks.metaDescription) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans la meta description`);
    }
  }
  
  // 3. Vérifier l'URL slug
  if (slug && primaryKeyword) {
    const keywordSlug = primaryKeyword.toLowerCase().replace(/\s+/g, '-');
    analysis.checks.urlSlug = slug.toLowerCase().includes(keywordSlug);
    if (analysis.checks.urlSlug) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans l'URL slug`);
    }
  }
  
  // 4. Vérifier le H1
  if (h1 && primaryKeyword) {
    analysis.checks.h1 = hasKeywordInH1(h1, primaryKeyword);
    if (analysis.checks.h1) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans le H1`);
    }
  }
  
  // 5. Vérifier au moins un H2
  if (h2s.length > 0 && primaryKeyword) {
    analysis.checks.h2 = hasKeywordInH2(h2s, primaryKeyword);
    if (analysis.checks.h2) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans au moins un H2`);
    }
  }
  
  // 6. Vérifier l'introduction (100 premiers mots)
  if (content && primaryKeyword) {
    analysis.checks.introduction = hasKeywordInIntroduction(content, primaryKeyword);
    if (analysis.checks.introduction) {
      analysis.score++;
    } else {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans les 100 premiers mots du contenu`);
    }
  }
  
  // Compter les occurrences naturelles dans tout le contenu
  if (content && primaryKeyword) {
    analysis.checks.naturalOccurrences = countNaturalKeywordOccurrences(content, primaryKeyword);
    if (analysis.checks.naturalOccurrences < 3) {
      analysis.recommendations.push(`Augmenter les occurrences naturelles de "${primaryKeyword}" dans le contenu (actuellement: ${analysis.checks.naturalOccurrences})`);
    }
  }
  
  // Vérifier les alt texts des images
  if (images.length > 0 && primaryKeyword) {
    const imagesWithKeyword = images.filter(img => 
      img.alt && img.alt.toLowerCase().includes(primaryKeyword.toLowerCase())
    );
    analysis.checks.imageAltTexts = imagesWithKeyword.length;
    if (imagesWithKeyword.length === 0) {
      analysis.recommendations.push(`Inclure "${primaryKeyword}" dans au moins un alt text d'image`);
    }
  }
  
  // Calculer le score final (sur 6 pour les emplacements clés)
  analysis.percentage = Math.round((analysis.score / analysis.maxScore) * 100);
  
  return analysis;
};

/**
 * Génère des recommandations d'optimisation basées sur l'analyse
 */
export const generateOptimizationRecommendations = (analysis) => {
  const recommendations = [];
  
  if (analysis.percentage < 50) {
    recommendations.push({
      priority: 'high',
      message: 'Optimisation SEO critique nécessaire. Plusieurs emplacements clés manquent le mot-clé principal.'
    });
  } else if (analysis.percentage < 80) {
    recommendations.push({
      priority: 'medium',
      message: 'Optimisation SEO recommandée. Certains emplacements peuvent être améliorés.'
    });
  } else {
    recommendations.push({
      priority: 'low',
      message: 'Placement des mots-clés bien optimisé. Maintenir cette qualité.'
    });
  }
  
  // Ajouter les recommandations spécifiques
  analysis.recommendations.forEach(rec => {
    recommendations.push({
      priority: 'medium',
      message: rec
    });
  });
  
  return recommendations;
};

export default {
  extractPrimaryKeyword,
  hasKeywordInH1,
  hasKeywordInH2,
  hasKeywordInIntroduction,
  countNaturalKeywordOccurrences,
  generateOptimizedAltText,
  optimizeSlugWithKeyword,
  analyzeKeywordPlacement,
  generateOptimizationRecommendations
};

