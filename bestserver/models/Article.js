const { query, transaction } = require('../config/database');

class Article {
  constructor(data) {
    this.id = data.id;
    this.product_id = data.product_id;
    this.title = data.title;
    this.slug = data.slug;
    this.content = data.content;
    this.excerpt = data.excerpt;
    this.featured_image = data.featured_image;
    this.author_id = data.author_id;
    this.category_id = data.category_id;
    this.status = data.status;
    this.is_featured = data.is_featured;
    this.in_stock = data.in_stock;
    this.view_count = data.view_count;
    this.like_count = data.like_count;
    this.comment_count = data.comment_count;
    this.reading_time = data.reading_time;
    this.seo_title = data.seo_title;
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.published_at = data.published_at;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Créer un nouvel article
  static async create(articleData) {
    const sql = `
      INSERT INTO articles (
        product_id, title, slug, content, excerpt, featured_image,
        author_id, category_id, status, is_featured, in_stock, view_count,
        like_count, comment_count, reading_time, seo_title,
        seo_description, seo_keywords, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      articleData.product_id, articleData.title, articleData.slug,
      articleData.content, articleData.excerpt, articleData.featured_image,
      articleData.author_id, articleData.category_id, articleData.status,
      articleData.is_featured, articleData.in_stock !== undefined ? articleData.in_stock : true,
      articleData.view_count || 0, articleData.like_count || 0, articleData.comment_count || 0,
      articleData.reading_time || 0, articleData.seo_title,
      articleData.seo_description, articleData.seo_keywords,
      articleData.published_at
    ];

    const result = await query(sql, params);
    return result.insertId;
  }

  // Récupérer tous les articles
  static async findAll(options = {}) {
    let sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Filtres
    if (options.status) {
      sql += ' AND a.status = ?';
      params.push(options.status);
    }

    if (options.category_id) {
      sql += ' AND a.category_id = ?';
      params.push(options.category_id);
    }

    if (options.author_id) {
      sql += ' AND a.author_id = ?';
      params.push(options.author_id);
    }

    if (options.is_featured !== undefined) {
      sql += ' AND a.is_featured = ?';
      params.push(options.is_featured);
    }

    if (options.search) {
      sql += ' AND (a.title LIKE ? OR a.content LIKE ? OR a.excerpt LIKE ?)';
      const searchTerm = `%${options.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Tri
    const orderBy = options.orderBy || 'created_at';
    const orderDirection = options.orderDirection || 'DESC';
    sql += ` ORDER BY a.${orderBy} ${orderDirection}`;

    // Pagination
    if (options.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(options.limit));
      
      if (options.offset) {
        sql += ' OFFSET ?';
        params.push(parseInt(options.offset));
      }
    }

    const articles = await query(sql, params);
    return articles.map(article => new Article(article));
  }

  // Récupérer un article par ID
  static async findById(id) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.id = ?
    `;
    const articles = await query(sql, [id]);
    return articles.length > 0 ? new Article(articles[0]) : null;
  }

  // Récupérer un article par slug
  static async findBySlug(slug) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.slug = ?
    `;
    const articles = await query(sql, [slug]);
    return articles.length > 0 ? new Article(articles[0]) : null;
  }

  // Récupérer un article par product_id
  static async findByProductId(productId) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.product_id = ?
    `;
    const articles = await query(sql, [productId]);
    return articles.length > 0 ? new Article(articles[0]) : null;
  }

  // Mettre à jour un article
  static async update(id, updateData) {
    const fields = [];
    const params = [];

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        fields.push(`${key} = ?`);
        params.push(updateData[key]);
      }
    });

    if (fields.length === 0) {
      throw new Error('Aucune donnée à mettre à jour');
    }

    params.push(id);
    const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = ?`;
    
    const result = await query(sql, params);
    return result.affectedRows > 0;
  }

  // Supprimer un article
  static async delete(id) {
    const sql = 'DELETE FROM articles WHERE id = ?';
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }

  // Publier un article
  static async publish(id) {
    const sql = `
      UPDATE articles 
      SET status = 'published', published_at = NOW() 
      WHERE id = ?
    `;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }

  // Dépublier un article
  static async unpublish(id) {
    const sql = `
      UPDATE articles 
      SET status = 'draft', published_at = NULL 
      WHERE id = ?
    `;
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }

  // Récupérer les tags d'un article
  async getTags() {
    const sql = `
      SELECT at.* FROM article_tags at
      JOIN article_tag_relations atr ON at.id = atr.tag_id
      WHERE atr.article_id = ?
      ORDER BY at.name
    `;
    return await query(sql, [this.id]);
  }

  // Récupérer les commentaires d'un article
  async getComments(options = {}) {
    let sql = `
      SELECT * FROM comments 
      WHERE article_id = ? AND is_approved = TRUE AND is_spam = FALSE
    `;
    const params = [this.id];

    if (options.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(options.limit));
    }

    sql += ' ORDER BY created_at DESC';
    return await query(sql, params);
  }

  // Incrémenter le compteur de vues
  async incrementViewCount() {
    const sql = 'UPDATE articles SET view_count = view_count + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.view_count++;
  }

  // Incrémenter le compteur de likes
  async incrementLikeCount() {
    const sql = 'UPDATE articles SET like_count = like_count + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.like_count++;
  }

  // Décrémenter le compteur de likes
  async decrementLikeCount() {
    const sql = 'UPDATE articles SET like_count = GREATEST(like_count - 1, 0) WHERE id = ?';
    await query(sql, [this.id]);
    this.like_count = Math.max(this.like_count - 1, 0);
  }

  // Rechercher des articles
  static async search(searchTerm, options = {}) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.status = 'published'
      AND (a.title LIKE ? OR a.content LIKE ? OR a.excerpt LIKE ?)
      ORDER BY a.is_featured DESC, a.view_count DESC, a.created_at DESC
      LIMIT ?
    `;
    const searchPattern = `%${searchTerm}%`;
    const limit = options.limit || 20;
    
    const articles = await query(sql, [searchPattern, searchPattern, searchPattern, limit]);
    return articles.map(article => new Article(article));
  }

  // Récupérer les articles populaires
  static async getPopular(limit = 10) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.status = 'published'
      ORDER BY a.view_count DESC, a.like_count DESC
      LIMIT ?
    `;
    const articles = await query(sql, [limit]);
    return articles.map(article => new Article(article));
  }

  // Récupérer les articles récents
  static async getRecent(limit = 10) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.status = 'published'
      ORDER BY a.published_at DESC, a.created_at DESC
      LIMIT ?
    `;
    const articles = await query(sql, [limit]);
    return articles.map(article => new Article(article));
  }

  // Récupérer les articles par catégorie
  static async getByCategory(categoryId, limit = 10) {
    const sql = `
      SELECT a.*, p.name as product_name, p._id as product_id,
             c.name as category_name, c.slug as category_slug,
             u.username as author_name
      FROM articles a
      LEFT JOIN products p ON a.product_id = p.id
      LEFT JOIN categories c ON a.category_id = c.id
      LEFT JOIN users u ON a.author_id = u.id
      WHERE a.status = 'published' AND a.category_id = ?
      ORDER BY a.is_featured DESC, a.published_at DESC
      LIMIT ?
    `;
    const articles = await query(sql, [categoryId, limit]);
    return articles.map(article => new Article(article));
  }

  // Générer un slug à partir du titre
  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Calculer le temps de lecture estimé
  static calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

module.exports = Article;
