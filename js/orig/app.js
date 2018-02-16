/**
 * ver beta 0.6
 */

// app name
const APPNAME = 'Weather app';

// cache element expiry date (Number)
const CACHEEXPIRY = 43200;

// Form change event delegation plus submit
const form = document.getElementById('form');
	  form.addEventListener('change', handlerOnchange);
	  form.addEventListener('submit', handlerOnsubmit);

// Form for input city name
const cityInput = document.getElementById('city');

// main box
const main = document.getElementById('main');

// cache (Array)
let cache = [];

// current forecast to display (Array/Object)
let forecastToDisplay;

// forecast period in days (Number)
let forecastPeriod = 7;

// forecast unit (Celsius or Fahrenheit) (String)
let forecastUnit = 'celsius';

/**
 * Display error
 * return Boolean
 */
function displayError(error_html) {
	forecastToDisplay = null;
	document.title  = APPNAME;
	main.innerHTML = '';
	main.insertAdjacentHTML('afterbegin', error_html);
	return true;
}

/**
 * Handler onsubmit
 */
function handlerOnsubmit(e) {
	// prevent default behavior
	e.preventDefault();

	// display error if the user entered an incorrect city name
	if (!validateCityName(cityInput.value)) {
		return displayError('<div class="city-val-error">City name must be correct.<br> Only letters, spaces and hyphens are allowed.</div>');
	}

	// check entry in the cache
	let forecast = getFromCache('city_name', cityInput.value);

	if (forecast) {
		forecastToDisplay = forecast;
		displayForecasts();
		// console.log('from cache ...');
		return;
	}

	// make query
	fetch(query).then(response => response.json()).then(function(data) {
		// console.log('server ...');
		let forecast = convertWeatherbit(data);
		if (forecast && forecast.forecasts && forecast.forecasts.length > 0) {
			cache.push(forecast);
			forecastToDisplay = forecast;
			displayForecasts();
		} else {
			displayError('<div class="error">No forecast available.</div>');
		}
	}).catch(function(e) {
		console.log(e);
		displayError('<div class="error">No forecast available.</div>');
	});
}
