# -*- coding: utf-8 -*-
from django.shortcuts import render
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
    if request.user.is_authenticated():
        return render(request,'project/interview/trainingOnAir.html',{})
    else: 
        return render(request,'project/index.html',{'isLogin':0})

def getTrainingResultPage(request):
    if request.user.is_authenticated():
        return render(request,'project/main.html',{})
    else: 
        return render(request,'project/index.html',{'isLogin':0})