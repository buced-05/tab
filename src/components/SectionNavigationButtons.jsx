import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Home,
  BarChart3,
  Package,
  Shield,
  Settings
} from 'lucide-react';
// import '../styles/section-navigation-buttons.css'; // Removed unused CSS

const SectionNavigationButtons = ({ 
  currentTab,
  onTabChange,
  onClose,
  className = ''
}) => {
  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: Home },
    { id: 'analytics', label: 'Analytiques', icon: BarChart3 },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'verification', label: 'Vérification', icon: Shield },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const currentIndex = tabs.findIndex(tab => tab.id === currentTab);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < tabs.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      const previousTab = tabs[currentIndex - 1];
      onTabChange(previousTab.id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextTab = tabs[currentIndex + 1];
      onTabChange(nextTab.id);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`section-navigation-buttons ${className}`}>
      <div className="section-nav-controls">
        <button
          className={`section-nav-btn previous ${!hasPrevious ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={!hasPrevious}
          title="Section précédente"
        >
          <ChevronLeft size={18} />
          <span>Précédent</span>
        </button>

        <div className="section-nav-info">
          <span className="section-nav-text">
            {tabs[currentIndex]?.label || 'Section'}
          </span>
          <div className="section-nav-progress">
            <div className="progress-dots">
              {tabs.map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className={`section-nav-btn next ${!hasNext ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={!hasNext}
          title="Section suivante"
        >
          <span>Suivant</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <button
        className="section-close-btn"
        onClick={handleClose}
        title="Fermer le profil"
      >
        <X size={18} />
        <span>Fermer</span>
      </button>
    </div>
  );
};

export default SectionNavigationButtons;

