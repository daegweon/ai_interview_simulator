from django.shortcuts import render
import webfacekeras
import frame_analyze
from django.http import StreamingHttpResponse
# Create your views here.

def main(request):
    return render(request,'project/main.html',{})

def signup(request):
    return render(request,'project/main.html',{})

def signin(request):
    return render(request,'project/main.html',{})

def getInterviewPage(request):
    frame_analyze.main()
    return render(request,'project/testCameraAudio.html',{})

def trainingInterview(request):
    webfacekeras.main()
    return render(request,'project/main.html',{}) 

def testInterview(request):
    return render(request,'project/main.html',{})   

def getTrainingResultPage(request):
    return render(request,'project/main.html',{})  

def getTestResultPage(request):
    return render(request,'project/main.html',{})  

def getRecordPage(request):
    return render(request,'project/main.html',{})      
