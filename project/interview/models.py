# -*- coding: utf-8 -*-
##################################
# 1. 파일명: models.py
# 2. 저자 : Human Learning
# 3. 목적 : Database에 저장될 테이블과 속성들을 설정해준다.
# 4. 참조 : 없음
# 5. 제한(restriction) : 없음
##################################

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Question(models.Model):
    question = models.CharField(max_length=100) 

class Interview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    emotion = models.TextField()
    speech = models.TextField()
    interview_count = models.IntegerField(default=0)
    interview_date = models.DateField()
    interview_type = models.CharField(default=None,max_length=10)
    question_text = models.TextField()
    headpose = models.TextField()

class InterviewCount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interview_count = models.IntegerField(default=0)    

class tendencyResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    interview_count = models.IntegerField(default=0)
    tendency = models.TextField()

class InterviewTips(models.Model):
    content = models.TextField()

