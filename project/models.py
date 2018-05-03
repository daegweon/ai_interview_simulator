from django.db import models

# Create your models here.

class User(models.Model):
    groupId = models.IntegerField()
    userId = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=10)
    gender  = models.BooleanField()
    birthDate = models.DateField()
    email = models.CharField(max_length=100)
    loginDate = models.DateField()

class Interview(models.Model):
    emotion = models.CharField(max_length=150)
    speech = models.CharField(max_length=1000)
    tendency = models.CharField(max_length=150)
    interviewDate = models.DateField()

class Question(models.Model):
    question = models.CharField(max_length=100)
    questionType = models.CharField(max_length=10)