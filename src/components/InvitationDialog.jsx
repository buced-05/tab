import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Star, DollarSign, Users, ArrowRight, Gift, Shield, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const InvitationDialog = ({ 
  isOpen, 
  onClose, 
  type = 'price', 
  productName, 
  affiliateUrl, 
  price,
  rating,
  reviewCount 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      
      // Ajouter une classe pour l'animation
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = 'unset';
        setIsAnimating(false);
      }, 300);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
      setIsAnimating(false);
    }, 300);
  };

  const handleRedirect = () => {
    // Ajouter un effet de clic
    setIsAnimating(true);
    
    setTimeout(() => {
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
      handleClose();
    }, 150);
  };

  if (!isOpen) return null;

  const getDialogContent = () => {
    switch (type) {
      case 'price':
        return {
          icon: <DollarSign size={48} className="dialog-icon price-icon" />,
          title: "💰 Découvrez le prix actuel",
          subtitle: `${productName}`,
          description: "Vérifiez le prix en temps réel et profitez des meilleures offres disponibles sur Amazon.",
          benefits: [
            { icon: <Gift size={20} />, text: "Offres spéciales et réductions", color: "#28a745" },
            { icon: <Shield size={20} />, text: "Achat sécurisé Amazon", color: "#007bff" },
            { icon: <Truck size={20} />, text: "Livraison rapide disponible", color: "#6f42c1" },
            { icon: <Clock size={20} />, text: "Prix mis à jour en temps réel", color: "#ffc107" }
          ],
          buttonText: "Voir le prix maintenant",
          buttonIcon: <DollarSign size={20} />,
          urgencyText: "⚡ Offre limitée dans le temps !",
          backgroundColor: "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
        };
      
      case 'reviews':
        return {
          icon: <Star size={48} className="dialog-icon reviews-icon" />,
          title: "⭐ Consultez les avis clients",
          subtitle: `${productName}`,
          description: `Découvrez ce que pensent ${reviewCount} clients qui ont acheté ce produit.`,
          benefits: [
            { icon: <Users size={20} />, text: `${reviewCount} avis vérifiés`, color: "#007bff" },
            { icon: <Star size={20} />, text: `Note moyenne: ${rating}/5 étoiles`, color: "#ffc107" },
            { icon: <Shield size={20} />, text: "Achats vérifiés uniquement", color: "#28a745" },
            { icon: <CheckCircle size={20} />, text: "Avis authentiques garantis", color: "#6f42c1" }
          ],
          buttonText: "Lire tous les avis",
          buttonIcon: <Star size={20} />,
          urgencyText: "📊 Données mises à jour quotidiennement",
          backgroundColor: "linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)"
        };
      
      case 'product':
        return {
          icon: <ExternalLink size={48} className="dialog-icon product-icon" />,
          title: "🔗 Voir le produit complet",
          subtitle: `${productName}`,
          description: "Accédez à toutes les informations détaillées, spécifications techniques et options disponibles.",
          benefits: [
            { icon: <Shield size={20} />, text: "Garantie constructeur", color: "#28a745" },
            { icon: <Truck size={20} />, text: "Livraison gratuite", color: "#007bff" },
            { icon: <Gift size={20} />, text: "Retour sous 30 jours", color: "#6f42c1" },
            { icon: <AlertCircle size={20} />, text: "Support client 24/7", color: "#dc3545" }
          ],
          buttonText: "Voir le produit sur Amazon",
          buttonIcon: <ExternalLink size={20} />,
          urgencyText: "🎯 Produit recommandé par nos experts",
          backgroundColor: "linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)"
        };
      
      default:
        return {
          icon: <ExternalLink size={48} className="dialog-icon default-icon" />,
          title: "ℹ️ En savoir plus",
          subtitle: `${productName}`,
          description: "Découvrez plus d'informations sur ce produit.",
          benefits: [],
          buttonText: "En savoir plus",
          buttonIcon: <ArrowRight size={20} />,
          urgencyText: "",
          backgroundColor: "linear-gradient(135deg, #007bff 0%, #0056b3 100%)"
        };
    }
  };

  const content = getDialogContent();

  return (
    <div className={`invitation-dialog-overlay ${isVisible ? 'visible' : ''} ${isAnimating ? 'animating' : ''}`} onClick={handleClose}>
      <div className={`invitation-dialog ${isVisible ? 'visible' : ''} ${isAnimating ? 'animating' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header avec bouton fermer */}
        <div className="dialog-header">
          <button className="dialog-close" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {/* Contenu principal */}
        <div className="dialog-content">
          {/* Icône avec animation */}
          <div className="dialog-icon-container">
            <div className="icon-background" style={{ background: content.backgroundColor }}>
              {content.icon}
            </div>
          </div>

          {/* Titre et sous-titre */}
          <div className="dialog-text">
            <h2 className="dialog-title">{content.title}</h2>
            <h3 className="dialog-subtitle">{content.subtitle}</h3>
            <p className="dialog-description">{content.description}</p>
            
            {/* Message d'urgence */}
            {content.urgencyText && (
              <div className="urgency-message">
                <span className="urgency-text">{content.urgencyText}</span>
              </div>
            )}
          </div>

          {/* Avantages avec couleurs */}
          {content.benefits.length > 0 && (
            <div className="dialog-benefits">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-icon" style={{ color: benefit.color }}>
                    {benefit.icon}
                  </div>
                  <span className="benefit-text">{benefit.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Bouton d'action principal */}
          <div className="dialog-actions">
            <button 
              className="dialog-primary-btn" 
              onClick={handleRedirect}
              style={{ background: content.backgroundColor }}
            >
              <span className="btn-icon">{content.buttonIcon}</span>
              <span className="btn-text">{content.buttonText}</span>
              <ArrowRight size={16} className="btn-arrow" />
            </button>
            
            <button className="dialog-secondary-btn" onClick={handleClose}>
              Continuer la lecture
            </button>
          </div>

          {/* Note de sécurité */}
          <div className="dialog-security-note">
            <Shield size={16} />
            <span>Lien sécurisé vers Amazon - Vos données sont protégées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationDialog;
