# Generated by Django 4.1 on 2022-10-27 04:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BBApp', '0002_reviewresult_review'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q1',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q2',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q3',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q4',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q5',
            field=models.FloatField(),
        ),
    ]
