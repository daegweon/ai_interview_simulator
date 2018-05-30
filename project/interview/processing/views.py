# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from project.interview.models import Question,Interview,InterviewCount,tendencyResult
from datetime import datetime
from random import randint
from . import speechToText
from . import personality
from . import face_analyze
from multiprocessing import Process
import sys
import os
import time
import json
import subprocess
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):

    print(request.POST)

    video_filename = 'video%s.webm'%request.POST["questionCount"]
    audio_filename = 'audio%s.flac'%request.POST["questionCount"]
    upload_filename = 'uploadAudio%s.flac'%request.POST["questionCount"]
    frame_dirname = './frames' + request.POST["questionCount"] + '/'

    video_stream = request.FILES['file'].read()
    with open(video_filename, 'wb') as f_vid:
        f_vid.write(video_stream)

    if not os.path.isdir(frame_dirname):
        os.mkdir(frame_dirname)
       
    os.system('ffmpeg -i '+ video_filename +' -vf fps=1/1 '+frame_dirname+'img%d.jpg')    
    #os.system('ffmpeg -i %s -vn -c:a flac -compression_level 8 %s'%(video_filename, audio_filename)) #옵션 설명 : y : 같은 이름 overwrite , -vn : 음성에 비디오를 포함하지 않겠다. 음성을 포함할 경우 변환시간 오래걸림

    #print(request.user) #AnonymousUser 로그인안하면 이렇게 출력된다.
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    questionId = request.POST["questionId"]
    questionText = request.POST["questionText"]
    interviewObj = InterviewCount.objects.get(user_id=user_id)
    if request.POST["questionCount"]=="0":
        interviewObj.interview_count += 1 
        interviewObj.save()
    
    Interview.objects.create(user_id=user_id,question_id=questionId,emotion='',speech='',interview_count=interviewObj.interview_count,interview_date = datetime.now(), interview_type = '1', question_text=questionText)
    interview_id = Interview.objects.values_list('id', flat=True).get(question_id=questionId,interview_count = interviewObj.interview_count)
    face_analyze.ReqAnalyze(interview_id, frame_dirname)

    #speechToText.speechProcessing(audio_filename, upload_filename) 
    '''p1 = Process(target=face,args=(interview_id,))
    p2 = Process(target=audio,args=(interview_id,audio_filename,upload_filename,))
    p1.start()
    p2.start()'''
    transcription = request.POST["transcription"]
    Interview.objects.filter(question_id=questionId, interview_count=interviewObj.interview_count, user_id=user_id).update(speech=transcription)
    '''
    allSpeech = ""
    if request.POST["questionCount"]=="4":
        try :
            f=open('temp.txt','r')
            index = 0
            questionIdToInsert = request.POST["questionList"].split(",")
            while index != 5 :
                speechId=str(f.readline().strip())
                if not speechId:
                    print("ERROR : There's no speechId in temp.txt!")
                    break #오류 처리 필요
                speechResult = json.loads(subprocess.check_output("gcloud ml speech operations wait %s"%speechId,shell=True))
                transcription = speechToText.speechParsing(speechResult)
                allSpeech += transcription + " "
                Interview.objects.filter(question_id=questionIdToInsert[index], interview_count=interviewObj.interview_count, user_id=user_id).update(speech=transcription)
                index += 1
        finally :   #오류 처리 필요(except문)
            f.close()
            os.remove('temp.txt')
        tendency = personality.personality_insights(allSpeech)
        tendencyResult.objects.create(interview_count=interviewObj.interview_count, user_id=user_id, tendency=tendency)
    '''
    allSpeech = ""
    if request.POST["questionCount"]=="4":
        speechResult = Interview.objects.values('speech').filter(user_id = request.user, interview_count=interviewObj.interview_count)
        for speech in speechResult:
            allSpeech += speech['speech'] + " "
        tendency = personality.personality_insights(allSpeech)
        tendencyResult.objects.create(interview_count=interviewObj.interview_count, user_id=user_id, tendency=tendency)
    os.remove(video_filename)
    return HttpResponse('good')

def face(interview_id):
    print("{0} - 프로세스 ID: {1} (부모 프로세스 ID: {2})".format(interview_id, os.getpid(), os.getppid()))
    

def audio(interview_id,audio_filename,upload_filename):
    print("{0} - 프로세스 ID: {1} (부모 프로세스 ID: {2})".format(interview_id, os.getpid(), os.getppid())) 
    '''speechResult = speechToText.speechProcessing(audio_filename, upload_filename)
    tendency = personality.personality_insights(speechResult)  
    Interview.objects.filter(id=interview_id).update(speech=speechResult, tendency=tendency)   '''  
    speechToText.speechProcessing(audio_filename, upload_filename) 

def returnKey(request):
    key = ""
    with open("faceKey.txt", 'r') as f:
        key = f.readline().strip()
    return JsonResponse({'subKey' : key}, json_dumps_params = {'ensure_ascii': True})