// Google Security Compliant Affiliate Service
// No localStorage, sessionStorage, cookies, or tracking

class SecureAffiliateService {
  constructor() {
    // No storage or tracking - Google security compliant
  }

  // Generate affiliate link without tracking
  generateAffiliateLink(productId, productName, originalUrl) {
    const timestamp = Date.now();
    const affiliateId = `aff_${productId}_${timestamp}`;
    
    // Create a simple affiliate link without tracking parameters
    const affiliateUrl = originalUrl;
    
    return {
      productId,
      productName,
      originalUrl,
      affiliateUrl,
      affiliateId,
      timestamp
    };
  }

  // Capture click without storage (Google security compliant)
  captureClick(productId, productName, affiliateUrl, clickType = 'general', clickSource = 'unknown', productImage = null) {
    try {
      console.log('🖱️ Click captured (no storage):', {
        productId,
        productName,
        affiliateUrl,
        clickType,
        clickSource,
        timestamp: new Date().toISOString()
      });

      // Return success without storing anything
      return {
        success: true,
        message: 'Click captured (no storage)',
        affiliateInfo: {
          productId,
          productName,
          affiliateUrl,
          clickType,
          clickSource
        }
      };
    } catch (error) {
      console.error('Error capturing click:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get all affiliate links (returns empty array - no storage)
  getAllAffiliateLinks() {
    // Google security compliant: No storage, return empty array
    return [];
  }

  // Remove affiliate link (no-op - no storage)
  removeAffiliateLink(productId) {
    console.log('Remove affiliate link (no storage):', productId);
    return true;
  }

  // Clean old affiliate links (no-op - no storage)
  cleanOldAffiliateLinks() {
    console.log('Clean old affiliate links (no storage)');
    return true;
  }
}

// Export singleton instance
export default new SecureAffiliateService();




