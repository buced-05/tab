import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      category: 'Création de Compte',
      questions: [
        {
          question: 'Comment créer un compte AdsMarket ?',
          answer: 'Pour créer un compte, cliquez sur l\'icône utilisateur dans le header, puis sur "S\'inscrire". Remplissez le formulaire avec votre nom complet, email et mot de passe. Votre compte sera créé instantanément et vous serez automatiquement connecté.'
        },
        {
          question: 'Quelles sont les conditions pour créer un compte ?',
          answer: 'Vous devez fournir un nom complet valide, une adresse email valide, et un mot de passe d\'au moins 6 caractères. L\'email doit être unique et valide. Aucune vérification email n\'est requise pour commencer à utiliser votre compte.'
        },
        {
          question: 'Puis-je créer plusieurs comptes avec la même adresse email ?',
          answer: 'Non, chaque adresse email ne peut être associée qu\'à un seul compte. Si vous essayez de créer un compte avec un email déjà utilisé, vous recevrez un message d\'erreur vous invitant à vous connecter avec ce compte existant.'
        },
        {
          question: 'Mon compte est-il gratuit ?',
          answer: 'Oui, la création et l\'utilisation d\'un compte AdsMarket sont entièrement gratuites. Il n\'y a aucun frais caché ou abonnement requis pour accéder à toutes les fonctionnalités de la plateforme.'
        }
      ]
    },
    {
      category: 'Ajout de Produits',
      questions: [
        {
          question: 'Comment ajouter des produits à AdsMarket ?',
          answer: 'Les produits sont automatiquement ajoutés par notre système de scraping intelligent qui parcourt les sites de nos partenaires affiliés. Les administrateurs peuvent également ajouter manuellement des produits via le tableau de bord admin avec des informations détaillées, images et liens d\'affiliation.'
        },
        {
          question: 'Quels types de produits peuvent être ajoutés ?',
          answer: 'Nous acceptons tous types de produits : électronique, mode, maison & jardin, sports, beauté, livres, automobile, santé, jouets, et bien plus. Chaque produit doit avoir une description claire, des images de qualité, et un prix valide.'
        },
        {
          question: 'Comment les prix des produits sont-ils mis à jour ?',
          answer: 'Les prix sont mis à jour automatiquement plusieurs fois par jour grâce à notre système de scraping. Si un prix change chez un partenaire, il sera reflété sur notre plateforme dans les 24 heures. Les prix peuvent varier selon les détaillants.'
        },
        {
          question: 'Que se passe-t-il si un produit n\'est plus disponible ?',
          answer: 'Notre système détecte automatiquement les produits indisponibles et les marque comme "rupture de stock". Ils restent visibles pour référence mais ne peuvent plus être achetés. Une fois de nouveau disponibles, ils sont automatiquement réactivés.'
        }
      ]
    },
    {
      category: 'Vérification de Profil',
      questions: [
        {
          question: 'Comment vérifier mon profil utilisateur ?',
          answer: 'La vérification de profil est disponible dans la section "Paramètres" de votre compte. Vous pouvez ajouter votre photo de profil, compléter vos informations personnelles, et ajouter des détails de contact. Plus votre profil est complet, plus vous bénéficiez d\'un statut vérifié.'
        },
        {
          question: 'Quels documents sont nécessaires pour la vérification ?',
          answer: 'Pour une vérification complète, vous pouvez fournir : une photo de profil claire, votre numéro de téléphone, votre adresse complète, et une description personnelle. Aucun document officiel n\'est requis pour la vérification de base.'
        },
        {
          question: 'Combien de temps prend le processus de vérification ?',
          answer: 'La vérification de profil est instantanée pour les informations de base. Si vous ajoutez des informations supplémentaires comme une photo ou une description, elles sont immédiatement visibles sur votre profil. Aucune validation manuelle n\'est requise.'
        },
        {
          question: 'Puis-je modifier mes informations de vérification ?',
          answer: 'Oui, vous pouvez modifier toutes vos informations de profil à tout moment via la page "Paramètres". Vos modifications sont immédiatement appliquées et visibles par les autres utilisateurs selon vos préférences de confidentialité.'
        }
      ]
    },
    {
      category: 'Gestion de Compte Utilisateur',
      questions: [
        {
          question: 'Comment gérer mon compte utilisateur ?',
          answer: 'Accédez à votre profil via l\'icône utilisateur dans le header. Vous pouvez modifier vos informations personnelles, changer votre mot de passe, gérer vos préférences de confidentialité, et configurer vos notifications. Toutes les modifications sont sauvegardées automatiquement.'
        },
        {
          question: 'Comment changer mon mot de passe ?',
          answer: 'Dans la section "Paramètres" de votre profil, vous trouverez l\'option "Sécurité". Cliquez sur "Changer le mot de passe" et entrez votre mot de passe actuel ainsi que le nouveau mot de passe. Le changement est effectif immédiatement.'
        },
        {
          question: 'Puis-je supprimer mon compte ?',
          answer: 'Oui, vous pouvez supprimer votre compte depuis la section "Paramètres" > "Sécurité". Cette action supprimera définitivement toutes vos données personnelles, votre historique de visite, et vos préférences. Cette action est irréversible.'
        },
        {
          question: 'Comment exporter mes données ?',
          answer: 'Dans la section "Paramètres", vous pouvez télécharger toutes vos données personnelles au format JSON. Cela inclut vos informations de profil, votre historique de visite, et vos préférences. Cette fonctionnalité respecte le RGPD.'
        }
      ]
    },
    {
      category: 'Sécurité et Confidentialité',
      questions: [
        {
          question: 'Comment AdsMarket protège-t-il mes données ?',
          answer: 'Nous utilisons un chiffrement SSL pour toutes les communications, stockons les mots de passe de manière sécurisée avec hachage bcrypt, et respectons le RGPD. Vos données personnelles ne sont jamais partagées avec des tiers sans votre consentement explicite.'
        },
        {
          question: 'Mes informations de paiement sont-elles sécurisées ?',
          answer: 'AdsMarket ne stocke aucune information de paiement. Tous les paiements sont traités directement par nos partenaires affiliés sécurisés (PayPal, Stripe, etc.). Nous ne voyons jamais vos informations financières.'
        },
        {
          question: 'Comment puis-je sécuriser mon compte ?',
          answer: 'Utilisez un mot de passe fort (au moins 8 caractères avec chiffres et symboles), ne partagez jamais vos identifiants, déconnectez-vous des appareils partagés, et signalez toute activité suspecte immédiatement à notre support.'
        },
        {
          question: 'Que faire en cas de compromission de compte ?',
          answer: 'Contactez immédiatement notre support via la page "Contact". Nous suspendrons votre compte, réinitialiserons votre mot de passe, et vous guiderons pour sécuriser à nouveau votre compte. Changez également vos mots de passe sur d\'autres sites si vous utilisez les mêmes.'
        }
      ]
    },
    {
      category: 'Email Digest et Notifications',
      questions: [
        {
          question: 'Qu\'est-ce que l\'Email Digest ?',
          answer: 'L\'Email Digest est un résumé hebdomadaire personnalisé qui vous informe des nouveaux produits ajoutés, des prix qui ont baissé sur vos produits favoris, des tendances du moment, et des offres spéciales. Il est entièrement personnalisable selon vos préférences.'
        },
        {
          question: 'Comment activer ou désactiver les notifications email ?',
          answer: 'Dans la section "Paramètres" > "Notifications", vous pouvez choisir de recevoir ou non l\'Email Digest, les notifications de nouveaux produits dans vos catégories favorites, les alertes de prix, et les actualités de la plateforme.'
        },
        {
          question: 'À quelle fréquence recevrai-je l\'Email Digest ?',
          answer: 'Par défaut, l\'Email Digest est envoyé chaque dimanche. Vous pouvez modifier cette fréquence dans vos paramètres : quotidien, hebdomadaire, bi-hebdomadaire, ou mensuel. Vous pouvez aussi le désactiver complètement.'
        },
        {
          question: 'Puis-je personnaliser le contenu de l\'Email Digest ?',
          answer: 'Oui, vous pouvez choisir les catégories de produits à inclure, définir vos marques préférées, sélectionner vos types d\'alertes (nouveautés, réductions, tendances), et même choisir la langue de vos emails.'
        }
      ]
    },
    {
      category: 'Navigation et Fonctionnalités',
      questions: [
        {
          question: 'Comment fonctionne la recherche de produits ?',
          answer: 'Utilisez l\'icône de recherche dans le header pour accéder à notre recherche avancée. Vous pouvez rechercher par nom de produit, marque, catégorie, ou description. Les résultats sont filtrés en temps réel et incluent des suggestions intelligentes.'
        },
        {
          question: 'Qu\'est-ce que la fonction "Visited Items" ?',
          answer: 'Cette fonctionnalité sauvegarde automatiquement tous les produits que vous consultez via "Aperçu rapide" ou "Acheter maintenant". Vous pouvez y accéder via le menu de navigation pour retrouver facilement vos produits d\'intérêt.'
        },
        {
          question: 'Comment utiliser l\'aperçu rapide ?',
          answer: 'Cliquez sur "Aperçu rapide" sur n\'importe quelle carte de produit pour voir les détails complets sans quitter la page. Vous pouvez voir plusieurs images, la description détaillée, les spécifications, et accéder directement aux liens d\'achat.'
        },
        {
          question: 'Comment changer la langue ou la devise ?',
          answer: 'Utilisez les sélecteurs de langue (🌍) et de devise (💱) dans le header. La langue change l\'interface utilisateur, tandis que la devise convertit tous les prix affichés. Vos préférences sont sauvegardées automatiquement.'
        }
      ]
    },
    {
      category: 'Support et Assistance',
      questions: [
        {
          question: 'Comment contacter le support client ?',
          answer: 'Vous pouvez nous contacter via la page "Contact" du site, par email à support.alladsmarket.com, ou utiliser le chat en direct disponible dans le coin inférieur droit. Notre équipe répond généralement dans les 24 heures.'
        },
        {
          question: 'Que faire si je rencontre un bug ou un problème technique ?',
          answer: 'Signalez le problème via la page "Contact" en décrivant précisément ce qui s\'est passé, sur quelle page, et avec quel navigateur. Incluez des captures d\'écran si possible. Nous corrigeons les bugs prioritaires dans les 48 heures.'
        },
        {
          question: 'Puis-je suggérer de nouvelles fonctionnalités ?',
          answer: 'Absolument ! Nous adorons recevoir vos suggestions. Utilisez la page "Contact" avec le sujet "Suggestion de fonctionnalité" et décrivez votre idée en détail. Les meilleures suggestions sont intégrées dans nos mises à jour mensuelles.'
        },
        {
          question: 'Y a-t-il une documentation technique disponible ?',
          answer: 'Oui, notre centre d\'aide contient une documentation complète avec des tutoriels, des guides d\'utilisation, et des FAQ techniques. Vous pouvez y accéder via le menu "Aide" ou directement depuis la page d\'accueil.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="faq-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Questions Fréquemment Posées</h1>
          <p className="page-description">
            Trouvez rapidement des réponses aux questions courantes sur AdsMarket
          </p>
        </div>

        <div className="faq-content">
          <div className="search-section">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher dans les FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <HelpCircle size={48} />
              <h3>Aucun résultat trouvé</h3>
              <p>Essayez de rechercher avec des mots-clés différents ou parcourez toutes les catégories de FAQ.</p>
            </div>
          ) : (
            <div className="faq-sections">
              {filteredFAQs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="faq-section">
                  <h2 className="category-title">{category.category}</h2>
                  <div className="faq-items">
                    {category.questions.map((item, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`;
                      const isOpen = openItems[key];
                      
                      return (
                        <div key={questionIndex} className="faq-item">
                          <button
                            className="faq-question"
                            onClick={() => toggleItem(categoryIndex, questionIndex)}
                          >
                            <span>{item.question}</span>
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          {isOpen && (
                            <div className="faq-answer">
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="faq-footer">
            <h3>Vous avez encore des questions ?</h3>
            <p>Vous ne trouvez pas ce que vous cherchez ? Nous sommes là pour vous aider !</p>
            <div className="help-actions">
              <a href="/contact" className="help-button">
                Contacter le Support
              </a>
              <a href="/help" className="help-button secondary">
                Centre d'Aide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
