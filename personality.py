from watson_developer_cloud import PersonalityInsightsV3
from os import path
import json

personality_insights = PersonalityInsightsV3(
  version='2017-10-13',
  username='7c4ae7c8-3137-4469-aa4d-0a653e4c30a5',
  password='DQU7N6LJaGVh')

with open(path.join(path.dirname(__file__), './test.txt')) as profile_txt:
  profile = personality_insights.profile(
    profile_txt.read(), content_type='text/plain;charset=cp949',
    content_language='ko',
    raw_scores=True, consumption_preferences=True)

print(json.dumps(profile, indent=2))