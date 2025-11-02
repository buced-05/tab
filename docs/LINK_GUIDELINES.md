# Guidelines pour les Liens dans l'Application

## 🔗 Règles pour tous les liens futurs

### 1. Liens de Partage

**TOUJOURS utiliser `shareLink` de `src/utils/shareUtils.js`:**

```javascript
import { shareLink } from '../utils/shareUtils';

// ✅ CORRECT
const handleShare = async () => {
  await shareLink({
    title: article.title,
    text: article.excerpt
    // url est optionnel - utilise window.location.href par défaut
  });
};

// ❌ INCORRECT - Ne pas faire ça
const handleShare = async () => {
  if (navigator.share) {
    await navigator.share({
      url: window.location.href
    });
  }
};
```

**Tous les liens de partage utilisent automatiquement `window.location.href` pour garantir le bon fonctionnement.**

### 2. URLs dans les PDFs

**JAMAIS exposer les URLs brutes dans les PDFs - UNIQUEMENT les hyperliens cliquables:**

```javascript
import { getLinkText } from '../utils/shareUtils';

// ✅ CORRECT
a.textContent = getLinkText(href);

// ❌ INCORRECT
a.textContent = href; // URL brute exposée
```

**La fonction `getLinkText()` génère automatiquement un texte descriptif:**
- Amazon/amzn.to → "Voir sur Amazon"
- AllAdsMarket → "AllAdsMarket"
- Autres → "Voir le produit" ou nom du domaine

### 3. Masquer les URLs brutes

**Utiliser `hideRawUrls()` pour traiter un conteneur DOM:**

```javascript
import { hideRawUrls } from '../utils/shareUtils';

// Masquer toutes les URLs brutes dans un conteneur
hideRawUrls(container);
```

### 4. Slogan de l'Application

**TOUJOURS utiliser `APP_SLOGAN` de `src/utils/shareUtils.js`:**

```javascript
import { APP_SLOGAN } from '../utils/shareUtils';

// ✅ CORRECT
const slogan = APP_SLOGAN; // "Des Meilleurs articles MOINS Chers"

// ❌ INCORRECT
const slogan = "Votre plateforme premium...";
```

## 📋 Checklist pour les nouveaux liens

- [ ] Utiliser `shareLink()` pour tous les partages
- [ ] Utiliser `getLinkText()` pour les textes de liens dans PDFs
- [ ] Ne jamais exposer d'URLs brutes dans les PDFs
- [ ] Utiliser `APP_SLOGAN` pour le slogan partout
- [ ] Vérifier que tous les liens utilisent `window.location.href` pour le partage

## 🔍 Fichiers modifiés

- `src/utils/shareUtils.js` - Utilitaires centralisés
- `src/pages/AIArticleDetail.jsx` - Utilise `shareLink` et `getLinkText`
- `src/pages/AIArticles.jsx` - Utilise `shareLink`
- `src/pages/ArticleDetail.jsx` - Utilise `shareLink`
- `src/pages/ProductDetail.jsx` - Utilise `shareLink`
- `src/pages/RevolutionaryArticleDetail.jsx` - Utilise `shareLink`
- `src/pages/RevolutionaryBlog.jsx` - Utilise `shareLink`

## 📝 Notes importantes

1. **Tous les liens de partage fonctionnent maintenant** - ils utilisent automatiquement `window.location.href`
2. **Aucune URL brute dans les PDFs** - tous les liens sont masqués et remplacés par des textes descriptifs
3. **Le slogan est centralisé** - utilisez `APP_SLOGAN` pour garantir la cohérence

