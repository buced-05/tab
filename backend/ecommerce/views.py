from rest_framework import filters, viewsets
from rest_framework.pagination import PageNumberPagination

from .models import AffiliateProgram, Deal, Product
from .serializers import AffiliateProgramSerializer, DealSerializer, ProductSerializer


class EcommercePagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 100


class AffiliateProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AffiliateProgram.objects.filter(is_active=True)
    serializer_class = AffiliateProgramSerializer
    lookup_field = "slug"
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "network", "description"]
    ordering_fields = ["name", "commission_rate"]
    ordering = ["name"]


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Product.objects.select_related("category", "affiliate_program")
        .prefetch_related("tags", "deals")
        .all()
    )
    serializer_class = ProductSerializer
    lookup_field = "slug"
    pagination_class = EcommercePagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "summary", "description", "sku"]
    ordering_fields = ["display_priority", "price", "rating", "updated_at"]
    ordering = ["display_priority", "-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get("category")
        tag = self.request.query_params.get("tag")
        affiliate = self.request.query_params.get("affiliate")
        featured = self.request.query_params.get("featured")
        trending = self.request.query_params.get("trending")

        if category:
            queryset = queryset.filter(category__slug=category)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        if affiliate:
            queryset = queryset.filter(affiliate_program__slug=affiliate)
        if featured == "true":
            queryset = queryset.filter(is_featured=True)
        if trending == "true":
            queryset = queryset.filter(is_trending=True)

        return queryset.distinct()


class DealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Deal.objects.select_related("product").filter(is_active=True)
    serializer_class = DealSerializer
    lookup_field = "slug"
    pagination_class = EcommercePagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "coupon_code", "product__name"]
    ordering_fields = ["start_date", "end_date", "discount_percentage"]
    ordering = ["-start_date"]

