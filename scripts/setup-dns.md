# 🌐 Configuration DNS pour AllAdsMarket.com

## 📋 Configuration DNS requise

### 1. Configuration A Record
```
Type: A
Name: @
Value: 91.108.120.78
TTL: 300
```

### 2. Configuration CNAME pour WWW
```
Type: CNAME
Name: www
Value: alladsmarket.com
TTL: 300
```

### 3. Configuration CAA (optionnel)
```
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
```

## 🔧 Instructions de configuration

### Pour Cloudflare (recommandé)
1. Ajoutez le domaine `alladsmarket.com` à Cloudflare
2. Configurez les DNS records comme indiqué ci-dessus
3. Activez le proxy (nuage orange)
4. Configurez SSL/TLS en mode "Full (strict)"
5. Activez "Always Use HTTPS"

### Pour d'autres fournisseurs DNS
1. Connectez-vous à votre panneau de contrôle DNS
2. Ajoutez les records A et CNAME comme indiqué
3. Attendez la propagation DNS (jusqu'à 24h)

## 🔍 Vérification DNS

### Commandes de test
```bash
# Vérifier la résolution DNS
nslookup alladsmarket.com
nslookup www.alladsmarket.com

# Vérifier avec dig
dig alladsmarket.com
dig www.alladsmarket.com

# Tester la connectivité
ping alladsmarket.com
curl -I http://alladsmarket.com
```

### Résultats attendus
```
alladsmarket.com.    300    IN    A    91.108.120.78
www.alladsmarket.com. 300   IN    CNAME alladsmarket.com.
```

## ⏱️ Temps de propagation

- **Propagation locale** : 5-15 minutes
- **Propagation mondiale** : 1-24 heures
- **Propagation complète** : jusqu'à 48 heures

## 🚨 Dépannage DNS

### Problèmes courants
1. **DNS non propagé** : Attendez 24h et vérifiez avec différents outils
2. **CNAME incorrect** : Vérifiez que le CNAME pointe vers le bon domaine
3. **TTL trop élevé** : Réduisez le TTL à 300 secondes

### Outils de vérification
- https://dnschecker.org/
- https://whatsmydns.net/
- https://dns.google/

## 📊 Monitoring DNS

### Configuration de monitoring
```bash
# Script de monitoring DNS
#!/bin/bash
DOMAIN="alladsmarket.com"
IP="91.108.120.78"

# Vérifier la résolution DNS
RESOLVED_IP=$(dig +short $DOMAIN)
if [ "$RESOLVED_IP" = "$IP" ]; then
    echo "✅ DNS OK: $DOMAIN -> $RESOLVED_IP"
else
    echo "❌ DNS Error: $DOMAIN -> $RESOLVED_IP (expected: $IP)"
fi
```

## 🔒 Sécurité DNS

### Recommandations
1. **DNSSEC** : Activez DNSSEC si supporté
2. **CAA Records** : Configurez les CAA records pour SSL
3. **Monitoring** : Surveillez les changements DNS
4. **Backup** : Sauvegardez la configuration DNS

---

**🎯 Une fois la configuration DNS terminée, exécutez le script de déploiement VPS !**
