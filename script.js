// Weather Dashboard JavaScript
class WeatherDashboard {
    constructor() {
        this.apiKey = '860e8a481fcd47336c932314c6fa027e'; // Replace with your OpenWeatherMap API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLastSearchedCity();
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');

        searchBtn.addEventListener('click', () => this.searchWeather());
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });

        // Focus on input when page loads
        cityInput.focus();
    }

    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();

        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideWeatherData();

        try {
            const currentWeather = await this.fetchCurrentWeather(city);
            const forecast = await this.fetchForecast(city);
            
            this.displayCurrentWeather(currentWeather);
            this.displayForecast(forecast);
            this.updateBackground(currentWeather.weather[0].main);
            this.saveLastSearchedCity(city);
            
            this.hideLoading();
            this.showWeatherData();
        } catch (error) {
            this.hideLoading();
            this.showError(error.message);
        }
    }

    async fetchCurrentWeather(city) {
        const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('API key error. Please check your OpenWeatherMap API key.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }

        return await response.json();
    }

    async fetchForecast(city) {
        const url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch forecast data. Please try again later.');
        }

        const data = await response.json();
        return this.processForecastData(data);
    }

    processForecastData(data) {
        const dailyForecasts = [];
        const seenDates = new Set();

        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();

            if (!seenDates.has(dateString) && dailyForecasts.length < 5) {
                seenDates.add(dateString);
                dailyForecasts.push({
                    date: date,
                    temp: item.main.temp,
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max,
                    weather: item.weather[0],
                    humidity: item.main.humidity,
                    wind_speed: item.wind.speed
                });
            }
        });

        return dailyForecasts;
    }

    displayCurrentWeather(data) {
        const cityName = document.getElementById('cityName');
        const currentDate = document.getElementById('currentDate');
        const currentTemp = document.getElementById('currentTemp');
        const feelsLike = document.getElementById('feelsLike');
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherDescription = document.getElementById('weatherDescription');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const visibility = document.getElementById('visibility');
        const pressure = document.getElementById('pressure');

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        currentDate.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        currentTemp.textContent = Math.round(data.main.temp);
        feelsLike.textContent = Math.round(data.main.feels_like);
        weatherDescription.textContent = data.weather[0].description;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        pressure.textContent = `${data.main.pressure} hPa`;
    }

    displayForecast(forecastData) {
        const forecastContainer = document.getElementById('forecastContainer');
        forecastContainer.innerHTML = '';

        forecastData.forEach(day => {
            const forecastCard = this.createForecastCard(day);
            forecastContainer.appendChild(forecastCard);
        });
    }

    createForecastCard(day) {
        const card = document.createElement('div');
        card.className = 'forecast-card fade-in';

        const date = day.date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const iconCode = day.weather.icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        card.innerHTML = `
            <div class="forecast-date">${date}</div>
            <img src="${iconUrl}" alt="${day.weather.description}" class="forecast-icon">
            <div class="forecast-description">${day.weather.description}</div>
            <div class="forecast-temp">
                <span class="temp-max">${Math.round(day.temp_max)}°</span>
                <span class="temp-min">${Math.round(day.temp_min)}°</span>
            </div>
        `;

        return card;
    }

    updateBackground(weatherMain) {
        const body = document.body;
        
        // Remove existing weather classes
        body.classList.remove('sunny', 'cloudy', 'rainy', 'snowy', 'clear');
        
        // Add appropriate class based on weather
        switch (weatherMain.toLowerCase()) {
            case 'clear':
                body.classList.add('clear');
                break;
            case 'clouds':
                body.classList.add('cloudy');
                break;
            case 'rain':
            case 'drizzle':
            case 'thunderstorm':
                body.classList.add('rainy');
                break;
            case 'snow':
                body.classList.add('snowy');
                break;
            case 'sunny':
            default:
                body.classList.add('sunny');
                break;
        }
    }

    showLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.classList.remove('hidden');
    }

    hideLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        loadingSpinner.classList.add('hidden');
    }

    showError(message) {
        const errorMessage = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    hideError() {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.classList.add('hidden');
    }

    showWeatherData() {
        const currentWeather = document.getElementById('currentWeather');
        const forecastSection = document.getElementById('forecastSection');
        
        currentWeather.classList.remove('hidden');
        forecastSection.classList.remove('hidden');
        
        // Add animation classes
        currentWeather.classList.add('fade-in');
        forecastSection.classList.add('slide-in');
    }

    hideWeatherData() {
        const currentWeather = document.getElementById('currentWeather');
        const forecastSection = document.getElementById('forecastSection');
        
        currentWeather.classList.add('hidden');
        forecastSection.classList.add('hidden');
    }

    saveLastSearchedCity(city) {
        try {
            localStorage.setItem('lastSearchedCity', city);
        } catch (error) {
            console.warn('Could not save last searched city to localStorage');
        }
    }

    loadLastSearchedCity() {
        try {
            const lastCity = localStorage.getItem('lastSearchedCity');
            if (lastCity) {
                const cityInput = document.getElementById('cityInput');
                cityInput.value = lastCity;
            }
        } catch (error) {
            console.warn('Could not load last searched city from localStorage');
        }
    }

    // Utility method to format temperature
    formatTemperature(temp) {
        return Math.round(temp);
    }

    // Utility method to format wind speed
    formatWindSpeed(speed) {
        return Math.round(speed * 3.6); // Convert m/s to km/h
    }

    // Utility method to format visibility
    formatVisibility(visibility) {
        return (visibility / 1000).toFixed(1);
    }
}

// Initialize the weather dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new WeatherDashboard();
    
    // Add some helpful instructions for users
    const cityInput = document.getElementById('cityInput');
    cityInput.addEventListener('focus', () => {
        if (!cityInput.value) {
            cityInput.placeholder = 'Try: London, New York, Tokyo...';
        }
    });
    
    cityInput.addEventListener('blur', () => {
        if (!cityInput.value) {
            cityInput.placeholder = 'Enter city name...';
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const cityInput = document.getElementById('cityInput');
        cityInput.blur();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {
    // Add touch feedback for mobile devices
}, { passive: true });

// Error handling for network issues
window.addEventListener('online', () => {
    console.log('Network connection restored');
});

window.addEventListener('offline', () => {
    const dashboard = new WeatherDashboard();
    dashboard.showError('No internet connection. Please check your network and try again.');
});

// Performance optimization: Debounce search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced search for better performance
const debouncedSearch = debounce(() => {
    const dashboard = new WeatherDashboard();
    dashboard.searchWeather();
}, 500);

// Optional: Add auto-search after typing (uncomment if desired)
// document.getElementById('cityInput').addEventListener('input', debouncedSearch); 