import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import complete translation files
import en from './locales/en-complete.json';
import zh from './locales/zh-complete.json';
import hi from './locales/hi-complete.json';
import es from './locales/es-complete.json';
import fr from './locales/fr-complete.json';
import ar from './locales/ar-complete.json';
import pt from './locales/pt-complete.json';
import ru from './locales/ru-complete.json';
import ja from './locales/ja-complete.json';
import de from './locales/de-complete.json';
import it from './locales/it-complete.json';

// Import product translations
import productsEn from './locales/products-en.json';
import productsFr from './locales/products-fr.json';
import productsEs from './locales/products-es.json';
import productsDe from './locales/products-de.json';
import productsIt from './locales/products-it.json';
import productsPt from './locales/products-pt.json';
import productsRu from './locales/products-ru.json';
import productsJa from './locales/products-ja.json';
import productsZh from './locales/products-zh.json';
import productsHi from './locales/products-hi.json';
import productsAr from './locales/products-ar.json';

const resources = {
  en: { 
    translation: en,
    products: productsEn
  },
  zh: { 
    translation: zh,
    products: productsZh
  },
  hi: { 
    translation: hi,
    products: productsHi
  },
  es: { 
    translation: es,
    products: productsEs
  },
  fr: { 
    translation: fr,
    products: productsFr
  },
  ar: { 
    translation: ar,
    products: productsAr
  },
  pt: { 
    translation: pt,
    products: productsPt
  },
  ru: { 
    translation: ru,
    products: productsRu
  },
  ja: { 
    translation: ja,
    products: productsJa
  },
  de: { 
    translation: de,
    products: productsDe
  },
  it: { 
    translation: it,
    products: productsIt
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Set French as default language
    fallbackLng: 'fr', // Fallback to French
    debug: false,
    
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      checkWhitelist: true
    },

    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    },

    // Ensure all languages are properly loaded
    supportedLngs: ['en', 'zh', 'hi', 'es', 'fr', 'ar', 'pt', 'ru', 'ja', 'de', 'it'],
    nonExplicitSupportedLngs: true
  });

export default i18n;
