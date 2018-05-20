var latitude = document.getElementById("latitude");
var longitude = document.getElementById("longitude");
var message = document.getElementById("locationMessage");

function getLocation() {
    if (navigator.geolocation) {
        document.getElementById('successMessage2').hidden = true;
        navigator.geolocation.getCurrentPosition(insertLocation);
    } else {
        message.innerHTML = 'Geolocation is not supported by this browser ';
    }
}

function insertLocation(position) {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
}