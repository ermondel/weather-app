/**
 * SearchForm.js
 * version 0.28
 */
class SearchForm {
	constructor(props) {
		this.state = {
			valid: true,
		};
		this.props     = props;
		this.container = document.getElementById('header-inner');
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('change', this.handlerChange.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
	}

	handlerSubmit(e) {
		e.preventDefault();

		const city  = e.target.elements.city.value.trim();
		const valid = city.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ? true : false;

		this.updateState({ valid });
		this.props.onSubmit(valid ? city : '');
	}

	handlerChange(e) {
		if (e.target.type === 'radio') 
		{
			if (e.target.name === 'period') this.props.onChangePeriod(e.target.value);
			if (e.target.name === 'unit') this.props.onChangeUnit(e.target.value);
		}
	}
}

export default SearchForm;
