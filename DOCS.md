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

Sources consolidated: PROGRESS_LINE_SUMMARY.md, CLEANUP_COMPLETE.md, APPLICATION_GUIDE.md, README.md, QUICK_START.md

---

## SEO Playbook
- Strategy, execution checklist, verification, and submission.
- On-page: titles, descriptions, headings, internal links, structured data (BreadcrumbList, Article), canonical and robots.
- Off-page: sitemap submission, search console verification.
- Image SEO: dimensions, compression, lazy/eager strategy for LCP hero.

Sources consolidated: SEO_OPTIMIZATION_GUIDE.md, SEO_STRATEGY.md, SEO_OPTIMIZATION_COMPLETE.md, SEO_OPTIMIZATION_COMPLETE_SUMMARY.md, SEO_FINAL_REPORT.md, SEO_VERIFICATION_COMPLETE.md, SEO_SUBMISSION_REPORT.md, SITE_VISIBILITY_IMPROVEMENT_GUIDE.md, SITE_VISIBILITY_IMPROVEMENT_REPORT.md, SITEMAP_SEO_GUIDE.md, SEO_ACTION_GUIDE.md, SEO_IMPROVEMENT_COMPLETE_PLAN.md

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

Sources consolidated: docs/PROJECT_STRUCTURE.md, docs/DEVELOPMENT_GUIDE.md, DIALOG_GUIDE.md, FORM_PROGRESS_GUIDE.md, KINETIC_IMAGES_INTEGRATION.md, KINETIC_IMAGES_CORRECTION.md

---

## Deployment & Infrastructure
- VPS and hosting notes, build pipelines, environment variables.
- .htaccess guidance and fixes.
- DNS and scripts overview.

Sources consolidated: DEPLOYMENT_GUIDE.md, MYSQL_SETUP_GUIDE.md, EMAILJS_SETUP_GUIDE.md, HTACCESS_COMPLETE_GUIDE.md, HTACCESS_NEW_COMPLETE.md, HTACCESS_SIMPLIFIED.md, HTACCESS_FIX.md, HTACCESS_ERROR_FIX.md, scripts/README.md, scripts/QUICK_GUIDE.md, scripts/setup-dns.md, SCRIPTS_ORGANIZATION.md

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
- LCP optimization (hero image hints), CLS avoidance (fixed dimensions), TBT reduction.
- Lazy/eager image strategy in articles and product blocks.

Sources consolidated: SEO_OPTIMIZATION_COMPLETE.md, SEO_OPTIMIZATION_COMPLETE_SUMMARY.md

---

## Troubleshooting & Fix Logs
- Console errors, build issues, PowerShell syntax, unexpected tokens.
- Translation replacement misses and how to resolve.

Sources consolidated: CLEANUP_SUMMARY.md, HTACCESS_ERROR_FIX.md, PROGRESS_LINE_SUMMARY.md

---

## Scripts & Automation
- Helper scripts, quick commands, and maintenance routines.

Sources consolidated: scripts/README.md, scripts/QUICK_GUIDE.md

---

Notes:
- This file replaces all previous Markdown guides. Future documentation should be appended here.
- Keep README minimal; link here for comprehensive docs.
