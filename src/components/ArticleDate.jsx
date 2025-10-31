import React from 'react';
import { Calendar } from 'lucide-react';
import { useLiveRelativeDate } from '../contexts/LiveTimeContext';
import '../styles/article-date.css';

/**
 * Affiche la date d'un article de façon dynamique.
 * - showFullDate: affiche la date/heure exacte (UTC)
 * - showRelative: affiche le relatif (ex: "il y a 5 min"), mis à jour en temps réel
 */
const ArticleDate = ({ date, showRelative = true, showFullDate = true }) => {
  const relative = useLiveRelativeDate(date);
  const full = new Date(date).toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
    calendar: 'gregory'
  });

  return (
    <span className="article-date" title={`Publié le ${full} (UTC)`}>
      <Calendar size={14} className="date-icon" />
      <span className="date-content">
        {showFullDate && (
          <span className="article-date-full">{full}</span>
        )}
        {showRelative && showFullDate && (
          <span className="article-date-separator"> • </span>
        )}
        {showRelative && (
          <span className="article-date-relative">
            <span className="relative-indicator">🕐</span>
            {relative}
          </span>
        )}
      </span>
      <span className="utc-badge" title="Temps universel coordonné (UTC)">UTC</span>
    </span>
  );
};

export default ArticleDate;

