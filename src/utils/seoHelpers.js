const DEFAULT_BASE_URL = process.env.REACT_APP_BASE_URL || 'https://alladsmarket.com';

const sanitizeKeywords = (keywords) => {
  if (!keywords) return [];

  if (Array.isArray(keywords)) {
    return keywords.filter(Boolean).flatMap((keyword) =>
      keyword
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    );
  }

  return keywords
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

export const buildArticleSEO = (
  article,
  {
    basePath = '',
    canonicalPath,
    section,
    locale = 'fr_FR',
    includeDefaultKeywords = true,
    appendSiteNameToTitle = true,
    includeDownloadMeta = false,
    defaultImage = `${DEFAULT_BASE_URL}/og-image.jpg`,
    additionalMeta = [],
    extraKeywords = [],
    structuredDataOverrides = {},
  } = {},
) => {
  if (!article) {
    return {};
  }

  const normalizedPath = canonicalPath
    ? canonicalPath
    : `${basePath ? `${basePath.replace(/\/$/, '')}/` : '/'}${article.slug || ''}`;

  const keywordsSet = new Set([
    ...sanitizeKeywords(article.metaKeywords),
    ...(Array.isArray(article.tags) ? article.tags : []),
    ...extraKeywords,
  ]);

  const keywords = Array.from(keywordsSet)
    .filter(Boolean)
    .slice(0, 25)
    .join(', ');

  const descriptionSource = article.seoDescription || article.excerpt || article.summary || '';
  const description =
    descriptionSource.length > 300
      ? `${descriptionSource.substring(0, 297)}…`
      : descriptionSource;

  const publishedTime = article.publishDate || article.publish_at || article.publishedAt;
  const modifiedTime = article.updatedAt || article.updated_at || publishedTime;

  const downloadMeta = includeDownloadMeta
    ? [
        { name: 'download', content: 'PDF disponible' },
        { name: 'pdf-available', content: 'true' },
        { name: 'document-format', content: 'PDF, HTML' },
        { name: 'download-format', content: 'PDF' },
      ]
    : [];

  const seoTitle = appendSiteNameToTitle
    ? `${article.seoTitle || article.title} | AllAdsMarket`
    : article.seoTitle || article.title;

  const combinedMeta = [...downloadMeta, ...additionalMeta].filter(
    (meta) => meta?.name || meta?.property,
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    alternativeHeadline: article.seoTitle || undefined,
    description,
    image: article.image || defaultImage,
    url: `${DEFAULT_BASE_URL}${normalizedPath}`,
    datePublished: publishedTime,
    dateModified: modifiedTime,
    inLanguage: locale.replace('-', '_'),
    author: {
      '@type': 'Person',
      name: article.author || 'Team AllAdsMarket',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AllAdsMarket',
      logo: {
        '@type': 'ImageObject',
        url: `${DEFAULT_BASE_URL}/logo.png`,
      },
    },
    keywords,
    articleSection: section || article.category || 'Articles',
    mainEntityOfPage: `${DEFAULT_BASE_URL}${normalizedPath}`,
    isAccessibleForFree: true,
    ...structuredDataOverrides,
  };

  return {
    title: seoTitle,
    description,
    keywords,
    tags: Array.from(keywordsSet).slice(0, 20),
    image: article.image || defaultImage,
    url: normalizedPath,
    type: 'article',
    author: article.author || 'Team AllAdsMarket',
    publishedTime,
    modifiedTime,
    section: section || article.category || 'Articles',
    locale,
    canonicalUrl: `${DEFAULT_BASE_URL}${normalizedPath}`,
    includeDefaultKeywords,
    additionalMeta: combinedMeta,
    structuredData,
  };
};

export default {
  buildArticleSEO,
};

