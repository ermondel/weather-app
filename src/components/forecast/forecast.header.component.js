/**
 * Forecast Header Component
 * version 0.2
 * props
 *	valid
 *	city
 *	favorite
 *	onAddFavorite
 *	onDelFavorite
 */
import Component    from '../../Component';

class ForecastHeader extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'forecast-header';
		this.container.addEventListener('change', this.handleChange.bind(this));
	}

	handleChange(e) {
		const city = this.props.city || '';

		if (city) 
		{
			 e.target.checked && this.props.onAddFavorite(city);
			!e.target.checked && this.props.onDelFavorite(city);
		}
	}

	render() {
		const { valid } = this.props;
		const city      = this.props.city || '';
		const favorite  = this.props.favorite || false;

		if (valid && city) {
			return `
			<label><input type="checkbox" name="favorite" id="favorite"${(favorite ? ' checked' : '')}>
			<span><span>favorite city</span></span></label>
			<h1>${(city.charAt(0).toUpperCase() + city.slice(1))}</h1>`;
		}
		return '';
	}
}

export default ForecastHeader;
