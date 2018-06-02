# -*- coding: utf-8 -*-
from django.shortcuts import render
# Create your views here.

def getInterviewPage(request):
    if request.user.is_authenticated():
        return render(request, 'project/interview/mainMenu.html', {})
    else: 
        return render(request,'project/index.html',{'isLogin':0}) 