from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/video-processing/?$',views.videoProcessing,name='videoProcessing'),
]