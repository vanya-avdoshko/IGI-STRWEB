# Generated by Django 3.2.25 on 2024-09-06 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0017_alter_company_logo'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='first_part',
            field=models.TextField(default=1, max_length=50),
            preserve_default=False,
        ),
    ]