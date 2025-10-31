import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getLiveTimeManager, getCurrentTimeUTC } from '../services/LiveTimeManager';
import PropTypes from 'prop-types';

/**
 * Contexte React pour la gestion du temps en direct de haut niveau
 */
const LiveTimeContext = createContext(null);

/**
 * Provider de contexte pour le temps en direct
 */
export const LiveTimeProvider = ({ children }) => {
  const manager = getLiveTimeManager();
  const initial = getCurrentTimeUTC();

  const initialFormattedTime = initial.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
    timeZone: 'UTC',
    timeZoneName: 'short',
    calendar: 'gregory'
  });

  const initialFormattedDate = initial.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
    calendar: 'gregory'
  });

  const [timeState, setTimeState] = useState({
    time: initial,
    timestamp: initial.getTime(),
    precision: 0,
    offset: 0,
    lastSync: null,
    isOnline: navigator.onLine,
    timezone: 'UTC',
    calendar: 'Gregorian',
    formattedTime: initialFormattedTime,
    formattedDate: initialFormattedDate
  });

  const updateTimeState = useCallback((newState) => {
    setTimeState(prevState => {
      const t = newState?.time || getCurrentTimeUTC();
      const formattedTime = t.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
        timeZone: 'UTC',
        timeZoneName: 'short',
        calendar: 'gregory'
      });
      const formattedDate = t.toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short',
        calendar: 'gregory'
      });
      return {
        ...prevState,
        ...newState,
        time: t,
        timestamp: t.getTime(),
        formattedTime,
        formattedDate
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => updateTimeState({}), 1000);
    return () => clearInterval(interval);
  }, [updateTimeState]);

  useEffect(() => {
    const unsubscribe = manager.subscribe(updateTimeState);
    return () => { unsubscribe(); };
  }, [updateTimeState, manager]);

  useEffect(() => {
    const handleOnline = () => {
      manager.sync();
      setTimeState(prev => ({ ...prev, isOnline: true }));
    };
    const handleOffline = () => setTimeState(prev => ({ ...prev, isOnline: false }));
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [manager]);

  const value = {
    ...timeState,
    getCurrentTime: () => getCurrentTimeUTC(),
    formatTime: (options) => {
      const currentTime = timeState.time || getCurrentTimeUTC();
      return currentTime.toLocaleString('fr-FR', options || { timeZone: 'UTC' });
    },
    formatTimeOnly: (includeMs) => (timeState.time || getCurrentTimeUTC()).toLocaleTimeString('fr-FR', { timeZone: 'UTC', fractionalSecondDigits: includeMs ? 3 : undefined }),
    getStats: () => ({}),
    sync: () => manager.sync(),
    getRelativeDate: (targetDate) => {
      const now = timeState.time || getCurrentTimeUTC();
      const target = new Date(targetDate);
      const diffInMs = now - target;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      if (diffInSeconds < 60) return "à l'instant";
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `il y a ${diffInMinutes} min`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `il y a ${diffInHours} h`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `il y a ${diffInDays} j`;
      return target.toLocaleDateString('fr-FR', { timeZone: 'UTC' });
    }
  };

  return (
    <LiveTimeContext.Provider value={value}>
      {children}
    </LiveTimeContext.Provider>
  );
};

LiveTimeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * Hook pour utiliser le contexte de temps en direct
 */
export const useLiveTime = () => {
  const context = useContext(LiveTimeContext);
  if (!context) {
    throw new Error('useLiveTime must be used within a LiveTimeProvider');
  }
  return context;
};

/**
 * Hook pour obtenir uniquement l'heure formatée
 */
export const useLiveTimeOnly = () => {
  const { formattedTime, time, precision, isOnline } = useLiveTime();
  return { formattedTime, time, precision, isOnline };
};

/**
 * Hook pour obtenir uniquement la date formatée
 */
export const useLiveDateOnly = () => {
  const { formattedDate, time } = useLiveTime();
  return { formattedDate, time };
};

/**
 * Hook pour obtenir une date relative en temps réel
 */
export const useLiveRelativeDate = (targetDate) => {
  const { time, getRelativeDate } = useLiveTime();
  const [relativeDate, setRelativeDate] = useState('');
  useEffect(() => {
    if (!targetDate) return;
    setRelativeDate(getRelativeDate(targetDate));
  }, [targetDate, time, getRelativeDate]);
  return relativeDate;
};

export default LiveTimeContext;

