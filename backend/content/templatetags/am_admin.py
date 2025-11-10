"""Custom template helpers for the AllAdsMarket admin dashboard."""

from django import template

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

