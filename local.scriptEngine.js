



$(document).ready(function() {
// =============== Styling Scripts ===============
	//set footer height eqaul to #mainWrapper height on desktop view;

	// if(window.outerWidth >= 1024) {
	// 	var starth = $('#mainWrapper').outerHeight();
	// 	$('footer').css('min-height', starth + 4);
	// }

	$('#nav-icon3').click(function() {
		$(this).toggleClass('open');
		// $('#navBar').toggleClass('active');
		$('#navBar').slideToggle(100);
	});
			
	$('.openDownArrow').click(function() {
		$(this).siblings().slideToggle(100);
		$(this).parent().toggleClass('active');
		$(this).toggleClass('open');
		 
	});

	// $('.mainFooterLink').hover(function() {
	// 	$(this).toggleClass('active');
	// 	$(this).children().slideToggle(100);
	// });

	$('#weeklyHeading').click(function() {
		$('#forcastCredit').toggleClass('inactive');
		$('#weeklyForcast').toggleClass('inactive');
		$('#dailyForcast').toggleClass('inactive');
		$('#weatherForcastOuter').toggleClass('hidden');
		$('.weatherClose').toggleClass('inactive');
	});

	getWeatherData();
});// End Ready Function

function getWeatherData() {
	//Ajax request for weather data
	// -- Google Api request for lat/long from street address
	//Google API Key -- AIzaSyCcZ046FfroKCYLoKU1WreKXgAt9AVXGiw --- remove this line before uploading
	$.get('https://maps.googleapis.com/maps/api/geocode/json?address=2633+Camino+Ramon,+San+Ramon,+CA&key=AIzaSyCcZ046FfroKCYLoKU1WreKXgAt9AVXGiw', function(data) {
		
		var lat = data.results[0].geometry.location.lat , lng = data.results[0].geometry.location.lng;
		// console.log(lat);
		// console.log(lng);

		
		//Ajax request to forecast.io api
		$.ajax({
			url: "https://api.forecast.io/forecast/9fee182fc07504729932ea13a3a595b0/" + lat + ',' + lng,
			dataType: 'jsonp'
		}).error(function(err) {
			console.log(err.statusText);
			//Close weather div if request fails
			$("#weatherForcastOuter").toggleClass('inactive');
			
		//Build Weather Divs for 7 Day Forcast
		}).success(function(data) {
			console.log(data);

			//Div for current conditions
			var currentConditions = document.getElementById('currentConditions');
			currentConditions.innerHTML = '<h4>Currently</h4>';
			currentConditions.innerHTML += '<h2>' + skyConditions(data.currently.icon) + ' &amp ' + Math.round(data.currently.temperature) + "&deg</h2>";

			//7 Day Forcast divs for each day
			data.daily.data.forEach(function(e, i) {


				var dailyData = document.createElement('div');
				

				dailyData.innerHTML = '<h4>' + formatDate(Date.now() + (86400000 * i)) + '</h4>';
				dailyData.innerHTML += '<h4 class="weather-icon">' + getIcon(e.icon) + '</h4>';
				dailyData.innerHTML += '<h4>' + Math.round(e.temperatureMax) + '</h4>';
				dailyData.innerHTML += '<h4>' + Math.round(e.temperatureMin) + '</h4>';

				dailyData.className = 'dailyData';
				document.getElementById('weeklyForcast').appendChild(dailyData);

			});

		});
	});
}

function skyConditions(data) {
	switch (data) {
		case 'clear-night':
			return 'Clear';
		case 'rain':
			return 'Raining';
		case 'snow':
			return 'Snowing';
		case 'sleet':
			return 'Sleeting';
		case 'wind':
			return 'Windy';
		case 'fog':
			return 'Foggy';
		case 'cloudy':
			return 'Cloudy';
		case 'partly-cloudy-day':
		case 'partly-cloudy-night':
			return 'Partly Cloudy';
		default:
			return 'Sunny';
	}
}

function getIcon(data) {
	switch (data) {
		case 'clear-night':
			return 'C';
		case 'rain':
			return 'R';
		case 'snow':
			return 'W';
		case 'sleet':
			return 'X';
		case 'wind':
			return 'F';
		case 'fog':
			return 'M';
		case 'cloudy':
			return 'N';
		case 'partly-cloudy-day':
			return 'H'
		case 'partly-cloudy-night':
			return 'I';
		default:
			return 'B';

	}
}


function formatDate(unixTime) {
	var days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];

	return days[new Date(unixTime).getDay()];
}

//change divs to equal footer height
// 	setTimeout(function() {
			// 	var h = $('footer').outerHeight();
			// 	$('#mainWrapper').css('min-height', h); 
			// 	console.log(h);
			// }, 100);

	 



 
