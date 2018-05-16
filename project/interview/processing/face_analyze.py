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

async def analyze(filename,interview_id):
    tempList=[]
    body=""
    try:
        with open('./frames/' + filename, 'rb') as img:
            regex = re.compile(r'\d+')
            body = img.read()

        async with aiohttp.ClientSession() as session:
            async with session.post(url, data=body, headers=headers, params=params) as resp:
                res = await resp.json()
                tempList.append(res[0]["faceAttributes"]["emotion"]["anger"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["contempt"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["disgust"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["fear"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["happiness"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["neutral"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["sadness"])
                tempList.append(res[0]["faceAttributes"]["emotion"]["surprise"])
                emotionList.insert(int(regex.findall(filename)[0])-1,tempList)  
                interview_emotion = Interview.objects.get(pk=interview_id)
                interview_emotion.emotion = emotionList
                interview_emotion.save()      

    except Exception as e:
        print('error: '+str(e))

def ReqAnalyze(interview_id):
    initEmotionData()
    directory = os.listdir('./frames')
    tasks = [analyze(file,interview_id) for file in directory]
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(asyncio.wait(tasks))

    #TODO DB에 어떤식으로 값을 저장할 것인지
    #print(EmotionCount,EmotionScore,Global.reqCnt)
    initEmotionData()
    shutil.rmtree('./frames')