const { query, transaction } = require('../config/database');

class Product {
  constructor(data) {
    this.id = data.id;
    this._id = data._id;
    this.product_number = data.product_number;
    this.name = data.name;
    this.description = data.description;
    this.short_description = data.short_description;
    this.brand = data.brand;
    this.price = data.price;
    this.original_price = data.original_price;
    this.currency = data.currency;
    this.category_id = data.category_id;
    this.sku = data.sku;
    this.mpn = data.mpn;
    this.gtin = data.gtin;
    this.weight = data.weight;
    this.dimensions = data.dimensions;
    this.color = data.color;
    this.size = data.size;
    this.material = data.material;
    this.is_featured = data.is_featured;
    this.is_trending = data.is_trending;
    this.is_new = data.is_new;
    this.is_bestseller = data.is_bestseller;
    this.in_stock = data.in_stock;
    this.stock_quantity = data.stock_quantity;
    this.affiliate_url = data.affiliate_url;
    this.product_url = data.product_url;
    this.rating_average = data.rating_average;
    this.rating_count = data.rating_count;
    this.view_count = data.view_count;
    this.click_count = data.click_count;
    this.conversion_count = data.conversion_count;
    this.status = data.status;
    this.seo_title = data.seo_title;
    this.seo_description = data.seo_description;
    this.seo_keywords = data.seo_keywords;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Créer un nouveau produit
  static async create(productData) {
    const sql = `
      INSERT INTO products (
        _id, product_number, name, description, short_description, brand,
        price, original_price, currency, category_id, sku, mpn, gtin,
        weight, dimensions, color, size, material, is_featured, is_trending,
        is_new, is_bestseller, in_stock, stock_quantity, affiliate_url,
        product_url, rating_average, rating_count, view_count, click_count,
        conversion_count, status, seo_title, seo_description, seo_keywords
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      productData._id, productData.product_number, productData.name,
      productData.description, productData.short_description, productData.brand,
      productData.price, productData.original_price, productData.currency,
      productData.category_id, productData.sku, productData.mpn, productData.gtin,
      productData.weight, productData.dimensions, productData.color,
      productData.size, productData.material, productData.is_featured,
      productData.is_trending, productData.is_new, productData.is_bestseller,
      productData.in_stock, productData.stock_quantity, productData.affiliate_url,
      productData.product_url, productData.rating_average, productData.rating_count,
      productData.view_count, productData.click_count, productData.conversion_count,
      productData.status, productData.seo_title, productData.seo_description,
      productData.seo_keywords
    ];

    const result = await query(sql, params);
    return result.insertId;
  }

  // Récupérer tous les produits
  static async findAll(options = {}) {
    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    // Filtres
    if (options.category_id) {
      sql += ' AND p.category_id = ?';
      params.push(options.category_id);
    }

    if (options.status) {
      sql += ' AND p.status = ?';
      params.push(options.status);
    }

    if (options.is_featured !== undefined) {
      sql += ' AND p.is_featured = ?';
      params.push(options.is_featured);
    }

    if (options.is_trending !== undefined) {
      sql += ' AND p.is_trending = ?';
      params.push(options.is_trending);
    }

    if (options.in_stock !== undefined) {
      sql += ' AND p.in_stock = ?';
      params.push(options.in_stock);
    }

    if (options.search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)';
      const searchTerm = `%${options.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Tri
    const orderBy = options.orderBy || 'created_at';
    const orderDirection = options.orderDirection || 'DESC';
    sql += ` ORDER BY p.${orderBy} ${orderDirection}`;

    // Pagination
    if (options.limit) {
      sql += ' LIMIT ?';
      params.push(parseInt(options.limit));
      
      if (options.offset) {
        sql += ' OFFSET ?';
        params.push(parseInt(options.offset));
      }
    }

    const products = await query(sql, params);
    return products.map(product => new Product(product));
  }

  // Récupérer un produit par ID
  static async findById(id) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const products = await query(sql, [id]);
    return products.length > 0 ? new Product(products[0]) : null;
  }

  // Récupérer un produit par _id
  static async findByProductId(_id) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p._id = ?
    `;
    const products = await query(sql, [_id]);
    return products.length > 0 ? new Product(products[0]) : null;
  }

  // Mettre à jour un produit
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
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    
    const result = await query(sql, params);
    return result.affectedRows > 0;
  }

  // Supprimer un produit
  static async delete(id) {
    const sql = 'DELETE FROM products WHERE id = ?';
    const result = await query(sql, [id]);
    return result.affectedRows > 0;
  }

  // Récupérer les images d'un produit
  async getImages() {
    const sql = `
      SELECT * FROM product_images 
      WHERE product_id = ? 
      ORDER BY is_primary DESC, sort_order ASC
    `;
    return await query(sql, [this.id]);
  }

  // Récupérer les tags d'un produit
  async getTags() {
    const sql = `
      SELECT pt.* FROM product_tags pt
      JOIN product_tag_relations ptr ON pt.id = ptr.tag_id
      WHERE ptr.product_id = ?
      ORDER BY pt.name
    `;
    return await query(sql, [this.id]);
  }

  // Récupérer les spécifications d'un produit
  async getSpecifications() {
    const sql = `
      SELECT * FROM product_specifications 
      WHERE product_id = ? 
      ORDER BY sort_order ASC
    `;
    return await query(sql, [this.id]);
  }

  // Récupérer les avis d'un produit
  async getReviews(options = {}) {
    let sql = `
      SELECT * FROM reviews 
      WHERE product_id = ? AND is_approved = TRUE
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
    const sql = 'UPDATE products SET view_count = view_count + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.view_count++;
  }

  // Incrémenter le compteur de clics
  async incrementClickCount() {
    const sql = 'UPDATE products SET click_count = click_count + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.click_count++;
  }

  // Incrémenter le compteur de conversions
  async incrementConversionCount() {
    const sql = 'UPDATE products SET conversion_count = conversion_count + 1 WHERE id = ?';
    await query(sql, [this.id]);
    this.conversion_count++;
  }

  // Rechercher des produits
  static async search(searchTerm, options = {}) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)
      ORDER BY p.is_featured DESC, p.rating_average DESC, p.created_at DESC
      LIMIT ?
    `;
    const searchPattern = `%${searchTerm}%`;
    const limit = options.limit || 20;
    
    const products = await query(sql, [searchPattern, searchPattern, searchPattern, limit]);
    return products.map(product => new Product(product));
  }

  // Récupérer les produits populaires
  static async getPopular(limit = 10) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published' AND p.in_stock = TRUE
      ORDER BY p.view_count DESC, p.rating_average DESC
      LIMIT ?
    `;
    const products = await query(sql, [limit]);
    return products.map(product => new Product(product));
  }

  // Récupérer les produits recommandés
  static async getRecommended(categoryId, limit = 10) {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published' AND p.in_stock = TRUE
      AND p.category_id = ?
      ORDER BY p.rating_average DESC, p.rating_count DESC
      LIMIT ?
    `;
    const products = await query(sql, [categoryId, limit]);
    return products.map(product => new Product(product));
  }
}

module.exports = Product;
