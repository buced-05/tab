import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import DialogDemo from './components/DialogDemo';
import FormProgressDemo from './pages/FormProgressDemo';
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
import ModernArticlesPage from './pages/ModernArticles';
import RevolutionaryBlog from './pages/RevolutionaryBlog';
import RevolutionaryArticleDetail from './pages/RevolutionaryArticleDetail';
import AIArticlesPage from './pages/AIArticles';
import AIArticleDetail from './pages/AIArticleDetail';
import './styles/compatibility-fixes.css';
import './App.css';
import './styles/index.css';
import './styles/mobile-products.css';
import './styles/pagination.css';

// Inner App component
const AppContent = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // No profile pages anymore
  const isProfilePage = false;
  // Hide main header on article-related pages (listing and details)
  const path = location.pathname;
  const hideHeaderOnArticles = (
    path.startsWith('/revolutionary-blog') ||
    path.startsWith('/articles') ||
    path.startsWith('/ai-articles') ||
    path.startsWith('/article') ||
    path.startsWith('/ai-article')
  );

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
      <Helmet>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tse2.mm.bing.net" crossOrigin="anonymous" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <link rel="canonical" href={window.location.href.split('#')[0].split('?')[0]} />
        <meta name="keywords" content="articles professionnels, guides, IA, e‑commerce, logiciels, marketing digital, tutoriels, analyses" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AllAdsMarket — Articles et Guides Professionnels" />
        <meta property="og:description" content="Guides approfondis, analyses et tutoriels couvrant technologie, business, logiciels, IA et plus." />
        <meta property="og:image" content="https://alladsmarket.com/og-image.jpg" />
        <meta property="og:url" content={window.location.href.split('#')[0].split('?')[0]} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AllAdsMarket — Articles et Guides Professionnels" />
        <meta name="twitter:description" content="Guides approfondis, analyses et tutoriels couvrant technologie, business, logiciels, IA et plus." />
        <meta name="twitter:image" content="https://alladsmarket.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AllAdsMarket",
            "url": "https://alladsmarket.com/",
            "logo": "https://alladsmarket.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/",
              "https://www.linkedin.com/",
              "https://twitter.com/"
            ]
          })}
        </script>
      </Helmet>
      <ScrollToTop />
      <div className="app">
        {!isProfilePage && !hideHeaderOnArticles && <Header />}
        <main 
          className={`main-content ${isProfilePage ? 'profile-main' : ''}`}
          style={{ 
            paddingTop: isProfilePage || hideHeaderOnArticles ? '0' : 'var(--header-height)'
          }}
        >
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classic" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/articles" element={<AIArticlesPage />} />
                <Route path="/revolutionary-blog" element={<RevolutionaryBlog />} />
                <Route path="/article/:id" element={<RevolutionaryArticleDetail />} />
                <Route path="/ai-articles" element={<AIArticlesPage />} />
                <Route path="/ai-article/:slug" element={<AIArticleDetail />} />
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
                <Route path="/demo" element={<DialogDemo />} />
                <Route path="/form-progress-demo" element={<FormProgressDemo />} />
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
