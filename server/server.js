var io = require('socket.io').listen(4000);
//var tracker = require("./Tracker.js");
var Tracker = require("./Tracker_Schema_Model");
var tracker = Tracker.tracker;

var db = Tracker.mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

 	io.sockets.on('connection', function(socket){

		// when mouse is moving, add a new coord object
		// to the mousePath array
		socket.on('mouseMv', function(data){

			tracker.mousePath.push(data);
		});

		
		socket.on('getDetails', function(prop){

			tracker.save(function(err){

				Tracker.Tracker_Schema.find(function(err, tracks){

					socket.emit("returnDetails", tracks[tracks.length-1]);
				});
			});
		});
	});
});