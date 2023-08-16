const map = L.map('map').setView([39.9334, 32.8597], 13); // Centered on Ankara

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const weatherButton = document.querySelector('.weather-button');
const weatherDescription = document.querySelector('.weather-description');

map.on('click', async (e) => {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    const weatherData = await fetchWeatherData(lat, lon);
    if (weatherData) {
        const description = weatherData.weather[0].description;
        weatherButton.textContent = `Weather: ${description}`;
        
    }
});

async function fetchWeatherData(lat, lon) {
    const apiKey = 'd5cb8c704d7c2051f2852fbfee6a2982';
    const lang = 'tr'; // Turkish language code
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${lang}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

