
//Google API Key -- AIzaSyCcZ046FfroKCYLoKU1WreKXgAt9AVXGiw


$(document).ready(function() {
// =============== Styling Scripts ===============
	$('#nav-icon3').click(function() {
		$(this).toggleClass('open');
		$('#navBar').toggleClass('active');
	});
			
	$('.openDownArrow').click(function() {
		$(this).siblings().toggleClass('active');
		$(this).parent().toggleClass('active');
		$(this).toggleClass('open');
	});

	$('#weeklyHeading').click(function() {
		$('#weeklyForcast').toggleClass('inactive');
		$('.weatherClose').toggleClass('inactive');
	});

	/*
	//Ajax request for weather data
	// -- Google Api request for lat/long from street address
	$.get('https://maps.googleapis.com/maps/api/geocode/json?address=2633+Camino+Ramon,+San+Ramon,+CA&key=AIzaSyCcZ046FfroKCYLoKU1WreKXgAt9AVXGiw', function(data) {
		console.log(data);
		var lat = data.results[0].geometry.location.lat , lng = data.results[0].geometry.location.lng;

		console.log(lat);
		console.log(lng);
		//Ajax request to forecast.io api
	$.ajax({
		url:"https://api.forecast.io/forecast/9fee182fc07504729932ea13a3a595b0/" + lat +
		"," + lng,
		dataType: 'jsonp'
	}, function(data) {
			console.log(data);
		});
	});*/
	 

});

 
