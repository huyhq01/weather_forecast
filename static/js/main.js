import { updateButtons, addButtonEvent, formSubmit } from "./index.js";
import { fetchWeatherData, separateData, updateChart } from "./chart.js";


fetchWeather();
formSubmit(fetchWeather)


function fetchWeather(cityName){
    fetchWeatherData(cityName)
    .then(data =>separateData(data))
    .then(()=>{
        updateButtons();
        updateChart(0);
        addButtonEvent(updateChart);
    })
    .catch(err => console.error("ERROR:", err));
} 

