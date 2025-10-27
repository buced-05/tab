// Configuration EmailJS pour l'envoi automatique d'emails
// Remplacez les valeurs par vos propres clés EmailJS

export const emailConfig = {
  // Service ID depuis EmailJS Dashboard → Email Services
  serviceId: 'service_your_service_id',
  
  // Template ID depuis EmailJS Dashboard → Email Templates  
  templateId: 'template_your_template_id',
  
  // Public Key depuis EmailJS Dashboard → Account → General
  publicKey: 'your_public_key',
  
  // Email de destination
  toEmail: 'newtiv05@gmail.com'
};

// Template EmailJS recommandé :
/*
Nouveau message de contact depuis AllAdsMarket

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis le site AllAdsMarket
Date: {{date}}
*/
