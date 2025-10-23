import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSampleProducts } from '../src/utils/sampleData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate real product translations using actual product data
const generateRealProductTranslations = () => {
  const products = getSampleProducts();
  const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
  const languages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi', 'ar'];

  console.log(`📦 Found ${products.length} real products to translate`);

  languages.forEach(lang => {
    const translations = {
      products: {}
    };

    products.forEach(product => {
      const productId = product._id;
      
      switch (lang) {
        case 'fr':
          translations.products[productId] = {
            name: translateProductName(product.name, 'fr'),
            description: translateProductDescription(product.description, 'fr'),
            brand: product.brand,
            tags: translateTags(product.tags, 'fr'),
            category: translateCategory(product.category, 'fr')
          };
          break;
          
        case 'es':
          translations.products[productId] = {
            name: translateProductName(product.name, 'es'),
            description: translateProductDescription(product.description, 'es'),
            brand: product.brand,
            tags: translateTags(product.tags, 'es'),
            category: translateCategory(product.category, 'es')
          };
          break;
          
        case 'de':
          translations.products[productId] = {
            name: translateProductName(product.name, 'de'),
            description: translateProductDescription(product.description, 'de'),
            brand: product.brand,
            tags: translateTags(product.tags, 'de'),
            category: translateCategory(product.category, 'de')
          };
          break;
          
        case 'it':
          translations.products[productId] = {
            name: translateProductName(product.name, 'it'),
            description: translateProductDescription(product.description, 'it'),
            brand: product.brand,
            tags: translateTags(product.tags, 'it'),
            category: translateCategory(product.category, 'it')
          };
          break;
          
        case 'pt':
          translations.products[productId] = {
            name: translateProductName(product.name, 'pt'),
            description: translateProductDescription(product.description, 'pt'),
            brand: product.brand,
            tags: translateTags(product.tags, 'pt'),
            category: translateCategory(product.category, 'pt')
          };
          break;
          
        case 'ru':
          translations.products[productId] = {
            name: translateProductName(product.name, 'ru'),
            description: translateProductDescription(product.description, 'ru'),
            brand: product.brand,
            tags: translateTags(product.tags, 'ru'),
            category: translateCategory(product.category, 'ru')
          };
          break;
          
        case 'ja':
          translations.products[productId] = {
            name: translateProductName(product.name, 'ja'),
            description: translateProductDescription(product.description, 'ja'),
            brand: product.brand,
            tags: translateTags(product.tags, 'ja'),
            category: translateCategory(product.category, 'ja')
          };
          break;
          
        case 'zh':
          translations.products[productId] = {
            name: translateProductName(product.name, 'zh'),
            description: translateProductDescription(product.description, 'zh'),
            brand: product.brand,
            tags: translateTags(product.tags, 'zh'),
            category: translateCategory(product.category, 'zh')
          };
          break;
          
        case 'hi':
          translations.products[productId] = {
            name: translateProductName(product.name, 'hi'),
            description: translateProductDescription(product.description, 'hi'),
            brand: product.brand,
            tags: translateTags(product.tags, 'hi'),
            category: translateCategory(product.category, 'hi')
          };
          break;
          
        case 'ar':
          translations.products[productId] = {
            name: translateProductName(product.name, 'ar'),
            description: translateProductDescription(product.description, 'ar'),
            brand: product.brand,
            tags: translateTags(product.tags, 'ar'),
            category: translateCategory(product.category, 'ar')
          };
          break;
          
        default: // English - keep original
          translations.products[productId] = {
            name: product.name,
            description: product.description,
            brand: product.brand,
            tags: product.tags,
            category: product.category
          };
      }
    });

    const filePath = path.join(localesDir, `products-${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
    console.log(`✅ Generated real product translations for ${lang}: ${Object.keys(translations.products).length} products`);
  });
};

// Translation functions for different languages
const translateProductName = (name, lang) => {
  const translations = {
    fr: {
      'DreamQuest Support Windows Computers Bluetooth5-3': 'Support Ordinateurs Windows DreamQuest Bluetooth5-3',
      'Huidun Laptops Computer Business Quad-Core': 'Ordinateur Portable Huidun Business Quad-Core',
      'Wireless Bluetooth Headphones': 'Casque Bluetooth Sans Fil',
      'Smart Watch Fitness Tracker': 'Montre Connectée Suivi Fitness',
      'Portable Power Bank': 'Batterie Externe Portable',
      'USB-C Charging Cable': 'Câble de Chargement USB-C',
      'Wireless Mouse': 'Souris Sans Fil',
      'Mechanical Keyboard': 'Clavier Mécanique',
      'Gaming Monitor': 'Moniteur Gaming',
      'Webcam HD': 'Webcam HD'
    },
    es: {
      'DreamQuest Support Windows Computers Bluetooth5-3': 'Soporte para Computadoras Windows DreamQuest Bluetooth5-3',
      'Huidun Laptops Computer Business Quad-Core': 'Laptop Huidun Business Quad-Core',
      'Wireless Bluetooth Headphones': 'Auriculares Bluetooth Inalámbricos',
      'Smart Watch Fitness Tracker': 'Reloj Inteligente Rastreador de Fitness',
      'Portable Power Bank': 'Banco de Energía Portátil',
      'USB-C Charging Cable': 'Cable de Carga USB-C',
      'Wireless Mouse': 'Ratón Inalámbrico',
      'Mechanical Keyboard': 'Teclado Mecánico',
      'Gaming Monitor': 'Monitor Gaming',
      'Webcam HD': 'Webcam HD'
    }
    // Add more languages as needed
  };
  
  return translations[lang]?.[name] || name;
};

const translateProductDescription = (description, lang) => {
  const translations = {
    fr: {
      'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.': 'Système de support informatique haute performance avec connectivité Bluetooth 5.3 pour ordinateurs Windows.',
      'Business laptop with quad-core processor for professional computing needs.': 'Ordinateur portable professionnel avec processeur quad-core pour les besoins informatiques professionnels.',
      'High-quality wireless headphones with noise cancellation and long battery life.': 'Casque sans fil de haute qualité avec réduction de bruit et longue autonomie.',
      'Advanced fitness tracking smartwatch with heart rate monitoring and GPS.': 'Montre connectée de suivi fitness avancée avec surveillance du rythme cardiaque et GPS.',
      'High-capacity portable power bank for charging multiple devices on the go.': 'Batterie externe portable haute capacité pour charger plusieurs appareils en déplacement.'
    },
    es: {
      'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.': 'Sistema de soporte informático de alto rendimiento con conectividad Bluetooth 5.3 para computadoras Windows.',
      'Business laptop with quad-core processor for professional computing needs.': 'Laptop empresarial con procesador de cuatro núcleos para necesidades informáticas profesionales.',
      'High-quality wireless headphones with noise cancellation and long battery life.': 'Auriculares inalámbricos de alta calidad con cancelación de ruido y larga duración de batería.',
      'Advanced fitness tracking smartwatch with heart rate monitoring and GPS.': 'Reloj inteligente de seguimiento fitness avanzado con monitoreo de frecuencia cardíaca y GPS.',
      'High-capacity portable power bank for charging multiple devices on the go.': 'Banco de energía portátil de alta capacidad para cargar múltiples dispositivos en movimiento.'
    }
    // Add more languages as needed
  };
  
  return translations[lang]?.[description] || description;
};

const translateTags = (tags, lang) => {
  const tagTranslations = {
    fr: {
      'electronics': 'électronique',
      'computer': 'ordinateur',
      'support': 'support',
      'bluetooth': 'bluetooth',
      'laptop': 'ordinateur portable',
      'business': 'business',
      'quad-core': 'quad-core',
      'wireless': 'sans fil',
      'headphones': 'casque',
      'smartwatch': 'montre connectée',
      'fitness': 'fitness',
      'power bank': 'batterie externe',
      'charging': 'chargement',
      'cable': 'câble',
      'mouse': 'souris',
      'keyboard': 'clavier',
      'gaming': 'gaming',
      'monitor': 'moniteur',
      'webcam': 'webcam'
    },
    es: {
      'electronics': 'electrónicos',
      'computer': 'computadora',
      'support': 'soporte',
      'bluetooth': 'bluetooth',
      'laptop': 'laptop',
      'business': 'empresarial',
      'quad-core': 'quad-core',
      'wireless': 'inalámbrico',
      'headphones': 'auriculares',
      'smartwatch': 'reloj inteligente',
      'fitness': 'fitness',
      'power bank': 'banco de energía',
      'charging': 'carga',
      'cable': 'cable',
      'mouse': 'ratón',
      'keyboard': 'teclado',
      'gaming': 'gaming',
      'monitor': 'monitor',
      'webcam': 'webcam'
    }
    // Add more languages as needed
  };
  
  return tags.map(tag => tagTranslations[lang]?.[tag] || tag);
};

const translateCategory = (category, lang) => {
  const categoryTranslations = {
    fr: {
      'electronics': 'électronique',
      'computers': 'ordinateurs',
      'accessories': 'accessoires',
      'gaming': 'gaming',
      'office': 'bureau'
    },
    es: {
      'electronics': 'electrónicos',
      'computers': 'computadoras',
      'accessories': 'accesorios',
      'gaming': 'gaming',
      'office': 'oficina'
    }
    // Add more languages as needed
  };
  
  return categoryTranslations[lang]?.[category] || category;
};

generateRealProductTranslations();

