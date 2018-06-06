# -*- coding: utf-8 -*-

##################################
# 1. 파일명: views.py
# 2. 저자 : Human Learning
# 3. 목적 : 사용자의 질문당 답변 데이터를 DB에 저장
# 4. 제한(restriction) : subscription key 필요 및 POST 요청만 처리
##################################

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

#답변 끝날 시 DB저장을 요청받는 함수
def Processing(request):
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    questionId = request.POST["questionId"]
    questionText = request.POST["questionText"]
    interviewObj = InterviewCount.objects.get(user_id=user_id)

    #면접을 시작 했을 시 Interview 횟수 하나 증가
    if request.POST["questionCount"]=="1":
        interviewObj.interview_count += 1 
        interviewObj.save()
    
    emotionList = request.POST["emotionList"]
    headposeList = request.POST["headposeList"]
    transcription = request.POST["transcription"]
    Interview.objects.create(user_id=user_id,question_id=questionId,emotion=emotionList,speech=transcription,interview_count=interviewObj.interview_count,interview_date = datetime.now(), interview_type = '1', question_text=questionText, headpose = headposeList)

    #모든 질문이 마무리 되었을 때 모든 답변 내용을 총합하여 성향 분석 요청, 실패시 빈값이 return
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

#Key를 return하는 함수
def returnKey(request):
    key = ""
    with open("faceKey.txt", 'r') as f:
        key = f.readline().strip()
    return JsonResponse({'subKey' : key}, json_dumps_params = {'ensure_ascii': True})

#Interview 도중 페이지를 나갔을 때 무효처리 하는 함수
def cancelInterview(request):
    interview_count = request.POST['interview_count']
    user_id = User.objects.values_list('id', flat=True).get(username=request.user)
    Interview.objects.filter(user_id=user_id, interview_count=interview_count).delete()
    interviewObj = InterviewCount.objects.get(user_id=user_id)
    interviewObj.interview_count = interviewObj.interview_count-1
    interviewObj.save()
    return HttpResponse('cancel')