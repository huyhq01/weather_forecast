import requests
import os
from dotenv import load_dotenv

def get_coordinates(city_name: str) -> tuple[float, float]:
    
    load_dotenv()  # đọc file .env

    APPID = os.getenv("APPID")
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={APPID}"
    response = requests.get(url)
    data = response.json()
    lat = data[0]['lat']
    lon = data[0]['lon']
    return (lat, lon)

print(get_coordinates('Ho Chi Minh City'))