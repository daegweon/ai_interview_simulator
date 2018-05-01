from django.shortcuts import render, redirect
from .forms import UserForm
from django.contrib.auth.models import User
from django.contrib.auth import login

# Create your views here.

def main(request):
    return render(request,'project/main.html',{})

def signup(request):
	if request.method == "POST":
		form = UserForm(request.POST)
		if form.is_valid():
			new_user = User.objects.create_user(**form.cleaned_data)
			login(request, new_user)
			return redirect('index')
	else:
		form = UserForm()
		return render(request, 'project/adduser.html', {'form': form})