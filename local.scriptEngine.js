
 
// ============== Use this file as a reference ============== 
// All procuction code has been converted with uglify.js and linked to as local.scriptEngine.min.js


 $(document).ready(function() {
// =============== Styling Scripts ===============

$('td').children('img').css('max-width', '100%');


        

	$('#nav-icon3').click(function() {
		$(this).toggleClass('open');
		// $('#navBar').toggleClass('active');
		$('#navBar').slideToggle(100);
	});

	$('.mainFooterLink').click(function() {
		$(this).toggleClass('active');
		$(this).children('.footerHiddenInfo').slideToggle(100);
		$(this).children('.openDownArrow').toggleClass('open');
	});

        $('.footerHiddenInfoItems').click(function(e) {
                 e.stopPropagation();
        });

	$('#weeklyHeading').click(function() {
		$('#forcastCredit').toggleClass('inactive');
		$('#weeklyForcast').toggleClass('inactive');
		$('#dailyForcast').toggleClass('inactive');
		$('#weatherForcastOuter').toggleClass('hidden');
		$('.weatherClose').toggleClass('inactive');
	});

 // =============== API Calls ===============	

	getWeatherData();

});// End Ready Function


 // =============== Weather Data Function Used for Ajax Call on Load Event ===============	
function getWeatherData() {
	
	// -- Google Api request for lat/long from street address
	//Google API Key -- AIzaSyCcZ046FfroKCYLoKU1WreKXgAt9AVXGiw --- remove this line before uploading if not using min.js file
	var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=2633+Camino+Ramon,+San+Ramon,+CA&';
	var forecastUrl = "https://api.forecast.io/forecast/";
	var gK = revs('wiGXV','A9','tAgXKe','rW1UKoLY','CKorfF','640ZcCyS','azIA');
	var fK = revs('0b595a','3a31ae239927405','70cf281eef9');
	$.get(convert(googleUrl, gK, true, [107,101,121,61]), function(data) {

		//Check google response status
		console.log(data.status);
		//If nothing returned close weather div and stop request
		if(data.status !== "OK") {
			$("#weatherForcastOuter").toggleClass('inactive');
			return null;
		}
		
		console.log("Response Data: " + data.results);
		var lat = data.results[0].geometry.location.lat , lng = data.results[0].geometry.location.lng;
		console.log(lat);
		console.log(lng);

		
		//Ajax request to forecast.io api
		$.ajax({
			url:  convert(forecastUrl, fK) + '/' + lat + ',' + lng,
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
				dailyData.innerHTML += '<h4> <i class="wi wi-forecast-io-' + e.icon + '"></i></h4>';
				dailyData.innerHTML += '<h4>' + Math.round(e.temperatureMax) + '</h4>';
				dailyData.innerHTML += '<h4>' + Math.round(e.temperatureMin) + '</h4>';

				dailyData.className = 'dailyData';
				document.getElementById('weeklyForcast').appendChild(dailyData);

			});
		});
		//If goole Ajax Fails
	}).fail(function(err) {
		console.log(err.statusText);
		//Close weather div if request fails
		$("#weatherForcastOuter").toggleClass('inactive');
	});
}


 // =============== Helper Functions ===============	

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

//Used to get correct icon from meteocons.
	//Not currently used...switched to cdn weather icons

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

//Used to change input styles in results table
function changeButtonColors(textColor, backgroundColor) {
	var buttons = document.querySelectorAll('input[type=button]');

	for(var i = 0; i < buttons.length; i++) {
		buttons[i].style.color = textColor;
		buttons[i].style.backgroundColor = backgroundColor;
	}
}


// Followung two functions are used to mask the api keys to google maps and forecast.io
	//code purposely convoluded to make it harder to decipher
function revs() {
	var tagString = '';
	for(var i = 0; i < arguments.length; i++) {
		tagString += arguments[i];
		
	}
	var tagArr = tagString.split('').reverse();
	return tagArr.map(function(e) {
		var eCode = e.charCodeAt(0);
		
		return (eCode +13).toString(2);
			
	}).join('/'); 	
}

function convert(url, nums, query,kCodeNums) {
 	var k = '';
 	if(query && kCodeNums) k = (function() {
 		var c = '';
 		for (var i = 0; i < kCodeNums.length; i++) {
 			c += String.fromCharCode(kCodeNums[i]);
 		}
 		return c;
 	}());
	return url + k + nums.split('/').map(function(e) {
		var bin = 1, dec=0, x;
		for(var i = e.length-1; i >=0; i--) {
			dec += e[i] * bin;
			bin *= 2;
		}
		return String.fromCharCode(parseInt(dec-13));
		
	}).join("");
}

function reverseIt(str) {
	return str.split('').reverse().join("");;
}


//console.log(revs('https://maps.googleapis.com/maps/api/geocode/json?address=2633+Camino+Ramon,+San+Ramon,+CA&', convert('wiGXV','A9','tAgXKe','rW1UKoLY','CKorfF','640ZcCyS','azIA'), true, [107,101,121,61])); 


/* ============= Pulled Code. Replaced with minized version in production=================
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
				dailyData.innerHTML += '<h4> <i class="wi wi-forecast-io-' + e.icon + '"></i></h4>';
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
	var days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

	return days[new Date(unixTime).getDay()];
}

*/
 
