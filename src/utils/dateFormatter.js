/**
 * Utilitaires de formatage de date et heure
 * Adaptés au système horaire et locale du lecteur
 */

/**
 * Formate une date selon les préférences du lecteur (UTC)
 * @param {string|Date} date - Date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée en UTC
 */
export const formatArticleDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short'
  };

  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const dateObj = new Date(date);
    // Utiliser UTC pour le formatage
    if (!mergedOptions.timeZone) {
      mergedOptions.timeZone = 'UTC';
    }
    return dateObj.toLocaleDateString('fr-FR', mergedOptions);
  } catch (error) {
    console.error('Erreur de formatage de date:', error);
    const nowUTC = new Date();
    return nowUTC.toLocaleDateString('fr-FR', mergedOptions);
  }
};

/**
 * Formate une date courte (sans heure)
 * @param {string|Date} date - Date à formater
 * @returns {string} Date courte formatée
 */
export const formatShortDate = (date) => {
  return formatArticleDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Formate une date avec heure complète
 * @param {string|Date} date - Date à formater
 * @returns {string} Date et heure formatées
 */
export const formatFullDateTime = (date) => {
  return formatArticleDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
};

/**
 * Calcule le temps de lecture estimé basé sur le contenu
 * @param {string} content - Contenu de l'article
 * @returns {string} Temps de lecture estimé
 */
export const calculateReadingTime = (content) => {
  if (!content) return '5 min';
  
  // Supprimer les balises HTML pour compter les mots
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.split(/\s+/).length;
  
  // Vitesse de lecture moyenne : 200 mots par minute
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  
  return `${readingTimeMinutes} min`;
};

/**
 * Génère une date récente pour les nouveaux articles
 * @param {number} daysAgo - Nombre de jours dans le passé (défaut: 0 = aujourd'hui)
 * @returns {string} Date au format ISO
 */
export const generateRecentDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

/**
 * Génère une date avec heure spécifique
 * @param {number} daysAgo - Nombre de jours dans le passé
 * @param {number} hours - Heure (0-23)
 * @param {number} minutes - Minutes (0-59)
 * @returns {string} Date et heure au format ISO
 */
export const generateDateTime = (daysAgo = 0, hours = 12, minutes = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString();
};

/**
 * Obtient la date et l'heure actuelles en temps réel (UTC)
 * RETOURNE TOUJOURS LE 29 OCTOBRE 2025
 * @returns {Date} Date actuelle en UTC (29 octobre 2025)
 */
export const getCurrentDateTime = () => {
  // FORCER LA DATE AU 29 OCTOBRE 2025 EN UTC
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  
  // Date forcée : 29 octobre 2025 avec l'heure actuelle
  return new Date(Date.UTC(2025, 9, 29, utcHours, utcMinutes, utcSeconds));
};

/**
 * Formate la date et l'heure actuelles (UTC)
 * @param {Object} options - Options de formatage
 * @returns {string} Date et heure formatées en UTC
 */
export const formatCurrentDateTime = (options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short'
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  const nowUTC = getCurrentDateTime();
  return nowUTC.toLocaleString('fr-FR', mergedOptions);
};

/**
 * Formate uniquement l'heure actuelle (UTC)
 * @param {boolean} includeSeconds - Inclure les secondes
 * @returns {string} Heure formatée en UTC
 */
export const formatCurrentTime = (includeSeconds = false) => {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short'
  };
  
  if (includeSeconds) {
    options.second = '2-digit';
  }
  
  const nowUTC = getCurrentDateTime();
  return nowUTC.toLocaleTimeString('fr-FR', options);
};

/**
 * Génère une date relative dynamique (ex: "il y a 2 jours") en UTC
 * @param {string|Date} date - Date à comparer
 * @returns {string} Texte relatif
 */
export const getRelativeDate = (date) => {
  const nowUTC = getCurrentDateTime();
  const targetDate = new Date(date);
  // Convertir la date cible en UTC si nécessaire
  const targetUTC = new Date(Date.UTC(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth(),
    targetDate.getUTCDate(),
    targetDate.getUTCHours(),
    targetDate.getUTCMinutes()
  ));
  const diffInMs = nowUTC - targetUTC;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "à l'instant";
  } else if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  } else if (diffInWeeks < 4) {
    return `il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
  } else if (diffInMonths < 12) {
    return `il y a ${diffInMonths} mois`;
  } else {
    return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
  }
};

/**
 * Génère une date ISO pour aujourd'hui en UTC
 * RETOURNE TOUJOURS LE 29 OCTOBRE 2025
 * @returns {string} Date ISO (YYYY-MM-DD) en UTC
 */
export const getTodayISO = () => {
  // FORCER LA DATE AU 29 OCTOBRE 2025
  return '2025-10-29';
};

/**
 * Génère une date ISO pour un nombre de jours dans le passé depuis aujourd'hui (UTC)
 * @param {number} daysAgo - Nombre de jours dans le passé
 * @returns {string} Date ISO (YYYY-MM-DD) en UTC
 */
export const getDateISO = (daysAgo = 0) => {
  const nowUTC = getCurrentDateTime();
  const utcDate = new Date(Date.UTC(
    nowUTC.getUTCFullYear(),
    nowUTC.getUTCMonth(),
    nowUTC.getUTCDate() - daysAgo
  ));
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Formate une date pour l'affichage dans les articles avec heure relative
 * @param {string|Date} date - Date à formater
 * @param {boolean} showRelative - Afficher la date relative
 * @returns {string} Date formatée
 */
export const formatArticleDateWithRelative = (date, showRelative = true) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  const formattedDate = formatArticleDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (showRelative) {
    const relative = getRelativeDate(dateObj);
    return `${formattedDate} (${relative})`;
  }
  
  return formattedDate;
};

