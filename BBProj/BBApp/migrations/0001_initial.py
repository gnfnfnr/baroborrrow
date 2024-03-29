# Generated by Django 4.1 on 2023-03-14 15:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BarrowProduct',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('barrow_start', models.DateField()),
                ('barrow_end', models.DateField()),
                ('is_return_user', models.BooleanField(default=False)),
                ('is_return_owner', models.BooleanField(default=False)),
                ('is_reviewed', models.BooleanField(default=False)),
                ('is_accepted', models.BooleanField(blank=True, default=None, null=True)),
                ('is_payed', models.BooleanField(default=False)),
            ],
        ),
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
        migrations.CreateModel(
            name='ReviewResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('av_q1', models.IntegerField()),
                ('av_q2', models.IntegerField()),
                ('av_q3', models.IntegerField()),
                ('av_q4', models.IntegerField()),
                ('av_q5', models.IntegerField()),
                ('review_count', models.IntegerField(default=0)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myreviewresult', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('q_1', models.IntegerField()),
                ('q_2', models.IntegerField()),
                ('q_3', models.IntegerField()),
                ('q_4', models.IntegerField()),
                ('q_5', models.IntegerField()),
                ('barrow_product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='productreview', to='BBApp.barrowproduct')),
                ('trader', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myreviews', to=settings.AUTH_USER_MODEL)),
                ('writer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mywritereviews', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=256)),
                ('list_price', models.IntegerField()),
                ('deposit', models.IntegerField()),
                ('rental_fee', models.IntegerField()),
                ('explanation', models.TextField()),
                ('condition', models.IntegerField()),
                ('address', models.TextField()),
                ('detail_address', models.TextField()),
                ('local_city', models.CharField(blank=True, max_length=64, null=True)),
                ('local_gu', models.CharField(blank=True, max_length=64, null=True)),
                ('product_photo', models.ImageField(blank=True, null=True, upload_to='product_photo')),
                ('barrow_available_start', models.DateField()),
                ('barrow_available_end', models.DateField()),
                ('barrow_method', models.CharField(max_length=256)),
                ('is_activate', models.BooleanField(default=True)),
                ('is_barrowed', models.BooleanField(default=False)),
                ('like_users', models.ManyToManyField(blank=True, related_name='like_products', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myproducts', to=settings.AUTH_USER_MODEL)),
            ],
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
        migrations.AddField(
            model_name='barrowproduct',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='barrowed', to='BBApp.product'),
        ),
        migrations.AddField(
            model_name='barrowproduct',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='myborrowproducts', to=settings.AUTH_USER_MODEL),
        ),
    ]
