import http.client, urllib.request, urllib.parse, urllib.error, base64
import asyncio
import aiohttp
import json
import os, sys
import shutil
import re
from django.contrib.auth.models import User
from project.interview.models import Question,Interview
from random import randint
'''
class Global(object):
    reqCnt = 0
'''

emotionList=[]

EmotionScore = {'anger': 0.0, 'contempt': 0.0, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.0,
            'sadness': 0.0, 'surprise': 0.0}
EmotionCount = {'anger': 0, 'contempt': 0, 'disgust': 0, 'fear': 0, 'happiness': 0, 'neutral': 0, 'sadness': 0,
            'surprise': 0}

url = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect' # Request URL

headers = {
    # Request headers
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': '764334d735844da0830ace92252fe842',
}

params = urllib.parse.urlencode({
    # Request parameters
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion',
})

def initEmotionData():
    #Global.reqCnt = 0
    EmotionScore = {'anger': 0.0, 'contempt': 0.0, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.0,
            'sadness': 0.0, 'surprise': 0.0}
    EmotionCount = {'anger': 0, 'contempt': 0, 'disgust': 0, 'fear': 0, 'happiness': 0, 'neutral': 0, 'sadness': 0,
            'surprise': 0}
    directory = os.listdir('./frames')
'''
def setEmotionValue(EmotionScore,em_data):
    for key, value in em_data.items():
        EmotionScore[key] += value
    EmotionCount[max(em_data, key=em_data.get)] += 1

def Calc_AverageValue(EmotionScore,reqCnt):
    for key, value in EmotionScore.items():
        EmotionScore[key] = value / Global.reqCnt
    Global.reqCnt = 0 #initailze api request cnt
'''
async def analyze(filename,inter_id):
    tempList=[]
    body=""
    try:
        with open('./frames/' + filename, 'rb') as img:
            regex = re.compile(r'\d+')
            body = img.read()

        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=body, headers=headers, params=params) as resp:
                res = await resp.json()
                #setEmotionValue(EmotionScore, res[0]["faceAttributes"]["emotion"])
                print(str(res[0]["faceAttributes"]["emotion"]))
                tempList.append(res[0]["faceAttributes"]["emotion"]["anger"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["contempt"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["disgust"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["fear"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["happiness"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["neutral"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["sadness"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["surprise"])
                emotionList.insert(int(regex.findall(filename)[0])-1,tempList)
                print(emotionList)  
                interview_emotion = Interview.objects.get(pk=inter_id[0])
                interview_emotion.emotion = emotionList
                interview_emotion.save()      
                #Global.reqCnt += 1

    except Exception as e:
        print('error: '+str(e))
#calc_average_value(EmotionScore,reqCnt)
#print(max(EmotionCount, key=EmotionCount.get) + " is max count")

def ReqAnalyze(inter_id):
    initEmotionData()
    directory = os.listdir('./frames')
    tasks = [analyze(file,inter_id) for file in directory]
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(asyncio.wait(tasks))

    #TODO DB에 어떤식으로 값을 저장할 것인지
    #print(EmotionCount,EmotionScore,Global.reqCnt)
    initEmotionData()
    shutil.rmtree('./frames')