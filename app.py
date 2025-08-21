from flask import Flask, render_template, request, make_response, redirect
import services.weather_service as weather_service
from datetime import datetime


app = Flask(__name__)


@app.route('/')  # Display weather forecast chart
def index():
    return render_template('index.html')


@app.route("/search")
def set_city():
    # todo: what if city not exists in real weather data?
    city: str = request.args.get("city") or 'Ho Chi Minh City'
    resp = make_response(redirect("/"))
    resp.set_cookie("city", city)
    return resp


@app.route("/api/weather")
def get_weather():
    # if city name not exists in cookies, use default value
    city = request.cookies.get("city", "Ho Chi Minh City")
    coordinate = weather_service.get_coordinates(city)
    data = weather_service.get_weather(coordinate[0], coordinate[1])
    # seperate data into different variables
    labels: list[str] = []
    for item in data["hourly"]["time"][:]:
        hours = datetime.fromisoformat(item).strftime("%H")
        labels.append(hours)
    temps: list[str] = data["hourly"]["temperature_2m"][:]
    cloud: list[str] = data["hourly"]["cloudcover"][:]
    description: list[str] = data["hourly"]["weathercode"][:]
    return {'labels': labels,
            'temps': temps,
            'cloud': cloud,
            'description': description}
