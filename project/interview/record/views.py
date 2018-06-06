# -*- coding: utf-8 -*-
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
        interviewTypeList=[]
        interviewCountList=[]
        count=0
        userID = User.objects.values_list('id',flat=True).get(username=request.user)
        cursor = connection.cursor()
        sql = "select * from project_interview where user_id=%s group by interview_count;"
        cursor.execute(sql,(userID))
        rows = cursor.fetchall()
        for row in rows:
            count=count+1 #row갯수 카운트
            recordList.append(row)
        for i in range(count):
            interviewCountList.append(recordList[i][3])
            dateList.append(str(recordList[i][4])) #5번째 element가 date
            interviewTypeList.append(recordList[i][5])
        cursor.close()
        return render(request, 'project/record/index.html', {'dateList':dateList, 'interviewTypeList':interviewTypeList,'interviewCountList':interviewCountList,'count':count,'username':request.user})   