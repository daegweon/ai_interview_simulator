# -*- coding: utf-8 -*-
from django.shortcuts import render
from project.interview.models import Question, InterviewCount, InterviewTips
from random import randint
# Create your views here.

def trainingInterviewHwCheck(request):
    if request.user.is_authenticated():
        return render(request, 'project/interview/hwcheckOnTraining.html', {})
    else: 
        return render(request,'project/index.html',{'isLogin':0})
    
def trainingInterviewPriorInfo(request):
    if request.user.is_authenticated():
        return render(request,'project/priorInfo.html',{}) 
    else: 
        return render(request,'project/index.html',{'isLogin':0})

def trainingInterviewOnAir(request):
    if not request.user.is_authenticated():
        return render(request,'project/index.html',{'isLogin':0})
    else:    
        count = Question.objects.all().count()
        ques_id=[]      #question ID
        ques_text=[]    #question Text
        tip = []        #Interview Tip

        #Random Interview Question Set
        interview_count = InterviewCount.objects.values_list('interview_count',flat=True).get(user_id = request.user)
        while(len(ques_id)<5):
            random_idx = randint(0,count-1)    
            random_question_id = Question.objects.values_list('id', flat=True).all()[random_idx]
            if random_question_id not in ques_id:
                ques_id.append(random_question_id)
                random_question_text = Question.objects.values_list('question', flat=True).all()[random_idx]
                ques_text.append(random_question_text)
        
        #Random Interview Tip Set
        count = InterviewTips.objects.all().count()
        while(len(tip)<5):
            random_idx = randint(1, count)   
            random_tip = InterviewTips.objects.values_list('content',flat=True).get(pk = random_idx)
            if random_tip not in tip:
                tip.append(random_tip)

        return render(request,'project/interview/trainingOnAir.html',{'ques_id': ques_id, 'ques_text' : ques_text, 'interview_count':interview_count+1,'tip':tip})
        
class ban:
    global banwordlist
    global banwordcount
    global banemotionlist
    global banemotioncount

def getTrainingResultPage(request):
    if request.method =="POST":
        if request.user.is_authenticated():
            ban.banwordlist = request.POST.getlist('banwordlist')
            ban.banwordcount = request.POST.getlist('banwordcount')
            ban.banemotionlist = request.POST.getlist('banemotionlist')
            ban.banemotioncount = request.POST.getlist('banemotioncount')
            return render(request,'project/interview/trainingResult.html',{'banwordlist':ban.banwordlist,'banwordcount':ban.banwordcount,'banemotionlist':ban.banemotionlist,'banemotioncount':ban.banemotioncount})
        else: 
            return render(request,'project/index.html',{'isLogin':0})     
    else:
        return render(request,'project/interview/trainingResult.html',{'banwordlist':ban.banwordlist,'banwordcount':ban.banwordcount,'banemotionlist':ban.banemotionlist,'banemotioncount':ban.banemotioncount})