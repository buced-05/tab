#!/bin/bash

# ===========================================
# Script de Test Google Analytics
# Vérifie que la configuration GA est correcte
# ===========================================

echo ""
echo "=========================================="
echo "Test Google Analytics - AllAdsMarket"
echo "=========================================="
echo ""

# Configuration
GA_ID="G-G21WK948XL"
DOMAIN="https://alladsmarket.com"

# Liste des pages à tester
PAGES=(
    "/"
    "/products"
    "/articles"
    "/ai-articles"
    "/contact"
    "/help"
    "/faq"
    "/privacy"
    "/terms"
    "/shipping"
    "/returns"
)

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

# Fonction de test
test_check() {
    local name=$1
    local command=$2
    local expected=$3
    
    echo -n "Test: $name... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((FAILED++))
        return 1
    fi
}

# Test 1: Vérifier que le tag GA est présent dans le HTML
echo "1. Vérification du tag GA dans le HTML..."
if curl -s "$DOMAIN" | grep -q "G-G21WK948XL"; then
    echo -e "   ${GREEN}✓ Tag GA présent dans le HTML${NC}"
    ((PASSED++))
    
    # Afficher le tag trouvé
    echo "   Tag trouvé:"
    curl -s "$DOMAIN" | grep "G-G21WK948XL" | head -1 | sed 's/^/   /'
else
    echo -e "   ${RED}✗ Tag GA non trouvé dans le HTML${NC}"
    ((FAILED++))
fi
echo ""

# Test 2: Vérifier que le script gtag.js est chargé
echo "2. Vérification du script gtag.js..."
if curl -s "$DOMAIN" | grep -q "googletagmanager.com/gtag/js"; then
    echo -e "   ${GREEN}✓ Script gtag.js présent${NC}"
    ((PASSED++))
else
    echo -e "   ${RED}✗ Script gtag.js non trouvé${NC}"
    ((FAILED++))
fi
echo ""

# Test 3: Vérifier la configuration CSP
echo "3. Vérification de la Content Security Policy..."
CSP_HEADER=$(curl -I -s "$DOMAIN" | grep -i "content-security-policy" || echo "")
if echo "$CSP_HEADER" | grep -q "google-analytics.com"; then
    echo -e "   ${GREEN}✓ CSP autorise Google Analytics${NC}"
    ((PASSED++))
    
    # Vérifier les endpoints spécifiques
    if echo "$CSP_HEADER" | grep -q "google-analytics.com/g/collect"; then
        echo -e "   ${GREEN}✓ CSP autorise /g/collect${NC}"
        ((PASSED++))
    else
        echo -e "   ${YELLOW}⚠ CSP n'autorise pas explicitement /g/collect${NC}"
    fi
else
    echo -e "   ${RED}✗ CSP n'autorise pas Google Analytics${NC}"
    ((FAILED++))
fi
echo ""

# Test 4: Test direct de l'endpoint GA
echo "4. Test de l'endpoint Google Analytics..."
HTTP_CODE=$(curl -X POST -s -o /dev/null -w "%{http_code}" \
    "https://www.google-analytics.com/g/collect" \
    -d "v=2&t=pageview&tid=$GA_ID&cid=555&dp=/test")

if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "204" ]; then
    echo -e "   ${GREEN}✓ Endpoint GA accessible (HTTP $HTTP_CODE)${NC}"
    ((PASSED++))
else
    echo -e "   ${RED}✗ Endpoint GA retourne HTTP $HTTP_CODE${NC}"
    ((FAILED++))
fi
echo ""

# Test 5: Test avec User-Agent
echo "5. Test de l'endpoint GA avec User-Agent..."
HTTP_CODE=$(curl -X POST -s -o /dev/null -w "%{http_code}" \
    "https://www.google-analytics.com/g/collect" \
    -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
    -d "v=2&t=pageview&tid=$GA_ID&cid=555&dp=/test")

if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "204" ]; then
    echo -e "   ${GREEN}✓ Endpoint GA accessible avec User-Agent (HTTP $HTTP_CODE)${NC}"
    ((PASSED++))
else
    echo -e "   ${YELLOW}⚠ Endpoint GA retourne HTTP $HTTP_CODE avec User-Agent${NC}"
fi
echo ""

# Test 6: Vérifier la réponse complète
echo "6. Vérification de la réponse GA..."
RESPONSE=$(curl -X POST -s \
    "https://www.google-analytics.com/g/collect" \
    -d "v=2&t=pageview&tid=$GA_ID&cid=555&dp=/test" \
    -w "\nHTTP_CODE:%{http_code}")

if echo "$RESPONSE" | grep -q "HTTP_CODE:200\|HTTP_CODE:204"; then
    echo -e "   ${GREEN}✓ Requête GA acceptée${NC}"
    ((PASSED++))
else
    HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE" | cut -d: -f2)
    echo -e "   ${RED}✗ Requête GA refusée (HTTP $HTTP_CODE)${NC}"
    ((FAILED++))
fi
echo ""

# Test 7: Vérifier que le domaine est accessible
echo "7. Vérification de l'accessibilité du domaine..."
HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" "$DOMAIN")
if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "301" ] || [ "$HTTP_CODE" == "302" ]; then
    echo -e "   ${GREEN}✓ Domaine accessible (HTTP $HTTP_CODE)${NC}"
    ((PASSED++))
else
    echo -e "   ${RED}✗ Domaine retourne HTTP $HTTP_CODE${NC}"
    ((FAILED++))
fi
echo ""

# Test 8: Test du tag GA sur toutes les pages importantes
echo "8. Test du tag GA sur les pages importantes..."
PAGES_PASSED=0
PAGES_FAILED=0
TOTAL_PAGES=${#PAGES[@]}

for page in "${PAGES[@]}"; do
    PAGE_URL="${DOMAIN}${page}"
    HTTP_CODE=$(curl -I -s -o /dev/null -w "%{http_code}" "$PAGE_URL")
    
    if [ "$HTTP_CODE" == "200" ] || [ "$HTTP_CODE" == "301" ] || [ "$HTTP_CODE" == "302" ]; then
        # Page accessible, vérifier le tag GA
        if curl -s -L "$PAGE_URL" | grep -q "G-G21WK948XL"; then
            echo -e "   ${GREEN}✓${NC} $page (HTTP $HTTP_CODE) - Tag GA présent"
            ((PAGES_PASSED++))
        else
            echo -e "   ${RED}✗${NC} $page (HTTP $HTTP_CODE) - Tag GA absent"
            ((PAGES_FAILED++))
        fi
    else
        echo -e "   ${RED}✗${NC} $page (HTTP $HTTP_CODE) - Page inaccessible"
        ((PAGES_FAILED++))
    fi
done

echo ""
echo "   Résumé pages: ${GREEN}$PAGES_PASSED${NC}/${TOTAL_PAGES} pages avec tag GA"
if [ $PAGES_FAILED -eq 0 ]; then
    echo -e "   ${GREEN}✓ Toutes les pages ont le tag GA${NC}"
    ((PASSED+=TOTAL_PAGES))
else
    echo -e "   ${YELLOW}⚠ $PAGES_FAILED page(s) sans tag GA ou inaccessible(s)${NC}"
    ((FAILED+=PAGES_FAILED))
fi
echo ""

# Résumé
echo ""
echo "=========================================="
echo "Résumé des Tests"
echo "=========================================="
echo -e "${GREEN}Tests réussis: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Tests échoués: $FAILED${NC}"
else
    echo -e "${GREEN}Tests échoués: $FAILED${NC}"
fi
echo ""

# Recommandations
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Tous les tests sont passés!${NC}"
    echo ""
    echo "Prochaines étapes:"
    echo "1. Ouvrir https://alladsmarket.com dans un navigateur"
    echo "2. Ouvrir Chrome DevTools (F12)"
    echo "3. Onglet Network → Filtrer par 'collect'"
    echo "4. Vérifier les requêtes vers google-analytics.com/g/collect"
    echo "5. Vérifier Google Analytics Real-Time dans 5-10 secondes"
else
    echo -e "${YELLOW}⚠ Certains tests ont échoué${NC}"
    echo ""
    echo "Actions recommandées:"
    echo "1. Vérifier la configuration Nginx (CSP)"
    echo "2. Vérifier que le tag GA est bien dans index.html"
    echo "3. Redémarrer Nginx: sudo systemctl restart nginx"
    echo "4. Rebuild l'application: npm run build"
fi
echo ""
echo "=========================================="
echo ""

# Code de sortie
if [ $FAILED -eq 0 ]; then
    exit 0
else
    exit 1
fi

