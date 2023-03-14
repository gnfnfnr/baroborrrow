# Generated by Django 3.2 on 2023-03-14 05:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('BBApp', '0007_remove_product_localcity_remove_product_localgu_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deposit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('canceled_at', models.DateTimeField()),
                ('approved_cancel_amount_tax_free', models.IntegerField()),
                ('approved_cancel_amount_total', models.IntegerField()),
                ('approved_cancel_amount_vat', models.IntegerField()),
                ('cancel_available_amount_tax_free', models.IntegerField()),
                ('cancel_available_amount_total', models.IntegerField()),
                ('cancel_available_amount_vat', models.IntegerField()),
            ],
        ),
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
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cid', models.CharField(max_length=512)),
                ('total_amount', models.IntegerField()),
                ('var_amount', models.IntegerField()),
                ('tax_free_amount', models.IntegerField()),
                ('tid', models.CharField(max_length=512)),
                ('aid', models.CharField(max_length=512)),
                ('created_at', models.DateTimeField()),
                ('approved_at', models.DateTimeField()),
                ('barrow_product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='BBApp.barrowproduct')),
                ('deposit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='BBApp.deposit')),
            ],
        ),
        migrations.CreateModel(
            name='CustomerService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField()),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myInquiry', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]