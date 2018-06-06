##################################
# 1. 파일명: urls.py
# 2. 저자 : Human Learning
# 3. 목적 : interviews/test/ 의 경로로 접속했을 때 실행할 함수를 지정한다.
# 4. 참조 : 없음
# 5. 제한(restriction) : 없음
##################################

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/test/hw-check/?$',views.testInterviewHwCheck,name='testHwcheck'),
    url(r'^interviews/test/on-air/?$',views.testInterviewOnAir,name='testOnAir'),
    url(r'^interviews/test/result/(?P<ic>\d+)/$',views.getTestResultPage,name='testResult')
]