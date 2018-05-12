from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^member/signin/$',views.signin,name='signin'),
    url(r'^member/signup/$',views.signup,name='signup'),
]