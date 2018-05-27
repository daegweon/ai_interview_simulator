# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from project.interview.models import Interview, Question, InterviewCount, tendencyResult
from random import randint
# Create your views here.

def getInterviewPage(request):
    if request.user.is_authenticated():
        return render(request, 'project/interview/mainMenu.html', {})
    else: 
        return render(request,'project/index.html',{'isLogin':0})

def traningInterviewOnAir(request):
    count  = Question.objects.all().count()
    ques_id=[]
    ques_text=[]
    interview_count = InterviewCount.objects.values_list('interview_count',flat=True).get(user_id = request.user)
    while(len(ques_id)<5):
        random_idx = randint(0,count-1)    
        random_question_id = Question.objects.values_list('id', flat=True).all()[random_idx]
        if random_question_id not in ques_id:
            ques_id.append(random_question_id)
            random_question_text = Question.objects.values_list('question', flat=True).all()[random_idx]
            ques_text.append(random_question_text)

    return render(request,'project/interview/trainingOnAir.html',{'ques_id': ques_id, 'ques_text' : ques_text, 'interview_count':interview_count+1})
   
