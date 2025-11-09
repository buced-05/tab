from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, AuthorViewSet, CategoryViewSet, TagViewSet


router = DefaultRouter()
router.register(r"articles", ArticleViewSet, basename="content-article")
router.register(r"categories", CategoryViewSet, basename="content-category")
router.register(r"tags", TagViewSet, basename="content-tag")
router.register(r"authors", AuthorViewSet, basename="content-author")

urlpatterns = [
    path("", include(router.urls)),
]

