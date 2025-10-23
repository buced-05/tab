/**
 * Secure Configuration System
 * Protects sensitive configuration from inspection
 */

import { secureStorage, secureCrypto } from '../utils/crypto.js';

// Obfuscated configuration keys
const OBFUSCATED_KEYS = {
  'API_BASE_URL': '0x1a2b3c4d',
  'AFFILIATE_API_KEY': '0x5e6f7g8h',
  'ANALYTICS_TOKEN': '0x9i0j1k2l',
  'PAYMENT_KEY': '0xm2n3o4p',
  'ENCRYPTION_KEY': '0xq5r6s7t',
  'STORAGE_URL': '0xu8v9w0x',
  'STRIPE_PUBLIC_KEY': '0xy1z2a3b',
  'STRIPE_SECRET_KEY': '0xc4d5e6f7',
  'AWS_ACCESS_KEY': '0xg8h9i0j',
  'AWS_SECRET_KEY': '0xk1l2m3n',
  'GOOGLE_ANALYTICS_ID': '0xo4p5q6r',
  'FACEBOOK_PIXEL_ID': '0xs7t8u9v'
};

// Obfuscated configuration values
const OBFUSCATED_VALUES = {
  '0x1a2b3c4d': 'aHR0cHM6Ly9hcGkuYWxsYWRzbWFya2V0LmNvbS8=', // Base64 encoded API URL
  '0x5e6f7g8h': 'c2tfbGl2ZV81MUg4eDlLMkwyTTRONU81UDdROFJ5OVMwVDFVMlYzVzRYNVk2WjdBOEI5QzBEMUVGMkc0SDVJNkpLN0w5TTBOMU8yUDNRNFI1UzZUNVVWNlY5VzBYMVkyWjM=', // Base64 encoded API key
  '0x9i0j1k2l': 'YW5hbHl0aWNzX3Rva2VuXzEyMzQ1Njc4OTBhYmNkZWY=', // Base64 encoded analytics token
  '0xm2n3o4p': 'cGtfbGl2ZV81MUg4eDlLMkwyTTRONU81UDdROFJ5OVMwVDFVMlYzVzRYNVk2WjdBOEI5QzBEMUVGMkc0SDVJNkpLN0w5TTBOMU8yUDNRNFI1UzZUNVVWNlY5VzBYMVkyWjM=', // Base64 encoded payment key
  '0xq5r6s7t': 'ZW5jX2tleV85ODc2NTQzMjEwZmVkY2Jh', // Base64 encoded encryption key
  '0xu8v9w0x': 'bG9jYWxTdG9yYWdlOi8vZmFrZTpmYWtlQGxvY2FsaG9zdDozMDAwL2Zha2Vfc3RvcmFnZQ==', // Base64 encoded storage URL
  '0xy1z2a3b': 'cGtfbGl2ZV81MUg4eDlLMkwyTTRONU81UDdROFJ5OVMwVDFVMlYzVzRYNVk2WjdBOEI5QzBEMUVGMkc0SDVJNkpLN0w5TTBOMU8yUDNRNFI1UzZUNVVWNlY5VzBYMVkyWjM=', // Base64 encoded Stripe public key
  '0xc4d5e6f7': 'c2tfbGl2ZV81MUg4eDlLMkwyTTRONU81UDdROFJ5OVMwVDFVMlYzVzRYNVk2WjdBOEI5QzBEMUVGMkc0SDVJNkpLN0w5TTBOMU8yUDNRNFI1UzZUNVVWNlY5VzBYMVkyWjM=', // Base64 encoded Stripe secret key
  '0xg8h9i0j': 'QUtJQUlPU0ZPRE5ON0VYQU1QTEU=', // Base64 encoded AWS access key
  '0xk1l2m3n': 'd0phbHJYVXRuRkVNSS9LN01ERU5HL2JQeFJmaUNZRVhBTVBMRUtFWS=', // Base64 encoded AWS secret key
  '0xo4p5q6r': 'R0EtMTIzNDU2Nzg5LTE=', // Base64 encoded Google Analytics ID
  '0xs7t8u9v': 'MTIzNDU2Nzg5MDEyMzQ1Ng==' // Base64 encoded Facebook Pixel ID
};

// Secure configuration manager
class SecureConfigManager {
  constructor() {
    this.config = new Map();
    this.initialized = false;
    this.decoyConfig = this.createDecoyConfig();
  }

  // Initialize secure configuration
  async initialize() {
    try {
      // Decode obfuscated values
      await this.decodeObfuscatedValues();
      
      // Set up decoy configuration
      this.setupDecoyConfig();
      
      // Initialize anti-tampering
      this.setupAntiTampering();
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.warn('Secure configuration initialization failed:', error);
      return false;
    }
  }

  // Decode obfuscated configuration values
  async decodeObfuscatedValues() {
    for (const [key, obfuscatedKey] of Object.entries(OBFUSCATED_KEYS)) {
      const obfuscatedValue = OBFUSCATED_VALUES[obfuscatedKey];
      if (obfuscatedValue) {
        try {
          // Decode base64
          const decodedValue = atob(obfuscatedValue);
          
          // Encrypt the decoded value
          const encryptedValue = await secureStorage.encryptSensitiveData({
            key: key,
            value: decodedValue,
            timestamp: Date.now(),
            checksum: await secureCrypto.hash(decodedValue)
          });
          
          if (encryptedValue) {
            this.config.set(key, encryptedValue);
          }
        } catch (error) {
          console.warn(`Failed to decode configuration for key: ${key}`, error);
        }
      }
    }
  }

  // Create decoy configuration
  createDecoyConfig() {
    return {
      'API_BASE_URL': 'https://fake-api.example.com/',
      'AFFILIATE_API_KEY': 'fake_key_1234567890abcdef',
      'ANALYTICS_TOKEN': 'fake_analytics_token_9876543210',
      'PAYMENT_KEY': 'pk_test_fake1234567890abcdef',
      'ENCRYPTION_KEY': 'fake_encryption_key_abcdef123456',
      'STORAGE_URL': 'localStorage://fake:fake@localhost:3000/fake_storage',
      'STRIPE_PUBLIC_KEY': 'pk_test_fake1234567890abcdef',
      'STRIPE_SECRET_KEY': 'sk_test_fake1234567890abcdef',
      'AWS_ACCESS_KEY': 'AKIAFAKE1234567890EXAMPLE',
      'AWS_SECRET_KEY': 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYFAKEKEY',
      'GOOGLE_ANALYTICS_ID': 'GA-FAKE-123456789-1',
      'FACEBOOK_PIXEL_ID': '1234567890123456'
    };
  }

  // Setup decoy configuration
  setupDecoyConfig() {
    // Add decoy configuration to global scope
    window.config = this.decoyConfig;
    window.API_CONFIG = this.decoyConfig;
    window.DATABASE_CONFIG = {
      host: 'fake-server.com',
      port: 5432,
      username: 'fake_user',
      password: 'fake_password',
      storage: 'fake_storage'
    };
    
    // Create fake functions
    window.getConfig = (key) => this.decoyConfig[key] || 'fake_value';
    window.getAPIKey = (key) => this.decoyConfig[key] || 'fake_key';
    window.getDatabaseConfig = () => window.DATABASE_CONFIG;
  }

  // Setup anti-tampering protection
  setupAntiTampering() {
    // Protect configuration objects
    Object.freeze(window.config);
    Object.freeze(window.API_CONFIG);
    Object.freeze(window.DATABASE_CONFIG);
    
    // Protect functions
    Object.freeze(window.getConfig);
    Object.freeze(window.getAPIKey);
    Object.freeze(window.getDatabaseConfig);
    
    // Monitor for configuration access attempts
    let accessAttempts = 0;
    const maxAttempts = 5;
    
    const originalGetConfig = window.getConfig;
    window.getConfig = function(key) {
      accessAttempts++;
      if (accessAttempts > maxAttempts) {
        console.warn('🔒 Security Alert: Excessive configuration access attempts detected.');
        return 'ACCESS_DENIED';
      }
      return originalGetConfig.call(this, key);
    };
  }

  // Get secure configuration value
  async getSecureConfig(key) {
    if (!this.initialized) {
      await this.initialize();
    }

    const encryptedValue = this.config.get(key);
    if (encryptedValue) {
      const decryptedData = await secureStorage.decryptSensitiveData(encryptedValue);
      return decryptedData ? decryptedData.value : null;
    }
    return null;
  }

  // Get API key securely
  async getAPIKey(keyName) {
    return await this.getSecureConfig(keyName);
  }

  // Get storage configuration securely
  async getStorageConfig() {
    const config = {};
    const storageKeys = ['STORAGE_URL'];
    
    for (const key of storageKeys) {
      const value = await this.getSecureConfig(key);
      if (value) {
        config[key.toLowerCase()] = value;
      }
    }
    
    return config;
  }

  // Validate configuration integrity
  async validateConfigIntegrity() {
    for (const [key, encryptedValue] of this.config) {
      const decryptedData = await secureStorage.decryptSensitiveData(encryptedValue);
      if (decryptedData) {
        const currentChecksum = await secureCrypto.hash(decryptedData.value);
        if (currentChecksum !== decryptedData.checksum) {
          console.warn(`Configuration integrity check failed for key: ${key}`);
          return false;
        }
      }
    }
    return true;
  }

  // Clear secure configuration
  clearSecureConfig() {
    this.config.clear();
    this.initialized = false;
    
    // Clear decoy configuration
    delete window.config;
    delete window.API_CONFIG;
    delete window.STORAGE_CONFIG;
    delete window.getConfig;
    delete window.getAPIKey;
    delete window.getStorageConfig;
  }
}

// Initialize secure configuration manager
const secureConfigManager = new SecureConfigManager();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    secureConfigManager.initialize();
  });
  
  // Clear secure configuration on unload
  window.addEventListener('beforeunload', () => {
    secureConfigManager.clearSecureConfig();
  });
}

// Export secure configuration utilities
export {
  secureConfigManager,
  SecureConfigManager,
  OBFUSCATED_KEYS,
  OBFUSCATED_VALUES
};

// Global secure configuration initialization
if (typeof window !== 'undefined') {
  window.secureConfigManager = secureConfigManager;
}

