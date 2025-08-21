const weatherCodeMap = {
  0: "Trời quang ☀️",
  1: "Hầu như quang đãng 🌤️",
  2: "Có mây rải rác ⛅",
  3: "U ám ☁️",
  45: "Sương mù 🌫️",
  48: "Sương mù bám sương 🌫️",
  51: "Mưa phùn nhẹ 🌦️",
  53: "Mưa phùn vừa 🌦️",
  55: "Mưa phùn dày 🌧️",
  56: "Mưa phùn lạnh nhẹ ❄️🌧️",
  57: "Mưa phùn lạnh dày ❄️🌧️",
  61: "Mưa nhỏ 🌧️",
  63: "Mưa vừa 🌧️",
  65: "Mưa to 🌧️💦",
  66: "Mưa lạnh nhỏ ❄️🌧️",
  67: "Mưa lạnh to ❄️🌧️",
  71: "Tuyết rơi nhẹ ❄️",
  73: "Tuyết vừa ❄️",
  75: "Tuyết dày ❄️❄️",
  77: "Tuyết lẫn hạt băng 🌨️",
  80: "Mưa rào nhỏ ⛈️",
  81: "Mưa rào vừa ⛈️",
  82: "Mưa rào to ⛈️💦",
  85: "Tuyết rào nhẹ 🌨️",
  86: "Tuyết rào to 🌨️❄️",
  95: "Dông sấm ⚡",
  96: "Dông kèm mưa đá nhỏ ⚡🧊",
  99: "Dông kèm mưa đá to ⚡🧊💥",
};

function mapWeatherCode(code) {
  return weatherCodeMap[code];
}