# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Question(models.Model):
    question = models.CharField(max_length=100) 

class Interview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    emotion = models.CharField(max_length=500)
    speech = models.CharField(max_length=2000)
    tendency = models.CharField(max_length=500)
    interview_date = models.DateField()
    interview_type = models.CharField(default=None,max_length=10)


