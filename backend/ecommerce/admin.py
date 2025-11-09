from django.contrib import admin

from .models import AffiliateProgram, Deal, Product


@admin.register(AffiliateProgram)
class AffiliateProgramAdmin(admin.ModelAdmin):
    list_display = ("name", "network", "commission_rate", "cookie_duration", "is_active")
    list_filter = ("is_active", "network")
    search_fields = ("name", "network", "description")
    prepopulated_fields = {"slug": ("name",)}


class DealInline(admin.TabularInline):
    model = Deal
    extra = 0
    fields = (
        "title",
        "coupon_code",
        "discount_percentage",
        "start_date",
        "end_date",
        "is_active",
    )
    ordering = ("-start_date",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price",
        "currency",
        "is_featured",
        "is_trending",
        "display_priority",
        "updated_at",
    )
    list_filter = (
        "is_featured",
        "is_trending",
        "category",
        "affiliate_program",
        "stock_status",
    )
    search_fields = ("name", "slug", "summary", "description", "sku")
    autocomplete_fields = ("category", "tags", "affiliate_program")
    prepopulated_fields = {"slug": ("name",)}
    inlines = [DealInline]
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "name",
                    "slug",
                    "sku",
                    "summary",
                    "description",
                    "url",
                )
            },
        ),
        (
            "Affichage & média",
            {
                "fields": (
                    "hero_image_url",
                    "thumbnail_url",
                    "badge_text",
                    "display_priority",
                )
            },
        ),
        (
            "Tarification & performance",
            {
                "fields": (
                    "price",
                    "discounted_price",
                    "currency",
                    "stock_status",
                    "rating",
                    "rating_count",
                    "conversion_rate",
                )
            },
        ),
        (
            "Relations",
            {
                "fields": (
                    "category",
                    "tags",
                    "affiliate_program",
                    "is_featured",
                    "is_trending",
                )
            },
        ),
        (
            "Données structurées",
            {
                "classes": ("collapse",),
                "fields": (
                    "specs",
                    "highlights",
                ),
            },
        ),
        ("Meta", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "product",
        "discount_percentage",
        "coupon_code",
        "start_date",
        "end_date",
        "is_active",
    )
    list_filter = ("is_active", "start_date", "product__category")
    search_fields = ("title", "coupon_code", "product__name")
    autocomplete_fields = ("product",)
    prepopulated_fields = {"slug": ("title",)}

