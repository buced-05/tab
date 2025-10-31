import fs from 'fs';
import path from 'path';

// Générateur de contenu SEO optimisé
class SEOContentGenerator {
  constructor() {
    this.baseUrl = 'https://alladsmarket.com';
    this.contentDir = './src/content';
    this.imagesDir = './public/images/content';
  }

  // Générer des articles de blog SEO optimisés
  generateBlogPosts() {
    const blogPosts = [
      {
        slug: 'guide-choisir-meilleur-produit-2025',
        title: 'Guide Complet : Comment Choisir le Meilleur Produit en 2025',
        metaDescription: 'Découvrez notre guide complet pour choisir le meilleur produit en 2025. Conseils d\'experts, critères d\'évaluation et recommandations pour faire le bon choix.',
        keywords: ['guide d\'achat', 'choisir produit', 'comparatif', 'recommandations', 'conseils expert'],
        category: 'guide',
        tags: ['guide', 'conseils', 'achat', 'comparatif'],
        content: this.generateGuideContent(),
        featuredImage: '/images/content/guide-achat-2025.jpg',
        readingTime: '15 min',
        publishDate: new Date().toISOString(),
        author: 'Équipe AllAdsMarket',
        structuredData: this.generateArticleStructuredData('guide-choisir-meilleur-produit-2025')
      },
      {
        slug: '10-tendances-produits-2025',
        title: 'Les 10 Tendances Produits à Suivre en 2025',
        metaDescription: 'Explorez les 10 tendances produits les plus importantes de 2025. Innovations technologiques, nouveaux besoins des consommateurs et opportunités du marché.',
        keywords: ['tendances produits', 'nouveautés 2025', 'innovations', 'technologie', 'tendances marché'],
        category: 'tendances',
        tags: ['tendances', 'innovations', 'technologie', '2025'],
        content: this.generateTrendsContent(),
        featuredImage: '/images/content/tendances-2025.jpg',
        readingTime: '12 min',
        publishDate: new Date().toISOString(),
        author: 'Équipe AllAdsMarket',
        structuredData: this.generateArticleStructuredData('10-tendances-produits-2025')
      },
      {
        slug: 'economiser-achats-astuces-expert',
        title: 'Comment Économiser sur Vos Achats : 15 Astuces d\'Expert',
        metaDescription: 'Nos experts partagent leurs 15 meilleures astuces pour économiser sur vos achats. Conseils pratiques, bons plans et stratégies pour optimiser votre budget.',
        keywords: ['économiser', 'astuces achat', 'bonnes affaires', 'réductions', 'conseils budget'],
        category: 'conseils',
        tags: ['économies', 'astuces', 'budget', 'conseils'],
        content: this.generateSavingsContent(),
        featuredImage: '/images/content/economiser-achats.jpg',
        readingTime: '10 min',
        publishDate: new Date().toISOString(),
        author: 'Équipe AllAdsMarket',
        structuredData: this.generateArticleStructuredData('economiser-achats-astuces-expert')
      }
    ];

    return blogPosts;
  }

  // Générer des pages de catégories optimisées
  generateCategoryPages() {
    const categories = [
      {
        slug: 'electronique',
        title: 'Électronique - Avis & Comparatifs | AllAdsMarket',
        metaDescription: 'Découvrez les meilleurs produits électroniques avec nos avis détaillés et comparatifs. Smartphones, ordinateurs, gadgets et innovations technologiques.',
        keywords: ['électronique', 'technologie', 'gadgets', 'smartphones', 'ordinateurs', 'innovations'],
        content: this.generateElectronicsContent(),
        featuredImage: '/images/content/electronique.jpg'
      },
      {
        slug: 'maison-jardin',
        title: 'Maison & Jardin - Guides d\'Achat | AllAdsMarket',
        metaDescription: 'Équipez votre maison et votre jardin avec les meilleurs produits. Guides d\'achat, avis et recommandations pour la décoration, le bricolage et l\'entretien.',
        keywords: ['maison', 'jardin', 'décoration', 'bricolage', 'outils', 'entretien'],
        content: this.generateHomeGardenContent(),
        featuredImage: '/images/content/maison-jardin.jpg'
      },
      {
        slug: 'beaute-sante',
        title: 'Beauté & Santé - Tests & Avis | AllAdsMarket',
        metaDescription: 'Découvrez les meilleurs produits de beauté et de santé avec nos tests approfondis. Cosmétiques, soins, compléments alimentaires et accessoires.',
        keywords: ['beauté', 'santé', 'cosmétiques', 'soins', 'compléments', 'accessoires'],
        content: this.generateBeautyHealthContent(),
        featuredImage: '/images/content/beaute-sante.jpg'
      }
    ];

    return categories;
  }

  // Générer des guides d'achat spécialisés
  generateBuyingGuides() {
    const guides = [
      {
        slug: 'choisir-smartphone-guide-2025',
        title: 'Comment Choisir un Smartphone : Guide Complet 2025',
        metaDescription: 'Guide complet pour choisir le smartphone parfait en 2025. Critères d\'évaluation, comparatifs et recommandations par budget.',
        keywords: ['smartphone', 'téléphone', 'mobile', 'comparatif', 'guide achat'],
        category: 'guide-achat',
        content: this.generateSmartphoneGuide(),
        featuredImage: '/images/content/smartphone-guide.jpg'
      },
      {
        slug: 'meilleurs-casques-audio-comparatif',
        title: 'Meilleurs Casques Audio : Comparatif et Guide d\'Achat',
        metaDescription: 'Découvrez les meilleurs casques audio du marché avec notre comparatif détaillé. Tests, avis et recommandations par usage.',
        keywords: ['casques audio', 'écouteurs', 'son', 'audio', 'comparatif'],
        category: 'guide-achat',
        content: this.generateHeadphonesGuide(),
        featuredImage: '/images/content/casques-audio.jpg'
      }
    ];

    return guides;
  }

  // Générer du contenu pour les guides
  generateGuideContent() {
    return `
      <div class="article-content">
        <h2>Introduction</h2>
        <p>Choisir le meilleur produit peut être un défi, surtout avec l'abondance d'options disponibles sur le marché. Dans ce guide complet, nous vous expliquons comment faire le bon choix selon vos besoins, votre budget et vos préférences.</p>
        
        <h2>1. Définir Vos Besoins</h2>
        <p>Avant de commencer votre recherche, il est essentiel de définir clairement vos besoins :</p>
        <ul>
          <li><strong>Usage principal</strong> : Comment allez-vous utiliser ce produit ?</li>
          <li><strong>Fréquence d'utilisation</strong> : Occasionnel ou quotidien ?</li>
          <li><strong>Contraintes</strong> : Budget, espace, compatibilité</li>
          <li><strong>Préférences</strong> : Marque, design, fonctionnalités</li>
        </ul>
        
        <h2>2. Recherche et Comparaison</h2>
        <p>Une fois vos besoins définis, procédez à une recherche approfondie :</p>
        <ul>
          <li>Consultez plusieurs sources d'information</li>
          <li>Comparez les spécifications techniques</li>
          <li>Lisez les avis clients authentiques</li>
          <li>Regardez les tests et comparatifs</li>
        </ul>
        
        <h2>3. Critères d'Évaluation</h2>
        <p>Évaluez chaque produit selon ces critères :</p>
        <ul>
          <li><strong>Qualité</strong> : Matériaux, finition, durabilité</li>
          <li><strong>Performance</strong> : Fonctionnalités, vitesse, efficacité</li>
          <li><strong>Rapport qualité-prix</strong> : Valeur pour l'argent</li>
          <li><strong>Support client</strong> : Service après-vente, garantie</li>
        </ul>
        
        <h2>4. Test et Essai</h2>
        <p>Si possible, testez le produit avant l'achat :</p>
        <ul>
          <li>Visitez les magasins physiques</li>
          <li>Demandez des démonstrations</li>
          <li>Empruntez ou louez temporairement</li>
          <li>Consultez les retours d'expérience</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Choisir le meilleur produit nécessite du temps et de la réflexion. En suivant cette méthode structurée, vous maximisez vos chances de faire le bon choix et d'être satisfait de votre achat.</p>
      </div>
    `;
  }

  // Générer du contenu pour les tendances
  generateTrendsContent() {
    return `
      <div class="article-content">
        <h2>Introduction</h2>
        <p>L'année 2025 s'annonce riche en innovations et tendances produits. Découvrez les 10 tendances les plus importantes à suivre pour rester à la pointe de la technologie et des besoins des consommateurs.</p>
        
        <h2>1. Intelligence Artificielle Intégrée</h2>
        <p>L'IA devient omniprésente dans nos produits du quotidien, des smartphones aux appareils ménagers.</p>
        
        <h2>2. Durabilité et Écologie</h2>
        <p>Les consommateurs privilégient de plus en plus les produits respectueux de l'environnement.</p>
        
        <h2>3. Personnalisation Avancée</h2>
        <p>Les produits s'adaptent de plus en plus aux préférences individuelles des utilisateurs.</p>
        
        <h2>4. Connectivité Universelle</h2>
        <p>L'Internet des Objets (IoT) continue de se développer avec de nouveaux protocoles.</p>
        
        <h2>5. Réalité Augmentée et Virtuelle</h2>
        <p>L'AR et la VR trouvent de nouvelles applications pratiques dans le quotidien.</p>
        
        <h2>6. Santé et Bien-être</h2>
        <p>Les produits de santé connectés et les solutions de bien-être gagnent en popularité.</p>
        
        <h2>7. Mobilité Électrique</h2>
        <p>L'électrification des transports se généralise avec de nouvelles solutions.</p>
        
        <h2>8. Sécurité Renforcée</h2>
        <p>La protection des données et la sécurité deviennent des priorités absolues.</p>
        
        <h2>9. Modularité et Réparabilité</h2>
        <p>Les produits modulaires et réparables gagnent en importance.</p>
        
        <h2>10. Accessibilité Universelle</h2>
        <p>L'accessibilité devient un critère essentiel dans la conception des produits.</p>
        
        <h2>Conclusion</h2>
        <p>Ces tendances façonnent l'avenir des produits et services. En les suivant, vous restez informé des évolutions du marché et pouvez anticiper vos besoins futurs.</p>
      </div>
    `;
  }

  // Générer du contenu pour les économies
  generateSavingsContent() {
    return `
      <div class="article-content">
        <h2>Introduction</h2>
        <p>Économiser sur vos achats sans compromettre la qualité, c'est possible ! Nos experts partagent leurs meilleures astuces pour optimiser votre budget et faire de bonnes affaires.</p>
        
        <h2>1. Planification et Recherche</h2>
        <ul>
          <li><strong>Liste de courses</strong> : Évitez les achats impulsifs</li>
          <li><strong>Comparaison des prix</strong> : Utilisez les comparateurs en ligne</li>
          <li><strong>Timing</strong> : Profitez des périodes de soldes</li>
          <li><strong>Promotions</strong> : Surveillez les offres spéciales</li>
        </ul>
        
        <h2>2. Stratégies d'Achat</h2>
        <ul>
          <li><strong>Achat groupé</strong> : Réduisez les coûts unitaires</li>
          <li><strong>Cashback</strong> : Récupérez une partie de vos achats</li>
          <li><strong>Cartes de fidélité</strong> : Accumulez des points</li>
          <li><strong>Négociation</strong> : N'hésitez pas à négocier</li>
        </ul>
        
        <h2>3. Optimisation des Achats</h2>
        <ul>
          <li><strong>Qualité vs Prix</strong> : Trouvez le bon équilibre</li>
          <li><strong>Durée de vie</strong> : Privilégiez la durabilité</li>
          <li><strong>Garanties</strong> : Protégez vos investissements</li>
          <li><strong>Revente</strong> : Considérez la valeur de revente</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Avec ces 15 astuces, vous pouvez considérablement réduire vos dépenses tout en maintenant la qualité de vos achats. L'important est d'adopter une approche réfléchie et stratégique.</p>
      </div>
    `;
  }

  // Générer du contenu pour l'électronique
  generateElectronicsContent() {
    return `
      <div class="category-content">
        <h1>Électronique - Avis & Comparatifs</h1>
        <p>Découvrez notre sélection des meilleurs produits électroniques avec des avis détaillés, des comparatifs et des guides d'achat complets.</p>
        
        <h2>Catégories Populaires</h2>
        <div class="category-grid">
          <div class="category-item">
            <h3>Smartphones</h3>
            <p>Les derniers smartphones avec nos tests approfondis</p>
          </div>
          <div class="category-item">
            <h3>Ordinateurs</h3>
            <p>PC, MacBook et accessoires informatiques</p>
          </div>
          <div class="category-item">
            <h3>Audio</h3>
            <p>Casques, écouteurs et systèmes audio</p>
          </div>
          <div class="category-item">
            <h3>Gaming</h3>
            <p>Consoles, jeux et accessoires gaming</p>
          </div>
        </div>
        
        <h2>Produits Recommandés</h2>
        <p>Nos experts ont sélectionné les meilleurs produits électroniques du moment, testés et approuvés pour leur qualité et leur performance.</p>
      </div>
    `;
  }

  // Générer du contenu pour maison et jardin
  generateHomeGardenContent() {
    return `
      <div class="category-content">
        <h1>Maison & Jardin - Guides d'Achat</h1>
        <p>Équipez votre maison et votre jardin avec les meilleurs produits. Découvrez nos guides d'achat, avis et recommandations pour tous vos besoins.</p>
        
        <h2>Catégories Principales</h2>
        <div class="category-grid">
          <div class="category-item">
            <h3>Décoration</h3>
            <p>Meubles, objets décoratifs et aménagement</p>
          </div>
          <div class="category-item">
            <h3>Bricolage</h3>
            <p>Outils, matériaux et équipements</p>
          </div>
          <div class="category-item">
            <h3>Jardin</h3>
            <p>Plantes, outils de jardinage et aménagement</p>
          </div>
          <div class="category-item">
            <h3>Entretien</h3>
            <p>Produits de nettoyage et maintenance</p>
          </div>
        </div>
        
        <h2>Conseils d'Experts</h2>
        <p>Nos guides vous aident à faire les bons choix pour votre maison et votre jardin, avec des conseils pratiques et des recommandations d'experts.</p>
      </div>
    `;
  }

  // Générer du contenu pour beauté et santé
  generateBeautyHealthContent() {
    return `
      <div class="category-content">
        <h1>Beauté & Santé - Tests & Avis</h1>
        <p>Découvrez les meilleurs produits de beauté et de santé avec nos tests approfondis et nos recommandations d'experts.</p>
        
        <h2>Catégories Spécialisées</h2>
        <div class="category-grid">
          <div class="category-item">
            <h3>Cosmétiques</h3>
            <p>Maquillage, soins visage et corps</p>
          </div>
          <div class="category-item">
            <h3>Soins</h3>
            <p>Produits de soin et de beauté</p>
          </div>
          <div class="category-item">
            <h3>Santé</h3>
            <p>Compléments alimentaires et bien-être</p>
          </div>
          <div class="category-item">
            <h3>Accessoires</h3>
            <p>Outils et accessoires de beauté</p>
          </div>
        </div>
        
        <h2>Tests Rigoureux</h2>
        <p>Nos tests sont réalisés par des experts pour vous garantir des avis objectifs et des recommandations fiables.</p>
      </div>
    `;
  }

  // Générer le guide smartphone
  generateSmartphoneGuide() {
    return `
      <div class="guide-content">
        <h1>Comment Choisir un Smartphone : Guide Complet 2025</h1>
        <p>Guide complet pour choisir le smartphone parfait selon vos besoins, votre budget et vos préférences.</p>
        
        <h2>1. Définir Votre Budget</h2>
        <p>Le budget est le premier critère à considérer. Voici les gammes disponibles :</p>
        <ul>
          <li><strong>Entrée de gamme</strong> : 100-300€</li>
          <li><strong>Milieu de gamme</strong> : 300-600€</li>
          <li><strong>Haut de gamme</strong> : 600-1000€</li>
          <li><strong>Premium</strong> : 1000€+</li>
        </ul>
        
        <h2>2. Critères Techniques</h2>
        <h3>Processeur</h3>
        <p>Le processeur détermine les performances globales du smartphone.</p>
        
        <h3>Mémoire RAM</h3>
        <p>La RAM influence la fluidité et la capacité multitâche.</p>
        
        <h3>Stockage</h3>
        <p>Choisissez selon vos besoins en photos, vidéos et applications.</p>
        
        <h3>Appareil Photo</h3>
        <p>Évaluez la qualité des photos selon vos usages.</p>
        
        <h2>3. Système d'Exploitation</h2>
        <p>Choisissez entre Android et iOS selon vos préférences.</p>
        
        <h2>4. Autonomie</h3>
        <p>Considérez la capacité de la batterie et l'optimisation logicielle.</p>
        
        <h2>Conclusion</h2>
        <p>Le choix du smartphone idéal dépend de vos priorités. Analysez vos besoins et comparez les options disponibles dans votre budget.</p>
      </div>
    `;
  }

  // Générer le guide casques audio
  generateHeadphonesGuide() {
    return `
      <div class="guide-content">
        <h1>Meilleurs Casques Audio : Comparatif et Guide d'Achat</h1>
        <p>Découvrez les meilleurs casques audio du marché avec notre comparatif détaillé et nos recommandations.</p>
        
        <h2>Types de Casques</h2>
        <h3>Circum-aural (Over-ear)</h3>
        <p>Casques qui entourent complètement les oreilles pour un confort optimal.</p>
        
        <h3>Supra-aural (On-ear)</h3>
        <p>Casques qui reposent sur les oreilles, plus compacts.</p>
        
        <h3>Intra-auriculaires (In-ear)</h3>
        <p>Écouteurs qui s'insèrent dans le conduit auditif.</p>
        
        <h2>Technologies Audio</h2>
        <h3>Réduction de Bruit</h3>
        <p>Active (ANC) ou passive pour isoler des bruits extérieurs.</p>
        
        <h3>Qualité Audio</h3>
        <p>Codecs haute qualité comme aptX, LDAC pour les casques Bluetooth.</p>
        
        <h3>Connectivité</h3>
        <p>Filaire, Bluetooth, ou hybride selon vos besoins.</p>
        
        <h2>Critères de Choix</h2>
        <ul>
          <li><strong>Usage</strong> : Musique, gaming, professionnel</li>
          <li><strong>Confort</strong> : Poids, serrage, matériaux</li>
          <li><strong>Autonomie</strong> : Durée de batterie pour les sans-fil</li>
          <li><strong>Prix</strong> : Rapport qualité-prix</li>
        </ul>
        
        <h2>Recommandations par Usage</h2>
        <h3>Musique</h3>
        <p>Privilégiez la qualité audio et le confort d'écoute.</p>
        
        <h3>Gaming</h3>
        <p>Recherchez la spatialisation audio et le microphone.</p>
        
        <h3>Professionnel</h3>
        <p>Optez pour la réduction de bruit et la clarté vocale.</p>
        
        <h2>Conclusion</h2>
        <p>Le choix du casque parfait dépend de vos priorités : qualité audio, confort, autonomie ou prix. Analysez vos besoins avant de choisir.</p>
      </div>
    `;
  }

  // Générer les données structurées pour les articles
  generateArticleStructuredData(slug) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": this.getArticleTitle(slug),
      "description": this.getArticleDescription(slug),
      "image": `${this.baseUrl}/images/content/${slug}.jpg`,
      "author": {
        "@type": "Organization",
        "name": "AllAdsMarket Team",
        "url": this.baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "AllAdsMarket",
        "url": this.baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${this.baseUrl}/logo.png`
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/blog/${slug}`
      },
      "articleSection": "Technology",
      "keywords": this.getArticleKeywords(slug)
    };
  }

  // Méthodes utilitaires
  getArticleTitle(slug) {
    const titles = {
      'guide-choisir-meilleur-produit-2025': 'Guide Complet : Comment Choisir le Meilleur Produit en 2025',
      '10-tendances-produits-2025': 'Les 10 Tendances Produits à Suivre en 2025',
      'economiser-achats-astuces-expert': 'Comment Économiser sur Vos Achats : 15 Astuces d\'Expert'
    };
    return titles[slug] || 'Article AllAdsMarket';
  }

  getArticleDescription(slug) {
    const descriptions = {
      'guide-choisir-meilleur-produit-2025': 'Découvrez notre guide complet pour choisir le meilleur produit en 2025. Conseils d\'experts, critères d\'évaluation et recommandations.',
      '10-tendances-produits-2025': 'Explorez les 10 tendances produits les plus importantes de 2025. Innovations technologiques et opportunités du marché.',
      'economiser-achats-astuces-expert': 'Nos experts partagent leurs 15 meilleures astuces pour économiser sur vos achats. Conseils pratiques et stratégies.'
    };
    return descriptions[slug] || 'Article de qualité sur AllAdsMarket';
  }

  getArticleKeywords(slug) {
    const keywords = {
      'guide-choisir-meilleur-produit-2025': 'guide d\'achat, choisir produit, comparatif, recommandations',
      '10-tendances-produits-2025': 'tendances produits, nouveautés 2025, innovations, technologie',
      'economiser-achats-astuces-expert': 'économiser, astuces achat, bonnes affaires, réductions'
    };
    return keywords[slug] || 'avis produits, guides d\'achat';
  }

  // Générer tous les fichiers de contenu
  generateAllContent() {
    console.log('🔄 Génération du contenu SEO...');
    
    // Créer les dossiers nécessaires
    if (!fs.existsSync(this.contentDir)) {
      fs.mkdirSync(this.contentDir, { recursive: true });
    }
    if (!fs.existsSync(this.imagesDir)) {
      fs.mkdirSync(this.imagesDir, { recursive: true });
    }

    // Générer les articles de blog
    const blogPosts = this.generateBlogPosts();
    blogPosts.forEach(post => {
      const filePath = path.join(this.contentDir, `${post.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
    });

    // Générer les pages de catégories
    const categories = this.generateCategoryPages();
    categories.forEach(category => {
      const filePath = path.join(this.contentDir, `category-${category.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(category, null, 2));
    });

    // Générer les guides d'achat
    const guides = this.generateBuyingGuides();
    guides.forEach(guide => {
      const filePath = path.join(this.contentDir, `guide-${guide.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(guide, null, 2));
    });

    console.log('✅ Contenu SEO généré avec succès');
    console.log(`📁 ${blogPosts.length} articles de blog`);
    console.log(`📁 ${categories.length} pages de catégories`);
    console.log(`📁 ${guides.length} guides d'achat`);
  }
}

// Exporter la classe
export { SEOContentGenerator };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new SEOContentGenerator();
  generator.generateAllContent();
}
