# Generated by Django 5.1.1 on 2025-01-25 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='esppayload',
            name='fuelstation',
            field=models.CharField(default=4),
            preserve_default=False,
        ),
    ]
