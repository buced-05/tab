import { useTranslation } from 'react-i18next';

/**
 * Fonction utilitaire pour obtenir une version traduite d'un article
 * @param {Object} article - Article à traduire
 * @param {Function} t - Fonction de traduction i18n
 * @returns {Object} Article traduit
 */
export const translateArticle = (article, t) => {
  if (!article) return null;
  
  // Créer une clé basée sur l'ID ou le slug de l'article
  const articleKey = article.id || article.slug;
  
  // Essayer de trouver une traduction, sinon utiliser les valeurs par défaut
  return {
    ...article,
    title: t(`articles.${articleKey}.title`, { defaultValue: article.title }),
    description: t(`articles.${articleKey}.description`, { defaultValue: article.description }),
    excerpt: t(`articles.${articleKey}.excerpt`, { defaultValue: article.excerpt || article.description }),
  };
};

/**
 * Hook React pour traduire un article
 */
export const useArticleTranslation = (article) => {
  const { t } = useTranslation();
  
  return translateArticle(article, t);
};

