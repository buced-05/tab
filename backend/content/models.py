from django.db import models
from django.utils.text import slugify
from django.utils import timezone


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Category(TimestampedModel):
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=120, blank=True, help_text="Nom d'icône ou classe CSS optionnelle.")

    class Meta:
        ordering = ["name"]
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Tag(TimestampedModel):
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Tag"
        verbose_name_plural = "Tags"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Author(TimestampedModel):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=160, blank=True)
    bio = models.TextField(blank=True)
    avatar_url = models.URLField(blank=True)
    website = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Auteur"
        verbose_name_plural = "Auteurs"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ArticleStatus(models.TextChoices):
    DRAFT = "draft", "Brouillon"
    SCHEDULED = "scheduled", "Planifié"
    PUBLISHED = "published", "Publié"


class Article(TimestampedModel):
    title = models.CharField(max_length=220)
    slug = models.SlugField(max_length=240, unique=True)
    excerpt = models.TextField(blank=True)
    body = models.TextField()

    hero_image_url = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)

    status = models.CharField(
        max_length=12,
        choices=ArticleStatus.choices,
        default=ArticleStatus.DRAFT,
    )
    published_at = models.DateTimeField(default=timezone.now)
    reading_time = models.PositiveIntegerField(default=5, help_text="Temps de lecture estimé en minutes.")
    is_featured = models.BooleanField(default=False)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="articles",
    )
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)
    author = models.ForeignKey(
        Author,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="articles",
    )

    seo_title = models.CharField(max_length=240, blank=True)
    seo_description = models.CharField(max_length=320, blank=True)
    seo_keywords = models.CharField(max_length=320, blank=True)
    structured_data = models.JSONField(blank=True, null=True, help_text="JSON-LD personnalisé (facultatif).")

    class Meta:
        ordering = ["-published_at"]
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["status", "published_at"]),
        ]

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

