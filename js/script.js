function initMap() {

  // function that fetches weather info from OpenWeatherMap and stores it to the global variable "weatherData"
  function fetchWeather(lat, lng, event) {
      var openWeatherMapKey = '_________________________';

      fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='+lng+'&appid=' + openWeatherMapKey)
        .then(function(resp) {  return resp.json()
              }) // Convert data to json
          .then(function (data) {

              showWeatherInfo(data, event);
            })
      .catch(function() {
        // catch any errors
      });
  }

    // starting position and zoom for GoogleMap
    let options = {
      center: { lat: 50.47027396489859, lng: 30.50461306710058 },
      zoom: 8,

    }
    let map = new google.maps.Map(document.getElementById("map"), options);

    // setting up a Marker on a GoogleMap
    let marker = new google.maps.Marker({
        map: map,
        position: { lat: 50.47027396489859, lng: 30.50461306710058 },
        title: 'Golden Gate',
    })

    let infowindow = new google.maps.InfoWindow({
        content: "Hello!<br> This is Google Maps and Weather <br> JavaScript Project",
    });
    infowindow.open(map, marker);
    
    // click listener for the GoogleMap
    google.maps.event.addListener(map, 'click', function (event) {

        fetchWeather(event.latLng.lat(), event.latLng.lng(), event);
    });

    function showWeatherInfo(weatherData, event) {
        marker.setPosition(event.latLng);
        let weatherText = "<p><b>Current weather in " + weatherData.name + ": </b></p>temperature: ";
        weatherText += (weatherData.main.temp-273.15).toFixed(1) + " C <br>";
        weatherText += "humidity: ";
        weatherText += (weatherData.main.humidity) + "%<br>";
        weatherText += "pressure: " + (weatherData.main.pressure) + " mm";

        infowindow.setContent(weatherText);
        infowindow.open(map, marker);
    }

}
