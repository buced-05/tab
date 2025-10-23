import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

const Logo = ({ className = '', showText = true, size = 'default' }) => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef(null);
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'logo-small',
    default: 'logo-default',
    large: 'logo-large'
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    // Increment click count
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Clear existing timer
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    // Navigate to login on third click (silent - no notifications)
    if (newCount === 3) {
      navigate('/login');
      setClickCount(0);
      return;
    }

    // Reset click count after 2 seconds
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <Link 
      to="/" 
      className={`logo ${sizeClasses[size]} ${className}`}
      onClick={handleLogoClick}
    >
      {/* Circular Badge with Checkmark */}
      <div className="logo-icon">
        <div className="logo-badge">
          <div className="logo-badge-outer">
            <div className="logo-badge-inner">
              <Check size={16} className="logo-check" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="logo-text-container">
          <div className="logo-text">ADS MARKET</div>
        </div>
      )}
      
      {/* Decorative Line */}
      <div className="logo-decoration">
        <div className="logo-line"></div>
      </div>
    </Link>
  );
};

export default Logo;


