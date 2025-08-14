import requests
import json
from typing import Any

appid = '4014c1843b7df74566aa5c7ccd9ca63b'
lat = 10.750
lon = 106.667
exclude = 'minutely,alerts'
unit = 'metric'
lang = 'vi'

url = "https://api.openweathermap.org/data/2.5/weather"
params: dict[str, Any] = {
    'lat': lat,
    'lon': lon,
    'exclude': exclude,
    'appid': appid,
    'units': unit,
    'lang': lang
}
response = requests.get(url, params=params)
if response.status_code != 200:
    raise Exception(f'Request failed with status code {response.text}')
data = response.json()

