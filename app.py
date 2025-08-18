from flask import Flask, render_template, request, make_response, redirect
import services.weather_service as weather_service


app = Flask(__name__)


@app.route('/')  # Display weather forecast chart
def index():
    # if city name not exists in cookies, use default value
    city = request.cookies.get("city", "Ho Chi Minh City")
    coordinate = weather_service.get_coordinates(city)
    data = weather_service.get_weather(coordinate[0], coordinate[1])
    print(data)
    return render_template('index.html', city=city)


@app.route("/search")
def set_city():
    # what is city not exists in real weather data?
    city: str = request.args.get("city") or 'Ho Chi Minh City'
    resp = make_response(redirect("/"))
    resp.set_cookie("city", city)
    return resp
