# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class Question(models.Model):
    question = models.CharField(max_length=100)
    question_type = models.CharField(max_length=10) 

class Interview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    emotion = models.CharField(max_length=500)
    speech = models.CharField(max_length=2000)
    tendency = models.CharField(max_length=500)
    interview_date = models.DateField()
    #TODO speech 타입 수정, 외래 키 추가 , 질문 별로 답변 저장 , 크기 조정 , 질문 ID 
    #답변 내용 테이블 -> 유저 아이디, 답변 내용, 질문 아이디, 답변 시간


