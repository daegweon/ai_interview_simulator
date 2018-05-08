from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$',views.main,name='main'),
    url(r'^login$', views.signin, name='login'),
    url(r'^register$',views.signup,name='register'),
    url(r'^interviews/?$',views.getInterviewPage,name='interview'),
    url(r'^interviews/training/hw-check$',views.trainingInterviewHwCheck,name='trainingHwCheck'),
    url(r'^interviews/training/prior-info$',views.trainingInterviewPriorInfo,name='trainingPriorInfo'),
    url(r'^interviews/training/on-air$',views.trainingInterviewOnAir,name='trainingOnAir'),
    url(r'^interviews/training/result$',views.getTrainingResultPage,name='trainingResult'),

    url(r'^interviews/test/hw-check$',views.testInterviewHwCheck,name='testHwcheck'),
    url(r'^interviews/test/prior-info$',views.testInterviewPriorInfo,name='testPriorInfo'),
    url(r'^interviews/test/on-air$',views.testInterviewOnAir,name='testOnAir'),
    url(r'^interviews/test/result$',views.getTestResultPage,name='testResult'),

    url(r'^interviews/record$',views.getRecordPage,name='interviewRecord'),
]