import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMonitor = ({ 
  pageType = 'page',
  product = null,
  category = null,
  isArticle = false 
}) => {
  const [seoScore, setSeoScore] = useState(0);
  const [seoIssues, setSeoIssues] = useState([]);
  const [coreWebVitals, setCoreWebVitals] = useState({});
  const [showPanel, setShowPanel] = useState(false);

  // Fonction pour calculer le score SEO
  const calculateSEOScore = () => {
    let score = 0;
    const issues = [];
    
    // Vérifier la présence des éléments essentiels
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const h1 = document.querySelector('h1');
    const images = document.querySelectorAll('img');
    
    // Titre (20 points)
    if (title && title.textContent) {
      const titleLength = title.textContent.length;
      if (titleLength >= 30 && titleLength <= 60) {
        score += 20;
      } else {
        issues.push('Titre doit faire entre 30 et 60 caractères');
      }
    } else {
      issues.push('Titre manquant');
    }
    
    // Description (20 points)
    if (description && description.content) {
      const descLength = description.content.length;
      if (descLength >= 120 && descLength <= 160) {
        score += 20;
      } else {
        issues.push('Description doit faire entre 120 et 160 caractères');
      }
    } else {
      issues.push('Description manquante');
    }
    
    // Canonical (10 points)
    if (canonical) {
      score += 10;
    } else {
      issues.push('URL canonique manquante');
    }
    
    // H1 (10 points)
    if (h1) {
      score += 10;
    } else {
      issues.push('Balise H1 manquante');
    }
    
    // Images avec alt (10 points)
    let imagesWithAlt = 0;
    images.forEach(img => {
      if (img.alt && img.alt.trim() !== '') {
        imagesWithAlt++;
      }
    });
    
    if (images.length > 0) {
      const altPercentage = (imagesWithAlt / images.length) * 100;
      if (altPercentage >= 80) {
        score += 10;
      } else {
        issues.push(`${Math.round(100 - altPercentage)}% des images n'ont pas d'attribut alt`);
      }
    }
    
    // Liens internes (10 points)
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href*="alladsmarket.com"]');
    if (internalLinks.length >= 3) {
      score += 10;
    } else {
      issues.push('Minimum 3 liens internes recommandés');
    }
    
    // Structure des titres (10 points)
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasProperStructure = true;
    let currentLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > currentLevel + 1) {
        hasProperStructure = false;
      }
      currentLevel = level;
    });
    
    if (hasProperStructure && headings.length >= 2) {
      score += 10;
    } else {
      issues.push('Structure des titres H1-H6 à améliorer');
    }
    
    // Vitesse de chargement (10 points)
    if (window.performance && window.performance.timing) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      if (loadTime < 3000) {
        score += 10;
      } else {
        issues.push(`Temps de chargement: ${Math.round(loadTime)}ms (objectif: <3000ms)`);
      }
    }
    
    setSeoScore(score);
    setSeoIssues(issues);
  };

  // Fonction pour mesurer les Core Web Vitals
  const measureCoreWebVitals = () => {
    if ('web-vital' in window) {
      // Mesurer LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setCoreWebVitals(prev => ({
          ...prev,
          lcp: lastEntry.startTime
        }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Mesurer FID (First Input Delay)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          setCoreWebVitals(prev => ({
            ...prev,
            fid: entry.processingStart - entry.startTime
          }));
        });
      }).observe({ entryTypes: ['first-input'] });

      // Mesurer CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setCoreWebVitals(prev => ({
              ...prev,
              cls: clsValue
            }));
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  };

  // Fonction pour générer le rapport SEO
  const generateSEOReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      pageType,
      score: seoScore,
      issues: seoIssues,
      coreWebVitals,
      recommendations: []
    };

    // Recommandations basées sur le score
    if (seoScore < 70) {
      report.recommendations.push('Score SEO faible - Optimisation urgente nécessaire');
    } else if (seoScore < 85) {
      report.recommendations.push('Score SEO correct - Améliorations possibles');
    } else {
      report.recommendations.push('Score SEO excellent - Maintenir les bonnes pratiques');
    }

    // Recommandations spécifiques
    if (seoIssues.includes('Titre doit faire entre 30 et 60 caractères')) {
      report.recommendations.push('Optimiser la longueur du titre');
    }
    if (seoIssues.includes('Description doit faire entre 120 et 160 caractères')) {
      report.recommendations.push('Optimiser la longueur de la description');
    }
    if (seoIssues.includes('Balise H1 manquante')) {
      report.recommendations.push('Ajouter une balise H1 unique');
    }

    return report;
  };

  useEffect(() => {
    // Calculer le score SEO après le rendu
    const timer = setTimeout(() => {
      calculateSEOScore();
      measureCoreWebVitals();
    }, 1000);

    return () => clearTimeout(timer);
  }, [pageType, product, category, isArticle]);

  // Fonction pour envoyer les données à Google Analytics
  const sendSEODataToGA = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'seo_score', {
        event_category: 'SEO',
        event_label: pageType,
        value: seoScore
      });

      gtag('event', 'core_web_vitals', {
        event_category: 'Performance',
        lcp: coreWebVitals.lcp,
        fid: coreWebVitals.fid,
        cls: coreWebVitals.cls
      });
    }
  };

  useEffect(() => {
    if (seoScore > 0) {
      sendSEODataToGA();
    }
  }, [seoScore, coreWebVitals]);

  return (
    <>
      <Helmet>
        {/* Meta tags pour le monitoring SEO */}
        <meta name="seo-score" content={seoScore} />
        <meta name="seo-issues" content={seoIssues.join(', ')} />
        <meta name="core-web-vitals" content={JSON.stringify(coreWebVitals)} />
        
        {/* Script pour le monitoring en temps réel */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": document.title,
            "description": document.querySelector('meta[name="description"]')?.content,
            "url": window.location.href,
            "seoScore": seoScore,
            "lastModified": new Date().toISOString(),
            "monitoring": {
              "score": seoScore,
              "issues": seoIssues,
              "coreWebVitals": coreWebVitals
            }
          })}
        </script>
      </Helmet>
      
      {/* Affichage du score SEO en mode développement - Masqué par défaut */}
      {process.env.NODE_ENV === 'development' && (
        <>
          {/* Bouton pour afficher/masquer le panneau */}
          <button
            onClick={() => setShowPanel(!showPanel)}
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              background: seoScore >= 85 ? '#28a745' : seoScore >= 70 ? '#ffc107' : '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '5px',
              fontSize: '11px',
              cursor: 'pointer',
              zIndex: 9999,
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            title="Afficher/Masquer le panneau SEO"
          >
            SEO {seoScore}/100 {showPanel ? '▼' : '▲'}
          </button>
          
          {/* Panneau SEO (affiché seulement si showPanel est true) */}
          {showPanel && (
            <div style={{
              position: 'fixed',
              top: '45px',
              right: '10px',
              background: seoScore >= 85 ? '#28a745' : seoScore >= 70 ? '#ffc107' : '#dc3545',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '12px',
              zIndex: 9999,
              maxWidth: '200px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <div><strong>Score SEO: {seoScore}/100</strong></div>
              {seoIssues.length > 0 && (
                <div>
                  <strong>Issues:</strong>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {seoIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Object.keys(coreWebVitals).length > 0 && (
                <div>
                  <strong>Core Web Vitals:</strong>
                  <div>LCP: {coreWebVitals.lcp ? Math.round(coreWebVitals.lcp) + 'ms' : 'N/A'}</div>
                  <div>FID: {coreWebVitals.fid ? Math.round(coreWebVitals.fid) + 'ms' : 'N/A'}</div>
                  <div>CLS: {coreWebVitals.cls ? coreWebVitals.cls.toFixed(3) : 'N/A'}</div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SEOMonitor;
