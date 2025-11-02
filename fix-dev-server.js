#!/usr/bin/env node

/**
 * Script de diagnostic pour le serveur de développement
 * Vérifie les problèmes courants qui empêchent le chargement des modules
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 Diagnostic du serveur de développement...\n');

// 1. Vérifier que le fichier AIArticles.jsx existe
const aiArticlesPath = './src/pages/AIArticles.jsx';
if (fs.existsSync(aiArticlesPath)) {
  console.log('✅ src/pages/AIArticles.jsx existe');
  
  // Vérifier l'export
  const content = fs.readFileSync(aiArticlesPath, 'utf8');
  if (content.includes('export default')) {
    console.log('✅ Export default trouvé');
  } else {
    console.log('❌ Export default manquant');
  }
  
  // Vérifier les imports
  if (content.includes('import')) {
    console.log('✅ Imports présents');
  } else {
    console.log('❌ Imports manquants');
  }
} else {
  console.log('❌ src/pages/AIArticles.jsx n\'existe pas');
}

// 2. Vérifier premium-ai-articles.js
const premiumArticlesPath = './src/data/premium-ai-articles.js';
if (fs.existsSync(premiumArticlesPath)) {
  console.log('✅ src/data/premium-ai-articles.js existe');
  
  const content = fs.readFileSync(premiumArticlesPath, 'utf8');
  if (content.includes('getAllPremiumAIArticlesWithDynamicDates')) {
    console.log('✅ getAllPremiumAIArticlesWithDynamicDates exportée');
  } else {
    console.log('❌ getAllPremiumAIArticlesWithDynamicDates manquante');
  }
} else {
  console.log('❌ src/data/premium-ai-articles.js n\'existe pas');
}

// 3. Vérifier trending-articles-2025.js
const trendingPath = './src/data/trending-articles-2025.js';
if (fs.existsSync(trendingPath)) {
  console.log('✅ src/data/trending-articles-2025.js existe');
  
  try {
    // Tenter de charger le module
    const content = fs.readFileSync(trendingPath, 'utf8');
    if (content.includes('export const trendingArticles2025')) {
      console.log('✅ trendingArticles2025 exporté');
    }
    
    // Vérifier la syntaxe basique
    if (content.includes('];')) {
      console.log('✅ Structure de tableau correcte');
    }
  } catch (e) {
    console.log('❌ Erreur lors de la lecture:', e.message);
  }
} else {
  console.log('❌ src/data/trending-articles-2025.js n\'existe pas');
}

// 4. Vérifier App.jsx
const appPath = './src/App.jsx';
if (fs.existsSync(appPath)) {
  const content = fs.readFileSync(appPath, 'utf8');
  if (content.includes("lazy(() => import('./pages/AIArticles'))")) {
    console.log('✅ Import lazy de AIArticles trouvé dans App.jsx');
  } else {
    console.log('❌ Import lazy de AIArticles manquant dans App.jsx');
  }
}

console.log('\n✅ Diagnostic terminé');
console.log('\n💡 Solution recommandée:');
console.log('   1. Arrêtez le serveur de développement (Ctrl+C)');
console.log('   2. Supprimez node_modules/.vite si il existe');
console.log('   3. Redémarrez avec: npm run dev');

