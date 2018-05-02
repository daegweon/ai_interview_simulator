from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$',views.main,name='main'),
    url(r'^register/$',views.signup,name='register'),
    url(r'^login/$',views.signin,name='login'),
    url(r'^interviews/$',views.getInterviewPage,name='interview'),
    url(r'^interviews/training/$',views.trainingInterview,name='training'),
    url(r'^interviews/test/$',views.testInterview,name='test'),
    url(r'^interviews/training/result/$',views.getTrainingResultPage,name='trainingResult'),
    url(r'^interviews/test/result/$',views.getTestResultPage,name='testResult'),
    url(r'^interview-record/$',views.getRecordPage,name='interviewRecord'),
]