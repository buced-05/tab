// Test script to verify translation loading
export const testTranslationLoading = (t, i18n) => {
  console.log('🧪 Testing translation loading...');
  
  // Test general translations
  const generalKeys = [
    'navigation.home',
    'navigation.products',
    'navigation.about',
    'navigation.contact'
  ];
  
  console.log('📝 General translations:');
  generalKeys.forEach(key => {
    const translation = t(key);
    console.log(`  ${key}: "${translation}"`);
  });
  
  // Test product translations
  console.log('\n📦 Product translations:');
  const testProduct = {
    _id: 'product-1',
    name: 'DreamQuest Support Windows Computers Bluetooth5-3',
    description: 'High-performance computer support system with Bluetooth 5.3 connectivity for Windows computers.',
    brand: 'DreamQuest',
    category: 'electronics',
    tags: ['electronics', 'computer', 'support', 'bluetooth']
  };
  
  const productKey = `products.${testProduct._id}`;
  
  console.log(`  Product ID: ${testProduct._id}`);
  console.log(`  Language: ${i18n.language}`);
  console.log(`  Original name: "${testProduct.name}"`);
  console.log(`  Translated name: "${t(`${productKey}.name`, { defaultValue: testProduct.name, ns: 'products' })}"`);
  console.log(`  Translated description: "${t(`${productKey}.description`, { defaultValue: testProduct.description, ns: 'products' })}"`);
  console.log(`  Translated brand: "${t(`${productKey}.brand`, { defaultValue: testProduct.brand, ns: 'products' })}"`);
  console.log(`  Translated category: "${t(`${productKey}.category`, { defaultValue: testProduct.category, ns: 'products' })}"`);
  console.log(`  Translated tags: ${JSON.stringify(t(`${productKey}.tags`, { defaultValue: testProduct.tags, returnObjects: true, ns: 'products' }))}`);
  
  // Check if translations are working
  const translatedName = t(`${productKey}.name`, { defaultValue: testProduct.name, ns: 'products' });
  const isTranslated = testProduct.name !== translatedName;
  
  console.log(`\n✅ Translation working: ${isTranslated ? 'YES' : 'NO'}`);
  
  if (!isTranslated) {
    console.log('❌ Problem: Translations are not being applied');
    console.log('💡 Possible causes:');
    console.log('   - Translation files not loaded');
    console.log('   - Wrong namespace configuration');
    console.log('   - Cache issues');
  }
  
  return isTranslated;
};

