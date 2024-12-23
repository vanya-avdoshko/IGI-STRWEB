# Generated by Django 3.2.25 on 2024-09-08 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0018_news_first_part'),
    ]

    operations = [
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('logo', models.ImageField(default='images/no.jpeg', upload_to='logo/')),
                ('website', models.URLField(blank=True, null=True)),
            ],
        ),
    ]
