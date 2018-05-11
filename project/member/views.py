# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from project.member.forms import SignUpForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
# Create your views here.

@require_http_methods("POST")
def signin(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username = username, password = password)
    if user is not None:
        login(request, user)
        return redirect('/../')
    else:
        return HttpResponse('loginerror')

@require_http_methods("POST")
def signup(request):
    form = SignUpForm(request.POST)
    if form.is_valid() and request.POST['password']==request.POST['passwordConfirm']:
        new_user = User.objects.create_user(**form.cleaned_data)
        login(request, new_user)
        return redirect('/')
    else :
        return HttpResponse('registerError')