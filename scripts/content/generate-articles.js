import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the products data
import { getSampleProducts } from '../src/utils/sampleData.js';

// Article templates for different categories
const articleTemplates = {
  electronics: {
    title: "Guide d'achat complet : {name}",
    intro: "Découvrez notre analyse approfondie du {name}, un produit qui révolutionne l'expérience utilisateur dans la catégorie électronique.",
    sections: [
      "Caractéristiques techniques détaillées",
      "Tests en conditions réelles",
      "Comparaison avec les concurrents",
      "Avis d'experts et utilisateurs",
      "Recommandations d'achat"
    ]
  },
  fashion: {
    title: "Style et tendances : {name}",
    intro: "Explorez les dernières tendances mode avec le {name}, un choix parfait pour votre garde-robe moderne.",
    sections: [
      "Guide des tailles et coupes",
      "Conseils de style et d'association",
      "Entretien et durabilité",
      "Témoignages de clients satisfaits",
      "Où et comment le porter"
    ]
  },
  home: {
    title: "Décoration et maison : {name}",
    intro: "Transformez votre intérieur avec le {name}, un accessoire qui allie esthétique et fonctionnalité.",
    sections: [
      "Idées de décoration et placement",
      "Compatibilité avec différents styles",
      "Conseils d'entretien",
      "Témoignages de propriétaires",
      "Alternatives et accessoires complémentaires"
    ]
  },
  automotive: {
    title: "Accessoires auto : {name}",
    intro: "Améliorez votre expérience de conduite avec le {name}, un accessoire automobile de qualité professionnelle.",
    sections: [
      "Installation et configuration",
      "Compatibilité véhicule",
      "Tests de sécurité et performance",
      "Avis d'utilisateurs routiers",
      "Conseils d'utilisation optimale"
    ]
  },
  beauty: {
    title: "Beauté et soins : {name}",
    intro: "Découvrez les secrets de beauté avec le {name}, un produit qui sublime votre routine beauté quotidienne.",
    sections: [
      "Conseils d'application",
      "Composition et ingrédients",
      "Résultats et efficacité",
      "Témoignages beauté",
      "Routine recommandée"
    ]
  },
  sports: {
    title: "Sport et fitness : {name}",
    intro: "Boostez vos performances sportives avec le {name}, l'équipement idéal pour vos entraînements.",
    sections: [
      "Techniques d'utilisation",
      "Bénéfices pour la performance",
      "Conseils d'entraînement",
      "Témoignages d'athlètes",
      "Programme d'entraînement"
    ]
  },
  books: {
    title: "Lecture et culture : {name}",
    intro: "Plongez dans l'univers littéraire avec {name}, un ouvrage qui enrichit votre bibliothèque personnelle.",
    sections: [
      "Résumé et analyse",
      "Points forts et faiblesses",
      "Public cible et âge recommandé",
      "Avis de lecteurs",
      "Recommandations similaires"
    ]
  },
  toys: {
    title: "Jeux et jouets : {name}",
    intro: "Offrez des moments de bonheur avec {name}, un jouet éducatif et divertissant pour tous les âges.",
    sections: [
      "Âge recommandé et sécurité",
      "Valeur éducative",
      "Durabilité et résistance",
      "Témoignages de parents",
      "Jouets complémentaires"
    ]
  },
  pets: {
    title: "Soins animaux : {name}",
    intro: "Prenez soin de vos compagnons à quatre pattes avec {name}, un produit conçu pour leur bien-être.",
    sections: [
      "Bénéfices pour la santé animale",
      "Conseils d'utilisation",
      "Témoignages de propriétaires",
      "Compatibilité selon les races",
      "Conseils vétérinaires"
    ]
  }
};

// Generate article content for a product
function generateArticleContent(product) {
  const template = articleTemplates[product.category] || articleTemplates.electronics;
  
  const title = template.title.replace('{name}', product.name);
  const intro = template.intro.replace('{name}', product.name);
  
  // Generate sections content
  const sectionsContent = template.sections.map(section => {
    return `
      <h3>${section}</h3>
      <p>Dans cette section, nous analysons en détail ${section.toLowerCase()} du ${product.name}. Notre équipe d'experts a testé ce produit pendant plusieurs semaines pour vous fournir une évaluation complète et objective.</p>
      <p>Les résultats de nos tests montrent que le ${product.name} offre des performances remarquables dans sa catégorie. Les utilisateurs apprécient particulièrement sa facilité d'utilisation et sa durabilité exceptionnelle.</p>
    `;
  }).join('');
  
  const fullContent = `
    <div class="article-content">
      <h2>${title}</h2>
      <p class="article-intro">${intro}</p>
      
      <div class="product-highlights">
        <h3>Points forts du produit</h3>
        <ul>
          <li>Qualité exceptionnelle et durabilité</li>
          <li>Facilité d'utilisation remarquable</li>
          <li>Excellent rapport qualité-prix</li>
          <li>Design moderne et esthétique</li>
          <li>Support client réactif</li>
        </ul>
      </div>
      
      ${sectionsContent}
      
      <div class="conclusion">
        <h3>Conclusion et recommandation</h3>
        <p>Après une analyse approfondie, nous recommandons vivement le ${product.name} pour tous ceux qui recherchent ${product.category === 'electronics' ? 'une solution technologique fiable' : product.category === 'fashion' ? 'un style moderne et élégant' : product.category === 'home' ? 'une décoration intérieure réussie' : 'un produit de qualité'}. Son excellent rapport qualité-prix et ses performances remarquables en font un choix judicieux.</p>
      </div>
      
      <div class="cta-section">
        <p><strong>Prêt à découvrir le ${product.name} ?</strong></p>
        <p>Cliquez sur le lien ci-dessous pour accéder à la page produit et faire votre achat en toute sécurité.</p>
      </div>
    </div>
  `;
  
  return {
    title,
    content: fullContent,
    excerpt: intro.substring(0, 200) + '...',
    author: 'Équipe AllAdsMarket',
    category: product.category,
    tags: product.tags || [],
    featuredImage: product.images?.[0]?.url || '',
    status: 'published',
    productId: product._id
  };
}

// Generate articles for all products
function generateAllArticles() {
  console.log('🚀 Génération des articles pour tous les produits...');
  
  const products = getSampleProducts();
  const articles = [];
  
  products.forEach((product, index) => {
    console.log(`📝 Génération de l'article ${index + 1}/${products.length} pour: ${product.name}`);
    
    const article = generateArticleContent(product);
    articles.push(article);
  });
  
  // Save articles to JSON file
  const articlesPath = path.join(__dirname, '../src/data/articles.json');
  const articlesDir = path.dirname(articlesPath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2));
  
  console.log(`✅ ${articles.length} articles générés avec succès !`);
  console.log(`📁 Fichier sauvegardé: ${articlesPath}`);
  
  return articles;
}

// Run the script
try {
  generateAllArticles();
} catch (error) {
  console.error('❌ Erreur lors de la génération des articles:', error);
  process.exit(1);
}

export { generateAllArticles, generateArticleContent };
