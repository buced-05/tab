import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  User, 
  Tag,
  Star,
  BookOpen,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Download,
  Printer,
  Bookmark,
  List,
  ChevronRight
} from 'lucide-react';
import { getPremiumAIArticleBySlug, getAllPremiumAIArticles } from '../data/premium-ai-articles';
import { formatShortDate } from '../utils/dateFormatter';
import { getAllProducts } from '../utils/sampleData';
import { translateArticle } from '../utils/articleTranslations';
import ArticleDate from '../components/ArticleDate';
import '../styles/ai-article-detail.css';
import '../styles/loading.css';
// Comments feature removed

const AIArticleDetail = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeSection, setActiveSection] = useState('');
  const [showTOC, setShowTOC] = useState(true);

  useEffect(() => {
    try {
      const allArticles = getAllPremiumAIArticles();
      if (allArticles && Array.isArray(allArticles) && allArticles.length > 0) {
        const foundArticle = allArticles.find(art => art.slug === slug) || allArticles.find(art => art.id === slug);
        if (foundArticle) {
          const translatedArticle = translateArticle(foundArticle, t);
          const defaults = { views: 12450, likes: 320, shares: 75, favorites: 140 };
          const withDefaults = {
            ...translatedArticle,
            views: (typeof translatedArticle.views === 'number' && translatedArticle.views > 0) ? translatedArticle.views : defaults.views,
            likes: (typeof translatedArticle.likes === 'number' && translatedArticle.likes > 0) ? translatedArticle.likes : defaults.likes,
            shares: (typeof translatedArticle.shares === 'number' && translatedArticle.shares > 0) ? translatedArticle.shares : defaults.shares,
            favorites: (typeof translatedArticle.favorites === 'number' && translatedArticle.favorites > 0) ? translatedArticle.favorites : defaults.favorites
          };
          setArticle(withDefaults);
          const toc = generateTableOfContents(foundArticle.content);
          setTableOfContents(toc);
        }
      } else {
        // no articles
      }
    } catch (error) {
      // load error
    }
    setLoading(false);
  }, [slug, t]);

  useEffect(() => {
    const handleScroll = () => {
      const articleContent = document.querySelector('.article-content');
      if (articleContent) {
        const scrollTop = window.pageYOffset;
        const docHeight = articleContent.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        setReadingProgress(scrollPercentRounded);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Gérer le scroll pour la table des matières
  useEffect(() => {
    if (tableOfContents.length > 0) {
      const handleTOCScroll = () => {
        const tocElement = document.querySelector('.table-of-contents');
        if (tocElement) {
          const scrollTop = window.pageYOffset;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          // Calculer la position de la table des matières basée sur le scroll
          const maxScroll = documentHeight - windowHeight;
          const scrollProgress = Math.min(scrollTop / maxScroll, 1);
          
          // Appliquer un mouvement progressif subtil avec effet de parallaxe
          const translateY = scrollProgress * 8; // Mouvement de 8px maximum
          const scale = 1 - (scrollProgress * 0.008); // Légère réduction d'échelle
          const opacity = 1 - (scrollProgress * 0.02); // Légère réduction d'opacité
          const blur = scrollProgress * 0.2; // Effet de flou progressif
          const rotate = scrollProgress * 0.3; // Rotation subtile
          
          // Effet de couleur progressif
          const hue = 240 + (scrollProgress * 20); // Changement de teinte
          const saturation = 100 - (scrollProgress * 10); // Réduction de saturation
          
          tocElement.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
          tocElement.style.opacity = Math.max(opacity, 0.98);
          tocElement.style.filter = `blur(${blur}px) hue-rotate(${hue}deg) saturate(${saturation}%)`;
          
          // Mettre à jour la section active
          handleScroll();
        }
      };
      
      window.addEventListener('scroll', handleTOCScroll);
      return () => window.removeEventListener('scroll', handleTOCScroll);
    }
  }, [tableOfContents]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Fonction pour générer la table des matières
  const generateTableOfContents = (content) => {
    if (!content) return [];

    // Cas 1: contenu HTML -> extraire <h1>-<h6>
    if (/<\s*h[1-6][^>]*>/i.test(content)) {
      const headings = [];
      const regex = /<\s*(h[1-6])[^>]*>(.*?)<\s*\/\s*\1\s*>/gis;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const tag = match[1].toLowerCase(); // h2, h3...
        const level = parseInt(tag.substring(1), 10);
        // Retirer les balises internes pour obtenir le texte
        const raw = match[2].replace(/<[^>]+>/g, '').trim();
        if (!raw) continue;
        const id = raw.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        headings.push({ id, text: raw, level });
      }
      return headings;
    }

    // Cas 2: markdown -> extraire les titres '#'
    const headings = [];
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('#')) {
        const level = trimmedLine.match(/^#+/)[0].length;
        const text = trimmedLine.replace(/^#+\s*/, '').trim();
        const id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        headings.push({ id, text, level, lineNumber: index });
      }
    });
    return headings;
  };

  // Fonction pour gérer le scroll et mettre à jour la section active
  const handleScroll = () => {
    const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean);
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.offsetTop <= scrollPosition) {
        setActiveSection(section.id);
        break;
      }
    }
  };

  // Fonction pour faire défiler vers une section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  // Fonction pour convertir le markdown en HTML (robuste pour listes et paragraphes)
  const convertMarkdownToHTML = (markdown) => {
    if (!markdown) return '';

    // Si HTML déjà présent, retourner tel quel
    if (/<\s*(h[1-6]|p|img|ul|ol|li|div|br|strong|em|a)\b/i.test(markdown)) {
      return markdown;
    }

    // Utiliser un parseur simple basé ligne par ligne
    const lines = markdown.split(/\r?\n/);
    let htmlParts = [];
    let inList = false;

    const closeListIfOpen = () => {
      if (inList) {
        htmlParts.push('</ul>');
        inList = false;
      }
    };

    const renderHeading = (level, title) => {
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      return `<h${level} id="${id}">${title}</h${level}>`;
    };

    const renderInline = (text) => {
      // images ![alt](url)
      let t = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
      // liens [texte](url)
      t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="product-link">$1</a>');
      // gras
      t = t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/__(.*?)__/g, '<strong>$1</strong>');
      // italique
      t = t.replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/_(.*?)_/g, '<em>$1</em>');
      return t;
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (!line.trim()) {
        // ligne vide -> close list and create paragraph break (handled by next paragraph)
        closeListIfOpen();
        continue;
      }

      // Titres markdown
      const h1 = line.match(/^#\s+(.*)$/);
      const h2 = !h1 && line.match(/^##\s+(.*)$/);
      const h3 = !h1 && !h2 && line.match(/^###\s+(.*)$/);
      const h4 = !h1 && !h2 && !h3 && line.match(/^####\s+(.*)$/);
      const h5 = !h1 && !h2 && !h3 && !h4 && line.match(/^#####\s+(.*)$/);
      const h6 = !h1 && !h2 && !h3 && !h4 && !h5 && line.match(/^######\s+(.*)$/);
      if (h1 || h2 || h3 || h4 || h5 || h6) {
        closeListIfOpen();
        const title = (h1||h2||h3||h4||h5||h6)[1];
        const level = h1?1:h2?2:h3?3:h4?4:h5?5:6;
        htmlParts.push(renderHeading(level, renderInline(title)));
        continue;
      }

      // Listes (uniquement si "- " ou "* " au début)
      const liMatch = line.match(/^[-*]\s+(.*)$/);
      if (liMatch) {
        if (!inList) {
          htmlParts.push('<ul>');
          inList = true;
        }
        htmlParts.push(`<li>${renderInline(liMatch[1])}</li>`);
        continue;
      }

      // Paragraphe normal
      closeListIfOpen();
      htmlParts.push(`<p>${renderInline(line)}</p>`);
    }

    // Fermer liste si restée ouverte
    if (inList) htmlParts.push('</ul>');

    return htmlParts.join('\n');
  };

  // Inject diversified product placements: top (mini), middle (grid), bottom (grid)
  const injectProductLinks = (html, slugOrId, articleCtx) => {
    if (!html) return html;
    if ((html.match(/recommended-product-(top|middle|bottom)/g) || []).length >= 3) return html; // already injected

    const parts = html.split(/<\/p>/i);
    const n = parts.length;

    const products = (() => {
      try {
        const list = getAllProducts();
        const normalize = (s) => (s || '').toString().toLowerCase();
        const articleTags = (articleCtx?.tags || []).map(normalize);
        const articleCategory = normalize(articleCtx?.category);
        const tagToCategory = {
          'ia': 'electronics', 'ai': 'electronics', 'seo': 'electronics', 'vidéo': 'electronics',
          'video': 'electronics', 'marketing': 'electronics', 'développement': 'electronics',
          'developpement': 'electronics', 'fashion': 'fashion', 'beaute': 'beauty', 'beauté': 'beauty',
          'home': 'home', 'maison': 'home', 'sport': 'sports', 'electronics': 'electronics'
        };
        const desiredCats = new Set([
          articleCategory,
          ...articleTags.map(t => tagToCategory[t]).filter(Boolean)
        ].filter(Boolean));

        const byCat = list.filter(p => desiredCats.has(normalize(p.category)));
        const pool = byCat.length >= 6 ? byCat : list; // ensure enough diversity

        // Seeded shuffle
        const seedStr = String(slugOrId || '') + '|' + (articleCategory || '') + '|' + (articleTags.join(',') || '');
        let seed = 0; for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
        const arr = [...pool];
        for (let i = arr.length - 1; i > 0; i--) {
          seed = (seed * 1664525 + 1013904223) >>> 0;
          const j = seed % (i + 1);
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // pick first 9 unique products (for three blocks x 3 each)
        const seen = new Set();
        const picks = [];
        for (const p of arr) { if (p && !seen.has(p._id)) { seen.add(p._id); picks.push(p); if (picks.length >= 9) break; } }
        return picks;
      } catch (e) {
        return [];
      }
    })();

    const buildTopLink = (p) => (
      `\n<div class="recommended-product-top" style="margin: 1.25rem 0; padding: 0.75rem 1rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">` +
      `<strong style="display:block; margin-bottom:6px; color:#dc2626;">Produit recommandé</strong>` +
      `<a href="${p?.affiliateUrl || ''}" target="_blank" rel="noopener nofollow sponsored" style="color:#2563eb; text-decoration:underline;">${p?.name || 'Voir le produit'}</a>` +
      `</div>`
    );

    const buildCard = (p, positionClass) => {
      const img = p?.images?.[0]?.url || '';
      const alt = p?.images?.[0]?.alt || p?.name || 'Produit';
      return (
        `\n<div class="recommended-product-${positionClass}" style="margin: 1.5rem 0;">` +
        `<div style="display:flex; gap:14px; align-items:center; padding:12px; border:1px solid #e5e7eb; border-radius:10px; background:#ffffff; box-shadow:0 2px 10px rgba(0,0,0,0.04);">` +
        (img ? `<a href="${p?.affiliateUrl || ''}" target="_blank" rel="noopener nofollow sponsored" style="flex:0 0 140px; display:block;"><img src="${img}" alt="${alt}" loading="lazy" decoding="async" style="width:140px; height:auto; border-radius:8px; border:1px solid #e5e7eb;" /></a>` : '') +
        `<div style="flex:1 1 auto;">` +
        `<div style="font-size:0.9rem; color:#dc2626; margin-bottom:6px; font-weight:700;">Produit recommandé</div>` +
        `<a href="${p?.affiliateUrl || ''}" target="_blank" rel="noopener nofollow sponsored" style="font-weight:700; color:#111827; text-decoration:none;">${p?.name || 'Produit recommandé'}</a>` +
        (p?.description ? `<p style="margin:8px 0 0; color:#374151; line-height:1.5;">${p.description}</p>` : '') +
        `</div>` +
        `</div>` +
        `</div>`
      );
    };

    const buildGrid = (items, positionClass, title='À découvrir aussi') => {
      const cards = items.map(p => {
        const img = p?.images?.[0]?.url || '';
        const alt = p?.images?.[0]?.alt || p?.name || 'Produit';
        return (
          `<div style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden; background:#fff; box-shadow:0 1px 6px rgba(0,0,0,0.05);">
            ${img ? `<a href="${p?.affiliateUrl || ''}" target="_blank" rel="noopener nofollow sponsored"><img src="${img}" alt="${alt}" loading="lazy" decoding="async" style="width:100%; height:auto; display:block;" /></a>` : ''}
            <div style="padding:10px 12px;">
              <a href="${p?.affiliateUrl || ''}" target="_blank" rel="noopener nofollow sponsored" style="font-weight:700; color:#111827; text-decoration:none;">${p?.name || 'Produit'}</a>
            </div>
          </div>`
        );
      }).join('');
      return `\n<div class="recommended-product-${positionClass}" style="margin: 1.5rem 0;">
        <h3 style="margin:0 0 10px;">${title}</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap:12px;">
          ${cards}
        </div>
      </div>`;
    };

    // Determine indices for insertion: after first paragraph, ~middle, ~bottom
    const seed = String(slugOrId || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0) || 7;
    const idxTop = Math.min(2, Math.max(1, 1 + (seed % 2))); // around start
    const idxMid = Math.max(3, Math.min(n - 3, Math.floor(n * 0.5 + ((seed >> 1) % 3))));
    const idxBottom = Math.max(4, Math.min(n - 2, Math.floor(n * 0.85)));

    const [pTop, pMid1, pMid2, pMid3, pBot1, pBot2, pBot3] = [products[0], products[1], products[2], products[3], products[4], products[5], products[6]];

    const rebuilt = parts
      .map((seg, idx) => {
        const base = seg + (idx < n - 1 ? '</p>' : '');
        if (idx === idxTop && pTop) return base + buildTopLink(pTop);
        if (idx === idxMid && (pMid1 || pMid2 || pMid3)) return base + buildGrid([pMid1, pMid2, pMid3].filter(Boolean), 'middle', 'Produits recommandés');
        if (idx === idxBottom && (pBot1 || pBot2 || pBot3)) return base + buildGrid([pBot1, pBot2, pBot3].filter(Boolean), 'bottom', 'À découvrir aussi');
        return base;
      })
      .join('');
    return rebuilt;
  };

  const handleScrollToComments = () => {
    const commentsSection = document.getElementById('comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Si la section n'existe pas, créer un élément temporaire
      const tempDiv = document.createElement('div');
      tempDiv.id = 'comments-section';
      tempDiv.style.paddingTop = '100px';
      document.querySelector('.article-footer')?.after(tempDiv);
      setTimeout(() => {
        tempDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleStatsClick = (type) => {
    switch (type) {
      case 'likes':
        handleLike();
        break;
      case 'shares':
        handleShare();
        break;
      case 'comments':
        alert('Les commentaires sont désactivés.');
        break;
      case 'views':
        // Les vues ne sont généralement pas cliquables, mais on peut faire défiler vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erreur lors du partage:', err);
      }
    } else {
      // Fallback: copier l'URL dans le presse-papiers
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    try {
      // Attendre que html2pdf.js soit chargé si nécessaire
      let retries = 0;
      while (!window.html2pdf && retries < 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        retries++;
      }
      
      // Créer le contenu HTML pour le PDF - récupérer tout le contenu de l'article
      const articleContent = document.querySelector('.article-text');
      if (!articleContent) {
        console.error('Contenu de l\'article non trouvé');
        alert('Erreur: Impossible de récupérer le contenu de l\'article. Veuillez réessayer.');
        return;
      }
      
      // Vérifier que le contenu n'est pas vide
      if (!articleContent.innerHTML || articleContent.innerHTML.trim().length < 50) {
        console.error('Contenu de l\'article vide ou trop court:', articleContent.innerHTML);
        alert('Erreur: Le contenu de l\'article semble vide. Veuillez réessayer.');
        return;
      }
      
      // S'assurer que tout le contenu est récupéré, y compris les éléments cachés
      const fullContent = articleContent.cloneNode(true);
      
      // Rendre tous les liens cliquables dans le contenu cloné
      const allLinksInContent = fullContent.querySelectorAll('a');
      allLinksInContent.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.style.color = '#667eea';
        link.style.textDecoration = 'underline';
        link.style.cursor = 'pointer';
      });

      // Extraire tous les liens produits du contenu
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = articleContent.innerHTML;
      const allLinks = tempDiv.querySelectorAll('a');
      const productLinks = [];
      const amazonLink = 'http://amzn.to/47uWNjT';
      
      allLinks.forEach(link => {
        let href = link.getAttribute('href');
        // Convertir les liens relatifs en absolus pour le PDF
        if (href && href.startsWith('/')) {
          href = window.location.origin + href;
          link.setAttribute('href', href);
        }
        const text = link.textContent.trim();
        if (href && (href.includes('amazon') || href.includes('amzn.to') || href.includes('/products') || href.includes('http'))) {
          productLinks.push({ href, text: text || href });
        }
      });

      // Ajouter le lien Amazon principal s'il n'existe pas déjà
      const hasMainAmazonLink = productLinks.some(link => link.href === amazonLink);
      if (!hasMainAmazonLink) {
        productLinks.unshift({ 
          href: amazonLink, 
          text: '🔗 Découvrir les produits Amazon recommandés' 
        });
      }

      // Créer le HTML des liens produits
      const productLinksHTML = productLinks.length > 0 ? `
        <div class="product-links-section">
          <h2>🔗 Liens Produits et Références</h2>
          <div class="product-links-grid">
            ${productLinks.map((link, index) => `
              <div class="product-link-item">
                <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="product-link-btn">
                  <span class="link-number">${index + 1}</span>
                  <span class="link-text">${link.text}</span>
                  <span class="link-url">${link.href}</span>
                </a>
              </div>
            `).join('')}
          </div>
          <div class="amazon-cta">
            <h3>🛒 Visitez Amazon pour découvrir nos produits recommandés</h3>
            <a href="${amazonLink}" target="_blank" rel="noopener noreferrer" class="amazon-link-main">
              Accéder à Amazon → ${amazonLink}
            </a>
            <p class="cta-description">En cliquant sur ce lien, vous serez redirigé vers Amazon où vous pourrez découvrir une sélection de produits soigneusement choisis et recommandés.</p>
          </div>
        </div>
      ` : `
        <div class="product-links-section">
          <h2>🔗 Lien Principal</h2>
          <div class="amazon-cta">
            <h3>🛒 Visitez Amazon pour découvrir nos produits recommandés</h3>
            <a href="${amazonLink}" target="_blank" rel="noopener noreferrer" class="amazon-link-main">
              Accéder à Amazon → ${amazonLink}
            </a>
            <p class="cta-description">En cliquant sur ce lien, vous serez redirigé vers Amazon où vous pourrez découvrir une sélection de produits soigneusement choisis et recommandés.</p>
          </div>
        </div>
      `;

      // Créer un document HTML complet pour le PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${article.title} - AllAdsMarket</title>
          <style>
            * {
              box-sizing: border-box;
              user-select: text;
              -webkit-user-select: text; /* Safari 3+ support */
            }
            /* Ensure links are visible and clickable in the PDF */
            a[href] {
              color: #1a0dab !important;
              text-decoration: underline !important;
              pointer-events: auto !important;
              position: relative;
            }
            /* Neutralize any fixed/sticky overlays that could cover links */
            [style*="position:fixed"], .fixed, .sticky, [style*="position: sticky"] {
              position: static !important;
              top: auto !important;
              left: auto !important;
              right: auto !important;
              bottom: auto !important;
            }
            /* Avoid giant overlays covering the page */
            [style*="z-index"] { z-index: auto !important; }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.8;
              color: #1a1a1a;
              max-width: 900px;
              margin: 0 auto;
              padding: 40px 30px;
              background: #ffffff;
              font-size: 16px;
            }
            .header-section {
              background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
              color: white;
              padding: 40px;
              border-radius: 12px;
              margin-bottom: 40px;
              box-shadow: 0 16px 40px rgba(17, 24, 39, 0.35);
            }
            
            .header-section h1 {
              font-size: 2.8em;
              margin-bottom: 20px;
              font-weight: 700;
              line-height: 1.2;
              color: white;
              border-bottom: 4px solid rgba(255, 255, 255, 0.2);
              padding-bottom: 18px;
            }
            
            h1, h2, h3, h4, h5, h6 {
              margin-top: 35px;
              margin-bottom: 20px;
              font-weight: 700;
              line-height: 1.3;
            }
            
            h1 { 
              font-size: 2.5em; 
              color: #111827;
              border-bottom: 3px solid #2563eb; 
              padding-bottom: 16px; 
            }
            
            h2 { 
              font-size: 1.875em; 
              color: #0f172a;
              margin-top: 42px;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 12px;
            }
            
            h3 { 
              font-size: 1.5em; 
              color: #334155;
              margin-top: 30px;
            }
            p {
              font-size: 1.1em;
              margin-bottom: 20px;
              text-align: justify;
              color: #000;
            }
            img { max-width: 100%; height: auto; border-radius: 10px; }
            blockquote { border-left: 4px solid #e5e7eb; padding: 10px 16px; background: #f8fafc; color: #334155; }
            code, pre { background: #0f172a; color: #e2e8f0; border-radius: 6px; padding: 2px 6px; }
            table { width: 100%; border-collapse: collapse; margin: 14px 0; }
            th, td { border: 1px solid #e5e7eb; padding: 8px 10px; text-align: left; }
            .product-link {
              color: #111827;
              text-decoration: underline;
              font-weight: 700;
              background: #eef2ff;
              padding: 2px 6px;
              border-radius: 6px;
              border: 1px solid #c7d2fe;
            }
            .product-link:hover {
              background: #e9ecef;
              text-decoration: underline;
            }
            .article-meta {
              background: #f8f9fa;
              padding: 15px;
              border-left: 4px solid #000;
              margin-bottom: 30px;
              color: #000;
            }
            .download-info {
              background: #e8f5e9;
              padding: 12px 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              font-size: 0.9em;
              color: #2e7d32;
              border-left: 4px solid #4caf50;
            }
            
            .article-content {
              background: #ffffff;
              padding: 38px;
              border-radius: 14px;
              box-shadow: 0 16px 40px rgba(2, 8, 23, 0.06);
              border: 1px solid #e5e7eb;
              margin-bottom: 30px;
            }
            
            .product-links-section {
              background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
              padding: 35px;
              border-radius: 12px;
              margin: 40px 0;
              border: 2px solid #e0e7ff;
              box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15);
            }
            
            .product-links-grid {
              display: grid;
              gap: 15px;
              margin-bottom: 30px;
            }
            
            .product-link-item {
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .product-link-btn {
              display: flex;
              align-items: center;
              gap: 15px;
              padding: 18px 20px;
              text-decoration: none !important;
              border: none !important;
              color: #1a1a1a !important;
            }
            
            .link-number {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              flex-shrink: 0;
            }
            
            .link-text {
              flex: 1;
              font-weight: 600;
            }
            
            .link-url {
              font-size: 0.85em;
              color: #667eea;
              font-family: 'Courier New', monospace;
              word-break: break-all;
            }
            
            .amazon-cta {
              background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
              padding: 30px;
              border-radius: 12px;
              text-align: center;
              margin-top: 25px;
              box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
            }
            
            .amazon-cta h3 {
              color: white;
              font-size: 1.8em;
              margin-bottom: 20px;
              margin-top: 0;
            }
            
            .amazon-link-main {
              display: inline-block;
              background: white;
              color: #ff9800;
              padding: 15px 30px;
              border-radius: 8px;
              font-size: 1.1em;
              font-weight: 700;
              text-decoration: none !important;
              border: none !important;
              margin: 15px 0;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .cta-description {
              color: rgba(255, 255, 255, 0.95);
              font-size: 1em;
              margin-top: 15px;
              text-align: center;
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .download-info { display: none; }
            }
            
            /* Amélioration de la lisibilité pour PDF */
            * {
              color: #000 !important;
            }
            
            strong, b {
              color: #000 !important;
              font-weight: bold;
            }
            
            em, i {
              color: #000 !important;
              font-style: italic;
            }
            
            ul, ol {
              color: #000 !important;
            }
            
            li {
              color: #000 !important;
            }
            
            a {
              color: #2563eb !important;
              text-decoration: underline !important;
              cursor: pointer;
              word-break: break-word;
            }
            
            a:hover {
              color: #764ba2 !important;
              text-decoration: underline !important;
            }
          </style>
        </head>
        <body>
          <div class="download-info">
            📄 Document téléchargé depuis AllAdsMarket.com - ${new Date().toLocaleDateString('fr-FR')}
          </div>
          
          <div class="header-section">
            <h1>${article.title}</h1>
            <div class="article-meta">
              <p><strong>📝 Auteur:</strong> ${article.author || 'Équipe AllAdsMarket'}</p>
              <p><strong>📅 Date de publication:</strong> ${article.date ? new Date(article.date).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : new Date().toLocaleDateString('fr-FR')}</p>
              <p><strong>⏱️ Temps de lecture:</strong> ${article.readTime || '15 min'}</p>
              <p><strong>🌐 Source:</strong> <a href="${window.location.href}">${window.location.href}</a></p>
              ${article.category ? `<p><strong>📂 Catégorie:</strong> ${article.category}</p>` : ''}
            </div>
          </div>
          
          <div class="article-content">
            ${fullContent.innerHTML}
          </div>
          
          ${productLinksHTML}
          
          <div style="margin-top: 50px; padding-top: 30px; border-top: 3px solid #e0e0e0; text-align: center; color: #718096; font-size: 0.9em;">
            <p><strong>© ${new Date().getFullYear()} AllAdsMarket</strong></p>
            <p>Cet article a été généré automatiquement par AllAdsMarket.com</p>
            <p>Pour plus d'articles, analyses et ressources e-commerce, visitez <a href="https://alladsmarket.com">alladsmarket.com</a></p>
            <p style="margin-top: 15px; font-size: 0.85em; color: #a0aec0;">
              Document généré le ${new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </body>
        </html>
      `;

      // Utiliser html2pdf pour générer le PDF
      if (window.html2pdf) {
        const opt = {
          margin: 0.5,
          filename: `${article.slug}.pdf`,
          image: { type: 'jpeg', quality: 1.0 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            allowTaint: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
            // Ensure links detection works reliably
            onclone: (doc) => {
              doc.querySelectorAll('a[href]').forEach(a => {
                a.style.pointerEvents = 'auto';
                a.style.display = 'inline';
                a.style.maxWidth = '100%';
              });
            }
          },
          jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          },
          enableLinks: true,
          pagebreak: { mode: ['css', 'legacy'] }
        };

        // Utiliser un élément DOM plutôt qu'une string pour mieux préserver les liens
        // Render into an off-screen iframe to ensure full document semantics
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.left = '-10000px';
        iframe.style.top = '0';
        iframe.style.width = '820px';
        iframe.style.height = '1200px';
        iframe.setAttribute('sandbox', 'allow-same-origin allow-top-navigation-by-user-activation');
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
        // S'assurer que tous les liens sont absolus et cliquables dans l'iframe
        Array.from(iframeDoc.querySelectorAll('a[href]')).forEach(a => {
          const href = a.getAttribute('href');
          if (!href) return;
          // Convert relative to absolute
          if (href.startsWith('/')) {
            a.setAttribute('href', window.location.origin + href);
          }
          // Force https for our domain and for Amazon shortener
          try {
            const u = new URL(a.getAttribute('href'), window.location.origin);
            if (u.hostname.endsWith('alladsmarket.com') || u.hostname === 'amzn.to' || u.hostname.includes('amazon')) {
              u.protocol = 'https:';
              a.setAttribute('href', u.toString());
            }
          } catch {}
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.style.pointerEvents = 'auto';
          a.style.display = 'inline';
          a.style.textDecoration = 'underline';
        });

        try {
          // Wait for iframe content to layout
          await new Promise(r => setTimeout(r, 250));
          const sourceNode = iframeDoc.body;
          await window.html2pdf().set(opt).from(sourceNode).save();
          // If we reach here, download succeeded
        } catch (e) {
          console.error('html2pdf generation failed, falling back to HTML:', e);
          const element = document.createElement('a');
          const file = new Blob([htmlContent], {type: 'text/html'});
          element.href = URL.createObjectURL(file);
          element.download = `${article.slug}.html`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        } finally {
          // Cleanup hidden iframe
          document.body.removeChild(iframe);
        }
      } else {
        // Fallback: télécharger en HTML si html2pdf n'est pas disponible
        const element = document.createElement('a');
        const file = new Blob([htmlContent], {type: 'text/html'});
        element.href = URL.createObjectURL(file);
        element.download = `${article.slug}.html`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert(t('article.downloadError'));
    }
  };

  // Utiliser ArticleDate au lieu de formatDate pour forcer la date au 29 octobre 2025

  if (loading) {
    return (
      <div className="loading-container fullscreen">
        <div className="loading-spinner-large"></div>
        <h3>{t('article.loading')}</h3>
        <p>Préparation du contenu</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="ai-article-detail-error">
        <h1>Article non trouvé</h1>
        <p>L'article que vous recherchez n'existe pas.</p>
        <Link to="/ai-articles" className="back-button">
          <ArrowLeft size={20} />
          Retour aux articles IA
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.seoTitle || article.title}</title>
        <meta name="description" content={article.seoDescription || article.excerpt} />
        <meta name="keywords" content={`${article.metaKeywords || article.tags.join(', ')}, télécharger PDF, télécharger article, PDF gratuit, guide e-commerce, ressources marketing`} />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta property="og:site_name" content="AllAdsMarket" />
        <link rel="canonical" href={window.location.href.split('#')[0].split('?')[0]} />
        
        {/* Download-specific SEO */}
        <meta name="download" content="PDF disponible" />
        <meta name="pdf-available" content="true" />
        <meta name="document-format" content="PDF, HTML" />
        <meta name="download-format" content="PDF" />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={`${article.excerpt} - Téléchargez gratuitement en PDF`} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:article:section" content="E-commerce" />
        <meta property="og:article:tag" content="télécharger, PDF, guide, e-commerce" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={`${article.excerpt} - Téléchargez gratuitement en PDF`} />
        <meta name="twitter:image" content={article.image} />
        
        {/* Article specific */}
        <meta name="article:author" content={article.author} />
        <meta name="article:published_time" content={article.publishDate} />
        <meta name="article:section" content={article.category} />
        <meta name="article:tag" content={article.tags.join(', ')} />
        
        {/* Structured Data for Downloads */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": article.excerpt,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "AllAdsMarket",
              "logo": {
                "@type": "ImageObject",
                "url": "https://alladsmarket.com/logo.png"
              }
            },
            "datePublished": article.publishDate,
            "dateModified": new Date().toISOString(),
            "image": article.image,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": window.location.href
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "description": "Téléchargement gratuit en PDF"
            },
            "distribution": {
              "@type": "DataDownload",
              "encodingFormat": "application/pdf",
              "contentUrl": window.location.href + "#download",
              "description": "Version PDF téléchargeable de l'article"
            }
          })}
        </script>
        {/* Breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Accueil","item":"/"},
              {"@type":"ListItem","position":2,"name":"Articles","item":"/ai-articles"},
              {"@type":"ListItem","position":3,"name": article.title, "item": window.location.href.split('#')[0].split('?')[0]}
            ]
          })}
        </script>
      </Helmet>

      <div className="ai-article-detail">
        {/* Barre de progression de lecture */}
        <div className="reading-progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>

        {/* Navigation */}
        <div className="article-navigation">
          <button 
            className="back-button"
            onClick={() => navigate('/ai-articles')}
          >
            <ArrowLeft size={20} />
            Retour aux articles IA
          </button>
        </div>

        {/* Header de l'article */}
        <header className="article-header">
          <div className="article-meta">
            <div className="article-category">
              <Tag size={16} />
              <span>{article.category}</span>
            </div>
            <div className="article-stats">
              <div className="stat">
                <Eye size={16} />
                <span>{article.views.toLocaleString()}</span>
              </div>
              <div className="stat">
                <Heart size={16} />
                <span>{article.likes.toLocaleString()}</span>
              </div>
              <div className="stat">
                <Star size={16} />
                <span>{article.rating}</span>
              </div>
            </div>
          </div>

          <h1 className="article-title">{article.title}</h1>
          
          <div className="article-excerpt">{article.excerpt}</div>

          <div className="article-info">
            <div className="author-info">
              <span>Newtiv Team</span>
              <span className="publish-date">
                <Calendar size={14} />
                {formatShortDate(article.date)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="article-actions">
            <button 
              className={`action-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              title="Aimer cet article"
            >
              <Heart size={20} />
            </button>
            
            <button 
              className={`action-button ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmark}
              title={isBookmarked ? 'Retirer des sauvegardes' : 'Sauvegarder cet article'}
            >
              <Bookmark size={20} />
            </button>
            
            <button 
              className="action-button" 
              onClick={handleShare}
              title={t('article.shareArticle')}
            >
              <Share2 size={20} />
            </button>
            
            <button 
              className="action-button download-pdf-btn"
              onClick={handleDownload}
              title={t('article.downloadPDF')}
            >
              <Download size={20} />
              <span className="download-badge">PDF</span>
            </button>
            
            <button 
              className="action-button"
              onClick={handlePrint}
              title="Imprimer cet article"
            >
              <Printer size={20} />
            </button>
          </div>

          {/* Tags */}
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Image principale */}
        <div className="article-image">
          <img src={article.image} alt={article.title} loading="eager" decoding="async" fetchpriority="high" />
        </div>

        {/* Contenu de l'article */}
        <main className="article-content">
          <div className="content-layout">
            {/* Table des matières */}
            {tableOfContents.length > 0 && (
              <aside className="table-of-contents">
                <div className="toc-header">
                  <button 
                    className="toc-toggle"
                    onClick={() => setShowTOC(!showTOC)}
                    title={showTOC ? 'Masquer la table des matières' : 'Afficher la table des matières'}
                  >
                    <List size={16} />
                    <span>{t('article.tableOfContents')}</span>
                    <ChevronRight 
                      size={16} 
                      className={`toc-chevron ${showTOC ? 'open' : ''}`}
                    />
                  </button>
                </div>
                
                {showTOC && (
                  <nav className="toc-nav">
                    <ul className="toc-list">
                      {tableOfContents.map((item, index) => (
                        <li 
                          key={index} 
                          className={`toc-item level-${item.level} ${activeSection === item.id ? 'active' : ''}`}
                        >
                          <button
                            className="toc-link"
                            onClick={() => scrollToSection(item.id)}
                            title={`Aller à ${item.text}`}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </aside>
            )}

          {/* Contenu principal */}
          <div className="content-wrapper">
            {/* Section de téléchargement PDF */}
            <div className="download-section" id="download">
              <div className="download-card">
                <div className="download-icon">
                  <Download size={32} />
                </div>
                <div className="download-content">
                  <h3>Téléchargez cet article en PDF</h3>
                  <p>Conservez cet article pour le consulter hors ligne. Le PDF est mis en page pour une lecture et une impression confortables.</p>
                  <button 
                    className="download-pdf-btn-large"
                    onClick={handleDownload}
                  >
                    <Download size={20} />
                    {t('article.downloadPDFFree')}
                  </button>
                </div>
              </div>
            </div>
            
          <div 
            className="article-text"
            dangerouslySetInnerHTML={{ 
              __html: injectProductLinks(convertMarkdownToHTML(article.content), article.slug || article.id, article)
            }}
          />

          {/* Inline product links injected above */}
          </div>
          </div>
        </main>

        {/* Comments removed */}

        {/* Footer de l'article */}
        <footer className="article-footer">
          <div className="article-stats-footer">
            <button 
              className="stat-group clickable" 
              onClick={() => handleStatsClick('views')}
              title="Revenir en haut de l'article"
            >
              <Eye size={20} />
              <span>{article.views.toLocaleString()} vues</span>
            </button>
            <button 
              className="stat-group clickable" 
              onClick={() => handleStatsClick('likes')}
              title="Aimer cet article"
            >
              <Heart size={20} className={isLiked ? 'liked' : ''} />
              <span>{isLiked ? (article.likes + 1).toLocaleString() : article.likes.toLocaleString()} likes</span>
            </button>
            <button 
              className="stat-group clickable" 
              onClick={() => handleStatsClick('shares')}
              title={t('article.shareArticle')}
            >
              <Share2 size={20} />
              <span>{article.shares.toLocaleString()} partages</span>
            </button>
            <button 
              className="stat-group clickable" 
              onClick={() => handleStatsClick('comments')}
              title={t('article.viewComments')}
            >
              <MessageCircle size={20} />
              <span>{t('article.comments')}</span>
            </button>
          </div>

          <div className="article-navigation-footer">
            <Link to="/ai-articles" className="nav-link">
              <BookOpen size={20} />
              <span>Voir tous les articles IA</span>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AIArticleDetail;
