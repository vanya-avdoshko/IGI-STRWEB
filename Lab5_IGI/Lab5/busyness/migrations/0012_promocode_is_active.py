# Generated by Django 3.2.25 on 2024-05-30 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0011_auto_20240531_0120'),
    ]

    operations = [
        migrations.AddField(
            model_name='promocode',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
