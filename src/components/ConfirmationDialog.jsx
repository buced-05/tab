import React from 'react';
import { AlertTriangle, X, Check, Trash2 } from 'lucide-react';

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmer', 
  cancelText = 'Annuler',
  type = 'warning',
  icon: CustomIcon,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (CustomIcon) return <CustomIcon size={24} />;
    
    switch (type) {
      case 'danger':
        return <Trash2 size={24} className="text-red-500" />;
      case 'success':
        return <Check size={24} className="text-green-500" />;
      case 'warning':
      default:
        return <AlertTriangle size={24} className="text-yellow-500" />;
    }
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          borderColor: 'border-red-200',
          buttonBg: 'bg-red-600 hover:bg-red-700',
          buttonText: 'text-white'
        };
      case 'success':
        return {
          borderColor: 'border-green-200',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          buttonText: 'text-white'
        };
      case 'warning':
      default:
        return {
          borderColor: 'border-yellow-200',
          buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
          buttonText: 'text-white'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog-backdrop" onClick={onClose}></div>
      <div className="confirmation-dialog">
        <div className={`confirmation-dialog-content ${styles.borderColor}`}>
          {/* Header */}
          <div className="confirmation-dialog-header">
            <div className="confirmation-dialog-icon">
              {getIcon()}
            </div>
            <button 
              className="confirmation-dialog-close"
              onClick={onClose}
              disabled={isLoading}
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="confirmation-dialog-body">
            <h3 className="confirmation-dialog-title">
              {title}
            </h3>
            <p className="confirmation-dialog-message">
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="confirmation-dialog-footer">
            <button
              className="confirmation-dialog-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </button>
            <button
              className={`confirmation-dialog-confirm ${styles.buttonBg} ${styles.buttonText}`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="confirmation-dialog-spinner">
                  <div className="spinner"></div>
                  <span>Chargement...</span>
                </div>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

