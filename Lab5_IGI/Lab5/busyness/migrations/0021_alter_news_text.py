# Generated by Django 3.2.25 on 2024-10-05 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0020_auto_20241005_1725'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='text',
            field=models.TextField(max_length=12500),
        ),
    ]
