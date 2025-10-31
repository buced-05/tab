import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
import { LiveTimeProvider } from './contexts/LiveTimeContext'
import App from './App.jsx'

// Vérifier que l'élément root existe avant de rendre
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ ERREUR: L\'élément #root n\'existe pas dans le DOM!');
  throw new Error('L\'élément #root est requis pour rendre l\'application React');
}

console.log('✅ Root element trouvé, démarrage de l\'application...');

try {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <LiveTimeProvider>
          <App />
        </LiveTimeProvider>
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
  );
  console.log('✅ Application React rendue avec succès!');
  
  // Hide initial loader after React has rendered
  setTimeout(() => {
    if (document.body) {
      document.body.classList.add('app-loaded');
    }
  }, 100);
} catch (error) {
  console.error('❌ ERREUR lors du rendu de l\'application:', error);
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial; color: red;">
        <h1>Erreur de chargement</h1>
        <p>Une erreur s'est produite lors du chargement de l'application.</p>
        <pre>${error.toString()}</pre>
        <button onclick="window.location.reload()">Recharger la page</button>
      </div>
    `;
  }
  throw error;
}