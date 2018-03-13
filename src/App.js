/**
 * App
 * version 0.4
 */
import Component             from './component';
import SearchFormComponent   from './components/search.form.component';
import ForecastHostComponent from './components/forecast/forecast.host.component';
import { getForecast }       from './api';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			city: '',
			period: 3,
			isCelsius: true,
			forecast: {},
			valid: true,
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
	}

	init() {
		this.updateState();
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
		console.log('my', 'city add to favorite:', city);
	}

	onDelFavorite(city) {
		console.log('my', 'city del from favorite:', city);
	}

	forecast(city) {
		getForecast(city).then(forecast => {
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
		
		return [
			this.searchForm.update({ city, period, isCelsius }),
			this.forecastHost.update({ city, period, isCelsius, valid, forecast, favorite: false }),
		];
	}
}

export default App;
