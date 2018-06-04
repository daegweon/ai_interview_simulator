# -*- coding: utf-8 -*-
from django.shortcuts import render
from project.interview.models import InterviewTips
import pymysql
from random import randint
# Create your views here.

connection = pymysql.connect(host='localhost', user='root', password='humanroot',db='humandb',charset='utf8')

def getInterviewPage(request):
    if request.user.is_authenticated():
        count  = InterviewTips.objects.all().count()
        random_idx = randint(1,count)
        print(random_idx)
        cursor = connection.cursor()
        sql = "select content from project_interviewtips where id=" + str(random_idx) +";"
        cursor.execute(sql)
        content = cursor.fetchone()[0]
        cursor.close()
        
        return render(request, 'project/interview/mainMenu.html', {'content':content})
    else: 
        return render(request,'project/index.html',{'isLogin':0}) 