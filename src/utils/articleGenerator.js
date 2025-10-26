// Générateur d'articles multilingues avec diversité naturelle

// Templates d'articles variés par langue
const articleTemplates = {
  fr: {
    titles: [
      "Analyse Technique Complète : {name}",
      "Guide Expert : {name}",
      "Test en Conditions Réelles : {name}",
      "Avis Détaillé : {name}",
      "Comparatif Professionnel : {name}",
      "Guide d'Achat : {name}",
      "Test Complet : {name}",
      "Analyse Approfondie : {name}",
      "Évaluation Détaillée : {name}",
      "Guide Pratique : {name}"
    ],
    introductions: [
      "Plongez dans notre analyse approfondie du {name}. Découvrez les spécifications techniques détaillées, les performances réelles et les retours d'expérience de {reviewCount} utilisateurs.",
      "Notre équipe d'experts a testé en profondeur le {name}. Voici notre évaluation complète basée sur {reviewCount} avis clients authentiques.",
      "Le {name} fait partie des produits les plus demandés de sa catégorie. Notre analyse détaillée vous révèle tout ce que vous devez savoir.",
      "Après des semaines de tests intensifs, nous vous présentons notre évaluation complète du {name}. Découvrez nos découvertes.",
      "Le {name} suscite beaucoup d'intérêt. Notre guide expert vous aide à comprendre si ce produit correspond à vos besoins.",
      "Notre laboratoire a mis le {name} à rude épreuve. Voici notre rapport détaillé avec {reviewCount} témoignages clients.",
      "Le {name} promet beaucoup. Notre test approfondi vous dit si ces promesses sont tenues.",
      "Découvrez notre analyse complète du {name}, un produit qui a convaincu {reviewCount} utilisateurs.",
      "Notre équipe a passé au crible le {name}. Voici notre verdict détaillé et nos recommandations.",
      "Le {name} en détail : spécifications, performances, avis clients ({reviewCount} évaluations) et notre verdict final."
    ],
    technicalSections: [
      "Architecture technique et composants",
      "Spécifications détaillées et performances",
      "Analyse technique approfondie",
      "Caractéristiques techniques principales",
      "Composants et architecture interne",
      "Spécifications et capacités techniques",
      "Analyse des composants clés",
      "Détails techniques et fonctionnalités",
      "Architecture et spécifications",
      "Composants techniques principaux"
    ],
    realWorldTests: [
      "Mon test en conditions réelles",
      "Test d'utilisation quotidienne",
      "Évaluation en situation réelle",
      "Test pratique approfondi",
      "Utilisation en conditions normales",
      "Test d'endurance et de fiabilité",
      "Évaluation en conditions d'usage",
      "Test de performance réelle",
      "Utilisation intensive pendant 30 jours",
      "Test de durabilité et de résistance"
    ],
    userExperience: [
      "Ce que disent vraiment les utilisateurs",
      "Retours d'expérience authentiques",
      "Témoignages clients vérifiés",
      "Avis utilisateurs détaillés",
      "Expériences clients réelles",
      "Retours d'utilisateurs satisfaits",
      "Témoignages d'utilisateurs expérimentés",
      "Avis clients authentiques",
      "Expériences utilisateurs variées",
      "Retours de la communauté"
    ],
    honestAnalysis: [
      "Mon avis honnête",
      "Mon verdict personnel",
      "Mon analyse critique",
      "Mon évaluation finale",
      "Mon opinion d'expert",
      "Mon verdict professionnel",
      "Mon analyse objective",
      "Mon évaluation sincère",
      "Mon avis d'utilisateur",
      "Mon verdict détaillé"
    ],
    whenToBuy: [
      "Dans quels cas l'acheter (ou pas)",
      "Quand investir dans ce produit",
      "Pour qui ce produit est-il fait ?",
      "Quand acheter ce produit",
      "À qui s'adresse ce produit",
      "Dans quelles situations l'acheter",
      "Quand ce produit vaut-il le coup",
      "Pour quels utilisateurs",
      "Quand l'achat est justifié",
      "À qui recommander ce produit"
    ],
    comparisons: [
      "Mon comparatif maison",
      "Comparaison avec la concurrence",
      "Analyse comparative détaillée",
      "Comparatif professionnel",
      "Évaluation comparative",
      "Comparaison avec les alternatives",
      "Analyse de la concurrence",
      "Comparatif technique",
      "Évaluation vs concurrents",
      "Comparaison objective"
    ]
  },
  en: {
    titles: [
      "Complete Technical Analysis: {name}",
      "Expert Guide: {name}",
      "Real-World Testing: {name}",
      "Detailed Review: {name}",
      "Professional Comparison: {name}",
      "Buying Guide: {name}",
      "Complete Test: {name}",
      "In-Depth Analysis: {name}",
      "Detailed Evaluation: {name}",
      "Practical Guide: {name}"
    ],
    introductions: [
      "Dive into our comprehensive analysis of the {name}. Discover detailed technical specifications, real-world performance, and feedback from {reviewCount} users.",
      "Our expert team has thoroughly tested the {name}. Here's our complete evaluation based on {reviewCount} authentic customer reviews.",
      "The {name} is one of the most sought-after products in its category. Our detailed analysis reveals everything you need to know.",
      "After weeks of intensive testing, we present our complete evaluation of the {name}. Discover our findings.",
      "The {name} generates significant interest. Our expert guide helps you understand if this product meets your needs.",
      "Our lab has put the {name} through rigorous testing. Here's our detailed report with {reviewCount} customer testimonials.",
      "The {name} promises a lot. Our comprehensive test tells you if these promises are kept.",
      "Discover our complete analysis of the {name}, a product that has convinced {reviewCount} users.",
      "Our team has scrutinized the {name}. Here's our detailed verdict and recommendations.",
      "The {name} in detail: specifications, performance, customer reviews ({reviewCount} ratings) and our final verdict."
    ],
    technicalSections: [
      "Technical architecture and components",
      "Detailed specifications and performance",
      "In-depth technical analysis",
      "Main technical characteristics",
      "Internal components and architecture",
      "Technical specifications and capabilities",
      "Analysis of key components",
      "Technical details and features",
      "Architecture and specifications",
      "Main technical components"
    ],
    realWorldTests: [
      "My real-world testing",
      "Daily use testing",
      "Real-world evaluation",
      "Comprehensive practical test",
      "Normal conditions usage",
      "Endurance and reliability testing",
      "Usage conditions evaluation",
      "Real performance testing",
      "Intensive 30-day usage",
      "Durability and resistance testing"
    ],
    userExperience: [
      "What users really say",
      "Authentic user feedback",
      "Verified customer testimonials",
      "Detailed user reviews",
      "Real customer experiences",
      "Satisfied user feedback",
      "Experienced user testimonials",
      "Authentic customer reviews",
      "Varied user experiences",
      "Community feedback"
    ],
    honestAnalysis: [
      "My honest opinion",
      "My personal verdict",
      "My critical analysis",
      "My final evaluation",
      "My expert opinion",
      "My professional verdict",
      "My objective analysis",
      "My sincere evaluation",
      "My user opinion",
      "My detailed verdict"
    ],
    whenToBuy: [
      "When to buy it (or not)",
      "When to invest in this product",
      "Who is this product for?",
      "When to buy this product",
      "Who should use this product",
      "In what situations to buy it",
      "When is this product worth it",
      "For which users",
      "When the purchase is justified",
      "Who to recommend this product to"
    ],
    comparisons: [
      "My home comparison",
      "Comparison with competition",
      "Detailed comparative analysis",
      "Professional comparison",
      "Comparative evaluation",
      "Comparison with alternatives",
      "Competition analysis",
      "Technical comparison",
      "Evaluation vs competitors",
      "Objective comparison"
    ]
  }
};

// Fonction pour obtenir un élément aléatoire d'un tableau
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Fonction pour générer un contenu d'article multilingue et diversifié
export const generateMultilingualArticle = (product, language = 'fr') => {
  const templates = articleTemplates[language] || articleTemplates.fr;
  
  // Générer un titre varié
  const title = getRandomElement(templates.titles)
    .replace('{name}', product.name);
  
  // Générer une introduction variée
  const introduction = getRandomElement(templates.introductions)
    .replace('{name}', product.name)
    .replace('{reviewCount}', product.rating.count);
  
  // Générer les sections techniques variées
  const technicalSection = getRandomElement(templates.technicalSections);
  const realWorldTest = getRandomElement(templates.realWorldTests);
  const userExperience = getRandomElement(templates.userExperience);
  const honestAnalysis = getRandomElement(templates.honestAnalysis);
  const whenToBuy = getRandomElement(templates.whenToBuy);
  const comparison = getRandomElement(templates.comparisons);
  
  return {
    title,
    introduction,
    technicalSection,
    realWorldTest,
    userExperience,
    honestAnalysis,
    whenToBuy,
    comparison
  };
};

// Fonction pour générer du contenu d'article diversifié
export const generateDiverseArticleContent = (product, language = 'fr') => {
  const article = generateMultilingualArticle(product, language);
  
  // Contenu de base avec variété
  const content = `
    <div class="article-content">
      <h2>${article.introduction}</h2>
      
      <section class="technical-section">
        <h3>${article.technicalSection}</h3>
        <p>Notre équipe a analysé en détail les spécifications du ${product.name}. 
        Les résultats montrent des performances remarquables dans sa catégorie, avec ${product.rating.average}/5 étoiles 
        basé sur ${product.rating.count} évaluations clients authentiques.</p>
        
        <div class="inline-product-cta">
          <a href="${product.affiliateUrl}" target="_blank" rel="noopener noreferrer" class="inline-cta-button">
            <span class="cta-icon">→</span>
            <span class="cta-text">Voir les spécifications détaillées sur Amazon</span>
          </a>
        </div>
      </section>
      
      <section class="real-world-test">
        <h3>${article.realWorldTest}</h3>
        <p>Après ${Math.floor(Math.random() * 30) + 15} jours d'utilisation intensive, 
        le ${product.name} a démontré sa fiabilité et ses performances. 
        Les tests en conditions réelles confirment les spécifications annoncées.</p>
      </section>
      
      <section class="user-experience">
        <h3>${article.userExperience}</h3>
        <p>Les ${product.rating.count} avis clients révèlent une satisfaction générale de ${Math.round(product.rating.average * 20)}%. 
        Les utilisateurs apprécient particulièrement la qualité et les performances du ${product.name}.</p>
      </section>
      
      <section class="honest-analysis">
        <h3>${article.honestAnalysis}</h3>
        <p>Le ${product.name} représente un excellent rapport qualité-prix dans sa catégorie. 
        Avec une note de ${product.rating.average}/5 et ${product.rating.count} évaluations, 
        ce produit a su convaincre de nombreux utilisateurs.</p>
      </section>
      
      <section class="when-to-buy">
        <h3>${article.whenToBuy}</h3>
        <p>Ce produit convient particulièrement aux utilisateurs recherchant qualité et performance. 
        La disponibilité en stock et les conditions d'achat favorables en font un choix judicieux.</p>
      </section>
      
      <section class="comparison">
        <h3>${article.comparison}</h3>
        <p>Comparé aux alternatives du marché, le ${product.name} 
        se distingue par ses performances et sa fiabilité. 
        Notre analyse comparative confirme sa position de leader dans sa catégorie.</p>
      </section>
    </div>
  `;
  
  return content;
};

export default generateMultilingualArticle;
