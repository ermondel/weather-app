/**
 * Weather.js
 * version 0.2
 */
var Weather = {
	APPNAME   : 'Weather app',  // app name
	cityInput : 'city',         // input, city name

	/**
	 * setup
	 */
	setup() {
		this.cityInput = document.getElementById(this.cityInput) || '';
		this.addEvents();
	},

	/**
	 * handler on change form
	 * e (Object) event
	 */
	onChangeForm(e) {
		if (e.target.type === 'radio') {
			if (e.target.name === 'period') console.log(this.APPNAME, 'change period:', e.target.value);
			if (e.target.name === 'unit') console.log(this.APPNAME, 'change unit:', e.target.value);
		}
		if (e.target.type === 'checkbox') {
			console.log(this.APPNAME, 'checkbox');
		}
	},

	/**
	 * handler on submit form
	 * e (Object) event
	 */
	onSubmitForm(e) {
		// get value
		if (this.cityInput && this.cityInput.value) {
			console.log(this.APPNAME, 'submit ...', this.cityInput.value);
		}
	},

	/**
	 * handler on click keep block
	 * e (Object) event
	 */
	onClickKeep(e) {
		// get value
		if (e.target.nodeName === 'LI') {
    		console.log(this.APPNAME, 'LI click ...', e.target.textContent);
		}
	},

	/**
	 * Add app events
	 */
	addEvents() {
		const form = document.getElementById('form');         // form, city name for forecast
		const keep = document.getElementById('aside-inner');  // block, keeps favorites and history

		if (form && keep) {
	  		form.addEventListener('change', e => { Weather.onChangeForm(e); });
	  		form.addEventListener('submit', e => { e.preventDefault(); Weather.onSubmitForm(e); });
	  		keep.addEventListener('click', e => { Weather.onClickKeep(e); });
	  	} else {
	  		console.log('Weather app:', 'form or keep block not found on page.');
	  	}
	},
};

Weather.setup();
