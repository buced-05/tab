import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, AlertCircle, Globe, DollarSign } from 'lucide-react';
import useGeoLocation from '../hooks/useGeoLocation';

const SEOOptimizationTest = () => {
  const { t, i18n } = useTranslation();
  const { userLocation, getSuggestedConfig, isLoading: geoLoading } = useGeoLocation();
  const [tests, setTests] = useState([]);

  useEffect(() => {
    runSEOTests();
  }, [userLocation, i18n.language]);

  const runSEOTests = () => {
    const testResults = [];

    // Test 1: Vérifier les balises hreflang
    const hreflangLinks = document.querySelectorAll('link[hreflang]');
    testResults.push({
      name: 'Balises hreflang',
      status: hreflangLinks.length > 0 ? 'success' : 'error',
      message: `${hreflangLinks.length} balises hreflang trouvées`,
      details: Array.from(hreflangLinks).map(link => ({
        hreflang: link.getAttribute('hreflang'),
        href: link.getAttribute('href')
      }))
    });

    // Test 2: Vérifier les meta tags Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    
    testResults.push({
      name: 'Meta tags Open Graph',
      status: ogTitle && ogDescription && ogImage && ogLocale ? 'success' : 'warning',
      message: ogTitle && ogDescription && ogImage && ogLocale ? 
        'Tous les meta tags Open Graph sont présents' : 
        'Certains meta tags Open Graph sont manquants',
      details: {
        title: ogTitle?.content || 'Manquant',
        description: ogDescription?.content || 'Manquant',
        image: ogImage?.content || 'Manquant',
        locale: ogLocale?.content || 'Manquant'
      }
    });

    // Test 3: Vérifier les données structurées
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    testResults.push({
      name: 'Données structurées JSON-LD',
      status: structuredData.length > 0 ? 'success' : 'error',
      message: `${structuredData.length} scripts de données structurées trouvés`,
      details: Array.from(structuredData).map((script, index) => {
        try {
          const data = JSON.parse(script.textContent);
          return {
            index: index + 1,
            type: data['@type'] || 'Inconnu',
            name: data.name || 'Sans nom'
          };
        } catch (e) {
          return {
            index: index + 1,
            type: 'Erreur de parsing',
            name: 'JSON invalide'
          };
        }
      })
    });

    // Test 4: Vérifier la détection de géolocalisation
    testResults.push({
      name: 'Détection de géolocalisation',
      status: userLocation ? 'success' : geoLoading ? 'warning' : 'error',
      message: userLocation ? 
        `Pays détecté: ${userLocation.country} (${userLocation.countryCode})` :
        geoLoading ? 'Détection en cours...' : 'Impossible de détecter la localisation',
      details: userLocation ? {
        country: userLocation.country,
        countryCode: userLocation.countryCode,
        region: userLocation.region,
        city: userLocation.city,
        timezone: userLocation.timezone,
        suggestedLanguage: userLocation.suggestedLanguage,
        suggestedCurrency: userLocation.suggestedCurrency
      } : null
    });

    // Test 5: Vérifier la langue actuelle
    testResults.push({
      name: 'Configuration de langue',
      status: 'success',
      message: `Langue actuelle: ${i18n.language}`,
      details: {
        currentLanguage: i18n.language,
        availableLanguages: i18n.languages,
        isRTL: document.dir === 'rtl'
      }
    });

    // Test 6: Vérifier les sitemaps
    const sitemapLinks = document.querySelectorAll('link[rel="sitemap"]');
    testResults.push({
      name: 'Liens vers sitemaps',
      status: sitemapLinks.length > 0 ? 'success' : 'warning',
      message: `${sitemapLinks.length} liens vers sitemaps trouvés`,
      details: Array.from(sitemapLinks).map(link => ({
        type: link.getAttribute('type'),
        href: link.getAttribute('href')
      }))
    });

    // Test 7: Vérifier les performances
    const performance = {
      loadTime: performance.now(),
      domContentLoaded: performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0,
      loadComplete: performance.getEntriesByType('navigation')[0]?.loadEventEnd || 0
    };
    
    testResults.push({
      name: 'Performances de chargement',
      status: performance.loadTime < 3000 ? 'success' : performance.loadTime < 5000 ? 'warning' : 'error',
      message: `Temps de chargement: ${Math.round(performance.loadTime)}ms`,
      details: {
        loadTime: `${Math.round(performance.loadTime)}ms`,
        domContentLoaded: `${Math.round(performance.domContentLoaded)}ms`,
        loadComplete: `${Math.round(performance.loadComplete)}ms`
      }
    });

    setTests(testResults);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Test d'Optimisation SEO Multilingue
          </h1>
        </div>

        <div className="space-y-4">
          {tests.map((test, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getStatusColor(test.status)}`}
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{test.message}</p>
                  
                  {test.details && (
                    <div className="mt-3">
                      <details className="text-sm">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          Voir les détails
                        </summary>
                        <div className="mt-2 p-3 bg-white rounded border">
                          <pre className="text-xs overflow-auto">
                            {JSON.stringify(test.details, null, 2)}
                          </pre>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Recommandations SEO</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Assurez-vous que tous les sitemaps sont générés et accessibles</li>
            <li>• Vérifiez que les balises hreflang pointent vers les bonnes URLs</li>
            <li>• Optimisez les images pour le web (WebP, compression)</li>
            <li>• Implémentez le lazy loading pour les images</li>
            <li>• Ajoutez des données structurées pour les produits et articles</li>
            <li>• Configurez Google Search Console pour chaque langue</li>
          </ul>
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={runSEOTests}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Relancer les tests
          </button>
          <button
            onClick={() => window.open('/sitemap.xml', '_blank')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Voir le sitemap
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEOOptimizationTest;
