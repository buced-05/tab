/**
 * Discovery Statistics Service
 * Manages statistics about discovered pages and videos
 */

const STORAGE_KEY = 'discoveryStats';
const DEFAULT_STATS = {
  pagesDiscovered: 0,
  videosDiscovered: 0,
  lastUpdateDate: null,
  history: []
};

/**
 * Get current discovery statistics
 * @returns {Object} Current stats object
 */
export const getDiscoveryStats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { ...DEFAULT_STATS };
  } catch (error) {
    console.error('Error reading discovery stats:', error);
    return { ...DEFAULT_STATS };
  }
};

/**
 * Update discovery statistics
 * @param {Object} updates - Object with pagesDiscovered and/or videosDiscovered
 * @returns {Object} Updated stats
 */
export const updateDiscoveryStats = (updates) => {
  try {
    const currentStats = getDiscoveryStats();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    const updatedStats = {
      ...currentStats,
      pagesDiscovered: updates.pagesDiscovered !== undefined
        ? updates.pagesDiscovered
        : currentStats.pagesDiscovered,
      videosDiscovered: updates.videosDiscovered !== undefined
        ? updates.videosDiscovered
        : currentStats.videosDiscovered,
      lastUpdateDate: today
    };

    // Add to history if values changed
    if (updates.pagesDiscovered !== undefined || updates.videosDiscovered !== undefined) {
      updatedStats.history = [
        ...(currentStats.history || []),
        {
          date: today,
          pagesDiscovered: updatedStats.pagesDiscovered,
          videosDiscovered: updatedStats.videosDiscovered,
          timestamp: new Date().toISOString()
        }
      ].slice(-30); // Keep last 30 entries
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
    return updatedStats;
  } catch (error) {
    console.error('Error updating discovery stats:', error);
    return getDiscoveryStats();
  }
};

/**
 * Set discovery statistics for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {number} pagesDiscovered - Number of pages discovered
 * @param {number} videosDiscovered - Number of videos discovered
 * @returns {Object} Updated stats
 */
export const setDiscoveryStatsForDate = (date, pagesDiscovered, videosDiscovered) => {
  return updateDiscoveryStats({
    pagesDiscovered,
    videosDiscovered
  });
};

/**
 * Initialize with default values for 12/12/2025
 */
export const initializeDiscoveryStats = () => {
  const stats = getDiscoveryStats();

  // If no stats exist or last update is old, initialize with provided data
  // Date format: 12/12/2025 (DD/MM/YYYY) -> convert to ISO format (YYYY-MM-DD)
  if (!stats.lastUpdateDate || (stats.pagesDiscovered === 0 && stats.videosDiscovered === 0)) {
    // Set for 12/12/2025 (December 12, 2025)
    return setDiscoveryStatsForDate('2025-12-12', 12, 0);
  }

  return stats;
};

/**
 * Reset discovery statistics
 */
export const resetDiscoveryStats = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { ...DEFAULT_STATS };
  } catch (error) {
    console.error('Error resetting discovery stats:', error);
    return { ...DEFAULT_STATS };
  }
};

export default {
  getDiscoveryStats,
  updateDiscoveryStats,
  setDiscoveryStatsForDate,
  initializeDiscoveryStats,
  resetDiscoveryStats
};
