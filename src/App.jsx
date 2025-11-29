import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ModalProvider, LoadingProvider } from './contexts';
import './i18n'; // Initialize i18n
import './styles/error-boundary.css';
import { testTranslationLoading } from './utils/testTranslationLoading';
import { useTranslation } from 'react-i18next';
import { getCanonicalUrl, getHreflangTags } from './utils/canonicalUtils';

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
import InternalLinksOptimizer from './components/InternalLinksOptimizer';
import './styles/compatibility-fixes.css';
import './App.css';
import './styles/index.css';
import './styles/mobile-products.css';
import './styles/pagination.css';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const AffiliateLinksPage = lazy(() => import('./pages/AffiliateLinksPage'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const FAQ = lazy(() => import('./pages/FAQ'));
const ShippingInfo = lazy(() => import('./pages/ShippingInfo'));
const Returns = lazy(() => import('./pages/Returns'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const DialogDemo = lazy(() => import('./components/DialogDemo'));
const FormProgressDemo = lazy(() => import('./pages/FormProgressDemo'));
const RevolutionaryBlog = lazy(() => import('./pages/RevolutionaryBlog'));
const RevolutionaryArticleDetail = lazy(() => import('./pages/RevolutionaryArticleDetail'));
const AIArticlesPage = lazy(() => import('./pages/AIArticles'));
const AIArticleDetail = lazy(() => import('./pages/AIArticleDetail'));

// Loading component for Suspense
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

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

  // Track page views with Google Analytics and AI platforms visibility
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Send page_view event on route change with brand information
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
        content_type: 'article',
        brand_name: 'AllAdsMarket',
        brand_presence: 'active'
      });
      
      // Update config for SPA routing with AI platform settings
      window.gtag('config', 'G-G21WK948XL', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href,
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        allow_enhanced_conversions: true,
        discovery_campaign_parameters: true
      });
      
      // Envoyer l'événement de présence de marque pour les plateformes IA
      window.gtag('event', 'brand_presence', {
        event_category: 'engagement',
        event_label: 'AllAdsMarket',
        brand_name: 'AllAdsMarket',
        brand_presence: 'active',
        platform: 'web'
      });
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tse2.mm.bing.net" crossOrigin="anonymous" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        {/* Canonical et alternates multilingues - Utilisation du système unifié */}
        {(() => {
          try {
            const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
            const canonicalUrl = getCanonicalUrl(pathname);
            const hreflangTags = getHreflangTags(pathname);
            
            const links = [];
            // Canonical
            links.push(<link key="canonical" rel="canonical" href={canonicalUrl} />);
            // Alternates pour chaque langue
            hreflangTags.forEach((tag) => {
              links.push(<link key={`alt-${tag.hreflang}`} rel="alternate" hrefLang={tag.hreflang} href={tag.href} />);
            });
            return links;
          } catch (error) {
            // Fallback si le système unifié n'est pas disponible (SSR ou erreur)
            if (typeof window !== 'undefined') {
              const fullUrl = window.location.href.split('#')[0].split('?')[0];
              const url = new URL(fullUrl);
              const supported = ['fr','en','en-GB','de','es','it','pt','pt-BR','nl','sv','no','ru','ja','zh','hi','ar','sw','am'];
              const pathname = url.pathname.replace(/\/$/, '') || '/';
              const parts = pathname.split('/').filter(Boolean);
              const hasLangPrefix = parts.length > 0 && supported.includes(parts[0]);
              const basePath = hasLangPrefix ? `/${parts.slice(1).join('/')}` || '/' : pathname;
              const origin = url.origin;
              const links = [];
              links.push(<link key="canonical" rel="canonical" href={fullUrl} />);
              supported.forEach((lang) => {
                const href = lang === 'fr' ? `${origin}${basePath}` : `${origin}/${lang}${basePath === '/' ? '' : basePath}`;
                links.push(<link key={`alt-${lang}`} rel="alternate" hrefLang={lang} href={href} />);
              });
              links.push(<link key="alt-xdefault" rel="alternate" hrefLang="x-default" href={`${origin}${basePath}`} />);
              return links;
            }
            return null;
          }
        })()}
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
      <InternalLinksOptimizer />
      <div className="app">
        {!isProfilePage && !hideHeaderOnArticles && <Header />}
        <main 
          className={`main-content ${isProfilePage ? 'profile-main' : ''}`}
          style={{ 
            paddingTop: isProfilePage || hideHeaderOnArticles ? '0' : 'var(--header-height)'
          }}
        >
          <Suspense fallback={<PageLoader />}>
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
                  <Route path="/app-admin" element={<Admin />} />
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
          </Suspense>
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
    <>
      <Helmet>
        <title>404 - Page Not Found | AllAdsMarket</title>
        <meta name="description" content="La page que vous recherchez n'existe pas." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://alladsmarket.com" />
      </Helmet>
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
    </>
  );
};

export default App;
