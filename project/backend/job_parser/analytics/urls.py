from django.urls import path
from . import views

urlpatterns = [
    path('vacancy-stats/', views.vacancy_stats, name='vacancy-stats'),
]
