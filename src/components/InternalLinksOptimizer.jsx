import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant pour optimiser les liens internes pour le SEO
 * Ajoute automatiquement des attributs SEO aux liens internes
 */
const InternalLinksOptimizer = () => {
  const location = useLocation();

  useEffect(() => {
    // Optimiser tous les liens internes après le rendu
    const optimizeInternalLinks = () => {
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href*="alladsmarket.com"]');
      
      internalLinks.forEach(link => {
        // Ajouter rel="internal" pour les liens internes (bonne pratique SEO)
        if (!link.getAttribute('rel')) {
          link.setAttribute('rel', 'internal');
        }
        
        // S'assurer que les liens externes ont target="_blank" et rel="noopener noreferrer"
        if (link.href && !link.href.includes(window.location.hostname) && !link.href.startsWith('/')) {
          if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
          }
          const rel = link.getAttribute('rel') || '';
          if (!rel.includes('noopener')) {
            link.setAttribute('rel', `${rel} noopener noreferrer`.trim());
          }
        }
        
        // Ajouter title si manquant (améliore l'accessibilité et le SEO)
        if (!link.getAttribute('title') && link.textContent) {
          const title = link.textContent.trim();
          if (title.length > 0 && title.length < 100) {
            link.setAttribute('title', title);
          }
        }
      });
    };

    // Exécuter après un court délai pour laisser le DOM se charger
    const timeout = setTimeout(optimizeInternalLinks, 500);
    
    return () => clearTimeout(timeout);
  }, [location]);

  return null; // Ce composant ne rend rien
};

export default InternalLinksOptimizer;

