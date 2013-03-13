var io = require('socket.io').listen(4000);
//var tracker = require("./Tracker.js");
var tattletale = require("./Tattletale");
var tattler = new tattletale.model();

var db = tattletale.mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

 	io.sockets.on('connection', function(socket){

		// when mouse is moving, add a new coord object
		// to the mousePath array
		socket.on('mouseMv', function(data){

			tattler.mousePath.push(data);
		});

		// currently this event triggers form the index.html file
		// by clicking anywhere within the page
		socket.on('getDetails', function(data){

			tattler.mousePath.push(data);
			tattler.save(function(err){

				tattletale.model.find(function(err, tracks){

					socket.emit("returnDetails", tracks[tracks.length-1]);
				});
			});
		});
	});
});