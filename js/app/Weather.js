/**
 * Weather.js
 * version 0.54
 */
var Weather = {
	APPNAME        : 'weather-app',   // app name (for keys)
	formID         : 'form',          // form
	asideID        : 'aside-inner',   // favorites and history
	mainID         : 'main-inner',    // main content
	cityInputID    : 'city',          // input for enter city name
	cityInput      : null,            // input dom element
	forecast       : {},              // forecast (in native app format) to display
	forecastsLimit : 7,               // default forecasts limit to show in days
	forecastUnit   : 'celsius',       // default forecasts units to show (celsius or fahrenheit)
	forecastCache  : [],              // forecast cache (to save a fetch queries)
	forecastCacheExpiry : 43200,      // forecast cache expiry

	/**
	 * setup
	 */
	setup() {
		this.cityInput = document.getElementById(this.cityInputID);
		this.addEvents();
		this.initKeeper(this.APPNAME);
	},

	/**
 	 * Get forecast from cache by
 	 * key (String) e.g. 'city_name'
 	 * value (String) e.g. 'Kiev'
 	 */
	getFromCache(key, value) {
		if (this.forecastCache.length > 0 && key && value) {
			for (let i = 0; i < this.forecastCache.length; i++) {
				if (this.forecastCache[i].hasOwnProperty(key) && this.forecastCache[i][key].toLowerCase() === value.toLowerCase()) {
					// check expiry date
					if ((Math.floor(Date.now() / 1000) - this.forecastCache[i].timestamp) < this.forecastCacheExpiry) {
						return this.forecastCache[i];
					} else {
						this.forecastCache.splice(i, 1);
						return false;
					}
				}
			}
		}
		return false;
	},

	/**
	 * load forecast
	 */
	loadForecast(city_name) {
		// check city name
		if (!city_name || !this.isCityName(city_name)) {
			console.log(this.APPNAME, 'show validate error');
			return;
		}

		// check forecast by city name in forecast cache (load from cache on success)
		const data = this.getFromCache('city_name', city_name);
		if (data) {
			this.forecast = data;
			this.showForecast();
			console.log('from cache ...');
			return;
		}

		// debug
		this.forecast = this.convertWeatherbit(forecast_example(), this.celsiusToFahrenheit);
		this.forecastCache.push(this.forecast);  // add city to forecast cache
		this.addToHistoryKeeper(this.forecast);  // add city to forecast history
		this.showForecast();
	},

	/**
	 * Show on page 
	 *  block with city name and favorite checkbox
	 *  blocks of forecast by days
	 */
	showForecast() {
		const length = this.forecast.forecasts ? this.forecast.forecasts.length : 0;
		const limit  = length <= this.forecastsLimit ? length : this.forecastsLimit;

		if (length) {
			const main   = document.getElementById(this.mainID);
			let content  = '';
			content += '<div id="forecast-header">' + this.headerForecast(this.forecast.city_name) + '</div>';
			content += '<div id="forecasts">' + this.forecast.forecasts.slice(0, limit).map(this.blockForecast, this).join('') + '</div>';
			main.innerHTML = '';
			main.insertAdjacentHTML('afterbegin', content);
		}
	},

	/**
	 * html block of header forecast (city name and favorite checkbox)
	 * city_name (String)
	 * return (String)
	 */
	headerForecast(city_name) {
		const checked = this.checkCityInFavoritesKeeper(city_name) ? ' checked' : '';
		return '<label><input type="checkbox" name="favorite" value="1" id="keep-checkbox"'+ checked +'>' + 
		'<span><span>favorite city</span></span></label>' + 
		'<h1>' + city_name + '</h1>';
	},

	/**
	 * html block of one day forecast
	 * data (Object)
	 * return (String)
	 */
	blockForecast(data) {
		let temperature_average      = this.forecastUnit === 'celsius' ? data.temp_avg_c +     ' °C' : data.temp_avg_f     + ' °F';
		let temperature_max_apparent = this.forecastUnit === 'celsius' ? data.temp_max_app_c + ' °C' : data.temp_max_app_f + ' °F';
		let temperature_min_apparent = this.forecastUnit === 'celsius' ? data.temp_min_app_c + ' °C' : data.temp_min_app_f + ' °F';

		return '<div class="forecast">'+
		'<div class="forecast-date">'              + this.NMonYDate(data.timestamp) + '</div>'+
		'<div class="forecast-description">'       + data.description           + '</div>'+
		'<div class="forecast-img"><img src="img/' + data.icon                  + '.png" alt="' + data.description + '"></div>'+
		'<div class="forecast-temp-avg">'          + temperature_average        + '</div>'+
		'<div class="forecast-max-temp-app fl">Feels like (at max) <span class="fv">' + temperature_max_apparent + '</span></div>'+
		'<div class="forecast-min-temp-app fl">Feels like (at min) <span class="fv">' + temperature_min_apparent + '</span></div>'+
		'<div class="forecast-pres fl">Pressure <span class="fv">' + data.pres + ' mb</span></div>'+
		'<div class="forecast-rh fl">Humidity <span class="fv">'   + data.humidity + ' %</span></div>'+
		'<div class="forecast-wind_spd fl">Wind <span class="fv">' + data.wind_direction + ', ' + data.wind_speed + ' m/s</span></div>'+
		'</div>';
	},

	/**
	 * handler on change form
	 * e (Object) event
	 */
	onChangeForm(e) {
		if (e.target.type === 'radio') {
			if (e.target.name === 'period') this.forecastsLimit = e.target.value;
			if (e.target.name === 'unit') this.forecastUnit = e.target.value;
			this.showForecast();
		}
	},

	/**
	 * handler on submit form
	 * e (Object) event
	 */
	onSubmitForm(e) {
		e.preventDefault();
		this.loadForecast(this.cityInput.value);
	},

	/**
	 * handler on click keep block (favorites and history)
	 * e (Object) event
	 */
	onClickKeep(e) {
		if (e.target.nodeName === 'LI') {
    		this.loadForecast(e.target.textContent);
		}
	},

	/**
	 * handler on click main block (forecast)
	 * e (Object) event
	 */
	onClickMain(e) {
		if (e.target.type === 'checkbox') {
			if (this.forecast) {
				this.toggleFavoriteKeeper(this.forecast);
			}
		}
	},

	/**
	 * Add app events
	 */
	addEvents() {
		const form = document.getElementById(this.formID);
		const keep = document.getElementById(this.asideID);
		const main = document.getElementById(this.mainID);

		if (form && keep) {
	  		form.addEventListener('change', this.onChangeForm.bind(this));
	  		form.addEventListener('submit', this.onSubmitForm.bind(this));

	  		keep.addEventListener('click', this.onClickKeep.bind(this));
	  		main.addEventListener('click', this.onClickMain.bind(this));
	  	}
	},
};

Object.setPrototypeOf(Keeper, Utils);
Object.setPrototypeOf(Weatherbit, Keeper);
Object.setPrototypeOf(Weather, Weatherbit);
Weather.setup();
