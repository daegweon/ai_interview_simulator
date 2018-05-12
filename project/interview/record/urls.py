from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/record/?$', views.getRecordPage, name='interviewRecord'),
]