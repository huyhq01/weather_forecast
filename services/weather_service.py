import requests
from typing import Any


def get_info(city_name: str) -> dict[str, Any]:
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params: dict[str, Any] = {"name": city_name, 'count': 1}
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        if 'results' not in data or not data['results']:
            raise Exception("City not found")
        name = data['results'][0]["name"]
        lat = data['results'][0]["latitude"]
        lon = data['results'][0]["longitude"]
        return {'lat': lat, 'lon': lon, 'name': name}
    except requests.exceptions.RequestException as e:
        raise Exception(f"Connection error: {e}")
    except (KeyError, IndexError):
        # if there is no "results" key or results is empty
        raise Exception("Invalid API response format")
    except Exception as e:
        raise e


def get_weather(lat: float, lon: float) -> dict[str, Any]:
    url = "https://api.open-meteo.com/v1/forecast"
    params: dict[str, Any] = {
        "latitude": lat,
        "longitude": lon,
        "hourly": (",").join(
            [
                "temperature_2m",
                "cloudcover",
                "weathercode",
            ]
        ),
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data


# print(get_coordinates("Ho Chi Minh City"))
# print(get_weather(coordinate[0], coordinate[1]))
