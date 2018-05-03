from django.shortcuts import render, redirect
from project.forms import SignUpForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from project.models import Users


# Create your views here.

def main(request):
    return render(request, 'project/main.html', {})


def signup(request):
    if request.method == "POST":
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()
            user.profile.groupid = form.cleaned_data.get('groupid')
            user.profile.fname = form.cleaned_data.get('fname')
            user.profile.lname = form.cleaned_data.get('lname')
            user.profile.gender = form.cleaned_data.get('gender')
            #user.profile.bdate = form.cleaned_data.get('bdate')
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