# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import *

# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    list_per_page = 5
    list_display = (
        'id', 'question',
    )
    #list_filter = ('question_type', )
    search_fields = ('question', )
    odering = ('id', 'question', )
    fieldsets = [
        ('질문 내용', {'fields': ['question']}),
    ]

admin.site.register(Interview)
admin.site.register(Question, QuestionAdmin)
admin.site.register(InterviewCount)