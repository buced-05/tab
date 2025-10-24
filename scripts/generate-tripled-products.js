// Script to automatically generate tripled products for all original products
const fs = require('fs');
const path = require('path');

// Read the current sampleData.js file
const filePath = path.join(__dirname, '../src/utils/sampleData.js');
let content = fs.readFileSync(filePath, 'utf8');

// Extract the products array from the file
const productsMatch = content.match(/const products = \[([\s\S]*?)\];/);
if (!productsMatch) {
  console.error('Could not find products array in file');
  process.exit(1);
}

// Parse the products array (this is a simplified approach)
// We'll add the tripled products programmatically
const originalProducts = [];
let currentProduct = null;
let braceCount = 0;
let inProduct = false;

const lines = content.split('\n');
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  
  if (line.includes('_id:') && line.includes('product-') && !line.includes('copy')) {
    // Found a new original product
    if (currentProduct) {
      originalProducts.push(currentProduct);
    }
    currentProduct = {
      startLine: i,
      lines: [line]
    };
    inProduct = true;
    braceCount = 0;
  } else if (inProduct) {
    currentProduct.lines.push(line);
    
    // Count braces to know when product ends
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    
    if (braceCount === 0 && line.includes('}')) {
      // Product ended
      originalProducts.push(currentProduct);
      currentProduct = null;
      inProduct = false;
    }
  }
  
  i++;
}

console.log(`Found ${originalProducts.length} original products to triple`);

// Generate tripled products for each original product
let tripledProducts = [];

originalProducts.forEach((product, index) => {
  const productLines = product.lines.join('\n');
  
  // Extract product ID
  const idMatch = productLines.match(/_id: '([^']+)'/);
  if (!idMatch) return;
  
  const originalId = idMatch[1];
  const productNumber = originalId.match(/product-(\d+)/);
  const num = productNumber ? productNumber[1] : index + 1;
  
  // Create copy 1
  const copy1 = productLines
    .replace(originalId, `${originalId}-copy1`)
    .replace(/isPrimary: true/g, 'isPrimary: false')
    .replace(/isFeatured: true/g, 'isFeatured: false')
    .replace(/isTrending: true/g, 'isTrending: true');
  
  // Create copy 2  
  const copy2 = productLines
    .replace(originalId, `${originalId}-copy2`)
    .replace(/isPrimary: true/g, 'isPrimary: false')
    .replace(/isFeatured: true/g, 'isFeatured: true')
    .replace(/isTrending: true/g, 'isTrending: false');
  
  tripledProducts.push({
    originalId,
    copy1: copy1,
    copy2: copy2
  });
});

console.log(`Generated ${tripledProducts.length * 2} tripled products`);

// Insert tripled products into the file
let newContent = content.replace(
  /(\s+affiliateUrl: '[^']+'\)\s+}\s+];/,
  (match) => {
    let tripledContent = '\n';
    
    tripledProducts.forEach(({ originalId, copy1, copy2 }) => {
      tripledContent += `\n    // ${originalId} Copy 1\n`;
      tripledContent += copy1 + '\n\n';
      tripledContent += `    // ${originalId} Copy 2\n`;
      tripledContent += copy2 + '\n';
    });
    
    return match.replace('}', tripledContent + '  }') + '];';
  }
);

// Write the updated content back to file
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('Successfully generated all tripled products!');
console.log(`Total products now: ${originalProducts.length + tripledProducts.length * 2}`);
