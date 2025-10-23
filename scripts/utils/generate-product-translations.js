import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate product translations for all languages
const generateProductTranslations = (language, productCount = 100) => {
  const translations = {
    products: {}
  };

  for (let i = 1; i <= productCount; i++) {
    const productId = `product-${i}`;
    
    switch (language) {
      case 'fr':
        translations.products[productId] = {
          name: `Ordinateur Portable Huidun Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Premier' : i === 2 ? 'Deuxième' : i === 3 ? 'Troisième' : `${i}ème`} modèle d'ordinateur portable professionnel avec processeur quad-core.`,
          brand: "Huidun",
          tags: ["électronique", "ordinateur portable", "business", "quad-core"],
          category: "électronique"
        };
        break;
        
      case 'es':
        translations.products[productId] = {
          name: `Laptop Huidun Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Primer' : i === 2 ? 'Segundo' : i === 3 ? 'Tercer' : `${i}º`} modelo de laptop empresarial con procesador quad-core.`,
          brand: "Huidun",
          tags: ["electrónicos", "laptop", "empresarial", "quad-core"],
          category: "electrónicos"
        };
        break;
        
      case 'de':
        translations.products[productId] = {
          name: `Huidun Laptop Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Erstes' : i === 2 ? 'Zweites' : i === 3 ? 'Drittes' : `${i}.`} Modell Business-Laptop mit Quad-Core-Prozessor.`,
          brand: "Huidun",
          tags: ["elektronik", "laptop", "business", "quad-core"],
          category: "elektronik"
        };
        break;
        
      case 'it':
        translations.products[productId] = {
          name: `Laptop Huidun Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Primo' : i === 2 ? 'Secondo' : i === 3 ? 'Terzo' : `${i}°`} modello di laptop business con processore quad-core.`,
          brand: "Huidun",
          tags: ["elettronica", "laptop", "business", "quad-core"],
          category: "elettronica"
        };
        break;
        
      case 'pt':
        translations.products[productId] = {
          name: `Laptop Huidun Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Primeiro' : i === 2 ? 'Segundo' : i === 3 ? 'Terceiro' : `${i}º`} modelo de laptop empresarial com processador quad-core.`,
          brand: "Huidun",
          tags: ["eletrônicos", "laptop", "empresarial", "quad-core"],
          category: "eletrônicos"
        };
        break;
        
      case 'ru':
        translations.products[productId] = {
          name: `Ноутбук Huidun Business Quad-Core ${i}`,
          description: `${i === 1 ? 'Первый' : i === 2 ? 'Второй' : i === 3 ? 'Третий' : `${i}-й`} модель бизнес-ноутбука с четырехъядерным процессором.`,
          brand: "Huidun",
          tags: ["электроника", "ноутбук", "бизнес", "quad-core"],
          category: "электроника"
        };
        break;
        
      case 'ja':
        translations.products[productId] = {
          name: `Huidun ラップトップ ビジネス Quad-Core ${i}`,
          description: `${i === 1 ? '第1' : i === 2 ? '第2' : i === 3 ? '第3' : `第${i}`}モデルのクアッドコアプロセッサー搭載ビジネスラップトップ。`,
          brand: "Huidun",
          tags: ["電子機器", "ラップトップ", "ビジネス", "quad-core"],
          category: "電子機器"
        };
        break;
        
      case 'zh':
        translations.products[productId] = {
          name: `Huidun 笔记本电脑商务四核 ${i}`,
          description: `第${i}款搭载四核处理器的商务笔记本电脑。`,
          brand: "Huidun",
          tags: ["电子产品", "笔记本电脑", "商务", "四核"],
          category: "电子产品"
        };
        break;
        
      case 'hi':
        translations.products[productId] = {
          name: `Huidun लैपटॉप बिजनेस क्वाड-कोर ${i}`,
          description: `क्वाड-कोर प्रोसेसर के साथ व्यावसायिक लैपटॉप का ${i === 1 ? 'पहला' : i === 2 ? 'दूसरा' : i === 3 ? 'तीसरा' : `${i}वां`} मॉडल।`,
          brand: "Huidun",
          tags: ["इलेक्ट्रॉनिक्स", "लैपटॉप", "बिजनेस", "क्वाड-कोर"],
          category: "इलेक्ट्रॉनिक्स"
        };
        break;
        
      case 'ar':
        translations.products[productId] = {
          name: `لابتوب Huidun Business Quad-Core ${i}`,
          description: `النموذج ${i === 1 ? 'الأول' : i === 2 ? 'الثاني' : i === 3 ? 'الثالث' : `${i}`} من لابتوب الأعمال مع معالج رباعي النواة.`,
          brand: "Huidun",
          tags: ["إلكترونيات", "لابتوب", "أعمال", "رباعي النواة"],
          category: "إلكترونيات"
        };
        break;
        
      default: // English
        translations.products[productId] = {
          name: `Huidun Laptops Computer Business Quad-Core ${i}`,
          description: `${i === 1 ? 'First' : i === 2 ? 'Second' : i === 3 ? 'Third' : `${i}th`} model business laptop with quad-core processor.`,
          brand: "Huidun",
          tags: ["electronics", "laptop", "business", "quad-core"],
          category: "electronics"
        };
    }
  }

  return translations;
};

// Generate all product translation files
const languages = ['fr', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi', 'ar'];

languages.forEach(lang => {
  const translations = generateProductTranslations(lang, 100);
  const filePath = path.join(__dirname, '..', 'src', 'i18n', 'locales', `products-${lang}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Generated product translations for ${lang}: ${filePath}`);
});

console.log('All product translation files generated successfully!');
