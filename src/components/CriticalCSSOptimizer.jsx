import React, { useEffect } from 'react';

/**
 * Composant d'optimisation CSS critique
 * Charge les styles critiques en priorité pour améliorer les Core Web Vitals
 */
const CriticalCSSOptimizer = () => {
  useEffect(() => {
    // CSS critique pour améliorer les Core Web Vitals
    const criticalCSS = `
      /* CSS critique pour améliorer LCP et CLS */
      * {
        box-sizing: border-box;
      }
      
      html {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.6;
        color: #333;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        background-color: #ffffff;
        overflow-x: hidden;
      }
      
      /* Optimisation des images pour éviter CLS */
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      /* Layout stable pour éviter les shifts */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
      
      /* Optimisation des polices */
      @font-face {
        font-family: 'Inter';
        font-display: swap;
        font-weight: 300 700;
        src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      }
      
      /* Styles critiques pour les composants principaux */
      .header {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e5e7eb;
      }
      
      .main-content {
        min-height: calc(100vh - 200px);
        padding: 20px 0;
      }
      
      .footer {
        background-color: #f8f9fa;
        padding: 40px 0;
        margin-top: 60px;
      }
      
      /* Optimisation des boutons */
      .btn {
        display: inline-block;
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: #3b82f6;
        color: white;
      }
      
      .btn:hover {
        background-color: #2563eb;
        transform: translateY(-1px);
      }
      
      /* Optimisation des cartes produits */
      .product-card {
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 20px;
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s ease;
      }
      
      .product-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      
      /* Optimisation des animations */
      @media (prefers-reduced-motion: no-preference) {
        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      }
      
      /* Optimisation mobile */
      @media (max-width: 768px) {
        .container {
          padding: 0 16px;
        }
        
        .btn {
          padding: 10px 20px;
          font-size: 14px;
        }
        
        .product-card {
          padding: 16px;
        }
      }
      
      /* Optimisation pour éviter les layout shifts */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      /* Optimisation des formulaires */
      .form-group {
        margin-bottom: 20px;
      }
      
      .form-control {
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s ease;
      }
      
      .form-control:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      /* Optimisation des modales */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      
      .modal-content {
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      }
      
      /* Optimisation des notifications */
      .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      /* Optimisation des performances */
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-opacity {
        will-change: opacity;
      }
      
      /* Optimisation de l'accessibilité */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      
      /* Focus visible pour l'accessibilité */
      .focus-visible:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
    `;

    // Injecter le CSS critique
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);

    // Optimiser les ressources critiques
    const optimizeCriticalResources = () => {
      // Précharger les polices Google Fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preconnect';
      fontLink.href = 'https://fonts.googleapis.com';
      document.head.appendChild(fontLink);

      const fontLink2 = document.createElement('link');
      fontLink2.rel = 'preconnect';
      fontLink2.href = 'https://fonts.gstatic.com';
      fontLink2.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink2);

      // Précharger les images critiques
      const criticalImages = [
        '/og-image.jpg',
        '/logo.png',
        '/favicon.svg'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    optimizeCriticalResources();

    // Optimiser les performances après le chargement
    const optimizeAfterLoad = () => {
      // Optimiser les images non critiques
      const images = document.querySelectorAll('img:not([data-priority="true"])');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });

      // Optimiser les animations
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
      });
    };

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeAfterLoad);
    } else {
      optimizeAfterLoad();
    }

    return () => {
      // Nettoyer le CSS critique si nécessaire
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSSOptimizer;
