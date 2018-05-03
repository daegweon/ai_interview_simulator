from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class LoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password'] # 로그인 시에는 유저이름과 비밀번호만 입력 받는다.

class SignUpForm(UserCreationForm):
    groupid = forms.IntegerField()
    fname = forms.CharField(max_length=20)
    lname = forms.CharField(max_length=10)
    gender = forms.BooleanField()
    #bdate = forms.DateField(help_text='Required. Format: YYYY-MM-DD')

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'groupid', 'fname', 'lname', 'gender']