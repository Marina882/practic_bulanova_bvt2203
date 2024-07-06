from rest_framework.decorators import api_view
from django.http import JsonResponse
from elasticsearch_dsl import Q
from .documents import VacancyDocument
from .models import Vacancy
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_vacancies(request):
    query = request.GET.get('query', '')
    min_salary = request.GET.get('min_salary', 0)
    experience = request.GET.get('experience', '')

    filters = []
    if query:
        filters.append(
            Q(
                'multi_match',
                query=query,
                fields=[
                    'vacancy_id', 'vacancy_title', 'company_name', 'location', 
                    'requirement', 'responsibility', 'experience', 'salary', 'address'
                ],
            )
        )
    
    if min_salary:
        try:
            min_salary_value = int(min_salary)
            filters.append(Q('range', salary_numeric={'gte': min_salary_value}))
        except ValueError:
            min_salary_value = 0
            filters.append(Q('range', salary_numeric={'gte': min_salary_value}))
    
    if experience == 'С опытом':
        filters.append(~Q('match', experience='Нет опыта'))
    elif experience == 'Без опыта':
        filters.append(Q('match', experience='Нет опыта'))

    if filters:
        q = Q('bool', must=filters)
    else:
        q = Q('match_all')

    search = VacancyDocument.search().query(q)[0:100]
    response = search.execute()

    results = [hit.to_dict() for hit in response.hits]
    return JsonResponse(results, safe=False)

# @api_view(['GET'])
# def get_vacancies(request):
#     query = request.GET.get('query', '')
#     if query:
#         q = Q(
#             'multi_match',
#             query=query,
#             fields=[
#                 'vacancy_id', 'vacancy_title', 'company_name', 'location', 
#                 'requirement', 'responsibility', 'experience', 'salary', 'address'
#             ],
#         )
#     else:
#         q = Q('match_all')

#     search = VacancyDocument.search().query(q)[0:100]
#     response = search.execute()

#     results = [hit.to_dict() for hit in response.hits]
#     return JsonResponse(results, safe=False)