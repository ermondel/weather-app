/**
 * Utils.js
 * version 0.91
 */
var Utils = {
	/**
 	 * Validate city name
 	 * city_name (String)
 	 * return (Boolean)
 	 */
	isCityName(city_name) {
		return city_name.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ? true : false;
	},

	/**
 	 * Convert celsius to fahrenheit
 	 * two decimal places
 	 * celsius (Number)
 	 * return (String)
 	 */
	celsiusToFahrenheit(celsius) {
		return (celsius * 9/5 + 32).toFixed(2);
	},

	/**
 	 * Format date
 	 *  from: 1518755348
 	 *  to: 08 February 2018
 	 * timestamp (String) Unix timestamp
 	 * return (String)
 	 */
	NMonYDate(timestamp) {
		if (!timestamp) return '';
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const date = new Date(timestamp*1000);
		return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
	},
};