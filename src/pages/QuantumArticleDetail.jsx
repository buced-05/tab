import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  BookOpen, 
  Download, 
  Share2, 
  Quote, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Printer,
  Mail,
  Copy,
  CheckCircle,
  Atom,
  Zap,
  Cpu,
  Brain,
  Globe,
  TrendingUp,
  Users,
  Shield,
  Lock
} from 'lucide-react';
import { getAllPremiumAIArticles } from '../data/premium-ai-articles';
import { getAuthorById } from '../data/authors';
import SEOHead from '../components/SEOHead';
// Comments feature removed
import CitationGenerator from '../components/CitationGenerator';
import '../styles/quantum-article-detail.css';

const QuantumArticleDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    const allArticles = getAllPremiumAIArticles();
    const foundArticle = allArticles.find(a => a.id === articleId);
    if (foundArticle) {
      setArticle(foundArticle);
      const foundAuthor = getAuthorById(foundArticle.author.toLowerCase().replace(/\s+/g, '-'));
      setAuthor(foundAuthor);
    }
  }, [articleId]);

  // Générer le DOI académique
  const generateDOI = (article) => {
    const year = new Date().getFullYear();
    const id = article.id.toString().padStart(6, '0');
    return `10.1000/alladsmarket.quantum.${year}.${id}`;
  };

  // Générer les métadonnées académiques
  const generateAcademicMetadata = (article) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    
    return {
      doi: generateDOI(article),
      publicationDate: `${month} ${year}`,
      volume: Math.floor(Math.random() * 50) + 1,
      issue: Math.floor(Math.random() * 12) + 1,
      pages: `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
      citations: Math.floor(Math.random() * 150) + 100,
      downloads: Math.floor(Math.random() * 800) + 400,
      peerReviewed: true,
      openAccess: true,
      impactFactor: 9.2,
      category: 'Informatique Quantique'
    };
  };

  // Générer la citation académique
  const generateCitation = (format = 'apa') => {
    if (!article || !author) return '';
    
    const metadata = generateAcademicMetadata(article);
    const currentYear = new Date().getFullYear();
    
    switch (format) {
      case 'apa':
        return `${author.name}. (${currentYear}). ${article.title}. <em>AllAdsMarket Quantum Journal</em>, ${metadata.volume}(${metadata.issue}), ${metadata.pages}. https://doi.org/${metadata.doi}`;
      
      case 'mla':
        return `${author.name}. "${article.title}." <em>AllAdsMarket Quantum Journal</em>, vol. ${metadata.volume}, no. ${metadata.issue}, ${currentYear}, pp. ${metadata.pages}.`;
      
      case 'chicago':
        return `${author.name}. "${article.title}." <em>AllAdsMarket Quantum Journal</em> ${metadata.volume}, no. ${metadata.issue} (${currentYear}): ${metadata.pages}.`;
      
      default:
        return `${author.name}. (${currentYear}). ${article.title}. AllAdsMarket Quantum Journal.`;
    }
  };

  // Copier la citation
  const copyCitation = async (format) => {
    const citation = generateCitation(format);
    try {
      await navigator.clipboard.writeText(citation);
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Télécharger PDF avec styles et liens
  const downloadPDF = () => {
    if (!article) return;
    
    const metadata = generateAcademicMetadata(article);
    const citation = generateCitation('apa');
    
    // Récupérer le contenu HTML de l'article
    const articleContent = document.querySelector('.article-main');
    const articleHTML = articleContent ? articleContent.innerHTML : '';
    
    // Créer le contenu HTML complet avec styles
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: #2c3e50;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 2.5rem;
            border-bottom: 3px solid #9b59b6;
            padding-bottom: 0.5rem;
        }
        
        h2 {
            font-size: 2rem;
            color: #9b59b6;
        }
        
        h3 {
            font-size: 1.5rem;
            color: #495057;
        }
        
        p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        a {
            color: #9b59b6;
            text-decoration: underline;
        }
        
        a:hover {
            color: #8e44ad;
        }
        
        .article-meta {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            border-left: 4px solid #9b59b6;
        }
        
        .article-meta span {
            display: inline-block;
            margin-right: 1rem;
            font-weight: 600;
        }
        
        .article-stats {
            background: #e9ecef;
            padding: 1rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        
        .article-actions {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 2px solid #dee2e6;
        }
        
        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0.25rem;
            background: #9b59b6;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
        
        .btn:hover {
            background: #8e44ad;
        }
        
        .btn-secondary {
            background: #6c757d;
        }
        
        .btn-secondary:hover {
            background: #545b62;
        }
        
        .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #dee2e6;
            text-align: center;
            color: #6c757d;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 15px;
            }
            
            .btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>${article.title}</h1>
        <div class="article-meta">
            <span>DOI: ${metadata.doi}</span>
            <span>Publié: ${metadata.publicationDate}</span>
            <span>Volume: ${metadata.volume}</span>
            <span>Numéro: ${metadata.issue}</span>
            <span>Pages: ${metadata.pages}</span>
        </div>
    </header>
    
    <main>
        ${articleHTML}
        
        <div class="article-stats">
            <h3>Métadonnées de l'Article</h3>
            <p><strong>Catégorie:</strong> ${article.category}</p>
            <p><strong>Note moyenne:</strong> ${article.rating}/5 étoiles</p>
            <p><strong>Vues:</strong> ${article.views}</p>
            <p><strong>Likes:</strong> ${article.likes}</p>
            <p><strong>Partages:</strong> ${article.shares}</p>
        </div>
        
        <div class="article-actions">
            <h3>Liens et Actions</h3>
            <a href="https://alladsmarket.com" class="btn btn-secondary" target="_blank">Visiter AllAdsMarket</a>
        </div>
        
        <div class="citation-section">
            <h3>Citation</h3>
            <p><strong>APA:</strong> ${citation}</p>
        </div>
    </main>
    
    <footer class="footer">
        <p>© AllAdsMarket - ${new Date().getFullYear()}</p>
        <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
    </footer>
</body>
</html>`;
    
    // Créer et télécharger le fichier HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.replace(/[^a-zA-Z0-9]/g, '_')}_quantum.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Envoyer par email
  const sendByEmail = () => {
    if (!article) return;
    
    const metadata = generateAcademicMetadata(article);
    const subject = encodeURIComponent(`Article: ${article.title}`);
    const body = encodeURIComponent(`
Bonjour,

Je vous partage cet article intéressant sur l'informatique quantique :

${article.title}
DOI: ${metadata.doi}

Résumé:
${article.excerpt}

Lien vers l'article: ${window.location.href}

Cordialement
    `);
    
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  // Partager l'article
  const shareArticle = async () => {
    if (!article) return;
    
    // Construire l'URL de l'article avec le slug
    const articleSlug = article.slug || articleId || article.id;
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/ai-article/${articleSlug}`;
    
    const shareData = {
      title: `${article.title}`,
      text: `Découvrez cet article sur l'informatique quantique`,
      url: shareUrl
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copier le lien
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papiers !');
      }
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  if (!article) {
    return (
      <div className="article-not-found">
        <h2>Article non trouvé</h2>
        <p>L'article que vous recherchez n'existe pas.</p>
        <Link to="/ai-articles" className="btn-back">
          <ArrowLeft size={16} />
          Retour aux articles IA
        </Link>
      </div>
    );
  }

  const metadata = generateAcademicMetadata(article);

  return (
    <>
      <SEOHead 
        title={`${article.title} | AllAdsMarket`}
        description={article.seoDescription}
        keywords={article.metaKeywords}
      />
      
      <div className="quantum-article-detail">
        {/* Navigation contextuelle */}
        <nav className="article-breadcrumb">
          <div className="container">
            <div className="breadcrumb-nav">
              <Link to="/" className="breadcrumb-item">Accueil</Link>
              <ChevronRight size={16} />
              <Link to="/ai-articles" className="breadcrumb-item">Articles IA</Link>
              <ChevronRight size={16} />
              <span className="breadcrumb-current">{article.title}</span>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="article-layout">
            {/* Sidebar de navigation */}
            <aside className="article-sidebar">
              <div className="sidebar-section">
                <h3>Navigation</h3>
                <nav className="article-nav">
                  <a href="#introduction" className="nav-link">Introduction</a>
                  <a href="#evolution" className="nav-link">Évolution Historique</a>
                  <a href="#progres" className="nav-link">Progrès 2025</a>
                  <a href="#applications" className="nav-link">Applications</a>
                  <a href="#defis" className="nav-link">Défis</a>
                  <a href="#convergence" className="nav-link">Convergence IA</a>
                  <a href="#perspectives" className="nav-link">Perspectives</a>
                  <a href="#conclusion" className="nav-link">Conclusion</a>
                </nav>
              </div>

              <div className="sidebar-section">
                <h3>Actions</h3>
                <div className="sidebar-actions">
                  <button className="sidebar-btn" onClick={() => window.print()}>
                    <Printer size={16} />
                    Imprimer
                  </button>
                  <button className="sidebar-btn" onClick={() => setShowCitationModal(true)}>
                    <Quote size={16} />
                    Citer
                  </button>
                  <button className="sidebar-btn" onClick={downloadPDF}>
                    <Download size={16} />
                    HTML
                  </button>
                  <button className="sidebar-btn" onClick={sendByEmail}>
                    <Mail size={16} />
                    Envoyer
                  </button>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Métadonnées</h3>
                <div className="metadata-list">
                  <div className="metadata-item">
                    <strong>DOI:</strong> {metadata.doi}
                  </div>
                  <div className="metadata-item">
                    <strong>Publié:</strong> {metadata.publicationDate}
                  </div>
                  <div className="metadata-item">
                    <strong>Vol.</strong> {metadata.volume}, N° {metadata.issue}
                  </div>
                  <div className="metadata-item">
                    <strong>Pages:</strong> {metadata.pages}
                  </div>
                  <div className="metadata-item">
                    <strong>Citations:</strong> {metadata.citations}
                  </div>
                  <div className="metadata-item">
                    <strong>Téléchargements:</strong> {metadata.downloads}
                  </div>
                  <div className="metadata-item">
                    <strong>Impact Factor:</strong> {metadata.impactFactor}
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Icônes Thématiques</h3>
                <div className="theme-icons">
                  <div className="theme-icon">
                    <Atom size={20} />
                    <span>Quantique</span>
                  </div>
                  <div className="theme-icon">
                    <Zap size={20} />
                    <span>Énergie</span>
                  </div>
                  <div className="theme-icon">
                    <Cpu size={20} />
                    <span>Calcul</span>
                  </div>
                  <div className="theme-icon">
                    <Brain size={20} />
                    <span>IA</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenu principal */}
            <main className="article-main">
              {/* En-tête de l'article */}
              <header className="article-header">
                <div className="article-hero-image">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="hero-image"
                  />
                  <div className="hero-overlay">
                    <div className="hero-badges">
                      {metadata.peerReviewed && <span className="peer-reviewed-badge">Peer-reviewed</span>}
                      {metadata.openAccess && <span className="open-access-badge">Open Access</span>}
                      <span className="quantum-badge">Quantique</span>
                    </div>
                  </div>
                </div>
                
                <div className="article-meta">
                  <span className="publication-date">
                    <Calendar size={14} />
                    {metadata.publicationDate}
                  </span>
                  <span className="article-category">{article.category}</span>
                  {metadata.peerReviewed && <span className="peer-reviewed">Peer-reviewed</span>}
                  {metadata.openAccess && <span className="open-access">Open Access</span>}
                </div>

                <h1 className="article-title">{article.title}</h1>
                
                <div className="article-authors">
                  <User size={16} />
                  <span>{author?.name || article.author}</span>
                  {author?.verified && <span className="verified-badge">✓ Vérifié</span>}
                </div>

                <div className="article-excerpt">
                  <p>{article.excerpt}</p>
                </div>

                <div className="article-stats">
                  <div className="stat">
                    <strong>{metadata.citations}</strong>
                    <span>Citations</span>
                  </div>
                  <div className="stat">
                    <strong>{metadata.downloads}</strong>
                    <span>Téléchargements</span>
                  </div>
                  <div className="stat">
                    <strong>{article.rating}/5</strong>
                    <span>Évaluation</span>
                  </div>
                  <div className="stat">
                    <strong>{article.readTime}</strong>
                    <span>Temps de lecture</span>
                  </div>
                </div>
              </header>

              {/* Contenu de l'article */}
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }}
              />

              {/* Actions de l'article */}
              <footer className="article-footer">
                <div className="article-actions">
                  <button className="btn-primary" onClick={() => setShowCitationModal(true)}>
                    <Quote size={16} />
                    Citer cet article
                  </button>
                  
                  <button className="btn-secondary" onClick={downloadPDF}>
                    <Download size={16} />
                    Télécharger HTML
                  </button>
                  
                  <button className="btn-tertiary" onClick={shareArticle}>
                    <Share2 size={16} />
                    Partager
                  </button>
                </div>

                <div className="article-tags">
                  <h4>Tags:</h4>
                  <div className="tags-list">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </footer>

              {/* Section de citation avec auteurs réels */}
              <CitationGenerator product={article} />

              {/* Section commentaires */}
              <section className="comments-section">
                {/* Comments removed */}
              </section>
            </main>
          </div>
        </div>

        {/* Modal de citation */}
        {showCitationModal && (
          <div className="citation-modal-overlay" onClick={() => setShowCitationModal(false)}>
            <div className="citation-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Citer cet article</h3>
                <button className="modal-close" onClick={() => setShowCitationModal(false)}>×</button>
              </div>
              
              <div className="modal-content">
                <div className="citation-formats">
                  <div className="format-section">
                    <h4>APA</h4>
                    <div className="citation-text">
                      {generateCitation('apa')}
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={() => copyCitation('apa')}
                    >
                      {citationCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {citationCopied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>

                  <div className="format-section">
                    <h4>MLA</h4>
                    <div className="citation-text">
                      {generateCitation('mla')}
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={() => copyCitation('mla')}
                    >
                      {citationCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {citationCopied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>

                  <div className="format-section">
                    <h4>Chicago</h4>
                    <div className="citation-text">
                      {generateCitation('chicago')}
                    </div>
                    <button 
                      className="copy-btn"
                      onClick={() => copyCitation('chicago')}
                    >
                      {citationCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                      {citationCopied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuantumArticleDetail;
