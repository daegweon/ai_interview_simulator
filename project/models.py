from django.db import models

# Create your models here.

class User(models.Model):
    groupid = models.IntegerField()
    userid = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    fname = models.CharField(max_length=20)
    lname = models.CharField(max_length=10)
    gender  = models.BooleanField()
    bdate = models.DateField()
    email = models.CharField(max_length=100)
    ldate = models.DateField()

class Interview(models.Model):
    emotion = models.CharField(max_length=150)
    speech = models.CharField(max_length=1000)
    tendency = models.CharField(max_length=150)
    interview_date = models.DateField()

class Question(models.Model):
    question = models.CharField(max_length=100)
    question_type = models.CharField(max_length=10)