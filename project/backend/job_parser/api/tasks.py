import threading
import time
from .hh_parser import parse_vacancies

def periodic_update(interval=3600):
    while True:
        print("Запуск парсинга вакансий...")
        parse_vacancies()
        print("Парсинг завершен.")
        time.sleep(interval)

def start_background_task():
    thread = threading.Thread(target=periodic_update, daemon=True)
    thread.start()