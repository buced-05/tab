-- =============================================
-- AllAdsMarket Database Schema
-- =============================================

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS alladsmarket 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE alladsmarket;

-- =============================================
-- Table: users
-- =============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- =============================================
-- Table: categories
-- =============================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(7) DEFAULT '#3B82F6',
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
);

-- =============================================
-- Table: products
-- =============================================
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    _id VARCHAR(50) UNIQUE NOT NULL,
    product_number INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    brand VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    category_id INT,
    sku VARCHAR(100),
    mpn VARCHAR(100),
    gtin VARCHAR(100),
    weight DECIMAL(8,2),
    dimensions VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    material VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    is_trending BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 0,
    affiliate_url TEXT,
    product_url TEXT,
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    click_count INT DEFAULT 0,
    conversion_count INT DEFAULT 0,
    status ENUM('draft', 'published', 'archived') DEFAULT 'published',
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_product_id (_id),
    INDEX idx_product_number (product_number),
    INDEX idx_name (name),
    INDEX idx_brand (brand),
    INDEX idx_category (category_id),
    INDEX idx_price (price),
    INDEX idx_featured (is_featured),
    INDEX idx_trending (is_trending),
    INDEX idx_stock (in_stock),
    INDEX idx_status (status),
    INDEX idx_rating (rating_average),
    FULLTEXT idx_search (name, description, brand)
);

-- =============================================
-- Table: product_images
-- =============================================
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    width INT,
    height INT,
    file_size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_primary (is_primary),
    INDEX idx_sort (sort_order)
);

-- =============================================
-- Table: product_tags
-- =============================================
CREATE TABLE product_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#6B7280',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_slug (slug)
);

-- =============================================
-- Table: product_tag_relations
-- =============================================
CREATE TABLE product_tag_relations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES product_tags(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_tag (product_id, tag_id),
    INDEX idx_product (product_id),
    INDEX idx_tag (tag_id)
);

-- =============================================
-- Table: product_specifications
-- =============================================
CREATE TABLE product_specifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    unit VARCHAR(20),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_sort (sort_order)
);

-- =============================================
-- Table: articles
-- =============================================
CREATE TABLE articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    author_id INT NOT NULL,
    category_id INT,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    is_featured BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    comment_count INT DEFAULT 0,
    reading_time INT DEFAULT 0,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_slug (slug),
    INDEX idx_product (product_id),
    INDEX idx_author (author_id),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured),
    INDEX idx_in_stock (in_stock),
    INDEX idx_published (published_at),
    FULLTEXT idx_search (title, content, excerpt)
);

-- =============================================
-- Table: article_tags
-- =============================================
CREATE TABLE article_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7) DEFAULT '#6B7280',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_slug (slug)
);

-- =============================================
-- Table: article_tag_relations
-- =============================================
CREATE TABLE article_tag_relations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT NOT NULL,
    tag_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES article_tags(id) ON DELETE CASCADE,
    UNIQUE KEY unique_article_tag (article_id, tag_id),
    INDEX idx_article (article_id),
    INDEX idx_tag (tag_id)
);

-- =============================================
-- Table: comments
-- =============================================
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    article_id INT,
    product_id INT,
    parent_id INT NULL,
    user_id INT,
    author_name VARCHAR(100),
    author_email VARCHAR(100),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_spam BOOLEAN DEFAULT FALSE,
    like_count INT DEFAULT 0,
    reply_count INT DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_article (article_id),
    INDEX idx_product (product_id),
    INDEX idx_parent (parent_id),
    INDEX idx_user (user_id),
    INDEX idx_approved (is_approved),
    INDEX idx_spam (is_spam),
    INDEX idx_created (created_at)
);

-- =============================================
-- Table: reviews
-- =============================================
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT,
    author_name VARCHAR(100),
    author_email VARCHAR(100),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_product (product_id),
    INDEX idx_user (user_id),
    INDEX idx_rating (rating),
    INDEX idx_approved (is_approved),
    INDEX idx_created (created_at)
);

-- =============================================
-- Table: analytics
-- =============================================
CREATE TABLE analytics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_type VARCHAR(50) NOT NULL,
    entity_type ENUM('product', 'article', 'page', 'user') NOT NULL,
    entity_id INT,
    user_id INT,
    session_id VARCHAR(100),
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    country VARCHAR(2),
    city VARCHAR(100),
    device_type VARCHAR(20),
    browser VARCHAR(50),
    os VARCHAR(50),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_event (event_type),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_user (user_id),
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
);

-- =============================================
-- Table: settings
-- =============================================
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (key_name),
    INDEX idx_public (is_public)
);

-- =============================================
-- Table: newsletters
-- =============================================
CREATE TABLE newsletters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    source VARCHAR(50),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);

-- =============================================
-- Table: contact_messages
-- =============================================
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(100),
    is_read BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_read (is_read),
    INDEX idx_archived (is_archived),
    INDEX idx_created (created_at)
);

-- =============================================
-- Insertion des données initiales
-- =============================================

-- Utilisateur admin par défaut
INSERT INTO users (username, email, password, role, first_name, last_name, is_active) VALUES
('admin', 'admin@alladsmarket.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'Admin', 'User', TRUE);

-- Catégories par défaut
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets', '📱', '#3B82F6', 1),
('Fashion', 'fashion', 'Clothing and accessories', '👕', '#EC4899', 2),
('Home & Garden', 'home', 'Home improvement and garden supplies', '🏠', '#10B981', 3),
('Sports', 'sports', 'Sports equipment and fitness', '⚽', '#F59E0B', 4),
('Beauty', 'beauty', 'Beauty and personal care products', '💄', '#8B5CF6', 5),
('Books', 'books', 'Books and educational materials', '📚', '#EF4444', 6),
('Toys', 'toys', 'Toys and games for all ages', '🧸', '#06B6D4', 7),
('Automotive', 'automotive', 'Car accessories and parts', '🚗', '#84CC16', 8),
('Pets', 'pets', 'Pet supplies and accessories', '🐕', '#F97316', 9);

-- Tags par défaut
INSERT INTO product_tags (name, slug, color) VALUES
('bestseller', 'bestseller', '#EF4444'),
('new', 'new', '#10B981'),
('sale', 'sale', '#F59E0B'),
('premium', 'premium', '#8B5CF6'),
('eco-friendly', 'eco-friendly', '#22C55E'),
('wireless', 'wireless', '#3B82F6'),
('portable', 'portable', '#06B6D4'),
('durable', 'durable', '#84CC16');

-- Tags d'articles par défaut
INSERT INTO article_tags (name, slug, color) VALUES
('guide', 'guide', '#3B82F6'),
('review', 'review', '#10B981'),
('comparison', 'comparison', '#F59E0B'),
('tutorial', 'tutorial', '#8B5CF6'),
('news', 'news', '#EF4444'),
('tips', 'tips', '#06B6D4');

-- Paramètres par défaut
INSERT INTO settings (key_name, value, type, description, is_public) VALUES
('site_name', 'AllAdsMarket', 'string', 'Nom du site', TRUE),
('site_description', 'Votre marketplace de confiance', 'string', 'Description du site', TRUE),
('contact_email', 'newtiv05@gmail.com', 'string', 'Email de contact', TRUE),
('analytics_id', '', 'string', 'ID Google Analytics', FALSE),
('social_facebook', '', 'string', 'Page Facebook', TRUE),
('social_twitter', '', 'string', 'Compte Twitter', TRUE),
('social_instagram', '', 'string', 'Compte Instagram', TRUE),
('currency', 'EUR', 'string', 'Devise par défaut', TRUE),
('language', 'fr', 'string', 'Langue par défaut', TRUE),
('timezone', 'Europe/Paris', 'string', 'Fuseau horaire', FALSE);

-- =============================================
-- Vues utiles
-- =============================================

-- Vue des produits avec leurs statistiques
CREATE VIEW v_products_stats AS
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    COUNT(DISTINCT pi.id) as image_count,
    COUNT(DISTINCT r.id) as review_count,
    AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN reviews r ON p.id = r.product_id AND r.is_approved = TRUE
GROUP BY p.id;

-- Vue des articles avec leurs statistiques
CREATE VIEW v_articles_stats AS
SELECT 
    a.*,
    p.name as product_name,
    p._id as product_id,
    c.name as category_name,
    u.username as author_name,
    COUNT(DISTINCT cm.id) as comment_count
FROM articles a
LEFT JOIN products p ON a.product_id = p.id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN users u ON a.author_id = u.id
LEFT JOIN comments cm ON a.id = cm.article_id AND cm.is_approved = TRUE
GROUP BY a.id;

-- =============================================
-- Procédures stockées utiles
-- =============================================

DELIMITER //

-- Procédure pour mettre à jour les statistiques d'un produit
CREATE PROCEDURE UpdateProductStats(IN product_id INT)
BEGIN
    UPDATE products p
    SET 
        rating_average = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM reviews 
            WHERE product_id = p.id AND is_approved = TRUE
        ),
        rating_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE product_id = p.id AND is_approved = TRUE
        )
    WHERE p.id = product_id;
END //

-- Procédure pour nettoyer les données anciennes
CREATE PROCEDURE CleanupOldData(IN days_old INT)
BEGIN
    -- Supprimer les analytics anciennes
    DELETE FROM analytics WHERE created_at < DATE_SUB(NOW(), INTERVAL days_old DAY);
    
    -- Archiver les messages de contact anciens
    UPDATE contact_messages 
    SET is_archived = TRUE 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL days_old DAY) 
    AND is_archived = FALSE;
END //

DELIMITER ;

-- =============================================
-- Triggers pour maintenir la cohérence
-- =============================================

-- Trigger pour mettre à jour les statistiques après ajout d'une review
DELIMITER //
CREATE TRIGGER tr_review_insert 
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateProductStats(NEW.product_id);
END //

-- Trigger pour mettre à jour les statistiques après suppression d'une review
CREATE TRIGGER tr_review_delete 
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    CALL UpdateProductStats(OLD.product_id);
END //

DELIMITER ;

-- =============================================
-- Index pour optimiser les performances
-- =============================================

-- Index composites pour les requêtes fréquentes
CREATE INDEX idx_products_featured_trending ON products(is_featured, is_trending, status);
CREATE INDEX idx_products_category_price ON products(category_id, price, in_stock);
CREATE INDEX idx_articles_status_published ON articles(status, published_at);
CREATE INDEX idx_analytics_event_created ON analytics(event_type, created_at);

-- =============================================
-- Fin du schéma
-- =============================================
