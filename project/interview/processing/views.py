# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse,HttpResponseRedirect
import os
from threading import Thread
from . import face_analyze
# Create your views here.

@require_http_methods("POST")

def videoProcessing(request):
    video_stream = request.FILES['file'].read()
    with open('testvideo.webm', 'wb') as f_vid:
        f_vid.write(video_stream)

    os.system('ffmpeg -i testvideo.webm -vf fps=1/3 img%03d.jpg')    
    os.system('ffmpeg -y -i testvideo.webm -vn testaudio.m4a') #옵션 설명 : y : 같은 이름 overwrite , -vn : 음성에 비디오를 포함하지 않겠다. 음성을 포함할 경우 변환시간 오래걸림
    #face_analyze.analyze()
    return HttpResponse('good')