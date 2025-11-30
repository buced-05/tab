#!/usr/bin/env node

/**
 * Script de vérification des imports ESM
 * Vérifie que tous les imports locaux dans les fichiers utilisés par Node.js
 * ont l'extension .js requise pour ESM
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichiers et dossiers à vérifier
const CHECK_PATHS = [
  'src/utils',
  'scripts'
];

// Extensions de fichiers à vérifier
const FILE_EXTENSIONS = ['.js', '.mjs'];

// Pattern pour détecter les imports locaux sans extension
const IMPORT_PATTERN = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
const IMPORT_PATTERN_WITHOUT_EXT = /from\s+['"](\.\.?\/[^'"]+)(?<!\.js|\.mjs|\.json)['"]/g;

/**
 * Vérifie si un fichier est utilisé par des scripts Node.js
 */
function isNodeScriptFile(filePath) {
  // Fichiers dans scripts/ sont toujours des scripts Node.js
  if (filePath.includes('scripts/')) {
    return true;
  }
  
  // Fichiers dans src/utils/ qui sont importés par des scripts
  if (filePath.includes('src/utils/')) {
    // Vérifier si ce fichier est importé par un script
    const utilsFilesUsedByScripts = [
      'seoEnhancer.js',
      'keywordPlacementOptimizer.js',
      'sitemapGenerator.js',
      'sampleData.js'
    ];
    
    const fileName = path.basename(filePath);
    return utilsFilesUsedByScripts.includes(fileName);
  }
  
  return false;
}

/**
 * Extrait tous les imports d'un fichier
 */
function extractImports(content) {
  const imports = [];
  let match;
  
  while ((match = IMPORT_PATTERN.exec(content)) !== null) {
    imports.push({
      fullMatch: match[0],
      importPath: match[1],
      index: match.index
    });
  }
  
  return imports;
}

/**
 * Vérifie si un import local manque l'extension .js
 */
function checkImport(importPath, filePath) {
  // Ignorer les imports de packages npm
  if (!importPath.startsWith('./') && !importPath.startsWith('../')) {
    return { isValid: true };
  }
  
  // Ignorer les imports JSON (ils n'ont pas besoin d'extension en ESM)
  if (importPath.endsWith('.json')) {
    return { isValid: true };
  }
  
  // Vérifier si l'import a une extension
  const hasExtension = /\.(js|mjs|json)$/.test(importPath);
  
  if (!hasExtension) {
    // Vérifier si le fichier cible existe avec .js
    const dir = path.dirname(filePath);
    const resolvedPath = path.resolve(dir, importPath);
    const jsPath = resolvedPath + '.js';
    const exists = fs.existsSync(jsPath);
    
    return {
      isValid: false,
      importPath,
      suggestedPath: importPath + '.js',
      fileExists: exists
    };
  }
  
  return { isValid: true };
}

/**
 * Analyse un fichier
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const imports = extractImports(content);
  const issues = [];
  
  imports.forEach(imp => {
    const check = checkImport(imp.importPath, filePath);
    if (!check.isValid) {
      // Obtenir le numéro de ligne
      const linesBefore = content.substring(0, imp.index).split('\n');
      const lineNumber = linesBefore.length;
      
      issues.push({
        line: lineNumber,
        import: imp.fullMatch,
        importPath: imp.importPath,
        suggestedFix: imp.fullMatch.replace(imp.importPath, check.suggestedPath),
        fileExists: check.fileExists
      });
    }
  });
  
  return issues;
}

/**
 * Scanne récursivement un répertoire
 */
function scanDirectory(dirPath, baseDir = '') {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  entries.forEach(entry => {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(baseDir || process.cwd(), fullPath);
    
    if (entry.isDirectory()) {
      // Ignorer node_modules et autres dossiers
      if (!['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
        files.push(...scanDirectory(fullPath, baseDir || process.cwd()));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (FILE_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  });
  
  return files;
}

/**
 * Génère un rapport
 */
function generateReport() {
  console.log('🔍 Vérification des imports ESM...\n');
  
  const allIssues = [];
  const baseDir = path.resolve(__dirname, '../..');
  
  CHECK_PATHS.forEach(checkPath => {
    const fullPath = path.resolve(baseDir, checkPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  Chemin non trouvé: ${checkPath}`);
      return;
    }
    
    const files = scanDirectory(fullPath, baseDir);
    
    files.forEach(filePath => {
      // Ne vérifier que les fichiers utilisés par Node.js
      if (isNodeScriptFile(filePath)) {
        const issues = analyzeFile(filePath);
        if (issues.length > 0) {
          allIssues.push({
            file: path.relative(baseDir, filePath),
            issues
          });
        }
      }
    });
  });
  
  // Afficher le rapport
  if (allIssues.length === 0) {
    console.log('✅ Tous les imports ESM sont corrects !\n');
    return { success: true, issues: [] };
  }
  
  console.log(`❌ ${allIssues.length} fichier(s) avec des imports invalides :\n`);
  
  allIssues.forEach(({ file, issues }) => {
    console.log(`📄 ${file}:`);
    issues.forEach(issue => {
      console.log(`   Ligne ${issue.line}: ${issue.import}`);
      console.log(`   ❌ Import sans extension: "${issue.importPath}"`);
      if (issue.fileExists) {
        console.log(`   ✅ Fichier existe, suggéré: "${issue.suggestedFix}"`);
      } else {
        console.log(`   ⚠️  Fichier non trouvé: "${issue.importPath}.js"`);
      }
      console.log('');
    });
  });
  
  return { success: false, issues: allIssues };
}

// Exécuter la vérification si le script est appelé directement
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     process.argv[1] && process.argv[1].endsWith('check-esm-imports.js');

if (isMainModule || import.meta.url.endsWith('check-esm-imports.js')) {
  const result = generateReport();
  process.exit(result.success ? 0 : 1);
}

export { checkImport, analyzeFile, generateReport };

