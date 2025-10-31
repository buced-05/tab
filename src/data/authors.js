/**
 * Base de données des auteurs avec photos de profil
 * Optimisé pour le SEO et la crédibilité
 */

export const authors = {
  'team-alladsmarket': {
    id: 'team-alladsmarket',
    name: 'Team AllAdsMarket',
    bio: 'Équipe d\'experts en marketing digital et e-commerce',
    avatar: 'https://www.tradersdna.com/wp-content/uploads/2019/07/markets-1920x1310.jpg',
    social: {
      website: 'https://alladsmarket.com',
      linkedin: 'https://linkedin.com/company/alladsmarket',
      twitter: 'https://twitter.com/alladsmarket'
    },
    expertise: ['Marketing Digital', 'E-commerce', 'SEO', 'Analytics'],
    verified: true,
    articlesCount: 25,
    followers: 12500
  },
  'marie-dubois': {
    id: 'marie-dubois',
    name: 'Marie Dubois',
    bio: 'Experte en Intelligence Artificielle et Marketing Automation',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/marie-dubois-ia',
      twitter: 'https://twitter.com/marie_dubois_ia'
    },
    expertise: ['IA', 'Machine Learning', 'Marketing Automation', 'Data Science'],
    verified: true,
    articlesCount: 18,
    followers: 8900
  },
  'pierre-martin': {
    id: 'pierre-martin',
    name: 'Pierre Martin',
    bio: 'Spécialiste SEO et Content Marketing',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/pierre-martin-seo',
      twitter: 'https://twitter.com/pierre_martin_seo'
    },
    expertise: ['SEO', 'Content Marketing', 'Link Building', 'Analytics'],
    verified: true,
    articlesCount: 22,
    followers: 15600
  },
  'sophie-bernard': {
    id: 'sophie-bernard',
    name: 'Sophie Bernard',
    bio: 'Consultante E-commerce et Conversion Optimization',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/sophie-bernard-ecommerce',
      twitter: 'https://twitter.com/sophie_bernard_ec'
    },
    expertise: ['E-commerce', 'Conversion Rate', 'UX/UI', 'A/B Testing'],
    verified: true,
    articlesCount: 16,
    followers: 11200
  },
  'alexandre-roux': {
    id: 'alexandre-roux',
    name: 'Alexandre Roux',
    bio: 'Expert Blockchain et Technologies Émergentes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/alexandre-roux-blockchain',
      twitter: 'https://twitter.com/alex_roux_tech'
    },
    expertise: ['Blockchain', 'Cryptocurrency', 'Web3', 'DeFi'],
    verified: true,
    articlesCount: 14,
    followers: 9800
  },
  'laura-petit': {
    id: 'laura-petit',
    name: 'Laura Petit',
    bio: 'Analyste Data et Business Intelligence',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/laura-petit-data',
      twitter: 'https://twitter.com/laura_petit_data'
    },
    expertise: ['Data Analytics', 'Business Intelligence', 'Python', 'SQL'],
    verified: true,
    articlesCount: 20,
    followers: 13400
  },
  'expert-ia': {
    id: 'expert-ia',
    name: 'Expert IA',
    bio: 'Expert en Intelligence Artificielle et Technologies Émergentes',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/expert-ia',
      twitter: 'https://twitter.com/expert_ia'
    },
    expertise: ['IA', 'ChatGPT', 'Machine Learning', 'Service Client Digital'],
    verified: true,
    articlesCount: 15,
    followers: 10200
  },
  'expert-cybersecurite': {
    id: 'expert-cybersecurite',
    name: 'Dr. Sarah Chen',
    bio: 'Experte en Cybersécurité Avancée et Cryptographie Post-Quantique',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/sarah-chen-cybersecurite',
      twitter: 'https://twitter.com/sarah_chen_sec'
    },
    expertise: ['Cybersécurité', 'Cryptographie Post-Quantique', 'IA Sécurité', 'Informatique Quantique'],
    verified: true,
    articlesCount: 8,
    followers: 15600
  },
  'expert-quantique': {
    id: 'expert-quantique',
    name: 'Prof. David Kumar',
    bio: 'Expert en Informatique Quantique et Technologies Émergentes',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    social: {
      linkedin: 'https://linkedin.com/in/david-kumar-quantum',
      twitter: 'https://twitter.com/david_kumar_qc'
    },
    expertise: ['Informatique Quantique', 'Qubits', 'Téléportation Quantique', 'Quantum Computing'],
    verified: true,
    articlesCount: 12,
    followers: 18900
  }
};

/**
 * Fonction pour obtenir un auteur par ID
 */
export const getAuthorById = (authorId) => {
  return authors[authorId] || authors['team-alladsmarket'];
};

/**
 * Fonction pour obtenir tous les auteurs
 */
export const getAllAuthors = () => {
  return Object.values(authors);
};

/**
 * Fonction pour obtenir les auteurs vérifiés
 */
export const getVerifiedAuthors = () => {
  return Object.values(authors).filter(author => author.verified);
};

/**
 * Fonction pour obtenir les auteurs par expertise
 */
export const getAuthorsByExpertise = (expertise) => {
  return Object.values(authors).filter(author => 
    author.expertise.some(exp => exp.toLowerCase().includes(expertise.toLowerCase()))
  );
};
