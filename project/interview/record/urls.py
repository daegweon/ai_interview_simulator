##################################
# 1. 파일명: urls.py
# 2. 저자 : Human Learning
# 3. 목적 : URL link
##################################

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/record/?$', views.getRecordPage, name='interviewRecord'),
]