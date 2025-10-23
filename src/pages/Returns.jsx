import React from 'react';
import { RotateCcw, Clock, CheckCircle, AlertCircle, Package, Truck } from 'lucide-react';

const Returns = () => {
  return (
    <div className="returns-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Returns & Exchanges</h1>
          <p className="page-description">
            Our hassle-free return and exchange policy
          </p>
        </div>

        <div className="returns-content">
          <div className="returns-overview">
            <div className="return-card">
              <div className="return-icon">
                <RotateCcw size={32} />
              </div>
              <h3>Easy Returns</h3>
              <p>30-day return window for most items in original condition</p>
            </div>

            <div className="return-card">
              <div className="return-icon">
                <Clock size={32} />
              </div>
              <h3>Quick Processing</h3>
              <p>Returns processed within 3-5 business days of receipt</p>
            </div>

            <div className="return-card">
              <div className="return-icon">
                <CheckCircle size={32} />
              </div>
              <h3>Full Refunds</h3>
              <p>Complete refund to original payment method</p>
            </div>
          </div>

          <div className="returns-details">
            <div className="detail-section">
              <h2>Return Policy</h2>
              <div className="policy-content">
                <div className="policy-item">
                  <CheckCircle size={20} className="check-icon" />
                  <div>
                    <h4>30-Day Return Window</h4>
                    <p>You have 30 days from the delivery date to initiate a return for most items.</p>
                  </div>
                </div>

                <div className="policy-item">
                  <CheckCircle size={20} className="check-icon" />
                  <div>
                    <h4>Original Condition Required</h4>
                    <p>Items must be in original condition with tags, packaging, and accessories included.</p>
                  </div>
                </div>

                <div className="policy-item">
                  <CheckCircle size={20} className="check-icon" />
                  <div>
                    <h4>Free Return Shipping</h4>
                    <p>We provide prepaid return labels for eligible returns.</p>
                  </div>
                </div>

                <div className="policy-item">
                  <CheckCircle size={20} className="check-icon" />
                  <div>
                    <h4>Full Refund Guarantee</h4>
                    <p>Receive a complete refund to your original payment method within 5-7 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>How to Return an Item</h2>
              <div className="return-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Initiate Return</h4>
                    <p>Log into your account and select "Return Item" from your order history, or contact customer service.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Get Return Label</h4>
                    <p>We'll email you a prepaid return shipping label within 24 hours of your return request.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Package Item</h4>
                    <p>Securely package the item in its original packaging with all accessories and documentation.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Ship Return</h4>
                    <p>Drop off the package at any authorized shipping location using the provided label.</p>
                  </div>
                </div>

                <div className="step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h4>Receive Refund</h4>
                    <p>Once we receive and process your return, you'll get your refund within 5-7 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Exchange Policy</h2>
              <div className="exchange-info">
                <div className="exchange-option">
                  <Package size={24} />
                  <div>
                    <h4>Size Exchanges</h4>
                    <p>Exchange for a different size within 30 days. Free return shipping and free shipping for the new item.</p>
                  </div>
                </div>

                <div className="exchange-option">
                  <Truck size={24} />
                  <div>
                    <h4>Color Exchanges</h4>
                    <p>Exchange for a different color or style of the same item. Subject to availability.</p>
                  </div>
                </div>

                <div className="exchange-option">
                  <AlertCircle size={24} />
                  <div>
                    <h4>Defective Items</h4>
                    <p>Items with manufacturing defects can be exchanged or refunded at no cost to you.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Non-Returnable Items</h2>
              <div className="non-returnable">
                <div className="restriction">
                  <AlertCircle size={20} className="alert-icon" />
                  <div>
                    <h4>Personalized Items</h4>
                    <p>Custom-made or personalized products cannot be returned unless defective.</p>
                  </div>
                </div>

                <div className="restriction">
                  <AlertCircle size={20} className="alert-icon" />
                  <div>
                    <h4>Digital Products</h4>
                    <p>Digital downloads, software, and electronic media are non-returnable.</p>
                  </div>
                </div>

                <div className="restriction">
                  <AlertCircle size={20} className="alert-icon" />
                  <div>
                    <h4>Used or Damaged Items</h4>
                    <p>Items that show signs of use or damage beyond normal wear cannot be returned.</p>
                  </div>
                </div>

                <div className="restriction">
                  <AlertCircle size={20} className="alert-icon" />
                  <div>
                    <h4>Final Sale Items</h4>
                    <p>Items marked as "Final Sale" or "No Returns" cannot be returned or exchanged.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Return Shipping</h2>
              <div className="shipping-info">
                <div className="shipping-option">
                  <h4>Prepaid Return Labels</h4>
                  <ul>
                    <li>Free return shipping for eligible returns</li>
                    <li>Labels valid for 30 days from issue date</li>
                    <li>Track your return shipment online</li>
                    <li>Drop off at any authorized location</li>
                  </ul>
                </div>

                <div className="shipping-option">
                  <h4>Return Packaging</h4>
                  <ul>
                    <li>Use original packaging when possible</li>
                    <li>Include all accessories and documentation</li>
                    <li>Ensure items are securely packaged</li>
                    <li>Attach return label to outside of package</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Refund Timeline</h2>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Return Received</h4>
                    <p>We process returns within 1-2 business days of receipt.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Quality Check</h4>
                    <p>Items are inspected to ensure they meet return criteria.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Refund Processed</h4>
                    <p>Refund is issued to your original payment method.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>Refund Received</h4>
                    <p>You should see the refund in your account within 5-7 business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-returns">
            <h2>Need Help with Returns?</h2>
            <p>Questions about our return policy or need assistance with a return?</p>
            <div className="contact-options">
              <a href="/contact" className="contact-button">
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

export default Returns;
