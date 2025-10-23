// Error Service for centralized error handling
class ErrorService {
  constructor() {
    this.errorQueue = [];
    this.maxQueueSize = 50;
  }

  // Log error with context
  logError(error, context = {}) {
    const errorInfo = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      timestamp: new Date().toISOString(),
      context: context,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Add to queue
    this.errorQueue.push(errorInfo);
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorInfo);
    }

    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorInfo);
    }
  }

  // Send error to external service
  async sendToErrorService(errorInfo) {
    try {
      // In a real app, you would send to services like Sentry, LogRocket, etc.
      console.log('Error would be sent to error service:', errorInfo);
    } catch (error) {
      console.error('Failed to send error to service:', error);
    }
  }

  // Handle API errors
  handleApiError(error, operation = 'API call') {
    let userMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 400:
          userMessage = data?.message || 'Données invalides.';
          break;
        case 401:
          userMessage = 'Session expirée. Veuillez vous reconnecter.';
          break;
        case 403:
          userMessage = 'Accès non autorisé.';
          break;
        case 404:
          userMessage = 'Ressource non trouvée.';
          break;
        case 429:
          userMessage = 'Trop de requêtes. Veuillez patienter.';
          break;
        case 500:
          userMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
          break;
        default:
          userMessage = data?.message || `Erreur ${status}.`;
      }
    } else if (error.request) {
      // Network error
      userMessage = 'Problème de connexion. Vérifiez votre internet.';
    }

    this.logError(error, { operation, userMessage });
    return userMessage;
  }

  // Handle validation errors
  handleValidationError(errors) {
    const errorMessages = Object.values(errors).flat();
    return errorMessages.join(', ');
  }

  // Get error queue for debugging
  getErrorQueue() {
    return [...this.errorQueue];
  }

  // Clear error queue
  clearErrorQueue() {
    this.errorQueue = [];
  }
}

// Create singleton instance
const errorService = new ErrorService();

export default errorService;




