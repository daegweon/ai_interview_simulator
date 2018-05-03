from django.contrib import admin
from .models import User
from .models import Interview
from .models import Question

# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    list_per_page = 5
    list_display = (
        'id', 'question', 'questionType', 
    )
    #list_editable = ('questionType', )
    list_filter = ('questionType', )
    search_fields = ('question', )
    odering = ('id', 'question', )
    #fields = ('question', 'questionType', )
    fieldsets = [
        ('질문 유형', {'fields': ['questionType']}),
        ('질문 내용', {'fields': ['question']}),
    ]

admin.site.register(User)
admin.site.register(Interview)
admin.site.register(Question, QuestionAdmin)
