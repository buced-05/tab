// Hashtags SEO massifs pour améliorer la visibilité sur les plateformes IA et moteurs de recherche
// Plus de 100 000 combinaisons de hashtags stratégiques

export const generateSEOHashtags = (article = {}) => {
  const {
    title = '',
    category = '',
    tags = [],
    author = '',
    keywords = []
  } = article;

  // Extraction de mots-clés depuis le titre
  const titleKeywords = title
    .toLowerCase()
    .split(/[\s,\-:]+/)
    .filter(word => word.length > 3)
    .slice(0, 20);

  // Hashtags par catégorie
  const categoryHashtags = {
    'Intelligence Artificielle': [
      '#AI', '#ArtificialIntelligence', '#MachineLearning', '#DeepLearning',
      '#NeuralNetworks', '#ChatGPT', '#OpenAI', '#GPT4', '#GPT3',
      '#NaturalLanguageProcessing', '#NLP', '#ComputerVision', '#DataScience',
      '#BigData', '#Algorithm', '#Automation', '#Robotics', '#TechInnovation'
    ],
    'E-commerce': [
      '#Ecommerce', '#OnlineShopping', '#DigitalMarketing', '#EcommerceTips',
      '#Shopify', '#AmazonFBA', '#Dropshipping', '#AffiliateMarketing',
      '#OnlineBusiness', '#InternetMarketing', '#SocialMediaMarketing',
      '#MarketingStrategy', '#BusinessGrowth', '#Entrepreneurship'
    ],
    'Technologie': [
      '#Technology', '#TechNews', '#Innovation', '#Startup', '#DigitalTransformation',
      '#CloudComputing', '#SaaS', '#IoT', '#Blockchain', '#Cryptocurrency',
      '#WebDevelopment', '#Programming', '#Software', '#Hardware'
    ],
    'Marketing Digital': [
      '#DigitalMarketing', '#Marketing', '#SEO', '#SEM', '#ContentMarketing',
      '#SocialMedia', '#EmailMarketing', '#PPC', '#OnlineAdvertising',
      '#MarketingStrategy', '#BrandBuilding', '#CustomerAcquisition'
    ]
  };

  // Hashtags génériques populaires
  const genericHashtags = [
    '#Tips', '#Guide', '#Tutorial', '#HowTo', '#Learning',
    '#Education', '#Knowledge', '#Insights', '#Expertise', '#Professional',
    '#Business', '#Success', '#Growth', '#Productivity', '#Innovation',
    '#Trending', '#Latest', '#News', '#Update', '#2024', '#2025',
    '#Free', '#PDF', '#Download', '#Resource', '#Tools',
    '#BestPractices', '#Strategy', '#Tips', '#Tricks', '#Hacks',
    '#Tech', '#Digital', '#Online', '#Web', '#Internet',
    '#Social', '#Media', '#Content', '#Blog', '#Article',
    '#Research', '#Analysis', '#CaseStudy', '#Review', '#Comparison',
    '#French', '#Français', '#France', '#Europe', '#International'
  ];

  // Hashtags par thème
  const themeHashtags = [
    '#WebDesign', '#UX', '#UI', '#UserExperience', '#UserInterface',
    '#Mobile', '#App', '#Application', '#MobileApp', '#Responsive',
    '#Security', '#Privacy', '#GDPR', '#Compliance', '#DataProtection',
    '#Analytics', '#Data', '#Metrics', '#KPIs', '#Performance',
    '#Optimization', '#Speed', '#Performance', '#SEO', '#SEM',
    '#Conversion', '#ROI', '#Revenue', '#Sales', '#Profit',
    '#Customer', '#Client', '#Service', '#Support', '#Experience',
    '#Team', '#Management', '#Leadership', '#Business', '#Company',
    '#Startup', '#Entrepreneur', '#Founder', '#CEO', '#BusinessOwner',
    '#Marketing', '#Advertising', '#Promotion', '#Brand', '#Branding',
    '#Product', '#Service', '#Solution', '#Innovation', '#Creative',
    '#Design', '#Development', '#Engineering', '#Programming', '#Code',
    '#AI', '#ML', '#DL', '#NLP', '#CV',
    '#Cloud', '#AWS', '#Azure', '#GoogleCloud', '#Infrastructure',
    '#Ecommerce', '#Shopify', '#WooCommerce', '#Magento', '#OnlineStore',
    '#Blog', '#Content', '#Writing', '#Copywriting', '#Copy',
    '#SocialMedia', '#Facebook', '#Instagram', '#Twitter', '#LinkedIn',
    '#SEO', '#SEM', '#PPC', '#GoogleAds', '#Advertising',
    '#Email', '#EmailMarketing', '#Newsletter', '#Campaign', '#Automation',
    '#Data', '#Analytics', '#GoogleAnalytics', '#Tracking', '#Metrics'
  ];

  // Combinaisons de hashtags
  const combinedHashtags = [];
  
  // Catégorie + génériques
  const categoryTags = categoryHashtags[category] || [];
  categoryTags.forEach(catTag => {
    genericHashtags.forEach(genTag => {
      combinedHashtags.push(`${catTag} ${genTag}`);
    });
  });

  // Titre keywords + génériques
  titleKeywords.forEach(titleKw => {
    genericHashtags.forEach(genTag => {
      combinedHashtags.push(`#${titleKw} ${genTag}`);
    });
  });

  // Tags de l'article + génériques
  tags.forEach(tag => {
    genericHashtags.forEach(genTag => {
      combinedHashtags.push(`#${tag} ${genTag}`);
    });
  });

  // Combinaisons de thèmes
  for (let i = 0; i < Math.min(themeHashtags.length, 50); i++) {
    for (let j = i + 1; j < Math.min(themeHashtags.length, 50); j++) {
      combinedHashtags.push(`${themeHashtags[i]} ${themeHashtags[j]}`);
    }
  }

  // Génération de variations
  const variations = [];
  const baseTags = [
    ...categoryTags,
    ...genericHashtags.slice(0, 30),
    ...themeHashtags.slice(0, 30),
    ...tags.map(t => `#${t}`)
  ];

  // Variations par langue
  const langVariations = ['fr', 'en', 'es', 'de', 'it', 'pt'];
  langVariations.forEach(lang => {
    baseTags.forEach(tag => {
      variations.push(`${tag} ${lang}`);
      variations.push(`${tag} #${lang}`);
    });
  });

  // Variations temporelles
  const yearVariations = ['2024', '2025', '2026'];
  const monthVariations = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
  
  yearVariations.forEach(year => {
    baseTags.slice(0, 20).forEach(tag => {
      variations.push(`${tag} #${year}`);
      variations.push(`${tag} ${year}`);
    });
  });

  monthVariations.forEach(month => {
    baseTags.slice(0, 10).forEach(tag => {
      variations.push(`${tag} #${month}`);
    });
  });

  // Combiner tous les hashtags
  const allHashtags = [
    ...categoryTags,
    ...genericHashtags,
    ...themeHashtags,
    ...tags.map(t => `#${t}`),
    ...titleKeywords.map(kw => `#${kw}`),
    ...combinedHashtags.slice(0, 1000),
    ...variations.slice(0, 500)
  ];

  // Dédupliquer et limiter à ~100k combinaisons (réaliste)
  const uniqueHashtags = [...new Set(allHashtags)];
  
  // Générer des combinaisons pour atteindre un grand nombre
  const finalHashtags = [];
  const chunkSize = Math.min(uniqueHashtags.length, 100);
  
  for (let i = 0; i < Math.min(uniqueHashtags.length, 500); i++) {
    for (let j = 0; j < Math.min(uniqueHashtags.length, 200); j++) {
      if (i !== j && finalHashtags.length < 100000) {
        finalHashtags.push(`${uniqueHashtags[i]} ${uniqueHashtags[j]}`);
      }
    }
  }

  // Retourner une chaîne de hashtags pour meta keywords (limité à 1000 caractères pour la meta)
  const metaKeywords = uniqueHashtags.slice(0, 200).join(', ');
  
  // Retourner tous les hashtags pour usage dans le contenu HTML
  return {
    metaKeywords, // Pour meta tag (limité)
    allHashtags: uniqueHashtags.slice(0, 500), // Premiers hashtags uniques
    combinedHashtags: finalHashtags.slice(0, 1000), // Combinaisons
    count: finalHashtags.length
  };
};

// Export de hashtags prédéfinis pour différentes catégories
export const predefinedHashtags = {
  ai: ['#AI', '#ArtificialIntelligence', '#MachineLearning', '#DeepLearning', '#ChatGPT', '#OpenAI', '#GPT4', '#NLP', '#ComputerVision'],
  tech: ['#Technology', '#Innovation', '#TechNews', '#DigitalTransformation', '#CloudComputing', '#SaaS'],
  marketing: ['#DigitalMarketing', '#Marketing', '#SEO', '#SEM', '#ContentMarketing', '#SocialMedia'],
  business: ['#Business', '#Entrepreneurship', '#Startup', '#Success', '#Growth', '#Strategy'],
  web: ['#WebDevelopment', '#WebDesign', '#UX', '#UI', '#Frontend', '#Backend'],
  ecommerce: ['#Ecommerce', '#OnlineShopping', '#Shopify', '#AmazonFBA', '#Dropshipping']
};

