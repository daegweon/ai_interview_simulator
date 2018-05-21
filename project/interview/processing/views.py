# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
from project.interview.models import Question,Interview,InterviewCount
from datetime import datetime
from random import randint
from . import speechToText
from . import personality
from . import face_analyze
from multiprocessing import Process
import sys
import os
import time
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):

    video_filename = 'testvideo.webm'
    audio_filename = 'testaudio.flac'
    upload_filename = 'testupload.flac'

    video_stream = request.FILES['file'].read()
    with open(video_filename, 'wb') as f_vid:
        f_vid.write(video_stream)

    if not os.path.isdir('./frames'):
        os.mkdir('./frames')
       
    os.system('ffmpeg -i '+ video_filename +' -vf fps=1/1 ./frames/img%d.jpg')    
    os.system('ffmpeg -y -i %s -vn %s'%(video_filename, audio_filename)) #옵션 설명 : y : 같은 이름 overwrite , -vn : 음성에 비디오를 포함하지 않겠다. 음성을 포함할 경우 변환시간 오래걸림

    #print(request.user) #AnonymousUser 로그인안하면 이렇게 출력된다.
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    questionId = request.POST["questionId"]
    interviewObj = InterviewCount.objects.get(user_id=user_id)
    if request.POST["trigger"]=="1":
        interviewObj.interview_count += 1 
        interviewObj.save()
    
    Interview.objects.create(user_id=user_id,question_id=questionId,emotion='',speech='',tendency='',interview_count=interviewObj.interview_count,interview_date = datetime.now(), interview_type = '1')
    interview_id = Interview.objects.values_list('id', flat=True).get(question_id=questionId,interview_count = interviewObj.interview_count)
    start_time = time.time()
    p1 = Process(target=face,args=(interview_id,))
    p2 = Process(target=audio,args=(interview_id,audio_filename,upload_filename,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()
    print("--- %s seconds ---" % (time.time() - start_time))
    #speechResult = speechToText.speechProcessing('testaudio.flac','testupload.flac')
    #personality.personality_insights(speechResult)
    return HttpResponse('good')

def face(interview_id):
    print("{0} - 프로세스 ID: {1} (부모 프로세스 ID: {2})".format(interview_id, os.getpid(), os.getppid()))
    face_analyze.ReqAnalyze(interview_id)

def audio(interview_id,audio_filename,upload_filename):
    print("{0} - 프로세스 ID: {1} (부모 프로세스 ID: {2})".format(interview_id, os.getpid(), os.getppid())) 
    speechResult = speechToText.speechProcessing(audio_filename, upload_filename)
    tendency = personality.personality_insights(speechResult)  
    Interview.objects.filter(id=interview_id).update(speech=speechResult, tendency=tendency)      