from watson_developer_cloud import PersonalityInsightsV3
from os import path
import json

def personality_insights(text):

  personality_insights = PersonalityInsightsV3(
    version='2017-10-13',
    username='7c4ae7c8-3137-4469-aa4d-0a653e4c30a5',
    password='DQU7N6LJaGVh')

  #with open(path.join(path.dirname(__file__), './test.txt')) as profile_txt: (텍스트를 파일로 읽을때 사용. 아래쪽의 text 자리에 profile_text.read()로 대체하면 됨)
  profile = personality_insights.profile(
    text, content_type='text/plain;charset=cp949',
    content_language='ko',
    raw_scores=True, consumption_preferences=True)

  '''f = open("result.json", "w")
  f.write(json.dumps(profile, ident=2))
  f.close()'''

  return profile