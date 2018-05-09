# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import Interview
from .models import Question
from django.contrib.auth.models import User

# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    list_per_page = 5
    list_display = (
        'id', 'question', 'question_type',
    )
    #list_editable = ('questionType', )
    list_filter = ('question_type', )
    search_fields = ('question', )
    odering = ('id', 'question', )
    #fields = ('question', 'questionType', )
    fieldsets = [
        ('질문 유형', {'fields': ['question_type']}),
        ('질문 내용', {'fields': ['question']}),
    ]

admin.site.register(Interview)
admin.site.register(Question, QuestionAdmin)
