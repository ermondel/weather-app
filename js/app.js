/**
 * ver beta 0.5
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

// request URL
let reqURL = 'api.weatherbit.io/v2.0/forecast/daily';

// request query string
let reqKey = '351954d3a30a4b60ad716f1c73cc43ee';

// request protocol
let reqProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:';



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
 * Validate city name (String)
 * return Boolean
 */
function validateCityName(str) {
	return str.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ? true : false;
}

/**
 * Convert celsius to fahrenheit
 * return Number
 */
function celsiusToFahrenheit(celsius) {
	return (celsius * 9/5 + 32).toFixed(2);
}

/**
 * Format date like 08 February 2018 from timestamp
 * return String
 */
function formatDate(timestamp) {
	if (!timestamp) return '';
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const date = new Date(timestamp*1000);
	return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
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

    // construct a query
    const query = reqProtocol + '//' + reqURL + '?key=' + reqKey + '&lang=en&units=M&days=16&city=' + cityInput.value;

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

// weatherbit.io ------------------------------------------------------------------------------------------------------- // 

/**
 * request success Weatherbit
 */
function convertWeatherbit(pr) {
	if (pr.data && pr.data.length > 0) {
		// convert forecasts from native format json to weather-app format json
		// forecasts list
		let forecasts = [];
		for (const forecast of pr.data) {
			//
			let icon = '';
			if ('c01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-01';
			if ('c03d,c02d,c02d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-02';
			if ('c04d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-03';
			if ('a06d,a05d,a04d,a03d,a02d,a01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-04';
			if ('u00d,r06d,r05d,r04d,f01d,r03d,r02d,r01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-05';
			if ('t05d,t04d,t04d,t04d,t03d,t02d,t01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-06';
			if ('s06d,s02d,s01d,s05d,s05d,s04d,s03d,s02d,s01d,d03d,d02d,d01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-07';
			//
			forecasts.push({
				timestamp:      forecast.ts,
				description:    forecast.weather.description,
				pres:           forecast.pres,
				humidity:       forecast.rh,
				wind_direction: forecast.wind_cdir_full,
				wind_speed:     forecast.wind_spd,
				temp_avg_c:     forecast.temp,
				temp_max_app_c: forecast.app_max_temp,
				temp_min_app_c: forecast.app_min_temp,
				temp_avg_f:     celsiusToFahrenheit(forecast.temp),
				temp_max_app_f: celsiusToFahrenheit(forecast.app_max_temp),
				temp_min_app_f: celsiusToFahrenheit(forecast.app_min_temp),
				icon:           icon,
			});
		}

		// 
		return {
			city_name:    pr.city_name,
 			lon:          pr.lon,
 			timezone:     pr.timezone,
 			lat:          pr.lat,
 			country_code: pr.country_code,
 			state_code:   pr.state_code,
 			timestamp:    Math.floor(Date.now() / 1000),
 			forecasts:    forecasts
		};
	}
	return {};
}
