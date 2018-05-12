# -*- coding: utf-8 -*-
from django.shortcuts import render
# Create your views here.

def getInterviewPage(request):
    return render(request, 'project/interview/mainpagetest.html', {})