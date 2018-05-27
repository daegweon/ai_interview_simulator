# -*- coding: utf-8 -*-
from django.shortcuts import render
# Create your views here.

def trainingInterviewHwCheck(request):
    return render(request, 'project/interview/testCam.html', {})
    
def trainingInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{}) 

def trainingInterviewOnAir(request):
    return render(request,'project/interview/trainingOnAir.html',{})

def getTrainingResultPage(request):
    return render(request,'project/main.html',{})