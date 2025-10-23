// Debug utility for checking translations
export const debugTranslations = (t, product) => {
  if (!product || !product._id) {
    console.warn('Debug: No product provided');
    return;
  }

  const productKey = `products.${product._id}`;
  
  console.log('🔍 Translation Debug:', {
    productId: product._id,
    productKey,
    originalName: product.name,
    translatedName: t(`${productKey}.name`, { defaultValue: product.name, ns: 'products' }),
    originalDescription: product.description,
    translatedDescription: t(`${productKey}.description`, { defaultValue: product.description, ns: 'products' }),
    originalBrand: product.brand,
    translatedBrand: t(`${productKey}.brand`, { defaultValue: product.brand, ns: 'products' }),
    originalCategory: product.category,
    translatedCategory: t(`${productKey}.category`, { defaultValue: product.category, ns: 'products' }),
    originalTags: product.tags,
    translatedTags: t(`${productKey}.tags`, { defaultValue: product.tags, returnObjects: true, ns: 'products' })
  });
};

// Function to test if translations are working
export const testTranslations = (t) => {
  console.log('🧪 Testing translation system...');
  
  // Test general translations
  const testKeys = [
    'navigation.home',
    'navigation.products',
    'navigation.about',
    'navigation.contact'
  ];
  
  testKeys.forEach(key => {
    const translation = t(key);
    console.log(`${key}: "${translation}"`);
  });
  
  // Test product translations
  const testProduct = {
    _id: 'product-1',
    name: 'Test Product',
    description: 'Test Description',
    brand: 'Test Brand',
    category: 'Test Category',
    tags: ['test', 'product']
  };
  
  debugTranslations(t, testProduct);
};

