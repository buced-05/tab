// Utilitaire pour enrichir les articles avec des paragraphes et des liens produits

// Mapping des sujets d'articles vers les catégories de produits pertinentes
const articleCategoryMapping = {
  'amazon': ['electronics', 'home', 'fashion'],
  'shopify': ['electronics', 'fashion', 'home', 'beauty'],
  'alibaba': ['electronics', 'home', 'fashion', 'sports'],
  'seo': ['electronics', 'books', 'home'],
  'affiliate': ['electronics', 'fashion', 'home', 'beauty'],
  'facebook': ['electronics', 'fashion', 'beauty'],
  'instagram': ['fashion', 'beauty', 'electronics'],
  'email': ['electronics', 'fashion', 'books'],
  'conversion': ['electronics', 'fashion', 'beauty'],
  'crypto': ['electronics', 'books'],
  'brand': ['electronics', 'fashion', 'beauty'],
  'e-commerce': ['electronics', 'fashion', 'home', 'beauty'],
  'marketing': ['electronics', 'fashion', 'beauty'],
  'ecommerce': ['electronics', 'fashion', 'home'],
  'commerce': ['electronics', 'fashion', 'home'],
  'vente': ['electronics', 'fashion', 'home'],
  'produits': ['electronics', 'fashion', 'home', 'beauty'],
  'electronique': ['electronics'],
  'mode': ['fashion'],
  'maison': ['home'],
  'beauté': ['beauty'],
  'sport': ['sports'],
  'santé': ['health'],
  'livres': ['books']
};

// Produits spécifiques par ID pour des liens directs
const productExamples = {
  electronics: ['product-1', 'product-2', 'product-3'],
  fashion: ['product-5', 'product-6'],
  home: ['product-3', 'product-4'],
  beauty: ['product-7', 'product-8'],
  sports: ['product-9', 'product-10'],
  books: ['product-11', 'product-12']
};

/**
 * Détecte si un article contient principalement des listes
 */
export function isArticleListHeavy(content) {
  if (!content) return false;
  
  const lines = content.split('\n');
  const listLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed.startsWith('-') || 
           trimmed.startsWith('*') || 
           trimmed.startsWith('1.') || 
           trimmed.startsWith('**') && trimmed.includes(':');
  }).length;
  
  const totalLines = lines.filter(line => line.trim().length > 0).length;
  
  // Si plus de 60% des lignes sont des listes, considérer comme "list-heavy"
  return totalLines > 0 && (listLines / totalLines) > 0.6;
}

/**
 * Trouve les catégories de produits pertinentes pour un article
 */
export function getRelevantCategories(title, excerpt, tags) {
  const text = `${title} ${excerpt} ${tags?.join(' ') || ''}`.toLowerCase();
  const categories = new Set();
  
  for (const [keyword, cats] of Object.entries(articleCategoryMapping)) {
    if (text.includes(keyword)) {
      cats.forEach(cat => categories.add(cat));
    }
  }
  
  // Catégories par défaut si aucune correspondance
  if (categories.size === 0) {
    categories.add('electronics');
    categories.add('home');
  }
  
  return Array.from(categories);
}

/**
 * Génère des paragraphes narratifs pour enrichir un article
 */
export function generateNarrativeParagraphs(title, excerpt, existingContent) {
  const paragraphs = [];
  
  // Paragraphe d'introduction si manquant
  if (!existingContent.includes('##') && !existingContent.includes('Paragraphe')) {
    paragraphs.push(`Dans un contexte où ${title.toLowerCase()} devient de plus en plus central, il est essentiel de comprendre les mécanismes et stratégies qui permettent de réussir dans ce domaine. ${excerpt}`);
  }
  
  // Paragraphes contextuels selon le sujet
  if (title.toLowerCase().includes('amazon')) {
    paragraphs.push(`L'écosystème Amazon représente désormais une opportunité majeure pour les entrepreneurs et les entreprises souhaitant développer leur présence en ligne. Avec plus de 300 millions d'utilisateurs actifs et une infrastructure logistique inégalée, Amazon offre une plateforme unique pour commercialiser vos produits. Les vendeurs qui maîtrisent les subtilités de cette plateforme peuvent générer des revenus substantiels tout en bénéficiant de la confiance des consommateurs associée à la marque Amazon.`);
    
    paragraphs.push(`Pour maximiser vos chances de succès sur Amazon, il est crucial de bien comprendre les attentes des clients et de proposer des produits qui répondent réellement à leurs besoins. La qualité, la présentation et l'optimisation de vos listings jouent un rôle déterminant dans votre capacité à vous démarquer parmi des millions de produits concurrents.`);
  }
  
  if (title.toLowerCase().includes('shopify') || title.toLowerCase().includes('dropshipping')) {
    paragraphs.push(`Le dropshipping via Shopify représente une opportunité entrepreneuriale accessible qui permet de tester rapidement des concepts produits sans investissement initial en stock. Cette flexibilité est particulièrement intéressante pour les entrepreneurs souhaitant explorer différents marchés et niches avant de s'engager dans des investissements plus importants. La clé du succès réside dans la sélection rigoureuse des produits, la création d'une expérience client exceptionnelle et la mise en place de canaux marketing efficaces.`);
    
    paragraphs.push(`La réussite en dropshipping ne se limite pas à la simple mise en place d'une boutique en ligne. Elle nécessite une compréhension approfondie de votre audience cible, une stratégie marketing multicanale et une capacité à s'adapter rapidement aux tendances du marché. Les entrepreneurs qui réussissent sont ceux qui investissent dans la construction d'une marque solide et dans la création d'une véritable relation avec leurs clients.`);
  }
  
  if (title.toLowerCase().includes('seo') || title.toLowerCase().includes('référencement')) {
    paragraphs.push(`Le référencement naturel (SEO) reste l'un des leviers les plus puissants pour générer du trafic qualifié sur votre site e-commerce. Contrairement à la publicité payante, le SEO offre un potentiel de croissance durable et des coûts réduits sur le long terme. Cependant, le paysage du SEO évolue constamment, nécessitant une veille stratégique et une adaptation continue de vos pratiques.`);
    
    paragraphs.push(`Les moteurs de recherche modernes utilisent des algorithmes de plus en plus sophistiqués pour comprendre l'intention des utilisateurs et fournir les résultats les plus pertinents. Pour réussir en SEO, il est essentiel de créer un contenu de qualité qui répond véritablement aux besoins de votre audience, tout en optimisant les aspects techniques de votre site pour faciliter l'indexation et le classement par les moteurs de recherche.`);
  }
  
  if (title.toLowerCase().includes('marketing') || title.toLowerCase().includes('publicité')) {
    paragraphs.push(`Le marketing digital moderne repose sur une approche multicanale où chaque canal de communication peut jouer un rôle complémentaire dans la construction de votre présence en ligne. Que vous choisissiez les réseaux sociaux, l'email marketing, ou la publicité payante, l'objectif reste le même : créer une connexion authentique avec votre audience et guider les prospects vers l'achat.`);
    
    paragraphs.push(`L'efficacité de votre stratégie marketing dépend en grande partie de votre capacité à comprendre les comportements de vos clients et à adapter votre message en conséquence. Les données disponibles aujourd'hui offrent des opportunités sans précédent pour personnaliser votre approche et optimiser continuellement vos campagnes pour maximiser le retour sur investissement.`);
  }
  
  // Paragraphe général par défaut
  if (paragraphs.length === 0) {
    paragraphs.push(`Dans le paysage actuel du commerce en ligne, ${title.toLowerCase()} représente un domaine en constante évolution qui offre de nombreuses opportunités aux entrepreneurs et aux entreprises. La clé du succès réside dans une approche stratégique, une compréhension approfondie de votre marché et une capacité à s'adapter rapidement aux changements.`);
    
    paragraphs.push(`Pour réussir dans ce domaine, il est essentiel de combiner connaissances théoriques et application pratique. Les stratégies qui fonctionnent aujourd'hui peuvent nécessiter des ajustements demain, et les professionnels qui réussissent sont ceux qui maintiennent une veille constante et qui sont prêts à innover.`);
  }
  
  return paragraphs;
}

/**
 * Génère des liens produits intégrés dans le contenu
 */
export function generateProductLinks(categories, productCount = 2) {
  const links = [];
  
  categories.forEach(category => {
    const products = productExamples[category] || [];
    const selectedProducts = products.slice(0, productCount);
    
    selectedProducts.forEach(productId => {
      const productNumber = productId.replace('product-', '');
      links.push({
        type: 'direct',
        url: `/products/${productNumber}`,
        text: `découvrir nos produits ${category === 'electronics' ? 'électroniques' : category === 'fashion' ? 'de mode' : category === 'home' ? 'pour la maison' : category === 'beauty' ? 'de beauté' : 'pertinents'}`,
        category: category
      });
    });
  });
  
  // Ajouter également des liens vers les catégories
  categories.forEach(category => {
    links.push({
      type: 'category',
      url: `/products?category=${category}`,
      text: `explorer notre sélection complète de produits ${category === 'electronics' ? 'électroniques' : category === 'fashion' ? 'de mode' : category === 'home' ? 'pour la maison' : category === 'beauty' ? 'de beauté' : category}`,
      category: category
    });
  });
  
  return links;
}

/**
 * Enrichit le contenu d'un article avec des paragraphes et des liens produits
 */
export function enrichArticleContent(article) {
  const { title, excerpt, content, tags } = article;
  
  // Vérifier si l'article est principalement des listes
  const isListHeavy = isArticleListHeavy(content);
  
  if (!isListHeavy && content.includes('<p>')) {
    // L'article a déjà des paragraphes, ajouter juste des liens produits
    return addProductLinksToContent(content, article);
  }
  
  // Trouver les catégories pertinentes
  const categories = getRelevantCategories(title, excerpt, tags);
  
  // Générer des paragraphes narratifs
  const paragraphs = generateNarrativeParagraphs(title, excerpt, content);
  
  // Générer des liens produits
  const productLinks = generateProductLinks(categories, 2);
  
  // Enrichir le contenu
  let enrichedContent = content;
  
  // Ajouter des paragraphes après l'introduction
  if (content.includes('##') || content.includes('#')) {
    // Trouver la première section après le titre principal
    const sections = content.split(/\n(?=##)/);
    if (sections.length > 1) {
      // Insérer des paragraphes avant la première section
      const introParas = paragraphs.slice(0, 1).join('\n\n');
      sections[0] = sections[0] + '\n\n' + introParas;
      enrichedContent = sections.join('\n\n');
    }
  } else {
    // Ajouter les paragraphes au début
    enrichedContent = paragraphs.join('\n\n') + '\n\n' + enrichedContent;
  }
  
  // Convertir les listes en paragraphes là où c'est approprié
  enrichedContent = convertListsToParagraphs(enrichedContent);
  
  // Ajouter des liens produits dans le contenu
  enrichedContent = addProductLinksToContent(enrichedContent, article, productLinks);
  
  return enrichedContent;
}

/**
 * Convertit certaines listes en paragraphes narratifs
 */
function convertListsToParagraphs(content) {
  const lines = content.split('\n');
  const result = [];
  let inList = false;
  let listItems = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isListItem = line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line);
    
    if (isListItem && !inList) {
      // Commencer une nouvelle liste
      inList = true;
      listItems = [line];
    } else if (isListItem && inList) {
      // Continuer la liste
      listItems.push(line);
    } else if (!isListItem && inList && listItems.length > 0) {
      // Fin de liste, convertir en paragraphe si approprié
      if (listItems.length >= 3) {
        // Pour les longues listes, garder la liste mais ajouter un paragraphe avant
        const listTopic = extractTopicFromList(listItems);
        if (listTopic) {
          result.push(`\n${generateParagraphFromList(listTopic, listItems)}\n`);
        }
      }
      result.push(listItems.join('\n'));
      listItems = [];
      inList = false;
      result.push(line);
    } else {
      result.push(line);
    }
  }
  
  // Gérer la fin du fichier
  if (inList && listItems.length > 0) {
    if (listItems.length >= 3) {
      const listTopic = extractTopicFromList(listItems);
      if (listTopic) {
        result.push(`\n${generateParagraphFromList(listTopic, listItems)}\n`);
      }
    }
    result.push(listItems.join('\n'));
  }
  
  return result.join('\n');
}

function extractTopicFromList(listItems) {
  // Essayer d'extraire un sujet de la liste
  const firstItem = listItems[0].replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
  return firstItem.split(':')[0].trim();
}

function generateParagraphFromList(topic, listItems) {
  return `En ce qui concerne ${topic.toLowerCase()}, plusieurs éléments essentiels méritent d'être considérés. ${listItems.slice(0, 2).map(item => {
    const text = item.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
    return text;
  }).join(', ')} sont particulièrement importants. Ces aspects contribuent à créer une base solide pour réussir dans ce domaine.`;
}

/**
 * Ajoute des liens produits au contenu de l'article
 */
function addProductLinksToContent(content, article, productLinks = null) {
  if (!productLinks) {
    const categories = getRelevantCategories(article.title, article.excerpt, article.tags);
    productLinks = generateProductLinks(categories, 2);
  }
  
  // Vérifier si des liens produits existent déjà
  if (content.includes('/products')) {
    return content; // Ne pas dupliquer les liens
  }
  
  // Trouver des endroits appropriés pour insérer les liens
  const sections = content.split(/\n(?=##)/);
  const enrichedSections = sections.map((section, index) => {
    // Ajouter des liens dans les sections pertinentes
    if (index === Math.floor(sections.length / 2) || index === sections.length - 1) {
      // Insérer des liens au milieu ou à la fin de l'article
      const categoryLinks = productLinks.filter(link => link.type === 'category').slice(0, 1);
      const directLinks = productLinks.filter(link => link.type === 'direct').slice(0, 1);
      
      const linksText = [];
      if (categoryLinks.length > 0) {
        const link = categoryLinks[0];
        linksText.push(`\n\nPour ${link.text}, n'hésitez pas à [${link.text}](${link.url}) disponibles sur notre marketplace.`);
      }
      if (directLinks.length > 0) {
        const link = directLinks[0];
        linksText.push(`Vous pouvez également [découvrir des produits spécifiques](${link.url}) qui peuvent vous aider dans votre démarche.`);
      }
      
      if (linksText.length > 0) {
        return section + linksText.join(' ');
      }
    }
    return section;
  });
  
  // Ajouter également des liens à la fin de l'article
  const finalLinks = [];
  const categoryLinks = productLinks.filter(link => link.type === 'category').slice(0, 2);
  categoryLinks.forEach(link => {
    finalLinks.push(`[${link.text}](${link.url})`);
  });
  
  if (finalLinks.length > 0 && !enrichedSections[enrichedSections.length - 1].includes('/products')) {
    enrichedSections[enrichedSections.length - 1] += `\n\n**Produits Recommandés :** Pour compléter votre lecture, explorez ${finalLinks.join(' et ')} sur notre marketplace.`;
  }
  
  return enrichedSections.join('\n\n');
}

