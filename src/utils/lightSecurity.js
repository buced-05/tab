/**
 * Light Security System
 * Provides security without blocking normal functionality
 */

// Light encryption for sensitive data
class LightSecurity {
  constructor() {
    this.initialized = false;
    this.obfuscationKey = this.generateKey();
  }

  // Generate simple obfuscation key
  generateKey() {
    return 'AllAdsMarket2024SecureKey!@#';
  }

  // Simple string obfuscation
  obfuscateString(str) {
    if (!str) return '';
    let result = '';
    const key = this.obfuscationKey;
    
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode ^ keyChar);
    }
    
    return btoa(result);
  }

  // Simple string deobfuscation
  deobfuscateString(obfuscatedStr) {
    if (!obfuscatedStr) return '';
    try {
      const decoded = atob(obfuscatedStr);
      let result = '';
      const key = this.obfuscationKey;
      
      for (let i = 0; i < decoded.length; i++) {
        const charCode = decoded.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode ^ keyChar);
      }
      
      return result;
    } catch (error) {
      console.warn('Deobfuscation failed:', error);
      return '';
    }
  }

  // Light data protection
  protectSensitiveData(data) {
    if (typeof data === 'string') {
      return this.obfuscateString(data);
    } else if (typeof data === 'object') {
      const protectedData = {};
      for (const [key, value] of Object.entries(data)) {
        if (key.includes('key') || key.includes('token') || key.includes('secret')) {
          protectedData[key] = this.obfuscateString(value);
        } else {
          protectedData[key] = value;
        }
      }
      return protectedData;
    }
    return data;
  }

  // Initialize light security
  initialize() {
    if (this.initialized) return;
    
    try {
      // Set up basic protection
      this.setupBasicProtection();
      this.initialized = true;
      console.log('🔒 Light security system initialized');
    } catch (error) {
      console.warn('Light security initialization failed:', error);
    }
  }

  // Setup basic protection
  setupBasicProtection() {
    // Protect sensitive data in localStorage
    this.protectLocalStorage();
    
    // Add decoy data
    this.addDecoyData();
    
    // Basic console protection
    this.protectConsole();
  }

  // Protect localStorage
  protectLocalStorage() {
    const sensitiveKeys = ['api_key', 'token', 'secret', 'password', 'config'];
    
    // Monitor localStorage changes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      if (sensitiveKeys.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey))) {
        // Obfuscate sensitive data
        const obfuscated = lightSecurity.obfuscateString(value);
        return originalSetItem.call(this, key, obfuscated);
      }
      return originalSetItem.call(this, key, value);
    };
  }

  // Add decoy data
  addDecoyData() {
    // Add fake configuration
    window.fakeConfig = {
      apiKey: 'fake_key_1234567890abcdef',
      token: 'fake_token_9876543210fedcba',
      secret: 'fake_secret_abcdef1234567890',
      storage: 'localStorage://fake:fake@localhost:3000/fake'
    };
    
    // Add fake functions
    window.getFakeAPIKey = () => 'fake_api_key_' + Math.random().toString(36);
    window.getFakeToken = () => 'fake_token_' + Math.random().toString(36);
  }

  // Protect console (light version)
  protectConsole() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    // Filter sensitive information
    const filterSensitive = (args) => {
      return args.map(arg => {
        if (typeof arg === 'string') {
          if (arg.includes('key') || arg.includes('token') || arg.includes('secret')) {
            return '[REDACTED]';
          }
        }
        return arg;
      });
    };
    
    console.log = function(...args) {
      originalLog.apply(console, filterSensitive(args));
    };
    
    console.warn = function(...args) {
      originalWarn.apply(console, filterSensitive(args));
    };
    
    console.error = function(...args) {
      originalError.apply(console, filterSensitive(args));
    };
  }

  // Clear sensitive data
  clearSensitiveData() {
    // Clear localStorage sensitive data
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('key') || key.includes('token') || key.includes('secret')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage sensitive data
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('key') || key.includes('token') || key.includes('secret')) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

// Initialize light security
const lightSecurity = new LightSecurity();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    lightSecurity.initialize();
  });
  
  // Clear sensitive data on unload
  window.addEventListener('beforeunload', () => {
    lightSecurity.clearSensitiveData();
  });
}

// Export light security
export { lightSecurity, LightSecurity };

// Global light security
if (typeof window !== 'undefined') {
  window.lightSecurity = lightSecurity;
}

