const search = document.querySelector('input');
const searchButton = document.getElementById('search-btn');

const bindUI = () => {
	console.log('binding UI elements...');
	searchButton.onclick = newForecast;
};

const searchLocation = () => {
	let searchTerm = search.value;
	console.log(searchTerm);
	search.value = '';
};

async function newForecast() {
	console.log('fetching new forecast!');
	try {
		const response = await fetch(
			'api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=standard&cnt=7&appid=405733970ac0db55db2eee452eedd6af',
			{
				mode: 'cors',
			}
		);

		console.log(response);
		// const searchData = await response.json();
		// console.log(searchData);
	} catch (error) {
		console.log('Error: ' + error);
	}
}

const init = (() => {
	bindUI();
})();
