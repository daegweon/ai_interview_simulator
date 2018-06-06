##################################
# 1. 파일명: personality.py
# 2. 저자 : Human Learning
# 3. 목적 : 사용자의 답변 내용으로부터 성향 분석 요청
# 4. 참조 : IBM Personality Insights API
# 5. 제한(restriction) : subscription key 필요, watson module 필요
##################################

from watson_developer_cloud import PersonalityInsightsV3
from os import path
import json

def personality_insights(text):
  key = ""
  with open("personalityKey.txt", 'r') as f:
    key = f.readline().strip()  #파일로 부터 Key를 얻어옴

  #API와 Connection 설정
  personality_insights = PersonalityInsightsV3(
    version='2017-10-13',
    username='7c4ae7c8-3137-4469-aa4d-0a653e4c30a5',
    password= key)

  #성향 분석 요청
  profile = personality_insights.profile(
    text, content_type='text/plain;charset=cp949',
    content_language='ko', accept_language='ko',
    raw_scores=True, consumption_preferences=True)

  return profile