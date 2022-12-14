# Generated by Django 4.1 on 2022-11-10 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BBApp', '0004_rename_q1_review_q_1_rename_q2_review_q_2_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviewresult',
            name='review_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q1',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q2',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q3',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q4',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='reviewresult',
            name='av_q5',
            field=models.IntegerField(),
        ),
    ]
