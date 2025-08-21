const LABEL_UNITS = {
    "Nhiệt độ": "°C",
    "Mây phủ": "%"
}
fetch("/api/weather")
    .then((response) => response.json())
    .then(data => {
        const labels = data.labels
        const temps = data.temps
        const cloud = data.cloud
        const description = data.description
        new Chart(document.getElementById("weatherChart"), {
            data: {
                labels: labels,
                datasets: [
                    {
                        type: 'line',
                        label: 'Nhiệt độ',
                        data: temps,
                        borderColor: 'red',
                        tension: 0.3,
                        fill: false
                    },
                    {
                        type: 'line',
                        label: 'Mây phủ',
                        data: cloud,
                        borderColor: 'DeepSkyBlue',
                        tension: 0.3,
                        fill: false
                    }
                ],
                weatherDescription: description
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
                    }, title:{
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
    });