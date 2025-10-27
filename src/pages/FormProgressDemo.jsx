import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import FormProgressIndicator from '../components/FormProgressIndicator';
import SEOHead from '../components/SEOHead';
import '../styles/form-progress.css';
import '../styles/pages.css';

const FormProgressDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [orientation, setOrientation] = useState('vertical');
  const [theme, setTheme] = useState('default');
  
  const steps = [
    {
      title: "Informations Personnelles",
      description: "Nom, email et coordonnées de contact"
    },
    {
      title: "Préférences Produits",
      description: "Catégories et centres d'intérêt"
    },
    {
      title: "Validation",
      description: "Vérification des informations saisies"
    },
    {
      title: "Confirmation",
      description: "Finalisation de l'inscription"
    },
    {
      title: "Terminé",
      description: "Processus d'inscription complété"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(completedSteps.filter(step => step !== currentStep - 1));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    alert('Formulaire terminé avec succès !');
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="form-step-content">
            <h3>Étape 1 : Informations Personnelles</h3>
            <div className="form-fields">
              <input type="text" placeholder="Nom complet" />
              <input type="email" placeholder="Adresse email" />
              <input type="tel" placeholder="Numéro de téléphone" />
              <input type="text" placeholder="Adresse" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-step-content">
            <h3>Étape 2 : Préférences Produits</h3>
            <div className="form-fields">
              <select>
                <option>Choisir une catégorie principale</option>
                <option>Électronique</option>
                <option>Maison & Jardin</option>
                <option>Beauté & Santé</option>
                <option>Sport & Loisirs</option>
              </select>
              <textarea placeholder="Décrivez vos centres d'intérêt"></textarea>
              <div className="checkbox-group">
                <label><input type="checkbox" /> Recevoir des notifications</label>
                <label><input type="checkbox" /> Partager mes données</label>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step-content">
            <h3>Étape 3 : Validation</h3>
            <div className="validation-summary">
              <h4>Récapitulatif de vos informations</h4>
              <div className="summary-item">
                <strong>Nom :</strong> [Nom saisi]
              </div>
              <div className="summary-item">
                <strong>Email :</strong> [Email saisi]
              </div>
              <div className="summary-item">
                <strong>Catégorie :</strong> [Catégorie sélectionnée]
              </div>
              <p>Vérifiez vos informations avant de continuer.</p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step-content">
            <h3>Étape 4 : Confirmation</h3>
            <div className="confirmation-message">
              <div className="success-icon">✅</div>
              <h4>Inscription Confirmée !</h4>
              <p>Votre compte a été créé avec succès. Vous pouvez maintenant accéder à toutes les fonctionnalités d'AllAdsMarket.</p>
              <div className="next-steps">
                <h5>Prochaines étapes :</h5>
                <ul>
                  <li>Vérifiez votre email</li>
                  <li>Complétez votre profil</li>
                  <li>Explorez nos produits</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step-content">
            <h3>Étape 5 : Terminé</h3>
            <div className="completion-message">
              <div className="celebration-icon">🎉</div>
              <h4>Félicitations !</h4>
              <p>Votre inscription est maintenant terminée. Bienvenue sur AllAdsMarket !</p>
              <div className="welcome-features">
                <h5>Découvrez nos fonctionnalités :</h5>
                <div className="feature-grid">
                  <div className="feature-item">
                    <span className="feature-icon">🛍️</span>
                    <span>Produits recommandés</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📊</span>
                    <span>Comparatifs détaillés</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⭐</span>
                    <span>Avis authentiques</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📱</span>
                    <span>Application mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead 
        title="Démonstration Ligne de Progression - AllAdsMarket"
        description="Découvrez notre indicateur de progression vertical pour formulaires multi-étapes. Interface intuitive et moderne."
        keywords="progression formulaire, indicateur étapes, interface utilisateur, UX design"
      />
      
      <div className="form-progress-demo-page">
        <div className="container">
          <div className="page-header">
            <h1>Ligne Verticale de Progression</h1>
            <p>Indicateur de cheminement et niveau du formulaire</p>
          </div>

          <div className="demo-controls">
            <div className="control-group">
              <label>Orientation :</label>
              <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                <option value="vertical">Verticale</option>
                <option value="horizontal">Horizontale</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Thème :</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="default">Par défaut</option>
                <option value="success">Succès</option>
                <option value="warning">Attention</option>
                <option value="danger">Danger</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <div className="control-group">
              <button onClick={handleReset} className="btn-reset">
                Réinitialiser
              </button>
            </div>
          </div>

          <div className="demo-container">
            <div className="progress-sidebar">
              <FormProgressIndicator 
                steps={steps}
                currentStep={currentStep}
                completedSteps={completedSteps}
                orientation={orientation}
                theme={theme}
              />
            </div>
            
            <div className="form-content">
              <div className="form-step">
                {getStepContent()}
                
                <div className="form-actions">
                  {currentStep > 0 && (
                    <button onClick={handlePrevious} className="btn-secondary">
                      ← Précédent
                    </button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <button onClick={handleNext} className="btn-primary">
                      Suivant →
                    </button>
                  ) : (
                    <button onClick={handleComplete} className="btn-success">
                      ✓ Terminer
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="demo-info">
            <h3>Caractéristiques de l'Indicateur</h3>
            <div className="features-grid">
              <div className="feature-card">
                <h4>🎯 Navigation Claire</h4>
                <p>Visualisation claire de l'étape actuelle et des étapes terminées</p>
              </div>
              <div className="feature-card">
                <h4>📱 Responsive</h4>
                <p>Adaptation automatique aux différentes tailles d'écran</p>
              </div>
              <div className="feature-card">
                <h4>🎨 Personnalisable</h4>
                <p>Thèmes et orientations configurables selon vos besoins</p>
              </div>
              <div className="feature-card">
                <h4>⚡ Performant</h4>
                <p>Animations fluides et transitions optimisées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormProgressDemo;
