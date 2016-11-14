function initialise() {
	var mapCanvas = document.getElementById('map-canvas');
	
	// Center
	var center = new google.maps.LatLng(32.7326533, -79.9657079);

	// Map Options		
	var mapOptions = {
		zoom: 12,
		center: center,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
			{stylers: [{ visibility: 'simplified' }]},
			{elementType: 'labels', stylers: [{ visibility: 'off' }]}
		]
	};
	
	// Create the Map
	map = new google.maps.Map(mapCanvas, mapOptions);

	var marker1 = new mapIcons.Marker({
		map: map,
		position: new google.maps.LatLng(32.77675, -79.92986),
		icon: {
			path: mapIcons.shapes.MAP_PIN,
			fillColor: '#f0394d',
			fillOpacity: 1,
			strokeColor: '',
			strokeWeight: 0
		},
		map_icon_label: '<span class="map-icon map-icon-map-icon-city-hall"></span>'
	});
	
    var marker2 = new mapIcons.Marker({
        map: map,
        position: new google.maps.LatLng(32.78257, -79.93213),
        icon: {
            path: mapIcons.shapes.SQUARE_PIN,
            fillColor: '#2C799E',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0
        },
        map_icon_label: '<span class="map-icon map-icon-lodging"></span>'
    });

    var marker3 = new mapIcons.Marker({
        map: map,
        position: new google.maps.LatLng(32.7915, -79.9403),
        icon: {
            path: mapIcons.shapes.MAP_PIN,
            fillColor: '#FAA23B',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0
        },
        map_icon_label: '<span class="map-icon map-icon-night-club"></span>'
    });

    var marker4 = new mapIcons.Marker({
        map: map,
        position: new google.maps.LatLng(32.64993, -79.95153),
        icon: {
            path: mapIcons.shapes.SQUARE_PIN,
            fillColor: '#54D332',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0
        },
        map_icon_label: '<span class="map-icon map-icon-store"></span>'
    });

    var marker5 = new mapIcons.Marker({
        map: map,
        position: new google.maps.LatLng(32.65463, -79.9406),
        icon: {
            path: mapIcons.shapes.SQUARE_PIN,
            fillColor: '#2C799E',
            fillOpacity: 1,
            strokeColor: '',
            strokeWeight: 0
        },
        map_icon_label: '<span class="map-icon map-icon-lodging"></span>'
    });	
};

google.maps.event.addDomListener(window, 'load', initialise);