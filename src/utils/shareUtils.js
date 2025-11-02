/**
 * Utilitaires pour le partage de liens dans l'application
 * Garantit que tous les liens de partage utilisent window.location.href
 */

/**
 * Partage un lien de l'application
 * @param {Object} options - Options de partage
 * @param {string} options.title - Titre à partager
 * @param {string} options.text - Texte descriptif
 * @param {string} [options.url] - URL à partager (par défaut: window.location.href)
 * @returns {Promise<void>}
 */
export const shareLink = async ({ title, text, url = null }) => {
  const shareUrl = url || window.location.href;
  
  const shareData = {
    title: title || document.title,
    text: text || '',
    url: shareUrl
  };
  
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: copier le lien dans le presse-papiers
      await navigator.clipboard.writeText(shareUrl);
      alert('Lien copié dans le presse-papiers !');
    }
  } catch (err) {
    // Si l'utilisateur annule, ne rien faire
    if (err.name !== 'AbortError') {
      console.error('Erreur lors du partage:', err);
      // Fallback: copier le lien
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Lien copié dans le presse-papiers !');
      } catch (clipboardErr) {
        console.error('Erreur lors de la copie dans le presse-papiers:', clipboardErr);
      }
    }
  }
};

/**
 * Génère un texte descriptif pour un lien sans exposer l'URL brute
 * @param {string} href - URL du lien
 * @returns {string} Texte descriptif
 */
export const getLinkText = (href) => {
  if (!href) return 'Voir le lien';
  
  try {
    const url = new URL(href);
    const hostname = url.hostname.replace('www.', '');
    
    // Détecter le type de lien et retourner un texte descriptif
    if (hostname.includes('amazon') || hostname.includes('amzn.to')) {
      return 'Voir sur Amazon';
    } else if (hostname.includes('alladsmarket')) {
      return 'AllAdsMarket';
    } else if (hostname.includes('leperoke')) {
      return 'LEPEROKE.com';
    } else if (hostname.includes('newtiv')) {
      return 'Newtiv.com';
    } else {
      // Extraire un nom de domaine lisible
      const domain = hostname.split('.')[0];
      return domain ? `Voir sur ${domain.charAt(0).toUpperCase() + domain.slice(1)}` : 'Voir le produit';
    }
  } catch (e) {
    // Si l'URL est invalide, vérifier le contenu
    if (href.includes('amazon') || href.includes('amzn.to')) {
      return 'Voir sur Amazon';
    } else if (href.includes('alladsmarket')) {
      return 'AllAdsMarket';
    } else {
      return 'Voir le produit';
    }
  }
};

/**
 * Masque les URLs brutes dans un élément DOM et les remplace par des textes descriptifs
 * @param {HTMLElement|Document} container - Conteneur DOM à traiter
 */
export const hideRawUrls = (container) => {
  if (!container) return;
  
  // Trouver tous les liens
  const links = container.querySelectorAll ? container.querySelectorAll('a[href]') : [];
  
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    
    const linkText = a.textContent.trim();
    
    // Si le texte du lien contient l'URL brute, la masquer
    if (linkText === href || linkText.includes('http://') || linkText.includes('https://')) {
      a.textContent = getLinkText(href);
    }
    
    // Si le lien n'a pas de texte visible, ajouter un texte descriptif
    if (!a.textContent.trim() && !a.innerText.trim() && !a.querySelector('img')) {
      a.textContent = getLinkText(href);
    }
  });
  
  // Trouver tous les textes qui contiennent des URLs brutes
  const textNodes = [];
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.match(/https?:\/\/[^\s]+/)) {
      textNodes.push(node);
    }
  }
  
  // Remplacer les URLs brutes par des textes descriptifs
  textNodes.forEach(textNode => {
    const text = textNode.textContent;
    const urlMatch = text.match(/(https?:\/\/[^\s]+)/);
    if (urlMatch) {
      const url = urlMatch[1];
      const linkText = getLinkText(url);
      const parent = textNode.parentNode;
      
      // Créer un lien avec le texte descriptif
      const link = document.createElement('a');
      link.href = url;
      link.textContent = linkText;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Remplacer le nœud texte par le lien
      const before = text.substring(0, text.indexOf(url));
      const after = text.substring(text.indexOf(url) + url.length);
      
      if (before) {
        parent.insertBefore(document.createTextNode(before), textNode);
      }
      parent.insertBefore(link, textNode);
      if (after) {
        parent.insertBefore(document.createTextNode(after), textNode);
      }
      parent.removeChild(textNode);
    }
  });
};

/**
 * Slogan de l'application
 */
export const APP_SLOGAN = 'Des Meilleurs articles MOINS Chers';

