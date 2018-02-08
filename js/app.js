/*
const searchForm = document.getElementById('search-form');
const searchLoc  = document.getElementById('search-loc');

searchForm.addEventListener('submit', function(e) {
	e.preventDefault();
	// console.log(searchLoc.value);

    // параметры запроса на сервер
    // возможно стоит вынести в настроечную КОНСТАНТУ
	const queryString = [
		'city='+searchLoc.value,
		'key=351954d3a30a4b60ad716f1c73cc43ee'
	];
	// console.log(`http://api.weatherbit.io/v2.0/forecast/3hourly?${queryString.join('&')}`);

	fetch(`http://api.weatherbit.io/v2.0/forecast/daily?${queryString.join('&')}`)
	.then(response => response.json())
	.then(requestSuccess)
	.catch(e => requestError(e));
});

function requestSuccess(data) {
	console.log(data);
}

function requestError(e) {
	console.log(e);
}
*/
// console.log(searchForm);
