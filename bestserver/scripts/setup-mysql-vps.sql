-- 🗄️ Script de Configuration MySQL pour AllAdsMarket VPS
-- Utilisateur: tab
-- Mot de passe: Newtiv15@t

-- 1. Créer la base de données
CREATE DATABASE IF NOT EXISTS alladsmarket 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 2. Créer l'utilisateur pour l'accès local
CREATE USER IF NOT EXISTS 'tab'@'localhost' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'localhost';

-- 3. Créer l'utilisateur pour l'accès distant (VPS)
CREATE USER IF NOT EXISTS 'tab'@'%' IDENTIFIED BY 'Newtiv15@t';
GRANT ALL PRIVILEGES ON alladsmarket.* TO 'tab'@'%';

-- 4. Appliquer les privilèges
FLUSH PRIVILEGES;

-- 5. Vérifier la création
SELECT User, Host FROM mysql.user WHERE User = 'tab';

-- 6. Afficher les bases de données
SHOW DATABASES;

-- 7. Utiliser la base de données
USE alladsmarket;

-- 8. Afficher les tables (sera vide au début)
SHOW TABLES;
