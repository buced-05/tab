import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const AdvancedLanguageSelector = ({ className = '' }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [userCountry, setUserCountry] = useState(null);

  // Configuration des langues par région
  const languageRegions = {
    // Europe
    'FR': { lang: 'fr', name: 'Français', flag: '🇫🇷', region: 'Europe' },
    'DE': { lang: 'de', name: 'Deutsch', flag: '🇩🇪', region: 'Europe' },
    'ES': { lang: 'es', name: 'Español', flag: '🇪🇸', region: 'Europe' },
    'IT': { lang: 'it', name: 'Italiano', flag: '🇮🇹', region: 'Europe' },
    'PT': { lang: 'pt', name: 'Português', flag: '🇵🇹', region: 'Europe' },
    'NL': { lang: 'nl', name: 'Nederlands', flag: '🇳🇱', region: 'Europe' },
    'SE': { lang: 'sv', name: 'Svenska', flag: '🇸🇪', region: 'Europe' },
    'NO': { lang: 'no', name: 'Norsk', flag: '🇳🇴', region: 'Europe' },
    'RU': { lang: 'ru', name: 'Русский', flag: '🇷🇺', region: 'Europe' },
    'GB': { lang: 'en-GB', name: 'English (UK)', flag: '🇬🇧', region: 'Europe' },
    
    // Amérique du Nord
    'US': { lang: 'en', name: 'English (US)', flag: '🇺🇸', region: 'North America' },
    'CA': { lang: 'en', name: 'English (Canada)', flag: '🇨🇦', region: 'North America' },
    
    // Amérique du Sud
    'BR': { lang: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷', region: 'South America' },
    
    // Asie
    'JP': { lang: 'ja', name: '日本語', flag: '🇯🇵', region: 'Asia' },
    'CN': { lang: 'zh', name: '中文', flag: '🇨🇳', region: 'Asia' },
    'IN': { lang: 'hi', name: 'हिन्दी', flag: '🇮🇳', region: 'Asia' },
    
    // Moyen-Orient
    'SA': { lang: 'ar', name: 'العربية', flag: '🇸🇦', region: 'Middle East' },
    'AE': { lang: 'ar', name: 'العربية', flag: '🇦🇪', region: 'Middle East' },
    
    // Afrique
    'KE': { lang: 'sw', name: 'Kiswahili', flag: '🇰🇪', region: 'Africa' },
    'ET': { lang: 'am', name: 'አማርኛ', flag: '🇪🇹', region: 'Africa' },
    'NG': { lang: 'en', name: 'English (Nigeria)', flag: '🇳🇬', region: 'Africa' },
    'ZA': { lang: 'en', name: 'English (South Africa)', flag: '🇿🇦', region: 'Africa' },
    'EG': { lang: 'ar', name: 'العربية', flag: '🇪🇬', region: 'Africa' },
    'MA': { lang: 'ar', name: 'العربية', flag: '🇲🇦', region: 'Africa' },
    'TN': { lang: 'ar', name: 'العربية', flag: '🇹🇳', region: 'Africa' },
    'DZ': { lang: 'ar', name: 'العربية', flag: '🇩🇿', region: 'Africa' }
  };

  // Langues supportées avec métadonnées
  const supportedLanguages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', region: 'Europe', priority: 1 },
    { code: 'en', name: 'English', flag: '🇺🇸', region: 'Global', priority: 2 },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧', region: 'Europe', priority: 3 },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', region: 'Europe', priority: 4 },
    { code: 'es', name: 'Español', flag: '🇪🇸', region: 'Europe', priority: 5 },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', region: 'Europe', priority: 6 },
    { code: 'pt', name: 'Português', flag: '🇵🇹', region: 'Europe', priority: 7 },
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷', region: 'South America', priority: 8 },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', region: 'Europe', priority: 9 },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪', region: 'Europe', priority: 10 },
    { code: 'no', name: 'Norsk', flag: '🇳🇴', region: 'Europe', priority: 11 },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', region: 'Europe', priority: 12 },
    { code: 'ja', name: '日本語', flag: '🇯🇵', region: 'Asia', priority: 13 },
    { code: 'zh', name: '中文', flag: '🇨🇳', region: 'Asia', priority: 14 },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', region: 'Asia', priority: 15 },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', region: 'Middle East', priority: 16 },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', region: 'Africa', priority: 17 },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹', region: 'Africa', priority: 18 }
  ];

  // Détection du pays de l'utilisateur
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        // Utiliser l'API de géolocalisation IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code);
      } catch (error) {
        console.warn('Could not detect user country:', error);
        // Fallback sur la langue du navigateur
        const browserLang = navigator.language.split('-')[0];
        const supportedLang = supportedLanguages.find(lang => 
          lang.code.startsWith(browserLang)
        );
        if (supportedLang) {
          setUserCountry(supportedLang.code);
        }
      }
    };

    detectUserCountry();
  }, []);

  // Suggestion de langue basée sur la géolocalisation
  const getSuggestedLanguage = () => {
    if (!userCountry) return null;
    
    const regionConfig = languageRegions[userCountry];
    if (regionConfig) {
      return supportedLanguages.find(lang => lang.code === regionConfig.lang);
    }
    
    return null;
  };

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];
  const suggestedLanguage = getSuggestedLanguage();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    
    // Sauvegarder la préférence
    localStorage.setItem('preferred-language', langCode);
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = langCode;
    
    // Mettre à jour les balises hreflang
    updateHreflangTags(langCode);
  };

  const updateHreflangTags = (currentLang) => {
    // Supprimer les anciennes balises hreflang
    const existingHreflang = document.querySelectorAll('link[hreflang]');
    existingHreflang.forEach(link => link.remove());
    
    // Ajouter les nouvelles balises hreflang
    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
    
    supportedLanguages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.code;
      link.href = `${baseUrl}/${lang.code}${currentPath}`;
      document.head.appendChild(link);
    });
    
    // Ajouter la balise x-default
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = `${baseUrl}${currentPath}`;
    document.head.appendChild(xDefaultLink);
  };

  // Grouper les langues par région
  const languagesByRegion = supportedLanguages.reduce((acc, lang) => {
    if (!acc[lang.region]) {
      acc[lang.region] = [];
    }
    acc[lang.region].push(lang);
    return acc;
  }, {});

  return (
    <div className={`relative language-selector ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-selector-button flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label={t('navigation.selectLanguage', 'Select Language')}
      >
        <Globe className="language-icon w-4 h-4" />
        <span className="language-flag text-sm">{currentLanguage.flag}</span>
        <span className="language-text text-sm font-medium">
          <span className="language-name">{currentLanguage.name}</span>
          <span className="language-code hidden">{currentLanguage.code}</span>
        </span>
        <ChevronDown className={`language-chevron w-4 h-4 transition-transform ${isOpen ? 'open rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {/* Langue suggérée */}
          {suggestedLanguage && suggestedLanguage.code !== i18n.language && (
            <div className="language-dropdown-header p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('common.suggestedForYou', 'Suggested for you')}
              </div>
              <button
                onClick={() => changeLanguage(suggestedLanguage.code)}
                className="language-option w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="language-flag text-lg">{suggestedLanguage.flag}</span>
                <div className="language-info flex-1 text-left">
                  <div className="language-name font-medium">{suggestedLanguage.name}</div>
                  <div className="language-code text-xs text-gray-500 dark:text-gray-400">
                    {t('common.basedOnLocation', 'Based on your location')}
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Langues par région */}
          {Object.entries(languagesByRegion).map(([region, languages]) => (
            <div key={region} className="p-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                {region}
              </div>
              <div className="language-list space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`language-option w-full flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      i18n.language === lang.code
                        ? 'active bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="language-flag text-lg">{lang.flag}</span>
                    <div className="language-info flex-1 text-left">
                      <div className="language-name font-medium">{lang.name}</div>
                    </div>
                    {i18n.language === lang.code && (
                      <Check className="check-icon w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Footer avec informations */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {t('common.languageSelectionHelp', 'Language selection helps us provide better content for your region')}
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div
          className="language-overlay fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AdvancedLanguageSelector;
