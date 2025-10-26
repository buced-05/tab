import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, Reply, Flag, User, Calendar } from 'lucide-react';
import '../styles/comments.css';

const CommentSection = ({ productId, productName }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showForm, setShowForm] = useState(false);

  // Charger les commentaires depuis le localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${productId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [productId]);

  // Sauvegarder les commentaires dans le localStorage
  const saveComments = (updatedComments) => {
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // Ajouter un nouveau commentaire
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment.trim(),
      author: 'Utilisateur Anonyme',
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: [],
      parentId: replyTo,
      isApproved: true
    };

    if (replyTo) {
      // Ajouter une réponse
      const updatedComments = comments.map(c => {
        if (c.id === replyTo) {
          return { ...c, replies: [...c.replies, comment] };
        }
        return c;
      });
      saveComments(updatedComments);
      setReplyTo(null);
    } else {
      // Ajouter un nouveau commentaire principal
      saveComments([...comments, comment]);
    }

    setNewComment('');
    setShowForm(false);
  };

  // Gérer les likes/dislikes
  const handleVote = (commentId, type, isReply = false, parentId = null) => {
    const updatedComments = comments.map(comment => {
      if (isReply && comment.id === parentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === commentId) {
            return {
              ...reply,
              [type]: reply[type] + 1
            };
          }
          return reply;
        });
        return { ...comment, replies: updatedReplies };
      } else if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          [type]: comment[type] + 1
        };
      }
      return comment;
    });

    saveComments(updatedComments);
  };

  // Trier les commentaires
  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'mostLiked':
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      default:
        return 0;
    }
  });

  // Formater la date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Rendu d'un commentaire
  const renderComment = (comment, isReply = false, parentId = null) => (
    <div key={comment.id} className={`comment ${isReply ? 'comment-reply' : ''}`}>
      <div className="comment-header">
        <div className="comment-author">
          <User size={16} />
          <span>{comment.author}</span>
        </div>
        <div className="comment-date">
          <Calendar size={14} />
          <span>{formatDate(comment.timestamp)}</span>
        </div>
      </div>
      
      <div className="comment-content">
        <p>{comment.text}</p>
      </div>
      
      <div className="comment-actions">
        <button 
          className="action-btn like-btn"
          onClick={() => handleVote(comment.id, 'likes', isReply, parentId)}
          title="J'aime"
        >
          <ThumbsUp size={14} />
          <span>{comment.likes}</span>
        </button>
        
        <button 
          className="action-btn dislike-btn"
          onClick={() => handleVote(comment.id, 'dislikes', isReply, parentId)}
          title="Je n'aime pas"
        >
          <ThumbsDown size={14} />
          <span>{comment.dislikes}</span>
        </button>
        
        {!isReply && (
          <button 
            className="action-btn reply-btn"
            onClick={() => setReplyTo(comment.id)}
            title="Répondre"
          >
            <Reply size={14} />
            <span>Répondre</span>
          </button>
        )}
        
        <button 
          className="action-btn report-btn"
          title="Signaler"
        >
          <Flag size={14} />
          <span>Signaler</span>
        </button>
      </div>
      
      {/* Réponses */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => renderComment(reply, true, comment.id))}
        </div>
      )}
      
      {/* Formulaire de réponse */}
      {replyTo === comment.id && (
        <form onSubmit={handleSubmitComment} className="reply-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrivez votre réponse..."
            rows="3"
            required
          />
          <div className="reply-actions">
            <button type="submit" className="submit-btn">
              <Send size={16} />
              Publier
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setReplyTo(null);
                setNewComment('');
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div className="comment-section">
      <div className="comment-section-header">
        <div className="comment-title">
          <MessageCircle size={24} />
          <h3>{t('comments.title')} sur {productName}</h3>
          <span className="comment-count">({comments.length})</span>
        </div>
        
        <div className="comment-controls">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">{t('comments.newest')}</option>
            <option value="oldest">{t('comments.oldest')}</option>
            <option value="mostLiked">{t('comments.mostLiked')}</option>
          </select>
          
          <button 
            className="add-comment-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <MessageCircle size={16} />
            {showForm ? t('comments.cancel') : t('comments.addComment')}
          </button>
        </div>
      </div>

      {/* Formulaire de nouveau commentaire */}
      {showForm && (
        <form onSubmit={handleSubmitComment} className="new-comment-form">
          <div className="form-group">
            <label htmlFor="comment-text">Votre commentaire</label>
            <textarea
              id="comment-text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('comments.writeComment')}
              rows="4"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <Send size={16} />
              {t('comments.submit')}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => {
                setShowForm(false);
                setNewComment('');
              }}
            >
              {t('comments.cancel')}
            </button>
          </div>
        </form>
      )}

      {/* Liste des commentaires */}
      <div className="comments-list">
        {sortedComments.length === 0 ? (
          <div className="no-comments">
            <MessageCircle size={48} />
            <h4>Aucun commentaire pour le moment</h4>
            <p>Soyez le premier à partager votre avis sur ce produit !</p>
            <button 
              className="first-comment-btn"
              onClick={() => setShowForm(true)}
            >
              <MessageCircle size={16} />
              Ajouter le premier commentaire
            </button>
          </div>
        ) : (
          sortedComments.map(comment => renderComment(comment))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
