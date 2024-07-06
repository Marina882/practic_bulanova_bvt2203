import requests
from .models import Vacancy
from django.db import IntegrityError

def parse_vacancies():
    url = "https://api.hh.ru/vacancies"
    params = {"per_page": 100, "page": 0}

    while params["page"] < 2:
        response = requests.get(url, params=params)
        data = response.json()

        for item in data["items"]:
            vacancy_id = item["id"]

            if not Vacancy.objects.filter(vacancy_id=vacancy_id).exists():
                salary_info = item.get('salary')
                salary_from = None
                salary_to = None

                if salary_info:
                    salary_from = salary_info.get('from')
                    salary_to = salary_info.get('to')
                    salary = f"{salary_from} - {salary_to}" if salary_from and salary_to else (salary_from or salary_to or '')
                else:
                    salary = 'Зарплата не указана'

                try:
                    Vacancy.objects.get_or_create(
                        vacancy_id=vacancy_id,
                        defaults={
                            'vacancy_title': item["name"],
                            'vacancy_url': item["alternate_url"],
                            'company_name': item["employer"]["name"],
                            'location': item["area"]["name"],
                            'requirement': item.get("snippet", {}).get("requirement", ""),
                            'responsibility': item.get("snippet", {}).get("responsibility", ""),
                            'experience': item.get("experience", {}).get("name", ""),
                            'salary': salary,
                            'salary_numeric': salary_from if salary_from is not None else 0,
                            'address': "hh.ru",
                        }
                    )
                except IntegrityError as e:
                    print(f"Error inserting vacancy {vacancy_id}: {e}")
        
        params["page"] += 1
