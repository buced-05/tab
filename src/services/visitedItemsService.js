// Visited Items Service - Secure localStorage implementation
class VisitedItemsService {
  constructor() {
    this.storageKey = 'adsmarket_visited_items';
    this.maxItems = 50; // Limit to prevent storage bloat
  }

  // Add item to visited items
  addVisitedItem(productId, productName, affiliateUrl, productImage = null, clickType = 'general') {
    try {
      const visitedItems = this.getVisitedItems();
      
      // Remove existing item if it exists (to update position)
      const filteredItems = visitedItems.filter(item => item.productId !== productId);
      
      // Create new item
      const newItem = {
        productId,
        productName,
        affiliateUrl,
        productImage,
        clickType,
        timestamp: Date.now(),
        visitCount: 1
      };
      
      // Add to beginning of array
      const updatedItems = [newItem, ...filteredItems];
      
      // Limit to maxItems
      const limitedItems = updatedItems.slice(0, this.maxItems);
      
      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(limitedItems));
      
      return {
        success: true,
        message: 'Item added to visited items',
        item: newItem
      };
    } catch (error) {
      console.error('Error adding visited item:', error);
      return {
        success: false,
        message: 'Failed to add visited item'
      };
    }
  }

  // Get all visited items
  getVisitedItems() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return [];
      
      const items = JSON.parse(stored);
      return Array.isArray(items) ? items : [];
    } catch (error) {
      console.error('Error getting visited items:', error);
      return [];
    }
  }

  // Remove specific item
  removeVisitedItem(productId) {
    try {
      const visitedItems = this.getVisitedItems();
      const filteredItems = visitedItems.filter(item => item.productId !== productId);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredItems));
      
      return {
        success: true,
        message: 'Item removed from visited items'
      };
    } catch (error) {
      console.error('Error removing visited item:', error);
      return {
        success: false,
        message: 'Failed to remove visited item'
      };
    }
  }

  // Clear all visited items
  clearAllVisitedItems() {
    try {
      localStorage.removeItem(this.storageKey);
      return {
        success: true,
        message: 'All visited items cleared'
      };
    } catch (error) {
      console.error('Error clearing visited items:', error);
      return {
        success: false,
        message: 'Failed to clear visited items'
      };
    }
  }

  // Get visited items count
  getVisitedItemsCount() {
    return this.getVisitedItems().length;
  }

  // Check if item is visited
  isItemVisited(productId) {
    const visitedItems = this.getVisitedItems();
    return visitedItems.some(item => item.productId === productId);
  }

  // Clean old items (older than 30 days)
  cleanOldItems() {
    try {
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const visitedItems = this.getVisitedItems();
      const recentItems = visitedItems.filter(item => item.timestamp > thirtyDaysAgo);
      
      localStorage.setItem(this.storageKey, JSON.stringify(recentItems));
      
      return {
        success: true,
        message: `Cleaned ${visitedItems.length - recentItems.length} old items`
      };
    } catch (error) {
      console.error('Error cleaning old items:', error);
      return {
        success: false,
        message: 'Failed to clean old items'
      };
    }
  }
}

export default new VisitedItemsService();

