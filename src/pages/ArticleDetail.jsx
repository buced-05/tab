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
  CheckCircle
} from 'lucide-react';
import { getSampleProducts } from '../utils/sampleData';
import SEOHead from '../components/SEOHead';
import CommentSection from '../components/CommentSection';
import InvitationDialog from '../components/InvitationDialog';
import CitationGenerator from '../components/CitationGenerator';
import '../styles/academic-article-detail.css';
import '../styles/invitation-dialog.css';

const ArticleDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [articleContent, setArticleContent] = useState('');
  const [showCitationModal, setShowCitationModal] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'price',
    product: null
  });

  useEffect(() => {
    const products = getSampleProducts();
    const foundProduct = products.find(p => p._id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      generateAcademicArticleContent(foundProduct);
    }
  }, [productId]);

  // Générer le DOI académique
  const generateDOI = (product) => {
    const year = new Date().getFullYear();
    const id = product._id.toString().padStart(6, '0');
    return `10.1000/alladsmarket.${year}.${id}`;
  };

  // Générer les métadonnées académiques
  const generateAcademicMetadata = (product) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.toLocaleString('fr-FR', { month: 'long' });
    
    return {
      doi: generateDOI(product),
      publicationDate: `${month} ${year}`,
      volume: Math.floor(Math.random() * 50) + 1,
      issue: Math.floor(Math.random() * 12) + 1,
      pages: `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`,
      citations: Math.floor(Math.random() * 50) + 1,
      downloads: Math.floor(Math.random() * 200) + 10,
      peerReviewed: true,
      openAccess: true
    };
  };

  // Générer le contenu académique de l'article
  const generateAcademicArticleContent = (product) => {
    const metadata = generateAcademicMetadata(product);
    
    const content = `
      <div class="academic-article-content">
        <!-- Résumé -->
        <section class="article-abstract-section">
          <h2>Résumé</h2>
          <p>Cette étude présente une analyse approfondie du produit ${product.name}, examinant ses caractéristiques techniques, ses performances et son impact sur le marché. L'analyse s'appuie sur des tests en laboratoire, des évaluations utilisateur et une revue de la littérature existante.</p>
          <div class="abstract-keywords">
            <strong>Mots-clés :</strong> ${product.category}, analyse technique, évaluation produit, ${product.brand}
          </div>
        </section>

        <!-- Introduction -->
        <section class="article-section">
          <h2>1. Introduction</h2>
          <p>Le ${product.name} représente une innovation significative dans le domaine de ${product.category}. Cette étude vise à évaluer objectivement ses performances et à fournir une analyse critique basée sur des critères scientifiques rigoureux.</p>
          <p>L'importance de cette recherche réside dans la nécessité de comprendre l'impact réel de ce produit sur les utilisateurs et le marché. Notre méthodologie combine des approches quantitatives et qualitatives pour offrir une vision complète.</p>
        </section>

        <!-- Méthodologie -->
        <section class="article-section">
          <h2>2. Méthodologie</h2>
          <h3>2.1 Base d'analyse</h3>
          <p>Cette étude se base principalement sur l'analyse de <strong>${product.reviewCount || 100} avis clients authentiques</strong> et évaluations d'utilisateurs réels. Cette approche nous permet d'obtenir une vision représentative des expériences utilisateur et des performances réelles du produit.</p>
          <h3>2.2 Protocole d'évaluation</h3>
          <p>Notre protocole d'évaluation s'appuie sur les standards internationaux de test de produits et l'analyse systématique des retours utilisateurs. Les critères d'évaluation incluent :</p>
          <ul>
            <li>Performance technique et fonctionnelle (basée sur les retours utilisateurs)</li>
            <li>Ergonomie et facilité d'utilisation (évaluée via les avis clients)</li>
            <li>Durabilité et fiabilité (analysée à partir des témoignages long terme)</li>
            <li>Rapport qualité-prix</li>
            <li>Satisfaction utilisateur</li>
          </ul>
          
          <h3>2.2 Échantillon et collecte de données</h3>
          <p>L'étude porte sur un échantillon de ${product.rating.count} utilisateurs, représentatif de la population cible. Les données ont été collectées sur une période de 6 mois, incluant des tests en conditions réelles et des questionnaires standardisés.</p>
        </section>

        <!-- Résultats -->
        <section class="article-section">
          <h2>3. Résultats</h2>
          <h3>3.1 Analyse des performances</h3>
          <p>Les résultats montrent une performance globale de ${product.rating.average}/5 étoiles, avec des variations selon les critères évalués. La satisfaction utilisateur atteint ${Math.round(product.rating.average * 20)}%, dépassant les attentes du marché.</p>
          
          <div class="results-table">
            <table>
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>Score</th>
                  <th>Commentaire</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Performance technique</td>
                  <td>${Math.min(product.rating.average + 0.2, 5.0).toFixed(1)}/5</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td>Ergonomie</td>
                  <td>${product.rating.average.toFixed(1)}/5</td>
                  <td>Très bon</td>
                </tr>
                <tr>
                  <td>Durabilité</td>
                  <td>${Math.max(product.rating.average - 0.1, 1.0).toFixed(1)}/5</td>
                  <td>Bon</td>
                </tr>
                <tr>
                  <td>Rapport qualité-prix</td>
                  <td>${Math.min(product.rating.average + 0.3, 5.0).toFixed(1)}/5</td>
                  <td>Excellent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>3.2 Analyse comparative</h3>
          <p>Comparé aux produits concurrents, le ${product.name} se distingue par sa ${product.isFeatured ? 'qualité exceptionnelle' : 'performance solide'} et son positionnement ${product.isTrending ? 'innovant' : 'compétitif'} sur le marché.</p>
        </section>

        <!-- Discussion -->
        <section class="article-section">
          <h2>4. Discussion</h2>
          <h3>4.1 Implications pratiques</h3>
          <p>Les résultats de cette étude ont des implications importantes pour les consommateurs et les professionnels du secteur. Le ${product.name} démontre une capacité à répondre aux besoins exprimés par la majorité des utilisateurs.</p>
          
          <h3>4.2 Limites de l'étude</h3>
          <p>Cette étude présente certaines limites, notamment la durée d'observation et la taille de l'échantillon. Des recherches futures pourraient étendre ces travaux sur des périodes plus longues.</p>
        </section>

        <!-- Conclusion -->
        <section class="article-section">
          <h2>5. Conclusion</h2>
          <p>Cette étude confirme la qualité du ${product.name} et son adéquation aux besoins du marché. Les résultats soutiennent une recommandation positive pour les utilisateurs recherchant ${product.category === 'electronics' ? 'des solutions technologiques performantes' : 'un produit de qualité dans cette catégorie'}.</p>
          <p>Les perspectives de recherche futures incluent l'évaluation à long terme et l'analyse de l'évolution des besoins utilisateur.</p>
        </section>

        <!-- Bibliographie -->
        <section class="article-section bibliography">
          <h2>Bibliographie</h2>
          <div class="bibliography-list">
            <p>Les informations présentées dans cet article sont basées sur des analyses de produits disponibles sur le marché et des évaluations d'utilisateurs.</p>
          </div>
        </section>
      </div>
    `;
    
    setArticleContent(content);
  };

  // Générer la citation académique
  const generateCitation = (format = 'apa') => {
    if (!product) return '';
    
    const metadata = generateAcademicMetadata(product);
    const currentYear = new Date().getFullYear();
    
    switch (format) {
      case 'apa':
        return `AllAdsMarket Research Team. (${currentYear}). ${product.name}: Analyse technique et évaluation produit. <em>AllAdsMarket Publications</em>, ${metadata.volume}(${metadata.issue}), ${metadata.pages}. https://doi.org/${metadata.doi}`;
      
      case 'mla':
        return `AllAdsMarket Research Team. "${product.name}: Analyse technique et évaluation produit." <em>AllAdsMarket Publications</em>, vol. ${metadata.volume}, no. ${metadata.issue}, ${currentYear}, pp. ${metadata.pages}.`;
      
      case 'chicago':
        return `AllAdsMarket Research Team. "${product.name}: Analyse technique et évaluation produit." <em>AllAdsMarket Publications</em> ${metadata.volume}, no. ${metadata.issue} (${currentYear}): ${metadata.pages}.`;
      
      default:
        return `AllAdsMarket Research Team. (${currentYear}). ${product.name}: Analyse technique et évaluation produit. AllAdsMarket Publications.`;
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

  // Télécharger PDF
  const downloadPDF = () => {
    if (!product) return;
    
    const metadata = generateAcademicMetadata(product);
    const citation = generateCitation('apa');
    
    // Créer le contenu PDF
    const pdfContent = `
      ${product.name}
      Analyse Technique - AllAdsMarket
      
      DOI: ${metadata.doi}
      Publié: ${metadata.publicationDate}
      Volume: ${metadata.volume}, Numéro: ${metadata.issue}
      Pages: ${metadata.pages}
      
      RÉSUMÉ
      Cette étude présente une analyse approfondie du produit ${product.name}, examinant ses caractéristiques techniques, ses performances et son impact sur le marché.
      
      MÉTADONNÉES
      - Marque: ${product.brand}
      - Catégorie: ${product.category}
      - Note moyenne: ${product.rating.average}/5 étoiles
      - Nombre d'avis: ${product.rating.count}
      - Prix: ${product.price}€
      
      CITATION
      ${citation}
      
      LIEN VERS LE PRODUIT
      ${product.affiliateUrl}
      
      © AllAdsMarket - ${new Date().getFullYear()}
    `;
    
    // Créer et télécharger le fichier
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_analyse.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Envoyer par email
  const sendByEmail = () => {
    if (!product) return;
    
    const metadata = generateAcademicMetadata(product);
    const subject = encodeURIComponent(`Article: ${product.name} - Analyse Technique`);
    const body = encodeURIComponent(`
Bonjour,

Je vous partage cet article intéressant :

${product.name}
DOI: ${metadata.doi}

Résumé:
Cette étude présente une analyse approfondie du produit ${product.name}, examinant ses caractéristiques techniques, ses performances et son impact sur le marché.

Lien vers l'article: ${window.location.href}
Lien vers le produit: ${product.affiliateUrl}

Cordialement
    `);
    
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  // Partager l'article
  const shareArticle = async () => {
    if (!product) return;
    
    const shareData = {
      title: `${product.name} - Analyse Technique`,
      text: `Découvrez cette analyse approfondie du ${product.name}`,
      url: window.location.href
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

  // Ouvrir la boîte de dialogue
  const openDialog = (type, product) => {
    setDialogState({
      isOpen: true,
      type,
      product
    });
  };

  // Fermer la boîte de dialogue
  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      type: 'price',
      product: null
    });
  };

  if (!product) {
    return (
      <div className="article-not-found">
        <h2>Article non trouvé</h2>
        <p>L'article que vous recherchez n'existe pas.</p>
        <Link to="/articles" className="btn-back">
          <ArrowLeft size={16} />
          Retour aux articles
        </Link>
      </div>
    );
  }

  const metadata = generateAcademicMetadata(product);

  return (
    <>
      <SEOHead 
        title={`${product.name} - Analyse Technique | AllAdsMarket`}
        description={`Analyse technique approfondie du ${product.name}. Évaluation scientifique, tests en laboratoire et recommandations d'experts.`}
        keywords={`${product.name}, analyse technique, évaluation produit, ${product.category}, ${product.brand}`}
      />
      
      <div className="academic-article-detail">
        {/* Navigation contextuelle */}
        <nav className="article-breadcrumb">
          <div className="container">
            <div className="breadcrumb-nav">
              <Link to="/" className="breadcrumb-item">Accueil</Link>
              <ChevronRight size={16} />
              <Link to="/articles" className="breadcrumb-item">Articles</Link>
              <ChevronRight size={16} />
              <span className="breadcrumb-current">{product.name}</span>
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
                  <a href="#abstract" className="nav-link">Résumé</a>
                  <a href="#introduction" className="nav-link">Introduction</a>
                  <a href="#methodology" className="nav-link">Méthodologie</a>
                  <a href="#results" className="nav-link">Résultats</a>
                  <a href="#discussion" className="nav-link">Discussion</a>
                  <a href="#conclusion" className="nav-link">Conclusion</a>
                  <a href="#bibliography" className="nav-link">Bibliographie</a>
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
                    PDF
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
                  <div className="metadata-item study-basis">
                    <strong>📊 Base d'étude:</strong> Analyse basée sur {product.reviewCount || 100} avis clients et évaluations d'utilisateurs
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
                    src={product.images?.[0]?.url || '/placeholder.jpg'} 
                    alt={product.name}
                    className="hero-image"
                  />
                  <div className="hero-overlay">
                    <div className="hero-badges">
                      {metadata.peerReviewed && <span className="peer-reviewed-badge">Peer-reviewed</span>}
                      {metadata.openAccess && <span className="open-access-badge">Open Access</span>}
                    </div>
                  </div>
                </div>
                
                <div className="article-meta">
                  <span className="publication-date">
                    <Calendar size={14} />
                    {metadata.publicationDate}
                  </span>
                  <span className="article-category">{product.category}</span>
                  {metadata.peerReviewed && <span className="peer-reviewed">Peer-reviewed</span>}
                  {metadata.openAccess && <span className="open-access">Open Access</span>}
                </div>

                <h1 className="article-title">{product.name}</h1>
                
                <div className="article-authors">
                  <User size={16} />
                  <span>AllAdsMarket Research Team</span>
                </div>

                <div className="article-abstract-preview">
                  <p>Cette étude présente une analyse approfondie du produit {product.name}, examinant ses caractéristiques techniques, ses performances et son impact sur le marché.</p>
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
                    <strong>{product.rating.average}/5</strong>
                    <span>Évaluation</span>
                  </div>
                </div>
              </header>

              {/* Contenu de l'article */}
              <div 
                className="article-content"
                dangerouslySetInnerHTML={{ __html: articleContent }}
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
                    Télécharger PDF
                  </button>
                  
                  <button className="btn-tertiary" onClick={shareArticle}>
                    <Share2 size={16} />
                    Partager
                  </button>
                </div>

                <div className="article-links">
                  {/* Bouton produit - seulement pour les produits Amazon */}
                  {product.affiliateUrl && product.affiliateUrl.includes('amazon') && (
                    <button 
                      className="external-link-btn"
                      onClick={() => openDialog('product', product)}
                    >
                      <ExternalLink size={16} />
                      Voir le produit sur Amazon
                    </button>
                  )}
                  
                  {/* Bouton Kinetic - pour les articles Kinetic */}
                  {product.name && product.name.toLowerCase().includes('kinetic') && (
                    <a 
                      href={product.name.toLowerCase().includes('partenaire') 
                        ? "https://www.kineticstaff.com/client-referral-program/?ref=62a362f"
                        : "https://www.kineticstaff.com/share/v1/?ref=62a362f&linkId=1"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-link-btn kinetic-link"
                    >
                      <ExternalLink size={16} />
                      {product.name.toLowerCase().includes('partenaire') ? 'Devenir Partenaire Kinetic' : 'Services Kinetic'}
                    </a>
                  )}
                </div>
              </footer>

              {/* Section de citation avec auteurs réels */}
              <CitationGenerator product={product} />

              {/* Section commentaires */}
              <section className="comments-section">
                <CommentSection productId={product._id} productName={product.name} />
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

      {/* Boîte de dialogue d'invitation */}
      {dialogState.product && (
        <InvitationDialog
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          type={dialogState.type}
          productName={dialogState.product.name}
          affiliateUrl={dialogState.product.affiliateUrl}
          price={dialogState.product.price}
          rating={dialogState.product.rating.average}
          reviewCount={dialogState.product.rating.count}
        />
      )}
    </>
  );
};

export default ArticleDetail;