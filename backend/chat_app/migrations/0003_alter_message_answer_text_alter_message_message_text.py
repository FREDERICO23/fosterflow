# Generated by Django 4.2.1 on 2023-07-06 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='answer_text',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='message_text',
            field=models.TextField(),
        ),
    ]
