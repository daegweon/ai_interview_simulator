from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/video-Processing/?$',views.videoProcessing,name='videoProcessing'),
]