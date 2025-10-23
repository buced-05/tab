import React from 'react';
import { Shield, Eye, Lock, User, Globe, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-description">
            How we collect, use, and protect your information
          </p>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="privacy-content">
          <div className="privacy-overview">
            <div className="privacy-card">
              <div className="privacy-icon">
                <Shield size={32} />
              </div>
              <h3>Your Privacy Matters</h3>
              <p>We are committed to protecting your personal information and respecting your privacy.</p>
            </div>

            <div className="privacy-card">
              <div className="privacy-icon">
                <Lock size={32} />
              </div>
              <h3>Secure Data Handling</h3>
              <p>We use industry-standard security measures to protect your data.</p>
            </div>

            <div className="privacy-card">
              <div className="privacy-icon">
                <Eye size={32} />
              </div>
              <h3>Transparency</h3>
              <p>We believe in being transparent about how we collect and use your information.</p>
            </div>
          </div>

          <div className="privacy-sections">
            <section className="privacy-section">
              <h2>Information We Collect</h2>
              
              <div className="info-category">
                <User size={24} />
                <div>
                  <h3>Personal Information</h3>
                  <ul>
                    <li>Name and contact information (when you contact us)</li>
                    <li>Email address (for support inquiries)</li>
                    <li>Shipping and billing addresses (when making purchases through affiliate links)</li>
                    <li>Payment information (processed securely by our affiliate partners)</li>
                  </ul>
                </div>
              </div>

              <div className="info-category">
                <Database size={24} />
                <div>
                  <h3>Usage Information</h3>
                  <ul>
                    <li>Products you view and interact with</li>
                    <li>Affiliate links you click on</li>
                    <li>Time spent on our website</li>
                    <li>Pages visited and navigation patterns</li>
                    <li>Device information (browser type, operating system)</li>
                  </ul>
                </div>
              </div>

              <div className="info-category">
                <Globe size={24} />
                <div>
                  <h3>Technical Information</h3>
                  <ul>
                    <li>IP address and general location</li>
                    <li>Browser cookies and local storage data</li>
                    <li>Website performance and error logs</li>
                    <li>Referral sources and search terms</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>How We Use Your Information</h2>
              
              <div className="usage-list">
                <div className="usage-item">
                  <h4>Service Provision</h4>
                  <p>To provide and maintain our affiliate marketplace services, including product recommendations and affiliate link tracking.</p>
                </div>

                <div className="usage-item">
                  <h4>User Experience</h4>
                  <p>To personalize your experience, remember your preferences, and improve our website functionality.</p>
                </div>

                <div className="usage-item">
                  <h4>Analytics</h4>
                  <p>To analyze usage patterns, track performance metrics, and improve our services.</p>
                </div>

                <div className="usage-item">
                  <h4>Communication</h4>
                  <p>To respond to your inquiries, provide customer support, and send important service updates.</p>
                </div>

                <div className="usage-item">
                  <h4>Legal Compliance</h4>
                  <p>To comply with applicable laws, regulations, and legal processes.</p>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>Information Storage and Security</h2>
              
              <div className="security-info">
                <div className="security-measure">
                  <Lock size={20} />
                  <div>
                    <h4>Local Storage</h4>
                    <p>Visited items and preferences are stored locally on your device using browser storage. This data remains on your device and is not transmitted to our servers.</p>
                  </div>
                </div>

                <div className="security-measure">
                  <Shield size={20} />
                  <div>
                    <h4>Secure Transmission</h4>
                    <p>All data transmission between your device and our servers is encrypted using SSL/TLS protocols.</p>
                  </div>
                </div>

                <div className="security-measure">
                  <Database size={20} />
                  <div>
                    <h4>Data Retention</h4>
                    <p>We retain personal information only as long as necessary to provide our services and comply with legal obligations.</p>
                  </div>
                </div>

                <div className="security-measure">
                  <Eye size={20} />
                  <div>
                    <h4>Access Controls</h4>
                    <p>Access to your personal information is restricted to authorized personnel who need it to provide our services.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>Cookies and Local Storage</h2>
              
              <div className="cookie-info">
                <div className="cookie-type">
                  <h4>Essential Cookies</h4>
                  <p>Required for basic website functionality, including session management and security features.</p>
                </div>

                <div className="cookie-type">
                  <h4>Functional Cookies</h4>
                  <p>Remember your preferences and settings to improve your user experience.</p>
                </div>

                <div className="cookie-type">
                  <h4>Analytics Cookies</h4>
                  <p>Help us understand how visitors interact with our website to improve performance.</p>
                </div>

                <div className="cookie-type">
                  <h4>Affiliate Tracking</h4>
                  <p>Track affiliate link clicks and purchases to maintain our affiliate partnerships.</p>
                </div>
              </div>

              <div className="cookie-controls">
                <h4>Cookie Management</h4>
                <p>You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality.</p>
              </div>
            </section>

            <section className="privacy-section">
              <h2>Third-Party Services</h2>
              
              <div className="third-party-info">
                <div className="service">
                  <h4>Affiliate Partners</h4>
                  <p>We work with trusted affiliate partners. When you click on affiliate links, you may be redirected to their websites, which have their own privacy policies.</p>
                </div>

                <div className="service">
                  <h4>Analytics Services</h4>
                  <p>We may use third-party analytics services to understand website usage and improve our services.</p>
                </div>

                <div className="service">
                  <h4>Payment Processors</h4>
                  <p>Payment information is processed by secure third-party payment processors when you make purchases through affiliate links.</p>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>Your Rights and Choices</h2>
              
              <div className="rights-list">
                <div className="right-item">
                  <h4>Access Your Data</h4>
                  <p>Request access to the personal information we have about you.</p>
                </div>

                <div className="right-item">
                  <h4>Correct Information</h4>
                  <p>Request correction of inaccurate or incomplete personal information.</p>
                </div>

                <div className="right-item">
                  <h4>Delete Data</h4>
                  <p>Request deletion of your personal information, subject to legal and operational requirements.</p>
                </div>

                <div className="right-item">
                  <h4>Data Portability</h4>
                  <p>Request a copy of your data in a portable format.</p>
                </div>

                <div className="right-item">
                  <h4>Opt-Out</h4>
                  <p>Opt out of certain data collection and processing activities.</p>
                </div>

                <div className="right-item">
                  <h4>Local Storage Control</h4>
                  <p>Clear your browser's local storage to remove visited items and preferences.</p>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>Children's Privacy</h2>
              <p>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.</p>
            </section>

            <section className="privacy-section">
              <h2>International Data Transfers</h2>
              <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.</p>
            </section>

            <section className="privacy-section">
              <h2>Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.</p>
            </section>

            <section className="privacy-section">
              <h2>Data Breach Notification</h2>
              <p>In the unlikely event of a data breach that affects your personal information, we will:</p>
              <ul>
                <li>Notify affected users within 72 hours of becoming aware of the breach</li>
                <li>Provide clear information about what data was affected</li>
                <li>Explain the steps we're taking to address the breach</li>
                <li>Offer guidance on protective measures you can take</li>
                <li>Report the breach to relevant authorities as required by law</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>GDPR Compliance</h2>
              <p>For users in the European Union, we comply with the General Data Protection Regulation (GDPR):</p>
              <div className="gdpr-rights">
                <div className="gdpr-item">
                  <h4>Right to Access</h4>
                  <p>You have the right to request access to your personal data and receive a copy of the data we hold about you.</p>
                </div>
                <div className="gdpr-item">
                  <h4>Right to Rectification</h4>
                  <p>You can request correction of inaccurate or incomplete personal data.</p>
                </div>
                <div className="gdpr-item">
                  <h4>Right to Erasure</h4>
                  <p>You can request deletion of your personal data under certain circumstances.</p>
                </div>
                <div className="gdpr-item">
                  <h4>Right to Data Portability</h4>
                  <p>You can request a copy of your data in a structured, machine-readable format.</p>
                </div>
                <div className="gdpr-item">
                  <h4>Right to Object</h4>
                  <p>You can object to processing of your personal data for certain purposes.</p>
                </div>
                <div className="gdpr-item">
                  <h4>Right to Restrict Processing</h4>
                  <p>You can request restriction of processing under certain circumstances.</p>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2>CCPA Compliance</h2>
              <p>For California residents, we comply with the California Consumer Privacy Act (CCPA):</p>
              <ul>
                <li>Right to know what personal information is collected and how it's used</li>
                <li>Right to delete personal information</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
                <li>Right to access personal information in a portable format</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>Contact Us</h2>
              <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@adsmarket.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@adsmarket.com</p>
                <p><strong>Address:</strong> 123 Business Street, New York, NY 10001</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Response Time:</strong> We will respond to all privacy inquiries within 30 days</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
