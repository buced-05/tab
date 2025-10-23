import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import toast from 'react-hot-toast';
// import '../styles/error-handler.css'; // Removed unused CSS

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorHandler:', error, errorInfo);
    }

    // Show user-friendly error message
    toast.error('Une erreur inattendue s\'est produite. Veuillez réessayer.');
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-handler">
          <div className="error-container">
            <div className="error-icon">
              <AlertTriangle size={48} />
            </div>
            
            <h1 className="error-title">Oups ! Quelque chose s'est mal passé</h1>
            
            <p className="error-description">
              Une erreur inattendue s'est produite. Ne vous inquiétez pas, 
              nous travaillons pour résoudre ce problème.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Détails de l'erreur (développement)</summary>
                <pre className="error-stack">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="error-actions">
              <button 
                className="error-btn primary"
                onClick={this.handleRetry}
              >
                <RefreshCw size={18} />
                Réessayer
              </button>
              
              <button 
                className="error-btn secondary"
                onClick={this.handleGoHome}
              >
                <Home size={18} />
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorHandler;




