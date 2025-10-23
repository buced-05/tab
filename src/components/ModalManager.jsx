import React, { useState } from 'react';
import { useModal } from '../contexts/ModalContext';
import QuickViewModal from './QuickViewModal';
import { productAPI } from '../services/minimalAPI';
import toast from 'react-hot-toast';

const ModalManager = () => {
  const { activeModal, modalData, closeModal } = useModal();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProduct = async (productData) => {
    setIsSaving(true);
    try {
      // Product data
      const productWithOwner = {
        ...productData,
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const response = await productAPI.addProduct(productWithOwner);
      
      if (response.data.success) {
        toast.success('🎉 Product added successfully!');
        closeModal();
        
        // Reload the page to show the new product
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'quickView':
        return (
          <QuickViewModal
            product={modalData}
            isOpen={true}
            onClose={closeModal}
          />
        );
      case 'addProduct':
        // Product addition modal removed - functionality no longer available
        return null;
      default:
        return null;
    }
  };

  return renderModal();
};

export default ModalManager;
