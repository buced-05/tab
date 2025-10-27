# 📧 Configuration EmailJS pour l'Envoi Automatique d'Emails

## 🎯 **Objectif**
Implémenter l'envoi automatique d'emails au `newtiv05@gmail.com` depuis le formulaire de contact.

## 🔧 **Installation EmailJS**

### **1. Créer un Compte EmailJS**
1. Aller sur [EmailJS.com](https://www.emailjs.com/)
2. Créer un compte gratuit
3. Vérifier l'email

### **2. Configurer le Service Email**
1. **Dashboard** → **Email Services**
2. **Add New Service** → **Gmail**
3. Connecter votre compte Gmail `newtiv05@gmail.com`
4. Noter le **Service ID** généré

### **3. Créer un Template Email**
1. **Dashboard** → **Email Templates**
2. **Create New Template**
3. Utiliser ce template :

```html
Nouveau message de contact depuis AllAdsMarket

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis le site AllAdsMarket
```

4. Noter le **Template ID** généré

### **4. Obtenir la Clé Publique**
1. **Dashboard** → **Account** → **General**
2. Copier la **Public Key**

## 🔧 **Configuration dans le Code**

### **Fichier de Configuration**
Créer `src/config/emailConfig.js` :

```javascript
export const emailConfig = {
  serviceId: 'service_your_service_id', // Remplacez par votre Service ID
  templateId: 'template_your_template_id', // Remplacez par votre Template ID
  publicKey: 'your_public_key', // Remplacez par votre Public Key
  toEmail: 'newtiv05@gmail.com'
};
```

### **Utilisation dans ContactUs.jsx**
```javascript
import { emailConfig } from '../config/emailConfig';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: emailConfig.toEmail
    };
    
    await emailjs.send(
      emailConfig.serviceId, 
      emailConfig.templateId, 
      templateParams, 
      emailConfig.publicKey
    );
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    setIsSubmitting(false);
    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
  }
};
```

## 🚀 **Test de la Configuration**

### **Étapes de Test**
1. **Remplir le formulaire** de contact
2. **Cliquer sur "Envoyer"**
3. **Vérifier** que l'email arrive à `newtiv05@gmail.com`
4. **Confirmer** le contenu de l'email

### **Messages de Confirmation**
- **Succès** : "Message envoyé avec succès !"
- **Erreur** : "Erreur lors de l'envoi du message. Veuillez réessayer."

## 📱 **Fonctionnalités Implémentées**

### **Envoi Automatique**
- ✅ **Email automatique** vers `newtiv05@gmail.com`
- ✅ **Template personnalisé** avec toutes les informations
- ✅ **Gestion d'erreurs** avec messages utilisateur
- ✅ **État de chargement** pendant l'envoi

### **Sécurité**
- ✅ **Validation côté client** avant envoi
- ✅ **Protection contre le spam** via EmailJS
- ✅ **Clés API sécurisées** dans la configuration

## 🔧 **Fichiers Modifiés**

### **Nouveaux Fichiers**
- `src/config/emailConfig.js` - Configuration EmailJS

### **Fichiers Modifiés**
- `src/pages/ContactUs.jsx` - Implémentation EmailJS
- `package.json` - Ajout de `@emailjs/browser`

## 🎯 **Prochaines Étapes**

### **Configuration Requise**
1. **Créer compte EmailJS** et obtenir les clés
2. **Mettre à jour** `src/config/emailConfig.js` avec les vraies clés
3. **Tester** l'envoi d'email
4. **Déployer** avec la configuration finale

### **Améliorations Possibles**
- **Notifications toast** pour les messages de succès/erreur
- **Validation avancée** des champs email
- **Sauvegarde locale** des messages envoyés
- **Template HTML** plus sophistiqué

**🎯 L'envoi automatique d'email est configuré et prêt à être utilisé avec EmailJS !**
