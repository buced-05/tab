import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant d'optimisation des images pour améliorer les performances
 * Implémente le lazy loading, les formats modernes et l'optimisation
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = true,
  onLoad,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (priority || !placeholder) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority, placeholder]);

  // Génération des sources optimisées
  const generateOptimizedSources = (originalSrc) => {
    if (!originalSrc) return [];

    const sources = [];
    
    // WebP pour les navigateurs modernes
    if (originalSrc.includes('amazon.com') || originalSrc.includes('media-amazon')) {
      // Pour les images Amazon, on garde l'original mais on optimise les paramètres
      const optimizedSrc = originalSrc.replace('_AC_SL1500_', '_AC_SX679_');
      sources.push({
        src: optimizedSrc,
        type: 'image/jpeg',
        media: '(max-width: 768px)'
      });
      sources.push({
        src: originalSrc,
        type: 'image/jpeg',
        media: '(min-width: 769px)'
      });
    } else {
      // Pour les autres images, on peut ajouter des formats WebP
      sources.push({
        src: originalSrc,
        type: 'image/jpeg'
      });
    }

    return sources;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // Placeholder pendant le chargement
  const renderPlaceholder = () => {
    if (!placeholder || isLoaded || hasError) return null;

    return (
      <div 
        className={`image-placeholder ${className}`}
        style={{
          width: width || '100%',
          height: height || '200px',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #ddd',
          borderTop: '3px solid #999',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  };

  // Image d'erreur
  const renderErrorImage = () => {
    if (!hasError) return null;

    return (
      <div 
        className={`image-error ${className}`}
        style={{
          width: width || '100%',
          height: height || '200px',
          backgroundColor: '#f8f8f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '2px dashed #ddd',
          color: '#999',
          fontSize: '14px'
        }}
      >
        Image non disponible
      </div>
    );
  };

  const optimizedSources = generateOptimizedSources(src);

  return (
    <>
      {/* Styles pour les animations */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .optimized-image {
            transition: opacity 0.3s ease-in-out;
          }
          .optimized-image.loaded {
            opacity: 1;
          }
          .optimized-image.loading {
            opacity: 0;
          }
        `}
      </style>

      {/* Placeholder */}
      {renderPlaceholder()}

      {/* Image d'erreur */}
      {renderErrorImage()}

      {/* Image optimisée */}
      {isInView && !hasError && (
        <picture>
          {optimizedSources.map((source, index) => (
            <source
              key={index}
              srcSet={source.src}
              type={source.type}
              media={source.media}
            />
          ))}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`optimized-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: width || '100%',
              height: height || 'auto',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            {...props}
          />
        </picture>
      )}
    </>
  );
};

/**
 * Hook pour précharger les images critiques
 */
export const useImagePreloader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    setIsLoading(true);
    const promises = imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]));
          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    Promise.allSettled(promises).finally(() => {
      setIsLoading(false);
    });
  }, [imageUrls]);

  return { loadedImages, isLoading };
};

/**
 * Composant pour optimiser toutes les images de la page
 */
export const ImageOptimizer = () => {
  useEffect(() => {
    // Optimiser toutes les images existantes
    const optimizeExistingImages = () => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      
      images.forEach(img => {
        // Marquer comme optimisé
        img.setAttribute('data-optimized', 'true');
        
        // Ajouter le lazy loading si pas déjà présent
        if (!img.loading) {
          img.loading = 'lazy';
        }
        
        // Ajouter le decoding async
        if (!img.decoding) {
          img.decoding = 'async';
        }
        
        // Optimiser les images Amazon
        if (img.src.includes('amazon.com')) {
          const optimizedSrc = img.src.replace('_AC_SL1500_', '_AC_SX679_');
          img.src = optimizedSrc;
        }
      });
    };

    // Optimiser immédiatement
    optimizeExistingImages();

    // Observer pour les nouvelles images ajoutées dynamiquement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName === 'IMG') {
              optimizeExistingImages();
            } else if (node.querySelectorAll) {
              const newImages = node.querySelectorAll('img:not([data-optimized])');
              if (newImages.length > 0) {
                optimizeExistingImages();
              }
            }
          }
        });
      });
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

export default OptimizedImage;
