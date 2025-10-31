import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { getAllAIArticles } from '../data/simple-ai-articles';
import '../styles/ai-article-detail.css';

const AIArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AIArticleDetail - Slug reçu:', slug);
    
    try {
      // Trouver l'article par son slug
      const allArticles = getAllAIArticles();
      console.log('AIArticleDetail - Articles disponibles:', allArticles.length);
      console.log('AIArticleDetail - Slugs disponibles:', allArticles.map(a => a.slug));
      
      const foundArticle = allArticles.find(art => art.slug === slug);
      console.log('AIArticleDetail - Article trouvé:', foundArticle);
      
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        console.log('AIArticleDetail - Aucun article trouvé pour le slug:', slug);
      }
    } catch (error) {
      console.error('AIArticleDetail - Erreur lors du chargement:', error);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container fullscreen">
        <div className="loading-spinner-large"></div>
        <h3>Chargement de l'article...</h3>
        <p>Préparation du contenu</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="ai-article-detail-error">
        <h1>Article non trouvé</h1>
        <p>L'article avec le slug "{slug}" n'existe pas.</p>
        <p>Slug reçu: {slug}</p>
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
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="ai-article-detail">
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
          <h1 className="article-title">{article.title}</h1>
          <div className="article-excerpt">{article.excerpt}</div>
          
          <div className="article-info">
            <div className="author-info">
              <span>Auteur: {article.author}</span>
            </div>
            <div className="publish-info">
              <span>Date: {article.publishDate}</span>
            </div>
            <div className="read-time">
              <span>Temps de lecture: {article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Image principale */}
        <div className="article-image">
          <img src={article.image} alt={article.title} />
        </div>

        {/* Contenu de l'article */}
        <main className="article-content">
          <div className="content-wrapper">
            <div className="article-text">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </main>

        {/* Footer de l'article */}
        <footer className="article-footer">
          <div className="article-navigation-footer">
            <Link to="/ai-articles" className="nav-link">
              <span>Voir tous les articles IA</span>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AIArticleDetail;
