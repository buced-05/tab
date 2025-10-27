import React from 'react';
import { Check, Circle } from 'lucide-react';
import '../styles/form-progress.css';

// Composant simple pour une ligne de progression verticale
const SimpleProgressLine = ({ 
  steps = [], 
  currentStep = 0, 
  completedSteps = [],
  className = ""
}) => {
  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) return 'completed';
    if (stepIndex === currentStep) return 'current';
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
    <div className={`simple-progress-line ${className}`}>
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
                <div className="step-title">{step}</div>
              </div>
            </div>
            
            {!isLastStep && (
              <div className={`step-connector ${status}`}>
                <div className="connector-line"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Composant pour une barre de progression horizontale simple
const SimpleProgressBar = ({ 
  steps = [], 
  currentStep = 0, 
  completedSteps = [],
  className = ""
}) => {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={`simple-progress-bar ${className}`}>
      <div className="progress-header">
        <span className="progress-text">
          Étape {currentStep + 1} sur {steps.length}
        </span>
        <span className="progress-percentage">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="progress-steps">
        {steps.map((step, index) => {
          const status = completedSteps.includes(index) ? 'completed' : 
                        index === currentStep ? 'current' : 'pending';
          
          return (
            <div key={index} className={`progress-step ${status}`}>
              <div className="step-dot"></div>
              <span className="step-label">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Composant de démonstration simple
const ProgressDemo = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState([]);
  
  const steps = [
    "Informations",
    "Préférences", 
    "Validation",
    "Confirmation"
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

  return (
    <div className="progress-demo">
      <h2>Démonstration Simple</h2>
      
      <div className="demo-section">
        <h3>Ligne Verticale</h3>
        <SimpleProgressLine 
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>
      
      <div className="demo-section">
        <h3>Barre Horizontale</h3>
        <SimpleProgressBar 
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>
      
      <div className="demo-controls">
        <button onClick={handlePrevious} disabled={currentStep === 0}>
          Précédent
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Suivant
        </button>
        <button onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export { SimpleProgressLine, SimpleProgressBar, ProgressDemo };
export default SimpleProgressLine;
