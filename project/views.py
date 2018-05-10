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
    return render(request,'project/mictest.html',{}) 
    
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
    #cursor = connection.cursor()
    #sql = "insert into project_interview(emotion,speech,tendency,interview_date) values('a','b','c','2018/01/01');"
    #cursor.execute(sql)
    #rows = cursor.fetchall()
    #print(rows)
    #sql = "select * from project_interview;"
    #cursor.execute(sql)
    #rows = cursor.fetchall()
    #print(rows)
    #cursor.close()
    return render(request,'project/record.html',{'record':rows})      

def testRecord(request):
    return render(request,'project/mictest.html',{})

def testsave(request):
    if request.method == "POST":
        f = open("testvideo.webm", 'wb')
        f.write(request.FILES['file'].read())
        f.close()
        return HttpResponse('good')
        #return redirect('/')
