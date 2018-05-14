# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect
import os
from threading import Thread
from . import face_analyze
import sys
import json
from google.cloud import storage
import subprocess
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):
    video_stream = request.FILES['file'].read()
    with open('testvideo.webm', 'wb') as f_vid:
        f_vid.write(video_stream)

    os.system('ffmpeg -i testvideo.webm -vf fps=1/3 img%03d.jpg')    
    os.system('ffmpeg -y -i testvideo.webm -sample_rate 16000 -vn testaudio.flac') #옵션 설명 : y : 같은 이름 overwrite , -vn : 음성에 비디오를 포함하지 않겠다. 음성을 포함할 경우 변환시간 오래걸림
    #face_analyze.analyze()
    speechID = speechProcessing('testaudio.flac','testupload.flac') # 해당 음성 파일에 대한 분석 call의 고유 번호. 이 번호를 기억해야 결과를 가져올 수 있음.
    return HttpResponse('good')

def speechProcessing(src_filename, dst_filename):

    storage_client = storage.Client.from_service_account_json('key.json')   #key.json 이라는 service-account-key 파일이 있어야함.
    bucket = storage_client.get_bucket('capdi_test')
    blob = bucket.blob(dst_filename)

    blob.upload_from_filename(src_filename)

    print('File {} uploaded to {}.'.format(
        src_filename,
        dst_filename))

    # Speech to text 요청
    result = json.loads(subprocess.check_output("gcloud ml speech recognize-long-running gs://capdi_test/testupload.flac --language-code=ko-KR --encoding=flac --sample-rates=16000 --async", shell=True))

    #분석이 끝날 때까지 대기하게 되므로 중간에 process 중간에 실행하게 될 경우 시간이 소요될 수 있음. 분석이 끝났는지 확인하기 위해서는 gcloud ml speech operations describe 활용
    result2 = json.loads(subprocess.check_output("gcloud ml speech operations wait %s"%result['name'],shell=True))
    for x in range(0,len(result2['results'])):
        print(result2['results'][x]['alternatives'][0]['transcript'])

    return result['name']