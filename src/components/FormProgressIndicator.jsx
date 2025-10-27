import React, { useState } from 'react';
import { Check, Circle, ArrowDown } from 'lucide-react';
import '../styles/form-progress.css';

const FormProgressIndicator = ({ 
  steps = [], 
  currentStep = 0, 
  completedSteps = [], 
  orientation = 'vertical' 
}) => {
  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'completed';
    return 'pending';
  };

  const getStepIcon = (stepIndex, status) => {
    switch (status) {
      case 'completed':
        return <Check size={16} className="step-icon completed" />;
      case 'current':
        return <Circle size={16} className="step-icon current" />;
      default:
        return <Circle size={16} className="step-icon pending" />;
    }
  };

  return (
    <div className={`form-progress-indicator ${orientation}`}>
      <div className="progress-container">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLastStep = index === steps.length - 1;
          
          return (
            <div key={index} className={`step-item ${status}`}>
              <div className="step-content">
                <div className="step-icon-container">
                  {getStepIcon(index, status)}
                </div>
                <div className="step-info">
                  <div className="step-title">{step.title}</div>
                  {step.description && (
                    <div className="step-description">{step.description}</div>
                  )}
                </div>
              </div>
              
              {!isLastStep && (
                <div className={`step-connector ${status}`}>
                  <ArrowDown size={12} className="connector-arrow" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="progress-summary">
        <div className="progress-text">
          Étape {currentStep + 1} sur {steps.length}
        </div>
        <div className="progress-percentage">
          {Math.round(((currentStep + 1) / steps.length) * 100)}%
        </div>
      </div>
    </div>
  );
};

// Composant de démonstration avec formulaire multi-étapes
const MultiStepFormDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const steps = [
    {
      title: "Informations Personnelles",
      description: "Nom, email et coordonnées"
    },
    {
      title: "Préférences",
      description: "Catégories et centres d'intérêt"
    },
    {
      title: "Validation",
      description: "Vérification des informations"
    },
    {
      title: "Confirmation",
      description: "Finalisation de l'inscription"
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

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    alert('Formulaire terminé avec succès !');
  };

  return (
    <div className="multi-step-form-demo">
      <div className="form-container">
        <div className="progress-sidebar">
          <FormProgressIndicator 
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            orientation="vertical"
          />
        </div>
        
        <div className="form-content">
          <div className="form-step">
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
            
            <div className="step-content">
              {currentStep === 0 && (
                <div className="form-fields">
                  <input type="text" placeholder="Nom complet" />
                  <input type="email" placeholder="Email" />
                  <input type="tel" placeholder="Téléphone" />
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="form-fields">
                  <select>
                    <option>Choisir une catégorie</option>
                    <option>Électronique</option>
                    <option>Maison & Jardin</option>
                    <option>Beauté & Santé</option>
                  </select>
                  <textarea placeholder="Centres d'intérêt"></textarea>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="form-fields">
                  <div className="validation-summary">
                    <h3>Récapitulatif</h3>
                    <p>Vérifiez vos informations avant de continuer.</p>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="form-fields">
                  <div className="confirmation-message">
                    <h3>Confirmation</h3>
                    <p>Votre inscription a été enregistrée avec succès !</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-actions">
              {currentStep > 0 && (
                <button onClick={handlePrevious} className="btn-secondary">
                  Précédent
                </button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <button onClick={handleNext} className="btn-primary">
                  Suivant
                </button>
              ) : (
                <button onClick={handleComplete} className="btn-success">
                  Terminer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FormProgressIndicator, MultiStepFormDemo };
export default FormProgressIndicator;
