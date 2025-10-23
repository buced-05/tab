import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log l'erreur pour le débogage
    console.error('🚨 ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Envoyer l'erreur à un service de monitoring (optionnel)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // Ici vous pouvez envoyer l'erreur à un service comme Sentry, LogRocket, etc.
    try {
      // Exemple de log local
      const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      // Stocker dans localStorage pour débogage
      const existingErrors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      existingErrors.push(errorData);
      
      // Garder seulement les 10 dernières erreurs
      if (existingErrors.length > 10) {
        existingErrors.splice(0, existingErrors.length - 10);
      }
      
      localStorage.setItem('app_errors', JSON.stringify(existingErrors));
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { retryCount } = this.state;
      const maxRetries = 3;

      // Si trop de tentatives, afficher une page d'erreur plus simple
      if (retryCount >= maxRetries) {
        return (
          <div className="error-boundary-fallback">
            <div className="error-fallback-content">
              <AlertTriangle size={48} className="error-icon" />
              <h1>Application Temporairement Indisponible</h1>
              <p>Nous rencontrons des difficultés techniques. Veuillez réessayer plus tard.</p>
              <div className="error-actions">
                <button onClick={this.handleReload} className="error-button primary">
                  <RefreshCw size={16} />
                  Recharger la page
                </button>
                <button onClick={this.handleGoHome} className="error-button secondary">
                  <Home size={16} />
                  Retour à l'accueil
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Interface d'erreur avec possibilité de retry
      return (
        <div className="error-boundary">
          <div className="error-content">
            <AlertTriangle size={48} className="error-icon" />
            <h2>Oups ! Quelque chose s'est mal passé</h2>
            <p>Une erreur inattendue s'est produite. Nous nous excusons pour la gêne occasionnée.</p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Détails techniques (développement)</summary>
                <div className="error-stack">
                  <h4>Erreur:</h4>
                  <pre>{this.state.error.toString()}</pre>
                  <h4>Stack trace:</h4>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}

            <div className="error-actions">
              <button onClick={this.handleRetry} className="error-button primary">
                <RefreshCw size={16} />
                Réessayer ({retryCount}/{maxRetries})
              </button>
              <button onClick={this.handleReload} className="error-button secondary">
                <RefreshCw size={16} />
                Recharger la page
              </button>
              <button onClick={this.handleGoHome} className="error-button secondary">
                <Home size={16} />
                Retour à l'accueil
              </button>
            </div>

            <div className="error-help">
              <p>Si le problème persiste, veuillez :</p>
              <ul>
                <li>Vider le cache de votre navigateur</li>
                <li>Vérifier votre connexion internet</li>
                <li>Contacter le support technique</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;