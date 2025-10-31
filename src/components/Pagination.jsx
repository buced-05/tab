import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage = 10,
  totalItems = 0,
  showInfo = true,
  id = "pagination"
}) => {
  // Calculer les pages à afficher
  const getVisiblePages = () => {
    const delta = 2; // Nombre de pages à afficher de chaque côté
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      {showInfo && (
        <div className="pagination-info">
          <span>
            Affichage de {startItem} à {endItem} sur {totalItems} articles
          </span>
        </div>
      )}
      
      <nav className="pagination" id={id} aria-label="Navigation des pages">
        <div className="pagination-controls">
          {/* Bouton Précédent */}
          <button
            id={`${id}-prev-btn`}
            className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Page précédente"
          >
            <ChevronLeft size={16} />
            <span>Précédent</span>
          </button>

          {/* Numéros de pages */}
          <div className="pagination-pages" id={`${id}-pages-container`}>
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`dots-${index}`} id={`${id}-dots-${index}`} className="pagination-dots">
                    <MoreHorizontal size={16} />
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  id={`${id}-page-${page}`}
                  className={`pagination-btn page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => onPageChange(page)}
                  aria-label={`Aller à la page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Bouton Suivant */}
          <button
            id={`${id}-next-btn`}
            className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Page suivante"
          >
            <span>Suivant</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Sélecteur de pages par page */}
        <div className="pagination-size-selector">
          <label htmlFor="items-per-page">Articles par page :</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => {
              // Cette fonction sera passée en prop si nécessaire
              if (window.onItemsPerPageChange) {
                window.onItemsPerPageChange(parseInt(e.target.value));
              }
            }}
            className="pagination-size-select"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
