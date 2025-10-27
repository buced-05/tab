import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';
// import '../styles/contact-form.css'; // Removed unused CSS

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Préparer les paramètres du template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: emailConfig.toEmail,
        date: new Date().toLocaleString('fr-FR')
      };
      
      // Envoyer l'email
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

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Contactez-nous</h1>
          <p className="page-description">
            Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous répondrons dès que possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            {!isSubmitted ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Envoyez-nous un message</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse e-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="De quoi s'agit-il ?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Dites-nous comment nous pouvons vous aider..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`submit-button ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="success-message">
                <h2>Message envoyé !</h2>
                <p>Merci de nous avoir contactés. Nous vous répondrons dès que possible.</p>
                <button
                  className="submit-button"
                  onClick={() => setIsSubmitted(false)}
                >
                  Envoyer un autre message
                </button>
              </div>
            )}
          </div>

          <div className="contact-info">
            <div className="contact-info-header">
              <h2 className="contact-info-title">Informations de Contact</h2>
              <p className="contact-info-subtitle">
                Nous sommes là pour vous aider. Contactez-nous par le moyen qui vous convient le mieux.
              </p>
            </div>
            
            <div className="contact-methods-grid">
              <div className="contact-method-card email-card">
                <div className="contact-method-header">
                  <div className="contact-icon-wrapper email-icon">
                    <Mail size={28} />
                  </div>
                  <div className="contact-method-badge">
                    <span className="badge-text">Réponse rapide</span>
                  </div>
                </div>
                <div className="contact-details">
                  <h3 className="contact-method-title">E-mail</h3>
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <span className="contact-label">Support technique</span>
                      <a href="mailto:newtiv05@gmail.com" className="contact-value">
                        newtiv05@gmail.com
                      </a>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Informations générales</span>
                      <a href="mailto:newtiv05@gmail.com" className="contact-value">
                        newtiv05@gmail.com
                      </a>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Partenariat</span>
                      <a href="mailto:newtiv05@gmail.com" className="contact-value">
                        newtiv05@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-method-card phone-card">
                <div className="contact-method-header">
                  <div className="contact-icon-wrapper phone-icon">
                    <Phone size={28} />
                  </div>
                  <div className="contact-method-badge">
                    <span className="badge-text">Disponible</span>
                  </div>
                </div>
                <div className="contact-details">
                  <h3 className="contact-method-title">Téléphone</h3>
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <span className="contact-label">Numéro principal</span>
                      <a href="tel:+2250714520133" className="contact-value phone-number">
                        +225 07 14 52 01 33
                      </a>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Horaires</span>
                      <span className="contact-value">Lun-Ven: 8h-18h GMT</span>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Urgences</span>
                      <span className="contact-value">24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-method-card location-card">
                <div className="contact-method-header">
                  <div className="contact-icon-wrapper location-icon">
                    <MapPin size={28} />
                  </div>
                  <div className="contact-method-badge">
                    <span className="badge-text">Bureau principal</span>
                  </div>
                </div>
                <div className="contact-details">
                  <h3 className="contact-method-title">Localisation</h3>
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <span className="contact-label">Ville</span>
                      <span className="contact-value">Abidjan</span>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Pays</span>
                      <span className="contact-value">Côte d'Ivoire</span>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Zone</span>
                      <span className="contact-value">Afrique de l'Ouest</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-method-card hours-card">
                <div className="contact-method-header">
                  <div className="contact-icon-wrapper hours-icon">
                    <Clock size={28} />
                  </div>
                  <div className="contact-method-badge">
                    <span className="badge-text">Horaires</span>
                  </div>
                </div>
                <div className="contact-details">
                  <h3 className="contact-method-title">Heures d'ouverture</h3>
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <span className="contact-label">Lundi - Vendredi</span>
                      <span className="contact-value">8h00 - 18h00</span>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Samedi</span>
                      <span className="contact-value">9h00 - 16h00</span>
                    </div>
                    <div className="contact-info-item">
                      <span className="contact-label">Dimanche</span>
                      <span className="contact-value status-closed">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-additional-info">
              <div className="response-time-info">
                <h4>Temps de réponse</h4>
                <div className="response-times">
                  <div className="response-time-item">
                    <span className="response-method">E-mail</span>
                    <span className="response-duration">Sous 24h</span>
                  </div>
                  <div className="response-time-item">
                    <span className="response-method">Téléphone</span>
                    <span className="response-duration">Immédiat</span>
                  </div>
                  <div className="response-time-item">
                    <span className="response-method">Chat en ligne</span>
                    <span className="response-duration">Sous 5 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
