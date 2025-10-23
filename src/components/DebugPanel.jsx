import React, { useState, useEffect } from 'react';
import { Bug, X, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import errorService from '../services/errorService';
import '../styles/debug-panel.css';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [performance, setPerformance] = useState({});

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Update errors every 5 seconds
      const interval = setInterval(() => {
        setErrors(errorService.getErrorQueue());
      }, 5000);

      // Monitor performance
      const performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const perfData = {
          navigation: entries.find(e => e.entryType === 'navigation'),
          paint: entries.filter(e => e.entryType === 'paint'),
          measure: entries.filter(e => e.entryType === 'measure')
        };
        setPerformance(perfData);
      });

      performanceObserver.observe({ entryTypes: ['navigation', 'paint', 'measure'] });

      return () => {
        clearInterval(interval);
        performanceObserver.disconnect();
      };
    }
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const clearErrors = () => {
    errorService.clearErrorQueue();
    setErrors([]);
  };

  const getErrorIcon = (error) => {
    if (error.context?.type === 'network_error') return '🌐';
    if (error.context?.type === 'api_response_error') return '🔌';
    if (error.context?.type === 'validation_error') return '📝';
    return '❌';
  };

  const getErrorColor = (error) => {
    if (error.context?.type === 'network_error') return '#f59e0b';
    if (error.context?.type === 'api_response_error') return '#ef4444';
    if (error.context?.type === 'validation_error') return '#3b82f6';
    return '#6b7280';
  };

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        className="debug-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Debug Panel"
      >
        <Bug size={16} />
        {errors.length > 0 && <span className="error-count">{errors.length}</span>}
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="debug-panel">
          <div className="debug-header">
            <h3>Debug Panel</h3>
            <div className="debug-actions">
              <button onClick={clearErrors} title="Clear Errors">
                <RefreshCw size={14} />
              </button>
              <button onClick={() => setIsOpen(false)} title="Close">
                <X size={14} />
              </button>
            </div>
          </div>

          <div className="debug-content">
            {/* Error Summary */}
            <div className="debug-section">
              <h4>
                <AlertTriangle size={16} />
                Errors ({errors.length})
              </h4>
              {errors.length === 0 ? (
                <div className="no-errors">
                  <CheckCircle size={20} />
                  <span>No errors detected</span>
                </div>
              ) : (
                <div className="error-list">
                  {errors.slice(-10).map((error, index) => (
                    <div key={index} className="error-item">
                      <span className="error-icon">{getErrorIcon(error)}</span>
                      <div className="error-details">
                        <div className="error-message">{error.message}</div>
                        <div className="error-context">
                          {error.context?.type} • {new Date(error.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div 
                        className="error-indicator"
                        style={{ backgroundColor: getErrorColor(error) }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Performance Info */}
            <div className="debug-section">
              <h4>Performance</h4>
              <div className="performance-info">
                <div className="perf-item">
                  <span>Page Load:</span>
                  <span>{performance.navigation?.loadEventEnd ? 
                    `${Math.round(performance.navigation.loadEventEnd)}ms` : 'N/A'}</span>
                </div>
                <div className="perf-item">
                  <span>DOM Ready:</span>
                  <span>{performance.navigation?.domContentLoadedEventEnd ? 
                    `${Math.round(performance.navigation.domContentLoadedEventEnd)}ms` : 'N/A'}</span>
                </div>
                <div className="perf-item">
                  <span>First Paint:</span>
                  <span>{performance.paint?.find(p => p.name === 'first-paint') ? 
                    `${Math.round(performance.paint.find(p => p.name === 'first-paint').startTime)}ms` : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="debug-section">
              <h4>System Info</h4>
              <div className="system-info">
                <div className="info-item">
                  <span>User Agent:</span>
                  <span className="truncate">{navigator.userAgent}</span>
                </div>
                <div className="info-item">
                  <span>Viewport:</span>
                  <span>{window.innerWidth} × {window.innerHeight}</span>
                </div>
                <div className="info-item">
                  <span>URL:</span>
                  <span className="truncate">{window.location.href}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DebugPanel;




