/**
 * Advanced Code Obfuscation System
 * Protects JavaScript code from reverse engineering
 */

// Advanced string obfuscation
class StringObfuscator {
  constructor() {
    this.obfuscationKey = this.generateObfuscationKey();
    this.stringMap = new Map();
  }

  generateObfuscationKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // XOR obfuscation
  xorObfuscate(str) {
    const key = this.obfuscationKey;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(
        str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result);
  }

  // XOR deobfuscate
  xorDeobfuscate(obfuscatedStr) {
    const key = this.obfuscationKey;
    const str = atob(obfuscatedStr);
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += String.fromCharCode(
        str.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }

  // ROT13 with custom offset
  rotObfuscate(str, offset = 13) {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + offset) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + offset) % 26) + 97);
      }
      return char;
    }).join('');
  }

  // Base64 with custom encoding
  customBase64Encode(str) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    let i = 0;
    
    while (i < str.length) {
      const a = str.charCodeAt(i++);
      const b = i < str.length ? str.charCodeAt(i++) : 0;
      const c = i < str.length ? str.charCodeAt(i++) : 0;
      
      const bitmap = (a << 16) | (b << 8) | c;
      
      result += chars.charAt((bitmap >> 18) & 63);
      result += chars.charAt((bitmap >> 12) & 63);
      result += i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
      result += i - 1 < str.length ? chars.charAt(bitmap & 63) : '=';
    }
    
    return result;
  }
}

// Function obfuscation
class FunctionObfuscator {
  constructor() {
    this.functionMap = new Map();
    this.counter = 0;
  }

  // Obfuscate function names
  obfuscateFunctionName(originalName) {
    if (this.functionMap.has(originalName)) {
      return this.functionMap.get(originalName);
    }
    
    const obfuscated = `_0x${this.counter.toString(16).padStart(6, '0')}`;
    this.functionMap.set(originalName, obfuscated);
    this.counter++;
    return obfuscated;
  }

  // Create decoy functions
  createDecoyFunctions() {
    return {
      'fakeEncrypt': () => 'fake_encrypted_data_' + Math.random().toString(36),
      'fakeDecrypt': () => 'fake_decrypted_data_' + Math.random().toString(36),
      'fakeHash': () => 'fake_hash_' + Math.random().toString(36),
      'dummySecurity': () => Math.random().toString(36),
      'mockAPI': () => Promise.resolve({ success: false, data: null }),
      'fakeValidation': () => Math.random() > 0.5,
      'dummyCrypto': () => 'dummy_crypto_' + Math.random().toString(36)
    };
  }

  // Wrap functions with obfuscation
  obfuscateFunction(func, obfuscatedName) {
    const wrapper = function(...args) {
      // Add anti-debugging
      if (new Date().getTime() % 1000 < 100) {
        console.clear();
      }
      
      return func.apply(this, args);
    };
    
    Object.defineProperty(wrapper, 'name', {
      value: obfuscatedName,
      writable: false
    });
    
    return wrapper;
  }
}

// Variable obfuscation
class VariableObfuscator {
  constructor() {
    this.variableMap = new Map();
    this.counter = 0;
  }

  // Obfuscate variable names
  obfuscateVariableName(originalName) {
    if (this.variableMap.has(originalName)) {
      return this.variableMap.get(originalName);
    }
    
    const obfuscated = `_0x${this.counter.toString(16).padStart(4, '0')}`;
    this.variableMap.set(originalName, obfuscated);
    this.counter++;
    return obfuscated;
  }

  // Create decoy variables
  createDecoyVariables() {
    return {
      'fakeAPIKey': 'fake_key_' + Math.random().toString(36),
      'fakeToken': 'fake_token_' + Math.random().toString(36),
      'fakePassword': 'fake_password_' + Math.random().toString(36),
      'fakeStorageURL': 'localStorage://fake:fake@localhost:3000/fake',
      'fakeStripeKey': 'pk_test_fake_' + Math.random().toString(36),
      'fakeAWSKey': 'AKIAFAKE' + Math.random().toString(36).toUpperCase(),
      'fakeConfig': {
        'host': 'fake-server.com',
        'port': 8080,
        'username': 'fake_user',
        'password': 'fake_password'
      }
    };
  }
}

// Control flow obfuscation
class ControlFlowObfuscator {
  constructor() {
    this.obfuscationMap = new Map();
  }

  // Obfuscate control flow with fake conditions
  obfuscateCondition(condition, trueValue, falseValue) {
    const obfuscatedCondition = this.obfuscateBoolean(condition);
    return obfuscatedCondition ? trueValue : falseValue;
  }

  // Obfuscate boolean values
  obfuscateBoolean(value) {
    const random = Math.random();
    return value ? (random > 0.1) : (random < 0.1);
  }

  // Create fake control flow
  createFakeControlFlow() {
    return {
      'fakeIf': (condition) => {
        const fakeCondition = Math.random() > 0.5;
        return fakeCondition ? 'fake_result' : 'another_fake_result';
      },
      'fakeSwitch': (value) => {
        const fakeValue = Math.random();
        switch (fakeValue) {
          case 0.1: return 'fake_case_1';
          case 0.2: return 'fake_case_2';
          case 0.3: return 'fake_case_3';
          default: return 'fake_default';
        }
      },
      'fakeLoop': (iterations) => {
        const fakeIterations = Math.floor(Math.random() * 10);
        let result = '';
        for (let i = 0; i < fakeIterations; i++) {
          result += 'fake_iteration_' + i;
        }
        return result;
      }
    };
  }
}

// Main obfuscation manager
class CodeObfuscationManager {
  constructor() {
    this.stringObfuscator = new StringObfuscator();
    this.functionObfuscator = new FunctionObfuscator();
    this.variableObfuscator = new VariableObfuscator();
    this.controlFlowObfuscator = new ControlFlowObfuscator();
    this.initialized = false;
  }

  // Initialize obfuscation system
  initialize() {
    try {
      // Set up decoy functions
      this.setupDecoyFunctions();
      
      // Set up decoy variables
      this.setupDecoyVariables();
      
      // Set up fake control flow
      this.setupFakeControlFlow();
      
      // Protect against debugging
      this.setupAntiDebugging();
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.warn('Code obfuscation initialization failed:', error);
      return false;
    }
  }

  // Setup decoy functions
  setupDecoyFunctions() {
    const decoyFunctions = this.functionObfuscator.createDecoyFunctions();
    
    // Add to global scope
    Object.assign(window, decoyFunctions);
    
    // Add to console
    Object.assign(console, decoyFunctions);
  }

  // Setup decoy variables
  setupDecoyVariables() {
    const decoyVariables = this.variableObfuscator.createDecoyVariables();
    
    // Add to global scope
    Object.assign(window, decoyVariables);
    
    // Create fake configuration objects
    window.config = decoyVariables.fakeConfig;
    window.apiKeys = decoyVariables;
    window.storageConfig = decoyVariables.fakeConfig;
  }

  // Setup fake control flow
  setupFakeControlFlow() {
    const fakeControlFlow = this.controlFlowObfuscator.createFakeControlFlow();
    
    // Add to global scope
    Object.assign(window, fakeControlFlow);
  }

  // Setup anti-debugging protection
  setupAntiDebugging() {
    // Detect DevTools
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

    // Console protection
    const originalConsole = { ...console };
    Object.freeze(console);
    
    // Function protection
    const originalEval = window.eval;
    window.eval = function(code) {
      // Block dangerous eval operations
      if (code.includes('debugger') || code.includes('console')) {
        return undefined;
      }
      return originalEval.call(this, code);
    };
  }

  // Handle DevTools detection
  onDevToolsDetected() {
    // Clear sensitive data
    if (window.secureStorage) {
      window.secureStorage.clearSensitiveData();
    }
    
    // Show warning
    console.clear();
    console.warn('🔒 Security Alert: Developer tools detected.');
    
    // Redirect to safe page
    setTimeout(() => {
      window.location.href = '/security-warning';
    }, 2000);
  }

  // Obfuscate sensitive strings
  obfuscateString(str) {
    return this.stringObfuscator.xorObfuscate(str);
  }

  // Deobfuscate strings
  deobfuscateString(obfuscatedStr) {
    return this.stringObfuscator.xorDeobfuscate(obfuscatedStr);
  }

  // Obfuscate function
  obfuscateFunction(func, obfuscatedName) {
    return this.functionObfuscator.obfuscateFunction(func, obfuscatedName);
  }

  // Obfuscate variable
  obfuscateVariable(originalName) {
    return this.variableObfuscator.obfuscateVariableName(originalName);
  }

  // Clear obfuscation data
  clearObfuscationData() {
    this.stringObfuscator.stringMap.clear();
    this.functionObfuscator.functionMap.clear();
    this.variableObfuscator.variableMap.clear();
    this.controlFlowObfuscator.obfuscationMap.clear();
  }
}

// Initialize obfuscation manager
const codeObfuscationManager = new CodeObfuscationManager();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    codeObfuscationManager.initialize();
  });
  
  // Clear obfuscation data on unload
  window.addEventListener('beforeunload', () => {
    codeObfuscationManager.clearObfuscationData();
  });
}

// Export obfuscation utilities
export {
  codeObfuscationManager,
  CodeObfuscationManager,
  StringObfuscator,
  FunctionObfuscator,
  VariableObfuscator,
  ControlFlowObfuscator
};

// Global obfuscation initialization
if (typeof window !== 'undefined') {
  window.codeObfuscationManager = codeObfuscationManager;
}

