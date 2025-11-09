from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Author",
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
                ("name", models.CharField(max_length=120)),
                ("slug", models.SlugField(max_length=140, unique=True)),
                ("title", models.CharField(blank=True, max_length=160)),
                ("bio", models.TextField(blank=True)),
                ("avatar_url", models.URLField(blank=True)),
                ("website", models.URLField(blank=True)),
                ("twitter", models.URLField(blank=True)),
                ("linkedin", models.URLField(blank=True)),
            ],
            options={
                "verbose_name": "Auteur",
                "verbose_name_plural": "Auteurs",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Category",
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
                ("name", models.CharField(max_length=120, unique=True)),
                ("slug", models.SlugField(max_length=140, unique=True)),
                ("description", models.TextField(blank=True)),
                (
                    "icon",
                    models.CharField(
                        blank=True,
                        help_text="Nom d'icône ou classe CSS optionnelle.",
                        max_length=120,
                    ),
                ),
            ],
            options={
                "verbose_name": "Catégorie",
                "verbose_name_plural": "Catégories",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Tag",
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
                ("name", models.CharField(max_length=80, unique=True)),
                ("slug", models.SlugField(max_length=120, unique=True)),
            ],
            options={
                "verbose_name": "Tag",
                "verbose_name_plural": "Tags",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Article",
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
                ("title", models.CharField(max_length=220)),
                ("slug", models.SlugField(max_length=240, unique=True)),
                ("excerpt", models.TextField(blank=True)),
                ("body", models.TextField()),
                ("hero_image_url", models.URLField(blank=True)),
                ("thumbnail_url", models.URLField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("draft", "Brouillon"),
                            ("scheduled", "Planifié"),
                            ("published", "Publié"),
                        ],
                        default="draft",
                        max_length=12,
                    ),
                ),
                (
                    "published_at",
                    models.DateTimeField(default=django.utils.timezone.now),
                ),
                (
                    "reading_time",
                    models.PositiveIntegerField(
                        default=5, help_text="Temps de lecture estimé en minutes."
                    ),
                ),
                ("is_featured", models.BooleanField(default=False)),
                ("seo_title", models.CharField(blank=True, max_length=240)),
                ("seo_description", models.CharField(blank=True, max_length=320)),
                ("seo_keywords", models.CharField(blank=True, max_length=320)),
                ("structured_data", models.JSONField(blank=True, null=True)),
                (
                    "author",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="articles",
                        to="content.author",
                    ),
                ),
                (
                    "category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="articles",
                        to="content.category",
                    ),
                ),
            ],
            options={
                "verbose_name": "Article",
                "verbose_name_plural": "Articles",
                "ordering": ["-published_at"],
            },
        ),
        migrations.AddField(
            model_name="article",
            name="tags",
            field=models.ManyToManyField(blank=True, related_name="articles", to="content.tag"),
        ),
        migrations.AddIndex(
            model_name="article",
            index=models.Index(fields=["slug"], name="content_art_slug_3bde99_idx"),
        ),
        migrations.AddIndex(
            model_name="article",
            index=models.Index(
                fields=["status", "published_at"], name="content_art_status_7a16ef_idx"
            ),
        ),
    ]
# Generated by Django 5.0.14 on 2025-11-09 16:08

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=120)),
                ('slug', models.SlugField(max_length=140, unique=True)),
                ('title', models.CharField(blank=True, max_length=160)),
                ('bio', models.TextField(blank=True)),
                ('avatar_url', models.URLField(blank=True)),
                ('website', models.URLField(blank=True)),
                ('twitter', models.URLField(blank=True)),
                ('linkedin', models.URLField(blank=True)),
            ],
            options={
                'verbose_name': 'Auteur',
                'verbose_name_plural': 'Auteurs',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=120, unique=True)),
                ('slug', models.SlugField(max_length=140, unique=True)),
                ('description', models.TextField(blank=True)),
                ('icon', models.CharField(blank=True, help_text="Nom d'icône ou classe CSS optionnelle.", max_length=120)),
            ],
            options={
                'verbose_name': 'Catégorie',
                'verbose_name_plural': 'Catégories',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=80, unique=True)),
                ('slug', models.SlugField(max_length=120, unique=True)),
            ],
            options={
                'verbose_name': 'Tag',
                'verbose_name_plural': 'Tags',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=220)),
                ('slug', models.SlugField(max_length=240, unique=True)),
                ('excerpt', models.TextField(blank=True)),
                ('body', models.TextField()),
                ('hero_image_url', models.URLField(blank=True)),
                ('thumbnail_url', models.URLField(blank=True)),
                ('status', models.CharField(choices=[('draft', 'Brouillon'), ('scheduled', 'Planifié'), ('published', 'Publié')], default='draft', max_length=12)),
                ('published_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('reading_time', models.PositiveIntegerField(default=5, help_text='Temps de lecture estimé en minutes.')),
                ('is_featured', models.BooleanField(default=False)),
                ('seo_title', models.CharField(blank=True, max_length=240)),
                ('seo_description', models.CharField(blank=True, max_length=320)),
                ('seo_keywords', models.CharField(blank=True, max_length=320)),
                ('structured_data', models.JSONField(blank=True, help_text='JSON-LD personnalisé (facultatif).', null=True)),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to='content.author')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='articles', to='content.category')),
                ('tags', models.ManyToManyField(blank=True, related_name='articles', to='content.tag')),
            ],
            options={
                'verbose_name': 'Article',
                'verbose_name_plural': 'Articles',
                'ordering': ['-published_at'],
                'indexes': [models.Index(fields=['slug'], name='content_art_slug_d82f31_idx'), models.Index(fields=['status', 'published_at'], name='content_art_status_4645e7_idx')],
            },
        ),
    ]
