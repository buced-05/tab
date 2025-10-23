// Minimal affiliate service with visited items functionality
import visitedItemsService from './visitedItemsService';

class MinimalAffiliateService {
  constructor() {
    // Initialize visited items service
    this.visitedItems = visitedItemsService;
  }

  // Generate simple affiliate link
  generateAffiliateLink(productId, productName, originalUrl) {
    return {
      productId,
      productName,
      originalUrl,
      affiliateUrl: originalUrl, // Use original URL as-is
      timestamp: Date.now()
    };
  }

  // Capture click and add to visited items
  captureClick(productId, productName, affiliateUrl, clickType = 'general', clickSource = 'unknown', productImage = null) {
    console.log('Click captured:', { productId, productName, clickType });
    
    // Add to visited items
    const result = this.visitedItems.addVisitedItem(
      productId,
      productName,
      affiliateUrl,
      productImage,
      clickType
    );
    
    return {
      success: result.success,
      message: result.message || 'Click captured and added to visited items'
    };
  }

  // Get all visited items (affiliate links)
  getAllAffiliateLinks() {
    return this.visitedItems.getVisitedItems();
  }

  // Remove visited item
  removeAffiliateLink(productId) {
    return this.visitedItems.removeVisitedItem(productId);
  }

  // Clean old visited items
  cleanOldAffiliateLinks() {
    return this.visitedItems.cleanOldItems();
  }

  // Get affiliate stats
  getAffiliateStats() {
    const items = this.visitedItems.getVisitedItems();
    return {
      totalClicks: items.length,
      uniqueProducts: new Set(items.map(item => item.productId)).size,
      lastActivity: items.length > 0 ? Math.max(...items.map(item => item.timestamp)) : null
    };
  }
}

export default new MinimalAffiliateService();

