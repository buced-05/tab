import { useState, useEffect } from 'react';

/**
 * Hook pour détecter la géolocalisation de l'utilisateur et suggérer la langue/devise appropriée
 */
export const useGeoLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration des langues et devises par pays
  const countryConfig = {
    // Europe
    'FR': { 
      language: 'fr', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'France',
      timezone: 'Europe/Paris'
    },
    'DE': { 
      language: 'de', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'Germany',
      timezone: 'Europe/Berlin'
    },
    'ES': { 
      language: 'es', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'Spain',
      timezone: 'Europe/Madrid'
    },
    'IT': { 
      language: 'it', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'Italy',
      timezone: 'Europe/Rome'
    },
    'PT': { 
      language: 'pt', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'Portugal',
      timezone: 'Europe/Lisbon'
    },
    'NL': { 
      language: 'nl', 
      currency: 'EUR', 
      region: 'Europe', 
      country: 'Netherlands',
      timezone: 'Europe/Amsterdam'
    },
    'SE': { 
      language: 'sv', 
      currency: 'SEK', 
      region: 'Europe', 
      country: 'Sweden',
      timezone: 'Europe/Stockholm'
    },
    'NO': { 
      language: 'no', 
      currency: 'NOK', 
      region: 'Europe', 
      country: 'Norway',
      timezone: 'Europe/Oslo'
    },
    'RU': { 
      language: 'ru', 
      currency: 'RUB', 
      region: 'Europe', 
      country: 'Russia',
      timezone: 'Europe/Moscow'
    },
    'GB': { 
      language: 'en-GB', 
      currency: 'GBP', 
      region: 'Europe', 
      country: 'United Kingdom',
      timezone: 'Europe/London'
    },
    
    // Amérique du Nord
    'US': { 
      language: 'en', 
      currency: 'USD', 
      region: 'North America', 
      country: 'United States',
      timezone: 'America/New_York'
    },
    'CA': { 
      language: 'en', 
      currency: 'CAD', 
      region: 'North America', 
      country: 'Canada',
      timezone: 'America/Toronto'
    },
    
    // Amérique du Sud
    'BR': { 
      language: 'pt-BR', 
      currency: 'BRL', 
      region: 'South America', 
      country: 'Brazil',
      timezone: 'America/Sao_Paulo'
    },
    
    // Asie
    'JP': { 
      language: 'ja', 
      currency: 'JPY', 
      region: 'Asia', 
      country: 'Japan',
      timezone: 'Asia/Tokyo'
    },
    'CN': { 
      language: 'zh', 
      currency: 'CNY', 
      region: 'Asia', 
      country: 'China',
      timezone: 'Asia/Shanghai'
    },
    'IN': { 
      language: 'hi', 
      currency: 'INR', 
      region: 'Asia', 
      country: 'India',
      timezone: 'Asia/Kolkata'
    },
    
    // Moyen-Orient
    'SA': { 
      language: 'ar', 
      currency: 'SAR', 
      region: 'Middle East', 
      country: 'Saudi Arabia',
      timezone: 'Asia/Riyadh'
    },
    'AE': { 
      language: 'ar', 
      currency: 'AED', 
      region: 'Middle East', 
      country: 'UAE',
      timezone: 'Asia/Dubai'
    },
    
    // Afrique
    'KE': { 
      language: 'sw', 
      currency: 'KES', 
      region: 'Africa', 
      country: 'Kenya',
      timezone: 'Africa/Nairobi'
    },
    'ET': { 
      language: 'am', 
      currency: 'ETB', 
      region: 'Africa', 
      country: 'Ethiopia',
      timezone: 'Africa/Addis_Ababa'
    },
    'NG': { 
      language: 'en', 
      currency: 'NGN', 
      region: 'Africa', 
      country: 'Nigeria',
      timezone: 'Africa/Lagos'
    },
    'ZA': { 
      language: 'en', 
      currency: 'ZAR', 
      region: 'Africa', 
      country: 'South Africa',
      timezone: 'Africa/Johannesburg'
    },
    'EG': { 
      language: 'ar', 
      currency: 'EGP', 
      region: 'Africa', 
      country: 'Egypt',
      timezone: 'Africa/Cairo'
    },
    'MA': { 
      language: 'ar', 
      currency: 'MAD', 
      region: 'Africa', 
      country: 'Morocco',
      timezone: 'Africa/Casablanca'
    },
    'TN': { 
      language: 'ar', 
      currency: 'TND', 
      region: 'Africa', 
      country: 'Tunisia',
      timezone: 'Africa/Tunis'
    },
    'DZ': { 
      language: 'ar', 
      currency: 'DZD', 
      region: 'Africa', 
      country: 'Algeria',
      timezone: 'Africa/Algiers'
    }
  };

  // Détecter la géolocalisation
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Essayer d'abord l'API de géolocalisation IP
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          
          if (data.country_code) {
            const config = countryConfig[data.country_code];
            if (config) {
              setUserLocation({
                countryCode: data.country_code,
                country: data.country_name,
                region: data.region,
                city: data.city,
                timezone: data.timezone,
                currency: data.currency,
                language: data.languages?.split(',')[0]?.split('-')[0],
                suggestedLanguage: config.language,
                suggestedCurrency: config.currency,
                region: config.region,
                timezone: config.timezone,
                isDetected: true
              });
              return;
            }
          }
        } catch (ipError) {
          console.warn('IP geolocation failed:', ipError);
        }

        // Fallback sur la langue du navigateur
        const browserLang = navigator.language || navigator.languages?.[0] || 'en';
        const langCode = browserLang.split('-')[0];
        
        // Essayer de trouver un pays correspondant à la langue
        const matchingCountry = Object.entries(countryConfig).find(
          ([, config]) => config.language.startsWith(langCode)
        );

        if (matchingCountry) {
          const [countryCode, config] = matchingCountry;
          setUserLocation({
            countryCode,
            country: config.country,
            region: config.region,
            city: 'Unknown',
            timezone: config.timezone,
            currency: config.currency,
            language: langCode,
            suggestedLanguage: config.language,
            suggestedCurrency: config.currency,
            region: config.region,
            timezone: config.timezone,
            isDetected: false
          });
        } else {
          // Fallback par défaut
          setUserLocation({
            countryCode: 'FR',
            country: 'France',
            region: 'Europe',
            city: 'Unknown',
            timezone: 'Europe/Paris',
            currency: 'EUR',
            language: 'fr',
            suggestedLanguage: 'fr',
            suggestedCurrency: 'EUR',
            region: 'Europe',
            timezone: 'Europe/Paris',
            isDetected: false
          });
        }

      } catch (err) {
        console.error('Location detection failed:', err);
        setError(err.message);
        
        // Fallback d'urgence
        setUserLocation({
          countryCode: 'FR',
          country: 'France',
          region: 'Europe',
          city: 'Unknown',
          timezone: 'Europe/Paris',
          currency: 'EUR',
          language: 'fr',
          suggestedLanguage: 'fr',
          suggestedCurrency: 'EUR',
          region: 'Europe',
          timezone: 'Europe/Paris',
          isDetected: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Obtenir la configuration suggérée
  const getSuggestedConfig = () => {
    if (!userLocation) return null;
    
    return {
      language: userLocation.suggestedLanguage,
      currency: userLocation.suggestedCurrency,
      country: userLocation.country,
      region: userLocation.region,
      timezone: userLocation.timezone
    };
  };

  // Vérifier si une langue est supportée
  const isLanguageSupported = (langCode) => {
    const supportedLanguages = Object.values(countryConfig).map(config => config.language);
    return supportedLanguages.includes(langCode);
  };

  // Obtenir les langues suggérées pour la région
  const getRegionalLanguages = () => {
    if (!userLocation) return [];
    
    const region = userLocation.region;
    return Object.entries(countryConfig)
      .filter(([, config]) => config.region === region)
      .map(([countryCode, config]) => ({
        countryCode,
        language: config.language,
        country: config.country,
        currency: config.currency
      }));
  };

  return {
    userLocation,
    isLoading,
    error,
    getSuggestedConfig,
    isLanguageSupported,
    getRegionalLanguages,
    countryConfig
  };
};

export default useGeoLocation;
