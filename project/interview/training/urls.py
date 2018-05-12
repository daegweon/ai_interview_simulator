from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/training/hw-check/$',views.trainingInterviewHwCheck,name='trainingHwCheck'),
    url(r'^interviews/training/prior-info/$',views.trainingInterviewPriorInfo,name='trainingPriorInfo'),
    url(r'^interviews/training/on-air/$',views.trainingInterviewOnAir,name='trainingOnAir'),
    url(r'^interviews/training/result/$',views.getTrainingResultPage,name='trainingResult'),
]