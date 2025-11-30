/**
 * Script pour optimiser toutes les meta descriptions des articles
 * Améliore automatiquement les descriptions pour un meilleur SEO et CTR
 */

import { generateOptimizedDescription } from '../../src/utils/seoEnhancer.js';
import { trendingArticles2025 } from '../../src/data/trending-articles-2025.js';
import { customArticles2025 } from '../../src/data/custom-articles-2025.js';
import { seoArticles30 } from '../../src/data/seo-articles-30.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Analyse et optimise une meta description
 */
function optimizeMetaDescription(article) {
  const currentDescription = article.seoDescription || article.excerpt || '';
  const keywords = article.metaKeywords 
    ? article.metaKeywords.split(',').map(k => k.trim())
    : article.tags || [];
  
  // Générer une description optimisée
  const optimized = generateOptimizedDescription(currentDescription, keywords, {
    includeCTA: true,
    maxLength: 160,
    minLength: 150,
    addValueProposition: true
  });
  
  return {
    original: currentDescription,
    optimized: optimized,
    originalLength: currentDescription.length,
    optimizedLength: optimized.length,
    improved: optimized.length >= 150 && optimized.length <= 160 && optimized !== currentDescription
  };
}

/**
 * Analyse tous les articles et génère un rapport
 */
function analyzeAllArticles() {
  const allArticles = [
    ...trendingArticles2025,
    ...(customArticles2025 || []),
    ...(seoArticles30 || [])
  ];
  
  const results = {
    total: allArticles.length,
    optimized: 0,
    needsImprovement: 0,
    perfect: 0,
    tooShort: 0,
    tooLong: 0,
    details: []
  };
  
  allArticles.forEach(article => {
    const analysis = optimizeMetaDescription(article);
    
    if (analysis.originalLength < 120) {
      results.tooShort++;
      results.needsImprovement++;
    } else if (analysis.originalLength > 160) {
      results.tooLong++;
      results.needsImprovement++;
    } else if (analysis.originalLength >= 150 && analysis.originalLength <= 160) {
      results.perfect++;
    }
    
    if (analysis.improved) {
      results.optimized++;
    }
    
    results.details.push({
      id: article.id,
      title: article.title,
      ...analysis
    });
  });
  
  return results;
}

/**
 * Génère un rapport d'analyse
 */
function generateReport() {
  console.log('🔍 Analyse des meta descriptions...\n');
  
  const results = analyzeAllArticles();
  
  console.log('📊 Résultats de l\'analyse :');
  console.log(`   Total articles : ${results.total}`);
  console.log(`   ✅ Parfaites (150-160 caractères) : ${results.perfect}`);
  console.log(`   ⚠️  À améliorer : ${results.needsImprovement}`);
  console.log(`   📏 Trop courtes (< 120) : ${results.tooShort}`);
  console.log(`   📏 Trop longues (> 160) : ${results.tooLong}`);
  console.log(`   🚀 Optimisables : ${results.optimized}\n`);
  
  // Afficher les articles qui ont besoin d'amélioration
  const needsImprovement = results.details.filter(d => 
    d.originalLength < 150 || d.originalLength > 160 || d.improved
  );
  
  if (needsImprovement.length > 0) {
    console.log('📝 Articles nécessitant une optimisation :\n');
    needsImprovement.slice(0, 10).forEach(detail => {
      console.log(`   ${detail.id}:`);
      console.log(`   Titre: ${detail.title}`);
      console.log(`   Longueur actuelle: ${detail.originalLength} caractères`);
      if (detail.improved) {
        console.log(`   Longueur optimisée: ${detail.optimizedLength} caractères`);
        console.log(`   Description optimisée: ${detail.optimized}`);
      }
      console.log('');
    });
  }
  
  // Générer un fichier JSON avec les recommandations
  const recommendations = needsImprovement.map(d => ({
    id: d.id,
    title: d.title,
    currentDescription: d.original,
    recommendedDescription: d.optimized,
    currentLength: d.originalLength,
    recommendedLength: d.optimizedLength
  }));
  
  const reportPath = path.resolve(__dirname, '../../meta-descriptions-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(recommendations, null, 2), 'utf-8');
  console.log(`\n📄 Rapport détaillé sauvegardé dans : ${reportPath}`);
  
  return results;
}

// Exécuter l'analyse
if (import.meta.url === `file://${process.argv[1]}`) {
  generateReport();
}

export { optimizeMetaDescription, analyzeAllArticles, generateReport };

