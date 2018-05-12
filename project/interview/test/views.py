# -*- coding: utf-8 -*-
from django.shortcuts import render
# Create your views here.

def testInterviewHwCheck(request):
    return render(request, 'project/interview/testCam.html', {})

def testInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{})   

def testInterviewOnAir(request):
    return render(request,'project/main.html',{})

def getTestResultPage(request):
    return render(request,'project/main.html',{})