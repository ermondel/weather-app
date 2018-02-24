/**
 * Favorites (in local storage)
 * version 2.2
 */
class Favorites {
	constructor (prefix, limit = 15) {
		this.prefix      = prefix;
		this.limit       = limit;
		this.container   = document.getElementById('favorites');
		this.clearAllBtn = document.getElementById('favorites-clear-all');
		this.value       = '';

		const data   = localStorage.getItem(this.prefix+'-favorites');
		this.storage = data ? JSON.parse(data) : [];

		this.render();
	}

	render() {
		if (this.storage.length > 0) {

			this.container.innerHTML  = '<ul>' + this.storage.slice().reverse().map(value => {
				return `<li>${value}</li>`;
			}).join('') + '</ul>';
			this.clearAllBtn.disabled = false;

		} else {

			this.container.innerHTML  = '';
			this.clearAllBtn.disabled = true;

		}
	}

	check(value) {
		this.value = value || this.value;

		if (this.value) {
			const checkbox = document.getElementById('favorite');
			if (checkbox) checkbox.checked  = (this.storage.indexOf(this.value) < 0) ? false : true;
		}
	}

	toggle() {
		if (!this.value) return;

		const pos = this.storage.indexOf(this.value);
		if (pos < 0) {
			this.storage.push(this.value);
		} else {
			this.storage.splice(pos, 1);
		}

		this.render();
	}

	unload() {
		localStorage.setItem(this.prefix+'-favorites', JSON.stringify(this.storage.slice(-this.limit)));
	}

	clear() {
		const checkbox = document.getElementById('favorite');
		if (checkbox) checkbox.checked = false;
		this.storage = [];
		this.render();
	}
}

export default Favorites;
