import React, { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Phone, Mail, Clock, BookOpen, Users, Settings, Shield, Globe, Star } from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const helpCategories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen },
    { id: 'products', name: 'Products', icon: Star },
    { id: 'account', name: 'Account', icon: Users },
    { id: 'technical', name: 'Technical', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'international', name: 'International', icon: Globe }
  ];

  const helpContent = {
    'getting-started': [
      {
        title: 'How to browse products?',
        content: 'Use our search bar at the top of the page or browse through our categories. You can filter by price, brand, rating, and more. The search function supports product names, descriptions, and even brand names.',
        steps: [
          'Click on the search icon in the header',
          'Type your search term',
          'Use filters to narrow down results',
          'Click on any product to view details'
        ]
      },
      {
        title: 'How to use Quick View?',
        content: 'Quick View allows you to see detailed product information without leaving the current page. This feature shows multiple images, detailed descriptions, specifications, and pricing information.',
        steps: [
          'Hover over any product card',
          'Click the "Quick View" button',
          'Review product details in the popup',
          'Click "See Price" to visit the product page'
        ]
      },
      {
        title: 'How to track visited items?',
        content: 'All products you view or interact with are automatically saved in your browser\'s local storage. This helps you keep track of products you\'re interested in without needing an account.',
        steps: [
          'View any product or use Quick View',
          'Items are automatically saved locally',
          'Access your visited items from the navigation menu',
          'Clear your browsing data to reset the list'
        ]
      },
      {
        title: 'Understanding product ratings',
        content: 'Our product ratings are based on customer reviews from our affiliate partners. Ratings are displayed as stars (1-5) and include the total number of reviews.',
        steps: [
          'Look for the star rating on each product card',
          'Check the review count for credibility',
          'Read detailed reviews on the product page',
          'Consider both rating and number of reviews'
        ]
      }
    ],
    'products': [
      {
        title: 'Where do product prices come from?',
        content: 'Product prices are sourced directly from our affiliate partners including Amazon, Hostinger, and other trusted retailers. Prices are updated regularly to ensure accuracy.',
        steps: [
          'Prices are fetched from partner websites',
          'Updated multiple times per day',
          'May vary between different retailers',
          'Always check the final price on the retailer\'s site'
        ]
      },
      {
        title: 'How accurate is product information?',
        content: 'We strive to maintain accurate and up-to-date product information. However, product details, availability, and prices may change on the retailer\'s website.',
        steps: [
          'Product info is updated regularly',
          'Images and descriptions are from retailers',
          'Availability is checked frequently',
          'Always verify details on the retailer\'s site'
        ]
      },
      {
        title: 'What are affiliate links?',
        content: 'Affiliate links are special URLs that allow us to earn a small commission when you make a purchase. This doesn\'t affect the price you pay and helps support our service.',
        steps: [
          'Click "See Price" to visit the retailer',
          'Complete your purchase normally',
          'We earn a small commission',
          'You pay the same price as direct customers'
        ]
      },
      {
        title: 'Product availability and stock',
        content: 'Product availability is checked regularly, but stock levels can change quickly. If a product shows as unavailable, check back later or look for similar alternatives.',
        steps: [
          'Check the "In Stock" indicator',
          'Look for alternative products if out of stock',
          'Set up price alerts for wanted items',
          'Contact support for availability questions'
        ]
      }
    ],
    'account': [
      {
        title: 'Do I need an account to browse?',
        content: 'No account is required to browse products or use most features. However, creating an account provides additional benefits like saved preferences and personalized recommendations.',
        steps: [
          'Browse products without an account',
          'Use Quick View and search freely',
          'Create account for enhanced features',
          'Access account from the user menu'
        ]
      },
      {
        title: 'How to create an account?',
        content: 'Creating an account is simple and free. You can sign up using your email address and create a secure password.',
        steps: [
          'Click the user icon in the header',
          'Select "Sign Up" or "Register"',
          'Enter your email and password',
          'Verify your email (if required)'
        ]
      },
      {
        title: 'Managing your preferences',
        content: 'Once you have an account, you can customize your experience by setting language preferences, currency, and notification settings.',
        steps: [
          'Access your account settings',
          'Choose your preferred language',
          'Set your currency preference',
          'Configure notification settings'
        ]
      }
    ],
    'technical': [
      {
        title: 'Website not loading properly?',
        content: 'If you\'re experiencing loading issues, try these troubleshooting steps to resolve the problem.',
        steps: [
          'Refresh your browser (Ctrl+F5 or Cmd+Shift+R)',
          'Clear your browser cache and cookies',
          'Check your internet connection',
          'Try a different browser or device'
        ]
      },
      {
        title: 'Images not displaying?',
        content: 'Product images are loaded from external sources. If images aren\'t showing, it could be due to network issues or browser settings.',
        steps: [
          'Check your internet connection',
          'Disable ad blockers temporarily',
          'Enable JavaScript in your browser',
          'Try refreshing the page'
        ]
      },
      {
        title: 'Quick View not working?',
        content: 'Quick View requires JavaScript to function properly. If it\'s not working, check your browser settings and try these solutions.',
        steps: [
          'Ensure JavaScript is enabled',
          'Disable browser extensions temporarily',
          'Clear browser cache',
          'Try a different browser'
        ]
      },
      {
        title: 'Mobile app issues',
        content: 'While we don\'t have a dedicated mobile app, our website is fully responsive and optimized for mobile devices.',
        steps: [
          'Use your mobile browser',
          'Add our site to your home screen',
          'Ensure you have a stable connection',
          'Update your browser to the latest version'
        ]
      }
    ],
    'security': [
      {
        title: 'How is my data protected?',
        content: 'We take data security seriously and implement multiple layers of protection to keep your information safe.',
        steps: [
          'All data transmission is encrypted (SSL/TLS)',
          'We don\'t store payment information',
          'Local storage is used for preferences only',
          'Regular security audits are performed'
        ]
      },
      {
        title: 'Privacy and cookies',
        content: 'We respect your privacy and are transparent about how we collect and use data. You can control cookie preferences in your browser.',
        steps: [
          'Review our Privacy Policy',
          'Check our Cookie Policy',
          'Manage cookies in browser settings',
          'Contact us with privacy concerns'
        ]
      },
      {
        title: 'Safe browsing tips',
        content: 'Here are some tips to ensure you have a safe browsing experience on our platform.',
        steps: [
          'Keep your browser updated',
          'Use strong, unique passwords',
          'Be cautious with personal information',
          'Report suspicious activity immediately'
        ]
      }
    ],
    'international': [
      {
        title: 'International shipping',
        content: 'Shipping availability and costs vary by country. Check with individual retailers for international shipping options.',
        steps: [
          'Click "See Price" to visit the retailer',
          'Check shipping options on their site',
          'Review international shipping policies',
          'Contact the retailer for specific countries'
        ]
      },
      {
        title: 'Currency and pricing',
        content: 'Prices are displayed in various currencies based on the retailer\'s location. Use our currency converter for approximate conversions.',
        steps: [
          'Use the currency selector in the header',
          'Prices will be converted approximately',
          'Final prices are in retailer\'s currency',
          'Check exchange rates for accuracy'
        ]
      },
      {
        title: 'Language support',
        content: 'Our platform supports multiple languages. You can change the language using the language selector in the header.',
        steps: [
          'Click the language selector (🌍)',
          'Choose your preferred language',
          'Interface will update immediately',
          'Product descriptions may remain in original language'
        ]
      }
    ]
  };

  const filteredContent = selectedCategory === 'all' 
    ? Object.values(helpContent).flat()
    : helpContent[selectedCategory] || [];

  const searchFilteredContent = filteredContent.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="help-center-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Centre d'Aide</h1>
          <p className="page-description">
            Trouvez des réponses à vos questions et obtenez l'aide dont vous avez besoin
          </p>
        </div>

        <div className="help-content">
          {/* Search Section */}
          <div className="search-section">
            <div className="search-box">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Navigation */}
          <div className="category-nav">
            {helpCategories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent size={18} />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Help Content */}
          <div className="help-sections">
            {searchFilteredContent.length === 0 ? (
              <div className="no-results">
                <HelpCircle size={48} />
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez de rechercher avec des mots-clés différents ou parcourez les catégories.</p>
              </div>
            ) : (
              searchFilteredContent.map((item, index) => (
                <div key={index} className="help-item">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  {item.steps && (
                    <div className="help-steps">
                      <h4>Étapes :</h4>
                      <ol>
                        {item.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Actions Rapides</h2>
            <div className="action-grid">
              <a href="/contact" className="action-card">
                <MessageCircle size={24} />
                <h3>Nous Contacter</h3>
                <p>Envoyez-nous un message et nous vous répondrons rapidement</p>
              </a>
              <a href="/faq" className="action-card">
                <HelpCircle size={24} />
                <h3>FAQ</h3>
                <p>Consultez nos questions fréquemment posées</p>
              </a>
              <a href="tel:+2250714520133" className="action-card">
                <Phone size={24} />
                <h3>Appeler</h3>
                <p>+225 0714520133 (Lun-Ven 9h-18h)</p>
              </a>
              <a href="mailto:support@adsmarket.com" className="action-card">
                <Mail size={24} />
                <h3>Email</h3>
                <p>support@adsmarket.com</p>
              </a>
            </div>
          </div>

          {/* Contact Support */}
          <div className="contact-support">
            <h2>Besoin d'aide supplémentaire ?</h2>
            <p>Si vous ne trouvez pas la réponse que vous cherchez, notre équipe de support est là pour vous aider.</p>
            <div className="contact-options">
              <a href="/contact" className="contact-button">
                <MessageCircle size={18} />
                Nous Contacter
              </a>
              <a href="/faq" className="contact-button secondary">
                <HelpCircle size={18} />
                Voir la FAQ
              </a>
            </div>
            <div className="support-info">
              <div className="support-item">
                <Clock size={16} />
                <span>Réponse sous 24h</span>
              </div>
              <div className="support-item">
                <Users size={16} />
                <span>Équipe dédiée</span>
              </div>
              <div className="support-item">
                <Shield size={16} />
                <span>Support sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
