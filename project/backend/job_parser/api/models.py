from django.db import models

class Vacancy(models.Model):
    vacancy_id = models.CharField(max_length=255, unique=True)
    vacancy_title = models.CharField(max_length=255, null=True)
    vacancy_url = models.CharField(max_length=255, null=True)
    company_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    requirement = models.TextField(blank=True, null=True)
    responsibility = models.TextField(blank=True, null=True)
    experience = models.CharField(max_length=255, blank=True, null=True)
    salary = models.CharField(max_length=255, blank=True, null=True)
    salary_numeric = models.IntegerField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.vacancy_title