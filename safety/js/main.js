
  var markers = [];
  
getLocation()

var myLatLng;

var portListArray=[];
function listPorts(param){
	console.log('success:'+param)


portListArray = param;	
	var option = '';
		for (var i=0;i<param.length;i++){
		   option += '<option value="'+ param[i].title + '">' + param[i].title + '</option>';
		}
		$('#portpicker').append(option);
		//$("option[class='false']").attr("disabled","disabled");
	
}

$(window).load(function() {
 // executes when complete page is fully loaded, including all frames, objects and images

});

function hasNumbers(t)
{
var regex = /\d/g;
return regex.test(t);
}   


function onDetailsSubmit(){	
	//alert('Thank You! \n\nYour slot '+ selectedTimeSlot +' has been confirmed for the date ' + $('#datepicker').val());
	$('#slotConfirmed')[0].innerHTML = 'Thank You! Your slot '+ selectedTimeSlot +' has been confirmed for the date ' + $('#datepicker').val();
	$('#slotConfirmed').css('display','block');
	$('#scheduler').css('display','none');
	$('#dvMap').css('visibility','visible');
	$('#distanceDiv').css('display','block');
	$('#durationDiv').css('display','block');
	getLocation();
}

function getLocation() {
var options = {
};
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {initMap(pos)
    //var me = new google.maps.LatLng(pos.coords.latitude, pos.coords.latitude);
    //myloc.setPosition(me);
	console.log(pos)
}, function(error) {
    deniedPosition
},options);
    } else { 
        alert("Location service is not supported by this browser.");
    }
}

// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

function initMap(pos) {
    var im = 'images/bluecircle.png';
	/*$.ajax({url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCr6Ymf6MEb8c_-QQx5MzAkUuhblQ98AxU',
    type: 'Post',
    crossDomain: true,
    dataType: 'json',
    jsonp : false,
    cache: true, success: function(result){
        myLatLng = new google.maps.LatLng(result.location.lat, result.location.lng) 
		}}) */
	myLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var mapOptions = {
          zoom: 15,
          center: myLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('dvMap'),
                                      mapOptions);
        var userMarker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });
  var triangleCoords = [
    {lat: 25.774, lng: -80.19},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757}
  ];
  var sdb1coords = [
    {lat: 12.91488, lng: 80.21925},
    {lat: 12.91477, lng: 80.22043},
    {lat: 12.91331, lng: 80.22035},
    {lat: 12.91353, lng: 80.21895}
  ];
var sdb2coords = [
    {lat: 12.91327, lng: 80.21921},
    {lat: 12.91316, lng: 80.22039},
    {lat: 12.9117, lng: 80.22031},
    {lat: 12.91191, lng: 80.2189}
  ];
  
var sdb3coords = [
    {lat: 12.91373, lng: 80.21742},
    {lat: 12.91516, lng: 80.21784},
    {lat: 12.91505, lng: 80.21934},
    {lat: 12.91201, lng: 80.21877},
    {lat: 12.91231, lng: 80.21704}
  ];
  

  var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});
  
  var sdb1 = new google.maps.Polygon({paths: sdb1coords});
  
  var sdb2 = new google.maps.Polygon({paths: sdb2coords});
  
  var sdb3 = new google.maps.Polygon({paths: sdb3coords});

  google.maps.event.addDomListener(document.getElementById('showexit'), 'click', function(e) {
	  if(!google.maps.geometry.poly.containsLocation(myLatLng, sdb1)) {
		 showDirection()
	  } else if (google.maps.geometry.poly.containsLocation(myLatLng, sdb2)) {		 
		 showDirection()
	  }  else if (google.maps.geometry.poly.containsLocation(myLatLng, sdb3)) {		 
		 showDirection()
	  } else {alert('you are outside the campus')}
 
  });
     
}


function showDirection(end) {	
    directionsDisplay = new google.maps.DirectionsRenderer();
    /*var point1 = new google.maps.LatLng(-33.8975098545041, 151.09962701797485);
    var point2 = new google.maps.LatLng(-33.8584421519279, 151.0693073272705);
    var point3 = new google.maps.LatLng(-33.87312358690301, 151.99952697753906);
    var point4 = new google.maps.LatLng(-33.84525521656404, 151.0421848297119);
    var wps = [{
        location: point1
    }, {
        location: point2
    }, {
        location: point4
    }];*/
    var org = myLatLng;
    var dest = new google.maps.LatLng(12.91319112, 80.22030666);
    var request = {
        origin: org,
        destination: dest,
        travelMode: google.maps.DirectionsTravelMode.WALKING
    };
    directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else
            alert('failed to get directions');
    });
}

function deniedPosition(error) { 
  if (error.code == error.PERMISSION_DENIED)
      alert("Position denied");
	$('#dvMap').css('visibility','hidden');
	$('#distanceDiv').css('display','none');
	$('#durationDiv').css('display','none');
  
}