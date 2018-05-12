from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/?$',views.getInterviewPage,name='interview'),
]