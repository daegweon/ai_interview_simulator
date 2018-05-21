# -*- coding: utf-8 -*-
from django.shortcuts import render
from project.interview.models import Interview, Question,InterviewCount
import json
from random import randint
# Create your views here.

def testInterviewHwCheck(request):
    return render(request, 'project/interview/testCam.html', {})

def testInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{})   

def testInterviewOnAir(request):
    count  = Question.objects.all().count()
    ques_id=[]
    ques_text=[]

    while(len(ques_id)<5):
        random_idx = randint(0,count-1)    
        random_question_id = Question.objects.values_list('id', flat=True).all()[random_idx]
        if random_question_id not in ques_id:
            ques_id.append(random_question_id)
            random_question_text = Question.objects.values_list('question', flat=True).all()[random_idx]
            ques_text.append(random_question_text)

    print(ques_id)
    return render(request,'project/interview/onAir.html',{'ques_id': ques_id, 'ques_text' : ques_text})

def getTestResultPage(request):
    interview_count = InterviewCount.objects.values_list('interview_count',flat=True).filter(user_id = request.user) 
    emotionResult = Interview.objects.values('emotion').filter(user_id = request.user,interview_count=11)
    rowcount = emotionResult.count()
    return render(request,'project/interview/interviewResult.html',{'emotionResult':emotionResult,'rowcount':rowcount})