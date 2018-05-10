# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from project.forms import SignUpForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from project.models import Interview
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext
from django.contrib import messages
import pymysql
# Create your views here.

connection = pymysql.connect(host='localhost', user='root', password='humanroot',db='humandb',charset='utf8')

def main(request):
    if request.method == "POST" and request.POST.get('mode')=="login":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect('/../')
        else:
            return HttpResponse('loginerror')  
    elif request.method == "POST" and request.POST.get('mode')=="register":
        form = SignUpForm(request.POST)

        if form.is_valid() and request.POST['password']==request.POST['passwordConfirm']:
            new_user = User.objects.create_user(**form.cleaned_data)
            login(request, new_user)
            return redirect('/')
        else :
            return HttpResponse('registerError')
    return render(request,'project/index.html',{})

def getInterviewPage(request):
    return render(request,'project/mainpagetest.html',{})

def trainingInterviewHwCheck(request):
    return render(request,'project/testCam.html',{}) 
    
def trainingInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{}) 

def trainingInterviewOnAir(request):
    return render(request,'project/main.html',{}) 

def testInterviewHwCheck(request):
    return render(request,'project/testCam.html',{})   

def testInterviewPriorInfo(request):
    return render(request,'project/priorInfo.html',{})   

def testInterviewOnAir(request):
    return render(request,'project/main.html',{})   

def getTrainingResultPage(request):
    return render(request,'project/main.html',{})  

def getTestResultPage(request):
    return render(request,'project/main.html',{})  

def getRecordPage(request):
    recordList=[]
    dateList=[]
    count=0
    cursor = connection.cursor()
    sql = "select * from project_interview;"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for row in rows:
        count=count+1 #row갯수 카운트
        recordList.append(row) 
    for i in range(count):    
        dateList.append(str(recordList[i][4])) #4번째 element가 date  
    cursor.close()
    return render(request,'project/record.html',{'date':dateList})      