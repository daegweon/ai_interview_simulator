# -*- coding: utf-8 -*-

##################################
# 1. 파일명: views.py
# 2. 저자 : Human Learning
# 3. 목적 : 사용자의 모의 면접 내역 페이지 요청
# 4. 제한(restriction) : pymysql 필요
##################################

from django.shortcuts import render
from django.contrib.auth.models import User
import pymysql
# Create your views here.

def getRecordPage(request):
    if not request.user.is_authenticated():
        return render(request,'project/index.html',{'isLogin':0})
    else:    
        connection = pymysql.connect(host='localhost', user='root', password='humanroot',db='humandb',charset='utf8')
        recordList=[]
        dateList=[]
        interviewCountList=[]
        count=0
        userID = User.objects.values_list('id',flat=True).get(username=request.user)
        cursor = connection.cursor()
        sql = "select * from project_interview where user_id=%s group by interview_count;" #대표로 1개의 row만
        cursor.execute(sql,(userID))
        rows = cursor.fetchall()
        for row in rows:
            count=count+1 #row갯수 카운트
            recordList.append(row)
        for i in range(count):
            interviewCountList.append(recordList[i][3]) #3번째 element interview count
            dateList.append(str(recordList[i][4]))  #4번째 element date
        cursor.close()
        return render(request, 'project/record/index.html', {'dateList':dateList, 'interviewCountList':interviewCountList,'count':count,'username':request.user})   