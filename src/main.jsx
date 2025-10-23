import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './utils/performanceMonitor.js'
// import { initializeSEO, monitorSEOPerformance } from './utils/seoOptimization.js'

// Hide initial loader after a short delay
setTimeout(() => {
  document.body.classList.add('app-loaded');
}, 100);

// Initialize SEO optimizations - temporarily disabled
// initializeSEO();
// monitorSEOPerformance();

// Service Worker temporarily disabled to prevent caching issues
// Uncomment when ready for production with proper cache invalidation
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   });
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#22c55e',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </HelmetProvider>
  </StrictMode>,
)