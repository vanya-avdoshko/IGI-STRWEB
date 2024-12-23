# Generated by Django 3.2.25 on 2024-05-27 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('busyness', '0004_alter_employee_position'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='supplier',
        ),
        migrations.AddField(
            model_name='product',
            name='supplier',
            field=models.ManyToManyField(related_name='products', to='busyness.Supplier'),
        ),
    ]