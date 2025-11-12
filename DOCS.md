# Project Documentation (Consolidated)

This single document consolidates all explanations, guides, SEO reports, deployment notes, and operational procedures previously spread across multiple Markdown files in the repository. It serves as the canonical source for project knowledge in production.

## Table of Contents
- Overview
- SEO Playbook
- Internationalization (i18n)
- App Structure & Development
- Deployment & Infrastructure
- Security & Compliance
- Sitemaps, Robots, Canonical
- Performance & Core Web Vitals
- Troubleshooting & Fix Logs
- Scripts & Automation

---

## Overview
- Progress summary, cleanup rationale, and production conventions.
- Project status, environments, and contact points.
- Architecture actuelle : front-end React (Vite) + nouveau backend Django (`/backend`) adossé par défaut à SQLite (remplacer par PostgreSQL/MySQL en production).
- Pour accéder au panneau admin Django : `python backend/manage.py createsuperuser`, puis `python backend/manage.py runserver 0.0.0.0:8000` et se connecter sur http://localhost:8000/admin avec les identifiants créés. En production, configurer Gunicorn/Uvicorn + reverse proxy et sécuriser l’accès admin.

Sources consolidated: PROGRESS_LINE_SUMMARY.md, CLEANUP_COMPLETE.md, APPLICATION_GUIDE.md, README.md, QUICK_START.md

---

## SEO Playbook & Indexation
- Stratégie globale : structuration des pages, maillage interne, balisage Schema.org, gestion des balises meta.
- Indexation et sitemaps : plan d’action, vérifications Search Console, soumission et suivi (`sitemap-*.xml`, `robots`).
- Résolution des incidents d’indexation (529 pages, actions immédiates, correctifs Google) et audits de résumés.
- Indexation Recovery 2025 :
  - Exporter la liste des URLs non indexées (Search Console → export CSV) avec les motifs (duplicate canonical, soft 404, erreur serveur).
  - Corriger les doublons de préfixe langue : chaque URL locale doit suivre `/lang/slug`; supprimer les occurrences `/lang/lang/slug` et mettre en place des redirections 301.
  - S’assurer que chaque template rend un canonical unique cohérent avec le sitemap et que les hreflang utilisent le `basePath` sans préfixe doublé.
  - Vérifier la disponibilité des API (`curl -I https://alladsmarket.com/api/content/articles/`) avant de lancer une validation GSC.
  - Régénérer les sitemaps (`npm run build` met à jour `dist/sitemap-*.xml`), pousser sur le VPS, et soumettre `sitemap-index.xml` après correction.
- Outils & rapports : checklists d’optimisation, feuilles de route de trafic, actions SEO prioritaires.
- Outils & rapports : checklists d’optimisation, feuilles de route de trafic, actions SEO prioritaires.

Sources consolidées : `SEO_OPTIMIZATION_GUIDE.md`, `SEO_STRATEGY.md`, `SEO_ACTIONS_IMMEDIATES.md`, `SEO_IMPROVEMENT_PLAN.md`, `SEO_SITEMAP_REPORT.md`, `SEO_SITEMAP_VERIFICATION_COMPLETE.md`, `SITEMAP_EXPLANATION.md`, `ACTION_IMMEDIATE_529_PAGES.md`, `FIX_529_PAGES_NON_INDEXEES.md`, `FIX_INDEXATION_GOOGLE*.md`, `INDEXATION_IMMEDIATE_AUJOURD_HUI.md`, `RESUME_INDEXATION_AUJOURD_HUI.md`, `RESUME_FINAL_2025.md`, `traffic-growth-roadmap.md`.

---

## Internationalization (i18n)
- i18next setup, language detector, supported languages, namespaces.
- Key patterns: t() usage, translation resources, article translations utility.
- Debugging translation loading.

Sources consolidated: docs/TRANSLATION_COMPLETE.md, docs/TRANSLATION_DEBUG.md, SEO_TRANSLATIONS_COMPLETE.md, vps-translation-fix.md

---

## App Structure & Development
- Project structure, coding standards, component conventions.
- Articles (AI / Revolutionary) pages and detail views.
- Product data source and affiliate flow (external redirects).
- Backend Django : arborescence du projet (`backend/`), application `api`, endpoints disponibles (`/api/health/`, `/api/featured-articles/`), conventions pour ajouter de nouvelles vues ou modèles.

Sources consolidated: docs/PROJECT_STRUCTURE.md, docs/DEVELOPMENT_GUIDE.md, DIALOG_GUIDE.md, FORM_PROGRESS_GUIDE.md, KINETIC_IMAGES_INTEGRATION.md, KINETIC_IMAGES_CORRECTION.md

---

## Déploiement & Infrastructure
- Procédures complètes de déploiement (safe mode, VPS, checklists post-start) et scripts d’automatisation.
- Configuration Nginx/HTACCESS, sécurité serveur, pipeline de build et gestion des services (`systemctl`, `gunicorn`/`uvicorn`) pour le backend Django.
- Checklists de vérification, guides de rollback et plans de maintenance.
- Backend Django en production :
  - Créer/mettre à jour le venv : `python3 -m venv .venv && .venv/bin/pip install -r backend/requirements.txt`
  - Appliquer les migrations : `.venv/bin/python backend/manage.py migrate`
  - Collecter les statiques : `.venv/bin/python backend/manage.py collectstatic --noinput`
  - Lancer via Gunicorn (PM2 ou systemd) : `pm2 start ecosystem.config.js --env production --update-env`
  - Gunicorn écoute sur `127.0.0.1:8001` et Nginx reverse-proxy `/api/` vers ce port (cf. `nginx-alladsmarket-complete.conf`).
- Pour un test rapide en local, `python backend/manage.py runserver 0.0.0.0:8000` reste disponible, mais ne doit pas être utilisé en production.

Sources consolidées : `DEPLOY_INSTRUCTIONS.md`, `DEPLOY_COMPLETE.md`, `DEPLOY_SAFE.md`, `DEPLOY_SAFE_VPS.md`, `VPS_DEPLOYMENT_CHECKLIST.md`, `VPS_POST_START_CHECKLIST.md`, `VPS_START_SERVICES.md`, `VPS_VERIFICATION_COMPLETE.md`, `QUICK_VPS_FIX.md`, `NGINX_CONFIGURATION_GUIDE.md`, `NGINX_SETUP_INSTRUCTIONS.md`, `SOLUTION_VPS_IMMEDIATE.md`, `SOLUTION_529_PAGES_NON_INDEXEES.md`.

---

## Security & Compliance
- Content security, external link handling (noopener, nofollow, sponsored).
- Google security compliance and privacy.

Sources consolidated: SECURITY_GUIDE.md, docs/GOOGLE_SECURITY_COMPLIANCE.md

---

## Sitemaps, Robots, Canonical
- Robots meta policy and canonical strategy on article pages.
- Sitemap generation and submission notes.

Sources consolidated: SITEMAP_SEO_GUIDE.md, SEO_VERIFICATION_COMPLETE.md

---

## Performance & Core Web Vitals
- Optimisation LCP (hero images, preloading), réduction CLS/TBT, stratégie lazy/eager des médias.
- Tests Lighthouse, suivi des Core Web Vitals et actions correctives planifiées.

Sources consolidées : `SEO_OPTIMIZATION_COMPLETE.md`, `SEO_OPTIMIZATION_COMPLETE_SUMMARY.md` (ainsi que notes internes supprimées lors du cleanup).

---

## Troubleshooting & Fix Logs
- Console errors, build issues, PowerShell syntax, unexpected tokens.
- Translation replacement misses and how to resolve.
- 502 Bad Gateway côté front : vérifier que Gunicorn tourne (`pm2 status alladsmarket-backend`), relancer via `scripts/vps/start-all-services.sh`, confirmer `curl -I https://alladsmarket.com/api/content/articles/` → 200. Inspecter les logs Nginx (`/var/log/nginx/alladsmarket.error.log`) et Gunicorn (`backend/logs/gunicorn-error.log`) en cas d’échec répété.
- Statics admin non chargés : `STATIC_ROOT` doit être servi par `collectstatic` et le chemin `STATICFILES_DIRS` doit pointer vers `backend/static`. S’assurer que Nginx autorise `/static/` et relancer `collectstatic` après chaque mise à jour.
- Déduplication i18n : surveiller les URLs avec double préfixe (`/hi/hi/...`). Utiliser le plan “Indexation Recovery” (cf. section SEO) pour corriger les routes et régénérer les sitemaps.

Sources consolidées : `CLEANUP_SUMMARY.md`, `RECAP_FINAL_COMPLET.md`, `RESUME_SESSION.md`, `HTACCESS_ERROR_FIX.md`, `FIX_SITEMAP_GOOGLE_SEARCH_CONSOLE.md`, `SOLUTION_VPS_IMMEDIATE.md`.

---

## Git & Collaboration Workflows
- Procédures pour résoudre les divergences (`git reset --hard`, merge guides, quick cheatsheets).
- Bonnes pratiques de branches, prévention des conflits, référentiels de récupération.

Sources consolidées : `GIT_RESET_HARD_GUIDE.md`, `GIT_MERGE_GUIDE.md`, `GIT_DIVERGENT_BRANCHES_GUIDE.md`.

---

## Articles & Contenus Internes
- Contenus rédactionnels internes, articles de référence, résumés d’ajout produit.
- Utilisation comme base d’exemples pour générateur d’articles IA.

Sources consolidées : archives internes (articles longue forme, résumés produits, guides IA) désormais intégrées directement ici.

---

## Scripts & Automation
- Helper scripts, quick commands, and maintenance routines.

Sources consolidated: scripts/README.md, scripts/QUICK_GUIDE.md

---

Notes:
- This file replaces all previous Markdown guides. Future documentation should be appended here.
- Keep README minimal; link here for comprehensive docs.
