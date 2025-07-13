# Weather Dashboard

A responsive, modern weather dashboard web application built with HTML, CSS, and JavaScript. Get real-time weather information and 5-day forecasts for any city worldwide.

## Features

- 🌍 **Search any city** - Enter any city name to get current weather
- 🌡️ **Current weather conditions** - Temperature, humidity, wind speed, visibility, and pressure
- 📅 **5-day forecast** - Daily weather predictions with min/max temperatures
- 🎨 **Dynamic backgrounds** - Background changes based on weather conditions
- 📱 **Fully responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Loading animations** - Smooth loading spinner while fetching data
- 🛡️ **Error handling** - Graceful error messages for invalid cities or network issues
- 💾 **Local storage** - Remembers your last searched city
- ♿ **Accessibility** - Keyboard navigation and screen reader support

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key

### 2. Configure the Application

1. Open `script.js` in your code editor
2. Find line 3: `this.apiKey = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Application

1. Open `index.html` in your web browser
2. Enter a city name and click the search button or press Enter
3. Enjoy your weather dashboard!

## File Structure

```
Weather Dashboard/
├── index.html          # Main HTML structure
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality and API integration
└── README.md           # This file
```

## API Usage

The application uses the OpenWeatherMap API with the following endpoints:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Free Tier Limits

- 1,000 calls per day
- 60 calls per minute
- Perfect for personal projects and testing

## Weather Backgrounds

The application automatically changes the background based on weather conditions:

- ☀️ **Sunny/Clear** - Warm gradient with orange and pink tones
- ☁️ **Cloudy** - Soft blue and pink gradient
- 🌧️ **Rainy/Stormy** - Purple and blue gradient
- ❄️ **Snowy** - Light purple and orange gradient

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Error Handling

The application handles various error scenarios:

- **Invalid city names** - Clear error message with suggestions
- **Network issues** - Offline detection and user notification
- **API errors** - Specific error messages for different HTTP status codes
- **Missing API key** - Clear instructions for setup

## Performance Features

- **Debounced search** - Prevents excessive API calls
- **Local storage** - Remembers user preferences
- **Optimized images** - Weather icons from OpenWeatherMap CDN
- **Smooth animations** - CSS transitions for better UX

## Customization

### Changing Colors

Edit the CSS variables in `style.css` to customize the color scheme:

```css
/* Example: Change primary color */
.search-btn {
    background: linear-gradient(135deg, #your-color 0%, #your-color 100%);
}
```

### Adding New Weather Types

To add support for new weather conditions, modify the `updateBackground()` method in `script.js`:

```javascript
case 'fog':
    body.classList.add('foggy');
    break;
```

### Changing Units

The application uses metric units by default. To change to Fahrenheit, modify the API calls in `script.js`:

```javascript
// Change from 'metric' to 'imperial'
const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=imperial`;
```

## Troubleshooting

### Common Issues

1. **"API key error"** - Make sure you've replaced the placeholder with your actual API key
2. **"City not found"** - Check the spelling or try a different city name
3. **No data loading** - Check your internet connection
4. **Background not changing** - Ensure JavaScript is enabled in your browser

### Getting Help

- Check the browser console for error messages
- Verify your API key is correct
- Ensure you have an active internet connection
- Try refreshing the page

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve the weather dashboard!

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) 
