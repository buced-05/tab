import React, { useState } from 'react';
import '../styles/premium-tooltip.css';

const PremiumTooltip = ({ children, message, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="premium-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`premium-tooltip premium-tooltip-${position}`}>
          <div className="premium-tooltip-content">
            <div className="premium-tooltip-icon">✨</div>
            <div className="premium-tooltip-message">{message}</div>
          </div>
          <div className="premium-tooltip-arrow"></div>
        </div>
      )}
    </div>
  );
};

export default PremiumTooltip;

