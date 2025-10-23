/**
 * Utility functions for number formatting based on locale
 */

/**
 * Format a number with locale-specific thousands separators
 * @param {number} number - The number to format
 * @param {string} locale - The locale code (e.g., 'en-US', 'fr-FR', 'es-ES')
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
    console.warn('Error formatting number:', error);
    // Fallback to basic formatting
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

/**
 * Format a number with locale-specific thousands separators and compact notation for large numbers
 * @param {number} number - The number to format
 * @param {string} locale - The locale code
 * @returns {string} - Formatted number string
 */
export const formatCompactNumber = (number, locale = 'en-US') => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(number);
  } catch (error) {
    console.warn('Error formatting compact number:', error);
    // Fallback to basic formatting
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
  }
};

/**
 * Get locale code from language code
 * @param {string} language - Language code (e.g., 'en', 'fr', 'es')
 * @returns {string} - Locale code
 */
export const getLocaleFromLanguage = (language) => {
  const localeMap = {
    'en': 'en-US',
    'fr': 'fr-FR', 
    'es': 'es-ES'
  };
  
  return localeMap[language] || 'en-US';
};

/**
 * Format review count with appropriate separators
 * @param {number} count - Review count
 * @param {string} language - Language code
 * @returns {string} - Formatted review count
 */
export const formatReviewCount = (count, language = 'en') => {
  const locale = getLocaleFromLanguage(language);
  return formatNumber(count, locale);
};

/**
 * Format price with locale-specific currency formatting
 * @param {number} price - Price value
 * @param {string} language - Language code
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} - Formatted price
 */
export const formatPrice = (price, language = 'en', currency = 'USD') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }
  
  const locale = getLocaleFromLanguage(language);
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(price);
  } catch (error) {
    console.warn('Error formatting price:', error);
    // Fallback to basic formatting
    return `$${price.toFixed(2)}`;
  }
};

export default {
  formatNumber,
  formatCompactNumber,
  getLocaleFromLanguage,
  formatReviewCount,
  formatPrice
};





