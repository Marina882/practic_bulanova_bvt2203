FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y gcc libpq-dev netcat-openbsd

COPY requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

COPY . /app

WORKDIR /app

ENV DJANGO_SETTINGS_MODULE=job_parser.settings

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]












