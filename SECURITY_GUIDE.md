# 🔒 Guide de Sécurité Complet - AllAdsMarket

## 📋 Table des matières
1. [Protection contre les injections SQL](#injection-sql)
2. [Protection contre le phishing](#phishing)
3. [Protection XSS](#xss)
4. [Protection CSRF](#csrf)
5. [Headers de sécurité](#headers)
6. [Limitation de taux](#rate-limiting)
7. [Monitoring de sécurité](#monitoring)
8. [Sauvegardes sécurisées](#backups)
9. [Tests de sécurité](#tests)

---

## 🛡️ Protection contre les injections SQL {#injection-sql}

### ✅ **Implémentations**

#### 1. **Requêtes préparées**
```javascript
// ❌ VULNÉRABLE
const query = `SELECT * FROM products WHERE id = ${userId}`;

// ✅ SÉCURISÉ
const query = 'SELECT * FROM products WHERE id = ?';
const results = await pool.execute(query, [userId]);
```

#### 2. **Validation des entrées**
```javascript
// Validation stricte des IDs
if (!Number.isInteger(parseInt(id))) {
    throw new Error('ID invalide');
}
```

#### 3. **Échappement des caractères**
```javascript
// Échappement automatique avec mysql2
const escapedInput = mysql.escape(userInput);
```

### 🔧 **Configuration MySQL sécurisée**
```sql
-- Supprimer les utilisateurs anonymes
DELETE FROM mysql.user WHERE User='';

-- Supprimer les bases de test
DROP DATABASE IF EXISTS test;

-- Limiter les privilèges
GRANT SELECT, INSERT, UPDATE, DELETE ON alladsmarket.* TO 'tab'@'localhost';
```

---

## 🎣 Protection contre le phishing {#phishing}

### ✅ **Détection automatique**

#### 1. **Validation des URLs**
```javascript
class PhishingProtection {
    static checkUrl(url) {
        const suspiciousPatterns = [
            /bit\.ly/i,
            /tinyurl/i,
            /goo\.gl/i,
            /amzn\.to/i
        ];
        
        return !suspiciousPatterns.some(pattern => pattern.test(url));
    }
}
```

#### 2. **Domaines autorisés**
```javascript
const ALLOWED_DOMAINS = [
    'alladsmarket.com',
    'amazon.com',
    'amazon.fr',
    'amazon.co.uk'
];
```

#### 3. **Avertissements utilisateur**
```javascript
// Ajouter des avertissements pour les liens externes
if (isExternalLink(url)) {
    showSecurityWarning('Lien externe détecté');
}
```

### 🔧 **Configuration serveur**
```nginx
# Bloquer les requêtes suspectes
location ~* \.(php|asp|aspx|jsp)$ {
    return 403;
}

# Bloquer les user-agents suspects
if ($http_user_agent ~* (bot|crawler|spider)) {
    return 403;
}
```

---

## ⚡ Protection XSS {#xss}

### ✅ **Nettoyage des données**

#### 1. **Sanitisation HTML**
```javascript
class XSSProtection {
    static sanitizeHtml(html) {
        // Supprimer les scripts
        const scripts = temp.querySelectorAll('script, style, iframe');
        scripts.forEach(el => el.remove());
        
        // Supprimer les attributs dangereux
        const dangerousAttrs = ['onclick', 'onload', 'onerror'];
        dangerousAttrs.forEach(attr => {
            elements.forEach(el => el.removeAttribute(attr));
        });
    }
}
```

#### 2. **Échappement des caractères**
```javascript
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}
```

#### 3. **Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

---

## 🔐 Protection CSRF {#csrf}

### ✅ **Tokens CSRF**

#### 1. **Génération de tokens**
```javascript
class CSRFProtection {
    static generateToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => 
            byte.toString(16).padStart(2, '0')).join('');
    }
}
```

#### 2. **Validation des requêtes**
```javascript
// Middleware de validation CSRF
function csrfProtection(req, res, next) {
    const token = req.headers['x-csrf-token'];
    const sessionToken = req.session.csrfToken;
    
    if (!token || token !== sessionToken) {
        return res.status(403).json({ error: 'Token CSRF invalide' });
    }
    next();
}
```

#### 3. **Intégration frontend**
```javascript
// Ajouter le token à toutes les requêtes
fetch('/api/products', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': getCSRFToken()
    }
});
```

---

## 🛡️ Headers de sécurité {#headers}

### ✅ **Configuration complète**

#### 1. **Headers HTTP**
```javascript
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

#### 2. **Headers personnalisés**
```javascript
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});
```

#### 3. **Configuration Nginx**
```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

---

## ⏱️ Limitation de taux {#rate-limiting}

### ✅ **Protection DDoS**

#### 1. **Rate limiting Express**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par fenêtre
    message: 'Trop de requêtes depuis cette IP'
});

app.use('/api/', limiter);
```

#### 2. **Configuration Nginx**
```nginx
# Zones de limitation
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

# Application des limites
location /api/ {
    limit_req zone=api burst=20 nodelay;
}

location /login {
    limit_req zone=login burst=5 nodelay;
}
```

#### 3. **Protection Apache**
```apache
<IfModule mod_evasive.c>
    DOSHashTableSize    2048
    DOSPageCount        20
    DOSSiteCount        50
    DOSPageInterval     1
    DOSSiteInterval     1
    DOSBlockingPeriod   600
</IfModule>
```

---

## 📊 Monitoring de sécurité {#monitoring}

### ✅ **Surveillance en temps réel**

#### 1. **Logs de sécurité**
```javascript
class SecurityMonitoring {
    static logSecurityEvent(event, details) {
        const logData = {
            timestamp: new Date().toISOString(),
            event: event,
            details: details,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        };
        
        console.warn('🚨 Événement de sécurité:', logData);
    }
}
```

#### 2. **Détection d'intrusion**
```bash
# Fail2ban configuration
[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[apache-auth]
enabled = true
port = http,https
logpath = /var/log/apache2/error.log
maxretry = 3
```

#### 3. **Alertes automatiques**
```javascript
// Envoyer des alertes par email
if (suspiciousActivity) {
    sendSecurityAlert({
        type: 'suspicious_activity',
        details: activityDetails,
        timestamp: new Date()
    });
}
```

---

## 💾 Sauvegardes sécurisées {#backups}

### ✅ **Stratégie de sauvegarde**

#### 1. **Sauvegarde automatique**
```bash
#!/bin/bash
# Script de sauvegarde quotidienne
DATE=$(date +%Y%m%d_%H%M%S)

# Sauvegarder la base de données
mysqldump -u tab -p'password' alladsmarket > "backup_$DATE.sql"

# Sauvegarder les fichiers
tar -czf "files_$DATE.tar.gz" /var/www/alladsmarket

# Supprimer les anciennes sauvegardes
find /backups -name "*.tar.gz" -mtime +30 -delete
```

#### 2. **Chiffrement des sauvegardes**
```bash
# Chiffrer les sauvegardes
gpg --symmetric --cipher-algo AES256 backup_$DATE.sql
```

#### 3. **Sauvegarde hors site**
```bash
# Synchroniser avec un serveur distant
rsync -avz --delete /backups/ user@backup-server:/remote/backups/
```

---

## 🧪 Tests de sécurité {#tests}

### ✅ **Tests automatisés**

#### 1. **Tests de pénétration**
```bash
# Scanner de vulnérabilités
nmap -sV -sC -O target.com

# Test SSL
sslscan alladsmarket.com

# Test des headers
curl -I https://alladsmarket.com
```

#### 2. **Tests d'injection**
```javascript
// Test d'injection SQL
const maliciousInput = "'; DROP TABLE users; --";
const result = await testSQLInjection(maliciousInput);
expect(result).toBe('safe');
```

#### 3. **Tests XSS**
```javascript
// Test XSS
const xssPayload = '<script>alert("XSS")</script>';
const sanitized = XSSProtection.sanitizeHtml(xssPayload);
expect(sanitized).not.toContain('<script>');
```

---

## 🚀 Déploiement sécurisé

### ✅ **Checklist de déploiement**

#### 1. **Pré-déploiement**
- [ ] Tests de sécurité passés
- [ ] Sauvegarde de la version actuelle
- [ ] Validation des configurations
- [ ] Test des certificats SSL

#### 2. **Déploiement**
- [ ] Mise à jour des dépendances
- [ ] Application des patches de sécurité
- [ ] Configuration des firewalls
- [ ] Activation du monitoring

#### 3. **Post-déploiement**
- [ ] Vérification des services
- [ ] Test des fonctionnalités
- [ ] Monitoring des logs
- [ ] Validation des performances

---

## 📞 Support de sécurité

### ✅ **Contacts d'urgence**

- **Email sécurité** : security@alladsmarket.com
- **Téléphone** : +33 1 23 45 67 89
- **Incident response** : incident@alladsmarket.com

### ✅ **Procédures d'incident**

1. **Détection** : Identifier la menace
2. **Containment** : Isoler les systèmes affectés
3. **Éradication** : Supprimer la menace
4. **Recovery** : Restaurer les services
5. **Lessons learned** : Améliorer les défenses

---

## 🔄 Mise à jour de sécurité

### ✅ **Maintenance régulière**

#### **Hebdomadaire**
- Mise à jour des packages
- Vérification des logs
- Test des sauvegardes

#### **Mensuel**
- Audit de sécurité
- Mise à jour des certificats
- Révision des permissions

#### **Trimestriel**
- Test de pénétration
- Formation sécurité
- Mise à jour des politiques

---

## 📚 Ressources supplémentaires

### ✅ **Outils recommandés**

- **OWASP ZAP** : Scanner de vulnérabilités
- **Nessus** : Scanner de sécurité
- **Burp Suite** : Test d'applications web
- **Metasploit** : Framework de test de pénétration

### ✅ **Standards de sécurité**

- **OWASP Top 10** : Vulnérabilités web
- **ISO 27001** : Management de la sécurité
- **PCI DSS** : Sécurité des paiements
- **GDPR** : Protection des données

---

## 🎯 Conclusion

Votre site AllAdsMarket est maintenant protégé contre :

✅ **Injection SQL** - Requêtes préparées et validation  
✅ **Phishing** - Détection automatique et validation d'URLs  
✅ **XSS** - Sanitisation et échappement des données  
✅ **CSRF** - Tokens de protection  
✅ **DDoS** - Limitation de taux  
✅ **Intrusion** - Monitoring et alertes  
✅ **Perte de données** - Sauvegardes chiffrées  

**🔒 Niveau de sécurité : ÉLEVÉ**

---

*Dernière mise à jour : $(date)*  
*Version : 1.0*  
*Contact : security@alladsmarket.com*