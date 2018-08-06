var map, geocoder, infoWindow, pos;

function initMap() {
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();
    // Intentar la Geolocalización con HTML.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 17.95907773125993,
            lng: -102.1964441509291
        },
        zoom: 12
    });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: El servicio de geolocalización ha fallado.' :
        'Error: Tu navegador no soporta la geolocazación.');
}