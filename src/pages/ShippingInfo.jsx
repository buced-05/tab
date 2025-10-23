import React from 'react';
import { Truck, Clock, Shield, Package, MapPin, Phone } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="shipping-info-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Shipping Information</h1>
          <p className="page-description">
            Everything you need to know about shipping and delivery
          </p>
          <div className="partner-notice">
            <p><strong>Important:</strong> All shipping and delivery services are provided by our trusted partner companies. Delivery times, policies, and procedures are subject to our partners' terms and conditions.</p>
          </div>
        </div>

        <div className="shipping-content">
          <div className="shipping-overview">
            <div className="shipping-card">
              <div className="shipping-icon">
                <Truck size={32} />
              </div>
              <h3>Fast & Reliable Shipping</h3>
              <p>We work with trusted shipping partners to ensure your orders arrive safely and on time.</p>
            </div>

            <div className="shipping-card">
              <div className="shipping-icon">
                <Clock size={32} />
              </div>
              <h3>Express Delivery</h3>
              <p>Many products offer same-day or next-day delivery options in select areas.</p>
            </div>

            <div className="shipping-card">
              <div className="shipping-icon">
                <Shield size={32} />
              </div>
              <h3>Secure Packaging</h3>
              <p>All items are carefully packaged to prevent damage during transit.</p>
            </div>
          </div>

          <div className="shipping-details">
            <div className="detail-section">
              <h2>Shipping Options</h2>
              <div className="shipping-options">
                <div className="option">
                  <h4>Standard Shipping</h4>
                  <ul>
                    <li>5-7 business days</li>
                    <li>Free on orders over $25</li>
                    <li>$4.99 for orders under $25</li>
                    <li>Tracking included</li>
                  </ul>
                </div>

                <div className="option">
                  <h4>Express Shipping</h4>
                  <ul>
                    <li>2-3 business days</li>
                    <li>$9.99 flat rate</li>
                    <li>Priority handling</li>
                    <li>Real-time tracking</li>
                  </ul>
                </div>

                <div className="option">
                  <h4>Overnight Shipping</h4>
                  <ul>
                    <li>Next business day</li>
                    <li>$19.99 flat rate</li>
                    <li>Signature required</li>
                    <li>Guaranteed delivery</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Delivery Areas</h2>
              <div className="delivery-info">
                <div className="delivery-coverage">
                  <MapPin size={24} />
                  <div>
                    <h4>Domestic Delivery</h4>
                    <p>We deliver to all 50 states in the United States, including Alaska and Hawaii.</p>
                  </div>
                </div>

                <div className="delivery-coverage">
                  <Package size={24} />
                  <div>
                    <h4>International Shipping</h4>
                    <p>Limited international shipping available to select countries. Contact us for availability and rates.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Tracking Your Order</h2>
              <div className="tracking-info">
                <div className="tracking-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Order Confirmation</h4>
                    <p>You'll receive an email confirmation with your order details and estimated delivery date.</p>
                  </div>
                </div>

                <div className="tracking-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Processing</h4>
                    <p>Your order is prepared and packaged by our fulfillment team.</p>
                  </div>
                </div>

                <div className="tracking-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Shipped</h4>
                    <p>You'll receive a tracking number and can monitor your package's progress.</p>
                  </div>
                </div>

                <div className="tracking-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Delivered</h4>
                    <p>Your package arrives at the specified delivery address.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Partner Shipping Policies</h2>
              <div className="partner-policies">
                <div className="partner-info">
                  <h4>Amazon Logistics</h4>
                  <p>For products fulfilled by Amazon, delivery times and policies follow Amazon's standard procedures.</p>
                  <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201910810" target="_blank" rel="noopener noreferrer" className="partner-link">
                    View Amazon Shipping Policies
                  </a>
                </div>

                <div className="partner-info">
                  <h4>FedEx</h4>
                  <p>Express and standard shipping services provided by FedEx with their terms and conditions.</p>
                  <a href="https://www.fedex.com/en-us/shipping/terms-of-service.html" target="_blank" rel="noopener noreferrer" className="partner-link">
                    View FedEx Terms of Service
                  </a>
                </div>

                <div className="partner-info">
                  <h4>UPS</h4>
                  <p>Ground and air shipping services with UPS delivery standards and policies.</p>
                  <a href="https://www.ups.com/us/en/help-center/legal-terms-conditions/terms-of-service.page" target="_blank" rel="noopener noreferrer" className="partner-link">
                    View UPS Terms of Service
                  </a>
                </div>

                <div className="partner-info">
                  <h4>DHL</h4>
                  <p>International and domestic express shipping with DHL's delivery commitments.</p>
                  <a href="https://www.dhl.com/global-en/home/terms-conditions.html" target="_blank" rel="noopener noreferrer" className="partner-link">
                    View DHL Terms & Conditions
                  </a>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>General Shipping Policies</h2>
              <div className="policies">
                <div className="policy">
                  <h4>Processing Time</h4>
                  <p>Orders are typically processed within 1-2 business days. During peak seasons, processing may take up to 3 business days.</p>
                </div>

                <div className="policy">
                  <h4>Delivery Timeframes</h4>
                  <p>Delivery times are estimates and may vary based on weather conditions, shipping carrier delays, or other factors beyond our control.</p>
                </div>

                <div className="policy">
                  <h4>Address Changes</h4>
                  <p>Address changes must be made within 2 hours of order placement. Contact customer service for assistance.</p>
                </div>

                <div className="policy">
                  <h4>Undeliverable Packages</h4>
                  <p>Packages that cannot be delivered will be returned to us. Additional shipping charges may apply for redelivery.</p>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Special Circumstances</h2>
              <div className="special-info">
                <div className="circumstance">
                  <h4>Holiday Shipping</h4>
                  <p>During holiday periods, shipping times may be extended. We recommend placing orders early to ensure timely delivery.</p>
                </div>

                <div className="circumstance">
                  <h4>Weather Delays</h4>
                  <p>Severe weather conditions may cause shipping delays. We work with carriers to minimize impact on delivery times.</p>
                </div>

                <div className="circumstance">
                  <h4>Signature Required</h4>
                  <p>Some high-value items require a signature upon delivery. Make sure someone is available to receive the package.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-shipping">
            <h2>Need Help with Shipping?</h2>
            <p>Have questions about your order or need assistance with shipping options?</p>
            <div className="contact-options">
              <a href="/contact" className="contact-button">
                <Phone size={18} />
                Contact Support
              </a>
              <a href="/faq" className="contact-button secondary">
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
