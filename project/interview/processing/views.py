# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect
import os
from . import face_analyze
from django.contrib.auth.models import User
from project.interview.models import Question,Interview
from datetime import datetime
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):
    video_stream = request.FILES['file'].read()
    with open('testvideo.webm', 'wb') as f_vid:
        f_vid.write(video_stream)

    if not os.path.isdir('./frames'):
        os.mkdir('./frames')
       
    os.system('ffmpeg -i testvideo.webm -vf fps=1/3 ./frames/img%d.jpg')    
    os.system('ffmpeg -y -i testvideo.webm -vn testaudio.flac') #옵션 설명 : y : 같은 이름 overwrite , -vn : 음성에 비디오를 포함하지 않겠다. 음성을 포함할 경우 변환시간 오래걸림
    face_analyze.ReqAnalyze()

    print(request.user) #AnonymousUser 로그인안하면 이렇게 출력된다.
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    question_id = Question.objects.values_list('id', flat=True).get(pk=5)
    Interview.objects.create(user_id=user_id, question_id=question_id, emotion='3', speech='4', tendency='5', interview_count = interview_count+1, interview_date=datetime.now(), interview_type='1')

    return HttpResponse('good')