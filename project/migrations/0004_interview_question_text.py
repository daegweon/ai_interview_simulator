# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-05-28 13:45
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20180524_2355'),
    ]

    operations = [
        migrations.AddField(
            model_name='interview',
            name='question_text',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]