/**
 * History (in local storage)
 * version 1.2
 */
class History {
	constructor(prefix, limit = 20) {
		this.prefix      = prefix;
		this.limit       = limit;
		this.container   = document.getElementById('history');
		this.clearAllBtn = document.getElementById('history-clear-all');

		const data   = localStorage.getItem(this.prefix+'-history');
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

	add(value) {
		if (value) {

			if (this.storage.indexOf(value) < 0) {
				this.storage.push(value);
				this.render();
			}

		}
	}

	unload() {
		localStorage.setItem(this.prefix+'-history', JSON.stringify(this.storage.slice(-this.limit)));
	}

	clear() {
		this.storage = [];
		this.render();
	}
}

export default History;
