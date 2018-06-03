# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from project.interview.models import Question,Interview,InterviewCount,tendencyResult
from datetime import datetime
from . import personality
import time
import json
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):

    print(request.POST)
    
    #print(request.user) #AnonymousUser 로그인안하면 이렇게 출력된다.
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    questionId = request.POST["questionId"]
    questionText = request.POST["questionText"]
    interviewObj = InterviewCount.objects.get(user_id=user_id)
    if request.POST["questionCount"]=="1":
        interviewObj.interview_count += 1 
        interviewObj.save()
    emotionList = request.POST["emotionList"]
    headposeList = request.POST["headposeList"]
    transcription = request.POST["transcription"]
    Interview.objects.create(user_id=user_id,question_id=questionId,emotion=emotionList,speech=transcription,interview_count=interviewObj.interview_count,interview_date = datetime.now(), interview_type = '1', question_text=questionText, headpose = headposeList)

    if request.POST["questionCount"]=="5":
        allSpeech = ""
        speechResult = Interview.objects.values('speech').filter(user_id = request.user, interview_count=interviewObj.interview_count)
        for speech in speechResult:
            allSpeech += speech['speech'] + " "
        try:
            tendency = personality.personality_insights(allSpeech)
            tendencyResult.objects.create(interview_count=interviewObj.interview_count, user_id=user_id, tendency=tendency)
        finally:
            print("성향 분석 단어 부족 error")
            return HttpResponse('good')
    return HttpResponse('good')

def returnKey(request):
    key = ""
    with open("faceKey.txt", 'r') as f:
        key = f.readline().strip()
    return JsonResponse({'subKey' : key}, json_dumps_params = {'ensure_ascii': True})