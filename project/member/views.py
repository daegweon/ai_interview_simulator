# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from project.member.forms import SignUpForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import HttpResponse
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