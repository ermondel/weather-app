/**
 * Forecast Host Component
 * version 0.4
 * @ ForecastData props valid, isCelsius, period, forecast
 * @ ForecastHeader props valid, city, favorite, onAddFavorite, onDelFavorite
 */
import Component from '../../Component';
import ForecastDataComponent from './forecast.data.component';
import ForecastHeaderComponent from './forecast.header.component';

class ForecastHost extends Component {
	constructor(props) {
		super(props);

		this.inner     = document.createElement('div');
		this.inner.id  = 'main-inner';
		this.container    = document.createElement('main');
		this.container.id = 'main';
		this.forecastData   = new ForecastDataComponent(props);
		this.forecastHeader = new ForecastHeaderComponent(props);
	}

	render() {
		return [
			this.forecastHeader.update(this.props),
			this.forecastData.update(this.props),
		];
	}
}

export default ForecastHost;
