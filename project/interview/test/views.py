# -*- coding: utf-8 -*-
from django.shortcuts import render
from project.interview.models import Interview
import json
# Create your views here.

def testInterviewHwCheck(request):
    return render(request, 'project/interview/testCam.html', {})

def testInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{})   

def testInterviewOnAir(request):
    return render(request,'project/mictest.html',{})

def getTestResultPage(request):
    emotionResult = Interview.objects.values('emotion').all() #몇회차 면접인지 정보가 추가적으로 들어가야함.
    return render(request,'project/interview/interviewResult.html',{'emotionResult':emotionResult})