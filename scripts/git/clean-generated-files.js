#!/usr/bin/env node

/**
 * Script pour nettoyer les fichiers générés avant un merge/pull
 * Évite les conflits avec dist/index.html, dist/sitemap.xml, etc.
 * 
 * Usage: npm run git:clean
 *        node scripts/git/clean-generated-files.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('');
console.log('========================================');
console.log('Nettoyage des fichiers générés');
console.log('========================================');
console.log('');

// Vérifier si Git est disponible
try {
    execSync('git --version', { stdio: 'ignore' });
} catch (error) {
    console.error('[ERREUR] Git n\'est pas installé ou n\'est pas dans le PATH');
    process.exit(1);
}

// Étape 1: Supprimer le dossier dist/
console.log('[1/4] Suppression du dossier dist/...');
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    try {
        fs.rmSync(distPath, { recursive: true, force: true });
        console.log('  ✓ Dossier dist/ supprimé');
    } catch (error) {
        console.log('  ⚠ Erreur lors de la suppression:', error.message);
    }
} else {
    console.log('  ℹ Dossier dist/ n\'existe pas');
}

// Étape 2: Supprimer les fichiers du cache Git
console.log('');
console.log('[2/4] Suppression des fichiers générés dans Git cache...');
try {
    // Vérifier si des fichiers dist/ sont trackés
    let trackedFiles;
    try {
        trackedFiles = execSync('git ls-files dist/', { encoding: 'utf-8', stdio: 'pipe' });
    } catch (error) {
        trackedFiles = '';
    }
    
    if (trackedFiles.trim()) {
        execSync('git rm -r --cached dist/', { stdio: 'inherit' });
        console.log('  ✓ Fichiers dist/ supprimés du cache Git');
    } else {
        console.log('  ℹ Aucun fichier dist/ dans le cache Git');
    }
} catch (error) {
    console.log('  ℹ Aucun fichier dist/ à supprimer du cache Git');
}

// Étape 3: Vérifier qu'aucun fichier n'est encore tracké
console.log('');
console.log('[3/4] Vérification des fichiers trackés dans dist/...');
try {
    const trackedFiles = execSync('git ls-files dist/', { encoding: 'utf-8', stdio: 'pipe' });
    if (trackedFiles.trim()) {
        console.log('  ⚠ Des fichiers dist/ sont encore trackés dans Git');
        console.log('  Exécution: git rm -r --cached dist/');
        execSync('git rm -r --cached dist/', { stdio: 'inherit' });
        console.log('  ✓ Fichiers supprimés du cache Git');
    } else {
        console.log('  ✓ Aucun fichier dist/ n\'est tracké dans Git');
    }
} catch (error) {
    console.log('  ✓ Aucun fichier dist/ n\'est tracké dans Git');
}

// Étape 4: Vérifier le .gitignore
console.log('');
console.log('[4/4] Vérification du .gitignore...');
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    if (gitignoreContent.includes('dist/')) {
        console.log('  ✓ dist/ est bien dans .gitignore');
    } else {
        console.log('  ⚠ ATTENTION: dist/ n\'est pas dans .gitignore');
    }
} else {
    console.log('  ⚠ ATTENTION: .gitignore n\'existe pas');
}

console.log('');
console.log('========================================');
console.log('Nettoyage terminé avec succès!');
console.log('========================================');
console.log('');
console.log('Vous pouvez maintenant exécuter:');
console.log('  git pull');
console.log('  git merge');
console.log('  git rebase');
console.log('');

