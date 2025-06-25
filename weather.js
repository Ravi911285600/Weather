const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const resultDiv = document.getElementById('weather-result');

// Replace with your OpenWeatherMap API key
const API_KEY = 'YOUR_API_KEY_HERE';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    resultDiv.classList.add('hidden');
    resultDiv.innerHTML = '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('City not found');
        }
        const data = await res.json();
        showWeather(data);
    } catch (err) {
        resultDiv.innerHTML = `<div class="error">${err.message}</div>`;
        resultDiv.classList.remove('hidden');
    }
}

function showWeather(data) {
    const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}:</strong> ${data.weather[0].description}</p>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
}