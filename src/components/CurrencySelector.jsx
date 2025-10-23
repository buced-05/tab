// Simple Dropdown Currency Selector
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, ChevronDown } from 'lucide-react';
import currencyService from '../utils/currency';

const CurrencySelector = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(currencyService.getCurrentCurrency());
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setAvailableCurrencies(currencyService.getAvailableCurrencies());
  }, []);

  const handleCurrencyChange = (currencyCode) => {
    if (currencyService.setCurrency(currencyCode)) {
      setCurrentCurrency(currencyCode);
      setIsOpen(false);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('currencyChanged', {
        detail: { currency: currencyCode }
      }));
    }
  };

  const currentCurrencyInfo = availableCurrencies.find(
    curr => curr.code === currentCurrency
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="currency-selector">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="currency-selector-button"
        aria-label="Select currency"
        data-cta="💱 Changer de devise"
      >
        <DollarSign size={16} className="currency-icon" />
        <span className="currency-symbol">{currentCurrencyInfo?.symbol || '$'}</span>
        <div className="currency-text">
          <span className="currency-name">{currentCurrency}</span>
          <span className="currency-code">Currency</span>
        </div>
        <ChevronDown size={16} className={`currency-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="currency-dropdown"
        >
          <div className="currency-dropdown-header">
            <h4>Select Currency</h4>
          </div>
          <div className="currency-list">
            {availableCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencyChange(currency.code)}
                className={`currency-option ${currentCurrency === currency.code ? 'active' : ''}`}
              >
                <span className="currency-symbol">{currency.symbol}</span>
                <div className="currency-info">
                  <span className="currency-name">{currency.code}</span>
                  <span className="currency-code">{currency.name}</span>
                </div>
                {currentCurrency === currency.code && (
                  <span className="check-icon">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
