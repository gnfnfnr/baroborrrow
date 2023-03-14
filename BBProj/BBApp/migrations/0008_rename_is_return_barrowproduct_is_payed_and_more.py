# Generated by Django 4.1 on 2022-12-21 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BBApp', '0007_remove_product_localcity_remove_product_localgu_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='barrowproduct',
            old_name='is_return',
            new_name='is_payed',
        ),
        migrations.AddField(
            model_name='barrowproduct',
            name='is_accepted',
            field=models.BooleanField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='barrowproduct',
            name='is_return_owner',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='barrowproduct',
            name='is_return_user',
            field=models.BooleanField(default=False),
        ),
    ]