from rest_framework import serializers

from content.serializers import CategorySerializer, TagSerializer

from .models import AffiliateProgram, Deal, Product


class AffiliateProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = AffiliateProgram
        fields = [
            "id",
            "name",
            "slug",
            "network",
            "description",
            "commission_rate",
            "cookie_duration",
            "tracking_url",
            "contact_email",
            "terms_url",
            "is_active",
        ]


class DealSerializer(serializers.ModelSerializer):
    product = serializers.SlugRelatedField(read_only=True, slug_field="slug")

    class Meta:
        model = Deal
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "call_to_action",
            "coupon_code",
            "discount_percentage",
            "start_date",
            "end_date",
            "is_active",
            "product",
        ]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    affiliate_program = AffiliateProgramSerializer(read_only=True)
    deals = DealSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "sku",
            "summary",
            "description",
            "url",
            "price",
            "discounted_price",
            "currency",
            "stock_status",
            "rating",
            "rating_count",
            "conversion_rate",
            "hero_image_url",
            "thumbnail_url",
            "badge_text",
            "is_featured",
            "is_trending",
            "display_priority",
            "category",
            "tags",
            "affiliate_program",
            "specs",
            "highlights",
            "deals",
        ]

