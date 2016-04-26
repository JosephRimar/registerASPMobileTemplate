



$(document).ready(function() {
// =============== Styling Scripts ===============
	$('#nav-icon3').click(function() {
		$(this).toggleClass('open');
		// $('#navBar').toggleClass('active');
		$('#navBar').slideToggle(100);
	});
			
	$('.openDownArrow').click(function() {
		// $(this).siblings().toggleClass('active');
		$(this).siblings().slideToggle(100);
		$(this).parent().toggleClass('active');
		$(this).toggleClass('open');
		formatHeight(100);
	});

	$('#weeklyHeading').click(function() {
		$('#forcastCredit').toggleClass('inactive');
		$('#weeklyForcast').toggleClass('inactive');
		$('#dailyForcast').toggleClass('inactive');
		
		$('.weatherClose').toggleClass('inactive');
	});

	getWeatherData();
});// End Ready Function


function formatHeight(time) {
	setTimeout(function() {
		var h = $('footer').outerHeight();
		$('#mainWrapper').css('min-height', h); 
		console.log(h);
	}, time);
}

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
		});
	});
}
	
	 



 
