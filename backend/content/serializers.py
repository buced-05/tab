from rest_framework import serializers
from .models import Article, Author, Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "icon"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = [
            "id",
            "name",
            "slug",
            "title",
            "bio",
            "avatar_url",
            "website",
            "twitter",
            "linkedin",
        ]


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "body",
            "hero_image_url",
            "thumbnail_url",
            "status",
            "published_at",
            "reading_time",
            "is_featured",
            "category",
            "tags",
            "author",
            "seo_title",
            "seo_description",
            "seo_keywords",
            "structured_data",
        ]

