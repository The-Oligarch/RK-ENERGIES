# Generated by Django 5.1.1 on 2025-01-25 09:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_esppayload_fuelstation'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=100)),
                ('station', models.CharField(max_length=100)),
            ],
        ),
    ]