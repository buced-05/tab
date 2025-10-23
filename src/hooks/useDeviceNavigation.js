import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to handle device navigation patterns
 * Supports Android back button, iOS swipe gestures, and keyboard navigation
 */
export const useDeviceNavigation = () => {
  const navigate = useNavigate();

  // Handle browser back button and Android hardware back button
  const handleBackNavigation = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Handle escape key
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      // Close modals or go back
      const modals = document.querySelectorAll('.modal, .quick-view-modal, .dropdown-menu');
      const openModal = Array.from(modals).find(modal => 
        modal.classList.contains('show') || modal.style.display !== 'none'
      );
      
      if (openModal) {
        // Close the modal
        openModal.classList.remove('show');
        openModal.style.display = 'none';
      } else {
        handleBackNavigation();
      }
    }
  }, [handleBackNavigation]);

  // Handle hardware back button on Android
  useEffect(() => {
    const handlePopState = () => {
      handleBackNavigation();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handleBackNavigation]);

  // Handle keyboard navigation
  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  // Handle touch gestures for iOS
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let isSwipeGesture = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwipeGesture = false;
    };

    const handleTouchMove = (e) => {
      if (!startX || !startY) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = Math.abs(currentX - startX);
      const diffY = Math.abs(currentY - startY);

      // Check if it's a horizontal swipe
      if (diffX > diffY && diffX > 50) {
        isSwipeGesture = true;
        e.preventDefault(); // Prevent scrolling
      }
    };

    const handleTouchEnd = (e) => {
      if (!isSwipeGesture || !startX) return;

      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      // Right swipe to go back (iOS style)
      if (diffX > 100) {
        handleBackNavigation();
      }

      startX = 0;
      startY = 0;
      isSwipeGesture = false;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleBackNavigation]);

  return {
    goBack: handleBackNavigation
  };
};

/**
 * Hook to detect device capabilities
 */
export const useDeviceCapabilities = () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const hasHardwareBackButton = isAndroid;
  const supportsPWA = 'serviceWorker' in navigator && 'PushManager' in window;

  return {
    isTouchDevice,
    isMobile,
    isIOS,
    isAndroid,
    hasHardwareBackButton,
    supportsPWA
  };
};

/**
 * Hook to handle PWA installation
 */
export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed successfully');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return {
    isInstallable,
    installPWA
  };
};
