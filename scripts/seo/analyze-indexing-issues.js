/**
 * Script d'analyse des problèmes d'indexation
 * Identifie les causes des pages non indexées
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_DIR = path.join(__dirname, '../../public');

// Parser XML simple (sans dépendances)
function parseXML(content) {
  const urls = [];
  const urlMatches = content.matchAll(/<loc>(.*?)<\/loc>/g);
  
  for (const match of urlMatches) {
    urls.push(match[1]);
  }
  
  return urls;
}

// Analyser tous les sitemaps
function analyzeSitemaps() {
  console.log('🔍 Analyse des problèmes d\'indexation...\n');
  
  const issues = {
    totalUrls: 0,
    duplicateUrls: new Set(),
    urlsByType: {},
    urlsByLanguage: {},
    potentialIssues: []
  };

  // Lire tous les sitemaps
  const sitemapFiles = fs.readdirSync(SITEMAP_DIR)
    .filter(file => file.startsWith('sitemap') && file.endsWith('.xml'))
    .filter(file => !file.includes('backup'));

  console.log(`📁 ${sitemapFiles.length} fichiers sitemap trouvés\n`);

  for (const file of sitemapFiles) {
    const filePath = path.join(SITEMAP_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const urls = parseXML(content);
      const urlCount = urls.length;
      
      if (urlCount === 0) {
        // C'est peut-être un sitemapindex
        const sitemapMatches = content.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/g);
        const sitemapCount = Array.from(sitemapMatches).length;
        if (sitemapCount > 0) {
          console.log(`📋 ${file}: ${sitemapCount} sous-sitemaps référencés`);
        }
        continue;
      }

      issues.totalUrls += urlCount;

      // Compter par type
      const type = file.replace('sitemap-', '').replace('.xml', '');
      issues.urlsByType[type] = (issues.urlsByType[type] || 0) + urlCount;

      // Analyser chaque URL
      for (const url of urls) {
        // Détecter les URLs multilingues
        const langMatch = url.match(/\/(en|de|es|it|pt|nl|sv|no|ru|ja|zh|hi|ar|sw|am)(?:-|\.|\/)/);
        if (langMatch) {
          const lang = langMatch[1];
          issues.urlsByLanguage[lang] = (issues.urlsByLanguage[lang] || 0) + 1;
        }

        // Vérifier les doublons
        if (issues.duplicateUrls.has(url)) {
          issues.potentialIssues.push({
            type: 'duplicate',
            url,
            file
          });
        } else {
          issues.duplicateUrls.add(url);
        }

        // Vérifier les problèmes potentiels
        if (url.includes('undefined') || url.includes('null')) {
          issues.potentialIssues.push({
            type: 'invalid_url',
            url,
            file
          });
        }
      }

      console.log(`✅ ${file}: ${urlCount.toLocaleString()} URLs`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'analyse de ${file}:`, error.message);
    }
  }

  // Afficher le rapport
  console.log('\n' + '='.repeat(60));
  console.log('📊 RAPPORT D\'ANALYSE');
  console.log('='.repeat(60));
  
  console.log(`\n📈 Total d'URLs uniques: ${issues.duplicateUrls.size.toLocaleString()}`);
  console.log(`📈 Total d'URLs (avec doublons): ${issues.totalUrls.toLocaleString()}`);
  
  console.log('\n📋 URLs par type:');
  Object.entries(issues.urlsByType)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`   ${type}: ${count.toLocaleString()}`);
    });

  console.log('\n🌍 URLs par langue:');
  Object.entries(issues.urlsByLanguage)
    .sort((a, b) => b[1] - a[1])
    .forEach(([lang, count]) => {
      console.log(`   ${lang}: ${count.toLocaleString()}`);
    });

  // Calculer les URLs multilingues
  const multilingualUrls = Object.values(issues.urlsByLanguage).reduce((a, b) => a + b, 0);
  const baseUrls = issues.duplicateUrls.size - multilingualUrls;
  
  console.log('\n🔍 ANALYSE DES PROBLÈMES:');
  console.log(`   • URLs de base: ${baseUrls.toLocaleString()}`);
  console.log(`   • URLs multilingues: ${multilingualUrls.toLocaleString()}`);
  if (issues.duplicateUrls.size > 0) {
    console.log(`   • Ratio multilingue: ${((multilingualUrls / issues.duplicateUrls.size) * 100).toFixed(1)}%`);
  }
  
  if (multilingualUrls > baseUrls * 10 && baseUrls > 0) {
    console.log('\n⚠️  PROBLÈME DÉTECTÉ: Trop d\'URLs multilingues!');
    console.log('   Les versions multilingues peuvent ne pas exister réellement.');
    console.log('   Solution: Vérifier que les routes multilingues sont implémentées.');
    console.log('   → Si les pages multilingues n\'existent pas, retirer les hreflang des sitemaps');
  }

  if (issues.potentialIssues.length > 0) {
    console.log(`\n⚠️  ${issues.potentialIssues.length} problèmes potentiels détectés:`);
    issues.potentialIssues.slice(0, 10).forEach(issue => {
      console.log(`   • ${issue.type}: ${issue.url.substring(0, 80)}...`);
    });
  }

  // Recommandations
  console.log('\n💡 RECOMMANDATIONS:');
  
  if (issues.duplicateUrls.size > 10000) {
    console.log('   1. ⚠️  Trop d\'URLs dans les sitemaps (>10k)');
    console.log('      → Diviser en plusieurs sitemaps ou réduire le nombre d\'URLs');
  }
  
  if (multilingualUrls > baseUrls * 5 && baseUrls > 0) {
    console.log('   2. ⚠️  URLs multilingues non implémentées');
    console.log('      → Retirer les URLs multilingues des sitemaps si les pages n\'existent pas');
    console.log('      → Ou implémenter les routes multilingues');
  }
  
  console.log('   3. ✅ Vérifier que toutes les URLs retournent un code 200');
  console.log('   4. ✅ Vérifier les meta robots (pas de noindex sur les pages importantes)');
  console.log('   5. ✅ Soumettre les sitemaps à Google Search Console');
  console.log('   6. ✅ Vérifier dans Google Search Console les "6 motifs" de non-indexation');
  
  console.log('\n' + '='.repeat(60));
  
  return issues;
}

// Exécuter l'analyse
analyzeSitemaps();

