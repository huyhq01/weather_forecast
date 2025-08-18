import requests
import os
from dotenv import load_dotenv
from typing import Any
from datetime import date, timedelta


def get_coordinates(city_name: str) -> tuple[float, float]:
    """Adds city name
    Args:
        city_name (str): city name from user input to get coordinates
    Returns:
        tuple[float, float]: the coordinates of city
    """
    load_dotenv()  # đọc file .env
    APPID = os.getenv("APPID")
    url = "http://api.openweathermap.org/geo/1.0/direct"
    # limit: only get the first result of cities found
    params: dict[str, Any] = {"q": city_name, "limit": 1, "appid": APPID}
    response = requests.get(url, params=params)
    data = response.json()
    if response.status_code != 200:
        raise Exception(f"Status: {data['cod']}. Message: {data['message']}")
    lat = data[0]["lat"]
    lon = data[0]["lon"]
    return (lat, lon)


def get_weather(lat: float, lon: float) -> dict[str, Any]:
    today = date.today()
    tomorrow = today + timedelta(days=1)
    url = "https://api.open-meteo.com/v1/forecast"
    params: dict[str, Any] = {
        "latitude": lat,
        "longitude": lon,
        "hourly": (",").join(
            [
                "temperature_2m",
                "cloudcover",
                "precipitation_probability",
                "weathercode",
            ]
        ),
        "start_date": today,
        "end_date": tomorrow,
        "lang": "vi",
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data


# coordinate = get_coordinates("Ho Chi Minh City")
# print(get_weather(coordinate[0], coordinate[1]))
