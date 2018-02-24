/**
 * API (weatherbit)
 * version 0.5
 */
const API_KEY  = '351954d3a30a4b60ad716f1c73cc43ee';
const BASE_URL = 'api.weatherbit.io/v2.0/forecast/daily';

const get = query => {
	const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
	const url = `${protocol}${BASE_URL}?key=${API_KEY}&lang=en&units=M&days=16${query}`;
	// const url = 'http://localhost:8080/tsttmp/myjson/weather-app/daily.json';

	return fetch(url).then(response => {
		if (response.status == 200) {
			return response.json();
		}

		throw new Error('No forecast available.');
	});
};

export const getForecast = city => get(`&city=${city}`);
