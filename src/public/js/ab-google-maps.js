function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 17
	});
	var geocoder = new google.maps.Geocoder();
	var infoWindow = new google.maps.InfoWindow();
	// Intentar la Geolocalización con HTML.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			var marker = new google.maps.Marker({
				position: pos,
				map: map
			});
			//Codigo para obtener la direccion en texto.
			google.maps.event.addListener(map, 'bounds_changed', function() {
			geocoder.geocode(
			{'latLng': pos},
			function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var direccion = results[0].formatted_address;
					document.getElementById("direction").value=direccion;
				} else {
					console.log(status, results);
					alert('Se desconoce la dirección debido a : ' + status);
				}
			}
		);
		});
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		});
	} else {
		// El navegador no soporta la geolocalización
		handleLocationError(false, infoWindow, map.getCenter());
	}	
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
												'Error: El servicio de geolocalización ha fallado.' :
												'Error: Tu navegador no soporta la geolocazación.');
}		