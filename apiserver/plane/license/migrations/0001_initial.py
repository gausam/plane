# Generated by Django 4.2.5 on 2023-11-08 06:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Instance',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created At')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Last Modified At')),
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('instance_id', models.CharField(max_length=25, unique=True)),
                ('license_key', models.CharField(max_length=256)),
                ('api_key', models.CharField(max_length=16)),
                ('version', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=256)),
                ('last_checked_at', models.DateTimeField()),
                ('is_telemetry_enabled', models.BooleanField(default=True)),
                ('is_support_required', models.BooleanField(default=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created_by', to=settings.AUTH_USER_MODEL, verbose_name='Created By')),
                ('updated_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated_by', to=settings.AUTH_USER_MODEL, verbose_name='Last Modified By')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='instance_owner', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Instance',
                'verbose_name_plural': 'Instances',
                'db_table': 'instances',
                'ordering': ('-created_at',),
            },
        ),
    ]
