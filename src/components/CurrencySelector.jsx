import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, ChevronDown, Check } from 'lucide-react';

const CurrencySelector = ({ className = '', onCurrencyChange }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [userCountry, setUserCountry] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  // Configuration des devises par région
  const currencyRegions = {
    // Europe
    'FR': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'DE': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'ES': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'IT': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'PT': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'NL': { currency: 'EUR', symbol: '€', name: 'Euro', region: 'Europe' },
    'SE': { currency: 'SEK', symbol: 'kr', name: 'Swedish Krona', region: 'Europe' },
    'NO': { currency: 'NOK', symbol: 'kr', name: 'Norwegian Krone', region: 'Europe' },
    'RU': { currency: 'RUB', symbol: '₽', name: 'Russian Ruble', region: 'Europe' },
    'GB': { currency: 'GBP', symbol: '£', name: 'British Pound', region: 'Europe' },
    
    // Amérique du Nord
    'US': { currency: 'USD', symbol: '$', name: 'US Dollar', region: 'North America' },
    'CA': { currency: 'CAD', symbol: 'C$', name: 'Canadian Dollar', region: 'North America' },
    
    // Amérique du Sud
    'BR': { currency: 'BRL', symbol: 'R$', name: 'Brazilian Real', region: 'South America' },
    
    // Asie
    'JP': { currency: 'JPY', symbol: '¥', name: 'Japanese Yen', region: 'Asia' },
    'CN': { currency: 'CNY', symbol: '¥', name: 'Chinese Yuan', region: 'Asia' },
    'IN': { currency: 'INR', symbol: '₹', name: 'Indian Rupee', region: 'Asia' },
    
    // Moyen-Orient
    'SA': { currency: 'SAR', symbol: '﷼', name: 'Saudi Riyal', region: 'Middle East' },
    'AE': { currency: 'AED', symbol: 'د.إ', name: 'UAE Dirham', region: 'Middle East' },
    
    // Afrique
    'KE': { currency: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', region: 'Africa' },
    'ET': { currency: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', region: 'Africa' },
    'NG': { currency: 'NGN', symbol: '₦', name: 'Nigerian Naira', region: 'Africa' },
    'ZA': { currency: 'ZAR', symbol: 'R', name: 'South African Rand', region: 'Africa' },
    'EG': { currency: 'EGP', symbol: '£', name: 'Egyptian Pound', region: 'Africa' },
    'MA': { currency: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', region: 'Africa' },
    'TN': { currency: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', region: 'Africa' },
    'DZ': { currency: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', region: 'Africa' }
  };

  // Devises supportées
  const supportedCurrencies = [
    { code: 'EUR', symbol: '€', name: 'Euro', region: 'Europe', priority: 1 },
    { code: 'USD', symbol: '$', name: 'US Dollar', region: 'Global', priority: 2 },
    { code: 'GBP', symbol: '£', name: 'British Pound', region: 'Europe', priority: 3 },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', region: 'North America', priority: 4 },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', region: 'Oceania', priority: 5 },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', region: 'Europe', priority: 6 },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', region: 'Europe', priority: 7 },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', region: 'Europe', priority: 8 },
    { code: 'DKK', symbol: 'kr', name: 'Danish Krone', region: 'Europe', priority: 9 },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble', region: 'Europe', priority: 10 },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', region: 'Asia', priority: 11 },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', region: 'Asia', priority: 12 },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', region: 'Asia', priority: 13 },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', region: 'South America', priority: 14 },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso', region: 'North America', priority: 15 },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', region: 'Middle East', priority: 16 },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', region: 'Middle East', priority: 17 },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', region: 'Africa', priority: 18 },
    { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr', region: 'Africa', priority: 19 },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', region: 'Africa', priority: 20 },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand', region: 'Africa', priority: 21 },
    { code: 'EGP', symbol: '£', name: 'Egyptian Pound', region: 'Africa', priority: 22 },
    { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', region: 'Africa', priority: 23 },
    { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', region: 'Africa', priority: 24 },
    { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar', region: 'Africa', priority: 25 }
  ];

  // Détection du pays de l'utilisateur
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code);
        
        // Définir la devise suggérée
        const regionConfig = currencyRegions[data.country_code];
        if (regionConfig) {
          setSelectedCurrency(regionConfig.currency);
          if (onCurrencyChange) {
            onCurrencyChange(regionConfig.currency);
          }
        }
      } catch (error) {
        console.warn('Could not detect user country:', error);
        // Fallback sur EUR
        setSelectedCurrency('EUR');
        if (onCurrencyChange) {
          onCurrencyChange('EUR');
        }
      }
    };

    detectUserCountry();
  }, [onCurrencyChange]);

  // Charger la devise sauvegardée
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) {
      setSelectedCurrency(savedCurrency);
      if (onCurrencyChange) {
        onCurrencyChange(savedCurrency);
      }
    }
  }, [onCurrencyChange]);

  const changeCurrency = (currencyCode) => {
    setSelectedCurrency(currencyCode);
    setIsOpen(false);
    
    // Sauvegarder la préférence
    localStorage.setItem('preferred-currency', currencyCode);
    
    // Notifier le parent
    if (onCurrencyChange) {
      onCurrencyChange(currencyCode);
    }
  };

  const currentCurrency = supportedCurrencies.find(curr => curr.code === selectedCurrency) || supportedCurrencies[0];
  const suggestedCurrency = userCountry ? currencyRegions[userCountry] : null;

  // Grouper les devises par région
  const currenciesByRegion = supportedCurrencies.reduce((acc, currency) => {
    if (!acc[currency.region]) {
      acc[currency.region] = [];
    }
    acc[currency.region].push(currency);
    return acc;
  }, {});

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('navigation.selectCurrency', 'Select Currency')}
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentCurrency.symbol} {currentCurrency.code}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {/* Devise suggérée */}
          {suggestedCurrency && suggestedCurrency.currency !== selectedCurrency && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('common.suggestedForYou', 'Suggested for you')}
              </div>
              <button
                onClick={() => changeCurrency(suggestedCurrency.currency)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-lg">{suggestedCurrency.symbol}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{suggestedCurrency.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t('common.basedOnLocation', 'Based on your location')}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Devises par région */}
          {Object.entries(currenciesByRegion).map(([region, currencies]) => (
            <div key={region} className="p-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                {region}
              </div>
              <div className="space-y-1">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => changeCurrency(currency.code)}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      selectedCurrency === currency.code
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg font-mono">{currency.symbol}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{currency.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {currency.code}
                      </div>
                    </div>
                    {selectedCurrency === currency.code && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Footer avec informations */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {t('common.currencySelectionHelp', 'Currency selection helps us show prices in your local currency')}
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CurrencySelector;