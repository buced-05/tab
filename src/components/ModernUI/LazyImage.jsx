// Modern Lazy Image Component with Performance Optimization
import React, { useState, useRef, useEffect, forwardRef } from 'react';
// import { useLazyImage } from '../../hooks/usePerformance'; // Removed unused hook

const LazyImage = forwardRef(({
  src,
  alt,
  placeholder,
  fallback,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  sizes,
  srcSet,
  width,
  height,
  objectFit = 'cover',
  objectPosition = 'center',
  blurDataURL,
  onLoad,
  onError,
  ...props
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  // Use the lazy image hook for performance tracking
  const { imageSrc, loading: hookLoading, error: hookError } = useLazyImage(src, {
    placeholder: placeholder || blurDataURL,
    fallback: fallback
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
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
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.(e);
  };

  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    setIsLoaded(false);
    onError?.(e);
  };

  // Determine which image to show
  const currentSrc = hasError ? fallback : isInView ? src : placeholder;

  // Loading state classes
  const loadingClasses = !isLoaded && !hasError ? 'opacity-0' : '';
  const loadedClasses = isLoaded ? 'opacity-100' : '';

  // Combine classes
  const imageClasses = [
    'transition-opacity duration-300',
    loadingClasses,
    loadedClasses,
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'relative overflow-hidden',
    containerClassName
  ].filter(Boolean).join(' ');

  // Skeleton loader
  const SkeletonLoader = () => (
    <div className="absolute inset-0 bg-gray-200 animate-pulse">
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
    </div>
  );

  return (
    <div ref={containerRef} className={containerClasses}>
      {/* Skeleton loader */}
      {(!isLoaded && !hasError) && <SkeletonLoader />}
      
      {/* Main image */}
      <img
        ref={ref || imgRef}
        src={currentSrc}
        alt={alt}
        className={imageClasses}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        width={width}
        height={height}
        style={{
          objectFit,
          objectPosition,
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto'
        }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error state */}
      {hasError && fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-xs">Image non disponible</p>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {hookLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

// Optimized Image Gallery Component
export const ImageGallery = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-100 rounded-lg ${className}`}>
        <p className="text-gray-500">Aucune image disponible</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main image */}
      <div className="relative">
        <LazyImage
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.alt || 'Image produit'}
          className="w-full h-96 object-cover rounded-lg cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          placeholder={images[currentIndex]?.placeholder}
        />
        
        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <LazyImage
              key={index}
              src={image.url}
              alt={image.alt || `Image ${index + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer transition-opacity ${
                index === currentIndex ? 'opacity-100 ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentIndex(index)}
              placeholder={image.placeholder}
            />
          ))}
        </div>
      )}

      {/* Full-screen modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <LazyImage
              src={images[currentIndex]?.url}
              alt={images[currentIndex]?.alt || 'Image produit'}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;


