const DEFAULT_API_BASE =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    (import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_BASE_URL)) ||
  (typeof process !== "undefined" &&
    process.env &&
    (process.env.REACT_APP_API_BASE_URL || process.env.VITE_API_BASE_URL)) ||
  "http://localhost:8080/api";

const API_BASE = DEFAULT_API_BASE.replace(/\/$/, "");
const CONTENT_BASE = `${API_BASE}/content`;

const toQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    } else {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`Request failed with status ${response.status}`);
    error.status = response.status;
    error.responseText = text;
    throw error;
  }

  return response.json();
};

const generateDeterministicNumber = (seedString, min, max) => {
  const seed = seedString || "";
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff;
  }
  const normalized = Math.abs(hash) / 0xffffffff;
  return Math.floor(normalized * (max - min + 1)) + min;
};

const normalizeArticle = (article) => {
  if (!article) {
    return null;
  }

  const seed = `${article.slug || article.id || Date.now()}`;
  const views = article.views ?? generateDeterministicNumber(seed, 12000, 48000);
  const likes = article.likes ?? generateDeterministicNumber(seed, 320, 950);
  const shares = article.shares ?? generateDeterministicNumber(seed, 60, 240);
  const favorites = article.favorites ?? generateDeterministicNumber(seed, 160, 420);
  const ratingSeed = generateDeterministicNumber(seed, 42, 49) / 10;
  const rawRating = parseFloat(article.rating);
  const normalizedRating =
    !Number.isNaN(rawRating) && rawRating > 0 ? rawRating : ratingSeed;

  const categoryName = article.category?.name || article.category?.title || "Innovation";
  const categorySlug = article.category?.slug || categoryName.toLowerCase().replace(/\s+/g, "-");
  const authorName = article.author?.name || "Team AllAdsMarket";

  return {
    id: typeof article.id === "number" ? article.id.toString() : article.id || article.slug || seed,
    slug: article.slug,
    title: article.title,
    description: article.seo_description || article.excerpt || "",
    excerpt: article.excerpt || article.seo_description || "",
    content: article.body || article.content || "",
    category: categoryName,
    categorySlug,
    categoryIcon: article.category?.icon || "",
    categoryDescription: article.category?.description || "",
    tags: (article.tags || []).map((tag) => (typeof tag === "string" ? tag : tag.name)),
    author: authorName,
    authorName,
    authorSlug: article.author?.slug || authorName.toLowerCase().replace(/\s+/g, "-"),
    authorRole: article.author?.title || "Rédaction IA",
    authorAvatar: article.author?.avatar_url || "/logo.png",
    authorBio: article.author?.bio || "",
    heroImage: article.hero_image_url || article.thumbnail_url || "/og-image.jpg",
    image: article.hero_image_url || article.thumbnail_url || "/og-image.jpg",
    imageAlt: article.hero_image_alt || `${article.title} - AllAdsMarket`,
    thumbnail: article.thumbnail_url || article.hero_image_url || "/og-image.jpg",
    status: article.status,
    publishDate: article.published_at,
    date: article.published_at,
    readingTime: article.reading_time || article.read_time || 8,
    readTime: `${article.reading_time || 8} min`,
    views,
    likes,
    shares,
    favorites,
    rating: normalizedRating.toFixed(1),
    trending: !!article.is_featured,
    metaKeywords: article.seo_keywords || "",
    structuredData: article.structured_data || null,
    locale: article.locale || "fr-FR",
    insights: article.insights || [],
    keyHighlights: article.key_highlights || [],
    resources: article.resources || [],
    relatedProducts: article.related_products || [],
    callToAction: article.call_to_action || null,
    raw: article,
  };
};

const contentService = {
  async getArticles(params = {}) {
    const query = toQueryString(params);
    const data = await fetchJSON(`${CONTENT_BASE}/articles/${query}`);
    const results = Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : [];
    const normalized = results.map(normalizeArticle);
    return {
      results: normalized,
      count: typeof data.count === "number" ? data.count : normalized.length,
      next: data.next || null,
      previous: data.previous || null,
    };
  },

  async getArticle(slug) {
    if (!slug) {
      throw new Error("Slug is required to fetch an article");
    }
    const data = await fetchJSON(`${CONTENT_BASE}/articles/${encodeURIComponent(slug)}/`);
    return normalizeArticle(data);
  },

  async getCategories(params = {}) {
    const query = toQueryString(params);
    const data = await fetchJSON(`${CONTENT_BASE}/categories/${query}`);
    return data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      icon: category.icon || "",
    }));
  },

  async getTags(params = {}) {
    const query = toQueryString(params);
    const data = await fetchJSON(`${CONTENT_BASE}/tags/${query}`);
    return data.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }));
  },

  async getAuthors(params = {}) {
    const query = toQueryString(params);
    const data = await fetchJSON(`${CONTENT_BASE}/authors/${query}`);
    return data.map((author) => ({
      id: author.id,
      name: author.name,
      slug: author.slug,
      title: author.title || "",
      bio: author.bio || "",
      avatar: author.avatar_url || "",
      website: author.website || "",
      twitter: author.twitter || "",
      linkedin: author.linkedin || "",
    }));
  },
};

export { normalizeArticle };
export default contentService;

