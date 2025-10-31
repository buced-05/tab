import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour compter les liens produits dans un contenu
function countProductLinks(content) {
  const productLinkMatches = content.match(/class="product-link"/g);
  return productLinkMatches ? productLinkMatches.length : 0;
}

// Fonction pour vérifier la présence de la section produits recommandés
function hasRecommendedProductsSection(content) {
  return content.includes('recommended-products');
}

// Fonction principale de vérification
async function verifyProductLinks() {
  try {
    console.log('🔍 Vérification des liens produits dans les articles...\n');
    
    // Charger les articles
    const articlesPath = path.join(__dirname, '../src/data/articles.json');
    const articlesData = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    
    let totalArticles = articlesData.length;
    let articlesWithLinks = 0;
    let articlesWithRecommendedSection = 0;
    let totalLinks = 0;
    let articlesWithMin3Links = 0;
    let articlesWithLessThan3Links = [];
    
    console.log(`📊 Analyse de ${totalArticles} articles...\n`);
    
    // Analyser chaque article
    for (let i = 0; i < articlesData.length; i++) {
      const article = articlesData[i];
      const linkCount = countProductLinks(article.content);
      const hasRecommended = hasRecommendedProductsSection(article.content);
      
      totalLinks += linkCount;
      
      if (linkCount > 0) {
        articlesWithLinks++;
      }
      
      if (hasRecommended) {
        articlesWithRecommendedSection++;
      }
      
      if (linkCount >= 3) {
        articlesWithMin3Links++;
      } else {
        articlesWithLessThan3Links.push({
          index: i + 1,
          title: article.title.substring(0, 60) + '...',
          linkCount: linkCount
        });
      }
      
      // Afficher le progrès
      if ((i + 1) % 50 === 0) {
        console.log(`✅ ${i + 1} articles analysés...`);
      }
    }
    
    // Afficher les résultats
    console.log('\n📈 RÉSULTATS DE LA VÉRIFICATION\n');
    console.log('=' .repeat(50));
    console.log(`📰 Total d'articles analysés: ${totalArticles}`);
    console.log(`🔗 Articles avec des liens produits: ${articlesWithLinks} (${((articlesWithLinks/totalArticles)*100).toFixed(1)}%)`);
    console.log(`📋 Articles avec section "Produits recommandés": ${articlesWithRecommendedSection} (${((articlesWithRecommendedSection/totalArticles)*100).toFixed(1)}%)`);
    console.log(`🎯 Articles avec au moins 3 liens: ${articlesWithMin3Links} (${((articlesWithMin3Links/totalArticles)*100).toFixed(1)}%)`);
    console.log(`📊 Total de liens produits: ${totalLinks}`);
    console.log(`📈 Moyenne de liens par article: ${(totalLinks/totalArticles).toFixed(2)}`);
    
    if (articlesWithLessThan3Links.length > 0) {
      console.log('\n⚠️  ARTICLES AVEC MOINS DE 3 LIENS:');
      console.log('-' .repeat(50));
      articlesWithLessThan3Links.forEach(article => {
        console.log(`• Article ${article.index}: ${article.linkCount} liens - ${article.title}`);
      });
    }
    
    // Vérification finale
    const successRate = (articlesWithMin3Links / totalArticles) * 100;
    
    console.log('\n🎯 RÉSULTAT FINAL');
    console.log('=' .repeat(50));
    
    if (successRate >= 95) {
      console.log('✅ SUCCÈS: Plus de 95% des articles ont au moins 3 liens produits!');
    } else if (successRate >= 90) {
      console.log('⚠️  ATTENTION: Plus de 90% des articles ont au moins 3 liens, mais il y a des améliorations possibles.');
    } else {
      console.log('❌ ÉCHEC: Moins de 90% des articles ont au moins 3 liens produits.');
    }
    
    console.log(`📊 Taux de réussite: ${successRate.toFixed(1)}%`);
    
    // Afficher un exemple d'article bien configuré
    if (articlesData.length > 0) {
      const bestArticle = articlesData.find(article => countProductLinks(article.content) >= 3);
      if (bestArticle) {
        console.log('\n📄 EXEMPLE D\'ARTICLE BIEN CONFIGURÉ:');
        console.log('-' .repeat(50));
        console.log(`Titre: ${bestArticle.title}`);
        console.log(`Liens produits: ${countProductLinks(bestArticle.content)}`);
        console.log(`Section recommandés: ${hasRecommendedProductsSection(bestArticle.content) ? 'Oui' : 'Non'}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    process.exit(1);
  }
}

// Exécuter la vérification
verifyProductLinks();




