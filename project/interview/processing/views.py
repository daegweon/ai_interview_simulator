# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect
import os
from . import face_analyze
from django.contrib.auth.models import User
from project.interview.models import Question,Interview,InterviewCount
from datetime import datetime
from random import randint
from . import speechToText
from . import personality
import sys

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

    #print(request.user) #AnonymousUser 로그인안하면 이렇게 출력된다.
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    questionId = request.POST["questionId"]
    interviewObj = InterviewCount.objects.get(user_id=user_id)
    if request.POST["trigger"]=="1":
        interviewObj.interview_count += 1 
        interviewObj.save()
    
    Interview.objects.create(user_id=user_id,question_id=questionId,emotion='',speech='',tendency='',interview_count=interviewObj.interview_count,interview_date = datetime.now(), interview_type = '1')
    interview_id = Interview.objects.values_list('id', flat=True).get(question_id=questionId,interview_count = interviewObj.interview_count)
    face_analyze.ReqAnalyze(interview_id)
    #speechResult = speechToText.speechProcessing('testaudio.flac','testupload.flac')
    #personality.personality_insights(speechResult)
    
    return HttpResponse('good')

