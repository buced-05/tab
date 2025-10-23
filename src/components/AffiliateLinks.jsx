import React, { useState, useEffect } from 'react';
import { ExternalLink, Trash2, Link, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import affiliateService from '../services/minimalAffiliate';
import { safeRedirect } from '../utils/redirectUtils';
import ConfirmationDialog from './ConfirmationDialog';

const AffiliateLinks = () => {
  const { t } = useTranslation();
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [stats, setStats] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    productId: null,
    productName: '',
    isLoading: false
  });

  useEffect(() => {
    loadAffiliateLinks();
    loadStats();
  }, []);

  const loadAffiliateLinks = () => {
    try {
      const links = affiliateService.getAllAffiliateLinks();
      setAffiliateLinks(links || []);
    } catch (error) {
      console.error('Error loading affiliate links:', error);
      setAffiliateLinks([]);
    }
  };

  const loadStats = () => {
    try {
      const affiliateStats = affiliateService.getAffiliateStats();
      setStats(affiliateStats || null);
    } catch (error) {
      console.error('Error loading affiliate stats:', error);
      setStats(null);
    }
  };

  const handleRemoveLink = (productId, productName) => {
    setConfirmationDialog({
      isOpen: true,
      productId,
      productName,
      isLoading: false
    });
  };

  const handleConfirmRemove = async () => {
    setConfirmationDialog(prev => ({ ...prev, isLoading: true }));
    
    try {
      await affiliateService.removeAffiliateLink(confirmationDialog.productId);
      loadAffiliateLinks();
      loadStats();
      setConfirmationDialog({
        isOpen: false,
        productId: null,
        productName: '',
        isLoading: false
      });
    } catch (error) {
      console.error('Error removing affiliate link:', error);
      setConfirmationDialog(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCancelRemove = () => {
    setConfirmationDialog({
      isOpen: false,
      productId: null,
      productName: '',
      isLoading: false
    });
  };

  const handleOpenLink = (affiliateUrl) => {
    // Use the robust redirect utility
    const redirectSuccess = safeRedirect(affiliateUrl, true);
    
    if (!redirectSuccess) {
      console.warn('Failed to redirect to affiliate URL:', affiliateUrl);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (affiliateLinks.length === 0) {
    return (
      <div className="visited-items-empty">
        <div className="empty-state">
          <Eye size={48} className="empty-icon" />
          <h3>{t('affiliateLinks.noVisitedItems')}</h3>
          <p>{t('affiliateLinks.noVisitedItemsDescription')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visited-items">
      <div className="visited-items-header">
        <h2>{t('affiliateLinks.title')}</h2>
        <p>{t('affiliateLinks.description')}</p>
      </div>

      <div className="visited-items-list">
        {affiliateLinks.map((link, index) => {
          // Validate link data
          if (!link || !link.productName || !link.affiliateUrl) {
            return null;
          }
          
          // Get product image from the stored data or use a fallback
          const productImage = link.productImage || `https://via.placeholder.com/60x60/f8fafc/64748b?text=${encodeURIComponent(link.productName.split(' ')[0])}`;
          
          return (
            <div key={link.productId || index} className="visited-item">
              <div className="item-image">
                <img 
                  src={productImage} 
                  alt={link.productName}
                  className="product-thumbnail"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/60x60/f8fafc/64748b?text=${encodeURIComponent(link.productName.split(' ')[0])}`;
                  }}
                />
              </div>
              <div className="item-info">
                <h3 className="item-name">{link.productName}</h3>
                <div className="affiliate-link">
                  <Link size={16} className="link-icon" />
                </div>
              </div>
              <div className="item-actions">
                <button
                  className="visit-link-btn primary"
                  onClick={() => handleOpenLink(link.affiliateUrl)}
                  title={t('affiliateLinks.visitProduct')}
                >
                  <ExternalLink size={16} />
                  {t('affiliateLinks.visitProduct')}
                </button>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveLink(link.productId, link.productName)}
                  title={t('affiliateLinks.removeItem')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Professional Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        title="Supprimer l'élément"
        message={`Êtes-vous sûr de vouloir supprimer "${confirmationDialog.productName}" de votre liste d'éléments visités ? Cette action ne peut pas être annulée.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        icon={Trash2}
        isLoading={confirmationDialog.isLoading}
      />
    </div>
  );
};

export default AffiliateLinks;
