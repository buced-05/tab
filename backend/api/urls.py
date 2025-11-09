from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health, name="api-health"),
    path("featured-articles/", views.featured_articles, name="api-featured-articles"),
]

