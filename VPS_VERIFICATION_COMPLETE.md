# ✅ Vérification Complète VPS

## 🎉 Statut: Opérationnel

Votre site est maintenant:
- ✅ Accessible sur https://alladsmarket.com
- ✅ Google Analytics tag présent et correct (`G-G21WK948XL`)
- ✅ Serveur PM2 en ligne

## 📋 Vérifications Finales

### 1. Vérifier les Services

```bash
# PM2 Status
pm2 status

# Nginx Status
sudo systemctl status nginx

# MySQL Status (si utilisé)
sudo systemctl status mysql
```

### 2. Tester l'API Backend

```bash
# Health check
curl http://localhost:5000/api/health

# Devrait retourner:
# {"status":"OK","timestamp":"...","uptime":...,"environment":"production"}
```

### 3. Vérifier Google Analytics

```bash
# Vérifier que le tag est présent
curl -s https://alladsmarket.com | grep "G-G21WK948XL"

# Vérifier les logs pour les requêtes GA
pm2 logs bestserver | grep -i "analytics\|gtag" || echo "Pas de logs GA visibles (normal)"
```

### 4. Vérifier les Fichiers Statiques

```bash
# Vérifier que dist/ existe et contient les fichiers
ls -la /var/www/tab/dist/

# Vérifier index.html
ls -la /var/www/tab/dist/index.html

# Vérifier les assets
ls -la /var/www/tab/dist/assets/js/ | head -5
ls -la /var/www/tab/dist/assets/css/ | head -5
```

### 5. Test Complet du Site

```bash
# Test de la page d'accueil
curl -I https://alladsmarket.com

# Devrait retourner: HTTP/2 200

# Test avec headers complets
curl -v https://alladsmarket.com 2>&1 | grep -E "(HTTP|X-|Content-)"
```

## 🔍 Commandes de Monitoring

### PM2 Monitoring

```bash
# Monitoring en temps réel
pm2 monit

# Logs en direct
pm2 logs bestserver --follow

# Stats détaillées
pm2 describe bestserver
```

### Nginx Monitoring

```bash
# Logs d'accès
sudo tail -f /var/log/nginx/access.log

# Logs d'erreurs
sudo tail -f /var/log/nginx/error.log

# Test de configuration
sudo nginx -t
```

### Système

```bash
# Vérifier les ports ouverts
sudo netstat -tlnp | grep -E ':(80|443|5000|3306)'

# Vérifier l'utilisation mémoire
free -h

# Vérifier l'espace disque
df -h
```

## ✅ Checklist Complète

- [x] Git pull/marge réussi
- [x] Serveur PM2 démarré
- [x] Site web accessible (HTTPS)
- [x] Google Analytics tag présent
- [ ] Build frontend exécuté (`npm run build`)
- [ ] Nginx redémarré
- [ ] PM2 sauvegardé (`pm2 save`)
- [ ] PM2 startup configuré (`pm2 startup`)
- [ ] Tests API fonctionnels
- [ ] Logs sans erreurs

## 🚀 Commandes Finales à Exécuter

```bash
# 1. Build frontend (si pas encore fait)
cd /var/www/tab
npm run build

# 2. Redémarrer Nginx
sudo systemctl restart nginx

# 3. Sauvegarder PM2
pm2 save

# 4. Configurer démarrage automatique
pm2 startup
# Suivre les instructions affichées

# 5. Vérifier les logs
pm2 logs bestserver --lines 50

# 6. Test final
curl -I https://alladsmarket.com
curl http://localhost:5000/api/health
```

## 📊 Surveillance Continue

### Commandes Utiles

```bash
# Voir les stats PM2
pm2 status

# Monitoring en temps réel
pm2 monit

# Logs avec filtres
pm2 logs bestserver --lines 100 | grep -i error
pm2 logs bestserver --lines 100 | grep -i "listening\|started\|running"

# Vérifier les requêtes
sudo tail -100 /var/log/nginx/access.log | grep alladsmarket.com

# Vérifier les erreurs
sudo tail -100 /var/log/nginx/error.log
```

## 🎯 Prochaines Étapes

1. **Vérifier Google Analytics** dans 24-48h pour confirmer la collecte de données
2. **Monitorer les logs** pendant quelques jours pour détecter d'éventuelles erreurs
3. **Tester toutes les pages** du site pour s'assurer que tout fonctionne
4. **Vérifier les performances** avec Google PageSpeed Insights

## 📝 Notes Importantes

- Le serveur PM2 s'appelle `bestserver` (vous pouvez le renommer si nécessaire)
- Le site sert les fichiers statiques depuis `/var/www/tab/dist/`
- Nginx proxy les requêtes API vers `http://localhost:5000`
- Google Analytics est configuré et présent sur le site

