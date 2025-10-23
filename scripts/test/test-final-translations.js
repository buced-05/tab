import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test final translations
const testFinalTranslations = () => {
  console.log('🎯 Testing final product translations...\n');
  
  const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
  const languages = ['fr', 'en', 'es'];
  
  languages.forEach(lang => {
    const productFile = path.join(localesDir, `products-${lang}.json`);
    
    try {
      if (fs.existsSync(productFile)) {
        const productData = JSON.parse(fs.readFileSync(productFile, 'utf8'));
        const products = Object.values(productData.products || {});
        
        console.log(`✅ ${lang.toUpperCase()}: ${products.length} products`);
        
        // Show first 3 products with their names
        products.slice(0, 3).forEach((product, index) => {
          console.log(`   ${index + 1}. "${product.name}"`);
        });
        
        // Check for unique names (not all the same)
        const names = products.map(p => p.name);
        const uniqueNames = [...new Set(names)];
        
        if (uniqueNames.length > 1) {
          console.log(`   ✅ Unique names: ${uniqueNames.length} different names`);
        } else {
          console.log(`   ❌ All products have the same name: "${names[0]}"`);
        }
        
      } else {
        console.log(`❌ ${lang}: Missing products-${lang}.json`);
      }
    } catch (error) {
      console.log(`❌ ${lang}: Error - ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  });
  
  console.log('🎉 Final translation test completed!');
  console.log('📱 You can now test the application at: http://localhost:3001/');
  console.log('🌍 Try changing languages to see the product name translations!');
};

testFinalTranslations();

