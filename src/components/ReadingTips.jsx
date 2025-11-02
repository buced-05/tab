import React, { useState, useEffect } from 'react';
import { X, Lightbulb, BookOpen, TrendingUp, Heart, Sparkles, Award, Target } from 'lucide-react';
import '../styles/reading-tips.css';

const tips = [
  {
    id: 1,
    icon: Lightbulb,
    title: '💡 Astuce de Lecture',
    message: 'Prenez votre temps pour bien comprendre chaque concept. La lecture approfondie améliore la rétention de 40%.',
    delay: 5000,
    position: 'top-right'
  }
];

const ReadingTips = ({ readingProgress = 0 }) => {
  const [activeTip, setActiveTip] = useState(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown && readingProgress >= 10) {
      const timer = setTimeout(() => {
        setActiveTip(tips[0]);
        setHasShown(true);
        
        // Auto-fermer après 10 secondes
        setTimeout(() => {
          setActiveTip(null);
        }, 10000);
      }, tips[0].delay);

      return () => clearTimeout(timer);
    }
  }, [readingProgress, hasShown]);

  const closeTip = () => {
    setActiveTip(null);
  };

  if (!activeTip) return null;

  const Icon = activeTip.icon;
  return (
    <div className="reading-tips-container">
      <div
        className={`reading-tip reading-tip-${activeTip.position} reading-tip-enter`}
        onClick={closeTip}
      >
        <div className="reading-tip-icon">
          <Icon size={20} />
        </div>
        <div className="reading-tip-content">
          <h4 className="reading-tip-title">{activeTip.title}</h4>
          <p className="reading-tip-message">{activeTip.message}</p>
        </div>
        <button
          className="reading-tip-close"
          onClick={(e) => {
            e.stopPropagation();
            closeTip();
          }}
          aria-label="Fermer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ReadingTips;

