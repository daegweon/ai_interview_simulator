from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

'''class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']'''

class SignUpForm(UserCreationForm):
    groupid = forms.IntegerField()
    fname = forms.CharField(max_length=20)
    lname = forms.CharField(max_length=10)
    gender = forms.BooleanField()
    #bdate = forms.DateField(help_text='Required. Format: YYYY-MM-DD')

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'groupid', 'fname', 'lname', 'gender']