import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider, LoadingProvider } from './contexts';
import './i18n'; // Initialize i18n
import './styles/error-boundary.css';
import { testTranslationLoading } from './utils/testTranslationLoading';
import { useTranslation } from 'react-i18next';

// Import light security system
import './utils/lightSecurity.js';
// NO CLICK TRACKING - NO DATABASE - SIMPLE VERSION
import {
  Header,
  Footer,
  ModalManager,
  ScrollToTop,
  ErrorBoundary,
  ErrorHandler,
  DeviceNavigationHandler
} from './components';
import {
      Home,
      Products,
      ProductDetail,
      Articles,
      ArticleDetail,
      Admin,
      AffiliateLinksPage,
      HelpCenter,
      ContactUs,
      FAQ,
      ShippingInfo,
      Returns,
      PrivacyPolicy,
      TermsOfService
    } from './pages';
import './App.css';
import './styles/index.css';
import './styles/mobile-products.css';

// Inner App component
const AppContent = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // No profile pages anymore
  const isProfilePage = false;

  useEffect(() => {
    // Ensure loader is hidden
    document.body.classList.add('app-loaded');
    
    // Add/remove class to body for profile pages
    if (isProfilePage) {
      document.body.classList.add('profile-page');
    } else {
      document.body.classList.remove('profile-page');
    }
    
    // Test translations on app load
    setTimeout(() => {
      testTranslationLoading(t, i18n);
    }, 1000);
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('profile-page');
    };
  }, [isProfilePage, t, i18n]);

  return (
    <>
      <ScrollToTop />
      <div className="app">
        {!isProfilePage && <Header />}
        <main 
          className={`main-content ${isProfilePage ? 'profile-main' : ''}`}
          style={{ 
            paddingTop: isProfilePage ? '0' : 'var(--header-height)' 
          }}
        >
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/article/:productId" element={<ArticleDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/featured" element={<Products />} />
                <Route path="/trending" element={<Products />} />
                <Route path="/categories" element={<Products />} />
                <Route path="/visited-items" element={<AffiliateLinksPage />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<ShippingInfo />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isProfilePage && <Footer />}
        <ModalManager />
      </div>
    </>
  );
};

function App() {
  return (
    <ErrorHandler>
      <ErrorBoundary>
        <LoadingProvider>
          <ModalProvider>
            <Router>
              <DeviceNavigationHandler>
                <AppContent />
              </DeviceNavigationHandler>
            </Router>
          </ModalProvider>
        </LoadingProvider>
      </ErrorBoundary>
    </ErrorHandler>
  );
}

// 404 Not Found Component
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/" className="home-button">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
