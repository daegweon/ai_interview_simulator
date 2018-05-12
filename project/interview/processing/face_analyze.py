import http.client, urllib.request, urllib.parse, urllib.error, base64
import json
import os, sys

def main():
    num = 0
    EmotionScore = {'anger': 0.0, 'contempt': 0.0, 'disgust': 0.0, 'fear': 0.0, 'happiness': 0.0, 'neutral': 0.0,
                'sadness': 0.0, 'surprise': 0.0}
    EmotionCount = {'anger': 0, 'contempt': 0, 'disgust': 0, 'fear': 0, 'happiness': 0, 'neutral': 0, 'sadness': 0,
                'surprise': 0}
    analyze(EmotionScore,EmotionCount)

def setEmotionValue(EmotionCount,em_data):
    for key, value in em_data.items():
        EmotionCount[key] += value
    EmotionCount[max(em_data, key=em_data.get)] += 1

def Calc_AverageValue(EmotionScore,num):
    for key, value in EmotionScore.items():
        EmotionScore[key] = value / num

def analyze():
    body=""
    filename='img003'+'.jpg'
    with open(filename, 'rb') as img:
        body = img.read()

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

    try:
        conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
        conn.request("POST", "/face/v1.0/detect?%s" % params,body,headers)
        response = conn.getresponse()
        data = response.read()
        m = json.loads(data)
        em_data = m[0]["faceAttributes"]["emotion"]
        #set_emotion_value(EmotionCount,em_data)
        print(em_data)
        conn.close()
    except Exception as e:
        print('error: '+str(e))
#calc_average_value(EmotionScore,num)
#print(max(EmotionCount, key=EmotionCount.get) + " is max count")