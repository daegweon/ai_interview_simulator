from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$',views.main,name='main'),
    url(r'^register/$',views.signup,name='register'),
    url(r'^login/$',views.signin,name='login'),
    url(r'^interview/$',views.getInterviewPage,name='interview'),
    url(r'^interview/training/$',views.trainingInterview,name='training'),
    url(r'^interview/test/$',views.testInterview,name='test'),
    url(r'^interview/training/result/$',views.getTrainingResultPage,name='trainingResult'),
    url(r'^interview/test/result/$',views.getTestResultPage,name='testResult'),
    url(r'^interview-record/$',views.getRecordPage,name='interviewRecord'),
]