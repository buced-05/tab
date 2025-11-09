"""Custom template helpers for the AllAdsMarket admin dashboard."""

from django import template
from django.urls import reverse

from content.models import Article, ArticleStatus
from ecommerce.models import Deal, Product


register = template.Library()


@register.simple_tag
def content_stats():
    """Return basic statistics about the editorial content."""
    published = Article.objects.filter(status=ArticleStatus.PUBLISHED).count()
    drafts = Article.objects.exclude(status=ArticleStatus.PUBLISHED).count()
    return {
        "published": published,
        "drafts": drafts,
    }


@register.simple_tag
def ecommerce_stats():
    """Return figures for the e-commerce / affiliate section."""
    products = Product.objects.count()
    featured = Product.objects.filter(is_featured=True).count()
    deals = Deal.objects.filter(is_active=True).count()
    return {
        "products": products,
        "featured": featured,
        "deals": deals,
    }


@register.simple_tag(takes_context=True)
def dashboard_payload(context):
    """Build a JSON-serialisable payload consumed by the React admin dashboard."""
    request = context["request"]
    content = content_stats()
    ecommerce = ecommerce_stats()

    quick_actions = [
        {
            "label": "Créer un article",
            "href": reverse("admin:content_article_add"),
            "icon": "📝",
        },
        {
            "label": "Ajouter un produit",
            "href": reverse("admin:ecommerce_product_add"),
            "icon": "🛍️",
        },
        {
            "label": "Lancer une offre",
            "href": reverse("admin:ecommerce_deal_add"),
            "icon": "🎯",
        },
        {
            "label": "Gérer l’équipe",
            "href": reverse("admin:auth_user_changelist"),
            "icon": "👥",
        },
    ]

    stats_cards = [
        {
            "title": "Articles publiés",
            "value": content["published"],
            "caption": "Synchronisés avec le front React",
        },
        {
            "title": "Produits actifs",
            "value": ecommerce["products"],
            "caption": f"{ecommerce['featured']} produits mis en avant",
        },
        {
            "title": "Offres en cours",
            "value": ecommerce["deals"],
            "caption": "Codes promo & deals disponibles",
        },
    ]

    apps_payload = []
    for app in context.get("app_list", []):
        models = []
        for model in app.get("models", []):
            models.append(
                {
                    "name": model.get("name"),
                    "admin_url": model.get("admin_url"),
                    "add_url": model.get("add_url"),
                }
            )
        apps_payload.append(
            {
                "name": app.get("name"),
                "app_label": app.get("app_label"),
                "models": models,
            }
        )

    return {
        "quick_actions": quick_actions,
        "stats": stats_cards,
        "apps": apps_payload,
        "site_url": context.get("site_url"),
        "username": request.user.get_username(),
    }

