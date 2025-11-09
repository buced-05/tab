from django.contrib import admin
from .models import Article, Author, Category, Tag


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "icon", "created_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
    list_filter = ("created_at",)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ("name", "title", "slug", "website")
    search_fields = ("name", "title", "bio")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "category", "author", "is_featured", "published_at")
    list_filter = ("status", "is_featured", "category", "tags", "author")
    search_fields = ("title", "excerpt", "body")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("category", "author", "tags")
    date_hierarchy = "published_at"
    ordering = ("-published_at",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (None, {"fields": ("title", "slug", "excerpt", "body", "hero_image_url", "thumbnail_url")}),
        (
            "Relations & publication",
            {
                "fields": (
                    "status",
                    "published_at",
                    "reading_time",
                    "is_featured",
                    "category",
                    "author",
                    "tags",
                )
            },
        ),
        (
            "SEO",
            {
                "classes": ("collapse",),
                "fields": ("seo_title", "seo_description", "seo_keywords", "structured_data"),
            },
        ),
        ("Métadonnées", {"classes": ("collapse",), "fields": ("created_at", "updated_at")}),
    )

