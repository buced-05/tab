import React, { useState } from 'react';
import { DollarSign, Star, ExternalLink, Play } from 'lucide-react';
import InvitationDialog from './InvitationDialog';
import '../styles/invitation-dialog.css';

const DialogDemo = () => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'price',
    product: null
  });

  const sampleProduct = {
    name: "iPhone 15 Pro Max - 256GB - Titane Naturel",
    affiliateUrl: "https://amzn.to/4hocaio",
    price: 1299,
    rating: { average: 4.8, count: 15420 }
  };

  const openDialog = (type) => {
    setDialogState({
      isOpen: true,
      type,
      product: sampleProduct
    });
  };

  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      type: 'price',
      product: null
    });
  };

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem'
    }}>
      <h1 style={{ 
        color: 'white', 
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        🎉 Démonstration des Boîtes de Dialogue Popup
      </h1>
      
      <p style={{ 
        color: 'rgba(255,255,255,0.9)', 
        fontSize: '1.2rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Cliquez sur les boutons ci-dessous pour voir les différentes boîtes de dialogue d'invitation
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => openDialog('price')}
          style={{
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.4)';
          }}
        >
          <DollarSign size={20} />
          Voir le Prix
        </button>

        <button
          onClick={() => openDialog('reviews')}
          style={{
            background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(255, 193, 7, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 193, 7, 0.4)';
          }}
        >
          <Star size={20} />
          Voir les Avis
        </button>

        <button
          onClick={() => openDialog('product')}
          style={{
            background: 'linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 15px rgba(111, 66, 193, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(111, 66, 193, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(111, 66, 193, 0.4)';
          }}
        >
          <ExternalLink size={20} />
          Voir le Produit
        </button>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '1.5rem',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'white', marginBottom: '1rem' }}>
          ✨ Fonctionnalités des Popups
        </h3>
        <ul style={{ 
          color: 'rgba(255,255,255,0.9)', 
          textAlign: 'left',
          lineHeight: '1.6'
        }}>
          <li>🎨 Design ultra-moderne avec animations 3D</li>
          <li>🌈 Gradients colorés et effets de brillance</li>
          <li>📱 Responsive et adaptatif mobile</li>
          <li>⚡ Animations fluides et transitions</li>
          <li>🔒 Messages de sécurité intégrés</li>
          <li>🎯 Appels à l'action optimisés</li>
        </ul>
      </div>

      {/* Boîte de dialogue */}
      {dialogState.product && (
        <InvitationDialog
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          type={dialogState.type}
          productName={dialogState.product.name}
          affiliateUrl={dialogState.product.affiliateUrl}
          price={dialogState.product.price}
          rating={dialogState.product.rating.average}
          reviewCount={dialogState.product.rating.count}
        />
      )}
    </div>
  );
};

export default DialogDemo;
