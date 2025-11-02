import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, ExternalLink, Star } from 'lucide-react';
import '../styles/amazon-recommendation.css';

const AmazonRecommendation = ({ readingProgress = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Afficher quand le lecteur a lu au moins 30% de l'article
    if (!hasShown && readingProgress >= 30) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
        
        // Auto-fermer après 12 secondes
        setTimeout(() => {
          setIsVisible(false);
        }, 12000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [readingProgress, hasShown]);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="amazon-recommendation-overlay" onClick={closePopup}>
      <div 
        className="amazon-recommendation-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="amazon-recommendation-close"
          onClick={closePopup}
          aria-label="Fermer"
        >
          <X size={18} />
        </button>
        
        <div className="amazon-recommendation-content">
          <div className="amazon-recommendation-icon">
            <ShoppingBag size={32} />
          </div>
          
          <h3 className="amazon-recommendation-title">
            🛍️ Découvrez nos produits recommandés sur Amazon
          </h3>
          
          <p className="amazon-recommendation-message">
            Trouvez tous les produits mentionnés dans cet article et bien plus encore sur Amazon. 
            Profitez de livraison rapide et de garanties sécurisées.
          </p>
          
          <div className="amazon-recommendation-stars">
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <Star size={16} fill="#FFA500" color="#FFA500" />
            <span className="amazon-recommendation-rating">+100K produits vérifiés</span>
          </div>
          
          <a
            href="https://www.amazon.com/hz/mobile/mission?_encoding=UTF8&p=owsyL1u0Z7ZaYNKtNblKca0ysFHLO3ywudHy4e92q09hQOY4ICNfHbZ7D0Oz55nH20u5MZH6L9l%2Fs0wMe5IgSh46Ek0moOKnEXZLfMBb4Mw2Hj6kFRAz%2F0LekIPyIVCV6yC2tgbKZFwxj1SMC%2BKXsONPfF8r1A3oT%2BL618oGsONJyDKiI4LATL4ku99qAm9ldBYjH0NjHstJZd5swY9BRL67gtnNCJ%2F%2BiPeNTaMgqK7pELVh6jUeaHLxvftwCani6PjnWdzf1lcw%2F1S0nUzS%2BexSLQWOrunYsL120Y8pQFzjH3diF427rbeZPhoJi4zw2v83rqCP9u3pUbkVdxfyEXmVtNctqDRwtP%2BAjyWXsnxMH9rjNrorW7x6aPEtw4Q%2B7c%2BvyiqngRByL%2BfAkS5zMyyyD78pe2RQk2taS12p46w%3D&pd_rd_w=guNbb&content-id=amzn1.sym.1a792c30-891a-427d-8308-0b0836965822%3Aamzn1.symc.30b24d23-b616-4a3e-8d24-433d43a7339c&pf_rd_p=1a792c30-891a-427d-8308-0b0836965822&pf_rd_r=PHG63H2F0KTZ7ZXFJPHY&pd_rd_wg=ZnvI6&pd_rd_r=a4e85078-bf33-4540-9d07-4d724761e2fa&linkCode=ll2&tag=adsmarket08-20&linkId=68b2d78af51402fb65401dd8a586fcd3&language=en_US&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="amazon-recommendation-button"
            onClick={(e) => {
              // Tracking Google Analytics
              if (window.gtag) {
                window.gtag('event', 'amazon_click', {
                  event_category: 'affiliate',
                  event_label: 'amazon_recommendation_popup',
                  value: 1
                });
              }
            }}
          >
            <ShoppingBag size={18} />
            Voir les produits sur Amazon
            <ExternalLink size={16} />
          </a>
          
          <p className="amazon-recommendation-disclaimer">
            En tant que partenaire Amazon, nous réalisons un bénéfice sur les achats éligibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmazonRecommendation;

