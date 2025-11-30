import { useEffect } from 'react';
import { generateAltText } from '../utils/seoEnhancer';

/**
 * Composant pour optimiser automatiquement les images pour le SEO
 * Ajoute des alt text manquants et optimise les attributs d'images
 */
const ImageSEOOptimizer = () => {
  useEffect(() => {
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([data-seo-optimized])');
      
      images.forEach(img => {
        // Marquer comme optimisé pour éviter les doublons
        img.setAttribute('data-seo-optimized', 'true');
        
        // Générer un alt text si manquant
        if (!img.alt || img.alt.trim() === '') {
          const context = img.getAttribute('title') || 
                         img.getAttribute('data-title') ||
                         img.closest('article')?.querySelector('h1, h2, h3')?.textContent ||
                         img.closest('.product-card')?.querySelector('.product-name')?.textContent ||
                         '';
          
          const productName = img.closest('[data-product-name]')?.getAttribute('data-product-name') || '';
          
          const altText = generateAltText(img.src, context, productName);
          img.alt = altText;
          
          // Ajouter aussi un title si manquant (améliore l'accessibilité)
          if (!img.title) {
            img.title = altText;
          }
        }
        
        // Optimiser le loading lazy si pas déjà défini
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Optimiser le decoding async
        if (!img.decoding) {
          img.decoding = 'async';
        }
        
        // Ajouter width et height si disponibles (améliore le CLS)
        if (!img.width && img.naturalWidth) {
          img.width = img.naturalWidth;
        }
        if (!img.height && img.naturalHeight) {
          img.height = img.naturalHeight;
        }
      });
    };

    // Optimiser immédiatement
    optimizeImages();

    // Observer les changements DOM pour optimiser les nouvelles images
    const observer = new MutationObserver(() => {
      optimizeImages();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default ImageSEOOptimizer;

