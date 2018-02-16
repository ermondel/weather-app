/**
 * Weather.js
 * version 0.5
 */
var Weather = {
	APPNAME        : 'weather-app',  // app name (for keys)
	cityInput      : 'city',         // input, city name
	forecast       : {},             // forecast (in native app format) to display
	forecastsBox   : 'main',         // id of block for forecasts
	forecastsLimit : 7,              // default forecasts limit to show in days
	forecastUnit   : 'celsius',      // default forecasts units to show (celsius or fahrenheit)
	forecastCache  : [],             // forecast cache (to save a fetch queries)
	forecastCacheExpiry : 43200,     // forecast cache expiry

	/**
	 * setup
	 */
	setup() {
		this.cityInput = document.getElementById(this.cityInput) || '';
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
		this.forecastCache.push(this.forecast);
		this.showForecast();
	},

	/**
	 * show forecast on page
	 */
	showForecast() {
		const length = this.forecast.forecasts ? this.forecast.forecasts.length : 0;
		const limit  = length <= this.forecastsLimit ? length : this.forecastsLimit;

		if (length) {
			const box = document.getElementById(this.forecastsBox);
			box.innerHTML = '';
			box.insertAdjacentHTML('afterbegin', '<div class="forecasts">' + 
				this.forecast.forecasts.slice(0, limit).map(this.blockForecast, this).join('') + '</div>');
		}
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
		if (e.target.type === 'checkbox') {
			console.log(this.APPNAME, 'checkbox');
		}
	},

	/**
	 * handler on submit form
	 * e (Object) event
	 */
	onSubmitForm(e) {
		this.loadForecast(this.cityInput.value);
	},

	/**
	 * handler on click keep block
	 * e (Object) event
	 */
	onClickKeep(e) {
		if (e.target.nodeName === 'LI') {
    		this.loadForecast(e.target.textContent);
		}
	},

	/**
	 * Add app events
	 */
	addEvents() {
		const form = document.getElementById('form');         // form, city name for forecast
		const keep = document.getElementById('aside-inner');  // block, keeps favorites and history

		if (form && keep) {
	  		form.addEventListener('change', e => { Weather.onChangeForm(e); });
	  		form.addEventListener('submit', e => { e.preventDefault(); Weather.onSubmitForm(e); });
	  		keep.addEventListener('click', e => { Weather.onClickKeep(e); });
	  	} else {
	  		console.log('Weather app:', 'form or keep block not found on page.');
	  	}
	},
};

Object.setPrototypeOf(Keeper, Utils);
Object.setPrototypeOf(Weatherbit, Keeper);
Object.setPrototypeOf(Weather, Weatherbit);
Weather.setup();
