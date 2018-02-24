/**
 * Forecast view
 * version 0.6
 */
const ico01 = require('./weather-icons/ico-01.png');
const ico02 = require('./weather-icons/ico-02.png');
const ico03 = require('./weather-icons/ico-03.png');
const ico04 = require('./weather-icons/ico-04.png');
const ico05 = require('./weather-icons/ico-05.png');
const ico06 = require('./weather-icons/ico-06.png');
const ico07 = require('./weather-icons/ico-07.png');
const icoerror = require('./weather-icons/forecast-error.png');

class ForecastView {
	constructor() {
		this.period    = 3;
		this.unit      = 'celsius';
		this.container = document.getElementById('main-inner');
		this.storage   = {};

		this.state = {
			isValid: true,
		};
	}

	updateState(nextState) {
		this.state = nextState;
	}

	render() {
		const {isValid} = this.state;
		
		if (isValid)
		{
			this.__renderStorage();
		} else 
		{
			this.container.innerHTML = `<div id="forecast-error">
			<img src="${icoerror}" alt="No forecast available"><div>No forecast available.</div></div>`;
		}
	}

	__renderStorage() {
		if (this.storage.data && this.storage.data.length > 0)
		{
			const forecasts = this.storage.data.slice(0, this.period).map(this.__renderDay, this).join('');

			this.container.innerHTML = `
			<div id="forecast-header">
				<label><input type="checkbox" name="favorite" id="favorite">
				<span><span>favorite city</span></span></label>
				<h1>${this.storage.city_name}</h1>
			</div>
			<div id="forecasts">${forecasts}</div>`;
		}
	}

	__renderDay(data) {
		// unit
		const temp_avg = this.unit === 'fahrenheit' ? (data.temp     * 9/5 + 32).toFixed(2) + '°F' : data.temp     + '°C';
		const temp_max = this.unit === 'fahrenheit' ? (data.max_temp * 9/5 + 32).toFixed(2) + '°F' : data.max_temp + '°C';
		const temp_min = this.unit === 'fahrenheit' ? (data.min_temp * 9/5 + 32).toFixed(2) + '°F' : data.min_temp + '°C';

		// weather icon
		let icon = data.weather.icon;
		if ('c01d'.indexOf(icon) >= 0) icon = ico01;
		if ('c04d'.indexOf(icon) >= 0) icon = ico03;
		if ('c03d,c02d,c02d'.indexOf(icon) >= 0) icon = ico02;
		if ('a06d,a05d,a04d,a03d,a02d,a01d'.indexOf(icon) >= 0) icon = ico04;
		if ('t05d,t04d,t04d,t04d,t03d,t02d,t01d'.indexOf(icon) >= 0) icon = ico06;
		if ('u00d,r06d,r05d,r04d,f01d,r03d,r02d,r01d'.indexOf(icon) >= 0) icon = ico05;
		if ('s06d,s02d,s01d,s05d,s05d,s04d,s03d,s02d,s01d,d03d,d02d,d01d'.indexOf(icon) >= 0) icon = ico07;

		// 
		return `
		<div class="forecast">
			<div class="forecast-date">${this.__date(data.ts)}</div>
			<div class="forecast-description">${data.weather.description}</div>
			<div class="forecast-img"><img src="${icon}" alt="${data.weather.description}"></div>
			<div class="forecast-temp-avg">${temp_avg}</div>
			<div class="forecast-max-temp-app fl">Maximum temperature <span class="fv">${temp_max}</span></div>
			<div class="forecast-min-temp-app fl">Minimum temperature <span class="fv">${temp_min}</span></div>
			<div class="forecast-pres fl">Pressure <span class="fv">${data.pres} mb</span></div>
			<div class="forecast-rh fl">Humidity <span class="fv">${data.rh} %</span></div>
			<div class="forecast-wind_spd fl">Wind <span class="fv">${data.wind_cdir_full}, ${data.wind_spd} m/s</span></div>
		</div>`;
	}

	__date(timestamp) {
		const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		const date = new Date(timestamp*1000);
		return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
	}
}

export default ForecastView;
