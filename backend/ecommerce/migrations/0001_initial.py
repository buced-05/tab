import django.core.validators
from decimal import Decimal
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("content", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AffiliateProgram",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=160, unique=True)),
                ("slug", models.SlugField(max_length=180, unique=True)),
                ("network", models.CharField(blank=True, max_length=160)),
                ("description", models.TextField(blank=True)),
                (
                    "commission_rate",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Commission % versée par le programme (ex: 12.5).",
                        max_digits=5,
                        validators=[django.core.validators.MinValueValidator(Decimal("0.00"))],
                    ),
                ),
                (
                    "cookie_duration",
                    models.PositiveIntegerField(default=30, help_text="Durée du cookie (jours)."),
                ),
                ("tracking_url", models.URLField(blank=True)),
                ("contact_email", models.EmailField(blank=True, max_length=254)),
                ("terms_url", models.URLField(blank=True)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Programme d'affiliation",
                "verbose_name_plural": "Programmes d'affiliation",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=220)),
                ("slug", models.SlugField(max_length=240, unique=True)),
                ("sku", models.CharField(blank=True, max_length=60)),
                ("summary", models.CharField(blank=True, max_length=280)),
                ("description", models.TextField(blank=True)),
                ("url", models.URLField(blank=True, help_text="URL d'achat ou page produit.")),
                (
                    "price",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(Decimal("0.00"))],
                    ),
                ),
                (
                    "discounted_price",
                    models.DecimalField(
                        blank=True,
                        decimal_places=2,
                        max_digits=10,
                        null=True,
                        validators=[django.core.validators.MinValueValidator(Decimal("0.00"))],
                    ),
                ),
                ("currency", models.CharField(default="EUR", max_length=3)),
                (
                    "stock_status",
                    models.CharField(
                        choices=[
                            ("in_stock", "En stock"),
                            ("low_stock", "Stock limité"),
                            ("out_of_stock", "Rupture de stock"),
                            ("preorder", "Précommande"),
                        ],
                        default="in_stock",
                        max_length=40,
                    ),
                ),
                (
                    "rating",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("4.50"),
                        max_digits=3,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.00")),
                            django.core.validators.MaxValueValidator(Decimal("5.00")),
                        ],
                    ),
                ),
                ("rating_count", models.PositiveIntegerField(default=0)),
                (
                    "conversion_rate",
                    models.DecimalField(
                        decimal_places=2,
                        default=Decimal("0.00"),
                        help_text="Taux de conversion en pourcentage.",
                        max_digits=5,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.00")),
                            django.core.validators.MaxValueValidator(Decimal("100.00")),
                        ],
                    ),
                ),
                ("hero_image_url", models.URLField(blank=True)),
                ("thumbnail_url", models.URLField(blank=True)),
                ("badge_text", models.CharField(blank=True, max_length=80)),
                ("is_featured", models.BooleanField(default=False)),
                ("is_trending", models.BooleanField(default=False)),
                (
                    "display_priority",
                    models.PositiveIntegerField(
                        default=100, help_text="Plus petit = affiché en premier."
                    ),
                ),
                (
                    "specs",
                    models.JSONField(blank=True, help_text="Fiche technique (JSON).", null=True),
                ),
                (
                    "highlights",
                    models.JSONField(
                        blank=True,
                        help_text="Liste de points forts, ex: ['Livraison 24h', 'Support 24/7'].",
                        null=True,
                    ),
                ),
                (
                    "affiliate_program",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="products",
                        to="ecommerce.affiliateprogram",
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="products",
                        to="content.category",
                    ),
                ),
                (
                    "tags",
                    models.ManyToManyField(blank=True, related_name="products", to="content.tag"),
                ),
            ],
            options={
                "verbose_name": "Produit",
                "verbose_name_plural": "Produits",
                "ordering": ["display_priority", "-created_at"],
            },
        ),
        migrations.CreateModel(
            name="Deal",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=180)),
                ("slug", models.SlugField(max_length=200, unique=True)),
                ("description", models.TextField(blank=True)),
                ("call_to_action", models.CharField(blank=True, max_length=160)),
                ("coupon_code", models.CharField(blank=True, max_length=80)),
                (
                    "discount_percentage",
                    models.DecimalField(
                        blank=True,
                        decimal_places=2,
                        max_digits=5,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(Decimal("0.00")),
                            django.core.validators.MaxValueValidator(Decimal("100.00")),
                        ],
                    ),
                ),
                ("start_date", models.DateTimeField(default=django.utils.timezone.now)),
                ("end_date", models.DateTimeField(blank=True, null=True)),
                ("is_active", models.BooleanField(default=True)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="deals",
                        to="ecommerce.product",
                    ),
                ),
            ],
            options={
                "verbose_name": "Offre / Deal",
                "verbose_name_plural": "Offres / Deals",
                "ordering": ["-start_date"],
            },
        ),
        migrations.AddIndex(
            model_name="product",
            index=models.Index(fields=["slug"], name="ecommerce_p_slug_4cc199_idx"),
        ),
        migrations.AddIndex(
            model_name="product",
            index=models.Index(
                fields=["is_featured", "is_trending"], name="ecommerce_p_is_feat_ffa22d_idx"
            ),
        ),
    ]

