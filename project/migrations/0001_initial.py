# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-04-30 08:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Interview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emotion', models.CharField(max_length=150)),
                ('speech', models.CharField(max_length=1000)),
                ('tendency', models.CharField(max_length=150)),
                ('interview_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=100)),
                ('question_type', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('groupid', models.IntegerField()),
                ('userid', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('fname', models.CharField(max_length=20)),
                ('lname', models.CharField(max_length=10)),
                ('gender', models.BooleanField()),
                ('bdate', models.DateField()),
                ('email', models.CharField(max_length=100)),
                ('ldate', models.DateField()),
            ],
        ),
    ]
