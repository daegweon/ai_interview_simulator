# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from project.forms import SignUpForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from project.models import Users
from django.http import HttpResponse
from django.template import RequestContext
from django.contrib import messages

# Create your views here.


def main(request):
    if request.method == "POST" and request.POST.get("login") == "로그인":

        form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            login(request, user)
            print('로그인 되었습니다')
            return redirect('/../')
        else:
            messages.error(request, '아이디 혹은 비밀번호가 잘못되었습니다.', extra_tags='loginError')
            return render(request,'project/index.html',{'loginForm' : form})
    elif request.method == "POST" and request.POST.get("register") == "가입하기":
        form = SignUpForm(request.POST)
        print(form)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.profile.lastName = request.POST['lastName']
            user.profile.firstName = request.POST['firstName']
            if request.POST['gender'] == '남자' :
                user.profile.gender = True
            else :
                user.profile.gender = False
            user.profile.birthDate = request.POST['birthDate']
            user.save()
            username = request.POST['username']
            raw_password = request.POST['password1']
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/../')
        messages.error(request, '회원가입에 실패하였습니다. 입력 정보를 확인하세요.', extra_tags='registerError')
        return render(request, 'project/index.html',{'registerForm': form})
    return render(request,'project/index.html',{})

def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.profile.groupId = form.cleaned_data.get('groupId')
            user.profile.firstName = form.cleaned_data.get('firstName')
            user.profile.lastName = form.cleaned_data.get('lastName')
            user.profile.gender = form.cleaned_data.get('gender')
            user.profile.birthDate = form.cleaned_data.get('birthDate')
            user.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/../')
        return redirect('/../join/')
    else:
        form = SignUpForm()
        return render(request, 'project/adduser.html', {'form': form})


def signin(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect('/../')
        else:
            return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = LoginForm()
        return render(request, 'project/login.html', {'form': form})

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
    return render(request,'project/record.html',{})      
