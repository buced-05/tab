// Currency and Number Formatting
export { default as currencyService } from './currency';
export { formatNumber, formatReviewCount, getLocaleFromLanguage } from './numberFormatter';

// Product Utilities
export { enhanceProductWithTranslations } from './productTranslations';
export { getAllProducts, getTrendingProducts, getFeaturedProducts } from './sampleData';

// Navigation and Redirects
export { safeRedirect } from './redirectUtils';

// Performance Monitoring
export { default as performanceMonitor } from './performanceMonitor';

// Share Utilities - Use these for all future links
export { shareLink, getLinkText, hideRawUrls, APP_SLOGAN } from './shareUtils';




