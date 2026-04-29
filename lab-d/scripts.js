// CONSTANTS
const CLOUDY = ["fa-solid", "fa-cloud"]
const CLOUD_MOON = ["fa-solid", "fa-cloud-moon"]
const CLOUD_SUN = ["fa-solid", "fa-cloud-sun"]
const RAIN_MOON = ["fa-solid", "fa-cloud-moon-rain"]
const RAIN_SUN = ["fa-solid", "fa-cloud-sun-rain"]
const RAINY = ["fa-solid", "fa-cloud-showers-heavy"]
const STORMY = ["fa-solid", "fa-cloud-bolt"]
const SNOWY = ["fa-regular", "fa-snowflake"]
const MOON = ["fa-solid", "fa-moon"]
const SUNNY = ["fa-solid", "fa-sun"]
const TORNADO = ["fa-solid", "fa-tornado"]
const HURRICANE = ["fa-solid", "fa-hurricane"]
const FOGGY = ["fa-solid", "fa-water"]

// API KEY
const API_KEY = "92f353f3bdfc4969f071476b1f54765c";
const BASE_URL = "https://api.openweathermap.org";

// Weather code mappings
const WEATHER_CODES = {
  200: { icon: STORMY, text: "Burza z lekkim deszczem" },
  201: { icon: STORMY, text: "Burza z deszczem" },
  202: { icon: STORMY, text: "Burza z silnym deszczem" },
  210: { icon: STORMY, text: "Lekka burza" },
  211: { icon: STORMY, text: "Burza" },
  212: { icon: STORMY, text: "Silna burza" },
  221: { icon: STORMY, text: "Opadająca burza" },
  230: { icon: RAIN_MOON, text: "Burza z lekką mżawką" },
  231: { icon: RAIN_MOON, text: "Burza z mżawką" },
  232: { icon: RAIN_MOON, text: "Burza z gęstą mżawką" },
  300: { icon: RAINY, text: "Lekka mżawka" },
  301: { icon: RAINY, text: "Mżawka" },
  302: { icon: RAINY, text: "Gęsta mżawka" },
  310: { icon: RAINY, text: "Lekki deszcz z mżawką" },
  311: { icon: RAINY, text: "Deszcz z mżawką" },
  312: { icon: RAINY, text: "Silny deszcz z mżawką" },
  313: { icon: RAINY, text: "Opady deszczu z mżawką" },
  314: { icon: RAINY, text: "Silne opady deszczu z mżawką" },
  321: { icon: RAINY, text: "Opady mżawki" },
  500: { icon: RAINY, text: "Lekki deszcz" },
  501: { icon: RAINY, text: "Umiarkowany deszcz" },
  502: { icon: RAINY, text: "Silny deszcz" },
  503: { icon: RAINY, text: "Bardzo silny deszcz" },
  504: { icon: RAINY, text: "Ekstremalne opady" },
  511: { icon: SNOWY, text: "Marznący deszcz" },
  520: { icon: RAINY, text: "Lekkie przelotne opady" },
  521: { icon: RAINY, text: "Przelotne opady" },
  522: { icon: RAINY, text: "Silne przelotne opady" },
  531: { icon: RAINY, text: "Nierówne opady deszczu" },
  600: { icon: SNOWY, text: "Lekki śnieg" },
  601: { icon: SNOWY, text: "Śnieg" },
  602: { icon: SNOWY, text: "Silny śnieg" },
  611: { icon: SNOWY, text: "Deszcz ze śniegiem" },
  612: { icon: SNOWY, text: "Lekki deszcz ze śniegiem" },
  613: { icon: SNOWY, text: "Silny deszcz ze śniegiem" },
  615: { icon: SNOWY, text: "Lekki deszcz i śnieg" },
  616: { icon: SNOWY, text: "Deszcz i śnieg" },
  620: { icon: SNOWY, text: "Lekkie opady śniegu" },
  621: { icon: SNOWY, text: "Opady śniegu" },
  622: { icon: SNOWY, text: "Silne opady śniegu" },
  701: { icon: FOGGY, text: "Mgła" },
  711: { icon: FOGGY, text: "Dym" },
  721: { icon: FOGGY, text: "Zamglenie" },
  731: { icon: FOGGY, text: "Pył w powietrzu" },
  741: { icon: FOGGY, text: "Mgła" },
  751: { icon: FOGGY, text: "Piasek" },
  761: { icon: FOGGY, text: "Pył" },
  762: { icon: FOGGY, text: "Wulkaniczny pył" },
  771: { icon: TORNADO, text: "Podmuchy wiatru" },
  781: { icon: TORNADO, text: "Tornado" },
  800: { icon: SUNNY, text: "Bezchmurnie" },
  801: { icon: CLOUD_SUN, text: "Lekkie zachmurzenie" },
  802: { icon: CLOUD_SUN, text: "Częściowe zachmurzenie" },
  803: { icon: CLOUDY, text: "Pochmurnie" },
  804: { icon: CLOUDY, text: "Zachmurzenie" }
};

function resolveTheme(dt, sunrise, sunset) {
  // Resolve the theme based on the time in the chosen city
  return dt >= sunrise && dt < sunset ? "day" : "night";
}

function getWeatherIcon(weatherCode, theme) {
  // Returns the list of classes for the weather status
  const weatherData = WEATHER_CODES[weatherCode];
  if (!weatherData) return CLOUDY;

  const icon = weatherData.icon;

  // Adjust icon based on day/night theme
  if (theme === "night") {
    if (icon === SUNNY) return MOON;
    if (icon === CLOUD_SUN) return CLOUD_MOON;
    if (icon === RAIN_SUN) return RAIN_MOON;
  }

  return icon;
}

function getWeather() {
  // Runs when search button is pressed
  const city = document.getElementById("searchBar").value.trim();

  if (!city) {
    alert("Proszę wpisać nazwę miasta!");
    return;
  }

  // Fetch current weather using XMLHttpRequest in XML mode
  const xhrCurrentWeather = new XMLHttpRequest();
  const currentWeatherUrl = `${BASE_URL}/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=pl&mode=xml&appid=${API_KEY}`;

  xhrCurrentWeather.onload = function() {
    if (xhrCurrentWeather.status === 200) {
      // Try to get a parsed XML document, fall back to DOMParser if needed
      let xml = xhrCurrentWeather.responseXML;
      // console.log(xml)
      if (!xml) {
        try {
          xml = new DOMParser().parseFromString(xhrCurrentWeather.responseText, 'application/xml');
        } catch (e) {
          console.error('Nie można sparsować XML:', e);
        }
      }

      if (xml) {
        try {
          // Map XML fields to the same shape expected by displayCurrentWeather
          const cityEl = xml.querySelector('city');
          const name = cityEl ? cityEl.getAttribute('name') : city;
          const countryEl = xml.querySelector('country');
          const country = countryEl ? countryEl.textContent : '';

          const sunEl = xml.querySelector('sun');
          const sunrise = sunEl && sunEl.getAttribute('rise') ? Math.floor(Date.parse(sunEl.getAttribute('rise')) / 1000) : 0;
          const sunset = sunEl && sunEl.getAttribute('set') ? Math.floor(Date.parse(sunEl.getAttribute('set')) / 1000) : 0;

          const lastUpdateEl = xml.querySelector('lastupdate');
          const dt = lastUpdateEl && lastUpdateEl.getAttribute('value') ? Math.floor(Date.parse(lastUpdateEl.getAttribute('value')) / 1000) : Math.floor(Date.now() / 1000);

          const weatherEl = xml.querySelector('weather');
          const weatherId = weatherEl && weatherEl.getAttribute('number') ? parseInt(weatherEl.getAttribute('number'), 10) : 800;
          const weatherMain = weatherEl && weatherEl.getAttribute('value') ? weatherEl.getAttribute('value') : '';

          const tempEl = xml.querySelector('temperature');
          const temp = tempEl && tempEl.getAttribute('value') ? parseFloat(tempEl.getAttribute('value')) : 0;
          // XML from OWM might not include feels_like; fallback to temp
          const feelsLike = temp;

          const pressureEl = xml.querySelector('pressure');
          const pressure = pressureEl && pressureEl.getAttribute('value') ? parseFloat(pressureEl.getAttribute('value')) : 0;

          const windSpeedEl = xml.querySelector('wind speed');
          const windDirEl = xml.querySelector('wind direction');
          const windSpeed = windSpeedEl && windSpeedEl.getAttribute('value') ? parseFloat(windSpeedEl.getAttribute('value')) : 0;
          const windDeg = windDirEl && windDirEl.getAttribute('value') ? parseFloat(windDirEl.getAttribute('value')) : 0;

          const currentData = {
            dt,
            sys: { sunrise, sunset, country },
            weather: [{ id: weatherId, main: weatherMain }],
            name,
            main: { temp, feels_like: feelsLike, pressure },
            wind: { deg: windDeg, speed: windSpeed }
          };

          displayCurrentWeather(currentData);
        } catch (e) {
          console.error('Błąd podczas mapowania XML na obiekt:', e);
          alert('Błąd podczas przetwarzania odpowiedzi serwera.');
        }
      } else {
        alert('Otrzymano odpowiedź, ale nie można było sparsować XML.');
      }

      // Fetch 5-day forecast using Fetch API (same as before)
      const forecastUrl = `${BASE_URL}/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&lang=pl&appid=${API_KEY}`;
      fetch(forecastUrl)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then(forecastData => displayForecast(forecastData))
        .catch(error => console.error('Błąd przy pobieraniu prognozy:', error));
    } else {
      alert('Nie znaleziono miasta. Spróbuj ponownie!');
    }
  };

  xhrCurrentWeather.onerror = function() {
    alert("Błąd połączenia. Sprawdź swoją konfigurację API!");
  };

  xhrCurrentWeather.open("GET", currentWeatherUrl, true);
  xhrCurrentWeather.send();
}

function displayCurrentWeather(data) {
  // Update current weather display
  const theme = resolveTheme(data.dt, data.sys.sunrise, data.sys.sunset);
  const weatherCode = data.weather[0].id;
  const weatherIcon = getWeatherIcon(weatherCode, theme);

  // Update location
  document.getElementById("currentLocation").textContent = data.name + ", " + data.sys.country;

  // Update weather icon and description (use our WEATHER_CODES text when available)
  const iconElement = document.getElementById("currentWeatherIcon").querySelector("i");
  iconElement.className = weatherIcon.join(" ");
  const currentDesc = (WEATHER_CODES[weatherCode] && WEATHER_CODES[weatherCode].text) || data.weather[0].main;
  document.getElementById("currentWeatherText").textContent = currentDesc;

  // Update temperature
  document.getElementById("currentTemperatureValue").textContent = Math.round(data.main.temp) + "°C";
  document.getElementById("currentFeelsLikeValue").textContent = Math.round(data.main.feels_like) + "°C";

  // Update pressure
  document.getElementById("currentPressureText").textContent = data.main.pressure + " hPa";

  // Update wind
  const windDirection = data.wind.deg || 0;
  const windArrow = document.getElementById("currentWindDirection").querySelector("i");
  windArrow.style.transform = `rotate(${windDirection}deg)`;
  document.getElementById("currentWindText").textContent = data.wind.speed + " m/s";

  // Update background theme
  if (theme === "night") {
    document.documentElement.style.setProperty("--current-bg-color", "var(--bg-colot-night)");
    document.documentElement.style.setProperty("--current-widget-color", "var(--widget-color-night)");
  } else {
    document.documentElement.style.setProperty("--current-bg-color", "var(--bg-color-day)");
    document.documentElement.style.setProperty("--current-widget-color", "var(--widget-color-day)");
  }
  document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue("--current-bg-color");
}

function displayForecast(data) {
  // console.log(data)
  const forecastContainer = document.getElementById("forecastWeather");
  forecastContainer.innerHTML = ""; // Clear existing forecast

  // We want forecasts for the next 5 days at 3-hour intervals.
  // The API returns 3-hour entries; take entries within the next 5*24 hours.
  const now = Math.floor(Date.now() / 1000);
  const end = now + 5 * 24 * 3600;

  let entries = data.list.filter(item => item.dt >= now && item.dt < end);
  // Fallback: if filter yields nothing (edge cases), take up to 40 items (5 days * 8)
  if (!entries || entries.length === 0) entries = data.list.slice(0, 40);

  entries.forEach(item => {
    // Determine day/night for the forecast time based on the forecast hour (city local time)
    let theme;
    if (data.city && typeof data.city.timezone === 'number') {
      // data.city.timezone is offset in seconds from UTC for the city
      const localTimestamp = item.dt + data.city.timezone;
      const localHour = new Date(localTimestamp * 1000).getUTCHours();
      theme = (localHour >= 6 && localHour < 18) ? 'day' : 'night';
    } else {
      // Fallback to sunrise/sunset comparison if timezone not available
      theme = resolveTheme(item.dt, data.city && data.city.sunrise, data.city && data.city.sunset);
    }
    const weatherCode = item.weather[0].id;
    const weatherIcon = getWeatherIcon(weatherCode, theme);
    const weatherDesc = (WEATHER_CODES[weatherCode] && WEATHER_CODES[weatherCode].text) || item.weather[0].main;

    const date = new Date(item.dt * 1000);
    // Show both date and time since we display every 3 hours
    const dateStr = date.toLocaleDateString("pl-PL");
    const timeStr = date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });

    const forecastItem = document.createElement("div");
    forecastItem.className = "forecastItem";
    forecastItem.innerHTML = `
      <div class="forecastDateTime">
        <span class="forecastDate">${dateStr}</span>
        <span class="forecastTime">${timeStr}</span>
      </div>
      <div class="forecastStatus">
        <span class="forecastStatusIcon"><i class="${weatherIcon.join(" ")}"></i></span>
        <span class="forecastStatusText">${weatherDesc}</span>
      </div>
      <div class="forecastTemperature">
        <span class="forecastTemperatureValue">${Math.round(item.main.temp)}°C</span>
        <span class="forecastFeelsLikeText">Odczuwalna:</span>
        <span class="forecastFeelsLikeValue">${Math.round(item.main.feels_like || item.main.temp)}°C</span>
      </div>
      <div class="forecastPressure">
        <span class="forecastPressureicon"><i class="fa-solid fa-gauge"></i></span>
        <span class="forecastPressureText">${item.main.pressure} hPa</span>
      </div>
      <div class="forecastWind">
        <span class="forecastWindDirection"><i class="fa-regular fa-circle-up"></i></span>
        <span class="forecastWindText">${item.wind.speed} m/s</span>
      </div>
    `;


    forecastContainer.appendChild(forecastItem);
    // Set wind arrow rotation via JS to avoid inline CSS parsing issues
    const arrow = forecastItem.querySelector('.forecastWindDirection i');
    if (arrow) {
      const deg = item.wind && typeof item.wind.deg !== 'undefined' ? item.wind.deg : 0;
      arrow.style.transform = `rotate(${deg}deg)`;
    }
  });
}

document.getElementById("searchButton").addEventListener("click", getWeather);
// Allow Enter key to search
document.getElementById("searchBar").addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});

// Set initial theme based on system local time when the page loads
function setInitialTheme() {
  try {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      document.documentElement.style.setProperty('--current-bg-color', 'var(--bg-color-day)');
      document.documentElement.style.setProperty('--current-widget-color', 'var(--widget-color-day)');
    } else {
      document.documentElement.style.setProperty('--current-bg-color', 'var(--bg-colot-night)');
      document.documentElement.style.setProperty('--current-widget-color', 'var(--widget-color-night)');
    }
    // Apply to body background so initial render matches variables
    document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--current-bg-color');
  } catch (e) {
    console.error('Nie można ustawić początkowego motywu:', e);
  }
}

// Run on DOMContentLoaded (script is loaded with defer but ensure DOM ready)
window.addEventListener('DOMContentLoaded', setInitialTheme);

