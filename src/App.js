/**
 * App.js
 * version 0.6
 */
import SearchForm from './components/SearchForm';
import ForecastHeader from './components/ForecastHeader';
import ForecastData from './components/ForecastData';
import { getForecast } from './utils/api';

class App {
	constructor() {
		this.state = {
			fhead: '',
			fdata: '',
		};
		this.appName    = 'weather-app';
		this.forecasts  = document.getElementById('main-inner');
		this.searchForm = new SearchForm({
			onSubmit: this.onSubmit.bind(this),
			onChangePeriod: this.onChangePeriod.bind(this),
			onChangeUnit: this.onChangeUnit.bind(this),
		});
		this.forecastHeader = new ForecastHeader({
			onAddFavorite: this.onAddFavorite.bind(this),
			onDelFavorite: this.onDelFavorite.bind(this),
		});
		this.forecastData   = new ForecastData({});
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.render();
	}

	render() {
		this.forecasts.innerHTML = '';
		if (this.state.fhead) this.forecasts.appendChild(this.state.fhead);
		if (this.state.fdata) this.forecasts.appendChild(this.state.fdata);
	}


	onSubmit(city) {
		if (city) {
			getForecast(city).then(data => {
				this.updateState({
					fhead: this.forecastHeader.updateState({ valid: true, data }),
					fdata: this.forecastData.updateState({ valid: true, data }),
				});
			}).catch(error => {
				this.updateState({
					fhead: this.forecastHeader.updateState({ valid: false }),
					fdata: this.forecastData.updateState({ valid: false }),
				});
			});
		} else {
			this.updateState({
				fhead: this.forecastHeader.updateState({ valid: false }),
				fdata: this.forecastData.updateState({ valid: false }),
			});
		}
	}

	onChangePeriod(period) {
		this.updateState({
			fhead: this.forecastHeader.updateState({}),
			fdata: this.forecastData.updateState({ period }),
		});
	}

	onChangeUnit(unit) {
		this.updateState({
			fhead: this.forecastHeader.updateState({}),
			fdata: this.forecastData.updateState({ unit }),
		});
	}

	onAddFavorite(city) {
		console.log(this.appName, 'add to favorite');
	}

	onDelFavorite(city) {
		console.log(this.appName, 'remove from favorite');
	}
}

export default App;
