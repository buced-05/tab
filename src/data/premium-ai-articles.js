// Articles IA Premium - Contenu Exceptionnel et Professionnel
// Version: 1.3 - Unification avec trendingArticles2025 - Tous les articles ont maintenant le même statut
// Tous les articles sont maintenant dans trendingArticles2025 avec des IDs cohérents (trending-XXX)
// Les 6 articles premium ont été fusionnés dans trending-articles-2025.js avec les IDs trending-042 à trending-047
import { trendingArticles2025 } from './trending-articles-2025.js';
import { customArticles2025 } from './custom-articles-2025.js';
import { seoArticles30 } from './seo-articles-30.js';

// Articles premium fusionnés dans trendingArticles2025 - Plus de distinction premium/standard
export const premiumAIArticles = [];

// Fonctions utilitaires - Tous les articles sont maintenant dans trendingArticles2025
// Plus de distinction entre premium et trending : tous les articles ont le même statut
export const getAllPremiumAIArticles = () => {
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30];
};

export const getPremiumAIArticleById = (id) => {
  // Tous les articles sont maintenant dans trendingArticles2025
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30].find(article => article.id === id);
};

export const getPremiumAIArticleBySlug = (slug) => {
  if (!slug) return null;
  
  // Normaliser le slug : trim, supprimer les slashs de fin
  const normalizedSlug = slug.trim().replace(/\/$/, '');
  
  // Tous les articles sont maintenant dans trendingArticles2025
  const allArticles = [...trendingArticles2025, ...customArticles2025, ...seoArticles30];
  
  // Recherche exacte
  let article = allArticles.find(article => {
    if (!article.slug) return false;
    return article.slug.trim() === normalizedSlug;
  });
  
  // Si pas trouvé, recherche insensible à la casse
  if (!article) {
    article = allArticles.find(article => {
      if (!article.slug) return false;
      return article.slug.trim().toLowerCase() === normalizedSlug.toLowerCase();
    });
  }
  
  // Si pas trouvé, recherche avec correspondance partielle (pour les slugs similaires)
  if (!article && normalizedSlug.length > 10) {
    const minLength = Math.min(20, normalizedSlug.length);
    article = allArticles.find(article => {
      if (!article.slug) return false;
      const cleanSlug = article.slug.trim();
      return cleanSlug.substring(0, minLength) === normalizedSlug.substring(0, minLength) ||
             cleanSlug.includes(normalizedSlug.substring(0, 15)) ||
             normalizedSlug.includes(cleanSlug.substring(0, 15));
    });
  }
  
  return article || null;
};

export const getPremiumAIArticlesByCategory = (category) => {
  // Tous les articles sont maintenant dans trendingArticles2025
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30].filter(article => article.category === category);
};

export const getTrendingPremiumAIArticles = () => {
  // Tous les articles sont maintenant dans trendingArticles2025
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30].filter(article => article.trending);
};

export const getFeaturedPremiumAIArticles = () => {
  // Tous les articles sont maintenant dans trendingArticles2025
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30].filter(article => article.featured);
};

/**
 * Enrichit un article avec des dates dynamiques basées sur la date actuelle UTC
 * TOUS les articles affichent la date d'aujourd'hui (29 octobre 2025)
 * @param {Object} article - Article à enrichir
 * @returns {Object} Article enrichi avec des dates dynamiques UTC
 */
export const enrichArticleWithDynamicDates = (article) => {
  if (!article) return article;
  
  // FORCER LA DATE AU 29 OCTOBRE 2025 EN UTC
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  
  // Créer une date UTC pour le 29 octobre 2025 avec l'heure actuelle
  const todayUTC = new Date(Date.UTC(2025, 9, 29, utcHours, utcMinutes, 0, 0));
  
  // Formater la date au format ISO - TOUJOURS 29 OCTOBRE 2025
  const dynamicPublishDate = '2025-10-29';
  
  // TOUJOURS utiliser la date du 29 octobre 2025, peu importe la date originale
  return {
    ...article,
    publishDate: dynamicPublishDate, // TOUJOURS 29 octobre 2025
    publishDateTime: todayUTC.toISOString(),
    lastUpdated: new Date().toISOString(),
    // Ajouter des informations UTC explicites
    timezone: 'UTC',
    calendar: 'Gregorian',
    // Forcer la date à être aujourd'hui
    _forceToday: true
  };
};

/**
 * Obtient tous les articles avec des dates dynamiques
 * Tous les articles sont maintenant dans trendingArticles2025 - Plus de distinction premium/standard
 * @returns {Array} Articles avec dates dynamiques
 */
export const getAllPremiumAIArticlesWithDynamicDates = () => {
  // Tous les articles sont maintenant dans trendingArticles2025
  const all = [...trendingArticles2025, ...customArticles2025, ...seoArticles30];
  const articlesWithDates = all.map(article => enrichArticleWithDynamicDates(article));
  
  // DEBUG: Vérifier que les articles sont bien chargés
  console.log('[getAllPremiumAIArticlesWithDynamicDates] Total articles:', articlesWithDates.length);
  if (articlesWithDates.length > 0) {
    console.log('[getAllPremiumAIArticlesWithDynamicDates] Premier article:', {
      id: articlesWithDates[0].id,
      title: articlesWithDates[0].title,
      slug: articlesWithDates[0].slug,
      image: articlesWithDates[0].image ? 'présent' : 'MANQUANT'
    });
  }
  
  return articlesWithDates;
};

/**
 * Obtient un article par ID avec des dates dynamiques
 * Tous les articles sont maintenant dans trendingArticles2025
 * @param {string} id - ID de l'article
 * @returns {Object|null} Article avec dates dynamiques ou null
 */
export const getPremiumAIArticleByIdWithDynamicDates = (id) => {
  // Tous les articles sont maintenant dans trendingArticles2025
  const article = [...trendingArticles2025, ...customArticles2025, ...seoArticles30].find(a => a.id === id);
  return article ? enrichArticleWithDynamicDates(article) : null;
};

// Fonction pour obtenir tous les articles
// Tous les articles sont maintenant dans trendingArticles2025 - Plus de distinction premium/standard
export const getAllArticles = () => {
  return [...trendingArticles2025, ...customArticles2025, ...seoArticles30];
};
