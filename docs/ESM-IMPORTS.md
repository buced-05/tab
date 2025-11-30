# Guide des Imports ESM

## Problème

En mode ESM (ES Modules), Node.js exige que tous les imports de modules locaux incluent l'extension `.js` explicite.

**❌ Incorrect :**
```javascript
import { something } from './keywordPlacementOptimizer';
```

**✅ Correct :**
```javascript
import { something } from './keywordPlacementOptimizer.js';
```

## Vérification Automatique

Un script de vérification a été créé pour détecter automatiquement les imports invalides :

```bash
npm run check:esm-imports
```

Ce script :
- ✅ Vérifie tous les fichiers dans `src/utils/` utilisés par les scripts Node.js
- ✅ Vérifie tous les fichiers dans `scripts/`
- ✅ Détecte les imports locaux sans extension `.js`
- ✅ Suggère les corrections nécessaires

## Intégration dans le Build

Le script est automatiquement exécuté avant chaque build :

```bash
npm run build
```

Si des imports invalides sont détectés, le build échouera avec un message d'erreur clair.

## Fichiers Vérifiés

Les fichiers suivants sont automatiquement vérifiés car ils sont importés par des scripts Node.js :

- `src/utils/seoEnhancer.js`
- `src/utils/keywordPlacementOptimizer.js`
- `src/utils/sitemapGenerator.js`
- `src/utils/sampleData.js`
- Tous les fichiers dans `scripts/`

## Correction Manuelle

Si le script détecte un problème, corrigez l'import en ajoutant `.js` :

1. Ouvrez le fichier concerné
2. Trouvez l'import problématique
3. Ajoutez `.js` à la fin du chemin d'import
4. Relancez la vérification

## Exemple

**Avant :**
```javascript
export { 
  analyzeKeywordPlacement
} from './keywordPlacementOptimizer';
```

**Après :**
```javascript
export { 
  analyzeKeywordPlacement
} from './keywordPlacementOptimizer.js';
```

## Notes

- Les imports de packages npm (comme `react`, `fs`, etc.) n'ont pas besoin d'extension
- Les imports JSON peuvent avoir ou non l'extension `.json`
- Les fichiers React/JSX dans `src/` n'ont pas besoin d'extension car ils sont traités par Vite
- Seuls les fichiers utilisés directement par Node.js nécessitent l'extension `.js`

