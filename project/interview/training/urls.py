##################################
# 1. 파일명: urls.py
# 2. 저자 : Human Learning
# 3. 목적 : interviews/training/ 의 경로로 접속했을 때 실행할 함수를 지정한다.
# 4. 참조 : 없음
# 5. 제한(restriction) : 없음
##################################

from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^interviews/training/hw-check/$',views.trainingInterviewHwCheck,name='trainingHwCheck'),
    url(r'^interviews/training/on-air/$',views.trainingInterviewOnAir,name='trainingOnAir'),
    url(r'^interviews/training/result/$',views.getTrainingResultPage,name='trainingResult'),
]