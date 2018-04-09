import cv2
import http.client, urllib.request, urllib.parse, urllib.error, base64
import numpy as np
import json
import time
import os, sys

num = 0

def analyze():   
    body=""
    for i in range(1,num+1):
        filename='capture'+str(i)+'.jpg'
        f = open(filename,'rb')
        body=f.read()
        f.close()

        headers = {
            # Request headers
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': '40b26079f7fe48c88e087a5c1a8c4443',
        }

        params = urllib.parse.urlencode({
            # Request parameters
            'returnFaceId': 'true',
            'returnFaceLandmarks': 'false',
            'returnFaceAttributes': 'emotion',
        })

        try:
            conn = http.client.HTTPSConnection('westcentralus.api.cognitive.microsoft.com')
            #conn.request("POST", "/face/v1.0/detect?%s" % params,"{'url': 'http://cdn3-www.musicfeeds.com.au/assets/uploads/c9f3c551044eb2e87403b6b7c05cfd9e-640x360.jpg'}",headers)
            conn.request("POST", "/face/v1.0/detect?%s" % params,body,headers)
            response = conn.getresponse()
            data = response.read()
            m = json.loads(data)
            em_data = m[0]["faceAttributes"]["emotion"]
            max_em_data=max(em_data,key=em_data.get)
            print(em_data)
            print(max_em_data)
            conn.close()
        except Exception as e:
            print("error")

# When everything done, release the capture

detector = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0)
start_time = time.time()

while(True):
    # Capture frame-by-frame
    execute_time = time.time()-start_time
    ret, frame = cap.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector.detectMultiScale(gray, 1.3, 5)

    # Draw a rectangle around the faces
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

    #cv2.putText(frame, emotion, (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    # Display the resulting frame
    cv2.imshow('frame',frame)
    if(execute_time>3):
        num=num+1
        cv2.imwrite('capture'+str(num)+'.jpg',frame)
        start_time = time.time()
    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows() 
        analyze()
        for i in range(1,num+1):
            os.remove('capture'+str(i)+'.jpg')
        print('All capture files are deleted')
        break

