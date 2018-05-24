# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
# Create your views here.

def getInterviewPage(request):
    if request.user.is_authenticated():
        return render(request, 'project/interview/mainMenu.html', {'isLogin':1})
    else: 
        return render(request, 'project/index.html',{'isLogin':0})    