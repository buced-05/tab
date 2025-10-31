import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    const scrollToTop = () => {
      try {
        // Immediate scroll to top first
        window.scrollTo(0, 0);
        
        // Then smooth scroll for better UX
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }, 10);
      } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    };

    // Execute immediately
    scrollToTop();

    // Also execute after a short delay to ensure it works
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
