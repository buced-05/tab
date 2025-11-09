from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.utils import timezone


@require_GET
def health(request):
    """
    Simple health-check endpoint so the front-end or uptime monitors can verify the backend.
    """
    return JsonResponse(
        {
            "status": "ok",
            "message": "Django backend is running",
            "timestamp": timezone.now().isoformat(),
        }
    )


@require_GET
def featured_articles(request):
    """
    Placeholder endpoint returning a small set of articles.
    Replace this with real database queries or external service calls.
    """
    sample_articles = [
        {
            "slug": "strategie-marketing-ia",
            "title": "Stratégie Marketing : tirer parti de l'IA générative",
            "excerpt": "Découvrez comment l'intelligence artificielle transforme les campagnes marketing modernes.",
            "category": "Marketing",
        },
        {
            "slug": "guide-seo-2025",
            "title": "SEO 2025 : bonnes pratiques pour rester visible",
            "excerpt": "Les fondamentaux à garder pour optimiser vos performances organiques en 2025.",
            "category": "SEO",
        },
    ]
    return JsonResponse({"results": sample_articles})

