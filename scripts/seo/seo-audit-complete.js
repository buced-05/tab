#!/usr/bin/env node

/**
 * AUDIT SEO COMPLET - ALLADSMARKET
 * Script d'analyse et d'amélioration du SEO
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://alladsmarket.com';
const SITE_NAME = 'AllAdsMarket';

// Couleurs pour la console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Fonction de logging coloré
const log = (message, color = 'white') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Fonction de vérification des fichiers
const checkFile = (filePath, description) => {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      log(`✅ ${description}: ${filePath} (${stats.size} bytes)`, 'green');
      return true;
    } else {
      log(`❌ ${description}: ${filePath} - FICHIER MANQUANT`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description}: ${filePath} - ERREUR: ${error.message}`, 'red');
    return false;
  }
};

// Fonction d'analyse du contenu
const analyzeContent = (filePath, description) => {
  try {
    if (!fs.existsSync(filePath)) {
      log(`❌ ${description}: Fichier non trouvé`, 'red');
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    log(`📊 ${description}: ${lines.length} lignes, ${content.length} caractères`, 'blue');
    
    return {
      content,
      lines,
      size: content.length
    };
  } catch (error) {
    log(`❌ ${description}: Erreur de lecture - ${error.message}`, 'red');
    return null;
  }
};

// Fonction de vérification des meta tags
const checkMetaTags = (content, filePath) => {
  const issues = [];
  const checks = [
    {
      name: 'Title tag',
      pattern: /<title[^>]*>([^<]+)<\/title>/i,
      required: true,
      maxLength: 60
    },
    {
      name: 'Meta description',
      pattern: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i,
      required: true,
      maxLength: 160
    },
    {
      name: 'Meta keywords',
      pattern: /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["']/i,
      required: false
    },
    {
      name: 'Canonical URL',
      pattern: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
      required: true
    },
    {
      name: 'Open Graph title',
      pattern: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
      required: true
    },
    {
      name: 'Open Graph description',
      pattern: /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
      required: true
    },
    {
      name: 'Open Graph image',
      pattern: /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
      required: true
    },
    {
      name: 'Twitter Card',
      pattern: /<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["']/i,
      required: true
    }
  ];

  checks.forEach(check => {
    const match = content.match(check.pattern);
    if (check.required && !match) {
      issues.push(`❌ ${check.name} manquant`);
    } else if (match) {
      const value = match[1];
      if (check.maxLength && value.length > check.maxLength) {
        issues.push(`⚠️ ${check.name} trop long (${value.length}/${check.maxLength} caractères)`);
      } else {
        log(`✅ ${check.name}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`, 'green');
      }
    }
  });

  return issues;
};

// Fonction de vérification du structured data
const checkStructuredData = (content) => {
  const issues = [];
  const jsonLdPattern = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = content.match(jsonLdPattern);
  
  if (!matches || matches.length === 0) {
    issues.push('❌ Aucun structured data JSON-LD trouvé');
    return issues;
  }

  log(`✅ ${matches.length} bloc(s) de structured data trouvé(s)`, 'green');
  
  matches.forEach((match, index) => {
    try {
      const jsonContent = match.replace(/<script[^>]*>|<\/script>/gi, '');
      const data = JSON.parse(jsonContent);
      
      if (data['@type']) {
        log(`✅ Structured data ${index + 1}: ${data['@type']}`, 'green');
      } else {
        issues.push(`⚠️ Structured data ${index + 1}: Type manquant`);
      }
    } catch (error) {
      issues.push(`❌ Structured data ${index + 1}: JSON invalide - ${error.message}`);
    }
  });

  return issues;
};

// Fonction de vérification des images
const checkImages = (content) => {
  const issues = [];
  const imgPattern = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const matches = content.match(imgPattern);
  
  if (!matches) {
    log('ℹ️ Aucune image trouvée dans le contenu', 'blue');
    return issues;
  }

  log(`📸 ${matches.length} image(s) trouvée(s)`, 'blue');
  
  matches.forEach((match, index) => {
    const srcMatch = match.match(/src=["']([^"']+)["']/i);
    const altMatch = match.match(/alt=["']([^"']+)["']/i);
    
    if (!altMatch) {
      issues.push(`⚠️ Image ${index + 1}: Attribut alt manquant`);
    } else {
      log(`✅ Image ${index + 1}: Alt="${altMatch[1]}"`, 'green');
    }
  });

  return issues;
};

// Fonction de vérification des liens
const checkLinks = (content) => {
  const issues = [];
  const linkPattern = /<a[^>]*href=["']([^"']+)["'][^>]*>/gi;
  const matches = content.match(linkPattern);
  
  if (!matches) {
    log('ℹ️ Aucun lien trouvé dans le contenu', 'blue');
    return issues;
  }

  log(`🔗 ${matches.length} lien(s) trouvé(s)`, 'blue');
  
  let internalLinks = 0;
  let externalLinks = 0;
  
  matches.forEach((match, index) => {
    const hrefMatch = match.match(/href=["']([^"']+)["']/i);
    if (hrefMatch) {
      const href = hrefMatch[1];
      if (href.startsWith('http') && !href.includes(BASE_URL)) {
        externalLinks++;
      } else {
        internalLinks++;
      }
    }
  });

  log(`📊 Liens internes: ${internalLinks}, Liens externes: ${externalLinks}`, 'blue');
  
  return issues;
};

// Fonction principale d'audit
const performSEOAudit = () => {
  log('\n🔍 AUDIT SEO COMPLET - ALLADSMARKET', 'bold');
  log('=====================================\n', 'bold');

  // 1. Vérification des fichiers essentiels
  log('📁 VÉRIFICATION DES FICHIERS ESSENTIELS', 'cyan');
  log('========================================', 'cyan');
  
  const essentialFiles = [
    { path: 'index.html', desc: 'Page d\'accueil' },
    { path: 'public/robots.txt', desc: 'Fichier robots.txt' },
    { path: 'public/sitemap.xml', desc: 'Sitemap principal' },
    { path: 'public/manifest.json', desc: 'Manifest PWA' },
    { path: 'public/favicon.svg', desc: 'Favicon SVG' },
    { path: 'public/og-image.jpg', desc: 'Image Open Graph' },
    { path: 'public/twitter-card.jpg', desc: 'Image Twitter Card' },
    { path: '.htaccess', desc: 'Configuration Apache' },
    { path: 'nginx.conf', desc: 'Configuration Nginx' }
  ];

  let filesOk = 0;
  essentialFiles.forEach(file => {
    if (checkFile(file.path, file.desc)) {
      filesOk++;
    }
  });

  log(`\n📊 Fichiers essentiels: ${filesOk}/${essentialFiles.length} présents`, 'blue');

  // 2. Analyse de la page d'accueil
  log('\n🏠 ANALYSE DE LA PAGE D\'ACCUEIL', 'cyan');
  log('================================', 'cyan');
  
  const indexContent = analyzeContent('index.html', 'Page d\'accueil');
  if (indexContent) {
    const metaIssues = checkMetaTags(indexContent.content, 'index.html');
    const structuredDataIssues = checkStructuredData(indexContent.content);
    const imageIssues = checkImages(indexContent.content);
    const linkIssues = checkLinks(indexContent.content);

    const allIssues = [...metaIssues, ...structuredDataIssues, ...imageIssues, ...linkIssues];
    
    if (allIssues.length === 0) {
      log('✅ Aucun problème SEO détecté sur la page d\'accueil', 'green');
    } else {
      log('\n⚠️ PROBLÈMES DÉTECTÉS:', 'yellow');
      allIssues.forEach(issue => log(`  ${issue}`, 'yellow'));
    }
  }

  // 3. Analyse du robots.txt
  log('\n🤖 ANALYSE DU ROBOTS.TXT', 'cyan');
  log('========================', 'cyan');
  
  const robotsContent = analyzeContent('public/robots.txt', 'robots.txt');
  if (robotsContent) {
    const robotsIssues = [];
    
    if (!robotsContent.content.includes('Sitemap:')) {
      robotsIssues.push('❌ Directive Sitemap manquante');
    }
    
    if (!robotsContent.content.includes('User-agent:')) {
      robotsIssues.push('❌ Directive User-agent manquante');
    }
    
    if (robotsIssues.length === 0) {
      log('✅ robots.txt correctement configuré', 'green');
    } else {
      robotsIssues.forEach(issue => log(`  ${issue}`, 'yellow'));
    }
  }

  // 4. Analyse du sitemap
  log('\n🗺️ ANALYSE DU SITEMAP', 'cyan');
  log('=====================', 'cyan');
  
  const sitemapContent = analyzeContent('public/sitemap.xml', 'sitemap.xml');
  if (sitemapContent) {
    const sitemapIssues = [];
    
    if (!sitemapContent.content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      sitemapIssues.push('❌ Déclaration XML manquante');
    }
    
    if (!sitemapContent.content.includes('<urlset')) {
      sitemapIssues.push('❌ Balise urlset manquante');
    }
    
    const urlCount = (sitemapContent.content.match(/<url>/g) || []).length;
    log(`📊 Nombre d'URLs dans le sitemap: ${urlCount}`, 'blue');
    
    if (urlCount < 10) {
      sitemapIssues.push('⚠️ Sitemap contient peu d\'URLs');
    }
    
    if (sitemapIssues.length === 0) {
      log('✅ sitemap.xml correctement formaté', 'green');
    } else {
      sitemapIssues.forEach(issue => log(`  ${issue}`, 'yellow'));
    }
  }

  // 5. Vérification des composants SEO
  log('\n🧩 ANALYSE DES COMPOSANTS SEO', 'cyan');
  log('==============================', 'cyan');
  
  const seoComponents = [
    { path: 'src/components/SEOHead.jsx', desc: 'Composant SEO principal' },
    { path: 'src/components/SEOHeadNew.jsx', desc: 'Composant SEO nouveau' },
    { path: 'src/components/SEOHeadEnhanced.jsx', desc: 'Composant SEO amélioré' }
  ];

  seoComponents.forEach(component => {
    checkFile(component.path, component.desc);
  });

  // 6. Recommandations d'amélioration
  log('\n💡 RECOMMANDATIONS D\'AMÉLIORATION', 'cyan');
  log('==================================', 'cyan');
  
  const recommendations = [
    '🔍 Ajouter Google Analytics et Google Search Console',
    '📱 Optimiser les Core Web Vitals (LCP, FID, CLS)',
    '🌐 Implémenter l\'internationalisation (hreflang)',
    '📊 Ajouter des schémas de données pour les produits',
    '🔗 Créer un sitemap d\'images séparé',
    '📰 Créer un sitemap de news pour les articles',
    '⚡ Optimiser la vitesse de chargement',
    '📱 Améliorer l\'expérience mobile',
    '🔒 Implémenter HTTPS strict',
    '📈 Ajouter des métriques de performance'
  ];

  recommendations.forEach(rec => log(`  ${rec}`, 'blue'));

  // 7. Score SEO global
  log('\n📊 SCORE SEO GLOBAL', 'cyan');
  log('==================', 'cyan');
  
  let score = 0;
  let maxScore = 100;
  
  // Fichiers essentiels (20 points)
  score += (filesOk / essentialFiles.length) * 20;
  
  // Meta tags (20 points)
  if (indexContent && checkMetaTags(indexContent.content, 'index.html').length === 0) {
    score += 20;
  }
  
  // Structured data (15 points)
  if (indexContent && checkStructuredData(indexContent.content).length === 0) {
    score += 15;
  }
  
  // Robots.txt (10 points)
  if (robotsContent && robotsContent.content.includes('Sitemap:')) {
    score += 10;
  }
  
  // Sitemap (15 points)
  if (sitemapContent && sitemapContent.content.includes('<urlset')) {
    score += 15;
  }
  
  // Images optimisées (10 points)
  if (indexContent && checkImages(indexContent.content).length === 0) {
    score += 10;
  }
  
  // Configuration serveur (10 points)
  if (checkFile('.htaccess', 'Configuration Apache')) {
    score += 10;
  }

  const scoreColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
  log(`\n🎯 SCORE SEO: ${Math.round(score)}/${maxScore}`, scoreColor);
  
  if (score >= 80) {
    log('✅ Excellent SEO! Continuez à maintenir ces bonnes pratiques.', 'green');
  } else if (score >= 60) {
    log('⚠️ SEO correct mais peut être amélioré. Suivez les recommandations.', 'yellow');
  } else {
    log('❌ SEO nécessite des améliorations importantes. Priorisez les corrections.', 'red');
  }

  log('\n🏁 AUDIT TERMINÉ', 'bold');
  log('================', 'bold');
};

// Exécution de l'audit
performSEOAudit();
