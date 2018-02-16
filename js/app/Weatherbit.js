/**
 * Weatherbit.js
 * version 0.24
 */
var Weatherbit = {
	WeatherbitURL: 'api.weatherbit.io/v2.0/forecast/daily',  // request URL
	WeatherbitKey: '351954d3a30a4b60ad716f1c73cc43ee',       // request query string

	/**
	 * Request Weatherbit 16 day weather forecast API (1 day interval) for city.
	 * Options: language English, units Metric (Celcius, m/s, mm), days 16.
	 * Params:
	 *  city (String or null)
	 *  lat (Number) (require lon) Latitude (Degrees).
	 *  lon (Number) (require lat) Longitude (Degrees).
	 * examples:
	 *  ('kiev')
	 *  ('lviv')
	 *  (null, 38.123, -78.543))
	 *  (null, 123.77, 456.122)
	 * return (String) URL
	 */
	getWeatherbitURL(city, lat, lon) {
		if (city || (lat && lon)) {
    		return (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + 
    			this.WeatherbitURL + 
    			'?key=' + this.WeatherbitKey + 
    			'&lang=en&units=M&days=16' + (city ? '&city=' + city : '&lat=' + lat + '&lon=' + lon);
    	} else {
    		return '';
    	}
	},

	/**
 	 * Convert Weatherbit forecast response to app format
 	 * Params:
 	 *  response (Object)
 	 *  CtoF (Function) celsius to fahrenheit
 	 * return (Object)
 	 */
	convertWeatherbit(response, CtoF) {
		if (response && response.data && response.data.length > 0) {
			//
			let forecasts = [];
			for (const forecast of response.data) {
				// Weatherbit icons to app icons
				let icon = '';
				if ('c01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-01';
				if ('c03d,c02d,c02d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-02';
				if ('c04d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-03';
				if ('a06d,a05d,a04d,a03d,a02d,a01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-04';
				if ('u00d,r06d,r05d,r04d,f01d,r03d,r02d,r01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-05';
				if ('t05d,t04d,t04d,t04d,t03d,t02d,t01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-06';
				if ('s06d,s02d,s01d,s05d,s05d,s04d,s03d,s02d,s01d,d03d,d02d,d01d'.indexOf(forecast.weather.icon) >= 0) icon = 'ico-07';
				// Weatherbit forecast to app forecast
				forecasts.push({
					timestamp:      forecast.ts,                   // Timestamp (Unix Timestamp).
					description:    forecast.weather.description,  // Text weather description.
					pres:           forecast.pres,                 // Average pressure (mb).
					humidity:       forecast.rh,                   // Average relative humidity (%).
					wind_direction: forecast.wind_cdir_full,       // Verbal wind direction.
					wind_speed:     forecast.wind_spd,             // Wind speed (Default m/s).
					temp_avg_c:     forecast.temp,                 // Average Temperature (default Celcius).
					temp_max_app_c: forecast.app_max_temp,         // Apparent/"Feels Like" temperature at max_temp time (default Celcius). 
					temp_min_app_c: forecast.app_min_temp,         // Apparent/"Feels Like" temperature at min_temp time (default Celcius). 
					temp_avg_f:     CtoF(forecast.temp),          // convert celsius to fahrenheit.
					temp_max_app_f: CtoF(forecast.app_max_temp),  // convert celsius to fahrenheit.
					temp_min_app_f: CtoF(forecast.app_min_temp),  // convert celsius to fahrenheit.
					icon:           icon,                          // app weather icon (see above).
				});
			}
			// Weatherbit city description to app city description
			return {
				city_name:    response.city_name,             // City name.
				country_code: response.country_code,          // Country abbreviation.
 				state_code:   response.state_code,            // State abbreviation/code.
 				lon:          response.lon,                   // Longitude (Degrees).
 				lat:          response.lat,                   // Latitude (Degrees).
 				timezone:     response.timezone,              // Local IANA Timezone.
 				timestamp:    Math.floor(Date.now() / 1000),  // Current timestamp (Unix Timestamp).
 				forecasts:    forecasts                       // app forecast (see above).
			};
		}
		return {};
	}
};