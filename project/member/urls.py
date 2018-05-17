from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    url(r'^member/signin/?$',views.signin,name='signin'),
    url(r'^member/signup/?$',views.signup,name='signup'),
    url(r'^member/logout/?$',auth_views.logout, {'next_page' : '/'}),
]