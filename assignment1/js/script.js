var Map = {

	//bounds
	//map
	//loadedListener

	init: function () {
		var self = this;

		this.bounds = new google.maps.LatLngBounds();

		$.get('data/amsterdam.json', function (data) {

			self.loadedListener = self.map.addListener('idle', function() {

				//loaded fully
			    for (var i = 0; i < data.length; i++) {
					List.addItem(data[i]);
					Map.addMarker(data[i]);
				}

				google.maps.event.removeListener(self.loadedListener);
				self.map.fitBounds(self.bounds);
			});	
		});

		this.map = new google.maps.Map(document.getElementById('map'), {});
	},

	addMarker: function (data) {

		var position = {
	    	lat: data.coordinate[0],
	    	lng: data.coordinate[1]
	    };

		var marker = new google.maps.Marker({
		    position: position,
		    map: this.map
		});

		this.bounds.extend(marker.getPosition());
	},
}


var List = {

	selector: '.venue-list',

	init: function () {
		var source = $('#listItem').html();
		this.template = Handlebars.compile(source);
	},

	addItem: function (data) {
		var tmp = this.template(data);
		$(List.selector).append(tmp);
	}
}


$(function () {

	List.init();
});


