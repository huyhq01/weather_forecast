const LABEL_UNITS = {
    "Nhiệt độ": "°C",
    "Mây phủ": "%"
}
const weatherChart = new Chart(document.getElementById("weatherChart"), {
    data: {
        datasets: [
            {
                type: 'line',
                label: 'Nhiệt độ',
                borderColor: 'red',
                tension: 0.3,
                fill: false
            },
            {
                type: 'line',
                label: 'Mây phủ',
                borderColor: 'DeepSkyBlue',
                tension: 0.3,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (ctx) {
                        return ctx[0].label + ":00"; // 00 01 02 become 00:00 01:00 02:00 when hover
                    },
                    label: function (ctx) {
                        // display temp with degree celsius
                        const labels = ctx.dataset.label
                        const unit = LABEL_UNITS[labels]
                        return labels + ": " + ctx.raw + (unit ? " " + unit : "");
                    },
                    footer: function (ctx) {
                        // display weather description
                        let hour = ctx[0].dataIndex
                        let code = ctx[0].chart.data.weatherDescription[hour]
                        return weatherCodeDescription[code]
                    }
                }
            }, title: {
                display: true,
                font: {
                    size: 20,
                    weight: 'bold'
                }
            }
        }
    }
})


export async function fetchWeatherData(cityInput) {
    let cityName = JSON.parse(localStorage.getItem('cityName')) || 'Ho Chi Minh City';
    console.log(localStorage.getItem('cityName'));
    if (cityInput && cityInput.trim()){
        cityName = cityInput
    }
    try {
      const response = await fetch('/api/weather', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city: cityName })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong.');
      }
      // receive data from server
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Lỗi:', error.message);
    }
}


export function separateData(data) {
    let weatherOfWeek = [];
    //separate weather data in a week into days
    for (let i = 0; i < data.temps.length; i += 24) {
        let weatherInDay = {
            labels: data.labels.slice(i, i + 24),
            temps: data.temps.slice(i, i + 24),
            cloud: data.cloud.slice(i, i + 24),
            description: data.description.slice(i, i + 24)
        }
        weatherOfWeek.push(weatherInDay)
    }
    localStorage.setItem('weatherData', JSON.stringify(weatherOfWeek))
    localStorage.setItem('days', JSON.stringify(data.days))
    localStorage.setItem('cityName', JSON.stringify(data.city_name))
}


export function updateChart(dayIndex) {
    const data = JSON.parse(localStorage.getItem('weatherData'))[dayIndex]
    const cityName = JSON.parse(localStorage.getItem('cityName'))
    weatherChart.data.labels = data.labels
    weatherChart.data.datasets[0].data = data.temps
    weatherChart.data.datasets[1].data = data.cloud
    weatherChart.data.weatherDescription = data.description
    weatherChart.options.plugins.title.text = 'Nhiệt độ và độ mây phủ ở '+ cityName
    weatherChart.update()
}


