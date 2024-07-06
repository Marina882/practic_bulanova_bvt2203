from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Vacancy

@registry.register_document
class VacancyDocument(Document):
    class Index:
        name = 'vacancies'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Vacancy
        fields = [
            'vacancy_id',
            'vacancy_title',
            'vacancy_url',
            'company_name',
            'location',
            'requirement',
            'responsibility',
            'experience',
            'salary',
            'address',
            'salary_numeric'
        ]
