const search = document.querySelector('input');
const searchButton = document.getElementById('search-btn');

const bindUI = () => {
	console.log('binding UI elements...');
	searchButton.onclick = newForecast;
	//searchButton.onclick = newGif;
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
			'https://api.openweathermap.org/data/2.5/forecast?q=Reno,US-NV&appid=405733970ac0db55db2eee452eedd6af',
			{
				mode: 'cors',
			}
		);

		const searchData = await response.json();
		console.log(searchData);
	} catch (error) {
		console.log('Error: ' + error);
	}
}

const init = (() => {
	bindUI();
})();
