import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Users, Globe } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-description">
            Terms and conditions for using AdsMarket
          </p>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="terms-content">
          <div className="terms-overview">
            <div className="terms-card">
              <div className="terms-icon">
                <FileText size={32} />
              </div>
              <h3>Clear Terms</h3>
              <p>Simple and transparent terms for using our platform</p>
            </div>

            <div className="terms-card">
              <div className="terms-icon">
                <Scale size={32} />
              </div>
              <h3>Fair Use</h3>
              <p>Terms designed to protect both users and our platform</p>
            </div>

            <div className="terms-card">
              <div className="terms-icon">
                <Shield size={32} />
              </div>
              <h3>User Protection</h3>
              <p>Your rights and responsibilities clearly outlined</p>
            </div>
          </div>

          <div className="terms-sections">
            <section className="terms-section">
              <h2>Acceptance of Terms</h2>
              <p>By accessing and using AdsMarket ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section className="terms-section">
              <h2>Description of Service</h2>
              <div className="service-description">
                <div className="service-item">
                  <Globe size={20} />
                  <div>
                    <h4>Affiliate Marketplace</h4>
                    <p>AdsMarket is an affiliate product marketplace that connects users with products from various retailers and brands through affiliate partnerships.</p>
                  </div>
                </div>

                <div className="service-item">
                  <Users size={20} />
                  <div>
                    <h4>User Platform</h4>
                    <p>We provide a platform for users to discover, compare, and access products through affiliate links to external retailers.</p>
                  </div>
                </div>

                <div className="service-item">
                  <Shield size={20} />
                  <div>
                    <h4>Data Management</h4>
                    <p>We track user interactions for analytics purposes and provide local storage for visited items and preferences.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>User Responsibilities</h2>
              
              <div className="responsibilities">
                <div className="responsibility-item">
                  <h4>Accurate Information</h4>
                  <p>Provide accurate and truthful information when contacting us or using our services.</p>
                </div>

                <div className="responsibility-item">
                  <h4>Lawful Use</h4>
                  <p>Use the Service only for lawful purposes and in accordance with these Terms of Service.</p>
                </div>

                <div className="responsibility-item">
                  <h4>Respectful Behavior</h4>
                  <p>Conduct yourself in a respectful manner when using our platform and contacting customer service.</p>
                </div>

                <div className="responsibility-item">
                  <h4>Account Security</h4>
                  <p>Maintain the security of any account information and be responsible for all activities under your account.</p>
                </div>

                <div className="responsibility-item">
                  <h4>Compliance</h4>
                  <p>Comply with all applicable laws, regulations, and third-party terms when using our service.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Prohibited Uses</h2>
              
              <div className="prohibited-uses">
                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Illegal Activities</h4>
                    <p>Using the Service for any unlawful purpose or to solicit others to perform unlawful acts.</p>
                  </div>
                </div>

                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Violations</h4>
                    <p>Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</p>
                  </div>
                </div>

                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Intellectual Property</h4>
                    <p>Infringing upon or violating our intellectual property rights or the intellectual property rights of others.</p>
                  </div>
                </div>

                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>Harassment</h4>
                    <p>Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating.</p>
                  </div>
                </div>

                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>False Information</h4>
                    <p>Providing false or misleading information or impersonating another person or entity.</p>
                  </div>
                </div>

                <div className="prohibited-item">
                  <AlertTriangle size={20} />
                  <div>
                    <h4>System Interference</h4>
                    <p>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Affiliate Links and External Sites</h2>
              
              <div className="affiliate-info">
                <div className="affiliate-item">
                  <h4>Third-Party Websites</h4>
                  <p>Our Service contains links to third-party websites that are not owned or controlled by AdsMarket. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.</p>
                </div>

                <div className="affiliate-item">
                  <h4>Affiliate Partnerships</h4>
                  <p>We maintain affiliate partnerships with various retailers and brands. When you click on affiliate links, you may be redirected to external websites with their own terms and conditions.</p>
                </div>

                <div className="affiliate-item">
                  <h4>User Responsibility</h4>
                  <p>You acknowledge and agree that AdsMarket shall not be responsible or liable for any damage or loss caused by your use of any third-party website or service.</p>
                </div>

                <div className="affiliate-item">
                  <h4>Product Information</h4>
                  <p>Product information, prices, and availability are provided by our affiliate partners and may change without notice. We strive for accuracy but cannot guarantee the correctness of all information.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Intellectual Property Rights</h2>
              
              <div className="ip-rights">
                <div className="ip-item">
                  <h4>Our Content</h4>
                  <p>The Service and its original content, features, and functionality are and will remain the exclusive property of AdsMarket and its licensors.</p>
                </div>

                <div className="ip-item">
                  <h4>User Content</h4>
                  <p>You retain ownership of any content you submit, but grant us a license to use, modify, and display such content in connection with the Service.</p>
                </div>

                <div className="ip-item">
                  <h4>Trademarks</h4>
                  <p>The AdsMarket name, logo, and related trademarks are owned by us and may not be used without our prior written consent.</p>
                </div>

                <div className="ip-item">
                  <h4>Third-Party Content</h4>
                  <p>Product images, descriptions, and other content from affiliate partners remain the property of their respective owners.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Privacy and Data Protection</h2>
              
              <div className="privacy-terms">
                <div className="privacy-item">
                  <h4>Data Collection</h4>
                  <p>We collect and use information as described in our Privacy Policy. By using our Service, you consent to such collection and use.</p>
                </div>

                <div className="privacy-item">
                  <h4>Local Storage</h4>
                  <p>We use local browser storage to save your visited items and preferences. You can clear this data at any time through your browser settings.</p>
                </div>

                <div className="privacy-item">
                  <h4>Analytics</h4>
                  <p>We may use analytics tools to understand how users interact with our Service and improve our offerings.</p>
                </div>

                <div className="privacy-item">
                  <h4>Data Security</h4>
                  <p>We implement appropriate security measures to protect your information, but cannot guarantee absolute security.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Service Availability</h2>
              
              <div className="availability-info">
                <div className="availability-item">
                  <h4>Uptime</h4>
                  <p>We strive to maintain high service availability but cannot guarantee uninterrupted access to the Service.</p>
                </div>

                <div className="availability-item">
                  <h4>Maintenance</h4>
                  <p>We may temporarily suspend the Service for maintenance, updates, or improvements with or without notice.</p>
                </div>

                <div className="availability-item">
                  <h4>Force Majeure</h4>
                  <p>We are not liable for any failure to perform due to circumstances beyond our reasonable control.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Disclaimers and Limitations</h2>
              
              <div className="disclaimers">
                <div className="disclaimer-item">
                  <h4>Service "As Is"</h4>
                  <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.</p>
                </div>

                <div className="disclaimer-item">
                  <h4>Product Accuracy</h4>
                  <p>We do not guarantee the accuracy, completeness, or timeliness of product information provided by affiliate partners.</p>
                </div>

                <div className="disclaimer-item">
                  <h4>Limitation of Liability</h4>
                  <p>In no event shall AdsMarket be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
                </div>

                <div className="disclaimer-item">
                  <h4>Third-Party Actions</h4>
                  <p>We are not responsible for the actions, content, or services of third-party websites or services.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Termination</h2>
              
              <div className="termination-info">
                <div className="termination-item">
                  <h4>User Termination</h4>
                  <p>You may stop using the Service at any time by discontinuing access to our website.</p>
                </div>

                <div className="termination-item">
                  <h4>Service Termination</h4>
                  <p>We may terminate or suspend your access to the Service immediately, without prior notice, for any reason.</p>
                </div>

                <div className="termination-item">
                  <h4>Effect of Termination</h4>
                  <p>Upon termination, your right to use the Service will cease immediately, and we may delete your data.</p>
                </div>

                <div className="termination-item">
                  <h4>Survival</h4>
                  <p>Certain provisions of these Terms will survive termination, including intellectual property rights and limitations of liability.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Governing Law</h2>
              <p>These Terms of Service shall be interpreted and governed by the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of New York.</p>
            </section>

            <section className="terms-section">
              <h2>Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date. Your continued use of the Service after such modifications constitutes acceptance of the updated terms.</p>
            </section>

            <section className="terms-section">
              <h2>Severability</h2>
              <p>If any provision of these Terms of Service is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>
            </section>

            <section className="terms-section">
              <h2>Dispute Resolution</h2>
              
              <div className="dispute-resolution">
                <div className="dispute-item">
                  <h4>Informal Resolution</h4>
                  <p>Before pursuing formal legal action, we encourage users to contact us directly to resolve any disputes informally. We are committed to working with users to address concerns and find mutually acceptable solutions.</p>
                </div>

                <div className="dispute-item">
                  <h4>Binding Arbitration</h4>
                  <p>Any disputes arising from these Terms of Service or your use of the Service shall be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if they qualify.</p>
                </div>

                <div className="dispute-item">
                  <h4>Class Action Waiver</h4>
                  <p>You agree that any arbitration or court proceeding shall be limited to the dispute between you and AdsMarket individually. You waive any right to participate in class actions or consolidated proceedings.</p>
                </div>

                <div className="dispute-item">
                  <h4>Arbitration Process</h4>
                  <p>Arbitration will be conducted by a neutral arbitrator in accordance with the rules of the American Arbitration Association. The arbitration will take place in New York, New York.</p>
                </div>
              </div>
            </section>

            <section className="terms-section">
              <h2>Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless AdsMarket and its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from:</p>
              <ul>
                <li>Your use of and access to the Service</li>
                <li>Your violation of any term of these Terms of Service</li>
                <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
                <li>Any claim that your content caused damage to a third party</li>
                <li>Your violation of any applicable law or regulation</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2>Force Majeure</h2>
              <p>AdsMarket shall not be liable for any failure or delay in performance under these Terms of Service which is due to fire, flood, earthquake, elements of nature or acts of God, acts of war, terrorism, labor strikes, or any other cause which is beyond the reasonable control of AdsMarket.</p>
            </section>

            <section className="terms-section">
              <h2>Entire Agreement</h2>
              <p>These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the sole and entire agreement between you and AdsMarket with respect to the Service and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, with respect to the Service.</p>
            </section>

            <section className="terms-section">
              <h2>Waiver</h2>
              <p>No waiver by AdsMarket of any term or condition set forth in these Terms of Service shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of AdsMarket to assert a right or provision under these Terms of Service shall not constitute a waiver of such right or provision.</p>
            </section>

            <section className="terms-section">
              <h2>Assignment</h2>
              <p>AdsMarket may assign or transfer these Terms of Service, in whole or in part, without restriction. You may not assign or transfer these Terms of Service, or any of your rights or obligations hereunder, without our prior written consent.</p>
            </section>

            <section className="terms-section">
              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <div className="contact-info">
                <p><strong>Email:</strong> legal@adsmarket.com</p>
                <p><strong>Legal Department:</strong> legal@adsmarket.com</p>
                <p><strong>Address:</strong> 123 Business Street, New York, NY 10001</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Response Time:</strong> We will respond to all legal inquiries within 5 business days</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
