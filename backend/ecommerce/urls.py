from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AffiliateProgramViewSet, DealViewSet, ProductViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="ecommerce-product")
router.register(r"affiliates", AffiliateProgramViewSet, basename="ecommerce-affiliate")
router.register(r"deals", DealViewSet, basename="ecommerce-deal")

urlpatterns = [
    path("", include(router.urls)),
]

