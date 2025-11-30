/**
 * Script pour analyser le placement des mots-clés dans tous les articles
 * Vérifie que les mots-clés sont placés dans tous les emplacements clés SEO
 */

import { analyzeKeywordPlacement, generateOptimizationRecommendations } from '../../src/utils/keywordPlacementOptimizer.js';
import { trendingArticles2025 } from '../../src/data/trending-articles-2025.js';
import { customArticles2025 } from '../../src/data/custom-articles-2025.js';
import { seoArticles30 } from '../../src/data/seo-articles-30.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extrait les H2 du contenu markdown
 */
function extractH2Headings(content) {
  if (!content) return [];
  const h2Matches = content.match(/^##\s+(.+)$/gm);
  return h2Matches ? h2Matches.map(match => match.replace(/^##\s+/, '').trim()) : [];
}

/**
 * Analyse un article
 */
function analyzeArticle(article) {
  const h2s = extractH2Headings(article.content);
  
  const pageData = {
    title: article.seoTitle || article.title,
    metaDescription: article.seoDescription || article.excerpt,
    slug: article.slug,
    h1: article.title,
    h2s: h2s,
    content: article.content || article.excerpt || '',
    images: article.image ? [{ alt: '', url: article.image }] : [],
    keywords: article.metaKeywords 
      ? article.metaKeywords.split(',').map(k => k.trim())
      : article.tags || []
  };
  
  return analyzeKeywordPlacement(pageData);
}

/**
 * Génère un rapport complet
 */
function generateReport() {
  console.log('🔍 Analyse du placement des mots-clés dans les articles...\n');
  
  const allArticles = [
    ...trendingArticles2025,
    ...(customArticles2025 || []),
    ...(seoArticles30 || [])
  ];
  
  const results = {
    total: allArticles.length,
    excellent: 0, // 100%
    good: 0, // 80-99%
    needsImprovement: 0, // 50-79%
    critical: 0, // < 50%
    details: []
  };
  
  allArticles.forEach(article => {
    const analysis = analyzeArticle(article);
    const recommendations = generateOptimizationRecommendations(analysis);
    
    if (analysis.percentage === 100) {
      results.excellent++;
    } else if (analysis.percentage >= 80) {
      results.good++;
    } else if (analysis.percentage >= 50) {
      results.needsImprovement++;
    } else {
      results.critical++;
    }
    
    results.details.push({
      id: article.id,
      title: article.title,
      slug: article.slug,
      primaryKeyword: analysis.primaryKeyword,
      score: analysis.score,
      maxScore: analysis.maxScore,
      percentage: analysis.percentage,
      checks: analysis.checks,
      recommendations: recommendations.map(r => r.message)
    });
  });
  
  // Afficher le résumé
  console.log('📊 Résultats de l\'analyse :');
  console.log(`   Total articles : ${results.total}`);
  console.log(`   ✅ Excellent (100%) : ${results.excellent}`);
  console.log(`   ✅ Bon (80-99%) : ${results.good}`);
  console.log(`   ⚠️  À améliorer (50-79%) : ${results.needsImprovement}`);
  console.log(`   ❌ Critique (< 50%) : ${results.critical}\n`);
  
  // Afficher les articles qui ont besoin d'amélioration
  const needsWork = results.details.filter(d => d.percentage < 80);
  
  if (needsWork.length > 0) {
    console.log(`📝 Articles nécessitant une optimisation (${needsWork.length}) :\n`);
    needsWork.slice(0, 15).forEach(detail => {
      console.log(`   ${detail.id}: ${detail.title}`);
      console.log(`   Score: ${detail.score}/${detail.maxScore} (${detail.percentage}%)`);
      console.log(`   Mot-clé principal: "${detail.primaryKeyword}"`);
      console.log(`   Vérifications:`);
      console.log(`     - Title tag: ${detail.checks.titleTag ? '✅' : '❌'}`);
      console.log(`     - Meta description: ${detail.checks.metaDescription ? '✅' : '❌'}`);
      console.log(`     - URL slug: ${detail.checks.urlSlug ? '✅' : '❌'}`);
      console.log(`     - H1: ${detail.checks.h1 ? '✅' : '❌'}`);
      console.log(`     - H2: ${detail.checks.h2 ? '✅' : '❌'}`);
      console.log(`     - Introduction: ${detail.checks.introduction ? '✅' : '❌'}`);
      console.log(`     - Occurrences naturelles: ${detail.checks.naturalOccurrences}`);
      if (detail.recommendations.length > 0) {
        console.log(`   Recommandations:`);
        detail.recommendations.forEach(rec => {
          console.log(`     - ${rec}`);
        });
      }
      console.log('');
    });
  }
  
  // Générer un fichier JSON avec les recommandations
  const reportPath = path.resolve(__dirname, '../../keyword-placement-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      total: results.total,
      excellent: results.excellent,
      good: results.good,
      needsImprovement: results.needsImprovement,
      critical: results.critical
    },
    details: results.details
  }, null, 2), 'utf-8');
  console.log(`\n📄 Rapport détaillé sauvegardé dans : ${reportPath}`);
  
  return results;
}

// Exécuter l'analyse
if (import.meta.url === `file://${process.argv[1]}`) {
  generateReport();
}

export { analyzeArticle, generateReport };

