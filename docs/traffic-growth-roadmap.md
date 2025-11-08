# Roadmap Trafic & Distribution – Novembre 2025

## 1. Objectifs (90 jours)
- Doubler le trafic organique (sessions +100 %).  
- Atteindre 15 000 visites/mois via social & newsletters combinés.  
- Taux de crawl pages clés ≥ 95 %, couverture sitemap sans erreurs.

## 2. Contenu & calendrier
- **Hebdo** : 2 articles “hot topics” + 1 étude evergreen.  
- **Mensuel** : 1 dossier long (“pillar page”) + 1 guide PDF (lead magnet).  
- **Formats dérivés** : short vidéo (TikTok/Reels), carrousel LinkedIn, infographie Pinterest.

### Process
1. Ideation → score (volume recherche + tendance sociale + potentiel monétisation).  
2. Brief SEO (title, H2, questions People Also Ask, tags).  
3. Publication → distribution 24h max après mise en ligne.  
4. Mise à jour articles performants tous les 45 jours.

## 3. Distribution multi-canal
| Canal | Action | KPI |
| --- | --- | --- |
| SEO | Optimisation on-page, schema, maillage interne, pages tags | Impressions / CTR |
| LinkedIn & X | Thread + carrousel résumant chaque article | Trafic référent |
| TikTok/Shorts | 45s “insight” + CTA ➜ article | Vues, clics bio |
| Newsletter | Hebdo “AllAdsMarket Brief” (3 actus + ressource) | Open rate, CTR |
| Syndication | Medium, Substack, guest post partenaires | Backlinks, trafic référent |
| Paid ponctuel | Boost posts LinkedIn/Twitter pour guides premium | Leads générés |

## 4. Maillage interne
1. Ajouter “Articles connexes” (3–5 basés sur tags) sur toutes les pages.  
2. Mettre à jour les pages piliers avec liens vers nouveaux contenus.  
3. Créer un plan de redirection interne : chaque nouvelle page → 2 liens entrants depuis anciens articles.  
4. Vérifier chaque mois liens cassés via Screaming Frog / `npm run lint:links`.

## 5. SEO technique
- **Sitemaps** : regénération auto (`npm run generate-sitemaps`) + soumission GSC/Bing.  
- **Core Web Vitals** : surveiller PageSpeed (objectif LCP < 2.5 s).  
- **Logs** : analyser crawl via `logs/seo/` (scripts existants) → identifier pages ignorées.  
- **International/hreflang** : conserver FR/EN cohérents, canonical croisés.

## 6. Mesure & outils
- Google Search Console + Looker Studio dashboard (sessions, clics, top requêtes).  
- Matomo ou GA4 pour trafic multi-sources.  
- Hotjar / Microsoft Clarity pour comprendre UX.  
- Notion/ClickUp pour tracker backlog SEO + distribution.  

## 7. Rituel hebdo
1. Lundi : revue GSC + performances (inspection pages, indexation).  
2. Mardi : production/diffusion contenu.  
3. Mercredi : outreach/backlinks (emails partenaires).  
4. Vendredi : analyse analytics + décisions (mettre à jour plan).  

## 8. Quick wins immédiats (semaine en cours)
- Lancer newsletter “AllAdsMarket Brief #1”.  
- Publier carrousel LinkedIn sur shutdown US + Kalmaegi.  
- Activer section “Articles associés” sur `AIArticleDetail` (listes tags).  
- Regénérer sitemaps, soumettre sur GSC.  
- Nettoyer tags redondants selon [tag-taxonomy-plan.md](./tag-taxonomy-plan.md).

Cette roadmap est évolutive : mise à jour tous les mois, nouvelles idées testées systématiquement (A/B titres, formats vidéo, CTAs).***

