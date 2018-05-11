# -*- coding: utf-8 -*-
from django.shortcuts import render
import pymysql
# Create your views here.

connection = pymysql.connect(host='13.125.217.227', user='root', password='humanroot',db='humandb',charset='utf8')

def getRecordPage(request):
    recordList=[]
    dateList=[]
    count=0
    cursor = connection.cursor()
    sql = "select * from project_interview;"
    cursor.execute(sql)
    rows = cursor.fetchall()
    for row in rows:
        count=count+1 #row갯수 카운트
        recordList.append(row)
    for i in range(count):
        dateList.append(str(recordList[i][4])) #4번째 element가 date
    cursor.close()
    return render(request, 'project/record/index.html', {'date':dateList})