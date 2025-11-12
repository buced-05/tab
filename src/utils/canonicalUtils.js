/**
 * Utilitaires pour la gestion unifiée des URLs canoniques
 * Évite les conflits de canonical tags et normalise les URLs
 */

const BASE_URL = 'https://alladsmarket.com';

/**
 * Normalise une URL pour la rendre cohérente
 * - Supprime les trailing slashes (sauf pour la racine)
 * - Supprime les paramètres de requête inutiles
 * - Supprime les fragments (#)
 * - Convertit en minuscules
 * 
 * @param {string} url - URL à normaliser
 * @returns {string} URL normalisée
 */
export const normalizeUrl = (url) => {
  if (!url) return BASE_URL;
  
  try {
    // Si c'est une URL relative, la convertir en absolue
    if (url.startsWith('/')) {
      url = BASE_URL + url;
    }
    
    const urlObj = new URL(url);
    
    // Normaliser le pathname : supprimer trailing slash sauf pour la racine
    let pathname = urlObj.pathname;
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    // Supprimer les paramètres de requête inutiles (garder seulement ceux qui sont importants)
    const importantParams = ['lang', 'ref', 'utm_source', 'utm_medium', 'utm_campaign'];
    const searchParams = new URLSearchParams();
    urlObj.searchParams.forEach((value, key) => {
      if (importantParams.includes(key.toLowerCase())) {
        searchParams.set(key, value);
      }
    });
    
    // Construire l'URL normalisée
    const normalizedUrl = `${urlObj.origin}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
    
    return normalizedUrl;
  } catch (error) {
    console.warn('[canonicalUtils] Erreur lors de la normalisation de l\'URL:', url, error);
    // Fallback : nettoyer manuellement
    return url.split('#')[0].split('?')[0].replace(/\/$/, '') || BASE_URL;
  }
};

/**
 * Génère l'URL canonique pour une page
 * 
 * @param {string} path - Chemin de la page (ex: '/products/product-slug')
 * @param {Object} options - Options supplémentaires
 * @param {string} options.lang - Langue (optionnel)
 * @param {boolean} options.forceBaseUrl - Forcer l'utilisation de BASE_URL même si window.location existe
 * @returns {string} URL canonique
 */
export const getCanonicalUrl = (path = null, options = {}) => {
  const { lang, forceBaseUrl = false } = options;
  
  // Si un chemin est fourni, l'utiliser
  if (path) {
    // Normaliser le chemin
    let normalizedPath = path;
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    
    // Ajouter le préfixe de langue si nécessaire
    if (lang && lang !== 'fr') {
      normalizedPath = `/${lang}${normalizedPath === '/' ? '' : normalizedPath}`;
    }
    
    return normalizeUrl(BASE_URL + normalizedPath);
  }
  
  // Sinon, utiliser l'URL actuelle (si disponible)
  if (typeof window !== 'undefined' && !forceBaseUrl) {
    return normalizeUrl(window.location.href);
  }
  
  return BASE_URL;
};

/**
 * Génère les balises hreflang pour toutes les langues
 * 
 * @param {string} path - Chemin de la page (sans préfixe de langue)
 * @param {Array<string>} supportedLanguages - Liste des langues supportées
 * @returns {Array<Object>} Tableau d'objets { hreflang, href }
 */
export const getHreflangTags = (
  path = '/',
  supportedLanguages = ['fr', 'en', 'en-GB', 'de', 'es', 'it', 'pt', 'pt-BR', 'nl', 'sv', 'no', 'ru', 'ja', 'zh', 'hi', 'ar', 'sw', 'am']
) => {
  let normalizedPath = path || '/';
  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`;
  }
  if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
    normalizedPath = normalizedPath.slice(0, -1);
  }

  const supportedSet = new Set(supportedLanguages);
  const segments = normalizedPath.split('/').filter(Boolean);
  const hasLangPrefix = segments.length > 0 && supportedSet.has(segments[0]);
  const baseSegments = hasLangPrefix ? segments.slice(1) : segments;
  const basePath = baseSegments.length ? `/${baseSegments.join('/')}` : '/';

  const tags = [];

  // Version française (langue par défaut, sans préfixe)
  tags.push({
    hreflang: 'fr',
    href: normalizeUrl(BASE_URL + basePath),
  });

  supportedLanguages.forEach((lang) => {
    if (lang === 'fr') {
      return;
    }
    const localizedPath = basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;
    tags.push({
      hreflang: lang,
      href: normalizeUrl(BASE_URL + localizedPath),
    });
  });

  // x-default vers la version française (valeur par défaut)
  tags.push({
    hreflang: 'x-default',
    href: normalizeUrl(BASE_URL + basePath),
  });

  return tags;
};

/**
 * Vérifie si une URL est valide pour l'indexation
 * 
 * @param {string} url - URL à vérifier
 * @returns {boolean} true si l'URL est valide pour l'indexation
 */
export const isValidForIndexing = (url) => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Exclure les URLs avec certains paramètres
    const excludedParams = ['preview', 'edit', 'admin', 'test'];
    for (const param of excludedParams) {
      if (urlObj.searchParams.has(param)) {
        return false;
      }
    }
    
    // Exclure certains chemins
    const excludedPaths = ['/admin', '/app-admin', '/api', '/_next', '/static', '/assets'];
    for (const path of excludedPaths) {
      if (urlObj.pathname.startsWith(path)) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

