import { useTranslation } from 'react-i18next';

// Utility function to get translated product information
export const useProductTranslation = (productId) => {
  const { t } = useTranslation();
  
  const getTranslatedProduct = (product) => {
    if (!product) return null;
    
    const productKey = `products.${product._id}`;
    
    return {
      ...product,
      name: t(`${productKey}.name`, { defaultValue: product.name, ns: 'products' }),
      description: t(`${productKey}.description`, { defaultValue: product.description, ns: 'products' }),
      brand: t(`${productKey}.brand`, { defaultValue: product.brand, ns: 'products' }),
      tags: t(`${productKey}.tags`, { defaultValue: product.tags, returnObjects: true, ns: 'products' }),
      category: t(`${productKey}.category`, { defaultValue: product.category, ns: 'products' })
    };
  };
  
  return { getTranslatedProduct };
};

// Function to get translated product name
export const getTranslatedProductName = (product, t) => {
  if (!product) return '';
  const productKey = `products.${product._id}`;
  return t(`${productKey}.name`, { defaultValue: product.name, ns: 'products' });
};

// Function to get translated product description
export const getTranslatedProductDescription = (product, t) => {
  if (!product) return '';
  const productKey = `products.${product._id}`;
  return t(`${productKey}.description`, { defaultValue: product.description, ns: 'products' });
};

// Function to get translated product brand
export const getTranslatedProductBrand = (product, t) => {
  if (!product) return '';
  const productKey = `products.${product._id}`;
  return t(`${productKey}.brand`, { defaultValue: product.brand, ns: 'products' });
};

// Function to get translated product tags
export const getTranslatedProductTags = (product, t) => {
  if (!product) return [];
  const productKey = `products.${product._id}`;
  return t(`${productKey}.tags`, { defaultValue: product.tags, returnObjects: true, ns: 'products' });
};

// Function to get translated product category
export const getTranslatedProductCategory = (product, t) => {
  if (!product) return '';
  const productKey = `products.${product._id}`;
  return t(`${productKey}.category`, { defaultValue: product.category, ns: 'products' });
};

// Function to translate all product information
export const translateProduct = (product, t) => {
  if (!product) return null;
  
  const productKey = `products.${product._id}`;
  
  return {
    ...product,
    name: t(`${productKey}.name`, { defaultValue: product.name, ns: 'products' }),
    description: t(`${productKey}.description`, { defaultValue: product.description, ns: 'products' }),
    brand: t(`${productKey}.brand`, { defaultValue: product.brand, ns: 'products' }),
    tags: t(`${productKey}.tags`, { defaultValue: product.tags, returnObjects: true, ns: 'products' }),
    category: t(`${productKey}.category`, { defaultValue: product.category, ns: 'products' })
  };
};

// Function to translate an array of products
export const translateProducts = (products, t) => {
  if (!products || !Array.isArray(products)) return [];
  
  return products.map(product => translateProduct(product, t));
};

// Function to enhance product with translations based on language
export const enhanceProductWithTranslations = (product, language) => {
  if (!product) return null;
  
  // For now, we'll use the original product data
  // In a real implementation, you would load the appropriate translation file
  // based on the language parameter
  return product;
};