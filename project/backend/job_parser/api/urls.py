from .views import get_vacancies
from django.urls import path

urlpatterns = [
    path('vacancies/', get_vacancies, name='get_vacancies'),
]
