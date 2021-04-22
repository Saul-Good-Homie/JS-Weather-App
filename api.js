const search = document.querySelector('input');
const stateDropdown = document.getElementById('state');
const searchButton = document.getElementById('search-btn');
const img = document.querySelector('img');

String.prototype.toProperCase = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

const bindUI = () => {
	console.log('binding UI elements...');
	searchButton.onclick = newForecast;
	//searchButton.onclick = newGif;
};

const todaysDate = () => {
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	const dateBox = document.querySelector('.date-box');
	dateBox.innerHTML = `Today's Date is: ` + today;
};

async function newGif(gif) {
	console.log('fetching new gif!');
	console.log(gif);
	try {
		const response = await fetch(
			'https://api.giphy.com/v1/gifs/translate?api_key=THmZa3qvhYxe7TGMuVLi2iuvEaH7mYFt&s=' +
				gif,
			{
				mode: 'cors',
			}
		);
		const searchData = await response.json();
		img.src = searchData.data.images.original.url;
	} catch (error) {
		console.log('Error: ' + error);
	}
}

async function newForecast() {
	let city = search.value;
	let state = stateDropdown.value;
	console.log('fetching new forecast!');
	try {
		const response = await fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				',' +
				state +
				'&units=imperial&appid=405733970ac0db55db2eee452eedd6af',
			{
				mode: 'cors',
			}
		);

		const searchData = await response.json();

		//update display with current weather temperature
		currentTemp = searchData.main.temp;
		const tempBox = document.querySelector('.temp-left');
		tempBox.innerHTML = currentTemp;

		//update weather description
		currentWeather = searchData.weather[0].description;
		const rightBox = document.querySelector('.right-box');
		currentWeather = currentWeather.toProperCase();
		rightBox.innerHTML = currentWeather;

		//update weather description

		const unitBox = document.querySelector('.temp-right');
		unitBox.innerHTML = 'F';

		//console.log(currentWeather);
		console.log(searchData);
		search.value = '';

		//load random citygif
		newGif(city);
	} catch (error) {
		console.log('Error: ' + error);
	}
}

const init = (() => {
	bindUI();
	todaysDate();
})();
