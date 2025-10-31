// Générateur de sitemap multilingue pour SEO international
export const generateMultilingualSitemap = (pages, baseUrl = 'https://alladsmarket.com') => {
  const supportedLanguages = [
    'fr', 'en', 'en-GB', 'de', 'es', 'it', 'pt', 'pt-BR', 
    'nl', 'sv', 'no', 'ru', 'ja', 'zh', 'hi', 'ar', 'sw', 'am'
  ];

  const languageConfig = {
    'fr': { locale: 'fr_FR', region: 'FR', country: 'France', priority: 1.0 },
    'en': { locale: 'en_US', region: 'US', country: 'United States', priority: 0.9 },
    'en-GB': { locale: 'en_GB', region: 'GB', country: 'United Kingdom', priority: 0.9 },
    'de': { locale: 'de_DE', region: 'DE', country: 'Germany', priority: 0.8 },
    'es': { locale: 'es_ES', region: 'ES', country: 'Spain', priority: 0.8 },
    'it': { locale: 'it_IT', region: 'IT', country: 'Italy', priority: 0.8 },
    'pt': { locale: 'pt_PT', region: 'PT', country: 'Portugal', priority: 0.7 },
    'pt-BR': { locale: 'pt_BR', region: 'BR', country: 'Brazil', priority: 0.7 },
    'nl': { locale: 'nl_NL', region: 'NL', country: 'Netherlands', priority: 0.7 },
    'sv': { locale: 'sv_SE', region: 'SE', country: 'Sweden', priority: 0.6 },
    'no': { locale: 'no_NO', region: 'NO', country: 'Norway', priority: 0.6 },
    'ru': { locale: 'ru_RU', region: 'RU', country: 'Russia', priority: 0.6 },
    'ja': { locale: 'ja_JP', region: 'JP', country: 'Japan', priority: 0.5 },
    'zh': { locale: 'zh_CN', region: 'CN', country: 'China', priority: 0.5 },
    'hi': { locale: 'hi_IN', region: 'IN', country: 'India', priority: 0.5 },
    'ar': { locale: 'ar_SA', region: 'SA', country: 'Saudi Arabia', priority: 0.4 },
    'sw': { locale: 'sw_KE', region: 'KE', country: 'Kenya', priority: 0.4 },
    'am': { locale: 'am_ET', region: 'ET', country: 'Ethiopia', priority: 0.4 }
  };

  // Génération du sitemap principal
  const generateMainSitemap = () => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-products.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-articles.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-news.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;

    // Ajouter des sitemaps par langue
    supportedLanguages.forEach(lang => {
      const langConfig = languageConfig[lang];
      if (langConfig) {
        sitemap += `
  <sitemap>
    <loc>${baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`;
      }
    });

    sitemap += `
</sitemapindex>`;
    return sitemap;
  };

  // Génération du sitemap des pages multilingues
  const generatePagesSitemap = () => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    pages.forEach(page => {
      const lastmod = page.lastmod || new Date().toISOString();
      const changefreq = page.changefreq || 'weekly';
      const priority = page.priority || 0.8;

      // Page par défaut (français)
      sitemap += `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

      // Balises hreflang pour toutes les langues
      supportedLanguages.forEach(lang => {
        const langConfig = languageConfig[lang];
        if (langConfig) {
          const langPath = lang === 'fr' ? page.path : `/${lang}${page.path}`;
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}${langPath}" />`;
        }
      });

      // Balise hreflang x-default
      sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />`;

      sitemap += `
  </url>`;
    });

    sitemap += `
</urlset>`;
    return sitemap;
  };

  // Génération du sitemap par langue
  const generateLanguageSitemap = (lang) => {
    const langConfig = languageConfig[lang];
    if (!langConfig) return '';

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

    pages.forEach(page => {
      const lastmod = page.lastmod || new Date().toISOString();
      const changefreq = page.changefreq || 'weekly';
      const priority = (page.priority || 0.8) * langConfig.priority;

      const langPath = lang === 'fr' ? page.path : `/${lang}${page.path}`;

      sitemap += `
  <url>
    <loc>${baseUrl}${langPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

      // Balises hreflang pour toutes les langues
      supportedLanguages.forEach(altLang => {
        const altLangConfig = languageConfig[altLang];
        if (altLangConfig) {
          const altLangPath = altLang === 'fr' ? page.path : `/${altLang}${page.path}`;
          sitemap += `
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${baseUrl}${altLangPath}" />`;
        }
      });

      // Balise hreflang x-default
      sitemap += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.path}" />`;

      sitemap += `
  </url>`;
    });

    sitemap += `
</urlset>`;
    return sitemap;
  };

  // Génération du sitemap des images multilingues
  const generateImagesSitemap = (images) => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    images.forEach(image => {
      sitemap += `
  <url>
    <loc>${baseUrl}${image.pagePath}</loc>
    <image:image>
      <image:loc>${baseUrl}${image.url}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      <image:license>${image.license || baseUrl}</image:license>
    </image:image>
  </url>`;
    });

    sitemap += `
</urlset>`;
    return sitemap;
  };

  // Génération du sitemap des actualités multilingues
  const generateNewsSitemap = (articles) => {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

    articles.forEach(article => {
      const langConfig = languageConfig[article.language] || languageConfig['fr'];
      sitemap += `
  <url>
    <loc>${baseUrl}${article.path}</loc>
    <news:news>
      <news:publication>
        <news:name>AllAdsMarket</news:name>
        <news:language>${langConfig.locale}</news:language>
      </news:publication>
      <news:publication_date>${article.publicationDate}</news:publication_date>
      <news:title>${article.title}</news:title>
      <news:keywords>${article.keywords}</news:keywords>
    </news:news>
  </url>`;
    });

    sitemap += `
</urlset>`;
    return sitemap;
  };

  return {
    generateMainSitemap,
    generatePagesSitemap,
    generateLanguageSitemap,
    generateImagesSitemap,
    generateNewsSitemap,
    supportedLanguages,
    languageConfig
  };
};

// Configuration des pages pour le sitemap
export const defaultPages = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/products',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/articles',
    priority: 0.8,
    changefreq: 'daily',
    lastmod: new Date().toISOString()
  },
  {
    path: '/about',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/contact',
    priority: 0.5,
    changefreq: 'monthly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/privacy',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  },
  {
    path: '/terms',
    priority: 0.3,
    changefreq: 'yearly',
    lastmod: new Date().toISOString()
  }
];

export default generateMultilingualSitemap;
