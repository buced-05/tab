import React from 'react';
import { Clock, Wifi, WifiOff } from 'lucide-react';
import { useLiveTimeOnly, useLiveDateOnly } from '../contexts/LiveTimeContext';
import '../styles/realtime-clock.css';

/**
 * Composant d'horloge en temps réel de haut niveau
 * Utilise le système de gestion de temps avancé
 */
const RealtimeClock = ({ 
  showSeconds = true, 
  showDate = false, 
  compact = false,
  showPrecision = true,
  className = '' 
}) => {
  const { formattedTime, precision, isOnline } = useLiveTimeOnly();
  const { formattedDate } = useLiveDateOnly();

  return (
    <div className={`realtime-clock ${compact ? 'compact' : ''} ${className}`}>
      <div className="clock-pulse-indicator"></div>
      <Clock size={compact ? 16 : 22} className="clock-icon" />
      <div className="clock-content">
        <div className="clock-time-wrapper">
          <span className="clock-time">{formattedTime}</span>
          <span className="live-badge">LIVE</span>
          {!isOnline && (
            <span className="offline-indicator" title="Mode hors ligne">
              <WifiOff size={12} />
            </span>
          )}
        </div>
        {showDate && !compact && (
          <div className="clock-date">{formattedDate}</div>
        )}
        <div className="clock-timezone">UTC (Calendrier Grégorien)</div>
        {showPrecision && precision > 0 && (
          <div className="clock-precision" title={`Précision: ${precision.toFixed(2)}ms`}>
            ±{precision.toFixed(0)}ms
          </div>
        )}
      </div>
    </div>
  );
};

export default RealtimeClock;

