from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name ='profile')
    groupid = models.IntegerField(default=5, blank=True)
    fname = models.CharField(max_length=20, default='a', blank=True)
    lname = models.CharField(max_length=10, default='d', blank=True)
    gender = models.NullBooleanField(default=True)
    #bdate = models.DateField(default=None, blank=True)
    ldate = models.DateField(auto_now=True, blank=True)

@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Users.objects.create(user=instance)
    instance.profile.save()

class Interview(models.Model):
    emotion = models.CharField(max_length=150)
    speech = models.CharField(max_length=1000)
    tendency = models.CharField(max_length=150)
    interview_date = models.DateField()


class Question(models.Model):
    question = models.CharField(max_length=100)
    question_type = models.CharField(max_length=10)
