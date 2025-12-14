import React, { useEffect } from 'react';
import { optimizeCoreWebVitals } from '../utils/seoAdvanced2025';

/**
 * Composant d'optimisation SEO 2025
 * Optimise automatiquement les Core Web Vitals et les performances
 */
const SEOOptimizer2025 = () => {
  useEffect(() => {
    // Optimiser les Core Web Vitals
    optimizeCoreWebVitals();

    // Optimiser les images pour le LCP
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        // Les 3 premières images sont critiques (LCP)
        if (index < 3) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        } else {
          img.loading = 'lazy';
        }

        // Prévenir le CLS en ajoutant des dimensions si manquantes
        if (!img.width || !img.height) {
          img.style.aspectRatio = img.style.aspectRatio || '16/9';
        }
      });
    };

    // Optimiser les liens internes pour le SEO
    const optimizeInternalLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        if (!link.rel) {
          link.rel = 'internal';
        }
        // Ajouter title si manquant pour l'accessibilité
        if (!link.title && link.textContent) {
          link.title = link.textContent.trim();
        }
      });
    };

    // Optimiser les liens externes
    const optimizeExternalLinks = () => {
      const links = document.querySelectorAll('a[href^="http"]');
      links.forEach(link => {
        if (!link.rel) {
          link.rel = 'noopener noreferrer';
        }
        // Marquer les liens d'affiliation
        if (link.href.includes('amazon') || link.href.includes('affiliate')) {
          link.rel = `${link.rel} sponsored`.trim();
        }
      });
    };

    // Exécuter les optimisations
    optimizeImages();
    optimizeInternalLinks();
    optimizeExternalLinks();

    // Observer pour les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver(() => {
      optimizeImages();
      optimizeInternalLinks();
      optimizeExternalLinks();
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

export default SEOOptimizer2025;
