import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateInternalLinks } from '../utils/seoEnhancer';

/**
 * Composant pour optimiser automatiquement les liens internes
 * Ajoute rel="internal" pour les liens internes et rel="noopener" pour les externes
 */
const InternalLinksOptimizer = () => {
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

  useEffect(() => {
    const optimizeLinks = () => {
      // Trouver tous les liens
      const links = document.querySelectorAll('a[href]');
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Déterminer si c'est un lien interne ou externe
        const isInternal = 
          href.startsWith('/') || 
          href.startsWith('#') ||
          href.includes(baseUrl.replace('https://', '').replace('http://', ''));
        
        // Optimiser les liens internes
        if (isInternal && !href.startsWith('#')) {
          // Ajouter rel="internal" pour le SEO
          if (!link.getAttribute('rel')?.includes('internal')) {
            const existingRel = link.getAttribute('rel') || '';
            link.setAttribute('rel', existingRel ? `${existingRel} internal` : 'internal');
          }
          
          // Ajouter un title si manquant (améliore l'accessibilité et le SEO)
          if (!link.getAttribute('title') && link.textContent.trim()) {
            link.setAttribute('title', link.textContent.trim());
          }
        } else if (!isInternal) {
          // Liens externes : ajouter noopener et nofollow pour la sécurité et le SEO
          const existingRel = link.getAttribute('rel') || '';
          const relAttributes = existingRel.split(' ').filter(Boolean);
          
          if (!relAttributes.includes('noopener')) {
            relAttributes.push('noopener');
          }
          if (!relAttributes.includes('nofollow')) {
            relAttributes.push('nofollow');
          }
          
          link.setAttribute('rel', relAttributes.join(' '));
        }
      });
    };

    // Optimiser immédiatement
    optimizeLinks();

    // Observer les changements DOM pour optimiser les nouveaux liens
    const observer = new MutationObserver(() => {
      optimizeLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname, baseUrl]);

  return null;
};

export default InternalLinksOptimizer;
