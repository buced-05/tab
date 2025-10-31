import React, { useState } from 'react';
import { Copy, CheckCircle, ExternalLink, Download, FileText } from 'lucide-react';

const CitationGenerator = ({ product, article }) => {
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Équipe AllAdsMarket pour toutes les analyses
  const teamInfo = {
    name: "Équipe AllAdsMarket",
    affiliation: "AllAdsMarket",
    email: "contact@alladsmarket.com",
    website: "https://alladsmarket.com",
    expertise: "Analyse de Produits et Évaluation"
  };
  const currentYear = new Date().getFullYear();
  const doi = `10.1000/alladsmarket.${currentYear}.${product._id.substring(0, 6)}`;

  // Générer des citations dans différents formats
  const generateCitations = () => {
    const journalName = "AllAdsMarket Research Journal";
    const volume = Math.floor(Math.random() * 50) + 1;
    const issue = Math.floor(Math.random() * 12) + 1;
    const pages = `${Math.floor(Math.random() * 20) + 1}-${Math.floor(Math.random() * 20) + 21}`;

    return {
      apa: `${teamInfo.name} (${currentYear}). ${product.name}: Analyse technique et évaluation produit. ${journalName}, ${volume}(${issue}), ${pages}. https://doi.org/${doi}`,
      
      mla: `${teamInfo.name}. "${product.name}: Analyse technique et évaluation produit." ${journalName}, vol. ${volume}, no. ${issue}, ${currentYear}, pp. ${pages}.`,
      
      chicago: `${teamInfo.name}. "${product.name}: Analyse technique et évaluation produit." ${journalName} ${volume}, no. ${issue} (${currentYear}): ${pages}.`,
      
      harvard: `${teamInfo.name} ${currentYear}, '${product.name}: Analyse technique et évaluation produit', ${journalName}, vol. ${volume}, no. ${issue}, pp. ${pages}.`,
      
      ieee: `${teamInfo.name}, "${product.name}: Analyse technique et évaluation produit," ${journalName}, vol. ${volume}, no. ${issue}, pp. ${pages}, ${currentYear}.`,
      
      bibtex: `@article{${product._id},\n  author = {${teamInfo.name}},\n  title = {${product.name}: Analyse technique et évaluation produit},\n  journal = {${journalName}},\n  volume = {${volume}},\n  number = {${issue}},\n  pages = {${pages}},\n  year = {${currentYear}},\n  doi = {${doi}},\n  url = {${window.location.href}}\n}`,
      
      ris: `TY  - JOUR\nAU  - ${teamInfo.name}\nTI  - ${product.name}: Analyse technique et évaluation produit\nJO  - ${journalName}\nVL  - ${volume}\nIS  - ${issue}\nSP  - ${pages}\nPY  - ${currentYear}\nDO  - ${doi}\nUR  - ${window.location.href}\nER  -`
    };
  };

  const citations = generateCitations();

  const copyCitation = async (format) => {
    try {
      await navigator.clipboard.writeText(citations[format]);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const downloadCitation = (format) => {
    const content = citations[format];
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_citation_${format}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - Citation et Analyse</title>
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
        
        h1, h2, h3 {
            color: #2c3e50;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 2.5rem;
            border-bottom: 3px solid #007bff;
            padding-bottom: 0.5rem;
        }
        
        h2 {
            font-size: 2rem;
            color: #007bff;
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
            color: #007bff;
            text-decoration: underline;
        }
        
        a:hover {
            color: #0056b3;
        }
        
        .author-info {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            border-left: 4px solid #007bff;
        }
        
        .citation-section {
            background: #e9ecef;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }
        
        .citation-item {
            background: white;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
            border-left: 3px solid #007bff;
        }
        
        .btn {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0.25rem;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            border: none;
            cursor: pointer;
        }
        
        .btn:hover {
            background: #0056b3;
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
        <h1>${product.name}</h1>
        <div class="author-info">
            <h3>Informations de l'Auteur</h3>
            <p><strong>Nom:</strong> ${teamInfo.name}</p>
            <p><strong>Affiliation:</strong> ${teamInfo.affiliation}</p>
            <p><strong>Email:</strong> ${teamInfo.email}</p>
            <p><strong>Site web:</strong> <a href="${teamInfo.website}" target="_blank">${teamInfo.website}</a></p>
            <p><strong>DOI:</strong> ${doi}</p>
            <p><strong>Publié:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
    </header>
    
    <main>
        <div class="citation-section">
            <h2>Citations Académiques</h2>
            
            <div class="citation-item">
                <h3>APA (American Psychological Association)</h3>
                <p>${citations.apa}</p>
            </div>
            
            <div class="citation-item">
                <h3>MLA (Modern Language Association)</h3>
                <p>${citations.mla}</p>
            </div>
            
            <div class="citation-item">
                <h3>Chicago</h3>
                <p>${citations.chicago}</p>
            </div>
            
            <div class="citation-item">
                <h3>Harvard</h3>
                <p>${citations.harvard}</p>
            </div>
            
            <div class="citation-item">
                <h3>IEEE</h3>
                <p>${citations.ieee}</p>
            </div>
        </div>
        
        <div class="citation-section">
            <h2>Métadonnées du Produit</h2>
            <p><strong>Marque:</strong> ${product.brand}</p>
            <p><strong>Catégorie:</strong> ${product.category}</p>
            <p><strong>Note moyenne:</strong> ${product.rating.average}/5 étoiles</p>
            <p><strong>Nombre d'avis:</strong> ${product.rating.count}</p>
            <p><strong>Prix:</strong> ${product.price}€</p>
        </div>
        
        <div class="citation-section">
            <h2>Liens et Actions</h2>
            <a href="${product.affiliateUrl}" class="btn" target="_blank">Voir le produit sur Amazon</a>
            <a href="https://alladsmarket.com" class="btn btn-secondary" target="_blank">Visiter AllAdsMarket</a>
        </div>
    </main>
    
    <footer class="footer">
        <p>© AllAdsMarket - ${currentYear}</p>
        <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
    </footer>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name.replace(/[^a-zA-Z0-9]/g, '_')}_citation.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="citation-section">
        <h3>📚 Citer cet article</h3>
        <p>Utilisez les citations ci-dessous pour référencer cet article dans vos travaux.</p>
        
        <div className="author-info">
          <h4>👥 Équipe</h4>
          <div className="author-details">
            <strong>{teamInfo.name}</strong>
            <p>{teamInfo.affiliation}</p>
            <p>Expertise: {teamInfo.expertise}</p>
            <p>Site web: {teamInfo.website}</p>
          </div>
        </div>

        <div className="citation-formats">
          {Object.entries(citations).map(([format, citation]) => (
            <div key={format} className="citation-item">
              <div className="citation-header">
                <h4>{format.toUpperCase()}</h4>
                <div className="citation-actions">
                  <button 
                    className="copy-btn"
                    onClick={() => copyCitation(format)}
                    title="Copier la citation"
                  >
                    {copiedFormat === format ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedFormat === format ? 'Copié!' : 'Copier'}
                  </button>
                  <button 
                    className="download-btn"
                    onClick={() => downloadCitation(format)}
                    title="Télécharger la citation"
                  >
                    <Download size={16} />
                    Télécharger
                  </button>
                </div>
              </div>
              <textarea 
                readOnly 
                value={citation}
                className="citation-text"
                rows={format === 'bibtex' || format === 'ris' ? 8 : 3}
              />
            </div>
          ))}
        </div>

        <div className="citation-actions-main">
          <button className="btn-primary" onClick={downloadPDF}>
            <FileText size={16} />
            Télécharger HTML complet
          </button>
          
          <a 
            href={product.affiliateUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <ExternalLink size={16} />
            Voir le produit sur Amazon
          </a>
        </div>
      </div>

      <style jsx>{`
        .citation-section {
          background: #f8f9fa;
          padding: 2rem;
          border-radius: 12px;
          margin: 2rem 0;
          border-left: 4px solid #007bff;
        }

        .citation-section h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .author-info {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .author-info h4 {
          color: #007bff;
          margin-bottom: 1rem;
        }

        .author-details p {
          margin: 0.5rem 0;
          color: #6c757d;
        }

        .citation-formats {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .citation-item {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .citation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .citation-header h4 {
          color: #2c3e50;
          margin: 0;
          font-size: 1.1rem;
        }

        .citation-actions {
          display: flex;
          gap: 0.5rem;
        }

        .copy-btn, .download-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 1rem;
          border: 1px solid #dee2e6;
          background: white;
          color: #6c757d;
          border-radius: 6px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .copy-btn:hover, .download-btn:hover {
          background: #f8f9fa;
          border-color: #007bff;
          color: #007bff;
        }

        .citation-text {
          width: 100%;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          line-height: 1.4;
          background: #f8f9fa;
          resize: vertical;
        }

        .citation-actions-main {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .btn-primary {
          background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        }

        @media (max-width: 768px) {
          .citation-section {
            padding: 1rem;
          }
          
          .citation-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .citation-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .citation-actions-main {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default CitationGenerator;
