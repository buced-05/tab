const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const config = {
  baseUrl: 'https://alladsmarket.com',
  outputDir: path.join(__dirname, '../docs/seo-audit'),
  pages: [
    '/',
    '/products',
    '/featured',
    '/trending',
    '/articles',
    '/contact',
    '/about'
  ]
};

// Fonction pour analyser une page
async function analyzePage(url) {
  try {
    console.log(`🔍 Analyse de ${url}...`);
    
    const response = await axios.get(`${config.baseUrl}${url}`, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)'
      }
    });
    
    const html = response.data;
    const analysis = {
      url,
      status: response.status,
      timestamp: new Date().toISOString(),
      issues: [],
      recommendations: [],
      score: 0
    };
    
    // Vérifier le titre
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    if (titleMatch) {
      const title = titleMatch[1];
      if (title.length < 30 || title.length > 60) {
        analysis.issues.push(`Titre: ${title.length} caractères (objectif: 30-60)`);
      } else {
        analysis.score += 20;
      }
    } else {
      analysis.issues.push('Titre manquant');
    }
    
    // Vérifier la description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    if (descMatch) {
      const description = descMatch[1];
      if (description.length < 120 || description.length > 160) {
        analysis.issues.push(`Description: ${description.length} caractères (objectif: 120-160)`);
      } else {
        analysis.score += 20;
      }
    } else {
      analysis.issues.push('Description manquante');
    }
    
    // Vérifier les H1
    const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
    if (h1Count === 0) {
      analysis.issues.push('Balise H1 manquante');
    } else if (h1Count > 1) {
      analysis.issues.push(`Trop de H1: ${h1Count} (objectif: 1)`);
    } else {
      analysis.score += 10;
    }
    
    // Vérifier les images avec alt
    const images = html.match(/<img[^>]*>/gi) || [];
    const imagesWithAlt = images.filter(img => img.includes('alt=')).length;
    const altPercentage = images.length > 0 ? (imagesWithAlt / images.length) * 100 : 100;
    
    if (altPercentage < 80) {
      analysis.issues.push(`Images sans alt: ${Math.round(100 - altPercentage)}%`);
    } else {
      analysis.score += 10;
    }
    
    // Vérifier les liens internes
    const internalLinks = html.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>/gi) || [];
    if (internalLinks.length < 3) {
      analysis.issues.push(`Liens internes: ${internalLinks.length} (objectif: 3+)`);
    } else {
      analysis.score += 10;
    }
    
    // Vérifier la structure des titres
    const headings = html.match(/<h[1-6][^>]*>/gi) || [];
    if (headings.length < 2) {
      analysis.issues.push('Structure des titres insuffisante');
    } else {
      analysis.score += 10;
    }
    
    // Vérifier les meta tags essentiels
    const essentialMeta = [
      'viewport',
      'robots',
      'canonical'
    ];
    
    essentialMeta.forEach(meta => {
      if (!html.includes(`name="${meta}"`) && !html.includes(`property="${meta}"`)) {
        analysis.issues.push(`Meta tag ${meta} manquant`);
      }
    });
    
    if (analysis.issues.length === 0) {
      analysis.score += 20;
    }
    
    // Générer des recommandations
    if (analysis.score < 70) {
      analysis.recommendations.push('Score SEO faible - Optimisation urgente');
    } else if (analysis.score < 85) {
      analysis.recommendations.push('Score SEO correct - Améliorations possibles');
    } else {
      analysis.recommendations.push('Score SEO excellent');
    }
    
    return analysis;
    
  } catch (error) {
    console.error(`❌ Erreur lors de l'analyse de ${url}:`, error.message);
    return {
      url,
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      issues: ['Page inaccessible'],
      recommendations: ['Vérifier la disponibilité de la page'],
      score: 0
    };
  }
}

// Fonction pour générer le rapport
function generateReport(analyses) {
  const totalScore = analyses.reduce((sum, analysis) => sum + analysis.score, 0);
  const averageScore = totalScore / analyses.length;
  
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: config.baseUrl,
    summary: {
      totalPages: analyses.length,
      averageScore: Math.round(averageScore),
      totalIssues: analyses.reduce((sum, analysis) => sum + analysis.issues.length, 0),
      pagesWithIssues: analyses.filter(analysis => analysis.issues.length > 0).length
    },
    pages: analyses,
    recommendations: [
      'Optimiser les titres et descriptions',
      'Ajouter des balises H1 uniques',
      'Optimiser les images avec des attributs alt',
      'Améliorer la structure des titres',
      'Ajouter plus de liens internes',
      'Vérifier les meta tags essentiels'
    ],
    nextSteps: [
      'Corriger les issues identifiées',
      'Réexécuter l\'audit dans 1 semaine',
      'Mettre en place un monitoring continu',
      'Optimiser les pages avec le score le plus faible'
    ]
  };
  
  return report;
}

// Fonction pour sauvegarder le rapport
function saveReport(report) {
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
  
  const reportPath = path.join(config.outputDir, `seo-audit-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Générer un rapport HTML
  const htmlReport = generateHTMLReport(report);
  const htmlPath = path.join(config.outputDir, `seo-audit-${new Date().toISOString().split('T')[0]}.html`);
  fs.writeFileSync(htmlPath, htmlReport);
  
  console.log(`📊 Rapport sauvegardé: ${reportPath}`);
  console.log(`📄 Rapport HTML: ${htmlPath}`);
  
  return { reportPath, htmlPath };
}

// Fonction pour générer le rapport HTML
function generateHTMLReport(report) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport SEO - ${report.baseUrl}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .score { font-size: 2em; font-weight: bold; color: ${report.summary.averageScore >= 85 ? '#28a745' : report.summary.averageScore >= 70 ? '#ffc107' : '#dc3545'}; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .card { background: #f8f9fa; padding: 15px; border-radius: 5px; text-align: center; }
        .card h3 { margin: 0 0 10px 0; color: #333; }
        .card .value { font-size: 1.5em; font-weight: bold; color: #667eea; }
        .page { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .page-score { font-weight: bold; color: ${report.summary.averageScore >= 85 ? '#28a745' : report.summary.averageScore >= 70 ? '#ffc107' : '#dc3545'}; }
        .issues { margin: 10px 0; }
        .issue { background: #f8d7da; color: #721c24; padding: 5px 10px; margin: 5px 0; border-radius: 3px; }
        .recommendations { background: #d1ecf1; color: #0c5460; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .recommendations ul { margin: 5px 0; padding-left: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Rapport SEO - ${report.baseUrl}</h1>
            <div class="score">Score Moyen: ${report.summary.averageScore}/100</div>
            <p>Généré le ${new Date(report.timestamp).toLocaleString('fr-FR')}</p>
        </div>
        
        <div class="summary">
            <div class="card">
                <h3>Pages Analysées</h3>
                <div class="value">${report.summary.totalPages}</div>
            </div>
            <div class="card">
                <h3>Score Moyen</h3>
                <div class="value">${report.summary.averageScore}/100</div>
            </div>
            <div class="card">
                <h3>Issues Total</h3>
                <div class="value">${report.summary.totalIssues}</div>
            </div>
            <div class="card">
                <h3>Pages avec Issues</h3>
                <div class="value">${report.summary.pagesWithIssues}</div>
            </div>
        </div>
        
        <h2>Analyse par Page</h2>
        ${report.pages.map(page => `
            <div class="page">
                <div class="page-header">
                    <h3>${page.url}</h3>
                    <div class="page-score">${page.score}/100</div>
                </div>
                ${page.issues.length > 0 ? `
                    <div class="issues">
                        <h4>Issues:</h4>
                        ${page.issues.map(issue => `<div class="issue">${issue}</div>`).join('')}
                    </div>
                ` : '<p>✅ Aucun issue détecté</p>'}
            </div>
        `).join('')}
        
        <div class="recommendations">
            <h3>Recommandations Générales</h3>
            <ul>
                ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        
        <div class="recommendations">
            <h3>Prochaines Étapes</h3>
            <ul>
                ${report.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
        </div>
    </div>
</body>
</html>
  `;
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de l\'audit SEO...\n');
  
  const analyses = [];
  
  for (const page of config.pages) {
    const analysis = await analyzePage(page);
    analyses.push(analysis);
    
    // Délai entre les requêtes pour éviter la surcharge
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  const report = generateReport(analyses);
  const { reportPath, htmlPath } = saveReport(report);
  
  console.log('\n📈 Résumé de l\'audit:');
  console.log(`   - Pages analysées: ${report.summary.totalPages}`);
  console.log(`   - Score moyen: ${report.summary.averageScore}/100`);
  console.log(`   - Issues total: ${report.summary.totalIssues}`);
  console.log(`   - Pages avec issues: ${report.summary.pagesWithIssues}`);
  
  console.log('\n🎯 Recommandations prioritaires:');
  report.recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`);
  });
  
  console.log('\n✨ Audit SEO terminé !');
  console.log(`📊 Rapport JSON: ${reportPath}`);
  console.log(`📄 Rapport HTML: ${htmlPath}`);
}

// Exécuter le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  analyzePage,
  generateReport,
  saveReport
};
