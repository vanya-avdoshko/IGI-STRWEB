# Generated by Django 3.2.25 on 2024-09-06 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0016_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='logo',
            field=models.ImageField(default='images/no.jpeg', upload_to='logo/'),
        ),
    ]
