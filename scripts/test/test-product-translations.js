import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test product translations
const testProductTranslations = () => {
  console.log('🧪 Testing product translations...\n');
  
  const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
  const languages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi', 'ar'];
  
  let allTestsPassed = true;
  
  languages.forEach(lang => {
    const productFile = path.join(localesDir, `products-${lang}.json`);
    
    try {
      if (fs.existsSync(productFile)) {
        const productData = JSON.parse(fs.readFileSync(productFile, 'utf8'));
        const productCount = Object.keys(productData.products || {}).length;
        
        // Test first product
        const firstProduct = productData.products['product-1'];
        if (firstProduct) {
          console.log(`✅ ${lang}: ${productCount} products`);
          console.log(`   Sample: "${firstProduct.name}"`);
        } else {
          console.log(`❌ ${lang}: No product-1 found`);
          allTestsPassed = false;
        }
      } else {
        console.log(`❌ ${lang}: Missing products-${lang}.json`);
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${lang}: Error - ${error.message}`);
      allTestsPassed = false;
    }
  });
  
  console.log(`\n${allTestsPassed ? '🎉 All product translation tests passed!' : '⚠️  Some product translation tests failed!'}`);
  
  return allTestsPassed;
};

testProductTranslations();

