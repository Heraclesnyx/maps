var markers = [];


  function initMap() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      fullscreenControl: true,

    });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('panel')); //Pour gerer la feuille de route

    var onChangeHandler = function() {
    calcRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);


    var infoWindow = new google.maps.InfoWindow({map: map}); /*A partir d'ici il s'agit de la géolocalisation à notre point de départ*/

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Localisation trouvé.');
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) { /*Fin de la géolocalisation*/
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }


      /*Début du marquage au clic*/
      google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);          
      });

  } //fin de le fonction INITMAP !!! ATTENTION ATTENTION lors des modifications apporté.


  function calcRoute(directionsService, directionsDisplay) { /*Methode qui calcule la feuille de route*/
      directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      travelMode: 'DRIVING'
      },
    function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } 
    });
  }

  function addMarker(location, map) { /*Méthode qui permet de créer un marqueur au clic sur la map*/
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    markers.push(marker); /*Rempli notre tableau pour mettre tous les marqueurs*/
  }


  function setMapOnAll(map) { /*Tu dois récupérer les infos de la map pour pouvoir supprimer les marqueurs*/
    for (var i = 0; i < markers.length; i++) { //Voir le chap Remove Marker
    markers[i].setMap(map);
    }
  }

  function clearMarker() { //Voir le chap Remove Marker
    setMapOnAll(null);
  }

  function deleteMarker() { //Permet de suppripmer tous les marqueurs. Voir le chap Remove Marker
    clearMarker();
    markers = [];
  }

  // function setMarker(map) {

  //   var image = 'test.png',
  //   var myLatng = new google.maps.LatLng();    
  //   var markers = new google.maps.Marker({
  //       position: myLatng, 
  //       map: map,
  //       icon: image
  //   });
  // }








      