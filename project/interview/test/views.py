# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import Http404
from project.interview.models import Interview, Question, InterviewCount, tendencyResult
import json
from random import randint
from project.interview.processing import exportWord
# Create your views here.


def testInterviewHwCheck(request):
    return render(request, 'project/interview/testCam.html', {})

def testInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{})   

def testInterviewOnAir(request):
    count  = Question.objects.all().count()
    ques_id=[]
    ques_text=[]
    interview_count = InterviewCount.objects.values_list('interview_count',flat=True).get(user_id = request.user)
    print(interview_count)
    while(len(ques_id)<5):
        random_idx = randint(0,count-1)    
        random_question_id = Question.objects.values_list('id', flat=True).all()[random_idx]
        if random_question_id not in ques_id:
            ques_id.append(random_question_id)
            random_question_text = Question.objects.values_list('question', flat=True).all()[random_idx]
            ques_text.append(random_question_text)

    return render(request,'project/interview/onAir.html',{'ques_id': ques_id, 'ques_text' : ques_text, 'interview_count':interview_count+1})

def getTestResultPage(request, ic):
    if not request.user.is_authenticated():
        return render(request,'project/index.html',{'isLogin':0})
    else:    
        text = ""
        noun_count = 3
        questionList = []
        personality = ""
        emotionResult = Interview.objects.values('emotion').filter(user_id = request.user,interview_count=ic)
        speechResult = Interview.objects.values('speech').filter(user_id = request.user,interview_count=ic)
        personalityResult = tendencyResult.objects.values('tendency').filter(user_id = request.user,interview_count=ic)
        for speech in speechResult:
            text += speech['speech']
            text += " "

        for tendency in personalityResult:
            temp = tendency['tendency']
            temp = temp.replace("'", "\"")
            temp = temp.replace("F", "f")
            temp = temp.replace("T", "t")
            personality = temp

        words = exportWord.get_tags(text, noun_count)
        return render(request,'project/interview/interviewResult.html',{'emotionResult':emotionResult, 'words':words,'username':request.user,'personality': personality})

    