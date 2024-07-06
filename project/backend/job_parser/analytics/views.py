from django.http import JsonResponse
import requests

def vacancy_stats(request):
    response = requests.get('https://api.hh.ru/vacancies')
    vacancies_data = response.json()

    total_vacancies = vacancies_data['found']

    return JsonResponse({
        'total_vacancies': total_vacancies,
        # 'total_candidates': 0  # Пример значения, замените реальным
    })
