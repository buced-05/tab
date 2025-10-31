import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the products data
import { getSampleProducts } from '../src/utils/sampleData.js';

// Fonction pour obtenir des produits aléatoires (au moins 3)
function getRandomProducts(products, excludeProductId = null, count = 3) {
  const availableProducts = products.filter(p => p._id !== excludeProductId);
  const shuffled = availableProducts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Fonction pour créer un lien produit HTML
function createProductLink(product) {
  return `<a href="/product/${product._id}" target="_blank" rel="noopener noreferrer" class="product-link" style="color: #3b82f6; text-decoration: none; font-weight: 500;">${product.name}</a>`;
}

// Fonction pour ajouter des liens produits dans le contenu d'un article
function addProductLinksToContent(content, products, currentProductId) {
  // Obtenir 3 produits aléatoires (différents du produit actuel)
  const randomProducts = getRandomProducts(products, currentProductId, 3);
  
  // Créer les liens HTML
  const productLinks = randomProducts.map(product => createProductLink(product));
  
  // Trouver les endroits appropriés pour insérer les liens
  let updatedContent = content;
  
  // 1. Ajouter un lien dans l'introduction (après la première phrase)
  const introMatch = updatedContent.match(/<p class="article-intro">([^<]+\.)/);
  if (introMatch) {
    const introText = introMatch[1];
    const newIntro = `<p class="article-intro">${introText} Découvrez également nos recommandations : ${productLinks[0]}, ${productLinks[1]}, et ${productLinks[2]}.</p>`;
    updatedContent = updatedContent.replace(introMatch[0], newIntro);
  }
  
  // 2. Ajouter des liens dans les sections de contenu
  const sectionPattern = /<h3>([^<]+)<\/h3>\s*<p>([^<]+\.)/g;
  let sectionCount = 0;
  
  updatedContent = updatedContent.replace(sectionPattern, (match, title, paragraph) => {
    if (sectionCount < 2) {
      const productLink = productLinks[sectionCount % productLinks.length];
      const newParagraph = `${paragraph} Pour compléter votre équipement, nous vous recommandons ${productLink}.`;
      sectionCount++;
      return `<h3>${title}</h3>\n      <p>${newParagraph}</p>`;
    }
    return match;
  });
  
  // 3. Ajouter un lien dans la conclusion
  const conclusionMatch = updatedContent.match(/<div class="conclusion">\s*<h3>([^<]+)<\/h3>\s*<p>([^<]+\.)/);
  if (conclusionMatch) {
    const conclusionText = conclusionMatch[2];
    const productLink = productLinks[2];
    const newConclusion = `<div class="conclusion">
        <h3>${conclusionMatch[1]}</h3>
        <p>${conclusionText} N'hésitez pas à explorer ${productLink} pour d'autres options intéressantes.</p>
      </div>`;
    updatedContent = updatedContent.replace(conclusionMatch[0], newConclusion);
  }
  
  // 4. Ajouter une section de produits recommandés avant la CTA
  const ctaSection = `<div class="recommended-products" style="background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <h3 style="color: #1e40af; margin-top: 0;">Produits recommandés</h3>
        <p>Découvrez d'autres produits qui pourraient vous intéresser :</p>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 10px 0;">• ${productLinks[0]}</li>
          <li style="margin: 10px 0;">• ${productLinks[1]}</li>
          <li style="margin: 10px 0;">• ${productLinks[2]}</li>
        </ul>
      </div>
      
      <div class="cta-section">`;
  
  updatedContent = updatedContent.replace('<div class="cta-section">', ctaSection);
  
  return updatedContent;
}

// Fonction principale
async function addProductLinksToAllArticles() {
  try {
    console.log('🚀 Début de l\'ajout des liens produits aux articles...');
    
    // Charger les produits
    const products = getSampleProducts();
    console.log(`📦 ${products.length} produits chargés`);
    
    // Charger les articles
    const articlesPath = path.join(__dirname, '../src/data/articles.json');
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    console.log(`📰 ${articlesData.length} articles chargés`);
    
    let updatedCount = 0;
    
    // Traiter chaque article
    for (let i = 0; i < articlesData.length; i++) {
      const article = articlesData[i];
      
      // Vérifier si l'article a déjà des liens produits
      if (article.content.includes('product-link') || article.content.includes('recommended-products')) {
        console.log(`⏭️  Article ${i + 1} déjà traité, ignoré`);
        continue;
      }
      
      // Ajouter les liens produits
      const currentProductId = article.productId || null;
      const updatedContent = addProductLinksToContent(article.content, products, currentProductId);
      
      // Mettre à jour l'article
      articlesData[i].content = updatedContent;
      articlesData[i].updatedAt = new Date().toISOString();
      
      updatedCount++;
      
      if (updatedCount % 10 === 0) {
        console.log(`✅ ${updatedCount} articles traités...`);
      }
    }
    
    // Sauvegarder les articles mis à jour
    fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2), 'utf8');
    
    console.log(`🎉 Terminé ! ${updatedCount} articles mis à jour avec des liens produits`);
    console.log(`📁 Fichier sauvegardé : ${articlesPath}`);
    
    // Afficher un exemple d'article mis à jour
    if (articlesData.length > 0) {
      console.log('\n📄 Exemple d\'article mis à jour :');
      console.log(`Titre : ${articlesData[0].title}`);
      console.log(`Contient des liens produits : ${articlesData[0].content.includes('product-link') ? 'Oui' : 'Non'}`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des liens produits :', error);
    process.exit(1);
  }
}

// Exécuter le script
addProductLinksToAllArticles();




