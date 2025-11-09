from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from .models import Article, Author, Category, Tag, ArticleStatus
from .serializers import ArticleSerializer, AuthorSerializer, CategorySerializer, TagSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = "slug"


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = "slug"


class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    lookup_field = "slug"


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Article.objects.select_related("category", "author")
        .prefetch_related("tags")
        .filter(status=ArticleStatus.PUBLISHED)
    )
    serializer_class = ArticleSerializer
    lookup_field = "slug"
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "excerpt", "body", "seo_keywords"]
    ordering_fields = ["published_at", "reading_time"]
    ordering = ["-published_at"]

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get("category")
        tag = self.request.query_params.get("tag")
        featured = self.request.query_params.get("featured")

        if category:
            qs = qs.filter(category__slug=category)
        if tag:
            qs = qs.filter(tags__slug=tag)
        if featured == "true":
            qs = qs.filter(is_featured=True)

        return qs.distinct()

