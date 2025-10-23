import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 16, showText = true, className = '' }) => {
  // Utiliser le rating tel quel (déjà normalisé dans les données)
  const normalizedRating = Math.min(5.0, rating);
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`star-rating ${className}`}>
      <div className="stars">
        {/* Étoiles pleines */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            fill="#fbbf24"
            stroke="#fbbf24"
            className="filled"
          />
        ))}
        
        {/* Étoile à moitié remplie */}
        {hasHalfStar && (
          <div key="half" className="half-star" style={{ position: 'relative', display: 'inline-block' }}>
            <Star
              size={size}
              fill="none"
              stroke="#d1d5db"
              className="empty"
            />
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              overflow: 'hidden', 
              width: '50%' 
            }}>
              <Star
                size={size}
                fill="#fbbf24"
                stroke="#fbbf24"
                className="filled"
              />
            </div>
          </div>
        )}
        
        {/* Étoiles vides */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            fill="none"
            stroke="#d1d5db"
            className="empty"
          />
        ))}
      </div>
      {showText && (
        <span className="rating-text">
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
