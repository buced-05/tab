import React, { useEffect, useState } from 'react';

/**
 * Composant d'optimisation des Core Web Vitals
 * Surveille et optimise les métriques de performance essentielles
 */
const CoreWebVitalsOptimizer = () => {
  const [metrics, setMetrics] = useState({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Surveiller les Core Web Vitals
    const observeWebVitals = () => {
      // LCP (Largest Contentful Paint)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({
            ...prev,
            lcp: lastEntry.startTime
          }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // CLS (Cumulative Layout Shift)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({
            ...prev,
            cls: clsValue
          }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // FCP (First Contentful Paint)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          setMetrics(prev => ({
            ...prev,
            fcp: entries[0].startTime
          }));
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // TTFB (Time to First Byte)
        const ttfbObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const navigationEntry = entries.find(entry => entry.entryType === 'navigation');
          if (navigationEntry) {
            setMetrics(prev => ({
              ...prev,
              ttfb: navigationEntry.responseStart - navigationEntry.requestStart
            }));
          }
        });
        ttfbObserver.observe({ entryTypes: ['navigation'] });
      }

      // FID (First Input Delay) - Simulation
      const measureFID = () => {
        let firstInputTime = null;
        let firstInputDelay = null;

        const firstInputHandler = (event) => {
          if (firstInputTime === null) {
            firstInputTime = performance.now();
            firstInputDelay = firstInputTime - event.timeStamp;
            
            setMetrics(prev => ({
              ...prev,
              fid: firstInputDelay
            }));

            // Supprimer l'écouteur après la première interaction
            document.removeEventListener('click', firstInputHandler);
            document.removeEventListener('keydown', firstInputHandler);
            document.removeEventListener('mousedown', firstInputHandler);
            document.removeEventListener('pointerdown', firstInputHandler);
            document.removeEventListener('touchstart', firstInputHandler);
          }
        };

        document.addEventListener('click', firstInputHandler);
        document.addEventListener('keydown', firstInputHandler);
        document.addEventListener('mousedown', firstInputHandler);
        document.addEventListener('pointerdown', firstInputHandler);
        document.addEventListener('touchstart', firstInputHandler);
      };

      measureFID();
    };

    // Optimisations automatiques
    const applyOptimizations = () => {
      // Optimisation des images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });

      // Optimisation des polices
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-display: swap;
        }
      `;
      document.head.appendChild(style);

      // Préchargement des ressources critiques
      const criticalResources = [
        '/fonts/main-font.woff2',
        '/css/critical.css',
        '/js/main.js',
        '/og-image.jpg',
        '/logo.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 
                 resource.endsWith('.js') ? 'script' : 
                 resource.endsWith('.woff2') ? 'font' : 'image';
        document.head.appendChild(link);
      });

      // Optimisation des polices avec font-display: swap
      const fontStyle = document.createElement('style');
      fontStyle.textContent = `
        @font-face {
          font-family: 'Inter';
          font-display: swap;
          src: url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        }
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `;
      document.head.appendChild(fontStyle);

      // Optimisation des images critiques
      const criticalImages = document.querySelectorAll('img[data-priority="true"], img:first-of-type');
      criticalImages.forEach(img => {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      });

      setIsOptimized(true);
    };

    observeWebVitals();
    applyOptimizations();

    // Vérifier les métriques après 5 secondes
    const checkMetrics = setTimeout(() => {
      const { lcp, fid, cls, fcp, ttfb } = metrics;
      
      const isGood = 
        (lcp === null || lcp < 2500) && // LCP < 2.5s
        (fid === null || fid < 100) &&  // FID < 100ms
        (cls === null || cls < 0.1) &&  // CLS < 0.1
        (fcp === null || fcp < 1800) && // FCP < 1.8s
        (ttfb === null || ttfb < 600);  // TTFB < 600ms

      if (isGood) {
        console.log('✅ Core Web Vitals optimisés');
      } else {
        console.warn('⚠️ Core Web Vitals nécessitent des améliorations');
        console.log('Métriques actuelles:', { lcp, fid, cls, fcp, ttfb });
      }
    }, 5000);

    return () => {
      clearTimeout(checkMetrics);
    };
  }, [metrics]);

  // Optimisations supplémentaires
  useEffect(() => {
    // Optimisation du scroll
    let ticking = false;
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Optimisations de scroll ici
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizeScroll, { passive: true });

    // Optimisation des animations
    const optimizeAnimations = () => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
      });
    };

    optimizeAnimations();

    return () => {
      window.removeEventListener('scroll', optimizeScroll);
    };
  }, []);

  // Interface de monitoring (optionnel, pour le développement)
  if (process.env.NODE_ENV === 'development' && false) {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}>
        <div>Core Web Vitals Monitor</div>
        <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'measuring...'}</div>
        <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : 'measuring...'}</div>
        <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'measuring...'}</div>
        <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'measuring...'}</div>
        <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'measuring...'}</div>
        <div>Optimized: {isOptimized ? '✅' : '⏳'}</div>
      </div>
    );
  }

  return null;
};

export default CoreWebVitalsOptimizer;
