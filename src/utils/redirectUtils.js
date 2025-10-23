// Simple redirect utilities without cookies or tracking
// import { affiliateAPI } from '../services/api-local'; // Removed unused service

// Check if URL is a valid affiliate URL
export const isValidAffiliateUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  
  // Check for Amazon affiliate links
  if (url.includes('amzn.to/') || 
      url.includes('amazon.com') || 
      url.includes('amazon.fr') ||
      url.includes('amazon.de') ||
      url.includes('amazon.co.uk') ||
      url.includes('amazon.ca') ||
      url.includes('amazon.es') ||
      url.includes('amazon.it')) {
    return true;
  }
  
  // Check for Hostinger affiliate links
  if (url.includes('hostinger.com') && url.includes('REFERRALCODE=')) {
    return true;
  }
  
  return false;
};

// Google security compliant redirect function (no popups)
export const safeRedirect = (url, openInNewTab = false) => {
  if (!url) {
    console.error('No URL provided for redirect');
    return;
  }

  try {
    // Validate URL
    if (!isValidAffiliateUrl(url)) {
      console.warn('URL is not a valid affiliate link:', url);
    }

    // Always use same-window navigation to avoid popup blockers
    // This is more secure and Google-compliant
    window.location.href = url;
  } catch (error) {
    console.error('Error during redirect:', error);
  }
};

// Handle affiliate click without tracking (Google security compliant)
export const handleAffiliateClick = async (productId, productName, affiliateUrl, clickType = 'general') => {
  try {
    // Simple redirect without tracking or popups
    safeRedirect(affiliateUrl, false);
    
    // Optional: Log to console for debugging
    console.log('Affiliate click:', {
      productId,
      productName,
      affiliateUrl,
      clickType,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error handling affiliate click:', error);
    // Still try to redirect even if tracking fails
    safeRedirect(affiliateUrl, false);
  }
};

// Simple redirect for any click (Google security compliant)
export const handleAnyClick = (url = 'https://amzn.to/4o4SIda') => {
  try {
    safeRedirect(url, false);
  } catch (error) {
    console.error('Error handling click:', error);
  }
};
