from django.core.management.base import BaseCommand
from api.models import Vacancy
from api.documents import VacancyDocument

class Command(BaseCommand):
    help = 'Index existing vacancies into Elasticsearch'

    def handle(self, *args, **kwargs):
        for vacancy in Vacancy.objects.all():
            obj = VacancyDocument(
                # meta={'id': vacancy.vacancy_id},
                vacancy_id=vacancy.vacancy_id,
                vacancy_title=vacancy.vacancy_title,
                vacancy_url=vacancy.vacancy_url,
                company_name=vacancy.company_name,
                location=vacancy.location,
                requirement=vacancy.requirement,
                responsibility=vacancy.responsibility,
                experience=vacancy.experience,
                salary=vacancy.salary,
                address=vacancy.address
            )
            obj.save()
        self.stdout.write(self.style.SUCCESS('Successfully indexed all vacancies'))
