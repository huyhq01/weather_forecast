from flask import Flask, render_template, request, jsonify
import services.weather_service as weather_service
from datetime import datetime


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/api/weather", methods=['GET', 'POST'])  # Get weather data
def get_weather():
    # handle request search city name
    try:
        data_request = request.get_json()
        city_name = request.cookies.get("city", "Ho Chi Minh City")
        if data_request and data_request is not None:
            city_name = data_request.get("city", '')
        city = weather_service.get_info(city_name)
        lat, lon, city_name = city["lat"], city["lon"], city["name"]
        weather_data = weather_service.get_weather(lat, lon)
        # SLICE DATA
        labels: list[str] = []
        days: list[str] = []
        # only use hours from time data
        for item in weather_data["hourly"]["time"][:]:
            hour = datetime.fromisoformat(item).strftime("%H")
            labels.append(hour)
        # days for render buttons
        for index in range(0, 7*24, 24):
            day = datetime.fromisoformat(
                    weather_data["hourly"]["time"][index]).strftime("%Y-%m-%d")
            days.append(day)
        temps: list[str] = weather_data["hourly"]["temperature_2m"][:]
        cloud: list[str] = weather_data["hourly"]["cloudcover"][:]
        description: list[str] = weather_data["hourly"]["weathercode"][:]
        return jsonify({'days': days,
                        'labels': labels,
                        'temps': temps,
                        'cloud': cloud,
                        'description': description,
                        'city_name': city_name})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
