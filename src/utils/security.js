/**
 * 🔒 Sécurité Frontend - AllAdsMarket
 * Protection contre XSS, CSRF, et autres attaques
 */

// Configuration de sécurité
const SECURITY_CONFIG = {
  // Domains autorisés
  ALLOWED_DOMAINS: [
    'alladsmarket.com',
    'www.alladsmarket.com',
    'localhost:3000',
    'localhost:3001'
  ],
  
  // URLs autorisées pour les liens externes
  ALLOWED_EXTERNAL_URLS: [
    'amazon.com',
    'amazon.fr',
    'amazon.co.uk',
    'amazon.de',
    'amazon.it',
    'amazon.es'
  ],
  
  // Limites de taille
  MAX_INPUT_LENGTH: 10000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Timeouts
  API_TIMEOUT: 30000, // 30 secondes
  CSRF_TOKEN_EXPIRY: 24 * 60 * 60 * 1000 // 24 heures
};

// Protection contre XSS
class XSSProtection {
  static sanitizeHtml(html) {
    if (typeof html !== 'string') return '';
    
    // Liste des balises autorisées
    const allowedTags = [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'
    ];
    
    // Créer un élément temporaire pour nettoyer le HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Supprimer les scripts et styles
    const scripts = temp.querySelectorAll('script, style, iframe, object, embed');
    scripts.forEach(el => el.remove());
    
    // Supprimer les attributs dangereux
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(el => {
      // Supprimer les attributs onclick, onload, etc.
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on') || attr.name === 'style') {
          el.removeAttribute(attr.name);
        }
      });
      
      // Nettoyer les liens
      if (el.tagName === 'A') {
        const href = el.getAttribute('href');
        if (href && !this.isValidUrl(href)) {
          el.removeAttribute('href');
        }
      }
      
      // Nettoyer les images
      if (el.tagName === 'IMG') {
        const src = el.getAttribute('src');
        if (src && !this.isValidImageUrl(src)) {
          el.removeAttribute('src');
        }
      }
    });
    
    return temp.innerHTML;
  }
  
  static sanitizeText(text) {
    if (typeof text !== 'string') return '';
    
    return text
      .replace(/[<>]/g, '') // Supprimer < et >
      .replace(/javascript:/gi, '') // Supprimer javascript:
      .replace(/on\w+\s*=/gi, '') // Supprimer les gestionnaires d'événements
      .trim();
  }
  
  static isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return SECURITY_CONFIG.ALLOWED_EXTERNAL_URLS.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
      );
    } catch {
      return false;
    }
  }
  
  static isValidImageUrl(url) {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:', 'data:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }
}

// Protection contre CSRF
class CSRFProtection {
  static generateToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  static storeToken(token) {
    const expiry = Date.now() + SECURITY_CONFIG.CSRF_TOKEN_EXPIRY;
    localStorage.setItem('csrf_token', token);
    localStorage.setItem('csrf_token_expiry', expiry.toString());
  }
  
  static getToken() {
    const token = localStorage.getItem('csrf_token');
    const expiry = localStorage.getItem('csrf_token_expiry');
    
    if (!token || !expiry || Date.now() > parseInt(expiry)) {
      return null;
    }
    
    return token;
  }
  
  static validateToken(token) {
    const storedToken = this.getToken();
    return storedToken && storedToken === token;
  }
  
  static addTokenToRequest(config) {
    const token = this.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['X-CSRF-Token'] = token;
    }
    return config;
  }
}

// Protection contre le phishing
class PhishingProtection {
  static checkUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    try {
      const urlObj = new URL(url);
      
      // Vérifier le protocole
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false;
      }
      
      // Vérifier le domaine
      const hostname = urlObj.hostname.toLowerCase();
      const isAllowed = SECURITY_CONFIG.ALLOWED_EXTERNAL_URLS.some(domain => 
        hostname === domain || hostname.endsWith('.' + domain)
      );
      
      return isAllowed;
    } catch {
      return false;
    }
  }
  
  static sanitizeUrl(url) {
    if (!this.checkUrl(url)) {
      console.warn('🚨 URL suspecte bloquée:', url);
      return null;
    }
    
    return url;
  }
  
  static addSecurityWarning(url) {
    // Ajouter un avertissement pour les liens externes
    if (this.checkUrl(url)) {
      return `${url} (Lien externe - Ouvrir avec précaution)`;
    }
    return url;
  }
}

// Validation des données d'entrée
class InputValidation {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  static validatePassword(password) {
    return password && 
           password.length >= 8 && 
           password.length <= 128 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
  }
  
  static validateText(text, minLength = 1, maxLength = SECURITY_CONFIG.MAX_INPUT_LENGTH) {
    return text && 
           typeof text === 'string' && 
           text.length >= minLength && 
           text.length <= maxLength;
  }
  
  static validateNumber(number, min = 0, max = Number.MAX_SAFE_INTEGER) {
    const num = parseFloat(number);
    return !isNaN(num) && num >= min && num <= max;
  }
  
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return XSSProtection.sanitizeText(input)
      .substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH);
  }
}

// Protection des cookies
class CookieSecurity {
  static setSecureCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    const sameSite = '; SameSite=Strict';
    const httpOnly = '; HttpOnly';
    
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/${secure}${sameSite}${httpOnly}`;
  }
  
  static getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    
    return null;
  }
  
  static deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

// Monitoring de sécurité
class SecurityMonitoring {
  static logSecurityEvent(event, details = {}) {
    const logData = {
      timestamp: new Date().toISOString(),
      event: event,
      details: details,
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer
    };
    
    console.warn('🚨 Événement de sécurité:', logData);
    
    // Envoyer au serveur si nécessaire
    if (event === 'suspicious_activity') {
      this.sendSecurityAlert(logData);
    }
  }
  
  static sendSecurityAlert(logData) {
    // Envoyer l'alerte au serveur
    fetch('/api/security/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRFProtection.getToken() || ''
      },
      body: JSON.stringify(logData)
    }).catch(error => {
      console.error('Erreur lors de l\'envoi de l\'alerte de sécurité:', error);
    });
  }
  
  static detectSuspiciousActivity() {
    // Détecter les activités suspectes
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /eval\s*\(/i,
      /document\.cookie/i
    ];
    
    // Vérifier les entrées utilisateur
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.value) {
        suspiciousPatterns.forEach(pattern => {
          if (pattern.test(input.value)) {
            this.logSecurityEvent('suspicious_input', {
              input: input.name || input.id,
              value: input.value.substring(0, 100)
            });
          }
        });
      }
    });
  }
}

// Initialisation de la sécurité
class SecurityInitializer {
  static init() {
    // Générer un token CSRF
    const csrfToken = CSRFProtection.generateToken();
    CSRFProtection.storeToken(csrfToken);
    
    // Détecter les activités suspectes
    SecurityMonitoring.detectSuspiciousActivity();
    
    // Surveiller les changements de DOM
    this.monitorDOMChanges();
    
    // Protéger contre les attaques de clavier
    this.protectKeyboardAttacks();
    
    console.log('🔒 Sécurité frontend initialisée');
  }
  
  static monitorDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Vérifier les scripts ajoutés dynamiquement
              if (node.tagName === 'SCRIPT') {
                SecurityMonitoring.logSecurityEvent('dynamic_script', {
                  src: node.src || 'inline'
                });
              }
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  static protectKeyboardAttacks() {
    let keySequence = '';
    const suspiciousKeys = ['F12', 'Ctrl+Shift+I', 'Ctrl+U', 'Ctrl+S'];
    
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;
      
      let keyCombo = key;
      if (ctrl) keyCombo = 'Ctrl+' + keyCombo;
      if (shift) keyCombo = 'Shift+' + keyCombo;
      
      if (suspiciousKeys.includes(keyCombo)) {
        SecurityMonitoring.logSecurityEvent('suspicious_keyboard', {
          keyCombo: keyCombo
        });
      }
    });
  }
}

// Export des classes de sécurité
export {
  XSSProtection,
  CSRFProtection,
  PhishingProtection,
  InputValidation,
  CookieSecurity,
  SecurityMonitoring,
  SecurityInitializer,
  SECURITY_CONFIG
};

// Initialiser automatiquement la sécurité
if (typeof window !== 'undefined') {
  SecurityInitializer.init();
}
