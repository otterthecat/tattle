var io = require('socket.io').listen(4000);
var tracker = require("./Tracker.js");


io.sockets.on('connection', function(socket){

	// when mouse is moving, add a new coord object
	// to the mousePath array
	socket.on('mouseMv', function(data){

		tracker.pushTo('mousePath', data);
	});


	socket.on('getDetails', function(prop){

		// if argument is not set, send full details object,
		// otherwise send back the one that is requested
		if(typeof prop === 'undefined'){

			socket.emit('returnDetails', tracker.getDetails());
		} else {

			socket.emit('returnDetails', tracker.getDetails(prop));
		}
	});
});