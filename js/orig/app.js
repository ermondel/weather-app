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
 * Return first found obj or 0
 *  key e.g. 'city_name'
 *  value e.g. 'Kiev'
 */
function getFromCache(key, value) {
	if (cache.length > 0 && key && value) {
		for (let i = 0; i < cache.length; i++) {
			if (cache[i].hasOwnProperty(key) && cache[i][key].toLowerCase() === value.toLowerCase()) {
				// check expiry date
				if ((Math.floor(Date.now() / 1000) - cache[i].timestamp) < CACHEEXPIRY) {
					return cache[i];
				} else {
					cache.splice(i, 1);
					return 0;
				}
			}
		}
	}
	return 0;
}

/**
 * Convert forecast from inner storage format to html
 * @required properties
 *  forecastToDisplay: inner storage (Array/Object)
 *  forecastPeriod: forecast period in days (Number)
 *  APPNAME: app name to set in html page title
 * no return
 */
function displayForecasts() {
	if (forecastToDisplay && forecastToDisplay.forecasts) {
		//
		cityInput.value = forecastToDisplay.city_name;
		document.title  = APPNAME + ' (' + forecastToDisplay.city_name + ') ';
		//
		const limit = forecastToDisplay.forecasts.length <= forecastPeriod ? forecastToDisplay.forecasts.length : forecastPeriod;
		main.innerHTML = '';
		main.insertAdjacentHTML('afterbegin', '<div class="forecasts">' + forecastToDisplay.forecasts.slice(0, limit).map(viewHtmlForecast).join('') + '</div>');
	}
}

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
 * Map callback for display html forecast
 * @required properties
 *  forecastUnit: Celsius or Fahrenheit (String)
 * return String
 */
function viewHtmlForecast(data) {
	let temperature_average      = forecastUnit === 'celsius' ? data.temp_avg_c +     ' °C' : data.temp_avg_f     + ' °F';
	let temperature_max_apparent = forecastUnit === 'celsius' ? data.temp_max_app_c + ' °C' : data.temp_max_app_f + ' °F';
	let temperature_min_apparent = forecastUnit === 'celsius' ? data.temp_min_app_c + ' °C' : data.temp_min_app_f + ' °F';

	return '<div class="forecast">'+
	'<div class="forecast-date">'              + formatDate(data.timestamp) + '</div>'+
	'<div class="forecast-description">'       + data.description           + '</div>'+
	'<div class="forecast-img"><img src="img/' + data.icon                  + '.png" alt="' + data.description + '"></div>'+
	'<div class="forecast-temp-avg">'          + temperature_average        + '</div>'+
	'<div class="forecast-max-temp-app fl">Feels like (at max) <span class="fv">' + temperature_max_apparent + '</span></div>'+
	'<div class="forecast-min-temp-app fl">Feels like (at min) <span class="fv">' + temperature_min_apparent + '</span></div>'+
	'<div class="forecast-pres fl">Pressure <span class="fv">' + data.pres + ' mb</span></div>'+
	'<div class="forecast-rh fl">Humidity <span class="fv">'   + data.humidity + ' %</span></div>'+
	'<div class="forecast-wind_spd fl">Wind <span class="fv">' + data.wind_direction + ', ' + data.wind_speed + ' m/s</span></div>'+
	'</div>';
}

/**
 * Handler onchange
 * set period and unit
 */
function handlerOnchange(e) {
	if (e.target.type === 'radio') {
		if (e.target.name === 'period') forecastPeriod = e.target.value;
		if (e.target.name === 'unit') forecastUnit = e.target.value;
		displayForecasts();
	}
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
