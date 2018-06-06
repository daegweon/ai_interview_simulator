# -*- coding: utf-8 -*-
##################################
# 1. 파일명: views.py
# 2. 저자 : Human Learning
# 3. 목적 : 홈페이지에서 '지금 시작하기'버튼을 눌러 메인메뉴로 접속할 때 html을 보여주는 기능
# 4. 참조 : 없음
# 5. 제한(restriction) : 사용자는 로그인 상태여야 한다.
##################################
from django.shortcuts import render
from project.interview.models import InterviewTips
import pymysql
from random import randint
# Create your views here.

def getInterviewPage(request):
    if request.user.is_authenticated():
        connection = pymysql.connect(host='localhost', user='root', password='humanroot',db='humandb',charset='utf8')
        count  = InterviewTips.objects.all().count()
        random_idx = randint(1,count)
        cursor = connection.cursor()
        sql = "select content from project_interviewtips where id=" + str(random_idx) +";"
        cursor.execute(sql)
        content = cursor.fetchone()[0]
        cursor.close()
        
        return render(request, 'project/interview/mainMenu.html', {'content':content})
    else: 
        return render(request,'project/index.html',{'isLogin':0}) 