# 🧪 Test Google Analytics - Guide Complet

## ✅ Test de la Requête Directe

Vous avez testé l'endpoint Google Analytics avec :

```bash
curl -X POST https://www.google-analytics.com/g/collect \
  -d 'v=2&t=pageview&tid=G-G21WK948XL&cid=555&dp=/test'
```

### Interprétation des Réponses

#### ✅ Succès (Code 200 ou 204)
Si vous voyez :
- Code `200 OK` avec réponse vide
- Code `204 No Content`
- Aucune erreur

**➡️ Cela signifie que la requête a été acceptée par Google Analytics**

#### ❌ Erreur (Code 400, 403, 404, etc.)
Si vous voyez :
- `400 Bad Request` : Paramètres invalides
- `403 Forbidden` : Problème d'authentification ou permissions
- `404 Not Found` : Endpoint incorrect

**➡️ Vérifier les paramètres de la requête**

## 🔍 Vérification Complète de la Configuration

### 1. Test du Tag dans le HTML

```bash
# Vérifier que le tag est présent
curl -s https://alladsmarket.com | grep -i "G-G21WK948XL"
```

**Résultat attendu :**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G21WK948XL"></script>
gtag('config', 'G-G21WK948XL', {
```

### 2. Test de la Configuration CSP

```bash
# Vérifier les headers CSP
curl -I https://alladsmarket.com 2>&1 | grep -i "content-security-policy"
```

**Résultat attendu :**
```
content-security-policy: ...connect-src ... https://www.google-analytics.com ... https://www.google-analytics.com/g/collect https://region1.google-analytics.com/g/collect ...
```

### 3. Test de l'Endpoint GA en Direct (Comme vous venez de faire)

```bash
# Test de l'endpoint GA4
curl -X POST https://www.google-analytics.com/g/collect \
  -d 'v=2&t=pageview&tid=G-G21WK948XL&cid=555&dp=/test' \
  -v

# Test avec User-Agent
curl -X POST https://www.google-analytics.com/g/collect \
  -d 'v=2&t=pageview&tid=G-G21WK948XL&cid=555&dp=/test' \
  -H "User-Agent: Mozilla/5.0" \
  -v
```

### 4. Test depuis le Navigateur (Le Plus Important)

1. **Ouvrir Chrome DevTools**
   - `F12` ou `Ctrl+Shift+I`

2. **Onglet Network**
   - Filtrer par `collect` ou `google-analytics`

3. **Visiter https://alladsmarket.com**

4. **Vérifier les Requêtes GA**
   - Devrait voir des requêtes vers :
     - `https://www.googletagmanager.com/gtag/js?id=G-G21WK948XL`
     - `https://www.google-analytics.com/g/collect`
     - `https://region1.google-analytics.com/g/collect`

5. **Vérifier le Status**
   - Devrait être `200` ou `204`
   - Pas d'erreurs CSP (Content Security Policy)

### 5. Test dans Google Analytics Real-Time

1. **Se connecter à Google Analytics**
   - https://analytics.google.com

2. **Naviguer vers Real-Time**
   - `Reports` → `Real-time`

3. **Visiter le site**
   - Ouvrir https://alladsmarket.com dans un nouvel onglet

4. **Vérifier les données**
   - Devrait voir votre visite apparaître dans les 5-10 secondes
   - Si rien n'apparaît après 30 secondes, vérifier la configuration

## 📋 Checklist de Vérification

- [x] Tag GA présent dans le HTML
- [x] Script gtag.js chargé correctement
- [x] Configuration CSP autorise GA
- [ ] Test curl vers `/g/collect` réussit
- [ ] Tag GA présent sur toutes les pages importantes
- [ ] Requêtes GA visibles dans DevTools (navigateur)
- [ ] Pas d'erreurs CSP dans la console
- [ ] Données visibles dans GA Real-Time

## 📄 Liste des Pages Testées

Le script de test vérifie automatiquement le tag GA sur les pages importantes :

- `/` - Page d'accueil
- `/products` - Liste des produits
- `/articles` - Articles IA
- `/ai-articles` - Articles IA (alternatif)
- `/contact` - Contact
- `/help` - Centre d'aide
- `/faq` - FAQ
- `/privacy` - Politique de confidentialité
- `/terms` - Conditions d'utilisation
- `/shipping` - Informations de livraison
- `/returns` - Politique de retour

**Personnalisation :** Vous pouvez modifier la liste dans `scripts/test-google-analytics.sh` :

```bash
PAGES=(
    "/"
    "/products"
    "/articles"
    # Ajoutez vos pages ici
)
```

## 🔧 Dépannage

### Problème: Pas de données dans Real-Time

#### Solution 1: Vérifier le Tag

```bash
# Vérifier que le tag est le premier dans <head>
curl -s https://alladsmarket.com | grep -A 5 "<head>"
```

Le tag doit être **immédiatement** après `<meta charset>` et `<meta name="viewport">`.

#### Solution 2: Vérifier la Console du Navigateur

1. Ouvrir Chrome DevTools
2. Onglet **Console**
3. Visiter le site
4. Chercher les erreurs CSP ou gtag

**Erreurs courantes :**
```
Refused to connect to 'https://www.google-analytics.com/g/collect'
```
➡️ Problème CSP - Vérifier la configuration Nginx/Apache

#### Solution 3: Vérifier les Headers CSP

```bash
# Vérifier les headers CSP complets
curl -I https://alladsmarket.com 2>&1 | grep -i "content-security-policy"
```

**Doit contenir :**
- `https://www.google-analytics.com`
- `https://www.googletagmanager.com`
- `https://www.google-analytics.com/g/collect`
- `https://region1.google-analytics.com/g/collect`

#### Solution 4: Test Direct de l'Endpoint GA

```bash
# Test avec tous les paramètres requis
curl -X POST "https://www.google-analytics.com/g/collect" \
  -d "v=2&tid=G-G21WK948XL&cid=555&t=pageview&dp=/test" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" \
  -v

# Devrait retourner 200 ou 204
```

### Problème: Erreur CSP dans la Console

**Erreur :**
```
Refused to connect to 'https://www.google-analytics.com/g/collect' because it violates the following Content Security Policy directive: "connect-src ..."
```

**Solution :**

1. **Vérifier Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/alladsmarket.com
   ```
   
   Dans `Content-Security-Policy`, vérifier :
   ```
   connect-src ... https://www.google-analytics.com https://www.googletagmanager.com https://www.google-analytics.com/g/collect https://region1.google-analytics.com/g/collect
   ```

2. **Redémarrer Nginx**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 📊 Commandes de Test Rapides

```bash
# 1. Vérifier le tag GA dans le HTML
curl -s https://alladsmarket.com | grep "G-G21WK948XL"

# 2. Vérifier les headers CSP
curl -I https://alladsmarket.com 2>&1 | grep -i "content-security-policy"

# 3. Test de l'endpoint GA
curl -X POST https://www.google-analytics.com/g/collect \
  -d 'v=2&t=pageview&tid=G-G21WK948XL&cid=555&dp=/test' \
  -w "\nHTTP Status: %{http_code}\n"

# 4. Vérifier les logs Nginx pour les erreurs
sudo tail -100 /var/log/nginx/error.log | grep -i "csp\|security"

# 5. Test complet avec verbose
curl -X POST https://www.google-analytics.com/g/collect \
  -d 'v=2&t=pageview&tid=G-G21WK948XL&cid=555&dp=/test' \
  -v 2>&1 | grep -E "(HTTP|connect|send)"
```

## 🎯 Résultat Attendu

Si tout fonctionne correctement :

1. **Test curl** : Code `200` ou `204`, pas d'erreurs
2. **DevTools** : Requêtes GA visibles, status `200` ou `204`
3. **Console** : Aucune erreur CSP
4. **GA Real-Time** : Visite visible dans les 5-10 secondes

## ⏰ Délai de Détection

- **Real-Time** : 5-10 secondes après la visite
- **Standard Reports** : 24-48 heures pour les données complètes
- **Tag Detection Tool** : Peut prendre jusqu'à 24-48h

**➡️ Si le tag est présent et correct, attendez 24-48h pour la détection complète par Google.**

