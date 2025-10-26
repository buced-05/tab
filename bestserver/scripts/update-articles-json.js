#!/usr/bin/env node

/**
 * 📦 Mise à Jour des Articles JSON - Champ inStock
 * Met à jour le fichier articles.json avec les valeurs inStock
 */

const fs = require('fs');
const path = require('path');

// Règles pour déterminer inStock basées sur le contenu de l'article
function determineInStock(article) {
  const title = (article.title || '').toLowerCase();
  const content = (article.content || '').toLowerCase();
  const excerpt = (article.excerpt || '').toLowerCase();
  
  // Mots-clés indiquant que l'article est en stock
  const inStockKeywords = [
    'disponible', 'en stock', 'livraison', 'commander', 'acheter',
    'prix', 'offre', 'promotion', 'réduction', 'deal', 'bon plan',
    'test', 'avis', 'review', 'comparaison', 'guide d\'achat',
    'meilleur', 'top', 'recommandé', 'populaire', 'tendance'
  ];
  
  // Mots-clés indiquant que l'article n'est pas en stock
  const outOfStockKeywords = [
    'rupture', 'épuisé', 'indisponible', 'plus disponible',
    'arrêté', 'discontinué', 'fin de série', 'limité',
    'édition limitée', 'sold out', 'out of stock'
  ];
  
  // Vérifier les mots-clés "en stock"
  const hasInStockKeywords = inStockKeywords.some(keyword => 
    title.includes(keyword) || content.includes(keyword) || excerpt.includes(keyword)
  );
  
  // Vérifier les mots-clés "hors stock"
  const hasOutOfStockKeywords = outOfStockKeywords.some(keyword => 
    title.includes(keyword) || content.includes(keyword) || excerpt.includes(keyword)
  );
  
  // Logique de décision
  if (hasOutOfStockKeywords) {
    return false; // Hors stock
  } else if (hasInStockKeywords) {
    return true; // En stock
  } else {
    // Par défaut, considérer comme en stock si c'est un article publié
    return article.status === 'published';
  }
}

async function updateArticlesJson() {
  console.log('📦 Mise à jour des articles JSON - Champ inStock');
  console.log('='.repeat(60));
  
  try {
    // Chemin vers le fichier articles.json
    const articlesPath = path.join(__dirname, '../../src/data/articles.json');
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(articlesPath)) {
      console.log('❌ Fichier articles.json non trouvé');
      console.log('💡 Exécutez d\'abord: node scripts/generate-articles.js');
      return;
    }
    
    // Lire le fichier articles.json
    console.log('📖 Lecture du fichier articles.json...');
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    console.log(`📊 ${articlesData.length} articles trouvés`);
    
    // Mettre à jour chaque article
    console.log('\n🔄 Mise à jour des articles...');
    let inStockCount = 0;
    let outOfStockCount = 0;
    let updatedCount = 0;
    
    articlesData.forEach((article, index) => {
      const inStock = determineInStock(article);
      
      // Ajouter le champ inStock à l'article
      article.inStock = inStock;
      
      if (inStock) {
        inStockCount++;
      } else {
        outOfStockCount++;
      }
      
      updatedCount++;
      
      // Afficher le progrès tous les 20 articles
      if (updatedCount % 20 === 0) {
        console.log(`   📝 ${updatedCount}/${articlesData.length} articles traités...`);
      }
    });
    
    // Sauvegarder le fichier mis à jour
    console.log('\n💾 Sauvegarde du fichier mis à jour...');
    fs.writeFileSync(articlesPath, JSON.stringify(articlesData, null, 2));
    
    // Résumé
    console.log('\n📊 Résumé de la mise à jour:');
    console.log('='.repeat(40));
    console.log(`✅ Articles mis à jour: ${updatedCount}/${articlesData.length}`);
    console.log(`📦 En stock: ${inStockCount}`);
    console.log(`❌ Hors stock: ${outOfStockCount}`);
    
    // Afficher quelques exemples
    console.log('\n📰 Exemples d\'articles mis à jour:');
    const examples = articlesData.slice(0, 5);
    examples.forEach((article, index) => {
      const status = article.inStock ? '✅ En stock' : '❌ Hors stock';
      console.log(`   ${index + 1}. "${article.title.substring(0, 50)}..." - ${status}`);
    });
    
    console.log('\n🎉 Mise à jour terminée avec succès !');
    console.log('💡 Le fichier articles.json a été mis à jour avec le champ inStock');
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error.message);
  }
}

// Exécuter la mise à jour
if (require.main === module) {
  updateArticlesJson();
}

module.exports = { updateArticlesJson, determineInStock };
