import http.client, urllib.request, urllib.parse, urllib.error, base64
import asyncio
import aiohttp
import json
import os, sys

num = 0
EmotionScore = {'anger': 0.0, 'contempt': 0.0, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.0,
            'sadness': 0.0, 'surprise': 0.0}
EmotionCount = {'anger': 0, 'contempt': 0, 'disgust': 0, 'fear': 0, 'happiness': 0, 'neutral': 0, 'sadness': 0,
            'surprise': 0}

url = 'westcentralus.api.cognitive.microsoft.com'

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

def setEmotionValue(EmotionCount,em_data):
    for key, value in em_data.items():
        EmotionCount[key] += value
    EmotionCount[max(em_data, key=em_data.get)] += 1

def Calc_AverageValue(EmotionScore,num):
    for key, value in EmotionScore.items():
        EmotionScore[key] = value / num

async def analyze():
    body=""
    filename='img003'+'.jpg'
    with open(filename, 'rb') as img:
        body = img.read()

    print("is here?")

    async with aiohttp.ClientSession() as session:
        async with session.post("westcentralus.api.cognitive.microsoft.com/face/v1.0/detect", data=body, headers=headers, params=params) as resp:
            print(resp)
            text = await resp.json()
            print("res text: " + text)

    #try:
    #    conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
    #    conn.request("POST", "/face/v1.0/detect?%s" % params,body,headers)
    #    response = conn.getresponse()
    #    data = response.read()
    #    m = json.loads(data)
    #    em_data = m[0]["faceAttributes"]["emotion"]
    #    #set_emotion_value(EmotionCount,em_data)
    #    print(em_data)
    #    conn.close()
    #except Exception as e:
    #    print('error: '+str(e))
#calc_average_value(EmotionScore,num)
#print(max(EmotionCount, key=EmotionCount.get) + " is max count")

def callAsync():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(asyncio.wait([analyze()]))