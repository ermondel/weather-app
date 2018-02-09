/**
 * ver alpha 0.5
 */

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

// html template for city name validate error
const templCityValError = '<div class="city-val-error">City name must be correct.<br> Only letters, spaces and hyphens are allowed.</div>';

// Stores the previous input city name value (String)
let cityInputBuffer = '';

/**
 *	{
 *		city_name:    (String) e.g. Kiev,
 *		lon:          (String) e.g. 30.5238,
 *		timezone:     (String) e.g. Europe/Kiev,
 *		lat:          (String) e.g. 50.45466,
 *		country_code: (String) e.g. UA,
 *		state_code:   (String) e.g. 12
 *      timestamp:    (Number) cache entry date
 *		forecast:     (Object) data depending on the specific API
 *	}
 */
let cache = [];

// forecast period in days (Number)
let forecastPeriod = 7;

// forecast unit (Celsius or Fahrenheit) (String)
let forecastUnit = 'celsius';

/**
 * Return first found obj or 0
 *  key e.g. 'city_name'
 *  value e.g. 'Kiev'
 */
function getCache(key, value) {
	if (cache.length > 0 && key && value) {
		for (let i = 0; i < cache.length; i++) {
			if (cache[i].hasOwnProperty(key) && cache[i][key].toLowerCase() === value.toLowerCase()) {
				// check expiry date
				if ((Math.floor(Date.now() / 1000) - cache[i].timestamp) < CACHEEXPIRY) {
					return cache[i].forecast;
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
 * validate city name (String)
 * return (Boolean)
 */
function validateCityName(str) {
	return str.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ? true : false;
}

/**
 * set html content on page inside main box
 */
function addOnPage(content) {
	main.innerHTML = '';
	main.insertAdjacentHTML('afterbegin', content);
}

/**
 * Handler onchange
 * set period and unit
 */
function handlerOnchange(e) {
	if (e.target.type === 'radio') {
		if (e.target.name === 'period') forecastPeriod = e.target.value
		if (e.target.name === 'unit') forecastUnit = e.target.value
	}
}

/**
 * Handler onsubmit
 */
function handlerOnsubmit(e) {
	// prevent default behavior
	e.preventDefault();

	// do nothing if the user entered the same value
	if (cityInput.value === cityInputBuffer) {
		return;
	} else {
		cityInputBuffer = cityInput.value;
	}

	// show error if the user entered an incorrect city name
	if (!validateCityName(cityInput.value)) {
		addOnPage(templCityValError);
		return;
	}

	// OK
	addOnPage('OK');
}

// Debug --------------------------------------------------------------------------------------------------------------- // 
