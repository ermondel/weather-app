/**
 * Keeper.js
 * version 1.1
 * format for storing information about the city (Object)
 *  - city_name
 *  - lon
 *  - timezone
 *  - lat
 *  - country_code
 *  - state_code
 *  - timestamp
 */
var Keeper = {
	KeeperAv     : null,  // local storage available?
	KeeperKey    : '',    // prefix for keys names (e.g. your app name)
	KeeperData   : 
	{
		'favorites'   : [],
		'history'     : [],
	},
	KeepCheckbox    : 'keep-checkbox',     // id of checkbox favorite
	KeepFavoriteBox : 'keep-favotite-box', // id of favorites box (the content is represented by a <ul> list)
	KeepHistoryBox  : 'keep-history-box',  // id of history box (the content is represented by a <ul> list)

	/**
	 * Init
	 * k (String) KeeperKey prefix for keys names
	 */
	initKeeper(k) {
		if (this.isKeeperAv()) {
			this.KeeperKey = k;
			this.loadKeeper('favorites');
			this.loadKeeper('history');
			this.displayAllKeep();
		}
	},

	/**
	 * Load from local storage to var
	 * type (String) favorites or history
	 */
	loadKeeper(type) {
		if (this.KeeperAv && this.KeeperData.hasOwnProperty(type)) {
			let data = localStorage.getItem(this.KeeperKey+'-'+type);
			if (data) {
				this.KeeperData[type] = JSON.parse(data);
			}
		}
	},

	/**
	 * Add city to local storage (favorites or history) if it is not there
	 * v (Object) city description in app native format
	 * type (String) favorites or history
	 */
	addToKeeper(v, type) {
		if (this.KeeperAv 
			&& 
			v 
			&& this.KeeperData.hasOwnProperty(type) &&
			v.city_name &&
			this.searchInKeeper(type, 'city_name', v.city_name) < 0) 
		{
			this.KeeperData[type].push(v);
			localStorage.setItem(this.KeeperKey+'-'+type, JSON.stringify(this.KeeperData[type]));
		}
	},

	// search by type (favorites or history)
	searchInKeeper(type, k, v, k2, v2) {
		if (this.KeeperData.hasOwnProperty(type) && k && v) for (let i = 0; i < this.KeeperData[type].length; i++) {
			const data = this.KeeperData[type][i];
			if (k2 && v2) {
				if (data.hasOwnProperty(k)  && 
					data.hasOwnProperty(k2) &&
					data[k].toLowerCase()  === v.toLowerCase()  &&
					data[k2].toLowerCase() === v2.toLowerCase()) return i;
			} else {
				if (data.hasOwnProperty(k)  && 
					data[k].toLowerCase()  === v.toLowerCase()) return i;
			}
			
		}
		return -1;
	},

	/**
	 * Toggle city in local storage (favorites only)
	 * v (Object) city description in app native format
	 */
	toggleFavorite(v) {
		if (this.KeeperAv && v && v.city_name) {
			const type = 'favorites';
			const pos  = this.searchInKeeper(type, 'city_name', v.city_name);
			
			if (pos >= 0) {
				this.KeeperData[type].splice(pos, 1);
				this.checkboxFavorite(false);
			} else {
				this.KeeperData[type].push(v);
				this.checkboxFavorite(true);
			}
			localStorage.setItem(this.KeeperKey+'-'+type, JSON.stringify(this.KeeperData[type]));
			this.displayKeep(type, this.toHtmlKeep(type));
		}
	},

	/**
	 * Set checkbox favorite to active state if city is in favorites
	 * v (Object) city description in app native format
	 */
	checkInFavoriteKeeper(v) {
		if (v && v.city_name) {
			if (this.searchInKeeper('favorites', 'city_name', v.city_name) >= 0) {
				this.checkboxFavorite(true);
				return true;
			}
		}
		return false;
	},

	/**
	 * Set the checked state of a checkbox favorite
	 * state (Boolean)
	 */
	checkboxFavorite(state) {
		const checkbox = document.getElementById(this.KeepCheckbox);
		if (checkbox) {
			checkbox.checked = state;
		} else {
			console.log('Keep:', 'checkbox favorite not found on page.');
		}
	},

	/**
	 * Convert favorites or history to html
	 * type (String) favorites or history
	 */
	toHtmlKeep(type) {
		if (this.KeeperData.hasOwnProperty(type) && this.KeeperData[type].length > 0) {
			let res = this.KeeperData[type].slice().reverse().map(function(obj) {
        		return '<li>'+ obj.city_name + '</li>';
    		});
    		return '<ul>' + res.join('') + '</ul>';
		}
		return '';
	},

	/**
	 * Display favorites or history on page
	 * type (String) favorites or history
	 * content (String) html
	 */
	displayKeep(type, content) {
		if (type === 'favorites') {
			const favoritesBox = document.getElementById(this.KeepFavoriteBox);
			if (favoritesBox) {
				favoritesBox.innerHTML = '';
				if (content) favoritesBox.insertAdjacentHTML('afterbegin', content);
			} else {
				console.log('Keep:', 'favorites box not found on page.');
			}
		}

		if (type === 'history') {
			const historyBox = document.getElementById(this.KeepHistoryBox);
			if (historyBox) {
				historyBox.innerHTML = '';
				if (content) historyBox.insertAdjacentHTML('afterbegin', content);
			} else {
				console.log('Keep:', 'history box not found on page.');
			}
		}
	},

	/**
	 * Display favorites and history on page
	 */
	displayAllKeep() {
		this.displayKeep('favorites', this.toHtmlKeep('favorites'));
		this.displayKeep('history', this.toHtmlKeep('history'));
	},

	/**
	 * Clear favorites or history in local storage and on the page
	 * type (String) favorites or history
	 */
	clearKeep(type) {
		if (this.KeeperAv && this.KeeperData.hasOwnProperty(type)) {
			localStorage.removeItem(this.KeeperKey+'-'+type);
			this.displayKeep(type, '');
		}
	},

	/**
	 * Clear favorites and history in local storage and on the page
	 */
	clearAllKeep() {
		this.clearKeep('favorites');
		this.clearKeep('history');
	},

	/**
	 * Is local storage available?
	 */
	isKeeperAv() {
		if (this.KeeperAv !== null) return this.KeeperAv;
		// from developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    	try {
        	var storage = window['localStorage'],
            x = '__storage_test__';
        	storage.setItem(x, x);
        	storage.removeItem(x);
        	this.KeeperAv = true;
        	return this.KeeperAv;
    	}
    	catch(e) {
    		console.log('Keep:', 'local storage not available.');
        	this.KeeperAv = e instanceof DOMException && (
            	e.code === 22 ||
            	e.code === 1014 ||
            	e.name === 'QuotaExceededError' ||
            	e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            	storage.length !== 0;
            return this.KeeperAv;
    	}
    	// /
	},
};
