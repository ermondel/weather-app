/**
 * App
 * version 0.5
 */
import { getForecast } from './utils/api';
import ForecastView from './components/ForecastView';
import Favorites from './components/Favorites';
import History from './components/History';

class App {
	constructor() {
		document.getElementById('header-inner').addEventListener('submit', e => e.preventDefault());       // search form prevent default
		document.getElementById('header-inner').addEventListener('change', this.searchChange.bind(this));  // search form (for forecast query)
		document.getElementById('main-inner').addEventListener('change', this.mainChange.bind(this));      // block for forecasts display
		document.getElementById('aside-inner').addEventListener('click', this.asideChange.bind(this));     // block for favorites and history
		window.addEventListener('unload', this.handleUnload.bind(this));                                   // unload favorites and history

		this.forecast  = new ForecastView();
		this.favorites = new Favorites('weather-app');
		this.history   = new History('weather-app');
	}

	// forecast query or change count/units forecasts display
	searchChange(e) {
		if (e.target.type === 'text') this.displayForecast(e.target.value.trim());
		if (e.target.type === 'radio') 
		{
			if (e.target.name === 'period') {
				this.forecast.period = e.target.value;
				this.forecast.render();
				this.favorites.check();
			}
			if (e.target.name === 'unit') {
				this.forecast.unit = e.target.value;
				this.forecast.render();
				this.favorites.check();
			}
		}
	}

	// checkbox for add to favorites in block for forecasts display
	mainChange(e) {
		if (e.target.type === 'checkbox' && e.target.name === 'favorite') this.favorites.toggle();
	}

	// favorites and history
	asideChange(e) {
		if (e.target.nodeName === 'LI') 
		{
			this.displayForecast(e.target.textContent);
		}
		if (e.target.nodeName === 'BUTTON') 
		{
			if (e.target.name === 'favoritesClearAll') this.favorites.clear();
			if (e.target.name === 'historyClearAll') this.history.clear();
		}
	}

	// unload favorites and history
	handleUnload(e) {
		this.favorites.unload();
		this.history.unload();
	}

	displayForecast(city) {
		if (city.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ) 
		{
			getForecast(city).then(data => {
				this.forecast.updateState({isValid: true});
				this.forecast.storage = data;
				this.forecast.render();
				this.history.add(data.city_name);
				this.favorites.check(data.city_name);
			}).catch(error => {
				this.forecast.updateState({isValid: false});
            	this.forecast.render();
			});
		} else {
			this.forecast.updateState({isValid: false});
			this.forecast.render();
		}
	}
}

export default App;
