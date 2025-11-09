"""
URL configuration for the Django backend.
"""

from django.conf import settings
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "AllAdsMarket — Administration"
admin.site.site_title = "AllAdsMarket Backoffice"
admin.site.index_title = "Pilotage des contenus et produits"
admin.site.site_url = getattr(settings, "FRONTEND_BASE_URL", "http://localhost:3000")

urlpatterns = [
    path("grappelli/", include("grappelli.urls")),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("api/content/", include("content.urls")),
    path("api/ecommerce/", include("ecommerce.urls")),
]

