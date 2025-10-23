/**
 * Advanced Encryption System for Sensitive Data Protection
 * Uses AES-256-GCM for maximum security
 */

// Base64 encoding utilities
const base64 = {
  encode: (str) => btoa(unescape(encodeURIComponent(str))),
  decode: (str) => decodeURIComponent(escape(atob(str)))
};

// Crypto utilities for secure operations
class SecureCrypto {
  constructor() {
    this.algorithm = 'AES-GCM';
    this.keyLength = 256;
    this.ivLength = 12;
    this.tagLength = 16;
  }

  // Generate a secure random key
  async generateKey() {
    const key = await crypto.subtle.generateKey(
      {
        name: this.algorithm,
        length: this.keyLength
      },
      true,
      ['encrypt', 'decrypt']
    );
    return key;
  }

  // Derive key from password using PBKDF2
  async deriveKey(password, salt) {
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.algorithm, length: this.keyLength },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // Encrypt sensitive data
  async encrypt(plaintext, key) {
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    const encodedText = new TextEncoder().encode(plaintext);

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: this.algorithm,
        iv: iv,
        tagLength: this.tagLength * 8
      },
      key,
      encodedText
    );

    // Combine IV and ciphertext
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(ciphertext), iv.length);

    return base64.encode(String.fromCharCode(...combined));
  }

  // Decrypt sensitive data
  async decrypt(encryptedData, key) {
    const combined = new Uint8Array(
      base64.decode(encryptedData).split('').map(char => char.charCodeAt(0))
    );

    const iv = combined.slice(0, this.ivLength);
    const ciphertext = combined.slice(this.ivLength);

    const plaintext = await crypto.subtle.decrypt(
      {
        name: this.algorithm,
        iv: iv,
        tagLength: this.tagLength * 8
      },
      key,
      ciphertext
    );

    return new TextDecoder().decode(plaintext);
  }

  // Hash sensitive data (one-way)
  async hash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Generate secure random string
  generateSecureRandom(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

// Obfuscation utilities
class CodeObfuscator {
  constructor() {
    this.obfuscationMap = new Map();
    this.counter = 0;
  }

  // Obfuscate variable names
  obfuscateName(originalName) {
    if (this.obfuscationMap.has(originalName)) {
      return this.obfuscationMap.get(originalName);
    }
    
    const obfuscated = `_0x${this.counter.toString(16).padStart(4, '0')}`;
    this.obfuscationMap.set(originalName, obfuscated);
    this.counter++;
    return obfuscated;
  }

  // Create decoy functions
  createDecoyFunctions() {
    return {
      'fakeEncrypt': () => 'fake_encrypted_data',
      'fakeDecrypt': () => 'fake_decrypted_data',
      'fakeHash': () => 'fake_hash_value',
      'dummySecurity': () => Math.random().toString(36)
    };
  }

  // String obfuscation
  obfuscateString(str) {
    return str.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ 0x42)
    ).join('');
  }

  deobfuscateString(obfuscatedStr) {
    return obfuscatedStr.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ 0x42)
    ).join('');
  }
}

// Secure data storage
class SecureStorage {
  constructor() {
    this.crypto = new SecureCrypto();
    this.obfuscator = new CodeObfuscator();
    this.sessionKey = null;
  }

  // Initialize secure session
  async initializeSession() {
    try {
      // Generate session key
      this.sessionKey = await this.crypto.generateKey();
      
      // Store encrypted session data
      const sessionData = {
        timestamp: Date.now(),
        random: this.crypto.generateSecureRandom(16),
        checksum: await this.crypto.hash(Date.now().toString())
      };

      const encryptedSession = await this.crypto.encrypt(
        JSON.stringify(sessionData),
        this.sessionKey
      );

      // Store in memory only (not localStorage)
      this._sessionData = encryptedSession;
      
      return true;
    } catch (error) {
      console.warn('Secure session initialization failed:', error);
      return false;
    }
  }

  // Encrypt sensitive data before storage
  async encryptSensitiveData(data) {
    if (!this.sessionKey) {
      await this.initializeSession();
    }

    try {
      const jsonData = JSON.stringify(data);
      return await this.crypto.encrypt(jsonData, this.sessionKey);
    } catch (error) {
      console.warn('Encryption failed:', error);
      return null;
    }
  }

  // Decrypt sensitive data
  async decryptSensitiveData(encryptedData) {
    if (!this.sessionKey) {
      return null;
    }

    try {
      const decryptedJson = await this.crypto.decrypt(encryptedData, this.sessionKey);
      return JSON.parse(decryptedJson);
    } catch (error) {
      console.warn('Decryption failed:', error);
      return null;
    }
  }

  // Secure API key storage
  async storeAPIKey(keyName, keyValue) {
    const encryptedKey = await this.encryptSensitiveData({
      name: keyName,
      value: keyValue,
      timestamp: Date.now()
    });

    if (encryptedKey) {
      // Store with obfuscated key name
      const obfuscatedKeyName = this.obfuscator.obfuscateName(keyName);
      sessionStorage.setItem(obfuscatedKeyName, encryptedKey);
      return true;
    }
    return false;
  }

  // Retrieve API key
  async getAPIKey(keyName) {
    const obfuscatedKeyName = this.obfuscator.obfuscateName(keyName);
    const encryptedKey = sessionStorage.getItem(obfuscatedKeyName);
    
    if (encryptedKey) {
      const decryptedData = await this.decryptSensitiveData(encryptedKey);
      return decryptedData ? decryptedData.value : null;
    }
    return null;
  }

  // Clear sensitive data
  clearSensitiveData() {
    // Clear session storage
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('_0x')) {
        sessionStorage.removeItem(key);
      }
    });

    // Clear memory
    this.sessionKey = null;
    this._sessionData = null;
  }
}

// Anti-debugging protection
class AntiDebugProtection {
  constructor() {
    this.debuggerDetected = false;
    this.initProtection();
  }

  initProtection() {
    // Detect DevTools
    this.detectDevTools();
    
    // Console protection
    this.protectConsole();
    
    // Source map protection
    this.protectSourceMaps();
  }

  detectDevTools() {
    let devtools = false;
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          this.onDevToolsDetected();
        }
      } else {
        devtools = false;
      }
    }, 500);
  }

  onDevToolsDetected() {
    // Clear sensitive data
    if (window.secureStorage) {
      window.secureStorage.clearSensitiveData();
    }
    
    // Show warning
    console.clear();
    console.warn('🔒 Security Alert: Developer tools detected. Sensitive data cleared.');
  }

  protectConsole() {
    // Override console methods
    const originalConsole = { ...console };
    
    ['log', 'warn', 'error', 'info', 'debug'].forEach(method => {
      console[method] = function(...args) {
        // Filter sensitive information
        const filteredArgs = args.map(arg => {
          if (typeof arg === 'string' && (
            arg.includes('key') || 
            arg.includes('token') || 
            arg.includes('secret') ||
            arg.includes('password')
          )) {
            return '[REDACTED]';
          }
          return arg;
        });
        
        originalConsole[method].apply(console, filteredArgs);
      };
    });
  }

  protectSourceMaps() {
    // Disable source maps in production
    if (process.env.NODE_ENV === 'production') {
      // Remove source map references
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (script.src.includes('.map')) {
          script.remove();
        }
      });
    }
  }
}

// Initialize security systems
const secureCrypto = new SecureCrypto();
const secureStorage = new SecureStorage();
const antiDebug = new AntiDebugProtection();

// Export secure utilities
export {
  secureCrypto,
  secureStorage,
  antiDebug,
  SecureCrypto,
  SecureStorage,
  AntiDebugProtection,
  CodeObfuscator
};

// Global security initialization
if (typeof window !== 'undefined') {
  window.secureStorage = secureStorage;
  window.secureCrypto = secureCrypto;
  
  // Initialize secure session
  secureStorage.initializeSession();
}

