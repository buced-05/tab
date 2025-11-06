#!/bin/bash

# Script de test complet pour la configuration Nginx
# Usage: ./test-nginx-config.sh

echo "🧪 Test de la configuration Nginx AllAdsMarket"
echo "================================================"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="alladsmarket.com"
BASE_URL="https://${DOMAIN}"

# Compteurs
PASSED=0
FAILED=0

# Fonction de test
test_url() {
    local url=$1
    local expected_status=$2
    local description=$3
    local check_content_type=$4
    
    echo -n "Testing: $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    content_type=$(curl -s -I "$url" 2>/dev/null | grep -i "content-type" | head -1)
    
    if [ "$response" = "$expected_status" ]; then
        if [ -n "$check_content_type" ]; then
            if echo "$content_type" | grep -qi "$check_content_type"; then
                echo -e "${GREEN}✅ PASS${NC} (Status: $response, Content-Type: OK)"
                ((PASSED++))
                return 0
            else
                echo -e "${RED}❌ FAIL${NC} (Status: $response, Content-Type: $content_type)"
                echo "   Expected Content-Type: $check_content_type"
                ((FAILED++))
                return 1
            fi
        else
            echo -e "${GREEN}✅ PASS${NC} (Status: $response)"
            ((PASSED++))
            return 0
        fi
    else
        echo -e "${RED}❌ FAIL${NC} (Status: $response, Expected: $expected_status)"
        ((FAILED++))
        return 1
    fi
}

# Test 1: Page d'accueil
echo ""
echo -e "${BLUE}📄 Tests des pages principales${NC}"
echo "----------------------------------------"
test_url "${BASE_URL}/" "200" "Page d'accueil"
test_url "${BASE_URL}/products" "200" "Page produits"
test_url "${BASE_URL}/articles" "200" "Page articles"

# Test 2: Fichiers statiques JS
echo ""
echo -e "${BLUE}📦 Tests des fichiers statiques JS${NC}"
echo "----------------------------------------"

# Trouver un fichier JS réel
JS_FILE=$(find dist/assets/js -name "*.js" -type f | head -1 | sed 's|^dist/||')
if [ -n "$JS_FILE" ]; then
    test_url "${BASE_URL}/${JS_FILE}" "200" "Fichier JS: ${JS_FILE}" "application/javascript"
else
    echo -e "${YELLOW}⚠️  Aucun fichier JS trouvé pour test${NC}"
fi

# Test 3: Fichiers statiques CSS
echo ""
echo -e "${BLUE}🎨 Tests des fichiers statiques CSS${NC}"
echo "----------------------------------------"

CSS_FILE=$(find dist/assets/css -name "*.css" -type f | head -1 | sed 's|^dist/||')
if [ -n "$CSS_FILE" ]; then
    test_url "${BASE_URL}/${CSS_FILE}" "200" "Fichier CSS: ${CSS_FILE}" "text/css"
else
    echo -e "${YELLOW}⚠️  Aucun fichier CSS trouvé pour test${NC}"
fi

# Test 4: Sitemaps
echo ""
echo -e "${BLUE}🗺️  Tests des sitemaps${NC}"
echo "----------------------------------------"
test_url "${BASE_URL}/sitemap.xml" "200" "Sitemap principal" "application/xml"
test_url "${BASE_URL}/sitemap-products.xml" "200" "Sitemap produits" "application/xml"
test_url "${BASE_URL}/sitemap-articles.xml" "200" "Sitemap articles" "application/xml"

# Test 5: Routes SPA (produits et articles)
echo ""
echo -e "${BLUE}🔗 Tests des routes SPA (slugs)${NC}"
echo "----------------------------------------"

# Test avec un slug de produit réel (si disponible)
test_url "${BASE_URL}/products/dreamquest-support-windows-computers-bluetooth5-3" "200" "Produit avec slug"
test_url "${BASE_URL}/ai-article/innovation-educative-eleves-ivoiriens-repetiteur-pro" "200" "Article AI avec slug"

# Test 6: Fichiers non trouvés (404)
echo ""
echo -e "${BLUE}❌ Tests des erreurs 404${NC}"
echo "----------------------------------------"
test_url "${BASE_URL}/assets/js/nonexistent-file.js" "404" "Fichier JS inexistant (doit retourner 404)"
test_url "${BASE_URL}/page-inexistante" "200" "Page inexistante (doit servir index.html pour SPA)"

# Test 7: Manifest et robots.txt
echo ""
echo -e "${BLUE}📋 Tests des fichiers de configuration${NC}"
echo "----------------------------------------"
test_url "${BASE_URL}/manifest.json" "200" "Manifest.json" "application/json"
test_url "${BASE_URL}/robots.txt" "200" "Robots.txt" "text/plain"

# Test 8: Health check
echo ""
echo -e "${BLUE}❤️  Tests du health check${NC}"
echo "----------------------------------------"
test_url "${BASE_URL}/health" "200" "Health check" "text/plain"

# Résumé
echo ""
echo "================================================"
echo -e "${BLUE}📊 Résumé des tests${NC}"
echo "================================================"
echo -e "${GREEN}✅ Tests réussis: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Tests échoués: $FAILED${NC}"
else
    echo -e "${GREEN}❌ Tests échoués: $FAILED${NC}"
fi

TOTAL=$((PASSED + FAILED))
if [ $TOTAL -gt 0 ]; then
    SUCCESS_RATE=$((PASSED * 100 / TOTAL))
    echo -e "${BLUE}📈 Taux de réussite: ${SUCCESS_RATE}%${NC}"
fi

echo ""

# Vérifications supplémentaires
echo -e "${BLUE}🔍 Vérifications supplémentaires${NC}"
echo "----------------------------------------"

# Vérifier les logs d'erreur récents
ERROR_COUNT=$(tail -100 /var/log/nginx/alladsmarket.error.log 2>/dev/null | grep -c "error" || echo "0")
if [ "$ERROR_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $ERROR_COUNT erreurs trouvées dans les logs récents${NC}"
    echo "   Voir: tail -100 /var/log/nginx/alladsmarket.error.log"
else
    echo -e "${GREEN}✅ Aucune erreur récente dans les logs${NC}"
fi

# Vérifier le statut Nginx
if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx est actif${NC}"
else
    echo -e "${RED}❌ Nginx n'est pas actif${NC}"
fi

# Vérifier la configuration
if nginx -t > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Configuration Nginx valide${NC}"
else
    echo -e "${RED}❌ Configuration Nginx invalide${NC}"
    nginx -t
fi

echo ""
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les tests sont passés! La configuration fonctionne correctement.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Certains tests ont échoué. Vérifiez la configuration.${NC}"
    exit 1
fi

