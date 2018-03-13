/**
 * App
 * version 0.8
 */
import Component        from './component';
import { getForecast }  from './api';
import SearchFormComponent    from './components/search/search.form.component';
import ForecastHostComponent  from './components/forecast/forecast.host.component';
import StorageHostComponent   from './components/storage/storage.host.component';
import { cityFromLoc, cityToLoc }  from './utils';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			city      : '',
			period    : 3,
			isCelsius : true,
			forecast  : {},
			valid     : true,
			favorites : ['lviv', 'san francisco', 'san diego'],
			history   : ['lviv', 'san francisco', 'san diego'],
		};

		this.container = this.props.container;

		this.searchForm = new SearchFormComponent({
			onSubmit       : this.onSubmit.bind(this),
			onChangePeriod : this.onChangePeriod.bind(this),
			onChangeUnit   : this.onChangeUnit.bind(this),
			city           : this.state.city,
			period         : this.state.period,
			isCelsius      : this.state.isCelsius,
		});
		this.forecastHost = new ForecastHostComponent({
			valid          : this.state.valid,
			isCelsius      : this.state.isCelsius,
			forecast       : this.state.forecast,
			onAddFavorite  : this.onAddFavorite.bind(this),
			onDelFavorite  : this.onDelFavorite.bind(this),
		});
		this.storageHost = new StorageHostComponent({
			favorites      : this.state.favorites,
			history        : this.state.history,
			onClickStorage : this.onClickStorage.bind(this),
			onDelFavorite  : this.onDelFavorite.bind(this),
			onDelHistory   : this.onDelHistory.bind(this),
		});
	}

	init() {
		const city = cityFromLoc();
		city ? this.forecast(city) : this.updateState();
	}

	onSubmit(city) {
		this.forecast(city);
	}

	onChangePeriod(period) {
		this.updateState({ period });
	}

	onChangeUnit(val) {
		const isCelsius = val === 'celsius' ? true : false;
		this.updateState({ isCelsius });
	}

	onAddFavorite(city) {
		const { favorites } = this.state;

		favorites.indexOf(city) < 0 && favorites.unshift(city);

		this.updateState({ favorites });
	}

	onDelFavorite(city) {
		let { favorites } = this.state;

		if (city) {
			const pos = favorites.indexOf(city);
			if (pos >= 0) favorites.splice(pos, 1);
		} else {
			favorites = [];
		}

		this.updateState({ favorites });
	}

	onDelHistory() {
		this.updateState({ history: [] });
	}

	onClickStorage(city) {
		this.forecast(city);
	}

	forecast(city) {
		getForecast(city).then(forecast => {
			cityToLoc(city, `Forecast for ${city}`);
			this.updateState({ valid: true, city, forecast });
		}).catch(error => {
			this.updateState({ valid: false, city});
		});
	}

	render() {
		const { city }      = this.state;
		const { period }    = this.state;
		const { isCelsius } = this.state;
		const { valid }     = this.state;
		const { forecast }  = this.state;
		const { favorites } = this.state;
		const { history }   = this.state;
		const favorite      = !!(favorites.indexOf(city)+1);

		return [
			this.searchForm.update({ city, period, isCelsius }),
			this.forecastHost.update({ city, period, isCelsius, valid, forecast, favorite }),
			this.storageHost.update({ favorites, history }),
		];
	}
}

export default App;
