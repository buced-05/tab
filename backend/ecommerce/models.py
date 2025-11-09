from decimal import Decimal

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from content.models import Category, Tag, TimestampedModel


class AffiliateProgram(TimestampedModel):
    name = models.CharField(max_length=160, unique=True)
    slug = models.SlugField(max_length=180, unique=True)
    network = models.CharField(max_length=160, blank=True)
    description = models.TextField(blank=True)
    commission_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
        help_text="Commission % versée par le programme (ex: 12.5).",
        default=Decimal("0.00"),
    )
    cookie_duration = models.PositiveIntegerField(
        default=30, help_text="Durée du cookie (jours)."
    )
    tracking_url = models.URLField(blank=True)
    contact_email = models.EmailField(blank=True)
    terms_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Programme d'affiliation"
        verbose_name_plural = "Programmes d'affiliation"

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(TimestampedModel):
    name = models.CharField(max_length=220)
    slug = models.SlugField(max_length=240, unique=True)
    sku = models.CharField(max_length=60, blank=True)
    summary = models.CharField(max_length=280, blank=True)
    description = models.TextField(blank=True)
    url = models.URLField(blank=True, help_text="URL d'achat ou page produit.")
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
        default=Decimal("0.00"),
    )
    discounted_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00"))],
        blank=True,
        null=True,
    )
    currency = models.CharField(max_length=3, default="EUR")
    stock_status = models.CharField(
        max_length=40,
        default="in_stock",
        choices=[
            ("in_stock", "En stock"),
            ("low_stock", "Stock limité"),
            ("out_of_stock", "Rupture de stock"),
            ("preorder", "Précommande"),
        ],
    )
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00")), MaxValueValidator(Decimal("5.00"))],
        default=Decimal("4.50"),
    )
    rating_count = models.PositiveIntegerField(default=0)
    conversion_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00")), MaxValueValidator(Decimal("100.00"))],
        default=Decimal("0.00"),
        help_text="Taux de conversion en pourcentage.",
    )
    hero_image_url = models.URLField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    badge_text = models.CharField(max_length=80, blank=True)
    is_featured = models.BooleanField(default=False)
    is_trending = models.BooleanField(default=False)
    display_priority = models.PositiveIntegerField(
        default=100, help_text="Plus petit = affiché en premier."
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="products")
    affiliate_program = models.ForeignKey(
        AffiliateProgram,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="products",
    )

    specs = models.JSONField(blank=True, null=True, help_text="Fiche technique (JSON).")
    highlights = models.JSONField(
        blank=True,
        null=True,
        help_text="Liste de points forts, ex: ['Livraison 24h', 'Support 24/7'].",
    )

    class Meta:
        ordering = ["display_priority", "-created_at"]
        verbose_name = "Produit"
        verbose_name_plural = "Produits"
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["is_featured", "is_trending"]),
        ]

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Deal(TimestampedModel):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="deals"
    )
    title = models.CharField(max_length=180)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    call_to_action = models.CharField(max_length=160, blank=True)
    coupon_code = models.CharField(max_length=80, blank=True)
    discount_percentage = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(Decimal("0.00")), MaxValueValidator(Decimal("100.00"))],
        blank=True,
        null=True,
    )
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-start_date"]
        verbose_name = "Offre / Deal"
        verbose_name_plural = "Offres / Deals"

    def __str__(self) -> str:
        return f"{self.title} ({self.product})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

