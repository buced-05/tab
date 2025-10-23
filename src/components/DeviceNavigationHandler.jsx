import React, { useEffect } from 'react';
import { useDeviceNavigation, useDeviceCapabilities } from '../hooks/useDeviceNavigation';

/**
 * Component to handle device-specific navigation patterns
 * Should be placed at the root level of the app
 */
const DeviceNavigationHandler = ({ children }) => {
  const { goBack } = useDeviceNavigation();
  const { isTouchDevice, isMobile, isIOS, isAndroid } = useDeviceCapabilities();

  useEffect(() => {
    // Add device-specific classes to body
    const body = document.body;
    
    if (isTouchDevice) body.classList.add('touch-device');
    if (isMobile) body.classList.add('mobile-device');
    if (isIOS) body.classList.add('ios-device');
    if (isAndroid) body.classList.add('android-device');

    // Add safe area classes for notched devices
    body.classList.add('safe-area-inset');

    // Cleanup
    return () => {
      body.classList.remove('touch-device', 'mobile-device', 'ios-device', 'android-device', 'safe-area-inset');
    };
  }, [isTouchDevice, isMobile, isIOS, isAndroid]);

  useEffect(() => {
    // Ensure loader is hidden when component mounts
    document.body.classList.add('app-loaded');
  }, []);

  return <>{children}</>;
};

export default DeviceNavigationHandler;
