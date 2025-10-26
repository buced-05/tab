#!/usr/bin/env node

/**
 * 📦 Test Simple - Champ inStock pour Articles
 * Teste la logique de détermination du statut inStock sans base de données
 */

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

// Articles de test
const testArticles = [
  {
    id: 1,
    title: "Guide d'achat : Meilleur Smartphone 2024",
    content: "Découvrez notre sélection des meilleurs smartphones disponibles cette année. Prix et offres actuelles.",
    excerpt: "Sélection des meilleurs smartphones avec prix et disponibilité",
    status: 'published'
  },
  {
    id: 2,
    title: "Test : Casque Audio Premium - Avis Complet",
    content: "Test approfondi de ce casque audio haut de gamme. Disponible en magasin et en ligne.",
    excerpt: "Test complet avec avis détaillé",
    status: 'published'
  },
  {
    id: 3,
    title: "Produit Discontinué - Plus Disponible",
    content: "Ce produit n'est plus disponible à la vente. Fin de série annoncée.",
    excerpt: "Produit arrêté par le fabricant",
    status: 'published'
  },
  {
    id: 4,
    title: "Comparaison : Top 5 Laptops 2024",
    content: "Comparaison détaillée des meilleurs ordinateurs portables. Prix et caractéristiques.",
    excerpt: "Comparaison des meilleurs laptops",
    status: 'published'
  },
  {
    id: 5,
    title: "Édition Limitée - Stock Épuisé",
    content: "Cette édition limitée est maintenant épuisée. Plus de stock disponible.",
    excerpt: "Édition limitée sold out",
    status: 'published'
  },
  {
    id: 6,
    title: "Guide d'Achat : Meilleures Offres du Moment",
    content: "Découvrez les meilleures offres et promotions actuelles. Commandes possibles.",
    excerpt: "Meilleures offres et promotions",
    status: 'published'
  }
];

function testInStockLogic() {
  console.log('📦 Test de la logique inStock pour les articles');
  console.log('='.repeat(60));
  
  let inStockCount = 0;
  let outOfStockCount = 0;
  
  testArticles.forEach(article => {
    const inStock = determineInStock(article);
    const status = inStock ? '✅ En stock' : '❌ Hors stock';
    
    console.log(`\n📰 Article ${article.id}: "${article.title}"`);
    console.log(`   ${status}`);
    console.log(`   Extrait: ${article.excerpt}`);
    
    if (inStock) {
      inStockCount++;
    } else {
      outOfStockCount++;
    }
  });
  
  console.log('\n📊 Résumé des tests:');
  console.log(`✅ En stock: ${inStockCount}/${testArticles.length}`);
  console.log(`❌ Hors stock: ${outOfStockCount}/${testArticles.length}`);
  
  console.log('\n🎯 Logique de détermination:');
  console.log('   - Mots-clés "en stock": disponible, prix, offre, test, avis, etc.');
  console.log('   - Mots-clés "hors stock": rupture, épuisé, discontinué, sold out');
  console.log('   - Par défaut: en stock si publié');
}

// Exécuter le test
if (require.main === module) {
  testInStockLogic();
}

module.exports = { determineInStock, testInStockLogic };
