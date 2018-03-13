/**
 * Forecast Data Component
 * version 0.4
 * props
 *	valid
 *	isCelsius
 *	period
 *	forecast
 */
import Component    from '../../Component';
import DayForecast  from './dayforecast';
import weatherIcons from './weather-icons/*';

class ForecastData extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
	}

	render() {
		const { valid }     = this.props;
		const { isCelsius } = this.props;
		const { period }    = this.props;
		const forecasts     = this.props.forecast && this.props.forecast.data || null;

		if (valid) {
			if (forecasts) {
				this.container.id = 'forecasts';
				return forecasts.slice(0, period).map(data => DayForecast(data, isCelsius, weatherIcons)).join('');
			}
			return '';
		}

		this.container.id = 'forecast-error';
		return `<img src="${weatherIcons['forecast-error.png']}" alt="No forecast available"><div>No forecast available.</div>`;
	}
}

export default ForecastData;
