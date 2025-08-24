const LABEL_UNITS = {
    "Nhiệt độ": "°C",
    "Mây phủ": "%"
}


async function fetchWeatherData() {
    const response = await fetch("/api/weather");
    const data = response.json();
    return data;
}


function transformWeatherData(data) {
    return {
        labels: data.labels,
        temps: data.temps,
        cloud: data.cloud,
        description: data.description
    }
}


function drawChart() {
    data = JSON.parse(localStorage.getItem('weatherData'))
    new Chart(document.getElementById("weatherChart"), {
        data: {
            labels: data.labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Nhiệt độ',
                    data: data.temps,
                    borderColor: 'red',
                    tension: 0.3,
                    fill: false
                },
                {
                    type: 'line',
                    label: 'Mây phủ',
                    data: data.cloud,
                    borderColor: 'DeepSkyBlue',
                    tension: 0.3,
                    fill: false
                }
            ],
            weatherDescription: data.description
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
                            return ctx[0].label + ":00";
                        },
                        label: function (ctx) {
                            const labels = ctx.dataset.label
                            const unit = LABEL_UNITS[labels]
                            return labels + ": " + ctx.raw + (unit ? " " + unit : "");
                        },
                        footer: function (ctx) {
                            let hour = ctx[0].dataIndex
                            let code = ctx[0].chart.data.weatherDescription[hour]
                            return weatherCodeMap[code]
                        }
                    }
                }, title: {
                    display: true,
                    text: 'Nhiệt độ và độ mây phủ trong hôm nay và mai',
                    font: {
                        size: 20,
                        weight: 'bold'
                    }
                }
            }
        }
    })
}


fetchWeatherData()
    .then(data => localStorage.setItem('weatherData', JSON.stringify(transformWeatherData(data))))
    .then(drawChart);
