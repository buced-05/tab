import React from 'react';
import { useTranslation } from 'react-i18next';
import AffiliateLinks from '../components/AffiliateLinks';
import '../styles/affiliate-links.css';

const AffiliateLinksPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="affiliate-links-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Éléments visités</h1>
          <p className="page-description">
            Affichez et gérez vos éléments visités. Ces éléments sont sauvegardés localement sur votre appareil lorsque vous cliquez sur Aperçu rapide ou Acheter maintenant.
          </p>
        </div>
        
        <AffiliateLinks />
      </div>
    </div>
  );
};

export default AffiliateLinksPage;
