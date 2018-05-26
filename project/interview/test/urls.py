from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/test/hw-check/?$',views.testInterviewHwCheck,name='testHwcheck'),
    url(r'^interviews/test/prior-info/?$',views.testInterviewPriorInfo,name='testPriorInfo'),
    url(r'^interviews/test/on-air/?$',views.testInterviewOnAir,name='testOnAir'),
    url(r'^interviews/test/result/(?P<ic>\d+)/$',views.getTestResultPage,name='testResult')
]