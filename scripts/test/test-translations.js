import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test all translation files
const testTranslations = () => {
  const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
  const languages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'ja', 'zh', 'hi', 'ar'];
  
  console.log('🧪 Testing translation files...\n');
  
  let allTestsPassed = true;
  
  // Test general translations
  languages.forEach(lang => {
    const generalFile = path.join(localesDir, `${lang}-complete.json`);
    const productFile = path.join(localesDir, `products-${lang}.json`);
    
    try {
      // Test general translations
      if (fs.existsSync(generalFile)) {
        const generalData = JSON.parse(fs.readFileSync(generalFile, 'utf8'));
        console.log(`✅ ${lang}-complete.json: ${Object.keys(generalData).length} keys`);
      } else {
        console.log(`❌ ${lang}-complete.json: Missing`);
        allTestsPassed = false;
      }
      
      // Test product translations
      if (fs.existsSync(productFile)) {
        const productData = JSON.parse(fs.readFileSync(productFile, 'utf8'));
        const productCount = Object.keys(productData.products || {}).length;
        console.log(`✅ products-${lang}.json: ${productCount} products`);
      } else {
        console.log(`❌ products-${lang}.json: Missing`);
        allTestsPassed = false;
      }
      
    } catch (error) {
      console.log(`❌ ${lang}: Error parsing JSON - ${error.message}`);
      allTestsPassed = false;
    }
  });
  
  console.log(`\n${allTestsPassed ? '🎉 All translation tests passed!' : '⚠️  Some translation tests failed!'}`);
  
  return allTestsPassed;
};

testTranslations();

