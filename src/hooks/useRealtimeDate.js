import { useState, useEffect } from 'react';
import { formatCurrentTime, formatCurrentDateTime, getCurrentDateTime, getRelativeDate } from '../utils/dateFormatter';

/**
 * Hook pour obtenir l'heure et la date en temps réel (UTC)
 * @param {Object} options - Options de configuration
 * @param {number} options.updateInterval - Intervalle de mise à jour en ms (défaut: 1000)
 * @param {boolean} options.includeSeconds - Inclure les secondes dans l'affichage
 * @param {boolean} options.includeDate - Inclure la date dans l'affichage
 * @returns {Object} Objet contenant currentTime, currentDate, currentDateTime
 */
export const useRealtimeDate = (options = {}) => {
  const {
    updateInterval = 1000,
    includeSeconds = true,
    includeDate = false
  } = options;

  const [currentTime, setCurrentTime] = useState(formatCurrentTime(includeSeconds));
  const [currentDate, setCurrentDate] = useState(formatCurrentDateTime({ 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'UTC'
  }));
  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const updateTime = () => {
      const nowUTC = getCurrentDateTime();
      setCurrentDateTime(nowUTC);
      setCurrentTime(formatCurrentTime(includeSeconds));
      
      if (includeDate) {
        setCurrentDate(formatCurrentDateTime({ 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          timeZone: 'UTC'
        }));
      }
    };

    // Mise à jour immédiate
    updateTime();

    // Configuration de l'intervalle de mise à jour
    const intervalId = setInterval(updateTime, updateInterval);

    // Nettoyage lors du démontage
    return () => clearInterval(intervalId);
  }, [updateInterval, includeSeconds, includeDate]);

  return {
    currentTime,
    currentDate,
    currentDateTime,
    timestamp: currentDateTime.getTime(),
    timezone: 'UTC',
    calendar: 'Gregorian'
  };
};

/**
 * Hook pour obtenir une date relative mise à jour en temps réel (UTC)
 * @param {string|Date} targetDate - Date cible
 * @param {number} updateInterval - Intervalle de mise à jour en ms (défaut: 60000 pour 1 minute)
 * @returns {string} Date relative formatée
 */
export const useRelativeDate = (targetDate, updateInterval = 60000) => {
  const [relativeDate, setRelativeDate] = useState('');

  useEffect(() => {
    if (!targetDate) return;

    const updateRelativeDate = () => {
      const nowUTC = getCurrentDateTime();
      const target = new Date(targetDate);
      // Convertir la date cible en UTC
      const targetUTC = new Date(Date.UTC(
        target.getUTCFullYear(),
        target.getUTCMonth(),
        target.getUTCDate(),
        target.getUTCHours(),
        target.getUTCMinutes()
      ));
      const diffInMs = nowUTC - targetUTC;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);
      const diffInYears = Math.floor(diffInDays / 365);

      let relative = '';
      if (diffInSeconds < 60) {
        relative = "à l'instant";
      } else if (diffInMinutes < 60) {
        relative = `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
      } else if (diffInHours < 24) {
        relative = `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
      } else if (diffInDays < 7) {
        relative = `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
      } else if (diffInWeeks < 4) {
        relative = `il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
      } else if (diffInMonths < 12) {
        relative = `il y a ${diffInMonths} mois`;
      } else {
        relative = `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
      }

      setRelativeDate(relative);
    };

    updateRelativeDate();
    const intervalId = setInterval(updateRelativeDate, updateInterval);

    return () => clearInterval(intervalId);
  }, [targetDate, updateInterval]);

  return relativeDate;
};

