/**
 * Anti-Tampering Protection System
 * Prevents reverse engineering and code modification
 */

// Anti-debugging protection
class AntiDebuggingProtection {
  constructor() {
    this.debuggerDetected = false;
    this.tamperAttempts = 0;
    this.maxAttempts = 3;
    this.initProtection();
  }

  initProtection() {
    // Detect DevTools
    this.detectDevTools();
    
    // Console protection
    this.protectConsole();
    
    // Function protection
    this.protectFunctions();
    
    // Source map protection
    this.protectSourceMaps();
    
    // Memory protection
    this.protectMemory();
  }

  // Detect DevTools
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

    // Additional DevTools detection
    let devtoolsOpen = false;
    const checkDevTools = () => {
      const start = performance.now();
      debugger;
      const end = performance.now();
      
      if (end - start > 100) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          this.onDevToolsDetected();
        }
      } else {
        devtoolsOpen = false;
      }
    };

    setInterval(checkDevTools, 1000);
  }

  // Handle DevTools detection
  onDevToolsDetected() {
    this.debuggerDetected = true;
    this.tamperAttempts++;
    
    if (this.tamperAttempts > this.maxAttempts) {
      // Clear sensitive data
      this.clearSensitiveData();
      
      // Show warning
      console.clear();
      console.warn('🔒 Security Alert: Developer tools detected. Access denied.');
      
      // Redirect to security page
      setTimeout(() => {
        window.location.href = '/security-warning';
      }, 2000);
    } else {
      console.warn('🔒 Security Alert: Developer tools detected. Attempt ' + this.tamperAttempts + '/' + this.maxAttempts);
    }
  }

  // Protect console
  protectConsole() {
    const originalConsole = { ...console };
    
    // Override console methods
    ['log', 'warn', 'error', 'info', 'debug', 'trace', 'table', 'group', 'groupEnd'].forEach(method => {
      console[method] = function(...args) {
        // Filter sensitive information
        const filteredArgs = args.map(arg => {
          if (typeof arg === 'string' && (
            arg.includes('key') || 
            arg.includes('token') || 
            arg.includes('secret') ||
            arg.includes('password') ||
            arg.includes('api') ||
            arg.includes('config')
          )) {
            return '[REDACTED]';
          }
          return arg;
        });
        
        originalConsole[method].apply(console, filteredArgs);
      };
    });

    // Protect console object
    Object.freeze(console);
  }

  // Protect functions
  protectFunctions() {
    // Protect eval
    const originalEval = window.eval;
    window.eval = function(code) {
      // Block dangerous eval operations
      if (code.includes('debugger') || 
          code.includes('console') || 
          code.includes('window') ||
          code.includes('document') ||
          code.includes('localStorage') ||
          code.includes('sessionStorage')) {
        console.warn('🔒 Security Alert: Dangerous eval operation blocked.');
        return undefined;
      }
      return originalEval.call(this, code);
    };

    // Protect Function constructor
    const originalFunction = window.Function;
    window.Function = function(...args) {
      const code = args[args.length - 1];
      if (code.includes('debugger') || 
          code.includes('console') || 
          code.includes('window') ||
          code.includes('document')) {
        console.warn('🔒 Security Alert: Dangerous Function constructor blocked.');
        return function() { return undefined; };
      }
      return originalFunction.apply(this, args);
    };
  }

  // Protect source maps
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
      
      // Remove source map comments
      const styleSheets = document.querySelectorAll('style');
      styleSheets.forEach(style => {
        style.textContent = style.textContent.replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
      });
    }
  }

  // Protect memory
  protectMemory() {
    // Clear sensitive data periodically
    setInterval(() => {
      if (this.debuggerDetected) {
        this.clearSensitiveData();
      }
    }, 5000);

    // Monitor memory usage
    if (performance.memory) {
      setInterval(() => {
        const memoryUsage = performance.memory.usedJSHeapSize;
        if (memoryUsage > 100 * 1024 * 1024) { // 100MB
          console.warn('🔒 Security Alert: High memory usage detected.');
          this.clearSensitiveData();
        }
      }, 10000);
    }
  }

  // Clear sensitive data
  clearSensitiveData() {
    // Clear localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('key') || 
          key.includes('token') || 
          key.includes('secret') ||
          key.includes('config')) {
        localStorage.removeItem(key);
      }
    });

    // Clear sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('key') || 
          key.includes('token') || 
          key.includes('secret') ||
          key.includes('config')) {
        sessionStorage.removeItem(key);
      }
    });

    // Clear secure storage
    if (window.secureStorage) {
      window.secureStorage.clearSensitiveData();
    }

    // Clear secure configuration
    if (window.secureConfigManager) {
      window.secureConfigManager.clearSecureConfig();
    }
  }
}

// Code integrity protection
class CodeIntegrityProtection {
  constructor() {
    this.originalFunctions = new Map();
    this.integrityChecks = new Map();
    this.initProtection();
  }

  initProtection() {
    // Protect critical functions
    this.protectCriticalFunctions();
    
    // Set up integrity checks
    this.setupIntegrityChecks();
    
    // Monitor for tampering
    this.monitorTampering();
  }

  // Protect critical functions
  protectCriticalFunctions() {
    const criticalFunctions = [
      'fetch',
      'XMLHttpRequest',
      'localStorage',
      'sessionStorage',
      'crypto',
      'btoa',
      'atob'
    ];

    criticalFunctions.forEach(funcName => {
      if (window[funcName]) {
        this.originalFunctions.set(funcName, window[funcName]);
        
        // Create protected version
        const originalFunc = window[funcName];
        window[funcName] = function(...args) {
          // Check if function has been tampered with
          if (this.isFunctionTampered(funcName)) {
            console.warn('🔒 Security Alert: Function tampering detected:', funcName);
            return undefined;
          }
          
          return originalFunc.apply(this, args);
        };
      }
    });
  }

  // Check if function has been tampered with
  isFunctionTampered(funcName) {
    const originalFunc = this.originalFunctions.get(funcName);
    if (!originalFunc) return false;
    
    // Compare function signatures
    const currentFunc = window[funcName];
    return currentFunc.toString() !== originalFunc.toString();
  }

  // Setup integrity checks
  setupIntegrityChecks() {
    // Check critical objects
    this.integrityChecks.set('window', this.createIntegrityCheck('window'));
    this.integrityChecks.set('document', this.createIntegrityCheck('document'));
    this.integrityChecks.set('console', this.createIntegrityCheck('console'));
  }

  // Create integrity check
  createIntegrityCheck(objName) {
    const obj = window[objName];
    if (!obj) return null;
    
    const originalKeys = Object.keys(obj);
    const originalDescriptors = {};
    
    originalKeys.forEach(key => {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);
      if (descriptor) {
        originalDescriptors[key] = descriptor;
      }
    });
    
    return () => {
      const currentKeys = Object.keys(obj);
      if (currentKeys.length !== originalKeys.length) {
        return false;
      }
      
      for (const key of originalKeys) {
        const currentDescriptor = Object.getOwnPropertyDescriptor(obj, key);
        const originalDescriptor = originalDescriptors[key];
        
        if (currentDescriptor && originalDescriptor) {
          if (currentDescriptor.value !== originalDescriptor.value ||
              currentDescriptor.writable !== originalDescriptor.writable ||
              currentDescriptor.enumerable !== originalDescriptor.enumerable ||
              currentDescriptor.configurable !== originalDescriptor.configurable) {
            return false;
          }
        }
      }
      
      return true;
    };
  }

  // Monitor for tampering
  monitorTampering() {
    setInterval(() => {
      for (const [objName, check] of this.integrityChecks) {
        if (check && !check()) {
          console.warn('🔒 Security Alert: Object tampering detected:', objName);
          this.onTamperingDetected();
        }
      }
    }, 1000);
  }

  // Handle tampering detection
  onTamperingDetected() {
    // Clear sensitive data
    if (window.secureStorage) {
      window.secureStorage.clearSensitiveData();
    }
    
    // Show warning
    console.clear();
    console.warn('🔒 Security Alert: Code tampering detected. Access denied.');
    
    // Redirect to security page
    setTimeout(() => {
      window.location.href = '/security-warning';
    }, 2000);
  }
}

// Runtime protection
class RuntimeProtection {
  constructor() {
    this.protectedObjects = new Map();
    this.initProtection();
  }

  initProtection() {
    // Protect global objects
    this.protectGlobalObjects();
    
    // Protect DOM manipulation
    this.protectDOMManipulation();
    
    // Protect network requests
    this.protectNetworkRequests();
  }

  // Protect global objects
  protectGlobalObjects() {
    const globalObjects = ['window', 'document', 'navigator', 'location'];
    
    globalObjects.forEach(objName => {
      const obj = window[objName];
      if (obj) {
        this.protectedObjects.set(objName, obj);
        
        // Freeze object
        Object.freeze(obj);
        
        // Protect properties
        Object.keys(obj).forEach(key => {
          const descriptor = Object.getOwnPropertyDescriptor(obj, key);
          if (descriptor && descriptor.configurable) {
            Object.defineProperty(obj, key, {
              ...descriptor,
              configurable: false,
              writable: false
            });
          }
        });
      }
    });
  }

  // Protect DOM manipulation
  protectDOMManipulation() {
    // Protect critical DOM methods
    const criticalMethods = [
      'appendChild',
      'removeChild',
      'insertBefore',
      'replaceChild',
      'setAttribute',
      'removeAttribute'
    ];
    
    criticalMethods.forEach(method => {
      if (Element.prototype[method]) {
        const originalMethod = Element.prototype[method];
        Element.prototype[method] = function(...args) {
          // Check for suspicious DOM manipulation
          if (args.some(arg => 
            typeof arg === 'string' && (
              arg.includes('script') ||
              arg.includes('iframe') ||
              arg.includes('object') ||
              arg.includes('embed')
            )
          )) {
            console.warn('🔒 Security Alert: Suspicious DOM manipulation blocked.');
            return undefined;
          }
          
          return originalMethod.apply(this, args);
        };
      }
    });
  }

  // Protect network requests
  protectNetworkRequests() {
    // Protect fetch
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
      // Check for suspicious URLs
      if (typeof url === 'string' && (
        url.includes('localhost') ||
        url.includes('127.0.0.1') ||
        url.includes('file://') ||
        url.includes('data:')
      )) {
        console.warn('🔒 Security Alert: Suspicious network request blocked.');
        return Promise.reject(new Error('Request blocked'));
      }
      
      return originalFetch.call(this, url, options);
    };
    
    // Protect XMLHttpRequest
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
      const xhr = new originalXHR();
      const originalOpen = xhr.open;
      
      xhr.open = function(method, url, ...args) {
        // Check for suspicious URLs
        if (typeof url === 'string' && (
          url.includes('localhost') ||
          url.includes('127.0.0.1') ||
          url.includes('file://') ||
          url.includes('data:')
        )) {
          console.warn('🔒 Security Alert: Suspicious XHR request blocked.');
          throw new Error('Request blocked');
        }
        
        return originalOpen.call(this, method, url, ...args);
      };
      
      return xhr;
    };
  }
}

// Initialize protection systems
const antiDebugging = new AntiDebuggingProtection();
const codeIntegrity = new CodeIntegrityProtection();
const runtimeProtection = new RuntimeProtection();

// Export protection utilities
export {
  antiDebugging,
  codeIntegrity,
  runtimeProtection,
  AntiDebuggingProtection,
  CodeIntegrityProtection,
  RuntimeProtection
};

// Global protection initialization
if (typeof window !== 'undefined') {
  window.antiDebugging = antiDebugging;
  window.codeIntegrity = codeIntegrity;
  window.runtimeProtection = runtimeProtection;
}

